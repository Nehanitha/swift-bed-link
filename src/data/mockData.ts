export interface Hospital {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  icuBedsAvailable: number;
  icuBedsTotal: number;
  generalBedsAvailable: number;
  generalBedsTotal: number;
  emergencyBedsAvailable: number;
  emergencyBedsTotal: number;
  oxygenAvailable: boolean;
  ventilatorsAvailable: number;
  contactNumber: string;
  distance?: number; // km from ambulance
  score?: number;
}

export interface Ambulance {
  id: string;
  driverName: string;
  vehicleNumber: string;
  currentLocation: { lat: number; lng: number };
  status: "Available" | "On Trip";
  currentPatientType?: "ICU" | "Emergency" | "General";
}

export interface EmergencyCase {
  id: string;
  patientType: "ICU" | "Emergency" | "General";
  ambulanceId: string;
  assignedHospitalId?: string;
  status: "Searching" | "Reserved" | "Completed";
  timestamp: string;
}

export const hospitals: Hospital[] = [
  {
    id: "h1",
    name: "City General Hospital",
    address: "123 Main St, Downtown",
    latitude: 28.6139,
    longitude: 77.209,
    icuBedsAvailable: 5,
    icuBedsTotal: 20,
    generalBedsAvailable: 32,
    generalBedsTotal: 100,
    emergencyBedsAvailable: 8,
    emergencyBedsTotal: 15,
    oxygenAvailable: true,
    ventilatorsAvailable: 12,
    contactNumber: "+91 11 2345 6789",
  },
  {
    id: "h2",
    name: "Apollo Medical Center",
    address: "456 Park Ave, Sector 5",
    latitude: 28.6229,
    longitude: 77.219,
    icuBedsAvailable: 2,
    icuBedsTotal: 15,
    generalBedsAvailable: 18,
    generalBedsTotal: 80,
    emergencyBedsAvailable: 3,
    emergencyBedsTotal: 10,
    oxygenAvailable: true,
    ventilatorsAvailable: 8,
    contactNumber: "+91 11 9876 5432",
  },
  {
    id: "h3",
    name: "Fortis Emergency Care",
    address: "789 Ring Road, Block C",
    latitude: 28.6339,
    longitude: 77.199,
    icuBedsAvailable: 0,
    icuBedsTotal: 10,
    generalBedsAvailable: 5,
    generalBedsTotal: 60,
    emergencyBedsAvailable: 0,
    emergencyBedsTotal: 8,
    oxygenAvailable: false,
    ventilatorsAvailable: 2,
    contactNumber: "+91 11 5555 1234",
  },
  {
    id: "h4",
    name: "Max Super Specialty",
    address: "321 NH-8, Phase 2",
    latitude: 28.6039,
    longitude: 77.229,
    icuBedsAvailable: 7,
    icuBedsTotal: 25,
    generalBedsAvailable: 45,
    generalBedsTotal: 120,
    emergencyBedsAvailable: 6,
    emergencyBedsTotal: 12,
    oxygenAvailable: true,
    ventilatorsAvailable: 15,
    contactNumber: "+91 11 7777 8888",
  },
  {
    id: "h5",
    name: "Medanta Hospital",
    address: "55 Cyber City, DLF",
    latitude: 28.5939,
    longitude: 77.189,
    icuBedsAvailable: 3,
    icuBedsTotal: 18,
    generalBedsAvailable: 22,
    generalBedsTotal: 90,
    emergencyBedsAvailable: 4,
    emergencyBedsTotal: 10,
    oxygenAvailable: true,
    ventilatorsAvailable: 10,
    contactNumber: "+91 11 3333 4444",
  },
  {
    id: "h6",
    name: "AIIMS Trauma Center",
    address: "Ansari Nagar, New Delhi",
    latitude: 28.5669,
    longitude: 77.21,
    icuBedsAvailable: 1,
    icuBedsTotal: 30,
    generalBedsAvailable: 10,
    generalBedsTotal: 150,
    emergencyBedsAvailable: 2,
    emergencyBedsTotal: 20,
    oxygenAvailable: true,
    ventilatorsAvailable: 20,
    contactNumber: "+91 11 2222 3333",
  },
];

export const ambulances: Ambulance[] = [
  {
    id: "a1",
    driverName: "Rajesh Kumar",
    vehicleNumber: "DL-01-AB-1234",
    currentLocation: { lat: 28.6189, lng: 77.215 },
    status: "On Trip",
    currentPatientType: "ICU",
  },
  {
    id: "a2",
    driverName: "Suresh Patel",
    vehicleNumber: "DL-02-CD-5678",
    currentLocation: { lat: 28.6089, lng: 77.205 },
    status: "Available",
  },
  {
    id: "a3",
    driverName: "Amit Singh",
    vehicleNumber: "DL-03-EF-9012",
    currentLocation: { lat: 28.6289, lng: 77.225 },
    status: "On Trip",
    currentPatientType: "Emergency",
  },
];

export const emergencyCases: EmergencyCase[] = [
  { id: "e1", patientType: "ICU", ambulanceId: "a1", assignedHospitalId: "h1", status: "Reserved", timestamp: "2026-02-26T08:30:00" },
  { id: "e2", patientType: "Emergency", ambulanceId: "a3", status: "Searching", timestamp: "2026-02-26T09:15:00" },
  { id: "e3", patientType: "General", ambulanceId: "a2", assignedHospitalId: "h4", status: "Completed", timestamp: "2026-02-26T07:45:00" },
  { id: "e4", patientType: "ICU", ambulanceId: "a1", assignedHospitalId: "h2", status: "Completed", timestamp: "2026-02-26T06:00:00" },
  { id: "e5", patientType: "Emergency", ambulanceId: "a3", assignedHospitalId: "h5", status: "Completed", timestamp: "2026-02-26T05:30:00" },
];

export function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLng = (lng2 - lng1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

export function suggestBestHospital(
  ambulanceLat: number,
  ambulanceLng: number,
  patientType: "ICU" | "Emergency" | "General",
  hospitalList: Hospital[]
): Hospital | null {
  const scored = hospitalList
    .map((h) => {
      const dist = calculateDistance(ambulanceLat, ambulanceLng, h.latitude, h.longitude);
      let beds = 0;
      if (patientType === "ICU") beds = h.icuBedsAvailable;
      else if (patientType === "Emergency") beds = h.emergencyBedsAvailable;
      else beds = h.generalBedsAvailable;
      if (beds === 0) return null;
      const score = beds * 10 - dist * 5;
      return { ...h, distance: dist, score };
    })
    .filter(Boolean) as Hospital[];
  scored.sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
  return scored[0] ?? null;
}
