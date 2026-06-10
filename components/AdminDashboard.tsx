"use client";

import { useEffect, useMemo, useState } from "react";
import type { Booking, BookingStatus } from "@/lib/supabase";

type View = "leads" | "day" | "week";

const HOURS = Array.from({ length: 10 }, (_, i) => 9 + i); // 09:00 → 18:00
const STATUS_STYLE: Record<BookingStatus, string> = {
  new: "bg-gold/20 border-gold text-gold",
  confirmed: "bg-emerald-500/15 border-emerald-500 text-emerald-400",
  cancelled: "bg-red-500/10 border-red-500/60 text-red-400 line-through",
};
const STATUS_LABEL: Record<BookingStatus, string> = {
  new: "Nouveau",
  confirmed: "Confirmé",
  cancelled: "Annulé",
};

function fmtDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}
function startOfWeek(d: Date): Date {
  const x = new Date(d);
  const day = (x.getDay() + 6) % 7; // Monday = 0
  x.setDate(x.getDate() - day);
  x.setHours(0, 0, 0, 0);
  return x;
}
function addDays(d: Date, n: number): Date {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
}

export default function AdminDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [view, setView] = useState<View>("leads");
  const [anchor, setAnchor] = useState<Date>(() => new Date());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/leads");
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || `HTTP ${res.status}`);
      }
      const j = await res.json();
      setBookings(j.bookings || []);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function setStatus(id: string, status: BookingStatus) {
    setBookings((b) => b.map((x) => (x.id === id ? { ...x, status } : x)));
    await fetch("/api/leads", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
  }

  async function logout() {
    await fetch("/api/auth", { method: "DELETE" });
    window.location.reload();
  }

  const newCount = bookings.filter((b) => b.status === "new").length;

  return (
    <main className="min-h-screen bg-noir text-ivory">
      <header className="border-b border-gold/20 px-4 py-4 flex flex-wrap items-center gap-4 justify-between">
        <p className="font-display text-xl">
          GiGi <span className="text-gold">L</span> — Tableau de bord
          {newCount > 0 && (
            <span className="ml-3 text-xs bg-gold text-noir px-2 py-1 align-middle">{newCount} nouveau(x)</span>
          )}
        </p>
        <div className="flex items-center gap-2">
          {(["leads", "day", "week"] as View[]).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-4 py-2 text-xs uppercase tracking-widest border transition-colors ${
                view === v ? "border-gold text-gold" : "border-smoke/40 text-smoke hover:text-ivory"
              }`}
            >
              {v === "leads" ? "Demandes" : v === "day" ? "Jour" : "Semaine"}
            </button>
          ))}
          <button onClick={load} className="px-3 py-2 text-xs text-smoke hover:text-gold" title="Rafraîchir">
            ↻
          </button>
          <button onClick={logout} className="px-3 py-2 text-xs text-smoke hover:text-red-400">
            Déconnexion
          </button>
        </div>
      </header>

      <div className="p-4 max-w-7xl mx-auto">
        {error && (
          <div className="border border-red-500/50 bg-red-500/10 text-red-300 p-4 mb-6 text-sm">
            Erreur : {error}. Vérifiez la configuration Supabase (.env).
          </div>
        )}
        {loading ? (
          <p className="text-smoke py-12 text-center">Chargement…</p>
        ) : view === "leads" ? (
          <LeadsTable bookings={bookings} onStatus={setStatus} />
        ) : (
          <Calendar
            bookings={bookings.filter((b) => b.status !== "cancelled")}
            mode={view}
            anchor={anchor}
            setAnchor={setAnchor}
          />
        )}
      </div>
    </main>
  );
}

/* ---------------- Leads table ---------------- */

function LeadsTable({
  bookings,
  onStatus,
}: {
  bookings: Booking[];
  onStatus: (id: string, s: BookingStatus) => void;
}) {
  const sorted = useMemo(
    () => [...bookings].sort((a, b) => (a.created_at < b.created_at ? 1 : -1)),
    [bookings]
  );

  if (sorted.length === 0) {
    return <p className="text-smoke py-12 text-center">Aucune demande pour le moment.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-xs uppercase tracking-widest text-smoke border-b border-smoke/30">
            <th className="py-3 pr-4">Client</th>
            <th className="py-3 pr-4">Service</th>
            <th className="py-3 pr-4">Date / Heure</th>
            <th className="py-3 pr-4">Contact</th>
            <th className="py-3 pr-4">Message</th>
            <th className="py-3">Statut</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((b) => (
            <tr key={b.id} className="border-b border-smoke/15 align-top">
              <td className="py-3 pr-4 font-medium">{b.name}</td>
              <td className="py-3 pr-4 text-ivory/80">{b.service}</td>
              <td className="py-3 pr-4 whitespace-nowrap">
                {b.booking_date}
                <span className="text-gold ml-2">{b.booking_time.slice(0, 5)}</span>
              </td>
              <td className="py-3 pr-4 text-ivory/70">
                <a href={`tel:${b.phone}`} className="hover:text-gold block">{b.phone}</a>
                {b.email && (
                  <a href={`mailto:${b.email}`} className="hover:text-gold block text-xs">{b.email}</a>
                )}
              </td>
              <td className="py-3 pr-4 text-ivory/60 max-w-[220px]">{b.message || "—"}</td>
              <td className="py-3">
                <div className="flex flex-col gap-1">
                  <span className={`inline-block border px-2 py-0.5 text-xs w-fit ${STATUS_STYLE[b.status]}`}>
                    {STATUS_LABEL[b.status]}
                  </span>
                  <div className="flex gap-2 text-xs">
                    {b.status !== "confirmed" && (
                      <button onClick={() => onStatus(b.id, "confirmed")} className="text-emerald-400 hover:underline">
                        Confirmer
                      </button>
                    )}
                    {b.status !== "cancelled" && (
                      <button onClick={() => onStatus(b.id, "cancelled")} className="text-red-400 hover:underline">
                        Annuler
                      </button>
                    )}
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ---------------- Calendar (day / week) ---------------- */

function Calendar({
  bookings,
  mode,
  anchor,
  setAnchor,
}: {
  bookings: Booking[];
  mode: "day" | "week";
  anchor: Date;
  setAnchor: (d: Date) => void;
}) {
  const days = useMemo(() => {
    if (mode === "day") return [new Date(anchor)];
    const monday = startOfWeek(anchor);
    return Array.from({ length: 7 }, (_, i) => addDays(monday, i));
  }, [mode, anchor]);

  const byDay = useMemo(() => {
    const map = new Map<string, Booking[]>();
    for (const b of bookings) {
      const list = map.get(b.booking_date) || [];
      list.push(b);
      map.set(b.booking_date, list);
    }
    return map;
  }, [bookings]);

  const todayStr = fmtDate(new Date());
  const step = mode === "day" ? 1 : 7;
  const label =
    mode === "day"
      ? anchor.toLocaleDateString("fr-BE", { weekday: "long", day: "numeric", month: "long", year: "numeric" })
      : `${days[0].toLocaleDateString("fr-BE", { day: "numeric", month: "short" })} – ${days[6].toLocaleDateString(
          "fr-BE",
          { day: "numeric", month: "short", year: "numeric" }
        )}`;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => setAnchor(addDays(anchor, -step))} className="btn-outline !px-4 !py-2 text-xs">
          ←
        </button>
        <div className="text-center">
          <p className="font-display text-lg capitalize">{label}</p>
          <button onClick={() => setAnchor(new Date())} className="text-xs text-smoke hover:text-gold">
            Aujourd&apos;hui
          </button>
        </div>
        <button onClick={() => setAnchor(addDays(anchor, step))} className="btn-outline !px-4 !py-2 text-xs">
          →
        </button>
      </div>

      <div className="overflow-x-auto">
        <div
          className="grid min-w-[640px]"
          style={{ gridTemplateColumns: `56px repeat(${days.length}, minmax(0, 1fr))` }}
        >
          {/* Day headers */}
          <div />
          {days.map((d) => {
            const ds = fmtDate(d);
            const count = (byDay.get(ds) || []).length;
            return (
              <div
                key={ds}
                className={`text-center py-2 border-b border-smoke/30 ${ds === todayStr ? "text-gold" : "text-ivory/80"}`}
              >
                <p className="text-xs uppercase tracking-widest">
                  {d.toLocaleDateString("fr-BE", { weekday: "short" })}
                </p>
                <p className="font-display text-lg">{d.getDate()}</p>
                {count > 0 && <p className="text-[10px] text-gold">{count} rdv</p>}
              </div>
            );
          })}

          {/* Hour rows */}
          {HOURS.map((h) => (
            <Row key={h} hour={h} days={days} byDay={byDay} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Row({
  hour,
  days,
  byDay,
}: {
  hour: number;
  days: Date[];
  byDay: Map<string, Booking[]>;
}) {
  return (
    <>
      <div className="text-right pr-2 pt-1 text-xs text-smoke border-t border-smoke/15">
        {String(hour).padStart(2, "0")}:00
      </div>
      {days.map((d) => {
        const ds = fmtDate(d);
        const slot = (byDay.get(ds) || []).filter((b) => parseInt(b.booking_time.slice(0, 2), 10) === hour);
        return (
          <div key={ds + hour} className="min-h-[52px] border-t border-l border-smoke/15 p-1 space-y-1">
            {slot.map((b) => (
              <div key={b.id} className={`border px-2 py-1 text-[11px] leading-tight ${STATUS_STYLE[b.status]}`}>
                <span className="font-medium">{b.booking_time.slice(0, 5)}</span> {b.name}
                <span className="block opacity-80 truncate">{b.service}</span>
              </div>
            ))}
          </div>
        );
      })}
    </>
  );
}
