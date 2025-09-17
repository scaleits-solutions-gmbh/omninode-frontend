export function Overview() {
  return (
    <section id="overview" className="container-xl py-14">
      <h2 className="text-3xl font-semibold">General Overview of the OmniNode Platform</h2>
      <p className="mt-4 text-white/70 max-w-3xl">
        OmniNode is a SaaS platform that centralizes the management of enterprise applications. Its modular
        architecture integrates ERP systems, cybersecurity, data protection, and communication into one optimized
        work environment.
      </p>
    </section>
  );
}

export function Vision() {
  return (
    <section id="vision" className="container-xl py-10">
      <h3 className="text-2xl font-semibold">Strategic Vision</h3>
      <p className="mt-3 text-white/70 max-w-3xl">
        OmniNode enables companies to adapt and grow without compromising security and efficiency. It offers a
        complete, versatile SaaS platform that simplifies software management for service providers and their
        customers.
      </p>
      <ul className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-white/80">
        {[
          "ERP systems",
          "Cybersecurity solutions",
          "Data protection",
          "Corporate communication",
        ].map((item) => (
          <li key={item} className="rounded-md border border-white/10 bg-black/20 p-4">{item}</li>
        ))}
      </ul>
    </section>
  );
}

export function Pillars() {
  return (
    <section id="pillars" className="container-xl py-10">
      <h3 className="text-2xl font-semibold">Wesentliche ACMP‑Funktionen</h3>
      <div className="mt-8 grid gap-16 lg:grid-cols-2">
        {/* Feature 1 */}
        <div className="grid md:grid-cols-[160px_1fr] gap-6 items-start gradient-card rounded-2xl p-6">
          <div className="h-24 w-24 icon-badge rounded-xl grid place-items-center">
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M9 12l2 2 4-4" stroke="var(--color-primary)" strokeWidth="2" />
              <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" stroke="var(--color-primary)" strokeWidth="2" opacity=".7" />
            </svg>
          </div>
          <div>
            <h4 className="text-xl font-semibold">Command‑ & Control‑Center</h4>
            <p className="mt-2 text-white/70">
              Zentrales Befehlsmanagement mit Versionskontrolle, Zeitplanung und Stapelausführung
              für nahtlose Client‑Operationen.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <span className="rounded-full neon-pill px-3 py-1 text-sm text-white/90">Stapelbefehle</span>
              <span className="rounded-full neon-pill px-3 py-1 text-sm text-white/90">Versionskontrolle</span>
              <span className="rounded-full neon-pill px-3 py-1 text-sm text-white/90">Audit‑Protokolle</span>
            </div>
          </div>
        </div>
        {/* Feature 3 */}
        <div className="grid md:grid-cols-[160px_1fr] gap-6 items-start gradient-card rounded-2xl p-6">
          <div className="h-24 w-24 icon-badge rounded-xl grid place-items-center">
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none" aria-hidden>
              <rect x="2" y="3" width="20" height="14" rx="2" stroke="var(--color-primary)" strokeWidth="2" />
              <circle cx="9" cy="9" r="1" fill="var(--color-primary)" />
              <circle cx="12" cy="9" r="1" fill="var(--color-primary)" />
              <circle cx="15" cy="9" r="1" fill="var(--color-primary)" />
            </svg>
          </div>
          <div>
            <h4 className="text-xl font-semibold">Echtzeit‑Client‑Monitoring</h4>
            <p className="mt-2 text-white/70">
              Live‑Dashboard zur Überwachung von Client‑Zustand, Befehlsstatus und Systemleistung
              mit Sofortbenachrichtigungen und detaillierten Berichten.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <span className="rounded-full neon-pill px-3 py-1 text-sm text-white/90">Live‑Dashboard</span>
              <span className="rounded-full neon-pill px-3 py-1 text-sm text-white/90">Sofort‑Alerts</span>
              <span className="rounded-full neon-pill px-3 py-1 text-sm text-white/90">Leistungsmetriken</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Integrations() {
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
  return (
    <section id="integrations" className="container-xl py-10">
      <h3 className="text-2xl font-semibold">Selected Integrations</h3>
      <div className="mt-6 overflow-x-auto snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none]" style={{scrollbarWidth: "none"}}>
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
    </section>
  );
}

// Applications section removed per request



