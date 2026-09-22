// Supabase Edge Function — runs server-side on Supabase's infrastructure,
// not in the browser, so this is where your email API key actually belongs.
//
// Deploy:
//   supabase functions deploy send-enquiry-email
//   supabase secrets set RESEND_API_KEY=your_key_here
//   supabase secrets set NOTIFY_EMAIL=you@example.com
//
// Wire it up with a Database Webhook (Database → Webhooks in the Supabase
// dashboard) that fires on INSERT into `enquiries` and calls this function —
// no extra code needed, it's a dashboard setting.

import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const NOTIFY_EMAIL = Deno.env.get("NOTIFY_EMAIL") ?? "you@example.com";

serve(async (req) => {
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });

  try {
    const payload = await req.json();
    const record = payload.record ?? payload;

    if (!RESEND_API_KEY) {
      return new Response(JSON.stringify({ error: "RESEND_API_KEY is not configured" }), { status: 500 });
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        // Using Resend's shared test sender since no custom domain is
        // verified yet. Once you verify your own domain at
        // https://resend.com/domains, change this to something like
        // "HELDEE TECH SOLUTIONS <enquiries@yourrealdomain.com>".
        from: "HELDEE TECH SOLUTIONS <onboarding@resend.dev>",
        to: NOTIFY_EMAIL,
        subject: `New project enquiry from ${record.name ?? "a visitor"}`,
        text: `Name: ${record.name}\nEmail: ${record.email}\nPhone: ${record.phone ?? "—"}\nProject type: ${record.project_type ?? "—"}\nBudget: ${record.budget ?? "—"}\nTimeline: ${record.timeline ?? "—"}\n\n${record.description ?? ""}`,
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      return new Response(JSON.stringify({ error: body }), { status: 502 });
    }
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), { status: 400 });
  }
});