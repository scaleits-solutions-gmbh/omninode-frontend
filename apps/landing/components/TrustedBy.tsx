export function TrustedBy() {
  const brands = ["Zimmer", "Retool", "BCG", "Replit", "Outfront"];
  return (
    <section className="container-xl py-10">
      <div className="text-xs uppercase tracking-widest text-white/50 text-center mb-6">Trusted by teams</div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 opacity-80">
        {brands.map((b) => (
          <div key={b} className="h-10 rounded-md border border-white/10 bg-black/10 grid place-items-center text-white/60">
            {b}
          </div>
        ))}
      </div>
    </section>
  );
}


