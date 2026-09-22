# HELDEE TECH SOLUTIONS

Freelance developer portfolio & project showcase. React + Vite + TypeScript +
Tailwind CSS + shadcn/ui, with a real Supabase backend (auth, database) for
the admin panel.

## What works the moment you install

```
npm install
npm run dev
```

The full public homepage renders immediately — hero (with the real looping
video), Who Is HELDEE, What I Build, Selected Work, Featured Project, Skills,
the HELDEE Workbench, Pricing, the rule-based Estimator, How I Build, About,
and Contact. Without a Supabase project connected, the content-driven
sections (projects, skills, pricing, about text) just render empty states
("Add your project here", etc.) instead of crashing.

## Connecting your own Supabase project (required for real data + admin)

1. Create a project at supabase.com.
2. Copy `.env.example` to `.env` and fill in your project URL + anon key
   (Project Settings → API).
3. Run `supabase/migrations/0001_init.sql` in the SQL Editor. This creates:
   - `site_content` — hero text, about text, contact details (single row)
   - `projects` — your portfolio items
   - `skills` — your tech stack, grouped by category
   - `pricing` — starting-price tiers (pre-seeded with the ones from the brief)
   - `enquiries` — contact-form submissions
   
   and sets up Row Level Security so:
   - anyone can read the public content and submit an enquiry
   - only a signed-in user can write to content/projects/skills/pricing, or
     read/update enquiries.

4. Create your own login in Supabase → Authentication → Users (email +
   password). That's the only account that can reach `/control` — the admin
   panel isn't protected by hiding the URL, it's protected by real auth and
   by the RLS policies above, which are enforced even if someone bypasses
   the frontend entirely.

5. Visit `/control` and sign in. From there you can add projects, skills,
   pricing tiers, edit all the homepage copy, and see/manage enquiries
   (status pipeline + CSV export).

## Server-side email on new enquiries

`supabase/functions/send-enquiry-email` is a Supabase Edge Function using
Resend — it runs on Supabase's servers, so the email API key lives there as
a secret, never in frontend code.

```
supabase functions deploy send-enquiry-email
supabase secrets set RESEND_API_KEY=your_key_here
supabase secrets set NOTIFY_EMAIL=you@example.com
```

Then add a Database Webhook (Database → Webhooks) that fires on `INSERT`
into `enquiries` and calls this function — a dashboard setting, no code
changes needed.

## What's intentionally left as placeholders

Per the brief's "no fake information" rule, there are no invented projects,
testimonials, stats, or bio text. Everything real gets added by you through
`/control`, and the public site shows honest empty states until you do.

## Structure

```
src/
  components/
    sections/        homepage sections (Hero, Work, Pricing, Estimator, …)
    ui/               shared button + form field components
  lib/                supabase client, auth context, data hooks, types
  pages/
    Home.tsx          assembles all homepage sections
    Login.tsx          admin sign-in
    admin/             /control — Overview, Projects, Skills, Pricing, Enquiries, Content
supabase/
  migrations/0001_init.sql
  functions/send-enquiry-email/
```
