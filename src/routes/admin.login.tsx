import { useState, useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAdminAuth } from "@/lib/authStore";
import { Lock, ArrowRight, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [{ title: "Admin Login — Muhammed K Portfolio" }],
  }),
  component: AdminLoginPage,
});

function AdminLoginPage() {
  const [mounted, setMounted] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useAdminAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setError("Please enter the admin password.");
      return;
    }

    const success = login(password);
    if (success) {
      setError(null);
      navigate({ to: "/admin" });
    } else {
      setError("Incorrect password. Default is: admin123");
    }
  };

  if (!mounted) {
    return (
      <div className="inner-page dark-band" style={{ minHeight: "70vh", display: "grid", placeItems: "center" }}>
        <p className="section-label" style={{ color: "var(--accent)" }}>[ LOADING CONTROL PANEL ]</p>
      </div>
    );
  }

  return (
    <div className="inner-page dark-band" style={{ minHeight: "80vh", paddingTop: "calc(var(--header-h) + 40px)", paddingBottom: "60px" }}>
      <div className="editorial-grid" style={{ alignContent: "center" }}>
        <div style={{ gridColumn: "4 / 10", background: "color-mix(in oklab, var(--dark) 80%, black)", border: "1px solid color-mix(in oklab, var(--secondary-foreground) 25%, transparent)", padding: "40px", position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
            <Lock style={{ width: 18, height: 18, color: "var(--accent)" }} />
            <span style={{ fontSize: "11px", fontWeight: "700", letterSpacing: "0.1em", color: "var(--accent)" }}>PORTFOLIO CONTROL PANEL</span>
          </div>

          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 4vw, 48px)", lineHeight: 0.9, marginBottom: "16px" }}>
            ADMIN <span>LOGIN.</span>
          </h1>

          <p style={{ fontSize: "13px", color: "color-mix(in oklab, var(--secondary-foreground) 70%, transparent)", marginBottom: "30px" }}>
            Enter your security password to access portfolio work management, project editing, and contact form logs.
          </p>

          {error && (
            <div style={{ background: "rgba(239, 68, 68, 0.15)", border: "1px solid rgba(239, 68, 68, 0.4)", color: "#f87171", padding: "12px 16px", fontSize: "12px", fontWeight: "600", marginBottom: "20px" }}>
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div>
              <label style={{ display: "block", fontSize: "10px", fontWeight: "700", letterSpacing: "0.08em", marginBottom: "8px" }}>
                SECURITY PASSWORD
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password (default: admin123)"
                  style={{
                    width: "100%",
                    padding: "14px 44px 14px 16px",
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid color-mix(in oklab, var(--secondary-foreground) 30%, transparent)",
                    color: "var(--secondary-foreground)",
                    fontSize: "14px",
                    fontFamily: "var(--font-sans)",
                    outline: "none",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "var(--secondary-foreground)", cursor: "pointer", opacity: 0.7 }}
                >
                  {showPassword ? <EyeOff style={{ width: 16, height: 16 }} /> : <Eye style={{ width: 16, height: 16 }} />}
                </button>
              </div>
            </div>

            <Button type="submit" variant="lime" size="editorial" style={{ width: "100%", justifyContent: "center", gap: "10px", marginTop: "10px" }}>
              AUTHENTICATE & LOG IN <ArrowRight />
            </Button>

            <div style={{ textAlign: "center", marginTop: "10px" }}>
              <span style={{ fontSize: "11px", opacity: 0.6 }}>
                Default Passwords: <code style={{ background: "rgba(255,255,255,0.1)", padding: "2px 6px" }}>admin123</code> or <code style={{ background: "rgba(255,255,255,0.1)", padding: "2px 6px" }}>muhammed2026</code>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
