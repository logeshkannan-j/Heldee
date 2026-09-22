import { usePricing } from "@/lib/data";
import Reveal from "@/components/ui/Reveal";
import TiltCard from "@/components/ui/TiltCard";

export default function Pricing() {
  const { pricing } = usePricing();

  return (
    <section id="pricing" className="py-10">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <Reveal className="mb-4">
          <span className="font-mono text-xs tracking-widest text-cyan glow-line">08 — STARTING POINTS</span>
          <h2 className="mt-4 text-4xl md:text-5xl glow-text" style={{ fontFamily: "'Instrument Serif', serif" }}>
            Project <span className="text-gradient">pricing</span>.
          </h2>
          <p className="mt-3 max-w-md text-sm text-muted-foreground">
            Every project is different. These ranges are starting estimates — the final quote
            depends on requirements.
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {pricing.map((p, i) => (
            <Reveal key={p.id} delay={i * 50}>
              <TiltCard className="rounded-xl border border-border bg-secondary p-7">
                <h3 className="font-mono text-xs tracking-wide text-muted-foreground">{p.service}</h3>
                <div className="mt-3 text-3xl text-cyan" style={{ fontFamily: "'Instrument Serif', serif" }}>
                  {p.is_custom_quote ? "CUSTOM QUOTE" : p.starting_price}
                </div>
                <ul className="mt-4 space-y-2 text-xs text-muted-foreground">
                  {p.features.map((f) => (
                    <li key={f}>— {f}</li>
                  ))}
                </ul>
              </TiltCard>
            </Reveal>
          ))}
          {pricing.length === 0 && (
            <p className="font-mono text-xs text-muted-foreground">No pricing configured yet — add it in Admin → Pricing.</p>
          )}
        </div>

        <div className="mt-8 flex flex-wrap gap-6 font-mono text-xs text-muted-foreground">
          <span>Starting prices only.</span>
          <span>Final quotation after requirement discussion.</span>
        </div>
      </div>
    </section>
  );
}
