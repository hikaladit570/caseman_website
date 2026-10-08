import Link from "@/components/PlainLink";
import MarketingChrome from "@/components/MarketingChrome";
import { ChevronRight, MessageCircle } from "lucide-react";
import { articles, demoLink } from "../site-data";

export default function ArticlesPage() {
  const demoHref = demoLink(
    "Halo Nalameds, saya tertarik dengan CaseMan dan ingin jadwalkan demo.",
  );

  return (
    <MarketingChrome>
<section className="article-list-hero">
        <div className="detail-container">
          <span className="detail-eyebrow">Artikel CaseMan</span>
          <h1>Wawasan seputar CaseMan</h1>
          <p className="detail-lead">Informasi dan pembahasan mengenai analisis, chat interaktif, koding, e-Klaim, dan pelaporan dalam alur kerja CaseMan.</p>
        </div>
      </section>

      <section className="detail-section article-list-section">
        <div className="detail-container">
          <div className="article-list-grid">
            {articles.map((article, index) => (
              <article key={article.slug} className="article-list-card">
                <span className="article-number">Artikel {String(index + 1).padStart(2, "0")}</span>
                <h2>{article.title}</h2>
                <p>{article.excerpt}</p>
                <Link href={`/artikel/${article.slug}`} className="article-read-link">
                  Baca artikel <ChevronRight size={16} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="detail-cta">
        <div className="detail-container detail-cta-inner">
          <div>
            <span className="detail-eyebrow detail-eyebrow-light">Jadwalkan demo</span>
            <h2>Ingin melihat CaseMan secara langsung?</h2>
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
