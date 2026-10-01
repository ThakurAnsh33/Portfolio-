import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal } from 'lucide-react';

export const TerminalBootloader = ({ onComplete }) => {
  const [lines, setLines] = useState([]);
  const [isDone, setIsDone] = useState(false);

  const bootSequence = [
    '$ boot --profile ansh-singh.env',
    '[  OK  ] Core: Lovely Professional University CSE (CGPA 8.3)',
    '[  OK  ] Stack: MongoDB • Express • React • Node.js',
    '[  OK  ] Verified: 11 industry accreditations',
    '[  OK  ] Ready. Launching interactive terminal...',
  ];

  useEffect(() => {
    // Check if already booted in this session
    const hasBooted = sessionStorage.getItem('ansh_boot_completed');
    if (hasBooted) {
      setIsDone(true);
      if (onComplete) onComplete();
      return;
    }

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < bootSequence.length) {
        setLines((prev) => [...prev, bootSequence[currentIndex]]);
        currentIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsDone(true);
          sessionStorage.setItem('ansh_boot_completed', 'true');
          if (onComplete) onComplete();
        }, 350);
      }
    }, 220);

    return () => clearInterval(interval);
  }, []);

  const handleSkip = () => {
    setIsDone(true);
    sessionStorage.setItem('ansh_boot_completed', 'true');
    if (onComplete) onComplete();
  };

  if (isDone) return null;

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.45, ease: 'easeInOut' }}
          onClick={handleSkip}
          className="fixed inset-0 z-50 bg-[#12161A]/95 text-content-primary flex items-center justify-center p-6 cursor-pointer font-mono select-none backdrop-blur-md"
        >
          <div className="max-w-md w-full bg-[#1B2127] border border-hud-border p-5 rounded-2xl shadow-2xl">
            {/* Top terminal bar */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4 text-xs text-content-muted">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-accent-amber/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-accent-moss/80" />
                <span className="ml-2 font-mono text-[11px] text-content-muted">ansh@terminal: ~</span>
              </div>
              <span className="text-[10px] uppercase text-accent-amber tracking-widest">[booting]</span>
            </div>

            {/* Sequence output */}
            <div className="space-y-2 text-xs font-mono min-h-[140px]">
              {lines.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.15 }}
                  className={i === 0 ? 'text-accent-amber font-semibold' : 'text-content-primary'}
                >
                  {line}
                </motion.div>
              ))}
              <div className="flex items-center gap-1 text-accent-amber">
                <span>&gt;</span>
                <span className="inline-block w-2 h-4 bg-accent-amber animate-pulse" />
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 flex justify-between items-center text-[10px] text-content-muted">
              <span>INITIALIZING SYSTEM...</span>
              <span className="text-accent-moss hover:underline">Click to skip</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
