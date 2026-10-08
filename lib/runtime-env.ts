import { env } from "cloudflare:workers";

export type CaseManEnv = {
  CONTENT_DB?: D1Database;
  ADMIN_USERNAME?: string;
  ADMIN_PASSWORD?: string;
  ADMIN_SESSION_SECRET?: string;
};

export function getRuntimeEnv(): CaseManEnv {
  return env as unknown as CaseManEnv;
}
