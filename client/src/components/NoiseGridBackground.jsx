import React from 'react';

export const NoiseGridBackground = () => {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
      {/* Noise Texture Layer */}
      <div className="absolute inset-0 noise-overlay opacity-[0.035] dark:opacity-[0.055] mix-blend-screen pointer-events-none" />

      {/* Subtle Technical Grid Lines */}
      <div className="absolute inset-0 bg-technical-grid opacity-60 dark:opacity-40" />

      {/* Soft Terminal Ambient Wash (Very subtle, single acid-green accent) */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-accent/[0.03] rounded-full blur-[140px] pointer-events-none" />

      {/* Decorative Technical Coordinates along edges */}
      <div className="hidden lg:flex flex-col justify-between fixed left-3 top-24 bottom-12 text-[10px] font-mono text-paper-muted/40 dark:text-terminal-muted/30 select-none z-0">
        <span>SYS.01 // 31.3260° N</span>
        <span>MERN.NODE // 75.7725° E</span>
        <span>PORT.5000 // READY</span>
      </div>

      <div className="hidden lg:flex flex-col justify-between fixed right-3 top-24 bottom-12 text-[10px] font-mono text-paper-muted/40 dark:text-terminal-muted/30 select-none z-0 text-right">
        <span>BUF.256 // OK</span>
        <span>HEAP: 42.8 MB</span>
        <span>TERM: UTF-8</span>
      </div>
    </div>
  );
};

