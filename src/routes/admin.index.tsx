import { useState, useEffect } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useAdminAuth } from "@/lib/authStore";
import { useProjects, useMessages, saveStoredProjects, resetStoredProjects, type ContactMessage } from "@/lib/projectStore";
import { type Project } from "@/data/projects";
import { Plus, Edit2, Trash2, RefreshCw, Eye, FolderKanban, MessageSquare, X, Shield, LogOut, ExternalLink, LayoutDashboard, Check } from "lucide-react";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [{ title: "Admin Dashboard — Muhammed K Portfolio" }],
  }),
  component: AdminDashboardPage,
});

function AdminDashboardPage() {
  const [mounted, setMounted] = useState(false);
  const { authenticated, logout } = useAdminAuth();
  const navigate = useNavigate();
  const projects = useProjects();
  const messages = useMessages();

  const [activeTab, setActiveTab] = useState<"projects" | "messages">("projects");
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  // Form states
  const [formData, setFormData] = useState<Partial<Project>>({
    title: "",
    category: "",
    description: "",
    tech: ["Figma", "UI/UX Design", "HTML", "CSS", "JavaScript"],
    image: "",
    accent: "blue",
    challenge: "",
    objective: "",
    result: "",
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div style={{ minHeight: "100vh", background: "#f8fafc", display: "grid", placeItems: "center" }}>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "12px", fontWeight: "700", color: "#64748b", letterSpacing: "0.1em" }}>
          [ INITIALIZING CONTROL PANEL ]
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
          <p style={{ fontSize: "13px", color: "#64748b", marginBottom: "24px" }}>You must log in to view and manage portfolio projects.</p>
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

  const handleOpenAdd = () => {
    setFormData({
      slug: "new-project-" + Date.now(),
      number: String(projects.length + 1).padStart(2, "0"),
      title: "",
      category: "UI/UX Design & Development",
      description: "",
      tech: ["Figma", "UI/UX Design", "React", "TypeScript", "Tailwind CSS"],
      image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
      dimensions: [1600, 900],
      accent: "blue",
      challenge: "Define a clear visual flow and responsive hierarchy.",
      objective: "Deliver an intuitive user interface and smooth front-end experience.",
      result: "A highly polished, responsive digital experience.",
    });
    setEditingProject(null);
    setIsAddingNew(true);
  };

  const handleOpenEdit = (p: Project) => {
    setFormData({ ...p });
    setEditingProject(p);
    setIsAddingNew(false);
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.category) {
      alert("Please enter a title and category.");
      return;
    }

    const slug = formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const updatedProject: Project = {
      slug: slug,
      number: formData.number || String(projects.length + 1).padStart(2, "0"),
      title: formData.title.toUpperCase(),
      category: formData.category,
      description: formData.description || "",
      tech: Array.isArray(formData.tech) ? formData.tech : String(formData.tech).split(",").map((s) => s.trim()),
      image: formData.image || "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
      dimensions: formData.dimensions || [1600, 900],
      accent: (formData.accent as "blue" | "lime" | "dark") || "blue",
      challenge: formData.challenge || "",
      objective: formData.objective || "",
      result: formData.result || "",
    };

    let newProjectsList: Project[];
    if (editingProject) {
      newProjectsList = projects.map((p) => (p.slug === editingProject.slug ? updatedProject : p));
    } else {
      newProjectsList = [...projects, updatedProject];
    }

    saveStoredProjects(newProjectsList);
    setIsAddingNew(false);
    setEditingProject(null);
  };

  const handleDeleteProject = (slug: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      const updated = projects.filter((p) => p.slug !== slug);
      saveStoredProjects(updated);
    }
  };

  const handleResetProjects = () => {
    if (confirm("Reset all projects back to original default works?")) {
      resetStoredProjects();
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", color: "#0f172a", fontFamily: "var(--font-sans)" }}>
      {/* Light Admin Top Bar */}
      <header
        style={{
          background: "#ffffff",
          borderBottom: "1px solid #e2e8f0",
          padding: "16px 32px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "sticky",
          top: 0,
          zIndex: 50,
          boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#0f172a", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <LayoutDashboard style={{ width: 18, height: 18 }} />
          </div>
          <div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "16px", fontWeight: "700", color: "#0f172a", margin: 0, lineHeight: 1.2 }}>
              MUHAMMED K <span style={{ color: "#2563eb", fontWeight: "600", fontSize: "13px" }}>ADMIN</span>
            </h1>
            <span style={{ fontSize: "10px", fontWeight: "600", color: "#64748b" }}>PORTFOLIO CONTROL CENTER</span>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
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
              padding: "8px 14px",
              background: "#f1f5f9",
              borderRadius: "6px",
              transition: "background 0.2s",
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
              borderRadius: "6px",
              padding: "8px 14px",
              cursor: "pointer",
            }}
          >
            <LogOut style={{ width: 14, height: 14 }} /> Logout
          </button>
        </div>
      </header>

      {/* Main Admin Dashboard Body */}
      <main style={{ maxWidth: "1280px", margin: "0 auto", padding: "32px 24px 60px" }}>
        {/* Metric Cards Banner */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px", marginBottom: "32px" }}>
          <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "24px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.02)" }}>
            <span style={{ fontSize: "11px", fontWeight: "700", color: "#64748b", letterSpacing: "0.05em", textTransform: "uppercase" }}>PORTFOLIO WORKS</span>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "36px", fontWeight: "700", color: "#0f172a", marginTop: "8px", margin: "8px 0 0" }}>
              {String(projects.length).padStart(2, "0")}
            </h3>
          </div>

          <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "24px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.02)" }}>
            <span style={{ fontSize: "11px", fontWeight: "700", color: "#64748b", letterSpacing: "0.05em", textTransform: "uppercase" }}>CONTACT MESSAGES</span>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "36px", fontWeight: "700", color: "#2563eb", marginTop: "8px", margin: "8px 0 0" }}>
              {String(messages.length).padStart(2, "0")}
            </h3>
          </div>

          <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "24px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.02)" }}>
            <span style={{ fontSize: "11px", fontWeight: "700", color: "#64748b", letterSpacing: "0.05em", textTransform: "uppercase" }}>SYSTEM STATUS</span>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "16px" }}>
              <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#22c55e" }} />
              <span style={{ fontSize: "14px", fontWeight: "700", color: "#15803d" }}>ONLINE & READY</span>
            </div>
          </div>

          <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "20px", display: "flex", flexDirection: "column", justifyContent: "center", gap: "10px" }}>
            <button
              onClick={handleOpenAdd}
              style={{
                width: "100%",
                padding: "10px 16px",
                background: "#0f172a",
                color: "#ffffff",
                border: "none",
                borderRadius: "8px",
                fontSize: "12px",
                fontWeight: "700",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
              }}
            >
              <Plus style={{ width: 16, height: 16 }} /> ADD NEW PROJECT
            </button>
            <button
              onClick={handleResetProjects}
              style={{
                width: "100%",
                padding: "8px 16px",
                background: "#f1f5f9",
                color: "#475569",
                border: "1px solid #cbd5e1",
                borderRadius: "8px",
                fontSize: "11px",
                fontWeight: "600",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
              }}
            >
              <RefreshCw style={{ width: 12, height: 12 }} /> Reset Defaults
            </button>
          </div>
        </div>

        {/* Tab Selection */}
        <div style={{ display: "flex", gap: "12px", borderBottom: "1px solid #e2e8f0", marginBottom: "28px", paddingBottom: "12px" }}>
          <button
            onClick={() => setActiveTab("projects")}
            style={{
              padding: "10px 20px",
              borderRadius: "8px",
              border: "none",
              background: activeTab === "projects" ? "#0f172a" : "#f1f5f9",
              color: activeTab === "projects" ? "#ffffff" : "#475569",
              fontSize: "13px",
              fontWeight: "700",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              transition: "all 0.2s",
            }}
          >
            <FolderKanban style={{ width: 16, height: 16 }} /> Managed Projects ({projects.length})
          </button>

          <button
            onClick={() => setActiveTab("messages")}
            style={{
              padding: "10px 20px",
              borderRadius: "8px",
              border: "none",
              background: activeTab === "messages" ? "#0f172a" : "#f1f5f9",
              color: activeTab === "messages" ? "#ffffff" : "#475569",
              fontSize: "13px",
              fontWeight: "700",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              transition: "all 0.2s",
            }}
          >
            <MessageSquare style={{ width: 16, height: 16 }} /> Contact Messages ({messages.length})
          </button>
        </div>

        {/* Add/Edit Project Form Modal Drawer */}
        {(isAddingNew || editingProject) && (
          <div
            style={{
              background: "#ffffff",
              border: "1px solid #2563eb",
              borderRadius: "16px",
              padding: "32px",
              marginBottom: "40px",
              boxShadow: "0 10px 30px -5px rgba(37, 99, 235, 0.1)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: "700", color: "#0f172a", margin: 0 }}>
                {isAddingNew ? "ADD NEW PORTFOLIO PROJECT" : `EDIT PROJECT: ${editingProject?.title}`}
              </h3>
              <button
                onClick={() => {
                  setIsAddingNew(false);
                  setEditingProject(null);
                }}
                style={{ background: "#f1f5f9", border: "none", borderRadius: "50%", width: "32px", height: "32px", display: "grid", placeItems: "center", color: "#475569", cursor: "pointer" }}
              >
                <X style={{ width: 18, height: 18 }} />
              </button>
            </div>

            <form onSubmit={handleSaveForm} style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px" }}>
              <div>
                <label style={{ display: "block", fontSize: "11px", fontWeight: "700", color: "#475569", marginBottom: "6px" }}>PROJECT TITLE *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. RONARAI KSA"
                  style={{ width: "100%", padding: "10px 14px", background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "6px", color: "#0f172a", fontSize: "13px" }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "11px", fontWeight: "700", color: "#475569", marginBottom: "6px" }}>CATEGORY / DISCIPLINE *</label>
                <input
                  type="text"
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="e.g. Restaurant Website / UI/UX Design"
                  style={{ width: "100%", padding: "10px 14px", background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "6px", color: "#0f172a", fontSize: "13px" }}
                />
              </div>
              <div style={{ gridColumn: "1 / 3" }}>
                <label style={{ display: "block", fontSize: "11px", fontWeight: "700", color: "#475569", marginBottom: "6px" }}>PROJECT DESCRIPTION</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief summary of the project..."
                  style={{ width: "100%", padding: "10px 14px", background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "6px", color: "#0f172a", fontSize: "13px", resize: "vertical" }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "11px", fontWeight: "700", color: "#475569", marginBottom: "6px" }}>TECH STACK (COMMA SEPARATED)</label>
                <input
                  type="text"
                  value={Array.isArray(formData.tech) ? formData.tech.join(", ") : formData.tech}
                  onChange={(e) => setFormData({ ...formData, tech: e.target.value.split(",").map((s) => s.trim()) })}
                  placeholder="Figma, HTML, CSS, JavaScript, React"
                  style={{ width: "100%", padding: "10px 14px", background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "6px", color: "#0f172a", fontSize: "13px" }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "11px", fontWeight: "700", color: "#475569", marginBottom: "6px" }}>IMAGE URL OR ASSET PATH</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="Asset URL or /src/assets/..."
                  style={{ width: "100%", padding: "10px 14px", background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "6px", color: "#0f172a", fontSize: "13px" }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "11px", fontWeight: "700", color: "#475569", marginBottom: "6px" }}>ACCENT THEME</label>
                <select
                  value={formData.accent}
                  onChange={(e) => setFormData({ ...formData, accent: e.target.value as "blue" | "lime" | "dark" })}
                  style={{ width: "100%", padding: "10px 14px", background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "6px", color: "#0f172a", fontSize: "13px" }}
                >
                  <option value="blue">Blue Accent</option>
                  <option value="lime">Lime Accent</option>
                  <option value="dark">Dark Accent</option>
                </select>
              </div>
              <div>
                <label style={{ display: "block", fontSize: "11px", fontWeight: "700", color: "#475569", marginBottom: "6px" }}>CHALLENGE STATEMENT</label>
                <input
                  type="text"
                  value={formData.challenge}
                  onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                  placeholder="What was the main design challenge?"
                  style={{ width: "100%", padding: "10px 14px", background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "6px", color: "#0f172a", fontSize: "13px" }}
                />
              </div>
              <div style={{ gridColumn: "1 / 3", display: "flex", gap: "12px", justifyContent: "flex-end", marginTop: "10px" }}>
                <button
                  type="button"
                  onClick={() => {
                    setIsAddingNew(false);
                    setEditingProject(null);
                  }}
                  style={{ padding: "10px 20px", background: "#f1f5f9", color: "#475569", border: "none", borderRadius: "6px", fontSize: "12px", fontWeight: "700", cursor: "pointer" }}
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  style={{ padding: "10px 24px", background: "#2563eb", color: "#ffffff", border: "none", borderRadius: "6px", fontSize: "12px", fontWeight: "700", cursor: "pointer" }}
                >
                  {isAddingNew ? "SAVE NEW WORK" : "UPDATE WORK DETAILS"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tab 1: Managed Projects List */}
        {activeTab === "projects" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {projects.map((p, idx) => (
              <div
                key={p.slug}
                style={{
                  display: "grid",
                  gridTemplateColumns: "60px 120px 1fr 160px 140px",
                  alignItems: "center",
                  gap: "20px",
                  padding: "20px",
                  background: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "12px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.01)",
                }}
              >
                <span style={{ fontFamily: "var(--font-display)", fontSize: "18px", fontWeight: "700", color: "#64748b" }}>
                  {p.number || String(idx + 1).padStart(2, "0")}
                </span>
                <img
                  src={p.image}
                  alt={p.title}
                  style={{ width: "100px", height: "65px", objectFit: "cover", borderRadius: "6px", border: "1px solid #e2e8f0" }}
                />
                <div>
                  <h4 style={{ fontFamily: "var(--font-display)", fontSize: "18px", fontWeight: "700", color: "#0f172a", margin: "0 0 4px" }}>{p.title}</h4>
                  <p style={{ fontSize: "12px", color: "#64748b", margin: "0 0 8px" }}>{p.category}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {p.tech.map((t) => (
                      <span key={t} style={{ fontSize: "10px", fontWeight: "600", background: "#f1f5f9", color: "#334155", padding: "2px 8px", borderRadius: "4px" }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <span style={{ fontSize: "10px", fontWeight: "700", color: "#94a3b8", display: "block", textTransform: "uppercase" }}>THEME</span>
                  <span style={{ fontSize: "12px", fontWeight: "700", color: p.accent === "lime" ? "#65a30d" : p.accent === "blue" ? "#2563eb" : "#0f172a" }}>
                    ● {p.accent.toUpperCase()}
                  </span>
                </div>
                <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
                  <Link to="/work/$slug" params={{ slug: p.slug }} target="_blank">
                    <button
                      title="View Live Work"
                      style={{ padding: "8px 12px", background: "#f1f5f9", color: "#475569", border: "1px solid #cbd5e1", borderRadius: "6px", cursor: "pointer", display: "inline-flex", alignItems: "center" }}
                    >
                      <Eye style={{ width: 14, height: 14 }} />
                    </button>
                  </Link>
                  <button
                    title="Edit Project"
                    onClick={() => handleOpenEdit(p)}
                    style={{ padding: "8px 12px", background: "#eff6ff", color: "#2563eb", border: "1px solid #bfdbfe", borderRadius: "6px", cursor: "pointer", display: "inline-flex", alignItems: "center" }}
                  >
                    <Edit2 style={{ width: 14, height: 14 }} />
                  </button>
                  <button
                    title="Delete Project"
                    onClick={() => handleDeleteProject(p.slug)}
                    style={{ padding: "8px 12px", background: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca", borderRadius: "6px", cursor: "pointer", display: "inline-flex", alignItems: "center" }}
                  >
                    <Trash2 style={{ width: 14, height: 14 }} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Contact Messages */}
        {activeTab === "messages" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {messages.length === 0 ? (
              <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "48px", textAlign: "center" }}>
                <MessageSquare style={{ width: 36, height: 36, color: "#cbd5e1", margin: "0 auto 12px" }} />
                <p style={{ fontSize: "14px", color: "#64748b", margin: 0 }}>No contact form messages logged yet.</p>
              </div>
            ) : (
              messages.map((m) => (
                <div
                  key={m.id}
                  style={{
                    padding: "24px",
                    background: "#ffffff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "12px",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.01)",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <strong style={{ fontSize: "14px", color: "#0f172a" }}>
                      {m.name} <span style={{ fontWeight: "400", color: "#2563eb" }}>({m.email})</span>
                    </strong>
                    <span style={{ fontSize: "11px", color: "#94a3b8" }}>{new Date(m.createdAt).toLocaleString()}</span>
                  </div>
                  {m.service && (
                    <span style={{ fontSize: "11px", fontWeight: "700", background: "#e0f2fe", color: "#0369a1", padding: "3px 8px", borderRadius: "4px", display: "inline-block", marginBottom: "12px" }}>
                      SERVICE: {m.service}
                    </span>
                  )}
                  <p style={{ fontSize: "13px", lineHeight: 1.6, color: "#334155", margin: 0, background: "#f8fafc", padding: "12px 16px", borderRadius: "8px", border: "1px solid #f1f5f9" }}>
                    {m.message}
                  </p>
                </div>
              ))
            )}
          </div>
        )}
      </main>
    </div>
  );
}
