import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useSound } from '../context/SoundContext';

/**
 * Enhancement #8: Sound Toggle Button
 * Discrete mute/unmute toggle that plays soft UI click sounds when active.
 * Strictly defaults to OFF.
 */
export const SoundToggle = ({ className = '' }) => {
  const { soundEnabled, toggleSound } = useSound();

  return (
    <button
      onClick={toggleSound}
      title={soundEnabled ? 'Disable UI Sound Effects' : 'Enable UI Sound Effects (Soft Clicks)'}
      aria-label={soundEnabled ? 'Mute sound' : 'Unmute sound'}
      className={`relative p-2 rounded-xl border transition-all duration-200 flex items-center justify-center ${
        soundEnabled
          ? 'bg-accent-cyan/15 text-accent-cyan border-accent-cyan/40 shadow-[0_0_10px_rgba(79,209,255,0.25)]'
          : 'hud-card text-slate-500 dark:text-slate-400 border-slate-200 dark:border-white/10 hover:text-slate-800 dark:hover:text-[#f2f3f8]'
      } ${className}`}
    >
      {soundEnabled ? (
        <>
          <Volume2 size={16} />
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-accent-cyan animate-ping" />
        </>
      ) : (
        <VolumeX size={16} />
      )}
    </button>
  );
};

