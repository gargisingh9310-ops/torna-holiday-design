import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ArrowLeft, ArrowRight, MoveHorizontal } from 'lucide-react';
import './CircularGallery.css';

export default function CircularGallery({
  items = [],
  bend = 3,
  textColor = '#ffffff',
  borderRadius = 20,
  scrollSpeed = 1,
  className = '',
  onSelect = null
}) {
  const containerRef = useRef(null);
  const cylinderRef = useRef(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const currentRotationRef = useRef(0);
  const targetRotationRef = useRef(0);
  const velocityRef = useRef(0);
  const animationFrameRef = useRef(null);
  const lastTouchTimeRef = useRef(0);

  const [activeIndex, setActiveIndex] = useState(0);

  const numItems = items.length || 1;
  const anglePerItem = 360 / numItems;

  // Responsive radius calculation
  const getRadius = useCallback(() => {
    if (typeof window === 'undefined') return 600;
    const isMobile = window.innerWidth < 768;
    return isMobile ? 380 : 580 * (bend / 3);
  }, [bend]);

  const [radius, setRadius] = useState(getRadius);

  useEffect(() => {
    const handleResize = () => setRadius(getRadius());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [getRadius]);

  // Inertia and continuous render loop
  useEffect(() => {
    const loop = () => {
      // Lerp target to current
      currentRotationRef.current += (targetRotationRef.current - currentRotationRef.current) * 0.08;

      // Apply decay if not dragging
      if (!isDraggingRef.current) {
        targetRotationRef.current += velocityRef.current;
        velocityRef.current *= 0.94; // inertia decay

        // Subtle gentle drift when almost stationary
        if (Math.abs(velocityRef.current) < 0.01 && Date.now() - lastTouchTimeRef.current > 3000) {
          targetRotationRef.current += 0.04;
        }
      }

      if (cylinderRef.current) {
        cylinderRef.current.style.transform = `rotateY(${-currentRotationRef.current}deg)`;
      }

      // Update active index
      const normalized = Math.round(currentRotationRef.current / anglePerItem) % numItems;
      const index = (normalized + numItems) % numItems;
      setActiveIndex(index);

      animationFrameRef.current = requestAnimationFrame(loop);
    };

    animationFrameRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationFrameRef.current);
  }, [anglePerItem, numItems]);

  // Pointer drag handlers
  const handlePointerDown = (e) => {
    isDraggingRef.current = true;
    startXRef.current = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    velocityRef.current = 0;
    lastTouchTimeRef.current = Date.now();
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const deltaX = clientX - startXRef.current;
    startXRef.current = clientX;

    const rotationDelta = (deltaX / window.innerWidth) * 180 * scrollSpeed;
    targetRotationRef.current -= rotationDelta;
    velocityRef.current = -rotationDelta * 0.45;
    lastTouchTimeRef.current = Date.now();
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
    lastTouchTimeRef.current = Date.now();
  };

  const handleWheel = (e) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      e.preventDefault();
      targetRotationRef.current += (e.deltaX * 0.2) * scrollSpeed;
      lastTouchTimeRef.current = Date.now();
    }
  };

  const rotateTo = (index) => {
    targetRotationRef.current = index * anglePerItem;
    velocityRef.current = 0;
    lastTouchTimeRef.current = Date.now();
  };

  const handlePrev = () => {
    targetRotationRef.current -= anglePerItem;
    lastTouchTimeRef.current = Date.now();
  };

  const handleNext = () => {
    targetRotationRef.current += anglePerItem;
    lastTouchTimeRef.current = Date.now();
  };

  return (
    <div
      ref={containerRef}
      className={`circular-gallery-wrapper ${className}`}
      onMouseDown={handlePointerDown}
      onMouseMove={handlePointerMove}
      onMouseUp={handlePointerUp}
      onMouseLeave={handlePointerUp}
      onTouchStart={handlePointerDown}
      onTouchMove={handlePointerMove}
      onTouchEnd={handlePointerUp}
      onWheel={handleWheel}
    >
      <div className="circular-gallery-viewport">
        <div ref={cylinderRef} className="circular-gallery-cylinder">
          {items.map((item, i) => {
            const cardAngle = i * anglePerItem;
            return (
              <div
                key={i}
                className="circular-gallery-card group"
                style={{
                  transform: `rotateY(${cardAngle}deg) translateZ(${radius}px)`,
                  borderRadius: `${borderRadius}px`
                }}
                onClick={() => {
                  if (Math.abs(velocityRef.current) < 0.2) {
                    rotateTo(i);
                    if (onSelect) onSelect(item);
                  }
                }}
              >
                <img
                  src={item.image}
                  alt={item.title || item.text}
                  className="circular-gallery-img"
                  loading="lazy"
                />
                <div className="circular-gallery-gradient" />
                <div className="circular-gallery-info">
                  <span className="text-[10px] uppercase tracking-widest text-gold font-semibold block mb-1">
                    {item.subtitle || item.state || 'Destination'}
                  </span>
                  <h4 className="text-xl font-serif font-medium leading-tight text-white mb-1">
                    {item.title || item.text}
                  </h4>
                  {item.description && (
                    <p className="text-xs text-white/80 line-clamp-2 font-light">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Subtle Drag Hint */}
      <div className="circular-gallery-hint">
        <MoveHorizontal className="w-3.5 h-3.5 text-gold animate-pulse" />
        <span>Drag or Swipe to Rotate</span>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute top-1/2 -translate-y-1/2 left-4 md:left-8 z-30">
        <button
          onClick={handlePrev}
          aria-label="Previous destination"
          className="w-11 h-11 rounded-full bg-ivory/85 backdrop-blur-md text-forest hover:bg-forest hover:text-ivory border border-gold/30 flex items-center justify-center transition-all shadow-md active:scale-95"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 right-4 md:right-8 z-30">
        <button
          onClick={handleNext}
          aria-label="Next destination"
          className="w-11 h-11 rounded-full bg-ivory/85 backdrop-blur-md text-forest hover:bg-forest hover:text-ivory border border-gold/30 flex items-center justify-center transition-all shadow-md active:scale-95"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

