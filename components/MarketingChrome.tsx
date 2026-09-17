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

    google: "Ulasan Google",
    googleDesc:
      "Profil bisnis dapat ditautkan di sini.",
    googlePlaceholder:
      "Lokasi & profil Google",

    askInfo: "Tanyakan informasi",

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

    google: "Google Reviews",
    googleDesc:
      "A business profile can be linked here.",
    googlePlaceholder:
      "Google location & profile",

    askInfo: "Ask for information",

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

    const [activeDropdown, setActiveDropdown] = useState<
  "features" | "roles" | null
>(null);

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
        <header
          id="top"
          className="site-shell-header"
        >
        <div className="topbar">
          <div className="wrap topline">
            <Link
              href="/"
              className="brand"
              onClick={() =>
                setMobileOpen(false)
              }
            >
              <img
                src={safeUrl(
                  content.brand.logo,
                  true,
                )}
                alt="CaseMan"
              />

              <span>
                <span className="shell-brand-name">
                  {content.brand.name}
                </span>

                <span className="shell-brand-tagline">
                  {content.brand.tagline}
                </span>
              </span>
            </Link>

            <div className="topinfo">
              <span>
                <Monitor size={21} />

                <span>
                  {language === "id"
                    ? content.brand.platform
                    : "Windows application for hospitals"}

                  <span className="shell-platform-role">
                    Case Manager · CaseMix · DPJP
                  </span>
                </span>
              </span>

              <button
                type="button"
                className="btn cyan"
                onClick={() =>
                  setDemoOpen(true)
                }
              >
                <MessageCircle size={17} />
                {t.demo}
              </button>

              <a
                className="btn green"
                href={downloadHref}
              >
                <ArrowDownToLine
                  size={17}
                />
                {t.download}
              </a>
            </div>

            <button
              type="button"
              className="menu-toggle"
              aria-label={
                mobileOpen
                  ? "Tutup menu"
                  : "Buka menu"
              }
              aria-expanded={mobileOpen}
              onClick={() =>
                setMobileOpen(
                  (value) => !value,
                )
              }
            >
              {mobileOpen ? (
                <X />
              ) : (
                <Menu />
              )}
            </button>
          </div>
        </div>

        <nav
          aria-label="Navigasi utama"
          className={
            mobileOpen
              ? "nav open"
              : "nav"
          }
        >
          <div className="wrap navline">
            <Link
              href="/#tentang"
              onClick={() =>
                setMobileOpen(false)
              }
            >
              {t.about}
            </Link>

            {/* Fitur */}
<div
  className="navdrop"
  onPointerEnter={() => setActiveDropdown("features")}
  onPointerLeave={() => setActiveDropdown(null)}
>
  <button
    type="button"
    className="navdrop-trigger"
    onClick={() =>
      setActiveDropdown((current) =>
        current === "features" ? null : "features",
      )
    }
  >
    {t.features}
    <ChevronDown size={14} />
  </button>

  {activeDropdown === "features" && (
    <div className="navdrop-menu">
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
            onClick={() => {
              setActiveDropdown(null);
              setMobileOpen(false);
            }}
          >
            {label}
          </Link>
        );
      })}
    </div>
  )}
</div>

            {/* Untuk Tim RS */}
<div
  className="navdrop"
  onPointerEnter={() => setActiveDropdown("roles")}
  onPointerLeave={() => setActiveDropdown(null)}
>
  <button
    type="button"
    className="navdrop-trigger"
    onClick={() =>
      setActiveDropdown((current) =>
        current === "roles" ? null : "roles",
      )
    }
  >
    {t.roles}
    <ChevronDown size={14} />
  </button>

  {activeDropdown === "roles" && (
    <div className="navdrop-menu">
      {content.roles.map((role) => {
        const roleKey =
          role.title as keyof typeof roleSlugs;

        const slug = roleSlugs[roleKey];

        return (
          <Link
            key={role.title}
            href={`/peran/${slug}`}
            onClick={() => {
              setActiveDropdown(null);
              setMobileOpen(false);
            }}
          >
            {role.title}
          </Link>
        );
      })}
    </div>
  )}
</div>

            <Link
              href="/#panduan"
              onClick={() =>
                setMobileOpen(false)
              }
            >
              {t.guides}
            </Link>

            <Link
              href="/artikel"
              onClick={() =>
                setMobileOpen(false)
              }
            >
              {t.articles}
            </Link>

            <Link
              href="/#aplikasi"
              onClick={() =>
                setMobileOpen(false)
              }
            >
              {t.download}
            </Link>

            <Link
              href="/#kontak"
              onClick={() =>
                setMobileOpen(false)
              }
            >
              {t.contact}
            </Link>

            <div className="shell-nav-actions">
              <form
                className="search"
                onSubmit={(event) => {
                  event.preventDefault();

                  const cleanQuery =
                    query.trim();

                  if (!cleanQuery) {
                    return;
                  }

                  window.location.href =
                    `/?search=${encodeURIComponent(
                      cleanQuery,
                    )}`;
                }}
              >
                <input
                  value={query}
                  onChange={(event) =>
                    setQuery(
                      event.target.value,
                    )
                  }
                  placeholder={t.search}
                  aria-label={t.search}
                />

                <button
                  type="submit"
                  aria-label={t.search}
                >
                  <Search size={19} />
                </button>
              </form>

              <button
                type="button"
                className="shell-language"
                onClick={
                  switchLanguage
                }
                aria-label={
                  language === "id"
                    ? "Switch to English"
                    : "Ganti ke Bahasa Indonesia"
                }
              >
                {language === "id"
                  ? "EN"
                  : "ID"}
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
  <div className="windows-badge-copy">
    <span>AVAILABLE ON</span>
    <strong>WINDOWS</strong>
    <small>CaseMan Windows Application</small>
  </div>

  <img
    src="/images/nalameds-logo.jpeg"
    alt="Nalameds"
    className="windows-nalameds-logo"
  />
</div>

            <div className="footer-social-title">
              {t.follow}
            </div>

            <div className="footer-socials">
              <a
                href="https://instagram.com/nalameds"
                target="_blank"
                rel="noreferrer"
                className="social-instagram"
                aria-label="Instagram Nalameds"
              >
                IG
              </a>

              <a
                href={`https://wa.me/${DEMO_NUMBER}`}
                target="_blank"
                rel="noreferrer"
                className="social-whatsapp"
                aria-label="WhatsApp Nalameds"
              >
                WA
              </a>
            </div>
          </div>

          {/* Kolom 2 */}
          <div className="footer-reference-column">
            <h3>{t.features}</h3>

            {content.features
              .slice(0, 6)
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

          {/* Kolom 4 */}
          <div className="footer-review-panel">
            <h3>{t.google}</h3>

            <div className="footer-contact-card">
              <a
                href="https://instagram.com/nalameds"
                target="_blank"
                rel="noreferrer"
              >
                <span>
                  Instagram
                </span>

                <strong>
                  @nalameds
                </strong>
              </a>

              <a
                href={`https://wa.me/${DEMO_NUMBER}`}
                target="_blank"
                rel="noreferrer"
              >
                <span>
                  WhatsApp
                </span>

                <strong>
                  0858-0024-1340
                </strong>
              </a>
            </div>

            <div className="footer-google-card">
              <div className="footer-google-heading">
                <div>
                  <strong>
                    {t.google}
                  </strong>

                  <span>
                    {t.googleDesc}
                  </span>
                </div>

                <span className="google-mark">
                  G
                </span>
              </div>

              <div className="footer-map-placeholder">
                <div className="map-grid" />

                <div className="map-pin">
                  ●
                </div>

                <span>
                  {t.googlePlaceholder}
                </span>
              </div>

              <a
                className="footer-review-button"
                href={`https://wa.me/${DEMO_NUMBER}`}
                target="_blank"
                rel="noreferrer"
              >
                {t.askInfo}
                <ChevronRight size={16} />
              </a>
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