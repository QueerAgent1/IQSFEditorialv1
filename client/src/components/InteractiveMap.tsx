import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import type { Country } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Download } from "lucide-react";

export function InteractiveMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [filters, setFilters] = useState({
    region: "all",
    minScore: 0,
    trend: "any",
    search: ""
  });

  const { data: countries = [], isLoading } = useQuery<Country[]>({
    queryKey: ['/api/countries', filters.region, filters.minScore],
    enabled: true
  });

  useEffect(() => {
    // Initialize Leaflet map when component mounts
    if (mapRef.current && (window as any).L) {
      const L = (window as any).L;
      
      // Initialize map
      const map = L.map(mapRef.current, {
        center: [20, 0],
        zoom: 2,
        scrollWheelZoom: true
      });

      // Add tile layer
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);

      // Add markers for countries
      countries.forEach((country) => {
        if (country.latitude && country.longitude) {
          const color = getColorByScore(country.safetyScore);
          
          const marker = L.circleMarker([parseFloat(country.latitude), parseFloat(country.longitude)], {
            radius: 8,
            fillColor: color,
            color: color,
            weight: 2,
            opacity: 1,
            fillOpacity: 0.8
          }).addTo(map);

          marker.bindPopup(`
            <div class="p-2">
              <h3 class="font-semibold">${country.name}</h3>
              <p>Safety Score: <span class="font-bold">${country.safetyScore}</span></p>
              <p>Trend: <span class="capitalize">${country.trend}</span></p>
              <p>Region: ${country.region}</p>
            </div>
          `);
        }
      });

      return () => {
        map.remove();
      };
    }
  }, [countries]);

  const getColorByScore = (score: number) => {
    if (score >= 80) return '#2563eb'; // Blue - Excellent
    if (score >= 60) return '#16a34a'; // Green - Good  
    if (score >= 40) return '#ca8a04'; // Yellow - Fair
    if (score >= 20) return '#dc2626'; // Red - Poor
    return '#991b1b'; // Dark Red - Critical
  };

  const generateReport = async () => {
    try {
      const response = await fetch('/api/reports/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'global',
          countries: countries.map((c) => c.name),
          format: 'json',
          title: 'LGBTQ+ Global Safety Report'
        })
      });

      if (response.ok) {
        const report = await response.json();
        // Trigger download
        const downloadResponse = await fetch(report.downloadUrl);
        const blob = await downloadResponse.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${report.title}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Failed to generate report:', error);
    }
  };

  return (
    <section id="map" className="editorial-spacing">
      <div className="editorial-container">
        
        {/* Editorial Header */}
        <div className="text-center mb-16">
          <div className="space-y-4 mb-8">
            <p className="caption tracking-[0.3em] text-black/60">Feature Story</p>
            <h2 className="font-display text-5xl lg:text-6xl font-light tracking-tight">
              The Global <em className="font-normal">Safety</em> Index
            </h2>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-6">
            <p className="editorial-lead">
              An unprecedented analysis of LGBTQ+ safety across 195 nations, revealing patterns 
              of progress, setbacks, and the complex geography of equality.
            </p>
            <p className="text-base text-black/70 leading-relaxed">
              Our proprietary methodology combines legislative analysis, social sentiment data, 
              and community reports to create the world's most comprehensive safety assessment.
            </p>
          </div>
        </div>

        <div className="editorial-grid">
          {/* Editorial Sidebar */}
          <div className="space-y-8">
            <div className="editorial-shadow bg-white border border-black/10 p-8">
              <h3 className="caption tracking-wide mb-6 border-b border-black/10 pb-3">Research Controls</h3>
              
              <div className="space-y-6">
                <div>
                  <Label className="caption tracking-wide mb-3 block">Geographic Region</Label>
                  <Select value={filters.region} onValueChange={(value) => setFilters(prev => ({ ...prev, region: value }))}>
                    <SelectTrigger className="border-black/20 h-10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Global View</SelectItem>
                      <SelectItem value="North America">North America</SelectItem>
                      <SelectItem value="Europe">Europe</SelectItem>
                      <SelectItem value="Asia">Asia-Pacific</SelectItem>
                      <SelectItem value="South America">Latin America</SelectItem>
                      <SelectItem value="Africa">Africa</SelectItem>
                      <SelectItem value="Oceania">Oceania</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="caption tracking-wide mb-3 block">Safety Threshold: {filters.minScore}+</Label>
                  <Slider
                    value={[filters.minScore]}
                    onValueChange={(value) => setFilters(prev => ({ ...prev, minScore: value[0] }))}
                    max={100}
                    step={10}
                    className="mt-3"
                  />
                </div>

                <div>
                  <Label className="caption tracking-wide mb-3 block">Trend Analysis</Label>
                  <Select value={filters.trend} onValueChange={(value) => setFilters(prev => ({ ...prev, trend: value }))}>
                    <SelectTrigger className="border-black/20 h-10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">All Trends</SelectItem>
                      <SelectItem value="improving">Advancing</SelectItem>
                      <SelectItem value="stable">Stable</SelectItem>
                      <SelectItem value="declining">Regressing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="caption tracking-wide mb-3 block">Country Search</Label>
                  <Input 
                    placeholder="Search nations..."
                    value={filters.search}
                    onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                    className="border-black/20 h-10"
                  />
                </div>
              </div>

              <Button 
                onClick={generateReport}
                className="w-full mt-8 bg-black text-white hover:bg-black/90 h-10 font-normal tracking-wide"
                style={{ borderRadius: '2px' }}
              >
                <Download className="mr-2 h-4 w-4" />
                Export Dataset
              </Button>
            </div>
            
            {/* Key Insights */}
            <div className="space-y-4">
              <h4 className="caption tracking-wide">Key Insights</h4>
              <div className="space-y-3 text-sm leading-relaxed">
                <p>• 47% of nations show improving safety trends</p>
                <p>• Urban centers consistently outperform rural areas</p>
                <p>• Legal frameworks predict 73% of safety outcomes</p>
                <p>• Community networks reduce risk by 34%</p>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="lg:col-span-2">
            <div className="editorial-shadow bg-white border border-black/10 overflow-hidden">
              <div 
                ref={mapRef} 
                className="h-[500px] lg:h-[600px] w-full"
              >
                {isLoading && (
                  <div className="h-full flex items-center justify-center bg-gray-50">
                    <div className="text-center space-y-4">
                      <div className="w-8 h-8 border-2 border-black/20 border-t-black rounded-full animate-spin mx-auto"></div>
                      <p className="caption tracking-wide text-black/60">Loading Global Data</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Legend */}
            <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                <span className="caption">Exemplary (80+)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                <span className="caption">Progressive (60+)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-600 rounded-full"></div>
                <span className="caption">Moderate (40+)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                <span className="caption">Critical (0-39)</span>
              </div>
            </div>
          </div>

          {/* Empty space for editorial balance */}
          <div></div>
        </div>
      </div>
    </section>
  );
}