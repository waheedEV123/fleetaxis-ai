"use client";
import { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";

const TABS = [{id:"profile",icon:"👤",label:"Profile"},{id:"security",icon:"🔒",label:"Security"},{id:"billing",icon:"💳",label:"Billing"},{id:"api",icon:"🔑",label:"API Keys"},{id:"notifs",icon:"🔔",label:"Notifications"}];

export default function SettingsPage() {
  const [tab, setTab] = useState("profile");
  const [profile, setProfile] = useState({ name:"Waheed Syed", email:"waheed@fleetaxis.com", title:"Fleet Strategy Consultant", company:"FleetAxis Advisory", phone:"+971 50 000 0000", country:"UAE" });
  const [saved, setSaved] = useState(false);
  return (
    <DashboardLayout>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&display=swap');*{box-sizing:border-box}input:focus{outline:none}::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:#E2E8F0;border-radius:2px}`}</style>
      <div style={{ display:"flex", flexDirection:"column", height:"100%", overflow:"hidden" }}>
        <div style={{ background:"#fff", borderBottom:"1px solid #F0F4F8", padding:"16px 24px", flexShrink:0 }}>
          <h1 style={{ fontSize:20, fontWeight:700, color:"#0F172A" }}>Settings ⚙️</h1>
          <p style={{ fontSize:13, color:"#64748B", marginTop:2 }}>Manage your profile, security and subscription.</p>
        </div>
        <div style={{ flex:1, display:"flex", overflow:"hidden" }}>
          <div style={{ width:220, flexShrink:0, background:"#fff", borderRight:"1px solid #F0F4F8", padding:"12px 0" }}>
            {TABS.map(t=><div key={t.id} onClick={()=>setTab(t.id)} style={{ display:"flex", alignItems:"center", gap:10, padding:"11px 18px", cursor:"pointer", background:tab===t.id?"#F0FDF9":"transparent", borderLeft:`3px solid ${tab===t.id?"#00C16E":"transparent"}` }}><span style={{ fontSize:16 }}>{t.icon}</span><span style={{ fontSize:13, fontWeight:tab===t.id?600:400, color:tab===t.id?"#00C16E":"#475569" }}>{t.label}</span></div>)}
          </div>
          <div style={{ flex:1, overflowY:"auto", padding:"24px" }}>
            {tab==="profile" && (
              <div style={{ maxWidth:560 }}>
                <h2 style={{ fontSize:16, fontWeight:700, color:"#0F172A", marginBottom:20 }}>Profile Information</h2>
                <div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:24, padding:16, background:"#F8FAFB", borderRadius:12 }}>
                  <div style={{ width:60, height:60, borderRadius:"50%", background:"linear-gradient(135deg,#00C16E,#009955)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, fontWeight:700, color:"#fff" }}>WS</div>
                  <div><div style={{ fontSize:15, fontWeight:600, color:"#0F172A" }}>{profile.name}</div><div style={{ fontSize:12, color:"#64748B" }}>{profile.title}</div></div>
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
                  {[["Full Name","name"],["Work Email","email"],["Job Title","title"],["Company","company"],["Phone","phone"],["Country","country"]].map(([label,key])=>(
                    <div key={key}><label style={{ display:"block", fontSize:12, fontWeight:500, color:"#334155", marginBottom:5 }}>{label}</label><input value={profile[key]} onChange={e=>setProfile({...profile,[key]:e.target.value})} style={{ width:"100%", padding:"10px 12px", borderRadius:9, border:"1.5px solid #E2E8F0", fontSize:13, color:"#1E293B", background:"#fff", fontFamily:"'Sora',sans-serif" }} onFocus={e=>e.target.style.borderColor="#00C16E"} onBlur={e=>e.target.style.borderColor="#E2E8F0"} /></div>
                  ))}
                </div>
                <button onClick={()=>{setSaved(true);setTimeout(()=>setSaved(false),2000);}} style={{ marginTop:20, padding:"11px 24px", borderRadius:10, background:saved?"#DCFCE7":"linear-gradient(135deg,#00C16E,#009955)", border:saved?"1px solid #00C16E":"none", color:saved?"#065F46":"#fff", fontSize:13, fontWeight:600, cursor:"pointer", fontFamily:"'Sora',sans-serif" }}>
                  {saved?"✅ Saved!":"Save Changes"}
                </button>
              </div>
            )}
            {tab==="billing" && (
              <div style={{ maxWidth:560 }}>
                <h2 style={{ fontSize:16, fontWeight:700, color:"#0F172A", marginBottom:20 }}>Subscription & Billing</h2>
                <div style={{ background:"linear-gradient(135deg,#0B1437,#0F6E56)", borderRadius:14, padding:20, color:"#fff", marginBottom:16 }}>
                  <div style={{ fontSize:11, opacity:.6, marginBottom:4 }}>CURRENT PLAN</div>
                  <div style={{ fontSize:22, fontWeight:700, marginBottom:4 }}>Professional Plan</div>
                  <div style={{ fontSize:13, opacity:.75 }}>$299/month · Renews 1 June 2026</div>
                  <div style={{ marginTop:14, display:"flex", gap:8 }}>
                    <button style={{ padding:"8px 16px", borderRadius:8, background:"#00C16E", border:"none", color:"#fff", fontSize:12, fontWeight:600, cursor:"pointer", fontFamily:"'Sora',sans-serif" }}>Upgrade to Business</button>
                    <button style={{ padding:"8px 16px", borderRadius:8, background:"rgba(255,255,255,.1)", border:"1px solid rgba(255,255,255,.2)", color:"#fff", fontSize:12, cursor:"pointer", fontFamily:"'Sora',sans-serif" }}>Manage Billing</button>
                  </div>
                </div>
                <div style={{ background:"#F8FAFB", borderRadius:12, padding:"14px 16px" }}>
                  <div style={{ fontSize:13, fontWeight:600, color:"#334155", marginBottom:10 }}>Usage this month</div>
                  {[["AI Queries","240 / 300","80%","#00C16E"],["Storage Used","4.2 GB / 10 GB","42%","#3B82F6"]].map(([l,v,p,c],i)=>(
                    <div key={i} style={{ marginBottom:i<1?12:0 }}>
                      <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, color:"#64748B", marginBottom:5 }}><span>{l}</span><span style={{ fontWeight:600, color:"#334155" }}>{v}</span></div>
                      <div style={{ background:"#E2E8F0", borderRadius:99, height:6 }}><div style={{ width:p, height:"100%", background:c, borderRadius:99 }} /></div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {tab==="security" && (
              <div style={{ maxWidth:480 }}>
                <h2 style={{ fontSize:16, fontWeight:700, color:"#0F172A", marginBottom:20 }}>Security Settings</h2>
                {[{t:"Change Password",d:"Update your account password",b:"Change",i:"🔒"},{t:"Two-Factor Authentication",d:"Add an extra layer of security",b:"Enable 2FA",i:"📱",badge:"Recommended"},{t:"Active Sessions",d:"Manage devices where you're logged in",b:"View Sessions",i:"💻"},{t:"Login History",d:"See your recent login activity",b:"View History",i:"📋"}].map((item,i)=>(
                  <div key={i} style={{ display:"flex", alignItems:"center", gap:12, padding:16, background:"#fff", border:"1px solid #F0F4F8", borderRadius:12, marginBottom:10 }}>
                    <div style={{ width:36, height:36, borderRadius:9, background:"#F8FAFB", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>{item.i}</div>
                    <div style={{ flex:1 }}><div style={{ fontSize:13, fontWeight:600, color:"#0F172A" }}>{item.t}{item.badge&&<span style={{ marginLeft:8, fontSize:10, background:"#DCFCE7", color:"#065F46", padding:"1px 6px", borderRadius:99 }}>{item.badge}</span>}</div><div style={{ fontSize:12, color:"#64748B" }}>{item.d}</div></div>
                    <button style={{ padding:"7px 14px", borderRadius:8, border:"1px solid #E2E8F0", background:"#fff", fontSize:12, color:"#475569", cursor:"pointer", fontFamily:"'Sora',sans-serif" }}>{item.b}</button>
                  </div>
                ))}
              </div>
            )}
            {(tab==="api"||tab==="notifs") && (
              <div style={{ maxWidth:480 }}>
                <h2 style={{ fontSize:16, fontWeight:700, color:"#0F172A", marginBottom:20 }}>{tab==="api"?"API Keys":"Notification Preferences"}</h2>
                <div style={{ background:"#F8FAFB", border:"1px solid #E2E8F0", borderRadius:12, padding:"14px 16px", color:"#64748B", fontSize:13 }}>
                  {tab==="api"?"API key management coming in Phase 4 with full admin dashboard.":"Notification preferences coming in Phase 4."}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
