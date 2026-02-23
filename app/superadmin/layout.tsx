"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Shield, LayoutDashboard, Building2, CreditCard,
  BarChart3, Settings, HeartHandshake, Activity,
  Menu, X, Sun, Moon, ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/lib/store";
import { Avatar } from "@/components/ui/badge";

const navItems = [
  { label: "Overview", href: "/superadmin", icon: LayoutDashboard },
  { label: "Tenants", href: "/superadmin/tenants", icon: Building2 },
  { label: "Subscriptions", href: "/superadmin/subscriptions", icon: CreditCard },
  { label: "Analytics", href: "/superadmin/analytics", icon: BarChart3 },
  { label: "System Health", href: "/superadmin/health", icon: Activity },
  { label: "Settings", href: "/superadmin/settings", icon: Settings },
];

function SuperadminSidebar({ mobile, onClose }: { mobile?: boolean; onClose?: () => void }) {
  const pathname = usePathname();

  return (
    <aside className={cn(
      "flex flex-col h-screen bg-[#0f172a] border-r border-white/6 select-none",
      mobile ? "w-64" : "w-56 shrink-0"
    )}>
      {/* Logo bar */}
      <div className="flex items-center gap-3 px-4 h-15 border-b border-white/8 shrink-0">
        <div className="w-8 h-8 bg-linear-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-500/20">
          <Shield size={16} className="text-white" />
        </div>
        <div className="flex items-baseline gap-1">
          <span className="font-display font-bold text-white text-sm">Amore</span>
          <span className="font-display font-bold text-red-400 text-sm">Admin</span>
        </div>
        {mobile && (
          <button
            onClick={onClose}
            className="ml-auto text-white/40 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-3 px-2 space-y-0.5 overflow-y-auto scrollbar-none">
        <p className="text-[10px] font-bold uppercase tracking-widest text-white/25 px-2.5 mb-2 mt-1">
          Management
        </p>
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(
                "relative flex items-center gap-3 px-2.5 py-2 rounded-xl text-sm font-medium transition-all duration-150 group",
                active
                  ? "bg-red-500/15 text-red-300"
                  : "text-white/55 hover:bg-white/6 hover:text-white/90"
              )}
            >
              {active && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.75 h-5 bg-red-400 rounded-r-full shadow-[0_0_8px_rgba(248,113,113,0.4)]" />
              )}
              <Icon
                size={16}
                className={cn(
                  "shrink-0 transition-colors",
                  active ? "text-red-400" : "text-white/45 group-hover:text-white/75"
                )}
              />
              <span className="flex-1 truncate">{item.label}</span>
              {active && <ChevronRight size={12} className="text-red-400/60" />}
            </Link>
          );
        })}
      </nav>

      {/* Back to CRM */}
      <div className="p-3 border-t border-white/8">
        <Link
          href="/dashboard"
          onClick={onClose}
          className="flex items-center gap-2.5 px-2.5 py-2.5 rounded-xl text-sm text-white/50 hover:text-white hover:bg-white/6 transition-all group"
        >
          <HeartHandshake size={15} className="text-white/40 group-hover:text-[#38bdf8] transition-colors" />
          <span>Back to CRM</span>
        </Link>
      </div>
    </aside>
  );
}

export default function SuperadminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { theme, toggleTheme, user } = useAppStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const closeMobile = useCallback(() => setMobileMenuOpen(false), []);

  return (
    <div className="flex h-screen overflow-hidden bg-(--bg-base)">
      {/* Desktop sidebar */}
      <div className="hidden md:block">
        <SuperadminSidebar />
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
            <SuperadminSidebar mobile onClose={closeMobile} />
          </div>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Header */}
        <header className="sticky top-0 z-30 h-15 bg-(--bg-surface)/85 backdrop-blur-xl border-b border-(--border-color) flex items-center px-4 gap-3 shadow-xs">
          {/* Mobile menu */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden w-8 h-8 flex items-center justify-center rounded-lg text-(--text-secondary) hover:bg-(--bg-muted) transition-colors"
          >
            <Menu size={18} />
          </button>

          {/* Title */}
          <div className="flex items-center gap-2">
            <Shield size={15} className="text-red-500" />
            <span className="font-display text-sm font-semibold text-(--text-primary) tracking-tight">Superadmin Panel</span>
          </div>

          {/* Right controls */}
          <div className="ml-auto flex items-center gap-1.5">
            {/* Restricted badge */}
            <span className="hidden sm:flex items-center gap-1.5 text-[11px] font-medium bg-red-500/10 text-red-500 px-2.5 py-1 rounded-full border border-red-500/15">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse-dot" />
              Restricted Access
            </span>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-(--text-secondary) hover:bg-(--bg-muted) hover:text-(--text-primary) transition-colors"
              title={theme === "dark" ? "Light mode" : "Dark mode"}
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* User */}
            <div className="ml-1 flex items-center gap-2.5 pl-3 border-l border-(--border-color)">
              <Avatar name={user?.name || "Admin"} size="sm" />
              <div className="hidden sm:block">
                <p className="text-xs font-semibold text-(--text-primary) leading-none">{user?.name ?? "Admin"}</p>
                <p className="text-[11px] text-(--text-muted) leading-none mt-0.5">Superadmin</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto scroll-smooth">
          <div className="p-4 md:p-6 max-w-360 mx-auto animate-fade-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
