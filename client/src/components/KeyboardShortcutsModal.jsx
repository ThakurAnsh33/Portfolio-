import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Keyboard, Command, Sparkles } from 'lucide-react';

export const KeyboardShortcutsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const navigationShortcuts = [
    { keys: ['G', 'H'], label: 'Jump to Home / Hero' },
    { keys: ['G', 'A'], label: 'Jump to About' },
    { keys: ['G', 'S'], label: 'Jump to Skills' },
    { keys: ['G', 'E'], label: 'Jump to Experience' },
    { keys: ['G', 'P'], label: 'Jump to Projects' },
    { keys: ['G', 'C'], label: 'Jump to Contact' },
    { keys: ['G', 'D'], label: 'Jump to Education' },
  ];

  const generalShortcuts = [
    { keys: ['Ctrl', 'K'], label: 'Toggle Terminal / Command Palette' },
    { keys: ['T'], label: 'Quick open Terminal' },
    { keys: ['?'], label: 'Toggle this Shortcuts Guide' },
    { keys: ['Esc'], label: 'Close open modal / Terminal' },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
        {/* Backdrop click */}
        <div className="absolute inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-lg hud-card p-6 sm:p-7 rounded-3xl border border-slate-200 dark:border-white/15 shadow-2xl z-10"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-200 dark:border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-accent-moss/10 text-accent-moss border border-accent-moss/20 flex items-center justify-center">
                <Keyboard size={18} />
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-[#EDEDE6]">
                  Keyboard Shortcuts
                </h3>
                <p className="text-xs text-slate-500 dark:text-[#9AA39A]">
                  Power-user navigation & command shortcuts
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-[#9AA39A] dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Body */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div>
              <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-accent-moss mb-3 flex items-center gap-1.5">
                <Command size={13} />
                <span>General Controls</span>
              </h4>
              <div className="space-y-2">
                {generalShortcuts.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between py-1.5 px-2.5 rounded-xl bg-slate-100 dark:bg-[#222A30] border border-slate-200 dark:border-white/10 text-xs"
                  >
                    <span className="text-slate-700 dark:text-[#EDEDE6]">{item.label}</span>
                    <div className="flex items-center gap-1">
                      {item.keys.map((k, kIdx) => (
                        <kbd
                          key={kIdx}
                          className="px-2 py-0.5 rounded font-mono font-semibold bg-white dark:bg-[#1B2127] text-slate-800 dark:text-[#EDEDE6] border border-slate-300 dark:border-white/15 shadow-sm text-[11px]"
                        >
                          {k}
                        </kbd>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Sequences */}
            <div>
              <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-accent-moss mb-3 flex items-center gap-1.5">
                <Sparkles size={13} />
                <span>Quick Jump Navigation (GitHub style)</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {navigationShortcuts.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between py-1.5 px-2.5 rounded-xl bg-slate-100 dark:bg-[#222A30] border border-slate-200 dark:border-white/10 text-xs"
                  >
                    <span className="text-slate-700 dark:text-[#EDEDE6]">{item.label}</span>
                    <div className="flex items-center gap-1">
                      {item.keys.map((k, kIdx) => (
                        <kbd
                          key={kIdx}
                          className="px-1.5 py-0.5 rounded font-mono font-semibold bg-white dark:bg-[#1B2127] text-slate-800 dark:text-[#EDEDE6] border border-slate-300 dark:border-white/15 shadow-sm text-[10px]"
                        >
                          {k}
                        </kbd>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer note */}
          <div className="mt-6 pt-4 border-t border-slate-200 dark:border-white/10 text-center text-[11px] text-slate-500 dark:text-[#9AA39A]">
            Press <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-white/10 font-mono text-[10px]">Esc</kbd> anytime to close this modal.
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

