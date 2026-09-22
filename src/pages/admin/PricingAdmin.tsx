import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { PricingItem } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input, Textarea, Checkbox } from "@/components/ui/form-fields";

const emptyForm = { service: "", starting_price: "", timeline: "", features: "", is_custom_quote: false, sort_order: 0 };

export default function PricingAdmin() {
  const [items, setItems] = useState<PricingItem[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  async function refresh() {
    const { data } = await supabase.from("pricing").select("*").order("sort_order");
    setItems((data as PricingItem[]) ?? []);
  }
  useEffect(() => { refresh(); }, []);

  async function save() {
    const payload = {
      service: form.service, starting_price: form.starting_price, timeline: form.timeline || null,
      features: form.features.split(",").map((s) => s.trim()).filter(Boolean),
      is_custom_quote: form.is_custom_quote, sort_order: Number(form.sort_order),
    };
    if (editingId) await supabase.from("pricing").update(payload).eq("id", editingId);
    else await supabase.from("pricing").insert(payload);
    setEditingId(null); setForm(emptyForm); refresh();
  }
  async function remove(id: string) {
    if (!confirm("Delete this pricing tier?")) return;
    await supabase.from("pricing").delete().eq("id", id); refresh();
  }

  return (
    <div className="grid grid-cols-1 gap-8 pt-4 lg:grid-cols-[1fr_1.2fr]">
      <div>
        <h2 className="mb-4 font-mono text-sm text-muted-foreground">{editingId ? "EDIT PRICING" : "NEW PRICING TIER"}</h2>
        <div className="flex flex-col gap-3 rounded-xl border border-border bg-secondary p-5">
          <Input label="Service name" value={form.service} onChange={(v) => setForm({ ...form, service: v })} />
          <Input label="Starting price (e.g. ₹12,000+)" value={form.starting_price} onChange={(v) => setForm({ ...form, starting_price: v })} />
          <Input label="Timeline" value={form.timeline} onChange={(v) => setForm({ ...form, timeline: v })} />
          <Textarea label="Features (comma separated)" value={form.features} onChange={(v) => setForm({ ...form, features: v })} />
          <Checkbox label="Custom quote (hides starting price)" checked={form.is_custom_quote} onChange={(v) => setForm({ ...form, is_custom_quote: v })} />
          <Input label="Sort order" type="number" value={String(form.sort_order)} onChange={(v) => setForm({ ...form, sort_order: Number(v) })} />
          <div className="flex gap-2 pt-2">
            <Button onClick={save}>{editingId ? "Save changes" : "Add tier"}</Button>
            {editingId && <Button variant="ghost" onClick={() => { setEditingId(null); setForm(emptyForm); }}>Cancel</Button>}
          </div>
        </div>
      </div>
      <div>
        <h2 className="mb-4 font-mono text-sm text-muted-foreground">ALL PRICING</h2>
        <div className="flex flex-col gap-3">
          {items.map((p) => (
            <div key={p.id} className="flex items-center justify-between rounded-lg border border-border bg-secondary p-4">
              <div>
                <div className="text-sm font-medium">{p.service}</div>
                <div className="font-mono text-[11px] text-muted-foreground">{p.is_custom_quote ? "CUSTOM QUOTE" : p.starting_price}</div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => { setEditingId(p.id); setForm({ service: p.service, starting_price: p.starting_price, timeline: p.timeline ?? "", features: p.features.join(", "), is_custom_quote: p.is_custom_quote, sort_order: p.sort_order }); }}>Edit</Button>
                <Button variant="outline" size="sm" onClick={() => remove(p.id)}>Delete</Button>
              </div>
            </div>
          ))}
          {items.length === 0 && <p className="font-mono text-xs text-muted-foreground">No pricing tiers yet.</p>}
        </div>
      </div>
    </div>
  );
}
