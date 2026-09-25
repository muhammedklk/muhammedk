import React from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Wrench, Home, Briefcase, Mail, User, Sparkles, RefreshCw, ArrowRight } from "lucide-react";
import { useCMS } from "@/lib/cmsStore";

interface MaintenanceGuardProps {
  children: React.ReactNode;
}

export function MaintenanceGuard({ children }: MaintenanceGuardProps) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { cms } = useCMS();

  // Always allow admin routes
  if (pathname.startsWith("/admin")) {
    return <>{children}</>;
  }

  const { global: globalMaintenance, pages: pageMaintenance } = cms.maintenance;

  // Determine if current route is under maintenance
  let isCurrentPageUnderMaintenance = false;
  let pageName = "THIS SECTION";

  if (globalMaintenance) {
    isCurrentPageUnderMaintenance = true;
    pageName = "WEBSITE";
  } else if (pathname === "/" && pageMaintenance.home) {
    isCurrentPageUnderMaintenance = true;
    pageName = "HOME PAGE";
  } else if (pathname.startsWith("/about") && pageMaintenance.about) {
    isCurrentPageUnderMaintenance = true;
    pageName = "ABOUT PAGE";
  } else if (pathname === "/work" && pageMaintenance.work) {
    isCurrentPageUnderMaintenance = true;
    pageName = "WORK PORTFOLIO PAGE";
  } else if (pathname.startsWith("/contact") && pageMaintenance.contact) {
    isCurrentPageUnderMaintenance = true;
    pageName = "CONTACT PAGE";
  } else if (pathname.startsWith("/work/") && pageMaintenance.casestudy) {
    isCurrentPageUnderMaintenance = true;
    pageName = "CASE STUDY PAGE";
  }

  if (isCurrentPageUnderMaintenance) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#f8fafc",
          color: "#0f172a",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px 24px",
          textAlign: "center",
          fontFamily: "var(--font-sans)",
          position: "relative",
          zIndex: 999,
          backgroundImage:
            "linear-gradient(to right, rgba(226, 232, 240, 0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(226, 232, 240, 0.5) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      >
        {/* Keyframe animations for editing & building active construction */}
        <style>{`
          @keyframes spinSlow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes hammerTap {
            0%, 100% { transform: rotate(-25deg) scale(1); }
            40% { transform: rotate(15deg) scale(1.1); }
            60% { transform: rotate(-5deg) scale(1); }
          }
          @keyframes codePulse {
            0%, 100% { transform: translateY(0) scale(1); opacity: 0.9; }
            50% { transform: translateY(-5px) scale(1.12); opacity: 1; }
          }
          @keyframes sparklePop {
            0%, 100% { transform: scale(0.7) rotate(0deg); opacity: 0.4; }
            50% { transform: scale(1.25) rotate(180deg); opacity: 1; }
          }
          @keyframes pingPulse {
            0% { transform: scale(1); opacity: 0.8; }
            75%, 100% { transform: scale(2.4); opacity: 0; }
          }
          .maint-btn:hover {
            background: #0f172a !important;
            color: #ffffff !important;
            border-color: #0f172a !important;
            transform: translateY(-2px);
          }
        `}</style>

        <div style={{ maxWidth: "620px", width: "100%", background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "24px", padding: "48px 36px", boxShadow: "0 20px 40px -15px rgba(15, 23, 42, 0.08)" }}>
          {/* Active "Editing & Building Code/Design" Animated Container */}
          <div style={{ position: "relative", width: "110px", height: "110px", margin: "0 auto 28px" }}>
            {/* Spinning Outer Tech Blueprint Ring with dashed border */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                border: "2px dashed #2563eb",
                animation: "spinSlow 14s linear infinite",
              }}
            />

            {/* Orbiting Sparkles Effect 1 */}
            <div
              style={{
                position: "absolute",
                top: -4,
                right: 8,
                color: "#f59e0b",
                animation: "sparklePop 2s ease-in-out infinite",
                zIndex: 4,
              }}
            >
              <Sparkles style={{ width: 18, height: 18 }} />
            </div>

            {/* Orbiting Sparkles Effect 2 */}
            <div
              style={{
                position: "absolute",
                bottom: 2,
                left: 6,
                color: "#2563eb",
                animation: "sparklePop 2.5s ease-in-out infinite 0.6s",
                zIndex: 4,
              }}
            >
              <Sparkles style={{ width: 16, height: 16 }} />
            </div>

            {/* Central Build & Edit Canvas */}
            <div
              style={{
                position: "absolute",
                inset: "10px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
                border: "1.5px solid #93c5fd",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 12px 28px -6px rgba(37, 99, 235, 0.25)",
                overflow: "hidden",
              }}
            >
              {/* Background Code Brackets */}
              <div
                style={{
                  position: "absolute",
                  top: "14px",
                  color: "#3b82f6",
                  opacity: 0.85,
                  animation: "codePulse 2s ease-in-out infinite",
                }}
              >
                <Code2 style={{ width: 22, height: 22 }} />
              </div>

              {/* Foreground Active Hammer / Wrench Constructing & Building Animation */}
              <div
                style={{
                  position: "absolute",
                  bottom: "16px",
                  right: "20px",
                  color: "#1d4ed8",
                  animation: "hammerTap 1.6s ease-in-out infinite",
                  transformOrigin: "bottom right",
                }}
              >
                <Hammer style={{ width: 32, height: 32 }} />
              </div>

              {/* Editing Pen Tool */}
              <div
                style={{
                  position: "absolute",
                  bottom: "18px",
                  left: "20px",
                  color: "#2563eb",
                  opacity: 0.9,
                  animation: "codePulse 2s ease-in-out infinite 0.3s",
                }}
              >
                <PenTool style={{ width: 22, height: 22 }} />
              </div>
            </div>
          </div>

          {/* Maintenance Status Badge with Live Pulsing Dot */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "8px 16px",
              background: "#fef2f2",
              border: "1px solid #fecaca",
              borderRadius: "100px",
              color: "#dc2626",
              fontSize: "11px",
              fontWeight: "700",
              letterSpacing: "0.08em",
              marginBottom: "20px",
            }}
          >
            <span style={{ position: "relative", display: "flex", width: "10px", height: "10px" }}>
              <span
                style={{
                  position: "absolute",
                  display: "inline-flex",
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  background: "#ef4444",
                  animation: "pingPulse 1.8s cubic-bezier(0, 0, 0.2, 1) infinite",
                }}
              />
              <span style={{ relative: "relative", display: "inline-flex", width: "10px", height: "10px", borderRadius: "50%", background: "#dc2626" }} />
            </span>
            {globalMaintenance ? "WEBSITE UNDER SCHEDULED MAINTENANCE" : `${pageName} UNDER MAINTENANCE`}
          </div>

          {/* Main Title */}
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(30px, 4.5vw, 48px)",
              lineHeight: 1.08,
              fontWeight: "700",
              marginBottom: "16px",
              color: "#0f172a",
              letterSpacing: "-0.02em",
            }}
          >
            WE'RE UPGRADING THE <span style={{ color: "#2563eb" }}>DIGITAL EXPERIENCE.</span>
          </h1>

          {/* Description Paragraph */}
          <p style={{ fontSize: "15px", color: "#475569", lineHeight: 1.65, marginBottom: "32px" }}>
            The {pageName.toLowerCase()} is currently undergoing scheduled updates and content enhancements. We'll be back online shortly!
          </p>

          {/* Navigation Card for Available Sections */}
          {!globalMaintenance && (
            <div
              style={{
                background: "#f8fafc",
                border: "1px solid #cbd5e1",
                borderRadius: "16px",
                padding: "24px 20px",
                marginBottom: "28px",
              }}
            >
              <p style={{ fontSize: "11px", fontWeight: "700", color: "#2563eb", marginBottom: "16px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                EXPLORE OTHER AVAILABLE SECTIONS:
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "10px" }}>
                {pathname !== "/" && !pageMaintenance.home && (
                  <Link
                    to="/"
                    className="maint-btn"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "10px 18px",
                      background: "#ffffff",
                      color: "#0f172a",
                      border: "1px solid #cbd5e1",
                      textDecoration: "none",
                      borderRadius: "8px",
                      fontSize: "13px",
                      fontWeight: "700",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <Home style={{ width: 15, height: 15 }} /> Home Page
                  </Link>
                )}
                {!pathname.startsWith("/about") && !pageMaintenance.about && (
                  <Link
                    to="/about"
                    className="maint-btn"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "10px 18px",
                      background: "#ffffff",
                      color: "#0f172a",
                      border: "1px solid #cbd5e1",
                      textDecoration: "none",
                      borderRadius: "8px",
                      fontSize: "13px",
                      fontWeight: "700",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <User style={{ width: 15, height: 15 }} /> About Page
                  </Link>
                )}
                {pathname !== "/work" && !pageMaintenance.work && (
                  <Link
                    to="/work"
                    className="maint-btn"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "10px 18px",
                      background: "#ffffff",
                      color: "#0f172a",
                      border: "1px solid #cbd5e1",
                      textDecoration: "none",
                      borderRadius: "8px",
                      fontSize: "13px",
                      fontWeight: "700",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <Briefcase style={{ width: 15, height: 15 }} /> Portfolio Works
                  </Link>
                )}
                {!pathname.startsWith("/contact") && !pageMaintenance.contact && (
                  <Link
                    to="/contact"
                    className="maint-btn"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "10px 18px",
                      background: "#ffffff",
                      color: "#0f172a",
                      border: "1px solid #cbd5e1",
                      textDecoration: "none",
                      borderRadius: "8px",
                      fontSize: "13px",
                      fontWeight: "700",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <Mail style={{ width: 15, height: 15 }} /> Contact Page
                  </Link>
                )}
              </div>
            </div>
          )}

        </div>
      </div>
    );
  }

  return <>{children}</>;
}
