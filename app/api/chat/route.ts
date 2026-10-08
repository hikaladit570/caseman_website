import { NextResponse } from "next/server";

type IncomingMessage = {
  role: "user" | "assistant";
  content: string;
};

function env(name: string) {
  const value = process.env[name];
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const record =
      typeof body === "object" && body !== null
        ? (body as Record<string, unknown>)
        : {};

    const message =
      typeof record.message === "string" ? record.message.trim() : "";

    const history = Array.isArray(record.history)
      ? (record.history as IncomingMessage[]).slice(-8)
      : [];

    const knowledgeBase =
      typeof record.knowledgeBase === "string"
        ? record.knowledgeBase.slice(0, 25000)
        : "";

    if (!message) {
      return NextResponse.json(
        { error: "Pertanyaan tidak boleh kosong." },
        { status: 400 },
      );
    }

    const apiKey = env("AI_API_KEY");
    const baseUrl = env("AI_BASE_URL") || "https://api.openai.com/v1";
    const model = env("AI_MODEL");

    if (!apiKey || !model) {
      return NextResponse.json(
        {
          error:
            "Live Chat AI belum dikonfigurasi. Isi AI_API_KEY dan AI_MODEL di .env.local.",
        },
        { status: 503 },
      );
    }

    const response = await fetch(
      `${baseUrl.replace(/\/+$/, "")}/chat/completions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          temperature: 0.2,
          max_tokens: 700,
          messages: [
            {
              role: "system",
              content: `
Kamu adalah CaseMan Assistant untuk website promosi CaseMan.

Gunakan knowledge base berikut sebagai sumber utama:
${knowledgeBase}

Aturan:
- Jawab dalam Bahasa Indonesia, kecuali pengguna bertanya dalam Bahasa Inggris.
- Jawab ringkas, ramah, profesional, dan mudah dipahami.
- Jangan mengarang fitur, harga, klien, performa, integrasi, atau hasil.
- Jangan meminta atau memproses data pasien, rekam medis, diagnosis, atau nomor identitas pasien.
- Jangan memberikan keputusan klinis.
- Saran AI bukan keputusan akhir untuk koding, klaim, atau tindakan medis.
- Bila informasi tidak tersedia, katakan bahwa informasi tersebut belum tersedia.
- Bila pengguna tertarik demo, arahkan ke Jadwalkan Demo / WhatsApp Nalameds.
              `.trim(),
            },
            ...history.filter(
              (item) =>
                item &&
                (item.role === "user" || item.role === "assistant") &&
                typeof item.content === "string",
            ),
            { role: "user", content: message },
          ],
        }),
        cache: "no-store",
      },
    );

    const raw = await response.text();

    if (!response.ok) {
      let detail = "AI provider mengembalikan error.";

      try {
        const parsed = JSON.parse(raw);
        detail = parsed?.error?.message || parsed?.message || detail;
      } catch {}

      return NextResponse.json(
        { error: detail },
        { status: 502 },
      );
    }

    const data = JSON.parse(raw);
    const answer =
      data?.choices?.[0]?.message?.content?.trim();

    if (!answer) {
      return NextResponse.json(
        { error: "AI tidak mengembalikan jawaban." },
        { status: 502 },
      );
    }

    return NextResponse.json({ answer });
  } catch {
    return NextResponse.json(
      { error: "Permintaan Live Chat AI tidak dapat diproses." },
      { status: 500 },
    );
  }
}
