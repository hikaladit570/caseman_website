import { NextResponse } from "next/server";
import defaults from "@/app/content.json";
import { validateContent } from "@/app/content-utils";
import { readAdminSession } from "@/lib/admin-auth";
import { readSiteContent, writeSiteContent } from "@/lib/content-store";

export async function GET() {
  const content = await readSiteContent();
  return NextResponse.json(
    validateContent(content, defaults) ? content : defaults,
    { headers: { "Cache-Control": "no-store" } },
  );
}

export async function PUT(request: Request) {
  if (!(await readAdminSession(request))) {
    return NextResponse.json({ error: "Sesi admin tidak valid." }, { status: 401 });
  }

  const content: unknown = await request.json();
  if (!validateContent(content, defaults)) {
    return NextResponse.json(
      { error: "Struktur konten tidak sesuai." },
      { status: 400 },
    );
  }

  try {
    await writeSiteContent(content);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Konten gagal disimpan." },
      { status: 503 },
    );
  }
}
