import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, FileDown, Sparkles, Linkedin, Github, Terminal, Keyboard } from 'lucide-react';
import { navLinks, personalInfo } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';
import { getResumeDownloadUrl } from '../utils/api';
import { SoundToggle } from './SoundToggle';

export const Navbar = ({ onOpenTerminal, onOpenShortcuts }) => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-3 hud-card shadow-lg border-b'
          : 'py-5 bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo with Glowing Tech Monogram */}
        <Link
          to="/"
          className="group flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-xl p-[1.5px] hud-gradient-accent shadow-hud-glow flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
            <div className="w-full h-full bg-[#05060f] rounded-[10px] flex items-center justify-center text-accent-cyan font-heading font-extrabold text-base">
              AS
            </div>
          </div>
          <div>
            <div className="font-heading font-extrabold text-lg sm:text-xl text-[#0b0d1a] dark:text-[#f2f3f8] tracking-tight leading-none group-hover:text-accent-cyan transition-colors">
              Ansh Singh
            </div>
            <div className="text-[11px] font-medium text-slate-500 dark:text-content-muted flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" />
              <span>Full Stack MERN</span>
            </div>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 p-1 rounded-full hud-card border">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.href || (link.href !== '/' && location.pathname.startsWith(link.href));

            return (
              <Link
                key={link.name}
                to={link.href}
                className={`relative px-4 py-1.5 text-sm font-semibold rounded-full transition-colors duration-200 ${
                  isActive
                    ? 'text-[#0b0d1a] dark:text-[#f2f3f8]'
                    : 'text-slate-600 dark:text-content-muted hover:text-[#0b0d1a] dark:hover:text-[#f2f3f8]'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="hudNavGlowUnderline"
                    className="absolute inset-0 rounded-full bg-accent-cyan/15 dark:bg-accent-cyan/20 border border-accent-cyan/40"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  >
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-accent-cyan shadow-hud-glow" />
                  </motion.div>
                )}
                <span className="relative z-10">{link.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Desktop Action Controls */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* Terminal Launcher */}
          {onOpenTerminal && (
            <button
              onClick={onOpenTerminal}
              aria-label="Open Terminal"
              className="p-2.5 rounded-xl hud-card hud-card-interactive text-slate-700 dark:text-content-muted hover:text-accent-cyan dark:hover:text-accent-cyan flex items-center gap-1.5"
              title="Open Interactive Terminal (Ctrl+K)"
            >
              <Terminal size={17} />
              <span className="text-[10px] font-mono text-accent-cyan font-semibold border border-accent-cyan/30 rounded px-1.5 py-0.5 hidden xl:inline">
                Ctrl+K
              </span>
            </button>
          )}

          {/* Shortcuts Launcher */}
          {onOpenShortcuts && (
            <button
              onClick={onOpenShortcuts}
              aria-label="Keyboard Shortcuts"
              className="w-9 h-9 rounded-xl hud-card hud-card-interactive text-slate-700 dark:text-content-muted hover:text-accent-cyan dark:hover:text-accent-cyan font-mono text-xs font-bold flex items-center justify-center"
              title="Keyboard Shortcuts (?)"
            >
              ?
            </button>
          )}

          {/* LinkedIn Profile */}
          <a
            href={personalInfo.linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="p-2.5 rounded-xl hud-card hud-card-interactive text-slate-700 dark:text-content-muted hover:text-accent-cyan dark:hover:text-accent-cyan"
            title="LinkedIn Profile"
          >
            <Linkedin size={17} />
          </a>

          {/* GitHub Profile */}
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="p-2.5 rounded-xl hud-card hud-card-interactive text-slate-700 dark:text-content-muted hover:text-accent-cyan dark:hover:text-accent-cyan"
            title="GitHub Profile"
          >
            <Github size={17} />
          </a>

          {/* Sound FX Toggle (Defaults to OFF) */}
          <SoundToggle />

          {/* Light / Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2.5 rounded-xl hud-card hud-card-interactive text-slate-700 dark:text-content-muted hover:text-accent-cyan dark:hover:text-accent-cyan"
            title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
          >
            {theme === 'dark' ? (
              <Sun size={17} className="text-accent-cyan" />
            ) : (
              <Moon size={17} className="text-slate-800" />
            )}
          </button>

          {/* Resume CTA Button (Tracked Endpoint) */}
          <a
            href={getResumeDownloadUrl()}
            target="_blank"
            rel="noopener noreferrer"
            download="Ansh_Singh_Resume.pdf"
            className="btn-hud-primary px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2"
          >
            <FileDown size={15} />
            <span>Resume</span>
          </a>
        </div>

        {/* Mobile Menu & Theme Toggle */}
        <div className="flex sm:hidden items-center gap-2">
          <a
            href={personalInfo.linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="p-2 rounded-lg hud-card text-accent-cyan"
          >
            <Linkedin size={17} />
          </a>

          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-lg hud-card text-slate-700 dark:text-content-muted"
          >
            {theme === 'dark' ? <Sun size={17} className="text-accent-cyan" /> : <Moon size={17} />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
            className="p-2 rounded-lg hud-card text-slate-800 dark:text-content-primary"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="sm:hidden hud-card border-b px-6 pt-3 pb-6 mt-2 shadow-2xl"
          >
            <div className="flex flex-col space-y-2 mt-2">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.href || (link.href !== '/' && location.pathname.startsWith(link.href));

                return (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                      isActive
                        ? 'bg-accent-cyan/15 text-accent-cyan border border-accent-cyan/30'
                        : 'text-slate-700 dark:text-content-muted hover:text-[#0b0d1a] dark:hover:text-[#f2f3f8]'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}

              <div className="pt-3 border-t border-slate-200 dark:border-white/10 flex flex-col gap-2.5">
                {onOpenTerminal && (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenTerminal();
                    }}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold hud-card text-accent-cyan border border-accent-cyan/30"
                  >
                    <Terminal size={15} />
                    <span>Launch Terminal CLI (Ctrl+K)</span>
                  </button>
                )}

                <div className="flex items-center gap-2">
                  <a
                    href={personalInfo.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-semibold hud-card text-accent-cyan"
                  >
                    <Linkedin size={15} />
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-semibold hud-card text-slate-800 dark:text-content-primary"
                  >
                    <Github size={15} />
                    <span>GitHub</span>
                  </a>
                </div>

                <a
                  href={getResumeDownloadUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  download="Ansh_Singh_Resume.pdf"
                  className="btn-hud-primary flex items-center justify-center gap-2 w-full py-2.5 text-sm font-bold rounded-xl"
                >
                  <FileDown size={16} />
                  <span>Download Resume</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
