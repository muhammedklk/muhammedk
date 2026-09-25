import React from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { FileCode, Code2, Hammer, Pencil, Sparkles, Layers, Cpu, Home, Briefcase, Mail, User } from "lucide-react";
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
            "linear-gradient(to right, rgba(226, 232, 240, 0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(226, 232, 240, 0.6) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      >
        {/* Keyframe animations for editing, coding & building */}
        <style>{`
          @keyframes spinOrbit {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes counterOrbit {
            from { transform: rotate(0deg); }
            to { transform: rotate(-360deg); }
          }
          @keyframes editCraft {
            0%, 100% { transform: rotate(-10deg) translateY(0); }
            50% { transform: rotate(15deg) translateY(-4px); }
          }
          @keyframes scanLine {
            0% { top: 10%; opacity: 0.3; }
            50% { top: 80%; opacity: 0.9; }
            100% { top: 10%; opacity: 0.3; }
          }
          @keyframes pulseBadge {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
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

        <div style={{ maxWidth: "640px", width: "100%", background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "24px", padding: "52px 36px", boxShadow: "0 20px 40px -15px rgba(15, 23, 42, 0.08)" }}>
          
          {/* EDIT & BUILD ANIMATED SCENE */}
          <div style={{ position: "relative", width: "120px", height: "120px", margin: "0 auto 32px" }}>
            
            {/* Outer Tech Orbit Circle */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                border: "2px dashed #bfdbfe",
                animation: "spinOrbit 16s linear infinite",
              }}
            >
              {/* Floating Node 1: Code Icon */}
              <div style={{ position: "absolute", top: "-10px", left: "calc(50% - 14px)", background: "#ffffff", border: "1px solid #3b82f6", borderRadius: "50%", padding: "4px", color: "#2563eb", boxShadow: "0 4px 10px rgba(37,99,235,0.15)", animation: "counterOrbit 16s linear infinite" }}>
                <Code2 style={{ width: 14, height: 14 }} />
              </div>

              {/* Floating Node 2: Cpu Node */}
              <div style={{ position: "absolute", bottom: "-10px", right: "calc(50% - 14px)", background: "#ffffff", border: "1px solid #10b981", borderRadius: "50%", padding: "4px", color: "#10b981", boxShadow: "0 4px 10px rgba(16,185,129,0.15)", animation: "counterOrbit 16s linear infinite" }}>
                <Cpu style={{ width: 14, height: 14 }} />
              </div>

              {/* Floating Node 3: Layers Node */}
              <div style={{ position: "absolute", top: "calc(50% - 14px)", left: "-10px", background: "#ffffff", border: "1px solid #8b5cf6", borderRadius: "50%", padding: "4px", color: "#8b5cf6", boxShadow: "0 4px 10px rgba(139,92,246,0.15)", animation: "counterOrbit 16s linear infinite" }}>
                <Layers style={{ width: 14, height: 14 }} />
              </div>
            </div>

            {/* Central Code Window & Editing Tool Badge */}
            <div
              style={{
                position: "absolute",
                inset: "14px",
                borderRadius: "20px",
                background: "linear-gradient(135deg, #eff6ff 0%, #f0fdf4 100%)",
                border: "1.5px solid #93c5fd",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 12px 28px -6px rgba(37, 99, 235, 0.2)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Scanline Effect */}
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  height: "2px",
                  background: "linear-gradient(90deg, transparent, #2563eb, transparent)",
                  animation: "scanLine 3s ease-in-out infinite",
                }}
              />

              {/* Base Code Window Icon */}
              <FileCode style={{ width: 40, height: 40, color: "#2563eb" }} />

              {/* Active Editing Pencil / Crafting Tool Icon */}
              <div
                style={{
                  position: "absolute",
                  top: "14px",
                  right: "14px",
                  background: "#2563eb",
                  color: "#ffffff",
                  borderRadius: "8px",
                  padding: "5px",
                  boxShadow: "0 4px 12px rgba(37, 99, 235, 0.3)",
                  animation: "editCraft 2s ease-in-out infinite",
                }}
              >
                <Pencil style={{ width: 16, height: 16 }} />
              </div>
            </div>
          </div>

          {/* Maintenance Status Badge with Live Pulsing Dot */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "8px 18px",
              background: "#fef2f2",
              border: "1px solid #fecaca",
              borderRadius: "100px",
              color: "#dc2626",
              fontSize: "11px",
              fontWeight: "700",
              letterSpacing: "0.08em",
              marginBottom: "22px",
              animation: "pulseBadge 3s ease-in-out infinite",
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
            {globalMaintenance ? "WEBSITE UNDER SCHEDULED MAINTENANCE & BUILDING" : `${pageName} UNDER ACTIVE MAINTENANCE & EDITING`}
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
            EDITING & BUILDING THE <span style={{ color: "#2563eb" }}>DIGITAL EXPERIENCE.</span>
          </h1>

          {/* Description Paragraph */}
          <p style={{ fontSize: "15px", color: "#475569", lineHeight: 1.65, marginBottom: "32px" }}>
            The {pageName.toLowerCase()} is currently being edited and built with new content and performance enhancements. We'll be live shortly!
          </p>

          {/* Navigation Card for Available Sections */}
          {!globalMaintenance && (
            <div
              style={{
                background: "#f8fafc",
                border: "1px solid #cbd5e1",
                borderRadius: "16px",
                padding: "24px 20px",
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
