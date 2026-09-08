"use client";

import { FormEvent, useMemo, useState } from "react";
import {
  ArrowLeft,
  Bot,
  CheckCircle2,
  MessageCircle,
  Send,
  Sparkles,
  X,
} from "lucide-react";
import content from "@/app/content.json";

type Mode = "menu" | "info" | "chat";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type ChatResponse = {
  answer?: string;
  error?: string;
};

const quickQuestions = [
  "Apa itu CaseMan?",
  "Apa manfaat CaseMan untuk CaseMix?",
  "Apa fungsi Auto Koding & e-Klaim?",
  "Saya ingin jadwalkan demo.",
];

function buildKnowledgeBase(): string {
  const features = content.features
    .map(
      (feature) =>
        `- ${feature.title}: ${feature.short} ${feature.body}`,
    )
    .join("\n");

  const roles = content.roles
    .map(
      (role) =>
        `- ${role.title}: ${role.text} ${role.detail}`,
    )
    .join("\n");

  const faqs = content.faqs
    .map(
      (faq) =>
        `- ${faq.question}: ${faq.answer}`,
    )
    .join("\n");

  return `
Nama produk: CaseMan
Tagline: ${content.brand.tagline}
Platform: ${content.brand.platform}

Fitur:
${features}

Peran pengguna:
${roles}

FAQ:
${faqs}

Kontak:
Nalameds
WhatsApp: 0858-0024-1340
Instagram: @nalameds

Aturan:
- Kamu adalah Asisten Website CaseMan untuk pengunjung publik.
- Gunakan hanya informasi yang tersedia di knowledge base.
- Jangan mengarang harga, integrasi, fitur, rumah sakit pengguna, hasil klinis, atau klaim performa.
- Jangan meminta, menyimpan, atau menafsirkan data pasien pribadi atau rekam medis.
- Jangan memberikan keputusan klinis.
- Jangan menyatakan bahwa saran AI adalah keputusan akhir untuk koding atau klaim.
- Bila informasi tidak tersedia di knowledge base, katakan bahwa informasi tersebut belum tersedia.
- Bila pengguna tertarik demo, arahkan ke tombol Jadwalkan Demo.
- Jawaban ringkas, ramah, profesional, dan mudah dipahami.
`.trim();
}

export default function CaseManAssistant() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<Mode>("menu");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const knowledgeBase = useMemo(
    () => buildKnowledgeBase(),
    [],
  );

  const openChat = () => {
    setMode("chat");

    if (messages.length === 0) {
      setMessages([
        {
          role: "assistant",
          content:
            "Halo 👋 Saya Asisten CaseMan. Saya bisa membantu menjelaskan fitur, peran pengguna, FAQ, informasi produk, dan cara menjadwalkan demo.",
        },
      ]);
    }
  };

  const ask = async (question: string) => {
    const clean = question.trim();

    if (!clean || loading) {
      return;
    }

    setMode("chat");
    setInput("");

    setMessages((current) => [
      ...current,
      {
        role: "user",
        content: clean,
      },
    ]);

    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: clean,
          history: messages.slice(-8),
          knowledgeBase,
        }),
      });

      let payload: ChatResponse = {};

      try {
        const parsed: unknown = await response.json();

        if (
          typeof parsed === "object" &&
          parsed !== null
        ) {
          const data = parsed as Record<string, unknown>;

          payload = {
            answer:
              typeof data.answer === "string"
                ? data.answer
                : undefined,
            error:
              typeof data.error === "string"
                ? data.error
                : undefined,
          };
        }
      } catch {
        payload = {};
      }

      if (!response.ok) {
        throw new Error(
          payload.error ||
            `Gagal menghubungkan ke Asisten CaseMan (${response.status}).`,
        );
      }

      const answer =
        payload.answer?.trim() ||
        "Maaf, saya belum dapat menjawab pertanyaan tersebut.";

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: answer,
        },
      ]);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Terjadi kesalahan saat menghubungkan ke AI.";

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content:
            `${errorMessage}\n\n` +
            "Untuk bantuan langsung, gunakan tombol Jadwalkan Demo atau WhatsApp Nalameds.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const submit = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    void ask(input);
  };

  const scheduleDemo = () => {
    const message =
      "Halo Nalameds, saya ingin jadwalkan demo CaseMan untuk mengetahui lebih lanjut.";

    const url =
      `https://wa.me/6285800241340?text=` +
      encodeURIComponent(message);

    window.open(
      url,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <>
      <button
        type="button"
        className="caseman-assistant-fab"
        aria-label="Buka CaseMan Assistant"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <img
          src="/images/mascot.png"
          alt="CaseMan AI"
        />

        <span>AI</span>
      </button>

      {open && (
        <div
          className="caseman-assistant-panel"
          role="dialog"
          aria-label="CaseMan Assistant"
        >
          <div className="caseman-assistant-header">
            <div className="caseman-assistant-brand">
              <div className="caseman-assistant-avatar">
                <img
                  src="/images/mascot.png"
                  alt="Mascot CaseMan"
                />
              </div>

              <div>
                <strong>CaseMan Assistant</strong>

                <span>
                  Smart Assistant for Case Management
                </span>
              </div>
            </div>

            <button
              type="button"
              className="caseman-assistant-close"
              onClick={() => setOpen(false)}
              aria-label="Tutup"
            >
              <X size={19} />
            </button>
          </div>

          {mode === "menu" && (
            <div className="caseman-assistant-menu">
              <div className="caseman-assistant-welcome">
                <Sparkles size={20} />

                <div>
                  <strong>
                    Halo, ada yang bisa saya bantu?
                  </strong>

                  <p>
                    Pilih informasi CaseMan atau ngobrol
                    langsung dengan AI.
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="caseman-assistant-option"
                onClick={() => setMode("info")}
              >
                <div className="caseman-option-icon info">
                  <CheckCircle2 size={21} />
                </div>

                <div>
                  <strong>Info CaseMan</strong>

                  <span>
                    Fitur, FAQ, panduan, dan informasi
                    produk.
                  </span>
                </div>
              </button>

              <button
                type="button"
                className="caseman-assistant-option"
                onClick={openChat}
              >
                <div className="caseman-option-icon chat">
                  <MessageCircle size={21} />
                </div>

                <div>
                  <strong>Live Chat AI</strong>

                  <span>
                    Tanya langsung tentang CaseMan.
                  </span>
                </div>
              </button>

              <button
                type="button"
                className="caseman-assistant-demo"
                onClick={scheduleDemo}
              >
                <MessageCircle size={17} />
                Jadwalkan Demo
              </button>
            </div>
          )}

          {mode === "info" && (
            <div className="caseman-assistant-info">
              <button
                type="button"
                className="caseman-assistant-back"
                onClick={() => setMode("menu")}
              >
                <ArrowLeft size={17} />
                Kembali
              </button>

              <h3>Info CaseMan</h3>

              <div className="caseman-info-list">
                {content.faqs.slice(0, 5).map((faq) => (
                  <details
                    key={faq.question}
                  >
                    <summary>
                      {faq.question}
                    </summary>

                    <p>
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          )}

          {mode === "chat" && (
            <div className="caseman-assistant-chat">
              <div className="caseman-chat-toolbar">
                <button
                  type="button"
                  onClick={() => setMode("menu")}
                >
                  <ArrowLeft size={17} />
                  Menu
                </button>

                <span>
                  <span className="caseman-online-dot" />
                  Online
                </span>
              </div>

              <div className="caseman-chat-messages">
                {messages.map(
                  (message, index) => (
                    <div
                      key={`${message.role}-${index}`}
                      className={
                        message.role ===
                        "user"
                          ? "caseman-chat-bubble user"
                          : "caseman-chat-bubble assistant"
                      }
                    >
                      {message.content}
                    </div>
                  ),
                )}

                {loading && (
                  <div className="caseman-chat-bubble assistant">
                    Sedang menyiapkan jawaban...
                  </div>
                )}

                {messages.length <= 1 &&
                  !loading && (
                    <div className="caseman-quick-questions">
                      {quickQuestions.map(
                        (question) => (
                          <button
                            key={question}
                            type="button"
                            onClick={() =>
                              void ask(question)
                            }
                          >
                            {question}
                          </button>
                        ),
                      )}
                    </div>
                  )}
              </div>

              <form
                className="caseman-chat-composer"
                onSubmit={submit}
              >
                <input
                  value={input}
                  onChange={(event) =>
                    setInput(event.target.value)
                  }
                  placeholder="Ketik pertanyaan tentang CaseMan..."
                  disabled={loading}
                  aria-label="Pertanyaan untuk CaseMan Assistant"
                />

                <button
                  type="submit"
                  disabled={
                    loading ||
                    !input.trim()
                  }
                  aria-label="Kirim pertanyaan"
                >
                  <Send size={18} />
                </button>
              </form>

              <div className="caseman-chat-note">
                Asisten ini untuk informasi umum tentang
                CaseMan, bukan untuk keputusan klinis atau
                diagnosis.
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}