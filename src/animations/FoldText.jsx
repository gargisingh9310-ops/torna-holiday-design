import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './FoldText.css';

gsap.registerPlugin(ScrollTrigger);

export default function FoldText({
  text = '',
  foldStyle = 'paper',
  splitBy = 'word',
  hinge = 'top',
  trigger = 'scroll',
  duration = 0.7,
  stagger = 0.055,
  ease = 'power3.out',
  className = '',
  as: Component = 'span'
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const items = el.querySelectorAll('.foldtext-element');
    if (!items.length) return;

    if (prefersReducedMotion) {
      gsap.set(items, { opacity: 1, rotateX: 0, rotateY: 0, y: 0 });
      return;
    }

    let transformOrigin = '50% 0%';
    let initialRotation = { rotateX: -85, rotateY: 0 };

    if (hinge === 'bottom') {
      transformOrigin = '50% 100%';
      initialRotation = { rotateX: 85, rotateY: 0 };
    } else if (hinge === 'left') {
      transformOrigin = '0% 50%';
      initialRotation = { rotateX: 0, rotateY: 85 };
    } else if (hinge === 'right') {
      transformOrigin = '100% 50%';
      initialRotation = { rotateX: 0, rotateY: -85 };
    }

    gsap.set(items, {
      opacity: 0,
      transformOrigin,
      ...initialRotation,
      y: hinge === 'top' ? -15 : hinge === 'bottom' ? 15 : 0
    });

    const animConfig = {
      opacity: 1,
      rotateX: 0,
      rotateY: 0,
      y: 0,
      duration,
      stagger,
      ease,
      overwrite: 'auto'
    };

    let ctx = gsap.context(() => {
      if (trigger === 'scroll') {
        gsap.to(items, {
          ...animConfig,
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none',
            once: true
          }
        });
      } else if (trigger === 'mount') {
        gsap.to(items, animConfig);
      }
    }, el);

    return () => {
      ctx.revert();
    };
  }, [text, foldStyle, splitBy, hinge, trigger, duration, stagger, ease]);

  const rawText = typeof text === 'string' ? text : '';

  const renderContent = () => {
    if (splitBy === 'char') {
      return rawText.split('').map((char, i) => (
        <span
          key={i}
          className={`foldtext-element fold-${foldStyle} ${char === ' ' ? 'inline' : ''}`}
          style={{ display: 'inline-block' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ));
    }

    // Default: splitBy="word"
    const words = rawText.split(' ');
    return words.map((word, i) => (
      <span key={i} className="foldtext-word">
        <span className={`foldtext-element fold-${foldStyle}`}>
          {word}
        </span>
      </span>
    ));
  };

  return (
    <Component ref={containerRef} className={`foldtext-container ${className}`}>
      {renderContent()}
    </Component>
  );
}

