import { createClient, SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

/** Server-side Supabase client (service role). Never expose to the browser. */
export function getSupabase(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  if (!client) client = createClient(url, key, { auth: { persistSession: false } });
  return client;
}

export type BookingStatus = "new" | "confirmed" | "cancelled";

export interface Booking {
  id: string;
  created_at: string;
  name: string;
  phone: string;
  email: string | null;
  service: string;
  booking_date: string; // YYYY-MM-DD
  booking_time: string; // HH:MM:SS
  message: string | null;
  lang: string;
  status: BookingStatus;
}
