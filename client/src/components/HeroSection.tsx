import { Button } from "@/components/ui/button";
import coverImage from "@assets/IMG_0299_1755419317873.jpeg";

export function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center editorial-backdrop">
      <div className="editorial-container w-full">
        {/* Issue Cover Layout */}
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
          
          {/* Editorial Content */}
          <div className="space-y-8 pt-24 lg:pt-0">
            <div className="space-y-2">
              <p className="caption tracking-[0.3em] text-black/60">Volume I • Issue I</p>
              <div className="editorial-line max-w-24"></div>
            </div>
            
            <div className="space-y-6">
              <h1 className="font-display text-6xl lg:text-7xl xl:text-8xl font-light leading-[0.9] tracking-tight">
                Defining
                <br />
                <em className="pride-text-editorial font-normal">Safety</em>
              </h1>
              
              <div className="space-y-4 max-w-lg">
                <p className="editorial-lead">
                  An investigation into global LGBTQ+ safety through data-driven research, advocacy, and revolutionary certification systems.
                </p>
                
                <p className="text-base text-black/70 leading-relaxed">
                  In this comprehensive report, we examine the intersection of technology, 
                  policy, and human rights to advance equality worldwide.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-8">
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
          </div>

          {/* Editorial Cover Image */}
          <div className="relative h-full min-h-[600px] lg:min-h-[700px]">
            <div className="absolute inset-0 editorial-shadow">
              <img 
                src={coverImage}
                alt="IQSF Editorial Cover"
                className="w-full h-full object-cover"
                style={{ filter: 'grayscale(15%) contrast(1.1) brightness(0.95)' }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-transparent to-black/20"></div>
            </div>
            
            {/* Magazine-style overlay text */}
            <div className="absolute bottom-8 left-8 right-8 space-y-4 text-white">
              <div className="backdrop-blur-sm bg-black/40 p-6 border border-white/30">
                <p className="caption text-sm tracking-[0.2em] mb-3 text-white/80">Inside This Issue</p>
                <ul className="space-y-2 text-sm font-light">
                  <li>• Global Safety Index Analysis</li>
                  <li>• Interactive Map Exploration</li>
                  <li>• Certification & Standards</li>
                  <li>• Community Impact Stories</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Editorial Tags */}
        <div className="flex flex-wrap justify-center lg:justify-start gap-3 mt-16 pt-8 border-t border-black/10">
          <span className="caption px-4 py-2 bg-white border border-black/20 tracking-wide">Safety Research</span>
          <span className="caption px-4 py-2 bg-white border border-black/20 tracking-wide">Global Impact</span>
          <span className="caption px-4 py-2 bg-white border border-black/20 tracking-wide">Data Analytics</span>
          <span className="caption px-4 py-2 bg-white border border-black/20 tracking-wide">Policy Advocacy</span>
          <span className="caption px-4 py-2 bg-white border border-black/20 tracking-wide">Community</span>
        </div>
      </div>
    </section>
  );
}
