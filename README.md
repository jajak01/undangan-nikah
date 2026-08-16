# 💍 Undangan Pernikahan Digital — Habib & Adiba

Website Undangan Pernikahan Digital Elegan (*Bronze & Gold Elegance*) berbasis **HTML5 + Tailwind CSS + Vanilla JavaScript + AOS + Supabase Ready**.

Dibuat dengan standar performa tinggi, bebas dari plugin WordPress/Elementor yang berat, responsive untuk semua perangkat (HP, Tablet, Desktop), serta siap di-deploy langsung ke **Vercel**.

---

## 🌟 Fitur Utama

1. **Cover / Opening (Amplop Digital):**
   - Layar penuh (*full-bleed overlay*) dengan pengunci scroll (*scroll lock*).
   - Personalisasi nama tamu otomatis dari URL parameter (`?to=Nama+Tamu`).
   - Tombol "Buka Undangan" yang memicu efek transisi slide-up dan autoplay musik.
2. **Hero + Live Countdown Timer:**
   - Menghitung mundur secara *real-time* ke **Senin, 28 Desember 2026 (08:00 WIB)**.
   - Partikel ambient emas lembut (*canvas gold sparkles*).
   - Tombol integrasi *Add to Google Calendar*.
3. **Profil Mempelai & Salam:**
   - Mempelai Pria: **Habib Yulianto** (Putra Bapak M. Dawam & Almh. Ibu Dewi Sudarwati).
   - Mempelai Wanita: **Adiba Putri Syakila** (Putri Bapak Anas Rifai & Ibu Kholifah).
   - Link akun Instagram mempelai.
   - Kutipan suci QS. Ar-Rum: 21.
4. **Perjalanan Cerita (*Love Story Timeline*):**
   - 3 Fase perjalanan cinta (Awal Cerita 2020 → Lamaran 2025 → Pernikahan 2026) dengan konektor garis emas dan animasi AOS.
5. **Detail Acara (Akad Nikah, Resepsi & Live Streaming):**
   - Kartu jadwal lengkap di Kediaman Mempelai Wanita (Ds Pagu, Wates, Kediri).
   - Tombol navigasi Google Maps langsung menuju titik lokasi.
   - Tautan streaming Instagram & YouTube Live.
6. **Galeri Foto & Video:**
   - Embed YouTube Unlisted (Nocookie player, responsive aspect-ratio).
   - Grid 6 Foto terintegrasi dengan **Lightbox Modal** (bisa di-zoom, navigasi panah keyboard & klik).
7. **Amplop Digital & Kirim Kado:**
   - *Accordion toggle* interaktif.
   - Kartu Bank BCA (12345678 a.n. Habib Yulianto) & Bank Mandiri (87654321098 a.n. Adiba Putri Syakila) dengan tombol **Salin Nomor Rekening** + notifikasi *Toast*.
   - Alamat pengiriman kado fisik dengan tombol salin alamat.
8. **RSVP & Buku Doa Restu (Supabase Database Ready):**
   - Form konfirmasi kehadiran (Hadir, Ragu-ragu, Tidak Hadir) + jumlah pax + pesan doa.
   - Statistik ringkasan kehadiran *real-time* (Total Hadir / Berhalangan / Ragu).
   - Feed ucapan dengan *avatar*, *badge*, dan *relative time* ("2 jam yang lalu").
   - Terhubung langsung ke **Supabase** (dengan *fallback* otomatis ke `LocalStorage` jika offline/sebelum konfigurasi API).
9. **Penutup & Ucapan Terima Kasih:**
   - Salam penutup, nama mempelai, dan foto romantis.
10. **Floating Controls & Background Music:**
    - *Sticky Audio Player* berbentuk piringan vinyl berputar (bisa *play/pause* kapan saja).
    - Otomatis *pause* saat pengunjung berpindah tab browser dan *resume* saat kembali.
    - *Floating Bottom Navigation Bar* untuk navigasi cepat antar seksi.

---

## 📁 Struktur Berkas

```
undangan-nikah/
├── index.html              # Halaman utama dengan 10 seksi terintegrasi
├── vercel.json             # Konfigurasi deploy, clean URLs, dan caching Vercel
├── supabase_schema.sql     # Skema database PostgreSQL & RLS untuk Supabase
├── README.md               # Dokumentasi lengkap
├── css/
│   └── style.css           # Styling kustom (tema Bronze & Gold, animasi bunga, lightbox)
└── js/
    ├── app.js              # Entry point utama (Cover unlock, particles, nav spy)
    ├── config.js           # Konfigurasi terpusat (Data mempelai, CDN Cloudinary, YouTube, Supabase)
    ├── countdown.js        # Logika hitung mundur live
    ├── audio.js            # Controller musik latar & vinyl disc
    ├── rsvp.js             # Form RSVP, kalkulasi statistik, & koneksi Supabase
    └── utils.js            # Helper URL query, toast banner, copy clipboard
```

---

## 🚀 Cara Menjalankan Secara Lokal

Buka terminal di direktori proyek ini dan jalankan server statis lokal:

```bash
# Opsi 1: Menggunakan Python
python3 -m http.server 3000

# Opsi 2: Menggunakan npx serve
npx serve .
```

Buka browser di `http://localhost:3000`.

---

## 🏷️ Cara Personalisasi Tautan Tamu (`?to=...`)

Untuk membagikan link ke masing-masing tamu undangan dengan nama mereka yang muncul otomatis di Cover dan Form RSVP:

| Format URL | Contoh |
| :--- | :--- |
| **Standard** | `https://undangan-nikah.vercel.app/?to=Bapak+Joko+Santoso` |
| **Dengan Gelar** | `https://undangan-nikah.vercel.app/?to=dr.+Ahmad+Fauzi%2C+Sp.A` |
| **Dengan Nomor WhatsApp** | `https://undangan-nikah.vercel.app/?to=Bapak+Budi&wa=628123456789` |

Nama tamu yang disisipkan di URL akan langsung:
1. Tertera di kartu **Kepada Yth. Bapak/Ibu/Saudara/i** pada halaman Cover.
2. Muncul di sub-heading Hero Section.
3. Mengisi otomatis (*auto-fill*) kolom **Nama Lengkap** di formulir RSVP.

---

## 🗄️ Menghubungkan ke Supabase via `.env` (Database Tamu)

1. Buat proyek baru di [Supabase.com](https://supabase.com).
2. Buka menu **SQL Editor** di dashboard Supabase Anda.
3. Salin seluruh isi file [`supabase_schema.sql`](file:///home/desen/Documents/undangan%20nikah/supabase_schema.sql) dan klik **Run**.
4. Buka menu **Project Settings > API**, lalu salin **Project URL** dan **anon public key**.
5. **Pengembangan Lokal:** Masukkan kredensial Anda ke dalam file [`.env`](file:///home/desen/Documents/undangan%20nikah/.env) atau [`js/env.js`](file:///home/desen/Documents/undangan%20nikah/js/env.js) (keduanya sudah otomatis di-`gitignore` agar aman):
   ```env
   SUPABASE_URL=https://proyek-anda.supabase.co
   SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6...
   ```
6. **Deployment di Vercel:** Masukkan variabel `SUPABASE_URL` dan `SUPABASE_ANON_KEY` pada menu **Settings > Environment Variables** di Dashboard Vercel Anda.
7. Selesai! Semua konfirmasi kehadiran dan ucapan dari tamu akan otomatis tersimpan di database Supabase secara *realtime* tanpa mengekspos kredensial ke repositori Git publik.

---

## ☁️ Menyesuaikan CDN Cloudinary & YouTube Unlisted

Semua tautan aset multimedia dapat diubah di [`js/config.js`](file:///home/desen/Documents/undangan%20nikah/js/config.js):

- **YouTube Unlisted Video:** Ganti `multimedia.youtubeVideoId` dengan ID video Anda.
- **Background Music MP3:** Ganti `multimedia.backgroundMusic` dengan link MP3 dari Cloudinary atau hosting Anda.
- **Foto Galeri:** Ganti array `multimedia.gallery` dengan URL foto beresolusi tinggi dari Cloudinary.

---

## 🚢 Cara Deploy ke Vercel

1. Buat repositori baru di GitHub dan *push* proyek ini.
2. Masuk ke dashboard [Vercel](https://vercel.com) dan klik **Add New > Project**.
3. Pilih repositori `undangan-nikah` Anda.
4. Klik **Deploy** (Pengaturan framework: *Other*, Root directory: `./`).
5. Website undangan pernikahan Anda langsung aktif dan live dengan HTTPS otomatis!
