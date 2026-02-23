"use client";
import { useState, useRef, useEffect } from "react";
import { Bell, Sun, Moon, Search, Menu, Check, Sparkles } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { Avatar } from "@/components/ui/badge";
import { cn, formatDate } from "@/lib/utils";

interface HeaderProps {
  onMobileMenuToggle?: () => void;
  title?: string;
}

export default function Header({ onMobileMenuToggle, title }: HeaderProps) {
  const { theme, toggleTheme, user, notifications, markAllRead, markRead } = useAppStore();
  const [notifOpen, setNotifOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const typeColor: Record<string, string> = {
    info: "bg-blue-500 ring-blue-100",
    success: "bg-emerald-500 ring-emerald-100",
    warning: "bg-amber-500 ring-amber-100",
    error: "bg-red-500 ring-red-100",
  };

  return (
    <header className="sticky top-0 z-30 h-15 bg-(--bg-surface)/80 backdrop-blur-md border-b border-(--border-color) flex items-center px-4 gap-3 shadow-xs">
      {/* Mobile menu toggle */}
      <button
        onClick={onMobileMenuToggle}
        className="md:hidden w-8 h-8 flex items-center justify-center rounded-lg text-(--text-secondary) hover:bg-(--bg-muted) hover:text-(--text-primary) transition-colors"
      >
        <Menu size={18} />
      </button>

      {/* Page title */}
      {title && (
        <h1 className="font-display font-semibold text-(--text-primary) text-[15px] tracking-tight">{title}</h1>
      )}

      {/* Search */}
      <div className={cn("hidden md:flex items-center flex-1 max-w-sm", title && "ml-2")}>
        <div className="relative flex-1 group">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-(--text-muted) group-focus-within:text-[#1e3a8a] transition-colors" />
          <input
            placeholder="Search contacts, deals, tasks…"
            className="w-full h-9 pl-9 pr-4 text-sm bg-(--bg-muted) border border-transparent rounded-xl placeholder:text-(--text-muted) text-(--text-primary) focus:outline-none focus:border-[#1e3a8a]/30 focus:bg-(--bg-surface) focus:shadow-sm transition-all duration-200"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden group-focus-within:hidden sm:flex items-center gap-0.5 text-[10px] text-(--text-muted) font-mono bg-(--border-color) rounded px-1 py-0.5">
            ⌘K
          </kbd>
        </div>
      </div>

      <div className="ml-auto flex items-center gap-1">
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="w-8 h-8 flex items-center justify-center rounded-lg text-(--text-secondary) hover:bg-(--bg-muted) hover:text-(--text-primary) transition-colors"
          title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        >
          {theme === "dark"
            ? <Sun size={16} />
            : <Moon size={16} />
          }
        </button>

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-(--text-secondary) hover:bg-(--bg-muted) hover:text-(--text-primary) transition-colors relative"
            title="Notifications"
          >
            <Bell size={16} />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center leading-none">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 top-11 w-85 bg-(--bg-surface) border border-(--border-color) rounded-2xl shadow-2xl animate-scale-in z-50 overflow-hidden">
              {/* Panel header */}
              <div className="flex items-center justify-between px-4 py-3.5 border-b border-(--border-color)">
                <div className="flex items-center gap-2">
                  <Sparkles size={14} className="text-[#38bdf8]" />
                  <span className="font-display font-semibold text-sm text-(--text-primary)">Notifications</span>
                  {unreadCount > 0 && (
                    <span className="bg-[#38bdf8]/15 text-[#38bdf8] text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                      {unreadCount}
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllRead}
                    className="text-xs text-[#1e3a8a] dark:text-[#38bdf8] hover:underline font-medium"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              {/* Notification list */}
              <div className="max-h-95 overflow-y-auto divide-y divide-(--border-color)">
                {notifications.length === 0 ? (
                  <div className="py-12 flex flex-col items-center gap-2">
                    <Bell size={28} className="text-(--text-muted) opacity-40" />
                    <p className="text-sm text-(--text-muted)">You're all caught up!</p>
                  </div>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => markRead(n.id)}
                      className={cn(
                        "flex gap-3 px-4 py-3 cursor-pointer hover:bg-(--bg-muted) transition-colors",
                        !n.isRead && "bg-[#1e3a8a]/3"
                      )}
                    >
                      <span className={cn(
                        "w-2 h-2 rounded-full mt-1.25 shrink-0 transition-opacity ring-4",
                        typeColor[n.type],
                        !n.isRead ? "opacity-100" : "opacity-25"
                      )} />
                      <div className="flex-1 min-w-0">
                        <p className={cn(
                          "text-sm text-(--text-primary) leading-snug",
                          !n.isRead ? "font-semibold" : "font-medium"
                        )}>
                          {n.title}
                        </p>
                        <p className="text-xs text-(--text-secondary) mt-0.5 line-clamp-2 leading-relaxed">{n.message}</p>
                        <p className="text-[11px] text-(--text-muted) mt-1.5">{formatDate(n.createdAt, "relative")}</p>
                      </div>
                      {n.isRead && <Check size={13} className="text-(--text-muted) shrink-0 mt-1 opacity-50" />}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Divider + user */}
        <div className="ml-1 flex items-center gap-2.5 pl-3 border-l border-(--border-color)">
          <Avatar name={user?.name || "User"} size="sm" />
          <div className="hidden sm:block">
            <p className="text-xs font-semibold text-(--text-primary) leading-none">{user?.name}</p>
            <p className="text-[11px] text-(--text-muted) leading-none mt-0.5 capitalize">{user?.role}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
