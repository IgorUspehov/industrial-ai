/*
# Create ai_audits table for Industrial AI audit questionnaire submissions

1. New Tables
- `ai_audits`
  - `id` (uuid, primary key)
  - `enterprise_type` (text, type of enterprise: production, factory, warehouse, etc.)
  - `enterprise_size` (text, size category: up to 50, 50-250, 250-1000, 1000+)
  - `automated_processes` (jsonb, array of selected automated processes)
  - `available_data` (jsonb, array of selected available data sources)
  - `has_historical_data` (text, yes/partial/no/unknown)
  - `main_problem` (text, primary problem of the enterprise)
  - `ai_readiness` (integer, 1-10 slider value)
  - `contact_name` (text, name of the contact person)
  - `contact_company` (text, company name)
  - `contact_position` (text, job title/position)
  - `contact_email` (text, email address)
  - `contact_phone` (text, phone number)
  - `contact_country` (text, country)
  - `status` (text, default 'received' — tracks processing state)
  - `created_at` (timestamptz, default now())

2. Security
- Enable RLS on `ai_audits`.
- This is a no-auth landing page (no sign-in screen), so the anon-key client
  must be able to INSERT new audit submissions. We allow anon + authenticated
  to INSERT. SELECT/UPDATE/DELETE are denied to anon (only service role can read
  submissions, which is correct for a B2B lead-capture form).

3. Notes
- The questionnaire collects enterprise data for later manual analysis.
- No automated audit results are generated — the form only captures input.
- Email validation is done client-side; the column is NOT unique to allow
  multiple submissions from the same contact.
*/

CREATE TABLE IF NOT EXISTS ai_audits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  enterprise_type text NOT NULL,
  enterprise_size text NOT NULL,
  automated_processes jsonb NOT NULL DEFAULT '[]'::jsonb,
  available_data jsonb NOT NULL DEFAULT '[]'::jsonb,
  has_historical_data text NOT NULL,
  main_problem text NOT NULL,
  ai_readiness integer NOT NULL DEFAULT 1,
  contact_name text NOT NULL,
  contact_company text NOT NULL,
  contact_position text NOT NULL,
  contact_email text NOT NULL,
  contact_phone text,
  contact_country text NOT NULL,
  status text NOT NULL DEFAULT 'received',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE ai_audits ENABLE ROW LEVEL SECURITY;

-- Allow anyone (anon + authenticated) to submit a new audit
DROP POLICY IF EXISTS "anon_insert_audits" ON ai_audits;
CREATE POLICY "anon_insert_audits" ON ai_audits FOR INSERT
  TO anon, authenticated WITH CHECK (true);

-- No SELECT/UPDATE/DELETE for anon or authenticated — only service role can read submissions
DROP POLICY IF EXISTS "anon_select_audits" ON ai_audits;
DROP POLICY IF EXISTS "anon_update_audits" ON ai_audits;
DROP POLICY IF EXISTS "anon_delete_audits" ON ai_audits;
