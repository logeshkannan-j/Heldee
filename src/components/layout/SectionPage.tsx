import type { ReactNode } from "react";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import ScrollProgress from "@/components/ui/ScrollProgress";
import Nav from "@/components/sections/Nav";
import Footer from "@/components/sections/Footer";

/**
 * Wraps a single section (Work, Pricing, About, Contact, Services) so it can
 * be its own standalone page — same background, nav and footer as the
 * homepage, so it still feels like one site, just split into real pages
 * with their own URLs instead of one long scroll.
 */
export default function SectionPage({ children }: { children: ReactNode }) {
  return (
    <>
      <AnimatedBackground />
      <div className="vignette" aria-hidden="true" />
      <div className="grain-overlay" aria-hidden="true" />
      <ScrollProgress />
      <div className="relative z-10">
        <Nav />
      </div>
      <main className="relative z-10 pt-6 font-body">{children}</main>
      <Footer />
    </>
  );
}
