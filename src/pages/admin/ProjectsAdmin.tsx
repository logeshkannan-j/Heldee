import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { Project, ProjectCategory } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input, Textarea, Select, Checkbox } from "@/components/ui/form-fields";

const categories: ProjectCategory[] = ["WEBSITE", "WEB APP", "MOBILE", "SOFTWARE", "COLLEGE", "EXPERIMENT"];
const emptyForm = {
  name: "", description: "", category: "WEBSITE" as ProjectCategory, technologies: "", year: new Date().getFullYear(),
  features: "", live_url: "", github_url: "", is_private: false, is_featured: false, is_demo: false, sort_order: 0,
};

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);

  async function refresh() {
    const { data } = await supabase.from("projects").select("*").order("sort_order");
    setProjects((data as Project[]) ?? []);
    setLoading(false);
  }
  useEffect(() => { refresh(); }, []);

  function startEdit(p: Project) {
    setEditingId(p.id);
    setForm({
      name: p.name, description: p.description, category: p.category,
      technologies: p.technologies.join(", "), year: p.year, features: p.features.join(", "),
      live_url: p.live_url ?? "", github_url: p.github_url ?? "", is_private: p.is_private,
      is_featured: p.is_featured, is_demo: p.is_demo, sort_order: p.sort_order,
    });
  }

  async function save() {
    const payload = {
      name: form.name, description: form.description, category: form.category,
      technologies: form.technologies.split(",").map((s) => s.trim()).filter(Boolean),
      year: Number(form.year), features: form.features.split(",").map((s) => s.trim()).filter(Boolean),
      live_url: form.live_url || null, github_url: form.github_url || null,
      is_private: form.is_private, is_featured: form.is_featured, is_demo: form.is_demo,
      sort_order: Number(form.sort_order),
    };
    if (editingId) {
      await supabase.from("projects").update(payload).eq("id", editingId);
    } else {
      await supabase.from("projects").insert(payload);
    }
    setEditingId(null);
    setForm(emptyForm);
    refresh();
  }

  async function remove(id: string) {
    if (!confirm("Delete this project?")) return;
    await supabase.from("projects").delete().eq("id", id);
    refresh();
  }

  return (
    <div className="grid grid-cols-1 gap-8 pt-4 lg:grid-cols-[1fr_1.2fr]">
      <div>
        <h2 className="mb-4 font-mono text-sm text-muted-foreground">{editingId ? "EDIT PROJECT" : "NEW PROJECT"}</h2>
        <div className="flex flex-col gap-3 rounded-xl border border-border bg-secondary p-5">
          <Input label="Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
          <Textarea label="Description" value={form.description} onChange={(v) => setForm({ ...form, description: v })} />
          <div className="grid grid-cols-2 gap-3">
            <Select label="Category" value={form.category} options={categories} onChange={(v) => setForm({ ...form, category: v as ProjectCategory })} />
            <Input label="Year" type="number" value={String(form.year)} onChange={(v) => setForm({ ...form, year: Number(v) })} />
          </div>
          <Input label="Technologies (comma separated)" value={form.technologies} onChange={(v) => setForm({ ...form, technologies: v })} />
          <Input label="Features (comma separated)" value={form.features} onChange={(v) => setForm({ ...form, features: v })} />
          <div className="grid grid-cols-2 gap-3">
            <Input label="Live URL" value={form.live_url} onChange={(v) => setForm({ ...form, live_url: v })} />
            <Input label="GitHub URL" value={form.github_url} onChange={(v) => setForm({ ...form, github_url: v })} />
          </div>
          <div className="flex flex-wrap gap-4 pt-1">
            <Checkbox label="Private" checked={form.is_private} onChange={(v) => setForm({ ...form, is_private: v })} />
            <Checkbox label="Featured" checked={form.is_featured} onChange={(v) => setForm({ ...form, is_featured: v })} />
            <Checkbox label="Demo / HELDEE Lab" checked={form.is_demo} onChange={(v) => setForm({ ...form, is_demo: v })} />
          </div>
          <Input label="Sort order" type="number" value={String(form.sort_order)} onChange={(v) => setForm({ ...form, sort_order: Number(v) })} />
          <div className="flex gap-2 pt-2">
            <Button onClick={save}>{editingId ? "Save changes" : "Add project"}</Button>
            {editingId && <Button variant="ghost" onClick={() => { setEditingId(null); setForm(emptyForm); }}>Cancel</Button>}
          </div>
        </div>
      </div>

      <div>
        <h2 className="mb-4 font-mono text-sm text-muted-foreground">ALL PROJECTS</h2>
        {loading && <p className="text-sm text-muted-foreground">Loading…</p>}
        <div className="flex flex-col gap-3">
          {projects.map((p) => (
            <div key={p.id} className="flex items-center justify-between rounded-lg border border-border bg-secondary p-4">
              <div>
                <div className="text-sm font-medium">{p.name} {p.is_featured && <span className="ml-2 font-mono text-[10px] text-cyan">FEATURED</span>}</div>
                <div className="font-mono text-[11px] text-muted-foreground">{p.category} · {p.year}</div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => startEdit(p)}>Edit</Button>
                <Button variant="outline" size="sm" onClick={() => remove(p.id)}>Delete</Button>
              </div>
            </div>
          ))}
          {!loading && projects.length === 0 && <p className="font-mono text-xs text-muted-foreground">No projects yet.</p>}
        </div>
      </div>
    </div>
  );
}


