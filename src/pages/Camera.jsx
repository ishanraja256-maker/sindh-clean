import React from "react";
import { Camera as CameraIcon, Video, VideoOff, Download, ShieldAlert } from "lucide-react";

export default function CameraPage(){
  const videoRef=React.useRef(null),streamRef=React.useRef(null),recorderRef=React.useRef(null),chunksRef=React.useRef([]);
  const [cameraOn,setCameraOn]=React.useState(false),[recording,setRecording]=React.useState(false),[message,setMessage]=React.useState("Camera is off. Start the camera to request permission.");
  const [downloadUrl,setDownloadUrl]=React.useState("");
  async function startCamera(){
    try{
      const stream=await navigator.mediaDevices.getUserMedia({video:{facingMode:{ideal:"environment"}},audio:false});
      streamRef.current=stream;if(videoRef.current)videoRef.current.srcObject=stream;
      setCameraOn(true);setMessage("Camera preview is running on this device only.");
    }catch(e){setMessage(e.name==="NotAllowedError"?"Camera permission was denied. Allow camera access in your browser settings.":"Camera could not start. Check that a camera is available and that this page uses HTTPS.");}
  }
  function stopCamera(){
    if(recorderRef.current?.state==="recording")recorderRef.current.stop();
    streamRef.current?.getTracks().forEach(t=>t.stop());streamRef.current=null;
    if(videoRef.current)videoRef.current.srcObject=null;
    setCameraOn(false);setMessage("Camera stopped.");
  }
  function startRecording(){
    if(!streamRef.current)return;
    if(!window.MediaRecorder){setMessage("MediaRecorder is not supported in this browser.");return;}
    try{
      chunksRef.current=[];
      const mime=MediaRecorder.isTypeSupported("video/webm;codecs=vp9")?"video/webm;codecs=vp9":"video/webm";
      const recorder=new MediaRecorder(streamRef.current,{mimeType:mime});
      recorder.ondataavailable=e=>{if(e.data.size)chunksRef.current.push(e.data);};
      recorder.onstop=()=>{const blob=new Blob(chunksRef.current,{type:"video/webm"});const url=URL.createObjectURL(blob);setDownloadUrl(url);setMessage("Recording completed. Download the file below.");};
      recorder.start();recorderRef.current=recorder;setRecording(true);setMessage("Recording locally on this device. A visible recording indicator is active.");
    }catch{setMessage("Recording could not start on this browser.");}
  }
  function stopRecording(){if(recorderRef.current?.state==="recording"){recorderRef.current.stop();setRecording(false);}}
  React.useEffect(()=>()=>{streamRef.current?.getTracks().forEach(t=>t.stop());if(downloadUrl)URL.revokeObjectURL(downloadUrl);},[downloadUrl]);
  return <div className="page-stack">
    <div className="camera-layout">
      <section className="panel camera-panel">
        <div className="panel-head"><div><span className="eyebrow">DEVICE CAMERA</span><h3>Live camera preview</h3></div><span className={`camera-state ${cameraOn?"on":""}`}><i/>{cameraOn?"Camera active":"Camera off"}</span></div>
        <div className="video-stage">{cameraOn?<video ref={videoRef} autoPlay muted playsInline/>:<div className="camera-placeholder"><div className="camera-placeholder-icon"><CameraIcon size={31}/></div><strong>Camera preview</strong><p>Your camera feed will appear here after you grant permission.</p></div>}{recording&&<span className="recording-indicator"><i/> REC</span>}</div>
        <div className="camera-controls">
          {!cameraOn?<button className="btn btn-primary" onClick={startCamera}><Video size={17}/> Start camera</button>:<button className="btn btn-outline" onClick={stopCamera}><VideoOff size={17}/> Stop camera</button>}
          {!recording?<button className="btn btn-outline" onClick={startRecording} disabled={!cameraOn}><span className="record-dot"/> Start recording</button>:<button className="btn btn-danger" onClick={stopRecording}>Stop recording</button>}
          {downloadUrl&&<a className="btn btn-outline" href={downloadUrl} download="clean-sindh-recording.webm"><Download size={17}/> Download video</a>}
        </div>
        <p className="camera-message" role="status">{message}</p>
      </section>
      <aside className="panel stream-info">
        <span className="eyebrow">STREAMING STATUS</span><h3>Cross-device live stream</h3>
        <div className="setup-state"><ShieldAlert size={20}/><div><strong>Not configured yet</strong><span>WebRTC signalling, authenticated viewer permissions and TURN connectivity are not connected in this build.</span></div></div>
        <p>Starting this camera only previews and records on the current device. It does not broadcast to Admin or Municipal Team devices.</p>
        <div className="stream-check"><span/> WebRTC peer connection <b>Pending</b></div>
        <div className="stream-check"><span/> Firebase RTDB signalling <b>Pending</b></div>
        <div className="stream-check"><span/> TURN relay configuration <b>Pending</b></div>
      </aside>
    </div>
  </div>;
}