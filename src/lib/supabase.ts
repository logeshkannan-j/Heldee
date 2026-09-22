import { createClient } from "@supabase/supabase-js";

// Safe to expose in the frontend — the anon key only works within whatever
// your Row Level Security (RLS) policies allow. See supabase/migrations/.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  // eslint-disable-next-line no-console
  console.warn(
    "Missing VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY — copy .env.example to .env and fill in your project's values."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
