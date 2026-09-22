import { Navigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) {
    return <div className="flex min-h-screen items-center justify-center text-muted-foreground">Checking session…</div>;
  }
  // Real auth check. Also enforced server-side by Supabase RLS — hiding
  // /control is never the actual security boundary, the RLS policy is.
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
}
