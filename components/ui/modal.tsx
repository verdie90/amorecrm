"use client";
import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  footer?: React.ReactNode;
}

const sizeMap = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-2xl",
  full: "max-w-5xl",
};

export function Modal({ open, onClose, title, description, children, size = "md", footer }: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (open) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in" />
      <div
        className={cn(
          "relative w-full bg-(--bg-surface) border border-(--border-color) rounded-2xl shadow-2xl animate-scale-in overflow-hidden",
          sizeMap[size]
        )}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-5 border-b border-(--border-color)">
          <div>
            {title && <h2 className="font-display font-semibold text-lg text-(--text-primary) tracking-tight">{title}</h2>}
            {description && <p className="text-sm text-(--text-muted) mt-0.5">{description}</p>}
          </div>
          <button
            onClick={onClose}
            className="ml-4 -mt-0.5 w-7 h-7 rounded-lg flex items-center justify-center text-(--text-muted) hover:text-(--text-primary) hover:bg-(--bg-muted) transition-all"
          >
            <X size={15} />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 max-h-[70vh] overflow-y-auto">{children}</div>

        {/* Footer */}
        {footer && (
          <div className="flex items-center justify-end gap-2 p-4 border-t border-(--border-color) bg-(--bg-muted)/50">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
