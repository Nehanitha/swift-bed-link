import { Link } from "react-router-dom";
import { Ambulance, Bed, Building2, MapPin, ArrowRight, Shield, Clock, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import heroBg from "@/assets/hero-bg.jpg";

const features = [
  {
    icon: Bed,
    title: "Real-Time Bed Tracking",
    description: "Live updates on ICU, general, and emergency bed availability across all hospitals.",
  },
  {
    icon: MapPin,
    title: "Smart Routing",
    description: "AI-powered algorithm suggests the best hospital based on distance and bed availability.",
  },
  {
    icon: Zap,
    title: "Instant Notifications",
    description: "Ambulance drivers and hospital staff get real-time alerts for seamless coordination.",
  },
  {
    icon: Shield,
    title: "One-Click Reservation",
    description: "Reserve beds instantly from the ambulance dashboard with a single tap.",
  },
  {
    icon: Clock,
    title: "Save Critical Minutes",
    description: "Eliminate wasted time searching for hospitals — every second counts in emergencies.",
  },
  {
    icon: Building2,
    title: "Multi-Hospital Network",
    description: "Connect all hospitals in your region into one unified emergency response network.",
  },
];

const stats = [
  { value: "6+", label: "Hospitals Connected" },
  { value: "200+", label: "Beds Tracked" },
  { value: "24/7", label: "Real-Time Monitoring" },
  { value: "<2min", label: "Avg. Response Time" },
];

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/60" />
        </div>
        <div className="container relative mx-auto px-4 py-24 md:py-32">
          <div className="max-w-2xl fade-in-up">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-emergency/20 px-4 py-1.5 text-sm font-medium text-emergency-foreground">
              <Ambulance className="h-4 w-4" />
              Emergency Response System
            </div>
            <h1 className="text-4xl font-bold leading-tight text-primary-foreground md:text-5xl lg:text-6xl">
              Every Second Counts.
              <br />
              <span className="text-info">Find Beds Instantly.</span>
            </h1>
            <p className="mt-4 text-lg text-primary-foreground/80 md:text-xl">
              Smart emergency bed allocation and ambulance routing system that saves lives
              by connecting ambulances to the nearest hospital with available beds in real time.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="pulse-emergency bg-emergency text-emergency-foreground hover:bg-emergency/90 text-base px-8 py-6">
                <Link to="/ambulance">
                  <Ambulance className="mr-2 h-5 w-5" />
                  Find Bed Now
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 text-base px-8 py-6">
                <Link to="/admin">
                  View Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-b bg-card">
        <div className="container mx-auto grid grid-cols-2 gap-4 px-4 py-8 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-3xl font-bold text-primary">{s.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-foreground">How It Works</h2>
          <p className="mt-3 text-muted-foreground">
            A unified platform connecting ambulances, hospitals, and administrators
            for faster emergency response.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="group rounded-xl border bg-card p-6 shadow-card transition-all hover:shadow-card-hover hover:-translate-y-1"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <f.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="gradient-hero py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-primary-foreground">Ready to Save Lives?</h2>
          <p className="mx-auto mt-3 max-w-md text-primary-foreground/80">
            Join the network of hospitals and ambulances working together for faster emergency care.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Button asChild size="lg" className="bg-emergency text-emergency-foreground hover:bg-emergency/90 px-8">
              <Link to="/ambulance">Get Started</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © 2026 MedRoute — Smart Emergency Bed Allocation System
        </div>
      </footer>
    </div>
  );
}
