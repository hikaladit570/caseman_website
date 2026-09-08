import Link from "@/components/PlainLink";
import MarketingChrome from "@/components/MarketingChrome";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, ChevronRight, MessageCircle } from "lucide-react";
import content from "../../content.json";
import {
  demoLink,
  featureSlugs,
  roleEnglish,
  roleFeatureMap,
  roleSlugs,
  type RoleTitle,
} from "../../site-data";

const roles = Object.entries(roleSlugs) as [RoleTitle, (typeof roleSlugs)[RoleTitle]][];

export function generateStaticParams() {
  return roles.map(([, slug]) => ({ slug }));
}

export default function RolePage({ params }: { params: { slug: string } }) {
  const match = roles.find(([, roleSlug]) => roleSlug === params.slug);
  if (!match) notFound();

  const [roleTitle] = match;
  const role = content.roles.find((item) => item.title === roleTitle);
  if (!role) notFound();

  const english = roleEnglish[roleTitle];
  const demoHref = demoLink(
    `Halo Nalameds, saya dari rumah sakit dan ingin mengetahui CaseMan untuk peran ${roleTitle}. Saya ingin jadwalkan demo.`,
  );

  const points = [
    "Fokus pada kebutuhan dan tanggung jawab peran.",
    "Terhubung dengan fitur CaseMan yang relevan.",
    "Tetap mengikuti alur, SOP, akses, dan kewenangan rumah sakit.",
  ];

  return (
    <MarketingChrome>
<section className="detail-hero role-detail-hero">
        <div className="detail-container">
          <div className="detail-breadcrumb detail-breadcrumb-light">
            <Link href="/">Home</Link><ChevronRight size={13} />
            <Link href="/#peran">Untuk Tim RS</Link><ChevronRight size={13} />
            <span>{roleTitle}</span>
          </div>
          <span className="detail-eyebrow detail-eyebrow-light">Untuk Tim Rumah Sakit</span>
          <h1>{roleTitle}</h1>
          <p className="detail-lead">{role.text}</p>
          <a href={demoHref} target="_blank" rel="noreferrer" className="detail-btn detail-btn-white role-demo-button">
            <MessageCircle size={18} /> Jadwalkan Demo
          </a>
        </div>
      </section>

      <section className="detail-section">
        <div className="detail-container detail-two-column">
          <div>
            <span className="detail-eyebrow">Peran &amp; dukungan</span>
            <h2>Alur kerja yang mengikuti tanggung jawab tim</h2>
            <p className="detail-body-copy">{role.detail}</p>
            <div className="detail-points">
              {points.map((point) => (
                <div key={point} className="detail-point">
                  <span className="detail-point-icon"><Check size={16} /></span>
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>
          <aside className="detail-language-card">
            <span className="detail-mini-label">English</span>
            <h2>{english.title}</h2>
            <p>{english.detail}</p>
          </aside>
        </div>
      </section>

      <section className="detail-recommendation">
        <div className="detail-container">
          <span className="detail-eyebrow">Fitur yang direkomendasikan</span>
          <h2>Explore CaseMan untuk peran ini</h2>
          <div className="detail-recommendation-grid detail-recommendation-grid-roles">
            {roleFeatureMap[roleTitle].map((featureSlug) => {
              const featureIndex = featureSlugs.indexOf(featureSlug);
              const feature = content.features[featureIndex];
              return (
                <Link key={featureSlug} href={`/fitur/${featureSlug}`} className="detail-recommendation-card">
                  <div><strong>{feature.title}</strong><span>{feature.short}</span></div>
                  <ChevronRight size={18} />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="detail-cta">
        <div className="detail-container detail-cta-inner">
          <div>
            <span className="detail-eyebrow detail-eyebrow-light">Jadwalkan demo</span>
            <h2>Lihat bagaimana CaseMan mendukung tim Anda</h2>
            <p>Diskusikan kebutuhan penggunaan CaseMan bersama Nalameds.</p>
          </div>
          <a href={demoHref} target="_blank" rel="noreferrer" className="detail-btn detail-btn-cta">
            <MessageCircle size={18} /> Jadwalkan Demo
          </a>
        </div>
      </section>
</MarketingChrome>
  );
}
