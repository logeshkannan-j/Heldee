import { useState } from "react";
import { useProjects } from "@/lib/data";
import type { Project, ProjectCategory } from "@/lib/types";
import { useTilt } from "@/lib/useTilt";
import Reveal from "@/components/ui/Reveal";

const categories: (ProjectCategory | "ALL")[] = [
  "ALL", "WEBSITE", "WEB APP", "MOBILE", "SOFTWARE", "COLLEGE", "EXPERIMENT",
];

export default function Work() {
  const { projects, loading } = useProjects();
  const [filter, setFilter] = useState<ProjectCategory | "ALL">("ALL");

  const visible = projects.filter((p) => filter === "ALL" || p.category === filter);

  return (
    <section id="work" className="py-10">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-8">
          <div>
            <span className="font-mono text-xs tracking-widest text-cyan glow-line">04 — SELECTED WORK</span>
            <h2 className="mt-4 text-4xl md:text-5xl glow-text" style={{ fontFamily: "'Instrument Serif', serif" }}>
              Things I've <span className="text-gradient">built</span>.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            Real projects only. Anything shown here is either a live build or clearly labelled as
            a HELDEE Lab demo.
          </p>
        </Reveal>

        <div className="mb-10 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`rounded-full border px-4 py-2 font-mono text-xs tracking-wide transition-all ${
                filter === c ? "border-cyan bg-cyan/10 text-foreground" : "border-border text-muted-foreground hover:border-cyan"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {loading && <p className="text-sm text-muted-foreground">Loading projects…</p>}

        {!loading && visible.length === 0 && (
          <div className="rounded-xl border border-dashed border-border p-10 text-center font-mono text-xs text-muted-foreground">
            No projects in this category yet. Add real work through Admin → Projects.
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p, i) => (
            <Reveal key={p.id} delay={(i % 3) * 60}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project: p }: { project: Project }) {
  const { ref, handleMouseMove, handleMouseLeave } = useTilt<HTMLAnchorElement>(5);
  return (
    <a
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      href={p.is_private ? undefined : p.live_url ?? undefined}
      target="_blank"
      rel="noreferrer"
      className="tilt-card group relative block overflow-hidden rounded-xl border border-border bg-secondary"
    >
      <div className="flex h-36 items-center justify-center bg-gradient-to-br from-background to-secondary font-mono text-[11px] text-muted-foreground">
        {p.is_demo ? "HELDEE LAB / DEMO PROJECT" : "SCREENSHOT"}
      </div>
      <div className="p-5">
        <div className="font-mono text-[10px] tracking-widest text-cyan">{p.category} · {p.year}</div>
        <h3 className="mt-2 text-lg font-semibold">{p.name}</h3>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground line-clamp-2">{p.description}</p>
        <div className="mt-4 flex gap-4 font-mono text-[11px] text-muted-foreground">
          <span>{p.is_private ? "PRIVATE PROJECT" : "LIVE DEMO"}</span>
          {p.github_url && <span>SOURCE</span>}
        </div>
      </div>
    </a>
  );
}
