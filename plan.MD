UNDANGAN REF 1
https://inv.rumahundangan.id/spesial-06/

Breakdown — "Undangan Website Spesial 06" (Rumah Undangan)
──────────────────────────────────────────────────────────

0. Identitas & Stack Teknologi

Aspek         │ Nilai
──────────────┼───────────────────────────────────────────────────────────────────────────────────────────────────────
Produk        │ Rumah Undangan (rumahundangan.id) — tagline "Sebar Undangan sambil Rebahan"
Halaman       │ Template undangan pernikahan "Spesial 06" (post id 5776)
Pasangan      │ Habib Yulianto & Adiba Putri Syakila
Tanggal       │ Senin, 28 Desember 2026 (countdown target 1798426800000 ms)
CMS           │ WordPress + plugin Yoast SEO
Tema          │ Hello Elementor 3.4.9
Page builder  │ Elementor 4.1.4 + Elementor Pro 4.1.2 (mode elementor-template-canvas)
Plugin        │ bisdev-pro (custom — semua widget bisdev_* dan addon niku-rsvp)
undangan      │
Library       │ jQuery 3.7.1, Swiper 8.4.5, AOS 2.3.1, particles.js 2.0.0, Font Awesome 5.15.3 + v4 shims
frontend      │
Fonts         │ Google Fonts (self-hosted): Cinzel, Great Vibes, Quicksand, Montserrat, Work Sans, Roboto, Roboto
              │ Slab, Comic Neue, Jura

───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────

1. Struktur Layout / Seksi (atas → bawah)

Setiap <section> adalah container Elementor e-con e-parent, kebanyakan diberi dekorasi bunga (absolute) + SVG
"mountain" shape divider sebagai transisi antar-seksi.

1. Cover / Opening (Amplop) — #sec / #kolom Layar penuh position:fixed (z-index 999) yang mengunci scroll sampai tombol
   diklik (body diberi data-idb-cover-closed="1"). Isi: "The Wedding of" → dekorasi bunga beranimasi → nama "Habib &
   Adiba" → "Kepada Bapak/Ibu/Saudara/i" → "Nama Tamu" → tombol "Buka Undangan" (ikon far fa-envelope-open).
2. Hero + Countdown — 77e63e35 Dua kolom: kiri #particles-js (canvas partikel) + bunga; kanan "The Wedding of", heading
   "Habib & Adiba", countdown live (136 hari 13 jam 41 menit 18 detik), tanggal "Senin, 28 Desember 2026", tombol "Save
   The Date" (anchor #date).
3. Pembuka / Assalamu'alaikum — 243fcef2 (shape divider top mountains) Salam "Assalamu'alaikum Wr. Wb", kalimat
   undangan, lalu profil mempelai:
   • Pria: foto → "Habib Yulianto" → "Putra Kedua dari Bapak M. Dawam & (Almh) Ibu Dewi Sudarwati" → ikon Instagram.
   • &
   • Wanita: foto → "Adiba Putri Syakila" → "Putri Pertama dari Bapak Anas Rifai & Ibu Kholifah" → ikon Instagram.

4. Perjalanan Cerita (Story) — 4ac772f5 / .ls-section Heading "Perjalanan Cerita Kami" + widget timeline
   (bisdev_timeline) 3 item: Awal Ceria → Lamaran → Pernikahan, masing-masing berjudul + deskripsi .niku-multiline.
5. Tanggal Acara / Live Streaming + Akad + Resepsi — 57fb0c86 / #date Tiga kartu:
   • Live Streaming (.stream-con): deskripsi, tanggal, "Pukul: 08:00 WIB", tombol Instagram @Habib.
   • Akad Nikah (.acara-con): "Senin, 28 Desember 2026", "08:00 WIB", tempat "KEDIAMAN MEMPELAI WANITA — Ds Pagu,
     Wates, Kediri, Jawa Timur", tombol "Lihat Lokasi" (link maps.app.goo.gl/…).
   • Resepsi (.acara-con): "10:00 WIB – Selesai", lokasi sama, tombol "Lihat Lokasi".

6. Galeri Foto — 64c140cb / #galeri Heading "Galeri Foto", kutipan Qs. Ar-Rum: 21, video YouTube (bisdev_invite_video,
   iframe youtube-nocookie), dan galeri foto justified (6 foto 24NN074-*.jpg, lightbox Elementor Pro).
7. Amplop Digital (Kirim Hadiah) — 6cfc9222 / .amplop-section Heading "Amplop Digital" → tombol "Kirim Hadiah" (#klik,
   ikon fa-gift) yang men-toggle isi #amplop (jQuery toggle(500)). Isi tersembunyi:
   • Copy Rekening (bisdev_copy_rekening): kartu BCA, nomor 12345678, a.n. "Habib", tombol Copy (copy-to-clipboard).
   • Kirim Hadiah (bisdev_kirim_hadiah): Nama Penerima, No. HP 1234567890, Alamat.

8. Ucapan / RSVP — 682a558 / #ucapan Heading "Ucapkan Sesuatu" + "Berikan Ucapan & Doa Restu" + widget niku-rsvp:
   ringkasan statistik (Hadir/Tidak Hadir), form (nama, ucapan max 1000 karakter, pill Hadir / Tidak Hadir, tombol
   Kirim), daftar komentar + pagination.
9. Penutup / Wassalamu'alaikum — 5324d31 Foto, teks terima kasih, "Wassalamu'alaikum Wr. Wb.", "Habib & Adiba".
10. Footer — 42d75049 Watermark "Made with ❤ by Rumahundangan.id", music player sticky (bisdev_musik, ikon compact-disc
    berputar, audio "Tiara Andini & Arsy Widianto – Lagu Pernikahan Kita"), plus widget html tersembunyi berisi
    keyframes animasi, konfigurasi particles.js, dan theme-color #1c2536.

───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────

2. Design System (perkiraan warna & gaya)

Palet warna (dari CSS inline & inline widget)

# PLAN.MD â€” Implementasi Tema Warna Undangan Website (Bronze & Gold Elegance)

Document Version: 1.0  
Target Platform: Website Rumah Undangan  
Base Palette: Dark Bronze, Warm Gold, and Cream Accent  

---

## 1. Concept & Palette Overview

Tema warna ini mengekstrak nuansa elegan dari gaun pengantin wanita (*Dark Bronze/Warm Brown*), aksen payet/manik-manik (*Warm Gold/Champagne*), serta bunga dekorasi (*Deep Maroon*) dengan latar belakang *Cream/Warm Beige*. Seluruh elemen UI fungsional (tombol CTA, badge, border focus) disesuaikan penuh ke warna pengantin (tanpa warna ungu brand).

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚                          PALET WARNA UTAMA                             â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ Primary / CTA     â”‚ #4A2E2B   â”‚ Dark Bronze / Espresso                 â”‚
â”‚ Primary Hover     â”‚ #36211F   â”‚ Deep Bronze                            â”‚
â”‚ Accent / Highlightâ”‚ #D9A05B   â”‚ Warm Gold / Champagne                  â”‚
â”‚ Secondary Accent  â”‚ #8B263E   â”‚ Deep Crimson / Floral Maroon           â”‚
â”‚ Background Main   â”‚ #FBF9F6   â”‚ Warm Off-White                         â”‚
â”‚ Background Card   â”‚ #F4EEE7   â”‚ Warm Cream / Soft Sand                 â”‚
â”‚ Body Text         â”‚ #2C221E   â”‚ Dark Espresso Charcoal                 â”‚
â”‚ Subdued Text      â”‚ #766960   â”‚ Muted Earth Brown                      â”‚
â”‚ Border / Line     â”‚ #E4D8CA   â”‚ Soft Gold Tint Border                  â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

---

## 2. Design Tokens (CSS Variables)

Salin kode CSS kustom berikut ke dalam stylesheet utama (`theme-bronze-gold.css` atau `globals.css`):

```css
:root {
  /* Brand / Primary Theme (Full Replacement of #5e33bf) */
  --color-primary: #4A2E2B;
  --color-primary-hover: #36211F;
  --color-primary-light: #F4EEE7;
  --color-primary-contrast: #FFFFFF;

  /* Metallic & Floral Accents */
  --color-accent-gold: #D9A05B;
  --color-accent-gold-hover: #C28B46;
  --color-accent-maroon: #8B263E;
  
  /* Neutral & Backgrounds */
  --color-bg-main: #FBF9F6;
  --color-bg-card: #F4EEE7;
  --color-bg-overlay: rgba(74, 46, 43, 0.85);

  /* Typography */
  --color-text-main: #2C221E;
  --color-text-muted: #766960;
  --color-text-gold: #B8833B;

  /* Borders & Shadows */
  --color-border-subtle: #E4D8CA;
  --color-border-gold: #D9A05B;
  --shadow-card: 0 10px 30px -5px rgba(74, 46, 43, 0.08);
  --shadow-button: 0 4px 14px rgba(74, 46, 43, 0.25);
}
```

---

## 3. UI Component Breakdown & Implementation Rules

### 3.1 Cover & Hero Section
- **Latar Belakang Section:** `#FBF9F6` atau foto *full-bleed* dengan penutup *overlay* gradasi (`linear-gradient(180deg, rgba(74,46,43,0.3) 0%, rgba(74,46,43,0.7) 100%)`).
- **Judul Nama Pengantin:** `#4A2E2B` (atau font *script/serif* dengan warna `#8B263E` untuk aksen kata penhubung "&").
- **Sub-judul / Sub-heading:** Font Sans-serif / Serif halus dengan warna `#B8833B` atau `#766960`.

### 3.2 Action Buttons (CTA) & Interactive Elements
- **Tombol Utama (Buka Undangan, Kirim Ucapan, RSVP, Google Maps):**
  - Background: `--color-primary` (`#4A2E2B`)
  - Text Color: `#FFFFFF`
  - Border: 1px solid `--color-accent-gold` (`#D9A05B`)
  - Hover Background: `--color-primary-hover` (`#36211F`)
  - Box Shadow: `--shadow-button`
- **Tombol Sekunder (Copy Rekening / Salin Alamat):**
  - Background: `--color-bg-card` (`#F4EEE7`)
  - Text Color: `--color-primary` (`#4A2E2B`)
  - Border: 1px solid `--color-border-subtle` (`#E4D8CA`)
  - Hover Background: `#EADFCF`

### 3.3 Cards & Content Blocks
- **Kartu Info Acara (Akad / Resepsi) & Gift Card:**
  - Background: `--color-bg-card` (`#F4EEE7`)
  - Border: 1px solid `--color-border-subtle` (`#E4D8CA`)
  - Radius: `16px` atau `20px`
  - Judul Kartu: `--color-primary` (`#4A2E2B`)
  - Label Tanggal & Waktu: `--color-accent-maroon` (`#8B263E`) atau `#B8833B`

### 3.4 Decorative Dividers & Borders
- **Pembatas Section / Divider:** Garis halus 1px `#D9A05B` dengan ikon bunga/ornamen di bagian tengah berwarna `#D9A05B`.
- **Bingkai Foto Galeri:** Border 2px solid `#D9A05B` atau efek *box-shadow* halus `#4A2E2B` (opacity 10%).

### 3.5 Amplop Digital & Form Inputs
- **Form Input Text & Textarea:**
  - Border normal: 1px solid `#E4D8CA`
  - Border focus: 2px solid `#D9A05B` (dengan *outline* `#D9A05B`)
  - Background: `#FFFFFF`
- **Kartu Rekening / Digital Envelope Block:**
  - Header blok: `#4A2E2B` dengan teks `#FFFFFF`
  - Nomor Rekening: Font Monospace / Bold Serif warna `#8B263E`

---

## 4. Implementation Steps Checklists

- [ ] **Step 1:** Perbarui file variabel CSS (`:root`) pengganti warna ungu `#5e33bf` menjadi `#4A2E2B`.
- [ ] **Step 2:** Atur warna latar belakang default halaman website ke `#FBF9F6`.
- [ ] **Step 3:** Setel ulang styling tombol komponen (`.btn-primary`, `.btn-opening`, `.btn-submit`) menggunakan latar `#4A2E2B` dan aksen border `#D9A05B`.
- [ ] **Step 4:** Terapkan warna teks judul (*h1*, *h2*, *h3*) ke `#4A2E2B` dan teks nama pasangan ke `#8B263E` / `#4A2E2B`.
- [ ] **Step 5:** Sesuaikan warna *divider*, ornamen SVG, dan bingkai foto menggunakan warna emas `#D9A05B`.
- [ ] **Step 6:** Lakukan pengujian kontras (*contrast ratio test*) pada layar HP & Desktop untuk memastikan teks tetap jelas terbaca di atas latar belakang `#FBF9F6` dan `#F4EEE7`.

Tipografi (dugaan pairing)

• Nama pasangan / script → Great Vibes (script elegan).
• Judul display / serif → Cinzel (serif dekoratif).
• Body / UI → Quicksand / Work Sans / Montserrat.
• Fallback sistem: Roboto, Roboto Slab.
• (Font Clarivate & Source Sans Pro pada beberapa blok adalah CSS yang disuntik ekstensi browser, bukan font situs —
  lihat catatan.)

Gaya visual

• Tema floral romantis: file dekorasi TEMA-06-BUNGA-1..6.webp diposisikan elementor-absolute di sudut-sudut section
  dengan animasi melayang (kelas pluse2, fld, flc, fla, flb) via keyframes rotate/scale.
• Shape divider "mountains" (SVG) sebagai pemisah antar section.
• Rounded + circular: kartu/kotak rounded, ikon sosial/audio berbentuk lingkaran.
• Animasi masuk (scroll reveal): wrapper idb-reveal dengan efek zoom-up, zoom-down, zoom-out, zoom-top-right, zoom-
  bottom-left/right; plus AOS (fade-left, lease-in-cube).
• Efek ambient: particles.js (152 partikel putih, arah ke bawah), disc musik berputar, countdown berjalan.
• Responsive breakpoint Elementor: xs 0 / sm 480 / md 768 / lg 1025 / xl 1440 / xxl 1600; custom mobile 767, tablet
  1024.

───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────

3. Fitur / Komponen Utama

Komponen      │ data-widget_type                     │ Fungsi
──────────────┼──────────────────────────────────────┼───────────────────────────────────────────────────────────────
Countdown     │ bisdev_countdown                     │ Hitung mundur live ke 28 Des 2026 (hari/jam/menit/detik)
Timeline      │ bisdev_timeline                      │ Story "Awal Ceria → Lamaran → Pernikahan"
Video         │ bisdev_invite_video                  │ Embed YouTube (autoplay-mute-loop, youtube-nocookie)
Galeri        │ gallery                              │ Justified grid + lightbox (Elementor Pro)
Ikon          │ bisdev_social_icons                  │ Instagram, tombol "Lihat Lokasi" (Google Maps), streaming
sosial/lokasi │                                      │
Copy rekening │ bisdev_copy_rekening                 │ Copy nomor rekening ke clipboard + toast
Kirim hadiah  │ bisdev_kirim_hadiah                  │ Info penerima (nama/HP/alamat)
RSVP          │ niku-rsvp                            │ Form ucapan+doa, konfirmasi Hadir/Tidak, list komentar + pager
              │                                      │ (AJAX admin-ajax.php)
Musik         │ bisdev_musik                         │ Player sticky, autoplay setelah buka undangan, fade in/out,
              │                                      │ pause saat tab hidden
Reveal        │ idb-reveal                           │ Animasi muncul saat scroll
Cover reveal  │ bisdev-cover-reveal (js)             │ Kunci scroll, animasi "buka amplop", picu musik
Lainnya       │ spacer, image, heading, text-editor, │ Struktur, dekorasi, keyframes animasi custom, particles.js
              │ button, html                         │

Interaksi penting (dari script inline)

• Cover lock: body di-position:fixed sampai klik "Buka Undangan" → #kolom slide up, #sec fade out, musik diputar
  (window.__BISDEV_MUSIC_ALLOWED).
• Amplop toggle: klik #klik → #amplop.toggle(500).
• Musik auto: play saat buka; pause saat visibilitychange/blur; resume saat fokus.
• RSVP: form tersambung ke admin-ajax.php (nonce 261dbb0622), fallback <noscript> via admin-post.php.
• Anti-scroll-cubit / reveal-masuk-dulu / vh: script pendukung dari CDN Bisdev-gift/elementor-script.

───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────

⚠️ Catatan penting (kontaminasi ekstensi browser)

HTML yang ditempel mengandung konten yang disuntik ekstensi browser — bukan bagian dari situs aslinya:

• Script chrome-extension://eppiocemhmnlbhjplcgkofciiegomcon/...
• Atribut bis_skin_checked="1", __processed_7e107605…, bis_register="W3sibWFzdGVy…" (base64 yang mendekode ke status
  adblocker: DISPLAY/FACEBOOK/TWITTER/etc "enabled").
• CSS ber-nama-hash (.qEYyC4J5veWyiLaz9gNP, .Tz2rVjh6IjVdduJP08Qm, .ZD1LzV_5hhnbdBzBCTeC, .YqtWBHxfSeuDDI4tBtJq …) dan
  font Clarivate/Source Sans Pro.

Analisis desain di atas sudah saya pilah agar hanya mengambil elemen asli situs (Elementor + bisdev-pro + Rumah
Undangan).


Tambahan logika animasi
1. idb-reveal — dari plugin bisdev-pro

Hampir semua widget konten dibungkus kelas idb-reveal + kelas efek idb-ef .... Tiap elemen membawa atribut trigger:

• data-reveal-offset="100" → animasi dipicu saat elemen masuk 100px dari viewport (saat di-scroll ke bawah)
• data-reveal-duration="2000" → durasi 2 detik
• data-reveal-delay="..." → delay bertingkat (staggering, mis. 200/400/600ms) sehingga elemen muncul berurutan

Efeknya: zoom-up, zoom-down, zoom-out, zoom-in, zoom-top-right, zoom-bottom-left, zoom-bottom-right, flip. Didorong
oleh idb-reveal.js + reveal.css.

2. AOS (Animate On Scroll) — aos@2.3.1

Dipakai pada dekorasi bunga & beberapa gambar, mis:

• data-aos="fade-left", fade-down, fade-up
• data-aos-duration="1500", data-aos-easing="lease-in-cube"

Diinisialisasi dengan AOS.init({ once: false, mirror: true }) — artinya animasi bisa berulang saat scroll naik/turun.

Hal penting yang perlu dibedakan

Jenis animasi                             │ Scroll-triggered?                                      │ Contoh
──────────────────────────────────────────┼────────────────────────────────────────────────────────┼──────────────────
Reveal konten (idb-reveal, idb-ef zoom-*) │ ✅ Ya, muncul saat di-scroll                           │ heading, teks,
                                          │                                                        │ tombol, kartu
AOS (fade-left/up/down)                   │ ✅ Ya                                                  │ bunga, gambar
                                          │                                                        │ tertentu
Bunga "melayang" terus-menerus (pluse2,   │ ❌ Bukan — ini CSS keyframe loop (infinite alternate), │ dekorasi sudut
flc, fla, fld, wayanGR/GL/G)              │ jalan terus tanpa tergantung scroll                    │ section
Cover/buka amplop                         │ ❌ Bukan scroll — dipicu click tombol "Buka Undangan"  │ section #sec
                                          │ (translateY(-100%) + fade)                             │

Catatan mobile & aksesibilitas

• Scroll-reveal berlaku di mobile — pemicunya viewport-relative (data-reveal-offset), bukan breakpoint. bisdev-pro juga
  memuat vh.js khusus untuk tinggi viewport mobile (var --vh).
• Di <html> ada kelas idb-reveal-reduce-motion — menandakan plugin reveal menghormati prefers-reduced-motion (untuk
  pengguna yang mematikan animasi di OS), jadi animasi scroll bisa nonaktif untuk mereka.

Jadi singkatnya: ya — animasi saat scroll itu core visual identity dari template Rumah Undangan, dan komponen utamanya
adalah idb-reveal (bisdev-pro) plus AOS, dengan bunga melayang yang berjalan terus sebagai lapisan terpisah.


Buat placeholder untuk CDN image dan SVG yang bisa saya tambahkan nanti.
buat database yang kedepan akan saya masukkan ke supabase, dengan data "Nama Tamu Undangan", "No Whatsapp"

kedepan saya ingin setiap tamu undangan memiliki page masing2 dengan nama masing2. lalu tamu undangan dapat melakukan konfirmasi kehadiran dan tertulis di database.