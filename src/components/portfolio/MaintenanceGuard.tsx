import React from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Wrench, ShieldAlert, ArrowLeft, Home, Briefcase, Mail, User } from "lucide-react";
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
          background: "#0a0a0c",
          color: "#f8fafc",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 24px",
          textAlign: "center",
          fontFamily: "var(--font-sans)",
          position: "relative",
          zIndex: 999,
        }}
      >
        <div style={{ maxWidth: "560px", width: "100%" }}>
          {/* Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 14px",
              background: "rgba(239, 68, 68, 0.15)",
              border: "1px solid rgba(239, 68, 68, 0.3)",
              borderRadius: "100px",
              color: "#f87171",
              fontSize: "11px",
              fontWeight: "700",
              letterSpacing: "0.1em",
              marginBottom: "24px",
            }}
          >
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#ef4444",
                boxShadow: "0 0 8px #ef4444",
              }}
            />
            {globalMaintenance ? "WEBSITE UNDER SCHEDULED MAINTENANCE" : `${pageName} UNDER MAINTENANCE`}
          </div>

          {/* Heading */}
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(32px, 5vw, 56px)",
              lineHeight: 1.05,
              fontWeight: "700",
              marginBottom: "16px",
              color: "#ffffff",
            }}
          >
            WE'RE UPGRADING THE <span style={{ color: "var(--accent)" }}>DIGITAL EXPERIENCE.</span>
          </h1>

          <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.7)", lineHeight: 1.6, marginBottom: "36px" }}>
            The {pageName.toLowerCase()} is currently undergoing scheduled updates and content enhancements. We'll be back online shortly!
          </p>

          {/* Navigation Links for Page Maintenance */}
          {!globalMaintenance && (
            <div
              style={{
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "16px",
                padding: "24px",
                marginBottom: "30px",
              }}
            >
              <p style={{ fontSize: "12px", fontWeight: "700", color: "var(--accent)", marginBottom: "16px", letterSpacing: "0.08em" }}>
                EXPLORE OTHER AVAILABLE SECTIONS:
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "12px" }}>
                {pathname !== "/" && !pageMaintenance.home && (
                  <Link
                    to="/"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "8px 16px",
                      background: "rgba(255,255,255,0.08)",
                      color: "#fff",
                      textDecoration: "none",
                      borderRadius: "8px",
                      fontSize: "12px",
                      fontWeight: "600",
                    }}
                  >
                    <Home style={{ width: 14, height: 14 }} /> Home Page
                  </Link>
                )}
                {!pathname.startsWith("/about") && !pageMaintenance.about && (
                  <Link
                    to="/about"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "8px 16px",
                      background: "rgba(255,255,255,0.08)",
                      color: "#fff",
                      textDecoration: "none",
                      borderRadius: "8px",
                      fontSize: "12px",
                      fontWeight: "600",
                    }}
                  >
                    <User style={{ width: 14, height: 14 }} /> About Page
                  </Link>
                )}
                {pathname !== "/work" && !pageMaintenance.work && (
                  <Link
                    to="/work"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "8px 16px",
                      background: "rgba(255,255,255,0.08)",
                      color: "#fff",
                      textDecoration: "none",
                      borderRadius: "8px",
                      fontSize: "12px",
                      fontWeight: "600",
                    }}
                  >
                    <Briefcase style={{ width: 14, height: 14 }} /> Portfolio Works
                  </Link>
                )}
                {!pathname.startsWith("/contact") && !pageMaintenance.contact && (
                  <Link
                    to="/contact"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "8px 16px",
                      background: "rgba(255,255,255,0.08)",
                      color: "#fff",
                      textDecoration: "none",
                      borderRadius: "8px",
                      fontSize: "12px",
                      fontWeight: "600",
                    }}
                  >
                    <Mail style={{ width: 14, height: 14 }} /> Contact Page
                  </Link>
                )}
              </div>
            </div>
          )}

          {/* Admin link helper */}
          <div style={{ marginTop: "20px" }}>
            <Link
              to="/admin/login"
              style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", textDecoration: "none" }}
            >
              [ Administrator Login ]
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
