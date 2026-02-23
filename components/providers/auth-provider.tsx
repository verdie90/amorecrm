"use client";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { onAuthStateChanged, getUserProfile } from "@/lib/auth";
import { useAppStore } from "@/lib/store";

const AUTH_ROUTES = ["/login", "/register", "/forgot-password"];
const PUBLIC_ROUTES = [...AUTH_ROUTES];

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { setUser, setAuthLoading } = useAppStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        // Fetch full profile from Firestore
        const profile = await getUserProfile(firebaseUser.uid);
        setUser(
          profile ?? {
            id: firebaseUser.uid,
            name: firebaseUser.displayName ?? firebaseUser.email ?? "User",
            email: firebaseUser.email ?? "",
            role: "admin",
            tenantId: "",
            avatar: firebaseUser.photoURL ?? "",
            isOnline: true,
            createdAt: new Date().toISOString(),
          }
        );
        setAuthLoading(false);
        // Redirect away from auth pages if already logged in
        if (AUTH_ROUTES.includes(pathname)) {
          router.replace("/dashboard");
        }
      } else {
        setUser(null);
        setAuthLoading(false);
        // Redirect to login if accessing protected route
        if (!PUBLIC_ROUTES.includes(pathname)) {
          router.replace("/login");
        }
      }
    });

    return () => unsubscribe();
  }, [pathname, router, setUser, setAuthLoading]);

  return <>{children}</>;
}
