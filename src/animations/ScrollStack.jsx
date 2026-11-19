import React, { useRef, useEffect, Children, isValidElement, cloneElement } from 'react';
import './ScrollStack.css';

export const ScrollStackItem = React.forwardRef(function ScrollStackItem(
  {
    children,
    className = '',
    style = {},
    ...props
  },
  ref
) {
  return (
    <div
      ref={ref}
      className={`scroll-stack-item ${className}`.trim()}
      style={style}
      {...props}
    >
      {children}
    </div>
  );
});

export default function ScrollStack({
  children,
  itemDistance = 100,
  itemStackDistance = 0,
  stackPosition = 'clamp(76px, 10vh, 90px)',
  itemScale = 0.02,
  baseScale = 0.94,
  dimAmount = 0.08,
  stackOffsetUp = 8,
  maxStackOffsetUp = 18,
  blurAmount = 0,
  tiltAmount = 0,
  rotationAmount = 0,
  holdDistance = 160,
  smoothScroll = false,
  snap = false,
  useWindowScroll = true,
  className = ''
}) {
  const containerRef = useRef(null);
  const itemsRef = useRef([]);
  const animFrameRef = useRef(null);

  // Filter valid React children
  const childArray = Children.toArray(children).filter(isValidElement);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const parseStackPosition = () => {
      if (typeof stackPosition === 'number') return stackPosition;
      if (itemsRef.current[0]) {
        const computedTop = window.getComputedStyle(itemsRef.current[0]).top;
        if (computedTop && computedTop.endsWith('px')) {
          const val = parseFloat(computedTop);
          if (!isNaN(val) && val > 0) return val;
        }
      }
      if (typeof stackPosition === 'string') {
        if (stackPosition.includes('clamp')) {
          const vh = window.innerHeight * 0.1;
          return Math.min(90, Math.max(76, vh));
        }
        if (stackPosition.endsWith('vh')) {
          return (window.innerHeight * parseFloat(stackPosition)) / 100;
        }
        if (stackPosition.endsWith('%')) {
          return (window.innerHeight * parseFloat(stackPosition)) / 100;
        }
        if (stackPosition.endsWith('px')) {
          return parseFloat(stackPosition);
        }
      }
      return 80;
    };

    const updateStack = () => {
      const topBase = parseStackPosition();
      const items = itemsRef.current.filter(Boolean);
      const totalItems = items.length;

      items.forEach((itemEl, i) => {
        let depth = 0;

        // Calculate how many subsequent cards have arrived and stacked on top of card i
        for (let j = i + 1; j < totalItems; j++) {
          const nextItemEl = items[j];
          if (!nextItemEl) continue;

          const nextRect = nextItemEl.getBoundingClientRect();
          // All cards dock at the exact same uniform top position when itemStackDistance = 0
          const targetTop_j = topBase + (itemStackDistance > 0 ? j * itemStackDistance : 0);

          // How far has card j traveled past its trigger point toward its target top
          const travelDist = itemDistance || 100;
          const distToTarget = nextRect.top - targetTop_j;

          if (distToTarget <= 0) {
            // Completely stacked on top of card i
            depth += 1;
          } else if (distToTarget < travelDist) {
            // In transition into the stack
            depth += 1 - distToTarget / travelDist;
          }
        }

        const scale = Math.max(baseScale, 1 - depth * itemScale);
        const dim = Math.min(0.35, depth * dimAmount);
        const blur = depth * blurAmount;
        const rot = rotationAmount > 0 ? (i % 2 === 0 ? 1 : -1) * depth * rotationAmount : 0;
        const translateY = stackOffsetUp > 0 && depth > 0 ? -Math.min(depth * stackOffsetUp, maxStackOffsetUp) : 0;

        const cardInner = itemEl.querySelector('.scroll-stack-card') || itemEl;
        if (cardInner) {
          cardInner.style.transform = `translateY(${translateY}px) scale(${scale}) rotate(${rot}deg)`;
          if (blur > 0) {
            cardInner.style.filter = `blur(${blur}px)`;
          } else {
            cardInner.style.filter = 'none';
          }
        }

        const dimLayer = itemEl.querySelector('.scroll-stack-dim-layer');
        if (dimLayer) {
          dimLayer.style.opacity = dim.toString();
        }
      });
    };

    const onScroll = () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
      animFrameRef.current = requestAnimationFrame(updateStack);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    updateStack();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [
    itemDistance,
    itemStackDistance,
    stackPosition,
    itemScale,
    baseScale,
    dimAmount,
    stackOffsetUp,
    maxStackOffsetUp,
    blurAmount,
    rotationAmount,
    childArray.length
  ]);

  const parseStackPosCSS = (index) => {
    if (itemStackDistance === 0) {
      if (typeof stackPosition === 'number') return `${stackPosition}px`;
      return stackPosition;
    }
    if (typeof stackPosition === 'number') {
      return `${stackPosition + index * itemStackDistance}px`;
    }
    return `calc(${stackPosition} + ${index * itemStackDistance}px)`;
  };

  return (
    <div ref={containerRef} className={`scroll-stack-container ${className}`}>
      <div className="scroll-stack-inner">
        {childArray.map((child, index) => {
          const isLast = index === childArray.length - 1;
          const stickyTop = parseStackPosCSS(index);
          const marginBottom = isLast ? `${holdDistance}px` : `${itemDistance}px`;

          return cloneElement(child, {
            key: child.key || index,
            ref: (el) => (itemsRef.current[index] = el),
            style: {
              ...(child.props.style || {}),
              top: stickyTop,
              marginBottom,
              zIndex: index + 1
            }
          });
        })}
      </div>
    </div>
  );
}
