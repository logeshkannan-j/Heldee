import Reveal from "@/components/ui/Reveal";

const points = [
  "You communicate directly with the developer building your project.",
  "I handle development from idea to deployment.",
  "I can build from scratch or improve an existing product.",
  "I work across frontend, backend, database and deployment.",
];

export default function WhoIsHeldee() {
  return (
    <section id="who" className="py-10">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 px-6 md:grid-cols-2 md:px-8">
        <Reveal>
          <span className="font-mono text-xs tracking-widest text-cyan glow-line">02 — WHO IS HELDEE?</span>
          <h2 className="mt-4 text-4xl md:text-5xl glow-text" style={{ fontFamily: "'Instrument Serif', serif" }}>
            One <span className="text-gradient">developer</span>.
            <br />
            Many ways to build.
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
            HELDEE TECH SOLUTIONS is my independent development studio where I design, code and
            deploy digital products — from simple websites to full web applications and mobile
            apps.
          </p>
          <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
            You have an idea. I can design it, build it and put it online.
          </p>
        </Reveal>
        <Reveal delay={120} className="flex flex-col border-t border-border">
          {points.map((p, i) => (
            <div key={p} className="group flex gap-4 border-b border-border py-5 text-sm transition-colors hover:bg-secondary/40">
              <span className="pt-0.5 font-mono text-xs text-cyan transition-transform group-hover:translate-x-1">{String(i + 1).padStart(2, "0")}</span>
              <span>{p}</span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
