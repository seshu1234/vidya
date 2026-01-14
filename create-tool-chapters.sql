-- Create Tool Chapters Table
CREATE TABLE IF NOT EXISTS vidya.tool_chapters (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    tool_id uuid REFERENCES vidya.tools(id) ON DELETE CASCADE,
    title text NOT NULL,
    slug text NOT NULL,
    content text, -- Markdown content
    position integer DEFAULT 0,
    is_published boolean DEFAULT false,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE vidya.tool_chapters ENABLE ROW LEVEL SECURITY;

-- Helper policies
DROP POLICY IF EXISTS "Public read tool chapters" ON vidya.tool_chapters;
CREATE POLICY "Public read tool chapters" ON vidya.tool_chapters FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins can manage tool chapters" ON vidya.tool_chapters;
CREATE POLICY "Admins can manage tool chapters" ON vidya.tool_chapters
  FOR ALL
  USING (vidya.has_role('admin') OR vidya.has_role('super_admin'));
