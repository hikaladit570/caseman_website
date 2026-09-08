import Link from "next/link";

export const metadata = {
  title: "Syarat dan Ketentuan",
  description:
    "Syarat dan ketentuan penggunaan website CaseMan sebagai media informasi dan penjadwalan demo.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white text-[#173e4e]">
      <header className="border-b border-slate-100 bg-white">
        <div className="mx-auto flex max-w-[1080px] items-center justify-between gap-5 px-5 py-5 lg:px-10">
          <Link href="/" className="text-xl font-extrabold text-[#0788aa]">
            CaseMan
          </Link>
          <Link href="/" className="text-sm font-bold text-[#0788aa]">
            Kembali ke Beranda
          </Link>
        </div>
      </header>

      <section className="bg-[#eef8fb] py-16 lg:py-20">
        <div className="mx-auto max-w-[920px] px-5 lg:px-10">
          <div className="text-sm font-bold uppercase tracking-[0.18em] text-[#0788aa]">
            Legal
          </div>
          <h1 className="mt-4 text-4xl font-extrabold sm:text-5xl">
            Syarat dan Ketentuan
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-[#5b747f]">
            Ketentuan umum penggunaan website promosi CaseMan dan interaksi
            pengguna dengan layanan demo.
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-[920px] px-5 py-14 lg:px-10 lg:py-20">
        <div className="space-y-10 leading-8 text-[#536d78]">
          <section>
            <h2 className="text-2xl font-extrabold text-[#173e4e]">
              1. Ruang lingkup website
            </h2>
            <p className="mt-4">
              Website CaseMan berfungsi sebagai media informasi mengenai
              produk, fitur, artikel, peran pengguna, dan penjadwalan demo.
              Penggunaan aplikasi CaseMan operasional mengikuti akses,
              konfigurasi, dan ketentuan yang ditetapkan oleh pengelola.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-extrabold text-[#173e4e]">
              2. Informasi produk
            </h2>
            <p className="mt-4">
              Informasi pada website ditujukan sebagai pengenalan. Fitur,
              integrasi, ketersediaan, dan implementasi dapat mengikuti
              konfigurasi dan kebutuhan masing-masing rumah sakit.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-extrabold text-[#173e4e]">
              3. Penjadwalan demo
            </h2>
            <p className="mt-4">
              Ketika pengguna menjadwalkan demo, data yang dimasukkan pada
              form digunakan untuk menyusun pesan WhatsApp kepada pengelola.
              Jadwal, materi demo, dan tindak lanjut disepakati antara pengguna
              dan pengelola.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-extrabold text-[#173e4e]">
              4. Penggunaan profesional
            </h2>
            <p className="mt-4">
              Informasi analisis, saran koding, dan informasi klinis yang
              diperkenalkan dalam website merupakan bagian dari alat bantu
              alur kerja. Keputusan profesional tetap mengikuti kewenangan,
              SOP, kebijakan, dan prosedur rumah sakit.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-extrabold text-[#173e4e]">
              5. Tautan pihak ketiga
            </h2>
            <p className="mt-4">
              Website dapat mengarahkan pengguna ke WhatsApp, Instagram, atau
              layanan lain milik pihak ketiga. Penggunaan layanan tersebut
              tunduk pada ketentuan masing-masing penyedia.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-extrabold text-[#173e4e]">
              6. Perubahan ketentuan
            </h2>
            <p className="mt-4">
              Pengelola dapat memperbarui website, fitur, konten, maupun
              ketentuan dari waktu ke waktu agar sesuai dengan perkembangan
              produk dan kebutuhan operasional.
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}
