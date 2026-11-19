import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ScrollExpand.css';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollExpand({
  mediaSrc = 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=2000&q=85',
  mediaType = 'image',
  posterSrc = '',
  heading = "India is not just a destination.\nIt's a world of experiences.",
  subheading = 'From royal palaces and ancient temples to tranquil backwaters and vibrant cities, discover the many faces of India.',
  locationBadge = 'Udaipur, Rajasthan • The Venice of the East',
  className = ''
}) {
  const containerRef = useRef(null);
  const stickyRef = useRef(null);
  const frameRef = useRef(null);
  const mediaRef = useRef(null);
  const headerRef = useRef(null);
  const contentRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const frame = frameRef.current;
    const media = mediaRef.current;
    const header = headerRef.current;
    const content = contentRef.current;
    const overlay = overlayRef.current;

    if (!container || !frame) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          invalidateOnRefresh: true,
        }
      });

      // Frame expands to 100vw and 100vh, border-radius collapses to 0
      tl.to(frame, {
        width: '100vw',
        height: '100vh',
        borderRadius: '0px',
        ease: 'power2.inOut',
        duration: 1
      }, 0);

      // Media scales from 1.08 to 1.0
      if (media) {
        tl.to(media, {
          scale: 1,
          ease: 'power1.out',
          duration: 1
        }, 0);
      }

      // Initial header fades out slightly as frame fills the view
      if (header) {
        tl.to(header, {
          opacity: 0,
          y: -30,
          ease: 'power2.in',
          duration: 0.4
        }, 0.2);
      }

      // Overlay darkens slightly
      if (overlay) {
        tl.to(overlay, {
          opacity: 0.75,
          ease: 'power1.inOut',
          duration: 1
        }, 0.3);
      }

      // Full-screen content reveals
      if (content) {
        tl.to(content, {
          opacity: 1,
          y: 0,
          ease: 'power2.out',
          duration: 0.5
        }, 0.65);
      }
    }, container);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section ref={containerRef} className={`scroll-expand-container ${className}`}>
      <div ref={stickyRef} className="scroll-expand-sticky">
        {/* Floating Top Header Before Full Expansion */}
        <div ref={headerRef} className="scroll-expand-header">
          <p className="text-xs md:text-sm uppercase tracking-widest text-gold font-semibold mb-2">
            The Living Canvas of India
          </p>
          <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-forest leading-tight font-medium whitespace-pre-line">
            {heading}
          </h2>
        </div>

        {/* Expanding Media Frame */}
        <div ref={frameRef} className="scroll-expand-media-frame">
          {mediaType === 'video' ? (
            <video
              ref={mediaRef}
              src={mediaSrc}
              poster={posterSrc}
              autoPlay
              muted
              loop
              playsInline
              className="scroll-expand-media"
            />
          ) : (
            <img
              ref={mediaRef}
              src={mediaSrc}
              alt="Immersive India Landscape"
              className="scroll-expand-media"
              loading="lazy"
            />
          )}

          <div ref={overlayRef} className="scroll-expand-overlay" />

          {/* Full-screen Revealed Content */}
          <div ref={contentRef} className="scroll-expand-content">
            <span className="inline-block text-[11px] sm:text-xs uppercase tracking-widest px-3 py-1 bg-white/20 backdrop-blur-md text-ivory rounded-full mb-2 sm:mb-3 border border-white/25">
              {locationBadge}
            </span>
            <h3 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-ivory font-medium max-w-3xl leading-snug mb-2 sm:mb-4">
              "India does not reveal herself all at once. She unfolds in silent moments."
            </h3>
            <p className="text-xs sm:text-base md:text-lg text-ivory/85 max-w-2xl font-light leading-relaxed">
              {subheading}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

