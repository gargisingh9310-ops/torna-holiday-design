import React, { useState, useEffect } from 'react';
import { X, Check, ArrowRight, Sparkles, Phone, MessageSquare } from 'lucide-react';
import { COMPANY_CONTACT } from '../data/destinations';

export default function TripPlannerModal({ isOpen, onClose, initialPackage = null }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: 'United States',
    destinationInterest: initialPackage ? initialPackage.title : 'Golden Triangle & Rajasthan',
    duration: '7 - 10 Days',
    travelers: 'Couple',
    travelMonth: 'Autumn / Winter (Oct - Feb)',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [referenceCode, setReferenceCode] = useState('');

  useEffect(() => {
    if (initialPackage) {
      setFormData((prev) => ({
        ...prev,
        destinationInterest: initialPackage.title
      }));
    }
  }, [initialPackage]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const code = 'TRN-' + Math.floor(100000 + Math.random() * 900000);
    setReferenceCode(code);
    setSubmitted(true);
  };

  const destinationsOptions = [
    'Golden Triangle & Rajasthan',
    'Royal Rajasthan In-Depth',
    'Kerala Backwaters & Ayurveda',
    'Temples & Bengal Tiger Safaris',
    'Varanasi & Buddhist Pilgrimage',
    'Himalayan Luxury Escapes'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-forest-deep/85 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-2xl bg-ivory rounded-2xl overflow-hidden shadow-2xl border border-sand flex flex-col max-h-[94vh] sm:max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-8 bg-forest text-ivory relative border-b border-forest-light/40">
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-4 right-4 sm:top-5 sm:right-5 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-forest-dark/70 hover:bg-forest-light text-ivory flex items-center justify-center transition-all border border-white/20"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] sm:tracking-[0.25em] text-gold font-semibold block mb-1.5 sm:mb-2">
            Bespoke Travel Concierge
          </span>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-serif text-white font-medium mb-1">
            Plan Your Journey to India
          </h2>
          <p className="text-xs sm:text-sm text-ivory/80 font-light max-w-md">
            Tell us about your envisioned trip. Our private curators will design an exclusive itinerary tailored to your rhythm and style.
          </p>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 md:p-8 overflow-y-auto">
          {submitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-forest text-gold mx-auto flex items-center justify-center shadow-lg border border-gold/40">
                <Sparkles className="w-8 h-8 text-gold-pale" />
              </div>
              <h3 className="text-2xl font-serif font-medium text-forest">
                Namaste, {formData.name || 'Honored Guest'}
              </h3>
              <p className="text-sm text-charcoal/80 max-w-md mx-auto font-light leading-relaxed">
                Your journey request has been received. Your dedicated Torna luxury travel concierge is reviewing your preferences.
              </p>
              <div className="inline-block p-4 bg-sand/60 rounded-xl border border-sand text-left max-w-sm w-full mx-auto">
                <div className="text-xs text-charcoal/60 uppercase tracking-wider mb-1">
                  Inquiry Reference Code
                </div>
                <div className="text-xl font-mono font-semibold text-forest">
                  {referenceCode}
                </div>
                <div className="text-[11px] text-charcoal/70 mt-1">
                  Priority Response within 12 Hours • Dedicated WhatsApp Support
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={`https://wa.me/919311014343?text=Namaste,%20I%20just%20submitted%20a%20travel%20inquiry%20(${referenceCode})%20on%20Torna%20Holidays.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3 bg-forest text-ivory text-xs uppercase tracking-widest font-semibold hover:bg-forest-light transition-all flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 text-gold" />
                  <span>Chat on WhatsApp</span>
                </a>
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-3 border border-sand hover:border-gold text-forest text-xs uppercase tracking-widest font-semibold transition-all"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 text-charcoal">
              {/* Interest / Circuit */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-forest font-semibold mb-2">
                  What experience or region calls to you?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {destinationsOptions.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setFormData({ ...formData, destinationInterest: opt })}
                      className={`p-3 text-left rounded-xl text-xs font-medium border transition-all ${
                        formData.destinationInterest === opt
                          ? 'border-gold bg-gold/10 text-forest font-semibold shadow-sm'
                          : 'border-sand hover:border-sand-dark bg-white text-charcoal/80'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-forest font-semibold mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Eleanor Vance"
                    className="w-full px-4 py-2.5 bg-white border border-sand rounded-lg text-sm text-charcoal focus:outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-forest font-semibold mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@domain.com"
                    className="w-full px-4 py-2.5 bg-white border border-sand rounded-lg text-sm text-charcoal focus:outline-none focus:border-gold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-forest font-semibold mb-1.5">
                    Phone / WhatsApp (with country code) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-4 py-2.5 bg-white border border-sand rounded-lg text-sm text-charcoal focus:outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-forest font-semibold mb-1.5">
                    Country of Residence
                  </label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    placeholder="USA, UK, Canada, Australia, etc."
                    className="w-full px-4 py-2.5 bg-white border border-sand rounded-lg text-sm text-charcoal focus:outline-none focus:border-gold"
                  />
                </div>
              </div>

              {/* Duration and Travelers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-forest font-semibold mb-1.5">
                    Estimated Trip Duration
                  </label>
                  <select
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full px-4 py-2.5 bg-white border border-sand rounded-lg text-sm text-charcoal focus:outline-none focus:border-gold"
                  >
                    <option>5 - 7 Days</option>
                    <option>7 - 10 Days</option>
                    <option>10 - 14 Days</option>
                    <option>14 - 21 Days</option>
                    <option>Custom Extended Journey</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-forest font-semibold mb-1.5">
                    Travel Party
                  </label>
                  <select
                    value={formData.travelers}
                    onChange={(e) => setFormData({ ...formData, travelers: e.target.value })}
                    className="w-full px-4 py-2.5 bg-white border border-sand rounded-lg text-sm text-charcoal focus:outline-none focus:border-gold"
                  >
                    <option>Couple (2 Guests)</option>
                    <option>Family with Children</option>
                    <option>Multi-Generational Family</option>
                    <option>Solo Traveler</option>
                    <option>Private Group of Friends</option>
                  </select>
                </div>
              </div>

              {/* Special Notes */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-forest font-semibold mb-1.5">
                  Special Wishes or Preferred Travel Dates
                </label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="e.g. Planning for December 2026, interested in heritage palace suites and dietary preferences..."
                  className="w-full px-4 py-2.5 bg-white border border-sand rounded-lg text-sm text-charcoal focus:outline-none focus:border-gold"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 bg-gold hover:bg-gold-dark text-white font-sans text-xs uppercase tracking-widest font-semibold transition-all duration-300 shadow-xl flex items-center justify-center gap-2"
                >
                  <span>Submit Journey Inquiry</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

