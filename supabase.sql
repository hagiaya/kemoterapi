-- Tabel Data Pasien
CREATE TABLE IF NOT EXISTS patients (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  password text,
  record_id text UNIQUE NOT NULL,
  diagnosis text NOT NULL,
  status text NOT NULL DEFAULT 'Normal',
  chemo_date date,
  created_at timestamp with time zone DEFAULT now()
);

-- Mengaktifkan Row Level Security (RLS)
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;

-- Menghapus policy sebelumnya (jika ada) dan menggantinya agar Insert & Select terbuka
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON patients;
DROP POLICY IF EXISTS "Enable ALL access for anon users (patients)" ON patients;

CREATE POLICY "Enable ALL access for anon users (patients)" 
ON patients FOR ALL 
USING (true) WITH CHECK (true);

-- -- (Opsional) Memasukkan data awal (dummy) ke tabel --
-- INSERT INTO patients (name, record_id, diagnosis, status) VALUES ...

-- Tabel Laporan Monitoring Harian
CREATE TABLE IF NOT EXISTS monitoring_reports (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id uuid REFERENCES patients(id) ON DELETE CASCADE,
  pain_level integer,
  nausea text,
  vomiting_frequency integer,
  fatigue text,
  diarrhea text,
  others text[],
  note text,
  created_at timestamp with time zone DEFAULT now()
);

-- Mengaktifkan RLS
ALTER TABLE monitoring_reports ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Enable all access for authenticated users" ON monitoring_reports;
DROP POLICY IF EXISTS "Enable ALL access for anon users (monitoring_reports)" ON monitoring_reports;

-- Kebijakan baca/tulis terbuka
CREATE POLICY "Enable ALL access for anon users (monitoring_reports)" 
ON monitoring_reports FOR ALL 
USING (true) WITH CHECK (true);

-- Tabel Chat
CREATE TABLE IF NOT EXISTS chat_messages (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id uuid REFERENCES patients(id) ON DELETE CASCADE,
  sender text NOT NULL, -- 'patient' atau 'doctor'
  message text NOT NULL,
  created_at timestamp with time zone DEFAULT now()
);

ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Enable ALL access for anon users (chat_messages)" ON chat_messages;
CREATE POLICY "Enable ALL access for anon users (chat_messages)" ON chat_messages FOR ALL USING (true) WITH CHECK (true);

-- Wajib untuk mengaktifkan fitur Real-time (WebSocket) untuk tabel chat_messages
-- Jangan dihapus, copy dan jalankan di SQL Editor Supabase!
begin;
  -- remove the table from publication if it exists to avoid errors, then add it.
  drop publication if exists supabase_realtime;
  create publication supabase_realtime;
commit;
ALTER PUBLICATION supabase_realtime ADD TABLE chat_messages;
