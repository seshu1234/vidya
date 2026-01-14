
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import path from 'path';
import { paths } from '../lib/path-data';

// Load env from .env.local
dotenv.config({ path: path.resolve(__dirname, '../../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// Use Service Role Key to bypass RLS
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase URL or Key in .env.local");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
    db: { schema: 'vidya' }
});

async function seedPaths() {
    console.log("🌱 Starting Paths Seed...");

    for (const p of paths) {
        console.log(`Processing Path: ${p.title}`);

        // Extract icon name (assuming it's a function, we store the name or just a placeholder)
        // In this seed, we might just store a string identifier if the schema expects text.
        // The postgres schema has 'icon text'.
        // In path-data.ts, 'icon' is a component. We need a way to serialize it.
        // For now, let's use the slug as a proxy or just hardcode "Layers" etc if possible.
        // Actually, we can get the name from the component or just map it.
        // To be safe and simple, I'll assume we want to store the "name" of the icon.
        
        let iconName = "Layers"; // Default
        // Try to get name from the object if possible, or mapping.
        // Since we can't easily retrieve the name from the component function in compiled JS without explicit mapping,
        // and we are running this in node...
        // I will map based on the known list in path-data.
        
        // Manual mapping for the seed script to ensure it works nicely
        if (p.slug === 'full-stack-master') iconName = "Layers";
        if (p.slug === 'ai-architect') iconName = "Brain";
        if (p.slug === 'cloud-native') iconName = "Globe";
        if (p.slug === 'cyber-security') iconName = "Shield";
        if (p.slug === 'data-scientist') iconName = "BarChart";
        if (p.slug === 'mobile-wizard') iconName = "Smartphone";
        if (p.slug === 'blockchain-dev') iconName = "Link";
        if (p.slug === 'automation-expert') iconName = "Cog";

        const { error: pathError } = await supabase
            .from('paths')
            .upsert({
                slug: p.slug,
                title: p.title,
                description: p.description,
                icon: iconName,
                color: p.color,
                duration: p.duration,
                role: p.role,
                salary_range: p.salary,
                companies: p.companies,
                is_published: true,
                metadata: {
                    syllabus: p.syllabus
                }
            }, { onConflict: 'slug' })
            .select()
            .single();

        if (pathError) {
            console.error(`Error inserting path ${p.title}:`, pathError.message);
            continue;
        }

        console.log(`✅ Upserted Path: ${p.title}`);
        
        // Note: Linking courses to paths (path_courses) is a separate step 
        // that requires identifying which courses belong to which path.
        // Currently path-data.ts only has a count 'courses: 8'.
        // We will skip linking for now until we have that mapping.
    }

    console.log("✅ Paths Seeding Complete!");
}

seedPaths();
