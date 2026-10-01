import React, { useState } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { HudBackground } from './HudBackground';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { TerminalModal } from './TerminalModal';
import { KeyboardShortcutsModal } from './KeyboardShortcutsModal';
import { ScrollProgress } from './ScrollProgress';
import { CustomCursor } from './CustomCursor';
import { FloatingBackToTop } from './FloatingBackToTop';
import { ScrollToTop } from './ScrollToTop';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';

export const Layout = () => {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  const location = useLocation();

  const { gKeyPressed } = useKeyboardShortcuts({
    onToggleTerminal: () => setTerminalOpen((prev) => !prev),
    onToggleShortcuts: () => setShortcutsOpen((prev) => !prev),
    onCloseModals: () => {
      setTerminalOpen(false);
      setShortcutsOpen(false);
    },
  });

  return (
    <div className="relative min-h-screen text-[#14181C] dark:text-[#EDEDE6] selection:bg-[#7A9471] selection:text-[#12161A] transition-colors duration-300 font-sans antialiased flex flex-col justify-between">
      {/* Scroll restoration helper */}
      <ScrollToTop />

      {/* Global Toast Notifications */}
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3500,
          style: {
            background: 'rgba(27, 33, 39, 0.95)',
            color: '#EDEDE6',
            border: '1px solid rgba(122, 148, 113, 0.35)',
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: '500',
            backdropFilter: 'blur(16px)',
            boxShadow: '0 12px 36px -8px rgba(0, 0, 0, 0.7)',
          },
          success: {
            iconTheme: {
              primary: '#7A9471',
              secondary: '#12161A',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#ffffff',
            },
          },
        }}
      />

      {/* Desktop Custom Animated Cursor Follower */}
      <CustomCursor />

      {/* Top Scroll Progress Indicator */}
      <ScrollProgress />

      {/* Futuristic HUD Grid & Ambient Neon Background */}
      <HudBackground />

      {/* Sticky Persistent Glassmorphic Navbar */}
      <Navbar
        onOpenTerminal={() => setTerminalOpen(true)}
        onOpenShortcuts={() => setShortcutsOpen(true)}
      />

      {/* Main Page Area with Animated Route Transitions */}
      <main className="flex-1 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Persistent Footer */}
      <Footer
        onOpenTerminal={() => setTerminalOpen(true)}
        onOpenShortcuts={() => setShortcutsOpen(true)}
      />

      {/* Interactive Developer Command Palette */}
      <TerminalModal
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
      />

      {/* Floating Back to Top Control */}
      <FloatingBackToTop />

      {/* Keyboard Shortcuts Cheat Sheet Modal */}
      <KeyboardShortcutsModal
        isOpen={shortcutsOpen}
        onClose={() => setShortcutsOpen(false)}
      />

      {/* Floating Quick Guide when 'G' key is initiated */}
      {gKeyPressed && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-xl hud-card border border-accent-moss/60 bg-white/95 dark:bg-[#1B2127]/95 text-accent-moss font-mono text-xs flex items-center gap-2 shadow-2xl backdrop-blur-md animate-bounce">
          <span className="w-2 h-2 rounded-full bg-accent-moss animate-ping" />
          <span>Go to: [H]ome, [A]bout, [S]kills, [E]xp, [P]rojects, [C]ontact, [D]egree, [G]itHub, [N]ow</span>
        </div>
      )}
    </div>
  );
};

