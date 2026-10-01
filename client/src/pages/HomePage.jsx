import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Sparkles,
  Code2,
  Terminal,
  Activity,
  Layers,
  Cpu,
  GraduationCap,
  Briefcase,
  Mail,
  Github,
  Linkedin,
} from 'lucide-react';
import { Hero } from '../components/Hero';
import { ProjectCard } from '../components/ProjectCard';
import { PageSEO } from '../components/PageSEO';
import { personalInfo, stats, projects, skillCategories } from '../data/portfolioData';

export const HomePage = () => {
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);
  const coreSkills = skillCategories.flatMap((c) => c.skills).slice(0, 10);

  return (
    <div>
      <PageSEO
        title="Home"
        description="Full Stack MERN Developer portfolio of Ansh Singh — Building scalable web applications, real-time distributed architectures, and modern React interfaces."
        pathname="/"
      />

      {/* Hero Header Section */}
      <Hero />

      {/* Condensed About & Philosophy Teaser */}
      <section id="about" className="py-20 relative border-t border-slate-200 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-accent-moss/10 text-accent-moss border border-accent-moss/20">
                <Sparkles size={13} />
                <span>Executive Overview</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 dark:text-[#EDEDE6] tracking-tight">
                Architecting Full-Stack Systems with <span className="text-accent-moss">Precision & Performance</span>
              </h2>

              <p className="text-base text-slate-700 dark:text-[#9AA39A] leading-relaxed">
                {personalInfo.bioIntro}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                {stats.map((s, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl hud-card border border-slate-200 dark:border-white/10 text-center"
                  >
                    <div className="text-2xl font-extrabold font-heading text-accent-moss">
                      {s.value}
                    </div>
                    <div className="text-xs font-bold text-slate-900 dark:text-[#EDEDE6] mt-0.5">
                      {s.label}
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                      {s.detail}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold btn-hud-primary"
                >
                  <span>Read Full Background & Education</span>
                  <ArrowRight size={16} />
                </Link>

                <Link
                  to="/experience"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold hud-card text-slate-700 dark:text-[#EDEDE6] hover:text-accent-moss border border-slate-200 dark:border-white/10 transition-colors"
                >
                  <Briefcase size={16} />
                  <span>Work Experience</span>
                </Link>
              </div>
            </div>

            {/* Live Terminal & Interactive Capabilities Card */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-6 rounded-3xl hud-card border border-accent-moss/30 dark:bg-[#12161A]/90 bg-white/95 space-y-4 shadow-xl">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/10 text-xs font-mono text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-2 text-accent-moss font-bold">
                    <Terminal size={14} /> Developer Quick Bar
                  </span>
                  <span className="text-emerald-500 dark:text-emerald-400 font-semibold">READY</span>
                </div>

                <div className="space-y-2 text-xs font-mono text-slate-700 dark:text-slate-300">
                  <div className="text-slate-500"># Fast navigate using keyboard shortcuts:</div>
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#1B2127] border border-slate-200 dark:border-white/5 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Command Palette:</span>
                      <span className="px-2 py-0.5 rounded bg-accent-amber/15 text-accent-amber font-bold">Ctrl + K</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Shortcut Cheat Sheet:</span>
                      <span className="px-2 py-0.5 rounded bg-accent-moss/15 text-accent-moss font-bold">?</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Quick Jump Routes:</span>
                      <span className="px-2 py-0.5 rounded bg-accent-moss/15 text-accent-moss font-bold">G + [H/A/S/E/P/C]</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <div className="text-xs font-mono text-slate-600 dark:text-slate-400 mb-2">Core Tech Competencies:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {coreSkills.map((s) => (
                      <Link
                        key={s.name}
                        to={`/projects?tech=${encodeURIComponent(s.name.toLowerCase())}`}
                        className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:text-accent-moss hover:bg-accent-moss/10 border border-slate-200 dark:border-white/10 transition-colors"
                      >
                        {s.name}
                      </Link>
                    ))}
                  </div>
                </div>

                <Link
                  to="/skills"
                  className="block text-center text-xs font-mono text-accent-moss hover:underline pt-1"
                >
                  → View Interactive Skills &amp; Projects Matrix
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section id="projects" className="py-20 relative bg-slate-50/50 dark:bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-accent-moss/10 text-accent-moss border border-accent-moss/20 mb-3">
                <Code2 size={13} />
                <span>Selected Works</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 dark:text-[#EDEDE6]">
                Production &amp; Flagship Engineering
              </h2>
              <p className="text-sm text-slate-600 dark:text-[#9AA39A] mt-1 max-w-xl">
                End-to-end full stack implementations with real-time bidding, AI triage, and scalable REST services.
              </p>
            </div>

            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-sm font-bold text-accent-moss hover:text-accent-mossDeep transition-colors group"
            >
              <span>Explore All Projects ({projects.length})</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredProjects.map((project, index) => (
              <div
                key={project.id}
                className={project.id === 'ner-slap' ? 'col-span-1 md:col-span-2' : 'col-span-1'}
              >
                <ProjectCard
                  project={project}
                  index={index}
                  isHeroVariant={project.id === 'ner-slap'}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live GitHub Teaser Strip */}
      <section className="py-14 relative border-t border-slate-200 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 rounded-3xl hud-card border border-slate-200 dark:border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl dark:bg-[#1B2127] bg-slate-100 border border-slate-200 dark:border-white/15 flex items-center justify-center text-accent-moss shrink-0">
                <Activity size={28} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg sm:text-xl font-bold font-heading text-slate-900 dark:text-[#EDEDE6]">
                    Live GitHub Intelligence &amp; Repositories
                  </h3>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-[#9AA39A] mt-0.5">
                  Track real-time commits, open source contributions, and star counts directly from the Express API proxy.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Link
                to="/activity"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold btn-hud-primary"
              >
                <span>View Live Activity</span>
                <ArrowRight size={15} />
              </Link>
              <Link
                to="/changelog"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold hud-card text-slate-700 dark:text-[#EDEDE6] hover:text-accent-moss border border-slate-200 dark:border-white/10 transition-colors"
              >
                <span>Engineering Log</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA Strip */}
      <section id="contact" className="py-20 relative border-t border-slate-200 dark:border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-semibold bg-accent-moss/15 text-accent-moss border border-accent-moss/30">
            <Mail size={13} />
            <span>Open for Opportunities</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 dark:text-[#EDEDE6]">
            Let's Build Something High-Impact Together
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-[#9AA39A] max-w-xl mx-auto leading-relaxed">
            I'm actively seeking Full-Time Software Engineering roles &amp; Full-Stack MERN opportunities. Reach out for project inquiries, technical interviews, or collaboration.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold btn-hud-primary"
            >
              <Mail size={16} />
              <span>Send a Message (Contact Form)</span>
            </Link>

            <a
              href={`mailto:${personalInfo.email}`}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold hud-card text-slate-700 dark:text-[#EDEDE6] hover:text-accent-moss border border-slate-200 dark:border-white/10 transition-colors"
            >
              <Mail size={16} className="text-accent-moss" />
              <span>Email Directly</span>
            </a>

            <a
              href={personalInfo.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold hud-card text-slate-700 dark:text-[#EDEDE6] hover:text-accent-moss border border-slate-200 dark:border-white/10 transition-colors"
            >
              <Linkedin size={16} />
              <span>LinkedIn</span>
            </a>

            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold hud-card text-slate-700 dark:text-[#EDEDE6] hover:text-accent-moss border border-slate-200 dark:border-white/10 transition-colors"
            >
              <Github size={16} />
              <span>GitHub Profile</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

