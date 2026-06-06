"use client";
import { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";

const REPORT_TYPES = [
  {
    id: "ev-readiness",
    icon: "⚡",
    title: "EV Readiness Assessment",
    desc: "Full electrification readiness analysis with vehicle suitability scores, pilot recommendations and replacement roadmap.",
    color: "#00C16E",
    pages: 18,
    formats: ["PDF", "Excel", "PowerPoint"],
    tags: ["EV", "Strategy"],
    sample: { score: 72, vehicles: 250, evReady: 87, saving: "$1.2M" },
  },
  {
    id: "charging-plan",
    icon: "🔌",
    title: "Charging Infrastructure Plan",
    desc: "Depot charging design with AC/DC requirements, power load analysis, grid capacity and smart charging strategy.",
    color: "#3B82F6",
    pages: 22,
    formats: ["PDF", "Excel"],
    tags: ["Charging", "Infrastructure"],
    sample: { acChargers: 24, dcChargers: 8, power: "180kW", cost: "$340K" },
  },
  {
    id: "tco-roi",
    icon: "💰",
    title: "TCO & ROI Report",
    desc: "5-year total cost of ownership comparison between ICE and EV fleets with payback period and lifecycle savings analysis.",
    color: "#F97316",
    pages: 16,
    formats: ["PDF", "Excel", "PowerPoint"],
    tags: ["Finance", "ROI"],
    sample: { payback: "3.2 yrs", saving5yr: "$4.8M", roi: "142%", co2: "890T" },
  },
  {
    id: "fleet-health",
    icon: "🏥",
    title: "Fleet Health Report",
    desc: "Comprehensive fleet health score with subscores for operations, maintenance, sustainability, electrification, safety and financial efficiency.",
    color: "#8B5CF6",
    pages: 24,
    formats: ["PDF", "PowerPoint"],
    tags: ["Health", "Operations"],
    sample: { overall: 74, ops: 81, maintenance: 68, sustainability: 62 },
  },
  {
    id: "maintenance-risk",
    icon: "🔧",
    title: "Maintenance Risk Assessment",
    desc: "Predictive maintenance analysis using service history and failure pattern data with risk scores and maintenance forecasts.",
    color: "#EC4899",
    pages: 20,
    formats: ["PDF", "Excel"],
    tags: ["Maintenance", "Risk"],
    sample: { highRisk: 12, medRisk: 34, savings: "$280K", uptime: "96.4%" },
  },
  {
    id: "esg",
    icon: "🌱",
    title: "Sustainability & ESG Report",
    desc: "Carbon footprint analysis, Net Zero tracking, UAE/GCC sustainability compliance and board-ready ESG metrics.",
    color: "#10B981",
    pages: 28,
    formats: ["PDF", "PowerPoint"],
    tags: ["ESG", "Sustainability"],
    sample: { co2: "2,840T", reduction: "34%", netZero: "2038", score: "B+" },
  },
  {
    id: "board-pack",
    icon: "📊",
    title: "Executive Board Pack",
    desc: "C-suite ready presentation with fleet KPIs, strategic recommendations, investment decisions and sustainability highlights.",
    color: "#0B1437",
    pages: 12,
    formats: ["PowerPoint", "PDF"],
    tags: ["Executive", "Strategy"],
    sample: { slides: 12, kpis: 8, recommendations: 5, priority: "High" },
  },
];

const HEALTH_SCORES = [
  { id: "ops", label: "Operations", score: 81, icon: "🚛", color: "#00C16E", desc: "Fleet utilisation, route efficiency, idle time" },
  { id: "maintenance", label: "Maintenance", score: 68, icon: "🔧", color: "#F97316", desc: "Service compliance, failure rate, downtime" },
  { id: "sustainability", label: "Sustainability", score: 62, icon: "🌱", color: "#10B981", desc: "CO₂ emissions, fuel efficiency, green score" },
  { id: "electrification", label: "Electrification", score: 45, icon: "⚡", color: "#3B82F6", desc: "EV adoption rate, readiness progress" },
  { id: "safety", label: "Safety", score: 88, icon: "🛡️", color: "#8B5CF6", desc: "Driver behaviour, incident rate, compliance" },
  { id: "financial", label: "Financial", score: 74, icon: "💰", color: "#EC4899", desc: "Cost per km, budget variance, TCO performance" },
];

function ScoreRing({ score, size = 80, color = "#00C16E", strokeWidth = 6 }) {
  const r = (size - strokeWidth * 2) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#F0F4F8" strokeWidth={strokeWidth} />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={strokeWidth}
        strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`} style={{ transition: "stroke-dashoffset .8s ease" }} />
      <text x="50%" y="50%" textAnchor="middle" dominantBaseline="central" fontSize={size * 0.22} fontWeight="700" fill="#0F172A" fontFamily="'JetBrains Mono',monospace">{score}</text>
    </svg>
  );
}

function ReportCard({ report, onGenerate }) {
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);

  const handleGenerate = async (format) => {
    setGenerating(true);
    await new Promise(r => setTimeout(r, 2000));
    setGenerating(false);
    setGenerated(true);
  };

  return (
    <div style={{ background: "#fff", border: "1px solid #F0F4F8", borderRadius: 14, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,.04)", transition: "transform .2s, box-shadow .2s" }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,.08)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,.04)"; }}>

      {/* Color bar */}
      <div style={{ height: 4, background: report.color }} />

      <div style={{ padding: "16px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 10 }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: `${report.color}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{report.icon}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#0F172A", marginBottom: 3 }}>{report.title}</div>
            <div style={{ display: "flex", gap: 5 }}>
              {report.tags.map((t, i) => <span key={i} style={{ fontSize: 10, background: `${report.color}12`, color: report.color, padding: "1px 7px", borderRadius: 99, fontWeight: 500 }}>{t}</span>)}
              <span style={{ fontSize: 10, color: "#94A3B8" }}>{report.pages} pages</span>
            </div>
          </div>
        </div>

        <p style={{ fontSize: 12, color: "#64748B", lineHeight: 1.6, marginBottom: 14 }}>{report.desc}</p>

        {/* Sample metrics */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginBottom: 14 }}>
          {Object.entries(report.sample).slice(0, 4).map(([k, v], i) => (
            <div key={i} style={{ background: "#F8FAFB", borderRadius: 8, padding: "7px 10px" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: report.color, fontFamily: "'JetBrains Mono',monospace" }}>{v}</div>
              <div style={{ fontSize: 10, color: "#94A3B8", textTransform: "capitalize" }}>{k.replace(/([A-Z])/g, ' $1').trim()}</div>
            </div>
          ))}
        </div>

        {/* Export buttons */}
        <div style={{ display: "flex", gap: 6 }}>
          {report.formats.map((fmt, i) => (
            <button key={i} onClick={() => handleGenerate(fmt)} disabled={generating}
              style={{ flex: 1, padding: "8px 6px", borderRadius: 8, border: `1px solid ${generated && i === 0 ? report.color : "#E2E8F0"}`, background: generated && i === 0 ? `${report.color}10` : i === 0 ? report.color : "#fff", color: generated && i === 0 ? report.color : i === 0 ? "#fff" : "#64748B", fontSize: 11, fontWeight: 600, cursor: generating ? "wait" : "pointer", transition: "all .15s", fontFamily: "'Sora',sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
              {generating && i === 0 ? (
                <><span style={{ width: 10, height: 10, border: "2px solid rgba(255,255,255,.4)", borderTopColor: "#fff", borderRadius: "50%", display: "inline-block", animation: "spin .8s linear infinite" }} />Generating…</>
              ) : generated && i === 0 ? (
                <>✅ Download {fmt}</>
              ) : (
                <>{fmt === "PDF" ? "📄" : fmt === "Excel" ? "📊" : "📑"} {fmt}</>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState("reports");
  const overallScore = Math.round(HEALTH_SCORES.reduce((a, s) => a + s.score, 0) / HEALTH_SCORES.length);

  return (
    <DashboardLayout>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        *{box-sizing:border-box}
        ::-webkit-scrollbar{width:4px}
        ::-webkit-scrollbar-thumb{background:#E2E8F0;border-radius:2px}
      `}</style>

      <div style={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }}>

        {/* Header */}
        <div style={{ background: "#fff", borderBottom: "1px solid #F0F4F8", padding: "16px 24px", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <h1 style={{ fontSize: 20, fontWeight: 700, color: "#0F172A" }}>Reports Center 📊</h1>
              <p style={{ fontSize: 13, color: "#64748B", marginTop: 2 }}>Generate and export professional fleet intelligence reports.</p>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {["reports", "health-score"].map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  style={{ padding: "8px 16px", borderRadius: 9, border: "none", background: activeTab === tab ? "#0B1437" : "#F8FAFB", color: activeTab === tab ? "#fff" : "#64748B", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "'Sora',sans-serif", transition: "all .15s" }}>
                  {tab === "reports" ? "📄 Reports" : "🏥 Fleet Health Score"}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px" }}>

          {activeTab === "reports" ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 16 }}>
              {REPORT_TYPES.map(report => <ReportCard key={report.id} report={report} />)}
            </div>
          ) : (
            <div style={{ maxWidth: 900, margin: "0 auto", animation: "fadeUp .4s ease" }}>

              {/* Overall score */}
              <div style={{ background: "linear-gradient(135deg,#0B1437,#0F6E56)", borderRadius: 20, padding: "32px", marginBottom: 20, display: "flex", alignItems: "center", gap: 32, color: "#fff" }}>
                <div style={{ textAlign: "center" }}>
                  <ScoreRing score={overallScore} size={120} color="#00C16E" strokeWidth={8} />
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,.6)", marginTop: 8 }}>Overall Score</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,.5)", letterSpacing: ".5px", marginBottom: 6 }}>FLEET HEALTH SCORE</div>
                  <div style={{ fontSize: 32, fontWeight: 700, marginBottom: 8 }}>
                    {overallScore >= 80 ? "Good" : overallScore >= 60 ? "Moderate" : "Needs Attention"}
                    <span style={{ fontSize: 14, fontWeight: 400, color: "rgba(255,255,255,.6)", marginLeft: 10 }}>GreenLine Logistics · May 2026</span>
                  </div>
                  <p style={{ fontSize: 13, color: "rgba(255,255,255,.65)", lineHeight: 1.6, maxWidth: 480 }}>
                    Your fleet scores well on Safety and Operations but needs attention in Electrification and Sustainability. Focus on EV pilot deployment to improve your score significantly.
                  </p>
                  <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
                    <button style={{ padding: "9px 18px", borderRadius: 9, background: "#00C16E", border: "none", color: "#fff", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "'Sora',sans-serif" }}>📄 Export Report</button>
                    <button style={{ padding: "9px 18px", borderRadius: 9, background: "rgba(255,255,255,.1)", border: "1px solid rgba(255,255,255,.15)", color: "#fff", fontSize: 12, fontWeight: 500, cursor: "pointer", fontFamily: "'Sora',sans-serif" }}>📑 Board Presentation</button>
                  </div>
                </div>
              </div>

              {/* Subscores grid */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 20 }}>
                {HEALTH_SCORES.map(s => (
                  <div key={s.id} style={{ background: "#fff", borderRadius: 14, padding: "18px", border: "1px solid #F0F4F8", boxShadow: "0 2px 8px rgba(0,0,0,.04)" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ width: 32, height: 32, borderRadius: 8, background: `${s.color}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>{s.icon}</div>
                        <span style={{ fontSize: 13, fontWeight: 600, color: "#0F172A" }}>{s.label}</span>
                      </div>
                      <span style={{ fontSize: 20, fontWeight: 700, color: s.color, fontFamily: "'JetBrains Mono',monospace" }}>{s.score}</span>
                    </div>
                    <div style={{ background: "#F0F4F8", borderRadius: 99, height: 6, overflow: "hidden", marginBottom: 8 }}>
                      <div style={{ width: `${s.score}%`, height: "100%", background: s.color, borderRadius: 99, transition: "width .8s ease" }} />
                    </div>
                    <div style={{ fontSize: 11, color: "#94A3B8" }}>{s.desc}</div>
                  </div>
                ))}
              </div>

              {/* Recommendations */}
              <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #F0F4F8", overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,.04)" }}>
                <div style={{ padding: "14px 18px", borderBottom: "1px solid #F8FAFB", fontSize: 13, fontWeight: 600, color: "#0F172A" }}>🎯 Top Recommendations to Improve Score</div>
                {[
                  { priority: "High", icon: "⚡", title: "Launch EV Pilot Programme", desc: "Deploy 25 EVs on high-mileage routes — will increase Electrification score from 45 to 68", impact: "+23 pts" },
                  { priority: "High", icon: "🌱", title: "Implement Idle Reduction Policy", desc: "Reduce engine idling by 30% through driver training — improves Sustainability score", impact: "+12 pts" },
                  { priority: "Medium", icon: "🔧", title: "Address 12 High-Risk Vehicles", desc: "Schedule preventive maintenance for flagged vehicles — prevents costly breakdowns", impact: "+8 pts" },
                  { priority: "Medium", icon: "📊", title: "Install Telematics on Remaining 40 Vehicles", desc: "Full fleet visibility will unlock Operations analytics and improve score accuracy", impact: "+6 pts" },
                ].map((rec, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "14px 18px", borderBottom: i < 3 ? "1px solid #F8FAFB" : "none" }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: rec.priority === "High" ? "#FEF2F2" : "#FEF3C7", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>{rec.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                        <span style={{ fontSize: 13, fontWeight: 600, color: "#0F172A" }}>{rec.title}</span>
                        <span style={{ fontSize: 10, background: rec.priority === "High" ? "#FEF2F2" : "#FEF3C7", color: rec.priority === "High" ? "#DC2626" : "#D97706", padding: "1px 7px", borderRadius: 99, fontWeight: 600 }}>{rec.priority}</span>
                      </div>
                      <div style={{ fontSize: 12, color: "#64748B" }}>{rec.desc}</div>
                    </div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "#00C16E", whiteSpace: "nowrap" }}>{rec.impact}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
