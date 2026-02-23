"use client";
import { useState } from "react";
import {
  CreditCard, Check, Zap, Star, Shield, ArrowUpRight,
  Download, AlertCircle, CheckCircle2
} from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { planConfigs, mockInvoices } from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

const paymentMethods = [
  { id: "va_bca", label: "Virtual Account BCA", type: "virtual_account", icon: "🏦" },
  { id: "va_mandiri", label: "Virtual Account Mandiri", type: "virtual_account", icon: "🏦" },
  { id: "qris", label: "QRIS", type: "qris", icon: "📱" },
  { id: "gopay", label: "GoPay", type: "ewallet", icon: "💚" },
  { id: "ovo", label: "OVO", type: "ewallet", icon: "💜" },
  { id: "credit_card", label: "Credit Card", type: "card", icon: "💳" },
  { id: "bank_transfer", label: "Manual Bank Transfer", type: "manual", icon: "🏧" },
];

export default function SubscriptionsPage() {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [selectedPayment, setSelectedPayment] = useState("va_bca");

  const currentPlan = "pro";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-(--text-primary)">Subscription & Billing</h1>
          <p className="text-sm text-(--text-muted) mt-0.5">Manage your plan, billing, and payment methods</p>
        </div>
      </div>

      {/* Current Plan Banner */}
      <div className="bg-gradient-to-r from-[#1e3a8a] to-[#1d4ed8] rounded-2xl p-5 text-white">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="info" className="bg-white/20 text-white border-0">Current Plan</Badge>
            </div>
            <h2 className="font-display text-2xl font-bold">Pro Plan</h2>
            <p className="text-white/70 text-sm mt-1">Rp 799.000 / month · Renews Feb 15, 2026</p>
            <div className="flex items-center gap-4 mt-3 text-sm text-white/80">
              <span>👥 12/15 agents</span>
              <span>📋 1,540/10,000 contacts</span>
              <span>📢 3/3 channels</span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Button variant="accent" size="sm">Upgrade Plan</Button>
            <Button size="sm" className="bg-white/20 text-white hover:bg-white/30 border-0">Manage</Button>
          </div>
        </div>
        {/* Usage bar */}
        <div className="mt-4 space-y-2">
          <div>
            <div className="flex justify-between text-xs text-white/70 mb-1">
              <span>Agents Used</span><span>12/15</span>
            </div>
            <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-white rounded-full" style={{ width: "80%" }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs text-white/70 mb-1">
              <span>Contacts Used</span><span>1,540/10,000</span>
            </div>
            <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-[#38bdf8] rounded-full" style={{ width: "15.4%" }} />
            </div>
          </div>
        </div>
      </div>

      {/* Plans */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-semibold text-lg text-(--text-primary)">Available Plans</h2>
          <div className="flex items-center gap-1 bg-(--bg-muted) rounded-xl p-1">
            {(["monthly", "annual"] as const).map((b) => (
              <button
                key={b}
                onClick={() => setBilling(b)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                  billing === b ? "bg-(--bg-surface) text-(--text-primary) shadow-sm" : "text-(--text-muted)"
                )}
              >
                {b === "monthly" ? "Monthly" : "Annual (Save 17%)"}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {planConfigs.map((plan) => {
            const isCurrent = plan.id === currentPlan;
            const isEnterprise = plan.id === "enterprise";
            return (
              <div
                key={plan.id}
                className={cn(
                  "rounded-2xl border p-5 relative transition-all",
                  isCurrent
                    ? "border-[#1e3a8a] bg-[#1e3a8a]/3 ring-2 ring-[#1e3a8a]/20"
                    : "bg-(--bg-surface) border-(--border-color) hover:shadow-md hover:border-[#1e3a8a]/30"
                )}
              >
                {isCurrent && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge variant="default" className="bg-[#1e3a8a] text-white">Current Plan</Badge>
                  </div>
                )}
                {isEnterprise && !isCurrent && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge variant="accent" className="bg-gradient-to-r from-amber-400 to-orange-400 text-white border-0">
                      <Star size={10} /> Best Value
                    </Badge>
                  </div>
                )}

                <div className="mb-4">
                  <h3 className="font-display font-bold text-lg text-(--text-primary)">{plan.name}</h3>
                  <div className="mt-2">
                    <span className="font-display text-3xl font-bold text-(--text-primary)">
                      {formatCurrency(plan.price[billing])}
                    </span>
                    <span className="text-sm text-(--text-muted) ml-1">/{billing === "monthly" ? "mo" : "yr"}</span>
                  </div>
                </div>

                <div className="space-y-2 mb-5">
                  {plan.features.map((f) => (
                    <div key={f} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 size={14} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span className="text-(--text-secondary)">{f}</span>
                    </div>
                  ))}
                </div>

                <Button
                  variant={isCurrent ? "secondary" : "primary"}
                  className="w-full"
                  disabled={isCurrent}
                  onClick={() => { setSelectedPlan(plan.id); setShowUpgradeModal(true); }}
                >
                  {isCurrent ? "Current Plan" : `Upgrade to ${plan.name}`}
                </Button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Invoice history */}
      <Card padding="md">
        <CardHeader>
          <CardTitle>Invoice History</CardTitle>
          <Button variant="ghost" size="xs" icon={<Download size={13} />}>Download All</Button>
        </CardHeader>
        <div className="space-y-2">
          {mockInvoices.map((inv) => (
            <div
              key={inv.id}
              className="flex items-center justify-between py-3 border-b border-(--border-color) last:border-0"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-(--bg-muted) flex items-center justify-center">
                  <CreditCard size={16} className="text-(--text-muted)" />
                </div>
                <div>
                  <p className="text-sm font-medium text-(--text-primary)">Invoice {inv.id}</p>
                  <p className="text-xs text-(--text-muted)">Due {formatDate(inv.dueDate)}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-semibold text-sm text-(--text-primary)">{formatCurrency(inv.amount)}</span>
                <Badge variant={inv.status === "paid" ? "success" : inv.status === "overdue" ? "danger" : "warning"} size="sm" dot>
                  {inv.status}
                </Badge>
                <Button variant="ghost" size="xs" icon={<Download size={12} />}>PDF</Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Upgrade Modal */}
      <Modal
        open={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        title="Upgrade Subscription"
        description={`You're upgrading to the ${planConfigs.find(p => p.id === selectedPlan)?.name} plan`}
        size="md"
        footer={
          <>
            <Button variant="secondary" onClick={() => setShowUpgradeModal(false)}>Cancel</Button>
            <Button onClick={() => setShowUpgradeModal(false)}>Confirm & Pay</Button>
          </>
        }
      >
        <div className="space-y-4">
          <div className="bg-(--bg-muted) rounded-xl p-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-(--text-secondary)">{planConfigs.find(p => p.id === selectedPlan)?.name} Plan ({billing})</span>
              <span className="font-bold text-(--text-primary)">{formatCurrency(planConfigs.find(p => p.id === selectedPlan)?.price[billing] || 0)}</span>
            </div>
            <div className="h-px bg-(--border-color) my-3" />
            <div className="flex justify-between font-bold text-sm">
              <span>Total</span>
              <span className="text-[#1e3a8a]">{formatCurrency(planConfigs.find(p => p.id === selectedPlan)?.price[billing] || 0)}</span>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-(--text-primary) mb-3">Payment Method</p>
            <div className="grid grid-cols-2 gap-2">
              {paymentMethods.map((pm) => (
                <button
                  key={pm.id}
                  onClick={() => setSelectedPayment(pm.id)}
                  className={cn(
                    "flex items-center gap-2 p-2.5 rounded-xl border text-xs font-medium transition-all text-left",
                    selectedPayment === pm.id
                      ? "border-[#1e3a8a] bg-[#1e3a8a]/5 text-[#1e3a8a]"
                      : "border-(--border-color) text-(--text-secondary) hover:border-[#1e3a8a]/30"
                  )}
                >
                  <span>{pm.icon}</span>
                  <span>{pm.label}</span>
                </button>
              ))}
            </div>
          </div>

          {selectedPayment === "bank_transfer" && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-700">
              <AlertCircle size={14} className="inline mr-1.5" />
              Manual bank transfer requires admin verification (1-24 business hours).
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}
