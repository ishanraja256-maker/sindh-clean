import React from "react";
import { MapPin, Camera, Send, LocateFixed, AlertTriangle, CheckCircle2 } from "lucide-react";
import { createReportId, saveReport } from "../services/storage.js";
import { findPossibleDuplicates } from "../services/intelligence.js";

export default function Report({ onCreated }) {
  const [category,setCategory]=React.useState("Mixed household waste");
  const [description,setDescription]=React.useState("");
  const [locationText,setLocationText]=React.useState("");
  const [coords,setCoords]=React.useState(null);
  const [photo,setPhoto]=React.useState("");
  const [message,setMessage]=React.useState("");
  const [busy,setBusy]=React.useState(false);
  const [matches,setMatches]=React.useState([]);
  const [allowDuplicate,setAllowDuplicate]=React.useState(false);
  const categories=["Mixed household waste","Plastic waste","Open dumping","Construction debris","Organic waste","Waterway / drain blockage","Other"];
  function locate(){
    if(!navigator.geolocation){setMessage("This browser does not support location access.");return;}
    setBusy(true);setMessage("");
    navigator.geolocation.getCurrentPosition(pos=>{
      setCoords({lat:pos.coords.latitude,lng:pos.coords.longitude});
      setLocationText(`${pos.coords.latitude.toFixed(5)}, ${pos.coords.longitude.toFixed(5)}`);
      setBusy(false);
    },err=>{setMessage(err.code===1?"Location permission was denied. You can enter a location manually.":"Could not get your location. Please enter it manually.");setBusy(false);},{enableHighAccuracy:true,timeout:12000});
  }
  function choosePhoto(e){
    const f=e.target.files?.[0]; if(!f)return;
    if(!f.type.startsWith("image/")){setMessage("Please select an image file.");return;}
    if(f.size>4*1024*1024){setMessage("Please choose an image smaller than 4 MB for this local prototype.");return;}
    const reader=new FileReader();reader.onload=()=>setPhoto(reader.result);reader.readAsDataURL(f);
  }
  function submit(e){
    e.preventDefault();setMessage("");
    if(description.trim().length<10){setMessage("Please add a little more detail (at least 10 characters).");return;}
    if(!locationText.trim()){setMessage("Please add a location or use GPS.");return;}
    const candidate={category,description:description.trim(),locationText,coordinates:coords};
    const possible=findPossibleDuplicates(candidate);
    if(possible.length && !allowDuplicate){setMatches(possible);setMessage("Possible existing report found. Review it before submitting another report.");return;}
    const report={id:createReportId(),...candidate,photo,status:"Pending",severity:/drain|waterway|medical|hazard|chemical/i.test(description+" "+category)?"High":"Standard",createdAt:new Date().toISOString(),duplicateWarning:possible.length>0,duplicateOf:possible[0]?.id||null,duplicateMatchCount:possible.length};
    saveReport(report);onCreated();
    setMessage(`Report saved on this device. Reference: ${report.id}${possible.length?" — linked to a possible existing report for review.":""}`);
    setDescription("");setPhoto("");setCoords(null);setLocationText("");setMatches([]);setAllowDuplicate(false);
  }
  return <div className="page-stack narrow-page">
    <div className="form-intro"><div className="intro-icon"><MapPin size={23}/></div><div><h2>Report a waste concern</h2><p>Share clear information so the right team can review it.</p></div></div>
    <form className="panel report-form" onSubmit={submit}>
      <div className="form-section-title"><span>01</span><div><strong>What did you find?</strong><small>Select the closest matching category.</small></div></div>
      <label className="field-label" htmlFor="category">Waste category</label>
      <select id="category" className="field-control" value={category} onChange={e=>setCategory(e.target.value)}>{categories.map(c=><option key={c}>{c}</option>)}</select>
      <label className="field-label" htmlFor="description">Description</label>
      <textarea id="description" className="field-control textarea" placeholder="Describe the issue, nearby landmark, and anything the response team should know..." value={description} onChange={e=>setDescription(e.target.value)} required minLength={10}/>
      <div className="form-section-title section-spaced"><span>02</span><div><strong>Where is it?</strong><small>GPS is optional; you can enter a landmark or area.</small></div></div>
      <div className="location-row"><input className="field-control" placeholder="Area, street or GPS coordinates" value={locationText} onChange={e=>setLocationText(e.target.value)}/><button type="button" className="btn btn-outline" onClick={locate} disabled={busy}><LocateFixed size={16}/>{busy?"Locating":"Use GPS"}</button></div>
      {coords && <p className="field-hint success-text"><CheckCircle2 size={14}/> GPS coordinates captured by this device.</p>}
      <div className="form-section-title section-spaced"><span>03</span><div><strong>Add a photo</strong><small>Optional evidence image (stored locally in this prototype).</small></div></div>
      <label className="upload-box">{photo?<img src={photo} alt="Selected report evidence"/>:<><Camera size={23}/><strong>Choose an image</strong><span>JPG or PNG · up to 4 MB</span></>}<input type="file" accept="image/*" capture="environment" onChange={choosePhoto}/></label>
      <div className="notice"><AlertTriangle size={17}/><p><strong>Privacy note:</strong> Only upload images you are allowed to share. This prototype saves report data in this browser; it does not yet send reports to Firebase or upload photos to cloud storage.</p></div>
      {matches.length>0 && <section className="duplicate-review" aria-live="polite"><div><AlertTriangle size={19}/><strong>This issue may have been reported before</strong></div><p>We found {matches.length} possible matching report(s). Please check before sending another report.</p>{matches.slice(0,3).map(r=><article key={r.id}><strong>{r.id}</strong><span>{r.category} · {r.locationText}</span><small>{r.status} · {Math.round(r.matchScore*100)}% match score{r.distanceMeters!==null?` · ${r.distanceMeters}m away`:""}</small></article>)}<label className="duplicate-confirm"><input type="checkbox" checked={allowDuplicate} onChange={e=>setAllowDuplicate(e.target.checked)}/> I checked these reports; this is a separate issue or needs its own report.</label></section>}
      {message && <div className="form-message" role="status">{message}</div>}
      <button className="btn btn-primary submit-btn" type="submit"><Send size={17}/> Submit report</button>
    </form>
  </div>;
}