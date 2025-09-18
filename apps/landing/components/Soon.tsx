import Link from "next/link";

export function Soon() {
  return (
    <section className="container-xl py-24 text-center glow">
      <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight heading-gradient">
        Die Plattform kommt in Kürze
      </h1>
      <p className="mt-5 text-white/70 max-w-2xl mx-auto">
        Wir können es kaum erwarten, Ihnen etwas Großartiges zu zeigen.
      </p>
      <div className="mt-10">
      <Link
            href="/acmp-web"
            className="inline-flex items-center justify-center rounded-full bg-primary text-white px-4 py-2 font-medium transition-shadow duration-300 hover:opacity-90 shadow-[0_0_16px_6px_rgba(124,92,255,0.28),_0_0_0_4px_rgba(124,92,255,0.15)_inset]"
          >
            Zur ACMP‑Seite
          </Link>
      </div>
    </section>
  );
}


