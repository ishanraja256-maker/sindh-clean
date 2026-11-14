import React from "react";
import { Search, FileText, MapPin, CalendarDays } from "lucide-react";
export default function Tracking({reports}){
  const [query,setQuery]=React.useState("");
  const filtered=reports.filter(r=>(r.id+" "+r.category+" "+r.locationText).toLowerCase().includes(query.toLowerCase()));
  return <div className="page-stack"><section className="panel tracking-panel">
    <div className="panel-head"><div><span className="eyebrow">REPORT REGISTER</span><h3>Submitted reports</h3></div><span className="count-badge">{reports.length} total</span></div>
    <div className="search-field"><Search size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search by report ID, category or location..."/></div>
    {filtered.length?<div className="table-wrap"><table><thead><tr><th>Report</th><th>Category</th><th>Location</th><th>Date</th><th>Status</th></tr></thead><tbody>{filtered.map(r=><tr key={r.id}><td><strong>{r.id}</strong><small>{r.severity} priority</small>{r.duplicateWarning&&<small className="duplicate-tag">Possible duplicate · {r.duplicateOf||"linked report"}</small>}</td><td>{r.category}</td><td><MapPin size={13}/>{r.locationText}</td><td><CalendarDays size={13}/>{new Date(r.createdAt).toLocaleDateString()}</td><td><span className={`status-pill ${r.status.toLowerCase().replace(" ","-")}`}>{r.status}</span></td></tr>)}</tbody></table></div>:<div className="empty-state"><div className="empty-icon"><FileText size={24}/></div><strong>{query?"No matching reports":"No reports to display"}</strong><p>Reports submitted from this browser will appear in this register.</p></div>}
  </section></div>;
}