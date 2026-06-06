"use client";
import { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [profile, setProfile] = useState({ name: "Waheed Syed", email: "waheed@fleetaxis.com", title: "Fleet Strategy Consultant", company: "FleetAxis Advisory", phone: "+971 50 000 0000", country: "UAE" });
  const [saved, setSaved] = useState(false);

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  const TABS = [
    { id: "profile", icon: "👤", label: "Profile" },
    { id: "security", icon: "🔒", label: "Security" },
    { id: "billing", icon: "💳", label: "Subscription & Billing" },
    { id: "api", icon: "🔑", label: "API Keys" },
    { id: "notifications", icon: "🔔", label: "Notification Preferences" },
  ];

  return (
    <DashboardLayout>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&display=swap');
        *{box-sizing:border-box}
        input,select{font-family:'Sora',sans-serif}
        input:focus,select:focus{outline:none}
        ::-webkit-scrollbar{width:4px}
        ::-webkit-scrollbar-thumb{background:#E2E8F0;border-radius:2px}
      `}</style>
      <div style={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }}>
        <div style={{ background: "#fff", borderBottom: "1px solid #F0F4F8", padding: "16px 24px", flexShrink: 0 }}>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: "#0F172A" }}>Settings ⚙️</h1>
          <p style={{ fontSize: 13, color: "#64748B", marginTop: 2 }}>Manage your profile, security and subscription.</p>
        </div>
        <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
          {/* Left nav */}
          <div style={{ width: 220, flexShrink: 0, background: "#fff", borderRight: "1px solid #F0F4F8", padding: "12px 0" }}>
            {TABS.map(tab => (
              <div key={tab.id} onClick={() => setActiveTab(tab.id)}
                style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 18px", cursor: "pointer", background: activeTab === tab.id ? "#F0FDF9" : "transparent", borderLeft: `3px solid ${activeTab === tab.id ? "#00C16E" : "transparent"}`, transition: "all .15s" }}>
                <span style={{ fontSize: 16 }}>{tab.icon}</span>
                <span style={{ fontSize: 13, fontWeight: activeTab === tab.id ? 600 : 400, color: activeTab === tab.id ? "#00C16E" : "#475569" }}>{tab.label}</span>
              </div>
            ))}
          </div>

          {/* Content */}
          <div style={{ flex: 1, overflowY: "auto", padding: "24px" }}>
            {activeTab === "profile" && (
              <div style={{ maxWidth: 560 }}>
                <h2 style={{ fontSize: 16, fontWeight: 700, color: "#0F172A", marginBottom: 20 }}>Profile Information</h2>
                {/* Avatar */}
                <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24, padding: "16px", background: "#F8FAFB", borderRadius: 12 }}>
                  <div style={{ width: 60, height: 60, borderRadius: "50%", background: "linear-gradient(135deg,#00C16E,#009955)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 700, color: "#fff" }}>WS</div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: "#0F172A" }}>{profile.name}</div>
                    <div style={{ fontSize: 12, color: "#64748B" }}>{profile.title} · {profile.company}</div>
                  </div>
                  <button style={{ marginLeft: "auto", padding: "7px 14px", borderRadius: 8, border: "1px solid #E2E8F0", background: "#fff", fontSize: 12, color: "#64748B", cursor: "pointer", fontFamily: "'Sora',sans-serif" }}>Change Photo</button>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  {[
                    { label: "Full Name", key: "name", placeholder: "Your full name" },
                    { label: "Work Email", key: "email", placeholder: "your@email.com" },
                    { label: "Job Title", key: "title", placeholder: "Fleet Director" },
                    { label: "Company", key: "company", placeholder: "Company name" },
                    { label: "Phone", key: "phone", placeholder: "+971 50 000 0000" },
                    { label: "Country", key: "country", placeholder: "UAE" },
                  ].map(f => (
                    <div key={f.key}>
                      <label style={{ display: "block", fontSize: 12, fontWeight: 500, color: "#334155", marginBottom: 5 }}>{f.label}</label>
                      <input value={profile[f.key]} onChange={e => setProfile({ ...profile, [f.key]: e.target.value })} placeholder={f.placeholder}
                        style={{ width: "100%", padding: "10px 12px", borderRadius: 9, border: "1.5px solid #E2E8F0", fontSize: 13, color: "#1E293B", background: "#fff" }}
                        onFocus={e => e.target.style.borderColor = "#00C16E"} onBlur={e => e.target.style.borderColor = "#E2E8F0"} />
                    </div>
                  ))}
                </div>

                <button onClick={handleSave} style={{ marginTop: 20, padding: "11px 24px", borderRadius: 10, background: saved ? "#DCFCE7" : "linear-gradient(135deg,#00C16E,#009955)", border: "none", color: saved ? "#065F46" : "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'Sora',sans-serif", transition: "all .3s" }}>
                  {saved ? "✅ Saved!" : "Save Changes"}
                </button>
              </div>
            )}

            {activeTab === "security" && (
              <div style={{ maxWidth: 480 }}>
                <h2 style={{ fontSize: 16, fontWeight: 700, color: "#0F172A", marginBottom: 20 }}>Security Settings</h2>
                {[
                  { title: "Change Password", desc: "Update your account password", btn: "Change Password", icon: "🔒" },
                  { title: "Two-Factor Authentication", desc: "Add an extra layer of security to your account", btn: "Enable 2FA", icon: "📱", badge: "Recommended" },
                  { title: "Active Sessions", desc: "Manage devices where you're logged in", btn: "View Sessions", icon: "💻" },
                  { title: "Login History", desc: "See your recent login activity", btn: "View History", icon: "📋" },
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px", background: "#fff", border: "1px solid #F0F4F8", borderRadius: 12, marginBottom: 10 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 9, background: "#F8FAFB", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>{item.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "#0F172A", display: "flex", alignItems: "center", gap: 8 }}>
                        {item.title}
                        {item.badge && <span style={{ fontSize: 10, background: "#DCFCE7", color: "#065F46", padding: "1px 6px", borderRadius: 99, fontWeight: 600 }}>{item.badge}</span>}
                      </div>
                      <div style={{ fontSize: 12, color: "#64748B" }}>{item.desc}</div>
                    </div>
                    <button style={{ padding: "7px 14px", borderRadius: 8, border: "1px solid #E2E8F0", background: "#fff", fontSize: 12, color: "#475569", cursor: "pointer", fontFamily: "'Sora',sans-serif", whiteSpace: "nowrap" }}>{item.btn}</button>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "billing" && (
              <div style={{ maxWidth: 560 }}>
                <h2 style={{ fontSize: 16, fontWeight: 700, color: "#0F172A", marginBottom: 20 }}>Subscription & Billing</h2>
                <div style={{ background: "linear-gradient(135deg,#0B1437,#0F6E56)", borderRadius: 14, padding: "20px", color: "#fff", marginBottom: 16 }}>
                  <div style={{ fontSize: 11, opacity: .6, marginBottom: 4 }}>CURRENT PLAN</div>
                  <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Professional Plan</div>
                  <div style={{ fontSize: 13, opacity: .75 }}>$299/month · Renews 1 June 2026</div>
                  <div style={{ marginTop: 14, display: "flex", gap: 8 }}>
                    <button style={{ padding: "8px 16px", borderRadius: 8, background: "#00C16E", border: "none", color: "#fff", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "'Sora',sans-serif" }}>Upgrade to Business</button>
                    <button style={{ padding: "8px 16px", borderRadius: 8, background: "rgba(255,255,255,.1)", border: "1px solid rgba(255,255,255,.2)", color: "#fff", fontSize: 12, cursor: "pointer", fontFamily: "'Sora',sans-serif" }}>Manage Billing</button>
                  </div>
                </div>
                <div style={{ background: "#F8FAFB", borderRadius: 12, padding: "14px 16px" }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#334155", marginBottom: 10 }}>Usage this month</div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#64748B", marginBottom: 6 }}><span>AI Queries</span><span style={{ fontWeight: 600, color: "#334155" }}>240 / 300</span></div>
                  <div style={{ background: "#E2E8F0", borderRadius: 99, height: 6, marginBottom: 10 }}>
                    <div style={{ width: "80%", height: "100%", background: "#00C16E", borderRadius: 99 }} />
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#64748B", marginBottom: 6 }}><span>Storage Used</span><span style={{ fontWeight: 600, color: "#334155" }}>4.2 GB / 10 GB</span></div>
                  <div style={{ background: "#E2E8F0", borderRadius: 99, height: 6 }}>
                    <div style={{ width: "42%", height: "100%", background: "#3B82F6", borderRadius: 99 }} />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "api" && (
              <div style={{ maxWidth: 560 }}>
                <h2 style={{ fontSize: 16, fontWeight: 700, color: "#0F172A", marginBottom: 6 }}>API Keys</h2>
                <p style={{ fontSize: 13, color: "#64748B", marginBottom: 20 }}>Use API keys to integrate FleetAxis AI with your own applications.</p>
                <div style={{ background: "#F8FAFB", border: "1px solid #E2E8F0", borderRadius: 12, padding: "14px 16px", marginBottom: 16, display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: "#334155", marginBottom: 2 }}>Production Key</div>
                    <div style={{ fontSize: 12, fontFamily: "'JetBrains Mono',monospace", color: "#94A3B8" }}>fa_live_••••••••••••••••••••••••3f9a</div>
                  </div>
                  <button style={{ padding: "6px 12px", borderRadius: 7, border: "1px solid #E2E8F0", background: "#fff", fontSize: 11, color: "#64748B", cursor: "pointer", fontFamily: "'Sora',sans-serif" }}>Copy</button>
                  <button style={{ padding: "6px 12px", borderRadius: 7, border: "1px solid #FEE2E2", background: "#FEF2F2", fontSize: 11, color: "#EF4444", cursor: "pointer", fontFamily: "'Sora',sans-serif" }}>Revoke</button>
                </div>
                <button style={{ padding: "10px 18px", borderRadius: 9, background: "linear-gradient(135deg,#00C16E,#009955)", border: "none", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'Sora',sans-serif" }}>+ Generate New Key</button>
              </div>
            )}

            {activeTab === "notifications" && (
              <div style={{ maxWidth: 480 }}>
                <h2 style={{ fontSize: 16, fontWeight: 700, color: "#0F172A", marginBottom: 20 }}>Notification Preferences</h2>
                {[
                  { label: "Policy & Regulatory Alerts", desc: "EV mandates, incentive updates, compliance deadlines", on: true },
                  { label: "Report Generation Complete", desc: "When AI finishes generating a report", on: true },
                  { label: "Fleet Health Score Changes", desc: "When your score changes by 5+ points", on: true },
                  { label: "Maintenance Risk Alerts", desc: "High-risk vehicle warnings", on: true },
                  { label: "Usage Limit Warnings", desc: "When you reach 80% of monthly query limit", on: false },
                  { label: "Weekly Fleet Summary", desc: "Weekly digest of fleet performance", on: false },
                ].map((n, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 0", borderBottom: "1px solid #F8FAFB" }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 500, color: "#0F172A" }}>{n.label}</div>
                      <div style={{ fontSize: 12, color: "#64748B" }}>{n.desc}</div>
                    </div>
                    <div style={{ width: 40, height: 22, borderRadius: 99, background: n.on ? "#00C16E" : "#E2E8F0", cursor: "pointer", position: "relative", transition: "background .2s" }}>
                      <div style={{ width: 16, height: 16, borderRadius: "50%", background: "#fff", position: "absolute", top: 3, left: n.on ? 21 : 3, transition: "left .2s", boxShadow: "0 1px 3px rgba(0,0,0,.2)" }} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
