import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { hospitals as initialHospitals, Hospital } from "@/data/mockData";
import { Bed, Wind, Activity, Save, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

export default function HospitalDashboard() {
  const [selectedId, setSelectedId] = useState(initialHospitals[0].id);
  const [hospitalData, setHospitalData] = useState<Hospital[]>(initialHospitals);

  const hospital = hospitalData.find((h) => h.id === selectedId)!;

  const updateField = (field: keyof Hospital, value: number | boolean) => {
    setHospitalData((prev) =>
      prev.map((h) => (h.id === selectedId ? { ...h, [field]: value } : h))
    );
  };

  const handleSave = () => {
    toast({ title: "Bed availability updated", description: `${hospital.name} data synced successfully.` });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">Hospital Dashboard</h1>
          <p className="text-muted-foreground">Update bed availability and resources in real time</p>
        </div>

        {/* Hospital selector */}
        <div className="mb-6 flex flex-wrap gap-2">
          {hospitalData.map((h) => (
            <button
              key={h.id}
              onClick={() => setSelectedId(h.id)}
              className={cn(
                "rounded-lg border px-4 py-2 text-sm font-medium transition-colors",
                h.id === selectedId
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground hover:bg-secondary"
              )}
            >
              {h.name}
            </button>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Bed management */}
          <div className="rounded-lg border bg-card p-6 shadow-card">
            <h2 className="mb-6 flex items-center gap-2 font-semibold text-foreground">
              <Bed className="h-5 w-5 text-primary" />
              Bed Availability
            </h2>
            <div className="space-y-6">
              <BedCounter label="ICU Beds" available={hospital.icuBedsAvailable} total={hospital.icuBedsTotal}
                onChange={(v) => updateField("icuBedsAvailable", v)} variant="emergency" />
              <BedCounter label="General Beds" available={hospital.generalBedsAvailable} total={hospital.generalBedsTotal}
                onChange={(v) => updateField("generalBedsAvailable", v)} variant="info" />
              <BedCounter label="Emergency Beds" available={hospital.emergencyBedsAvailable} total={hospital.emergencyBedsTotal}
                onChange={(v) => updateField("emergencyBedsAvailable", v)} variant="warning" />
            </div>
          </div>

          {/* Resources */}
          <div className="space-y-6">
            <div className="rounded-lg border bg-card p-6 shadow-card">
              <h2 className="mb-6 flex items-center gap-2 font-semibold text-foreground">
                <Activity className="h-5 w-5 text-primary" />
                Equipment & Resources
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-lg bg-secondary p-4">
                  <div className="flex items-center gap-3">
                    <Wind className="h-5 w-5 text-muted-foreground" />
                    <span className="font-medium text-foreground">Oxygen Supply</span>
                  </div>
                  <button
                    onClick={() => updateField("oxygenAvailable", !hospital.oxygenAvailable)}
                    className={cn(
                      "rounded-full px-4 py-1.5 text-sm font-semibold transition-colors",
                      hospital.oxygenAvailable ? "bg-success text-success-foreground" : "bg-emergency text-emergency-foreground"
                    )}
                  >
                    {hospital.oxygenAvailable ? "Available" : "Unavailable"}
                  </button>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-secondary p-4">
                  <div className="flex items-center gap-3">
                    <Activity className="h-5 w-5 text-muted-foreground" />
                    <span className="font-medium text-foreground">Ventilators</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => updateField("ventilatorsAvailable", Math.max(0, hospital.ventilatorsAvailable - 1))}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border bg-card text-foreground hover:bg-secondary transition-colors">−</button>
                    <span className="w-10 text-center text-lg font-bold text-foreground">{hospital.ventilatorsAvailable}</span>
                    <button onClick={() => updateField("ventilatorsAvailable", hospital.ventilatorsAvailable + 1)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border bg-card text-foreground hover:bg-secondary transition-colors">+</button>
                  </div>
                </div>
              </div>
            </div>

            <Button onClick={handleSave} className="w-full bg-primary text-primary-foreground hover:bg-primary/90" size="lg">
              <Save className="mr-2 h-4 w-4" />
              Save & Sync Updates
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function BedCounter({ label, available, total, onChange, variant }: {
  label: string; available: number; total: number; onChange: (v: number) => void;
  variant: "emergency" | "info" | "warning";
}) {
  const pct = total > 0 ? (available / total) * 100 : 0;
  const barColor = variant === "emergency" ? "bg-emergency" : variant === "info" ? "bg-info" : "bg-warning";

  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">{label}</span>
        <span className="text-xs text-muted-foreground">{available} / {total}</span>
      </div>
      <div className="mt-2 h-2 rounded-full bg-muted">
        <div className={cn("h-2 rounded-full transition-all", barColor)} style={{ width: `${pct}%` }} />
      </div>
      <div className="mt-2 flex items-center gap-2">
        <button onClick={() => onChange(Math.max(0, available - 1))}
          className="flex h-8 w-8 items-center justify-center rounded-lg border bg-card text-foreground hover:bg-secondary transition-colors">−</button>
        <span className="w-10 text-center text-lg font-bold text-foreground">{available}</span>
        <button onClick={() => onChange(Math.min(total, available + 1))}
          className="flex h-8 w-8 items-center justify-center rounded-lg border bg-card text-foreground hover:bg-secondary transition-colors">+</button>
      </div>
    </div>
  );
}
