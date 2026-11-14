import { getReports } from './storage.js';

const norm = value => String(value || '').toLowerCase().normalize('NFKD').replace(/[^a-z0-9\s]/g,' ').replace(/\s+/g,' ').trim();
const distanceMeters = (a,b) => {
  if (!a?.lat || !a?.lng || !b?.lat || !b?.lng) return Infinity;
  const rad = n => n * Math.PI / 180;
  const dLat = rad(b.lat-a.lat), dLng = rad(b.lng-a.lng);
  const x = Math.sin(dLat/2)**2 + Math.cos(rad(a.lat))*Math.cos(rad(b.lat))*Math.sin(dLng/2)**2;
  return 6371000 * 2 * Math.atan2(Math.sqrt(x),Math.sqrt(1-x));
};
const tokenSimilarity = (a,b) => {
  const A = new Set(norm(a).split(' ').filter(x=>x.length>2));
  const B = new Set(norm(b).split(' ').filter(x=>x.length>2));
  if (!A.size || !B.size) return 0;
  let hit=0; A.forEach(x=>{if(B.has(x))hit++});
  return hit / new Set([...A,...B]).size;
};
export function findPossibleDuplicates(candidate, reports=getReports()) {
  return reports.map(report => {
    const meters = distanceMeters(candidate.coordinates,report.coordinates);
    const samePlace = norm(candidate.locationText) && norm(candidate.locationText) === norm(report.locationText);
    const textScore = tokenSimilarity(`${candidate.locationText} ${candidate.description}`,`${report.locationText} ${report.description}`);
    const sameCategory = candidate.category === report.category;
    const score = meters <= 100 && sameCategory ? 0.94 : samePlace && sameCategory ? 0.9 : sameCategory && textScore >= 0.58 ? 0.68 : 0;
    return {...report, matchScore:score, distanceMeters:Number.isFinite(meters)?Math.round(meters):null};
  }).filter(r=>r.matchScore>=0.65).sort((a,b)=>b.matchScore-a.matchScore);
}
export function calculateAreaInsights(reports=getReports()) {
  const byArea={};
  reports.forEach(r=>{const key=String(r.locationText||'Unknown area').split(',')[0].trim()||'Unknown area';byArea[key]=(byArea[key]||0)+1});
  const areas=Object.entries(byArea).map(([area,count])=>({area,count,risk:count>=5?'High':count>=2?'Watch':'Low'})).sort((a,b)=>b.count-a.count);
  return {areas, score:reports.length?Math.max(0,Math.min(100,100-Math.round(reports.filter(r=>r.status!=='Resolved').length/reports.length*100))):null};
}
export function buildNearestRoute(reports=getReports()) {
  const pending=reports.filter(r=>r.status!=='Resolved');
  if(!pending.length)return [];
  const withCoords=pending.filter(r=>r.coordinates?.lat && r.coordinates?.lng);
  const without=pending.filter(r=>!r.coordinates?.lat || !r.coordinates?.lng);
  if(withCoords.length<2)return [...withCoords,...without];
  const route=[withCoords.shift()];
  while(withCoords.length){const last=route[route.length-1];let best=0,bestD=Infinity;withCoords.forEach((r,i)=>{const d=distanceMeters(last.coordinates,r.coordinates);if(d<bestD){bestD=d;best=i}});route.push(withCoords.splice(best,1)[0])}
  return [...route,...without];
}
