"use client";
import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { useAppStore } from "@/lib/store";
import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";
import { HeartHandshake } from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { theme, authLoading, user } = useAppStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Sync theme on mount
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const closeMobile = useCallback(() => setMobileMenuOpen(false), []);

  // Full-screen loading while Firebase resolves auth state
  if (authLoading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center gap-5 bg-(--bg-base)">
        <div className="relative">
          <div className="w-14 h-14 bg-linear-to-br from-[#38bdf8] to-[#1d4ed8] rounded-2xl flex items-center justify-center shadow-lg shadow-[#38bdf8]/20">
            <HeartHandshake size={26} className="text-white" />
          </div>
          {/* Spinning ring */}
          <div className="absolute -inset-2 rounded-3xl border-2 border-transparent border-t-[#38bdf8] animate-spin" />
        </div>
        <div className="flex flex-col items-center gap-1.5">
          <p className="font-display text-sm font-semibold text-(--text-primary)">Amore CRM</p>
          <div className="flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-[#38bdf8] animate-pulse" />
            <p className="text-xs text-(--text-muted)">Loading your workspace…</p>
          </div>
        </div>
      </div>
    );
  }

  // AuthProvider handles redirect, but gate render just in case
  if (!user) return null;

  return (
    <div className="flex h-screen overflow-hidden bg-(--bg-base)">
      {/* Desktop sidebar */}
      <div className="hidden md:block relative">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={closeMobile}
            onKeyDown={(e) => { if (e.key === "Escape") closeMobile(); }}
            role="button"
            tabIndex={0}
            aria-label="Close menu"
          />
          <div className="relative z-10 animate-slide-in-left shadow-2xl">
            <Sidebar mobile onClose={closeMobile} />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <Header onMobileMenuToggle={() => setMobileMenuOpen(true)} />
        <main className="flex-1 overflow-y-auto scroll-smooth">
          <div className="p-4 md:p-6 max-w-360 mx-auto animate-fade-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
