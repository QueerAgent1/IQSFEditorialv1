import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Shield, Award, Medal, Trophy, Copy, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import neonShieldBronze from "@assets/IMG_0286_1755424434642.png";
import neonShieldSilver from "@assets/IMG_0289_1755424434642.png";
import neonShieldGold from "@assets/IMG_1968_1755424434642.png";

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

  const certificationLevels = [
    {
      name: "Foundation",
      shield: neonShieldBronze,
      color: "from-orange-400 to-red-500",
      requirements: ["Basic anti-discrimination policies", "LGBTQ+ awareness training", "Safe reporting mechanisms"],
      organizations: 47,
      description: "Entry-level certification for organizations beginning their inclusion journey"
    },
    {
      name: "Advanced",
      shield: neonShieldSilver,
      color: "from-blue-400 to-purple-600", 
      requirements: ["Comprehensive inclusion programs", "Leadership diversity metrics", "Community partnership initiatives"],
      organizations: 23,
      description: "Intermediate certification for organizations with established inclusion programs"
    },
    {
      name: "Excellence",
      shield: neonShieldGold,
      color: "from-yellow-400 to-pink-500",
      requirements: ["Industry-leading practices", "Global impact measurement", "Innovation in LGBTQ+ advocacy"],
      organizations: 8,
      description: "Premium certification for organizations leading LGBTQ+ inclusion globally"
    }
  ];

  return (
    <section id="certification" className="editorial-spacing bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <div className="editorial-container">
        
        {/* Editorial Header */}
        <div className="text-center mb-16">
          <div className="space-y-4 mb-8">
            <p className="caption tracking-[0.3em] text-white/60">Certification Program</p>
            <h2 className="font-display text-5xl lg:text-6xl font-light tracking-tight text-white">
              Neon <em className="font-normal pride-text-editorial">Certified</em>
            </h2>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-6">
            <p className="editorial-lead text-white/90">
              Organizations earn glowing recognition through our comprehensive LGBTQ+ 
              safety and inclusion certification program across three prestigious levels.
            </p>
          </div>
        </div>

        {/* Certification Levels */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {certificationLevels.map((level, index) => (
            <Card key={index} className="bg-white/5 backdrop-blur-sm border border-white/20 overflow-hidden editorial-hover">
              <CardContent className="p-8 text-center space-y-6">
                {/* Neon Shield */}
                <div className="relative flex justify-center">
                  <div className="relative">
                    <img 
                      src={level.shield} 
                      alt={`${level.name} Certification Shield`} 
                      className="w-24 h-24 object-contain"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-r ${level.color} opacity-20 blur-xl`}></div>
                  </div>
                </div>

                {/* Certification Details */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-display text-2xl font-light text-white">{level.name}</h3>
                    <p className="text-sm text-white/70">{level.description}</p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-center items-center gap-2 text-white/60">
                      <CheckCircle className="w-4 h-4" />
                      <span className="caption tracking-wide">{level.organizations} Organizations Certified</span>
                    </div>
                  </div>

                  {/* Requirements */}
                  <div className="space-y-3 pt-4 border-t border-white/20">
                    <p className="caption tracking-wide text-white/80 mb-3">Requirements</p>
                    <ul className="space-y-2 text-sm text-white/70">
                      {level.requirements.map((req, reqIndex) => (
                        <li key={reqIndex} className="flex items-start gap-2">
                          <div className="w-1 h-1 rounded-full bg-white/40 mt-2 flex-shrink-0"></div>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Application Form */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Application Process */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="font-display text-3xl font-light text-white">Begin Your Journey</h3>
              <p className="editorial-lead text-white/90">
                Start your organization's path toward IQSF certification and join 
                the growing community of verified safe spaces.
              </p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <h4 className="caption tracking-wide text-white/80">Assessment Process</h4>
                <p className="text-base text-white/70">
                  Our comprehensive evaluation includes policy review, culture assessment, 
                  and stakeholder interviews to ensure authentic inclusion practices.
                </p>
              </div>
              
              <div className="space-y-2">
                <h4 className="caption tracking-wide text-white/80">Ongoing Support</h4>
                <p className="text-base text-white/70">
                  Certified organizations receive continuous guidance, updates on 
                  best practices, and access to our exclusive community network.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="caption tracking-wide text-white/80">Digital Recognition</h4>
                <p className="text-base text-white/70">
                  Display your glowing neon certification shield across digital 
                  platforms, marketing materials, and physical spaces.
                </p>
              </div>
            </div>
          </div>

          {/* Application Form */}
          <Card className="bg-white/5 backdrop-blur-sm border border-white/20">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <h3 className="font-display text-2xl font-light text-white mb-4">Apply for Certification</h3>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="caption tracking-wide text-white/80">Organization Name</Label>
                    <Input
                      type="text"
                      value={formData.organizationName}
                      onChange={(e) => setFormData(prev => ({ ...prev, organizationName: e.target.value }))}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      placeholder="Your organization name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="caption tracking-wide text-white/80">Contact Email</Label>
                    <Input
                      type="email"
                      value={formData.contactEmail}
                      onChange={(e) => setFormData(prev => ({ ...prev, contactEmail: e.target.value }))}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      placeholder="contact@organization.com"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="caption tracking-wide text-white/80">Country</Label>
                    <Input
                      type="text"
                      value={formData.country}
                      onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      placeholder="Country of operation"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="caption tracking-wide text-white/80">Organization Size</Label>
                    <Select value={formData.organizationSize} onValueChange={(value) => setFormData(prev => ({ ...prev, organizationSize: value }))}>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="startup">Startup (1-10 employees)</SelectItem>
                        <SelectItem value="small">Small (11-50 employees)</SelectItem>
                        <SelectItem value="medium">Medium (51-200 employees)</SelectItem>
                        <SelectItem value="large">Large (201-1000 employees)</SelectItem>
                        <SelectItem value="enterprise">Enterprise (1000+ employees)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="caption tracking-wide text-white/80">Additional Information</Label>
                    <Textarea
                      value={formData.notes}
                      onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50 min-h-[100px]"
                      placeholder="Tell us about your organization's LGBTQ+ initiatives..."
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={certificationMutation.isPending}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0"
                >
                  {certificationMutation.isPending ? "Submitting..." : "Submit Application"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-20 pt-16 border-t border-white/20">
          <div className="max-w-2xl mx-auto space-y-6">
            <h3 className="font-display text-3xl font-light text-white">Join the Movement</h3>
            <p className="editorial-lead text-white/90">
              Be part of a growing network of organizations committed to creating 
              genuinely safe and inclusive spaces for LGBTQ+ individuals worldwide.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CertificationSystem;