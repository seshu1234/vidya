/* eslint-disable @typescript-eslint/no-require-imports */
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

async function checkVersions() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    console.log("Checking vidya.has_role...");
    const { data: vData, error: vError } = await supabase.rpc('has_role', { required_role: 'admin' }).schema('vidya');
    if (vError) console.log("vidya.has_role call failed:", vError.message);
    else console.log("vidya.has_role works! Result:", vData);

    console.log("Checking public.has_role...");
    const { data: pData, error: pError } = await supabase.rpc('has_role', { required_role: 'admin' });
    if (pError) console.log("public.has_role call failed:", pError.message);
    else console.log("public.has_role works! Result:", pData);
}

checkVersions();
