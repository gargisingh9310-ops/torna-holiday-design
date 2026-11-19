import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { useDrag } from '@use-gesture/react';
import { X, MapPin } from 'lucide-react';
import './DomeGallery.css';

export default function DomeGallery({
  images = [],
  fit = 0.55,
  minRadius = 320,
  grayscale = false,
  overlayBlurColor = 'rgba(24, 38, 34, 0.85)',
  openedImageWidth = 'min(90vw, 640px)',
  openedImageHeight = 'min(85vh, 600px)',
  autoRotate = true,
  className = ''
}) {
  const containerRef = useRef(null);
  const [radius, setRadius] = useState(minRadius);
  const [rotY, setRotY] = useState(0);
  const [rotX, setRotX] = useState(0);
  const [openedImage, setOpenedImage] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  const rotYRef = useRef(0);
  const rotXRef = useRef(0);
  const isDraggingRef = useRef(false);
  const dragDistanceRef = useRef(0);
  const animFrameRef = useRef(null);
  const velocityRef = useRef(0);

  // Synchronize state with refs
  useEffect(() => {
    rotYRef.current = rotY;
  }, [rotY]);
  useEffect(() => {
    rotXRef.current = rotX;
  }, [rotX]);

  // Responsive radius calculation
  useEffect(() => {
    const updateRadius = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth || window.innerWidth;
        const calculated = Math.round(width * fit);
        setRadius(Math.max(minRadius, Math.min(640, calculated)));
      }
    };
    updateRadius();
    window.addEventListener('resize', updateRadius, { passive: true });
    return () => window.removeEventListener('resize', updateRadius);
  }, [fit, minRadius]);

  // Modal close handler
  const closeModal = useCallback(() => {
    setOpenedImage(null);
  }, []);

  // Keyboard Escape and body scroll-lock management
  useEffect(() => {
    if (openedImage) {
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') closeModal();
      };
      window.addEventListener('keydown', handleKeyDown);
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [openedImage, closeModal]);

  // Gentle idle auto-rotation
  useEffect(() => {
    let frameId = null;
    const tick = () => {
      if (autoRotate && !isDraggingRef.current && !isHovered && !openedImage && !velocityRef.current) {
        const nextRotY = rotYRef.current + 0.045;
        rotYRef.current = nextRotY;
        setRotY(nextRotY);
      }
      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => {
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [autoRotate, isHovered, openedImage]);

  // Cleanup inertia animation frame on unmount
  useEffect(() => {
    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  // Drag gesture with momentum & physics
  const bind = useDrag(
    ({ down, delta: [dx, dy], velocity: [vx], direction: [dirX] }) => {
      if (down) {
        isDraggingRef.current = true;
        dragDistanceRef.current += Math.hypot(dx, dy);

        if (animFrameRef.current) {
          cancelAnimationFrame(animFrameRef.current);
          animFrameRef.current = null;
        }

        const sensitivity = 0.22;
        const nextRotY = rotYRef.current + dx * sensitivity;
        const nextRotX = Math.max(-14, Math.min(14, rotXRef.current - dy * (sensitivity * 0.35)));

        rotYRef.current = nextRotY;
        rotXRef.current = nextRotX;
        setRotY(nextRotY);
        setRotX(nextRotX);

        velocityRef.current = dirX * vx * sensitivity * 14;
      } else {
        setTimeout(() => {
          isDraggingRef.current = false;
        }, 60);

        let currentVel = velocityRef.current;
        const runInertia = () => {
          currentVel *= 0.94;
          if (Math.abs(currentVel) > 0.015) {
            const nextRotY = rotYRef.current + currentVel;
            rotYRef.current = nextRotY;
            setRotY(nextRotY);
            animFrameRef.current = requestAnimationFrame(runInertia);
          } else {
            animFrameRef.current = null;
            velocityRef.current = 0;
          }
        };

        if (Math.abs(currentVel) > 0.1) {
          animFrameRef.current = requestAnimationFrame(runInertia);
        } else {
          velocityRef.current = 0;
        }
      }
    },
    {
      pointer: { touch: true },
      filterTaps: true,
      threshold: 3
    }
  );

  // Position items across the 3D hemispheric dome (3 rings)
  const positionedTiles = useMemo(() => {
    if (!images || images.length === 0) return [];

    const total = images.length;
    const topCount = Math.round(total * 0.31);
    const bottomCount = Math.round(total * 0.31);
    const midCount = total - topCount - bottomCount;

    return images.map((img, i) => {
      let phi = 0;
      let theta = 0;

      if (i < topCount) {
        // Top Ring (elevation 22deg)
        phi = 22;
        theta = (i / topCount) * 360 + 18;
      } else if (i < topCount + midCount) {
        // Equator Ring (elevation 0deg)
        const midIndex = i - topCount;
        phi = 0;
        theta = (midIndex / midCount) * 360;
      } else {
        // Bottom Ring (elevation -22deg)
        const botIndex = i - topCount - midCount;
        phi = -22;
        theta = (botIndex / bottomCount) * 360 + 36;
      }

      return {
        ...img,
        phi,
        theta
      };
    });
  }, [images]);

  return (
    <div
      ref={containerRef}
      className={`dome-gallery-container ${className}`.trim()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 3D Interactive Stage */}
      <div
        className="dome-gallery-stage dome-gallery-mask"
        {...bind()}
        onPointerDown={() => {
          dragDistanceRef.current = 0;
        }}
      >
        <div
          className="dome-gallery-sphere"
          style={{
            transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)`
          }}
        >
          {positionedTiles.map((tile, index) => (
            <div
              key={tile.id || tile.src || index}
              className="dome-gallery-tile group cursor-pointer"
              style={{
                transform: `translate(-50%, -50%) rotateY(${tile.theta}deg) rotateX(${tile.phi}deg) translateZ(${radius}px)`
              }}
              onClick={() => {
                if (!isDraggingRef.current && dragDistanceRef.current < 6) {
                  setOpenedImage(tile);
                }
              }}
            >
              <div
                className={`dome-gallery-card ${
                  grayscale ? 'grayscale hover:grayscale-0' : ''
                }`}
              >
                <img
                  src={tile.src}
                  alt={tile.alt || tile.title || `India perspective ${index + 1}`}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                {tile.title && (
                  <div className="dome-gallery-card-label">
                    <span className="text-[11px] sm:text-xs font-serif text-white tracking-wide truncate block">
                      {tile.title}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enlarged Modal Overlay */}
      {openedImage && (
        <div
          className="dome-gallery-overlay fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 backdrop-blur-md"
          style={{ backgroundColor: overlayBlurColor }}
          onClick={closeModal}
        >
          <div
            className="dome-gallery-modal relative w-full bg-white rounded-2xl overflow-hidden shadow-2xl border border-sand/70 flex flex-col"
            style={{
              maxWidth: openedImageWidth,
              maxHeight: openedImageHeight
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={closeModal}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-forest-dark/80 text-ivory hover:bg-gold hover:text-white transition-colors shadow-md"
              aria-label="Close image preview"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image */}
            <div className="relative w-full h-64 sm:h-80 md:h-96 overflow-hidden bg-forest-dark flex-shrink-0">
              <img
                src={openedImage.src}
                alt={openedImage.alt || openedImage.title}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/60 via-transparent to-transparent" />
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8 bg-white flex-1 flex flex-col justify-between">
              <div>
                {openedImage.location && (
                  <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-gold font-semibold mb-2">
                    <MapPin className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                    <span>{openedImage.location}</span>
                  </div>
                )}
                <h3 className="text-2xl sm:text-3xl font-serif text-forest font-medium leading-snug mb-2">
                  {openedImage.title}
                </h3>
                {openedImage.description && (
                  <p className="text-sm sm:text-base text-charcoal/80 font-light leading-relaxed">
                    {openedImage.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

