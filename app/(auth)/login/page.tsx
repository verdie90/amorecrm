"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Eye, EyeOff, HeartHandshake, Lock, Mail,
  Globe, Users, Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn, signInWithGoogle, getAuthErrorMessage } from "@/lib/auth";

const features = [
  { icon: Users, label: "Multi-tenant CRM" },
  { icon: Zap, label: "AI-powered automation" },
  { icon: Globe, label: "Omnichannel inbox" },
];

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await signIn(email, password);
      router.replace("/dashboard");
    } catch (err: unknown) {
      const code = (err as { code?: string }).code ?? "";
      setError(getAuthErrorMessage(code));
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setGoogleLoading(true);
    setError("");
    try {
      await signInWithGoogle();
      router.replace("/dashboard");
    } catch (err: unknown) {
      const code = (err as { code?: string }).code ?? "";
      setError(getAuthErrorMessage(code));
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-(--bg-base)">
      {/* Left panel - Branding */}
      <div className="hidden lg:flex lg:w-[44%] bg-linear-to-br from-[#1e3a8a] via-[#1d4ed8] to-[#0ea5e9] flex-col justify-between p-12 relative overflow-hidden animate-gradient" style={{ backgroundSize: "200% 200%" }}>
        {/* Background pattern */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 -left-20 w-80 h-80 bg-white rounded-full blur-3xl opacity-10" />
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#38bdf8] rounded-full blur-3xl opacity-10" />
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-white rounded-full blur-3xl opacity-5" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <HeartHandshake size={22} className="text-white" />
            </div>
            <span className="font-display font-bold text-white text-xl">Amore CRM</span>
          </div>

          <h1 className="font-display text-4xl font-bold text-white leading-tight mb-4">
            Build stronger<br />customer relationships
          </h1>
          <p className="text-white/70 text-base leading-relaxed max-w-sm">
            The all-in-one CRM platform for modern businesses. Manage contacts, deals, conversations and more – all in one place.
          </p>

          <div className="flex flex-col gap-3 mt-8">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.label} className="flex items-center gap-3 text-white/90">
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                    <Icon size={13} />
                  </div>
                  <span className="text-sm font-medium">{f.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-4 bg-white/10 rounded-2xl px-5 py-4 backdrop-blur-sm border border-white/10">
            <div className="flex -space-x-2">
              {["Ahmad", "Sarah", "Citra", "Budi"].map((n) => (
                <div key={n} className="w-8 h-8 rounded-full bg-white/30 border-2 border-white/50 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                  {n[0]}
                </div>
              ))}
            </div>
            <div className="text-white/80 text-sm">
              <strong className="text-white">500+</strong> companies trust Amore CRM
            </div>
          </div>
        </div>
      </div>

      {/* Right panel - Login form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          {/* Logo (mobile only) */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 bg-[#1e3a8a] rounded-xl flex items-center justify-center">
              <HeartHandshake size={18} className="text-white" />
            </div>
            <span className="font-display font-bold text-(--text-primary) text-lg">Amore CRM</span>
          </div>

          <div className="mb-7">
            <h2 className="font-display text-2xl font-bold text-(--text-primary) tracking-tight">Welcome back</h2>
            <p className="text-sm text-(--text-muted) mt-1.5">Sign in to your workspace</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail size={14} />}
              required
            />
            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              leftIcon={<Lock size={14} />}
              rightIcon={
                <button type="button" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              }
              required
            />

            {error && (
              <div className="bg-red-50 border border-red-200/60 rounded-xl px-3 py-2.5 text-xs text-red-600 flex items-center gap-2 animate-slide-down">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                {error}
              </div>
            )}

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-xs text-(--text-secondary) cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded border-(--border-color)" />
                Remember me
              </label>
              <Link href="/forgot-password" className="text-xs text-[#1e3a8a] hover:underline font-medium">
                Forgot password?
              </Link>
            </div>

            <Button type="submit" loading={loading} className="w-full" size="lg">
              Sign in to Workspace
            </Button>
          </form>

          <div className="mt-5">
            <div className="relative flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-(--border-color)" />
              <span className="text-xs text-(--text-muted)">or continue with</span>
              <div className="flex-1 h-px bg-(--border-color)" />
            </div>

            <Button variant="secondary" className="w-full" size="md" onClick={handleGoogle} loading={googleLoading} type="button">
              <svg viewBox="0 0 24 24" width="16" height="16">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Sign in with Google
            </Button>
          </div>

          <p className="text-center text-xs text-(--text-muted) mt-6">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-[#1e3a8a] font-medium hover:underline">
              Start free trial
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
