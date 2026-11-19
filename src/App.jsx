import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ScrollExpand from './animations/ScrollExpand';
import Experiences from './components/Experiences';
import FeaturedPackages from './components/FeaturedPackages';
import Destinations from './components/Destinations';
import TravelStory from './components/TravelStory';
import PhotographicTapestry from './components/PhotographicTapestry';
import TravelCTA from './components/TravelCTA';
import Footer from './components/Footer';
import PackageDetailModal from './components/PackageDetailModal';
import TripPlannerModal from './components/TripPlannerModal';

export default function App() {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [plannerOpen, setPlannerOpen] = useState(false);
  const [plannerInitialPkg, setPlannerInitialPkg] = useState(null);

  const handleOpenPlanTrip = (pkg = null) => {
    setPlannerInitialPkg(pkg);
    setPlannerOpen(true);
  };

  const handleSelectExperience = (exp) => {
    // Open trip planner pre-filled with the experience
    setPlannerInitialPkg({ title: `${exp.heading || exp.title} (${exp.category || exp.subtitle})` });
    setPlannerOpen(true);
  };

  return (
    <div className="min-h-screen bg-ivory text-charcoal font-sans antialiased selection:bg-forest selection:text-ivory">
      {/* Fixed Luxury Navigation */}
      <Navbar onOpenPlanTrip={() => handleOpenPlanTrip(null)} />

      <main>
        {/* SECTION 1: Cinematic Hero */}
        <Hero onOpenPlanTrip={() => handleOpenPlanTrip(null)} />

        {/* SECTION 2: ScrollExpand Cinematic Experience */}
        <div id="scroll-expand-section">
          <ScrollExpand
            mediaSrc="https://images.unsplash.com/photo-1640783649816-a62636fb3018?auto=format&fit=crop&w=2200&q=85"
            mediaType="image"
            heading={`India is not just a destination.\nIt's a world of experiences.`}
            subheading="From the marble fortresses of Rajasthan to the sacred temple ghats and tranquil coconut lagoons, every horizon holds an invitation to pause, breathe, and wonder."
            locationBadge="Lake Pichola • Udaipur, Rajasthan"
          />
        </div>

        {/* SECTION 3: Curated Private Expeditions - Featured Travel Packages (ScrollStack) */}
        <Experiences onSelectPackage={(pkg) => setSelectedPackage(pkg)} />

        {/* SECTION 4: The Living Diversity - One Country. Endless Stories. (Sticky Showcase) */}
        <FeaturedPackages onSelectDestination={handleSelectExperience} />

        {/* SECTION 5: CircularGallery Experience */}
        <Destinations />

        {/* SECTION 6: A Different Way to Discover India */}
        <TravelStory />

        {/* SECTION 7: Photographic Tapestry */}
        <PhotographicTapestry />

        {/* SECTION 8: Final Travel CTA */}
        <TravelCTA onOpenPlanTrip={() => handleOpenPlanTrip(null)} />
      </main>

      {/* SECTION 9: Footer */}
      <Footer onOpenPlanTrip={() => handleOpenPlanTrip(null)} />

      {/* Interactive Package Detail Modal */}
      {selectedPackage && (
        <PackageDetailModal
          pkg={selectedPackage}
          onClose={() => setSelectedPackage(null)}
          onOpenPlanTrip={(pkg) => handleOpenPlanTrip(pkg)}
        />
      )}

      {/* Interactive Bespoke Trip Planner Modal */}
      <TripPlannerModal
        isOpen={plannerOpen}
        onClose={() => {
          setPlannerOpen(false);
          setPlannerInitialPkg(null);
        }}
        initialPackage={plannerInitialPkg}
      />
    </div>
  );
}

