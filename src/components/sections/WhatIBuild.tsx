import Reveal from "@/components/ui/Reveal";
import TiltCard from "@/components/ui/TiltCard";

const services = [
  { n: "01", t: "Personal Websites", items: ["Portfolio", "Resume", "Personal brand", "Creator website"] },
  { n: "02", t: "Business Websites", items: ["Company website", "Service business", "Restaurant", "Real estate"] },
  { n: "03", t: "Web Applications", items: ["Login systems", "Dashboards", "Booking systems", "Admin panels"] },
  { n: "04", t: "Mobile Apps", items: ["Android", "iOS", "Flutter apps", "Utility apps"] },
  { n: "05", t: "Custom Software", items: ["Requirement-based apps", "Database systems", "Automation"] },
  { n: "06", t: "College / Student Projects", items: ["Java projects", "Web apps", "Flutter projects", "Documentation"] },
  { n: "07", t: "UI / UX", items: ["Responsive interfaces", "Dashboard UI", "Landing pages", "Redesigns"] },
  { n: "08", t: "Maintenance", items: ["Bug fixing", "Feature additions", "Performance", "Deployment"] },
];

export default function WhatIBuild() {
  return (
    <section id="services" className="py-10">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <Reveal className="mb-14 flex flex-wrap items-end justify-between gap-8">
          <div>
            <span className="font-mono text-xs tracking-widest text-cyan glow-line">03 — WHAT I BUILD</span>
            <h2 className="mt-4 text-4xl md:text-5xl glow-text" style={{ fontFamily: "'Instrument Serif', serif" }}>
              What can I <span className="text-gradient">build</span> for you?
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            Eight kinds of work I take on, from a single landing page to a full application with
            its own database and admin.
          </p>
        </Reveal>
        <div className="grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <Reveal key={s.n} delay={i * 40} as="div">
              <TiltCard className="flex min-h-[190px] flex-col justify-between bg-secondary p-6 transition-colors hover:bg-secondary/70">
                <span className="font-mono text-xs text-cyan">{s.n}</span>
                <div>
                  <h3 className="mt-6 text-lg font-semibold">{s.t}</h3>
                  <ul className="mt-3 space-y-1.5 text-xs text-muted-foreground">
                    {s.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
