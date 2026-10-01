import React from 'react';

export const HudBackground = () => {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
      {/* Background Cartography / Survey Technical Grid Pattern */}
      <div className="absolute inset-0 bg-hud-grid opacity-60" />

      {/* Decorative Topographic Survey Corner Markers */}
      <div className="hidden lg:block absolute top-24 left-8 text-[11px] font-mono text-content-lightMuted/60 dark:text-content-muted/40 tracking-wider select-none">
        SURV // 01.SYS
      </div>
      <div className="hidden lg:block absolute top-24 right-8 text-[11px] font-mono text-content-lightMuted/60 dark:text-content-muted/40 tracking-wider select-none text-right">
        COORD // 2026
      </div>
    </div>
  );
};
