import { useState } from "react";
import Reveal from "@/components/ui/Reveal";

const steps = [
  { t: "IDEA", h: "Understanding the idea", p: "Talking through what you're trying to build, who it's for, and what \"done\" looks like.", tags: ["Requirements", "Scope", "Goals"] },
  { t: "PLAN", h: "Planning features & structure", p: "Turning the idea into a concrete feature list, page map and technology choice.", tags: ["Feature list", "Tech stack", "Timeline"] },
  { t: "DESIGN", h: "Designing the interface", p: "Wireframes and visual design for the screens the product actually needs.", tags: ["Wireframes", "UI design", "Design system"] },
  { t: "CODE", h: "Writing the frontend", p: "Building the interface with React/TypeScript, wired to real data.", tags: ["React", "TypeScript", "Tailwind"] },
  { t: "DATABASE", h: "Backend & database", p: "Setting up authentication, data models and APIs so the product works.", tags: ["Auth", "Database", "REST API"] },
  { t: "TEST", h: "Testing the build", p: "Checking responsiveness, functionality and common user flows.", tags: ["QA", "Responsive check", "Bug fixing"] },
  { t: "DEPLOY", h: "Shipping it", p: "Deploying the working product so it's live and usable.", tags: ["Hosting", "Domain", "Monitoring"] },
];

export default function Workbench() {
  const [active, setActive] = useState(0);
  const step = steps[active];

  return (
    <section id="workbench" className="border-y border-border/60 py-10 backdrop-blur-[1px]">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <Reveal>
          <span className="font-mono text-xs tracking-widest text-cyan glow-line">07 — THE HELDEE WORKBENCH</span>
          <h2 className="mt-4 text-4xl md:text-5xl glow-text" style={{ fontFamily: "'Instrument Serif', serif" }}>
            How an idea becomes <span className="text-gradient">software</span>.
          </h2>
        </Reveal>

        <div className="mt-12 flex gap-0 overflow-x-auto pb-2">
          {steps.map((s, i) => (
            <button key={s.t} onClick={() => setActive(i)} className="relative min-w-[130px] flex-shrink-0 px-2 text-center">
              {i < steps.length - 1 && <span className="absolute left-1/2 top-[22px] h-px w-full bg-border" />}
              <span
                className={`relative z-10 mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full border font-mono text-xs transition-all ${
                  i === active ? "pulse-glow border-cyan text-cyan" : "border-border text-muted-foreground"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className={`font-mono text-[11px] tracking-widest ${i === active ? "text-foreground" : "text-muted-foreground"}`}>{s.t}</span>
            </button>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-border bg-background/60 p-9">
          <h3 className="text-xl font-semibold">{step.h}</h3>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">{step.p}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {step.tags.map((t) => (
              <span key={t} className="rounded-full border border-border px-3 py-1.5 font-mono text-[11px] text-cyan">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
