"use client";
import { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { useRouter } from "next/navigation";

const PROJECT_TYPES = [
  { id: "ev", icon: "⚡", label: "EV Transition", color: "#00C16E" },
  { id: "charging", icon: "🔌", label: "Charging Study", color: "#3B82F6" },
  { id: "maintenance", icon: "🔧", label: "Maintenance Assessment", color: "#F97316" },
  { id: "sustainability", icon: "🌱", label: "Sustainability Program", color: "#10B981" },
  { id: "tco", icon: "💰", label: "TCO Analysis", color: "#8B5CF6" },
  { id: "fleet", icon: "🚛", label: "Fleet Health Review", color: "#EC4899" },
];

const SAMPLE_PROJECTS = [
  { id: 1, name: "EV Transition Study — GreenLine Logistics", type: "ev", status: "active", files: 3, messages: 12, date: "20 May 2026", progress: 65 },
  { id: 2, name: "Charging Infrastructure Plan — Dubai Depot", type: "charging", status: "active", files: 2, messages: 8, date: "18 May 2026", progress: 40 },
  { id: 3, name: "Annual Fleet Health Review Q2 2026", type: "fleet", status: "completed", files: 5, messages: 24, date: "10 May 2026", progress: 100 },
  { id: 4, name: "Sustainability Report FY2026", type: "sustainability", status: "draft", files: 1, messages: 3, date: "5 May 2026", progress: 20 },
];

const STATUS_COLORS = { active: "#00C16E", completed: "#3B82F6", draft: "#94A3B8" };

export default function ProjectsPage() {
  const router = useRouter();
  const [projects, setProjects] = useState(SAMPLE_PROJECTS);
  const [showNew, setShowNew] = useState(false);
  const [newProject, setNewProject] = useState({ name: "", type: "ev" });

  const createProject = () => {
    if (!newProject.name) return;
    setProjects(prev => [...prev, { id: Date.now(), name: newProject.name, type: newProject.type, status: "draft", files: 0, messages: 0, date: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }), progress: 0 }]);
    setShowNew(false);
    setNewProject({ name: "", type: "ev" });
  };

  return (
    <DashboardLayout>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&display=swap');
        *{box-sizing:border-box}
        input,select{font-family:'Sora',sans-serif}
        input:focus,select:focus{outline:none}
        ::-webkit-scrollbar{width:4px}
        ::-webkit-scrollbar-thumb{background:#E2E8F0;border-radius:2px}
      `}</style>

      <div style={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }}>

        {/* Header */}
        <div style={{ background: "#fff", borderBottom: "1px solid #F0F4F8", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 700, color: "#0F172A" }}>Projects 📁</h1>
            <p style={{ fontSize: 13, color: "#64748B", marginTop: 2 }}>Manage your fleet consulting engagements and studies.</p>
          </div>
          <button onClick={() => setShowNew(true)}
            style={{ padding: "10px 18px", borderRadius: 10, background: "linear-gradient(135deg,#00C16E,#009955)", border: "none", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 7, fontFamily: "'Sora',sans-serif", boxShadow: "0 4px 14px rgba(0,193,110,.3)" }}>
            + New Project
          </button>
        </div>

        {/* Stats */}
        <div style={{ background: "#fff", borderBottom: "1px solid #F0F4F8", padding: "10px 24px", display: "flex", gap: 16, flexShrink: 0 }}>
          {[{ label: "Total Projects", value: projects.length, icon: "📁" }, { label: "Active", value: projects.filter(p => p.status === "active").length, icon: "▶️" }, { label: "Completed", value: projects.filter(p => p.status === "completed").length, icon: "✅" }, { label: "Draft", value: projects.filter(p => p.status === "draft").length, icon: "📝" }].map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 7, padding: "6px 12px", background: "#F8FAFB", borderRadius: 9, border: "1px solid #F0F4F8" }}>
              <span style={{ fontSize: 14 }}>{s.icon}</span>
              <span style={{ fontSize: 18, fontWeight: 700, color: "#0F172A", fontFamily: "'JetBrains Mono',monospace" }}>{s.value}</span>
              <span style={{ fontSize: 11, color: "#64748B" }}>{s.label}</span>
            </div>
          ))}
        </div>

        {/* Projects list */}
        <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 14 }}>
            {projects.map(project => {
              const pType = PROJECT_TYPES.find(t => t.id === project.type) || PROJECT_TYPES[0];
              return (
                <div key={project.id} onClick={() => router.push("/dashboard")}
                  style={{ background: "#fff", border: "1px solid #F0F4F8", borderRadius: 14, padding: "16px", cursor: "pointer", transition: "all .2s", boxShadow: "0 2px 8px rgba(0,0,0,.04)" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = pType.color; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 8px 24px rgba(0,0,0,.08)`; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "#F0F4F8"; e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,.04)"; }}>

                  <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 12 }}>
                    <div style={{ width: 38, height: 38, borderRadius: 10, background: `${pType.color}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{pType.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "#0F172A", lineHeight: 1.4, marginBottom: 4 }}>{project.name}</div>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <div style={{ width: 6, height: 6, borderRadius: "50%", background: STATUS_COLORS[project.status] }} />
                        <span style={{ fontSize: 11, color: STATUS_COLORS[project.status], fontWeight: 500, textTransform: "capitalize" }}>{project.status}</span>
                        <span style={{ fontSize: 11, color: "#94A3B8" }}>· {project.date}</span>
                      </div>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div style={{ marginBottom: 12 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                      <span style={{ fontSize: 11, color: "#64748B" }}>Progress</span>
                      <span style={{ fontSize: 11, fontWeight: 600, color: pType.color }}>{project.progress}%</span>
                    </div>
                    <div style={{ background: "#F0F4F8", borderRadius: 99, height: 5, overflow: "hidden" }}>
                      <div style={{ width: `${project.progress}%`, height: "100%", background: pType.color, borderRadius: 99, transition: "width .4s" }} />
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: 8 }}>
                    <div style={{ flex: 1, background: "#F8FAFB", borderRadius: 8, padding: "6px 10px", textAlign: "center" }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: "#0F172A", fontFamily: "'JetBrains Mono',monospace" }}>{project.files}</div>
                      <div style={{ fontSize: 10, color: "#94A3B8" }}>Files</div>
                    </div>
                    <div style={{ flex: 1, background: "#F8FAFB", borderRadius: 8, padding: "6px 10px", textAlign: "center" }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: "#0F172A", fontFamily: "'JetBrains Mono',monospace" }}>{project.messages}</div>
                      <div style={{ fontSize: 10, color: "#94A3B8" }}>Messages</div>
                    </div>
                    <div style={{ flex: 1, background: `${pType.color}10`, borderRadius: 8, padding: "6px 10px", textAlign: "center" }}>
                      <div style={{ fontSize: 11, color: pType.color }}>{pType.label}</div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* New project card */}
            <div onClick={() => setShowNew(true)}
              style={{ background: "#F8FAFB", border: "2px dashed #E2E8F0", borderRadius: 14, padding: "16px", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 180, transition: "all .15s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#00C16E"; e.currentTarget.style.background = "#F0FDF9"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#E2E8F0"; e.currentTarget.style.background = "#F8FAFB"; }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>➕</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#334155" }}>New Project</div>
              <div style={{ fontSize: 11, color: "#94A3B8", marginTop: 4 }}>Start a new fleet engagement</div>
            </div>
          </div>
        </div>
      </div>

      {/* New project modal */}
      {showNew && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }}>
          <div style={{ background: "#fff", borderRadius: 20, padding: "28px 28px", width: 440, boxShadow: "0 20px 60px rgba(0,0,0,.2)", animation: "fadeUp .3s ease" }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "#0F172A", marginBottom: 6 }}>Create New Project</h2>
            <p style={{ fontSize: 13, color: "#64748B", marginBottom: 20 }}>Start a new fleet consulting engagement</p>

            <label style={{ fontSize: 12, fontWeight: 500, color: "#334155", display: "block", marginBottom: 5 }}>Project Name *</label>
            <input value={newProject.name} onChange={e => setNewProject({ ...newProject, name: e.target.value })}
              placeholder="e.g. EV Transition Study — Client Name"
              style={{ width: "100%", padding: "11px 13px", borderRadius: 10, border: "1.5px solid #E2E8F0", fontSize: 13, color: "#1E293B", background: "#F8FAFB", marginBottom: 14, fontFamily: "'Sora',sans-serif" }}
              onFocus={e => e.target.style.borderColor = "#00C16E"} onBlur={e => e.target.style.borderColor = "#E2E8F0"} />

            <label style={{ fontSize: 12, fontWeight: 500, color: "#334155", display: "block", marginBottom: 8 }}>Project Type</label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 20 }}>
              {PROJECT_TYPES.map(t => (
                <div key={t.id} onClick={() => setNewProject({ ...newProject, type: t.id })}
                  style={{ padding: "8px 10px", borderRadius: 9, border: `2px solid ${newProject.type === t.id ? t.color : "#E2E8F0"}`, background: newProject.type === t.id ? `${t.color}10` : "#fff", cursor: "pointer", textAlign: "center", transition: "all .15s" }}>
                  <div style={{ fontSize: 18, marginBottom: 3 }}>{t.icon}</div>
                  <div style={{ fontSize: 10, fontWeight: newProject.type === t.id ? 600 : 400, color: newProject.type === t.id ? t.color : "#64748B", lineHeight: 1.3 }}>{t.label}</div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setShowNew(false)} style={{ flex: 1, padding: "11px", borderRadius: 10, border: "1.5px solid #E2E8F0", background: "#fff", fontSize: 13, fontWeight: 500, color: "#475569", cursor: "pointer", fontFamily: "'Sora',sans-serif" }}>Cancel</button>
              <button onClick={createProject} disabled={!newProject.name}
                style={{ flex: 2, padding: "11px", borderRadius: 10, background: newProject.name ? "linear-gradient(135deg,#00C16E,#009955)" : "#E2E8F0", border: "none", fontSize: 13, fontWeight: 600, color: newProject.name ? "#fff" : "#94A3B8", cursor: newProject.name ? "pointer" : "not-allowed", fontFamily: "'Sora',sans-serif" }}>
                Create Project →
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
