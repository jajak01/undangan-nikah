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

Buka terminal di direktori proyek ini lalu jalankan salah satu server berikut:

```bash
# Opsi 1 (disarankan): Node server bawaan — mendukung link pribadi tamu via path
node serve.js
# lalu buka http://localhost:3000/keluarga-besar-dawam

# Opsi 2: npx serve dengan SPA fallback
npx serve -s .

# Opsi 3: Python (hanya mendukung query ?slug=..., bukan path /slug)
python3 -m http.server 3000
# lalu buka http://localhost:3000/?slug=keluarga-besar-dawam
```

Buka browser di `http://localhost:3000`.

---

## 🏷️ Cara Personalisasi Tautan Tamu (`/slug`)

Setiap tamu sudah terdaftar di database Supabase (`guests`) dengan kolom unik `slug`. Bagikan link pribadi tiap tamu berdasarkan `slug`-nya:

| Format URL | Contoh |
| :--- | :--- |
| **Path (produksi / node serve.js)** | `https://undangan-nikah.vercel.app/keluarga-besar-dawam` |
| **Query (fallback lokal Python)** | `http://localhost:3000/?slug=keluarga-besar-dawam` |

Saat link dibuka:
1. Aplikasi mencari tamu berdasarkan `slug` di Supabase.
2. Nama tamu otomatis tampil di kartu **Kepada Yth.** pada Cover dan di Hero Section.
3. Form RSVP hanya menampilkan **Konfirmasi Kehadiran** dan **Ucapan & Doa Restu** — tamu tidak perlu menulis nama / No. WhatsApp / jumlah tamu.
4. Konfirmasi akan **memperbarui** baris tamu yang sudah ada di database (bukan membuat baris baru).

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

### ✨ Tautan Tamu Otomatis (copy-paste dari Table Editor)

Setelah skema di atas di-*run*, di **Table Editor > guests** ada 2 kolom yang terisi otomatis:

- **`slug`** — dibuat otomatis dari `nama_tamu` (contoh: `Bpk. M. Dawam & Keluarga` → `bpk-m-dawam-dan-keluarga`). Jika dua tamu bernama sama, otomatis menjadi `...-2`, `...-3`, dst. Kolom ini bisa juga diisi manual (tetap dinormalisasi otomatis).
- **`link_tamu`** — tautan undangan lengkap siap salin, contoh: `https://undangan-nikah.vercel.app/bpk-m-dawam-dan-keluarga`. Kolom ini *generated* (read-only) dan otomatis mengikuti `slug`.

**Cara pakai:** di Table Editor cukup isi `nama_tamu` (dan opsional `no_whatsapp`), simpan barisnya, lalu salin nilai `link_tamu` dan kirim ke tamu tersebut.

> ⚠️ **Ganti domain final** di fungsi `public.invitation_base_url()` di dalam `supabase_schema.sql` sebelum berbagi link (saat ini masih placeholder `https://undangan-nikah.vercel.app/`). Setelah menggantinya, jalankan dua perintah berikut agar semua `link_tamu` lama ikut terhitung ulang:
> ```sql
> ALTER TABLE public.guests ALTER COLUMN link_tamu DROP EXPRESSION;
> ALTER TABLE public.guests ALTER COLUMN link_tamu ADD GENERATED ALWAYS AS (public.invitation_base_url() || slug) STORED;
> ```

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
