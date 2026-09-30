import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  GraduationCap,
  Award,
  FileDown,
  ExternalLink,
  Target,
  Zap,
  Users,
  BrainCircuit,
  Sparkles,
  Calendar,
  MapPin,
  CheckCircle2,
} from 'lucide-react';
import { PageSEO } from '../components/PageSEO';
import { SectionHeading } from '../components/SectionHeading';
import { personalInfo, coreStrengths, education, certifications } from '../data/portfolioData';
import { getResumeDownloadUrl } from '../utils/api';

export const AboutPage = () => {
  const [selectedCertCategory, setSelectedCertCategory] = useState('All');

  const certCategories = [
    'All',
    ...new Set(certifications.map((c) => c.category || c.badge).filter(Boolean)),
  ];

  const filteredCertifications =
    selectedCertCategory === 'All'
      ? certifications
      : certifications.filter(
          (c) => (c.category || c.badge) === selectedCertCategory
        );

  const iconMap = [Target, Zap, Users, BrainCircuit];

  return (
    <div className="py-12 sm:py-16">
      <PageSEO
        title="About & Education"
        description="Learn about Ansh Singh's educational background at Lovely Professional University, full-stack engineering mindset, and 11+ professional certifications."
        pathname="/about"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        
        {/* Section 1: Bio Story & Background */}
        <section id="story">
          <SectionHeading
            badge="Engineering Profile"
            title="About Ansh Singh"
            subtitle="Bridging software architecture principles, high-performance web engineering, and continuous learning."
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-7 space-y-6">
              <div className="hud-card p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-white/10 space-y-4">
                <h3 className="text-xl sm:text-2xl font-bold font-heading text-slate-900 dark:text-[#f2f3f8]">
                  Full-Stack MERN Engineer based in Punjab, India
                </h3>
                <p className="text-sm sm:text-base text-slate-700 dark:text-[#a6adc8] leading-relaxed">
                  {personalInfo.bioDetailed}
                </p>
                <p className="text-sm sm:text-base text-slate-700 dark:text-[#a6adc8] leading-relaxed">
                  My journey began with strong foundations in C++ and Java object-oriented design, expanding rapidly into distributed web applications, asynchronous Node.js microservices, and reactive React.js state architectures. I enjoy solving algorithmic bottlenecks and transforming complex system requirements into seamless user experiences.
                </p>

                <div className="pt-4 flex flex-wrap items-center gap-3">
                  <a
                    href={getResumeDownloadUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    download="Ansh_Singh_Resume.pdf"
                    className="btn-hud-primary px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2"
                  >
                    <FileDown size={16} />
                    <span>Download Tracked Resume (PDF)</span>
                  </a>
                  <a
                    href={personalInfo.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold hud-card text-slate-700 dark:text-[#f2f3f8] hover:text-accent-cyan border border-slate-200 dark:border-white/10 flex items-center gap-1.5 transition-colors"
                  >
                    <span>Connect on LinkedIn</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </div>

            {/* Core Strengths Grid */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {coreStrengths.map((st, idx) => {
                const IconComp = iconMap[idx % iconMap.length];
                return (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl hud-card border border-slate-200 dark:border-white/10 space-y-2 hover:border-accent-cyan/40 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl bg-accent-cyan/10 text-accent-cyan flex items-center justify-center">
                      <IconComp size={20} />
                    </div>
                    <h4 className="font-heading font-bold text-sm text-slate-900 dark:text-[#f2f3f8]">
                      {st.title}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-[#a6adc8] leading-relaxed">
                      {st.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Section 2: Education Timeline */}
        <section id="education">
          <SectionHeading
            badge="Academic Trajectory"
            title="Education &amp; Foundations"
            subtitle="Computer Science engineering at Lovely Professional University with consistent academic excellence."
          />

          <div className="max-w-4xl mx-auto space-y-6">
            {education.map((edu, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="p-6 sm:p-8 rounded-3xl hud-card border border-slate-200 dark:border-white/10 relative overflow-hidden"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-accent-cyan/10 text-accent-cyan flex items-center justify-center shrink-0">
                      <GraduationCap size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold font-heading text-slate-900 dark:text-[#f2f3f8]">
                        {edu.degree}
                      </h3>
                      <div className="text-xs sm:text-sm text-slate-600 dark:text-[#a6adc8] font-medium">
                        {edu.institution} · <span className="text-accent-cyan">{edu.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center sm:flex-col sm:items-end gap-2 shrink-0">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-accent-cyan text-[#05060f]">
                      {edu.score}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                      {edu.period}
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 dark:text-[#a6adc8] pt-4 leading-relaxed">
                  {edu.details}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Section 3: Professional Certifications */}
        <section id="certifications">
          <SectionHeading
            badge="Verified Credentials"
            title="Certifications &amp; Bootcamps"
            subtitle="Accredited qualifications across Full-Stack development, DSA, DevOps, and cloud systems."
          />

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {certCategories.map((cat) => {
              const isActive = selectedCertCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCertCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'btn-hud-primary text-[#05060f]'
                      : 'hud-card text-slate-700 dark:text-content-muted border border-slate-200 dark:border-white/10 hover:border-accent-cyan hover:text-accent-cyan'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCertifications.map((cert, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className="p-6 rounded-2xl hud-card border border-slate-200 dark:border-white/10 flex flex-col justify-between hover:border-accent-cyan/40 transition-colors"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-accent-cyan/15 text-accent-cyan border border-accent-cyan/30">
                      {cert.badge || cert.category || 'Certification'}
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                      {cert.date}
                    </span>
                  </div>

                  <h4 className="text-base font-bold font-heading text-slate-900 dark:text-[#f2f3f8] leading-snug">
                    {cert.title}
                  </h4>

                  <div className="text-xs text-slate-600 dark:text-[#a6adc8]">
                    Issued by <strong className="text-slate-900 dark:text-[#f2f3f8]">{cert.issuer}</strong>
                  </div>

                  {cert.credentialId && (
                    <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                      ID: {cert.credentialId}
                    </div>
                  )}
                </div>

                <div className="pt-4 mt-4 border-t border-slate-200 dark:border-white/10 flex flex-wrap gap-1.5">
                  {(cert.skills || []).map((sk) => (
                    <span
                      key={sk}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300"
                    >
                      {sk}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

