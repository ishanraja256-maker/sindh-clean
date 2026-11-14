import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const pin = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25,41], iconAnchor: [12,41], popupAnchor: [1,-34], shadowSize: [41,41]
});

export default function MapPage({reports}){
  const mapped=reports.filter(r=>r.coordinates?.lat && r.coordinates?.lng);
  return <div className="page-stack">
    <div className="map-intro panel"><div><span className="eyebrow">GEOGRAPHIC VIEW</span><h2>Reports across your community</h2><p>Only reports with GPS coordinates captured in this browser can be plotted.</p></div><div className="map-count"><strong>{mapped.length}</strong><span>Mapped reports</span></div></div>
    <div className="panel map-panel"><MapContainer center={[25.4,68.8]} zoom={7} scrollWheelZoom={true} style={{height:"540px",width:"100%"}}><TileLayer attribution='&copy; OpenStreetMap contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>{mapped.map(r=><Marker key={r.id} position={[r.coordinates.lat,r.coordinates.lng]} icon={pin}><Popup><strong>{r.category}</strong><br/>{r.id}<br/>{r.status}</Popup></Marker>)}</MapContainer></div>
    {!mapped.length&&<p className="map-empty">No GPS-tagged reports yet. Submit a report and use GPS to see its marker here. Map tiles require an internet connection.</p>}
  </div>;
}