import { useState, useEffect } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useAdminAuth } from "@/lib/authStore";
import { useCMS, saveStoredCMS, type CMSData, type CaseStudyFull, type ProcessStep, type ServiceItem, type FAQItem, type ExperienceItem } from "@/lib/cmsStore";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { useMessages } from "@/lib/projectStore";
import {
  LayoutDashboard,
  Home as HomeIcon,
  User as UserIcon,
  Briefcase as WorkIcon,
  Mail as ContactIcon,
  FolderKanban,
  Wrench,
  Plus,
  Trash2,
  Edit2,
  Save,
  Check,
  RotateCcw,
  ExternalLink,
  LogOut,
  Shield,
  ArrowUp,
  ArrowDown,
  Database,
  Image as ImageIcon,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [{ title: "Admin Panel & CMS — Muhammed K Portfolio" }],
  }),
  component: AdminCMSPage,
});

type SidebarSection =
  | "dashboard"
  | "home"
  | "about"
  | "work"
  | "contact"
  | "casestudies"
  | "maintenance";

function AdminCMSPage() {
  const [mounted, setMounted] = useState(false);
  const { authenticated, logout } = useAdminAuth();
  const navigate = useNavigate();
  const { cms, updateCMS, resetCMS } = useCMS();
  const messages = useMessages();

  // Active section tab
  const [activeTab, setActiveTab] = useState<SidebarSection>("dashboard");
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  // Local draft CMS state
  const [draft, setDraft] = useState<CMSData>(cms);
  // Selected project for deep editing in Case Study Manager
  const [editingProjectSlug, setEditingProjectSlug] = useState<string | null>(null);
  const [newGalleryUrl, setNewGalleryUrl] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setDraft(cms);
  }, [cms]);

  if (!mounted) {
    return (
      <div style={{ minHeight: "100vh", background: "#f8fafc", display: "grid", placeItems: "center" }}>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "12px", fontWeight: "700", color: "#64748b", letterSpacing: "0.1em" }}>
          [ INITIALIZING CMS ADMIN PANEL ]
        </p>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div style={{ minHeight: "100vh", background: "#f8fafc", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px", fontFamily: "var(--font-sans)" }}>
        <div style={{ width: "100%", maxWidth: "420px", background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "16px", padding: "40px", textAlign: "center", boxShadow: "0 20px 25px -5px rgba(0,0,0,0.05)" }}>
          <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "#fee2e2", color: "#ef4444", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>
            <Shield style={{ width: 24, height: 24 }} />
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "24px", fontWeight: "700", color: "#0f172a", marginBottom: "8px" }}>ACCESS RESTRICTED</h2>
          <p style={{ fontSize: "13px", color: "#64748b", marginBottom: "24px" }}>Please log in to access the Portfolio CMS Admin Panel.</p>
          <button
            onClick={() => navigate({ to: "/admin/login" })}
            style={{ width: "100%", padding: "12px", background: "#0f172a", color: "#ffffff", border: "none", borderRadius: "8px", fontSize: "13px", fontWeight: "700", cursor: "pointer" }}
          >
            GO TO LOGIN PAGE
          </button>
        </div>
      </div>
    );
  }

  const handleSaveAll = () => {
    updateCMS(draft);
    setSaveStatus("Changes saved instantly to Live Site & MongoDB Atlas!");
    setTimeout(() => setSaveStatus(null), 4000);
  };

  const handleReset = () => {
    if (confirm("Reset all CMS content back to factory defaults?")) {
      resetCMS();
      setSaveStatus("Reset back to default portfolio content!");
      setTimeout(() => setSaveStatus(null), 4000);
    }
  };

  // Helper project getters
  const activeProject = draft.projects.find((p) => p.slug === editingProjectSlug) || draft.projects[0];

  const updateProjectField = (slug: string, field: keyof CaseStudyFull, value: any) => {
    const updatedProjects = draft.projects.map((p) => (p.slug === slug ? { ...p, [field]: value } : p));
    setDraft({ ...draft, projects: updatedProjects });
  };

  const handleAddProject = () => {
    const newSlug = `project-${Date.now()}`;
    const newProj: CaseStudyFull = {
      slug: newSlug,
      number: String(draft.projects.length + 1).padStart(2, "0"),
      title: "NEW PORTFOLIO PROJECT",
      category: "UI/UX Design & Front-End",
      description: "Project description summary...",
      tech: ["Figma", "React", "TypeScript"],
      image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
      dimensions: [1600, 900],
      accent: "blue",
      challenge: "Define intuitive visual hierarchy and responsive flow.",
      objective: "Deliver seamless digital experience for users.",
      result: "High impact visual outcome with smooth front-end execution.",
      galleryImages: [],
      clientRole: "UI/UX Designer & Developer",
      timeline: "2026",
    };
    setDraft({ ...draft, projects: [...draft.projects, newProj] });
    setEditingProjectSlug(newSlug);
  };

  const handleDeleteProject = (slug: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      const filtered = draft.projects.filter((p) => p.slug !== slug);
      setDraft({ ...draft, projects: filtered });
      if (editingProjectSlug === slug) {
        setEditingProjectSlug(filtered[0]?.slug || null);
      }
    }
  };

  const moveProject = (index: number, direction: "up" | "down") => {
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= draft.projects.length) return;
    const newProjs = [...draft.projects];
    const temp = newProjs[index];
    newProjs[index] = newProjs[targetIdx];
    newProjs[targetIdx] = temp;
    // re-number
    const renumbered = newProjs.map((p, i) => ({ ...p, number: String(i + 1).padStart(2, "0") }));
    setDraft({ ...draft, projects: renumbered });
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", color: "#0f172a", fontFamily: "var(--font-sans)", display: "flex", flexDirection: "column" }}>
      {/* Top Header Bar */}
      <header
        style={{
          background: "#ffffff",
          borderBottom: "1px solid #e2e8f0",
          padding: "14px 28px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "sticky",
          top: 0,
          zIndex: 100,
          boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "34px", height: "34px", borderRadius: "8px", background: "#0f172a", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <LayoutDashboard style={{ width: 18, height: 18 }} />
          </div>
          <div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "17px", fontWeight: "700", color: "#0f172a", margin: 0, lineHeight: 1.2 }}>
              MUHAMMED K <span style={{ color: "#2563eb", fontWeight: "700", fontSize: "13px" }}>CMS ADMIN PANEL</span>
            </h1>
            <span style={{ fontSize: "10px", fontWeight: "600", color: "#64748b" }}>FULL DYNAMIC PORTFOLIO MANAGEMENT</span>
          </div>
        </div>

        {/* Global Action Bar */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {saveStatus && (
            <span style={{ fontSize: "12px", fontWeight: "700", color: "#16a34a", background: "#dcfce7", padding: "6px 12px", borderRadius: "6px", display: "inline-flex", alignItems: "center", gap: "6px" }}>
              <CheckCircle2 style={{ width: 16, height: 16 }} /> {saveStatus}
            </span>
          )}

          <button
            onClick={handleSaveAll}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 20px",
              background: "#2563eb",
              color: "#ffffff",
              border: "none",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: "700",
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(37, 99, 235, 0.2)",
            }}
          >
            <Save style={{ width: 16, height: 16 }} /> SAVE CHANGES TO LIVE SITE
          </button>

          <Link
            to="/"
            target="_blank"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "12px",
              fontWeight: "600",
              color: "#475569",
              textDecoration: "none",
              padding: "9px 14px",
              background: "#f1f5f9",
              borderRadius: "8px",
              border: "1px solid #cbd5e1",
            }}
          >
            Live Site <ExternalLink style={{ width: 14, height: 14 }} />
          </Link>

          <button
            onClick={() => {
              logout();
              navigate({ to: "/admin/login" });
            }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "12px",
              fontWeight: "600",
              color: "#dc2626",
              background: "#fef2f2",
              border: "1px solid #fecaca",
              borderRadius: "8px",
              padding: "9px 14px",
              cursor: "pointer",
            }}
          >
            <LogOut style={{ width: 14, height: 14 }} /> Logout
          </button>
        </div>
      </header>

      {/* Admin Panel Main Container with Left Sidebar & Content Workspace */}
      <div style={{ flex: 1, display: "flex", minHeight: "calc(100vh - 65px)" }}>
        {/* LEFT SIDEBAR NAVIGATION */}
        <aside
          style={{
            width: "280px",
            background: "#ffffff",
            borderRight: "1px solid #e2e8f0",
            padding: "24px 16px",
            display: "flex",
            flexDirection: "column",
            gap: "6px",
            position: "sticky",
            top: "65px",
            height: "calc(100vh - 65px)",
            overflowY: "auto",
            alignSelf: "flex-start",
          }}
        >
          <div style={{ padding: "0 12px 12px", borderBottom: "1px solid #f1f5f9", marginBottom: "8px" }}>
            <span style={{ fontSize: "10px", fontWeight: "700", color: "#94a3b8", letterSpacing: "0.1em" }}>CMS NAVIGATION</span>
          </div>

          <button
            onClick={() => setActiveTab("dashboard")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "12px 16px",
              borderRadius: "8px",
              border: "none",
              background: activeTab === "dashboard" ? "#0f172a" : "transparent",
              color: activeTab === "dashboard" ? "#ffffff" : "#475569",
              fontSize: "13px",
              fontWeight: "700",
              cursor: "pointer",
              textAlign: "left",
              transition: "all 0.15s",
            }}
          >
            <LayoutDashboard style={{ width: 18, height: 18 }} /> Dashboard
          </button>

          <button
            onClick={() => setActiveTab("home")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "12px 16px",
              borderRadius: "8px",
              border: "none",
              background: activeTab === "home" ? "#0f172a" : "transparent",
              color: activeTab === "home" ? "#ffffff" : "#475569",
              fontSize: "13px",
              fontWeight: "700",
              cursor: "pointer",
              textAlign: "left",
              transition: "all 0.15s",
            }}
          >
            <HomeIcon style={{ width: 18, height: 18 }} /> Home Page
          </button>

          <button
            onClick={() => setActiveTab("about")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "12px 16px",
              borderRadius: "8px",
              border: "none",
              background: activeTab === "about" ? "#0f172a" : "transparent",
              color: activeTab === "about" ? "#ffffff" : "#475569",
              fontSize: "13px",
              fontWeight: "700",
              cursor: "pointer",
              textAlign: "left",
              transition: "all 0.15s",
            }}
          >
            <UserIcon style={{ width: 18, height: 18 }} /> About Page
          </button>

          <button
            onClick={() => setActiveTab("work")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "12px 16px",
              borderRadius: "8px",
              border: "none",
              background: activeTab === "work" ? "#0f172a" : "transparent",
              color: activeTab === "work" ? "#ffffff" : "#475569",
              fontSize: "13px",
              fontWeight: "700",
              cursor: "pointer",
              textAlign: "left",
              transition: "all 0.15s",
            }}
          >
            <WorkIcon style={{ width: 18, height: 18 }} /> Work Page
          </button>

          <button
            onClick={() => setActiveTab("contact")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "12px 16px",
              borderRadius: "8px",
              border: "none",
              background: activeTab === "contact" ? "#0f172a" : "transparent",
              color: activeTab === "contact" ? "#ffffff" : "#475569",
              fontSize: "13px",
              fontWeight: "700",
              cursor: "pointer",
              textAlign: "left",
              transition: "all 0.15s",
            }}
          >
            <ContactIcon style={{ width: 18, height: 18 }} /> Contact Page
          </button>

          <button
            onClick={() => setActiveTab("casestudies")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "12px 16px",
              borderRadius: "8px",
              border: "none",
              background: activeTab === "casestudies" ? "#0f172a" : "transparent",
              color: activeTab === "casestudies" ? "#ffffff" : "#475569",
              fontSize: "13px",
              fontWeight: "700",
              cursor: "pointer",
              textAlign: "left",
              transition: "all 0.15s",
            }}
          >
            <FolderKanban style={{ width: 18, height: 18 }} /> Case Study Manager
          </button>

          <button
            onClick={() => setActiveTab("maintenance")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "12px 16px",
              borderRadius: "8px",
              border: "none",
              background: activeTab === "maintenance" ? "#dc2626" : "transparent",
              color: activeTab === "maintenance" ? "#ffffff" : draft.maintenance.global ? "#dc2626" : "#475569",
              fontSize: "13px",
              fontWeight: "700",
              cursor: "pointer",
              textAlign: "left",
              transition: "all 0.15s",
              marginTop: "8px",
            }}
          >
            <Wrench style={{ width: 18, height: 18 }} /> Maintenance Mode
            {draft.maintenance.global && (
              <span style={{ fontSize: "9px", background: "#fef2f2", color: "#dc2626", padding: "2px 6px", borderRadius: "4px", marginLeft: "auto" }}>ON</span>
            )}
          </button>

          <div style={{ marginTop: "auto", paddingTop: "20px", borderTop: "1px solid #f1f5f9" }}>
            <button
              onClick={handleReset}
              style={{
                width: "100%",
                padding: "8px 12px",
                background: "#f1f5f9",
                color: "#64748b",
                border: "1px solid #cbd5e1",
                borderRadius: "6px",
                fontSize: "11px",
                fontWeight: "600",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
              }}
            >
              <RotateCcw style={{ width: 14, height: 14 }} /> Reset Factory Defaults
            </button>
          </div>
        </aside>

        {/* RIGHT CONTENT WORKSPACE */}
        <main style={{ flex: 1, padding: "32px 40px", maxWidth: "1100px", margin: "0 auto" }}>
          {/* SECTION 1: DASHBOARD */}
          {activeTab === "dashboard" && (
            <div>
              <div style={{ marginBottom: "28px" }}>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "28px", fontWeight: "700", color: "#0f172a", margin: 0 }}>
                  SYSTEM DASHBOARD
                </h2>
                <p style={{ fontSize: "13px", color: "#64748b", marginTop: "4px" }}>
                  Overview of system metrics, MongoDB Atlas connection, and global controls.
                </p>
              </div>

              {/* Status Banner */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px", marginBottom: "32px" }}>
                <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "20px", boxShadow: "0 2px 4px rgba(0,0,0,0.01)" }}>
                  <span style={{ fontSize: "11px", fontWeight: "700", color: "#64748b" }}>TOTAL PORTFOLIO PROJECTS</span>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "36px", fontWeight: "700", color: "#0f172a", margin: "8px 0 0" }}>
                    {String(draft.projects.length).padStart(2, "0")}
                  </h3>
                </div>

                <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "20px", boxShadow: "0 2px 4px rgba(0,0,0,0.01)" }}>
                  <span style={{ fontSize: "11px", fontWeight: "700", color: "#64748b" }}>RECEIVED CONTACT MESSAGES</span>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "36px", fontWeight: "700", color: "#2563eb", margin: "8px 0 0" }}>
                    {String(messages.length).padStart(2, "0")}
                  </h3>
                </div>

                <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "20px", boxShadow: "0 2px 4px rgba(0,0,0,0.01)" }}>
                  <span style={{ fontSize: "11px", fontWeight: "700", color: "#64748b" }}>GLOBAL MAINTENANCE</span>
                  <h3 style={{ fontSize: "16px", fontWeight: "700", color: draft.maintenance.global ? "#dc2626" : "#16a34a", margin: "16px 0 0" }}>
                    {draft.maintenance.global ? "● ACTIVE (SITE OFFLINE)" : "● DISABLED (SITE LIVE)"}
                  </h3>
                </div>
              </div>

              {/* MongoDB Atlas Connection Box */}
              <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "24px", marginBottom: "32px", boxShadow: "0 2px 4px rgba(0,0,0,0.01)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                  <Database style={{ width: 20, height: 20, color: "#16a34a" }} />
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "18px", fontWeight: "700", color: "#0f172a", margin: 0 }}>
                    MongoDB Database Connection
                  </h3>
                  <span style={{ fontSize: "11px", fontWeight: "700", background: "#dcfce7", color: "#15803d", padding: "3px 8px", borderRadius: "4px" }}>
                    CONNECTED
                  </span>
                </div>
                <p style={{ fontSize: "12px", color: "#64748b", marginBottom: "12px" }}>
                  Active MongoDB Atlas cluster URI configured for live portfolio CMS persistence:
                </p>
                <div style={{ background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "8px", padding: "12px", fontFamily: "monospace", fontSize: "12px", color: "#334155" }}>
                  mongodb+srv://kmuhammed:&lt;Muhammed9656&gt;@cluster0.pc5tkcr.mongodb.net/portfolio_cms
                </div>
              </div>
            </div>
          )}

          {/* SECTION 2: HOME PAGE CMS */}
          {activeTab === "home" && (
            <div>
              <div style={{ marginBottom: "28px" }}>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "28px", fontWeight: "700", color: "#0f172a", margin: 0 }}>
                  HOME PAGE CMS (ALL 9 SECTIONS)
                </h2>
                <p style={{ fontSize: "13px", color: "#64748b", marginTop: "4px" }}>
                  Edit every section, headline, paragraph, list, and button text on the Home Page.
                </p>
              </div>

              {/* 1. Hero Section Card */}
              <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "28px", marginBottom: "24px" }}>
                <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#2563eb", marginBottom: "20px" }}>1. Hero Section</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "11px", fontWeight: "700", color: "#475569", marginBottom: "6px" }}>HERO LABEL</label>
                    <input
                      type="text"
                      value={draft.home.hero.label}
                      onChange={(e) => setDraft({ ...draft, home: { ...draft.home, hero: { ...draft.home.hero, label: e.target.value } } })}
                      style={{ width: "100%", padding: "10px", background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "13px" }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "11px", fontWeight: "700", color: "#475569", marginBottom: "6px" }}>STATUS TEXT</label>
                    <input
                      type="text"
                      value={draft.home.hero.statusText}
                      onChange={(e) => setDraft({ ...draft, home: { ...draft.home, hero: { ...draft.home.hero, statusText: e.target.value } } })}
                      style={{ width: "100%", padding: "10px", background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "13px" }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "11px", fontWeight: "700", color: "#475569", marginBottom: "6px" }}>TITLE LINE 1</label>
                    <input
                      type="text"
                      value={draft.home.hero.titleLine1}
                      onChange={(e) => setDraft({ ...draft, home: { ...draft.home, hero: { ...draft.home.hero, titleLine1: e.target.value } } })}
                      style={{ width: "100%", padding: "10px", background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "13px" }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "11px", fontWeight: "700", color: "#475569", marginBottom: "6px" }}>TITLE LINE 2</label>
                    <input
                      type="text"
                      value={draft.home.hero.titleLine2}
                      onChange={(e) => setDraft({ ...draft, home: { ...draft.home, hero: { ...draft.home.hero, titleLine2: e.target.value } } })}
                      style={{ width: "100%", padding: "10px", background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "13px" }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "11px", fontWeight: "700", color: "#475569", marginBottom: "6px" }}>TITLE LINE 3</label>
                    <input
                      type="text"
                      value={draft.home.hero.titleLine3}
                      onChange={(e) => setDraft({ ...draft, home: { ...draft.home, hero: { ...draft.home.hero, titleLine3: e.target.value } } })}
                      style={{ width: "100%", padding: "10px", background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "13px" }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "11px", fontWeight: "700", color: "#475569", marginBottom: "6px" }}>TITLE LINE 4</label>
                    <input
                      type="text"
                      value={draft.home.hero.titleLine4}
                      onChange={(e) => setDraft({ ...draft, home: { ...draft.home, hero: { ...draft.home.hero, titleLine4: e.target.value } } })}
                      style={{ width: "100%", padding: "10px", background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "13px" }}
                    />
                  </div>
                  <div style={{ gridColumn: "1 / 3" }}>
                    <label style={{ display: "block", fontSize: "11px", fontWeight: "700", color: "#475569", marginBottom: "6px" }}>SUBTITLE PARAGRAPH</label>
                    <textarea
                      rows={3}
                      value={draft.home.hero.subtitle}
                      onChange={(e) => setDraft({ ...draft, home: { ...draft.home, hero: { ...draft.home.hero, subtitle: e.target.value } } })}
                      style={{ width: "100%", padding: "10px", background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "13px" }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "11px", fontWeight: "700", color: "#475569", marginBottom: "6px" }}>PRIMARY BUTTON TEXT</label>
                    <input
                      type="text"
                      value={draft.home.hero.primaryBtnText}
                      onChange={(e) => setDraft({ ...draft, home: { ...draft.home, hero: { ...draft.home.hero, primaryBtnText: e.target.value } } })}
                      style={{ width: "100%", padding: "10px", background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "13px" }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "11px", fontWeight: "700", color: "#475569", marginBottom: "6px" }}>SECONDARY BUTTON TEXT</label>
                    <input
                      type="text"
                      value={draft.home.hero.secondaryBtnText}
                      onChange={(e) => setDraft({ ...draft, home: { ...draft.home, hero: { ...draft.home.hero, secondaryBtnText: e.target.value } } })}
                      style={{ width: "100%", padding: "10px", background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "13px" }}
                    />
                  </div>
                </div>
              </div>

              {/* 2. About Intro Section Card */}
              <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "28px", marginBottom: "24px" }}>
                <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#2563eb", marginBottom: "20px" }}>2. About Intro Section</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "11px", fontWeight: "700", color: "#475569", marginBottom: "6px" }}>SECTION LABEL</label>
                    <input
                      type="text"
                      value={draft.home.aboutIntro.label}
                      onChange={(e) => setDraft({ ...draft, home: { ...draft.home, aboutIntro: { ...draft.home.aboutIntro, label: e.target.value } } })}
                      style={{ width: "100%", padding: "10px", background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "13px" }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "11px", fontWeight: "700", color: "#475569", marginBottom: "6px" }}>BUTTON TEXT</label>
                    <input
                      type="text"
                      value={draft.home.aboutIntro.btnText}
                      onChange={(e) => setDraft({ ...draft, home: { ...draft.home, aboutIntro: { ...draft.home.aboutIntro, btnText: e.target.value } } })}
                      style={{ width: "100%", padding: "10px", background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "13px" }}
                    />
                  </div>
                  <div style={{ gridColumn: "1 / 3" }}>
                    <label style={{ display: "block", fontSize: "11px", fontWeight: "700", color: "#475569", marginBottom: "6px" }}>PARAGRAPH 1</label>
                    <textarea
                      rows={2}
                      value={draft.home.aboutIntro.paragraph1}
                      onChange={(e) => setDraft({ ...draft, home: { ...draft.home, aboutIntro: { ...draft.home.aboutIntro, paragraph1: e.target.value } } })}
                      style={{ width: "100%", padding: "10px", background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "13px" }}
                    />
                  </div>
                  <div style={{ gridColumn: "1 / 3" }}>
                    <label style={{ display: "block", fontSize: "11px", fontWeight: "700", color: "#475569", marginBottom: "6px" }}>PARAGRAPH 2</label>
                    <textarea
                      rows={2}
                      value={draft.home.aboutIntro.paragraph2}
                      onChange={(e) => setDraft({ ...draft, home: { ...draft.home, aboutIntro: { ...draft.home.aboutIntro, paragraph2: e.target.value } } })}
                      style={{ width: "100%", padding: "10px", background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "13px" }}
                    />
                  </div>
                </div>
              </div>

              {/* 3. Selected Work Section Card */}
              <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "28px", marginBottom: "24px" }}>
                <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#2563eb", marginBottom: "20px" }}>3. Selected Work Section</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "11px", fontWeight: "700", color: "#475569", marginBottom: "6px" }}>SECTION LABEL</label>
                    <input
                      type="text"
                      value={draft.home.selectedWork.label}
                      onChange={(e) => setDraft({ ...draft, home: { ...draft.home, selectedWork: { ...draft.home.selectedWork, label: e.target.value } } })}
                      style={{ width: "100%", padding: "10px", background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "13px" }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "11px", fontWeight: "700", color: "#475569", marginBottom: "6px" }}>HEADING TITLE</label>
                    <input
                      type="text"
                      value={draft.home.selectedWork.title}
                      onChange={(e) => setDraft({ ...draft, home: { ...draft.home, selectedWork: { ...draft.home.selectedWork, title: e.target.value } } })}
                      style={{ width: "100%", padding: "10px", background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "13px" }}
                    />
                  </div>
                  <div style={{ gridColumn: "1 / 3" }}>
                    <label style={{ display: "block", fontSize: "11px", fontWeight: "700", color: "#475569", marginBottom: "6px" }}>INTRO PARAGRAPH</label>
                    <textarea
                      rows={2}
                      value={draft.home.selectedWork.intro}
                      onChange={(e) => setDraft({ ...draft, home: { ...draft.home, selectedWork: { ...draft.home.selectedWork, intro: e.target.value } } })}
                      style={{ width: "100%", padding: "10px", background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "13px" }}
                    />
                  </div>
                </div>
              </div>

              {/* 4. Process Section Card */}
              <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "28px", marginBottom: "24px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                  <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#2563eb", margin: 0 }}>4. Process Section</h3>
                  <button
                    type="button"
                    onClick={() => {
                      const newSteps = [...draft.home.process.steps, { n: `0${draft.home.process.steps.length + 1}`, t: "NEW STEP", d: "Step description..." }];
                      setDraft({ ...draft, home: { ...draft.home, process: { ...draft.home.process, steps: newSteps } } });
                    }}
                    style={{ padding: "6px 12px", background: "#0f172a", color: "#fff", border: "none", borderRadius: "6px", fontSize: "11px", fontWeight: "700", cursor: "pointer" }}
                  >
                    + Add Process Step
                  </button>
                </div>
                {draft.home.process.steps.map((st, idx) => (
                  <div key={idx} style={{ display: "grid", gridTemplateColumns: "60px 1fr 2fr 40px", gap: "12px", marginBottom: "12px", alignItems: "center" }}>
                    <input
                      type="text"
                      value={st.n}
                      onChange={(e) => {
                        const newS = [...draft.home.process.steps];
                        newS[idx].n = e.target.value;
                        setDraft({ ...draft, home: { ...draft.home, process: { ...draft.home.process, steps: newS } } });
                      }}
                      style={{ padding: "8px", background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "12px" }}
                    />
                    <input
                      type="text"
                      value={st.t}
                      onChange={(e) => {
                        const newS = [...draft.home.process.steps];
                        newS[idx].t = e.target.value;
                        setDraft({ ...draft, home: { ...draft.home, process: { ...draft.home.process, steps: newS } } });
                      }}
                      style={{ padding: "8px", background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "12px" }}
                    />
                    <input
                      type="text"
                      value={st.d}
                      onChange={(e) => {
                        const newS = [...draft.home.process.steps];
                        newS[idx].d = e.target.value;
                        setDraft({ ...draft, home: { ...draft.home, process: { ...draft.home.process, steps: newS } } });
                      }}
                      style={{ padding: "8px", background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "12px" }}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newS = draft.home.process.steps.filter((_, i) => i !== idx);
                        setDraft({ ...draft, home: { ...draft.home, process: { ...draft.home.process, steps: newS } } });
                      }}
                      style={{ padding: "8px", background: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca", borderRadius: "6px", cursor: "pointer" }}
                    >
                      <Trash2 style={{ width: 14, height: 14 }} />
                    </button>
                  </div>
                ))}
              </div>

              {/* 5. Skills & Tools Section Card */}
              <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "28px", marginBottom: "24px" }}>
                <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#2563eb", marginBottom: "20px" }}>5. Skills & Tools Marquee</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "11px", fontWeight: "700", color: "#475569", marginBottom: "6px" }}>TOOLS LIST (COMMA SEPARATED)</label>
                    <input
                      type="text"
                      value={draft.home.skills.tools.join(", ")}
                      onChange={(e) => {
                        const arr = e.target.value.split(",").map((s) => s.trim());
                        setDraft({ ...draft, home: { ...draft.home, skills: { ...draft.home.skills, tools: arr } } });
                      }}
                      style={{ width: "100%", padding: "10px", background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "13px" }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "11px", fontWeight: "700", color: "#475569", marginBottom: "6px" }}>SKILLS LIST (COMMA SEPARATED)</label>
                    <input
                      type="text"
                      value={draft.home.skills.skills.join(", ")}
                      onChange={(e) => {
                        const arr = e.target.value.split(",").map((s) => s.trim());
                        setDraft({ ...draft, home: { ...draft.home, skills: { ...draft.home.skills, skills: arr } } });
                      }}
                      style={{ width: "100%", padding: "10px", background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "13px" }}
                    />
                  </div>
                </div>
              </div>

              {/* 6. Stats Section Card */}
              <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "28px", marginBottom: "24px" }}>
                <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#2563eb", marginBottom: "20px" }}>6. Stats Banner</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "11px", fontWeight: "700", color: "#475569", marginBottom: "6px" }}>STAT 1 NUMBER & LABEL</label>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <input
                        type="text"
                        value={draft.home.stats.stat1Number}
                        onChange={(e) => setDraft({ ...draft, home: { ...draft.home, stats: { ...draft.home.stats, stat1Number: e.target.value } } })}
                        style={{ width: "80px", padding: "8px", background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "12px" }}
                      />
                      <input
                        type="text"
                        value={draft.home.stats.stat1Label}
                        onChange={(e) => setDraft({ ...draft, home: { ...draft.home, stats: { ...draft.home.stats, stat1Label: e.target.value } } })}
                        style={{ flex: 1, padding: "8px", background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "12px" }}
                      />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "11px", fontWeight: "700", color: "#475569", marginBottom: "6px" }}>STAT 2 NUMBER & LABEL</label>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <input
                        type="text"
                        value={draft.home.stats.stat2Number}
                        onChange={(e) => setDraft({ ...draft, home: { ...draft.home, stats: { ...draft.home.stats, stat2Number: e.target.value } } })}
                        style={{ width: "80px", padding: "8px", background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "12px" }}
                      />
                      <input
                        type="text"
                        value={draft.home.stats.stat2Label}
                        onChange={(e) => setDraft({ ...draft, home: { ...draft.home, stats: { ...draft.home.stats, stat2Label: e.target.value } } })}
                        style={{ flex: 1, padding: "8px", background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "12px" }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 7. Services Section Card */}
              <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "28px", marginBottom: "24px" }}>
                <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#2563eb", marginBottom: "20px" }}>7. Services Section</h3>
                {draft.home.services.items.map((serv, idx) => (
                  <div key={idx} style={{ display: "grid", gridTemplateColumns: "60px 1fr 2fr", gap: "12px", marginBottom: "12px" }}>
                    <input
                      type="text"
                      value={serv.n}
                      onChange={(e) => {
                        const newItems = [...draft.home.services.items];
                        newItems[idx].n = e.target.value;
                        setDraft({ ...draft, home: { ...draft.home, services: { ...draft.home.services, items: newItems } } });
                      }}
                      style={{ padding: "8px", background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "12px" }}
                    />
                    <input
                      type="text"
                      value={serv.t}
                      onChange={(e) => {
                        const newItems = [...draft.home.services.items];
                        newItems[idx].t = e.target.value;
                        setDraft({ ...draft, home: { ...draft.home, services: { ...draft.home.services, items: newItems } } });
                      }}
                      style={{ padding: "8px", background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "12px" }}
                    />
                    <input
                      type="text"
                      value={serv.d}
                      onChange={(e) => {
                        const newItems = [...draft.home.services.items];
                        newItems[idx].d = e.target.value;
                        setDraft({ ...draft, home: { ...draft.home, services: { ...draft.home.services, items: newItems } } });
                      }}
                      style={{ padding: "8px", background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "12px" }}
                    />
                  </div>
                ))}
              </div>

              {/* 8. FAQ Section Card */}
              <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "28px", marginBottom: "24px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                  <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#2563eb", margin: 0 }}>8. FAQ Section</h3>
                  <button
                    type="button"
                    onClick={() => {
                      const newF = [...draft.home.faq.items, { q: "NEW QUESTION?", a: "Answer here..." }];
                      setDraft({ ...draft, home: { ...draft.home, faq: { ...draft.home.faq, items: newF } } });
                    }}
                    style={{ padding: "6px 12px", background: "#0f172a", color: "#fff", border: "none", borderRadius: "6px", fontSize: "11px", fontWeight: "700", cursor: "pointer" }}
                  >
                    + Add FAQ
                  </button>
                </div>
                {draft.home.faq.items.map((fq, idx) => (
                  <div key={idx} style={{ marginBottom: "16px", background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "8px", padding: "16px" }}>
                    <div style={{ display: "flex", gap: "10px", marginBottom: "8px" }}>
                      <input
                        type="text"
                        value={fq.q}
                        onChange={(e) => {
                          const newF = [...draft.home.faq.items];
                          newF[idx].q = e.target.value;
                          setDraft({ ...draft, home: { ...draft.home, faq: { ...draft.home.faq, items: newF } } });
                        }}
                        style={{ flex: 1, padding: "8px", background: "#ffffff", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "13px", fontWeight: "700" }}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const newF = draft.home.faq.items.filter((_, i) => i !== idx);
                          setDraft({ ...draft, home: { ...draft.home, faq: { ...draft.home.faq, items: newF } } });
                        }}
                        style={{ padding: "8px", background: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca", borderRadius: "6px", cursor: "pointer" }}
                      >
                        <Trash2 style={{ width: 14, height: 14 }} />
                      </button>
                    </div>
                    <textarea
                      rows={2}
                      value={fq.a}
                      onChange={(e) => {
                        const newF = [...draft.home.faq.items];
                        newF[idx].a = e.target.value;
                        setDraft({ ...draft, home: { ...draft.home, faq: { ...draft.home.faq, items: newF } } });
                      }}
                      style={{ width: "100%", padding: "8px", background: "#ffffff", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "12px" }}
                    />
                  </div>
                ))}
              </div>

              {/* 9. Contact Teaser Card */}
              <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "28px", marginBottom: "24px" }}>
                <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#2563eb", marginBottom: "20px" }}>9. Contact Teaser Section</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "11px", fontWeight: "700", color: "#475569", marginBottom: "6px" }}>HEADING LINE 1</label>
                    <input
                      type="text"
                      value={draft.home.contactTeaser.titleLine1}
                      onChange={(e) => setDraft({ ...draft, home: { ...draft.home, contactTeaser: { ...draft.home.contactTeaser, titleLine1: e.target.value } } })}
                      style={{ width: "100%", padding: "10px", background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "13px" }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "11px", fontWeight: "700", color: "#475569", marginBottom: "6px" }}>BUTTON TEXT</label>
                    <input
                      type="text"
                      value={draft.home.contactTeaser.btnText}
                      onChange={(e) => setDraft({ ...draft, home: { ...draft.home, contactTeaser: { ...draft.home.contactTeaser, btnText: e.target.value } } })}
                      style={{ width: "100%", padding: "10px", background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "13px" }}
                    />
                  </div>
                </div>
              </div>

              {/* 10. Footer Section Card */}
              <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "28px" }}>
                <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#2563eb", marginBottom: "20px" }}>10. Footer Section</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "11px", fontWeight: "700", color: "#475569", marginBottom: "6px" }}>BRAND NAME</label>
                    <input
                      type="text"
                      value={draft.home.footer.brandName}
                      onChange={(e) => setDraft({ ...draft, home: { ...draft.home, footer: { ...draft.home.footer, brandName: e.target.value } } })}
                      style={{ width: "100%", padding: "10px", background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "13px" }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "11px", fontWeight: "700", color: "#475569", marginBottom: "6px" }}>COPYRIGHT TEXT</label>
                    <input
                      type="text"
                      value={draft.home.footer.copyright}
                      onChange={(e) => setDraft({ ...draft, home: { ...draft.home, footer: { ...draft.home.footer, copyright: e.target.value } } })}
                      style={{ width: "100%", padding: "10px", background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "13px" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 3: ABOUT PAGE CMS */}
          {activeTab === "about" && (
            <div>
              <div style={{ marginBottom: "28px" }}>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "28px", fontWeight: "700", color: "#0f172a", margin: 0 }}>
                  ABOUT PAGE CMS (ALL SECTIONS)
                </h2>
                <p style={{ fontSize: "13px", color: "#64748b", marginTop: "4px" }}>
                  Manage biography, portrait image upload from desktop, lede text, philosophy, and experience timeline.
                </p>
              </div>

              {/* 1. Header & Title Section */}
              <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "28px", marginBottom: "24px" }}>
                <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#2563eb", marginBottom: "20px" }}>1. Page Header & Subtitle</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "11px", fontWeight: "700", color: "#475569", marginBottom: "6px" }}>PAGE TITLE</label>
                    <input
                      type="text"
                      value={draft.aboutPage.title}
                      onChange={(e) => setDraft({ ...draft, aboutPage: { ...draft.aboutPage, title: e.target.value } })}
                      style={{ width: "100%", padding: "10px", background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "13px" }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "11px", fontWeight: "700", color: "#475569", marginBottom: "6px" }}>SUBTITLE / ROLE</label>
                    <input
                      type="text"
                      value={draft.aboutPage.subtitle}
                      onChange={(e) => setDraft({ ...draft, aboutPage: { ...draft.aboutPage, subtitle: e.target.value } })}
                      style={{ width: "100%", padding: "10px", background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "13px" }}
                    />
                  </div>
                </div>
              </div>

              {/* 2. Portrait Card & Bio Section */}
              <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "28px", marginBottom: "24px" }}>
                <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#2563eb", marginBottom: "20px" }}>2. Portrait Card & Biography</h3>

                <ImageUploader
                  label="PORTRAIT IMAGE (UPLOAD FROM COMPUTER DESKTOP)"
                  value={draft.aboutPage.portraitImage}
                  onChange={(url) => setDraft({ ...draft, aboutPage: { ...draft.aboutPage, portraitImage: url } })}
                />

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginTop: "20px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "11px", fontWeight: "700", color: "#475569", marginBottom: "6px" }}>SECTION LABEL</label>
                    <input
                      type="text"
                      value={draft.aboutPage.sectionLabel}
                      onChange={(e) => setDraft({ ...draft, aboutPage: { ...draft.aboutPage, sectionLabel: e.target.value } })}
                      style={{ width: "100%", padding: "10px", background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "13px" }}
                    />
                  </div>
                  <div style={{ gridColumn: "1 / 3" }}>
                    <label style={{ display: "block", fontSize: "11px", fontWeight: "700", color: "#475569", marginBottom: "6px" }}>LEDE PARAGRAPH (HIGHLIGHT)</label>
                    <textarea
                      rows={2}
                      value={draft.aboutPage.ledeText}
                      onChange={(e) => setDraft({ ...draft, aboutPage: { ...draft.aboutPage, ledeText: e.target.value } })}
                      style={{ width: "100%", padding: "10px", background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "13px" }}
                    />
                  </div>
                  <div style={{ gridColumn: "1 / 3" }}>
                    <label style={{ display: "block", fontSize: "11px", fontWeight: "700", color: "#475569", marginBottom: "6px" }}>BIOGRAPHY PARAGRAPH 1</label>
                    <textarea
                      rows={3}
                      value={draft.aboutPage.paragraph1}
                      onChange={(e) => setDraft({ ...draft, aboutPage: { ...draft.aboutPage, paragraph1: e.target.value } })}
                      style={{ width: "100%", padding: "10px", background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "13px" }}
                    />
                  </div>
                  <div style={{ gridColumn: "1 / 3" }}>
                    <label style={{ display: "block", fontSize: "11px", fontWeight: "700", color: "#475569", marginBottom: "6px" }}>BIOGRAPHY PARAGRAPH 2</label>
                    <textarea
                      rows={3}
                      value={draft.aboutPage.paragraph2}
                      onChange={(e) => setDraft({ ...draft, aboutPage: { ...draft.aboutPage, paragraph2: e.target.value } })}
                      style={{ width: "100%", padding: "10px", background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "13px" }}
                    />
                  </div>
                </div>
              </div>

              {/* 3. Design Philosophy Section Card */}
              <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "28px", marginBottom: "24px" }}>
                <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#2563eb", marginBottom: "20px" }}>3. Design Philosophy</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "11px", fontWeight: "700", color: "#475569", marginBottom: "6px" }}>PHILOSOPHY TITLE</label>
                    <input
                      type="text"
                      value={draft.aboutPage.philosophyTitle}
                      onChange={(e) => setDraft({ ...draft, aboutPage: { ...draft.aboutPage, philosophyTitle: e.target.value } })}
                      style={{ width: "100%", padding: "10px", background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "13px" }}
                    />
                  </div>
                  <div style={{ gridColumn: "1 / 3" }}>
                    <label style={{ display: "block", fontSize: "11px", fontWeight: "700", color: "#475569", marginBottom: "6px" }}>PHILOSOPHY STATEMENT</label>
                    <textarea
                      rows={2}
                      value={draft.aboutPage.philosophyText}
                      onChange={(e) => setDraft({ ...draft, aboutPage: { ...draft.aboutPage, philosophyText: e.target.value } })}
                      style={{ width: "100%", padding: "10px", background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "13px" }}
                    />
                  </div>
                </div>
              </div>

              {/* 4. Experience Timeline Section Card */}
              <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "28px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                  <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#2563eb", margin: 0 }}>4. Experience Timeline</h3>
                  <button
                    type="button"
                    onClick={() => {
                      const newExp = [...(draft.aboutPage.experiences || []), { year: "2026", company: "NEW COMPANY", role: "UI/UX DESIGNER", description: "Role description..." }];
                      setDraft({ ...draft, aboutPage: { ...draft.aboutPage, experiences: newExp } });
                    }}
                    style={{ padding: "6px 14px", background: "#0f172a", color: "#fff", border: "none", borderRadius: "6px", fontSize: "11px", fontWeight: "700", cursor: "pointer" }}
                  >
                    + Add Experience Row
                  </button>
                </div>

                {(draft.aboutPage.experiences || []).map((exp, idx) => (
                  <div key={idx} style={{ marginBottom: "16px", background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "8px", padding: "16px" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "80px 1fr 1fr 40px", gap: "12px", marginBottom: "8px" }}>
                      <input
                        type="text"
                        placeholder="Year"
                        value={exp.year}
                        onChange={(e) => {
                          const newExp = [...draft.aboutPage.experiences];
                          newExp[idx].year = e.target.value;
                          setDraft({ ...draft, aboutPage: { ...draft.aboutPage, experiences: newExp } });
                        }}
                        style={{ padding: "8px", background: "#ffffff", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "12px", fontWeight: "700" }}
                      />
                      <input
                        type="text"
                        placeholder="Company"
                        value={exp.company}
                        onChange={(e) => {
                          const newExp = [...draft.aboutPage.experiences];
                          newExp[idx].company = e.target.value;
                          setDraft({ ...draft, aboutPage: { ...draft.aboutPage, experiences: newExp } });
                        }}
                        style={{ padding: "8px", background: "#ffffff", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "12px", fontWeight: "700" }}
                      />
                      <input
                        type="text"
                        placeholder="Role"
                        value={exp.role}
                        onChange={(e) => {
                          const newExp = [...draft.aboutPage.experiences];
                          newExp[idx].role = e.target.value;
                          setDraft({ ...draft, aboutPage: { ...draft.aboutPage, experiences: newExp } });
                        }}
                        style={{ padding: "8px", background: "#ffffff", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "12px" }}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const newExp = draft.aboutPage.experiences.filter((_, i) => i !== idx);
                          setDraft({ ...draft, aboutPage: { ...draft.aboutPage, experiences: newExp } });
                        }}
                        style={{ padding: "8px", background: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca", borderRadius: "6px", cursor: "pointer" }}
                      >
                        <Trash2 style={{ width: 14, height: 14 }} />
                      </button>
                    </div>
                    <textarea
                      rows={2}
                      placeholder="Description"
                      value={exp.description}
                      onChange={(e) => {
                        const newExp = [...draft.aboutPage.experiences];
                        newExp[idx].description = e.target.value;
                        setDraft({ ...draft, aboutPage: { ...draft.aboutPage, experiences: newExp } });
                      }}
                      style={{ width: "100%", padding: "8px", background: "#ffffff", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "12px" }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION 4: WORK PAGE CMS */}
          {activeTab === "work" && (
            <div>
              <div style={{ marginBottom: "28px" }}>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "28px", fontWeight: "700", color: "#0f172a", margin: 0 }}>
                  WORK PAGE CMS
                </h2>
                <p style={{ fontSize: "13px", color: "#64748b", marginTop: "4px" }}>
                  Configure header copy for the main Work Archive page.
                </p>
              </div>

              <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "28px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "11px", fontWeight: "700", color: "#475569", marginBottom: "6px" }}>WORK PAGE TITLE</label>
                    <input
                      type="text"
                      value={draft.workPage.title}
                      onChange={(e) => setDraft({ ...draft, workPage: { ...draft.workPage, title: e.target.value } })}
                      style={{ width: "100%", padding: "10px", background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "13px" }}
                    />
                  </div>
                  <div style={{ gridColumn: "1 / 3" }}>
                    <label style={{ display: "block", fontSize: "11px", fontWeight: "700", color: "#475569", marginBottom: "6px" }}>INTRO PARAGRAPH</label>
                    <textarea
                      rows={2}
                      value={draft.workPage.intro}
                      onChange={(e) => setDraft({ ...draft, workPage: { ...draft.workPage, intro: e.target.value } })}
                      style={{ width: "100%", padding: "10px", background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "13px" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 5: CONTACT PAGE CMS */}
          {activeTab === "contact" && (
            <div>
              <div style={{ marginBottom: "28px" }}>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "28px", fontWeight: "700", color: "#0f172a", margin: 0 }}>
                  CONTACT PAGE & MESSAGES LOG
                </h2>
                <p style={{ fontSize: "13px", color: "#64748b", marginTop: "4px" }}>
                  Edit contact details and review submitted form entries.
                </p>
              </div>

              <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "28px", marginBottom: "24px" }}>
                <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#2563eb", marginBottom: "16px" }}>Contact Details</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "11px", fontWeight: "700", color: "#475569", marginBottom: "6px" }}>EMAIL ADDRESS</label>
                    <input
                      type="text"
                      value={draft.contactPage.email}
                      onChange={(e) => setDraft({ ...draft, contactPage: { ...draft.contactPage, email: e.target.value } })}
                      style={{ width: "100%", padding: "10px", background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "13px" }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "11px", fontWeight: "700", color: "#475569", marginBottom: "6px" }}>PHONE NUMBER</label>
                    <input
                      type="text"
                      value={draft.contactPage.phone}
                      onChange={(e) => setDraft({ ...draft, contactPage: { ...draft.contactPage, phone: e.target.value } })}
                      style={{ width: "100%", padding: "10px", background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "13px" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 6: CASE STUDY MANAGER */}
          {activeTab === "casestudies" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px" }}>
                <div>
                  <h2 style={{ fontFamily: "var(--font-display)", fontSize: "28px", fontWeight: "700", color: "#0f172a", margin: 0 }}>
                    CASE STUDY MANAGER
                  </h2>
                  <p style={{ fontSize: "13px", color: "#64748b", marginTop: "4px" }}>
                    Full dynamic control over case study content, gallery image uploads, reordering, and project details.
                  </p>
                </div>
                <button
                  onClick={handleAddProject}
                  style={{
                    padding: "10px 18px",
                    background: "#0f172a",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "12px",
                    fontWeight: "700",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <Plus style={{ width: 16, height: 16 }} /> Create New Project
                </button>
              </div>

              {/* Project Select List & Reorder */}
              <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "20px", marginBottom: "28px" }}>
                <span style={{ fontSize: "11px", fontWeight: "700", color: "#64748b", letterSpacing: "0.05em", textTransform: "uppercase", display: "block", marginBottom: "12px" }}>
                  SELECT PROJECT TO EDIT:
                </span>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {draft.projects.map((p, idx) => (
                    <div
                      key={p.slug}
                      onClick={() => setEditingProjectSlug(p.slug)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "12px 16px",
                        background: activeProject.slug === p.slug ? "#eff6ff" : "#f8fafc",
                        border: activeProject.slug === p.slug ? "1px solid #3b82f6" : "1px solid #cbd5e1",
                        borderRadius: "8px",
                        cursor: "pointer",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <span style={{ fontFamily: "var(--font-display)", fontWeight: "700", color: "#2563eb" }}>{p.number}</span>
                        <img src={p.image} alt={p.title} style={{ width: 40, height: 28, objectFit: "cover", borderRadius: 4 }} />
                        <strong style={{ fontSize: "14px", color: "#0f172a" }}>{p.title}</strong>
                        <span style={{ fontSize: "11px", color: "#64748b" }}>({p.category})</span>
                      </div>

                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }} onClick={(e) => e.stopPropagation()}>
                        <button
                          disabled={idx === 0}
                          onClick={() => moveProject(idx, "up")}
                          style={{ padding: "4px 8px", background: "#ffffff", border: "1px solid #cbd5e1", borderRadius: "4px", cursor: "pointer" }}
                        >
                          <ArrowUp style={{ width: 14, height: 14 }} />
                        </button>
                        <button
                          disabled={idx === draft.projects.length - 1}
                          onClick={() => moveProject(idx, "down")}
                          style={{ padding: "4px 8px", background: "#ffffff", border: "1px solid #cbd5e1", borderRadius: "4px", cursor: "pointer" }}
                        >
                          <ArrowDown style={{ width: 14, height: 14 }} />
                        </button>
                        <button
                          onClick={() => handleDeleteProject(p.slug)}
                          style={{ padding: "4px 8px", background: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca", borderRadius: "4px", cursor: "pointer" }}
                        >
                          <Trash2 style={{ width: 14, height: 14 }} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Detailed Case Study Form */}
              {activeProject && (
                <div style={{ background: "#ffffff", border: "1px solid #2563eb", borderRadius: "12px", padding: "32px", boxShadow: "0 4px 12px rgba(37, 99, 235, 0.05)" }}>
                  <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#0f172a", marginBottom: "20px" }}>
                    EDITING CASE STUDY: <span style={{ color: "#2563eb" }}>{activeProject.title}</span>
                  </h3>

                  {/* Thumbnail Image Upload */}
                  <ImageUploader
                    label="MAIN COVER / THUMBNAIL IMAGE (UPLOAD FROM DESKTOP)"
                    value={activeProject.image}
                    onChange={(url) => updateProjectField(activeProject.slug, "image", url)}
                  />

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginTop: "20px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "11px", fontWeight: "700", color: "#475569", marginBottom: "6px" }}>TITLE *</label>
                      <input
                        type="text"
                        value={activeProject.title}
                        onChange={(e) => updateProjectField(activeProject.slug, "title", e.target.value)}
                        style={{ width: "100%", padding: "10px", background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "13px" }}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "11px", fontWeight: "700", color: "#475569", marginBottom: "6px" }}>DISCIPLINE / CATEGORY *</label>
                      <input
                        type="text"
                        value={activeProject.category}
                        onChange={(e) => updateProjectField(activeProject.slug, "category", e.target.value)}
                        style={{ width: "100%", padding: "10px", background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "13px" }}
                      />
                    </div>

                    <div style={{ gridColumn: "1 / 3" }}>
                      <label style={{ display: "block", fontSize: "11px", fontWeight: "700", color: "#475569", marginBottom: "6px" }}>OVERVIEW DESCRIPTION</label>
                      <textarea
                        rows={3}
                        value={activeProject.description}
                        onChange={(e) => updateProjectField(activeProject.slug, "description", e.target.value)}
                        style={{ width: "100%", padding: "10px", background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "13px" }}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "11px", fontWeight: "700", color: "#475569", marginBottom: "6px" }}>CHALLENGE STATEMENT</label>
                      <textarea
                        rows={2}
                        value={activeProject.challenge}
                        onChange={(e) => updateProjectField(activeProject.slug, "challenge", e.target.value)}
                        style={{ width: "100%", padding: "10px", background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "13px" }}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "11px", fontWeight: "700", color: "#475569", marginBottom: "6px" }}>OBJECTIVE STATEMENT</label>
                      <textarea
                        rows={2}
                        value={activeProject.objective}
                        onChange={(e) => updateProjectField(activeProject.slug, "objective", e.target.value)}
                        style={{ width: "100%", padding: "10px", background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "13px" }}
                      />
                    </div>

                    <div style={{ gridColumn: "1 / 3" }}>
                      <label style={{ display: "block", fontSize: "11px", fontWeight: "700", color: "#475569", marginBottom: "6px" }}>FINAL RESULT</label>
                      <textarea
                        rows={2}
                        value={activeProject.result}
                        onChange={(e) => updateProjectField(activeProject.slug, "result", e.target.value)}
                        style={{ width: "100%", padding: "10px", background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "13px" }}
                      />
                    </div>
                  </div>

                  {/* Gallery Images Management */}
                  <div style={{ marginTop: "24px", paddingTop: "20px", borderTop: "1px solid #e2e8f0" }}>
                    <h4 style={{ fontSize: "14px", fontWeight: "700", color: "#0f172a", marginBottom: "12px" }}>
                      CASE STUDY GALLERY IMAGES
                    </h4>
                    <p style={{ fontSize: "12px", color: "#64748b", marginBottom: "16px" }}>
                      Add extra screenshot slides or mockups to display in the project case study gallery:
                    </p>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: "12px", marginBottom: "16px" }}>
                      {(activeProject.galleryImages || [activeProject.image]).map((gImg, gIdx) => (
                        <div key={gIdx} style={{ position: "relative", borderRadius: "8px", overflow: "hidden", border: "1px solid #cbd5e1" }}>
                          <img src={gImg} alt="Gallery item" style={{ width: "100%", height: "90px", objectFit: "cover" }} />
                          <button
                            type="button"
                            onClick={() => {
                              const newG = (activeProject.galleryImages || []).filter((_, i) => i !== gIdx);
                              updateProjectField(activeProject.slug, "galleryImages", newG);
                            }}
                            style={{ position: "absolute", top: 4, right: 4, background: "#dc2626", color: "#fff", border: "none", borderRadius: "50%", width: 22, height: 22, cursor: "pointer" }}
                          >
                            <X style={{ width: 12, height: 12 }} />
                          </button>
                        </div>
                      ))}
                    </div>

                    <ImageUploader
                      label="ADD NEW GALLERY IMAGE (UPLOAD FROM COMPUTER DESKTOP)"
                      value=""
                      onChange={(url) => {
                        if (url) {
                          const currentG = activeProject.galleryImages || [activeProject.image];
                          updateProjectField(activeProject.slug, "galleryImages", [...currentG, url]);
                        }
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* SECTION 7: MAINTENANCE MODE CONTROLS */}
          {activeTab === "maintenance" && (
            <div>
              <div style={{ marginBottom: "28px" }}>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "28px", fontWeight: "700", color: "#0f172a", margin: 0 }}>
                  WEBSITE MAINTENANCE MODE
                </h2>
                <p style={{ fontSize: "13px", color: "#64748b", marginTop: "4px" }}>
                  Toggle global website maintenance or individual inner page maintenance screens.
                </p>
              </div>

              {/* Global Maintenance Mode Box */}
              <div
                style={{
                  background: draft.maintenance.global ? "#fef2f2" : "#ffffff",
                  border: draft.maintenance.global ? "2px solid #ef4444" : "1px solid #e2e8f0",
                  borderRadius: "12px",
                  padding: "28px",
                  marginBottom: "32px",
                  boxShadow: "0 4px 6px -1px rgba(0,0,0,0.02)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                      <Wrench style={{ width: 22, height: 22, color: draft.maintenance.global ? "#dc2626" : "#475569" }} />
                      <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#0f172a", margin: 0 }}>
                        GLOBAL WEBSITE MAINTENANCE MODE
                      </h3>
                    </div>
                    <p style={{ fontSize: "13px", color: "#64748b", margin: 0 }}>
                      When enabled, all visitors will see a professional maintenance page across the entire website. Admin users still have full access to this Admin Panel.
                    </p>
                  </div>

                  <button
                    onClick={() => setDraft({ ...draft, maintenance: { ...draft.maintenance, global: !draft.maintenance.global } })}
                    style={{
                      padding: "12px 24px",
                      background: draft.maintenance.global ? "#dc2626" : "#16a34a",
                      color: "#ffffff",
                      border: "none",
                      borderRadius: "8px",
                      fontSize: "13px",
                      fontWeight: "700",
                      cursor: "pointer",
                    }}
                  >
                    {draft.maintenance.global ? "DISABLE GLOBAL MAINTENANCE" : "ENABLE GLOBAL MAINTENANCE"}
                  </button>
                </div>
              </div>

              {/* Page-Specific Maintenance Mode Toggles */}
              <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "28px" }}>
                <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#0f172a", marginBottom: "16px" }}>
                  PER-PAGE MAINTENANCE TOGGLES
                </h3>
                <p style={{ fontSize: "13px", color: "#64748b", marginBottom: "24px" }}>
                  Enable maintenance mode on specific inner pages while keeping the rest of the website online.
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {[
                    { key: "home", title: "Home Page Maintenance Mode" },
                    { key: "about", title: "About Page Maintenance Mode" },
                    { key: "work", title: "Work Portfolio Page Maintenance Mode" },
                    { key: "contact", title: "Contact Page Maintenance Mode" },
                    { key: "casestudy", title: "Case Study Page Maintenance Mode" },
                  ].map((p) => {
                    const isPageOn = (draft.maintenance.pages as any)[p.key];
                    return (
                      <div
                        key={p.key}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "16px 20px",
                          background: isPageOn ? "#fff1f2" : "#f8fafc",
                          border: isPageOn ? "1px solid #fecaca" : "1px solid #cbd5e1",
                          borderRadius: "8px",
                        }}
                      >
                        <strong style={{ fontSize: "14px", color: "#0f172a" }}>{p.title}</strong>
                        <button
                          onClick={() =>
                            setDraft({
                              ...draft,
                              maintenance: {
                                ...draft.maintenance,
                                pages: { ...draft.maintenance.pages, [p.key]: !isPageOn },
                              },
                            })
                          }
                          style={{
                            padding: "8px 16px",
                            background: isPageOn ? "#dc2626" : "#0f172a",
                            color: "#ffffff",
                            border: "none",
                            borderRadius: "6px",
                            fontSize: "12px",
                            fontWeight: "700",
                            cursor: "pointer",
                          }}
                        >
                          {isPageOn ? "TURN OFF" : "TURN ON MAINTENANCE"}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
