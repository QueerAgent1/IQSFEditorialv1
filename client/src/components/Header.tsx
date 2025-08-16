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
    <header className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rainbow-gradient rounded-xl flex items-center justify-center">
              <Shield className="text-white h-6 w-6" />
            </div>
            <div>
              <h1 className="font-display font-bold text-xl text-gray-900">IQSF</h1>
              <p className="text-xs text-gray-600">Safety & Equality</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('map')}
              className="text-gray-700 hover:text-pride-pink transition-colors font-medium"
            >
              Safety Map
            </button>
            <button 
              onClick={() => scrollToSection('dashboard')}
              className="text-gray-700 hover:text-pride-pink transition-colors font-medium"
            >
              Data
            </button>
            <button 
              onClick={() => scrollToSection('certification')}
              className="text-gray-700 hover:text-pride-pink transition-colors font-medium"
            >
              Certification
            </button>
            <button 
              onClick={() => scrollToSection('membership')}
              className="text-gray-700 hover:text-pride-pink transition-colors font-medium"
            >
              Membership
            </button>
            <button 
              onClick={() => scrollToSection('reports')}
              className="text-gray-700 hover:text-pride-pink transition-colors font-medium"
            >
              Reports
            </button>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button variant="ghost" className="text-gray-700 hover:text-pride-pink">
              Sign In
            </Button>
            <Button className="bg-pride-pink text-white hover:bg-pink-600 glow-effect">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="lg:hidden">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </Button>
        </div>
      </div>
    </header>
  );
}
