import Link from "next/link";

export function Hero() {
  return (
    <section className="container-xl py-24 text-center glow">
      <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight heading-gradient">
        The Integration Platform
      </h1>
      <p className="mt-5 text-white/70 max-w-2xl mx-auto">
        Connect and manage all your systems with ease.
      </p>
      <div className="mt-10">
        <Link href="#get-started" className="inline-flex rounded-lg bg-primary px-7 py-3.5 font-semibold text-white shadow-lg hover:opacity-90">
          Get Started
        </Link>
      </div>
    </section>
  );
}


