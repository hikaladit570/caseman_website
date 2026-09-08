export const featureSlugs = [
  "semi-realtime-analisis",
  "auto-rangkum-pasien",
  "auto-koding-e-klaim",
  "auto-skrining-risiko-pasien",
  "chat-interaktif-dokter",
  "chat-interaktif-case-manajer",
  "form-a-b-case-manajer",
  "auto-laporan-interaktif",
] as const;

export type FeatureSlug = (typeof featureSlugs)[number];

export const featureEnglish: Record<FeatureSlug, { title: string; short: string; body: string }> = {
  "semi-realtime-analisis": {
    title: "Semi-Realtime Analysis",
    short: "Review patient information and analysis in a more timely workflow.",
    body: "Use the CaseMan analysis workflow to review available patient information and supporting findings as part of the hospital team's professional review process.",
  },
  "auto-rangkum-pasien": {
    title: "Automatic Patient Summary",
    short: "Start a case review with a concise summary of available information.",
    body: "Support the initial review by presenting available patient information in a concise summary within the CaseMan workflow.",
  },
  "auto-koding-e-klaim": {
    title: "Automatic Coding & E-Claim",
    short: "Support coding review and E-Claim preparation in one workflow.",
    body: "Review coding suggestions and prepare data for E-Claim integration according to hospital configuration and the workflow of responsible staff.",
  },
  "auto-skrining-risiko-pasien": {
    title: "Automatic Patient Risk Screening",
    short: "Surface patients who may need closer attention and follow-up.",
    body: "Use screening information as a supporting input for patient monitoring and follow-up by responsible professionals.",
  },
  "chat-interaktif-dokter": {
    title: "Interactive Doctor Chat",
    short: "Interact with available patient information as a support for clinical review.",
    body: "Provide an interactive space for a doctor to explore available information while keeping professional judgment and hospital procedures as the final reference.",
  },
  "chat-interaktif-case-manajer": {
    title: "Interactive Case Manager Chat",
    short: "Support Case Managers while reviewing cases and follow-up needs.",
    body: "Help Case Managers interact with available case information and organize the review of follow-up needs within the hospital workflow.",
  },
  "form-a-b-case-manajer": {
    title: "Case Manager Form A & B",
    short: "Structure Case Manager assessment and follow-up documentation.",
    body: "Support Form A and Form B documentation for assessment, coordination, and follow-up activities within the hospital workflow.",
  },
  "auto-laporan-interaktif": {
    title: "Interactive Reports",
    short: "Make operational data easier to monitor and discuss.",
    body: "Use available CaseMan data to support reporting, monitoring, and management review according to hospital needs.",
  },
};

export const roleSlugs = {
  CaseMix: "casemix",
  "Case Manajer": "case-manajer",
  "DPJP & Manajemen": "dpjp-manajemen",
} as const;

export type RoleTitle = keyof typeof roleSlugs;

export const roleEnglish: Record<RoleTitle, { title: string; text: string; detail: string }> = {
  CaseMix: {
    title: "CaseMix",
    text: "Support for analysis, coding review, bill audit, and E-Claim preparation.",
    detail: "Review medical record completeness, coding suggestions, billing comparisons, and claim data preparation according to hospital workflow and staff authority.",
  },
  "Case Manajer": {
    title: "Case Manager",
    text: "Support for patient monitoring, care coordination, and Form A & B documentation.",
    detail: "Start from patient census, review care needs, document assessment, and record follow-up coordination within the hospital workflow.",
  },
  "DPJP & Manajemen": {
    title: "Attending Doctor & Management",
    text: "Clinical information review and reporting support for service monitoring.",
    detail: "Attending doctors review clinical information within their authority. Management can use reports to support service, quality, and cost evaluation.",
  },
};

export const roleFeatureMap: Record<RoleTitle, FeatureSlug[]> = {
  CaseMix: ["semi-realtime-analisis", "auto-koding-e-klaim", "auto-laporan-interaktif"],
  "Case Manajer": [
    "semi-realtime-analisis",
    "auto-rangkum-pasien",
    "auto-skrining-risiko-pasien",
    "chat-interaktif-case-manajer",
    "form-a-b-case-manajer",
    "auto-laporan-interaktif",
  ],
  "DPJP & Manajemen": [
    "auto-rangkum-pasien",
    "chat-interaktif-dokter",
    "semi-realtime-analisis",
    "auto-laporan-interaktif",
  ],
};

export const articles = [
  {
    slug: "semi-realtime-analisis",
    title: "Semi-Realtime Analisis",
    titleEn: "Semi-Realtime Analysis",
    excerpt: "Memahami peran analisis yang lebih tepat waktu dalam membantu tim meninjau informasi pasien.",
    excerptEn: "Understanding a more timely analysis workflow to help teams review available patient information.",
  },
  {
    slug: "chat-interaktif-ai",
    title: "Chat Interaktif AI",
    titleEn: "Interactive AI Chat",
    excerpt: "Mengenal chat interaktif sebagai ruang bantu untuk mengeksplorasi informasi yang tersedia dalam alur kerja.",
    excerptEn: "Exploring interactive chat as a support space for available information within the workflow.",
  },
  {
    slug: "koding-e-klaim",
    title: "Koding & e-Klaim",
    titleEn: "Coding & E-Claim",
    excerpt: "Bagaimana dukungan peninjauan koding dan persiapan klaim dapat ditempatkan dalam satu alur kerja.",
    excerptEn: "How coding review and claim preparation support can be organized into one workflow.",
  },
  {
    slug: "laporan-interaktif",
    title: "Laporan Interaktif",
    titleEn: "Interactive Reporting",
    excerpt: "Menyajikan data operasional dalam format yang lebih mudah dipantau dan dibahas bersama.",
    excerptEn: "Presenting operational data in a format that is easier to monitor and discuss.",
  },
] as const;

export const articleBody = {
  id: {
    "semi-realtime-analisis": "Semi-Realtime Analisis merupakan bagian dari alur review CaseMan untuk membantu tim melihat informasi yang tersedia secara lebih tepat waktu. Detail teknis dan implementasi mengikuti konfigurasi rumah sakit.",
    "chat-interaktif-ai": "Chat Interaktif AI menyediakan ruang bantu untuk mengeksplorasi informasi yang tersedia dalam alur kerja CaseMan. Peninjauan profesional tetap menjadi dasar pengambilan keputusan.",
    "koding-e-klaim": "Alur Koding & e-Klaim membantu menghubungkan peninjauan informasi dengan proses persiapan klaim sesuai konfigurasi dan kewenangan petugas rumah sakit.",
    "laporan-interaktif": "Laporan Interaktif membantu menyajikan data CaseMan agar lebih mudah dipantau, dibaca, dan digunakan dalam evaluasi pelayanan sesuai kebutuhan rumah sakit.",
  },
  en: {
    "semi-realtime-analisis": "Semi-Realtime Analysis is part of the CaseMan review workflow and helps teams access available information in a more timely manner. Technical details and implementation follow each hospital configuration.",
    "chat-interaktif-ai": "Interactive AI Chat provides a support space for exploring available information within the CaseMan workflow. Professional review remains the basis for decisions.",
    "koding-e-klaim": "The Coding & E-Claim workflow connects information review with claim preparation according to hospital configuration and responsible staff authority.",
    "laporan-interaktif": "Interactive Reporting presents CaseMan data in a format that is easier to monitor, read, and use for service evaluation according to hospital needs.",
  },
} as const;

export const demoNumber = "6285800241340";
export const demoLink = (message: string) =>
  `https://wa.me/${demoNumber}?text=${encodeURIComponent(message)}`;
