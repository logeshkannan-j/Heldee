import { useEffect, useState } from "react";
import { supabase } from "./supabase";
import type { SiteContent, Project, Skill, PricingItem } from "./types";

export function useSiteContent() {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("site_content")
      .select("*")
      .eq("id", "main")
      .maybeSingle()
      .then(({ data }) => {
        setContent(data as SiteContent | null);
        setLoading(false);
      });
  }, []);

  return { content, loading };
}

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("projects")
      .select("*")
      .order("sort_order", { ascending: true })
      .then(({ data }) => {
        setProjects((data as Project[]) ?? []);
        setLoading(false);
      });
  }, []);

  return { projects, loading };
}

export function useSkills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("skills")
      .select("*")
      .eq("is_visible", true)
      .order("sort_order", { ascending: true })
      .then(({ data }) => {
        setSkills((data as Skill[]) ?? []);
        setLoading(false);
      });
  }, []);

  return { skills, loading };
}

export function usePricing() {
  const [pricing, setPricing] = useState<PricingItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("pricing")
      .select("*")
      .order("sort_order", { ascending: true })
      .then(({ data }) => {
        setPricing((data as PricingItem[]) ?? []);
        setLoading(false);
      });
  }, []);

  return { pricing, loading };
}
