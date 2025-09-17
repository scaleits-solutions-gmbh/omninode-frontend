import Link from "next/link";

export function CallToAction() {
  return (
    <section className="container-xl py-14">
      <div className="relative overflow-hidden rounded-2xl p-8 md:p-10">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-primary/10 to-transparent" />
        <div className="relative z-10 grid md:grid-cols-2 gap-6 items-center">
          <div>
            <h3 className="text-2xl md:text-3xl font-semibold">Bereit, Ihr Client‑Management zu transformieren?</h3>
            <p className="mt-2 text-white/70">Erleben Sie die Stärke der ACMP‑Integration mit OmniNode und übernehmen Sie die Kontrolle über Ihr gesamtes Client‑Ökosystem.</p>
          </div>
          <div className="flex md:justify-end">
            <Link href="#get-started" className="rounded-full bg-primary text-white px-6 py-3 font-medium hover:opacity-90">
              Jetzt starten
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}


