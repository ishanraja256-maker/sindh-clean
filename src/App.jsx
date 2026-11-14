import React from "react";
import Sidebar from "./components/Sidebar.jsx";
import Topbar from "./components/Topbar.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Report from "./pages/Report.jsx";
import CameraPage from "./pages/Camera.jsx";
import MapPage from "./pages/MapPage.jsx";
import Tracking from "./pages/Tracking.jsx";
import Workspace from "./pages/Workspace.jsx";
import Intelligence from "./pages/Intelligence.jsx";
import { getReports } from "./services/storage.js";
import { isFirebaseConfigured } from "./firebase.js";
import { Menu, Leaf, WifiOff } from "lucide-react";

export default function App(){
  const [page,setPage]=React.useState("dashboard");
  const [sidebarOpen,setSidebarOpen]=React.useState(false);
  const [reports,setReports]=React.useState(getReports);
  const refresh=()=>setReports(getReports());
  const [online,setOnline]=React.useState(navigator.onLine);
  React.useEffect(()=>{
    const on=()=>setOnline(true),off=()=>setOnline(false);
    window.addEventListener("online",on);window.addEventListener("offline",off);
    return ()=>{window.removeEventListener("online",on);window.removeEventListener("offline",off);};
  },[]);
  React.useEffect(()=>{const onStorage=()=>refresh();window.addEventListener("storage",onStorage);return()=>window.removeEventListener("storage",onStorage);},[]);
  React.useEffect(()=>{const route=()=>{if(window.location.hash==="#report")setPage("report");};route();window.addEventListener("hashchange",route);return()=>window.removeEventListener("hashchange",route);},[]);
  let view;
  switch(page){
    case "dashboard": view=<Dashboard reports={reports} setPage={setPage}/>;break;
    case "report": view=<Report onCreated={refresh}/>;break;
    case "camera": view=<CameraPage/>;break;
    case "map": view=<MapPage reports={reports}/>;break;
    case "tracking": view=<Tracking reports={reports}/>;break;
    case "intelligence": view=<Intelligence reports={reports}/>;break;
    case "municipal": case "analytics": case "community": case "awareness": case "admin": view=<Workspace page={page} reports={reports} onChanged={refresh}/>;break;
    default: view=<Dashboard reports={reports} setPage={setPage}/>;
  }
  return <div className="app-shell">
    <Sidebar page={page} setPage={setPage} open={sidebarOpen} close={()=>setSidebarOpen(false)}/>
    <main className="main-area">
      <Topbar page={page} onMenu={()=>setSidebarOpen(true)}/>
      <div className="content-area">
        <div className="environment-strip"><span><Leaf size={14}/> CLEAN SINDH PLATFORM</span><span className="environment-right"><i className={online?"online-dot":"offline-dot"}/>{online?"Device online":"Offline"} <b>·</b> {isFirebaseConfigured?"Firebase configured · local data mode":"Local prototype mode"}</span></div>
        {view}
        <footer className="app-footer"><span>© {new Date().getFullYear()} Clean Sindh</span><span>Inspired by Sindh · Designed for community action</span></footer>
      </div>
    </main>
  </div>;
}