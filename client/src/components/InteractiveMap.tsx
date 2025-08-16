import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Download, Plus, Minus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function InteractiveMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [filters, setFilters] = useState({
    region: "all",
    minScore: 0,
    trend: "any",
    search: ""
  });

  const { data: countries = [], isLoading } = useQuery({
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
      countries.forEach((country: any) => {
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
    if (score >= 80) return '#2D6BFF'; // Pride Blue - Excellent
    if (score >= 60) return '#00D084'; // Pride Green - Good  
    if (score >= 40) return '#FFD600'; // Pride Yellow - Fair
    if (score >= 20) return '#FF8A00'; // Pride Orange - Poor
    return '#FF4D4F'; // Red - Critical
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
          countries: countries.map((c: any) => c.name),
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
    <section id="map" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-4xl lg:text-5xl text-gray-900 mb-6">
            Interactive LGBTQ+ Safety Map
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Freemium access for individuals. <strong className="rainbow-text">Premium</strong> unlocks historical trends & downloadable reports.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Map Container */}
          <div className="lg:col-span-3">
            <Card className="shadow-lg overflow-hidden">
              <CardContent className="p-0">
                <div 
                  ref={mapRef}
                  className="w-full h-[500px] bg-blue-50 relative"
                >
                  {/* Loading state */}
                  {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-blue-50">
                      <div className="text-center">
                        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-pride-pink mb-4"></div>
                        <p className="text-gray-600">Loading global safety data...</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Map controls */}
                  <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-2 z-[1000]">
                    <Button size="sm" variant="ghost" className="p-2">
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="p-2">
                      <Minus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filter Controls */}
          <div className="lg:col-span-1">
            <Card className="shadow-lg sticky top-24">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg text-gray-900 mb-6">Filters & Controls</h3>
                
                <div className="space-y-6">
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2">Region</Label>
                    <Select
                      value={filters.region}
                      onValueChange={(value) => setFilters({...filters, region: value})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Regions</SelectItem>
                        <SelectItem value="Africa">Africa</SelectItem>
                        <SelectItem value="Americas">Americas</SelectItem>
                        <SelectItem value="Asia">Asia</SelectItem>
                        <SelectItem value="Europe">Europe</SelectItem>
                        <SelectItem value="Oceania">Oceania</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2">
                      Min Safety Score: {filters.minScore}
                    </Label>
                    <Slider
                      value={[filters.minScore]}
                      onValueChange={([value]) => setFilters({...filters, minScore: value})}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>0</span>
                      <span>100</span>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2">Trend</Label>
                    <Select
                      value={filters.trend}
                      onValueChange={(value) => setFilters({...filters, trend: value})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any Trend</SelectItem>
                        <SelectItem value="improving">Improving</SelectItem>
                        <SelectItem value="declining">Declining</SelectItem>
                        <SelectItem value="stable">Stable</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2">Search Country</Label>
                    <Input
                      placeholder="e.g., Canada"
                      value={filters.search}
                      onChange={(e) => setFilters({...filters, search: e.target.value})}
                    />
                  </div>

                  <Button 
                    onClick={generateReport}
                    className="w-full bg-pride-pink text-white hover:bg-pink-600 glow-effect"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Generate AI Report
                  </Button>
                </div>

                {/* Legend */}
                <div className="mt-8">
                  <h4 className="font-medium text-gray-900 mb-3">Safety Rating</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-pride-blue rounded-full"></div>
                      <span>Excellent (80-100)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-pride-green rounded-full"></div>
                      <span>Good (60-79)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-pride-yellow rounded-full"></div>
                      <span>Fair (40-59)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-pride-orange rounded-full"></div>
                      <span>Poor (20-39)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span>Critical (0-19)</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
