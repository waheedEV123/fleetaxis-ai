"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const INDUSTRIES = [
  { id: "logistics", icon: "🚛", label: "Logistics & Last Mile" },
  { id: "telecom", icon: "📡", label: "Telecom" },
  { id: "utilities", icon: "⚡", label: "Utilities" },
  { id: "government", icon: "🏛️", label: "Government" },
  { id: "municipal", icon: "🏙️", label: "Municipal Fleets" },
  { id: "airports", icon: "✈️", label: "Airports" },
  { id: "construction", icon: "🏗️", label: "Construction" },
  { id: "oilgas", icon: "⛽", label: "Oil & Gas" },
  { id: "corporate", icon: "🏢", label: "Corporate Fleets" },
];

const USE_CASES = [
  { id: "ev", icon: "⚡", label: "EV Transition Planning" },
  { id: "charging", icon: "🔌", label: "Charging Infrastructure" },
  { id: "tco", icon: "💰", label: "TCO & ROI Analysis" },
  { id: "maintenance", icon: "🔧", label: "Predictive Maintenance" },
  { id: "operations", icon: "🗺️", label: "Operations Optimisation" },
  { id: "esg", icon: "🌱", label: "ESG & Sustainability" },
  { id: "health", icon: "📊", label: "Fleet Health Score" },
  { id: "benchmarking", icon: "📈", label: "Benchmarking" },
];

const COUNTRIES = [
  { code: "+971", flag: "🇦🇪", name: "UAE" },
  { code: "+91", flag: "🇮🇳", name: "India" },
  { code: "+1", flag: "🇺🇸", name: "USA" },
  { code: "+44", flag: "🇬🇧", name: "UK" },
  { code: "+61", flag: "🇦🇺", name: "Australia" },
  { code: "+49", flag: "🇩🇪", name: "Germany" },
  { code: "+33", flag: "🇫🇷", name: "France" },
  { code: "+966", flag: "🇸🇦", name: "Saudi Arabia" },
];

const FLEET_SIZES = ["1–50 vehicles", "51–200 vehicles", "201–500 vehicles", "501–1,000 vehicles", "1,000+ vehicles"];

function LeftPanel() {
  return (
    <div style={{
      width: 420, flexShrink: 0, background: "linear-gradient(160deg, #0B1437 0%, #0F6E56 100%)",
      padding: "48px 40px", display: "flex", flexDirection: "column", position: "relative", overflow: "hidden", minHeight: "100vh",
    }}>
      {/* Background decoration */}
      <div style={{ position: "absolute", top: -80, right: -80, width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,193,110,.15) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: -60, left: -60, width: 250, height: 250, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,193,110,.08) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: "40%", left: "50%", transform: "translate(-50%,-50%)", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,255,255,.02) 0%, transparent 60%)", pointerEvents: "none" }} />

      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 48 }}>
        <div style={{ width: 40, height: 40, background: "linear-gradient(135deg, #00C16E, #009955)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 15, color: "#fff", fontFamily: "'JetBrains Mono',monospace" }}>FA</div>
        <div>
          <span style={{ fontSize: 18, fontWeight: 700, color: "#fff" }}>FleetAxis</span>
          <span style={{ fontSize: 18, fontWeight: 700, color: "#00C16E" }}> AI</span>
        </div>
      </div>

      {/* Headline */}
      <div style={{ marginBottom: 40 }}>
        <h1 style={{ fontSize: 30, fontWeight: 700, color: "#fff", lineHeight: 1.25, marginBottom: 16 }}>
          AI Operating System<br />for Fleet Intelligence
        </h1>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,.65)", lineHeight: 1.7 }}>
          Empowering fleets worldwide to make smarter decisions, reduce costs, and accelerate toward a sustainable future.
        </p>
      </div>

      {/* Divider */}
      <div style={{ width: 48, height: 3, background: "#00C16E", borderRadius: 99, marginBottom: 36 }} />

      {/* Features */}
      {[
        { icon: "🤖", title: "AI-Powered Insights", desc: "Get actionable recommendations using advanced AI agents." },
        { icon: "📊", title: "End-to-End Intelligence", desc: "From operations to electrification, we cover every aspect of your fleet." },
        { icon: "🌐", title: "Built for Global Fleets", desc: "Multi-country compliance, local incentives, and global benchmarks." },
        { icon: "🛡️", title: "Secure & Enterprise Ready", desc: "Bank-grade security, role-based access and complete data privacy." },
      ].map((f, i) => (
        <div key={i} style={{ display: "flex", gap: 14, marginBottom: 22, animation: `fadeUp .5s ease ${i * .08}s both` }}>
          <div style={{ width: 38, height: 38, background: "rgba(0,193,110,.15)", borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{f.icon}</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#00C16E", marginBottom: 3 }}>{f.title}</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,.55)", lineHeight: 1.6 }}>{f.desc}</div>
          </div>
        </div>
      ))}

      <div style={{ flex: 1 }} />

      {/* Industry icons */}
      <div style={{ marginTop: 32, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,.1)" }}>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,.4)", marginBottom: 14, letterSpacing: ".5px" }}>TRUSTED BY FORWARD-THINKING ORGANIZATIONS</div>
        <div style={{ display: "flex", gap: 16, justifyContent: "space-between" }}>
          {["🚛", "🏛️", "⚡", "📡", "✈️", "🏗️"].map((icon, i) => (
            <div key={i} style={{ width: 36, height: 36, background: "rgba(255,255,255,.08)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>{icon}</div>
          ))}
        </div>
      </div>

      {/* Security badges */}
      <div style={{ marginTop: 24, display: "flex", gap: 8, flexWrap: "wrap" }}>
        {["🔒 Enterprise Grade", "ISO 27001", "GDPR", "SOC 2"].map((b, i) => (
          <div key={i} style={{ fontSize: 10, color: "rgba(255,255,255,.4)", padding: "2px 8px", border: "1px solid rgba(255,255,255,.12)", borderRadius: 99 }}>{b}</div>
        ))}
      </div>
    </div>
  );
}

function StepIndicator({ currentStep, steps }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 40 }}>
      {steps.map((step, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", flex: i < steps.length - 1 ? 1 : "none" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, minWidth: 80 }}>
            <div style={{
              width: 40, height: 40, borderRadius: "50%",
              background: i < currentStep ? "#00C16E" : i === currentStep ? "#00C16E" : "#F0F4F8",
              border: i === currentStep ? "3px solid #00C16E" : i < currentStep ? "3px solid #00C16E" : "2px solid #E2E8F0",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all .3s",
            }}>
              {i < currentStep ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              ) : (
                <span style={{ fontSize: 14, color: i === currentStep ? "#fff" : "#94A3B8" }}>{step.icon}</span>
              )}
            </div>
            <div style={{ fontSize: 11, fontWeight: i === currentStep ? 600 : 400, color: i <= currentStep ? "#00C16E" : "#94A3B8", textAlign: "center", whiteSpace: "nowrap" }}>
              {i + 1}. {step.label}
            </div>
          </div>
          {i < steps.length - 1 && (
            <div style={{ flex: 1, height: 2, background: i < currentStep ? "#00C16E" : "#E2E8F0", margin: "0 4px", marginBottom: 24, transition: "background .3s" }} />
          )}
        </div>
      ))}
    </div>
  );
}

function Input({ label, placeholder, type = "text", value, onChange, required, icon, error, hint }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ marginBottom: 16 }}>
      {label && <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#334155", marginBottom: 6 }}>{label}{required && <span style={{ color: "#EF4444" }}> *</span>}</label>}
      <div style={{ position: "relative" }}>
        {icon && <div style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#94A3B8", fontSize: 16, pointerEvents: "none" }}>{icon}</div>}
        <input
          type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          style={{
            width: "100%", padding: icon ? "12px 14px 12px 42px" : "12px 14px",
            borderRadius: 10, border: `1.5px solid ${error ? "#EF4444" : focused ? "#00C16E" : "#E2E8F0"}`,
            fontSize: 14, color: "#1E293B", background: "#fff", transition: "border-color .15s",
            boxShadow: focused ? "0 0 0 3px rgba(0,193,110,.08)" : "none",
          }}
        />
      </div>
      {hint && !error && <div style={{ fontSize: 12, color: "#64748B", marginTop: 5 }}>{hint}</div>}
      {error && <div style={{ fontSize: 12, color: "#EF4444", marginTop: 5 }}>{error}</div>}
    </div>
  );
}

function PasswordStrength({ password }) {
  const checks = [
    { label: "At least 8 characters", ok: password.length >= 8 },
    { label: "One uppercase letter", ok: /[A-Z]/.test(password) },
    { label: "One number", ok: /[0-9]/.test(password) },
    { label: "One lowercase letter", ok: /[a-z]/.test(password) },
    { label: "One special character", ok: /[^A-Za-z0-9]/.test(password) },
  ];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 16px", background: "#F8FAFB", border: "1px solid #E2E8F0", borderRadius: 10, padding: "14px 16px", marginTop: -4, marginBottom: 16 }}>
      <div style={{ fontSize: 12, fontWeight: 600, color: "#475569", marginBottom: 4, gridColumn: "1/-1" }}>Password must contain:</div>
      {checks.map((c, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: c.ok ? "#00C16E" : "#94A3B8" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={c.ok ? "#00C16E" : "#CBD5E1"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          {c.label}
        </div>
      ))}
    </div>
  );
}

// Step 1: Account Info
function Step1({ data, setData }) {
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [country, setCountry] = useState("+971");

  return (
    <div style={{ animation: "slideIn .35s ease" }}>
      <h2 style={{ fontSize: 26, fontWeight: 700, color: "#0F172A", marginBottom: 6 }}>Create New Account</h2>
      <p style={{ fontSize: 14, color: "#64748B", marginBottom: 32 }}>Join FleetAxis AI and transform your fleet intelligence.</p>

      <div style={{ color: "#00C16E", fontSize: 14, fontWeight: 600, marginBottom: 6 }}>Account Information</div>
      <div style={{ fontSize: 13, color: "#64748B", marginBottom: 20 }}>Let's start with your basic details.</div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Input label="Full Name" required placeholder="Enter your full name" value={data.name} onChange={v => setData({...data, name: v})} icon="👤" />
        <Input label="Work Email" required type="email" placeholder="Enter your work email" value={data.email} onChange={v => setData({...data, email: v})} icon="✉️" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div>
          <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#334155", marginBottom: 6 }}>Password <span style={{ color: "#EF4444" }}>*</span></label>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 16, color: "#94A3B8" }}>🔒</div>
            <input type={showPwd ? "text" : "password"} value={data.password} onChange={e => setData({...data, password: e.target.value})} placeholder="Create a strong password"
              style={{ width: "100%", padding: "12px 42px 12px 42px", borderRadius: 10, border: "1.5px solid #E2E8F0", fontSize: 14, color: "#1E293B", background: "#fff" }} />
            <button onClick={() => setShowPwd(!showPwd)} style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", fontSize: 16, color: "#94A3B8", cursor: "pointer" }}>
              {showPwd ? "🙈" : "👁️"}
            </button>
          </div>
        </div>
        <div>
          <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#334155", marginBottom: 6 }}>Confirm Password <span style={{ color: "#EF4444" }}>*</span></label>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 16, color: "#94A3B8" }}>🔒</div>
            <input type={showConfirm ? "text" : "password"} value={data.confirmPassword} onChange={e => setData({...data, confirmPassword: e.target.value})} placeholder="Confirm your password"
              style={{ width: "100%", padding: "12px 42px 12px 42px", borderRadius: 10, border: `1.5px solid ${data.confirmPassword && data.password !== data.confirmPassword ? "#EF4444" : "#E2E8F0"}`, fontSize: 14, color: "#1E293B", background: "#fff" }} />
            <button onClick={() => setShowConfirm(!showConfirm)} style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", fontSize: 16, color: "#94A3B8", cursor: "pointer" }}>
              {showConfirm ? "🙈" : "👁️"}
            </button>
          </div>
          <div style={{ fontSize: 12, background: "#EFF6FF", border: "1px solid #BFDBFE", borderRadius: 8, padding: "8px 12px", marginTop: 8, color: "#1E40AF" }}>
            <div style={{ fontWeight: 600, marginBottom: 2 }}>🛡️ Password Tips</div>
            <div>Use a combination of letters, numbers, and special characters to keep your account secure.</div>
          </div>
        </div>
      </div>

      {data.password && <PasswordStrength password={data.password} />}

      {/* Phone */}
      <div style={{ marginBottom: 16 }}>
        <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#334155", marginBottom: 6 }}>Phone Number <span style={{ fontSize: 12, color: "#94A3B8" }}>(Optional)</span></label>
        <div style={{ display: "flex", gap: 8 }}>
          <select value={country} onChange={e => setCountry(e.target.value)}
            style={{ padding: "12px 10px", borderRadius: 10, border: "1.5px solid #E2E8F0", fontSize: 13, color: "#1E293B", background: "#fff", cursor: "pointer" }}>
            {COUNTRIES.map(c => <option key={c.code} value={c.code}>{c.flag} {c.code}</option>)}
          </select>
          <input type="tel" value={data.phone} onChange={e => setData({...data, phone: e.target.value})} placeholder="Enter your phone number"
            style={{ flex: 1, padding: "12px 14px", borderRadius: 10, border: "1.5px solid #E2E8F0", fontSize: 14, color: "#1E293B", background: "#fff" }} />
        </div>
      </div>

      {/* Terms */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 8 }}>
        <input type="checkbox" id="terms" checked={data.terms} onChange={e => setData({...data, terms: e.target.checked})}
          style={{ width: 16, height: 16, marginTop: 2, accentColor: "#00C16E", cursor: "pointer" }} />
        <label htmlFor="terms" style={{ fontSize: 13, color: "#475569", cursor: "pointer", lineHeight: 1.5 }}>
          I agree to the <a href="#" style={{ color: "#00C16E", fontWeight: 500 }}>Terms of Service</a> and <a href="#" style={{ color: "#00C16E", fontWeight: 500 }}>Privacy Policy</a>
        </label>
      </div>
    </div>
  );
}

// Step 2: Organisation
function Step2({ data, setData }) {
  return (
    <div style={{ animation: "slideIn .35s ease" }}>
      <h2 style={{ fontSize: 26, fontWeight: 700, color: "#0F172A", marginBottom: 6 }}>Your Organisation</h2>
      <p style={{ fontSize: 14, color: "#64748B", marginBottom: 32 }}>Tell us about your organisation so we can personalise your experience.</p>

      <div style={{ color: "#00C16E", fontSize: 14, fontWeight: 600, marginBottom: 6 }}>Organisation Details</div>
      <div style={{ fontSize: 13, color: "#64748B", marginBottom: 20 }}>Help us understand your fleet operation.</div>

      <Input label="Organisation Name" required placeholder="e.g. GreenLine Logistics" value={data.orgName} onChange={v => setData({...data, orgName: v})} icon="🏢" />
      <Input label="Your Job Title" required placeholder="e.g. Fleet Director, COO, Sustainability Manager" value={data.jobTitle} onChange={v => setData({...data, jobTitle: v})} icon="💼" />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#334155", marginBottom: 6 }}>Country <span style={{ color: "#EF4444" }}>*</span></label>
          <select value={data.country} onChange={e => setData({...data, country: e.target.value})}
            style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: "1.5px solid #E2E8F0", fontSize: 14, color: "#1E293B", background: "#fff", cursor: "pointer" }}>
            <option value="">Select country</option>
            <option value="ae">🇦🇪 United Arab Emirates</option>
            <option value="in">🇮🇳 India</option>
            <option value="us">🇺🇸 United States</option>
            <option value="gb">🇬🇧 United Kingdom</option>
            <option value="au">🇦🇺 Australia</option>
            <option value="de">🇩🇪 Germany</option>
            <option value="sa">🇸🇦 Saudi Arabia</option>
            <option value="qa">🇶🇦 Qatar</option>
            <option value="kw">🇰🇼 Kuwait</option>
            <option value="other">🌍 Other</option>
          </select>
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#334155", marginBottom: 6 }}>Fleet Size <span style={{ color: "#EF4444" }}>*</span></label>
          <select value={data.fleetSize} onChange={e => setData({...data, fleetSize: e.target.value})}
            style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: "1.5px solid #E2E8F0", fontSize: 14, color: "#1E293B", background: "#fff", cursor: "pointer" }}>
            <option value="">Select fleet size</option>
            {FLEET_SIZES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      <Input label="Website (Optional)" placeholder="https://yourcompany.com" value={data.website || ""} onChange={v => setData({...data, website: v})} icon="🌐" />
    </div>
  );
}

// Step 3: Industry & Use Case
function Step3({ data, setData }) {
  const toggleItem = (arr, key, item) => {
    const current = data[key] || [];
    const exists = current.includes(item);
    setData({ ...data, [key]: exists ? current.filter(i => i !== item) : [...current, item] });
  };

  return (
    <div style={{ animation: "slideIn .35s ease" }}>
      <h2 style={{ fontSize: 26, fontWeight: 700, color: "#0F172A", marginBottom: 6 }}>Industry & Use Case</h2>
      <p style={{ fontSize: 14, color: "#64748B", marginBottom: 32 }}>Help us configure your AI agents for maximum relevance.</p>

      <div style={{ color: "#00C16E", fontSize: 14, fontWeight: 600, marginBottom: 6 }}>Your Industry</div>
      <div style={{ fontSize: 13, color: "#64748B", marginBottom: 14 }}>Select all that apply</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 28 }}>
        {INDUSTRIES.map(ind => {
          const selected = (data.industries || []).includes(ind.id);
          return (
            <div key={ind.id} onClick={() => toggleItem(data.industries || [], "industries", ind.id)}
              style={{ padding: "12px 14px", borderRadius: 10, border: `2px solid ${selected ? "#00C16E" : "#E2E8F0"}`, background: selected ? "#F0FDF9" : "#fff", cursor: "pointer", transition: "all .15s", display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 18 }}>{ind.icon}</span>
              <span style={{ fontSize: 12, fontWeight: selected ? 600 : 400, color: selected ? "#006E3C" : "#475569", lineHeight: 1.3 }}>{ind.label}</span>
              {selected && <div style={{ marginLeft: "auto", width: 18, height: 18, borderRadius: "50%", background: "#00C16E", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
              </div>}
            </div>
          );
        })}
      </div>

      <div style={{ color: "#00C16E", fontSize: 14, fontWeight: 600, marginBottom: 6 }}>Primary Use Cases</div>
      <div style={{ fontSize: 13, color: "#64748B", marginBottom: 14 }}>What will you primarily use FleetAxis AI for?</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }}>
        {USE_CASES.map(uc => {
          const selected = (data.useCases || []).includes(uc.id);
          return (
            <div key={uc.id} onClick={() => toggleItem(data.useCases || [], "useCases", uc.id)}
              style={{ padding: "12px 14px", borderRadius: 10, border: `2px solid ${selected ? "#00C16E" : "#E2E8F0"}`, background: selected ? "#F0FDF9" : "#fff", cursor: "pointer", transition: "all .15s", display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 20 }}>{uc.icon}</span>
              <span style={{ fontSize: 13, fontWeight: selected ? 600 : 400, color: selected ? "#006E3C" : "#475569" }}>{uc.label}</span>
              {selected && <div style={{ marginLeft: "auto", width: 18, height: 18, borderRadius: "50%", background: "#00C16E", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
              </div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Step 4: Confirm
function Step4({ data }) {
  const planOptions = [
    { id: "professional", label: "Professional", price: "$299", period: "/mo", desc: "Perfect for single fleet operations", features: ["All 7 AI Agents", "300 queries/month", "PDF & Excel reports", "5 user seats"], popular: false },
    { id: "business", label: "Business", price: "$999", period: "/mo", desc: "For multi-depot operations", features: ["All 7 AI Agents", "Unlimited queries", "All export formats", "25 user seats", "API integrations", "Benchmarking"], popular: true },
    { id: "enterprise", label: "Enterprise", price: "Custom", period: "", desc: "For large enterprise fleets", features: ["Custom AI training", "Unlimited everything", "Dedicated CSM", "SLA guarantee", "Geotab/Samsara integration"], popular: false },
  ];

  const [selected, setSelected] = useState("business");

  return (
    <div style={{ animation: "slideIn .35s ease" }}>
      <h2 style={{ fontSize: 26, fontWeight: 700, color: "#0F172A", marginBottom: 6 }}>Almost Done!</h2>
      <p style={{ fontSize: 14, color: "#64748B", marginBottom: 28 }}>Choose your plan and start your 14-day free trial. No credit card required.</p>

      {/* Summary */}
      <div style={{ background: "#F0FDF9", border: "1px solid #6EE7B7", borderRadius: 12, padding: "14px 16px", marginBottom: 24, display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 40, height: 40, background: "#00C16E", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>✅</div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, color: "#065F46" }}>Account ready to create</div>
          <div style={{ fontSize: 12, color: "#047857" }}>{data.name} · {data.email} · {data.orgName}</div>
        </div>
      </div>

      {/* Plans */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 24 }}>
        {planOptions.map(plan => (
          <div key={plan.id} onClick={() => setSelected(plan.id)}
            style={{ padding: "16px 14px", borderRadius: 12, border: `2px solid ${selected === plan.id ? "#00C16E" : "#E2E8F0"}`, background: selected === plan.id ? "#F0FDF9" : "#fff", cursor: "pointer", transition: "all .15s", position: "relative" }}>
            {plan.popular && <div style={{ position: "absolute", top: -10, left: "50%", transform: "translateX(-50%)", background: "#00C16E", color: "#fff", fontSize: 10, fontWeight: 700, padding: "2px 10px", borderRadius: 99, whiteSpace: "nowrap" }}>MOST POPULAR</div>}
            <div style={{ fontSize: 13, fontWeight: 600, color: "#334155", marginBottom: 4 }}>{plan.label}</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 2, marginBottom: 6 }}>
              <span style={{ fontSize: 22, fontWeight: 700, color: "#0F172A" }}>{plan.price}</span>
              <span style={{ fontSize: 12, color: "#94A3B8" }}>{plan.period}</span>
            </div>
            <div style={{ fontSize: 11, color: "#64748B", marginBottom: 10 }}>{plan.desc}</div>
            {plan.features.slice(0, 3).map((f, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "#475569", marginBottom: 4 }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#00C16E" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>{f}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div style={{ background: "#F8FAFB", borderRadius: 10, padding: "12px 14px", fontSize: 12, color: "#64748B", textAlign: "center" }}>
        🎉 14-day free trial · No credit card required · Cancel anytime
      </div>
    </div>
  );
}

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: "", email: "", password: "", confirmPassword: "", phone: "", terms: false,
    orgName: "", jobTitle: "", country: "", fleetSize: "", website: "",
    industries: [], useCases: [], plan: "business",
  });

  const steps = [
    { label: "Account Info", icon: "👤" },
    { label: "Organisation", icon: "🏢" },
    { label: "Industry & Use Case", icon: "⚙️" },
    { label: "Confirm", icon: "✓" },
  ];

  const canProceed = () => {
    if (step === 0) return data.name && data.email && data.password && data.password === data.confirmPassword && data.terms && data.password.length >= 8;
    if (step === 1) return data.orgName && data.jobTitle && data.country && data.fleetSize;
    if (step === 2) return (data.industries || []).length > 0 && (data.useCases || []).length > 0;
    return true;
  };

  const handleNext = async () => {
    if (step < 3) { setStep(step + 1); return; }
    setLoading(true);
    setTimeout(() => { router.push("/dashboard"); }, 1500);
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <LeftPanel />

      {/* Right panel */}
      <div style={{ flex: 1, overflowY: "auto", padding: "48px 56px", display: "flex", flexDirection: "column" }}>
        {/* Top right sign in link */}
        <div style={{ textAlign: "right", marginBottom: 32 }}>
          <span style={{ fontSize: 14, color: "#64748B" }}>Already have an account? </span>
          <a href="/login" style={{ fontSize: 14, fontWeight: 600, color: "#00C16E" }}>Sign in</a>
        </div>

        <div style={{ maxWidth: 680, width: "100%", margin: "0 auto", flex: 1 }}>
          <StepIndicator currentStep={step} steps={steps} />

          {step === 0 && <Step1 data={data} setData={setData} />}
          {step === 1 && <Step2 data={data} setData={setData} />}
          {step === 2 && <Step3 data={data} setData={setData} />}
          {step === 3 && <Step4 data={data} />}

          {/* Navigation buttons */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 32, paddingTop: 24, borderTop: "1px solid #F0F4F8" }}>
            <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}
              style={{ padding: "12px 24px", borderRadius: 10, border: "1.5px solid #E2E8F0", background: "#fff", fontSize: 14, fontWeight: 500, color: step === 0 ? "#CBD5E1" : "#475569", cursor: step === 0 ? "not-allowed" : "pointer", transition: "all .15s" }}>
              ← Back
            </button>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {steps.map((_, i) => (
                <div key={i} style={{ width: i === step ? 20 : 6, height: 6, borderRadius: 99, background: i === step ? "#00C16E" : i < step ? "#6EE7B7" : "#E2E8F0", transition: "all .3s" }} />
              ))}
            </div>
            <button onClick={handleNext} disabled={!canProceed() || loading}
              style={{ padding: "12px 32px", borderRadius: 10, background: canProceed() && !loading ? "linear-gradient(135deg, #00C16E, #009955)" : "#E2E8F0", border: "none", fontSize: 14, fontWeight: 600, color: canProceed() && !loading ? "#fff" : "#94A3B8", cursor: canProceed() && !loading ? "pointer" : "not-allowed", transition: "all .15s", display: "flex", alignItems: "center", gap: 8, boxShadow: canProceed() ? "0 4px 14px rgba(0,193,110,.3)" : "none" }}>
              {loading ? (
                <><span style={{ width: 14, height: 14, border: "2px solid rgba(255,255,255,.4)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin .8s linear infinite", display: "inline-block" }} /> Creating account…</>
              ) : step === 3 ? "Create Account & Start Free Trial →" : "Next →"}
            </button>
          </div>
        </div>

        {/* Security footer */}
        <div style={{ maxWidth: 680, margin: "32px auto 0", display: "flex", justifyContent: "center", gap: 24, flexWrap: "wrap" }}>
          {["🔒 Enterprise Grade Security", "🛡️ ISO 27001 Compliant", "🇪🇺 GDPR Compliant", "✅ SOC 2 Type II Certified"].map((b, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "#94A3B8" }}>{b}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
