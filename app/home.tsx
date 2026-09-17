"use client";

import Link from "@/components/PlainLink";
import { useEffect, useMemo, useState } from "react";
import CaseManAssistant from "@/components/CaseManAssistant";
import {
  ArrowDownToLine,
  ArrowUp,
  BookOpen,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  FileCheck2,
  FileText,
  Hospital,
  Mail,
  Menu,
  MessageCircle,
  Monitor,
  Pause,
  Pencil,
  Play,
  Search,
  Stethoscope,
  Wallet,
  X,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

import defaults from "./content.json";
import { safeUrl, setField, validateContent } from "./content-utils";
import {
  articleBody,
  articles,
  featureEnglish,
  featureSlugs,
  roleEnglish,
  roleSlugs,
} from "./site-data";

type Content = typeof defaults;
type Language = "id" | "en";
type Detail = { title: string; text: string };
type HomeProps = { showEditor?: boolean };

const STORAGE_KEY = "caseman-home-content-v2";
const LANGUAGE_KEY = "caseman-language-v1";
const DEMO_NUMBER = "6285800241340";

const icons = {
  census: Hospital,
  clinical: Stethoscope,
  form: ClipboardList,
  claim: FileCheck2,
  audit: Wallet,
  report: FileText,
};

const labels: Record<string, string> = {
  brand: "Identitas",
  navigation: "Navigasi",
  slides: "Banner",
  welcome: "Sambutan",
  about: "Tentang CaseMan",
  features: "Fitur",
  roles: "Peran",
  guides: "Panduan",
  download: "Unduhan",
  faqs: "Pertanyaan",
  contact: "Kontak",
  footer: "Footer",
  title: "Judul",
  text: "Teks",
  image: "Gambar",
  alt: "Deskripsi gambar",
  name: "Nama",
  tagline: "Tagline",
  logo: "Logo / maskot",
  platform: "Platform",
  eyebrow: "Teks pembuka",
  cta: "Teks tombol",
  short: "Ringkasan",
  body: "Isi lengkap",
  detail: "Detail",
  question: "Pertanyaan",
  answer: "Jawaban",
  url: "Tautan installer",
  email: "Email",
  whatsapp: "WhatsApp (kode negara + nomor)",
  button: "Teks tombol",
  unavailable: "Pesan saat belum tersedia",
  note: "Catatan",
  primary: "Tombol utama",
  secondary: "Tombol kedua",
  category: "Kategori",
  copyright: "Hak cipta",
  imageNote: "Keterangan foto",
  featuresTitle: "Judul fitur",
  rolesTitle: "Judul peran",
  guidesTitle: "Judul panduan",
  guidesIntro: "Pengantar panduan",
  faqTitle: "Judul pertanyaan",
};

const testimonialPlaceholders = [
  {
    quote: {
      id: "Area testimoni pengguna CaseMan akan diisi setelah memperoleh pengalaman penggunaan yang terverifikasi.",
      en: "Verified CaseMan user stories will be added after real user experience is available.",
    },
    name: { id: "Pengguna CaseMan", en: "CaseMan User" },
    role: { id: "Rumah Sakit", en: "Hospital" },
  },
  {
    quote: {
      id: "Bagian ini disiapkan untuk menampilkan pengalaman nyata tim rumah sakit setelah implementasi CaseMan.",
      en: "This space is prepared for real hospital team experiences after CaseMan implementation.",
    },
    name: { id: "Cerita Pengguna", en: "User Story" },
    role: { id: "Case Management", en: "Case Management" },
  },
  {
    quote: {
      id: "Testimoni nyata akan membuat bagian ini semakin kuat saat sudah tersedia.",
      en: "Real testimonials will make this section stronger once they are available.",
    },
    name: { id: "Segera Hadir", en: "Coming Soon" },
    role: { id: "CaseMan", en: "CaseMan" },
  },
];

const ui = {
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
    support: "Lihat dukungan",
    featureDetail: "Lihat detail",
    guideAll: "Semua Panduan",
    readGuide: "Baca panduan",
    help: "Bantuan penggunaan",
    contactTitle: "Kontak Nalameds",
    instagram: "Instagram Nalameds",
    whatsapp: "WhatsApp Nalameds",
    demoMessage:
      "Halo Nalameds, saya dari RS [Nama RS] (Tipe [Tipe RS]). Saya ingin jadwalkan demo untuk melihat peluang klaim BPJS kami.",
    back: "Kembali ke beranda",
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
    support: "View support",
    featureDetail: "View details",
    guideAll: "All Guides",
    readGuide: "Read guide",
    help: "Help & guidance",
    contactTitle: "Contact Nalameds",
    instagram: "Nalameds Instagram",
    whatsapp: "Nalameds WhatsApp",
    demoMessage:
      "Hello Nalameds, I am from [Hospital Name] ([Hospital Type]). I would like to schedule a demo to explore our BPJS claim opportunities.",
    back: "Back to home",
  },
} as const;

function downloadFile(fileName: string, text: string) {
  const url = URL.createObjectURL(
    new Blob([text], { type: "application/json" }),
  );
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = fileName;
  anchor.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function EditorFields({
  value,
  path = [],
  change,
}: {
  value: unknown;
  path?: string[];
  change: (path: string[], value: string) => void;
}) {
  if (!value || typeof value !== "object") return null;

  return Object.entries(value as Record<string, unknown>)
    .filter(([key]) => key !== "icon")
    .map(([key, currentValue]) => {
      const nextPath = [...path, key];
      const id = `field-${nextPath.join("-")}`;
      const label =
        labels[key] ??
        (Number.isNaN(Number(key))
          ? key
          : `Item ${Number(key) + 1}`);

      if (typeof currentValue !== "string") {
        return (
          <details className="edit-group" key={id}>
            <summary>{label}</summary>
            <EditorFields
              value={currentValue}
              path={nextPath}
              change={change}
            />
          </details>
        );
      }

      return (
        <div className="edit-field" key={id}>
          <label htmlFor={id}>{label}</label>
          <textarea
            id={id}
            rows={currentValue.length > 140 ? 4 : 2}
            value={currentValue}
            onChange={(event) =>
              change(nextPath, event.target.value)
            }
          />

          {["image", "logo"].includes(key) && (
            <label className="upload">
              Pilih gambar dari komputer
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp,image/gif"
                onChange={async (event) => {
                  const file = event.target.files?.[0];
                  if (!file) return;

                  if (file.size > 2_500_000) {
                    event.target.setCustomValidity(
                      "Maksimal 2,5 MB per gambar.",
                    );
                    event.target.reportValidity();
                    return;
                  }

                  event.target.setCustomValidity("");
                  const reader = new FileReader();
                  reader.onload = () =>
                    change(nextPath, String(reader.result));
                  reader.readAsDataURL(file);
                }}
              />
            </label>
          )}
        </div>
      );
    });
}

export default function Home({ showEditor = false }: HomeProps) {
  const [content, setContent] = useState<Content>(defaults);
  const [draft, setDraft] = useState<Content>(defaults);
  const [editorOpen, setEditorOpen] = useState(false);
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [detail, setDetail] = useState<Detail | null>(null);
  const [language, setLanguage] = useState<Language>("id");
  const [demoOpen, setDemoOpen] = useState(false);
  const [hospitalName, setHospitalName] = useState("");
  const [hospitalType, setHospitalType] = useState("");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (validateContent(parsed, defaults)) setContent(parsed);
      }

      const savedLanguage = localStorage.getItem(LANGUAGE_KEY);
      if (savedLanguage === "en") setLanguage("en");
    } catch {
      setMessage(
        "Penyimpanan browser tidak tersedia. Anda tetap dapat menggunakan website.",
      );
    }
  }, []);

  useEffect(() => {
    if (
      paused ||
      editorOpen ||
      detail ||
      searchOpen ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const timer = window.setInterval(() => {
      setSlide((current) => (current + 1) % content.slides.length);
    }, 7000);

    return () => window.clearInterval(timer);
  }, [paused, editorOpen, detail, searchOpen, content.slides.length]);

  const t = ui[language];
  const current = content;
  const hero = current.slides[slide];

  const localizedFeatures = current.features.map((item, index) => {
    if (language === "id") return item;
    const key = featureSlugs[index];
    const english = featureEnglish[key];
    return english ? { ...item, ...english } : item;
  });

  const localizedRoles = current.roles.map((role) => {
    if (language === "id") return role;
    return roleEnglish[role.title as keyof typeof roleEnglish] ?? role;
  });

  const heroEnglish = [
    {
      eyebrow: "Supporting care delivery, from start to finish",
      title: "One assistant.\nMore connected collaboration.",
      text: "CaseMan supports Case Managers, CaseMix teams, and attending doctors across patient monitoring, service documentation, clinical review, and claim preparation.",
      cta: "Explore CaseMan features",
    },
    {
      eyebrow: "For Case Managers and hospital management",
      title: "Monitor patients.\nFollow up with clarity.",
      text: "Manage inpatient census, review patients by ward, document Case Manager forms, and use reports to support service monitoring and follow-up.",
      cta: "Explore monitoring features",
    },
    {
      eyebrow: "For CaseMix teams and attending doctors",
      title: "From medical records\nto claim preparation.",
      text: "Review ERM information, coding suggestions, billing audits, and E-Claim bridging together with responsible hospital staff.",
      cta: "Explore CaseMix support",
    },
  ][slide] ?? null;

  const localizedHero =
    language === "en" && heroEnglish
      ? { ...hero, ...heroEnglish }
      : hero;

  const articleResults = articles.map((article) => ({
    title: language === "en" ? article.titleEn : article.title,
    text: language === "en" ? article.excerptEn : article.excerpt,
    href: `/artikel/${article.slug}`,
  }));

  const results = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase(
      language === "id" ? "id" : "en",
    );

    if (!normalized) return [];

    return [
      ...localizedFeatures.map((item, index) => ({
        title: item.title,
        text: item.body,
        href: `/fitur/${featureSlugs[index]}`,
      })),
      ...current.guides.map((item) => ({
        title: item.title,
        text: item.body,
        href: "#panduan",
      })),
      ...articleResults,
      ...current.faqs.map((item) => ({
        title: item.question,
        text: item.answer,
        href: "#faq",
      })),
    ].filter((item) =>
      `${item.title} ${item.text}`
        .toLocaleLowerCase(language === "id" ? "id" : "en")
        .includes(normalized),
    );
  }, [query, language, localizedFeatures, current.guides, current.faqs, articleResults]);

  const setSiteLanguage = (next: Language) => {
    setLanguage(next);
    localStorage.setItem(LANGUAGE_KEY, next);
  };

  const showDetail = (title: string, text: string) =>
    setDetail({ title, text });

  const openDemo = () => {
    setHospitalName("");
    setHospitalType("");
    setDemoOpen(true);
  };

  const submitDemo = () => {
    const name = hospitalName.trim() || (language === "id" ? "Nama RS" : "Hospital Name");
    const type = hospitalType || (language === "id" ? "Tipe RS" : "Hospital Type");
    const message = encodeURIComponent(
      language === "id"
        ? `Halo Nalameds, saya dari ${name} (${type}). Saya ingin jadwalkan demo untuk melihat peluang klaim BPJS kami.`
        : `Hello Nalameds, I am from ${name} (${type}). I would like to schedule a demo to explore our BPJS claim opportunities.`,
    );

    window.open(
      `https://wa.me/${DEMO_NUMBER}?text=${message}`,
      "_blank",
      "noopener,noreferrer",
    );

    setDemoOpen(false);
  };

  const downloadInstaller = () => {
    const url = safeUrl(current.download.url);
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
      return;
    }
    showDetail(
      language === "en" ? "Windows application" : current.download.title,
      current.download.unavailable,
    );
  };

  const openContact = () => {
    showDetail(
      language === "en" ? "Contact Nalameds" : current.contact.title,
      current.contact.text,
    );
  };

  const saveContent = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
      setContent(draft);
      setMessage(
        "Tersimpan di browser ini. Ekspor JSON untuk menyimpan cadangan.",
      );
      setEditorOpen(false);
    } catch {
      setMessage(
        "Penyimpanan penuh atau tidak tersedia. Ekspor JSON untuk menyimpan perubahan.",
      );
    }
  };

  const handleImport = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      if (file.size > 15_000_000) throw new Error();
      const imported = JSON.parse(await file.text());
      if (!validateContent(imported, defaults)) throw new Error();
      setDraft(imported);
      setMessage(
        "Konten diimpor ke panel. Klik Simpan untuk menerapkan.",
      );
    } catch {
      setMessage(
        "File tidak valid atau strukturnya tidak sesuai versi website saat ini.",
      );
    } finally {
      event.target.value = "";
    }
  };

  return (
    <>
      <a className="skip" href="#main">
        Lewati ke konten
      </a>

      <header id="top">
        <div className="topbar">
          <div className="wrap topline">
            <Link href="#top" className="brand">
              <img
                src={safeUrl(current.brand.logo, true)}
                alt="CaseMan"
              />
              <span>
                <strong>{current.brand.name}</strong>
                <small>{current.brand.tagline}</small>
              </span>
            </Link>

            <div className="topinfo">
              <span>
                <Monitor size={21} />
                <span>
                  {language === "id"
                    ? current.brand.platform
                    : "Windows application for hospitals"}
                  <strong>Case Manager · CaseMix · DPJP</strong>
                </span>
              </span>

              <button className="btn cyan" onClick={openDemo}>
                <MessageCircle size={17} />
                {t.demo}
              </button>

              <button
                className="btn green"
                onClick={downloadInstaller}
              >
                <ArrowDownToLine size={17} />
                {language === "id"
                  ? current.navigation.download
                  : "Windows App"}
              </button>
            </div>

            <div className="hidden md:flex items-center gap-2 lg:hidden">
              <button
                className="rounded border border-slate-300 px-2 py-1 text-xs"
                onClick={() => setSiteLanguage(language === "id" ? "en" : "id")}
              >
                {language.toUpperCase()}
              </button>
            </div>

            <button
              className="menu-toggle"
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
            <a href="#tentang" onClick={() => setMobileOpen(false)}>
              {t.about}
            </a>

            <details className="navdrop">
              <summary>
                {t.features}
                <ChevronDown size={14} />
              </summary>
              <div>
                {localizedFeatures.map((item, index) => (
                  <Link
                    key={item.title}
                    href={`/fitur/${featureSlugs[index]}`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </details>

            <details className="navdrop">
              <summary>
                {t.roles}
                <ChevronDown size={14} />
              </summary>
              <div>
                {current.roles.map((role, index) => {
                  const slug = roleSlugs[
                    role.title as keyof typeof roleSlugs
                  ];
                  const label = localizedRoles[index].title;
                  return (
                    <Link
                      key={role.title}
                      href={`/peran/${slug}`}
                      onClick={() => setMobileOpen(false)}
                    >
                      {label}
                    </Link>
                  );
                })}
              </div>
            </details>

            <a href="#testimoni">{language === "id" ? "Cerita & pengalaman" : "Stories & experiences"}</a><a href="#panduan" onClick={() => setMobileOpen(false)}>
              {t.guides}
            </a>

            <Link
              href="/artikel"
              onClick={() => setMobileOpen(false)}
            >
              {t.articles}
            </Link>

            <button
  type="button"
  onClick={() => {
    setMobileOpen(false);
    downloadInstaller();
  }}
>
  {t.download}
</button>

            <a href="#kontak" onClick={() => setMobileOpen(false)}>
              {t.contact}
            </a>

            <div className="flex items-center gap-2">
              <form
                className="search"
                onSubmit={(event) => {
                  event.preventDefault();
                  setSearchOpen(true);
                }}
              >
                <input
                  aria-label="Cari fitur atau panduan"
                  placeholder={t.search}
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                />
                <button aria-label="Cari" type="submit">
                  <Search size={19} />
                </button>
              </form>

              <button
                className="rounded-full border border-[#a5ced8] px-3 py-2 text-xs font-bold text-[#14768d]"
                onClick={() =>
                  setSiteLanguage(language === "id" ? "en" : "id")
                }
                title="Switch language"
              >
                {language === "id" ? "EN" : "ID"}
              </button>
            </div>
          </div>
        </nav>
      </header>

      <main id="main">
        {/* HERO */}
        <section
          className="hero"
          aria-roledescription="carousel"
          aria-label="Pengenalan CaseMan"
        >
          <img
            className="hero-photo"
            src={safeUrl(localizedHero.image, true)}
            alt={localizedHero.alt}
          />
          <div className="hero-wash" />

          <div className="wrap hero-inner">
            <div className="hero-copy">
              <p className="eyebrow">{localizedHero.eyebrow}</p>
              <h1>{localizedHero.title}</h1>
              <p>{localizedHero.text}</p>

              <div className="flex flex-wrap gap-3">
                <a className="btn cyan" href="#fitur">
                  {localizedHero.cta}
                  <ChevronRight size={18} />
                </a>
                <button
                  className="btn green"
                  onClick={openDemo}
                >
                  <MessageCircle size={17} />
                  {t.demo}
                </button>
              </div>
            </div>
          </div>

          <button
            className="hero-prev"
            aria-label="Banner sebelumnya"
            onClick={() =>
              setSlide(
                (value) =>
                  (value + current.slides.length - 1) %
                  current.slides.length,
              )
            }
          >
            <ChevronLeft />
          </button>

          <button
            className="hero-next"
            aria-label="Banner berikutnya"
            onClick={() =>
              setSlide(
                (value) => (value + 1) % current.slides.length,
              )
            }
          >
            <ChevronRight />
          </button>

          <div className="hero-controls">
            {current.slides.map((_, index) => (
              <button
                key={index}
                aria-label={`Banner ${index + 1}`}
                aria-pressed={slide === index}
                className={slide === index ? "active" : ""}
                onClick={() => setSlide(index)}
              />
            ))}

            <button
              className="pause"
              onClick={() => setPaused((value) => !value)}
              aria-label={
                paused
                  ? "Putar banner otomatis"
                  : "Jeda banner otomatis"
              }
            >
              {paused ? <Play size={14} /> : <Pause size={14} />}
            </button>
          </div>
        </section>

        {/* WELCOME */}
        <section className="wrap welcome">
          <div className="welcome-card">
            <p>
              {language === "id"
                ? current.welcome.title
                : "Welcome to CaseMan"}
            </p>
            <h2>
              {language === "id"
                ? current.welcome.text
                : "A digital companion for hospital Case Management, clinical, and management teams."}
            </h2>
            <div>
              <a href="#panduan">
                <BookOpen size={18} />
                {language === "id"
                  ? current.welcome.primary
                  : "User Guide"}
              </a>
              <a href="#aplikasi">
                <Monitor size={18} />
                {language === "id"
                  ? current.welcome.secondary
                  : "Application Info"}
              </a>
            </div>
          </div>

          <div className="role-preview">
            {localizedRoles.map((role, index) => {
              const original = current.roles[index];
              const slug = roleSlugs[
                original.title as keyof typeof roleSlugs
              ];
              return (
                <Link key={original.title} href={`/peran/${slug}`}>
                  {index === 0 ? (
                    <ClipboardList />
                  ) : index === 1 ? (
                    <FileCheck2 />
                  ) : (
                    <Stethoscope />
                  )}
                  <strong>{role.title}</strong>
                  <span>
                    {t.support}
                    <ChevronRight size={14} />
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ABOUT */}
        <section id="tentang" className="wrap about section">
          <div>
            <p className="eyebrow">
              {language === "id" ? current.about.eyebrow : "About CaseMan"}
            </p>
            <h2>
              {language === "id"
                ? current.about.title
                : "Supporting teams.\nConnecting care workflows."}
            </h2>
            <p>
              {language === "id"
                ? current.about.text
                : "CaseMan is a Windows-based Smart Assistant for Case Management. It is designed to help hospital teams follow the patient journey, review available clinical information, document services, and support claim preparation in a more structured workflow."}
            </p>
            <p className="note">
              {language === "id"
                ? current.about.note
                : "CaseMan is a support tool within the hospital workflow. Analysis and suggestions should be reviewed by qualified professionals according to role, authority, procedures, and hospital policy."}
            </p>
            <a className="text-link" href="#fitur">
              {language === "id"
                ? "Lihat fitur aplikasi"
                : "Explore application features"}
              <ChevronRight size={17} />
            </a>
          </div>

          <figure>
            <img
              loading="lazy"
              src={safeUrl(current.about.image, true)}
              alt={current.about.alt}
            />
            <figcaption>{current.footer.imageNote}</figcaption>
          </figure>
        </section>

        {/* FEATURES */}
        <section id="fitur" className="features-section home-hidden-section">
          <div className="wrap section">
            <div className="section-head">
              <div>
                <p className="eyebrow">CaseMan Features</p>
                <h2>
                  {language === "id"
                    ? current.featuresTitle
                    : "Features that support the CaseMan workflow"}
                </h2>
              </div>
              <span className="subtle">
                {language === "id"
                  ? "Dari analisis hingga laporan"
                  : "From analysis to reporting"}
              </span>
            </div>

            <div className="feature-grid">
              {localizedFeatures.map((item, index) => {
                const Icon =
                  icons[item.icon as keyof typeof icons] ?? FileText;
                return (
                  <article className="feature" key={item.title}>
                    <Icon />
                    <h3>{item.title}</h3>
                    <p>{item.short}</p>
                    <Link
                      className="text-link"
                      href={`/fitur/${featureSlugs[index]}`}
                    >
                      {t.featureDetail}
                      <ChevronRight size={15} />
                    </Link>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ROLES */}
        <section id="peran" className="role-band home-hidden-section">
          <div className="wrap">
            <h2>
              {language === "id"
                ? current.rolesTitle
                : "One workflow, multiple roles"}
            </h2>
            <div>
              {localizedRoles.map((role, index) => {
                const original = current.roles[index];
                const slug = roleSlugs[
                  original.title as keyof typeof roleSlugs
                ];
                return (
                  <Link
                    key={original.title}
                    href={`/peran/${slug}`}
                  >
                    <span className="role-number">0{index + 1}</span>
                    <h3>{role.title}</h3>
                    <p>{role.text}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* GUIDES */}
        <section id="panduan" className="wrap section guides home-hidden-section">
          <p className="eyebrow">
            {language === "id" ? "Referensi penggunaan" : "User reference"}
          </p>
          <h2>
            {language === "id"
              ? current.guidesTitle
              : "Guides for hospital teams"}
          </h2>
          <p>
            {language === "id"
              ? current.guidesIntro
              : "Explore CaseMan workflows by role and activity."}
          </p>

          <Tabs defaultValue="all">
            <TabsList className="guide-tabs" variant="line">
              <TabsTrigger value="all">{t.guideAll}</TabsTrigger>
              {current.guides.map((guide, index) => (
                <TabsTrigger key={index} value={String(index)}>
                  {language === "en" && guide.category === "Case Manajer"
                    ? "Case Manager"
                    : language === "en" && guide.category === "DPJP & Manajemen"
                      ? "Attending Doctor & Management"
                      : guide.category}
                </TabsTrigger>
              ))}
            </TabsList>

            {["all", ...current.guides.map((_, index) => String(index))].map(
              (value) => (
                <TabsContent key={value} value={value}>
                  <div className="guide-grid">
                    {current.guides
                      .filter(
                        (_, index) =>
                          value === "all" || String(index) === value,
                      )
                      .map((guide) => (
                        <article className="guide-card" key={guide.title}>
                          <button
                            className="guide-image"
                            aria-label={guide.title}
                            onClick={() =>
                              showDetail(guide.title, guide.body)
                            }
                          >
                            <img
                              loading="lazy"
                              src={safeUrl(guide.image, true)}
                              alt={`Ilustrasi ${guide.category}`}
                            />
                          </button>
                          <div>
                            <span className="category">
                              {language === "en" &&
                              guide.category === "Case Manajer"
                                ? "Case Manager"
                                : language === "en" &&
                                    guide.category === "DPJP & Manajemen"
                                  ? "Attending Doctor & Management"
                                  : guide.category}
                            </span>
                            <h3>
                              <button
                                onClick={() =>
                                  showDetail(guide.title, guide.body)
                                }
                              >
                                {guide.title}
                              </button>
                            </h3>
                            <p>{guide.text}</p>
                            <button
                              className="text-link"
                              onClick={() =>
                                showDetail(guide.title, guide.body)
                              }
                            >
                              {t.readGuide}
                              <ChevronRight size={16} />
                            </button>
                          </div>
                        </article>
                      ))}
                  </div>
                </TabsContent>
              ),
            )}
          </Tabs>
        </section>

        {/* ARTICLES */}
        <section className="features-section home-hidden-section" id="artikel">
          <div className="wrap section">
            <div className="section-head">
              <div>
                <p className="eyebrow">{t.articles}</p>
                <h2>
                  {language === "id"
                    ? "Wawasan seputar CaseMan"
                    : "Insights around CaseMan"}
                </h2>
              </div>
              <Link className="text-link" href="/artikel">
                {language === "id" ? "Lihat semua artikel" : "View all articles"}
                <ChevronRight size={15} />
              </Link>
            </div>

            <div className="guide-grid">
              {articles.map((article) => (
                <article className="guide-card" key={article.slug}>
                  <div>
                    <span className="category">CaseMan</span>
                    <h3>
                      <Link href={`/artikel/${article.slug}`}>
                        {language === "en" ? article.titleEn : article.title}
                      </Link>
                    </h3>
                    <p>
                      {language === "en"
                        ? article.excerptEn
                        : article.excerpt}
                    </p>
                    <Link
                      className="text-link"
                      href={`/artikel/${article.slug}`}
                    >
                      {language === "id" ? "Baca artikel" : "Read article"}
                      <ChevronRight size={16} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS / STORIES */}
        <section
          id="testimoni"
          className="testimonial-section"
          aria-labelledby="testimonial-heading"
        >
          <div className="wrap testimonial-wrap">
            <div className="testimonial-intro">
              <div className="testimonial-image-wrap">
                <img
                  loading="lazy"
                  src={safeUrl(current.about.image, true)}
                  alt={
                    language === "id"
                      ? "Ilustrasi tim rumah sakit"
                      : "Hospital team illustration"
                  }
                />
              </div>

              <p className="eyebrow">
                {language === "id"
                  ? "Cerita & pengalaman"
                  : "Stories & experiences"}
              </p>

              <h2 id="testimonial-heading">
                {language === "id"
                  ? "Pengalaman tim rumah sakit bersama CaseMan"
                  : "Hospital team experiences with CaseMan"}
              </h2>

              <p>
                {language === "id"
                  ? "Area ini disiapkan untuk menampilkan pengalaman penggunaan CaseMan yang nyata dan terverifikasi."
                  : "This area is prepared for real, verified CaseMan user experiences."}
              </p>

              <button
                className="btn cyan"
                type="button"
                onClick={openDemo}
              >
                <MessageCircle size={18} />
                {t.demo}
              </button>
            </div>

            <div className="testimonial-list">
              {testimonialPlaceholders.map((item) => (
                <article
                  className="testimonial-card"
                  key={item.name.id}
                >
                  <div className="testimonial-quote">“</div>

                  <p>
                    {language === "id"
                      ? item.quote.id
                      : item.quote.en}
                  </p>

                  <div className="testimonial-meta">
                    <div className="testimonial-avatar">
                      <MessageCircle size={18} />
                    </div>

                    <div>
                      <strong>
                        {language === "id"
                          ? item.name.id
                          : item.name.en}
                      </strong>

                      <span>
                        {language === "id"
                          ? item.role.id
                          : item.role.en}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* DOWNLOAD */}
        <section id="aplikasi" className="download-section home-hidden-section">
          <div className="wrap download-inner">
            <div>
              <p className="eyebrow">
                {language === "id"
                  ? current.download.eyebrow
                  : "CaseMan for Windows"}
              </p>
              <h2>
                {language === "id"
                  ? current.download.title
                  : "Your work assistant,\non Windows."}
              </h2>
              <p>
                {language === "id"
                  ? current.download.text
                  : "Use CaseMan in your hospital work environment with user access and integration configuration prepared with your administrator."}
              </p>
              <button className="btn cyan" onClick={downloadInstaller}>
                <ArrowDownToLine size={19} />
                {language === "id"
                  ? current.download.button
                  : "Download for Windows"}
              </button>
              {!safeUrl(current.download.url) && (
                <small>
                  {language === "id"
                    ? "Installer tersedia melalui administrator."
                    : "Installer availability is coordinated with the administrator."}
                </small>
              )}
            </div>
            <img
              loading="lazy"
              src={safeUrl(current.download.image, true)}
              alt="CaseMan mascot"
            />
          </div>
        </section>

        {/* FAQ */}
        <section className="wrap section faq home-hidden-section" id="faq">
          <div>
            <p className="eyebrow">{t.help}</p>
            <h2>
              {language === "id"
                ? current.faqTitle
                : "Frequently asked questions"}
            </h2>
            <MessageCircle size={52} />
          </div>
          <div>
            {current.faqs.map((item) => (
              <details key={item.question}>
                <summary>
                  {item.question}
                  <ChevronDown size={19} />
                </summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section id="kontak" className="contact-section">
          <div className="wrap">
            <div>
              <h2>{language === "id" ? current.contact.title : "Talk to Nalameds"}</h2>
              <p>{current.contact.text}</p>
              <div className="mt-4 flex flex-wrap gap-4 text-sm text-white">
                <a href="https://instagram.com/nalameds" target="_blank" rel="noreferrer">
                  Instagram: @nalameds
                </a>
                <a href={`https://wa.me/${DEMO_NUMBER}`} target="_blank" rel="noreferrer">
                  WhatsApp: 0858-0024-1340
                </a>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <button className="btn white" onClick={openDemo}>
                <MessageCircle size={19} />
                {t.demo}
              </button>
              <button className="btn white" onClick={openContact}>
                <MessageCircle size={19} />
                {t.contactTitle}
              </button>
            </div>
          </div>
        </section>
        <CaseManAssistant />
      </main>

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="wrap footer-reference-grid">
          {/* Brand + social */}
          <div className="footer-brand-panel">
            <Link href="#top" className="footer-brand-large">
              <img
                src={safeUrl(current.brand.logo, true)}
                alt=""
              />
              <span>
                <strong>{current.brand.name}</strong>
                <small>{current.brand.tagline}</small>
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
              className="btn green footer-demo"
              type="button"
              onClick={openDemo}
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
      src="/images/nalameds-logo.jpeg"
      alt="Nalameds"
    />
    <span>by Nalameds</span>
  </div>
</div>

            <div className="footer-social-title">
              {language === "id" ? "Ikuti Nalameds" : "Follow Nalameds"}
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

          {/* Services */}
          <div className="footer-reference-column">
            <h3>
              {language === "id"
                ? "Fitur Aplikasi"
                : "Application Features"}
            </h3>

            {localizedFeatures.map((item, index) => (
              <Link
                key={item.title}
                href={`/fitur/${featureSlugs[index]}`}
              >
                {item.title}
              </Link>
            ))}
          </div>

          {/* Roles */}
          <div className="footer-reference-column">
            <h3>
              {language === "id"
                ? "Untuk Tim RS"
                : "For Hospital Teams"}
            </h3>

            <Link href="/peran/casemix">CaseMix</Link>
            <Link href="/peran/case-manajer">Case Manajer</Link>
            <Link href="/peran/dpjp-manajemen">
              DPJP &amp; Manajemen
            </Link>
            <Link href="/artikel">{t.articles}</Link>
            <a href="#testimoni">
              {language === "id"
                ? "Cerita & pengalaman"
                : "Stories & experiences"}
            </a>

            <div className="footer-hotline">
              <strong>
                {language === "id"
                  ? "Jadwalkan Demo"
                  : "Schedule a Demo"}
              </strong>
              <a
                href={`https://wa.me/${DEMO_NUMBER}`}
                target="_blank"
                rel="noreferrer"
              >
                0858-0024-1340
              </a>
              <span>WhatsApp</span>
            </div>
          </div>

          {/* Contact / Reviews */}
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
                <strong>Instagram</strong>
                <span>@nalameds</span>
              </a>

              <a
                href={`https://wa.me/${DEMO_NUMBER}`}
                target="_blank"
                rel="noreferrer"
              >
                <strong>WhatsApp</strong>
                <span>0858-0024-1340</span>
              </a>
            </div>

            <div className="footer-google-card">
              <div className="footer-google-heading">
                <div>
                  <strong>
                    {language === "id"
                      ? "Ulasan Google"
                      : "Google Reviews"}
                  </strong>
                  <span>
                    {language === "id"
                      ? "Profil bisnis dapat ditautkan di sini."
                      : "A business profile can be linked here."}
                  </span>
                </div>
                <span className="google-mark">G</span>
              </div>

              <div className="footer-map-placeholder">
                <div className="map-grid" />
                <div className="map-pin">●</div>
                <span>
                  {language === "id"
                    ? "Lokasi & profil Google"
                    : "Google location & profile"}
                </span>
              </div>

              <a
                className="footer-review-button"
                href={`https://wa.me/${DEMO_NUMBER}`}
                target="_blank"
                rel="noreferrer"
              >
                {language === "id"
                  ? "Tanyakan informasi"
                  : "Ask for information"}
                <ChevronRight size={16} />
              </a>
            </div>
          </div>
        </div>

        <div className="wrap footer-bottom-reference">
          <span>{current.footer.copyright}</span>

          <div>
            <a href="#top">
              {language === "id" ? "Kembali ke atas" : "Back to top"}
            </a>
            <a href="#kontak">
              {language === "id" ? "Kontak" : "Contact"}
            </a>
            {showEditor && (
              <button
                onClick={() => {
                  setDraft(structuredClone(current));
                  setEditorOpen(true);
                  setMessage("");
                }}
              >
                <Pencil size={14} />
                Edit Konten
              </button>
            )}
          </div>
        </div>
      </footer>

      {/* QUICK ACCESS */}
      <div className="quickbar" aria-label="Akses cepat">
        <Link href={`/fitur/${featureSlugs[0]}`}>
          <Hospital />
          <span>
            <strong>
              {language === "id" ? "Semi-Realtime Analisis" : "Semi-Realtime Analysis"}
            </strong>
            <small>
              {language === "id" ? "Analisis pasien" : "Patient analysis"}
            </small>
          </span>
        </Link>

        <Link href={`/fitur/${featureSlugs[5]}`}>
          <ClipboardList />
          <span>
            <strong>
              {language === "id"
                ? "Chat Case Manajer"
                : "Case Manager Chat"}
            </strong>
            <small>
              {language === "id"
                ? "Dukungan case management"
                : "Case management support"}
            </small>
          </span>
        </Link>

        <Link href={`/fitur/${featureSlugs[2]}`}>
          <FileCheck2 />
          <span>
            <strong>
              {language === "id" ? "Auto Koding & e-Klaim" : "Coding & E-Claim"}
            </strong>
            <small>
              {language === "id"
                ? "Persiapan klaim"
                : "Claim preparation"}
            </small>
          </span>
        </Link>

        <button onClick={downloadInstaller}>
          <Monitor />
          <span>
            <strong>{t.download}</strong>
            <small>{language === "id" ? "Informasi aplikasi" : "Application info"}</small>
          </span>
        </button>
      </div>

      <a
        className="back-top"
        href="#top"
        aria-label="Kembali ke atas"
      >
        <ArrowUp size={19} />
      </a>

      {/* DEMO FORM */}
      <Dialog open={demoOpen} onOpenChange={setDemoOpen}>
        <DialogContent className="content-dialog">
          <DialogTitle>
            {language === "id" ? "Jadwalkan Demo CaseMan" : "Schedule a CaseMan Demo"}
          </DialogTitle>
          <DialogDescription>
            {language === "id"
              ? "Isi data singkat berikut agar pesan WhatsApp terkirim lebih lengkap."
              : "Fill in the short form so your WhatsApp message includes the necessary context."}
          </DialogDescription>

          <div className="demo-form">
            <label>
              <span>{language === "id" ? "Nama Rumah Sakit" : "Hospital Name"}</span>
              <input
                value={hospitalName}
                onChange={(event) => setHospitalName(event.target.value)}
                placeholder={language === "id" ? "Contoh: RS PKU Muhammadiyah Wonosobo" : "Example: Hospital Name"}
              />
            </label>

            <label>
              <span>{language === "id" ? "Tipe Rumah Sakit" : "Hospital Type"}</span>
              <select
                value={hospitalType}
                onChange={(event) => setHospitalType(event.target.value)}
              >
                <option value="">{language === "id" ? "Pilih tipe rumah sakit" : "Select hospital type"}</option>
                <option value="Tipe A">Tipe A</option>
                <option value="Tipe B">Tipe B</option>
                <option value="Tipe C">Tipe C</option>
                <option value="Tipe D">Tipe D</option>
                <option value="Klinik">Klinik</option>
                <option value="Lainnya">{language === "id" ? "Lainnya" : "Other"}</option>
              </select>
            </label>

            <button className="btn green" onClick={submitDemo}>
              <MessageCircle size={17} />
              {language === "id" ? "Lanjut ke WhatsApp" : "Continue to WhatsApp"}
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* DETAIL */}
      <Dialog
        open={!!detail}
        onOpenChange={(open) => {
          if (!open) setDetail(null);
        }}
      >
        <DialogContent className="content-dialog">
          <DialogTitle>{detail?.title}</DialogTitle>
          <DialogDescription className="detail-body">
            {detail?.text}
          </DialogDescription>
          {detail?.title === current.contact.title && (
            <div className="contact-links">
              <a
                className="btn green"
                href={`https://wa.me/${DEMO_NUMBER}`}
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle size={17} />
                {t.whatsapp}
              </a>
              <a
                className="btn cyan"
                href="https://instagram.com/nalameds"
                target="_blank"
                rel="noreferrer"
              >
                Instagram @nalameds
              </a>
              {current.contact.email &&
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                  current.contact.email,
                ) && (
                  <a
                    className="btn cyan"
                    href={`mailto:${encodeURIComponent(current.contact.email)}`}
                  >
                    <Mail size={17} />
                    Email
                  </a>
                )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* SEARCH */}
      <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
        <DialogContent className="content-dialog">
          <DialogTitle>
            {language === "id"
              ? "Cari informasi CaseMan"
              : "Search CaseMan information"}
          </DialogTitle>
          <DialogDescription>
            {language === "id"
              ? "Temukan fitur, panduan, artikel, dan jawaban penggunaan."
              : "Find features, guides, articles, and answers."}
          </DialogDescription>
          <input
            className="search-full"
            aria-label="Kata pencarian"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t.search}
          />
          <div className="results">
            {results.length ? (
              results.map((result) => (
                <Link
                  key={`${result.href}-${result.title}`}
                  href={result.href}
                  onClick={() => setSearchOpen(false)}
                >
                  <strong>{result.title}</strong>
                  <span>{result.text.slice(0, 140)}…</span>
                </Link>
              ))
            ) : (
              <p>
                {language === "id"
                  ? "Tidak ada hasil. Coba kata seperti “analisis”, “koding”, atau “laporan”."
                  : "No results. Try terms such as “analysis”, “coding”, or “reports”."}
              </p>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* ADMIN EDITOR */}
      {showEditor && (
        <Sheet open={editorOpen} onOpenChange={setEditorOpen}>
          <SheetContent className="editor">
            <SheetTitle>Edit konten halaman</SheetTitle>
            <SheetDescription>
              Ubah teks, gambar, kontak, dan tautan unduhan. Simpan berlaku di browser ini; ekspor JSON untuk cadangan atau penerbitan ulang.
            </SheetDescription>

            <div className="editor-actions">
              <button className="btn cyan" onClick={saveContent}>
                <Check size={16} />
                Simpan
              </button>

              <button
                className="btn outline"
                onClick={() =>
                  downloadFile(
                    "caseman-content.json",
                    JSON.stringify(draft, null, 2),
                  )
                }
              >
                Ekspor JSON
              </button>

              <label className="btn outline">
                Impor JSON
                <input
                  type="file"
                  accept="application/json,.json"
                  hidden
                  onChange={handleImport}
                />
              </label>
            </div>

            <p className="editor-status" role="status">
              {message}
            </p>

            <div className="editor-fields">
              <EditorFields
                value={draft}
                change={(path, value) =>
                  setDraft((currentDraft) =>
                    setField(currentDraft, path, value),
                  )
                }
              />
            </div>
          </SheetContent>
        </Sheet>
      )}
    </>
  );
}
