"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard, Users, Briefcase, MessageSquare, CheckSquare,
  BarChart3, Settings, CreditCard, Zap, ChevronLeft, ChevronRight,
  LogOut, X, HeartHandshake,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/lib/store";
import { Avatar } from "@/components/ui/badge";
import { signOut } from "@/lib/auth";

const mainNav = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Contacts",  href: "/contacts",  icon: Users },
  { label: "Deals",     href: "/deals",     icon: Briefcase },
  { label: "Inbox",     href: "/inbox",     icon: MessageSquare, badge: "4" },
  { label: "Tasks",     href: "/tasks",     icon: CheckSquare },
];

const toolsNav = [
  { label: "Automation", href: "/automation", icon: Zap },
  { label: "Reports",    href: "/reports",    icon: BarChart3 },
];

const systemNav = [
  { label: "Subscription", href: "/subscriptions", icon: CreditCard },
  { label: "Settings",     href: "/settings",      icon: Settings },
];

interface SidebarProps {
  mobile?: boolean;
  onClose?: () => void;
}

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
}

function NavLink({ href, icon: Icon, label, badge, active, collapsed, onClick }: {
  href: string; icon: React.ElementType; label: string; badge?: string;
  active: boolean; collapsed: boolean; onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "relative flex items-center gap-3 rounded-xl text-sm font-medium transition-all duration-150 group",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38bdf8]/50",
        collapsed ? "justify-center w-10 h-10 mx-auto" : "px-3 py-2",
        active
          ? "bg-(--sidebar-active-bg) text-white"
          : "text-white/60 hover:bg-(--sidebar-hover) hover:text-white/90",
      )}
    >
      {active && !collapsed && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-[#38bdf8] rounded-r-full" />
      )}
      <Icon
        size={16}
        className={cn(
          "shrink-0 transition-colors",
          active ? "text-[#38bdf8]" : "text-white/50 group-hover:text-white/80"
        )}
      />
      {!collapsed && (
        <>
          <span className="flex-1 truncate">{label}</span>
          {badge && (
            <span className="bg-[#38bdf8]/20 text-[#38bdf8] text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-4.5 text-center">
              {badge}
            </span>
          )}
        </>
      )}
      {collapsed && (
        <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-[#0f1c3f] border border-white/10 text-white text-xs rounded-lg whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-150 z-50 shadow-xl translate-x-1 group-hover:translate-x-0">
          {label}
          {badge && (
            <span className="ml-1.5 bg-[#38bdf8]/20 text-[#38bdf8] text-[10px] font-bold px-1.5 rounded-full">
              {badge}
            </span>
          )}
        </div>
      )}
    </Link>
  );
}

function SectionLabel({ label, collapsed }: { label: string; collapsed: boolean }) {
  if (collapsed) return <div className="h-px bg-white/8 my-2 mx-2" />;
  return (
    <p className="text-[10px] font-bold uppercase tracking-widest text-white/25 px-3 mb-1 mt-4">
      {label}
    </p>
  );
}

export default function Sidebar({ mobile, onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, sidebarCollapsed, toggleSidebar } = useAppStore();

  const handleLogout = async () => {
    try { await signOut(); router.replace("/login"); } catch { /* ignore */ }
  };

  const isActive = (href: string) => pathname === href || (href !== "/" && pathname.startsWith(href));
  const collapsed = !mobile && sidebarCollapsed;

  return (
    <aside
      className={cn(
        "relative flex flex-col h-screen transition-all duration-300 ease-out shrink-0 select-none",
        "bg-(--sidebar-bg) border-r border-white/6",
        collapsed ? "w-16" : "w-58"
      )}
    >
      {/* Logo bar */}
      <div className={cn(
        "flex items-center h-15 border-b border-white/7 shrink-0",
        collapsed ? "justify-center px-0" : "px-4 gap-3"
      )}>
        <div className="w-8 h-8 bg-linear-to-br from-[#38bdf8] to-[#1d4ed8] rounded-xl flex items-center justify-center shrink-0 shadow-lg">
          <HeartHandshake size={17} className="text-white" />
        </div>
        {!collapsed && (
          <div className="flex flex-col leading-none">
            <span className="font-display font-bold text-white text-[15px]">Amore</span>
            <span className="text-[10px] text-white/40 tracking-widest uppercase font-medium">CRM Platform</span>
          </div>
        )}
        {mobile && (
          <button
            onClick={onClose}
            className="ml-auto text-white/40 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Main nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 scrollbar-none">
        <SectionLabel label="Main" collapsed={collapsed} />
        {mainNav.map((item) => (
          <NavLink
            key={item.href}
            {...item}
            active={isActive(item.href)}
            collapsed={collapsed}
            onClick={onClose}
          />
        ))}
        <SectionLabel label="Tools" collapsed={collapsed} />
        {toolsNav.map((item) => (
          <NavLink
            key={item.href}
            {...item}
            active={isActive(item.href)}
            collapsed={collapsed}
            onClick={onClose}
          />
        ))}
      </nav>

      {/* System nav */}
      <div className="px-2 pb-1 border-t border-white/[0.07] pt-3">
        <SectionLabel label="System" collapsed={collapsed} />
        {systemNav.map((item) => (
          <NavLink
            key={item.href}
            {...item}
            active={isActive(item.href)}
            collapsed={collapsed}
            onClick={onClose}
          />
        ))}
      </div>

      {/* User card */}
      <div className="mx-2 mb-3 mt-2 rounded-xl bg-white/4 border border-white/7 overflow-hidden">
        <div className={cn(
          "flex items-center gap-2.5 p-2.5 cursor-pointer hover:bg-white/5 transition-colors",
          collapsed && "justify-center"
        )}>
          <Avatar name={user?.name || "User"} size="sm" online />
          {!collapsed && (
            <>
              <div className="flex-1 min-w-0">
                <p className="text-white text-xs font-semibold truncate">{user?.name ?? "User"}</p>
                <p className="text-white/40 text-[11px] truncate capitalize">{user?.role ?? "agent"}</p>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                title="Sign out"
                className="w-7 h-7 rounded-lg flex items-center justify-center text-white/30 hover:text-white hover:bg-white/10 transition-all"
              >
                <LogOut size={13} />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Collapse toggle (desktop only) */}
      {!mobile && (
        <button
          onClick={toggleSidebar}
          className="absolute -right-3 top-17.5 w-6 h-6 bg-(--bg-surface) border border-(--border-color) rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-all z-10 hover:border-[#1e3a8a]/30"
        >
          {collapsed
            ? <ChevronRight size={11} className="text-(--text-muted)" />
            : <ChevronLeft size={11} className="text-(--text-muted)" />
          }
        </button>
      )}
    </aside>
  );
}
