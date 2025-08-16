import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { InteractiveMap } from "@/components/InteractiveMap";
import { DataDashboard } from "@/components/DataDashboard";
import { CertificationSystem } from "@/components/CertificationSystem";
import { MembershipTiers } from "@/components/MembershipTiers";
import { ReportsSection } from "@/components/ReportsSection";
import { Footer } from "@/components/Footer";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    // Load Leaflet CSS and JS
    const leafletCSS = document.createElement('link');
    leafletCSS.rel = 'stylesheet';
    leafletCSS.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    leafletCSS.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
    leafletCSS.crossOrigin = 'anonymous';
    document.head.appendChild(leafletCSS);

    const leafletJS = document.createElement('script');
    leafletJS.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    leafletJS.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
    leafletJS.crossOrigin = 'anonymous';
    document.head.appendChild(leafletJS);

    return () => {
      // Cleanup
      document.head.removeChild(leafletCSS);
      document.head.removeChild(leafletJS);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <InteractiveMap />
      <DataDashboard />
      <CertificationSystem />
      <MembershipTiers />
      <ReportsSection />
      <Footer />
    </div>
  );
}
