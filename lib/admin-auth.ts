import { getRuntimeEnv } from "./runtime-env";

const COOKIE_NAME = "caseman_admin_session";
const MAX_AGE_SECONDS = 60 * 60 * 8;

type SessionPayload = {
  username: string;
  expiresAt: number;
};

function bytesToBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary)
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replace(/=+$/, "");
}

function stringToBase64Url(value: string): string {
  return bytesToBase64Url(new TextEncoder().encode(value));
}

function base64UrlToString(value: string): string {
  const base64 = value.replaceAll("-", "+").replaceAll("_", "/");
  const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
  const binary = atob(padded);
  return new TextDecoder().decode(
    Uint8Array.from(binary, (character) => character.charCodeAt(0)),
  );
}

async function signature(value: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signed = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(value),
  );
  return bytesToBase64Url(new Uint8Array(signed));
}

function safeEqual(left: string, right: string): boolean {
  const a = new TextEncoder().encode(left);
  const b = new TextEncoder().encode(right);
  let difference = a.length ^ b.length;
  const length = Math.max(a.length, b.length);
  for (let index = 0; index < length; index += 1) {
    difference |= (a[index] ?? 0) ^ (b[index] ?? 0);
  }
  return difference === 0;
}

function cookieValue(request: Request, name: string): string {
  const cookie = request.headers.get("cookie") ?? "";
  for (const item of cookie.split(";")) {
    const [key, ...value] = item.trim().split("=");
    if (key === name) return value.join("=");
  }
  return "";
}

export function adminIsConfigured(): boolean {
  const runtime = getRuntimeEnv();
  return Boolean(
    runtime.ADMIN_USERNAME &&
      runtime.ADMIN_PASSWORD &&
      runtime.ADMIN_SESSION_SECRET &&
      runtime.ADMIN_SESSION_SECRET.length >= 32,
  );
}

export function credentialsAreValid(username: string, password: string): boolean {
  const runtime = getRuntimeEnv();
  if (!adminIsConfigured()) return false;
  return (
    safeEqual(username, runtime.ADMIN_USERNAME ?? "") &&
    safeEqual(password, runtime.ADMIN_PASSWORD ?? "")
  );
}

export async function createSessionCookie(username: string): Promise<string> {
  const secret = getRuntimeEnv().ADMIN_SESSION_SECRET ?? "";
  const payload: SessionPayload = {
    username,
    expiresAt: Date.now() + MAX_AGE_SECONDS * 1000,
  };
  const encoded = stringToBase64Url(JSON.stringify(payload));
  const token = `${encoded}.${await signature(encoded, secret)}`;
  return `${COOKIE_NAME}=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${MAX_AGE_SECONDS}`;
}

export function clearSessionCookie(): string {
  return `${COOKIE_NAME}=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`;
}

export async function readAdminSession(
  request: Request,
): Promise<SessionPayload | null> {
  const token = cookieValue(request, COOKIE_NAME);
  const [encoded, suppliedSignature] = token.split(".");
  const secret = getRuntimeEnv().ADMIN_SESSION_SECRET ?? "";
  if (!encoded || !suppliedSignature || !secret) return null;
  const expectedSignature = await signature(encoded, secret);
  if (!safeEqual(suppliedSignature, expectedSignature)) return null;

  try {
    const parsed = JSON.parse(base64UrlToString(encoded)) as SessionPayload;
    if (
      typeof parsed.username !== "string" ||
      typeof parsed.expiresAt !== "number" ||
      parsed.expiresAt <= Date.now()
    ) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}
