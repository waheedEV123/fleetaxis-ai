"use client";
import { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";

const METRICS = [
  { id: "utilisation", label: "Fleet Utilisation", icon: "🚛", unit: "%", your: 71, industry: 78, best: 91, color: "#00C16E", desc: "% of vehicles in active use daily" },
  { id: "cost_per_km", label: "Cost per km", icon: "💰", unit: "AED", your: 2.84, industry: 2.31, best: 1.62, color: "#F97316", desc: "Total operating cost divided by km driven", lower: true },
  { id: "maintenance_cost", label: "Maintenance Cost", icon: "🔧", unit: "AED/vehicle/yr", your: 8200, industry: 6800, best: 4900, color: "#EC4899", desc: "Annual maintenance spend per vehicle", lower: true },
  { id: "fuel_efficiency", label: "Fuel Efficiency", icon: "⛽", unit: "km/L", your: 9.2, industry: 10.4, best: 12.8, color: "#3B82F6", desc: "Average km per litre across fleet" },
  { id: "ev_adoption", label: "EV Adoption Rate", icon: "⚡", unit: "%", your: 8, industry: 18, best: 42, color: "#8B5CF6", desc: "% of fleet that is fully electric" },
  { id: "downtime", label: "Vehicle Downtime", icon: "⏱️", unit: "%", your: 6.4, industry: 4.8, best: 2.1, color: "#06B6D4", desc: "% of time vehicles are off-road", lower: true },
  { id: "co2", label: "CO₂ per km", icon: "🌱", unit: "g/km", your: 182, industry: 156, best: 98, color: "#10B981", desc: "Average CO₂ emissions per km", lower: true },
  { id: "health_score", label: "Fleet Health Score", icon: "🏥", unit: "/100", your: 74, industry: 71, best: 89, color: "#0B1437", desc: "Overall fleet performance index" },
];

const INDUSTRIES = ["Logistics & Last Mile", "Telecom", "Utilities", "Government", "Municipal Fleets", "Airports", "Construction", "Corporate Fleets"];
const REGIONS = ["UAE", "GCC", "India", "Europe", "Global Average"];

function Bar({ value, max, color, width = 200 }) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div style={{ background: "#F0F4F8", borderRadius: 99, height: 8, width, overflow: "hidden" }}>
      <div style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: 99, transition: "width .8s ease" }} />
    </div>
  );
}

export default function BenchmarkingPage() {
  const [selectedIndustry, setSelectedIndustry] = useState("Logistics & Last Mile");
  const [selectedRegion, setSelectedRegion] = useState("UAE");

  const getStatus = (metric) => {
    const diff = metric.lower
      ? ((metric.industry - metric.your) / metric.industry) * 100
      : ((metric.your - metric.industry) / metric.industry) * 100;
    if (diff >= 5) return { label: "Above Average", color: "#00C16E", bg: "#DCFCE7" };
    if (diff >= -5) return { label: "On Par", color: "#F97316", bg: "#FEF3C7" };
    return { label: "Below Average", color: "#EF4444", bg: "#FEF2F2" };
  };

  const aboveAvg = METRICS.filter(m => getStatus(m).label === "Above Average").length;
  const belowAvg = METRICS.filter(m => getStatus(m).label === "Below Average").length;

  return (
    <DashboardLayout>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        *{box-sizing:border-box}
        select:focus{outline:none}
        ::-webkit-scrollbar{width:4px}
        ::-webkit-scrollbar-thumb{background:#E2E8F0;border-radius:2px}
      `}</style>

      <div style={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }}>

        {/* Header */}
        <div style={{ background: "#fff", borderBottom: "1px solid #F0F4F8", padding: "16px 24px", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <div>
              <h1 style={{ fontSize: 20, fontWeight: 700, color: "#0F172A" }}>Benchmarking 📈</h1>
              <p style={{ fontSize: 13, color: "#64748B", marginTop: 2 }}>Compare your fleet performance against industry peers.</p>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <select value={selectedIndustry} onChange={e => setSelectedIndustry(e.target.value)}
                style={{ padding: "8px 12px", borderRadius: 9, border: "1px solid #E2E8F0", fontSize: 12, color: "#334155", background: "#fff", cursor: "pointer", fontFamily: "'Sora',sans-serif" }}>
                {INDUSTRIES.map(i => <option key={i}>{i}</option>)}
              </select>
              <select value={selectedRegion} onChange={e => setSelectedRegion(e.target.value)}
                style={{ padding: "8px 12px", borderRadius: 9, border: "1px solid #E2E8F0", fontSize: 12, color: "#334155", background: "#fff", cursor: "pointer", fontFamily: "'Sora',sans-serif" }}>
                {REGIONS.map(r => <option key={r}>{r}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px" }}>

          {/* Summary cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 20 }}>
            {[
              { label: "Metrics Above Average", value: aboveAvg, icon: "📈", color: "#00C16E", bg: "#DCFCE7" },
              { label: "Metrics On Par", value: METRICS.length - aboveAvg - belowAvg, icon: "➡️", color: "#F97316", bg: "#FEF3C7" },
              { label: "Metrics Below Average", value: belowAvg, icon: "📉", color: "#EF4444", bg: "#FEF2F2" },
              { label: "Potential Annual Saving", value: "$340K", icon: "💰", color: "#8B5CF6", bg: "#F3F0FF" },
            ].map((s, i) => (
              <div key={i} style={{ background: "#fff", borderRadius: 12, padding: "14px 16px", border: "1px solid #F0F4F8", boxShadow: "0 2px 8px rgba(0,0,0,.04)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <div style={{ width: 30, height: 30, borderRadius: 8, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>{s.icon}</div>
                  <span style={{ fontSize: 11, color: "#64748B" }}>{s.label}</span>
                </div>
                <div style={{ fontSize: 24, fontWeight: 700, color: s.color, fontFamily: "'JetBrains Mono',monospace" }}>{s.value}</div>
              </div>
            ))}
          </div>

          {/* Benchmark table */}
          <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #F0F4F8", overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,.04)", marginBottom: 20 }}>
            <div style={{ padding: "14px 18px", borderBottom: "1px solid #F8FAFB", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#0F172A" }}>Performance vs {selectedIndustry} · {selectedRegion}</span>
              <div style={{ display: "flex", gap: 16, fontSize: 11, color: "#94A3B8" }}>
                <span style={{ display: "flex", alignItems: "center", gap: 4 }}><div style={{ width: 8, height: 8, borderRadius: "50%", background: "#00C16E" }} />Your fleet</span>
                <span style={{ display: "flex", alignItems: "center", gap: 4 }}><div style={{ width: 8, height: 8, borderRadius: "50%", background: "#94A3B8" }} />Industry avg</span>
                <span style={{ display: "flex", alignItems: "center", gap: 4 }}><div style={{ width: 8, height: 8, borderRadius: "50%", background: "#FFD700" }} />Best in class</span>
              </div>
            </div>

            {METRICS.map((m, i) => {
              const status = getStatus(m);
              const max = Math.max(m.your, m.industry, m.best) * 1.1;
              return (
                <div key={m.id} style={{ padding: "14px 18px", borderBottom: i < METRICS.length - 1 ? "1px solid #F8FAFB" : "none", display: "grid", gridTemplateColumns: "200px 1fr 80px 80px 80px 100px", alignItems: "center", gap: 16 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 16 }}>{m.icon}</span>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: "#334155" }}>{m.label}</div>
                      <div style={{ fontSize: 10, color: "#94A3B8" }}>{m.unit}</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <Bar value={m.your} max={max} color={m.color} width={120} />
                      <span style={{ fontSize: 11, color: m.color, fontWeight: 600, fontFamily: "'JetBrains Mono',monospace", minWidth: 40 }}>{m.your}{m.unit === "%" ? "%" : ""}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <Bar value={m.industry} max={max} color="#CBD5E1" width={120} />
                      <span style={{ fontSize: 11, color: "#94A3B8", fontFamily: "'JetBrains Mono',monospace", minWidth: 40 }}>{m.industry}{m.unit === "%" ? "%" : ""}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <Bar value={m.best} max={max} color="#FFD700" width={120} />
                      <span style={{ fontSize: 11, color: "#B45309", fontFamily: "'JetBrains Mono',monospace", minWidth: 40 }}>{m.best}{m.unit === "%" ? "%" : ""}</span>
                    </div>
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: m.color, fontFamily: "'JetBrains Mono',monospace", textAlign: "right" }}>{m.your}</div>
                  <div style={{ fontSize: 12, color: "#94A3B8", fontFamily: "'JetBrains Mono',monospace", textAlign: "right" }}>{m.industry}</div>
                  <div style={{ fontSize: 12, color: "#B45309", fontFamily: "'JetBrains Mono',monospace", textAlign: "right" }}>{m.best}</div>
                  <div style={{ textAlign: "right" }}>
                    <span style={{ fontSize: 10, fontWeight: 600, padding: "3px 8px", borderRadius: 99, background: status.bg, color: status.color }}>{status.label}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Improvement opportunities */}
          <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #F0F4F8", overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,.04)" }}>
            <div style={{ padding: "14px 18px", borderBottom: "1px solid #F8FAFB", fontSize: 13, fontWeight: 600, color: "#0F172A" }}>💡 Biggest Improvement Opportunities</div>
            {METRICS.filter(m => getStatus(m).label === "Below Average").map((m, i) => {
              const gap = m.lower ? m.your - m.industry : m.industry - m.your;
              return (
                <div key={m.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 18px", borderBottom: "1px solid #F8FAFB" }}>
                  <div style={{ width: 36, height: 36, borderRadius: 9, background: `${m.color}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>{m.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#0F172A", marginBottom: 2 }}>{m.label}</div>
                    <div style={{ fontSize: 12, color: "#64748B" }}>Gap vs industry average: {gap.toFixed(1)} {m.unit} — {m.desc}</div>
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "#EF4444", background: "#FEF2F2", padding: "4px 10px", borderRadius: 99 }}>
                    {m.lower ? "+" : "-"}{Math.abs(gap).toFixed(1)} {m.unit}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
