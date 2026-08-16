-- ============================================================================
-- SUPABASE POSTGRESQL SCHEMA: Wedding RSVP & Guest Management
-- Project: Wedding of Habib Yulianto & Adiba Putri Syakila
-- ============================================================================

-- 1. Create the Guests & RSVP Table
CREATE TABLE IF NOT EXISTS public.guests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(150) UNIQUE,                          -- e.g. 'bapak-joko-santoso'
    nama_tamu VARCHAR(200) NOT NULL,
    no_whatsapp VARCHAR(30),
    status_kehadiran VARCHAR(30) DEFAULT 'belum_konfirmasi', -- 'hadir', 'tidak_hadir', 'ragu'
    jumlah_pax INT DEFAULT 1,
    ucapan TEXT,
    is_custom_link BOOLEAN DEFAULT TRUE,
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
CREATE POLICY "Public Read Wishes" ON public.guests
    FOR SELECT
    USING (true);

-- Policy B: Guests can insert their confirmation & wishes
CREATE POLICY "Public Insert RSVP" ON public.guests
    FOR INSERT
    WITH CHECK (true);

-- Policy C: Guests can update their confirmation using their slug / id
CREATE POLICY "Public Update RSVP" ON public.guests
    FOR UPDATE
    USING (true);

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
