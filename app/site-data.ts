export const featureSlugs = [
  "semi-realtime-analisis",
  "auto-rangkum-pasien",
  "auto-koding-e-klaim",
  "auto-skrining-risiko-pasien",
  "chat-interaktif-dokter",
  "chat-interaktif-case-manajer",
  "form-a-b-case-manajer",
  "auto-laporan-interaktif",
  "audit-tagihan-ina-cbg",
  "top-up-kredit",
] as const;

export type FeatureSlug = (typeof featureSlugs)[number];

export const featureEnglish: Record<FeatureSlug, { title: string; short: string; body: string }> = {
  "semi-realtime-analisis": {
    title: "Semi-Realtime Analysis",
    short: "Help teams review available patient information in a more timely workflow.",
    body: "CaseMan supports the review workflow by helping teams access available patient information and supporting findings in a more timely manner.",
  },
  "auto-rangkum-pasien": {
    title: "Automatic Patient Summary",
    short: "Summarize available patient information for a more efficient review.",
    body: "AI can help structure available medical-record information such as history, significant supporting findings, diagnoses, and CPPT for professional review.",
  },
  "auto-koding-e-klaim": {
    title: "Automatic Coding & E-Claim",
    short: "Support ICD-10/ICD-9-CM review and E-Claim preparation.",
    body: "Review ICD-10 and ICD-9-CM coding suggestions, process batch analysis, calculate E-Claim ceilings, and prepare data for INA-CBG E-Claim bridging subject to responsible staff verification.",
  },
  "auto-skrining-risiko-pasien": {
    title: "Automatic Patient Risk Screening",
    short: "Surface cases that may need closer attention and follow-up.",
    body: "Use screening as supporting information for priority cases, including prolonged LOS risk, chronic complications or multidiagnosis, claim-limit proximity, complaint or social-financial risks, and readmission risk.",
  },
  "chat-interaktif-dokter": {
    title: "Interactive Doctor Chat",
    short: "Review available clinical information in an interactive workspace.",
    body: "Provide an interactive space for doctors to explore available patient information while professional judgment, authority, and hospital procedures remain the final reference.",
  },
  "chat-interaktif-case-manajer": {
    title: "Interactive Case Manager Chat",
    short: "Support Case Managers in case review and follow-up planning.",
    body: "Help Case Managers interact with available case information, organize coordination notes, and support follow-up within the hospital workflow.",
  },
  "form-a-b-case-manajer": {
    title: "Case Manager Form A & B",
    short: "Structure initial assessment and daily Case Manager documentation.",
    body: "Support Form A for initial assessment and Form B for daily evaluation and follow-up. Both documents can be exported to medical-standard PDF or TXT.",
  },
  "auto-laporan-interaktif": {
    title: "Interactive Reporting",
    short: "Present operational data for monitoring and management review.",
    body: "Use monthly census summaries and Case Manager activity data to support monitoring and service evaluation according to hospital needs.",
  },
  "audit-tagihan-ina-cbg": {
    title: "Billing vs INA-CBG Audit",
    short: "Compare running billing with the estimated INA-CBG package tariff.",
    body: "Compare real billing with the estimated INA-CBG package tariff based on the provisional diagnosis code and surface OK or Review indicators for follow-up.",
  },
  "top-up-kredit": {
    title: "Credit Top Up",
    short: "Use a Pay-as-You-Go credit model based on hospital needs.",
    body: "Top up credit with a minimum of Rp100,000, continue payment via QRIS, and confirm the transaction so the credit can be filled automatically.",
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
    text: "Batch analysis, coding review, billing audit, and E-Claim bridging support.",
    detail: "CaseMix teams review coding accuracy, claim documentation, INA-CBG tariff support, billing comparisons, and E-Claim preparation, with final verification by responsible staff.",
  },
  "Case Manajer": {
    title: "Case Manager",
    text: "Patient census, care coordination, case screening, and Form A & B documentation.",
    detail: "Case Managers follow the patient journey, perform priority screening, coordinate care, maintain Form A & B documentation, and support interdisciplinary communication.",
  },
  "DPJP & Manajemen": {
    title: "Attending Doctor & Management",
    text: "Clinical information review and reporting support for service monitoring.",
    detail: "Attending doctors review clinical documentation within their authority, while management can use reports and billing-audit results to support service, quality, and cost evaluation.",
  },
};

export const roleFeatureMap: Record<RoleTitle, FeatureSlug[]> = {
  CaseMix: [
    "semi-realtime-analisis",
    "auto-koding-e-klaim",
    "audit-tagihan-ina-cbg",
    "auto-laporan-interaktif",
  ],
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
    "audit-tagihan-ina-cbg",
  ],
};

export const articles = [
  {
    slug: "semi-realtime-analisis",
    title: "Semi-Realtime Analisis",
    titleEn: "Semi-Realtime Analysis",
    excerpt: "Memahami alur analisis yang lebih tepat waktu untuk membantu tim meninjau informasi pasien.",
    excerptEn: "Understanding a more timely analysis workflow to help teams review available patient information.",
  },
  {
    slug: "chat-interaktif-ai",
    title: "Chat Interaktif AI",
    titleEn: "Interactive AI Chat",
    excerpt: "Mengenal chat AI sebagai ruang bantu untuk mengeksplorasi informasi yang tersedia dalam workflow.",
    excerptEn: "Exploring AI chat as a support space for available information within the workflow.",
  },
  {
    slug: "koding-e-klaim",
    title: "Koding & e-Klaim",
    titleEn: "Coding & E-Claim",
    excerpt: "Review koding, audit tagihan, dan persiapan klaim dalam satu alur kerja yang terstruktur.",
    excerptEn: "Coding review, billing audit, and claim preparation in one structured workflow.",
  },
  {
    slug: "laporan-interaktif",
    title: "Laporan Interaktif",
    titleEn: "Interactive Reporting",
    excerpt: "Menyajikan rekap operasional untuk monitoring dan evaluasi pelayanan.",
    excerptEn: "Presenting operational summaries for service monitoring and evaluation.",
  },
] as const;

export const articleBody = {
  id: {
    "semi-realtime-analisis": "Semi-Realtime Analisis merupakan bagian dari alur review CaseMan untuk membantu tim melihat informasi yang tersedia secara lebih tepat waktu. Detail teknis dan implementasi mengikuti konfigurasi rumah sakit.",
    "chat-interaktif-ai": "Chat Interaktif AI menyediakan ruang bantu untuk mengeksplorasi informasi yang tersedia dalam alur kerja CaseMan. Peninjauan profesional tetap menjadi dasar pengambilan keputusan.",
    "koding-e-klaim": "Alur Koding & e-Klaim membantu menghubungkan peninjauan informasi, verifikasi saran ICD-10 dan ICD-9-CM, audit billing, dan persiapan klaim sesuai konfigurasi serta kewenangan petugas rumah sakit.",
    "laporan-interaktif": "Laporan Interaktif membantu menyajikan rekapitulasi sensus dan aktivitas Case Manager agar lebih mudah dipantau, dibaca, dan digunakan dalam evaluasi pelayanan sesuai kebutuhan rumah sakit.",
  },
  en: {
    "semi-realtime-analisis": "Semi-Realtime Analysis is part of the CaseMan review workflow and helps teams access available information in a more timely manner. Technical details and implementation follow each hospital configuration.",
    "chat-interaktif-ai": "Interactive AI Chat provides a support space for exploring available information within the CaseMan workflow. Professional review remains the basis for decisions.",
    "koding-e-klaim": "The Coding & E-Claim workflow connects information review, ICD-10 and ICD-9-CM suggestion verification, billing audit, and claim preparation according to hospital configuration and responsible staff authority.",
    "laporan-interaktif": "Interactive Reporting presents census and Case Manager activity summaries in a format that is easier to monitor, read, and use for service evaluation according to hospital needs.",
  },
} as const;

export const demoNumber = "6285800241340";
export const demoLink = (message: string) =>
  `https://wa.me/${demoNumber}?text=${encodeURIComponent(message)}`;
