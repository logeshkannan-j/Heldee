import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { Enquiry, EnquiryStatus } from "@/lib/types";

const statuses: EnquiryStatus[] = ["NEW", "CONTACTED", "DISCUSSION", "QUOTED", "IN PROGRESS", "COMPLETED", "CANCELLED"];

export default function EnquiriesAdmin() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);

  async function refresh() {
    const { data } = await supabase.from("enquiries").select("*").order("created_at", { ascending: false });
    setEnquiries((data as Enquiry[]) ?? []);
    setLoading(false);
  }
  useEffect(() => { refresh(); }, []);

  async function updateStatus(id: string, status: EnquiryStatus) {
    await supabase.from("enquiries").update({ status }).eq("id", id);
    refresh();
  }

  function exportCsv() {
    const header = ["Name", "Email", "Phone", "Project Type", "Budget", "Timeline", "Description", "Status", "Date"];
    const rows = enquiries.map((e) => [e.name, e.email, e.phone ?? "", e.project_type, e.budget ?? "", e.timeline ?? "", e.description.replace(/\n/g, " "), e.status, e.created_at]);
    const csv = [header, ...rows].map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "heldi-enquiries.csv"; a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="pt-4">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-mono text-sm text-muted-foreground">{enquiries.length} ENQUIRIES</h2>
        <button onClick={exportCsv} className="rounded-lg border border-border px-4 py-2 font-mono text-xs hover:border-cyan">EXPORT CSV</button>
      </div>
      {loading && <p className="text-sm text-muted-foreground">Loading…</p>}
      <div className="flex flex-col gap-3">
        {enquiries.map((e) => (
          <div key={e.id} className="rounded-xl border border-border bg-secondary p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="font-medium">{e.name} <span className="text-muted-foreground">— {e.email}</span></div>
                <div className="mt-1 font-mono text-[11px] text-muted-foreground">{e.project_type} · {e.budget || "no budget given"} · {new Date(e.created_at).toLocaleDateString()}</div>
              </div>
              <select value={e.status} onChange={(ev) => updateStatus(e.id, ev.target.value as EnquiryStatus)} className="rounded-lg border border-border bg-transparent px-3 py-1.5 font-mono text-xs">
                {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">{e.description}</p>
          </div>
        ))}
        {!loading && enquiries.length === 0 && <p className="font-mono text-xs text-muted-foreground">No enquiries yet.</p>}
      </div>
    </div>
  );
}
