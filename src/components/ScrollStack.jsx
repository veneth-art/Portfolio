import React, { useLayoutEffect, useRef, useCallback } from 'react';
import './ScrollStack.css';

const ScrollStack = ({
  children,
  className = '',
  itemDistance = 60,
  itemScale = 0.03,
  stackPosition = '25%',
  scaleEndPosition = '15%',
  baseScale = 0.88,
  blurAmount = 0.3,
}) => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const rafRef = useRef(null);

  const updateCards = useCallback(() => {
    const cards = cardsRef.current;
    if (!cards.length) return;

    const viewportHeight = window.innerHeight;
    const stackStartPx = (parseFloat(stackPosition) / 100) * viewportHeight;
    const scaleEndPx = (parseFloat(scaleEndPosition) / 100) * viewportHeight;

    cards.forEach((card, i) => {
      if (!card) return;
      
      const cardRect = card.getBoundingClientRect();
      const cardTop = cardRect.top + window.scrollY;
      
      const triggerStart = cardTop - stackStartPx - itemDistance * i;
      const triggerEnd = cardTop - scaleEndPx;
      const scrollProgress = window.scrollY;
      
      if (scrollProgress < triggerStart) {
        card.style.transform = 'translateY(0) scale(1) rotate(0deg)';
        card.style.filter = 'none';
        card.style.opacity = '1';
        card.style.zIndex = cards.length - i;
      } else if (scrollProgress >= triggerStart && scrollProgress < triggerEnd) {
        const progress = (scrollProgress - triggerStart) / (triggerEnd - triggerStart);
        const scale = 1 - progress * (1 - (baseScale + i * itemScale));
        const rotate = progress * 2;
        const y = progress * (itemDistance * 0.3);
        const blur = progress * blurAmount * 2;
        
        card.style.transform = `translateY(-${y}px) scale(${scale}) rotate(${rotate}deg)`;
        card.style.filter = blur > 0 ? `blur(${blur}px)` : 'none';
        card.style.opacity = 1 - progress * 0.15;
        card.style.zIndex = cards.length - i;
      } else {
        const scale = baseScale + i * itemScale;
        card.style.transform = `translateY(-${itemDistance * 0.3}px) scale(${scale}) rotate(2deg)`;
        card.style.filter = `blur(${blurAmount * 2}px)`;
        card.style.opacity = 0.85 - (i * 0.1);
        card.style.zIndex = i;
      }
    });
  }, [itemDistance, itemScale, stackPosition, scaleEndPosition, baseScale, blurAmount]);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cards = container.querySelectorAll('.project-scroll-card');
    cardsRef.current = Array.from(cards);

    cards.forEach((card) => {
      card.style.willChange = 'transform, filter, opacity';
    });

    const handleScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        updateCards();
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateCards();

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, [updateCards]);

  return (
    <div className={`scroll-stack-wrapper ${className}`.trim()} ref={containerRef}>
      <div className="scroll-stack-inner">
        {React.Children.map(children, (child, i) => (
          <div 
            key={i} 
            className="scroll-stack-item"
            style={{ marginBottom: `${itemDistance}px` }}
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScrollStack;
