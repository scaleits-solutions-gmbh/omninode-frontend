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
            <span className="h-8 w-8 rounded-md icon-badge grid place-items-center">⚙️</span>
            <div>
              <div className="font-medium text-white">Continuous Updates</div>
              <div className="text-sm">Regular platform updates with new features and integrations based on user feedback.</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="h-8 w-8 rounded-md icon-badge grid place-items-center">📈</span>
            <div>
              <div className="font-medium text-white">Scalable Architecture</div>
              <div className="text-sm">Seamlessly scales as your organization grows and requirements evolve.</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="h-8 w-8 rounded-md icon-badge grid place-items-center">💬</span>
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
                <stop offset="0%" stopColor="#7c5cff" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#7c5cff" stopOpacity="0.2" />
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
              stroke="#a996ff"
              strokeWidth="2"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}


