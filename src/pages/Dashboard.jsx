import React from "react";
import { FileText, Clock3, CheckCircle2, Users, ArrowUpRight, MapPin, Activity, ShieldCheck } from "lucide-react";
import StatCard from "../components/StatCard.jsx";

export default function Dashboard({ reports, setPage }) {
  const publicImage = (name) => `${import.meta.env.BASE_URL}images/${name}`;
  const pending = reports.filter(r=>r.status==="Pending").length;
  const progress = reports.filter(r=>r.status==="In progress").length;
  const resolved = reports.filter(r=>r.status==="Resolved").length;
  const stats = [
    ["Total reports", reports.length, "Reports saved on this device", FileText, "green"],
    ["Awaiting review", pending, "Pending submissions", Clock3, "amber"],
    ["In progress", progress, "Assigned cleanup activity", Activity, "blue"],
    ["Resolved", resolved, "Verified as resolved", CheckCircle2, "red"],
  ];
  return <div className="page-stack legacy-home">
    <section className="legacy-hero">
      <div className="legacy-hero-copy">
        <span className="eyebrow"><span className="status-dot"/> CITIZEN COMPLAINT &amp; PROGRESS PORTAL</span>
        <h2>Report it. Clean it.<br/><em>Protect Sindh.</em></h2>
        <p>Spot garbage, pin its exact location, show it live on camera and follow the complaint until the area is clean.</p>
        <div className="legacy-hero-actions">
          <button className="btn btn-light" onClick={()=>setPage("report")}>Report garbage <ArrowUpRight size={17}/></button>
          <button className="btn btn-outline-light" onClick={()=>setPage("camera")}>Open live camera</button>
        </div>
      </div>
      <div className="legacy-hero-art"><img src={publicImage("sindh-map.png")} alt="Illustrated map of Sindh" /></div>
    </section>
    <section className="legacy-section-head"><div><span className="eyebrow">REAL COMMUNITY ACTION</span><h2>Clean-up in action</h2></div><p>Awareness, field work and cleaner public spaces</p></section>
    <section className="legacy-gallery" aria-label="Clean-up in action photo gallery">
      <figure className="legacy-gallery-card"><img src={publicImage("cleanup-awareness-1.webp")} alt="Clean Sindh awareness campaign"/><figcaption>Keep public spaces clean</figcaption></figure>
      <figure className="legacy-gallery-card"><img src={publicImage("cleanup-awareness-2.webp")} alt="Waste pollution awareness"/><figcaption>Awareness creates change</figcaption></figure>
      <figure className="legacy-gallery-card"><img src={publicImage("cleanup-workers.webp")} alt="Clean Sindh workers cleaning a public area with a loader"/><figcaption>Cleanup work in the field</figcaption></figure>
      <figure className="legacy-gallery-card"><img src={publicImage("cleanup-after.webp")} alt="Cleaned public area after waste removal"/><figcaption>A cleaner place for everyone</figcaption></figure>
      <figure className="legacy-gallery-card"><img src={publicImage("cleanup-awareness-3.webp")} alt="Clean Sindh awareness campaign"/><figcaption>Protect Sindh together</figcaption></figure>
    </section>
    <section className="legacy-section-head"><div><span className="eyebrow">OUR LAND • OUR HERITAGE</span><h2>Sindh’s identity, beyond generations</h2></div></section>
    <section className="legacy-heritage">
      <article className="legacy-heritage-card"><img src={publicImage("mazar-e-quaid.webp")} alt="Mazar-e-Quaid in Karachi"/><div><strong>Mazar-e-Quaid</strong><p>A familiar landmark representing the history and identity of our region.</p></div></article>
      <article className="legacy-heritage-card"><img src="https://upload.wikimedia.org/wikipedia/commons/2/2b/Mohenjo-daro.jpg" alt="Authentic photograph of the archaeological ruins at Mohenjo-daro"/><div><strong>Mohenjo-daro</strong><p>An ancient city of the Indus Valley Civilization, located in Sindh.</p></div></article>
    </section>
    <p className="legacy-photo-credit">Mohenjo-daro photograph: Saqib Qayyum, Wikimedia Commons, CC BY-SA 3.0.</p>
    <div className="section-head"><div><span className="eyebrow">AT A GLANCE</span><h2>Community overview</h2></div><span className="data-note">Counts update from reports stored in this browser</span></div>
    <div className="stats-grid">
      {stats.map(([label,value,note,icon,tone])=><StatCard key={label} {...{label,value,note,icon,tone}}/>)}
    </div>
    <div className="dashboard-grid">
      <section className="panel activity-panel">
        <div className="panel-head"><div><span className="eyebrow">LATEST ACTIVITY</span><h3>Recent reports</h3></div><button className="text-btn" onClick={()=>setPage("tracking")}>View all <ArrowUpRight size={15}/></button></div>
        {reports.length ? <div className="report-list">{reports.slice(0,5).map(r=><div className="report-row" key={r.id}>
          <div className="report-symbol"><MapPin size={17}/></div><div className="report-info"><strong>{r.category}</strong><span>{r.locationText || "Location not provided"} · {new Date(r.createdAt).toLocaleDateString()}</span></div><span className={`status-pill ${r.status.toLowerCase().replace(" ","-")}`}>{r.status}</span>
        </div>)}</div> : <div className="empty-state"><div className="empty-icon"><FileText size={24}/></div><strong>No reports yet</strong><p>Submitted reports will appear here. Start by creating the first report.</p><button className="btn btn-primary" onClick={()=>setPage("report")}>Submit a report</button></div>}
      </section>
      <section className="panel insight-panel">
        <div className="panel-head"><div><span className="eyebrow">FIELD OPERATIONS</span><h3>Platform readiness</h3></div><ShieldCheck size={20} className="panel-accent"/></div>
        <div className="readiness-item"><span className="readiness-icon green-bg"><FileText size={17}/></span><div><strong>Local reporting</strong><small>Available in this browser</small></div><span className="ready-tag">Ready</span></div>
        <div className="readiness-item"><span className="readiness-icon blue-bg"><MapPin size={17}/></span><div><strong>Interactive map</strong><small>Map view is available</small></div><span className="ready-tag">Ready</span></div>
        <div className="readiness-item"><span className="readiness-icon amber-bg"><Activity size={17}/></span><div><strong>Cloud sync & user roles</strong><small>Requires Firebase setup</small></div><span className="pending-tag">Setup</span></div>
        <div className="readiness-item"><span className="readiness-icon red-bg"><Users size={17}/></span><div><strong>Live video streaming</strong><small>Requires WebRTC and TURN</small></div><span className="pending-tag">Setup</span></div>
        <p className="panel-footnote">This build does not claim cloud connectivity until Firebase credentials and database security rules are configured.</p>
      </section>
    </div>
    <div className="cultural-note"><span className="ajrak-mini"/> <div><strong>Inspired by Sindh. Built for cleaner neighbourhoods.</strong><p>Ajrak-inspired details are used as a subtle part of the visual identity, alongside a clear and practical civic interface.</p></div></div>
  </div>;
}