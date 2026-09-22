export default function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-6 md:px-8">
        <span className="flex items-center gap-2.5 font-mono text-sm">
          <img src="/logo.png" alt="HELDEE" className="h-7 w-7 rounded-md object-cover" />
          HELDEE TECH SOLUTIONS
        </span>
        <div className="flex gap-6 text-sm text-muted-foreground">
          <a href="#work" className="underline-grow">Work</a>
          <a href="#pricing" className="underline-grow">Pricing</a>
          <a href="#about" className="underline-grow">About</a>
          <a href="#contact" className="underline-grow">Contact</a>
        </div>
      </div>
      <p className="mx-auto mt-6 max-w-7xl px-6 font-mono text-[11px] text-muted-foreground md:px-8">
        © 2026 HELDEE TECH SOLUTIONS — Freelance Developer.
      </p>
    </footer>
  );
}
