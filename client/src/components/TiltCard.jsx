import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

/**
 * Enhancement #2: 3D Tilt Effect with Subtle Radial Mouse Glow
 * Subtle perspective tilt (max 7-8deg) for cards.
 * Automatically disabled on touch screens and prefers-reduced-motion.
 */
export const TiltCard = ({
  children,
  className = '',
  maxTilt = 7,
  glowColor = 'rgba(79, 209, 255, 0.12)',
}) => {
  const cardRef = useRef(null);
  const [isTouchOrReduced, setIsTouchOrReduced] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setIsTouchOrReduced(isTouch || prefersReduced);
  }, []);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 220, damping: 22 });
  const mouseYSpring = useSpring(y, { stiffness: 220, damping: 22 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [maxTilt, -maxTilt]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-maxTilt, maxTilt]);

  const handleMouseMove = (e) => {
    if (isTouchOrReduced || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseXFromCenter = e.clientX - rect.left - width / 2;
    const mouseYFromCenter = e.clientY - rect.top - height / 2;

    x.set(mouseXFromCenter / width);
    y.set(mouseYFromCenter / height);

    const relX = ((e.clientX - rect.left) / width) * 100;
    const relY = ((e.clientY - rect.top) / height) * 100;
    setGlowPos({ x: relX, y: relY });
  };

  const handleMouseEnter = () => {
    if (!isTouchOrReduced) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  if (isTouchOrReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className={`relative perspective-1000 ${className}`}
    >
      {/* Subtle radial mouse glare follow */}
      {isHovered && (
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] z-20 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 280px at ${glowPos.x}% ${glowPos.y}%, ${glowColor}, transparent 75%)`,
          }}
          aria-hidden="true"
        />
      )}
      {children}
    </motion.div>
  );
};

