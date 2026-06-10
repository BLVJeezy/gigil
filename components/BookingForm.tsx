"use client";

import { useState } from "react";
import { Dict, Lang } from "@/lib/i18n/dictionaries";

const TIMES = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "13:00", "13:30", "14:00", "14:30", "15:00",
  "15:30", "16:00", "16:30", "17:00", "17:30",
];

export default function BookingForm({ dict, lang }: { dict: Dict; lang: Lang }) {
  const [state, setState] = useState<"idle" | "sending" | "success" | "error" | "invalid">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") || "").trim(),
      phone: String(fd.get("phone") || "").trim(),
      email: String(fd.get("email") || "").trim() || null,
      service: String(fd.get("service") || "").trim(),
      booking_date: String(fd.get("date") || ""),
      booking_time: String(fd.get("time") || ""),
      message: String(fd.get("message") || "").trim() || null,
      lang,
    };
    if (!payload.name || !payload.phone || !payload.service || !payload.booking_date || !payload.booking_time) {
      setState("invalid");
      return;
    }
    setState("sending");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("request failed");
      setState("success");
    } catch {
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="border border-gold/50 bg-carbon p-8 text-center" role="status">
        <span className="gold-rule mx-auto mb-4" />
        <p className="text-ivory text-lg font-display">{dict.form.success}</p>
      </div>
    );
  }

  const today = new Date().toISOString().slice(0, 10);

  return (
    <form onSubmit={onSubmit} className="bg-carbon border border-gold/30 p-6 sm:p-8" noValidate>
      <h2 className="font-display text-2xl text-ivory mb-6">{dict.form.title}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="sr-only">{dict.form.name}</span>
          <input name="name" required placeholder={dict.form.name + " *"} className="field" autoComplete="name" />
        </label>
        <label className="block">
          <span className="sr-only">{dict.form.phone}</span>
          <input name="phone" required type="tel" placeholder={dict.form.phone + " *"} className="field" autoComplete="tel" />
        </label>
        <label className="block sm:col-span-2">
          <span className="sr-only">{dict.form.email}</span>
          <input name="email" type="email" placeholder={dict.form.email} className="field" autoComplete="email" />
        </label>
        <label className="block sm:col-span-2">
          <span className="sr-only">{dict.form.service}</span>
          <select name="service" required className="field bg-carbon" defaultValue="">
            <option value="" disabled>
              {dict.form.service} *
            </option>
            {dict.services.items.map((s) => (
              <option key={s.name} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="block text-xs text-smoke mb-1">{dict.form.date} *</span>
          <input name="date" required type="date" min={today} className="field" />
        </label>
        <label className="block">
          <span className="block text-xs text-smoke mb-1">{dict.form.time} *</span>
          <select name="time" required className="field bg-carbon" defaultValue="">
            <option value="" disabled>
              --:--
            </option>
            {TIMES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
        <label className="block sm:col-span-2">
          <span className="sr-only">{dict.form.message}</span>
          <textarea name="message" rows={3} placeholder={dict.form.message} className="field resize-none" />
        </label>
      </div>

      {state === "invalid" && <p className="text-gold text-sm mt-3" role="alert">{dict.form.required}</p>}
      {state === "error" && <p className="text-red-400 text-sm mt-3" role="alert">{dict.form.error}</p>}

      <button type="submit" disabled={state === "sending"} className="btn-gold w-full mt-6 disabled:opacity-60">
        {state === "sending" ? dict.form.sending : dict.form.submit}
      </button>

      <p className="text-center mt-4">
        <a
          href="https://gigilcoiffure.be/rdv/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-smoke text-sm underline underline-offset-4 hover:text-gold transition-colors"
        >
          {dict.hero.altBooking}
        </a>
      </p>
    </form>
  );
}
