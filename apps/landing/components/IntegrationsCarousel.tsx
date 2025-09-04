"use client";

import { useRef } from "react";

export function IntegrationsCarousel() {
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  const cards = [
    {
      name: "Weclapp (ERP)",
      desc: "Cloud ERP for managing CRM, projects, sales, and inventory.",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
          <rect x="4" y="5" width="16" height="14" rx="2" stroke="var(--color-primary)" strokeWidth="2" />
          <path d="M4 9h16" stroke="var(--color-primary)" strokeWidth="2" opacity=".7" />
        </svg>
      ),
    },
    {
      name: "Sophos (Cybersecurity)",
      desc: "Endpoint and network security for modern enterprises.",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M12 3l8 4v5c0 5-4 7-8 9-4-2-8-4-8-9V7l8-4Z" stroke="var(--color-primary)" strokeWidth="2" />
        </svg>
      ),
    },
    {
      name: "Hornet Security",
      desc: "Email security and compliance for Microsoft 365.",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M3 6h18l-9 6-9-6Z" stroke="var(--color-primary)" strokeWidth="2" />
          <path d="M21 18H3V6" stroke="var(--color-primary)" strokeWidth="2" opacity=".7" />
        </svg>
      ),
    },
    {
      name: "Acronis (Data protection)",
      desc: "Backup and disaster recovery with cyber protection.",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="12" cy="12" r="8" stroke="var(--color-primary)" strokeWidth="2" />
          <path d="M12 8v4l3 2" stroke="var(--color-primary)" strokeWidth="2" opacity=".7" />
        </svg>
      ),
    },
    {
      name: "3CX (Communication)",
      desc: "Unified business communications and contact center.",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M5 4h14v16H5z" stroke="var(--color-primary)" strokeWidth="2" />
          <circle cx="12" cy="18" r="1" fill="var(--color-primary)" />
        </svg>
      ),
    },
    {
      name: "Microsoft 365 (Office)",
      desc: "Productivity suite: Outlook, Teams, SharePoint, and more.",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
          <rect x="4" y="4" width="6" height="6" stroke="var(--color-primary)" strokeWidth="2" />
          <rect x="14" y="4" width="6" height="6" stroke="var(--color-primary)" strokeWidth="2" />
          <rect x="4" y="14" width="6" height="6" stroke="var(--color-primary)" strokeWidth="2" />
          <rect x="14" y="14" width="6" height="6" stroke="var(--color-primary)" strokeWidth="2" />
        </svg>
      ),
    },
  ];

  const scroll = (dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = Math.min(600, el.clientWidth * 0.9) * dir;
    el.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <section id="integrations" className="container-xl py-10">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-semibold">Selected Integrations</h3>
        <div className="flex gap-2">
          <button aria-label="Previous" onClick={() => scroll(-1)} className="h-9 w-9 rounded-full border border-white/15 text-white/80 hover:bg-white/10 grid place-items-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2"/></svg>
          </button>
          <button aria-label="Next" onClick={() => scroll(1)} className="h-9 w-9 rounded-full border border-white/15 text-white/80 hover:bg-white/10 grid place-items-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2"/></svg>
          </button>
        </div>
      </div>
      <div className="relative">
        <div ref={scrollerRef} className="mt-2 overflow-x-auto snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none]" style={{scrollbarWidth: "none"}}>
          <div className="flex gap-6 w-max pr-4">
            {cards.map((c) => (
              <div key={c.name} className="min-w-[320px] md:min-w-[460px] snap-start rounded-2xl p-6 neon-tile">
                <div className="flex items-center gap-3">
                  <span className="inline-grid h-9 w-9 place-items-center rounded-full bg-black/40 border border-primary/50 text-primary">
                    {c.icon}
                  </span>
                  <div className="font-medium">{c.name}</div>
                </div>
                <p className="mt-3 text-white/70 text-sm">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-background to-transparent" />
      </div>
    </section>
  );
}


