import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  ArrowRight,
  FileDown,
  Mail,
  Github,
  Linkedin,
  Sparkles,
  Layers,
  Code2,
  Database,
  Cpu,
  CheckCircle2,
  MapPin,
  GraduationCap,
  Activity,
} from 'lucide-react';
import { personalInfo, stats } from '../data/portfolioData';
import { getResumeDownloadUrl } from '../utils/api';
import { MagneticButton } from './MagneticButton';
import { AnimatedCounter } from './AnimatedCounter';

export const Hero = () => {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [timeGreeting, setTimeGreeting] = useState('Good day 👋');

  // Dynamic time-based greeting based on visitor's local system time
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) setTimeGreeting('Good morning 👋');
    else if (hour >= 12 && hour < 17) setTimeGreeting('Good afternoon 👋');
    else setTimeGreeting('Good evening 👋');
  }, []);

  // Typewriter effect for animated titles
  useEffect(() => {
    const currentTitle = personalInfo.animatedTitles[titleIndex];
    const typingSpeed = isDeleting ? 30 : 65;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayedText(currentTitle.substring(0, displayedText.length + 1));
        if (displayedText.length + 1 === currentTitle.length) {
          setTimeout(() => setIsDeleting(true), 2200);
        }
      } else {
        setDisplayedText(currentTitle.substring(0, displayedText.length - 1));
        if (displayedText.length === 0) {
          setIsDeleting(false);
          setTitleIndex((prev) => (prev + 1) % personalInfo.animatedTitles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, titleIndex]);

  // Enhancement #10: Parallax depth on Hero background elements
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const parallaxX1 = useSpring(useTransform(mouseX, [-600, 600], [-22, 22]), { stiffness: 100, damping: 24 });
  const parallaxY1 = useSpring(useTransform(mouseY, [-600, 600], [-22, 22]), { stiffness: 100, damping: 24 });
  const parallaxX2 = useSpring(useTransform(mouseX, [-600, 600], [28, -28]), { stiffness: 100, damping: 24 });
  const parallaxY2 = useSpring(useTransform(mouseY, [-600, 600], [28, -28]), { stiffness: 100, damping: 24 });

  const handleHeroMouseMove = (e) => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const { clientX, clientY } = e;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    mouseX.set(clientX - centerX);
    mouseY.set(clientY - centerY);
  };

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const topOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + (window.scrollY || window.pageYOffset || 0) - topOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      if (window.history && window.history.pushState) {
        window.history.pushState(null, '', `#${id}`);
      }
    } else {
      window.location.href = `/${id}`;
    }
  };

  return (
    <section
      id="hero"
      onMouseMove={handleHeroMouseMove}
      className="relative min-h-[92vh] pt-32 sm:pt-40 pb-20 flex items-center overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Bold Headline & Content (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            {/* Sci-Fi HUD Availability Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full hud-card border text-xs sm:text-sm font-semibold mb-4">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-amber opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent-amber" />
              </span>
              <span className="text-[#14181C] dark:text-[#EDEDE6]">
                Open for Campus Placements & Engineering Roles
              </span>
            </div>

            {/* Dynamic Local Time-Based Greeting */}
            <div className="flex items-center gap-2 mb-2 text-xs sm:text-sm font-mono font-medium text-accent-moss">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-moss animate-pulse" />
              <span>{timeGreeting}</span>
              <span className="text-slate-400 dark:text-content-muted font-sans text-xs">• Welcome to my portfolio</span>
            </div>

            {/* Large Bold Headline with Soft Glow Behind Name */}
            <div className="relative">
              <motion.div
                style={{ x: parallaxX1, y: parallaxY1 }}
                className="absolute -top-10 -left-10 w-72 h-36 bg-accent-moss/10 blur-3xl -z-10 pointer-events-none rounded-full"
              />
              
              <h1 className="font-heading font-extrabold text-4xl sm:text-6xl lg:text-7xl tracking-tight text-[#14181C] dark:text-[#EDEDE6] leading-[1.08]">
                Hi, I'm{' '}
                <span className="relative inline-block">
                  <span className="hud-headline-gradient">Ansh Singh</span>
                  {/* Topographic Survey underline accent */}
                  <span className="absolute -bottom-1.5 left-0 right-0 h-1 bg-gradient-to-r from-accent-moss via-accent-mossDeep to-transparent rounded-full" />
                </span>
              </h1>
            </div>

            {/* Typewriter Role Line (High Contrast) */}
            <div className="mt-5 h-12 flex items-center">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-heading font-semibold text-[#14181C] dark:text-[#EDEDE6] flex items-center flex-wrap gap-2">
                <span className="text-slate-600 dark:text-content-muted">Specializing in</span>
                <span className="text-accent-moss font-bold">
                  {displayedText}
                </span>
                <span className="inline-block w-0.5 h-6 bg-accent-moss animate-pulse" />
              </h2>
            </div>

            {/* 2-Line High-Contrast Intro Body (Min 16px, line-height 1.6+) */}
            <p className="mt-4 text-base sm:text-lg text-slate-700 dark:text-[#EDEDE6] max-w-2xl leading-relaxed font-sans">
              Computer Science undergraduate at{' '}
              <strong className="text-[#14181C] dark:text-white font-semibold">
                Lovely Professional University
              </strong>{' '}
              passionate about architecting production-ready full-stack web applications with modern React UI,
              scalable Express REST APIs, and resilient MongoDB schemas.
            </p>

            {/* Fast Location & Academic Status Badges */}
            <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-slate-600 dark:text-content-muted">
              <span className="inline-flex items-center gap-1.5 font-medium">
                <GraduationCap size={17} className="text-accent-moss" />
                <span className="text-[#14181C] dark:text-[#EDEDE6] font-semibold">CGPA 8.3 / 10.0</span>
              </span>
              <span className="opacity-40">•</span>
              <span className="inline-flex items-center gap-1.5 font-medium">
                <MapPin size={17} className="text-accent-mossDeep" />
                <span>{personalInfo.location}</span>
              </span>
            </div>

            {/* Call To Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <MagneticButton>
                <a
                  href="#projects"
                  onClick={(e) => scrollToSection(e, 'projects')}
                  className="btn-hud-primary px-6 py-3.5 rounded-xl text-sm sm:text-base font-bold flex items-center gap-2.5 transform hover:-translate-y-0.5"
                >
                  <span>View Projects</span>
                  <ArrowRight size={17} />
                </a>
              </MagneticButton>

              {/* Download Resume Button */}
              <MagneticButton>
                <a
                  href={getResumeDownloadUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  download="Ansh_Singh_Resume.pdf"
                  className="px-6 py-3.5 rounded-xl text-sm sm:text-base font-semibold hud-card hud-card-interactive text-[#14181C] dark:text-[#EDEDE6] flex items-center gap-2 border"
                >
                  <FileDown size={17} className="text-accent-moss" />
                  <span>Download Resume</span>
                </a>
              </MagneticButton>

              {/* Contact Me CTA */}
              <MagneticButton>
                <a
                  href="#contact"
                  onClick={(e) => scrollToSection(e, 'contact')}
                  className="px-5 py-3.5 rounded-xl text-sm sm:text-base font-medium text-slate-700 dark:text-content-muted hover:text-[#14181C] dark:hover:text-[#EDEDE6] transition-colors"
                >
                  Contact Me
                </a>
              </MagneticButton>
            </div>

            {/* Social Links Row */}
            <div className="mt-10 pt-6 border-t border-slate-200 dark:border-white/10 flex items-center gap-4 text-sm text-slate-600 dark:text-content-muted">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-content-muted">
                Connect:
              </span>

              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="p-2.5 rounded-xl hud-card hud-card-interactive text-slate-700 dark:text-content-muted hover:text-accent-moss dark:hover:text-accent-moss"
              >
                <Github size={18} />
              </a>

              <a
                href={personalInfo.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="p-2.5 rounded-xl hud-card hud-card-interactive text-slate-700 dark:text-content-muted hover:text-accent-moss dark:hover:text-accent-moss"
              >
                <Linkedin size={18} />
              </a>

              <a
                href={`mailto:${personalInfo.email}`}
                aria-label="Send Email"
                className="p-2.5 rounded-xl hud-card hud-card-interactive text-slate-700 dark:text-content-muted hover:text-accent-moss dark:hover:text-accent-moss"
              >
                <Mail size={18} />
              </a>
            </div>

          </motion.div>

          {/* Right Column: Floating Glass-Panel HUD Card (5 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-5"
          >
            <div className="relative">
              {/* Background HUD accent glow behind card with inverse parallax */}
              <motion.div
                style={{ x: parallaxX2, y: parallaxY2 }}
                className="absolute -inset-2 bg-accent-moss/10 rounded-3xl blur-xl opacity-40 -z-10"
              />

              {/* Glassmorphic HUD Panel Card */}
              <div className="hud-card p-6 sm:p-8 rounded-3xl border shadow-2xl relative overflow-hidden">
                
                {/* HUD Header Bar */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200 dark:border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-accent-amber animate-pulse" />
                    <span className="font-mono text-xs uppercase tracking-wider font-semibold text-accent-moss">
                      HUD // DEV.PROFILE.LIVE
                    </span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-accent-mossDeep/20 text-accent-moss border border-accent-mossDeep/30">
                    MERN Stack
                  </span>
                </div>

                {/* Profile Identity Badge */}
                <div className="flex items-center gap-3.5 mb-5 p-3 rounded-2xl bg-slate-100/70 dark:bg-[#1B2127]/90 border border-slate-200/80 dark:border-white/5">
                  <div className="relative shrink-0">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl p-[2px] bg-gradient-to-tr from-accent-moss via-accent-mossDeep to-accent-amber shadow-hud-glow overflow-hidden">
                      <img
                        src={personalInfo.profileImage || "/profile.png"}
                        alt={personalInfo.name}
                        className="w-full h-full object-cover object-top rounded-[14px]"
                      />
                    </div>
                    <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-accent-amber border-2 border-white dark:border-[#12161A] flex items-center justify-center" title="Available for Roles">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                    </span>
                  </div>
                  <div className="min-w-0">
                    <div className="text-base sm:text-lg font-bold font-heading text-[#14181C] dark:text-[#EDEDE6] leading-tight truncate">
                      {personalInfo.name}
                    </div>
                    <div className="text-xs text-accent-moss font-mono font-medium truncate">
                      Full-Stack MERN Developer
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-content-muted flex items-center gap-1 mt-0.5 truncate">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-moss" />
                      <span>LPU B.Tech CSE • Ready to Ship</span>
                    </div>
                  </div>
                </div>

                {/* Core Metric Highlights */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-4 rounded-2xl bg-slate-100/80 dark:bg-[#1B2127]/90 border border-slate-200 dark:border-white/10">
                    <div className="flex items-center gap-2 text-accent-moss mb-1">
                      <GraduationCap size={18} />
                      <span className="text-xs font-semibold text-slate-500 dark:text-content-muted">LPU B.Tech</span>
                    </div>
                    <div className="text-2xl font-heading font-extrabold text-[#14181C] dark:text-[#EDEDE6]">
                      <AnimatedCounter to={8.3} decimals={1} suffix=" CGPA" />
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-content-muted mt-0.5">
                      Computer Science
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-100/80 dark:bg-[#1B2127]/90 border border-slate-200 dark:border-white/10">
                    <div className="flex items-center gap-2 text-accent-mossDeep mb-1">
                      <Code2 size={18} />
                      <span className="text-xs font-semibold text-slate-500 dark:text-content-muted">Live Projects</span>
                    </div>
                    <div className="text-2xl font-heading font-extrabold text-[#14181C] dark:text-[#EDEDE6]">
                      <AnimatedCounter to={4} suffix="+ Built" />
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-content-muted mt-0.5">
                      Full-Stack & Real-Time
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-100/80 dark:bg-[#1B2127]/90 border border-slate-200 dark:border-white/10">
                    <div className="flex items-center gap-2 text-accent-moss mb-1">
                      <Sparkles size={18} />
                      <span className="text-xs font-semibold text-slate-500 dark:text-content-muted">Credentials</span>
                    </div>
                    <div className="text-2xl font-heading font-extrabold text-[#14181C] dark:text-[#EDEDE6]">
                      <AnimatedCounter to={11} suffix=" Verified" />
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-content-muted mt-0.5">
                      NASSCOM, iamneo & LPU
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-100/80 dark:bg-[#1B2127]/90 border border-slate-200 dark:border-white/10">
                    <div className="flex items-center gap-2 text-emerald-400 mb-1">
                      <CheckCircle2 size={18} />
                      <span className="text-xs font-semibold text-slate-500 dark:text-content-muted">Internship</span>
                    </div>
                    <div className="text-2xl font-heading font-extrabold text-[#14181C] dark:text-[#EDEDE6]">
                      Completed
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-content-muted mt-0.5">
                      Info Bharat Interns
                    </div>
                  </div>
                </div>

                {/* Tech Stack Chips (High Contrast) */}
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-content-muted mb-3 flex items-center justify-between">
                    <span>Core Technology Stack</span>
                    <span className="text-accent-moss font-mono text-[11px]">v2026.ready</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {['MongoDB', 'Express.js', 'React.js', 'Node.js', 'Tailwind CSS', 'REST APIs', 'JWT', 'Socket.IO'].map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-[#222A30] text-[#14181C] dark:text-[#EDEDE6] border border-slate-200 dark:border-white/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* HUD Footer Status */}
                <div className="mt-6 pt-4 border-t border-slate-200 dark:border-white/10 flex items-center justify-between text-xs text-slate-500 dark:text-content-muted">
                  <div className="flex items-center gap-2">
                    <Activity size={14} className="text-accent-moss" />
                    <span>Server: Unified Port 5000</span>
                  </div>
                  <span className="text-emerald-500 dark:text-emerald-400 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>Database Online</span>
                  </span>
                </div>

              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
