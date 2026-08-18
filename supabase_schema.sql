-- ============================================================================
-- SUPABASE POSTGRESQL SCHEMA: Wedding RSVP & Guest Management
-- Project: Wedding of Habib Yulianto & Adiba Putri Syakila
-- ============================================================================
-- Fitur baru:
--   * slug  -> terisi OTOMATIS dari nama_tamu (jika dikosongkan) + unik otomatis
--   * link_tamu -> kolom OTOMATIS berisi tautan undangan lengkap, siap copy-paste
--   * Cara pakai di Supabase Table Editor: isi nama_tamu saja, simpan,
--     lalu salin nilai link_tamu ke WhatsApp/undangan tamu.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 0. FUNGSI BANTU (SLUG & TAUTAN OTOMATIS)
-- ----------------------------------------------------------------------------

-- UBAH DOMAIN FINAL DI SINI (hanya satu tempat).
-- Contoh: 'https://undangan-nikah.vercel.app/' -> 'https://domain-anda.com/'
CREATE OR REPLACE FUNCTION public.invitation_base_url()
RETURNS TEXT
LANGUAGE sql
IMMUTABLE
AS $$ SELECT 'https://undangan-nikah.vercel.app/'::text; $$;

-- Normalisasi nama tamu menjadi slug URL-friendly.
-- Contoh: 'Bpk. M. Dawam & Keluarga' -> 'bpk-m-dawam-dan-keluarga'
CREATE OR REPLACE FUNCTION public.slugify_name(input TEXT)
RETURNS TEXT
LANGUAGE plpgsql
IMMUTABLE
AS $$
DECLARE
    result TEXT;
BEGIN
    result := lower(COALESCE(input, ''));
    result := replace(result, ' & ', ' dan ');
    result := replace(result, '&', ' dan ');
    result := regexp_replace(result, '[^a-z0-9]+', '-', 'g');
    result := trim(BOTH '-' FROM result);
    RETURN result;
END;
$$;

-- Auto-fill slug ketika kolom slug dikosongkan (INSERT atau UPDATE).
-- Jika slug sudah diisi, slug akan dinormalisasi (lowercase + hyphen).
CREATE OR REPLACE FUNCTION public.handle_guest_slug()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
    base_slug TEXT;
    candidate TEXT;
    n INT := 1;
BEGIN
    -- Slug sudah diisi -> cukup normalisasi
    IF NEW.slug IS NOT NULL AND btrim(NEW.slug) <> '' THEN
        NEW.slug := public.slugify_name(NEW.slug);
        RETURN NEW;
    END IF;

    -- Slug kosong -> buat dari nama_tamu
    base_slug := public.slugify_name(NEW.nama_tamu);
    IF base_slug = '' THEN
        base_slug := 'tamu';
    END IF;

    -- Pastikan unik: bpk-budi, bpk-budi-2, bpk-budi-3, ...
    candidate := base_slug;
    WHILE EXISTS (
        SELECT 1 FROM public.guests
        WHERE slug = candidate
          AND public.guests.id IS DISTINCT FROM NEW.id
    ) LOOP
        n := n + 1;
        candidate := base_slug || '-' || n::text;
    END LOOP;

    NEW.slug := candidate;
    RETURN NEW;
END;
$$;

-- ----------------------------------------------------------------------------
-- 1. Create the Guests & RSVP Table
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.guests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(150) UNIQUE,                          -- e.g. 'bapak-joko-santoso' (auto-generated jika dikosongkan)
    nama_tamu VARCHAR(200) NOT NULL,
    no_whatsapp VARCHAR(30),
    status_kehadiran VARCHAR(30) DEFAULT 'belum_konfirmasi', -- 'hadir', 'tidak_hadir', 'ragu'
    jumlah_pax INT DEFAULT 1,
    ucapan TEXT,
    is_custom_link BOOLEAN DEFAULT TRUE,
    -- Tautan undangan lengkap, terhitung OTOMATIS dari slug -> tinggal copy-paste
    link_tamu TEXT GENERATED ALWAYS AS (public.invitation_base_url() || slug) STORED,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create Indexes for High-Performance Lookups
CREATE INDEX IF NOT EXISTS idx_guests_slug ON public.guests(slug);
CREATE INDEX IF NOT EXISTS idx_guests_created_at ON public.guests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_guests_status ON public.guests(status_kehadiran);

-- 3. Auto-update `updated_at` Timestamp Trigger
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_updated_at ON public.guests;
CREATE TRIGGER set_updated_at
BEFORE UPDATE ON public.guests
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.guests ENABLE ROW LEVEL SECURITY;

-- 5. Define Public Access Policies (Anon Key)
-- Policy A: Anyone can read public wishes and RSVP lists
DROP POLICY IF EXISTS "Public Read Wishes" ON public.guests;
CREATE POLICY "Public Read Wishes" ON public.guests
    FOR SELECT
    USING (true);

-- Policy B: Guests can insert their confirmation & wishes
DROP POLICY IF EXISTS "Public Insert RSVP" ON public.guests;
CREATE POLICY "Public Insert RSVP" ON public.guests
    FOR INSERT
    WITH CHECK (true);

-- Policy C: Guests can update their confirmation using their slug / id
DROP POLICY IF EXISTS "Public Update RSVP" ON public.guests;
CREATE POLICY "Public Update RSVP" ON public.guests
    FOR UPDATE
    USING (true);

-- 6. Slug Auto-Generation Trigger (dibuat SETELAH fungsi di atas)
DROP TRIGGER IF EXISTS set_guest_slug ON public.guests;
CREATE TRIGGER set_guest_slug
BEFORE INSERT OR UPDATE OF nama_tamu, slug ON public.guests
FOR EACH ROW
EXECUTE FUNCTION public.handle_guest_slug();

-- ----------------------------------------------------------------------------
-- 7. UNTUK DATABASE YANG SUDAH ADA (dibuat sebelum fitur link_tamu):
--    jalankan sekali supaya kolom link_tamu muncul + terisi otomatis.
-- ----------------------------------------------------------------------------
ALTER TABLE public.guests
    ADD COLUMN IF NOT EXISTS link_tamu TEXT
    GENERATED ALWAYS AS (public.invitation_base_url() || slug) STORED;

-- Backfill: baris lama yang slug-nya kosong ikut digenerate dari nama_tamu
-- (baris yang sudah punya slug TIDAK diubah).
UPDATE public.guests
SET slug = NULLIF(btrim(slug), '')
WHERE slug IS NULL OR btrim(slug) = '';

-- ============================================================================
-- SAMPLE DATA (Initial Wishes)
-- ============================================================================
INSERT INTO public.guests (slug, nama_tamu, no_whatsapp, status_kehadiran, jumlah_pax, ucapan)
VALUES 
(
    'keluarga-besar-dawam', 
    'Bpk. M. Dawam & Keluarga', 
    '6281234567890', 
    'hadir', 
    2, 
    'Barakallahu lakuma wa baraka ''alaikuma wa jama''a bainakuma fii khoir. Selamat menempuh hidup baru anakku Habib & Adiba. Semoga menjadi keluarga sakinah, mawaddah, warahmah.'
),
(
    'keluarga-anas-rifai', 
    'Bpk. Anas Rifai & Ibu Kholifah', 
    '6281298765432', 
    'hadir', 
    2, 
    'Doa terbaik dari kami untuk kedua ananda tercinta. Semoga ikatan suci ini senantiasa dalam lindungan dan berkah Allah SWT.'
),
(
    'sahabat-habib', 
    'Sahabat & Rekan Kerja', 
    '6285712345678', 
    'hadir', 
    1, 
    'Selamat berbahagia Habib & Adiba! Lancar sampai hari H dan langgeng selalu sampai kakek nenek!'
)
ON CONFLICT (slug) DO NOTHING;

-- ============================================================================
-- CATATAN: Mengganti domain final di kemudian hari
--   1) Ubah nilai return di fungsi public.invitation_base_url() di atas.
--   2) Paksa hitung ulang kolom link_tamu untuk semua baris:
--        ALTER TABLE public.guests ALTER COLUMN link_tamu DROP EXPRESSION;
--        ALTER TABLE public.guests ALTER COLUMN link_tamu ADD GENERATED ALWAYS AS (public.invitation_base_url() || slug) STORED;
-- ============================================================================
