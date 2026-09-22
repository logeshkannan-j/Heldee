const points = [
  "You communicate directly with the developer building your project.",
  "I handle development from idea to deployment.",
  "I can build from scratch or improve an existing product.",
  "I work across frontend, backend, database and deployment.",
];

export default function WhoIsHeldi() {
  return (
    <section id="who" className="py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 px-6 md:grid-cols-2 md:px-8">
        <div>
          <span className="font-mono text-xs tracking-widest text-cyan">02 — WHO IS HELDI?</span>
          <h2 className="mt-4 text-4xl md:text-5xl" style={{ fontFamily: "'Instrument Serif', serif" }}>
            One developer.
            <br />
            Many ways to build.
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
            HELDI TECH SOLUTIONS is my independent development studio where I design, code and
            deploy digital products — from simple websites to full web applications and mobile
            apps.
          </p>
          <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
            You have an idea. I can design it, build it and put it online.
          </p>
        </div>
        <div className="flex flex-col border-t border-border">
          {points.map((p, i) => (
            <div key={p} className="flex gap-4 border-b border-border py-5 text-sm">
              <span className="pt-0.5 font-mono text-xs text-cyan">{String(i + 1).padStart(2, "0")}</span>
              <span>{p}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
