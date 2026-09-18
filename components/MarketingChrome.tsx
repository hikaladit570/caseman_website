"use client";

import Link from "@/components/PlainLink";
import { useEffect, useState, type ReactNode } from "react";
import {
  ArrowDownToLine,
  ChevronDown,
  ChevronRight,
  Menu,
  MessageCircle,
  Monitor,
  Search,
  X,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

import content from "@/app/content.json";
import { safeUrl } from "@/app/content-utils";
import {
  featureEnglish,
  featureSlugs,
  roleSlugs,
} from "@/app/site-data";

type Language = "id" | "en";

const DEMO_NUMBER = "6285800241340";

const copy = {
  id: {
    about: "Tentang CaseMan",
    features: "Fitur Aplikasi",
    roles: "Untuk Tim RS",
    guides: "Panduan",
    articles: "Artikel",
    download: "Aplikasi Windows",
    contact: "Hubungi Kami",

    demo: "Jadwalkan Demo",
    search: "Cari informasi...",

    demoTitle: "Jadwalkan Demo CaseMan",
    demoDescription:
      "Isi data singkat agar pesan WhatsApp terkirim dengan informasi yang lebih lengkap.",

    hospital: "Nama Rumah Sakit",
    hospitalPlaceholder:
      "Contoh: RS PKU Muhammadiyah Wonosobo",

    hospitalType: "Tipe Rumah Sakit",
    hospitalTypePlaceholder:
      "Pilih tipe rumah sakit",

    continue: "Lanjut ke WhatsApp",

    follow: "Ikuti Nalameds",

    backHome: "Beranda",
  },

  en: {
    about: "About CaseMan",
    features: "Application Features",
    roles: "For Hospital Teams",
    guides: "Guides",
    articles: "Articles",
    download: "Windows App",
    contact: "Contact Us",

    demo: "Schedule a Demo",
    search: "Search information...",

    demoTitle: "Schedule a CaseMan Demo",
    demoDescription:
      "Fill in a few details so your WhatsApp message is more complete.",

    hospital: "Hospital Name",
    hospitalPlaceholder:
      "Example: Hospital Name",

    hospitalType: "Hospital Type",
    hospitalTypePlaceholder:
      "Select hospital type",

    continue: "Continue to WhatsApp",

    follow: "Follow Nalameds",

    backHome: "Home",
  },
} as const;

export default function MarketingChrome({
  children,
}: {
  children: ReactNode;
}) {
  const [language, setLanguage] =
    useState<Language>("id");

  const [mobileOpen, setMobileOpen] =
    useState(false);

  const [demoOpen, setDemoOpen] =
    useState(false);

  const [hospitalName, setHospitalName] =
    useState("");

  const [hospitalType, setHospitalType] =
    useState("");

  const [query, setQuery] =
    useState("");

  useEffect(() => {
    try {
      const savedLanguage =
        localStorage.getItem(
          "caseman-language-v1",
        );

      if (savedLanguage === "en") {
        setLanguage("en");
      }
    } catch {
      // Ignore localStorage errors.
    }
  }, []);

  const t = copy[language];

  const switchLanguage = () => {
    const nextLanguage: Language =
      language === "id" ? "en" : "id";

    setLanguage(nextLanguage);

    try {
      localStorage.setItem(
        "caseman-language-v1",
        nextLanguage,
      );
    } catch {
      // Ignore localStorage errors.
    }
  };

  const submitDemo = () => {
    const cleanHospital =
      hospitalName.trim();

    if (!cleanHospital || !hospitalType) {
      return;
    }

    const message =
      language === "id"
        ? `Halo Nalameds, saya dari ${cleanHospital} (${hospitalType}). Saya ingin jadwalkan demo untuk melihat peluang klaim BPJS kami.`
        : `Hello Nalameds, I am from ${cleanHospital} (${hospitalType}). I would like to schedule a demo to explore our BPJS claim opportunities.`;

    const url =
      `https://wa.me/${DEMO_NUMBER}` +
      `?text=${encodeURIComponent(message)}`;

    window.open(
      url,
      "_blank",
      "noopener,noreferrer",
    );

    setDemoOpen(false);
  };

  const downloadHref =
    safeUrl(content.download.url) ||
    "/#aplikasi";

    return (
      <div
        className="site-shell"
        onClickCapture={(event) => {
          const target = event.target as HTMLElement;
    
          const trigger = target.closest(
            "a, button",
          ) as
            | HTMLAnchorElement
            | HTMLButtonElement
            | null;
    
          if (!trigger) return;
    
          const text =
            trigger.textContent
              ?.replace(/\s+/g, " ")
              .trim()
              .toLowerCase() || "";
    
          const isDemoButton =
            text.includes("jadwalkan demo") ||
            text.includes("schedule a demo");
    
          if (!isDemoButton) return;
    
          event.preventDefault();
          event.stopPropagation();
    
          setDemoOpen(true);
        }}
      >
        {/* =====================================================
            HEADER
            ===================================================== */}
        <header id="top">
          <div className="topbar">
            <div className="wrap topline">
              <Link href="/" className="brand">
                <img
                  src={safeUrl(content.brand.logo, true)}
                  alt="CaseMan"
                />
                <span>
                  <strong>{content.brand.name}</strong>
                  <small>{content.brand.tagline}</small>
                </span>
              </Link>

              <div className="topinfo">
                <span>
                  <Monitor size={21} />
                  <span>
                    {language === "id"
                      ? content.brand.platform
                      : "Windows application for hospitals"}
                    <strong>Case Manager · CaseMix · DPJP</strong>
                  </span>
                </span>

                <button
                  className="btn cyan"
                  type="button"
                  onClick={() => setDemoOpen(true)}
                >
                  <MessageCircle size={17} />
                  {t.demo}
                </button>

                <a className="btn green" href={downloadHref}>
                  <ArrowDownToLine size={17} />
                  {t.download}
                </a>
              </div>

              <div className="hidden md:flex items-center gap-2 lg:hidden">
                <button
                  className="rounded border border-slate-300 px-2 py-1 text-xs"
                  type="button"
                  onClick={switchLanguage}
                >
                  {language.toUpperCase()}
                </button>
              </div>

              <button
                className="menu-toggle"
                type="button"
                aria-label={mobileOpen ? "Tutup menu" : "Buka menu"}
                aria-expanded={mobileOpen}
                onClick={() => setMobileOpen((value) => !value)}
              >
                {mobileOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>

          <nav
            aria-label="Navigasi utama"
            className={mobileOpen ? "nav open" : "nav"}
          >
            <div className="wrap navline">
              <Link href="/#tentang" onClick={() => setMobileOpen(false)}>
                {t.about}
              </Link>

              <details className="navdrop">
                <summary>
                  {t.features}
                  <ChevronDown size={14} />
                </summary>
                <div>
                  {content.features.map((item, index) => {
                    const slug = featureSlugs[index];
                    const label =
                      language === "id"
                        ? item.title
                        : featureEnglish[slug]?.title ?? item.title;

                    return (
                      <Link
                        key={slug}
                        href={`/fitur/${slug}`}
                        onClick={() => setMobileOpen(false)}
                      >
                        {label}
                      </Link>
                    );
                  })}
                </div>
              </details>

              <details className="navdrop">
                <summary>
                  {t.roles}
                  <ChevronDown size={14} />
                </summary>
                <div>
                  {content.roles.map((role) => {
                    const roleKey = role.title as keyof typeof roleSlugs;
                    const slug = roleSlugs[roleKey];

                    return (
                      <Link
                        key={role.title}
                        href={`/peran/${slug}`}
                        onClick={() => setMobileOpen(false)}
                      >
                        {role.title}
                      </Link>
                    );
                  })}
                </div>
              </details>

              <Link href="/#testimoni" onClick={() => setMobileOpen(false)}>
                {language === "id"
                  ? "Cerita & pengalaman"
                  : "Stories & experiences"}
              </Link>

              <Link href="/#panduan" onClick={() => setMobileOpen(false)}>
                {t.guides}
              </Link>

              <Link href="/artikel" onClick={() => setMobileOpen(false)}>
                {t.articles}
              </Link>

              <Link href="/#aplikasi" onClick={() => setMobileOpen(false)}>
                {t.download}
              </Link>

              <Link href="/#kontak" onClick={() => setMobileOpen(false)}>
                {t.contact}
              </Link>

              <div className="shell-nav-actions">
                <form
                  className="search"
                  onSubmit={(event) => {
                    event.preventDefault();
                    const cleanQuery = query.trim();
                    if (!cleanQuery) return;
                    window.location.href =
                      `/?search=${encodeURIComponent(cleanQuery)}`;
                  }}
                >
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder={t.search}
                    aria-label={t.search}
                  />
                  <button type="submit" aria-label={t.search}>
                    <Search size={19} />
                  </button>
                </form>

                <button
                  type="button"
                  className="shell-language"
                  onClick={switchLanguage}
                  aria-label={
                    language === "id"
                      ? "Switch to English"
                      : "Ganti ke Bahasa Indonesia"
                  }
                >
                  {language === "id" ? "EN" : "ID"}
                </button>
              </div>
            </div>
          </nav>
        </header>

      {/* =====================================================
          PAGE CONTENT
          ===================================================== */}
      {children}

      {/* =====================================================
          FOOTER
          ===================================================== */}
      <footer className="site-footer">
        <div className="wrap footer-reference-grid">
          {/* Kolom 1 */}
          <div className="footer-brand-panel">
            <Link
              href="/#top"
              className="footer-brand-large"
            >
              <img
                src={safeUrl(
                  content.brand.logo,
                  true,
                )}
                alt=""
              />

              <span>
                <span className="footer-brand-name">
                  {content.brand.name}
                </span>

                <span className="footer-brand-tagline">
                  {content.brand.tagline}
                </span>
              </span>
            </Link>

            <h3>
              {language === "id"
                ? "Pendamping kerja tim rumah sakit."
                : "A work companion for hospital teams."}
            </h3>

            <p>
              {language === "id"
                ? "CaseMan membantu mendukung alur Case Management, pemantauan pasien, dokumentasi, dan persiapan klaim secara lebih terstruktur."
                : "CaseMan supports Case Management, patient monitoring, documentation, and claim preparation in a more structured workflow."}
            </p>

            <button
              type="button"
              className="btn green footer-demo"
              onClick={() =>
                setDemoOpen(true)
              }
            >
              <MessageCircle size={17} />
              {t.demo}
            </button>

            <div className="windows-badge">
  <div className="windows-badge-left">
    <div className="windows-badge-label">
      AVAILABLE ON
    </div>

    <div className="windows-badge-main">
      <Monitor size={24} strokeWidth={2.2} />
      <strong>WINDOWS</strong>
    </div>

    <div className="windows-badge-desc">
      CaseMan Windows Application
    </div>
  </div>

  <div className="windows-badge-separator" />

  <div className="windows-badge-right">
    <img
      src="/images/nalameds-logo.png"
      alt="Nalameds"
    />
    <span>by Nalameds</span>
  </div>
</div>

<div className="footer-social-title">
              {t.follow}
            </div>

            <div className="footer-socials">
  <a
    href="https://instagram.com/nalameds"
    target="_blank"
    rel="noreferrer"
    aria-label="Instagram Nalameds"
    className="social-instagram"
  >
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle
        cx="12"
        cy="12"
        r="4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle
        cx="17.5"
        cy="6.5"
        r="1.2"
        fill="currentColor"
      />
    </svg>
  </a>

  <a
    href={`https://wa.me/${DEMO_NUMBER}`}
    target="_blank"
    rel="noreferrer"
    aria-label="WhatsApp Nalameds"
    className="social-whatsapp"
  >
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        d="M20.52 3.48A11.84 11.84 0 0 0 12.08 0C5.55 0 .23 5.32.23 11.85c0 2.09.55 4.13 1.59 5.93L0 24l6.36-1.67a11.82 11.82 0 0 0 5.72 1.46h.01c6.53 0 11.84-5.32 11.84-11.85 0-3.16-1.23-6.13-3.41-8.46ZM12.09 21.4h-.01a9.55 9.55 0 0 1-4.87-1.33l-.35-.21-3.77.99 1.01-3.67-.23-.38a9.53 9.53 0 0 1-1.46-5.08c0-5.27 4.29-9.56 9.57-9.56 2.55 0 4.94.99 6.74 2.8a9.5 9.5 0 0 1 2.8 6.76c0 5.27-4.29 9.56-9.55 9.68Zm5.25-7.17c-.29-.15-1.73-.85-2-.94-.27-.1-.47-.15-.67.15-.2.29-.76.94-.93 1.13-.17.2-.34.22-.63.07-.29-.14-1.24-.46-2.36-1.46-.87-.78-1.46-1.73-1.63-2.02-.17-.29-.02-.45.13-.59.13-.13.29-.34.44-.51.15-.17.2-.29.3-.49.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.91-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.29-1.04 1.02-1.04 2.48s1.06 2.87 1.21 3.07c.15.2 2.04 3.11 4.94 4.36.69.3 1.22.48 1.64.62.69.22 1.32.19 1.82.12.55-.08 1.73-.71 1.97-1.39.24-.68.24-1.26.17-1.38-.07-.12-.27-.2-.56-.35Z"
      />
    </svg>
  </a>
</div>
          </div>

          {/* Kolom 2 */}
          <div className="footer-reference-column">
            <h3>{t.features}</h3>

            {content.features
              .map((item, index) => (
                <Link
                  key={
                    featureSlugs[index]
                  }
                  href={`/fitur/${featureSlugs[index]}`}
                >
                  {language === "id"
                    ? item.title
                    : featureEnglish[
                        featureSlugs[index]
                      ]?.title ??
                      item.title}
                </Link>
              ))}
          </div>

          {/* Kolom 3 */}
          <div className="footer-reference-column">
            <h3>{t.roles}</h3>

            <Link href="/peran/casemix">
              CaseMix
            </Link>

            <Link href="/peran/case-manajer">
              Case Manajer
            </Link>

            <Link href="/peran/dpjp-manajemen">
              DPJP &amp; Manajemen
            </Link>

            <Link href="/artikel">
              {t.articles}
            </Link>

            <Link href="/#testimoni">
              {language === "id"
                ? "Cerita & pengalaman"
                : "Stories & experiences"}
            </Link>

            <div className="footer-hotline">
              <span className="footer-hotline-label">
                {t.demo}
              </span>

              <a
                href={`https://wa.me/${DEMO_NUMBER}`}
                target="_blank"
                rel="noreferrer"
                className="footer-hotline-number"
              >
                0858-0024-1340
              </a>

              <span>
                WhatsApp
              </span>
            </div>
          </div>

          {/* Kolom 4 — Contact Nalameds */}
          <div className="footer-review-panel">
            <h3>
              {language === "id"
                ? "Kontak Nalameds"
                : "Contact Nalameds"}
            </h3>

            <div className="footer-contact-card">
              <a
                href="https://instagram.com/nalameds"
                target="_blank"
                rel="noreferrer"
              >
                <span>Instagram</span>
                <strong>@nalameds</strong>
              </a>

              <a
                href={`https://wa.me/${DEMO_NUMBER}`}
                target="_blank"
                rel="noreferrer"
              >
                <span>WhatsApp</span>
                <strong>0858-0024-1340</strong>
              </a>

              {content.contact.email && (
                <a
                  href={`mailto:${content.contact.email}`}
                >
                  <span>Email</span>
                  <strong>{content.contact.email}</strong>
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="wrap footer-bottom-reference">
          <span>
            {content.footer.copyright}
          </span>

          <div>
            <Link href="/">
              {t.backHome}
            </Link>

            <Link href="/#kontak">
              {t.contact}
            </Link>

            <Link href="/privacy-policy">
              {language === "id"
                ? "Privasi"
                : "Privacy"}
            </Link>

            <Link href="/terms">
              {language === "id"
                ? "Syarat & Ketentuan"
                : "Terms"}
            </Link>
          </div>
        </div>
      </footer>

      {/* =====================================================
          DEMO DIALOG
          ===================================================== */}
      <Dialog
        open={demoOpen}
        onOpenChange={setDemoOpen}
      >
        <DialogContent className="content-dialog shell-demo-dialog">
          <DialogTitle>
            {t.demoTitle}
          </DialogTitle>

          <DialogDescription>
            {t.demoDescription}
          </DialogDescription>

          <div className="demo-form">
            <label>
              <span>
                {t.hospital}
              </span>

              <input
                value={hospitalName}
                onChange={(event) =>
                  setHospitalName(
                    event.target.value,
                  )
                }
                placeholder={
                  t.hospitalPlaceholder
                }
              />
            </label>

            <label>
              <span>
                {t.hospitalType}
              </span>

              <select
                value={hospitalType}
                onChange={(event) =>
                  setHospitalType(
                    event.target.value,
                  )
                }
              >
                <option value="">
                  {
                    t.hospitalTypePlaceholder
                  }
                </option>

                <option value="Tipe A">
                  Tipe A
                </option>

                <option value="Tipe B">
                  Tipe B
                </option>

                <option value="Tipe C">
                  Tipe C
                </option>

                <option value="Tipe D">
                  Tipe D
                </option>

                <option value="Klinik">
                  Klinik
                </option>

                <option value="Lainnya">
                  Lainnya
                </option>
              </select>
            </label>

            <div className="demo-actions">
              <button
                type="button"
                className="btn outline"
                onClick={() =>
                  setDemoOpen(false)
                }
              >
                Batal
              </button>

              <button
                type="button"
                className="btn green"
                disabled={
                  !hospitalName.trim() ||
                  !hospitalType
                }
                onClick={submitDemo}
              >
                <MessageCircle size={17} />
                {t.continue}
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}