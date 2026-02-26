import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { StatCard } from "@/components/StatCard";
import { HospitalCard } from "@/components/HospitalCard";
import { hospitals, ambulances, emergencyCases } from "@/data/mockData";
import { Building2, Bed, Ambulance, AlertTriangle, Activity } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const bedChartData = hospitals.map((h) => ({
  name: h.name.split(" ").slice(0, 2).join(" "),
  ICU: h.icuBedsAvailable,
  General: h.generalBedsAvailable,
  Emergency: h.emergencyBedsAvailable,
}));

const pieData = [
  { name: "Completed", value: emergencyCases.filter((e) => e.status === "Completed").length },
  { name: "Reserved", value: emergencyCases.filter((e) => e.status === "Reserved").length },
  { name: "Searching", value: emergencyCases.filter((e) => e.status === "Searching").length },
];

const PIE_COLORS = ["hsl(142, 72%, 35%)", "hsl(199, 89%, 48%)", "hsl(38, 92%, 50%)"];

export default function AdminDashboard() {
  const totalICU = hospitals.reduce((s, h) => s + h.icuBedsAvailable, 0);
  const totalGeneral = hospitals.reduce((s, h) => s + h.generalBedsAvailable, 0);
  const totalEmergency = hospitals.reduce((s, h) => s + h.emergencyBedsAvailable, 0);
  const activeAmbulances = ambulances.filter((a) => a.status === "On Trip").length;
  const todayCases = emergencyCases.length;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground">Overview of system-wide emergency resources</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <StatCard icon={Building2} title="Hospitals" value={hospitals.length} variant="info" />
          <StatCard icon={Bed} title="ICU Beds" value={totalICU} subtitle="Available now" variant="emergency" />
          <StatCard icon={Bed} title="General Beds" value={totalGeneral} subtitle="Available now" variant="success" />
          <StatCard icon={Ambulance} title="Active Ambulances" value={activeAmbulances} subtitle={`${ambulances.length} total`} variant="warning" />
          <StatCard icon={AlertTriangle} title="Cases Today" value={todayCases} variant="default" />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {/* Bar chart */}
          <div className="lg:col-span-2 rounded-lg border bg-card p-6 shadow-card">
            <h2 className="mb-4 font-semibold text-foreground">Bed Availability by Hospital</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={bedChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 90%)" />
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: "hsl(215, 15%, 50%)" }} />
                <YAxis tick={{ fontSize: 12, fill: "hsl(215, 15%, 50%)" }} />
                <Tooltip />
                <Bar dataKey="ICU" fill="hsl(0, 72%, 51%)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="General" fill="hsl(199, 89%, 48%)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Emergency" fill="hsl(38, 92%, 50%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie chart */}
          <div className="rounded-lg border bg-card p-6 shadow-card">
            <h2 className="mb-4 font-semibold text-foreground">Emergency Cases Status</h2>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" label>
                  {pieData.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-2 flex justify-center gap-4">
              {pieData.map((d, i) => (
                <div key={d.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <div className="h-2.5 w-2.5 rounded-full" style={{ background: PIE_COLORS[i] }} />
                  {d.name}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Hospital list */}
        <div className="mt-8">
          <h2 className="mb-4 font-semibold text-foreground">All Hospitals</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {hospitals.map((h) => (
              <HospitalCard key={h.id} hospital={h} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
