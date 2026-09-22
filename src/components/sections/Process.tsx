import Reveal from "@/components/ui/Reveal";

const steps = [
  { n: "01", t: "Understand", p: "I understand the idea and requirements." },
  { n: "02", t: "Plan", p: "I define features, technology and project structure." },
  { n: "03", t: "Design", p: "I create the interface and user experience." },
  { n: "04", t: "Develop", p: "I build frontend, backend, database and integrations." },
  { n: "05", t: "Test", p: "I test responsiveness, functionality and common user flows." },
  { n: "06", t: "Deploy", p: "I deploy the working product." },
  { n: "07", t: "Improve", p: "Future changes and maintenance can be handled as required." },
];

export default function Process() {
  return (
    <section id="process" className="py-10">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <Reveal>
          <span className="font-mono text-xs tracking-widest text-cyan glow-line">10 — HOW I BUILD</span>
          <h2 className="mt-4 text-4xl md:text-5xl glow-text" style={{ fontFamily: "'Instrument Serif', serif" }}>
            The development <span className="text-gradient">process</span>.
          </h2>
        </Reveal>
        <div className="mt-10 border-t border-border">
          {steps.map((s) => (
            <Reveal key={s.n} delay={parseInt(s.n) * 30} as="div" className="grid grid-cols-[60px_1fr] gap-6 border-b border-border py-6 sm:grid-cols-[80px_1fr] transition-colors hover:bg-secondary/30">
              <span className="font-mono text-sm text-cyan">{s.n}</span>
              <div>
                <h3 className="text-xl font-semibold">{s.t}</h3>
                <p className="mt-1 max-w-lg text-sm text-muted-foreground">{s.p}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
