"use client";
import { useState } from "react";
import Link from "next/link";
import { Mail, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { resetPassword, getAuthErrorMessage } from "@/lib/auth";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await resetPassword(email);
      setSent(true);
    } catch (err: unknown) {
      const code = (err as { code?: string }).code ?? "";
      setError(getAuthErrorMessage(code));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in">
      {!sent ? (
        <>
          <div className="mb-7">
            <h2 className="font-display text-2xl font-bold text-(--text-primary) tracking-tight">Forgot password?</h2>
            <p className="text-sm text-(--text-muted) mt-1.5">
              No worries! Enter your email and we&apos;ll send you a reset link.
            </p>
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
            {error && (
              <div className="bg-red-50 border border-red-200/60 rounded-xl px-3 py-2.5 text-xs text-red-600 flex items-center gap-2 animate-slide-down">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                {error}
              </div>
            )}
            <Button type="submit" loading={loading} className="w-full" size="lg">
              Send Reset Link
            </Button>
          </form>

          <div className="mt-4 p-3.5 rounded-xl bg-(--bg-muted) border border-(--border-subtle)">
            <p className="text-xs text-(--text-secondary) leading-relaxed">
              For security, password reset links expire after <strong className="text-(--text-primary)">30 minutes</strong>. 
              Make sure to check your spam folder if you don&apos;t receive the email.
            </p>
          </div>
        </>
      ) : (
        <div className="text-center py-6">
          <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <CheckCircle2 size={32} className="text-emerald-600" />
          </div>
          <h2 className="font-display text-2xl font-bold text-(--text-primary) tracking-tight mb-2">Check your email</h2>
          <p className="text-sm text-(--text-muted) leading-relaxed mb-6">
            We sent a password reset link to<br />
            <strong className="text-(--text-primary)">{email}</strong>
          </p>
          <Button
            variant="secondary"
            className="w-full"
            onClick={() => { setEmail(""); setSent(false); }}
          >
            Didn&apos;t receive it? Try again
          </Button>
        </div>
      )}

      <div className="mt-6 text-center">
        <Link href="/login" className="inline-flex items-center gap-2 text-sm text-(--text-muted) hover:text-(--text-primary) transition-colors">
          <ArrowLeft size={14} />
          Back to sign in
        </Link>
      </div>
    </div>
  );
}
