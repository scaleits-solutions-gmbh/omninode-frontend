"use client";

import { useRef } from "react";

export function IntegrationsCarousel() {
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  const cards = [
    {
      name: "Client‑Befehlsverwaltung",
      desc: "Erstellen, verwalten und verteilen Sie Befehle gleichzeitig an mehrere Clients – mit Versionskontrolle und Prüfprotokollen.",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M9 12l2 2 4-4" stroke="var(--color-primary)" strokeWidth="2" />
          <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" stroke="var(--color-primary)" strokeWidth="2" opacity=".7" />
        </svg>
      ),
    },
    {
      name: "Automatisierte Rollouts",
      desc: "Planen und führen Sie automatisierte Software‑Bereitstellungen im gesamten Client‑Netzwerk mit Rollback‑Funktion durch.",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="12" cy="12" r="8" stroke="var(--color-primary)" strokeWidth="2" />
          <path d="M12 8v4l3 2" stroke="var(--color-primary)" strokeWidth="2" opacity=".7" />
          <path d="M12 2v2" stroke="var(--color-primary)" strokeWidth="2" />
          <path d="M12 20v2" stroke="var(--color-primary)" strokeWidth="2" />
        </svg>
      ),
    },
    {
      name: "Echtzeit‑Überwachung",
      desc: "Überwachen Sie Befehlsausführung, Client‑Konnektivität und Bereitstellungsfortschritt in Echtzeit.",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
          <rect x="2" y="3" width="20" height="14" rx="2" stroke="var(--color-primary)" strokeWidth="2" />
          <circle cx="9" cy="9" r="1" fill="var(--color-primary)" />
          <circle cx="12" cy="9" r="1" fill="var(--color-primary)" />
          <circle cx="15" cy="9" r="1" fill="var(--color-primary)" />
        </svg>
      ),
    },
    {
      name: "Client‑Inventar",
      desc: "Umfassende Bestandsverwaltung aller verbundenen Clients mit detaillierten Systeminformationen und Zustandsanzeige.",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
          <rect x="4" y="5" width="16" height="14" rx="2" stroke="var(--color-primary)" strokeWidth="2" />
          <path d="M4 9h16" stroke="var(--color-primary)" strokeWidth="2" opacity=".7" />
          <circle cx="8" cy="12" r="1" fill="var(--color-primary)" />
          <circle cx="12" cy="12" r="1" fill="var(--color-primary)" />
          <circle cx="16" cy="12" r="1" fill="var(--color-primary)" />
        </svg>
      ),
    },
    {
      name: "Sicherheit & Compliance",
      desc: "Unternehmenssichere Kommunikation mit Ende‑zu‑Ende‑Verschlüsselung, rollenbasierter Zugriffskontrolle und Compliance‑Berichten.",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M12 3l7 4v5c0 5-3.5 8-7 9-3.5-1-7-4-7-9V7l7-4Z" stroke="var(--color-primary)" strokeWidth="2" />
          <path d="M12 10a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z" stroke="var(--color-primary)" strokeWidth="2" opacity=".8"/>
        </svg>
      ),
    },
    {
      name: "Reporting & Analysen",
      desc: "Detaillierte Berichte und Analysen zu Client‑Bereitstellungen, Erfolgsraten von Befehlen und Systemleistung.",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M3 3v18h18" stroke="var(--color-primary)" strokeWidth="2" />
          <path d="M7 13l4-4 4 4 4-6" stroke="var(--color-primary)" strokeWidth="2" opacity=".7" />
          <circle cx="7" cy="13" r="1" fill="var(--color-primary)" />
          <circle cx="11" cy="9" r="1" fill="var(--color-primary)" />
          <circle cx="15" cy="13" r="1" fill="var(--color-primary)" />
          <circle cx="19" cy="7" r="1" fill="var(--color-primary)" />
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
        <h3 className="text-2xl font-semibold">ACMP‑Kernfunktionen</h3>
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
              <div key={c.name} className="min-w-[320px] md:min-w-[460px] max-w-[580px] snap-start rounded-2xl p-6 neon-tile">
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


