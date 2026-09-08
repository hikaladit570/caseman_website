import Link from "@/components/PlainLink";
import MarketingChrome from "@/components/MarketingChrome";
import { notFound } from "next/navigation";
import { ArrowLeft, ChevronRight, MessageCircle } from "lucide-react";
import { articleBody, articles, demoLink } from "../../site-data";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export default function ArticleDetail({ params }: { params: { slug: string } }) {
  const article = articles.find((item) => item.slug === params.slug);
  if (!article) notFound();

  const body = articleBody.id[article.slug as keyof typeof articleBody.id];
  const demoHref = demoLink(
    `Halo Nalameds, saya sudah membaca artikel "${article.title}" tentang CaseMan dan ingin jadwalkan demo.`,
  );

  return (
    <MarketingChrome>
<article>
        <section className="article-hero">
          <div className="detail-container article-hero-inner">
            <div className="detail-breadcrumb">
              <Link href="/">Home</Link><ChevronRight size={13} />
              <Link href="/artikel">Artikel</Link><ChevronRight size={13} />
              <span>{article.title}</span>
            </div>
            <span className="detail-eyebrow">Artikel CaseMan</span>
            <h1>{article.title}</h1>
            <p className="detail-lead">{article.excerpt}</p>
          </div>
        </section>

        <section className="article-content-section">
          <div className="detail-container article-content-layout">
            <div className="article-main">
              <div className="article-summary">
                <span className="detail-mini-label">Ringkasan</span>
                <p>{body}</p>
              </div>

              <div className="article-body">
                <h2>Mengapa topik ini penting?</h2>
                <p>Dalam alur Case Management, informasi perlu ditinjau sesuai kebutuhan peran dan konteks pelayanan. CaseMan menempatkan fitur sebagai alat bantu dalam proses tersebut.</p>

                <h2>Bagaimana CaseMan mendukung?</h2>
                <p>Penggunaan fitur mengikuti konfigurasi dan alur kerja rumah sakit. Tim tetap melakukan review, verifikasi, dan pengambilan keputusan sesuai kewenangan profesional.</p>

                <div className="article-note">
                  <strong>Catatan implementasi</strong>
                  <p>Artikel ini merupakan materi pengenalan. Implementasi fitur mengikuti konfigurasi rumah sakit, prosedur, akses, dan kewenangan profesional yang bertanggung jawab.</p>
                </div>
              </div>

              <div className="article-actions">
                <Link href="/artikel" className="detail-btn detail-btn-outline">
                  <ArrowLeft size={16} /> Semua artikel
                </Link>
                <a href={demoHref} target="_blank" rel="noreferrer" className="detail-btn detail-btn-green">
                  <MessageCircle size={17} /> Jadwalkan Demo
                </a>
              </div>
            </div>

            <aside className="article-aside">
              <div className="article-aside-card">
                <span className="detail-mini-label">CaseMan</span>
                <h3>Pelajari lebih lanjut melalui demo</h3>
                <p>Diskusikan kebutuhan tim rumah sakit Anda bersama Nalameds.</p>
                <a href={demoHref} target="_blank" rel="noreferrer" className="detail-btn detail-btn-green">
                  <MessageCircle size={17} /> Jadwalkan Demo
                </a>
              </div>
            </aside>
          </div>
        </section>
      </article>

      <section className="detail-cta">
        <div className="detail-container detail-cta-inner">
          <div>
            <span className="detail-eyebrow detail-eyebrow-light">Pelajari CaseMan</span>
            <h2>Diskusikan kebutuhan Anda</h2>
            <p>Lihat CaseMan melalui demo yang dipandu bersama Nalameds.</p>
          </div>
          <a href={demoHref} target="_blank" rel="noreferrer" className="detail-btn detail-btn-cta">
            <MessageCircle size={18} /> Jadwalkan Demo
          </a>
        </div>
      </section>
</MarketingChrome>
  );
}
