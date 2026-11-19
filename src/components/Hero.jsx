import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowDown, ArrowUpRight } from 'lucide-react';

export default function Hero({ onOpenPlanTrip }) {
  const heroRef = useRef(null);
  const videoRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const textRef = useRef(null);
  const ctaRef = useRef(null);
  const scrollIndicatorRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Subtle video zoom
      if (videoRef.current) {
        gsap.fromTo(
          videoRef.current,
          { scale: 1.14 },
          { scale: 1.0, duration: 9, ease: 'sine.out' }
        );
      }

      // First line enters from left with fade up
      tl.fromTo(
        line1Ref.current,
        { opacity: 0, x: -40, y: 30 },
        { opacity: 1, x: 0, y: 0, duration: 1.1, delay: 0.3 }
      )
      // Second line reveals with slight delay
      .fromTo(
        line2Ref.current,
        { opacity: 0, x: -30, y: 30 },
        { opacity: 1, x: 0, y: 0, duration: 1.1 },
        '-=0.7'
      )
      // Supporting paragraph fades upward
      .fromTo(
        textRef.current,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.9 },
        '-=0.6'
      )
      // Buttons animate sequentially
      .fromTo(
        ctaRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.15 },
        '-=0.5'
      )
      // Scroll indicator
      .fromTo(
        scrollIndicatorRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.3'
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToNext = () => {
    const nextSection = document.getElementById('scroll-expand-section');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToPackages = () => {
    const pkgSection = document.getElementById('packages');
    if (pkgSection) {
      pkgSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative w-full h-screen min-h-[680px] flex items-center justify-center overflow-hidden bg-forest-dark"
    >
      {/* Background Cinematic Video with Fallback Poster */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=2000&q=85"
          className="w-full h-full object-cover will-change-transform"
        >
          {/* Cinematic Taj Mahal dawn flight */}
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-taj-mahal-in-the-sunrise-light-42412-large.mp4"
            type="video/mp4"
          />
        </video>

        {/* Elegant Dark Vignette Overlay for Crisp Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/90 via-forest-deep/45 to-forest-deep/60" />
        <div className="absolute inset-0 bg-radial-vignette opacity-50 pointer-events-none" />
      </div>

      {/* Hero Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 sm:px-8 text-center text-ivory pt-16 sm:pt-20">
        {/* Curated Pre-title */}
        <div className="mb-4 sm:mb-6">
          <span className="text-[11px] sm:text-xs font-sans tracking-[0.28em] uppercase text-gold font-semibold">
            Bespoke Luxury Expeditions • Torna Holidays
          </span>
        </div>

        {/* Main Editorial Heading */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-normal tracking-tight leading-[1.08] mb-6 sm:mb-8 text-white">
          <span ref={line1Ref} className="block">
            Discover India.
          </span>
          <span ref={line2Ref} className="block italic font-editorial text-gold-pale">
            Beyond the Ordinary.
          </span>
        </h1>

        {/* Supporting Text */}
        <p
          ref={textRef}
          className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-ivory/85 font-light leading-relaxed mb-10 sm:mb-12 font-sans"
        >
          Journey through timeless heritage, extraordinary landscapes and unforgettable experiences, thoughtfully curated for you.
        </p>

        {/* CTA Buttons */}
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
        >
          <button
            onClick={scrollToPackages}
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-gold text-white font-sans text-xs uppercase tracking-widest font-semibold hover:bg-gold-dark transition-all duration-300 shadow-xl"
          >
            <span>Explore Journeys</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>

          <button
            onClick={onOpenPlanTrip}
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-transparent text-white border border-white/60 font-sans text-xs uppercase tracking-widest font-semibold hover:bg-white hover:text-forest transition-all duration-300"
          >
            <span>Plan Your Trip</span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-gold transition-transform group-hover:scale-150" />
          </button>
        </div>
      </div>

      {/* Minimal Scroll Indicator */}
      <button
        ref={scrollIndicatorRef}
        onClick={scrollToNext}
        aria-label="Scroll to discover"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-ivory/70 hover:text-gold transition-colors focus:outline-none"
      >
        <span className="text-[10px] uppercase tracking-[0.25em] font-sans">
          Scroll to Discover
        </span>
        <div className="w-7 h-11 rounded-full border border-ivory/30 flex items-start justify-center p-1.5">
          <div className="w-1.5 h-2.5 rounded-full bg-gold animate-scroll-indicator" />
        </div>
      </button>
    </section>
  );
}

