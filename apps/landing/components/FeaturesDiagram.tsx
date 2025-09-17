import Link from "next/link";
import Image from "next/image";

export function FeaturesDiagram() {
  return (
    <section
      id="solutions"
      className="container-xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-12"
    >
      <div>
        <h2 className="text-3xl sm:text-4xl font-semibold">
          Erweiterte Client‑Management‑Plattform (ACMP)
        </h2>
        <p className="mt-4 text-white/70 max-w-xl">
          Die ACMP‑Integration von OmniNode bietet umfassendes Befehlsmanagement für Clients,
          automatisierte Rollouts und zentrale Kontrolle über Ihr gesamtes Client‑Ökosystem.
        </p>

        <div className="mt-8">
          <Link
            href="#get-started"
            className="inline-flex items-center justify-center rounded-full bg-primary text-white px-4 py-2 font-medium transition-shadow duration-300 hover:opacity-90 shadow-[0_0_16px_6px_rgba(124,92,255,0.28),_0_0_0_4px_rgba(124,92,255,0.15)_inset]"
          >
            Jetzt starten
          </Link>
        </div>
      </div>

      <div className="flex justify-center">
        <Image
          src="/features-diagram.svg"
          alt="Features Diagram"
          width={390}
          height={260}
        />
      </div>
    </section>
  );
}
