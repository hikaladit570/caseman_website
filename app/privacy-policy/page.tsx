import Link from "@/components/PlainLink";

export const metadata = {
  title: "Kebijakan Privasi",
  description:
    "Kebijakan privasi website CaseMan dan informasi mengenai penggunaan data pada fitur demo dan kontak.",
};

export default function PrivacyPolicyPage() {
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
            Kebijakan Privasi
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-[#5b747f]">
            Halaman ini menjelaskan secara umum bagaimana informasi diperlakukan
            ketika Anda menggunakan website CaseMan.
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-[920px] px-5 py-14 lg:px-10 lg:py-20">
        <div className="space-y-10 leading-8 text-[#536d78]">
          <section>
            <h2 className="text-2xl font-extrabold text-[#173e4e]">
              1. Informasi yang kami terima
            </h2>
            <p className="mt-4">
              Website CaseMan pada versi saat ini digunakan sebagai media
              informasi, pengenalan fitur, artikel, dan penjadwalan demo.
              Form penjadwalan demo meminta nama rumah sakit dan tipe rumah
              sakit untuk membantu menyusun pesan WhatsApp.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-extrabold text-[#173e4e]">
              2. Penggunaan informasi
            </h2>
            <p className="mt-4">
              Data yang Anda masukkan pada form demo digunakan untuk menyusun
              pesan WhatsApp kepada pengelola CaseMan/Nalameds. Website ini
              tidak memiliki proses pengiriman form ke server sendiri pada
              alur demo tersebut.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-extrabold text-[#173e4e]">
              3. WhatsApp dan layanan pihak ketiga
            </h2>
            <p className="mt-4">
              Ketika Anda memilih untuk melanjutkan ke WhatsApp, Anda akan
              berpindah ke layanan pihak ketiga. Pengelolaan data setelah Anda
              meninggalkan website mengikuti kebijakan dan ketentuan layanan
              pihak ketiga tersebut.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-extrabold text-[#173e4e]">
              4. Penyimpanan preferensi website
            </h2>
            <p className="mt-4">
              Website dapat menggunakan penyimpanan lokal browser untuk
              menyimpan preferensi atau konten yang dikelola melalui fitur
              administrasi. Data tersebut berada pada browser/perangkat yang
              digunakan dan tidak menjadi sistem penyimpanan akun pengguna
              pada website publik.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-extrabold text-[#173e4e]">
              5. Keamanan dan tanggung jawab
            </h2>
            <p className="mt-4">
              Kami berupaya menjaga website dan alur informasi yang tersedia.
              Namun, pengiriman informasi melalui layanan pihak ketiga tetap
              mengikuti keamanan dan kebijakan layanan tersebut.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-extrabold text-[#173e4e]">
              6. Hubungi pengelola
            </h2>
            <p className="mt-4">
              Untuk pertanyaan mengenai privasi dan informasi yang berkaitan
              dengan CaseMan, hubungi Nalameds melalui WhatsApp di
              <strong> 0858-0024-1340</strong> atau Instagram
              <strong> @nalameds</strong>.
            </p>
          </section>
        </div>

        <div className="mt-12 rounded-2xl border-l-4 border-[#5a9227] bg-[#f5faef] p-6 text-sm leading-7 text-[#5b747f]">
          Dokumen ini merupakan informasi umum untuk website CaseMan dan dapat
          diperbarui ketika alur pengumpulan atau pengolahan data website
          berubah.
        </div>
      </article>
    </main>
  );
}
