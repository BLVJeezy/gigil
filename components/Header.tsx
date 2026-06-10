"use client";

import { useState } from "react";
import Link from "next/link";
import { Dict, Lang, LANGS } from "@/lib/i18n/dictionaries";

export default function Header({ dict, lang }: { dict: Dict; lang: Lang }) {
  const [open, setOpen] = useState(false);

  const links = [
    { href: "#services", label: dict.nav.services },
    { href: "#why", label: dict.nav.why },
    { href: "#gallery", label: dict.nav.gallery },
    { href: "#faq", label: dict.nav.faq },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-noir/95 backdrop-blur border-b border-gold/20">
      <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
        <Link href={`/${lang}`} className="font-display text-xl text-ivory tracking-wide">
          GiGi <span className="text-gold">L</span> Coiffure
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-ivory/80 hover:text-gold transition-colors">
              {l.label}
            </a>
          ))}
          <a href="#booking" className="btn-gold !px-5 !py-2.5">
            {dict.nav.book}
          </a>
          <LangSwitcher lang={lang} />
        </nav>

        {/* Mobile: lang + burger */}
        <div className="flex md:hidden items-center gap-4">
          <LangSwitcher lang={lang} />
          <button
            onClick={() => setOpen(!open)}
            aria-label="Menu"
            aria-expanded={open}
            className="text-ivory p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            <svg width="22" height="16" viewBox="0 0 22 16" fill="none" aria-hidden="true">
              {open ? (
                <path d="M2 2L20 14M20 2L2 14" stroke="currentColor" strokeWidth="2" />
              ) : (
                <path d="M0 1h22M0 8h22M0 15h22" stroke="currentColor" strokeWidth="2" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="md:hidden bg-noir border-t border-gold/20 px-4 py-6 flex flex-col gap-5" aria-label="Mobile">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-ivory/90 text-lg">
              {l.label}
            </a>
          ))}
          <a href="#booking" onClick={() => setOpen(false)} className="btn-gold text-center">
            {dict.nav.book}
          </a>
        </nav>
      )}
    </header>
  );
}

function LangSwitcher({ lang }: { lang: Lang }) {
  return (
    <div className="flex items-center gap-2 text-xs uppercase tracking-widest">
      {LANGS.map((l, i) => (
        <span key={l} className="flex items-center gap-2">
          {i > 0 && <span className="text-smoke">·</span>}
          <Link
            href={`/${l}`}
            className={l === lang ? "text-gold font-medium" : "text-ivory/60 hover:text-ivory"}
            aria-current={l === lang ? "true" : undefined}
          >
            {l}
          </Link>
        </span>
      ))}
    </div>
  );
}
