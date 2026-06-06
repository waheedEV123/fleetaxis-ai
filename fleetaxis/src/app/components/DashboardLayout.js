"use client";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

const NAV_ITEMS = [
  { id: "home", icon: "💬", label: "Home", path: "/dashboard" },
  { id: "projects", icon: "📁", label: "Projects", path: "/dashboard/projects" },
  { id: "data-sources", icon: "🗄️", label: "Data Sources", path: "/dashboard/data-sources" },
  { id: "reports", icon: "📊", label: "Reports", path: "/dashboard/reports" },
  { id: "benchmarking", icon: "📈", label: "Benchmarking", path: "/dashboard/benchmarking" },
  { id: "knowledge", icon: "📚", label: "Knowledge Base", path: "/dashboard/knowledge" },
  { id: "integrations", icon: "🔗", label: "Integrations", path: "/dashboard/integrations", soon: true },
];

const BOTTOM_ITEMS = [
  { id: "notifications", icon: "🔔", label: "Notifications", path: "/dashboard/notifications" },
  { id: "settings", icon: "⚙️", label: "Settings", path: "/dashboard/settings" },
];

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (path) => {
    if (path === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(path);
  };

  return (
    <div style={{ display: "flex", height: "100vh", background: "#F0F4F8", fontFamily: "'Sora',sans-serif", overflow: "hidden" }}>
      <div style={{ width: collapsed ? 64 : 220, flexShrink: 0, background: "#0B1437", display: "flex", flexDirection: "column", transition: "width .25s ease", borderRight: "1px solid rgba(255,255,255,.06)", position: "relative", zIndex: 10 }}>
        <div style={{ padding: collapsed ? "20px 14px" : "20px 20px", borderBottom: "1px solid rgba(255,255,255,.06)", display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => router.push("/dashboard")}>
          <div style={{ width: 34, height: 34, background: "linear-gradient(135deg,#00C16E,#009955)", borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#fff", fontFamily: "'JetBrains Mono',monospace", flexShrink: 0 }}>FA</div>
          {!collapsed && <div><div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>FleetAxis<span style={{ color: "#00C16E" }}> AI</span></div><div style={{ fontSize: 10, color: "rgba(255,255,255,.35)", marginTop: 1 }}>Fleet Intelligence OS</div></div>}
        </div>
        {!collapsed && (
          <div style={{ margin: "12px 12px 0", background: "rgba(255,255,255,.05)", borderRadius: 10, padding: "10px 12px", cursor: "pointer", border: "1px solid rgba(255,255,255,.06)" }}>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,.35)", marginBottom: 3 }}>ORGANISATION</div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#fff" }}>GreenLine Logistics</div>
              <span style={{ fontSize: 10, color: "rgba(255,255,255,.4)" }}>▾</span>
            </div>
          </div>
        )}
        <div style={{ flex: 1, padding: "12px 0", overflowY: "auto" }}>
          {NAV_ITEMS.map(item => {
            const active = isActive(item.path);
            return (
              <div key={item.id} onClick={() => !item.soon && router.push(item.path)}
                style={{ display: "flex", alignItems: "center", gap: 10, padding: collapsed ? "11px 18px" : "11px 16px", margin: "1px 8px", borderRadius: 9, cursor: item.soon ? "default" : "pointer", background: active ? "rgba(0,193,110,.15)" : "transparent", border: active ? "1px solid rgba(0,193,110,.2)" : "1px solid transparent", transition: "all .15s" }}
                onMouseEnter={e => { if (!active && !item.soon) e.currentTarget.style.background = "rgba(255,255,255,.05)"; }}
                onMouseLeave={e => { if (!active) e.currentTarget.style.background = "transparent"; }}>
                <span style={{ fontSize: 16, flexShrink: 0 }}>{item.icon}</span>
                {!collapsed && (<><span style={{ fontSize: 13, fontWeight: active ? 600 : 400, color: active ? "#00C16E" : item.soon ? "rgba(255,255,255,.3)" : "rgba(255,255,255,.7)", flex: 1 }}>{item.label}</span>{item.soon && <span style={{ fontSize: 9, background: "rgba(255,255,255,.08)", color: "rgba(255,255,255,.3)", padding: "1px 6px", borderRadius: 99 }}>SOON</span>}{active && <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#00C16E" }} />}</>)}
              </div>
            );
          })}
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,.06)", padding: "8px 0" }}>
          {BOTTOM_ITEMS.map(item => {
            const active = isActive(item.path);
            return (
              <div key={item.id} onClick={() => router.push(item.path)}
                style={{ display: "flex", alignItems: "center", gap: 10, padding: collapsed ? "10px 18px" : "10px 16px", margin: "1px 8px", borderRadius: 9, cursor: "pointer", background: active ? "rgba(0,193,110,.15)" : "transparent", transition: "all .15s" }}
                onMouseEnter={e => { if (!active) e.currentTarget.style.background = "rgba(255,255,255,.05)"; }}
                onMouseLeave={e => { if (!active) e.currentTarget.style.background = "transparent"; }}>
                <span style={{ fontSize: 16 }}>{item.icon}</span>
                {!collapsed && <span style={{ fontSize: 13, fontWeight: active ? 600 : 400, color: active ? "#00C16E" : "rgba(255,255,255,.5)" }}>{item.label}</span>}
              </div>
            );
          })}
          <div style={{ margin: "8px", padding: collapsed ? "10px 8px" : "10px 12px", background: "rgba(255,255,255,.04)", borderRadius: 10, display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
            <div style={{ width: 30, height: 30, borderRadius: "50%", background: "linear-gradient(135deg,#00C16E,#009955)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#fff", flexShrink: 0 }}>WS</div>
            {!collapsed && <div style={{ flex: 1, overflow: "hidden" }}><div style={{ fontSize: 12, fontWeight: 600, color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Waheed Syed</div><div style={{ fontSize: 10, color: "rgba(255,255,255,.4)" }}>Admin</div></div>}
          </div>
        </div>
        <button onClick={() => setCollapsed(!collapsed)} style={{ position: "absolute", top: 22, right: -10, width: 20, height: 20, borderRadius: "50%", background: "#0B1437", border: "1px solid rgba(255,255,255,.12)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 10, color: "rgba(255,255,255,.4)", zIndex: 20 }}>
          {collapsed ? "›" : "‹"}
        </button>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>{children}</div>
    </div>
  );
}
