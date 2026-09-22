import { useMemo, useState } from "react";
import { useSkills } from "@/lib/data";
import type { SkillCategory } from "@/lib/types";
import Reveal from "@/components/ui/Reveal";

const tabs: SkillCategory[] = ["Frontend", "Backend", "Mobile", "Database", "Tools"];

export default function Skills() {
  const { skills } = useSkills();
  const [tab, setTab] = useState<SkillCategory>("Frontend");
  const [selected, setSelected] = useState<string | null>(null);

  const items = useMemo(() => skills.filter((s) => s.category === tab), [skills, tab]);
  const active = items.find((i) => i.name === selected);

  return (
    <section id="skills" className="py-10">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <Reveal className="mb-10">
          <span className="font-mono text-xs tracking-widest text-cyan glow-line">06 — SKILLS / TECHNOLOGY</span>
          <h2 className="mt-4 text-4xl md:text-5xl glow-text" style={{ fontFamily: "'Instrument Serif', serif" }}>
            Tools I actually <span className="text-gradient">use</span>.
          </h2>
          <p className="mt-3 max-w-md text-sm text-muted-foreground">
            Only technologies switched on in admin are shown here.
          </p>
        </Reveal>

        <div className="mb-8 flex flex-wrap gap-2">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => { setTab(t); setSelected(null); }}
              className={`rounded-lg px-4 py-2 font-mono text-xs ${tab === t ? "bg-cyan text-background" : "border border-border text-muted-foreground"}`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2.5">
          {items.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelected(s.name)}
              className="rounded-lg border border-border bg-secondary px-4 py-2.5 font-mono text-xs transition-all hover:-translate-y-0.5 hover:border-cyan hover:shadow-[0_8px_20px_-8px_hsla(var(--cyan),0.4)]"
            >
              {s.name}
            </button>
          ))}
          {items.length === 0 && (
            <p className="font-mono text-xs text-muted-foreground">No {tab.toLowerCase()} skills configured yet.</p>
          )}
        </div>

        <div className="mt-6 min-h-[24px] border-t border-border pt-6 text-sm text-muted-foreground">
          {active ? (
            <>
              <b className="text-foreground">{active.name}</b> — {active.detail}
            </>
          ) : (
            "Select a technology above to see how I use it."
          )}
        </div>
      </div>
    </section>
  );
}
