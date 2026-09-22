import { useMemo, useState } from "react";
import Reveal from "@/components/ui/Reveal";

const types = [
  { k: "website", l: "Website", base: 8000 },
  { k: "webapp", l: "Web App", base: 28000 },
  { k: "mobile", l: "Mobile App", base: 38000 },
  { k: "custom", l: "Custom Software", base: 45000 },
];
const pageOpts = [
  { k: 1, l: "1–3", mult: 1 },
  { k: 2, l: "4–8", mult: 1.35 },
  { k: 3, l: "9+", mult: 1.8 },
];
const addons = [
  { k: "auth", l: "Authentication", cost: 5000 },
  { k: "db", l: "Database", cost: 6000 },
  { k: "admin", l: "Admin Dashboard", cost: 8000 },
  { k: "pay", l: "Payment Gateway", cost: 7000 },
  { k: "api", l: "API Integration", cost: 5000 },
  { k: "mob", l: "Mobile Version", cost: 15000 },
  { k: "deploy", l: "Deployment", cost: 2000 },
  { k: "maint", l: "Maintenance Plan", cost: 3000 },
];

export default function Estimator() {
  const [type, setType] = useState("website");
  const [pages, setPages] = useState(1);
  const [selectedAddons, setSelectedAddons] = useState<Set<string>>(new Set());

  const estimate = useMemo(() => {
    const t = types.find((x) => x.k === type)!;
    const p = pageOpts.find((x) => x.k === pages)!;
    let addonCost = 0;
    addons.forEach((a) => { if (selectedAddons.has(a.k)) addonCost += a.cost; });
    const base = t.base * p.mult;
    const low = Math.round(((base + addonCost) * 0.9) / 500) * 500;
    const high = Math.round(((base + addonCost) * 1.25) / 500) * 500;
    return { low, high };
  }, [type, pages, selectedAddons]);

  function toggleAddon(k: string) {
    setSelectedAddons((prev) => {
      const next = new Set(prev);
      next.has(k) ? next.delete(k) : next.add(k);
      return next;
    });
  }

  return (
    <section id="estimator" className="py-10">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <Reveal>
          <span className="font-mono text-xs tracking-widest text-cyan glow-line">09 — ESTIMATE YOUR PROJECT</span>
          <h2 className="mt-4 text-4xl md:text-5xl glow-text" style={{ fontFamily: "'Instrument Serif', serif" }}>
            Not sure what it'll <span className="text-gradient">cost</span>?
          </h2>
        </Reveal>

        <Reveal delay={120} className="mt-10 rounded-2xl border border-border bg-gradient-to-br from-secondary/60 to-background p-9">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            <div>
              <div className="mb-6">
                <label className="mb-3 block font-mono text-xs tracking-wide text-muted-foreground">PROJECT TYPE</label>
                <div className="flex flex-wrap gap-2">
                  {types.map((t) => (
                    <button key={t.k} onClick={() => setType(t.k)} className={`rounded-lg border px-3.5 py-2 font-mono text-xs ${type === t.k ? "border-cyan bg-cyan/10 text-cyan" : "border-border text-muted-foreground"}`}>
                      {t.l}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mb-6">
                <label className="mb-3 block font-mono text-xs tracking-wide text-muted-foreground">PAGES / SCREENS</label>
                <div className="flex flex-wrap gap-2">
                  {pageOpts.map((p) => (
                    <button key={p.k} onClick={() => setPages(p.k)} className={`rounded-lg border px-3.5 py-2 font-mono text-xs ${pages === p.k ? "border-cyan bg-cyan/10 text-cyan" : "border-border text-muted-foreground"}`}>
                      {p.l}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="mb-3 block font-mono text-xs tracking-wide text-muted-foreground">ADD-ONS</label>
                <div className="flex flex-wrap gap-2">
                  {addons.map((a) => (
                    <label key={a.k} className="flex cursor-pointer items-center gap-2 rounded-lg border border-border px-3.5 py-2 font-mono text-xs text-muted-foreground">
                      <input type="checkbox" checked={selectedAddons.has(a.k)} onChange={() => toggleAddon(a.k)} className="accent-cyan" />
                      {a.l}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center rounded-xl border border-border bg-background p-8">
              <span className="font-mono text-xs tracking-widest text-cyan glow-line">ESTIMATED PROJECT</span>
              <div className="my-3 text-4xl" style={{ fontFamily: "'Instrument Serif', serif" }}>
                ₹{estimate.low.toLocaleString("en-IN")} – ₹{estimate.high.toLocaleString("en-IN")}
              </div>
              <p className="mb-6 text-xs leading-relaxed text-muted-foreground">
                This is an initial estimate, not a final quotation. Pricing is rule-based, not calculated by AI.
              </p>
              <a href="#contact" className="rounded-lg bg-primary px-6 py-3 text-center font-mono text-xs text-primary-foreground">
                DISCUSS THIS PROJECT
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
