"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [remember, setRemember] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) { setError("Please enter your email and password."); return; }
    setLoading(true); setError("");
    setTimeout(() => { router.push("/dashboard"); }, 1000);
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'Sora',sans-serif" }}>
      {/* Left panel */}
      <div style={{ width: 420, flexShrink: 0, background: "linear-gradient(160deg, #0B1437 0%, #0F6E56 100%)", padding: "48px 40px", display: "flex", flexDirection: "column", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -80, right: -80, width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,193,110,.15) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 56 }}>
          <div style={{ width: 40, height: 40, background: "linear-gradient(135deg,#00C16E,#009955)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 15, color: "#fff", fontFamily: "'JetBrains Mono',monospace" }}>FA</div>
          <div>
            <span style={{ fontSize: 18, fontWeight: 700, color: "#fff" }}>FleetAxis</span>
            <span style={{ fontSize: 18, fontWeight: 700, color: "#00C16E" }}> AI</span>
          </div>
        </div>

        <h1 style={{ fontSize: 30, fontWeight: 700, color: "#fff", lineHeight: 1.25, marginBottom: 16 }}>Welcome back to your Fleet Intelligence OS</h1>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,.6)", lineHeight: 1.7, marginBottom: 40 }}>Sign in to access your AI agents, fleet data, and reports.</p>
        <div style={{ width: 48, height: 3, background: "#00C16E", borderRadius: 99, marginBottom: 40 }} />

        {/* Stats */}
        {[
          { num: "500+", label: "Fleet operators trust FleetAxis AI" },
          { num: "2.4M", label: "Vehicles analysed globally" },
          { num: "40%", label: "Average operational cost reduction" },
        ].map((s, i) => (
          <div key={i} style={{ marginBottom: 24, animation: `fadeUp .5s ease ${i * .1}s both` }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: "#00C16E" }}>{s.num}</div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,.55)" }}>{s.label}</div>
          </div>
        ))}

        <div style={{ flex: 1 }} />
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {["🔒 Enterprise Grade", "ISO 27001", "GDPR", "SOC 2"].map((b, i) => (
            <div key={i} style={{ fontSize: 10, color: "rgba(255,255,255,.35)", padding: "2px 8px", border: "1px solid rgba(255,255,255,.1)", borderRadius: 99 }}>{b}</div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px", background: "#F8FAFB" }}>
        <div style={{ width: "100%", maxWidth: 440, animation: "fadeUp .5s ease" }}>
          <div style={{ textAlign: "right", marginBottom: 32 }}>
            <span style={{ fontSize: 14, color: "#64748B" }}>Don't have an account? </span>
            <a href="/signup" style={{ fontSize: 14, fontWeight: 600, color: "#00C16E" }}>Sign up free</a>
          </div>

          <div style={{ background: "#fff", borderRadius: 20, padding: "40px 36px", boxShadow: "0 8px 40px rgba(0,0,0,.08)", border: "1px solid #F0F4F8" }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: "#0F172A", marginBottom: 6 }}>Sign In</h2>
            <p style={{ fontSize: 14, color: "#64748B", marginBottom: 32 }}>Access your FleetAxis AI dashboard.</p>

            <form onSubmit={handleLogin}>
              <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#334155", marginBottom: 6 }}>Work Email <span style={{ color: "#EF4444" }}>*</span></label>
              <div style={{ position: "relative", marginBottom: 16 }}>
                <div style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 16, color: "#94A3B8" }}>✉️</div>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your work email"
                  style={{ width: "100%", padding: "12px 14px 12px 42px", borderRadius: 10, border: "1.5px solid #E2E8F0", fontSize: 14, color: "#1E293B", background: "#fff", fontFamily: "'Sora',sans-serif" }}
                  onFocus={e => e.target.style.borderColor = "#00C16E"} onBlur={e => e.target.style.borderColor = "#E2E8F0"} />
              </div>

              <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#334155", marginBottom: 6 }}>Password <span style={{ color: "#EF4444" }}>*</span></label>
              <div style={{ position: "relative", marginBottom: 8 }}>
                <div style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 16, color: "#94A3B8" }}>🔒</div>
                <input type={showPwd ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password"
                  style={{ width: "100%", padding: "12px 42px 12px 42px", borderRadius: 10, border: "1.5px solid #E2E8F0", fontSize: 14, color: "#1E293B", background: "#fff", fontFamily: "'Sora',sans-serif" }}
                  onFocus={e => e.target.style.borderColor = "#00C16E"} onBlur={e => e.target.style.borderColor = "#E2E8F0"} />
                <button type="button" onClick={() => setShowPwd(!showPwd)} style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", fontSize: 16, color: "#94A3B8", cursor: "pointer" }}>
                  {showPwd ? "🙈" : "👁️"}
                </button>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                <label style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, color: "#475569", cursor: "pointer" }}>
                  <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} style={{ accentColor: "#00C16E" }} />
                  Remember me
                </label>
                <a href="/forgot-password" style={{ fontSize: 13, color: "#00C16E", fontWeight: 500 }}>Forgot password?</a>
              </div>

              {error && (
                <div style={{ background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 10, padding: "10px 14px", fontSize: 13, color: "#DC2626", marginBottom: 16 }}>{error}</div>
              )}

              <button type="submit" disabled={loading || !email || !password}
                style={{ width: "100%", padding: "14px", borderRadius: 10, background: email && password && !loading ? "linear-gradient(135deg,#00C16E,#009955)" : "#E2E8F0", border: "none", fontSize: 15, fontWeight: 600, color: email && password && !loading ? "#fff" : "#94A3B8", cursor: email && password && !loading ? "pointer" : "not-allowed", transition: "all .15s", boxShadow: email && password ? "0 4px 14px rgba(0,193,110,.3)" : "none", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                {loading ? <><span style={{ width: 14, height: 14, border: "2px solid rgba(255,255,255,.4)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin .8s linear infinite", display: "inline-block" }} /> Signing in…</> : "Sign In →"}
              </button>
            </form>

            {/* Divider */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "24px 0" }}>
              <div style={{ flex: 1, height: 1, background: "#F0F4F8" }} />
              <span style={{ fontSize: 12, color: "#94A3B8" }}>or continue with</span>
              <div style={{ flex: 1, height: 1, background: "#F0F4F8" }} />
            </div>

            {/* SSO */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {[{icon: "🔷", label: "Microsoft SSO"}, {icon: "🔵", label: "Google SSO"}].map((sso, i) => (
                <button key={i} style={{ padding: "11px", borderRadius: 10, border: "1.5px solid #E2E8F0", background: "#fff", fontSize: 13, fontWeight: 500, color: "#475569", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 7, transition: "all .15s" }}
                  onMouseEnter={e => e.target.style.borderColor = "#00C16E"} onMouseLeave={e => e.target.style.borderColor = "#E2E8F0"}>
                  {sso.icon} {sso.label}
                </button>
              ))}
            </div>
          </div>

          <p style={{ textAlign: "center", fontSize: 12, color: "#94A3B8", marginTop: 20 }}>
            By signing in, you agree to our <a href="#" style={{ color: "#00C16E" }}>Terms</a> and <a href="#" style={{ color: "#00C16E" }}>Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
}
