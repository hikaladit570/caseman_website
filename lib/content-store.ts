import defaults from "@/app/content.json";
import { getRuntimeEnv } from "./runtime-env";

// D1 exec() treats every line as its own statement, so a multi-line CREATE
// fails; prepare().run() takes the whole statement.
const CREATE_TABLE = `CREATE TABLE IF NOT EXISTS site_content (
  content_key TEXT PRIMARY KEY,
  content_json TEXT NOT NULL,
  updated_at TEXT NOT NULL
)`;

export async function readSiteContent(): Promise<unknown> {
  const database = getRuntimeEnv().CONTENT_DB;
  if (!database) return defaults;

  try {
    await database.prepare(CREATE_TABLE).run();
    const row = await database
      .prepare(
        "SELECT content_json FROM site_content WHERE content_key = ? LIMIT 1",
      )
      .bind("homepage")
      .first<{ content_json: string }>();
    return row ? (JSON.parse(row.content_json) as unknown) : defaults;
  } catch {
    // Database unavailable must not break the landing page.
    return defaults;
  }
}

export async function writeSiteContent(content: unknown): Promise<void> {
  const database = getRuntimeEnv().CONTENT_DB;
  if (!database) {
    throw new Error("CONTENT_DB belum terhubung.");
  }

  await database.prepare(CREATE_TABLE).run();

  await database
    .prepare(
      `INSERT INTO site_content (content_key, content_json, updated_at)
       VALUES (?, ?, ?)
       ON CONFLICT(content_key) DO UPDATE SET
         content_json = excluded.content_json,
         updated_at = excluded.updated_at`,
    )
    .bind("homepage", JSON.stringify(content), new Date().toISOString())
    .run();
}
