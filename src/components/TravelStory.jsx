import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FoldText from '../animations/FoldText';
import { Compass, Sparkles, HeartHandshake } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function TravelStory() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Parallax scroll on left image
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          yPercent: -8,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
          }
        });
      }

      // Fade up on content
      if (textRef.current) {
        gsap.fromTo(
          textRef.current.children,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: textRef.current,
              start: 'top 80%',
              once: true
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const highlights = [
    {
      num: "01",
      title: "Thoughtfully Curated Journeys",
      desc: "Tailored around your personal pace, cultural curiosities, and aesthetic sensibilities, with private chauffeured travel and historic palace stays.",
      icon: Compass
    },
    {
      num: "02",
      title: "Authentic Local Experiences",
      desc: "Private access to generational master artisans, closed-door palace libraries, secluded wildlife preserves, and private morning ritual blessings.",
      icon: Sparkles
    },
    {
      num: "03",
      title: "Memorable Travel Moments",
      desc: "From starlit rooftop dinners overlooking Jaipur's illuminated ramparts to serene private canoe journeys through sleepy Kerala backwaters.",
      icon: HeartHandshake
    }
  ];

  return (
    <section
      id="story"
      ref={sectionRef}
      className="py-16 sm:py-24 lg:py-36 bg-ivory-light relative overflow-hidden border-t border-sand/40"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Left Column: Large Premium Travel Photograph */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-forest-dark h-[340px] sm:h-[480px] lg:h-[620px]">
              <img
                ref={imageRef}
                src="https://images.unsplash.com/photo-1566873535350-a3f5d4a804b7?auto=format&fit=crop&w=1400&q=85"
                alt="Authentic Rajasthan Palace Heritage Architecture"
                className="w-full h-[115%] object-cover object-center will-change-transform"
                loading="eager"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1638645847133-b3fe89828148?auto=format&fit=crop&w=1400&q=85";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/80 via-transparent to-transparent pointer-events-none" />

              {/* Floating Curated Label */}
              <div className="absolute bottom-4 left-4 right-4 p-4 sm:bottom-8 sm:left-8 sm:right-8 sm:p-6 bg-forest-dark/85 backdrop-blur-md rounded-xl border border-white/15 text-ivory">
                <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-semibold block mb-1">
                  Private Guest Escort
                </span>
                <p className="text-xs sm:text-sm font-light text-ivory/90 leading-snug">
                  "Every destination in India has two faces: the one shown to tourists, and the one revealed to those who know how to listen."
                </p>
              </div>
            </div>

            {/* Subtle decorative gold corner frame */}
            <div className="hidden sm:block absolute -top-4 -left-4 w-28 h-28 border-t-2 border-l-2 border-gold/40 pointer-events-none rounded-tl-xl" />
          </div>

          {/* Right Column: Editorial Text & 3 Highlights */}
          <div ref={textRef} className="lg:col-span-6 flex flex-col justify-center">
            <p className="text-xs uppercase tracking-[0.25em] text-gold font-semibold mb-2 sm:mb-3">
              The Torna Philosophy
            </p>

            <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif text-forest font-normal tracking-tight leading-tight mb-4 sm:mb-6">
              <FoldText
                text="Travel Deeper. Experience More."
                foldStyle="paper"
                splitBy="word"
                hinge="top"
                trigger="scroll"
                duration={0.7}
              />
            </h2>

            <p className="text-sm sm:text-base md:text-lg text-charcoal/80 font-light leading-relaxed mb-6 sm:mb-10 font-sans">
              Every journey tells a story. Discover India's remarkable destinations through experiences that connect you with its heritage, people, landscapes and culture.
            </p>

            {/* 3 Highlights */}
            <div className="space-y-3 sm:space-y-5">
              {highlights.map((item) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={item.num}
                    className="flex items-start gap-3.5 sm:gap-5 p-3.5 sm:p-5 rounded-xl bg-ivory/60 border border-sand hover:border-gold/50 transition-colors duration-300"
                  >
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-forest text-gold flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                      <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 text-gold-pale" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-0.5 sm:mb-1">
                        <span className="text-xs font-mono text-gold font-semibold">{item.num}</span>
                        <h4 className="text-sm sm:text-base font-serif font-medium text-forest">
                          {item.title}
                        </h4>
                      </div>
                      <p className="text-xs sm:text-sm text-charcoal/75 font-light leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

