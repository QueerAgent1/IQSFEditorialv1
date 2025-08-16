import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import type { Report } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Download, FileText, FileSpreadsheet, Code, Share, Calendar, Bot } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function ReportsSection() {
  const { toast } = useToast();
  const [reportConfig, setReportConfig] = useState({
    type: 'country',
    countries: '',
    period: 'last12months',
    format: 'pdf',
    emailMembers: false
  });

  const { data: reports = [], isLoading: reportsLoading, refetch } = useQuery<Report[]>({
    queryKey: ['/api/reports'],
    enabled: true
  });

  const generateReportMutation = useMutation({
    mutationFn: async (config: any) => {
      const response = await fetch('/api/reports/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: config.type,
          countries: config.countries.split(',').map((c: string) => c.trim()).filter(Boolean),
          format: config.format,
          title: `${config.type} Analysis Report - ${new Date().toLocaleDateString()}`,
          emailMembers: config.emailMembers
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to generate report');
      }
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Report Generated",
        description: `Your ${reportConfig.type} report has been generated successfully.`,
      });
      refetch(); // Refresh reports list
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to generate report. Please try again.",
        variant: "destructive",
      });
    },
  });

  const downloadReport = async (reportId: string, title: string) => {
    try {
      const response = await fetch(`/api/reports/${reportId}/download`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${title}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to download report.",
        variant: "destructive",
      });
    }
  };

  const handleGenerateReport = (e: React.FormEvent) => {
    e.preventDefault();
    generateReportMutation.mutate(reportConfig);
  };

  const formatFileIcon = (format: string) => {
    switch (format) {
      case 'excel': return <FileSpreadsheet className="h-4 w-4" />;
      case 'json': return <Code className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <section id="reports" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-4xl lg:text-5xl text-gray-900 mb-6">
            AI-Powered Safety Reports
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Generate comprehensive safety reports powered by our global dataset and AI analysis.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Report Generator */}
          <Card className="bg-gray-50">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Generate Custom Report</h3>
              
              <form onSubmit={handleGenerateReport} className="space-y-6">
                <div>
                  <Label htmlFor="reportType">Report Type</Label>
                  <Select
                    value={reportConfig.type}
                    onValueChange={(value) => setReportConfig({...reportConfig, type: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="country">Country Analysis</SelectItem>
                      <SelectItem value="regional">Regional Comparison</SelectItem>
                      <SelectItem value="global">Global Trends</SelectItem>
                      <SelectItem value="custom">Custom Query</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="countries">Countries/Regions</Label>
                  <Input
                    id="countries"
                    placeholder="e.g., Canada, Germany, Netherlands"
                    value={reportConfig.countries}
                    onChange={(e) => setReportConfig({...reportConfig, countries: e.target.value})}
                  />
                </div>
                
                <div>
                  <Label htmlFor="period">Time Period</Label>
                  <Select
                    value={reportConfig.period}
                    onValueChange={(value) => setReportConfig({...reportConfig, period: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="last12months">Last 12 months</SelectItem>
                      <SelectItem value="last2years">Last 2 years</SelectItem>
                      <SelectItem value="last5years">Last 5 years</SelectItem>
                      <SelectItem value="alldata">All available data</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label className="mb-3 block">Format</Label>
                  <div className="grid grid-cols-3 gap-3">
                    {['pdf', 'excel', 'json'].map((format) => (
                      <Button
                        key={format}
                        type="button"
                        variant={reportConfig.format === format ? "default" : "outline"}
                        className={`p-3 ${
                          reportConfig.format === format 
                            ? 'bg-pride-pink text-white border-pride-pink' 
                            : 'border-gray-300 hover:border-pride-pink'
                        }`}
                        onClick={() => setReportConfig({...reportConfig, format})}
                      >
                        {formatFileIcon(format)}
                        <span className="ml-1 capitalize">{format}</span>
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="email-members"
                    checked={reportConfig.emailMembers}
                    onCheckedChange={(checked) => 
                      setReportConfig({...reportConfig, emailMembers: !!checked})
                    }
                  />
                  <Label htmlFor="email-members" className="text-sm">
                    Email report to members
                  </Label>
                </div>
                
                <Button
                  type="submit"
                  className="w-full bg-pride-pink text-white hover:bg-pink-600 glow-effect font-semibold text-lg py-4"
                  disabled={generateReportMutation.isPending}
                >
                  <Bot className="mr-2 h-5 w-5" />
                  {generateReportMutation.isPending ? "Generating..." : "Generate AI Report"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Recent Reports */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Recent Reports</h3>
            
            {reportsLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-4">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : reports.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No reports generated yet.</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Use the form on the left to generate your first report.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {reports.slice(0, 5).map((report) => (
                  <Card key={report.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{report.title}</h4>
                          <p className="text-sm text-gray-600 capitalize">
                            {report.type} analysis report
                          </p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {formatDate(report.createdAt.toString())}
                            </span>
                            <span className="flex items-center gap-1">
                              {formatFileIcon(report.format)}
                              {report.format.toUpperCase()}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => downloadReport(report.id, report.title)}
                            className="text-gray-600 hover:text-pride-pink"
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-600 hover:text-pride-pink"
                          >
                            <Share className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {reports.length > 5 && (
                  <Button
                    variant="ghost"
                    className="text-pride-pink hover:text-pink-600 font-medium"
                  >
                    View all reports →
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
