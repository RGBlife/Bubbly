import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const supabase = createClient(process.env.SUPABASE_PROJECT_URL, process.env.SUPABASE_PUBLIC_ANON);

export default supabase;