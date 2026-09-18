import Link from "@/components/PlainLink";
import MarketingChrome from "@/components/MarketingChrome";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, ChevronRight, MessageCircle } from "lucide-react";
import content from "../../content.json";
import { demoLink, featureSlugs } from "../../site-data";

export function generateStaticParams() {
  return featureSlugs.map((slug) => ({ slug }));
}

export default function FeaturePage({ params }: { params: { slug: string } }) {
  const index = featureSlugs.indexOf(params.slug as (typeof featureSlugs)[number]);
  if (index < 0) notFound();

  const slug = featureSlugs[index];
  const feature = content.features[index];
  const demoHref = demoLink(
    `Halo Nalameds, saya tertarik dengan fitur ${feature.title} pada CaseMan. Saya ingin jadwalkan demo untuk mengetahui lebih lanjut.`,
  );

  const supportPoints = [
    "Mendukung peninjauan informasi dalam alur kerja rumah sakit.",
    "Membantu tim bekerja dengan informasi yang lebih terstruktur.",
    "Penggunaan mengikuti konfigurasi, SOP, akses, dan kewenangan rumah sakit.",
  ];

  return (
    <MarketingChrome>
<section className="detail-hero feature-detail-hero">
        <div className="detail-container detail-hero-grid">
          <div>
            <div className="detail-breadcrumb">
              <Link href="/">Home</Link><ChevronRight size={13} />
              <Link href="/#fitur">Fitur</Link><ChevronRight size={13} />
              <span>{feature.title}</span>
            </div>
            <span className="detail-eyebrow">Fitur CaseMan</span>
            <h1>{feature.title}</h1>
            <p className="detail-lead">{feature.short}</p>
            <div className="detail-hero-actions">
  <a href="#detail" className="detail-btn detail-btn-light">
    Lihat detail <ChevronRight size={17} />
  </a>
</div>
          </div>

          <div className="feature-visual-card">
            <div className="feature-visual-image">
              <img src="/images/team.png" alt="Ilustrasi tim rumah sakit menggunakan CaseMan" />
            </div>
            <div className="feature-visual-footer">
              <div>
                <strong>CaseMan</strong>
                <span>Hospital workflow support</span>
              </div>
              <div className="feature-visual-badge">● Aktif</div>
            </div>
          </div>
        </div>
      </section>

      <section id="detail" className="detail-section">
        <div className="detail-container detail-two-column">
          <div>
            <span className="detail-eyebrow">Yang didukung</span>
            <h2>Membantu tim bekerja dengan alur yang lebih jelas</h2>
            <p className="detail-body-copy">{feature.body}</p>
            <div className="detail-points">
              {supportPoints.map((point) => (
                <div key={point} className="detail-point">
                  <span className="detail-point-icon"><Check size={16} /></span>
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="detail-recommendation">
        <div className="detail-container">
          <span className="detail-eyebrow">Fitur terkait</span>
          <h2>Explore fitur CaseMan lainnya</h2>
          <div className="detail-recommendation-grid">
            {featureSlugs.filter((item) => item !== slug).slice(0, 3).map((otherSlug) => {
              const otherIndex = featureSlugs.indexOf(otherSlug);
              const other = content.features[otherIndex];
              return (
                <Link key={otherSlug} href={`/fitur/${otherSlug}`} className="detail-recommendation-card">
                  <div><strong>{other.title}</strong><span>{other.short}</span></div>
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
            <h2>Ingin melihat fitur ini secara langsung?</h2>
            <p>Diskusikan kebutuhan tim rumah sakit Anda bersama Nalameds.</p>
          </div>
          <a href={demoHref} target="_blank" rel="noreferrer" className="detail-btn detail-btn-cta">
            <MessageCircle size={18} /> Jadwalkan Demo
          </a>
        </div>
      </section>
</MarketingChrome>
  );
}
