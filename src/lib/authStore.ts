import { useState, useEffect } from "react";

const AUTH_KEY = "muhammeds_admin_auth";
const DEFAULT_PASS = "admin123";

export function isAdminAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(AUTH_KEY) === "true";
}

export function loginAdmin(password: string): boolean {
  if (password === DEFAULT_PASS || password === "muhammed2026") {
    localStorage.setItem(AUTH_KEY, "true");
    window.dispatchEvent(new Event("admin-auth-changed"));
    return true;
  }
  return false;
}

export function logoutAdmin(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(AUTH_KEY);
  window.dispatchEvent(new Event("admin-auth-changed"));
}

export function useAdminAuth(): { authenticated: boolean; login: (pass: string) => boolean; logout: () => void } {
  const [authenticated, setAuthenticated] = useState<boolean>(() => isAdminAuthenticated());

  useEffect(() => {
    setAuthenticated(isAdminAuthenticated());
    const handleAuthChange = () => {
      setAuthenticated(isAdminAuthenticated());
    };
    window.addEventListener("admin-auth-changed", handleAuthChange);
    window.addEventListener("storage", handleAuthChange);
    return () => {
      window.removeEventListener("admin-auth-changed", handleAuthChange);
      window.removeEventListener("storage", handleAuthChange);
    };
  }, []);

  return {
    authenticated,
    login: loginAdmin,
    logout: logoutAdmin,
  };
}
