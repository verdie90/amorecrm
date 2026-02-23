"use client";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger" | "outline" | "accent" | "success";
  size?: "xs" | "sm" | "md" | "lg";
  loading?: boolean;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", loading, icon, iconRight, children, disabled, ...props }, ref) => {
    const base = "inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200 cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.97]";

    const variants = {
      primary: "bg-linear-to-r from-[#1e3a8a] to-[#1d4ed8] text-white hover:from-[#1d4ed8] hover:to-[#2563eb] focus-visible:ring-[#1e3a8a] shadow-sm hover:shadow-md hover:shadow-[#1e3a8a]/10 hover:-translate-y-px",
      secondary: "bg-(--bg-surface) text-(--text-primary) border border-(--border-color) hover:bg-(--bg-muted) hover:border-(--border-strong) focus-visible:ring-(--accent) shadow-xs hover:shadow-sm",
      ghost: "bg-transparent text-(--text-secondary) hover:bg-(--bg-muted) hover:text-(--text-primary) focus-visible:ring-(--accent)",
      danger: "bg-linear-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 focus-visible:ring-red-500 shadow-sm hover:shadow-md hover:shadow-red-500/15 hover:-translate-y-px",
      outline: "bg-transparent border border-[#1e3a8a]/40 text-[#1e3a8a] hover:bg-[#1e3a8a] hover:text-white hover:border-[#1e3a8a] focus-visible:ring-[#1e3a8a] hover:-translate-y-px",
      accent: "bg-linear-to-r from-[#38bdf8] to-[#0ea5e9] text-white hover:from-[#0ea5e9] hover:to-[#0284c7] focus-visible:ring-[#38bdf8] shadow-sm hover:shadow-md hover:shadow-[#38bdf8]/15 hover:-translate-y-px",
      success: "bg-linear-to-r from-emerald-500 to-emerald-600 text-white hover:from-emerald-600 hover:to-emerald-700 focus-visible:ring-emerald-500 shadow-sm hover:shadow-md hover:shadow-emerald-500/15 hover:-translate-y-px",
    };

    const sizes = {
      xs: "text-xs px-2.5 py-1 h-7 rounded-md",
      sm: "text-xs px-3.5 py-1.5 h-8",
      md: "text-sm px-4 py-2 h-9",
      lg: "text-sm px-6 py-2.5 h-11 rounded-xl font-semibold",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      >
        {loading ? (
          <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        ) : (
          icon
        )}
        {children}
        {!loading && iconRight}
      </button>
    );
  }
);

Button.displayName = "Button";
export { Button };
