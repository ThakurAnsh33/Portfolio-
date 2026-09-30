import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

/**
 * Enhancement #9: Floating "Back to Top" Button
 * Appears dynamically after scrolling past the hero section.
 * Smoothly scrolls to the top of the page.
 */
export const FloatingBackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled down past 450px
      setIsVisible(window.scrollY > 450);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          transition={{ duration: 0.2 }}
          onClick={scrollToTop}
          aria-label="Back to top"
          title="Back to Top"
          className="fixed bottom-7 right-7 z-40 p-3 rounded-2xl hud-card border border-accent-cyan/30 text-accent-cyan hover:border-accent-cyan hover:bg-accent-cyan/10 shadow-lg shadow-black/40 backdrop-blur-md transition-all duration-200 group"
        >
          <ArrowUp size={18} className="transform group-hover:-translate-y-0.5 transition-transform duration-200" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

