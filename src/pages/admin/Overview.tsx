import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Overview() {
  const [stats, setStats] = useState({ projects: 0, featured: 0, newEnquiries: 0, totalEnquiries: 0 });

  useEffect(() => {
    async function load() {
      const [{ count: projects }, { count: featured }, { count: newEnquiries }, { count: totalEnquiries }] =
        await Promise.all([
          supabase.from("projects").select("*", { count: "exact", head: true }),
          supabase.from("projects").select("*", { count: "exact", head: true }).eq("is_featured", true),
          supabase.from("enquiries").select("*", { count: "exact", head: true }).eq("status", "NEW"),
          supabase.from("enquiries").select("*", { count: "exact", head: true }),
        ]);
      setStats({
        projects: projects ?? 0,
        featured: featured ?? 0,
        newEnquiries: newEnquiries ?? 0,
        totalEnquiries: totalEnquiries ?? 0,
      });
    }
    load();
  }, []);

  const cards = [
    ["Total Projects", stats.projects],
    ["Featured Projects", stats.featured],
    ["New Enquiries", stats.newEnquiries],
    ["Total Enquiries", stats.totalEnquiries],
  ] as const;

  return (
    <div className="grid grid-cols-2 gap-4 pt-4 sm:grid-cols-4">
      {cards.map(([label, value]) => (
        <div key={label} className="rounded-xl border border-border bg-secondary p-6">
          <div className="text-3xl" style={{ fontFamily: "'Instrument Serif', serif" }}>{value}</div>
          <div className="mt-1 font-mono text-[11px] text-muted-foreground">{label}</div>
        </div>
      ))}
    </div>
  );
}
