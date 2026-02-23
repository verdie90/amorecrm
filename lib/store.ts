import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, Theme, Notification } from "@/types";

interface AppState {
  theme: Theme;
  user: User | null;
  authLoading: boolean;
  sidebarCollapsed: boolean;
  notifications: Notification[];
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  setUser: (user: User | null) => void;
  setAuthLoading: (v: boolean) => void;
  toggleSidebar: () => void;
  addNotification: (n: Omit<Notification, "id" | "createdAt">) => void;
  markAllRead: () => void;
  markRead: (id: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      theme: "light",
      user: null,
      authLoading: true,
      sidebarCollapsed: false,
      notifications: [
        {
          id: "n1",
          title: "New lead assigned",
          message: "PT Maju Jaya has been assigned to you",
          type: "info",
          isRead: false,
          createdAt: new Date().toISOString(),
          link: "/contacts",
        },
        {
          id: "n2",
          title: "Deal closed!",
          message: "Deal with Sinar Terang worth Rp 50.000.000",
          type: "success",
          isRead: false,
          createdAt: new Date(Date.now() - 3600000).toISOString(),
          link: "/deals",
        },
        {
          id: "n3",
          title: "Subscription expiring",
          message: "Your Pro plan expires in 7 days",
          type: "warning",
          isRead: true,
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          link: "/subscriptions",
        },
      ],

      setTheme: (theme) => {
        set({ theme });
        if (typeof document !== "undefined") {
          document.documentElement.setAttribute("data-theme", theme);
        }
      },
      toggleTheme: () =>
        set((state) => {
          const next = state.theme === "light" ? "dark" : "light";
          if (typeof document !== "undefined") {
            document.documentElement.setAttribute("data-theme", next);
          }
          return { theme: next };
        }),
      setUser: (user) => set({ user }),
      setAuthLoading: (v) => set({ authLoading: v }),
      toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
      addNotification: (n) =>
        set((s) => ({
          notifications: [
            { ...n, id: Math.random().toString(36).slice(2), createdAt: new Date().toISOString() },
            ...s.notifications,
          ],
        })),
      markAllRead: () =>
        set((s) => ({ notifications: s.notifications.map((n) => ({ ...n, isRead: true })) })),
      markRead: (id) =>
        set((s) => ({
          notifications: s.notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
        })),
    }),
    { name: "amore-crm-store", partialize: (s) => ({ theme: s.theme, sidebarCollapsed: s.sidebarCollapsed }) }
  )
);
