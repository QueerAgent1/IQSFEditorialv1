import React from "react";
import neonShield1 from "@assets/IMG_0286_1755424434642.png";
import neonShield2 from "@assets/IMG_0289_1755424434642.png";
import neonShield3 from "@assets/IMG_1968_1755424434642.png";

export function BrandShowcase() {
  return (
    <section className="editorial-spacing bg-black text-white overflow-hidden">
      <div className="editorial-container">
        
        {/* Editorial Header */}
        <div className="text-center mb-16">
          <div className="space-y-4 mb-8">
            <p className="caption tracking-[0.3em] text-white/60">Brand Identity</p>
            <h2 className="font-display text-5xl lg:text-6xl font-light tracking-tight text-white">
              The Shield of <em className="font-normal pride-text-editorial">Protection</em>
            </h2>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-6">
            <p className="editorial-lead text-white/90">
              Our logo represents the interconnected strength of global LGBTQ+ communities, 
              with each intersection symbolizing the bonds that create safety through unity.
            </p>
          </div>
        </div>

        {/* Neon Shield Gallery */}
        <div className="grid lg:grid-cols-3 gap-12 mb-20">
          
          {/* Community Shield */}
          <div className="text-center space-y-6">
            <div className="relative">
              <img 
                src={neonShield2} 
                alt="IQSF Community Shield - Neon Pride Design" 
                className="w-48 h-48 mx-auto object-contain"
              />
              <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/20"></div>
            </div>
            <div className="space-y-3">
              <h3 className="font-display text-2xl font-light">Community Unity</h3>
              <p className="caption tracking-wide text-white/70">
                The interwoven pattern represents the strength found in 
                community connections and shared experiences.
              </p>
            </div>
          </div>

          {/* Global Shield */}
          <div className="text-center space-y-6">
            <div className="relative">
              <img 
                src={neonShield1} 
                alt="IQSF Global Shield - Clean Neon Design" 
                className="w-48 h-48 mx-auto object-contain"
              />
              <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/20"></div>
            </div>
            <div className="space-y-3">
              <h3 className="font-display text-2xl font-light">Global Reach</h3>
              <p className="caption tracking-wide text-white/70">
                Clean lines symbolize clarity of purpose across 
                195 nations and diverse cultural contexts.
              </p>
            </div>
          </div>

          {/* Premium Shield */}
          <div className="text-center space-y-6">
            <div className="relative">
              <img 
                src={neonShield3} 
                alt="IQSF Premium Shield - Metallic Pride Design" 
                className="w-48 h-48 mx-auto object-contain"
              />
              <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/20"></div>
            </div>
            <div className="space-y-3">
              <h3 className="font-display text-2xl font-light">Premium Impact</h3>
              <p className="caption tracking-wide text-white/70">
                Refined metallic finish represents the premium quality 
                of our research and certification standards.
              </p>
            </div>
          </div>
        </div>

        {/* Brand Values */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="font-display text-3xl font-light">Design Philosophy</h3>
              <p className="editorial-lead text-white/90">
                Every element of our visual identity reflects our commitment to 
                creating safe spaces through thoughtful, inclusive design.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <h4 className="caption tracking-wide text-white/80">Pride Colors</h4>
                <p className="text-base text-white/70">
                  Rainbow gradient represents the full spectrum of LGBTQ+ identities 
                  and experiences we serve and protect.
                </p>
              </div>
              
              <div className="space-y-2">
                <h4 className="caption tracking-wide text-white/80">Interwoven Pattern</h4>
                <p className="text-base text-white/70">
                  Celtic knot-inspired design symbolizes eternal connection, 
                  strength through unity, and unbreakable community bonds.
                </p>
              </div>
              
              <div className="space-y-2">
                <h4 className="caption tracking-wide text-white/80">Shield Form</h4>
                <p className="text-base text-white/70">
                  The protective shield shape reinforces our mission of safety 
                  while maintaining approachable, modern aesthetics.
                </p>
              </div>
            </div>
          </div>

          {/* Large Feature Shield */}
          <div className="relative flex justify-center">
            <div className="relative">
              <img 
                src={neonShield3} 
                alt="Featured IQSF Shield Logo" 
                className="w-80 h-80 object-contain"
              />
              <div className="absolute inset-0 bg-gradient-radial from-transparent to-black/10"></div>
              <div className="absolute -inset-4 bg-gradient-radial from-white/5 via-transparent to-transparent rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-20 pt-16 border-t border-white/20">
          <div className="max-w-2xl mx-auto space-y-6">
            <h3 className="font-display text-3xl font-light">Brand Partnership</h3>
            <p className="editorial-lead text-white/90">
              Organizations using IQSF certification can license our shield logo 
              to demonstrate their commitment to LGBTQ+ safety and inclusion.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BrandShowcase;