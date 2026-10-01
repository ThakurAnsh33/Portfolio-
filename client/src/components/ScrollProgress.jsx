import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * Enhancement #1: Scroll Progress Bar
 * Fixed thin glowing gradient bar at top of viewport that fills as the user scrolls down
 */
export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-accent-moss via-accent-mossDeep to-accent-moss z-[100] origin-left pointer-events-none shadow-[0_0_8px_rgba(122,148,113,0.6)]"
      aria-hidden="true"
    />
  );
};

