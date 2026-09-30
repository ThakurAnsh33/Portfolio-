import React from 'react';
import { motion } from 'framer-motion';
import {
  Briefcase,
  Calendar,
  Building2,
  CheckCircle2,
  Trophy,
  Code2,
  Layers,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { PageSEO } from '../components/PageSEO';
import { SectionHeading } from '../components/SectionHeading';
import { experience, personalInfo } from '../data/portfolioData';

export const ExperiencePage = () => {
  const hackathons = [
    {
      title: 'WEB-A-THON 2.0 (ARENA)',
      period: 'Feb 2026 (24-Hour Sprint)',
      role: 'Full-Stack Lead Developer',
      award: 'Hackathon Finalist',
      description:
        'Engineered an on-demand Home Services marketplace platform in a 24-hour continuous hackathon organized by ARENA at Lovely Professional University.',
      contributions: [
        'Designed normalized MongoDB data models for services, providers, booking slots, and user reviews.',
        'Created high-throughput Express REST routes with input validation for rapid booking creation.',
        'Implemented dynamic React UI with Tailwind CSS tailored for seamless mobile client bookings.',
        'Pitch presented the working MVP before technical judges, addressing concurrency and provider authentication questions.',
      ],
      tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS'],
    },
  ];

  return (
    <div className="py-12 sm:py-16">
      <PageSEO
        title="Experience & Hackathons"
        description="Professional software development internship experience and hackathon achievements of Ansh Singh."
        pathname="/experience"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <SectionHeading
          badge="Career Milestones"
          title="Experience &amp; Hackathons"
          subtitle="Real-world engineering contributions: production service marketplaces, rapid 24-hour hackathons, and cross-functional sprints."
        />

        {/* Section 1: Professional Internship Experience */}
        <div className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent-cyan/10 text-accent-cyan flex items-center justify-center">
              <Briefcase size={20} />
            </div>
            <div>
              <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-[#f2f3f8]">
                Industry Experience
              </h3>
              <p className="text-xs text-slate-600 dark:text-[#a6adc8]">
                Software development internships &amp; marketplace engineering
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {experience.map((exp, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="p-6 sm:p-8 rounded-3xl hud-card border border-slate-200 dark:border-white/10 space-y-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-white/10">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-accent-cyan/10 text-accent-cyan flex items-center justify-center shrink-0">
                      <Building2 size={24} />
                    </div>
                    <div>
                      <h4 className="text-lg sm:text-xl font-extrabold font-heading text-slate-900 dark:text-[#f2f3f8]">
                        {exp.role}
                      </h4>
                      <div className="text-sm font-semibold text-accent-cyan mt-0.5">
                        {exp.company}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-[#a6adc8] flex items-center gap-2 mt-1">
                        <span>{exp.type}</span>
                        <span>•</span>
                        <span className="font-mono">{exp.period}</span>
                      </div>
                    </div>
                  </div>

                  <span className="self-start sm:self-center px-3 py-1 rounded-full text-xs font-mono font-bold bg-accent-cyan/15 text-accent-cyan border border-accent-cyan/30">
                    {exp.badge}
                  </span>
                </div>

                <p className="text-sm text-slate-700 dark:text-[#a6adc8] leading-relaxed">
                  {exp.description}
                </p>

                {/* Key Deliverables */}
                <div className="space-y-3">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-accent-cyan block">
                    Key Deliverables &amp; Impact:
                  </span>
                  <div className="space-y-2.5">
                    {exp.highlights.map((item, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 dark:text-[#e6e6f0] leading-relaxed">
                        <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack Pills */}
                <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex flex-wrap gap-2">
                  {exp.tech.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-lg text-xs font-mono font-semibold bg-slate-100 dark:bg-[#14172a] text-slate-800 dark:text-[#f2f3f8] border border-slate-200 dark:border-white/10"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Section 2: Competitive Hackathons */}
        <div className="space-y-8 pt-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <Trophy size={20} />
            </div>
            <div>
              <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-[#f2f3f8]">
                Competitive Hackathons &amp; Sprints
              </h3>
              <p className="text-xs text-slate-600 dark:text-[#a6adc8]">
                High-intensity engineering sprints under tight time constraints
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {hackathons.map((h, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="p-6 sm:p-8 rounded-3xl hud-card border border-slate-200 dark:border-white/10 space-y-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-white/10">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
                      <Trophy size={24} />
                    </div>
                    <div>
                      <h4 className="text-lg sm:text-xl font-extrabold font-heading text-slate-900 dark:text-[#f2f3f8]">
                        {h.title}
                      </h4>
                      <div className="text-sm font-semibold text-amber-500 dark:text-amber-400 mt-0.5">
                        {h.role}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-[#a6adc8] font-mono mt-1">
                        {h.period}
                      </div>
                    </div>
                  </div>

                  <span className="self-start sm:self-center px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                    ⭐ {h.award}
                  </span>
                </div>

                <p className="text-sm text-slate-700 dark:text-[#a6adc8] leading-relaxed">
                  {h.description}
                </p>

                <div className="space-y-3">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-accent-cyan block">
                    Engineering Execution:
                  </span>
                  <div className="space-y-2.5">
                    {h.contributions.map((c, cIdx) => (
                      <div key={cIdx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 dark:text-[#e6e6f0] leading-relaxed">
                        <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                        <span>{c}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex flex-wrap gap-2">
                  {h.tech.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-lg text-xs font-mono font-semibold bg-slate-100 dark:bg-[#14172a] text-slate-800 dark:text-[#f2f3f8] border border-slate-200 dark:border-white/10"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

