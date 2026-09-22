import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";

const tabs = [
  { to: "/control", label: "Overview", end: true },
  { to: "/control/projects", label: "Projects" },
  { to: "/control/skills", label: "Skills" },
  { to: "/control/pricing", label: "Pricing" },
  { to: "/control/enquiries", label: "Enquiries" },
  { to: "/control/content", label: "Content" },
];

export default function AdminLayout() {
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="border-b border-border px-6 py-5 md:px-10">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <span className="flex items-center gap-2 font-mono text-sm">
            <img src="/logo.png" alt="HELDEE" className="h-6 w-6 rounded object-cover" />
            HELDEE / CONTROL
          </span>
          <div className="flex items-center gap-4">
            <span className="text-xs text-muted-foreground">{user?.email}</span>
            <Button variant="ghost" size="sm" onClick={() => signOut()}>Sign out</Button>
          </div>
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-6 py-5 md:px-10">
        {tabs.map((t) => (
          <NavLink
            key={t.to}
            to={t.to}
            end={t.end}
            className={({ isActive }) =>
              `whitespace-nowrap rounded-lg px-4 py-2 font-mono text-xs ${isActive ? "bg-cyan text-background" : "border border-border text-muted-foreground"}`
            }
          >
            {t.label}
          </NavLink>
        ))}
      </div>
      <div className="mx-auto max-w-6xl px-6 pb-16 md:px-10">
        <Outlet />
      </div>
    </div>
  );
}
