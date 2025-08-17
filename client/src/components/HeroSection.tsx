import React from "react";
import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import coverImage from "@assets/IMG_0299_1755419317873.jpeg";

type HeroSectionProps = {
  title?: string;
  tagline?: string;
  imageSrc?: string;
  imageAlt?: string;
  coverlines?: string[];
  className?: string;
};

export const HeroSection: React.FC<HeroSectionProps> = ({
  title = "IQSF",
  tagline = "Defining Safety, Advancing Equality",
  imageSrc = coverImage,
  imageAlt = "IQSF Editorial Cover",
  coverlines = [
    "Global Safety Index Analysis",
    "Interactive Map Exploration",
    "Certification & Standards",
    "Community Impact Stories"
  ],
  className = "",
}) => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      id="hero"
      aria-label="Feature cover"
      className={`relative min-h-screen w-full ${className}`}
    >
      {/* Hero image with overlay - Full screen coverage */}
      <div className="relative w-full min-h-screen editorial-shadow overflow-hidden">
        <img
          src={imageSrc}
          alt={imageAlt}
          className="w-full h-full min-h-screen object-cover"
          draggable={false}
          style={{ filter: 'grayscale(15%) contrast(1.1) brightness(0.95)' }}
        />

        {/* Magazine title overlay - Top positioned */}
        <div className="absolute top-8 left-8 right-8 z-10">
          <div className="text-white">
            <div className="font-display text-6xl lg:text-8xl xl:text-9xl font-light tracking-wider drop-shadow-2xl">
              {title}
            </div>
            <div className="caption text-sm lg:text-base tracking-[0.3em] mt-2 text-white/90">
              {tagline.toUpperCase()}
            </div>
          </div>
        </div>

        {/* Glass coverline box - Bottom positioned */}
        <div className="absolute bottom-8 left-8 right-8 sm:left-8 sm:right-auto sm:max-w-md backdrop-blur-sm bg-black/40 text-white p-6 editorial-shadow rounded-sm">
          <p className="caption mb-3 tracking-widest text-white/80">INSIDE THIS ISSUE</p>
          <ul className="space-y-2 text-sm font-light">
            {coverlines.map((line, i) => (
              <li key={i}>• {line}</li>
            ))}
          </ul>
        </div>

        {/* Decorative gradient line at bottom */}
        <div className="absolute inset-x-0 bottom-0 h-1 pride-gradient-editorial opacity-70" />
      </div>

      {/* Content Section Below Image */}
      <div className="bg-white py-16">
        <div className="editorial-container">
          {/* Editorial Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              onClick={() => scrollToSection('map')}
              className="bg-black text-white hover:bg-black/90 h-12 px-8 font-normal tracking-wide"
              style={{ borderRadius: '2px' }}
            >
              Read Features
            </Button>
            <Button
              onClick={() => scrollToSection('certification')}
              variant="outline"
              className="border-black text-black hover:bg-black hover:text-white h-12 px-8 font-normal tracking-wide"
              style={{ borderRadius: '2px' }}
            >
              View Collection
            </Button>
          </div>

          {/* Editorial Tags */}
          <div className="flex flex-wrap justify-center gap-3 pt-8 border-t border-black/10">
            <span className="caption px-4 py-2 bg-white border border-black/20 tracking-wide">Safety Research</span>
            <span className="caption px-4 py-2 bg-white border border-black/20 tracking-wide">Global Impact</span>
            <span className="caption px-4 py-2 bg-white border border-black/20 tracking-wide">Data Analytics</span>
            <span className="caption px-4 py-2 bg-white border border-black/20 tracking-wide">Policy Advocacy</span>
            <span className="caption px-4 py-2 bg-white border border-black/20 tracking-wide">Community</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
