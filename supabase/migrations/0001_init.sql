-- HELDEE TECH SOLUTIONS — initial schema
-- Run this in Supabase → SQL Editor (or via `supabase db push` if you use the CLI).

create extension if not exists "pgcrypto";

-- ---------- site_content: single editable row for hero/about/contact text ----------
create table if not exists site_content (
  id text primary key default 'main',
  hero_heading text not null default 'Digital products, built beyond ordinary.',
  hero_description text not null default 'I design and develop websites, applications and custom software for people who have an idea and want to turn it into something real.',
  tagline text not null default 'Digital products. Built beyond ordinary.',
  availability_status text not null default 'AVAILABLE FOR SELECT PROJECTS — 2026',
  about_who text not null default '',
  about_enjoy text not null default '',
  about_why text not null default '',
  about_projects text not null default '',
  about_philosophy text not null default '',
  profile_photo_url text,
  email text not null default '',
  phone text not null default '',
  location text not null default '',
  github_url text not null default '',
  linkedin_url text not null default '',
  instagram_url text
);
insert into site_content (id) values ('main') on conflict (id) do nothing;

-- ---------- projects ----------
create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null default '',
  category text not null check (category in ('WEBSITE','WEB APP','MOBILE','SOFTWARE','COLLEGE','EXPERIMENT')),
  technologies text[] not null default '{}',
  year int not null default extract(year from now()),
  features text[] not null default '{}',
  live_url text,
  github_url text,
  is_private boolean not null default false,
  is_featured boolean not null default false,
  is_demo boolean not null default false,
  case_idea text, case_problem text, case_approach text,
  case_challenges text, case_solution text, case_result text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- ---------- skills ----------
create table if not exists skills (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null check (category in ('Frontend','Backend','Mobile','Database','Tools')),
  detail text not null default '',
  is_visible boolean not null default true,
  sort_order int not null default 0
);

-- ---------- pricing ----------
create table if not exists pricing (
  id uuid primary key default gen_random_uuid(),
  service text not null,
  starting_price text not null default '',
  timeline text,
  features text[] not null default '{}',
  is_custom_quote boolean not null default false,
  sort_order int not null default 0
);

-- ---------- enquiries ----------
create table if not exists enquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  project_type text not null default '',
  budget text,
  timeline text,
  description text not null default '',
  reference_website text,
  required_features text,
  status text not null default 'NEW' check (status in ('NEW','CONTACTED','DISCUSSION','QUOTED','IN PROGRESS','COMPLETED','CANCELLED')),
  internal_notes text,
  created_at timestamptz not null default now()
);

-- ---------- Row Level Security ----------
alter table site_content enable row level security;
alter table projects enable row level security;
alter table skills enable row level security;
alter table pricing enable row level security;
alter table enquiries enable row level security;

-- Public (anon) can read everything except enquiries — the portfolio is public.
create policy "Public can read site_content" on site_content for select using (true);
create policy "Public can read projects" on projects for select using (true);
create policy "Public can read skills" on skills for select using (true);
create policy "Public can read pricing" on pricing for select using (true);

-- Anyone can submit an enquiry (the contact form), but only signed-in admins can read them back.
create policy "Anyone can submit an enquiry" on enquiries for insert with check (true);
create policy "Authenticated users can read enquiries" on enquiries for select using (auth.role() = 'authenticated');
create policy "Authenticated users can update enquiries" on enquiries for update using (auth.role() = 'authenticated');

-- Only signed-in admins can write to the content/projects/skills/pricing tables.
create policy "Authenticated users can modify site_content" on site_content for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Authenticated users can modify projects" on projects for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Authenticated users can modify skills" on skills for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Authenticated users can modify pricing" on pricing for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- ---------- Starter pricing rows (matches the original spec's starting points) ----------
insert into pricing (service, starting_price, timeline, features, is_custom_quote, sort_order) values
  ('PERSONAL WEBSITE', '₹5,000+', null, '{Portfolio,Resume,"Personal brand","Responsive design"}', false, 1),
  ('BUSINESS WEBSITE', '₹12,000+', null, '{"Multiple pages","Contact form","Responsive design","Basic SEO"}', false, 2),
  ('ADVANCED WEBSITE', '₹20,000+', null, '{"Custom UI","Animations","CMS / content management","Advanced interactions"}', false, 3),
  ('WEB APPLICATION', '₹30,000+', null, '{Authentication,Database,Dashboard,"API integration"}', false, 4),
  ('MOBILE APPLICATION', '₹40,000+', null, '{Flutter,Authentication,API,Database,Deployment}', false, 5),
  ('COLLEGE PROJECT', '₹3,000+', null, '{Java,Flutter,"Web application",Database,"Documentation / demo"}', false, 6),
  ('CUSTOM SOFTWARE', '', null, '{"Requirements are evaluated individually"}', true, 7)
on conflict do nothing;
