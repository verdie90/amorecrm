"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import {
  Shield, LayoutDashboard, Building2, CreditCard,
  BarChart3, Settings, HeartHandshake, Activity
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/lib/store";

const navItems = [
  { label: "Overview", href: "/superadmin", icon: LayoutDashboard },
  { label: "Tenants", href: "/superadmin/tenants", icon: Building2 },
  { label: "Subscriptions", href: "/superadmin/subscriptions", icon: CreditCard },
  { label: "Analytics", href: "/superadmin/analytics", icon: BarChart3 },
  { label: "System Health", href: "/superadmin/health", icon: Activity },
  { label: "Settings", href: "/superadmin/settings", icon: Settings },
];

export default function SuperadminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { theme } = useAppStore();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className="flex h-screen overflow-hidden bg-(--bg-base)">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 flex flex-col h-screen bg-[#0f172a]">
        <div className="flex items-center gap-3 px-4 py-5 border-b border-white/10">
          <div className="w-8 h-8 bg-red-500 rounded-xl flex items-center justify-center">
            <Shield size={18} className="text-white" />
          </div>
          <div>
            <span className="font-display font-bold text-white text-sm leading-none">Amore</span>
            <span className="font-display font-bold text-red-400 text-sm leading-none"> Admin</span>
          </div>
        </div>
        <nav className="flex-1 py-3 px-2 space-y-0.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-2.5 py-2 rounded-lg text-sm font-medium transition-all",
                  active ? "bg-red-500/20 text-red-300" : "text-white/60 hover:bg-white/8 hover:text-white"
                )}
              >
                <Icon size={16} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t border-white/10">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 px-2.5 py-2 rounded-lg text-sm text-white/50 hover:text-white hover:bg-white/8 transition-all"
          >
            <HeartHandshake size={15} />
            Back to CRM
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-14 bg-(--bg-surface) border-b border-(--border-color) flex items-center px-5 gap-3">
          <div className="flex items-center gap-2">
            <Shield size={16} className="text-red-500" />
            <span className="text-sm font-semibold text-(--text-primary)">Superadmin Panel</span>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <span className="text-xs bg-red-50 text-red-600 px-2 py-1 rounded-full font-medium">
              Restricted Access
            </span>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6 animate-fade-in">
          {children}
        </main>
      </div>
    </div>
  );
}
