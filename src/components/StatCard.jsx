import React from "react";
export default function StatCard({ label, value, note, icon: Icon, tone = "green" }) {
  return <article className="stat-card">
    <div className={`stat-icon ${tone}`}><Icon size={20}/></div>
    <div className="stat-copy"><span>{label}</span><strong>{value}</strong><small>{note}</small></div>
  </article>;
}