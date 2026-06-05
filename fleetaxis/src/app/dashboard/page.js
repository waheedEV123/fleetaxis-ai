"use client";
import { useState, useRef, useEffect } from "react";
import DashboardLayout from "../components/DashboardLayout";

const AGENT_TABS = [
  { id: "fleet", icon: "🚛", label: "Fleet Analysis" },
  { id: "ev", icon: "⚡", label: "EV Readiness" },
  { id: "charging", icon: "🔌", label: "Charging Infrastructure" },
  { id: "tco", icon: "💰", label: "TCO & ROI" },
  { id: "maintenance", icon: "🔧", label: "Maintenance" },
  { id: "esg", icon: "🌱", label: "Sustainability" },
];

const POPULAR_QUESTIONS = [
  "What is our EV readiness score?",
  "How many chargers do we need?",
  "Which vehicles should we replace first?",
  "What is the total cost of ownership comparison?",
  "Show me CO₂ reduction potential",
];

const AGENTS = [
  { icon: "⚡", label: "EV Transition Agent", desc: "Plan your fleet electrification journey", color: "#00C16E" },
  { icon: "🔌", label: "Charging Infrastructure Agent", desc: "Design optimal charging strategy", color: "#3B82F6" },
  { icon: "💰", label: "TCO & ROI Agent", desc: "Calculate cost, savings and ROI", color: "#F97316" },
  { icon: "🔧", label: "Maintenance Agent", desc: "Predict failures and reduce downtime", color: "#8B5CF6" },
  { icon: "🌱", label: "Sustainability Agent", desc: "Track CO₂, ESG and sustainability", color: "#10B981" },
];

const Dots = () => (
  <span style={{ display: "inline-flex", gap: 4, alignItems: "center" }}>
    {[0, 1, 2].map(i => <span key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: "#00C16E", animation: "pulse 1.2s ease-in-out infinite", animationDelay: `${i * 0.2}s` }} />)}
  </span>
);

function MetricCards({ content }) {
  const metrics = [];
  content.split("\n").forEach(line => {
    const match = line.match(/METRICS:\s*(.+?)\s*\|\s*(.+?)\s*\|\s*(.+)/);
    if (match) metrics.push({ value: match[1], label: match[2], unit: match[3] });
  });
  if (!metrics.length) return null;
  const colors = ["#00C16E", "#3B82F6", "#F97316", "#8B5CF6"];
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(metrics.length, 4)}, 1fr)`, gap: 10, margin: "12px 0" }}>
      {metrics.map((m, i) => (
        <div key={i} style={{ background: "#F0FDF9", border: `1px solid ${colors[i % colors.length]}30`, borderRadius: 12, padding: "12px 14px", borderTop: `3px solid ${colors[i % colors.length]}` }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: colors[i % colors.length], fontFamily: "'JetBrains Mono',monospace" }}>{m.value}</div>
          <div style={{ fontSize: 11, fontWeight: 600, color: "#334155", marginTop: 2 }}>{m.label}</div>
          <div style={{ fontSize: 10, color: "#94A3B8", marginTop: 1 }}>{m.unit}</div>
        </div>
      ))}
    </div>
  );
}

export default function HomePage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("fleet");
  const [searching, setSearching] = useState(false);
  const [uploadedFiles] = useState([
    { name: "Fleet_Data_May2026.xlsx", date: "20 May 2026", type: "xlsx" },
    { name: "Telematics_Apr2026.csv", date: "18 May 2026", type: "csv" },
    { name: "Maintenance_History.xlsx", date: "18 May 2026", type: "xlsx" },
  ]);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const fileRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const callAPI = async (msgs) => {
    setSearching(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: msgs.map(m => ({ role: m.role, content: m.content })), username: "waheed", plan: "enterprise" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Error");
      return data.content || "No response.";
    } finally { setSearching(false); }
  };

  const sendMessage = async (text) => {
    const t = text || input.trim();
    if (!t || loading) return;
    setInput("");
    const userMsg = { role: "user", content: t };
    const newMsgs = [...messages, userMsg];
    setMessages([...newMsgs, { role: "assistant", content: "loading" }]);
    setLoading(true);
    try {
      const reply = await callAPI(newMsgs);
      setMessages([...newMsgs, { role: "assistant", content: reply }]);
    } catch (err) {
      setMessages([...newMsgs, { role: "assistant", content: "Sorry, something went wrong. Please try again." }]);
    } finally { setLoading(false); setTimeout(() => inputRef.current?.focus(), 50); }
  };

  const isEmpty = messages.length === 0;

  return (
    <DashboardLayout>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        @keyframes pulse{0%,100%{opacity:.3;transform:scale(.8)}50%{opacity:1;transform:scale(1)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        @keyframes spin{to{transform:rotate(360deg)}}
        *{box-sizing:border-box}
        textarea:focus{outline:none}
        ::-webkit-scrollbar{width:4px}
        ::-webkit-scrollbar-thumb{background:#E2E8F0;border-radius:2px}
      `}</style>

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* Main */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

          {/* Header */}
          <div style={{ background: "#fff", borderBottom: "1px solid #F0F4F8", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
            <div>
              <h1 style={{ fontSize: 20, fontWeight: 700, color: "#0F172A" }}>Hello, Waheed! 👋</h1>
              <p style={{ fontSize: 13, color: "#64748B", marginTop: 2 }}>Ask anything about Fleet Management, EVs and Infrastructure.</p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ background: "#F0FDF9", border: "1px solid #6EE7B7", borderRadius: 99, padding: "5px 14px", fontSize: 12, fontWeight: 600, color: "#065F46", display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#00C16E" }} />Pro Plan
              </div>
              <div style={{ width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg,#00C16E,#009955)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#fff" }}>WS</div>
            </div>
          </div>

          {/* Agent tabs */}
          <div style={{ background: "#fff", borderBottom: "1px solid #F0F4F8", padding: "0 24px", display: "flex", gap: 0, overflowX: "auto", flexShrink: 0 }}>
            {AGENT_TABS.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                style={{ padding: "12px 16px", border: "none", background: "none", cursor: "pointer", fontSize: 12, fontWeight: activeTab === tab.id ? 600 : 400, color: activeTab === tab.id ? "#00C16E" : "#64748B", borderBottom: `2px solid ${activeTab === tab.id ? "#00C16E" : "transparent"}`, display: "flex", alignItems: "center", gap: 6, whiteSpace: "nowrap", transition: "all .15s" }}>
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: "auto", padding: "24px" }}>
            {isEmpty ? (
              <div style={{ maxWidth: 680, margin: "0 auto", animation: "fadeUp .5s ease" }}>
                <div style={{ textAlign: "center", marginBottom: 28 }}>
                  <div style={{ width: 60, height: 60, background: "linear-gradient(135deg,#00C16E,#009955)", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px", fontSize: 22, fontWeight: 700, color: "#fff", fontFamily: "'JetBrains Mono',monospace" }}>FA</div>
                  <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0F172A", marginBottom: 6 }}>How can I help you today?</h2>
                  <p style={{ fontSize: 13, color: "#64748B" }}>Your AI Agent for all Fleet Management & EV Transition decisions.</p>
                </div>
                <div style={{ display: "flex", gap: 7, justifyContent: "center", flexWrap: "wrap", marginBottom: 28 }}>
                  {AGENT_TABS.map(tab => (
                    <button key={tab.id} onClick={() => sendMessage(`Tell me about ${tab.label} for my fleet`)}
                      style={{ padding: "7px 13px", borderRadius: 99, border: "1px solid #E2E8F0", background: "#fff", fontSize: 12, fontWeight: 500, color: "#475569", cursor: "pointer", display: "flex", alignItems: "center", gap: 5, transition: "all .15s" }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = "#00C16E"; e.currentTarget.style.color = "#00C16E"; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = "#E2E8F0"; e.currentTarget.style.color = "#475569"; }}>
                      {tab.icon} {tab.label}
                    </button>
                  ))}
                </div>
                <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #F0F4F8", overflow: "hidden", boxShadow: "0 2px 10px rgba(0,0,0,.04)" }}>
                  {POPULAR_QUESTIONS.map((q, i) => (
                    <div key={i} onClick={() => sendMessage(q)}
                      style={{ padding: "13px 18px", borderBottom: i < POPULAR_QUESTIONS.length - 1 ? "1px solid #F8FAFB" : "none", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", transition: "background .15s" }}
                      onMouseEnter={e => e.currentTarget.style.background = "#F8FAFB"}
                      onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                      <span style={{ fontSize: 13, color: "#334155" }}>{q}</span>
                      <span style={{ fontSize: 16, color: "#CBD5E1" }}>›</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div style={{ maxWidth: 760, margin: "0 auto" }}>
                {messages.map((msg, i) => {
                  const isUser = msg.role === "user";
                  const cleaned = msg.content !== "loading" ? msg.content.replace(/METRICS:.*\n?/g, "").trim() : msg.content;
                  return (
                    <div key={i} style={{ display: "flex", gap: 10, marginBottom: 18, justifyContent: isUser ? "flex-end" : "flex-start", alignItems: "flex-start" }}>
                      {!isUser && <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg,#00C16E,#009955)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#fff", flexShrink: 0, marginTop: 2, fontFamily: "'JetBrains Mono',monospace" }}>FA</div>}
                      <div style={{ maxWidth: "82%" }}>
                        {!isUser && <div style={{ fontSize: 11, fontWeight: 600, color: "#00C16E", marginBottom: 5 }}>FleetAxis AI</div>}
                        <div style={{ background: isUser ? "#0B1437" : "#fff", color: isUser ? "#fff" : "#1E293B", borderRadius: isUser ? "14px 14px 4px 14px" : "14px 14px 14px 4px", padding: "11px 15px", fontSize: 13, lineHeight: 1.7, whiteSpace: "pre-wrap", wordBreak: "break-word", border: isUser ? "none" : "1px solid #F0F4F8", boxShadow: isUser ? "none" : "0 2px 8px rgba(0,0,0,.04)" }}>
                          {msg.content === "loading" ? (searching ? (
                            <span style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 12, color: "#00C16E" }}>
                              <span style={{ width: 11, height: 11, border: "2px solid #9FE1CB", borderTopColor: "#00C16E", borderRadius: "50%", display: "inline-block", animation: "spin .8s linear infinite" }} />
                              Searching fleet intelligence database…
                            </span>
                          ) : <Dots />) : (
                            <>
                              {!isUser && <MetricCards content={msg.content} />}
                              {cleaned}
                            </>
                          )}
                        </div>
                        {!isUser && msg.content !== "loading" && (
                          <div style={{ display: "flex", gap: 6, marginTop: 5 }}>
                            {["👍", "👎", "📥", "↗️"].map((icon, j) => (
                              <button key={j} style={{ width: 26, height: 26, borderRadius: 6, border: "1px solid #F0F4F8", background: "#fff", cursor: "pointer", fontSize: 11, display: "flex", alignItems: "center", justifyContent: "center" }}>{icon}</button>
                            ))}
                          </div>
                        )}
                      </div>
                      {isUser && <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg,#00C16E,#009955)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#fff", flexShrink: 0, marginTop: 2 }}>WS</div>}
                    </div>
                  );
                })}
                <div ref={bottomRef} />
              </div>
            )}
          </div>

          {/* Input */}
          <div style={{ background: "#fff", borderTop: "1px solid #F0F4F8", padding: "14px 24px", flexShrink: 0 }}>
            <div style={{ maxWidth: 760, margin: "0 auto" }}>
              <div style={{ display: "flex", gap: 8, alignItems: "flex-end", background: "#F8FAFB", border: "1.5px solid #E2E8F0", borderRadius: 13, padding: "10px 12px", transition: "border-color .15s" }}
                onFocusCapture={e => e.currentTarget.style.borderColor = "#00C16E"}
                onBlurCapture={e => e.currentTarget.style.borderColor = "#E2E8F0"}>
                <textarea ref={inputRef} value={input} onChange={e => setInput(e.target.value)}
                  onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                  placeholder="Ask anything about fleet management, EVs, charging, TCO, maintenance..."
                  rows={1} style={{ flex: 1, resize: "none", border: "none", background: "transparent", fontSize: 13, color: "#1E293B", lineHeight: 1.5, maxHeight: 100, overflowY: "auto", fontFamily: "'Sora',sans-serif" }}
                  onInput={e => { e.target.style.height = "auto"; e.target.style.height = Math.min(e.target.scrollHeight, 100) + "px"; }} />
                <button onClick={() => fileRef.current?.click()} style={{ width: 32, height: 32, borderRadius: 8, border: "1px solid #E2E8F0", background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, flexShrink: 0 }}>📎</button>
                <button onClick={() => sendMessage()} disabled={!input.trim() || loading}
                  style={{ width: 32, height: 32, borderRadius: 8, background: input.trim() && !loading ? "linear-gradient(135deg,#00C16E,#009955)" : "#E2E8F0", border: "none", cursor: input.trim() && !loading ? "pointer" : "not-allowed", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke={input.trim() && !loading ? "#fff" : "#94A3B8"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </div>
              <input ref={fileRef} type="file" accept=".xlsx,.xls,.csv,.pdf" style={{ display: "none" }} />
              <div style={{ display: "flex", gap: 6, marginTop: 8, flexWrap: "wrap" }}>
                {["📊 Fleet Data", "📡 Telematics", "🔧 Maintenance", "⚡ Charger Data"].map((btn, i) => (
                  <button key={i} onClick={() => fileRef.current?.click()}
                    style={{ padding: "4px 11px", borderRadius: 99, border: "1px solid #E2E8F0", background: "#fff", fontSize: 11, color: "#64748B", cursor: "pointer", transition: "all .15s" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = "#00C16E"; e.currentTarget.style.color = "#00C16E"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "#E2E8F0"; e.currentTarget.style.color = "#64748B"; }}>
                    {btn}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <div style={{ width: 272, flexShrink: 0, background: "#fff", borderLeft: "1px solid #F0F4F8", display: "flex", flexDirection: "column", overflowY: "auto" }}>
          <div style={{ padding: "16px 14px 0" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: "#334155" }}>Your Data Context</span>
              <span style={{ fontSize: 11, color: "#00C16E", cursor: "pointer" }}>View all</span>
            </div>
            {uploadedFiles.map((f, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 9, padding: "8px 10px", background: "#F8FAFB", borderRadius: 9, marginBottom: 5, border: "1px solid #F0F4F8" }}>
                <div style={{ width: 26, height: 26, borderRadius: 6, background: f.type === "csv" ? "#FEF3C7" : "#DCFCE7", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, flexShrink: 0 }}>{f.type === "csv" ? "📊" : "📗"}</div>
                <div style={{ flex: 1, overflow: "hidden" }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: "#334155", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{f.name}</div>
                  <div style={{ fontSize: 10, color: "#94A3B8" }}>{f.date}</div>
                </div>
                <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#DCFCE7", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="#00C16E" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
              </div>
            ))}
            <button style={{ width: "100%", padding: "8px", borderRadius: 9, border: "1.5px dashed #E2E8F0", background: "transparent", fontSize: 11, color: "#00C16E", fontWeight: 500, cursor: "pointer", marginTop: 2, fontFamily: "'Sora',sans-serif" }}>+ Upload More Data</button>
          </div>
          <div style={{ height: 1, background: "#F0F4F8", margin: "12px 0" }} />
          <div style={{ padding: "0 14px" }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#334155", marginBottom: 8 }}>Popular Questions</div>
            {POPULAR_QUESTIONS.map((q, i) => (
              <div key={i} onClick={() => sendMessage(q)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 0", borderBottom: i < POPULAR_QUESTIONS.length - 1 ? "1px solid #F8FAFB" : "none", cursor: "pointer" }}
                onMouseEnter={e => e.currentTarget.style.opacity = ".7"} onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
                <span style={{ fontSize: 11, color: "#334155", lineHeight: 1.4, flex: 1, paddingRight: 6 }}>{q}</span>
                <span style={{ fontSize: 13, color: "#CBD5E1" }}>›</span>
              </div>
            ))}
          </div>
          <div style={{ height: 1, background: "#F0F4F8", margin: "12px 0" }} />
          <div style={{ padding: "0 14px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: "#334155" }}>AI Agents</span>
              <span style={{ fontSize: 11, color: "#00C16E", cursor: "pointer" }}>View all</span>
            </div>
            {AGENTS.map((agent, i) => (
              <div key={i} onClick={() => sendMessage(`Activate ${agent.label} for my fleet`)} style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 8px", borderRadius: 9, marginBottom: 3, cursor: "pointer", transition: "background .15s" }}
                onMouseEnter={e => e.currentTarget.style.background = "#F8FAFB"} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                <div style={{ width: 28, height: 28, borderRadius: 7, background: `${agent.color}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, flexShrink: 0 }}>{agent.icon}</div>
                <div><div style={{ fontSize: 11, fontWeight: 500, color: "#334155" }}>{agent.label}</div><div style={{ fontSize: 10, color: "#94A3B8" }}>{agent.desc}</div></div>
              </div>
            ))}
          </div>
          <div style={{ margin: "12px 10px 14px", background: "linear-gradient(135deg,#0B1437,#0F6E56)", borderRadius: 12, padding: "14px 12px" }}>
            <div style={{ fontSize: 16, marginBottom: 5 }}>🚀</div>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#fff", marginBottom: 4 }}>Upgrade Plan</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,.65)", lineHeight: 1.5, marginBottom: 9 }}>Unlock advanced AI analysis, more uploads and premium reports.</div>
            <button style={{ width: "100%", padding: "7px", borderRadius: 7, background: "#00C16E", border: "none", color: "#fff", fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "'Sora',sans-serif" }}>Upgrade Now</button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
