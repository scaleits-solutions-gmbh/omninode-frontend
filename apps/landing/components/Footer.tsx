import Image from "next/image";

export function Footer() {
  return (
    <footer className="mt-16 pt-12 border-t border-white/5">
      <div className="container-xl grid grid-cols-2 md:grid-cols-4 gap-8 text-sm text-white/80">
        <div>
          <div className="flex items-center gap-2">
            <Image src="/omninode-logo.svg" alt="OMNINODE" width={22} height={22} />
            <span className="font-semibold text-white">OMNINODE</span>
          </div>
          <p className="mt-3 text-xs text-white/60 max-w-xs">
            The integration platform for modern service providers and their customers.
          </p>
          <div className="mt-4 flex gap-3">
            <a aria-label="Twitter" className="inline-flex h-8 w-8 items-center justify-center rounded border border-white/10 text-white/70 hover:bg-white/10" href="#">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M22 5.9c-.7.3-1.4.5-2.1.6.8-.5 1.3-1.2 1.6-2-.8.5-1.6.8-2.5 1-1.5-1.6-4.2-1-5.1.9-.4.8-.4 1.8-.1 2.6-3.1-.2-6-1.7-7.9-4.2-1 1.8-.5 4.1 1.2 5.3-.6 0-1.2-.2-1.7-.5 0 1.9 1.3 3.7 3.2 4.1-.6.2-1.2.2-1.8.1.5 1.6 2 2.7 3.7 2.8-1.4 1.1-3.1 1.7-4.9 1.7-.3 0-.6 0-.9-.1 1.8 1.2 3.9 1.9 6 1.9 7.3 0 11.3-6.2 11.1-11.8.8-.6 1.4-1.2 1.9-2z" fill="currentColor"/></svg>
            </a>
            <a aria-label="GitHub" className="inline-flex h-8 w-8 items-center justify-center rounded border border-white/10 text-white/70 hover:bg-white/10" href="#">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.2.8-.5v-1.9c-3.3.7-4-1.6-4-1.6-.6-1.5-1.4-1.9-1.4-1.9-1.2-.8.1-.8.1-.8 1.3.1 2 .1 2.9 1.9 1.2 2 3.1 1.4 3.9 1.1.1-.9.5-1.4.9-1.8-2.6-.3-5.4-1.3-5.4-5.8 0-1.3.5-2.5 1.3-3.3-.1-.3-.6-1.6.1-3.4 0 0 1.1-.4 3.5 1.3 1-.3 2-.4 3-.4s2 .1 3 .4C17 5.6 18.1 6 18.1 6c.7 1.8.2 3.1.1 3.4.9.8 1.3 2 1.3 3.3 0 4.5-2.8 5.5-5.5 5.8.5.4 1 .1 1.6 1.3v2c0 .3.2.6.8.5A12 12 0 0 0 12 .5Z" fill="currentColor"/></svg>
            </a>
          </div>
        </div>

        <div>
          <div className="font-medium text-white">Company</div>
          <ul className="mt-3 space-y-2">
            <li><a href="#" className="hover:text-white">About</a></li>
            <li><a href="#" className="hover:text-white">Careers</a></li>
            <li><a href="#" className="hover:text-white">Blog</a></li>
          </ul>
        </div>

        <div>
          <div className="font-medium text-white">Product</div>
          <ul className="mt-3 space-y-2">
            <li><a href="#" className="hover:text-white">Features</a></li>
            <li><a href="#" className="hover:text-white">Pricing</a></li>
            <li><a href="#" className="hover:text-white">Changelog</a></li>
          </ul>
        </div>

        <div>
          <div className="font-medium text-white">Documentation</div>
          <ul className="mt-3 space-y-2">
            <li><a href="#" className="hover:text-white">API Reference</a></li>
            <li><a href="#" className="hover:text-white">Guides</a></li>
            <li><a href="#" className="hover:text-white">Terms of Service</a></li>
          </ul>
        </div>
      </div>

      <div className="container-xl mt-10 py-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-white/60">
        <div>© {new Date().getFullYear()} OmniNode Inc. All rights reserved.</div>
        <div className="mt-2 sm:mt-0">
          Built with Next.js + Tailwind
        </div>
      </div>
    </footer>
  );
}


