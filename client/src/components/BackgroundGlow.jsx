import React from 'react';

export const BackgroundGlow = () => {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
      {/* Top Left Gradient Orb */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-brand-blue/15 rounded-full blur-3xl dark:bg-brand-blue/10 animate-pulse-slow"></div>

      {/* Top Right Gradient Orb */}
      <div className="absolute top-1/4 -right-40 w-[30rem] h-[30rem] bg-brand-violet/15 rounded-full blur-[120px] dark:bg-brand-violet/10"></div>

      {/* Middle Cyan Accent */}
      <div className="absolute top-2/3 -left-32 w-80 h-80 bg-brand-cyan/10 rounded-full blur-3xl dark:bg-brand-cyan/5"></div>

      {/* Bottom Center Accent */}
      <div className="absolute -bottom-20 right-1/4 w-[28rem] h-[28rem] bg-brand-purple/10 rounded-full blur-[120px] dark:bg-brand-purple/10"></div>

      {/* Subtle Grid Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 dark:opacity-20 mask-radial"></div>
    </div>
  );
};

