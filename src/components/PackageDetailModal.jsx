import React, { useEffect } from 'react';
import { X, Clock, MapPin, CheckCircle, ExternalLink, ArrowRight } from 'lucide-react';

export default function PackageDetailModal({ pkg, onClose, onOpenPlanTrip }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!pkg) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-forest-dark/80 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-4xl max-h-[90vh] bg-ivory rounded-2xl overflow-hidden shadow-2xl flex flex-col border border-sand"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Media Banner */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden flex-shrink-0">
          <img
            src={pkg.image}
            alt={pkg.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              if (!e.target.dataset.fallback) {
                e.target.dataset.fallback = 'true';
                e.target.src = '/images/packages/royal-rajputana.jpg';
              }
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/40 to-transparent" />

          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-forest-dark/80 hover:bg-forest text-ivory flex items-center justify-center transition-all border border-white/20"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Overlay Details */}
          <div className="absolute bottom-6 left-6 right-6 text-ivory">
            <div className="flex flex-wrap items-center gap-3 text-xs font-medium mb-2">
              <span className="px-3 py-1 bg-gold text-white uppercase tracking-wider font-semibold rounded-none">
                {pkg.tag || 'Curated Expedition'}
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white">
                <Clock className="w-3.5 h-3.5 text-gold" />
                {pkg.duration}
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white">
                <MapPin className="w-3.5 h-3.5 text-gold" />
                {pkg.location}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-medium text-white">
              {pkg.title}
            </h2>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-charcoal">
          <div>
            <h3 className="text-xs uppercase tracking-widest text-gold font-semibold mb-2">
              Journey Overview
            </h3>
            <p className="text-sm sm:text-base font-light text-charcoal/80 leading-relaxed">
              {pkg.summary}
            </p>
          </div>

          {pkg.highlights && pkg.highlights.length > 0 && (
            <div>
              <h3 className="text-xs uppercase tracking-widest text-gold font-semibold mb-3">
                Signature Experiences & Highlights
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {pkg.highlights.map((highlight, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-2.5 p-3 rounded-xl bg-sand-light/60 border border-sand"
                  >
                    <CheckCircle className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-charcoal/85 font-light">
                      {highlight}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="p-4 rounded-xl bg-forest/5 border border-forest/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-serif font-medium text-forest">
                Custom Tailoring Available
              </h4>
              <p className="text-xs text-charcoal/70 font-light">
                Extend days, upgrade to ultra-luxury heritage suites, or include private charter flights.
              </p>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => {
                  onClose();
                  onOpenPlanTrip(pkg);
                }}
                className="flex-1 sm:flex-none px-6 py-2.5 bg-forest text-ivory text-xs uppercase tracking-widest font-semibold hover:bg-forest-light transition-all text-center"
              >
                Inquire For This Trip
              </button>
              <a
                href={pkg.link}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 border border-sand hover:border-gold rounded text-charcoal/60 hover:text-gold transition-colors"
                title="View on tornaholidays.com"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

