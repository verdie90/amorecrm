"use client";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, leftIcon, rightIcon, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-(--text-primary) mb-1.5">
            {label}
          </label>
        )}
        <div className="relative group">
          {leftIcon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-(--text-muted) group-focus-within:text-[#1e3a8a] transition-colors">
              {leftIcon}
            </span>
          )}
          <input
            id={inputId}
            ref={ref}
            className={cn(
              "w-full h-9 text-sm bg-(--bg-surface) text-(--text-primary) border border-(--border-color) rounded-xl px-3 placeholder:text-(--text-muted) transition-all duration-200",
              "hover:border-(--border-strong)",
              "focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 focus:border-[#1e3a8a]/50 focus:bg-(--bg-surface) focus:shadow-sm",
              error && "border-red-400 focus:ring-red-500/20 focus:border-red-500 hover:border-red-400",
              leftIcon && "pl-9",
              rightIcon && "pr-9",
              className
            )}
            {...props}
          />
          {rightIcon && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-(--text-muted)">
              {rightIcon}
            </span>
          )}
        </div>
        {error && <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">{error}</p>}
        {hint && !error && <p className="mt-1.5 text-xs text-(--text-muted)">{hint}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";
export { Input };
