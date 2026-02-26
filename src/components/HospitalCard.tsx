import { Hospital } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { Bed, Wind, Activity, MapPin, Phone, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HospitalCardProps {
  hospital: Hospital;
  showDistance?: boolean;
  recommended?: boolean;
  onReserve?: (hospitalId: string) => void;
}

export function HospitalCard({ hospital, showDistance, recommended, onReserve }: HospitalCardProps) {
  const totalBeds = hospital.icuBedsAvailable + hospital.generalBedsAvailable + hospital.emergencyBedsAvailable;
  const hasAvailability = totalBeds > 0;

  return (
    <div className={cn(
      "rounded-lg border bg-card p-5 shadow-card transition-all hover:shadow-card-hover",
      recommended && "ring-2 ring-info",
      !hasAvailability && "opacity-60"
    )}>
      {recommended && (
        <div className="mb-3 flex items-center gap-1.5 text-info">
          <Star className="h-4 w-4 fill-current" />
          <span className="text-xs font-semibold uppercase tracking-wide">Recommended</span>
        </div>
      )}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-foreground">{hospital.name}</h3>
          <p className="mt-0.5 flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            {hospital.address}
          </p>
        </div>
        {showDistance && hospital.distance !== undefined && (
          <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold text-foreground">
            {hospital.distance} km
          </span>
        )}
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3">
        <BedStat label="ICU" available={hospital.icuBedsAvailable} total={hospital.icuBedsTotal} />
        <BedStat label="General" available={hospital.generalBedsAvailable} total={hospital.generalBedsTotal} />
        <BedStat label="Emergency" available={hospital.emergencyBedsAvailable} total={hospital.emergencyBedsTotal} />
      </div>

      <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <Wind className="h-3.5 w-3.5" />
          O₂: {hospital.oxygenAvailable ? <span className="text-success font-medium">Yes</span> : <span className="text-emergency font-medium">No</span>}
        </span>
        <span className="flex items-center gap-1">
          <Activity className="h-3.5 w-3.5" />
          Ventilators: {hospital.ventilatorsAvailable}
        </span>
        <span className="flex items-center gap-1">
          <Phone className="h-3.5 w-3.5" />
          {hospital.contactNumber}
        </span>
      </div>

      {onReserve && hasAvailability && (
        <Button
          onClick={() => onReserve(hospital.id)}
          className="mt-4 w-full bg-primary text-primary-foreground hover:bg-primary/90"
          size="sm"
        >
          Reserve Bed
        </Button>
      )}
    </div>
  );
}

function BedStat({ label, available, total }: { label: string; available: number; total: number }) {
  const pct = total > 0 ? (available / total) * 100 : 0;
  return (
    <div className="rounded-md bg-secondary p-2 text-center">
      <p className="text-[10px] uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className={cn("text-lg font-bold", available === 0 ? "text-emergency" : "text-foreground")}>
        {available}
      </p>
      <div className="mt-1 h-1 rounded-full bg-muted">
        <div
          className={cn("h-1 rounded-full transition-all", pct > 30 ? "bg-success" : pct > 0 ? "bg-warning" : "bg-emergency")}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
