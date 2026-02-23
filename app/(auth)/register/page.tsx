"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Eye, EyeOff, HeartHandshake, Building, User, Mail, Lock,
  CheckCircle2, Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signUp, getAuthErrorMessage } from "@/lib/auth";

const plans = [
  {
    id: "basic",
    name: "Basic",
    price: "Free",
    description: "For small teams just getting started",
    features: ["5 agents", "1,000 contacts", "Basic automations"],
  },
  {
    id: "pro",
    name: "Pro",
    price: "Rp 299K/mo",
    description: "For growing teams and businesses",
    features: ["25 agents", "50,000 contacts", "AI features"],
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Custom",
    description: "For large organizations",
    features: ["Unlimited agents", "Unlimited contacts", "Dedicated support"],
  },
];

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("pro");
  const [agreed, setAgreed] = useState(false);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    company: "",
    name: "",
    email: "",
    password: "",
  });

  const updateForm = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(prev => ({ ...prev, [key]: e.target.value }));

  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await signUp(form.email, form.password, form.name, form.company, selectedPlan);
      router.replace("/dashboard");
    } catch (err: unknown) {
      const code = (err as { code?: string }).code ?? "";
      setError(getAuthErrorMessage(code));
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-(--bg-base)">
      {/* Left */}
      <div className="hidden lg:flex lg:w-[44%] bg-linear-to-br from-[#1e3a8a] via-[#1d4ed8] to-[#0ea5e9] flex-col justify-between p-12 relative overflow-hidden animate-gradient" style={{ backgroundSize: "200% 200%" }}>
        <div className="absolute inset-0">
          <div className="absolute top-1/4 -left-20 w-80 h-80 bg-white rounded-full blur-3xl opacity-10" />
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#38bdf8] rounded-full blur-3xl opacity-10" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <HeartHandshake size={22} className="text-white" />
            </div>
            <span className="font-display font-bold text-white text-xl">Amore CRM</span>
          </div>

          <h1 className="font-display text-4xl font-bold text-white leading-tight mb-4">
            Start your free<br />14-day trial
          </h1>
          <p className="text-white/70 text-base leading-relaxed max-w-sm">
            No credit card required. Get full access to all Pro features and see how Amore CRM transforms your customer relationships.
          </p>

          <div className="mt-10 flex flex-col gap-4">
            {[
              "Set up in under 5 minutes",
              "Free migration from any CRM",
              "Cancel anytime, no questions asked",
              "99.9% uptime SLA guarantee",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 text-white/90">
                <CheckCircle2 size={16} className="text-[#38bdf8] shrink-0" />
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 bg-white/10 rounded-2xl p-5">
          <p className="text-white/90 text-sm italic leading-relaxed mb-3">
            "Amore CRM cut our response time by 60% and boosted our deal close rate by 40% in just 3 months."
          </p>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/30 flex items-center justify-center text-white text-sm font-bold">S</div>
            <div>
              <p className="text-white text-xs font-semibold">Sarah Wijaya</p>
              <p className="text-white/60 text-xs">Head of Sales, TechVenture ID</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-105">
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 bg-[#1e3a8a] rounded-xl flex items-center justify-center">
              <HeartHandshake size={18} className="text-white" />
            </div>
            <span className="font-display font-bold text-(--text-primary) text-lg">Amore CRM</span>
          </div>

          {/* Step indicator */}
          <div className="flex items-center gap-2 mb-6">
            {[1, 2].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center transition-all ${
                  step >= s ? "bg-[#1e3a8a] text-white" : "bg-(--bg-muted) text-(--text-muted)"
                }`}>
                  {step > s ? <Check size={12} /> : s}
                </div>
                <span className={`text-xs ${step === s ? "text-(--text-primary) font-medium" : "text-(--text-muted)"}`}>
                  {s === 1 ? "Your details" : "Choose plan"}
                </span>
                {s < 2 && <div className="w-8 h-px bg-(--border-color)" />}
              </div>
            ))}
          </div>

          {step === 1 && (
            <>
              <div className="mb-6">
                <h2 className="font-display text-2xl font-bold text-(--text-primary)">Create your account</h2>
                <p className="text-sm text-(--text-muted) mt-1.5">Get started with your free 14-day trial</p>
              </div>
              <form onSubmit={handleStep1} className="space-y-4">
                <Input
                  label="Company Name"
                  placeholder="Acme Corp"
                  value={form.company}
                  onChange={updateForm("company")}
                  leftIcon={<Building size={14} />}
                  required
                />
                <Input
                  label="Full Name"
                  placeholder="John Santoso"
                  value={form.name}
                  onChange={updateForm("name")}
                  leftIcon={<User size={14} />}
                  required
                />
                <Input
                  label="Work Email"
                  type="email"
                  placeholder="you@company.com"
                  value={form.email}
                  onChange={updateForm("email")}
                  leftIcon={<Mail size={14} />}
                  required
                />
                <Input
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Min. 8 characters"
                  value={form.password}
                  onChange={updateForm("password")}
                  leftIcon={<Lock size={14} />}
                  rightIcon={
                    <button type="button" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  }
                  required
                />
                <Button type="submit" className="w-full" size="lg">
                  Continue
                </Button>
              </form>
            </>
          )}

          {step === 2 && (
            <>
              <div className="mb-6">
                <h2 className="font-display text-2xl font-bold text-(--text-primary)">Choose your plan</h2>
                <p className="text-sm text-(--text-muted) mt-1.5">Start free, upgrade when you're ready</p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-3">
                {plans.map((plan) => (
                  <button
                    key={plan.id}
                    type="button"
                    onClick={() => setSelectedPlan(plan.id)}
                    className={`w-full text-left border rounded-xl p-4 transition-all relative ${
                      selectedPlan === plan.id
                        ? "border-[#1e3a8a] bg-[#1e3a8a]/5"
                        : "border-(--border-color) bg-(--bg-surface) hover:border-[#1e3a8a]/30"
                    }`}
                  >
                    {plan.popular && (
                      <span className="absolute top-3 right-3 text-[10px] font-bold bg-[#1e3a8a] text-white px-2 py-0.5 rounded-full">
                        POPULAR
                      </span>
                    )}
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-sm text-(--text-primary)">{plan.name}</span>
                      <span className="text-xs font-bold text-[#1e3a8a]">{plan.price}</span>
                    </div>
                    <p className="text-xs text-(--text-muted) mb-2">{plan.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {plan.features.map((f) => (
                        <span key={f} className="text-[10px] bg-(--bg-muted) text-(--text-secondary) rounded px-2 py-0.5">
                          {f}
                        </span>
                      ))}
                    </div>
                  </button>
                ))}

                <label className="flex items-start gap-2.5 mt-4 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-0.5"
                    required
                  />
                  <span className="text-xs text-(--text-secondary)">
                    I agree to the{" "}
                    <Link href="#" className="text-[#1e3a8a] hover:underline">Terms of Service</Link>
                    {" "}and{" "}
                    <Link href="#" className="text-[#1e3a8a] hover:underline">Privacy Policy</Link>
                  </span>
                </label>

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-xs text-red-600">
                    {error}
                  </div>
                )}

                <div className="flex gap-3 pt-1">
                  <Button type="button" variant="secondary" className="flex-1" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button type="submit" loading={loading} className="flex-1" disabled={!agreed}>
                    Create Account
                  </Button>
                </div>
              </form>
            </>
          )}

          <p className="text-center text-xs text-(--text-muted) mt-5">
            Already have an account?{" "}
            <Link href="/login" className="text-[#1e3a8a] font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
