# CaseMan website

Halaman depan untuk aplikasi Windows CaseMan, mengikuti struktur visual halaman depan SMC Hospital dengan konten CaseMan.

## Jalankan

Jalankan `npm install`, lalu `npm run dev`. Buka alamat lokal yang dicetak terminal. Build produksi: `npm run build`.

## Login admin dan database

Tombol **Login Admin** tersedia di footer dan membuka `/admin`. Setelah login, tombol **Edit Konten** membuka panel editor. Perubahan disimpan ke Cloudflare D1 melalui `/api/content` dan langsung berlaku untuk semua pengunjung. Ekspor dan impor JSON tetap tersedia untuk cadangan.

Hubungkan database dengan binding `CONTENT_DB`, lalu buat tiga secret berikut pada environment deployment:

```text
ADMIN_USERNAME=nama-admin
ADMIN_PASSWORD=password-panjang-yang-unik
ADMIN_SESSION_SECRET=nilai-acak-minimal-32-karakter
```

Jangan commit nilai secret. Untuk pengembangan lokal, simpan nilainya dalam `.env.local`. Tabel `site_content` dibuat otomatis pada permintaan pertama. Jika D1 belum terhubung, website tetap menampilkan `app/content.json`, tetapi penyimpanan dari editor akan ditolak dengan pesan yang jelas.

Konten awal, gambar banner, panduan, maskot, kontak, dan tautan installer ada di `app/content.json`. Konten hasil editor berada di D1. Tata letak dan label kontrol editor berada di `app/home.tsx`; gaya responsif berada di `app/globals.css`.

## Fitur

Banner 3 slide dengan putar/jeda, menu mobile dan dropdown fitur, pencarian fitur/panduan/FAQ, dialog detail, tab panduan, FAQ, tautan kontak dan unduhan yang dapat dikonfigurasi, akses cepat, kembali ke atas, dan editor konten dengan impor/ekspor. Ini satu halaman pengenalan; sensus, ERM dan E-Klaim tetap dijalankan di aplikasi Windows.

## Gambar

`public/images/mascot.png` berasal dari aset CaseMan yang sudah ada di proyek. `public/images/team.png` dibuat memakai imagegen bawaan: tiga profesional rumah sakit Indonesia fiktif meninjau laptop di nurse station terang, komposisi tim di kanan dan ruang teks di kiri, fotografi editorial natural, aksen hijau, tanpa logo, teks, atau data pasien. Foto diberi keterangan sebagai ilustrasi. Tidak menggunakan foto staf atau testimoni SMC.

Tidak ada database pasien, kredensial, installer internal, atau file konfigurasi aplikasi Windows yang disertakan dalam website.
