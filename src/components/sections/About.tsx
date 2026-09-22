import { useSiteContent } from "@/lib/data";
import Reveal from "@/components/ui/Reveal";
import TiltCard from "@/components/ui/TiltCard";

const why = [
  { t: "Direct Communication", p: "You communicate directly with the developer building the project." },
  { t: "Custom Development", p: "The project is built around the actual requirement." },
  { t: "Transparent Pricing", p: "You receive an estimated range before development." },
  { t: "Real Project Delivery", p: "Projects can be deployed and tested, not just designed." },
  { t: "Flexible Scale", p: "Start small and add features later." },
  { t: "Post-Launch Support", p: "Bug fixes and future improvements can be discussed." },
];

export default function About() {
  const { content } = useSiteContent();

  return (
    <section id="about" className="py-10">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <Reveal>
          <span className="font-mono text-xs tracking-widest text-cyan glow-line">11 — THE PERSON BEHIND HELDEE</span>
          <h2 className="mt-4 text-4xl md:text-5xl glow-text" style={{ fontFamily: "'Instrument Serif', serif" }}>
            About <span className="text-gradient">me</span>.
          </h2>
        </Reveal>

        <Reveal delay={100} className="mt-12 grid grid-cols-1 gap-14 md:grid-cols-[0.9fr_1.1fr]">
          <div className="flex aspect-[4/5] items-center justify-center rounded-2xl border border-border bg-gradient-to-br from-secondary to-background p-6 text-center font-mono text-xs text-muted-foreground">
            {content?.profile_photo_url ? (
              <img src={content.profile_photo_url} alt="Profile" className="h-full w-full rounded-2xl object-cover" />
            ) : (
              "PROFILE PHOTO — upload through Admin → Content"
            )}
          </div>
          <div className="space-y-5 text-[15px] leading-relaxed text-muted-foreground">
            <p><b className="text-foreground">Who I am — </b>{content?.about_who || "Add a short, honest bio through the admin panel."}</p>
            <p><b className="text-foreground">What I enjoy building — </b>{content?.about_enjoy || "Describe the kind of projects that interest you most."}</p>
            <p><b className="text-foreground">Why I started HELDEE TECH SOLUTIONS — </b>{content?.about_why || "The real reason, in your own words."}</p>
            <p><b className="text-foreground">What kind of projects I work on — </b>{content?.about_projects || "Set expectations for the type and size of work you take on."}</p>
            <p><b className="text-foreground">My development philosophy — </b>{content?.about_philosophy || "How you approach a new build, from first call to deployment."}</p>
          </div>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {why.map((w, i) => (
            <Reveal key={w.t} delay={i * 40}>
              <TiltCard strength={3} className="bg-secondary p-6 text-sm leading-relaxed text-muted-foreground">
                <b className="mb-2 block text-foreground">{w.t}</b>
                {w.p}
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
