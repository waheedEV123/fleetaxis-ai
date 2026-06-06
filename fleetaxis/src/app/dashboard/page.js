"use client";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  return (
    <div style={{ minHeight: "100vh", background: "#F8FAFB", fontFamily: "'Sora',sans-serif", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center", maxWidth: 480 }}>
        <div style={{ width: 64, height: 64, background: "linear-gradient(135deg,#00C16E,#009955)", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: 24, fontWeight: 700, color: "#fff", fontFamily: "'JetBrains Mono',monospace" }}>FA</div>
        <h1 style={{ fontSize: 26, fontWeight: 700, color: "#0F172A", marginBottom: 10 }}>Welcome to FleetAxis AI 🎉</h1>
        <p style={{ fontSize: 15, color: "#64748B", lineHeight: 1.7, marginBottom: 28 }}>Phase 1 complete — signup and login are live. Phase 2 (AI Copilot dashboard) is coming next.</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 28 }}>
          {["⚡ EV Transition Agent", "🔌 Charging Infrastructure", "💰 TCO & ROI Agent", "🌱 ESG Agent", "🔧 Maintenance Agent", "📊 Fleet Health Score"].map((a, i) => (
            <div key={i} style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: 10, padding: "12px 14px", fontSize: 13, color: "#475569", textAlign: "left" }}>{a}</div>
          ))}
        </div>
        <button onClick={() => router.push("/login")} style={{ padding: "12px 28px", borderRadius: 10, background: "linear-gradient(135deg,#00C16E,#009955)", border: "none", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
          ← Back to Login
        </button>
        <p style={{ fontSize: 12, color: "#94A3B8", marginTop: 16 }}>Say "build Phase 2" to Claude to build the full AI Copilot dashboard</p>
      </div>
    </div>
  );
}
