"use client";
import { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";

const REPORTS = [
  { id:"ev", icon:"⚡", title:"EV Readiness Assessment", desc:"Full electrification readiness with vehicle suitability scores, pilot plan and replacement roadmap.", color:"#00C16E", formats:["PDF","Excel","PowerPoint"], metrics:{score:"72/100", vehicles:"87 EV-Ready", saving:"$1.2M/yr", co2:"890T saved"} },
  { id:"charging", icon:"🔌", title:"Charging Infrastructure Plan", desc:"Depot charging design with AC/DC requirements, power load analysis and smart charging strategy.", color:"#3B82F6", formats:["PDF","Excel"], metrics:{ac:"24 AC Chargers", dc:"8 DC Fast", power:"180kW", cost:"$340K"} },
  { id:"tco", icon:"💰", title:"TCO & ROI Report", desc:"5-year total cost of ownership comparison between ICE and EV with payback period and lifecycle savings.", color:"#F97316", formats:["PDF","Excel","PowerPoint"], metrics:{payback:"3.2 yrs", saving:"$4.8M", roi:"142%", co2:"890T"} },
  { id:"health", icon:"🏥", title:"Fleet Health Report", desc:"Comprehensive fleet health score with subscores for operations, maintenance, sustainability and safety.", color:"#8B5CF6", formats:["PDF","PowerPoint"], metrics:{overall:"74/100", ops:"81", maintenance:"68", sustainability:"62"} },
  { id:"maintenance", icon:"🔧", title:"Maintenance Risk Assessment", desc:"Predictive maintenance analysis with risk scores, failure forecasts and priority scheduling.", color:"#EC4899", formats:["PDF","Excel"], metrics:{highRisk:"12 vehicles", medRisk:"34 vehicles", saving:"$280K", uptime:"96.4%"} },
  { id:"esg", icon:"🌱", title:"Sustainability & ESG Report", desc:"Carbon footprint, Net Zero tracking, UAE/GCC sustainability compliance and board-ready ESG metrics.", color:"#10B981", formats:["PDF","PowerPoint"], metrics:{co2:"2,840T", reduction:"34%", netZero:"2038", score:"B+"} },
  { id:"board", icon:"📊", title:"Executive Board Pack", desc:"C-suite presentation with fleet KPIs, strategic recommendations and investment decisions.", color:"#0B1437", formats:["PowerPoint","PDF"], metrics:{slides:"12 slides", kpis:"8 KPIs", recs:"5 actions", priority:"High"} },
];

const HEALTH = [
  { label:"Operations", score:81, icon:"🚛", color:"#00C16E" },
  { label:"Maintenance", score:68, icon:"🔧", color:"#F97316" },
  { label:"Sustainability", score:62, icon:"🌱", color:"#10B981" },
  { label:"Electrification", score:45, icon:"⚡", color:"#3B82F6" },
  { label:"Safety", score:88, icon:"🛡️", color:"#8B5CF6" },
  { label:"Financial", score:74, icon:"💰", color:"#EC4899" },
];

function ScoreRing({ score, size=80, color="#00C16E" }) {
  const r=(size-12)/2, circ=2*Math.PI*r, offset=circ-(score/100)*circ;
  return <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}><circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#F0F4F8" strokeWidth={6}/><circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={6} strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round" transform={`rotate(-90 ${size/2} ${size/2})`}/><text x="50%" y="50%" textAnchor="middle" dominantBaseline="central" fontSize={size*.22} fontWeight="700" fill="#0F172A">{score}</text></svg>;
}

function ReportCard({ r }) {
  const [gen, setGen] = useState(false);
  const [loading, setLoading] = useState(false);
  const generate = async () => { setLoading(true); await new Promise(res => setTimeout(res,1500)); setLoading(false); setGen(true); };
  return (
    <div style={{ background:"#fff", border:"1px solid #F0F4F8", borderRadius:14, overflow:"hidden", boxShadow:"0 2px 8px rgba(0,0,0,.04)", transition:"transform .2s" }} onMouseEnter={e=>e.currentTarget.style.transform="translateY(-2px)"} onMouseLeave={e=>e.currentTarget.style.transform="none"}>
      <div style={{ height:4, background:r.color }} />
      <div style={{ padding:16 }}>
        <div style={{ display:"flex", alignItems:"flex-start", gap:10, marginBottom:10 }}>
          <div style={{ width:40, height:40, borderRadius:10, background:`${r.color}15`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20 }}>{r.icon}</div>
          <div><div style={{ fontSize:13, fontWeight:700, color:"#0F172A", marginBottom:4 }}>{r.title}</div><div style={{ display:"flex", gap:4 }}>{r.formats.map((f,i)=><span key={i} style={{ fontSize:10, background:`${r.color}12`, color:r.color, padding:"1px 7px", borderRadius:99 }}>{f}</span>)}</div></div>
        </div>
        <p style={{ fontSize:12, color:"#64748B", lineHeight:1.6, marginBottom:14 }}>{r.desc}</p>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:6, marginBottom:14 }}>
          {Object.entries(r.metrics).map(([k,v],i)=><div key={i} style={{ background:"#F8FAFB", borderRadius:8, padding:"7px 10px" }}><div style={{ fontSize:13, fontWeight:700, color:r.color }}>{v}</div><div style={{ fontSize:10, color:"#94A3B8", textTransform:"capitalize" }}>{k.replace(/([A-Z])/g,' $1')}</div></div>)}
        </div>
        <button onClick={generate} disabled={loading} style={{ width:"100%", padding:"9px", borderRadius:9, background:gen?"#DCFCE7":r.color, border:gen?`1px solid ${r.color}`:"none", color:gen?r.color:"#fff", fontSize:12, fontWeight:600, cursor:"pointer", fontFamily:"'Sora',sans-serif" }}>
          {loading?"Generating…":gen?"✅ Download Report":"Generate Report"}
        </button>
      </div>
    </div>
  );
}

export default function ReportsPage() {
  const [tab, setTab] = useState("reports");
  const overall = Math.round(HEALTH.reduce((a,s)=>a+s.score,0)/HEALTH.length);
  return (
    <DashboardLayout>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&display=swap');*{box-sizing:border-box}::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:#E2E8F0;border-radius:2px}`}</style>
      <div style={{ display:"flex", flexDirection:"column", height:"100%", overflow:"hidden" }}>
        <div style={{ background:"#fff", borderBottom:"1px solid #F0F4F8", padding:"16px 24px", display:"flex", alignItems:"center", justifyContent:"space-between", flexShrink:0 }}>
          <div><h1 style={{ fontSize:20, fontWeight:700, color:"#0F172A" }}>Reports Center 📊</h1><p style={{ fontSize:13, color:"#64748B", marginTop:2 }}>Generate and export professional fleet intelligence reports.</p></div>
          <div style={{ display:"flex", gap:8 }}>
            {["reports","health-score"].map(t=><button key={t} onClick={()=>setTab(t)} style={{ padding:"8px 16px", borderRadius:9, border:"none", background:tab===t?"#0B1437":"#F8FAFB", color:tab===t?"#fff":"#64748B", fontSize:12, fontWeight:600, cursor:"pointer", fontFamily:"'Sora',sans-serif" }}>{t==="reports"?"📄 Reports":"🏥 Fleet Health Score"}</button>)}
          </div>
        </div>
        <div style={{ flex:1, overflowY:"auto", padding:"20px 24px" }}>
          {tab==="reports" ? (
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap:16 }}>{REPORTS.map(r=><ReportCard key={r.id} r={r} />)}</div>
          ) : (
            <div style={{ maxWidth:900, margin:"0 auto" }}>
              <div style={{ background:"linear-gradient(135deg,#0B1437,#0F6E56)", borderRadius:20, padding:"32px", marginBottom:20, display:"flex", alignItems:"center", gap:32, color:"#fff" }}>
                <div style={{ textAlign:"center" }}><ScoreRing score={overall} size={120} color="#00C16E" /><div style={{ fontSize:12, color:"rgba(255,255,255,.6)", marginTop:8 }}>Overall Score</div></div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:11, color:"rgba(255,255,255,.5)", marginBottom:6 }}>FLEET HEALTH SCORE</div>
                  <div style={{ fontSize:30, fontWeight:700, marginBottom:8 }}>{overall>=80?"Good":overall>=60?"Moderate":"Needs Attention"}</div>
                  <p style={{ fontSize:13, color:"rgba(255,255,255,.65)", lineHeight:1.6 }}>Your fleet scores well on Safety and Operations but needs attention in Electrification. Focus on EV pilot deployment to improve your score significantly.</p>
                  <div style={{ display:"flex", gap:10, marginTop:14 }}>
                    <button style={{ padding:"9px 18px", borderRadius:9, background:"#00C16E", border:"none", color:"#fff", fontSize:12, fontWeight:600, cursor:"pointer", fontFamily:"'Sora',sans-serif" }}>📄 Export Report</button>
                    <button style={{ padding:"9px 18px", borderRadius:9, background:"rgba(255,255,255,.1)", border:"1px solid rgba(255,255,255,.15)", color:"#fff", fontSize:12, cursor:"pointer", fontFamily:"'Sora',sans-serif" }}>📑 Board Pack</button>
                  </div>
                </div>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14 }}>
                {HEALTH.map(s=>(
                  <div key={s.id} style={{ background:"#fff", borderRadius:14, padding:"18px", border:"1px solid #F0F4F8" }}>
                    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:12 }}>
                      <div style={{ display:"flex", alignItems:"center", gap:8 }}><div style={{ width:32, height:32, borderRadius:8, background:`${s.color}15`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16 }}>{s.icon}</div><span style={{ fontSize:13, fontWeight:600, color:"#0F172A" }}>{s.label}</span></div>
                      <span style={{ fontSize:20, fontWeight:700, color:s.color }}>{s.score}</span>
                    </div>
                    <div style={{ background:"#F0F4F8", borderRadius:99, height:6 }}><div style={{ width:`${s.score}%`, height:"100%", background:s.color, borderRadius:99 }} /></div>
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
