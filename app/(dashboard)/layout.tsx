"use client";
import { useState, useEffect } from "react";
import { useAppStore } from "@/lib/store";
import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";
import { HeartHandshake } from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { theme, authLoading, user } = useAppStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Sync theme on mount
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Full-screen loading while Firebase resolves auth state
  if (authLoading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center gap-4 bg-(--bg-base)">
        <div className="w-12 h-12 bg-linear-to-br from-[#38bdf8] to-[#1d4ed8] rounded-2xl flex items-center justify-center animate-pulse shadow-lg shadow-[#38bdf8]/20">
          <HeartHandshake size={24} className="text-white" />
        </div>
        <div className="flex flex-col items-center gap-1.5">
          <p className="text-sm font-medium text-(--text-primary)">Amore CRM</p>
          <p className="text-xs text-(--text-muted) animate-pulse">Loading your workspace…</p>
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
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative z-10 animate-slide-in-left">
            <Sidebar mobile onClose={() => setMobileMenuOpen(false)} />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          onMobileMenuToggle={() => setMobileMenuOpen(true)}
        />
        <main className="flex-1 overflow-y-auto scroll-smooth">
          <div className="p-4 md:p-6 max-w-360 mx-auto animate-fade-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
