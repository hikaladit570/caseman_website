import { NextResponse } from "next/server";
import {
  adminIsConfigured,
  createSessionCookie,
  credentialsAreValid,
} from "@/lib/admin-auth";

export async function POST(request: Request) {
  if (!adminIsConfigured()) {
    return NextResponse.json(
      { error: "Login admin belum dikonfigurasi pada server." },
      { status: 503 },
    );
  }

  const body: unknown = await request.json();
  const record =
    typeof body === "object" && body !== null
      ? (body as Record<string, unknown>)
      : {};
  const username = typeof record.username === "string" ? record.username.trim() : "";
  const password = typeof record.password === "string" ? record.password : "";

  if (!credentialsAreValid(username, password)) {
    return NextResponse.json(
      { error: "Username atau password tidak sesuai." },
      { status: 401 },
    );
  }

  const response = NextResponse.json({ ok: true, username });
  response.headers.set("Set-Cookie", await createSessionCookie(username));
  return response;
}
