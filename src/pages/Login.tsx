import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";

export default function Login() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const { error } = await signIn(email, password);
    setSubmitting(false);
    if (error) return setError(error);
    navigate("/control");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6 text-foreground">
      <form onSubmit={handleSubmit} className="liquid-glass w-full max-w-sm rounded-2xl p-8">
        <h1 className="mb-6 text-2xl" style={{ fontFamily: "'Instrument Serif', serif" }}>Admin sign in</h1>
        <div className="mb-4 flex flex-col gap-2">
          <label className="text-sm text-muted-foreground">Email</label>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="rounded-lg border border-border bg-transparent px-3 py-2 text-sm outline-none focus:border-cyan" />
        </div>
        <div className="mb-6 flex flex-col gap-2">
          <label className="text-sm text-muted-foreground">Password</label>
          <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="rounded-lg border border-border bg-transparent px-3 py-2 text-sm outline-none focus:border-cyan" />
        </div>
        {error && <p className="mb-4 text-sm text-red-400">{error}</p>}
        <Button type="submit" variant="default" className="w-full py-3" disabled={submitting}>
          {submitting ? "Signing in…" : "Sign in"}
        </Button>
        <p className="mt-4 text-xs text-muted-foreground">
          Create the admin user in Supabase → Authentication → Users. This form doesn't self-register anyone.
        </p>
      </form>
    </div>
  );
}
