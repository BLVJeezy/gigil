"use client";

import { useState } from "react";
import { Dict, Lang, ServiceCategory } from "@/lib/i18n/dictionaries";

const TIMES = [
  "09:00","09:30","10:00","10:30","11:00","11:30",
  "12:00","13:00","13:30","14:00","14:30","15:00",
  "15:30","16:00","16:30","17:00","17:30",
];

// Icons per category (inline SVG — no external dep)
const CAT_ICONS: Record<ServiceCategory, React.ReactNode> = {
  coiffure: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
      <path d="M12 2C8 2 5 5 5 9c0 2.5 1.2 4.7 3 6.1V20a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-4.9c1.8-1.4 3-3.6 3-6.1 0-4-3-7-7-7z"/>
      <path d="M9 9h6M9 12h6"/>
    </svg>
  ),
  nails: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
      <rect x="7" y="3" width="4" height="10" rx="2"/>
      <rect x="13" y="5" width="4" height="8" rx="2"/>
      <path d="M5 17h14v3a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-3z"/>
    </svg>
  ),
  microshading: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
      <path d="M4 9c2-3 6-4 8-4s6 1 8 4"/>
      <path d="M4 15c2 3 6 4 8 4s6-1 8-4"/>
      <circle cx="12" cy="12" r="2"/>
    </svg>
  ),
};

export default function BookingForm({ dict, lang }: { dict: Dict; lang: Lang }) {
  const [step, setStep] = useState<1 | 2>(1);
  const [category, setCategory] = useState<ServiceCategory | null>(null);
  const [formState, setFormState] = useState<"idle" | "sending" | "success" | "error" | "invalid">("idle");

  function selectCategory(cat: ServiceCategory) {
    setCategory(cat);
    setStep(2);
  }

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
      category,
    };
    if (!payload.name || !payload.phone || !payload.service || !payload.booking_date || !payload.booking_time) {
      setFormState("invalid");
      return;
    }
    setFormState("sending");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("failed");
      setFormState("success");
    } catch {
      setFormState("error");
    }
  }

  // Filter services to selected category
  const services = category
    ? dict.services.items.filter((s) => s.category === category)
    : dict.services.items;

  const today = new Date().toISOString().slice(0, 10);

  // Success state
  if (formState === "success") {
    return (
      <div className="border border-gold/50 bg-carbon p-8 text-center" role="status">
        <span className="gold-rule mx-auto mb-4" />
        <p className="text-ivory text-lg font-display">{dict.form.success}</p>
      </div>
    );
  }

  return (
    <div className="bg-carbon border border-gold/30">
      {/* ── Step indicator ── */}
      <div className="flex border-b border-gold/20">
        {([1, 2] as const).map((n) => (
          <div
            key={n}
            className={`flex-1 py-3 text-center text-xs uppercase tracking-eyebrow transition-colors ${
              step === n ? "text-gold border-b-2 border-gold" : "text-smoke"
            }`}
          >
            {dict.form.stepLabel} {n}
          </div>
        ))}
      </div>

      {/* ── Step 1: Category picker ── */}
      {step === 1 && (
        <div className="p-6 sm:p-8">
          <h2 className="font-display text-2xl text-ivory mb-6">{dict.form.categoryTitle}</h2>
          <div className="grid grid-cols-1 gap-3">
            {(["coiffure", "nails", "microshading"] as ServiceCategory[]).map((cat) => {
              const c = dict.form.categories[cat];
              return (
                <button
                  key={cat}
                  onClick={() => selectCategory(cat)}
                  className="flex items-center gap-5 text-left border border-smoke/30 p-5
                             hover:border-gold hover:bg-noir/40 transition-colors group focus:outline-none
                             focus-visible:ring-2 focus-visible:ring-gold"
                >
                  <span className="text-gold/70 group-hover:text-gold transition-colors shrink-0">
                    {CAT_ICONS[cat]}
                  </span>
                  <span>
                    <span className="block font-display text-xl text-ivory">{c.label}</span>
                    <span className="block text-sm text-smoke mt-0.5">{c.desc}</span>
                  </span>
                  <span className="ml-auto text-smoke group-hover:text-gold transition-colors text-xl">→</span>
                </button>
              );
            })}
          </div>

          <p className="text-center mt-5">
            <a
              href="https://gigilcoiffure.be/rdv/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-smoke text-sm underline underline-offset-4 hover:text-gold transition-colors"
            >
              {dict.hero.altBooking}
            </a>
          </p>
        </div>
      )}

      {/* ── Step 2: Booking details ── */}
      {step === 2 && category && (
        <form onSubmit={onSubmit} className="p-6 sm:p-8" noValidate>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl text-ivory">{dict.form.title}</h2>
            <button
              type="button"
              onClick={() => { setStep(1); setFormState("idle"); }}
              className="text-sm text-smoke hover:text-gold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              {dict.form.back}
            </button>
          </div>

          {/* Selected category badge */}
          <div className="inline-flex items-center gap-2 border border-gold/40 px-3 py-1.5 mb-5">
            <span className="text-gold scale-75">{CAT_ICONS[category]}</span>
            <span className="text-gold text-sm">{dict.form.categories[category].label}</span>
          </div>

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
                <option value="" disabled>{dict.form.service} *</option>
                {services.map((s) => (
                  <option key={s.name} value={s.name}>{s.name}</option>
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
                <option value="" disabled>--:--</option>
                {TIMES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </label>
            <label className="block sm:col-span-2">
              <span className="sr-only">{dict.form.message}</span>
              <textarea name="message" rows={3} placeholder={dict.form.message} className="field resize-none" />
            </label>
          </div>

          {formState === "invalid" && (
            <p className="text-gold text-sm mt-3" role="alert">{dict.form.required}</p>
          )}
          {formState === "error" && (
            <p className="text-red-400 text-sm mt-3" role="alert">{dict.form.error}</p>
          )}

          <button type="submit" disabled={formState === "sending"} className="btn-gold w-full mt-6 disabled:opacity-60">
            {formState === "sending" ? dict.form.sending : dict.form.submit}
          </button>
        </form>
      )}
    </div>
  );
}
