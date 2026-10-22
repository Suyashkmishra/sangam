-- ==============================================================================
-- SANGAM PLATFORM — SUPABASE DATABASE SCHEMA & INITIAL SEED
-- ==============================================================================
-- Run this entire script in the Supabase Dashboard -> SQL Editor -> Run
-- It creates:
--   1. 'profiles' table (Talents and Gurus)
--   2. 'submissions' table (Poetry & Classical Music works + Guru review status)
--   3. 'notifications' table (Real-time updates)
--   4. Row Level Security (RLS) policies for anonymous & authenticated access
--   5. Initial seed data matching SANGAM's authentic cultural content
-- ==============================================================================

-- 1. Create PROFILES Table
CREATE TABLE IF NOT EXISTS public.profiles (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  stage_name TEXT,
  role TEXT NOT NULL CHECK (role IN ('talent', 'guru')),
  title TEXT,                      -- For Gurus (e.g. Master of Ghazals)
  specialization TEXT,             -- For Gurus or Talents
  experience TEXT,                 -- For Gurus (e.g. '32 Years')
  awards TEXT,
  city TEXT,
  state TEXT,
  dob DATE,
  art_form TEXT,                   -- 'Poetry', 'Music', 'Both'
  genre TEXT,                      -- e.g. 'Ghazal & Sufi', 'Semi-Classical & Thumri'
  bio TEXT,
  philosophy TEXT,                 -- Guru teaching philosophy
  languages TEXT[] DEFAULT '{}',
  availability TEXT,               -- e.g. '8 hours/week'
  avatar TEXT,
  sample_work TEXT,
  plan TEXT DEFAULT 'Free',        -- 'Free', 'Rising Star', 'Pro Artist', 'Verified Guru', 'Master'
  assigned_guru_id TEXT,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create SUBMISSIONS Table
CREATE TABLE IF NOT EXISTS public.submissions (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  artist_id TEXT NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  artist_name TEXT NOT NULL,
  artist_stage_name TEXT,
  artist_city TEXT,
  type TEXT NOT NULL CHECK (type IN ('poetry', 'music')),
  content TEXT NOT NULL,           -- Poem text OR Audio track URL
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'under_review', 'verified', 'revision', 'declined')),
  assigned_guru_id TEXT REFERENCES public.profiles(id) ON DELETE SET NULL,
  assigned_guru_name TEXT,
  date DATE DEFAULT CURRENT_DATE,
  feedback TEXT DEFAULT '',
  rating INTEGER,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create NOTIFICATIONS Table
CREATE TABLE IF NOT EXISTS public.notifications (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES public.profiles(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  type TEXT DEFAULT 'info' CHECK (type IN ('info', 'success', 'revision', 'warning')),
  date TEXT DEFAULT 'Just now',
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Enable ROW LEVEL SECURITY (RLS) & Public Policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Allow anonymous / authenticated reads & writes for interactive demo mode
DROP POLICY IF EXISTS "Public Read Profiles" ON public.profiles;
CREATE POLICY "Public Read Profiles" ON public.profiles FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public Insert Profiles" ON public.profiles;
CREATE POLICY "Public Insert Profiles" ON public.profiles FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Public Update Profiles" ON public.profiles;
CREATE POLICY "Public Update Profiles" ON public.profiles FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Public Read Submissions" ON public.submissions;
CREATE POLICY "Public Read Submissions" ON public.submissions FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public Insert Submissions" ON public.submissions;
CREATE POLICY "Public Insert Submissions" ON public.submissions FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Public Update Submissions" ON public.submissions;
CREATE POLICY "Public Update Submissions" ON public.submissions FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Public Read Notifications" ON public.notifications;
CREATE POLICY "Public Read Notifications" ON public.notifications FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public Insert Notifications" ON public.notifications;
CREATE POLICY "Public Insert Notifications" ON public.notifications FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Public Update Notifications" ON public.notifications;
CREATE POLICY "Public Update Notifications" ON public.notifications FOR UPDATE USING (true);

-- 5. STORAGE BUCKET CREATION (for audio submissions, poems, avatars)
INSERT INTO storage.buckets (id, name, public)
VALUES ('sangam-media', 'sangam-media', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Public Storage Read" ON storage.objects;
CREATE POLICY "Public Storage Read" ON storage.objects FOR SELECT USING (bucket_id = 'sangam-media');

DROP POLICY IF EXISTS "Public Storage Upload" ON storage.objects;
CREATE POLICY "Public Storage Upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'sangam-media');

-- 6. INITIAL SEED DATA (Gurus, Talents, Submissions, Notifications)

-- A. Insert Gurus
INSERT INTO public.profiles (id, name, role, title, specialization, experience, awards, city, bio, philosophy, languages, availability, avatar, plan)
VALUES 
(
  'guru-1',
  'Ustad Rashid Khan',
  'guru',
  'Master of Ghazals & Urdu Literature',
  'Ghazal, Nazm, Urdu Poetry, Beher (Metre)',
  '32 Years',
  'Sangeet Natak Akademi Award, Padma Shri nominee',
  'Lucknow',
  'Dedicated to preserving the classical art of Lakhnavi Urdu poetry. Believes that poetry is the breath of the soul made audible.',
  'A poet must first learn to listen to silence before they can write words that resonate with history.',
  ARRAY['Urdu', 'Hindi', 'English'],
  '8 hours/week',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
  'Master'
),
(
  'guru-2',
  'Pandit Hari Prasad',
  'guru',
  'Doyen of Hindustani Classical Flute & Vocals',
  'Hindustani Classical, Thumri, Ragas, Bansuri',
  '40 Years',
  'Padma Vibhushan recipient, Kalidas Samman',
  'Varanasi',
  'Belongs to the Senia-Maihar Gharana. Spent four decades performing across the globe and tutoring young virtuosos.',
  'Sur (note) and Laya (tempo) are not elements of music, they are elements of the universe. Align with them, and you align with God.',
  ARRAY['Hindi', 'Sanskrit', 'Bengali'],
  '6 hours/week',
  'https://images.unsplash.com/photo-1628157582853-a796fa650a6a?auto=format&fit=crop&q=80&w=200',
  'Verified Guru'
),
(
  'guru-3',
  'Vidushi Jayashree',
  'guru',
  'Carnatic Vocal Virtuoso & Composer',
  'Carnatic Classical, Kritis, Raga Alpana, Rhythm systems',
  '26 Years',
  'Sangeet Kalanidhi, Tamil Isai Sangam Award',
  'Chennai',
  'Renowned for her expressive storytelling through Carnatic vocals. Mentors classical artists globally in pitch accuracy and emotive expression (Bhava).',
  'Technical perfection is the body of music, but Bhava (feeling) is the soul. Never sacrifice the soul for speed.',
  ARRAY['Tamil', 'Telugu', 'Kannada', 'English'],
  '10 hours/week',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
  'Verified Guru'
)
ON CONFLICT (id) DO NOTHING;

-- B. Insert Young Talents
INSERT INTO public.profiles (id, name, stage_name, role, city, state, dob, art_form, genre, bio, avatar, sample_work, plan, assigned_guru_id)
VALUES 
(
  'talent-1',
  'Kabir Sen',
  'Kabir',
  'talent',
  'Lucknow',
  'Uttar Pradesh',
  '2002-08-14',
  'Poetry',
  'Ghazal & Sufi Poetry',
  'Weaving classical Lucknowi Urdu structure with modern sensibilities. Writing since I was 16.',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200',
  'Aina-e-Dil',
  'Rising Star',
  'guru-1'
),
(
  'talent-2',
  'Meera Devi',
  'Meera',
  'talent',
  'Varanasi',
  'Uttar Pradesh',
  '2004-03-22',
  'Music',
  'Semi-Classical & Thumri',
  'Trained under local experts in Varanasi. Seeking guru guidance to refine raga transitions and classical voice modulation.',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
  'Bhairavi Thumri',
  'Free',
  'guru-2'
)
ON CONFLICT (id) DO NOTHING;

-- C. Insert Initial Submissions
INSERT INTO public.submissions (id, title, artist_id, artist_name, artist_stage_name, artist_city, type, content, status, assigned_guru_id, assigned_guru_name, date, feedback, rating)
VALUES 
(
  'sub-1',
  'Aina-e-Dil (आईना-ए-दिल)',
  'talent-1',
  'Kabir Sen',
  'Kabir',
  'Lucknow',
  'poetry',
  E'दिल की बस्ती भी अजब बस्ती है दोस्तों,\nलूटने वाले को तरसती है दोस्तों।\n\nआँख रोती है तो रोने दो इसे,\nयह सावन की तरह बरसती है दोस्तों।\n\nजिसके ख़्वाबों में खोए रहते हैं हम,\nवह भी क्या हमसफ़र तरसती है दोस्तों।',
  'verified',
  'guru-1',
  'Ustad Rashid Khan',
  '2026-05-18',
  'A beautiful exploration of classical rhythm (Beher). The flow is mature, and the choice of words evokes deep emotions. The transition between the second and third sher is seamless. Excellent work, beta.',
  5
),
(
  'sub-2',
  'Bhairavi Thumri - Ras ke Bhare Torey Nain',
  'talent-2',
  'Meera Devi',
  'Meera',
  'Varanasi',
  'music',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  'pending',
  'guru-2',
  'Pandit Hari Prasad',
  '2026-05-20',
  '',
  NULL
),
(
  'sub-3',
  'Shunya se Anant (शून्य से अनंत)',
  'talent-1',
  'Kabir Sen',
  'Kabir',
  'Lucknow',
  'poetry',
  E'शून्य से यात्रा शुरू हुई,\nअनंत की ओर बहती गई।\nसांसें थमी तो पता चला,\nमंजिल तो मेरे पास ही थी।\n\nलहरें उठती हैं सागर में जैसे,\nउठती रही उम्मीदें भी वैसे।\nमगर साहिल पर आकर जाना,\nतलाश तो खुद की जारी थी।',
  'revision',
  'guru-1',
  'Ustad Rashid Khan',
  '2026-05-19',
  'The imagery is profound, Kabir. However, in the second line of the first stanza, there is a slight break in the metrical rhythm (Matra count). Try adjusting "अनंत की ओर बहती गई" to match the syllable tempo of the first line. Perhaps "अनंत राह पर बहती गई" or similar. Re-submit once adjusted.',
  NULL
)
ON CONFLICT (id) DO NOTHING;

-- D. Insert Notifications
INSERT INTO public.notifications (id, user_id, text, type, date, read)
VALUES 
(
  'notif-1',
  'talent-1',
  'Ustad Rashid Khan verified your piece "Aina-e-Dil"! ✅',
  'success',
  '2 hours ago',
  false
),
(
  'notif-2',
  'talent-1',
  'Ustad Rashid Khan requested a revision on "Shunya se Anant". 📝',
  'revision',
  '1 day ago',
  false
),
(
  'notif-3',
  'talent-1',
  'Welcome to SANGAM! Complete your profile to match with your ideal Guru.',
  'info',
  '3 days ago',
  true
)
ON CONFLICT (id) DO NOTHING;
