import React, { useState } from 'react';
import CircularGallery from '../animations/CircularGallery';
import FoldText from '../animations/FoldText';
import { DESTINATIONS_CIRCULAR } from '../data/destinations';
import { Sparkles, MapPin } from 'lucide-react';

export default function Destinations({ onSelectDestination }) {
  const [selectedDestination, setSelectedDestination] = useState(DESTINATIONS_CIRCULAR[0]);

  const handleSelect = (item) => {
    setSelectedDestination(item);
    if (onSelectDestination) {
      onSelectDestination(item);
    }
  };

  return (
    <section id="destinations" className="py-24 sm:py-32 bg-ivory overflow-hidden relative">
      {/* Subtle decorative background watermarks */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 mb-12 sm:mb-16 text-center">
        <p className="text-xs uppercase tracking-[0.25em] text-gold font-semibold mb-3">
          The Subcontinent's Jewels
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-forest font-normal tracking-tight leading-tight mb-4">
          <FoldText
            text="Iconic Destinations of India"
            foldStyle="paper"
            splitBy="word"
            hinge="top"
            trigger="scroll"
            duration={0.7}
          />
        </h2>
        <p className="text-base text-charcoal/80 font-light max-w-2xl mx-auto font-sans">
          From Rajasthan's golden citadels and Udaipur's lake palaces to the ancient ghats of Varanasi and Kerala's emerald waterways, immerse yourself in our interactive 3D destination cylinder.
        </p>
      </div>

      {/* React Bits CircularGallery Component */}
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-8">
        <CircularGallery
          items={DESTINATIONS_CIRCULAR}
          bend={3}
          textColor="#ffffff"
          borderRadius={20}
          scrollSpeed={1.1}
          onSelect={handleSelect}
        />
      </div>

      {/* Selected Destination Feature Pill */}
      {selectedDestination && (
        <div className="max-w-xl mx-auto mt-8 px-6 text-center">
          <div className="inline-flex items-center gap-2 text-xs text-forest/70 uppercase tracking-widest font-semibold mb-1">
            <MapPin className="w-3.5 h-3.5 text-gold" />
            <span>{selectedDestination.subtitle}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-serif text-forest font-medium mb-2">
            {selectedDestination.title}
          </h3>
          <p className="text-sm text-charcoal/75 font-light leading-relaxed">
            {selectedDestination.description}
          </p>
        </div>
      )}
    </section>
  );
}

