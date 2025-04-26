import { createClient } from '@supabase/supabase-js';

// TODO: Replace with your actual Supabase URL and Anon Key
// It's recommended to store these in environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase URL or Anon Key in environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
