import React, { useState, useRef, useEffect } from 'react';
import { MapPin, ArrowUpRight, ExternalLink, Sparkles, CheckCircle2, ChevronDown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FoldText from '../animations/FoldText';

gsap.registerPlugin(ScrollTrigger);

export const LIVING_DIVERSITY_DESTINATIONS = [
  {
    id: "rajasthan",
    num: "01",
    title: "Rajasthan – The Land of Royalty",
    location: "Jaipur • Udaipur • Jodhpur • Jaisalmer",
    tag: "Princely Heritage",
    image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1600&q=85",
    summary: "Step into a realm of majestic desert fortresses, ornate royal palaces, vibrant bazaars, and imperial hospitality across Rajasthan's fabled kingdoms.",
    highlights: [
      "Stately ramparts of Amer Fort and the Palace of Winds in Jaipur",
      "Sunset boat cruise past Jag Mandir on shimmering Lake Pichola, Udaipur",
      "Golden sandstone living citadel of Sonar Qila in Jaisalmer",
      "Bespoke dining experience inside an authentic heritage palace"
    ],
    link: "https://tornaholidays.com/packages/royal-rajputana"
  },
  {
    id: "agra",
    num: "02",
    title: "Agra – The Timeless Taj Mahal",
    location: "Agra, Uttar Pradesh",
    tag: "Imperial Grandeur",
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1600&q=85",
    summary: "Discover the immortal white marble wonder of the Taj Mahal, the fortified walls of Agra Fort, and the exquisite monuments of Mughal empire.",
    highlights: [
      "Private dawn viewing of the Taj Mahal bathed in rose-gold morning light",
      "Imperial courtyards and marble pavilions of Agra Fort",
      "Sunset reflections from Mehtab Bagh gardens across the Yamuna River",
      "Ghost capital of Emperor Akbar at UNESCO World Heritage Fatehpur Sikri"
    ],
    link: "https://tornaholidays.com/packages/golden-triangle-a-luxurious-journey-through-india-s-heritage"
  },
  {
    id: "kerala",
    num: "03",
    title: "Kerala – God's Own Country",
    location: "Alleppey • Munnar • Kochi",
    tag: "Tropical Serenity",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1600&q=85",
    summary: "Glide along emerald palm-fringed backwaters, breathe the crisp air of Munnar's mist-veiled tea estates, and restore in tranquil Ayurvedic sanctuaries.",
    highlights: [
      "Private luxury kettuvallam houseboat cruise through serene backwaters",
      "Emerald tea estate walks and organic spice tastings in Munnar",
      "Time-honored Ayurvedic wellness therapies and massage rituals",
      "Colonial seaside heritage and Chinese fishing nets of Fort Kochi"
    ],
    link: "https://tornaholidays.com/packages/splendors-of-india-nepal"
  },
  {
    id: "varanasi",
    num: "04",
    title: "Varanasi – The Spiritual Heart of India",
    location: "Varanasi, Uttar Pradesh",
    tag: "Sacred Antiquity",
    image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1600&q=85",
    summary: "Experience one of the world's oldest living cities, where ancient riverside ghats, mesmerizing fire Aarti rituals, and timeless spirituality captivate the soul.",
    highlights: [
      "Private sunrise wooden boat cruise gliding past historic sacred ghats",
      "Evening Ganga Aarti fire ceremonies witnessed from tranquil river waters",
      "Scholar-guided walk through ancient temple alleys and artisan silk ateliers",
      "Pilgrimage to Deer Park in Sarnath where Buddha preached his first sermon"
    ],
    link: "https://tornaholidays.com/packages/temples-and-tigers"
  },
  {
    id: "kashmir",
    num: "05",
    title: "Kashmir – Paradise on Earth",
    location: "Srinagar • Gulmarg • Pahalgam",
    tag: "Himalayan Sanctuary",
    image: "https://images.unsplash.com/photo-1569852837213-00d97a707a83?auto=format&fit=crop&w=1600&q=85",
    summary: "Savor the poetic charm of Kashmir with cedar-wood houseboats on mirror-like Dal Lake, alpine pine meadows in Gulmarg, and soaring Himalayan peaks.",
    highlights: [
      "Private luxury carved-wood houseboat stay with dedicated butler on Dal Lake",
      "Gondola cable car ascent to Mt. Apharwat in Gulmarg with snow vistas",
      "Dawn shikara glide through vibrant floating artisan and flower markets",
      "Historic terraced Mughal pleasure gardens of Shalimar and Nishat"
    ],
    link: "https://tornaholidays.com/packages/kashmir-paradise-escape"
  },
  {
    id: "ranthambore",
    num: "06",
    title: "Ranthambore – Into the Wild",
    location: "Sawai Madhopur, Rajasthan",
    tag: "Royal Wilderness",
    image: "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=1600&q=85",
    summary: "Track the elusive Royal Bengal Tiger on exhilarating 4x4 safaris traversing ancient 10th-century fortress ruins, watering holes, and untamed jungle reserves.",
    highlights: [
      "Private 4x4 open-jeep tiger tracking safaris with expert master naturalists",
      "Ancient ramparts and cliff-top vistas of UNESCO Ranthambore Fort",
      "Luxury wilderness tented encampments with starlit open-fire barbecues",
      "Birdwatching and wildlife photography at Padam Talao and Rajbagh lakes"
    ],
    link: "https://tornaholidays.com/packages/palaces-and-tigers"
  },
  {
    id: "himachal",
    num: "07",
    title: "Himachal Pradesh – Mountains & Escape",
    location: "Shimla • Manali • Dharamshala",
    tag: "Alpine Retreat",
    image: "https://images.unsplash.com/photo-1597167231350-d057a45dc868?auto=format&fit=crop&w=1600&q=85",
    summary: "Breathe the invigorating pine scent of high-altitude valleys, explore British colonial promenades in Shimla, and find serenity in Tibetan monasteries.",
    highlights: [
      "Colonial architectural promenade along Shimla's historic British Ridge",
      "Scenic mountain crossing through the high-altitude Atal Tunnel to Lahaul",
      "Tranquil Tibetan monasteries and spiritual aura of Dharamshala",
      "Private tastings at century-old organic Kangra valley tea plantations"
    ],
    link: "https://tornaholidays.com/packages/himachal-himalayan-retreat"
  },
  {
    id: "bodh-gaya",
    num: "08",
    title: "Bodh Gaya – A Journey of Enlightenment",
    location: "Bodh Gaya, Bihar",
    tag: "Buddhist Pilgrimage",
    image: "/images/destinations/buddhist-trail-mahabodhi.jpg",
    summary: "Walk in the footsteps of Siddhartha Gautama at the sacred UNESCO World Heritage Mahabodhi Temple, where enlightenment was attained under the Bodhi Tree.",
    highlights: [
      "Quiet dawn meditation beneath the sacred Bodhi Tree at Mahabodhi Temple",
      "Ancient monumental brick ruins of 5th-century Nalanda University",
      "Ascent to the white Peace Pagoda (Vishwa Shanti Stupa) in Rajgir",
      "Serene contemplation among international monasteries from across Asia"
    ],
    link: "https://tornaholidays.com/packages/path-of-enlightenment"
  }
];

export default function FeaturedPackages({ onSelectDestination }) {
  const [selectedDestination, setSelectedDestination] = useState(LIVING_DIVERSITY_DESTINATIONS[0]);
  const showcaseRef = useRef(null);
  const scrollViewportRef = useRef(null);
  const listRef = useRef(null);
  const leftCardContentRef = useRef(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(min-width: 1024px)', () => {
      const showcase = showcaseRef.current;
      const viewport = scrollViewportRef.current;
      const list = listRef.current;

      if (!showcase || !viewport || !list) return;

      // Scroll distance: total height of 8 destination cards minus the 4-card visible viewport height
      const scrollDistance = list.scrollHeight - viewport.clientHeight;

      if (scrollDistance <= 0) return;

      const anim = gsap.to(list, {
        y: -scrollDistance,
        ease: 'none',
        scrollTrigger: {
          trigger: showcase,
          pin: showcase,
          start: 'top 85px',
          end: () => `+=${Math.max(scrollDistance * 1.25, 900)}`,
          scrub: 0.7,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        if (anim.scrollTrigger) anim.scrollTrigger.kill();
        anim.kill();
      };
    });

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 350);

    return () => {
      clearTimeout(refreshTimer);
      mm.revert();
    };
  }, []);

  // Smooth entrance transition on left card when selected destination changes
  useEffect(() => {
    if (leftCardContentRef.current) {
      gsap.fromTo(
        leftCardContentRef.current.querySelectorAll('.animate-on-change'),
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.35, stagger: 0.04, ease: 'power2.out' }
      );
    }
  }, [selectedDestination.id]);

  const handleSelectDestination = (dest) => {
    setSelectedDestination(dest);

    // On mobile & tablet screens, smoothly scroll back to the main content div
    if (window.innerWidth < 1024 && leftCardContentRef.current) {
      const navOffset = 76;
      const rect = leftCardContentRef.current.getBoundingClientRect();
      const targetScrollY = window.pageYOffset + rect.top - navOffset;

      window.scrollTo({
        top: Math.max(0, targetScrollY),
        behavior: 'smooth'
      });
    }
  };

  const handleDestinationAction = (dest) => {
    if (onSelectDestination) {
      onSelectDestination(dest);
    }
  };

  return (
    <section
      id="experiences"
      className="py-16 sm:py-20 lg:py-24 bg-ivory-light border-t border-b border-sand/40 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4 sm:gap-6">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.25em] text-gold font-semibold mb-2 sm:mb-3">
              The Living Diversity
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-forest font-normal tracking-tight leading-tight mb-3 sm:mb-4">
              <FoldText
                text="One Country. Endless Stories."
                foldStyle="paper"
                splitBy="word"
                hinge="top"
                trigger="scroll"
                duration={0.7}
              />
            </h2>
            <p className="text-sm sm:text-base text-charcoal/80 font-light max-w-xl font-sans">
              From royal palaces and colourful traditions to peaceful backwaters and majestic mountains, discover the many worlds that make India extraordinary.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto">
            <span className="text-[11px] sm:text-xs uppercase tracking-widest text-charcoal/60 font-medium">
              8 Iconic Regions
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-gold" />
            <span className="text-[11px] sm:text-xs uppercase tracking-widest text-gold font-semibold">
              Curated Discovery
            </span>
          </div>
        </div>

        {/* Pinned Destination Showcase Grid Container */}
        <div ref={showcaseRef} className="relative will-change-transform">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            {/* LEFT SIDE: One Large Featured Destination Card (Pinned while right scrolls on desktop) */}
            <div
              ref={leftCardContentRef}
              className="lg:col-span-7 relative rounded-2xl overflow-hidden bg-forest-dark min-h-[460px] sm:min-h-[520px] lg:h-[582px] shadow-2xl flex flex-col justify-between p-5 sm:p-8 lg:p-10 border border-sand/40 group"
            >
              {/* Background Image with smooth transition */}
              <img
                key={selectedDestination.id}
                src={selectedDestination.image}
                alt={selectedDestination.title}
                className="absolute inset-0 w-full h-full object-cover img-editorial-zoom will-change-transform transition-all duration-700 ease-out"
                loading="lazy"
                onError={(e) => {
                  if (!e.target.dataset.fallback) {
                    e.target.dataset.fallback = 'true';
                    e.target.src = '/images/destinations/royal-potpourri-haveli.jpg';
                  }
                }}
              />
              {/* High-contrast gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-dark/70 to-forest-dark/30 pointer-events-none" />

              {/* Top Bar of Left Card */}
              <div className="relative z-10 flex items-center justify-between animate-on-change">
                <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs uppercase tracking-wider font-semibold px-2.5 sm:px-3 py-1 sm:py-1.5 bg-forest-dark/80 backdrop-blur-md text-ivory rounded-full border border-white/15">
                  <Sparkles className="w-3 h-3 text-gold" />
                  <span>{selectedDestination.tag}</span>
                </span>

                <span className="text-[11px] sm:text-xs font-mono tracking-wider px-2.5 sm:px-3 py-1 bg-white/10 backdrop-blur-md text-ivory/90 rounded-md border border-white/10">
                  {selectedDestination.num} / 08
                </span>
              </div>

              {/* Bottom Content of Left Card */}
              <div className="relative z-10 text-ivory space-y-3 sm:space-y-4 pt-6">
                <div className="animate-on-change space-y-1.5 sm:space-y-2">
                  <div className="flex items-center gap-1.5 sm:gap-2 text-gold-pale text-[11px] sm:text-xs tracking-wider uppercase font-semibold">
                    <MapPin className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                    <span>{selectedDestination.location}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif font-medium text-white leading-tight">
                    {selectedDestination.title}
                  </h3>

                  <p className="text-xs sm:text-sm md:text-base text-ivory/85 font-light leading-relaxed max-w-xl">
                    {selectedDestination.summary}
                  </p>
                </div>

                {/* Highlights List */}
                <div className="animate-on-change pt-2 border-t border-white/15 grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-ivory/80">
                  {selectedDestination.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 sm:gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-gold flex-shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{highlight}</span>
                    </div>
                  ))}
                </div>

                {/* Action CTA Buttons */}
                <div className="animate-on-change pt-1.5 sm:pt-2 flex flex-wrap items-center gap-2.5 sm:gap-3">
                  <button
                    onClick={() => handleDestinationAction(selectedDestination)}
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold px-4 sm:px-6 py-2.5 sm:py-3 bg-gold hover:bg-gold-light text-forest rounded-none shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
                  >
                    <span>Explore Destination</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  {selectedDestination.link && (
                    <a
                      href={selectedDestination.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-medium px-3.5 sm:px-4 py-2.5 sm:py-3 bg-white/10 hover:bg-white/20 text-ivory rounded-none border border-white/20 backdrop-blur-md transition-all duration-300"
                    >
                      <span>Related Journeys</span>
                      <ExternalLink className="w-3.5 h-3.5 text-gold-pale" />
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* RIGHT SIDE: Compact Destination Cards (Showing 4 at a time on desktop, scrollable through all 8) */}
            <div className="lg:col-span-5 relative w-full">
              {/* Header cue for scroll interaction */}
              <div className="flex items-center justify-between pb-2.5 mb-1 border-b border-sand/40">
                <span className="text-xs uppercase tracking-widest text-charcoal/70 font-semibold">
                  All Destinations ({LIVING_DIVERSITY_DESTINATIONS.length})
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] text-gold font-medium">
                  <span className="hidden lg:inline">Scroll to explore</span>
                  <span className="lg:hidden">Tap to view</span>
                  <ChevronDown className="w-3 h-3 animate-bounce" />
                </span>
              </div>

              {/* Viewport container fixed to height of 4 compact cards on desktop */}
              <div
                ref={scrollViewportRef}
                className="overflow-hidden lg:max-h-[545px] relative"
              >
                {/* Vertically animated list of 8 cards */}
                <div ref={listRef} className="space-y-2.5 sm:space-y-3 will-change-transform py-1">
                  {LIVING_DIVERSITY_DESTINATIONS.map((dest) => {
                    const isSelected = selectedDestination.id === dest.id;

                    return (
                      <div
                        key={dest.id}
                        role="button"
                        tabIndex={0}
                        aria-pressed={isSelected}
                        onClick={() => handleSelectDestination(dest)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleSelectDestination(dest);
                          }
                        }}
                        className={`group relative p-3 sm:p-4 rounded-xl border cursor-pointer transition-all duration-300 flex items-center gap-3 sm:gap-4 ${
                          isSelected
                            ? 'bg-forest text-ivory border-forest shadow-md ring-1 ring-gold/40'
                            : 'bg-white hover:bg-sand/30 border-sand/70 text-charcoal hover:border-gold/50'
                        }`}
                      >
                        {/* Thumbnail Image on Left */}
                        <div className="w-20 sm:w-28 md:w-32 h-16 sm:h-20 md:h-24 relative rounded-lg overflow-hidden flex-shrink-0 bg-forest-dark">
                          <img
                            src={dest.image}
                            alt={dest.title}
                            className="w-full h-full object-cover img-editorial-zoom will-change-transform transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                            onError={(e) => {
                              if (!e.target.dataset.fallback) {
                                e.target.dataset.fallback = 'true';
                                e.target.src = '/images/destinations/royal-potpourri-haveli.jpg';
                              }
                            }}
                          />
                          <div
                            className={`absolute inset-0 transition-colors ${
                              isSelected ? 'bg-gold/15' : 'bg-forest/15 group-hover:bg-transparent'
                            }`}
                          />
                          {/* Number Indicator on Thumbnail */}
                          <div className="absolute top-1 left-1 sm:top-1.5 sm:left-1.5">
                            <span className="text-[9px] sm:text-[10px] font-mono tracking-wider px-1.5 py-0.5 bg-forest-deep/80 backdrop-blur-md text-ivory rounded border border-white/10">
                              {dest.num}
                            </span>
                          </div>
                        </div>

                        {/* Content on Right */}
                        <div className="flex-1 min-w-0 pr-1">
                          <div className="flex items-center gap-2 mb-0.5 sm:mb-1">
                            <span
                              className={`text-[9px] sm:text-[10px] uppercase tracking-wider font-semibold line-clamp-1 ${
                                isSelected ? 'text-gold-pale' : 'text-gold'
                              }`}
                            >
                              {dest.location}
                            </span>
                          </div>

                          <h4
                            className={`text-xs sm:text-sm md:text-base font-serif font-medium leading-snug line-clamp-1 transition-colors ${
                              isSelected ? 'text-white' : 'text-forest group-hover:text-gold-dark'
                            }`}
                          >
                            {dest.title}
                          </h4>

                          <p
                            className={`text-[11px] sm:text-xs mt-0.5 sm:mt-1 line-clamp-1 font-light ${
                              isSelected ? 'text-ivory/80' : 'text-charcoal/70'
                            }`}
                          >
                            {dest.summary}
                          </p>

                          <div className="mt-1.5 sm:mt-2 flex items-center justify-between">
                            <span
                              className={`text-[9px] sm:text-[10px] uppercase tracking-wider font-medium px-1.5 sm:px-2 py-0.5 rounded ${
                                isSelected
                                  ? 'bg-white/10 text-ivory/90'
                                  : 'bg-sand/40 text-charcoal/70'
                              }`}
                            >
                              {dest.tag}
                            </span>

                            <span
                              className={`text-[11px] sm:text-xs font-semibold flex items-center gap-1 transition-transform ${
                                isSelected ? 'text-gold' : 'text-charcoal/50 group-hover:text-forest'
                              }`}
                            >
                              <span>{isSelected ? 'Viewing' : 'Select'}</span>
                              <ArrowUpRight className="w-3 h-3" />
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
