"use client";
import { useState, useRef } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import * as XLSX from "xlsx";

const FILE_TYPES = [
  { id: "fleet", icon: "🚛", label: "Fleet Master", desc: "Vehicle list, specs, ownership, department", accept: ".xlsx,.xls,.csv", color: "#00C16E" },
  { id: "route", icon: "🗺️", label: "Route Data", desc: "Daily routes, mileage, destinations", accept: ".xlsx,.xls,.csv", color: "#3B82F6" },
  { id: "maintenance", icon: "🔧", label: "Maintenance Records", desc: "Service history, work orders, costs", accept: ".xlsx,.xls,.csv", color: "#F97316" },
  { id: "electricity", icon: "⚡", label: "Electricity Bills", desc: "Monthly bills, tariff rates, depot consumption", accept: ".xlsx,.xls,.csv,.pdf", color: "#8B5CF6" },
  { id: "charging", icon: "🔌", label: "Charging Sessions", desc: "EV charging logs, kWh, duration, cost", accept: ".xlsx,.xls,.csv", color: "#06B6D4" },
  { id: "telematics", icon: "📡", label: "Telematics Data", desc: "GPS, speed, idle time, driver behaviour", accept: ".xlsx,.xls,.csv", color: "#EC4899" },
  { id: "driver", icon: "👤", label: "Driver Data", desc: "Driver profiles, licences, assignments", accept: ".xlsx,.xls,.csv", color: "#10B981" },
  { id: "sustainability", icon: "🌱", label: "Sustainability Data", desc: "Carbon records, ESG metrics, fuel logs", accept: ".xlsx,.xls,.csv", color: "#84CC16" },
];

function FileCard({ type, files, onUpload, onDelete }) {
  const fileRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const myFiles = files.filter(f => f.typeId === type.id);

  const handleFile = async (file) => {
    if (!file) return;
    const ext = file.name.split(".").pop().toLowerCase();
    let preview = null;
    if (["xlsx", "xls", "csv"].includes(ext)) {
      try {
        const buf = await file.arrayBuffer();
        const wb = XLSX.read(buf, { type: "array" });
        const ws = wb.Sheets[wb.SheetNames[0]];
        const json = XLSX.utils.sheet_to_json(ws, { defval: "" });
        preview = { rows: json.length, cols: Object.keys(json[0] || {}).length, headers: Object.keys(json[0] || {}).slice(0, 4) };
      } catch (e) {}
    }
    onUpload({ id: Date.now(), name: file.name, size: (file.size / 1024).toFixed(0) + " KB", date: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }), typeId: type.id, status: "ready", preview, ext });
  };

  return (
    <div style={{ background: "#fff", border: `1px solid ${dragging ? type.color : "#F0F4F8"}`, borderRadius: 14, overflow: "hidden", transition: "border-color .2s", boxShadow: "0 2px 8px rgba(0,0,0,.04)" }}
      onDragOver={e => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={e => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files[0]); }}>

      {/* Card header */}
      <div style={{ padding: "14px 16px", borderBottom: "1px solid #F8FAFB", display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 36, height: 36, borderRadius: 9, background: `${type.color}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{type.icon}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#0F172A" }}>{type.label}</div>
          <div style={{ fontSize: 11, color: "#94A3B8", marginTop: 1 }}>{type.desc}</div>
        </div>
        {myFiles.length > 0 && (
          <div style={{ background: "#DCFCE7", color: "#065F46", fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 99 }}>{myFiles.length} file{myFiles.length > 1 ? "s" : ""}</div>
        )}
      </div>

      {/* Files list */}
      {myFiles.length > 0 && (
        <div style={{ padding: "8px 12px" }}>
          {myFiles.map(f => (
            <div key={f.id} style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 8px", background: "#F8FAFB", borderRadius: 8, marginBottom: 4 }}>
              <div style={{ fontSize: 14 }}>{f.ext === "pdf" ? "📄" : f.ext === "csv" ? "📊" : "📗"}</div>
              <div style={{ flex: 1, overflow: "hidden" }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: "#334155", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{f.name}</div>
                <div style={{ fontSize: 10, color: "#94A3B8" }}>{f.size} · {f.date}{f.preview ? ` · ${f.preview.rows} rows, ${f.preview.cols} cols` : ""}</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <div style={{ width: 16, height: 16, borderRadius: "50%", background: "#DCFCE7", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#00C16E" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <button onClick={() => onDelete(f.id)} style={{ width: 20, height: 20, borderRadius: 5, border: "none", background: "#FEF2F2", cursor: "pointer", fontSize: 10, color: "#EF4444", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload zone */}
      <div style={{ padding: myFiles.length > 0 ? "8px 12px 12px" : "12px" }}>
        <input ref={fileRef} type="file" accept={type.accept} style={{ display: "none" }} onChange={e => handleFile(e.target.files[0])} />
        <button onClick={() => fileRef.current?.click()}
          style={{ width: "100%", padding: myFiles.length > 0 ? "7px" : "14px 10px", borderRadius: 9, border: `1.5px dashed ${dragging ? type.color : "#E2E8F0"}`, background: dragging ? `${type.color}08` : "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 7, fontSize: 12, color: dragging ? type.color : "#64748B", fontWeight: 500, transition: "all .15s", fontFamily: "'Sora',sans-serif" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
            <line x1="12" y1="18" x2="12" y2="12"/><polyline points="9 15 12 12 15 15"/>
          </svg>
          {myFiles.length > 0 ? "Add another file" : `Upload ${type.label}`}
        </button>
      </div>
    </div>
  );
}

export default function DataSourcesPage() {
  const [files, setFiles] = useState([
    { id: 1, name: "Fleet_Data_May2026.xlsx", size: "245 KB", date: "20 May 2026", typeId: "fleet", status: "ready", ext: "xlsx", preview: { rows: 250, cols: 12, headers: ["Vehicle ID", "Type", "Fuel", "Mileage"] } },
    { id: 2, name: "Telematics_Apr2026.csv", size: "1.2 MB", date: "18 May 2026", typeId: "telematics", status: "ready", ext: "csv", preview: { rows: 8400, cols: 18, headers: ["Date", "Vehicle", "Speed", "Idle"] } },
    { id: 3, name: "Maintenance_History.xlsx", size: "380 KB", date: "18 May 2026", typeId: "maintenance", status: "ready", ext: "xlsx", preview: { rows: 1240, cols: 9, headers: ["Date", "Vehicle", "Type", "Cost"] } },
    { id: 4, name: "Electricity_Bills_Apr2026.pdf", size: "2.1 MB", date: "16 May 2026", typeId: "electricity", status: "ready", ext: "pdf" },
  ]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const handleUpload = (file) => setFiles(prev => [...prev, file]);
  const handleDelete = (id) => setFiles(prev => prev.filter(f => f.id !== id));

  const totalSize = files.reduce((acc, f) => {
    const num = parseFloat(f.size);
    const unit = f.size.includes("MB") ? num * 1024 : num;
    return acc + unit;
  }, 0);

  const filteredTypes = FILE_TYPES.filter(t => activeFilter === "all" || files.some(f => f.typeId === t.id));

  return (
    <DashboardLayout>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        *{box-sizing:border-box}
        input:focus{outline:none}
        ::-webkit-scrollbar{width:4px}
        ::-webkit-scrollbar-thumb{background:#E2E8F0;border-radius:2px}
      `}</style>

      <div style={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }}>

        {/* Header */}
        <div style={{ background: "#fff", borderBottom: "1px solid #F0F4F8", padding: "16px 24px", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
            <div>
              <h1 style={{ fontSize: 20, fontWeight: 700, color: "#0F172A" }}>Data Sources 🗄️</h1>
              <p style={{ fontSize: 13, color: "#64748B", marginTop: 2 }}>Upload and manage your fleet data. AI automatically processes and indexes all files.</p>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <div style={{ background: "#F8FAFB", border: "1px solid #E2E8F0", borderRadius: 10, padding: "8px 14px", fontSize: 12, color: "#64748B", display: "flex", alignItems: "center", gap: 6 }}>
                📁 <strong style={{ color: "#334155" }}>{files.length}</strong> files
              </div>
              <div style={{ background: "#F8FAFB", border: "1px solid #E2E8F0", borderRadius: 10, padding: "8px 14px", fontSize: 12, color: "#64748B", display: "flex", alignItems: "center", gap: 6 }}>
                💾 <strong style={{ color: "#334155" }}>{(totalSize / 1024).toFixed(1)} MB</strong> used
              </div>
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div style={{ background: "#fff", borderBottom: "1px solid #F0F4F8", padding: "10px 24px", display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
          {/* Search */}
          <div style={{ position: "relative", flex: 1, maxWidth: 300 }}>
            <div style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", fontSize: 14, color: "#94A3B8" }}>🔍</div>
            <input value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Search files..."
              style={{ width: "100%", padding: "8px 10px 8px 32px", borderRadius: 9, border: "1.5px solid #E2E8F0", fontSize: 12, color: "#334155", background: "#F8FAFB", fontFamily: "'Sora',sans-serif" }}
              onFocus={e => e.target.style.borderColor = "#00C16E"} onBlur={e => e.target.style.borderColor = "#E2E8F0"} />
          </div>

          {/* Filter tabs */}
          <div style={{ display: "flex", gap: 4 }}>
            {[{ id: "all", label: "All Types" }, { id: "uploaded", label: "Uploaded Only" }].map(f => (
              <button key={f.id} onClick={() => setActiveFilter(f.id)}
                style={{ padding: "7px 12px", borderRadius: 8, border: "none", background: activeFilter === f.id ? "#00C16E" : "#F8FAFB", color: activeFilter === f.id ? "#fff" : "#64748B", fontSize: 11, fontWeight: 500, cursor: "pointer", fontFamily: "'Sora',sans-serif" }}>
                {f.label}
              </button>
            ))}
          </div>

          <div style={{ marginLeft: "auto", fontSize: 11, color: "#94A3B8" }}>
            AI processes files automatically on upload
          </div>
        </div>

        {/* Info banner */}
        <div style={{ background: "#F0FDF9", borderBottom: "1px solid #D1FAE5", padding: "10px 24px", display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
          <div style={{ fontSize: 16 }}>✅</div>
          <div style={{ fontSize: 12, color: "#065F46" }}>
            <strong>{files.length} data sources active</strong> — FleetAxis AI has indexed your data and is ready for analysis. Drag & drop files onto any card or click Upload.
          </div>
        </div>

        {/* File type grid */}
        <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 14 }}>
            {FILE_TYPES.filter(t => {
              if (activeFilter === "uploaded") return files.some(f => f.typeId === t.id);
              if (searchTerm) return t.label.toLowerCase().includes(searchTerm.toLowerCase()) || files.some(f => f.typeId === t.id && f.name.toLowerCase().includes(searchTerm.toLowerCase()));
              return true;
            }).map(type => (
              <FileCard key={type.id} type={type} files={files} onUpload={handleUpload} onDelete={handleDelete} />
            ))}
          </div>

          {/* API integrations teaser */}
          <div style={{ marginTop: 20, background: "#fff", borderRadius: 14, border: "1px solid #F0F4F8", padding: "16px 20px", boxShadow: "0 2px 8px rgba(0,0,0,.04)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <div style={{ fontSize: 20 }}>🔗</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#0F172A" }}>Connect via API Integration</div>
                <div style={{ fontSize: 12, color: "#64748B" }}>Pull live data automatically from your existing fleet systems</div>
              </div>
              <span style={{ marginLeft: "auto", fontSize: 10, background: "#FAEEDA", color: "#633806", padding: "2px 8px", borderRadius: 99, fontWeight: 600 }}>Coming Soon</span>
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {["Geotab", "Samsara", "Fleetio", "Oracle ERP", "SAP", "ChargePoint", "ABB Chargers"].map((api, i) => (
                <div key={i} style={{ padding: "5px 12px", borderRadius: 99, border: "1px solid #E2E8F0", fontSize: 11, color: "#64748B", background: "#F8FAFB" }}>{api}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
