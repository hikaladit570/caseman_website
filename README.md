# CaseMan website

Halaman depan untuk aplikasi Windows CaseMan, mengikuti struktur visual halaman depan SMC Hospital dengan konten CaseMan.

## Jalankan dan edit

Jalankan `npm install`, lalu `npm run dev`. Buka alamat lokal yang dicetak terminal. Build produksi: `npm run build`.

Klik **Edit Konten** di footer. Buka kelompok konten, ubah teks atau pilih gambar (maksimal 2,5 MB per gambar), lalu klik **Simpan**. Perubahan tersimpan hanya di browser tersebut. Panel ini bukan CMS dengan akun admin dan tidak mengubah konten untuk pengunjung lain.

Klik **Ekspor JSON** untuk cadangan. **Impor JSON** memuat cadangan ke panel; klik Simpan untuk menerapkannya. Untuk menjadikan konten sebagai versi default bagi semua pengunjung, ganti `app/content.json` dengan hasil ekspor lalu build dan terbitkan ulang. Isi field unduhan URL, email, dan WhatsApp (kode negara dan nomor) ketika tersedia.

Semua teks isi, gambar banner, panduan, maskot, kontak dan link installer ada di `app/content.json`. Tata letak dan label kontrol editor berada di `app/home.tsx`; gaya responsif berada di `app/globals.css`.

## Fitur

Banner 3 slide dengan putar/jeda, menu mobile dan dropdown fitur, pencarian fitur/panduan/FAQ, dialog detail, tab panduan, FAQ, tautan kontak dan unduhan yang dapat dikonfigurasi, akses cepat, kembali ke atas, dan editor konten dengan impor/ekspor. Ini satu halaman pengenalan; sensus, ERM dan E-Klaim tetap dijalankan di aplikasi Windows.

## Gambar

`public/images/mascot.png` berasal dari aset CaseMan yang sudah ada di proyek. `public/images/team.png` dibuat memakai imagegen bawaan: tiga profesional rumah sakit Indonesia fiktif meninjau laptop di nurse station terang, komposisi tim di kanan dan ruang teks di kiri, fotografi editorial natural, aksen hijau, tanpa logo, teks, atau data pasien. Foto diberi keterangan sebagai ilustrasi. Tidak menggunakan foto staf atau testimoni SMC.

Tidak ada database pasien, kredensial, installer internal, atau file konfigurasi aplikasi Windows yang disertakan dalam website.
