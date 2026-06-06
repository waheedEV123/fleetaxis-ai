"use client";
import { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";

const METRICS = [
  { id:"util", label:"Fleet Utilisation", icon:"🚛", unit:"%", your:71, industry:78, best:91, color:"#00C16E" },
  { id:"cost", label:"Cost per km", icon:"💰", unit:"AED", your:2.84, industry:2.31, best:1.62, color:"#F97316", lower:true },
  { id:"maint", label:"Maintenance Cost", icon:"🔧", unit:"AED/veh/yr", your:8200, industry:6800, best:4900, color:"#EC4899", lower:true },
  { id:"fuel", label:"Fuel Efficiency", icon:"⛽", unit:"km/L", your:9.2, industry:10.4, best:12.8, color:"#3B82F6" },
  { id:"ev", label:"EV Adoption Rate", icon:"⚡", unit:"%", your:8, industry:18, best:42, color:"#8B5CF6" },
  { id:"co2", label:"CO₂ per km", icon:"🌱", unit:"g/km", your:182, industry:156, best:98, color:"#10B981", lower:true },
  { id:"health", label:"Fleet Health Score", icon:"🏥", unit:"/100", your:74, industry:71, best:89, color:"#0B1437" },
];

export default function BenchmarkingPage() {
  const [industry, setIndustry] = useState("Logistics & Last Mile");
  const [region, setRegion] = useState("UAE");
  const getStatus = m => { const diff = m.lower ? ((m.industry-m.your)/m.industry)*100 : ((m.your-m.industry)/m.industry)*100; return diff>=5?{l:"Above Average",c:"#00C16E",bg:"#DCFCE7"}:diff>=-5?{l:"On Par",c:"#F97316",bg:"#FEF3C7"}:{l:"Below Average",c:"#EF4444",bg:"#FEF2F2"}; };
  const above = METRICS.filter(m=>getStatus(m).l==="Above Average").length;
  const below = METRICS.filter(m=>getStatus(m).l==="Below Average").length;
  return (
    <DashboardLayout>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&family=JetBrains+Mono:wght@500&display=swap');*{box-sizing:border-box}select:focus{outline:none}::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:#E2E8F0;border-radius:2px}`}</style>
      <div style={{ display:"flex", flexDirection:"column", height:"100%", overflow:"hidden" }}>
        <div style={{ background:"#fff", borderBottom:"1px solid #F0F4F8", padding:"16px 24px", display:"flex", alignItems:"center", justifyContent:"space-between", flexShrink:0 }}>
          <div><h1 style={{ fontSize:20, fontWeight:700, color:"#0F172A" }}>Benchmarking 📈</h1><p style={{ fontSize:13, color:"#64748B", marginTop:2 }}>Compare your fleet against industry peers.</p></div>
          <div style={{ display:"flex", gap:8 }}>
            <select value={industry} onChange={e=>setIndustry(e.target.value)} style={{ padding:"8px 12px", borderRadius:9, border:"1px solid #E2E8F0", fontSize:12, color:"#334155", background:"#fff", fontFamily:"'Sora',sans-serif" }}>{["Logistics & Last Mile","Telecom","Utilities","Government","Municipal","Airports","Construction"].map(i=><option key={i}>{i}</option>)}</select>
            <select value={region} onChange={e=>setRegion(e.target.value)} style={{ padding:"8px 12px", borderRadius:9, border:"1px solid #E2E8F0", fontSize:12, color:"#334155", background:"#fff", fontFamily:"'Sora',sans-serif" }}>{["UAE","GCC","India","Europe","Global"].map(r=><option key={r}>{r}</option>)}</select>
          </div>
        </div>
        <div style={{ flex:1, overflowY:"auto", padding:"20px 24px" }}>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, marginBottom:20 }}>
            {[{l:"Above Average",v:above,i:"📈",c:"#00C16E",bg:"#DCFCE7"},{l:"On Par",v:METRICS.length-above-below,i:"➡️",c:"#F97316",bg:"#FEF3C7"},{l:"Below Average",v:below,i:"📉",c:"#EF4444",bg:"#FEF2F2"},{l:"Potential Saving",v:"$340K",i:"💰",c:"#8B5CF6",bg:"#F3F0FF"}].map((s,i)=>(
              <div key={i} style={{ background:"#fff", borderRadius:12, padding:"14px 16px", border:"1px solid #F0F4F8" }}>
                <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6 }}><div style={{ width:30, height:30, borderRadius:8, background:s.bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:14 }}>{s.i}</div><span style={{ fontSize:11, color:"#64748B" }}>{s.l}</span></div>
                <div style={{ fontSize:24, fontWeight:700, color:s.c, fontFamily:"'JetBrains Mono',monospace" }}>{s.v}</div>
              </div>
            ))}
          </div>
          <div style={{ background:"#fff", borderRadius:14, border:"1px solid #F0F4F8", overflow:"hidden" }}>
            <div style={{ padding:"14px 18px", borderBottom:"1px solid #F8FAFB", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <span style={{ fontSize:13, fontWeight:600, color:"#0F172A" }}>Performance vs {industry} · {region}</span>
              <div style={{ display:"flex", gap:14, fontSize:11, color:"#94A3B8" }}>
                <span>🟢 Your fleet</span><span>⬜ Industry avg</span><span>🟡 Best in class</span>
              </div>
            </div>
            {METRICS.map((m,i)=>{
              const status=getStatus(m), max=Math.max(m.your,m.industry,m.best)*1.1;
              return (
                <div key={m.id} style={{ padding:"14px 18px", borderBottom:i<METRICS.length-1?"1px solid #F8FAFB":"none", display:"flex", alignItems:"center", gap:16 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8, minWidth:160 }}><span style={{ fontSize:16 }}>{m.icon}</span><div><div style={{ fontSize:12, fontWeight:600, color:"#334155" }}>{m.label}</div><div style={{ fontSize:10, color:"#94A3B8" }}>{m.unit}</div></div></div>
                  <div style={{ flex:1, display:"flex", flexDirection:"column", gap:5 }}>
                    {[{v:m.your,c:m.color},{v:m.industry,c:"#CBD5E1"},{v:m.best,c:"#FFD700"}].map((bar,j)=>(
                      <div key={j} style={{ display:"flex", alignItems:"center", gap:8 }}>
                        <div style={{ background:"#F0F4F8", borderRadius:99, height:7, width:160, overflow:"hidden" }}><div style={{ width:`${Math.min((bar.v/max)*100,100)}%`, height:"100%", background:bar.c, borderRadius:99 }} /></div>
                        <span style={{ fontSize:11, color:bar.c==="#CBD5E1"?"#94A3B8":bar.c, fontFamily:"'JetBrains Mono',monospace", minWidth:40 }}>{bar.v}</span>
                      </div>
                    ))}
                  </div>
                  <span style={{ fontSize:10, fontWeight:600, padding:"3px 8px", borderRadius:99, background:status.bg, color:status.c, whiteSpace:"nowrap" }}>{status.l}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
