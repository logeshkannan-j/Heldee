export interface SiteContent {
  id: string;
  hero_heading: string;
  hero_description: string;
  tagline: string;
  availability_status: string;
  about_who: string;
  about_enjoy: string;
  about_why: string;
  about_projects: string;
  about_philosophy: string;
  profile_photo_url: string | null;
  email: string;
  phone: string;
  location: string;
  github_url: string;
  linkedin_url: string;
  instagram_url: string | null;
}

export type ProjectCategory = "WEBSITE" | "WEB APP" | "MOBILE" | "SOFTWARE" | "COLLEGE" | "EXPERIMENT";

export interface Project {
  id: string;
  name: string;
  description: string;
  category: ProjectCategory;
  technologies: string[];
  year: number;
  features: string[];
  live_url: string | null;
  github_url: string | null;
  is_private: boolean;
  is_featured: boolean;
  is_demo: boolean;
  case_idea: string | null;
  case_problem: string | null;
  case_approach: string | null;
  case_challenges: string | null;
  case_solution: string | null;
  case_result: string | null;
  sort_order: number;
  created_at: string;
}

export type SkillCategory = "Frontend" | "Backend" | "Mobile" | "Database" | "Tools";

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  detail: string;
  is_visible: boolean;
  sort_order: number;
}

export interface PricingItem {
  id: string;
  service: string;
  starting_price: string;
  timeline: string | null;
  features: string[];
  is_custom_quote: boolean;
  sort_order: number;
}

export type EnquiryStatus =
  | "NEW" | "CONTACTED" | "DISCUSSION" | "QUOTED" | "IN PROGRESS" | "COMPLETED" | "CANCELLED";

export interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  project_type: string;
  budget: string | null;
  timeline: string | null;
  description: string;
  reference_website: string | null;
  required_features: string | null;
  status: EnquiryStatus;
  internal_notes: string | null;
  created_at: string;
}
