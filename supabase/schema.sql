
-- Recreate leads table for vacancy applications
DROP TABLE IF EXISTS leads;

CREATE TABLE leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  telegram TEXT NOT NULL,
  age TEXT NOT NULL,
  shift_preference TEXT NOT NULL,
  device TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert to leads" 
ON leads 
FOR INSERT 
TO public 
WITH CHECK (true);

CREATE POLICY "Allow authenticated read access" 
ON leads 
FOR SELECT 
TO authenticated 
USING (true);
