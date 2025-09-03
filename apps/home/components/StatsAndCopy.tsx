import { Sparkline } from "./Sparkline";

export function StatsAndCopy() {
  return (
    <section className="container-xl grid grid-cols-1 lg:grid-cols-2 gap-12 py-12">
      <div className="glass rounded-xl p-6">
        <div className="text-sm text-white/60">OMNINODE</div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="rounded-lg bg-black/20 p-4 border border-white/5">
            <div className="text-xs text-white/50">Active Nodes</div>
            <div className="text-xl font-semibold">5</div>
          </div>
          <div className="rounded-lg bg-black/20 p-4 border border-white/5">
            <div className="text-xs text-white/50">Status</div>
            <div className="text-xl font-semibold">Operational</div>
          </div>
          <div className="rounded-lg bg-black/20 p-4 border border-white/5">
            <div className="text-xs text-white/50">Event Logs</div>
            <div className="text-xl font-semibold">2,041</div>
          </div>
          <div className="rounded-lg bg-black/20 p-4 border border-white/5">
            <div className="text-xs text-white/50">Automations</div>
            <div className="text-xl font-semibold">16</div>
          </div>
        </div>
        <div className="mt-6">
          <div className="text-xs text-white/60 mb-2">System Activity</div>
          <div className="rounded-lg bg-black/20 border border-white/5 p-2 overflow-hidden">
            <Sparkline />
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-3xl sm:text-4xl font-semibold">Centralized Management</h2>
        <p className="mt-4 text-white/70 max-w-xl">
          Monitor and control your entire ecosystem from one central interface.
        </p>
      </div>
    </section>
  );
}


