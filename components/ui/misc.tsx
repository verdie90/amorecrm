import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center text-center py-16 px-4", className)}>
      {icon && (
        <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-(--bg-muted) to-(--border-color) flex items-center justify-center mb-5 text-(--text-muted) shadow-xs animate-float">
          {icon}
        </div>
      )}
      <h3 className="font-display font-semibold text-(--text-primary) mb-1.5 text-lg">{title}</h3>
      {description && <p className="text-sm text-(--text-muted) max-w-sm mb-6 leading-relaxed">{description}</p>}
      {action}
    </div>
  );
}

// Skeleton loader
export function Skeleton({ className }: { className?: string }) {
  return (
    <div className={cn("skeleton-shimmer rounded-lg", className)} />
  );
}

// Divider
export function Divider({ className, label }: { className?: string; label?: string }) {
  if (label) {
    return (
      <div className={cn("relative flex items-center gap-3 my-4", className)}>
        <div className="flex-1 h-px bg-(--border-color)" />
        <span className="text-xs text-(--text-muted) font-medium">{label}</span>
        <div className="flex-1 h-px bg-(--border-color)" />
      </div>
    );
  }
  return <div className={cn("h-px bg-(--border-color)", className)} />;
}

// Tooltip (simple)
export function Tooltip({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="relative group inline-flex">
      {children}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-50 pointer-events-none">
        <div className="bg-gray-900 text-white text-xs rounded-lg px-2.5 py-1.5 whitespace-nowrap shadow-lg backdrop-blur-sm">
          {label}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
        </div>
      </div>
    </div>
  );
}

// Progress bar component
export function ProgressBar({
  value,
  max = 100,
  color = "blue",
  size = "sm",
  showLabel = false,
  className,
}: {
  value: number;
  max?: number;
  color?: "blue" | "green" | "amber" | "purple" | "red" | "cyan";
  size?: "xs" | "sm" | "md";
  showLabel?: boolean;
  className?: string;
}) {
  const pct = Math.min((value / max) * 100, 100);
  const colorMap = {
    blue: "bg-linear-to-r from-blue-500 to-blue-400",
    green: "bg-linear-to-r from-emerald-500 to-emerald-400",
    amber: "bg-linear-to-r from-amber-500 to-amber-400",
    purple: "bg-linear-to-r from-purple-500 to-purple-400",
    red: "bg-linear-to-r from-red-500 to-red-400",
    cyan: "bg-linear-to-r from-cyan-500 to-cyan-400",
  };
  const sizeMap = { xs: "h-1", sm: "h-1.5", md: "h-2" };

  return (
    <div className={cn("w-full", className)}>
      {showLabel && (
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-(--text-muted)">{Math.round(pct)}%</span>
        </div>
      )}
      <div className={cn("bg-(--bg-muted) rounded-full overflow-hidden", sizeMap[size])}>
        <div
          className={cn("h-full rounded-full transition-all duration-700 ease-out", colorMap[color])}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

// Stats Card — modern redesign
export function StatsCard({
  label,
  value,
  change,
  changeType = "positive",
  icon,
  color = "blue",
}: {
  label: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon?: React.ReactNode;
  color?: "blue" | "green" | "amber" | "purple" | "red" | "cyan";
}) {
  const colorConfig = {
    blue:   { icon: "bg-blue-50 text-blue-600 ring-1 ring-blue-100",   bar: "bg-blue-500",    accent: "border-t-blue-500",    glow: "bg-blue-500" },
    green:  { icon: "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100", bar: "bg-emerald-500", accent: "border-t-emerald-500", glow: "bg-emerald-500" },
    amber:  { icon: "bg-amber-50 text-amber-600 ring-1 ring-amber-100", bar: "bg-amber-500",  accent: "border-t-amber-500",  glow: "bg-amber-500" },
    purple: { icon: "bg-purple-50 text-purple-600 ring-1 ring-purple-100", bar: "bg-purple-500", accent: "border-t-purple-500", glow: "bg-purple-500" },
    red:    { icon: "bg-red-50 text-red-600 ring-1 ring-red-100",       bar: "bg-red-500",     accent: "border-t-red-500",    glow: "bg-red-500" },
    cyan:   { icon: "bg-cyan-50 text-cyan-600 ring-1 ring-cyan-100",    bar: "bg-cyan-500",    accent: "border-t-cyan-500",   glow: "bg-cyan-500" },
  };

  const cfg = colorConfig[color];

  const TrendIcon = changeType === "positive" ? TrendingUp
    : changeType === "negative" ? TrendingDown
    : Minus;

  return (
    <div className={cn(
      "relative bg-(--bg-surface) border border-(--border-color) border-t-2 rounded-2xl p-5 shadow-xs hover:shadow-sm transition-all duration-300 group overflow-hidden",
      cfg.accent
    )}>
      {/* Subtle bg accent blob */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className={cn("absolute -top-10 -right-10 w-28 h-28 rounded-full blur-3xl opacity-8", cfg.glow)} />
      </div>

      <div className="relative flex items-start justify-between mb-3">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-(--text-muted)">{label}</p>
        {icon && (
          <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105", cfg.icon)}>
            {icon}
          </div>
        )}
      </div>

      <div className="relative font-display text-[1.65rem] font-bold text-(--text-primary) leading-none mb-2.5 tracking-tight font-num">
        {value}
      </div>

      {change && (
        <div className={cn(
          "inline-flex items-center gap-1 text-xs font-semibold rounded-full px-2 py-0.5",
          changeType === "positive" && "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100",
          changeType === "negative" && "bg-red-50 text-red-600 ring-1 ring-red-100",
          changeType === "neutral" && "bg-(--bg-muted) text-(--text-muted) ring-1 ring-(--border-color)"
        )}>
          <TrendIcon size={11} />
          <span>{change}</span>
        </div>
      )}
    </div>
  );
}
