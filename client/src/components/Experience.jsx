import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, CheckCircle2, Building2, Award } from 'lucide-react';
import { SectionHeading } from './SectionHeading';
import { experience } from '../data/portfolioData';

export const Experience = () => {
  return (
    <section id="experience" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Work Experience"
          title="Professional Journey"
          subtitle="Real-world engineering experience building scalable full-stack applications."
        />

        <div className="max-w-4xl mx-auto">
          <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-4 sm:ml-32 pl-6 sm:pl-8 space-y-12">
            {experience.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                {/* Timeline Node Icon */}
                <div className="absolute -left-[35px] sm:-left-[43px] top-1.5 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-tr from-blue-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-blue-500/30">
                  <Briefcase size={16} />
                </div>

                {/* Left Period Label (on large screens) */}
                <div className="hidden sm:block absolute -left-36 top-2 text-right w-24">
                  <span className="text-xs font-bold uppercase tracking-wider text-accent-cyan block">
                    Internship
                  </span>
                  <span className="text-xs text-slate-600 dark:text-[#a6adc8] block mt-0.5 font-medium">
                    Virtual
                  </span>
                </div>

                {/* Content Card */}
                <div className="hud-card p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-white/10 hover:border-accent-cyan/40 transition-all duration-300">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20">
                      <Award size={13} />
                      {item.badge}
                    </span>
                    <span className="text-xs font-medium text-slate-600 dark:text-[#a6adc8] flex items-center gap-1">
                      <Calendar size={13} />
                      {item.type}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold font-heading text-slate-900 dark:text-[#f2f3f8]">
                    {item.role}
                  </h3>

                  <div className="flex items-center gap-2 text-slate-600 dark:text-[#a6adc8] font-medium text-sm mt-1 mb-4">
                    <Building2 size={16} className="text-accent-cyan" />
                    <span className="text-slate-900 dark:text-[#f2f3f8] font-semibold">{item.company}</span>
                  </div>

                  <p className="text-slate-700 dark:text-[#e6e6f0] text-sm leading-relaxed mb-6">
                    {item.description}
                  </p>

                  {/* Bullet Points */}
                  <div className="space-y-3 mb-6">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-[#a6adc8]">
                      Key Contributions & Impact:
                    </h4>
                    {item.highlights.map((point, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-[#f2f3f8] leading-relaxed">
                        <CheckCircle2 size={16} className="text-accent-cyan mt-0.5 shrink-0" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack Chips */}
                  <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex flex-wrap gap-2">
                    {item.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-100 dark:bg-[#14172a] text-slate-800 dark:text-[#f2f3f8] border border-slate-200 dark:border-white/10 font-mono"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

