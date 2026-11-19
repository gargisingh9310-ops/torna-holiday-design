import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Compass } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function TravelCTA({ onOpenPlanTrip }) {
  const ctaRef = useRef(null);
  const videoRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    // Explicitly guarantee video playback starts
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.warn('Autoplay prevented or paused:', err);
      });
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Subtle cinematic video zoom
      if (videoRef.current) {
        gsap.fromTo(
          videoRef.current,
          { scale: 1.12 },
          {
            scale: 1.0,
            duration: 8,
            ease: 'sine.out',
            scrollTrigger: {
              trigger: ctaRef.current,
              start: 'top 80%',
              once: true
            }
          }
        );
      }

      // Text stagger reveal
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current.children,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: ctaRef.current,
              start: 'top 75%',
              once: true
            }
          }
        );
      }
    }, ctaRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ctaRef}
      className="relative w-full min-h-[460px] sm:min-h-[580px] lg:min-h-[720px] flex items-center justify-center overflow-hidden bg-forest-dark"
    >
      {/* Background Cinematic Short Travel Video */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="https://images.unsplash.com/photo-1590766940554-634a7ed41450?auto=format&fit=crop&w=2200&q=85"
          className="w-full h-full object-cover will-change-transform"
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-palace-in-udaipur-india-42416-large.mp4"
            type="video/mp4"
          />
        </video>

        {/* Sophisticated Dark Vignette Overlay for Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/95 via-forest-deep/60 to-forest-deep/70" />
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 max-w-4xl mx-auto px-4 sm:px-8 text-center text-ivory py-14 sm:py-20"
      >
        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-white/10 backdrop-blur-md text-gold text-[10px] sm:text-xs uppercase tracking-[0.22em] sm:tracking-[0.25em] font-semibold mb-4 sm:mb-6 border border-white/15">
          <Compass className="w-3.5 h-3.5" />
          <span>Curated Private Travel</span>
        </div>

        <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-normal text-white leading-tight mb-4 sm:mb-6 tracking-tight">
          Your India Story Starts Here.
        </h2>

        <p className="text-sm sm:text-lg md:text-xl text-ivory/85 font-light max-w-2xl mx-auto leading-relaxed mb-8 sm:mb-10 font-sans px-2 sm:px-0">
          From royal escapes to hidden gems, let us create a journey you'll remember forever.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-xs sm:max-w-none mx-auto">
          <button
            onClick={onOpenPlanTrip}
            className="w-full sm:w-auto group inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-3.5 sm:py-4 bg-gold text-white font-sans text-xs uppercase tracking-widest font-semibold hover:bg-gold-light transition-all duration-300 shadow-2xl"
          >
            <span>Plan Your Journey</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </button>
        </div>
      </div>
    </section>
  );
}
