import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Created lazily so a missing configuration can never crash the build or
// the page. Returns null when the public Supabase env vars are not set.
let client: SupabaseClient | null | undefined;

export function getSupabase(): SupabaseClient | null {
  if (client !== undefined) return client;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  client = url && key ? createClient(url, key, { auth: { persistSession: false } }) : null;
  return client;
}
