import { useState, useMemo } from "react";
import { Navbar } from "@/components/Navbar";
import { HospitalCard } from "@/components/HospitalCard";
import { hospitals, ambulances, calculateDistance, suggestBestHospital } from "@/data/mockData";
import { MapPin, Navigation, Ambulance as AmbulanceIcon, AlertTriangle, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

type PatientType = "ICU" | "Emergency" | "General";

export default function AmbulanceDashboard() {
  const [patientType, setPatientType] = useState<PatientType>("Emergency");
  const [reservedId, setReservedId] = useState<string | null>(null);

  // Simulated ambulance location (first ambulance)
  const ambulance = ambulances[0];
  const { lat, lng } = ambulance.currentLocation;

  const hospitalsWithDistance = useMemo(() => {
    return hospitals
      .map((h) => ({
        ...h,
        distance: calculateDistance(lat, lng, h.latitude, h.longitude),
      }))
      .filter((h) => h.distance <= 15)
      .sort((a, b) => a.distance - b.distance);
  }, [lat, lng]);

  const recommended = useMemo(() => {
    return suggestBestHospital(lat, lng, patientType, hospitals);
  }, [lat, lng, patientType]);

  const handleReserve = (hospitalId: string) => {
    setReservedId(hospitalId);
    const h = hospitals.find((h) => h.id === hospitalId);
    toast({
      title: "Bed Reserved!",
      description: `${patientType} bed reserved at ${h?.name}. Hospital has been notified.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">Ambulance Dashboard</h1>
          <p className="text-muted-foreground">Find nearest hospital with available beds</p>
        </div>

        {/* Driver info */}
        <div className="mb-6 flex flex-wrap items-center gap-6 rounded-lg border bg-card p-4 shadow-card">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <AmbulanceIcon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">{ambulance.driverName}</p>
              <p className="text-xs text-muted-foreground">{ambulance.vehicleNumber}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            {lat.toFixed(4)}, {lng.toFixed(4)}
          </div>
          <div className={cn(
            "rounded-full px-3 py-1 text-xs font-semibold",
            ambulance.status === "On Trip" ? "bg-emergency/10 text-emergency" : "bg-success/10 text-success"
          )}>
            {ambulance.status}
          </div>
        </div>

        {/* Patient type selector */}
        <div className="mb-6">
          <p className="mb-2 text-sm font-medium text-foreground">Patient Requires:</p>
          <div className="flex gap-2">
            {(["ICU", "Emergency", "General"] as PatientType[]).map((t) => (
              <button
                key={t}
                onClick={() => { setPatientType(t); setReservedId(null); }}
                className={cn(
                  "rounded-lg border px-5 py-2.5 text-sm font-medium transition-colors",
                  t === patientType
                    ? t === "ICU" ? "bg-emergency text-emergency-foreground border-emergency"
                      : t === "Emergency" ? "bg-warning text-warning-foreground border-warning"
                      : "bg-info text-info-foreground border-info"
                    : "bg-card text-muted-foreground hover:bg-secondary"
                )}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {reservedId && (
          <div className="mb-6 flex items-center gap-3 rounded-lg border border-success/30 bg-success/10 p-4">
            <CheckCircle className="h-5 w-5 text-success" />
            <p className="text-sm font-medium text-foreground">
              Bed reserved at {hospitals.find((h) => h.id === reservedId)?.name}! Navigate now.
            </p>
          </div>
        )}

        {/* AI Suggestion */}
        {recommended && !reservedId && (
          <div className="mb-6 rounded-lg border-2 border-info bg-info/5 p-5">
            <div className="flex items-center gap-2 text-info">
              <Navigation className="h-5 w-5" />
              <span className="text-sm font-semibold uppercase tracking-wide">AI Recommended Hospital</span>
            </div>
            <p className="mt-1 text-foreground">
              <span className="font-bold">{recommended.name}</span> — {recommended.distance} km away,{" "}
              {patientType === "ICU" ? recommended.icuBedsAvailable : patientType === "Emergency" ? recommended.emergencyBedsAvailable : recommended.generalBedsAvailable}{" "}
              {patientType} beds available
            </p>
          </div>
        )}

        {/* Hospital list */}
        <h2 className="mb-4 font-semibold text-foreground">
          Nearby Hospitals ({hospitalsWithDistance.length})
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {hospitalsWithDistance.map((h) => (
            <HospitalCard
              key={h.id}
              hospital={h}
              showDistance
              recommended={recommended?.id === h.id}
              onReserve={reservedId ? undefined : handleReserve}
            />
          ))}
        </div>

        {hospitalsWithDistance.length === 0 && (
          <div className="mt-12 text-center">
            <AlertTriangle className="mx-auto h-12 w-12 text-warning" />
            <p className="mt-4 text-lg font-medium text-foreground">No hospitals found within 15 km</p>
            <p className="text-muted-foreground">Try expanding search radius</p>
          </div>
        )}
      </div>
    </div>
  );
}
