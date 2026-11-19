import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollStack, { ScrollStackItem } from '../animations/ScrollStack';
import FoldText from '../animations/FoldText';
import { FEATURED_PACKAGES } from '../data/packages';
import { Clock, MapPin, ArrowRight, ExternalLink, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Experiences({ onSelectPackage }) {
  const headerRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 85%',
              once: true
            }
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  const handleCardClick = (pkg) => {
    if (onSelectPackage) {
      onSelectPackage(pkg);
    }
  };

  return (
    <section id="packages" className="py-20 sm:py-28 bg-ivory relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header - Clean, editorial, no pill wraps */}
        <div ref={headerRef} className="max-w-3xl mb-14 sm:mb-18">
          <p className="text-xs uppercase tracking-[0.25em] text-gold font-semibold mb-3">
            Curated Private Expeditions
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-forest font-normal tracking-tight leading-tight mb-4">
            <FoldText
              text="Featured Travel Packages"
              foldStyle="paper"
              splitBy="word"
              hinge="top"
              trigger="scroll"
              duration={0.7}
              stagger={0.055}
              ease="power3.out"
            />
          </h2>
          <p className="text-base sm:text-lg text-charcoal/80 font-light leading-relaxed max-w-2xl font-sans">
            Handcrafted bespoke itineraries designed for discerning travelers, featuring heritage palaces, private scholar escorts, and uncompromising luxury.
          </p>
        </div>

        {/* ScrollStack Compact Horizontal Package Cards */}
        <ScrollStack
          itemDistance={110}
          itemStackDistance={0}
          stackPosition="clamp(76px, 10vh, 90px)"
          itemScale={0.02}
          baseScale={0.94}
          dimAmount={0.08}
          stackOffsetUp={8}
          maxStackOffsetUp={18}
          blurAmount={0}
          tiltAmount={0}
          rotationAmount={0}
          holdDistance={180}
          smoothScroll={false}
          snap={false}
          useWindowScroll={true}
        >
          {FEATURED_PACKAGES.map((pkg, index) => {
            const formattedIndex = String(index + 1).padStart(2, '0');
            return (
              <ScrollStackItem key={pkg.id} className="w-full">
                <div
                  className="scroll-stack-card group relative w-full max-w-[1140px] mx-auto h-auto md:h-[420px] flex flex-col md:flex-row bg-white border border-sand/70 rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-300"
                  onClick={() => handleCardClick(pkg)}
                >
                  {/* Dimming layer managed by ScrollStack */}
                  <div className="scroll-stack-dim-layer" />

                  {/* LEFT SIDE: Package Image (38-40% width portrait container) */}
                  <div className="relative w-full md:w-[38%] lg:w-[40%] h-64 sm:h-72 md:h-full overflow-hidden flex-shrink-0 bg-forest-dark">
                    <img
                      src={pkg.image}
                      alt={pkg.title}
                      className="w-full h-full object-cover object-center img-editorial-zoom will-change-transform"
                      loading="lazy"
                      onError={(e) => {
                        if (!e.target.dataset.fallback) {
                          e.target.dataset.fallback = 'true';
                          e.target.src = '/images/packages/royal-rajputana.jpg';
                        }
                      }}
                    />
                    {/* Subtle gradient vignette on image */}
                    <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/60 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-forest-dark/20" />

                    {/* Numerical index pill */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="text-[11px] font-mono tracking-wider px-2.5 py-1 bg-forest-dark/85 backdrop-blur-md text-ivory rounded-md border border-white/15">
                        {formattedIndex}
                      </span>
                    </div>

                    {/* Tag Badge */}
                    {pkg.tag && (
                      <div className="absolute top-4 right-4 z-10">
                        <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 bg-gold/90 text-white rounded-md shadow-sm">
                          <Sparkles className="w-2.5 h-2.5 text-white" />
                          <span>{pkg.tag}</span>
                        </span>
                      </div>
                    )}
                  </div>

                  {/* RIGHT SIDE: Package Content (60-62% width) */}
                  <div className="relative w-full md:w-[62%] lg:w-[60%] p-6 sm:p-7 md:p-8 lg:p-9 flex flex-col justify-between bg-white">
                    <div>
                      {/* Metadata row: Location & Duration */}
                      <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-charcoal/70 mb-2 sm:mb-2.5">
                        <span className="inline-flex items-center gap-1 text-gold font-semibold uppercase tracking-wider">
                          <MapPin className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                          <span>{pkg.location}</span>
                        </span>
                        <span className="text-sand-dark">•</span>
                        <span className="inline-flex items-center gap-1 text-forest font-semibold">
                          <Clock className="w-3.5 h-3.5 text-forest/70 flex-shrink-0" />
                          <span>{pkg.duration}</span>
                        </span>
                      </div>

                      {/* Package title as large editorial heading */}
                      <h3 className="text-2xl sm:text-2xl lg:text-3xl font-serif text-forest font-medium leading-snug mb-2 sm:mb-2.5 group-hover:text-gold-dark transition-colors duration-300">
                        {pkg.title}
                      </h3>

                      {/* Short engaging description */}
                      <p className="text-sm sm:text-sm lg:text-base text-charcoal/75 font-light leading-relaxed mb-3 line-clamp-3">
                        {pkg.summary}
                      </p>

                      {/* Highlights Pill Preview */}
                      {pkg.highlights && pkg.highlights.length > 0 && (
                        <div className="hidden sm:flex flex-wrap gap-2 mb-2">
                          {pkg.highlights.slice(0, 2).map((hl, i) => (
                            <span
                              key={i}
                              className="text-[11px] bg-sand/40 text-charcoal/80 px-2.5 py-1 rounded-md border border-sand/60 font-sans line-clamp-1"
                            >
                              • {hl}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Explore Package Buttons / Actions */}
                    <div className="pt-3.5 mt-2 border-t border-sand/40 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCardClick(pkg);
                        }}
                        className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] font-semibold text-gold group-hover:text-forest transition-colors duration-300 py-1"
                      >
                        <span>Explore Journey</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                      </button>

                      {pkg.link && (
                        <a
                          href={pkg.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-[11px] uppercase tracking-wider text-charcoal/50 hover:text-gold flex items-center gap-1 transition-colors py-1"
                          title="Open official package page"
                        >
                          <span>Official Itinerary</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </ScrollStackItem>
            );
          })}
        </ScrollStack>
      </div>
    </section>
  );
}
