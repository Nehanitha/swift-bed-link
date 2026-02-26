import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  variant?: "default" | "emergency" | "success" | "warning" | "info";
  className?: string;
}

const variantStyles = {
  default: "bg-card border-border",
  emergency: "bg-card border-l-4 border-l-emergency",
  success: "bg-card border-l-4 border-l-success",
  warning: "bg-card border-l-4 border-l-warning",
  info: "bg-card border-l-4 border-l-info",
};

const iconVariantStyles = {
  default: "bg-secondary text-foreground",
  emergency: "bg-emergency/10 text-emergency",
  success: "bg-success/10 text-success",
  warning: "bg-warning/10 text-warning",
  info: "bg-info/10 text-info",
};

export function StatCard({ title, value, subtitle, icon: Icon, variant = "default", className }: StatCardProps) {
  return (
    <div className={cn("rounded-lg border p-5 shadow-card transition-shadow hover:shadow-card-hover", variantStyles[variant], className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="mt-1 text-3xl font-bold text-foreground">{value}</p>
          {subtitle && <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>}
        </div>
        <div className={cn("rounded-lg p-2.5", iconVariantStyles[variant])}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
