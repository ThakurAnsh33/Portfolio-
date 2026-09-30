import React from 'react';

export const HudBackground = () => {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
      {/* Background HUD Grid Pattern */}
      <div className="absolute inset-0 bg-hud-grid opacity-70" />

      {/* Soft Ambient Neon Glow Orbs (Strictly low opacity, high blur for depth) */}
      <div className="absolute -top-32 left-1/4 w-[600px] h-[600px] bg-accent-cyan/10 rounded-full blur-[160px] dark:bg-accent-cyan/[0.08]" />
      <div className="absolute top-1/3 -right-32 w-[550px] h-[550px] bg-accent-violet/10 rounded-full blur-[180px] dark:bg-accent-violet/[0.08]" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-accent-blue/10 rounded-full blur-[170px] dark:bg-accent-blue/[0.06]" />

      {/* Decorative HUD Corner Tech Markers (subtle, very low opacity) */}
      <div className="hidden lg:block absolute top-24 left-8 text-[11px] font-mono text-slate-400 dark:text-slate-600 tracking-wider select-none">
        HUD // 01.SYS
      </div>
      <div className="hidden lg:block absolute top-24 right-8 text-[11px] font-mono text-slate-400 dark:text-slate-600 tracking-wider select-none text-right">
        UI.v3 // 2026
      </div>
    </div>
  );
};

