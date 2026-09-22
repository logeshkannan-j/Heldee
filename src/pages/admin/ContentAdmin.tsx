import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { SiteContent } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/form-fields";

const empty: Omit<SiteContent, "id"> = {
  hero_heading: "", hero_description: "", tagline: "", availability_status: "",
  about_who: "", about_enjoy: "", about_why: "", about_projects: "", about_philosophy: "",
  profile_photo_url: "", email: "", phone: "", location: "", github_url: "", linkedin_url: "", instagram_url: "",
};

export default function ContentAdmin() {
  const [form, setForm] = useState(empty);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    supabase.from("site_content").select("*").eq("id", "main").maybeSingle().then(({ data }) => {
      if (data) setForm(data as SiteContent);
      setLoading(false);
    });
  }, []);

  async function save() {
    await supabase.from("site_content").upsert({ id: "main", ...form });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  if (loading) return <p className="pt-4 text-sm text-muted-foreground">Loading…</p>;

  return (
    <div className="grid grid-cols-1 gap-6 pt-4 md:grid-cols-2">
      <Section title="HERO">
        <Input label="Hero heading" value={form.hero_heading} onChange={(v) => setForm({ ...form, hero_heading: v })} />
        <Textarea label="Hero description" value={form.hero_description} onChange={(v) => setForm({ ...form, hero_description: v })} />
        <Input label="Tagline" value={form.tagline} onChange={(v) => setForm({ ...form, tagline: v })} />
        <Input label="Availability status" value={form.availability_status} onChange={(v) => setForm({ ...form, availability_status: v })} />
      </Section>

      <Section title="ABOUT">
        <Textarea label="Who I am" value={form.about_who} onChange={(v) => setForm({ ...form, about_who: v })} />
        <Textarea label="What I enjoy building" value={form.about_enjoy} onChange={(v) => setForm({ ...form, about_enjoy: v })} />
        <Textarea label="Why I started HELDEE" value={form.about_why} onChange={(v) => setForm({ ...form, about_why: v })} />
        <Textarea label="What kind of projects I work on" value={form.about_projects} onChange={(v) => setForm({ ...form, about_projects: v })} />
        <Textarea label="My development philosophy" value={form.about_philosophy} onChange={(v) => setForm({ ...form, about_philosophy: v })} />
        <Input label="Profile photo URL" value={form.profile_photo_url ?? ""} onChange={(v) => setForm({ ...form, profile_photo_url: v })} />
      </Section>

      <Section title="CONTACT DETAILS">
        <Input label="Email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
        <Input label="Phone" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
        <Input label="Location" value={form.location} onChange={(v) => setForm({ ...form, location: v })} />
      </Section>

      <Section title="SOCIAL LINKS">
        <Input label="GitHub URL" value={form.github_url} onChange={(v) => setForm({ ...form, github_url: v })} />
        <Input label="LinkedIn URL" value={form.linkedin_url} onChange={(v) => setForm({ ...form, linkedin_url: v })} />
        <Input label="Instagram URL" value={form.instagram_url ?? ""} onChange={(v) => setForm({ ...form, instagram_url: v })} />
      </Section>

      <div className="md:col-span-2">
        <Button onClick={save}>{saved ? "Saved ✓" : "Save all content"}</Button>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-secondary p-5">
      <h3 className="mb-4 font-mono text-xs tracking-widest text-cyan">{title}</h3>
      <div className="flex flex-col gap-3">{children}</div>
    </div>
  );
}
