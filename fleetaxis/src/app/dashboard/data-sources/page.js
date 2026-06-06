"use client";
import { useState, useRef } from "react";
import DashboardLayout from "../../components/DashboardLayout";

const FILE_TYPES = [
  { id: "fleet", icon: "🚛", label: "Fleet Master", desc: "Vehicle list, specs, ownership, department", color: "#00C16E" },
  { id: "route", icon: "🗺️", label: "Route Data", desc: "Daily routes, mileage, destinations", color: "#3B82F6" },
  { id: "maintenance", icon: "🔧", label: "Maintenance Records", desc: "Service history, work orders, costs", color: "#F97316" },
  { id: "electricity", icon: "⚡", label: "Electricity Bills", desc: "Monthly bills, tariff rates, depot consumption", color: "#8B5CF6" },
  { id: "charging", icon: "🔌", label: "Charging Sessions", desc: "EV charging logs, kWh, duration, cost", color: "#06B6D4" },
  { id: "telematics", icon: "📡", label: "Telematics Data", desc: "GPS, speed, idle time, driver behaviour", color: "#EC4899" },
  { id: "driver", icon: "👤", label: "Driver Data", desc: "Driver profiles, licences, assignments", color: "#10B981" },
  { id: "sustainability", icon: "🌱", label: "Sustainability Data", desc: "Carbon records, ESG metrics, fuel logs", color: "#84CC16" },
];

function FileCard({ type, files, onUpload, onDelete }) {
  const fileRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const myFiles = files.filter(f => f.typeId === type.id);

  const handleFile = (file) => {
    if (!file) return;
    onUpload({ id: Date.now(), name: file.name, size: (file.size / 1024).toFixed(0) + " KB", date: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }), typeId: type.id, ext: file.name.split(".").pop().toLowerCase() });
  };

  return (
    <div style={{ background: "#fff", border: `1px solid ${dragging ? type.color : "#F0F4F8"}`, borderRadius: 14, overflow: "hidden", transition: "border-color .2s", boxShadow: "0 2px 8px rgba(0,0,0,.04)" }}
      onDragOver={e => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={e => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files[0]); }}>
      <div style={{ padding: "14px 16px", borderBottom: "1px solid #F8FAFB", display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 36, height: 36, borderRadius: 9, background: `${type.color}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{type.icon}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#0F172A" }}>{type.label}</div>
          <div style={{ fontSize: 11, color: "#94A3B8", marginTop: 1 }}>{type.desc}</div>
        </div>
        {myFiles.length > 0 && <div style={{ background: "#DCFCE7", color: "#065F46", fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 99 }}>{myFiles.length} file{myFiles.length > 1 ? "s" : ""}</div>}
      </div>
      {myFiles.length > 0 && (
        <div style={{ padding: "8px 12px" }}>
          {myFiles.map(f => (
            <div key={f.id} style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 8px", background: "#F8FAFB", borderRadius: 8, marginBottom: 4 }}>
              <span style={{ fontSize: 14 }}>{f.ext === "pdf" ? "📄" : f.ext === "csv" ? "📊" : "📗"}</span>
              <div style={{ flex: 1, overflow: "hidden" }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: "#334155", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{f.name}</div>
                <div style={{ fontSize: 10, color: "#94A3B8" }}>{f.size} · {f.date}</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <div style={{ width: 16, height: 16, borderRadius: "50%", background: "#DCFCE7", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#00C16E" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <button onClick={() => onDelete(f.id)} style={{ width: 20, height: 20, borderRadius: 5, border: "none", background: "#FEF2F2", cursor: "pointer", fontSize: 10, color: "#EF4444" }}>✕</button>
              </div>
            </div>
          ))}
        </div>
      )}
      <div style={{ padding: myFiles.length > 0 ? "8px 12px 12px" : "12px" }}>
        <input ref={fileRef} type="file" accept=".xlsx,.xls,.csv,.pdf" style={{ display: "none" }} onChange={e => handleFile(e.target.files[0])} />
        <button onClick={() => fileRef.current?.click()}
          style={{ width: "100%", padding: myFiles.length > 0 ? "7px" : "14px 10px", borderRadius: 9, border: `1.5px dashed ${dragging ? type.color : "#E2E8F0"}`, background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 7, fontSize: 12, color: "#64748B", fontWeight: 500, fontFamily: "'Sora',sans-serif" }}>
          ⬆️ {myFiles.length > 0 ? "Add another file" : `Upload ${type.label}`}
        </button>
      </div>
    </div>
  );
}

export default function DataSourcesPage() {
  const [files, setFiles] = useState([
    { id: 1, name: "Fleet_Data_May2026.xlsx", size: "245 KB", date: "20 May 2026", typeId: "fleet", ext: "xlsx" },
    { id: 2, name: "Telematics_Apr2026.csv", size: "1.2 MB", date: "18 May 2026", typeId: "telematics", ext: "csv" },
    { id: 3, name: "Maintenance_History.xlsx", size: "380 KB", date: "18 May 2026", typeId: "maintenance", ext: "xlsx" },
    { id: 4, name: "Electricity_Bills_Apr2026.pdf", size: "2.1 MB", date: "16 May 2026", typeId: "electricity", ext: "pdf" },
  ]);

  return (
    <DashboardLayout>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&display=swap');*{box-sizing:border-box}::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:#E2E8F0;border-radius:2px}`}</style>
      <div style={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }}>
        <div style={{ background: "#fff", borderBottom: "1px solid #F0F4F8", padding: "16px 24px", flexShrink: 0 }}>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: "#0F172A" }}>Data Sources 🗄️</h1>
          <p style={{ fontSize: 13, color: "#64748B", marginTop: 2 }}>Upload and manage your fleet data. AI automatically processes and indexes all files.</p>
        </div>
        <div style={{ background: "#F0FDF9", borderBottom: "1px solid #D1FAE5", padding: "10px 24px", display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
          <span style={{ fontSize: 16 }}>✅</span>
          <span style={{ fontSize: 12, color: "#065F46" }}><strong>{files.length} data sources active</strong> — FleetAxis AI has indexed your data. Drag & drop files onto any card or click Upload.</span>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 14 }}>
            {FILE_TYPES.map(type => <FileCard key={type.id} type={type} files={files} onUpload={f => setFiles(prev => [...prev, f])} onDelete={id => setFiles(prev => prev.filter(f => f.id !== id))} />)}
          </div>
          <div style={{ marginTop: 20, background: "#fff", borderRadius: 14, border: "1px solid #F0F4F8", padding: "16px 20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <span style={{ fontSize: 20 }}>🔗</span>
              <div><div style={{ fontSize: 14, fontWeight: 600, color: "#0F172A" }}>Connect via API Integration</div><div style={{ fontSize: 12, color: "#64748B" }}>Pull live data from Geotab, Samsara, Fleetio and more</div></div>
              <span style={{ marginLeft: "auto", fontSize: 10, background: "#FAEEDA", color: "#633806", padding: "2px 8px", borderRadius: 99, fontWeight: 600 }}>Coming Soon</span>
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {["Geotab", "Samsara", "Fleetio", "Oracle ERP", "SAP", "ChargePoint"].map((api, i) => <div key={i} style={{ padding: "5px 12px", borderRadius: 99, border: "1px solid #E2E8F0", fontSize: 11, color: "#64748B" }}>{api}</div>)}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
