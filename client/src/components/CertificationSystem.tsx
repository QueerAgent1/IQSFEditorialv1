import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Shield, Award, Medal, Trophy, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function CertificationSystem() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    organizationName: '',
    contactEmail: '',
    country: '',
    organizationSize: '',
    notes: ''
  });

  const certificationMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch('/api/certifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Failed to submit certification');
      }
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Application Submitted",
        description: `Your certification application has been submitted with ID: ${data.verificationId}`,
      });
      setFormData({
        organizationName: '',
        contactEmail: '',
        country: '',
        organizationSize: '',
        notes: ''
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit certification application. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    certificationMutation.mutate(formData);
  };

  const copyEmbedCode = () => {
    const embedCode = `<div data-iqsf-badge="IQSF-2025-001"></div>
<script src="https://iqsf.org/embed.js"></script>`;
    navigator.clipboard.writeText(embedCode);
    toast({
      title: "Copied!",
      description: "Embed code copied to clipboard.",
    });
  };

  return (
    <section id="certification" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-4xl lg:text-5xl text-gray-900 mb-6">
            IQSF Certified Safe Space
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Display the Digital Shield of Intersectionality on your venue or product.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Certification Badge */}
          <div className="text-center">
            <div className="inline-block relative">
              <div className="w-64 h-64 rainbow-gradient rounded-full flex items-center justify-center mx-auto mb-8 glow-effect">
                <div className="w-56 h-56 bg-white rounded-full flex items-center justify-center">
                  <div className="text-center">
                    <Shield className="h-16 w-16 rainbow-text mb-4 mx-auto" />
                    <div className="font-display font-bold text-lg text-gray-900">IQSF</div>
                    <div className="text-sm text-gray-600">CERTIFIED</div>
                    <div className="text-xs text-gray-500 mt-1">Safe Space 2025</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Certification levels */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              <Card className="bg-green-50 border-green-200">
                <CardContent className="text-center p-4">
                  <Award className="h-8 w-8 text-green-600 mb-2 mx-auto" />
                  <div className="font-semibold text-sm">Bronze</div>
                  <div className="text-xs text-gray-600">Basic compliance</div>
                </CardContent>
              </Card>
              <Card className="bg-yellow-50 border-yellow-200">
                <CardContent className="text-center p-4">
                  <Medal className="h-8 w-8 text-yellow-600 mb-2 mx-auto" />
                  <div className="font-semibold text-sm">Silver</div>
                  <div className="text-xs text-gray-600">Advanced policies</div>
                </CardContent>
              </Card>
              <Card className="bg-purple-50 border-purple-200">
                <CardContent className="text-center p-4">
                  <Trophy className="h-8 w-8 text-purple-600 mb-2 mx-auto" />
                  <div className="font-semibold text-sm">Gold</div>
                  <div className="text-xs text-gray-600">Excellence standard</div>
                </CardContent>
              </Card>
            </div>

            {/* Embed Code Preview */}
            <Card className="mt-8 bg-gray-100">
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <Label className="text-sm font-medium text-gray-700">Embed Code</Label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={copyEmbedCode}
                    className="text-xs text-pride-pink hover:text-pink-600"
                  >
                    <Copy className="h-3 w-3 mr-1" />
                    Copy
                  </Button>
                </div>
                <pre className="text-xs text-gray-600 font-mono whitespace-pre-wrap">
{`<div data-iqsf-badge="IQSF-2025-001"></div>
<script src="https://iqsf.org/embed.js"></script>`}
                </pre>
              </CardContent>
            </Card>
          </div>

          {/* Application Form */}
          <Card>
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Apply for Certification</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="org">Organization *</Label>
                    <Input
                      id="org"
                      value={formData.organizationName}
                      onChange={(e) => setFormData({...formData, organizationName: e.target.value})}
                      placeholder="Your organization name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Contact Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.contactEmail}
                      onChange={(e) => setFormData({...formData, contactEmail: e.target.value})}
                      placeholder="contact@organization.com"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="country">Country *</Label>
                    <Input
                      id="country"
                      value={formData.country}
                      onChange={(e) => setFormData({...formData, country: e.target.value})}
                      placeholder="Where you operate"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="size">Organization Size *</Label>
                    <Select
                      value={formData.organizationSize}
                      onValueChange={(value) => setFormData({...formData, organizationSize: value})}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-49">1–49 employees</SelectItem>
                        <SelectItem value="50-249">50–249 employees</SelectItem>
                        <SelectItem value="250-999">250–999 employees</SelectItem>
                        <SelectItem value="1000+">1000+ employees</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="notes">Additional Information</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    rows={4}
                    placeholder="Tell us about your current policies & goals for LGBTQ+ inclusion..."
                  />
                </div>
                
                <Button
                  type="submit"
                  className="w-full bg-pride-pink text-white hover:bg-pink-600 glow-effect"
                  disabled={certificationMutation.isPending}
                >
                  {certificationMutation.isPending ? "Submitting..." : "Submit Application"}
                </Button>
                
                <p className="text-sm text-gray-600 text-center">
                  We'll review your application within 5-10 business days and provide next steps.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
