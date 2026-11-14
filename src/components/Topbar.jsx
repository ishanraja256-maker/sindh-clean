import React from "react";
import { Menu, Search, Bell, Globe2, ChevronDown } from "lucide-react";

const titles = {
  dashboard: ["Overview", "A live view of community reporting and cleanup activity."],
  report: ["Submit a report", "Help municipal teams identify and respond to waste concerns."],
  camera: ["Live monitoring", "Camera preview and local recording tools."],
  map: ["Sindh map", "Explore report locations and environmental activity."],
  tracking: ["Track reports", "Review the status of submitted reports."],
  municipal: ["Municipal teams", "Operational workspace for assignments and field response."],
  analytics: ["Impact & analytics", "Understand reporting trends and verified progress."],
  community: ["Community missions", "Bring residents together for local cleanup activity."],
  awareness: ["Awareness hub", "Practical information for cleaner neighbourhoods."],
  admin: ["Administration", "System setup and governance controls."],
  intelligence: ["Smart intelligence", "Decision support, field logistics and verified impact tools."]
};

export default function Topbar({ page, onMenu }) {
  const [lang, setLang] = React.useState("EN");
  const [showLang, setShowLang] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [showSearch, setShowSearch] = React.useState(false);
  const title = titles[page] || titles.dashboard;
  return <header className="topbar">
    <button className="icon-btn menu-btn" onClick={onMenu} aria-label="Open navigation"><Menu/></button>
    <div className="page-heading"><h1>{title[0]}</h1><p>{title[1]}</p></div>
    <div className="top-actions">
      {showSearch && <input className="top-search-input" autoFocus placeholder="Search reports..." value={query} onChange={e=>setQuery(e.target.value)} />}
      <button className="icon-btn" aria-label="Toggle search" onClick={()=>setShowSearch(v=>!v)}><Search size={19}/></button>
      <div className="language-wrap">
        <button className="language-btn" onClick={()=>setShowLang(v=>!v)}><Globe2 size={16}/>{lang}<ChevronDown size={14}/></button>
        {showLang && <div className="language-menu">{["EN","اردو","سنڌي"].map(x=><button key={x} onClick={()=>{setLang(x);setShowLang(false)}}>{x}</button>)}</div>}
      </div>
      <button className="icon-btn notification-btn" aria-label="Notifications"><Bell size={19}/><i/></button>
      <div className="avatar" title="Demo workspace">CS</div>
    </div>
  </header>;
}