export function Evolution() {
  const bars = [2, 3, 4, 3, 5, 6, 7, 8];
  return (
    <section className="container-xl py-14">
      <h3 className="text-2xl font-semibold">ACMP‑Entwicklung & Intelligenz</h3>
      <div className="mt-6 grid gap-8 lg:grid-cols-2 items-center">
        <div className="space-y-5 text-white/80">
          <p>
            ACMP entwickelt sich kontinuierlich weiter – durch intelligentes Lernen aus Ihren Bereitstellungsmustern,
            Client‑Verhalten und Betriebsfeedback – für optimale Leistung und Zuverlässigkeit.
          </p>
          <div className="flex items-start gap-3">
            <span className="inline-grid h-9 w-9 place-items-center rounded-full bg-black/40 border border-primary/50 text-primary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M9 12l2 2 4-4" stroke="var(--color-primary)" strokeWidth="2" />
                <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" stroke="var(--color-primary)" strokeWidth="2" opacity=".7" />
              </svg>
            </span>
            <div>
              <div className="font-medium text-white">Intelligente Befehlsoptimierung</div>
              <div className="text-sm">KI‑gestützte Zeitplanung und Ausführungsoptimierung auf Basis historischer Leistungsdaten.</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="inline-grid h-9 w-9 place-items-center rounded-full bg-black/40 border border-primary/50 text-primary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                <circle cx="12" cy="12" r="8" stroke="var(--color-primary)" strokeWidth="2" />
                <path d="M12 8v4l3 2" stroke="var(--color-primary)" strokeWidth="2" opacity=".7" />
                <path d="M12 2v2" stroke="var(--color-primary)" strokeWidth="2" />
                <path d="M12 20v2" stroke="var(--color-primary)" strokeWidth="2" />
              </svg>
            </span>
            <div>
              <div className="font-medium text-white">Prädiktive Rollouts</div>
              <div className="text-sm">Machine‑Learning‑Algorithmen prognostizieren optimale Rollout‑Fenster und passen Zeitpläne automatisch an.</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="inline-grid h-9 w-9 place-items-center rounded-full bg-black/40 border border-primary/50 text-primary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                <rect x="2" y="3" width="20" height="14" rx="2" stroke="var(--color-primary)" strokeWidth="2" />
                <circle cx="9" cy="9" r="1" fill="var(--color-primary)" />
                <circle cx="12" cy="9" r="1" fill="var(--color-primary)" />
                <circle cx="15" cy="9" r="1" fill="var(--color-primary)" />
              </svg>
            </span>
            <div>
              <div className="font-medium text-white">Adaptives Monitoring</div>
              <div className="text-sm">Echtzeit‑Überwachung, die aus Mustern lernt und Alarmgrenzen automatisch anpasst.</div>
            </div>
          </div>
        </div>
        <div className="rounded-2xl p-6 neon-tile">
          <svg viewBox="0 0 320 200" className="w-full h-[220px]">
            <defs>
              <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.9" />
                <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            {bars.map((v, i) => {
              const bw = 28;
              const gap = 12;
              const x = 20 + i * (bw + gap);
              const height = v * 18;
              const y = 180 - height;
              return <rect key={i} x={x} y={y} width={bw} height={height} rx="4" fill="url(#barGrad)" />;
            })}
            <polyline
              points={bars
                .map((v, i) => {
                  const bw = 28;
                  const gap = 12;
                  const x = 20 + i * (bw + gap) + bw / 2;
                  const y = 180 - v * 18 - 10;
                  return `${x},${y}`;
                })
                .join(" ")}
              fill="none"
              stroke="var(--color-primary)"
              strokeWidth="2"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}


