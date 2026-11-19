import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Phone, MessageSquare } from 'lucide-react';
import { COMPANY_CONTACT } from '../data/destinations';

export default function Navbar({ onOpenPlanTrip }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Travel Packages', href: '#packages' },
    { label: 'The Living Diversity', href: '#experiences' },
    { label: 'Destinations', href: '#destinations' },
    { label: 'Philosophy', href: '#story' },
    { label: 'Contact', href: '#footer' },
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'nav-scrolled py-3.5' : 'nav-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, '#home')}
            className="flex items-center group focus:outline-none"
            aria-label="Torna Holidays Home"
          >
            <div className={`transition-all duration-300 flex items-center ${
              isScrolled ? 'h-10 md:h-12' : 'h-12 md:h-14'
            }`}>
              <img
                src={isScrolled ? "/logo-dark.png" : "/logo.png"}
                alt="Torna Holidays"
                className="h-full w-auto object-contain filter drop-shadow transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`relative py-1 transition-colors duration-300 hover:text-gold ${
                  isScrolled ? 'text-forest/85' : 'text-ivory/90'
                }`}
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-gold transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right Action CTA */}
          <div className="hidden sm:flex items-center gap-4">
            <button
              onClick={onOpenPlanTrip}
              className={`group inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold px-5 py-2.5 rounded-none border transition-all duration-300 ${
                isScrolled
                  ? 'border-forest text-forest hover:bg-forest hover:text-ivory'
                  : 'border-white/70 text-white hover:bg-white hover:text-forest'
              }`}
            >
              <span>Plan Your Trip</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className={`lg:hidden p-2 transition-colors ${
              isScrolled ? 'text-forest' : 'text-white'
            }`}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-forest-dark/95 backdrop-blur-xl flex flex-col justify-between p-8 text-ivory lg:hidden animate-fadeIn">
          <div className="flex items-center justify-between pt-2">
            <img src="/logo.png" alt="Torna Holidays" className="h-12 w-auto object-contain filter drop-shadow" />
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="text-ivory/80 hover:text-white p-2"
            >
              <X className="w-7 h-7" />
            </button>
          </div>

          <div className="flex flex-col gap-6 my-auto text-center">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-2xl font-serif text-ivory/90 hover:text-gold transition-colors py-1"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-4">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPlanTrip();
                }}
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gold text-white font-medium text-sm tracking-widest uppercase hover:bg-gold-light transition-all shadow-lg w-full max-w-xs mx-auto"
              >
                <span>Plan Your Trip</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="border-t border-ivory/15 pt-6 text-center text-xs text-ivory/70 space-y-2">
            <p className="flex items-center justify-center gap-2">
              <Phone className="w-3.5 h-3.5 text-gold" />
              <span>{COMPANY_CONTACT.phone}</span>
            </p>
            <p className="text-ivory/50">Bespoke Journeys Across India & Beyond</p>
          </div>
        </div>
      )}
    </>
  );
}

