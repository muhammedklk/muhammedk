import { useState, useEffect } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useAdminAuth } from "@/lib/authStore";
import { ShieldCheck, ArrowRight, Eye, EyeOff, ArrowLeft } from "lucide-react";

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
      setError("Please enter the admin security password.");
      return;
    }

    const success = login(password);
    if (success) {
      setError(null);
      navigate({ to: "/admin" });
    } else {
      setError("Incorrect password. Default: admin123");
    }
  };

  if (!mounted) {
    return (
      <div style={{ minHeight: "100vh", background: "#f8fafc", display: "grid", placeItems: "center" }}>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "12px", fontWeight: "700", color: "#64748b", letterSpacing: "0.1em" }}>
          [ LOADING CONTROL PANEL ]
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        backgroundImage: "radial-gradient(#cbd5e1 1px, transparent 1px)",
        backgroundSize: "24px 24px",
        color: "#0f172a",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "24px",
        fontFamily: "var(--font-sans)",
      }}
    >
      <div style={{ width: "100%", maxWidth: "440px" }}>
        {/* Back Link */}
        <Link
          to="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "12px",
            fontWeight: "600",
            color: "#64748b",
            textDecoration: "none",
            marginBottom: "24px",
            transition: "color 0.2s",
          }}
        >
          <ArrowLeft style={{ width: 16, height: 16 }} /> Back to Portfolio Site
        </Link>

        {/* Floating Light Card */}
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "16px",
            padding: "40px",
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01)",
          }}
        >
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                background: "#0f172a",
                color: "#ffffff",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "16px",
                boxShadow: "0 4px 12px rgba(15, 23, 42, 0.15)",
              }}
            >
              <ShieldCheck style={{ width: 24, height: 24 }} />
            </div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "28px", fontWeight: "700", color: "#0f172a", marginBottom: "8px", letterSpacing: "-0.02em" }}>
              ADMIN PORTAL
            </h1>
            <p style={{ fontSize: "13px", color: "#64748b", lineHeight: 1.5 }}>
              Enter security password to access work management and messages dashboard.
            </p>
          </div>

          {/* Error Banner */}
          {error && (
            <div
              style={{
                background: "#fef2f2",
                border: "1px solid #fecaca",
                color: "#dc2626",
                borderRadius: "8px",
                padding: "12px 16px",
                fontSize: "12px",
                fontWeight: "600",
                marginBottom: "20px",
              }}
            >
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "11px",
                  fontWeight: "700",
                  letterSpacing: "0.05em",
                  color: "#334155",
                  marginBottom: "8px",
                  textTransform: "uppercase",
                }}
              >
                Security Password
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password (admin123)"
                  style={{
                    width: "100%",
                    padding: "12px 42px 12px 14px",
                    background: "#f8fafc",
                    border: "1px solid #cbd5e1",
                    borderRadius: "8px",
                    color: "#0f172a",
                    fontSize: "14px",
                    outline: "none",
                    transition: "border-color 0.2s, box-shadow 0.2s",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    color: "#64748b",
                    cursor: "pointer",
                    padding: "4px",
                  }}
                >
                  {showPassword ? <EyeOff style={{ width: 18, height: 18 }} /> : <Eye style={{ width: 18, height: 18 }} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "14px",
                background: "#0f172a",
                color: "#ffffff",
                border: "none",
                borderRadius: "8px",
                fontSize: "13px",
                fontWeight: "700",
                letterSpacing: "0.05em",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                transition: "background-color 0.2s",
              }}
            >
              AUTHENTICATE & LOG IN <ArrowRight style={{ width: 16, height: 16 }} />
            </button>
          </form>

          {/* Hint Footer */}
          <div style={{ marginTop: "24px", paddingTop: "20px", borderTop: "1px solid #f1f5f9", textAlign: "center" }}>
            <span style={{ fontSize: "11px", color: "#94a3b8" }}>
              Default Password: <code style={{ background: "#f1f5f9", color: "#334155", padding: "2px 6px", borderRadius: "4px" }}>admin123</code>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
