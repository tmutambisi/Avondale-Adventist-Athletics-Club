import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import hero1 from "@/assets/hero/hero-1.jpg";
import hero2 from "@/assets/hero/socks.jpg";
import hero3 from "@/assets/hero/zbhero.jpeg";
import hero4 from "@/assets/hero/hero-4.jpg";

const heroImages = [hero1, hero2, hero3, hero4];

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % heroImages.length);
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Images Carousel - Full visibility with controlled aspect */}
      {heroImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
        >
          <img
            src={image}
            alt={`Hero image ${index + 1}`}
            className="w-full h-full object-cover object-center"
          />
          {/* Subtle teal/turquoise overlay for readability (25-35% opacity) */}
          <div className="absolute inset-0 bg-gradient-to-b from-[hsl(180,70%,25%,0.30)] via-[hsl(185,65%,30%,0.35)] to-[hsl(180,70%,20%,0.45)]" />
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 md:left-8 z-20 p-3 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-all hover:scale-110"
        aria-label="Previous image"
      >
        <ChevronLeftIcon className="!w-6 !h-6 text-white" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 md:right-8 z-20 p-3 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-all hover:scale-110"
        aria-label="Next image"
      >
        <ChevronRightIcon className="!w-6 !h-6 text-white" />
      </button>

      {/* Carousel Indicators */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2.5 rounded-full transition-all duration-300 ${index === currentIndex
              ? "bg-white w-10"
              : "bg-white/50 w-2.5 hover:bg-white/70"
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-6 animate-fade-up drop-shadow-lg">
            Avondale Adventist
            <br />
            Athletics Club
          </h1>
          <p className="text-xl md:text-2xl text-white/95 mb-8 max-w-2xl mx-auto animate-fade-up stagger-1 opacity-0 drop-shadow-md">
            Running Together. Growing Together.
          </p>
          <p className="text-lg text-white/90 mb-10 max-w-xl mx-auto animate-fade-up stagger-2 opacity-0 drop-shadow-md">
            Dedicated to encouraging a healthy lifestyle and supporting personal development through running.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up stagger-3 opacity-0">
            <Button variant="hero" size="xl" asChild>
              <Link to="/contact">Join the Club</Link>
            </Button>
            <Button variant="heroOutline" size="xl" asChild>
              <Link to="/events">View Events</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white/50 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-white/50 rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
