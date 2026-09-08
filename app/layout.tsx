import type { Metadata } from "next";
import "./globals.css";
import CaseManAssistant from "@/components/CaseManAssistant";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "CaseMan — Smart Assistant for Case Management",
    template: "%s | CaseMan",
  },

  description:
    "CaseMan adalah Smart Assistant for Case Management berbasis Windows untuk mendukung tim rumah sakit dalam pemantauan pasien, dokumentasi pelayanan, peninjauan informasi, dan persiapan klaim.",

  applicationName: "CaseMan",

  keywords: [
    "CaseMan",
    "Case Management",
    "Case Manager",
    "CaseMix",
    "rumah sakit",
    "e-Klaim",
    "rekam medis",
    "manajemen kasus rumah sakit",
  ],

  alternates: {
    canonical: "/",
  },

  icons: {
    icon: "/favicon.ico",
  },

  openGraph: {
    type: "website",
    locale: "id_ID",
    title: "CaseMan — Smart Assistant for Case Management",
    description:
      "Platform untuk mendukung alur Case Management dan pekerjaan tim rumah sakit secara lebih terstruktur.",
    siteName: "CaseMan",
    url: "/",
  },

  twitter: {
    card: "summary_large_image",
    title: "CaseMan — Smart Assistant for Case Management",
    description:
      "Mendampingi Case Manajer, CaseMix, DPJP, dan manajemen rumah sakit.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>
        {children}

        <CaseManAssistant />
      </body>
    </html>
  );
}