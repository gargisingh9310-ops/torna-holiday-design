import React from 'react';
import { Phone, Mail, MapPin, ArrowUpRight, MessageCircle } from 'lucide-react';
import { COMPANY_CONTACT } from '../data/destinations';

export default function Footer({ onOpenPlanTrip }) {
  const quickLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Destinations', href: '#destinations' },
    { label: 'Experiences', href: '#experiences' },
    { label: 'Travel Packages', href: '#packages' },
    { label: 'The Torna Story', href: '#story' }
  ];

  const packagesList = [
    { label: 'Golden Triangle Heritage', href: 'https://tornaholidays.com/packages/golden-triangle-a-luxurious-journey-through-india-s-heritage' },
    { label: 'Royal Rajputana', href: 'https://tornaholidays.com/packages/royal-rajputana' },
    { label: 'The Rajasthan Tour', href: 'https://tornaholidays.com/packages/the-rajasthan-tour' },
    { label: 'Royal Potpourri-II', href: 'https://tornaholidays.com/packages/royal-potpourri-offbeat-royal-trail' },
    { label: 'Temples & Tigers', href: 'https://tornaholidays.com/packages/temples-and-tigers' }
  ];

  return (
    <footer id="footer" className="bg-forest-dark text-ivory pt-14 pb-10 sm:pt-20 sm:pb-12 border-t border-forest-light/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10 md:gap-12 lg:gap-16 mb-12 sm:mb-16">
          {/* Column 1: Brand & Introduction */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-6">
            <div className="space-y-2.5 sm:space-y-3">
              <a href="#home" className="inline-block group focus:outline-none" aria-label="Torna Holidays Home">
                <img
                  src="/logo.png"
                  alt="Torna Holidays"
                  className="h-12 sm:h-14 md:h-16 w-auto object-contain filter drop-shadow transition-transform duration-300 group-hover:scale-105"
                />
              </a>
              <p className="text-xs uppercase tracking-[0.25em] text-gold font-medium font-sans">
                Curated Private India Expeditions
              </p>
            </div>

            <p className="text-xs sm:text-sm text-ivory/75 font-light leading-relaxed max-w-md font-sans">
              Torna Holidays specializes in bespoke, private luxury travel across India. Crafting unforgettable memories for NRI travelers, international cultural seekers, and discerning global guests with authentic royal hospitality.
            </p>

            <div className="flex items-center gap-4 pt-1 sm:pt-2">
              <a
                href={COMPANY_CONTACT.socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-forest-light/60 hover:bg-gold hover:text-white rounded-lg text-xs font-semibold tracking-wider uppercase transition-colors border border-white/10"
              >
                <MessageCircle className="w-4 h-4 text-gold-pale" />
                <span>WhatsApp Concierge</span>
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="lg:col-span-2 space-y-3 sm:space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] text-gold font-semibold">
              Explore
            </h4>
            <ul className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm font-light">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-ivory/80 hover:text-gold transition-colors inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Featured Circuits */}
          <div className="lg:col-span-2 space-y-3 sm:space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] text-gold font-semibold">
              Curated Circuits
            </h4>
            <ul className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm font-light">
              {packagesList.map((pkg) => (
                <li key={pkg.label}>
                  <a
                    href={pkg.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ivory/80 hover:text-gold transition-colors flex items-center gap-1 group"
                  >
                    <span>{pkg.label}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Information */}
          <div className="lg:col-span-3 space-y-3 sm:space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] text-gold font-semibold">
              Contact Concierge
            </h4>
            <div className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm font-light text-ivory/80">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                <span className="text-xs leading-relaxed text-ivory/75">
                  {COMPANY_CONTACT.address}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gold flex-shrink-0" />
                <a
                  href={`tel:${COMPANY_CONTACT.phone}`}
                  className="text-xs hover:text-gold transition-colors"
                >
                  {COMPANY_CONTACT.phone} / {COMPANY_CONTACT.secondaryPhone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gold flex-shrink-0" />
                <a
                  href={`mailto:${COMPANY_CONTACT.email}`}
                  className="text-xs hover:text-gold transition-colors"
                >
                  {COMPANY_CONTACT.email}
                </a>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenPlanTrip}
                className="w-full py-2.5 px-4 bg-transparent border border-gold/40 text-gold hover:bg-gold hover:text-white text-xs uppercase tracking-widest font-semibold transition-all text-center"
              >
                Request Custom Itinerary
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Accreditation */}
        <div className="pt-6 sm:pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-ivory/60 gap-3 sm:gap-4 text-center sm:text-left">
          <p>
            © {new Date().getFullYear()} Torna Holidays. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 sm:gap-6">
            <a
              href="https://tornaholidays.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold transition-colors"
            >
              Official Website: tornaholidays.com
            </a>
            <span className="hidden sm:inline">•</span>
            <span className="text-ivory/40">Incredible India Recognized</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

