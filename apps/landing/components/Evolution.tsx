export function Evolution() {
  const bars = [2, 3, 4, 3, 5, 6, 7, 8];
  return (
    <section className="container-xl py-14">
      <h3 className="text-2xl font-semibold">Continuous Evolution & Adaptability</h3>
      <div className="mt-6 grid gap-8 lg:grid-cols-2 items-center">
        <div className="space-y-5 text-white/80">
          <p>
            OmniNode grows with your business via continuous feedback mechanisms and adaptive features to meet
            evolving needs.
          </p>
          <div className="flex items-start gap-3">
            <span className="inline-grid h-9 w-9 place-items-center rounded-full bg-black/40 border border-primary/50 text-primary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M20 12a8 8 0 1 1-2.34-5.66" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M20 4v6h-6" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <div>
              <div className="font-medium text-white">Continuous Updates</div>
              <div className="text-sm">Regular platform updates with new features and integrations based on user feedback.</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="inline-grid h-9 w-9 place-items-center rounded-full bg-black/40 border border-primary/50 text-primary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                <rect x="4" y="4" width="6" height="6" stroke="var(--color-primary)" strokeWidth="2" />
                <rect x="14" y="4" width="6" height="6" stroke="var(--color-primary)" strokeWidth="2" />
                <rect x="4" y="14" width="6" height="6" stroke="var(--color-primary)" strokeWidth="2" />
                <rect x="14" y="14" width="6" height="6" stroke="var(--color-primary)" strokeWidth="2" />
              </svg>
            </span>
            <div>
              <div className="font-medium text-white">Scalable Architecture</div>
              <div className="text-sm">Seamlessly scales as your organization grows and requirements evolve.</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="inline-grid h-9 w-9 place-items-center rounded-full bg-black/40 border border-primary/50 text-primary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M20 14a6 6 0 0 1-6 6H9l-4 3v-6a6 6 0 0 1-3-5V8a6 6 0 0 1 6-6h6a6 6 0 0 1 6 6v6Z" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <div>
              <div className="font-medium text-white">Feedback Integration</div>
              <div className="text-sm">Built-in feedback mechanisms help the platform adapt to demands over time.</div>
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


