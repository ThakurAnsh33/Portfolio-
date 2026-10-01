import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, Github, Linkedin, Mail, Terminal, Eye, Keyboard } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { recordVisit } from '../utils/api';
import { SharePortfolioButton } from './SharePortfolioButton';

export const Footer = ({ onOpenShortcuts, onOpenTerminal }) => {
  const currentYear = new Date().getFullYear();
  const [visitorCount, setVisitorCount] = useState(1241);

  useEffect(() => {
    recordVisit().then((count) => {
      if (count) setVisitorCount(count);
    });
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-slate-200 dark:border-white/10 bg-white/40 dark:bg-[#12161A]/90 backdrop-blur-md pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pb-12 border-b border-slate-200 dark:border-white/10">
          
          {/* Brand Info */}
          <div className="md:col-span-6 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl border border-accent-moss/40 p-[1px] bg-accent-moss/10">
                <div className="w-full h-full bg-white dark:bg-[#1B2127] rounded-[10px] flex items-center justify-center text-accent-moss">
                  <Terminal size={16} className="text-accent-moss" />
                </div>
              </div>
              <span className="font-extrabold text-lg font-heading text-slate-900 dark:text-[#EDEDE6]">
                Ansh Singh
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-accent-moss/10 text-accent-moss border border-accent-moss/20 font-mono font-medium">
                Full Stack MERN
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-[#9AA39A] max-w-md leading-relaxed">
              Crafting scalable, high-performance web applications and backend systems.
              B.Tech Computer Science student at Lovely Professional University.
            </p>

            {/* Live Visitor Counter Badge */}
            <div className="pt-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-[#222A30] border border-slate-200 dark:border-white/10 text-xs font-mono shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-slate-700 dark:text-[#EDEDE6]">
                  You are visitor <strong className="text-accent-moss font-bold">#{visitorCount.toLocaleString()}</strong>
                </span>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 hidden sm:inline">
                  (MongoDB tracked)
                </span>
              </div>
            </div>
          </div>

          {/* Social Links & Controls */}
          <div className="md:col-span-6 flex flex-col sm:flex-row items-start sm:items-center justify-start md:justify-end gap-4">
            <div className="flex items-center gap-2.5">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#222A30] text-slate-700 dark:text-[#EDEDE6] hover:text-accent-moss hover:border-accent-moss transition-colors"
              >
                <Github size={18} />
              </a>

              <a
                href={personalInfo.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#222A30] text-slate-700 dark:text-[#EDEDE6] hover:text-accent-moss hover:border-accent-moss transition-colors"
              >
                <Linkedin size={18} />
              </a>

              <a
                href={`mailto:${personalInfo.email}`}
                aria-label="Send Email"
                className="p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#222A30] text-slate-700 dark:text-[#EDEDE6] hover:text-accent-moss hover:border-accent-moss transition-colors"
              >
                <Mail size={18} />
              </a>

              {onOpenTerminal && (
                <button
                  onClick={onOpenTerminal}
                  aria-label="Open Terminal"
                  title="Open Interactive Terminal (Ctrl+K)"
                  className="p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#222A30] text-slate-700 dark:text-[#EDEDE6] hover:text-accent-moss hover:border-accent-moss transition-colors hidden sm:block"
                >
                  <Terminal size={18} />
                </button>
              )}

              {/* Share Portfolio Button */}
              <SharePortfolioButton label="Share" />
            </div>

            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-[#222A30] text-slate-800 dark:text-[#EDEDE6] border border-slate-200 dark:border-white/10 hover:border-accent-moss hover:text-accent-moss transition-all"
            >
              <span>Back to Top</span>
              <ArrowUp size={14} />
            </button>
          </div>

        </div>

        {/* Quick Routed Page Links */}
        <div className="py-5 border-b border-slate-200 dark:border-white/10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-semibold text-slate-600 dark:text-content-muted">
          <Link to="/" className="hover:text-accent-moss transition-colors">Home</Link>
          <Link to="/about" className="hover:text-accent-moss transition-colors">About</Link>
          <Link to="/skills" className="hover:text-accent-moss transition-colors">Skills Matrix</Link>
          <Link to="/experience" className="hover:text-accent-moss transition-colors">Experience</Link>
          <Link to="/projects" className="hover:text-accent-moss transition-colors">Projects</Link>
          <Link to="/activity" className="hover:text-accent-moss transition-colors">GitHub Activity</Link>
          <Link to="/changelog" className="hover:text-accent-moss transition-colors">Changelog</Link>
          <Link to="/contact" className="hover:text-accent-moss transition-colors">Contact</Link>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600 dark:text-[#9AA39A] text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
            <span>
              &copy; {currentYear} <strong className="font-semibold text-slate-900 dark:text-[#EDEDE6]">Ansh Singh</strong>. All rights reserved.
            </span>
            {onOpenShortcuts && (
              <button
                onClick={onOpenShortcuts}
                className="text-[11px] font-mono hover:text-accent-moss text-slate-500 dark:text-slate-400 flex items-center gap-1 transition-colors underline underline-offset-2"
              >
                <Keyboard size={12} /> Press ? for shortcuts
              </button>
            )}
          </div>

          <div className="flex items-center gap-1.5 font-medium">
            <span>Built with the</span>
            <span className="px-2 py-0.5 rounded bg-accent-moss/10 text-accent-moss font-mono font-semibold border border-accent-moss/20">
              MERN Stack
            </span>
            <span>+ Tailwind & Framer Motion</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
