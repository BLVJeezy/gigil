"use client";

import { useState } from "react";
import { Dict } from "@/lib/i18n/dictionaries";

export default function Faq({ dict }: { dict: Dict }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className="divide-y divide-noir/10 border-y border-noir/10">
      {dict.faq.items.map((item, i) => {
        const open = openIdx === i;
        return (
          <div key={i}>
            <button
              onClick={() => setOpenIdx(open ? null : i)}
              aria-expanded={open}
              className="w-full flex items-center justify-between gap-4 py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              <span className="font-display text-lg text-noir">{item.q}</span>
              <span
                className={`text-gold text-2xl leading-none transition-transform duration-200 ${open ? "rotate-45" : ""}`}
                aria-hidden="true"
              >
                +
              </span>
            </button>
            {open && <p className="pb-5 text-smoke leading-relaxed pr-8">{item.a}</p>}
          </div>
        );
      })}
    </div>
  );
}
