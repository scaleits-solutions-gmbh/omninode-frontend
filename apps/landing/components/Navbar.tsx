"use client";

import Image from "next/image";
import Link from "next/link";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/5 bg-background/70 backdrop-blur">
      <a href="#overview" className="sr-only focus:not-sr-only focus:absolute left-2 top-2 bg-white text-black px-3 py-2 rounded">Zum Inhalt springen</a>
      <div className="container-xl flex h-16 items-center justify-between">
        <Link href="#" className="flex items-center gap-2">
          <Image src="/omninode-logo.svg" alt="OMNINODE" width={24} height={24} />
          <span className="text-sm font-semibold tracking-wide">OMNINODE</span>
        </Link>
        <nav className="hidden">
          <Link href="#overview" className="hover:text-white transition-colors">Produkt</Link>
          <Link href="#vision" className="hover:text-white transition-colors">Lösungen</Link>
          <Link href="#applications" className="hover:text-white transition-colors">Über uns</Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="https://qa.app.omninode.one"
            className="rounded-md border border-white/15 px-4 py-2 text-sm text-white/90 hover:bg-white/10"
          >
            Anmelden
          </Link>
          <Link
            href="https://qa.app.omninode.one"
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white shadow-[0_0_0_4px_rgba(124,92,255,0.15)_inset] hover:opacity-90"
          >
            Registrieren
          </Link>
        </div>
        {/* Mobile menu button (hidden for now) */}
        <input id="menu-toggle" type="checkbox" className="peer sr-only" />
        <label htmlFor="menu-toggle" className="hidden">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2"/></svg>
        </label>
      </div>
      {/* Mobile drawer (hidden for now) */}
      <div className="hidden border-t border-white/5 bg-background/95">
        <div className="container-xl py-3 flex flex-col gap-3 text-white/90">
          <Link href="#overview">Produkt</Link>
          <Link href="#vision">Lösungen</Link>
          <Link href="#applications">Über uns</Link>
        </div>
      </div>
    </header>
  );
}


