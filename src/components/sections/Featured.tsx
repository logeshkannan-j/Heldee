import { useProjects } from "@/lib/data";
import Reveal from "@/components/ui/Reveal";
import TiltCard from "@/components/ui/TiltCard";

export default function Featured() {
  const { projects } = useProjects();
  const featured = projects.find((p) => p.is_featured);

  return (
    <section id="featured" className="py-10">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <Reveal>
          <span className="font-mono text-xs tracking-widest text-cyan glow-line">05 — FEATURED LIVE PROJECT</span>
        </Reveal>
        <Reveal delay={100}>
          <TiltCard strength={3} className="mt-6 grid grid-cols-1 rounded-2xl border border-border bg-secondary md:grid-cols-2">
            <div className="flex min-h-[260px] items-center justify-center bg-gradient-to-br from-background via-secondary to-background p-8 text-center font-mono text-xs text-muted-foreground">
              {featured ? featured.name : "[ NO FEATURED BUILD SELECTED — CHOOSE ONE IN ADMIN → PROJECTS ]"}
            </div>
            <div className="flex flex-col justify-center p-10">
              <span className="font-mono text-xs tracking-widest text-cyan glow-line">FEATURED BUILD</span>
              <h3 className="mt-3 text-3xl glow-text" style={{ fontFamily: "'Instrument Serif', serif" }}>
                {featured ? featured.name : "Add your featured project here."}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {featured
                  ? featured.description
                  : "Mark a project as “Featured” in the admin panel and its screenshot, description, technology and links will appear here as the visual centerpiece of the portfolio."}
              </p>
              <div className="mt-6 flex gap-3">
                {featured?.live_url ? (
                  <a href={featured.live_url} target="_blank" rel="noreferrer" className="rounded-lg border border-border px-5 py-2.5 font-mono text-xs transition-colors hover:border-cyan">
                    LIVE DEMO
                  </a>
                ) : (
                  <span className="cursor-default rounded-lg border border-border px-5 py-2.5 font-mono text-xs opacity-40">LIVE DEMO</span>
                )}
                <span className="cursor-default rounded-lg border border-border px-5 py-2.5 font-mono text-xs opacity-40">VIEW CASE STUDY</span>
              </div>
            </div>
          </TiltCard>
        </Reveal>
      </div>
    </section>
  );
}
