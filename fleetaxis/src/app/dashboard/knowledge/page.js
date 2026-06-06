"use client";
import { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";

const ITEMS = [
  { id:1, cat:"ev", icon:"⚡", title:"BYD Atto 3 — Complete Specification Guide", desc:"Battery specs, charging requirements, fleet suitability and warranty for UAE market.", tags:["BYD","EV Specs","UAE"], date:"May 2026", source:"OEM", reads:124 },
  { id:2, cat:"ev", icon:"🔌", title:"DEWA EV Green Charger Programme 2026", desc:"DEWA public charging network, tariffs, smart charging APIs and depot integration.", tags:["DEWA","Charging","UAE"], date:"Apr 2026", source:"DEWA", reads:89 },
  { id:3, cat:"incentives", icon:"💰", title:"UAE Federal EV Incentives & Exemptions 2026", desc:"Federal and emirate-level EV purchase subsidies, toll exemptions, registration discounts.", tags:["UAE","Incentives","Policy"], date:"Mar 2026", source:"Government", reads:203 },
  { id:4, cat:"incentives", icon:"🇮🇳", title:"India FAME III — Fleet EV Subsidy Guide", desc:"FAME III eligibility, subsidy amounts, application process and approval timelines.", tags:["India","FAME III","Subsidy"], date:"Feb 2026", source:"Government", reads:156 },
  { id:5, cat:"standards", icon:"📋", title:"OCPP 2.0.1 — Fleet Charging Standard", desc:"Open Charge Point Protocol for fleet depot charging management and smart grid integration.", tags:["OCPP","Standards","Charging"], date:"Jan 2026", source:"Industry", reads:67 },
  { id:6, cat:"standards", icon:"🌍", title:"GHG Protocol — Fleet Scope 1 & 2 Reporting", desc:"Calculating and reporting Scope 1 (fuel combustion) and Scope 2 (charging electricity) emissions.", tags:["GHG","ESG","Reporting"], date:"Dec 2025", source:"GHG Protocol", reads:91 },
  { id:7, cat:"sop", icon:"📝", title:"EV Driver Training & Handover SOP", desc:"Standard operating procedure for training drivers transitioning from ICE to EV.", tags:["Training","SOP","EV"], date:"Sep 2025", source:"FleetAxis", reads:178 },
  { id:8, cat:"frameworks", icon:"🏗️", title:"FleetAxis EV Transition Methodology v3.0", desc:"End-to-end consulting framework for fleet electrification — assessment, planning, deployment.", tags:["Methodology","Framework","FleetAxis"], date:"Aug 2025", source:"FleetAxis", reads:312 },
];

const CATS = [{id:"all",label:"All",icon:"📚"},{id:"ev",label:"EV & Charging",icon:"⚡"},{id:"incentives",label:"Incentives",icon:"💰"},{id:"standards",label:"Standards",icon:"📋"},{id:"sop",label:"SOPs",icon:"📝"},{id:"frameworks",label:"Frameworks",icon:"🏗️"}];
const SRC_COLORS = { OEM:"#3B82F6", DEWA:"#00C16E", Government:"#8B5CF6", Industry:"#F97316", FleetAxis:"#0B1437", "GHG Protocol":"#10B981" };

export default function KnowledgePage() {
  const [cat, setCat] = useState("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const filtered = ITEMS.filter(item => (cat==="all"||item.cat===cat) && (!search||item.title.toLowerCase().includes(search.toLowerCase())||item.tags.some(t=>t.toLowerCase().includes(search.toLowerCase()))));
  return (
    <DashboardLayout>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&display=swap');*{box-sizing:border-box}input:focus{outline:none}::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:#E2E8F0;border-radius:2px}@keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}`}</style>
      <div style={{ display:"flex", flexDirection:"column", height:"100%", overflow:"hidden" }}>
        <div style={{ background:"#fff", borderBottom:"1px solid #F0F4F8", padding:"16px 24px", display:"flex", alignItems:"center", justifyContent:"space-between", flexShrink:0 }}>
          <div><h1 style={{ fontSize:20, fontWeight:700, color:"#0F172A" }}>Knowledge Base 📚</h1><p style={{ fontSize:13, color:"#64748B", marginTop:2 }}>EV specs, incentives, standards, SOPs and consulting frameworks.</p></div>
          <div style={{ position:"relative" }}><div style={{ position:"absolute", left:10, top:"50%", transform:"translateY(-50%)", color:"#94A3B8" }}>🔍</div><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search knowledge base..." style={{ padding:"9px 14px 9px 32px", borderRadius:10, border:"1.5px solid #E2E8F0", fontSize:13, color:"#334155", background:"#F8FAFB", width:280, fontFamily:"'Sora',sans-serif" }} onFocus={e=>e.target.style.borderColor="#00C16E"} onBlur={e=>e.target.style.borderColor="#E2E8F0"} /></div>
        </div>
        <div style={{ background:"#fff", borderBottom:"1px solid #F0F4F8", padding:"0 24px", display:"flex", gap:2, overflowX:"auto", flexShrink:0 }}>
          {CATS.map(c=><button key={c.id} onClick={()=>setCat(c.id)} style={{ padding:"11px 14px", border:"none", background:"none", cursor:"pointer", fontSize:12, fontWeight:cat===c.id?600:400, color:cat===c.id?"#00C16E":"#64748B", borderBottom:`2px solid ${cat===c.id?"#00C16E":"transparent"}`, display:"flex", alignItems:"center", gap:5, whiteSpace:"nowrap", fontFamily:"'Sora',sans-serif" }}>{c.icon} {c.label}</button>)}
        </div>
        <div style={{ flex:1, display:"flex", overflow:"hidden" }}>
          <div style={{ flex:1, overflowY:"auto", padding:"16px 24px" }}>
            <div style={{ fontSize:12, color:"#94A3B8", marginBottom:14 }}>{filtered.length} articles</div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:12 }}>
              {filtered.map(item=>(
                <div key={item.id} onClick={()=>setSelected(item)} style={{ background:"#fff", border:`1px solid ${selected?.id===item.id?"#00C16E":"#F0F4F8"}`, borderRadius:12, padding:14, cursor:"pointer", transition:"all .15s" }} onMouseEnter={e=>{if(selected?.id!==item.id)e.currentTarget.style.borderColor="#CBD5E1";}} onMouseLeave={e=>{if(selected?.id!==item.id)e.currentTarget.style.borderColor="#F0F4F8";}}>
                  <div style={{ display:"flex", alignItems:"flex-start", gap:10, marginBottom:8 }}>
                    <span style={{ fontSize:22 }}>{item.icon}</span>
                    <div><div style={{ fontSize:13, fontWeight:600, color:"#0F172A", lineHeight:1.4, marginBottom:4 }}>{item.title}</div><div style={{ display:"flex", gap:6 }}><span style={{ fontSize:10, fontWeight:600, padding:"1px 7px", borderRadius:99, background:`${SRC_COLORS[item.source]||"#94A3B8"}15`, color:SRC_COLORS[item.source]||"#94A3B8" }}>{item.source}</span><span style={{ fontSize:10, color:"#94A3B8" }}>{item.date}</span></div></div>
                  </div>
                  <p style={{ fontSize:12, color:"#64748B", lineHeight:1.5, marginBottom:10 }}>{item.desc}</p>
                  <div style={{ display:"flex", gap:5, flexWrap:"wrap" }}>{item.tags.map((t,i)=><span key={i} style={{ fontSize:10, background:"#F8FAFB", border:"1px solid #E2E8F0", color:"#64748B", padding:"2px 7px", borderRadius:99 }}>{t}</span>)}</div>
                </div>
              ))}
            </div>
          </div>
          {selected && (
            <div style={{ width:300, flexShrink:0, background:"#fff", borderLeft:"1px solid #F0F4F8", overflowY:"auto", padding:"20px 18px", animation:"fadeUp .3s ease" }}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:16 }}><span style={{ fontSize:12, fontWeight:600, color:"#334155" }}>Document Details</span><button onClick={()=>setSelected(null)} style={{ background:"none", border:"none", cursor:"pointer", fontSize:16, color:"#94A3B8" }}>✕</button></div>
              <div style={{ fontSize:28, marginBottom:10 }}>{selected.icon}</div>
              <h2 style={{ fontSize:14, fontWeight:700, color:"#0F172A", marginBottom:8, lineHeight:1.4 }}>{selected.title}</h2>
              <p style={{ fontSize:13, color:"#64748B", lineHeight:1.6, marginBottom:16 }}>{selected.desc}</p>
              <div style={{ display:"flex", gap:5, flexWrap:"wrap", marginBottom:16 }}>{selected.tags.map((t,i)=><span key={i} style={{ fontSize:11, background:"#F0FDF9", border:"1px solid #6EE7B7", color:"#065F46", padding:"2px 8px", borderRadius:99 }}>{t}</span>)}</div>
              <div style={{ background:"#F8FAFB", borderRadius:10, padding:"12px 14px", marginBottom:16 }}>
                {[["Source",selected.source],["Updated",selected.date],["Views",selected.reads]].map(([k,v],i)=><div key={i} style={{ display:"flex", justifyContent:"space-between", fontSize:12, color:"#64748B", marginBottom:i<2?6:0 }}><span>{k}</span><span style={{ fontWeight:600, color:"#334155" }}>{v}</span></div>)}
              </div>
              <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                <button style={{ padding:"10px", borderRadius:9, background:"linear-gradient(135deg,#00C16E,#009955)", border:"none", color:"#fff", fontSize:13, fontWeight:600, cursor:"pointer", fontFamily:"'Sora',sans-serif" }}>📖 Read Document</button>
                <button style={{ padding:"10px", borderRadius:9, border:"1px solid #E2E8F0", background:"#fff", fontSize:13, color:"#475569", cursor:"pointer", fontFamily:"'Sora',sans-serif" }}>💬 Ask AI about this</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
