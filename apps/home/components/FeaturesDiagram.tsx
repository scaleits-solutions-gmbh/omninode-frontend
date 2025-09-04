import Link from "next/link";

export function FeaturesDiagram() {
  return (
    <section id="solutions" className="container-xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-12">
      <div>
        <h2 className="text-3xl sm:text-4xl font-semibold">Seamless System Integration</h2>
        <p className="mt-4 text-white/70 max-w-xl">
          OmniNode simplifies connecting your various systems, providing a unified platform to streamline
          operations.
        </p>

        <div className="mt-8">
        <Link
          href="#get-started"
          className="inline-flex items-center justify-center rounded-full bg-primary text-white px-4 py-2 font-medium hover:opacity-90 shadow-[0_0_0_4px_rgba(124,92,255,0.15)_inset]"
        >
          Get Started
        </Link>
      </div>
      
      </div>


      <div className="flex justify-center glass rounded-2xl p-6">
        {/* Diagram with center node and surrounding icons */}
        <svg width="360" height="240" viewBox="0 0 360 240" className="text-white/60">
          <defs>
            <filter id="glow" filterUnits="userSpaceOnUse">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <circle cx="180" cy="120" r="40" fill="#141420" stroke="#2a2a45" />
          <circle cx="180" cy="120" r="10" fill="#7c5cff" filter="url(#glow)" />
          {[
            [80, 60],
            [280, 60],
            [80, 180],
            [280, 180],
            [180, 30],
            [180, 210],
          ].map(([x, y], i) => (
            <g key={i}>
              <line x1="180" y1="120" x2={x} y2={y} stroke="#2a2a45" />
              <rect x={x - 18} y={y - 18} width="36" height="36" rx="8" fill="#141420" stroke="#2a2a45" />
            </g>
          ))}
        </svg>
      </div>
    </section>
  );
}


