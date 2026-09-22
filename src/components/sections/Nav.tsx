import { useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const links = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  const mobileMenu = (
    <div
      className={`fixed inset-0 z-[999] flex flex-col justify-center gap-8 bg-background px-10 transition-transform duration-300 ${
        open ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <button className="absolute right-6 top-6 rounded-lg border border-border px-3 py-2 text-xs text-foreground" onClick={() => setOpen(false)}>
        CLOSE
      </button>
      {links.map((l) => (
        <Link key={l.href} to={l.href} onClick={() => setOpen(false)} className="font-display text-4xl">
          {l.label}
        </Link>
      ))}
    </div>
  );

  return (
    <>
      <nav className="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-6 py-6 md:px-8">
        <Link to="/" className="flex items-center gap-2.5 font-mono text-sm tracking-wide text-foreground">
          <img src="/logo.png" alt="HELDEE" className="h-8 w-8 rounded-md object-cover" />
          HELDEE TECH SOLUTIONS
        </Link>
        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link key={l.href} to={l.href} className="underline-grow text-sm text-muted-foreground transition-colors hover:text-foreground">
              {l.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <Link to="/contact">
            <Button variant="glass" size="nav" className="hidden sm:inline-flex">
              Start a Project
            </Button>
          </Link>
          <button className="text-foreground md:hidden" onClick={() => setOpen(true)} aria-label="Open menu">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>
        </div>
      </nav>
      {typeof document !== "undefined" && createPortal(mobileMenu, document.body)}
    </>
  );
}
