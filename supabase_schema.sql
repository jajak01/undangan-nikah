-- ============================================================================
-- SUPABASE POSTGRESQL SCHEMA: Wedding RSVP & Guest Management
-- Project: Wedding of Habib Yulianto & Adiba Putri Syakila
-- ============================================================================

-- 0. FUNGSI BANTU (SLUG & TAUTAN OTOMATIS)
CREATE OR REPLACE FUNCTION public.invitation_base_url()
RETURNS TEXT
LANGUAGE sql
IMMUTABLE
AS $$ SELECT 'https://undangan-nikah-sigma.vercel.app/?slug='::text; $$;

-- Normalisasi nama tamu menjadi slug URL-friendly
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

-- Auto-fill slug ketika kolom slug dikosongkan (INSERT atau UPDATE)
CREATE OR REPLACE FUNCTION public.handle_guest_slug()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
    base_slug TEXT;
    candidate TEXT;
    n INT := 1;
BEGIN
    IF NEW.slug IS NOT NULL AND btrim(NEW.slug) <> '' THEN
        NEW.slug := public.slugify_name(NEW.slug);
        RETURN NEW;
    END IF;

    base_slug := public.slugify_name(NEW.nama_tamu);
    IF base_slug = '' THEN
        base_slug := 'tamu';
    END IF;

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

-- 1. Create Table (without link_tamu inline to prevent migration conflicts)
CREATE TABLE IF NOT EXISTS public.guests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(150) UNIQUE,
    nama_tamu VARCHAR(200) NOT NULL,
    no_whatsapp VARCHAR(30),
    status_kehadiran VARCHAR(30) DEFAULT 'belum_konfirmasi',
    jumlah_pax INT DEFAULT 1,
    ucapan TEXT,
    is_custom_link BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Safely add generated column link_tamu
ALTER TABLE public.guests DROP COLUMN IF EXISTS link_tamu;
ALTER TABLE public.guests ADD COLUMN link_tamu TEXT GENERATED ALWAYS AS (public.invitation_base_url() || slug) STORED;

-- 3. Indexes
CREATE INDEX IF NOT EXISTS idx_guests_slug ON public.guests(slug);
CREATE INDEX IF NOT EXISTS idx_guests_created_at ON public.guests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_guests_status ON public.guests(status_kehadiran);

-- 4. Triggers
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

DROP TRIGGER IF EXISTS set_guest_slug ON public.guests;
CREATE TRIGGER set_guest_slug
BEFORE INSERT OR UPDATE OF nama_tamu, slug ON public.guests
FOR EACH ROW
EXECUTE FUNCTION public.handle_guest_slug();

-- 5. RLS Policies
ALTER TABLE public.guests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public Read Wishes" ON public.guests;
CREATE POLICY "Public Read Wishes" ON public.guests FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public Insert RSVP" ON public.guests;
CREATE POLICY "Public Insert RSVP" ON public.guests FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Public Update RSVP" ON public.guests;
CREATE POLICY "Public Update RSVP" ON public.guests FOR UPDATE USING (true);