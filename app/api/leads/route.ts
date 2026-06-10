import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { isAuthenticated } from "@/lib/auth";

export const dynamic = "force-dynamic";

/** Public: create a booking request from the landing page form. */
export async function POST(req: NextRequest) {
  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const name = String(body.name || "").trim().slice(0, 120);
  const phone = String(body.phone || "").trim().slice(0, 40);
  const email = body.email ? String(body.email).trim().slice(0, 160) : null;
  const service = String(body.service || "").trim().slice(0, 120);
  const booking_date = String(body.booking_date || "");
  const booking_time = String(body.booking_time || "");
  const message = body.message ? String(body.message).trim().slice(0, 1000) : null;
  const lang = ["fr", "nl", "en"].includes(body.lang) ? body.lang : "fr";

  if (!name || !phone || !service) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(booking_date) || !/^\d{2}:\d{2}$/.test(booking_time)) {
    return NextResponse.json({ error: "Invalid date or time" }, { status: 400 });
  }

  const { error } = await supabase.from("bookings").insert({
    name, phone, email, service, booking_date, booking_time, message, lang,
  });

  if (error) {
    console.error("Supabase insert error:", error.message);
    return NextResponse.json({ error: "Insert failed" }, { status: 500 });
  }
  return NextResponse.json({ ok: true }, { status: 201 });
}

/** Admin only: list bookings. */
export async function GET() {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .order("booking_date", { ascending: true })
    .order("booking_time", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ bookings: data });
}

/** Admin only: update booking status. */
export async function PATCH(req: NextRequest) {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }
  const body = await req.json();
  const id = String(body.id || "");
  const status = String(body.status || "");
  if (!id || !["new", "confirmed", "cancelled"].includes(status)) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
  const { error } = await supabase.from("bookings").update({ status }).eq("id", id);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
