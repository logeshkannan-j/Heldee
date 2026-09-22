import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { Skill, SkillCategory } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input, Textarea, Select, Checkbox } from "@/components/ui/form-fields";

const categories: SkillCategory[] = ["Frontend", "Backend", "Mobile", "Database", "Tools"];
const emptyForm = { name: "", category: "Frontend" as SkillCategory, detail: "", is_visible: true, sort_order: 0 };

export default function SkillsAdmin() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  async function refresh() {
    const { data } = await supabase.from("skills").select("*").order("category").order("sort_order");
    setSkills((data as Skill[]) ?? []);
  }
  useEffect(() => { refresh(); }, []);

  async function save() {
    const payload = { ...form, sort_order: Number(form.sort_order) };
    if (editingId) await supabase.from("skills").update(payload).eq("id", editingId);
    else await supabase.from("skills").insert(payload);
    setEditingId(null); setForm(emptyForm); refresh();
  }
  async function remove(id: string) {
    if (!confirm("Delete this technology?")) return;
    await supabase.from("skills").delete().eq("id", id); refresh();
  }

  return (
    <div className="grid grid-cols-1 gap-8 pt-4 lg:grid-cols-[1fr_1.2fr]">
      <div>
        <h2 className="mb-4 font-mono text-sm text-muted-foreground">{editingId ? "EDIT TECHNOLOGY" : "NEW TECHNOLOGY"}</h2>
        <div className="flex flex-col gap-3 rounded-xl border border-border bg-secondary p-5">
          <Input label="Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
          <Select label="Category" value={form.category} options={categories} onChange={(v) => setForm({ ...form, category: v as SkillCategory })} />
          <Textarea label="What it's used for" value={form.detail} onChange={(v) => setForm({ ...form, detail: v })} />
          <Checkbox label="Visible on site" checked={form.is_visible} onChange={(v) => setForm({ ...form, is_visible: v })} />
          <Input label="Sort order" type="number" value={String(form.sort_order)} onChange={(v) => setForm({ ...form, sort_order: Number(v) })} />
          <div className="flex gap-2 pt-2">
            <Button onClick={save}>{editingId ? "Save changes" : "Add technology"}</Button>
            {editingId && <Button variant="ghost" onClick={() => { setEditingId(null); setForm(emptyForm); }}>Cancel</Button>}
          </div>
        </div>
      </div>
      <div>
        <h2 className="mb-4 font-mono text-sm text-muted-foreground">ALL SKILLS</h2>
        <div className="flex flex-col gap-3">
          {skills.map((s) => (
            <div key={s.id} className="flex items-center justify-between rounded-lg border border-border bg-secondary p-4">
              <div>
                <div className="text-sm font-medium">{s.name} {!s.is_visible && <span className="ml-2 font-mono text-[10px] text-muted-foreground">HIDDEN</span>}</div>
                <div className="font-mono text-[11px] text-muted-foreground">{s.category}</div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => { setEditingId(s.id); setForm({ name: s.name, category: s.category, detail: s.detail, is_visible: s.is_visible, sort_order: s.sort_order }); }}>Edit</Button>
                <Button variant="outline" size="sm" onClick={() => remove(s.id)}>Delete</Button>
              </div>
            </div>
          ))}
          {skills.length === 0 && <p className="font-mono text-xs text-muted-foreground">No skills yet.</p>}
        </div>
      </div>
    </div>
  );
}
