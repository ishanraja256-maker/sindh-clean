import React from "react";
import {
  LayoutDashboard, FilePlus2, Camera, MapPinned, ClipboardList,
  Users, ChartNoAxesCombined, BookOpen, Settings, Leaf, X, ChevronRight, BrainCircuit
} from "lucide-react";

const nav = [
  { group: "WORKSPACE", items: [
    ["dashboard", "Overview", LayoutDashboard],
    ["report", "Submit a report", FilePlus2],
    ["camera", "Live monitoring", Camera],
    ["map", "Sindh map", MapPinned],
    ["tracking", "Track reports", ClipboardList],
  ]},
  { group: "OPERATIONS", items: [
    ["municipal", "Municipal teams", Users],
    ["analytics", "Impact & analytics", ChartNoAxesCombined],
    ["intelligence", "Smart intelligence", BrainCircuit],
    ["community", "Community missions", Users],
    ["awareness", "Awareness hub", BookOpen],
  ]},
  { group: "SYSTEM", items: [
    ["admin", "Administration", Settings],
  ]}
];

export default function Sidebar({ page, setPage, open, close }) {
  return <>
    {open && <button className="scrim" aria-label="Close navigation" onClick={close} />}
    <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
      <div className="brand">
        <div className="brand-mark"><Leaf size={23}/></div>
        <div><strong>Clean Sindh</strong><small>Community • Environment • Action</small></div>
        <button className="icon-btn sidebar-close" onClick={close} aria-label="Close menu"><X size={19}/></button>
      </div>
      <div className="region-chip"><span className="status-dot"/> SINDH ENVIRONMENT INITIATIVE</div>
      <nav className="nav-list">
        {nav.map((section) => <div className="nav-section" key={section.group}>
          <p className="nav-heading">{section.group}</p>
          {section.items.map(([id, label, Icon]) => <button key={id}
            className={`nav-item ${page === id ? "active" : ""}`}
            onClick={() => { setPage(id); close(); }}>
            <Icon size={18}/><span>{label}</span>{page === id && <ChevronRight className="nav-arrow" size={16}/>}
          </button>)}
        </div>)}
      </nav>
      <div className="sidebar-foot">
        <div className="ajrak-stripe"/>
        <strong>Our Sindh. Our responsibility.</strong>
        <span>Small actions. Cleaner communities.</span>
      </div>
    </aside>
  </>;
}