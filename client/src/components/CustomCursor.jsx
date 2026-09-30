import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * Enhancement #4: Custom Animated Cursor Follower (Desktop Only)
 * High-performance dual-element cursor: pinpoint core + soft trailing aura ring.
 * Auto-scales on clickable elements. Automatically disabled on touch screens.
 */
export const CustomCursor = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth trailing spring for outer ring
  const ringX = useSpring(mouseX, { stiffness: 400, damping: 28 });
  const ringY = useSpring(mouseY, { stiffness: 400, damping: 28 });

  useEffect(() => {
    // Check if device supports fine cursor (desktop)
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!finePointer || prefersReduced) {
      setIsTouchDevice(true);
      return;
    }
    setIsTouchDevice(false);

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleElementHover = (e) => {
      const target = e.target;
      const isClickable =
        target.closest('a') ||
        target.closest('button') ||
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('[role="button"]') ||
        target.closest('.hud-card-interactive');

      setIsHovered(!!isClickable);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseover', handleElementHover, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleElementHover);
    };
  }, [isVisible, mouseX, mouseY]);

  if (isTouchDevice) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden" aria-hidden="true">
      {/* Outer Smooth Trailing Ring */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovered ? 1.6 : 1,
          opacity: isVisible ? 1 : 0,
          borderColor: isHovered ? 'rgba(79, 209, 255, 0.9)' : 'rgba(79, 209, 255, 0.45)',
          backgroundColor: isHovered ? 'rgba(79, 209, 255, 0.08)' : 'transparent',
        }}
        transition={{ duration: 0.18 }}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-accent-cyan/50 pointer-events-none backdrop-blur-[0.5px]"
      />

      {/* Inner Pinpoint Center Dot */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovered ? 0.6 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.1 }}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-accent-cyan pointer-events-none shadow-[0_0_8px_rgba(79,209,255,0.9)]"
      />
    </div>
  );
};
