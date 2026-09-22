import { useSiteContent } from "@/lib/data";
import { Button } from "@/components/ui/button";
import Nav from "./Nav";
import { useEffect, useRef } from "react";

const VIDEO_SRC =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4";
const displayFont = { fontFamily: "'Instrument Serif', serif" };

export default function Hero() {
  const { content } = useSiteContent();
  const contentRef = useRef<HTMLDivElement | null>(null);
  const videoWrapRef = useRef<HTMLDivElement | null>(null);

  // Camera-like scroll behaviour: as the visitor scrolls past the hero, the
  // video appears to pull back / darken (like a dolly-out) and the text
  // drifts and fades — instead of just disappearing under the next section.
  useEffect(() => {
    function onScroll() {
      const vh = window.innerHeight;
      const progress = Math.min(1, Math.max(0, window.scrollY / vh));
      if (contentRef.current) {
        contentRef.current.style.transform = `translateY(${progress * 60}px)`;
        contentRef.current.style.opacity = `${1 - progress * 1.1}`;
      }
      if (videoWrapRef.current) {
        videoWrapRef.current.style.transform = `scale(${1 + progress * 0.06})`;
        videoWrapRef.current.style.filter = `brightness(${1 - progress * 0.35})`;
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const heading = content?.hero_heading ?? "Digital products, built beyond ordinary.";
  const [line1, line2] = heading.split(",").length > 1
    ? [heading.split(",")[0] + ",", heading.split(",").slice(1).join(",").trim()]
    : [heading, ""];
  const description =
    content?.hero_description ??
    "I design and develop websites, applications and custom software for people who have an idea and want to turn it into something real.";
  const availability = content?.availability_status ?? "AVAILABLE FOR SELECT PROJECTS — 2026";

  return (
    <div id="home" className="relative min-h-[78svh] w-full overflow-hidden bg-background">
      <div ref={videoWrapRef} className="absolute inset-0 z-0 will-change-transform">
        <video
          className="ken-burns h-full w-full object-cover"
          src={VIDEO_SRC}
          autoPlay
          loop
          muted
          playsInline
        />
      </div>
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-background/70 via-background/20 to-background/85" />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(120%_80%_at_50%_20%,transparent_40%,hsla(212,58%,9%,0.5)_100%)]" />

      <div className="relative z-10">
        <Nav />
      </div>

      <div ref={contentRef} className="relative z-10 flex flex-col px-6 pb-6 pt-16 will-change-transform md:px-12">
        <div className="flex items-start justify-between">
          <span className="font-mono text-xs leading-relaxed tracking-widest text-cyan">
            FREELANCE DEVELOPER
            <br />
            HELDEE TECH SOLUTIONS
          </span>
          <span className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan shadow-[0_0_10px_hsl(var(--cyan))]" />
            {availability}
          </span>
        </div>

        <h1
          className="mt-10 max-w-5xl text-5xl font-normal leading-[0.98] tracking-tight text-foreground glow-text animate-fade-rise sm:text-7xl md:text-8xl"
          style={displayFont}
        >
          {line1}
          {line2 && (
            <>
              <br />
              <em className="not-italic text-gradient">{line2}</em>
            </>
          )}
        </h1>

        <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground animate-fade-rise-delay sm:text-lg">
          {description}
        </p>

        <div className="mt-10 flex flex-wrap gap-4 animate-fade-rise-delay-2">
          <a href="#work">
            <Button variant="default" size="lg" className="shadow-[0_0_0_rgba(0,0,0,0)] transition-shadow hover:shadow-[0_0_28px_hsla(var(--cyan),0.35)]">
              Explore My Work
            </Button>
          </a>
          <a href="#contact">
            <Button variant="glass" size="lg">
              Start a Project
            </Button>
          </a>
        </div>

        <div className="mt-16 flex items-center gap-3 font-mono text-[11px] text-muted-foreground animate-fade-rise-delay-2">
          <span className="flex h-8 w-5 items-start justify-center rounded-full border border-border p-1.5">
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-cyan" />
          </span>
          SCROLL
        </div>
      </div>
    </div>
  );
}
