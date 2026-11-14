// Cloud report helpers. These require authenticated users and matching Firestore rules.
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase.js';

const reportsRef = collection(db, 'reports');

export async function createCloudReport(report) {
  const docRef = await addDoc(reportsRef, {
    ...report,
    photo: '', // Evidence images are not uploaded until an approved cloud-storage solution is configured.
    createdAt: serverTimestamp(),
    createdAtClient: report.createdAt || new Date().toISOString()
  });
  return docRef.id;
}

export function subscribeToCloudReports(onReports, onError) {
  const reportsQuery = query(reportsRef, orderBy('createdAtClient', 'desc'));
  return onSnapshot(reportsQuery, (snapshot) => {
    const reports = snapshot.docs.map((item) => ({ cloudId: item.id, ...item.data() }));
    onReports(reports);
  }, onError);
}
