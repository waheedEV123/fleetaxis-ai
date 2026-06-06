"use client";
import { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";

const NOTIFS = [
  { id:1, type:"alert", icon:"⚡", title:"UAE EV Incentive Update", desc:"New federal EV purchase subsidy — up to AED 15,000 per vehicle for commercial fleets before 31 Dec 2026.", time:"2 hours ago", read:false, priority:"high" },
  { id:2, type:"report", icon:"📊", title:"Monthly Fleet Health Report Ready", desc:"Your May 2026 Fleet Health Report: Overall score 74/100. 3 new recommendations available.", time:"5 hours ago", read:false, priority:"medium" },
  { id:3, type:"maintenance", icon:"🔧", title:"12 Vehicles Flagged for Maintenance", desc:"Predictive analysis identified 12 high-risk vehicles requiring attention within 14 days.", time:"Yesterday", read:false, priority:"high" },
  { id:4, type:"policy", icon:"🏛️", title:"Saudi Vision 2030 Fleet Mandate Update", desc:"KSA updated fleet sustainability reporting requirements. Deadline: 30 June 2026.", time:"2 days ago", read:true, priority:"medium" },
  { id:5, type:"usage", icon:"📈", title:"Query Limit at 80%", desc:"You have used 240 of 300 monthly AI queries. Consider upgrading to Business plan.", time:"3 days ago", read:true, priority:"low" },
  { id:6, type:"report", icon:"🌱", title:"ESG Report Generated", desc:"Q1 2026 sustainability report ready. CO₂ reduction: 34% vs baseline. Net Zero: 2038.", time:"4 days ago", read:true, priority:"medium" },
];

const P_STYLES = { high:{bg:"#FEF2F2",c:"#DC2626",l:"High"}, medium:{bg:"#FEF3C7",c:"#D97706",l:"Medium"}, low:{bg:"#F0F9FF",c:"#0284C7",l:"Low"} };
const T_COLORS = { alert:"#EF4444", report:"#3B82F6", maintenance:"#F97316", policy:"#8B5CF6", usage:"#06B6D4" };

export default function NotificationsPage() {
  const [notifs, setNotifs] = useState(NOTIFS);
  const [filter, setFilter] = useState("all");
  const unread = notifs.filter(n=>!n.read).length;
  const filtered = filter==="all"?notifs:filter==="unread"?notifs.filter(n=>!n.read):notifs.filter(n=>n.type===filter);
  return (
    <DashboardLayout>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&display=swap');*{box-sizing:border-box}::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:#E2E8F0;border-radius:2px}`}</style>
      <div style={{ display:"flex", flexDirection:"column", height:"100%", overflow:"hidden" }}>
        <div style={{ background:"#fff", borderBottom:"1px solid #F0F4F8", padding:"16px 24px", display:"flex", alignItems:"center", justifyContent:"space-between", flexShrink:0 }}>
          <div><h1 style={{ fontSize:20, fontWeight:700, color:"#0F172A", display:"flex", alignItems:"center", gap:10 }}>Notifications 🔔{unread>0&&<span style={{ fontSize:12, background:"#EF4444", color:"#fff", padding:"2px 8px", borderRadius:99 }}>{unread} new</span>}</h1><p style={{ fontSize:13, color:"#64748B", marginTop:2 }}>Policy alerts, report updates and fleet intelligence notifications.</p></div>
          {unread>0&&<button onClick={()=>setNotifs(prev=>prev.map(n=>({...n,read:true})))} style={{ padding:"8px 16px", borderRadius:9, border:"1px solid #E2E8F0", background:"#fff", fontSize:12, color:"#64748B", cursor:"pointer", fontFamily:"'Sora',sans-serif" }}>Mark all read</button>}
        </div>
        <div style={{ background:"#fff", borderBottom:"1px solid #F0F4F8", padding:"0 24px", display:"flex", gap:2, flexShrink:0 }}>
          {[{id:"all",l:"All"},{id:"unread",l:`Unread (${unread})`},{id:"alert",l:"Alerts"},{id:"report",l:"Reports"},{id:"maintenance",l:"Maintenance"}].map(f=><button key={f.id} onClick={()=>setFilter(f.id)} style={{ padding:"11px 14px", border:"none", background:"none", cursor:"pointer", fontSize:12, fontWeight:filter===f.id?600:400, color:filter===f.id?"#00C16E":"#64748B", borderBottom:`2px solid ${filter===f.id?"#00C16E":"transparent"}`, whiteSpace:"nowrap", fontFamily:"'Sora',sans-serif" }}>{f.l}</button>)}
        </div>
        <div style={{ flex:1, overflowY:"auto", padding:"16px 24px" }}>
          <div style={{ maxWidth:720, margin:"0 auto" }}>
            {filtered.map(n=>(
              <div key={n.id} onClick={()=>setNotifs(prev=>prev.map(x=>x.id===n.id?{...x,read:true}:x))} style={{ background:n.read?"#fff":"#F0FDF9", border:`1px solid ${n.read?"#F0F4F8":"#6EE7B7"}`, borderRadius:12, padding:"14px 16px", marginBottom:10, cursor:"pointer", display:"flex", gap:12 }} onMouseEnter={e=>e.currentTarget.style.transform="translateX(4px)"} onMouseLeave={e=>e.currentTarget.style.transform="none"}>
                <div style={{ width:38, height:38, borderRadius:10, background:`${T_COLORS[n.type]||"#94A3B8"}15`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, flexShrink:0 }}>{n.icon}</div>
                <div style={{ flex:1 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
                    <span style={{ fontSize:13, fontWeight:600, color:"#0F172A" }}>{n.title}</span>
                    <span style={{ fontSize:10, fontWeight:600, padding:"1px 7px", borderRadius:99, background:P_STYLES[n.priority].bg, color:P_STYLES[n.priority].c }}>{P_STYLES[n.priority].l}</span>
                    {!n.read&&<div style={{ width:6, height:6, borderRadius:"50%", background:"#00C16E" }} />}
                  </div>
                  <p style={{ fontSize:12, color:"#64748B", lineHeight:1.5, marginBottom:6 }}>{n.desc}</p>
                  <span style={{ fontSize:11, color:"#94A3B8" }}>{n.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
