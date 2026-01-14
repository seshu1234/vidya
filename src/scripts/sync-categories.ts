
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase URL or Service Role Key");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function syncCategories() {
    console.log("Fetching unique categories from courses...");
    
    const { data: courses, error: fetchError } = await supabase
        .schema('vidya')
        .from('courses')
        .select('category');

    if (fetchError) {
        console.error("Error fetching courses:", fetchError);
        return;
    }

    const uniqueCategoryNames = Array.from(new Set(courses?.map(c => c.category).filter(Boolean)));
    console.log(`Found ${uniqueCategoryNames.length} unique categories.`);

    for (const name of uniqueCategoryNames) {
        const slug = name!.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-').replace(/[^a-z0-9-]/g, '');
        
        console.log(`Syncing category: ${name} (${slug})`);
        
        const { error: insertError } = await supabase
            .schema('vidya')
            .from('categories')
            .upsert({ name, slug }, { onConflict: 'name' });

        if (insertError) {
            console.error(`Error syncing ${name}:`, insertError.message);
        }
    }

    console.log("✅ Categories sync complete!");
}

syncCategories();
