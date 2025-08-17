import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import communityCouple from "@assets/IMG_1973_1755424434642.png";
import presentationImage from "@assets/IMG_1977_1755424434642.png";
import advocateTravel from "@assets/IMG_1978_1755424434642.png";
import policyAdvocacy from "@assets/IMG_1979_1755424434642.png";
import hopeImage from "@assets/IMG_1972_1755424434642.png";

export function CommunityStories() {
  return (
    <section id="stories" className="editorial-spacing bg-white">
      <div className="editorial-container">
        
        {/* Editorial Header */}
        <div className="text-center mb-16">
          <div className="space-y-4 mb-8">
            <p className="caption tracking-[0.3em] text-black/60">Human Stories</p>
            <h2 className="font-display text-5xl lg:text-6xl font-light tracking-tight">
              Voices of <em className="font-normal pride-text-editorial">Change</em>
            </h2>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-6">
            <p className="editorial-lead">
              Behind every data point is a human story. Meet the advocates, researchers, 
              and community members advancing LGBTQ+ safety around the world.
            </p>
          </div>
        </div>

        {/* Stories Grid */}
        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          
          {/* Featured Story - Community Connection */}
          <div className="space-y-8">
            <div className="relative editorial-shadow overflow-hidden rounded-lg">
              <img 
                src={communityCouple} 
                alt="LGBTQ+ couple sharing a moment" 
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="space-y-2">
                  <p className="caption tracking-wide opacity-80">Community Impact</p>
                  <h3 className="font-display text-2xl font-light">Finding Safety in Connection</h3>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <p className="editorial-lead">
                "When we found each other, we also found our community. The safety index 
                helped us understand not just where we could be ourselves, but where we 
                could build a future together."
              </p>
              <p className="text-base text-black/70 leading-relaxed">
                Jordan and Alex used IQSF data to navigate their relocation from a restrictive 
                region to a more inclusive community, highlighting how safety metrics translate 
                to real-world decisions for LGBTQ+ individuals.
              </p>
            </div>
          </div>

          {/* Research & Advocacy */}
          <div className="space-y-8">
            <div className="relative editorial-shadow overflow-hidden rounded-lg">
              <img 
                src={presentationImage} 
                alt="LGBTQ+ researcher presenting findings" 
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="space-y-2">
                  <p className="caption tracking-wide opacity-80">Research Impact</p>
                  <h3 className="font-display text-2xl font-light">Data-Driven Advocacy</h3>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <p className="editorial-lead">
                "Our research doesn't just document progress—it creates the roadmap for 
                organizations and governments to build more inclusive societies."
              </p>
              <p className="text-base text-black/70 leading-relaxed">
                Dr. Sam Rivera leads IQSF's methodology development, transforming complex 
                social dynamics into actionable intelligence that drives policy reform 
                and organizational change worldwide.
              </p>
            </div>
          </div>
        </div>

        {/* Additional Stories Row */}
        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* Mobile Advocacy */}
          <Card className="editorial-hover editorial-shadow border-0">
            <div className="relative overflow-hidden">
              <img 
                src={advocateTravel} 
                alt="Advocate working remotely" 
                className="w-full h-[250px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>
            <CardContent className="p-6">
              <div className="space-y-3">
                <p className="caption tracking-wide text-black/60">Mobile Research</p>
                <h4 className="font-display text-xl font-light">Borderless Advocacy</h4>
                <p className="text-sm text-black/70 leading-relaxed">
                  Field researchers collect real-time safety data across multiple regions, 
                  ensuring our index reflects current ground-truth conditions.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Policy Impact */}
          <Card className="editorial-hover editorial-shadow border-0">
            <div className="relative overflow-hidden">
              <img 
                src={policyAdvocacy} 
                alt="Policy advocacy in action" 
                className="w-full h-[250px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>
            <CardContent className="p-6">
              <div className="space-y-3">
                <p className="caption tracking-wide text-black/60">Policy Reform</p>
                <h4 className="font-display text-xl font-light">Legislative Change</h4>
                <p className="text-sm text-black/70 leading-relaxed">
                  IQSF data directly influences legislation, with 12 countries citing our 
                  research in recent equality and anti-discrimination laws.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Hope & Future */}
          <Card className="editorial-hover editorial-shadow border-0">
            <div className="relative overflow-hidden">
              <img 
                src={hopeImage} 
                alt="Hand reaching toward light representing hope" 
                className="w-full h-[250px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>
            <CardContent className="p-6">
              <div className="space-y-3">
                <p className="caption tracking-wide text-black/60">Future Vision</p>
                <h4 className="font-display text-xl font-light">Reaching Forward</h4>
                <p className="text-sm text-black/70 leading-relaxed">
                  Every metric we track represents someone reaching toward a safer future. 
                  Our work illuminates the path toward global LGBTQ+ equality.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-20 pt-16 border-t border-black/10">
          <div className="max-w-2xl mx-auto space-y-6">
            <h3 className="font-display text-3xl font-light">Share Your Story</h3>
            <p className="editorial-lead">
              Your experiences matter. Join our global network of advocates and help us 
              build a more comprehensive picture of LGBTQ+ safety worldwide.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CommunityStories;