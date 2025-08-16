import { Button } from "@/components/ui/button";
import { MapPin, Award } from "lucide-react";

export function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative py-20 lg:py-32 hero-bg overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-gray-900 mb-8 leading-tight">
            Defining Safety, <span className="rainbow-text">Advancing Equality</span>
          </h1>
          <p className="text-xl lg:text-2xl text-gray-700 mb-12 leading-relaxed">
            Globally recognized, <strong className="text-gray-900">data-driven</strong> LGBTQ+ safety standards through research, advocacy, and tools.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button
              onClick={() => scrollToSection('map')}
              size="lg"
              className="bg-pride-pink text-white hover:bg-pink-600 glow-effect font-semibold text-lg px-8 py-4"
            >
              <MapPin className="mr-3 h-5 w-5" />
              Explore Safety Map
            </Button>
            <Button
              onClick={() => scrollToSection('certification')}
              variant="outline"
              size="lg"
              className="border-2 border-pride-pink text-pride-pink hover:bg-pride-pink hover:text-white font-semibold text-lg px-8 py-4"
            >
              <Award className="mr-3 h-5 w-5" />
              Get Certified
            </Button>
          </div>

          {/* Brand Pillars */}
          <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-gray-600">
            <span className="px-4 py-2 bg-gray-100 rounded-full">Safety</span>
            <span className="px-4 py-2 bg-gray-100 rounded-full">Global Inclusivity</span>
            <span className="px-4 py-2 bg-gray-100 rounded-full">Data-Driven Action</span>
            <span className="px-4 py-2 bg-gray-100 rounded-full">Advocacy</span>
            <span className="px-4 py-2 bg-gray-100 rounded-full">Hope</span>
          </div>
        </div>
      </div>
    </section>
  );
}
