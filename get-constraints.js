/* eslint-disable @typescript-eslint/no-require-imports */
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

async function getConstraints() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    console.log("Fetching constraints for vidya.courses...");
    // Again, trick to see what's there
    const { data, error } = await supabase.rpc('run_sql', { sql: "SELECT conname, pg_get_constraintdef(oid) FROM pg_constraint WHERE conrelid = 'vidya.courses'::regclass" });
    
    if (error) {
        console.error("RPC failed.");
    } else {
        console.log("Constraints:", data);
    }
}

getConstraints();
