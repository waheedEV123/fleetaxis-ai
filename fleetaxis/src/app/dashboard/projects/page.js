"use client";
import { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { useRouter } from "next/navigation";

const PT = [{id:"ev",icon:"⚡",label:"EV Transition",color:"#00C16E"},{id:"charging",icon:"🔌",label:"Charging Study",color:"#3B82F6"},{id:"maintenance",icon:"🔧",label:"Maintenance",color:"#F97316"},{id:"sustainability",icon:"🌱",label:"Sustainability",color:"#10B981"},{id:"tco",icon:"💰",label:"TCO Analysis",color:"#8B5CF6"},{id:"fleet",icon:"🚛",label:"Fleet Health",color:"#EC4899"}];
const SAMPLE = [{id:1,name:"EV Transition Study — GreenLine Logistics",type:"ev",status:"active",files:3,messages:12,date:"20 May 2026",progress:65},{id:2,name:"Charging Infrastructure Plan — Dubai Depot",type:"charging",status:"active",files:2,messages:8,date:"18 May 2026",progress:40},{id:3,name:"Annual Fleet Health Review Q2 2026",type:"fleet",status:"completed",files:5,messages:24,date:"10 May 2026",progress:100},{id:4,name:"Sustainability Report FY2026",type:"sustainability",status:"draft",files:1,messages:3,date:"5 May 2026",progress:20}];
const SC = {active:"#00C16E",completed:"#3B82F6",draft:"#94A3B8"};

export default function ProjectsPage() {
  const router = useRouter();
  const [projects, setProjects] = useState(SAMPLE);
  const [showNew, setShowNew] = useState(false);
  const [newP, setNewP] = useState({name:"",type:"ev"});
  return (
    <DashboardLayout>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&family=JetBrains+Mono:wght@500&display=swap');*{box-sizing:border-box}input:focus{outline:none}::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:#E2E8F0;border-radius:2px}@keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}`}</style>
      <div style={{ display:"flex", flexDirection:"column", height:"100%", overflow:"hidden" }}>
        <div style={{ background:"#fff", borderBottom:"1px solid #F0F4F8", padding:"16px 24px", display:"flex", alignItems:"center", justifyContent:"space-between", flexShrink:0 }}>
          <div><h1 style={{ fontSize:20, fontWeight:700, color:"#0F172A" }}>Projects 📁</h1><p style={{ fontSize:13, color:"#64748B", marginTop:2 }}>Manage your fleet consulting engagements.</p></div>
          <button onClick={()=>setShowNew(true)} style={{ padding:"10px 18px", borderRadius:10, background:"linear-gradient(135deg,#00C16E,#009955)", border:"none", color:"#fff", fontSize:13, fontWeight:600, cursor:"pointer", fontFamily:"'Sora',sans-serif" }}>+ New Project</button>
        </div>
        <div style={{ flex:1, overflowY:"auto", padding:"20px 24px" }}>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(340px,1fr))", gap:14 }}>
            {projects.map(p=>{
              const pt=PT.find(t=>t.id===p.type)||PT[0];
              return (
                <div key={p.id} onClick={()=>router.push("/dashboard")} style={{ background:"#fff", border:"1px solid #F0F4F8", borderRadius:14, padding:16, cursor:"pointer", transition:"all .2s", boxShadow:"0 2px 8px rgba(0,0,0,.04)" }} onMouseEnter={e=>{e.currentTarget.style.borderColor=pt.color;e.currentTarget.style.transform="translateY(-2px)";}} onMouseLeave={e=>{e.currentTarget.style.borderColor="#F0F4F8";e.currentTarget.style.transform="none";}}>
                  <div style={{ display:"flex", alignItems:"flex-start", gap:10, marginBottom:12 }}>
                    <div style={{ width:38, height:38, borderRadius:10, background:`${pt.color}15`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, flexShrink:0 }}>{pt.icon}</div>
                    <div style={{ flex:1 }}><div style={{ fontSize:13, fontWeight:600, color:"#0F172A", lineHeight:1.4, marginBottom:4 }}>{p.name}</div><div style={{ display:"flex", alignItems:"center", gap:6 }}><div style={{ width:6, height:6, borderRadius:"50%", background:SC[p.status] }} /><span style={{ fontSize:11, color:SC[p.status], fontWeight:500, textTransform:"capitalize" }}>{p.status}</span><span style={{ fontSize:11, color:"#94A3B8" }}>· {p.date}</span></div></div>
                  </div>
                  <div style={{ marginBottom:12 }}><div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}><span style={{ fontSize:11, color:"#64748B" }}>Progress</span><span style={{ fontSize:11, fontWeight:600, color:pt.color }}>{p.progress}%</span></div><div style={{ background:"#F0F4F8", borderRadius:99, height:5 }}><div style={{ width:`${p.progress}%`, height:"100%", background:pt.color, borderRadius:99 }} /></div></div>
                  <div style={{ display:"flex", gap:8 }}>
                    <div style={{ flex:1, background:"#F8FAFB", borderRadius:8, padding:"6px 10px", textAlign:"center" }}><div style={{ fontSize:14, fontWeight:700, color:"#0F172A", fontFamily:"'JetBrains Mono',monospace" }}>{p.files}</div><div style={{ fontSize:10, color:"#94A3B8" }}>Files</div></div>
                    <div style={{ flex:1, background:"#F8FAFB", borderRadius:8, padding:"6px 10px", textAlign:"center" }}><div style={{ fontSize:14, fontWeight:700, color:"#0F172A", fontFamily:"'JetBrains Mono',monospace" }}>{p.messages}</div><div style={{ fontSize:10, color:"#94A3B8" }}>Messages</div></div>
                    <div style={{ flex:1, background:`${pt.color}10`, borderRadius:8, padding:"6px 10px", textAlign:"center" }}><div style={{ fontSize:11, color:pt.color }}>{pt.label}</div></div>
                  </div>
                </div>
              );
            })}
            <div onClick={()=>setShowNew(true)} style={{ background:"#F8FAFB", border:"2px dashed #E2E8F0", borderRadius:14, padding:16, cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", minHeight:180 }} onMouseEnter={e=>{e.currentTarget.style.borderColor="#00C16E";e.currentTarget.style.background="#F0FDF9";}} onMouseLeave={e=>{e.currentTarget.style.borderColor="#E2E8F0";e.currentTarget.style.background="#F8FAFB";}}>
              <div style={{ fontSize:28, marginBottom:8 }}>➕</div>
              <div style={{ fontSize:13, fontWeight:600, color:"#334155" }}>New Project</div>
            </div>
          </div>
        </div>
      </div>
      {showNew && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,.4)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:100 }}>
          <div style={{ background:"#fff", borderRadius:20, padding:28, width:440, animation:"fadeUp .3s ease" }}>
            <h2 style={{ fontSize:18, fontWeight:700, color:"#0F172A", marginBottom:16 }}>Create New Project</h2>
            <label style={{ fontSize:12, fontWeight:500, color:"#334155", display:"block", marginBottom:5 }}>Project Name *</label>
            <input value={newP.name} onChange={e=>setNewP({...newP,name:e.target.value})} placeholder="e.g. EV Transition Study — Client Name" style={{ width:"100%", padding:"11px 13px", borderRadius:10, border:"1.5px solid #E2E8F0", fontSize:13, marginBottom:14, fontFamily:"'Sora',sans-serif" }} onFocus={e=>e.target.style.borderColor="#00C16E"} onBlur={e=>e.target.style.borderColor="#E2E8F0"} />
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8, marginBottom:20 }}>
              {PT.map(t=><div key={t.id} onClick={()=>setNewP({...newP,type:t.id})} style={{ padding:"8px 10px", borderRadius:9, border:`2px solid ${newP.type===t.id?t.color:"#E2E8F0"}`, background:newP.type===t.id?`${t.color}10`:"#fff", cursor:"pointer", textAlign:"center" }}><div style={{ fontSize:18, marginBottom:3 }}>{t.icon}</div><div style={{ fontSize:10, fontWeight:newP.type===t.id?600:400, color:newP.type===t.id?t.color:"#64748B" }}>{t.label}</div></div>)}
            </div>
            <div style={{ display:"flex", gap:10 }}>
              <button onClick={()=>setShowNew(false)} style={{ flex:1, padding:11, borderRadius:10, border:"1.5px solid #E2E8F0", background:"#fff", fontSize:13, cursor:"pointer", fontFamily:"'Sora',sans-serif" }}>Cancel</button>
              <button onClick={()=>{if(newP.name){setProjects(prev=>[...prev,{id:Date.now(),name:newP.name,type:newP.type,status:"draft",files:0,messages:0,date:new Date().toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"}),progress:0}]);setShowNew(false);setNewP({name:"",type:"ev"});}}} disabled={!newP.name} style={{ flex:2, padding:11, borderRadius:10, background:newP.name?"linear-gradient(135deg,#00C16E,#009955)":"#E2E8F0", border:"none", fontSize:13, fontWeight:600, color:newP.name?"#fff":"#94A3B8", cursor:newP.name?"pointer":"not-allowed", fontFamily:"'Sora',sans-serif" }}>Create Project →</button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
