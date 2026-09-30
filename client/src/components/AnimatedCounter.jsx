import React, { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';

/**
 * Enhancement #7: Animated Number Counter
 * Animates numbers counting up from 0 to target when scrolled into view.
 */
export const AnimatedCounter = ({
  from = 0,
  to,
  duration = 1.6,
  decimals = 0,
  prefix = '',
  suffix = '',
  className = '',
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });
  const [current, setCurrent] = useState(from);

  useEffect(() => {
    if (!isInView) return;

    // If reduced motion is preferred, jump straight to target
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCurrent(to);
      return;
    }

    let startTime = null;
    let animationFrameId;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = (timestamp - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic curve: 1 - (1 - t)^3
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const val = from + (to - from) * easeOut;

      setCurrent(val);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCurrent(to);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, from, to, duration]);

  const formatted =
    decimals > 0
      ? current.toFixed(decimals)
      : Math.round(current).toLocaleString();

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
};

