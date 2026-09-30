import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, MapPin, Award, BookOpen } from 'lucide-react';
import { SectionHeading } from './SectionHeading';
import { education } from '../data/portfolioData';

export const Education = () => {
  return (
    <section id="education" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Academic Background"
          title="Education & Qualifications"
          subtitle="Consistently high academic standing across engineering and foundational schooling."
        />

        <div className="max-w-4xl mx-auto">
          <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-4 sm:ml-32 pl-6 sm:pl-8 space-y-10">
            {education.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                {/* Timeline node icon */}
                <div className="absolute -left-[35px] sm:-left-[43px] top-1.5 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/20">
                  <GraduationCap size={16} />
                </div>

                {/* Left Period Label for desktop */}
                <div className="hidden sm:block absolute -left-36 top-2 text-right w-24">
                  <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-accent-cyan block">
                    {item.scoreType}
                  </span>
                  <span className="text-xs font-semibold text-slate-900 dark:text-[#f2f3f8] block mt-0.5">
                    {item.score}
                  </span>
                </div>

                {/* Content Card */}
                <div className="hud-card p-6 sm:p-7 rounded-3xl border border-slate-200/80 dark:border-white/10 hover:border-accent-cyan/40 transition-all duration-300">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20">
                      <Award size={13} />
                      {item.score}
                    </span>
                    <span className="text-xs font-medium text-slate-600 dark:text-[#a6adc8] flex items-center gap-1">
                      <Calendar size={13} />
                      {item.period}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold font-heading text-slate-900 dark:text-[#f2f3f8]">
                    {item.degree}
                  </h3>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs sm:text-sm text-slate-600 dark:text-[#a6adc8] font-medium mt-1 mb-3">
                    <span className="text-slate-900 dark:text-[#f2f3f8] font-semibold flex items-center gap-1.5">
                      <BookOpen size={14} className="text-accent-cyan" />
                      {item.institution}
                    </span>
                    <span className="flex items-center gap-1 text-slate-500 dark:text-[#a6adc8]">
                      <MapPin size={13} />
                      {item.location}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 dark:text-[#e6e6f0] leading-relaxed">
                    {item.details}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

