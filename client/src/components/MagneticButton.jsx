import React, { useRef, useState, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';

/**
 * Enhancement #3: Magnetic Button Hover Effect
 * Gently attracts the CTA button toward the mouse cursor when hovering within its area.
 * Bypassed completely on touch devices and prefers-reduced-motion.
 */
export const MagneticButton = ({
  children,
  className = '',
  strength = 0.28,
  maxDistance = 14,
}) => {
  const buttonRef = useRef(null);
  const [isTouchOrReduced, setIsTouchOrReduced] = useState(false);

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setIsTouchOrReduced(isTouch || prefersReduced);
  }, []);

  const x = useSpring(0, { stiffness: 220, damping: 18, mass: 0.2 });
  const y = useSpring(0, { stiffness: 220, damping: 18, mass: 0.2 });

  const handleMouseMove = (e) => {
    if (isTouchOrReduced || !buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    // Clamp within maxDistance
    const clampedX = Math.max(Math.min(deltaX, maxDistance), -maxDistance);
    const clampedY = Math.max(Math.min(deltaY, maxDistance), -maxDistance);

    x.set(clampedX);
    y.set(clampedY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  if (isTouchOrReduced) {
    return <div className={`inline-block ${className}`}>{children}</div>;
  }

  return (
    <motion.div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      className={`inline-block will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
};

