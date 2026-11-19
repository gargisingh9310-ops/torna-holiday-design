import React from 'react';
import CircularGallery from './CircularGallery';
import './CircularGallery.css';

export const TAPESTRY_PERSPECTIVES = [
  {
    id: 'taj-mahal',
    title: 'Taj Mahal – Agra',
    location: 'Agra, Uttar Pradesh',
    image: '/images/perspectives/taj-mahal.jpg'
  },
  {
    id: 'udaipur-lake-palace',
    title: 'Udaipur – Lake Palace',
    location: 'Lake Pichola, Udaipur',
    image: '/images/perspectives/lake-palace-udaipur.jpg'
  },
  {
    id: 'kerala-backwaters',
    title: 'Kerala – Backwaters',
    location: 'Alleppey Lagoons, Kerala',
    image: '/images/perspectives/kerala-backwaters.jpg'
  },
  {
    id: 'kashmir-himalayas',
    title: 'Kashmir – Himalayan Landscapes',
    location: 'Gulmarg & Pahalgam, Kashmir',
    image: '/images/perspectives/kashmir-himalayas.jpg'
  },
  {
    id: 'varanasi-ghats',
    title: 'Varanasi – Ganga Ghats',
    location: 'Sacred River Ganges, Varanasi',
    image: '/images/perspectives/varanasi-ghats.jpg'
  },
  {
    id: 'rajasthan-desert',
    title: 'Rajasthan – Desert & Royal Heritage',
    location: 'Thar Desert & Jaisalmer',
    image: '/images/perspectives/rajasthan-desert.jpg'
  },
  {
    id: 'ranthambore-wildlife',
    title: 'Ranthambore – Wildlife & Tigers',
    location: 'Ranthambore Tiger Reserve',
    image: '/images/perspectives/ranthambore-tiger.jpg'
  },
  {
    id: 'himachal-valleys',
    title: 'Himachal Pradesh – Mountain Valleys',
    location: 'Spiti & Solang Valleys, Himachal',
    image: '/images/perspectives/himachal-valleys.jpg'
  }
];

export default function PhotographicTapestry() {
  return (
    <section id="tapestry" className="py-16 sm:py-20 lg:py-28 bg-ivory overflow-hidden border-t border-sand/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto mb-6 sm:mb-10 lg:mb-12">
          <p className="text-xs uppercase tracking-[0.25em] text-gold font-semibold mb-2 sm:mb-3">
            Photographic Tapestry
          </p>
          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-forest font-normal tracking-tight leading-tight mb-3 sm:mb-4">
            India, Through Every Perspective.
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-charcoal/80 font-light font-sans max-w-2xl mx-auto leading-relaxed">
            Eight perspectives. Countless stories. One extraordinary country waiting to be explored.
          </p>
        </div>

        {/* CircularGallery Component */}
        <div className="h-[440px] sm:h-[520px] lg:h-[600px] relative w-full">
          <CircularGallery
            bend={3}
            textColor="#ffffff"
            borderRadius={0.05}
            scrollEase={0.05}
            showTitles={false}
            onItemClick={(item, index) => console.log(item?.alt || item?.text || '', index)}
          />
        </div>
      </div>
    </section>
  );
}
