import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-black/10 z-50">
      <div className="editorial-container">
        <div className="flex justify-between items-center py-6">
          {/* Prominent IQSF Branding */}
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-black flex items-center justify-center">
              <Shield className="text-white h-5 w-5" />
            </div>
            <div>
              <h1 className="font-display text-4xl lg:text-5xl tracking-wider text-black font-light">IQSF</h1>
              <p className="caption text-sm text-black/70 tracking-[0.2em] mt-1">Defining Safety, Advancing Equality</p>
            </div>
          </div>

          {/* Editorial Navigation */}
          <nav className="hidden lg:flex items-center space-x-12">
            <button 
              onClick={() => scrollToSection('map')}
              className="caption text-black/80 hover:text-black transition-all duration-300 tracking-wide"
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection('dashboard')}
              className="caption text-black/80 hover:text-black transition-all duration-300 tracking-wide"
            >
              Data
            </button>
            <button 
              onClick={() => scrollToSection('certification')}
              className="caption text-black/80 hover:text-black transition-all duration-300 tracking-wide"
            >
              Certification
            </button>
            <button 
              onClick={() => scrollToSection('membership')}
              className="caption text-black/80 hover:text-black transition-all duration-300 tracking-wide"
            >
              Society
            </button>
            <button 
              onClick={() => scrollToSection('reports')}
              className="caption text-black/80 hover:text-black transition-all duration-300 tracking-wide"
            >
              Reports
            </button>
          </nav>

          {/* Luxury Actions */}
          <div className="hidden lg:flex items-center space-x-6">
            <button className="caption text-black/60 hover:text-black transition-colors tracking-wide">
              Subscribe
            </button>
            <div className="w-px h-6 bg-black/20"></div>
            <Button 
              className="bg-black text-white hover:bg-black/90 font-normal text-sm tracking-wide px-6 py-2 h-auto"
              style={{ borderRadius: '2px' }}
            >
              Access
            </Button>
          </div>

          {/* Mobile Menu */}
          <Button variant="ghost" size="icon" className="lg:hidden p-2">
            <div className="flex flex-col space-y-1">
              <div className="w-5 h-px bg-black"></div>
              <div className="w-5 h-px bg-black"></div>
              <div className="w-5 h-px bg-black"></div>
            </div>
          </Button>
        </div>
      </div>
    </header>
  );
}
