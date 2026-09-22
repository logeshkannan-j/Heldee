import { useState, type FormEvent } from "react";
import { useSiteContent } from "@/lib/data";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import Reveal from "@/components/ui/Reveal";

export default function Contact() {
  const { content } = useSiteContent();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const form = new FormData(e.currentTarget);

    const { error } = await supabase.from("enquiries").insert({
      name: form.get("name"),
      email: form.get("email"),
      phone: form.get("phone"),
      project_type: form.get("project_type"),
      budget: form.get("budget"),
      timeline: form.get("timeline"),
      description: form.get("description"),
      reference_website: form.get("reference_website"),
      required_features: form.get("required_features"),
      status: "NEW",
    });

    setSubmitting(false);
    if (error) {
      setError(error.message);
      return;
    }
    setSubmitted(true);
  }

  const info = [
    ["EMAIL", content?.email],
    ["PHONE", content?.phone],
    ["LOCATION", content?.location],
    ["GITHUB", content?.github_url],
    ["LINKEDIN", content?.linkedin_url],
  ];

  return (
    <section id="contact" className="py-10">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 px-6 md:grid-cols-[0.9fr_1.1fr] md:px-8">
        <Reveal>
          <span className="font-mono text-xs tracking-widest text-cyan glow-line">12 — START A PROJECT</span>
          <h2 className="mt-4 text-4xl md:text-5xl glow-text" style={{ fontFamily: "'Instrument Serif', serif" }}>
            Tell me what you want to <span className="text-gradient">build</span>.
          </h2>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            Fill in a few details and I'll get back to you with next steps. No commitment
            required.
          </p>
          <div className="mt-10 flex flex-col">
            {info.map(([label, value]) => (
              <div key={label} className="flex justify-between border-b border-border py-4 text-sm">
                <span className="font-mono text-xs text-muted-foreground">{label}</span>
                <span>{value || `Add in Admin → Content`}</span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={120}>
          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="NAME" name="name" required />
                <Field label="EMAIL" name="email" type="email" required />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="PHONE" name="phone" />
                <Field label="BUDGET" name="budget" placeholder="e.g. ₹20,000 – ₹40,000" />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[11px] text-muted-foreground">PROJECT TYPE</label>
                  <select name="project_type" className="rounded-lg border border-border bg-transparent px-3 py-2.5 text-sm">
                    <option>Website</option>
                    <option>Web Application</option>
                    <option>Mobile App</option>
                    <option>Custom Software</option>
                    <option>College Project</option>
                    <option>Other</option>
                  </select>
                </div>
                <Field label="TIMELINE" name="timeline" placeholder="e.g. 4–6 weeks" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[11px] text-muted-foreground">PROJECT DESCRIPTION</label>
                <textarea name="description" required rows={4} placeholder="What are you trying to build?" className="rounded-lg border border-border bg-transparent px-3 py-2.5 text-sm" />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="REFERENCE WEBSITE" name="reference_website" />
                <Field label="REQUIRED FEATURES" name="required_features" />
              </div>
              {error && <p className="text-xs text-red-400">{error} — has the `enquiries` table been created yet? See README.md.</p>}
              <Button type="submit" variant="default" size="default" className="mt-1 w-full py-3.5" disabled={submitting}>
                {submitting ? "Sending…" : "Send Project"}
              </Button>
            </form>
          ) : (
            <div className="rounded-xl border border-cyan p-8 text-center">
              <h3 className="text-xl font-semibold">PROJECT REQUEST RECEIVED</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Your requirement has been sent to HELDEE TECH SOLUTIONS.
              </p>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}

function Field({
  label, name, type = "text", required = false, placeholder,
}: { label: string; name: string; type?: string; required?: boolean; placeholder?: string }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-mono text-[11px] text-muted-foreground">{label}</label>
      <input name={name} type={type} required={required} placeholder={placeholder} className="rounded-lg border border-border bg-transparent px-3 py-2.5 text-sm outline-none focus:border-cyan" />
    </div>
  );
}
