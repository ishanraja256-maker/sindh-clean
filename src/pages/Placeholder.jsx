import React from "react";
import { Construction, LockKeyhole, ClipboardCheck } from "lucide-react";
const content={
  municipal:["Municipal operations","Team assignments, task deadlines, status updates and cleanup verification will be connected in the municipal operations phase.","Task management"],
  analytics:["Environmental insights","Charts and impact calculations will use verified report records. No sample or fabricated environmental totals are displayed here.","Analytics"],
  community:["Community missions","Verified cleanup events, volunteer participation, rewards and certificates will be developed in this module.","Community"],
  awareness:["Awareness hub","Locally relevant waste sorting guidance, public awareness material and Sindhi/Urdu/English content will live here.","Learning"],
  admin:["System administration","Secure role management, moderation, audit history and Firebase configuration will be enabled after authentication and database rules are implemented.","Administration"]
};
export default function Placeholder({page}){
 const [title,desc,tag]=content[page]||content.analytics;
 return <div className="page-stack"><section className="panel coming-panel"><div className="coming-icon"><Construction size={28}/></div><span className="eyebrow">{tag.toUpperCase()} MODULE</span><h2>{title}</h2><p>{desc}</p><div className="coming-note"><LockKeyhole size={17}/> This module is a planned part of the full platform; it is not represented as a working cloud feature yet.</div></section></div>;
}