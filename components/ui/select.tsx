"use client";
import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface SelectOption {
  label: string;
  value: string;
  icon?: React.ReactNode;
  description?: string;
}

interface SelectProps {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  className?: string;
  disabled?: boolean;
}

export function Select({ options, value, onChange, placeholder = "Select...", label, className, disabled }: SelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className={cn("w-full relative", className)} ref={ref}>
      {label && <label className="block text-sm font-medium text-(--text-primary) mb-1.5">{label}</label>}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen(!open)}
        className={cn(
          "w-full h-9 flex items-center justify-between gap-2 px-3 text-sm",
          "bg-(--bg-surface) border border-(--border-color) rounded-lg",
          "hover:border-[#1e3a8a] focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/30 focus:border-[#1e3a8a]",
          "transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        )}
      >
        <span className={cn("flex items-center gap-2", !selected && "text-(--text-muted)")}>
          {selected?.icon}
          {selected?.label ?? placeholder}
        </span>
        <ChevronDown size={14} className={cn("text-(--text-muted) transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <div className="absolute z-50 mt-1 min-w-50 bg-(--bg-surface) border border-(--border-color) rounded-xl shadow-xl animate-scale-in overflow-hidden">
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => { onChange?.(opt.value); setOpen(false); }}
              className={cn(
                "w-full flex items-start gap-3 px-3 py-2.5 text-sm hover:bg-(--bg-muted) transition-colors text-left",
                opt.value === value && "bg-[#1e3a8a]/5 text-[#1e3a8a]"
              )}
            >
              {opt.icon && <span className="mt-0.5">{opt.icon}</span>}
              <div>
                <div className="font-medium">{opt.label}</div>
                {opt.description && <div className="text-xs text-(--text-muted)">{opt.description}</div>}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
