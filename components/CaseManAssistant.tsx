"use client";

import { useEffect, useMemo, useState, type SyntheticEvent } from "react";
import {
  Send,
  X,
} from "lucide-react";
import content from "@/app/content.json";

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
  "Apa manfaat CaseMan untuk Casemix?",
  "Apa itu peluang top-up klaim?",
  "Apa saja fitur CaseMan?",
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

Aturan:
- Kamu adalah Asisten Website CaseMan untuk pengunjung publik.
- Gunakan hanya informasi yang tersedia di knowledge base.
- Jangan mengarang harga, integrasi, fitur, rumah sakit pengguna, hasil klinis, atau klaim performa.
- Jangan meminta, menyimpan, atau menafsirkan data pasien pribadi atau rekam medis.
- Jangan memberikan keputusan klinis.
- Jangan menyatakan bahwa saran AI adalah keputusan akhir untuk koding atau klaim.
- Bila informasi tidak tersedia di knowledge base, katakan bahwa informasi tersebut belum tersedia.
- Bila pengguna tertarik demo, arahkan ke tombol Jadwalkan Demo di website.
- Jawaban ringkas, ramah, profesional, dan mudah dipahami.
`.trim();
}

export default function CaseManAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const knowledgeBase = useMemo(
    () => buildKnowledgeBase(),
    [],
  );

  /*
   * Saat widget dibuka:
   * langsung tampilkan Live Chat AI.
   */
  useEffect(() => {
    if (!open || messages.length > 0) {
      return;
    }

    setMessages([
      {
        role: "assistant",
        content:
          "Halo 👋 Saya Asisten CaseMan. Saya siap membantu menjelaskan fitur, alur kerja, peran pengguna, FAQ, dan informasi produk CaseMan.",
      },
    ]);
  }, [open, messages.length]);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  const ask = async (question: string) => {
    const clean = question.trim();

    if (!clean || loading) {
      return;
    }

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
          const data =
            parsed as Record<string, unknown>;

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
            "Silakan coba kirim pertanyaan kembali.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const submit = (
    event: SyntheticEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    void ask(input);
  };

  return (
    <>
      {/* =====================================================
          FLOATING AI BUTTON
          ===================================================== */}
      <button
        type="button"
        className="caseman-assistant-fab"
        aria-label="Buka Live Chat AI CaseMan"
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
        <dialog
          open
          className="caseman-assistant-panel"
          aria-label="Live Chat AI CaseMan"
          aria-modal="false"
        >
          {/* =====================================================
              HEADER
              ===================================================== */}
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

          {/* =====================================================
              LANGSUNG LIVE CHAT AI
              ===================================================== */}
          <div className="caseman-assistant-chat">
            <div className="caseman-chat-toolbar">
              <strong>Live Chat AI</strong>

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
                      message.role === "user"
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
                aria-label="Pertanyaan untuk CaseMan AI"
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
        </dialog>
      )}
    </>
  );
}
