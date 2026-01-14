-- Add type column to courses
-- Check if column exists first to avoid errors on re-run
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'vidya' AND table_name = 'courses' AND column_name = 'type') THEN
        ALTER TABLE vidya.courses ADD COLUMN type text DEFAULT 'course';
        ALTER TABLE vidya.courses ADD CONSTRAINT check_course_type CHECK (type IN ('course', 'tool'));
    END IF;
END $$;

-- Add course_id to tools
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'vidya' AND table_name = 'tools' AND column_name = 'course_id') THEN
        ALTER TABLE vidya.tools ADD COLUMN course_id uuid REFERENCES vidya.courses(id) ON DELETE SET NULL;
    END IF;
END $$;
