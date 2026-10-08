export const featureSlugs = [
  "semi-realtime-analisis",
  "analisis-riwayat-pasien",
  "auto-koding-e-klaim",
  "auto-skrining-risiko-pasien",
  "batch-analisis-klaim",
  "chat-interaktif-case-manajer",
  "chat-interaktif-dokter",
  "form-a-b-case-manajer",
  "auto-resume-medis",
  "auto-laporan-interaktif",
] as const;

export type FeatureSlug = (typeof featureSlugs)[number];

export const featureEnglish: Record<FeatureSlug, { title: string; short: string; body: string }> = {
  "semi-realtime-analisis": {
    title: "Semi-Realtime Inpatient Analysis",
    short: "Patients are analyzed while still admitted, not after discharge.",
    body: "CaseMan reads inpatient data from the hospital EMR comprehensively and semi-realtime. Analysis runs while the patient is still admitted, so pending or rejected claim risks can be anticipated early instead of surfacing when the claim file is prepared.",
  },
  "analisis-riwayat-pasien": {
    title: "Patient History Analysis",
    short: "Search and analyze patients across all EMR visits, including discharged ones.",
    body: "Search by name or medical record number across every EMR visit, then pick the visit to review. Patient data is structured: assessments, progress notes (CPPT), lab, radiology, and medication.",
  },
  "auto-koding-e-klaim": {
    title: "Coding Suggestions & E-Claim Ceiling",
    short: "Editable ICD-10 & ICD-9-CM suggestions, INA-CBG ceiling calculated via E-Claim.",
    body: "AI drafts diagnosis (ICD-10) and diagnostic and therapeutic procedure (ICD-9-CM) suggestions that can be edited and reordered. Set care class, ICU, or ventilator, then click Calculate Ceiling to simulate the INA-CBG tariff from E-Claim. Coders still verify AI suggestions before finalizing.",
  },
  "auto-skrining-risiko-pasien": {
    title: "Batch MPP Risk Screening",
    short: "Screen patients against MPP criteria to find cases that need case management.",
    body: "Case Managers screen many patients at once by ward and length of stay. Each patient is checked against the MPP criteria checklist, such as predicted LOS over 5 days, chronic disease with complications or multiple diagnoses, cost approaching the claim ceiling, social-financial barriers, and 30-day readmission risk.",
  },
  "batch-analisis-klaim": {
    title: "Batch BPJS Claim Analysis",
    short: "Analyze claims by admission or discharge period, dozens of patients at once.",
    body: "The Casemix team picks a period (admission or discharge date) and CaseMan analyzes every patient in it, flagging each as OK or Review. Claim details show diagnoses and procedures from the latest progress notes, therapy fit with BPJS claim criteria, file completeness, and diagnoses in progress notes not yet in the discharge summary as top-up opportunities.",
  },
  "chat-interaktif-case-manajer": {
    title: "Case Manager AI Chat",
    short: "Discuss cases with an AI acting in the Case Manager role.",
    body: "AI analysis adapts to the user's work unit. In the Case Manager role, AI helps review cases from EMR data, prepare coordination notes, and plan patient follow-up.",
  },
  "chat-interaktif-dokter": {
    title: "Doctor AI Chat",
    short: "Clinical discussion: result interpretation, differential diagnosis, therapy evaluation.",
    body: "Doctors choose the AI role and can use suggested questions. AI helps interpret results, build differential diagnoses, and evaluate therapy from structured patient data. Clinical decisions remain with the doctor.",
  },
  "form-a-b-case-manajer": {
    title: "Digital Form A & B",
    short: "Case Manager initial assessment and daily evaluation, ready for PDF export.",
    body: "Form A is the Case Manager initial assessment, completed within 24 hours. Form B is updated daily for notes and evaluation. Both are filled in Daily Management and can be exported to PDF.",
  },
  "auto-resume-medis": {
    title: "Auto Discharge Summary",
    short: "Fill the EMR discharge summary automatically from reviewed claim suggestions.",
    body: "From the Manual E-Claim page, reviewed diagnoses and procedures can fill the EMR discharge summary automatically, so items recorded in progress notes are not missed.",
  },
  "auto-laporan-interaktif": {
    title: "Reports & PDF Export",
    short: "Daily census, monthly reports, and analysis results ready for PDF export.",
    body: "Daily census feeds the monthly report, including cases handled by MPP. Analysis results, Form A/B, and monthly reports export to clean PDFs for meetings, evaluation, or patient files.",
  },
};

export const roleSlugs = {
  CaseMix: "casemix",
  "Case Manajer": "case-manajer",
  Dokter: "dokter",
} as const;

export type RoleTitle = keyof typeof roleSlugs;

export const roleEnglish: Record<RoleTitle, { title: string; text: string; detail: string }> = {
  CaseMix: {
    title: "CaseMix",
    text: "Batch claim analysis by period, ICD coding suggestions, INA-CBG ceiling, and Auto Discharge Summary.",
    detail: "The Casemix team logs in to the EMR, picks a period, and runs batch BPJS claim analysis. ICD-10 and ICD-9-CM suggestions can be edited before the INA-CBG ceiling is calculated via E-Claim. Coders do the final verification before submission.",
  },
  "Case Manajer": {
    title: "Case Manager",
    text: "Daily census, batch MPP risk screening, Case Manager AI chat, and digital Form A & B.",
    detail: "Case Managers follow patients from admission to discharge. CaseMan helps update the daily census per ward, screen patients against MPP criteria, discuss cases with AI, and complete Form A (within 24 hours) and Form B (daily). Monthly reports export to PDF.",
  },
  Dokter: {
    title: "Doctor",
    text: "Search patients across all visits and discuss clinical findings with AI.",
    detail: "Doctors can search patients across all visits and view structured data: assessments, progress notes, lab, radiology, and medication. The Doctor AI role helps with interpretation, differential diagnosis, and therapy evaluation. Clinical decisions remain the doctor's.",
  },
};

export const roleFeatureMap: Record<RoleTitle, FeatureSlug[]> = {
  CaseMix: [
    "batch-analisis-klaim",
    "auto-koding-e-klaim",
    "auto-resume-medis",
    "analisis-riwayat-pasien",
    "auto-laporan-interaktif",
  ],
  "Case Manajer": [
    "semi-realtime-analisis",
    "auto-skrining-risiko-pasien",
    "chat-interaktif-case-manajer",
    "form-a-b-case-manajer",
    "auto-laporan-interaktif",
  ],
  Dokter: [
    "analisis-riwayat-pasien",
    "chat-interaktif-dokter",
    "semi-realtime-analisis",
  ],
};

export const articles = [
  {
    slug: "empat-tahap-kerja-caseman",
    title: "Empat Tahap Kerja CaseMan",
    titleEn: "CaseMan's Four-Step Workflow",
    excerpt: "Dari sensus rawat inap, skrining, analisis mendalam, hingga rekomendasi yang siap ditindaklanjuti.",
    excerptEn: "From inpatient census and screening to in-depth analysis and actionable recommendations.",
  },
  {
    slug: "satu-aplikasi-tiga-peran",
    title: "Satu Aplikasi, Tiga Peran",
    titleEn: "One App, Three Roles",
    excerpt: "Menu dan analisis AI yang menyesuaikan unit kerja Case Manager, Casemix, dan Dokter.",
    excerptEn: "Menus and AI analysis that adapt to Case Manager, Casemix, and Doctor work units.",
  },
  {
    slug: "studi-kasus-rs-pku-wonosobo",
    title: "Studi Kasus: RS PKU Muhammadiyah Wonosobo",
    titleEn: "Case Study: RS PKU Muhammadiyah Wonosobo",
    excerpt: "Rumah sakit dengan hampir 90% pasien BPJS mempercepat pengelolaan pasien dan pengajuan klaim.",
    excerptEn: "A hospital with nearly 90% BPJS patients speeds up patient management and claim submission.",
  },
  {
    slug: "keamanan-data-pasien",
    title: "Keamanan Data Pasien di CaseMan",
    titleEn: "Patient Data Security in CaseMan",
    excerpt: "Data disimpan lokal dan terenkripsi, sistem tidak terbuka ke publik.",
    excerptEn: "Data is stored locally and encrypted; the system is not exposed to the public.",
  },
] as const;

export type ArticleSlug = (typeof articles)[number]["slug"];

export const articleBody: Record<ArticleSlug, { summary: string; sections: { heading: string; text: string }[] }> = {
  "empat-tahap-kerja-caseman": {
    summary: "CaseMan bekerja dalam empat tahap yang berjalan selama pasien masih dirawat, sehingga masalah klaim bisa ditemukan sebelum pasien pulang.",
    sections: [
      { heading: "1. Sensus pasien rawat inap", text: "CaseMan membaca data pasien secara komprehensif dan semi-realtime dari EMR rumah sakit. Data disimpan lokal di komputer rumah sakit." },
      { heading: "2. Skrining pasien", text: "Pasien disaring sesuai kriteria MPP dan pedoman BPJS untuk memilah yang berisiko pending, yang diagnosis dan tindakannya tidak sesuai, serta yang punya potensi top-up yang belum tertulis." },
      { heading: "3. Analisis mendalam", text: "CaseMan menganalisis kelengkapan berkas, kesesuaian diagnosis, tindakan, dan terapi, serta diagnosis top-up yang bisa ditambahkan." },
      { heading: "4. Rekomendasi", text: "Hasil analisis disimpan sebagai PDF yang rapi dan sistematis, lalu ditindaklanjuti oleh Case Manager, Casemix, dan DPJP." },
    ],
  },
  "satu-aplikasi-tiga-peran": {
    summary: "Setiap pengguna masuk dengan unit kerjanya. Menu di sidebar dan peran AI otomatis menyesuaikan.",
    sections: [
      { heading: "Case Manager", text: "Sensus harian dan laporan bulanan, batch skrining risiko sesuai kriteria MPP, Chat AI dengan peran Case Manager, serta Form A dan Form B digital dengan ekspor PDF." },
      { heading: "Casemix", text: "Batch analisis klaim per periode waktu masuk atau pulang, usulan koding ICD-10 dan ICD-9-CM yang bisa diedit, hitung plafon INA-CBG otomatis lewat E-Klaim, dan Auto Resume untuk mengisi Resume Medis EMR." },
      { heading: "Dokter", text: "Cari pasien di seluruh riwayat kunjungan, lihat data terstruktur (asesmen, CPPT, lab, radiologi, obat), dan diskusi dengan Chat AI peran Dokter untuk interpretasi, diagnosis banding, dan evaluasi terapi." },
    ],
  },
  "studi-kasus-rs-pku-wonosobo": {
    summary: "RS PKU Muhammadiyah Wonosobo adalah rumah sakit swasta dengan hampir 90% pasien menggunakan BPJS. Pengelolaan pasien yang efektif dan efisien sangat menentukan.",
    sections: [
      { heading: "Tantangan", text: "Tata kelola pasien BPJS harus mengikuti pedoman dan regulasi BPJS. Rumah sakit memiliki tim Case Manager dan tim Casemix yang perlu mengoptimalkan layanan pasien dan pengajuan klaim tanpa mengesampingkan mutu." },
      { heading: "Solusi", text: "CaseMan dipakai untuk mempercepat pengelolaan pasien dan pengajuan klaim melalui Rekam Medis Elektronik yang sudah terintegrasi dengan rumah sakit. Sistem berjalan lokal dan tidak terbuka ke publik." },
      { heading: "Hasil", text: "Pengelolaan pelayanan pasien dan pengajuan klaim BPJS menjadi lebih cepat, potensi klaim pending atau gagal berkurang, dan klaim BPJS lebih optimal." },
    ],
  },
  "keamanan-data-pasien": {
    summary: "CaseMan menyimpan data pasien di komputer lokal rumah sakit dalam keadaan terenkripsi.",
    sections: [
      { heading: "Berjalan lokal", text: "CaseMan adalah aplikasi Windows yang berjalan di komputer rumah sakit dan terhubung ke EMR rumah sakit. Sistem tidak terbuka ke publik." },
      { heading: "Terenkripsi", text: "Data pasien yang dibaca dari EMR disimpan di komputer lokal dalam keadaan terenkripsi." },
      { heading: "Akses sesuai peran", text: "Akun baru perlu disetujui Administrator. Menu yang tampil mengikuti unit kerja pengguna, sehingga tiap peran hanya melihat yang ia perlukan." },
    ],
  },
};

export const demoNumber = "6285800241340";
export const demoLink = (message: string) =>
  `https://wa.me/${demoNumber}?text=${encodeURIComponent(message)}`;
