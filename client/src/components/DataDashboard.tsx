import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Globe, BarChart, Database } from "lucide-react";

interface Statistics {
  totalCountries: number;
  improvingTrendPercentage: number;
  topRatedCount: number;
  dataPoints: number;
}

export function DataDashboard() {
  const { data: stats, isLoading } = useQuery<Statistics>({
    queryKey: ['/api/statistics'],
    enabled: true
  });

  const StatCard = ({ icon: Icon, value, label, loading = false }: any) => (
    <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <Icon className="h-8 w-8 text-pride-green" />
          <div>
            <div className="text-3xl font-bold text-white mb-2">
              {loading ? "..." : value}
            </div>
            <div className="text-gray-300">{label}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <section id="dashboard" className="py-20 bg-dark-bg text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-4xl lg:text-5xl mb-6">
            Global Safety Snapshot
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Data insights refreshed quarterly. Become a member for full datasets and methodology.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <StatCard
            icon={Globe}
            value={stats?.totalCountries || "..."}
            label="Countries Tracked"
            loading={isLoading}
          />
          <StatCard
            icon={TrendingUp}
            value={stats?.improvingTrendPercentage ? `${stats.improvingTrendPercentage}%` : "..."}
            label="Improving Trend"
            loading={isLoading}
          />
          <StatCard
            icon={BarChart}
            value={stats?.topRatedCount || "..."}
            label="Top Rated Countries"
            loading={isLoading}
          />
          <StatCard
            icon={Database}
            value={stats?.dataPoints ? `${(stats.dataPoints / 1000000).toFixed(1)}M+` : "..."}
            label="Data Points"
            loading={isLoading}
          />
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-6">Score Distribution</h3>
              <div className="chart-container">
                {/* Simulated chart visualization */}
                <div className="h-64 bg-gradient-to-r from-pride-pink via-pride-yellow to-pride-green rounded-lg flex items-end justify-around p-4 space-x-2">
                  <div className="bg-white/20 rounded-t w-12" style={{height: '40%'}}></div>
                  <div className="bg-white/20 rounded-t w-12" style={{height: '60%'}}></div>
                  <div className="bg-white/20 rounded-t w-12" style={{height: '80%'}}></div>
                  <div className="bg-white/20 rounded-t w-12" style={{height: '65%'}}></div>
                  <div className="bg-white/20 rounded-t w-12" style={{height: '45%'}}></div>
                </div>
                <div className="flex justify-around text-xs text-gray-400 mt-2">
                  <span>0-20</span>
                  <span>21-40</span>
                  <span>41-60</span>
                  <span>61-80</span>
                  <span>81-100</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-6">Regional Trends</h3>
              <div className="chart-container">
                {/* Simulated trend lines */}
                <div className="h-64 relative rounded-lg overflow-hidden">
                  <svg className="w-full h-full" viewBox="0 0 400 256">
                    <defs>
                      <linearGradient id="trendGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="var(--pride-pink)" />
                        <stop offset="50%" stopColor="var(--pride-yellow)" />
                        <stop offset="100%" stopColor="var(--pride-green)" />
                      </linearGradient>
                    </defs>
                    {/* Trend lines for different regions */}
                    <polyline
                      points="0,200 100,180 200,160 300,140 400,120"
                      fill="none"
                      stroke="url(#trendGradient)"
                      strokeWidth="3"
                    />
                    <polyline
                      points="0,220 100,210 200,190 300,170 400,150"
                      fill="none"
                      stroke="hsl(var(--pride-blue))"
                      strokeWidth="2"
                    />
                    <polyline
                      points="0,180 100,170 200,175 300,165 400,160"
                      fill="none"
                      stroke="hsl(var(--pride-green))"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
                <div className="flex justify-around text-xs text-gray-400 mt-2">
                  <span>2020</span>
                  <span>2021</span>
                  <span>2022</span>
                  <span>2023</span>
                  <span>2024</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
