const REPORTS_KEY = "clean-sindh-react-reports-v1";

export function getReports() {
  try { return JSON.parse(localStorage.getItem(REPORTS_KEY) || "[]"); }
  catch { return []; }
}

export function saveReport(report) {
  const reports = getReports();
  reports.unshift(report);
  localStorage.setItem(REPORTS_KEY, JSON.stringify(reports));
  return reports;
}

export function updateReport(id, patch) {
  const reports = getReports().map((r) => r.id === id ? { ...r, ...patch } : r);
  localStorage.setItem(REPORTS_KEY, JSON.stringify(reports));
  return reports;
}

export function createReportId() {
  const date = new Date();
  const year = date.getFullYear();
  const suffix = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `CS-${year}-${suffix}`;
}