"use client";
import { useState } from "react";
import Link from "next/link";
import { HeartHandshake, Mail, ArrowLeft, CheckCircle2 } from "lucide-react";
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
    <div className="min-h-screen flex bg-(--bg-base)">
      {/* Left */}
      <div className="hidden lg:flex lg:w-[44%] bg-linear-to-br from-[#1e3a8a] via-[#1d4ed8] to-[#0ea5e9] flex-col justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 -left-20 w-80 h-80 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#38bdf8] rounded-full blur-3xl" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <HeartHandshake size={22} className="text-white" />
            </div>
            <span className="font-display font-bold text-white text-xl">Amore CRM</span>
          </div>
          <h1 className="font-display text-4xl font-bold text-white leading-tight mb-4">
            Reset your<br />password
          </h1>
          <p className="text-white/70 text-base leading-relaxed max-w-sm">
            Enter your work email address and we&apos;ll send you a secure link to reset your password.
          </p>
          <div className="mt-10 bg-white/10 rounded-2xl p-5">
            <p className="text-white/80 text-sm">
              For security, password reset links expire after <strong className="text-white">30 minutes</strong>. 
              Make sure to check your spam folder if you don&apos;t receive the email.
            </p>
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 bg-[#1e3a8a] rounded-xl flex items-center justify-center">
              <HeartHandshake size={18} className="text-white" />
            </div>
            <span className="font-display font-bold text-(--text-primary) text-lg">Amore CRM</span>
          </div>

          {!sent ? (
            <>
              <div className="mb-7">
                <h2 className="font-display text-2xl font-bold text-(--text-primary)">Forgot password?</h2>
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
                  <div className="bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-xs text-red-600">
                    {error}
                  </div>
                )}
                <Button type="submit" loading={loading} className="w-full" size="lg">
                  Send Reset Link
                </Button>
              </form>
            </>
          ) : (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
                <CheckCircle2 size={32} className="text-green-600" />
              </div>
              <h2 className="font-display text-2xl font-bold text-(--text-primary) mb-2">Check your email</h2>
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
      </div>
    </div>
  );
}
