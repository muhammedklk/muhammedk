import { useState, useEffect } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useAdminAuth } from "@/lib/authStore";
import { useProjects, useMessages, saveStoredProjects, resetStoredProjects, type ContactMessage } from "@/lib/projectStore";
import { type Project } from "@/data/projects";
import { Plus, Edit2, Trash2, RefreshCw, Eye, ArrowUpRight, FolderKanban, MessageSquare, Check, X, Shield, Sparkles, Layers, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

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
      <div className="inner-page dark-band" style={{ minHeight: "70vh", display: "grid", placeItems: "center" }}>
        <p className="section-label" style={{ color: "var(--accent)" }}>[ INITIALIZING DASHBOARD ]</p>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="editorial-grid" style={{ minHeight: "50vh", alignContent: "center", textAlign: "center" }}>
        <div style={{ gridColumn: "4 / 10", background: "color-mix(in oklab, var(--dark) 90%, black)", border: "1px solid var(--accent)", padding: "40px" }}>
          <Shield style={{ width: 40, height: 40, color: "var(--accent)", margin: "0 auto 16px" }} />
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "28px", marginBottom: "12px" }}>ACCESS RESTRICTED</h2>
          <p style={{ fontSize: "14px", opacity: 0.8, marginBottom: "24px" }}>You must log in to view and manage portfolio projects.</p>
          <Button variant="lime" size="editorial" onClick={() => navigate({ to: "/admin/login" })}>
            GO TO LOGIN PAGE
          </Button>
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
    <div className="inner-page dark-band" style={{ minHeight: "100vh", paddingTop: "calc(var(--header-h) + 20px)", paddingBottom: "60px" }}>
      <header className="admin-header editorial-grid" style={{ paddingBottom: "24px", borderBottom: "1px solid color-mix(in oklab, var(--secondary-foreground) 20%, transparent)", marginBottom: "40px" }}>
        <div style={{ gridColumn: "1 / 6", display: "flex", alignItems: "center", gap: "16px" }}>
          <span className="section-label" style={{ color: "var(--accent)" }}>[ ADMIN DASHBOARD ]</span>
          <span style={{ fontSize: "10px", fontWeight: "700", letterSpacing: "0.08em", background: "color-mix(in oklab, var(--accent) 20%, transparent)", color: "var(--accent)", padding: "4px 8px", borderRadius: "2px" }}>
            LIVE SYSTEM
          </span>
        </div>
        <div style={{ gridColumn: "7 / 13", display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "20px" }}>
          <span style={{ fontSize: "11px", fontWeight: "600", color: "color-mix(in oklab, var(--secondary-foreground) 70%, transparent)" }}>
            LOGGED IN AS <strong>MUHAMMED K</strong>
          </span>
          <Button
            variant="editorialGhost"
            size="sm"
            onClick={() => {
              logout();
              navigate({ to: "/admin/login" });
            }}
            style={{ fontSize: "10px", padding: "6px 12px", border: "1px solid color-mix(in oklab, var(--secondary-foreground) 30%, transparent)", gap: "6px" }}
          >
            <LogOut style={{ width: 14, height: 14 }} /> LOGOUT
          </Button>
        </div>
      </header>

      <div className="editorial-grid">
      {/* Top Stats Banner */}
      <div style={{ gridColumn: "1 / 13", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "40px" }}>
        <div style={{ background: "rgba(255, 255, 255, 0.03)", border: "1px solid color-mix(in oklab, var(--secondary-foreground) 20%, transparent)", padding: "20px" }}>
          <span style={{ fontSize: "10px", fontWeight: "700", letterSpacing: "0.08em", opacity: 0.7 }}>PORTFOLIO WORKS</span>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "36px", marginTop: "8px", color: "var(--accent)" }}>{String(projects.length).padStart(2, "0")}</h3>
        </div>
        <div style={{ background: "rgba(255, 255, 255, 0.03)", border: "1px solid color-mix(in oklab, var(--secondary-foreground) 20%, transparent)", padding: "20px" }}>
          <span style={{ fontSize: "10px", fontWeight: "700", letterSpacing: "0.08em", opacity: 0.7 }}>CONTACT MESSAGES</span>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "36px", marginTop: "8px", color: "var(--primary)" }}>{String(messages.length).padStart(2, "0")}</h3>
        </div>
        <div style={{ background: "rgba(255, 255, 255, 0.03)", border: "1px solid color-mix(in oklab, var(--secondary-foreground) 20%, transparent)", padding: "20px" }}>
          <span style={{ fontSize: "10px", fontWeight: "700", letterSpacing: "0.08em", opacity: 0.7 }}>SYSTEM STATUS</span>
          <h3 style={{ fontFamily: "var(--font-sans)", fontSize: "16px", fontWeight: "700", marginTop: "16px", color: "#4ade80" }}>ONLINE & ACTIVE</h3>
        </div>
        <div style={{ background: "rgba(255, 255, 255, 0.03)", border: "1px solid color-mix(in oklab, var(--secondary-foreground) 20%, transparent)", padding: "20px", display: "flex", flexDirection: "column", justifyContent: "center", gap: "8px" }}>
          <Button variant="lime" size="sm" onClick={handleOpenAdd} style={{ width: "100%", justifyContent: "center", gap: "6px", fontSize: "10px" }}>
            <Plus style={{ width: 14, height: 14 }} /> ADD NEW PROJECT
          </Button>
          <Button variant="editorialGhost" size="sm" onClick={handleResetProjects} style={{ width: "100%", justifyContent: "center", gap: "6px", fontSize: "10px", border: "1px solid color-mix(in oklab, var(--secondary-foreground) 30%, transparent)" }}>
            <RefreshCw style={{ width: 12, height: 12 }} /> RESET TO DEFAULTS
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ gridColumn: "1 / 13", display: "flex", borderBottom: "1px solid color-mix(in oklab, var(--secondary-foreground) 20%, transparent)", marginBottom: "30px" }}>
        <button
          onClick={() => setActiveTab("projects")}
          style={{
            padding: "14px 24px",
            background: "none",
            border: "none",
            borderBottom: activeTab === "projects" ? "2px solid var(--accent)" : "none",
            color: activeTab === "projects" ? "var(--accent)" : "color-mix(in oklab, var(--secondary-foreground) 60%, transparent)",
            fontFamily: "var(--font-sans)",
            fontSize: "12px",
            fontWeight: "700",
            letterSpacing: "0.08em",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <FolderKanban style={{ width: 16, height: 16 }} /> MANAGED WORKS ({projects.length})
        </button>
        <button
          onClick={() => setActiveTab("messages")}
          style={{
            padding: "14px 24px",
            background: "none",
            border: "none",
            borderBottom: activeTab === "messages" ? "2px solid var(--primary)" : "none",
            color: activeTab === "messages" ? "var(--primary)" : "color-mix(in oklab, var(--secondary-foreground) 60%, transparent)",
            fontFamily: "var(--font-sans)",
            fontSize: "12px",
            fontWeight: "700",
            letterSpacing: "0.08em",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <MessageSquare style={{ width: 16, height: 16 }} /> SUBMITTED MESSAGES ({messages.length})
        </button>
      </div>

      {/* Add / Edit Form Modal Drawer */}
      {(isAddingNew || editingProject) && (
        <div style={{ gridColumn: "1 / 13", background: "color-mix(in oklab, var(--dark) 95%, black)", border: "1px solid var(--accent)", padding: "30px", marginBottom: "40px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "24px", color: "var(--accent)" }}>
              {isAddingNew ? "ADD NEW PORTFOLIO PROJECT" : `EDIT PROJECT: ${editingProject?.title}`}
            </h3>
            <button onClick={() => { setIsAddingNew(false); setEditingProject(null); }} style={{ background: "none", border: "none", color: "var(--secondary-foreground)", cursor: "pointer" }}>
              <X style={{ width: 20, height: 20 }} />
            </button>
          </div>

          <form onSubmit={handleSaveForm} style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px" }}>
            <div>
              <label style={{ display: "block", fontSize: "10px", fontWeight: "700", marginBottom: "6px" }}>PROJECT TITLE *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. RONARAI KSA"
                style={{ width: "100%", padding: "10px", background: "rgba(255,255,255,0.05)", border: "1px solid color-mix(in oklab, var(--secondary-foreground) 30%, transparent)", color: "inherit" }}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "10px", fontWeight: "700", marginBottom: "6px" }}>CATEGORY / DISCIPLINE *</label>
              <input
                type="text"
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="e.g. Restaurant Website / UI/UX Design & Development"
                style={{ width: "100%", padding: "10px", background: "rgba(255,255,255,0.05)", border: "1px solid color-mix(in oklab, var(--secondary-foreground) 30%, transparent)", color: "inherit" }}
              />
            </div>
            <div style={{ gridColumn: "1 / 3" }}>
              <label style={{ display: "block", fontSize: "10px", fontWeight: "700", marginBottom: "6px" }}>PROJECT DESCRIPTION</label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief summary of the project..."
                style={{ width: "100%", padding: "10px", background: "rgba(255,255,255,0.05)", border: "1px solid color-mix(in oklab, var(--secondary-foreground) 30%, transparent)", color: "inherit" }}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "10px", fontWeight: "700", marginBottom: "6px" }}>TECH STACK (COMMA SEPARATED)</label>
              <input
                type="text"
                value={Array.isArray(formData.tech) ? formData.tech.join(", ") : formData.tech}
                onChange={(e) => setFormData({ ...formData, tech: e.target.value.split(",").map((s) => s.trim()) })}
                placeholder="Figma, HTML, CSS, JavaScript, React"
                style={{ width: "100%", padding: "10px", background: "rgba(255,255,255,0.05)", border: "1px solid color-mix(in oklab, var(--secondary-foreground) 30%, transparent)", color: "inherit" }}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "10px", fontWeight: "700", marginBottom: "6px" }}>IMAGE URL OR ASSET PATH</label>
              <input
                type="text"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="/src/assets/mockup-ronaraiksa.jpg or HTTPS URL"
                style={{ width: "100%", padding: "10px", background: "rgba(255,255,255,0.05)", border: "1px solid color-mix(in oklab, var(--secondary-foreground) 30%, transparent)", color: "inherit" }}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "10px", fontWeight: "700", marginBottom: "6px" }}>ACCENT THEME</label>
              <select
                value={formData.accent}
                onChange={(e) => setFormData({ ...formData, accent: e.target.value as "blue" | "lime" | "dark" })}
                style={{ width: "100%", padding: "10px", background: "color-mix(in oklab, var(--dark) 90%, black)", border: "1px solid color-mix(in oklab, var(--secondary-foreground) 30%, transparent)", color: "inherit" }}
              >
                <option value="blue">Blue Accent</option>
                <option value="lime">Lime Accent</option>
                <option value="dark">Dark Accent</option>
              </select>
            </div>
            <div>
              <label style={{ display: "block", fontSize: "10px", fontWeight: "700", marginBottom: "6px" }}>CHALLENGE STATEMENT</label>
              <input
                type="text"
                value={formData.challenge}
                onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                placeholder="What was the main design challenge?"
                style={{ width: "100%", padding: "10px", background: "rgba(255,255,255,0.05)", border: "1px solid color-mix(in oklab, var(--secondary-foreground) 30%, transparent)", color: "inherit" }}
              />
            </div>
            <div style={{ gridColumn: "1 / 3", display: "flex", gap: "12px", justifyContent: "flex-end", marginTop: "10px" }}>
              <Button type="button" variant="editorialGhost" onClick={() => { setIsAddingNew(false); setEditingProject(null); }}>
                CANCEL
              </Button>
              <Button type="submit" variant="lime">
                {isAddingNew ? "SAVE NEW WORK" : "UPDATE WORK DETAILS"}
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Tab 1: Managed Projects List */}
      {activeTab === "projects" && (
        <div style={{ gridColumn: "1 / 13", display: "flex", flexDirection: "column", gap: "20px" }}>
          {projects.map((p, idx) => (
            <div
              key={p.slug}
              style={{
                display: "grid",
                gridTemplateColumns: "80px 140px 1fr 200px 160px",
                alignItems: "center",
                gap: "20px",
                padding: "20px",
                background: "rgba(255, 255, 255, 0.02)",
                border: "1px solid color-mix(in oklab, var(--secondary-foreground) 15%, transparent)",
              }}
            >
              <span style={{ fontFamily: "var(--font-display)", fontSize: "20px", color: "var(--accent)" }}>{p.number || String(idx + 1).padStart(2, "0")}</span>
              <img
                src={p.image}
                alt={p.title}
                style={{ width: "120px", height: "75px", objectFit: "cover", border: "1px solid color-mix(in oklab, var(--secondary-foreground) 20%, transparent)" }}
              />
              <div>
                <h4 style={{ fontFamily: "var(--font-display)", fontSize: "20px", marginBottom: "4px" }}>{p.title}</h4>
                <p style={{ fontSize: "12px", opacity: 0.7, marginBottom: "8px" }}>{p.category}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {p.tech.map((t) => (
                    <span key={t} style={{ fontSize: "9px", fontWeight: "700", background: "rgba(255, 255, 255, 0.08)", padding: "2px 6px" }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <span style={{ fontSize: "10px", fontWeight: "700", opacity: 0.6, display: "block" }}>ACCENT THEME</span>
                <span style={{ fontSize: "11px", fontWeight: "700", color: p.accent === "lime" ? "var(--accent)" : p.accent === "blue" ? "var(--primary)" : "#fff" }}>
                  ● {p.accent.toUpperCase()}
                </span>
              </div>
              <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
                <Link to="/work/$slug" params={{ slug: p.slug }} target="_blank">
                  <Button variant="editorialGhost" size="sm" style={{ padding: "8px", border: "1px solid color-mix(in oklab, var(--secondary-foreground) 30%, transparent)" }}>
                    <Eye style={{ width: 14, height: 14 }} />
                  </Button>
                </Link>
                <Button variant="editorialGhost" size="sm" onClick={() => handleOpenEdit(p)} style={{ padding: "8px", border: "1px solid color-mix(in oklab, var(--secondary-foreground) 30%, transparent)" }}>
                  <Edit2 style={{ width: 14, height: 14 }} />
                </Button>
                <Button variant="editorialGhost" size="sm" onClick={() => handleDeleteProject(p.slug)} style={{ padding: "8px", border: "1px solid rgba(239, 68, 68, 0.4)", color: "#f87171" }}>
                  <Trash2 style={{ width: 14, height: 14 }} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Contact Messages */}
      {activeTab === "messages" && (
        <div style={{ gridColumn: "1 / 13", display: "flex", flexDirection: "column", gap: "16px" }}>
          {messages.length === 0 ? (
            <div style={{ background: "rgba(255, 255, 255, 0.02)", border: "1px solid color-mix(in oklab, var(--secondary-foreground) 15%, transparent)", padding: "40px", textAlign: "center" }}>
              <MessageSquare style={{ width: 32, height: 32, opacity: 0.4, margin: "0 auto 12px" }} />
              <p style={{ fontSize: "14px", opacity: 0.7 }}>No contact form messages logged yet.</p>
            </div>
          ) : (
            messages.map((m) => (
              <div
                key={m.id}
                style={{
                  padding: "20px",
                  background: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid color-mix(in oklab, var(--secondary-foreground) 15%, transparent)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <strong style={{ fontSize: "14px", color: "var(--accent)" }}>{m.name} ({m.email})</strong>
                  <span style={{ fontSize: "10px", opacity: 0.6 }}>{new Date(m.createdAt).toLocaleString()}</span>
                </div>
                {m.service && <span style={{ fontSize: "10px", fontWeight: "700", background: "var(--primary)", color: "#fff", padding: "2px 6px", display: "inline-block", marginBottom: "10px" }}>{m.service}</span>}
                <p style={{ fontSize: "13px", lineHeight: 1.5, opacity: 0.9 }}>{m.message}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  </div>
);
}
