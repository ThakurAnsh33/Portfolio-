import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Award,
  Calendar,
  ShieldCheck,
  Hash,
  Copy,
  Check,
  Sparkles,
  Layers,
  Code2,
  Cpu,
  Terminal,
  BrainCircuit,
  Trophy,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { SectionHeading } from './SectionHeading';
import { TiltCard } from './TiltCard';
import { certifications } from '../data/portfolioData';

const categoryColorMap = {
  'Full Stack': {
    badge: 'bg-blue-500/10 text-brand-blue border-blue-500/20',
    iconBg: 'from-blue-600/20 to-cyan-600/20 text-brand-blue',
    icon: Layers,
  },
  DSA: {
    badge: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
    iconBg: 'from-purple-600/20 to-indigo-600/20 text-purple-500',
    icon: Cpu,
  },
  Language: {
    badge: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    iconBg: 'from-amber-600/20 to-orange-600/20 text-amber-500',
    icon: Terminal,
  },
  DevOps: {
    badge: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20',
    iconBg: 'from-cyan-600/20 to-blue-600/20 text-cyan-500',
    icon: Code2,
  },
  Hackathon: {
    badge: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
    iconBg: 'from-rose-600/20 to-pink-600/20 text-rose-500',
    icon: Trophy,
  },
  AI: {
    badge: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    iconBg: 'from-emerald-600/20 to-teal-600/20 text-emerald-500',
    icon: BrainCircuit,
  },
};

export const Certifications = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [copiedId, setCopiedId] = useState(null);

  const categories = ['All', 'Full Stack', 'DSA', 'Language', 'DevOps', 'Hackathon', 'AI'];

  const filteredCerts =
    selectedCategory === 'All'
      ? certifications
      : certifications.filter((c) => c.category === selectedCategory);

  const handleCopyId = (id) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    toast.success(`Credential ID copied: ${id}`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="certifications" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Credentials & Accreditations"
          title="Certifications & Achievements"
          subtitle="Full-stack development, algorithmic engineering, modern DevOps, and programming languages."
        />

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => {
            const count =
              cat === 'All'
                ? certifications.length
                : certifications.filter((c) => c.category === cat).length;
            const isSelected = selectedCategory === cat;

            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`relative px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                  isSelected
                    ? 'btn-hud-primary scale-105'
                    : 'hud-card text-slate-700 dark:text-[#a6adc8] border border-slate-200 dark:border-white/10 hover:border-accent-cyan hover:text-accent-cyan'
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isSelected
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-200/70 dark:bg-white/10 text-slate-700 dark:text-[#f2f3f8]'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Filterable Grid with Framer Motion Layout Transitions */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredCerts.map((cert) => {
              const catConfig = categoryColorMap[cert.category] || {
                badge: 'bg-blue-500/10 text-brand-blue border-blue-500/20',
                iconBg: 'from-blue-600/20 to-violet-600/20 text-brand-blue',
                icon: Award,
              };
              const CategoryIcon = catConfig.icon;

              return (
                <motion.div
                  key={cert.title + cert.date}
                  layout
                  initial={{ opacity: 0, scale: 0.90, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.90, y: 15 }}
                  transition={{
                    type: 'spring',
                    stiffness: 260,
                    damping: 22,
                    mass: 0.7,
                  }}
                  className="h-full"
                >
                  <TiltCard className="group hud-card p-6 rounded-3xl border border-slate-200/80 dark:border-white/10 hover:border-accent-cyan/50 flex flex-col justify-between transition-all duration-300 hover:shadow-hud-glow h-full">
                  <div>
                    {/* Header: Icon & Category Tag */}
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`w-11 h-11 rounded-2xl bg-gradient-to-tr ${catConfig.iconBg} border border-slate-200/50 dark:border-slate-700/50 flex items-center justify-center group-hover:scale-105 transition-transform`}
                      >
                        <CategoryIcon size={20} />
                      </div>
                      <span
                        className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${catConfig.badge}`}
                      >
                        {cert.category}
                      </span>
                    </div>

                    {/* Certification Title */}
                    <h3 className="text-base sm:text-lg font-bold font-heading text-slate-900 dark:text-[#f2f3f8] group-hover:text-accent-cyan transition-colors leading-snug">
                      {cert.title}
                    </h3>

                    {/* Issuer */}
                    <p className="text-xs sm:text-sm font-semibold text-brand-blue dark:text-accent-cyan mt-1.5">
                      {cert.issuer}
                    </p>

                    {/* Date */}
                    <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-[#a6adc8] mt-2 mb-3">
                      <Calendar size={13} />
                      <span>{cert.date}</span>
                    </div>

                    {/* Credential ID badge (if available) */}
                    {cert.credentialId && (
                      <div className="mb-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-[#14172a] border border-slate-200/80 dark:border-white/10 text-[11px] font-mono text-slate-800 dark:text-[#f2f3f8]">
                        <Hash size={12} className="text-accent-cyan" />
                        <span className="truncate max-w-[170px]" title={cert.credentialId}>
                          ID: {cert.credentialId}
                        </span>
                        <button
                          onClick={() => handleCopyId(cert.credentialId)}
                          title="Copy Credential ID"
                          className="hover:text-accent-cyan transition-colors ml-1 p-0.5"
                        >
                          {copiedId === cert.credentialId ? (
                            <Check size={12} className="text-emerald-500" />
                          ) : (
                            <Copy size={12} />
                          )}
                        </button>
                      </div>
                    )}

                    {/* Skills Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-200 dark:border-white/10">
                      {cert.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-100 dark:bg-[#14172a] text-slate-800 dark:text-[#f2f3f8] border border-slate-200 dark:border-white/10"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Verified Ribbon Footer */}
                  <div className="mt-5 pt-3 flex items-center justify-between border-t border-slate-200 dark:border-white/10 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck size={14} />
                      <span>Verified Credential</span>
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-[#a6adc8] font-mono">
                      Academics & Industry
                    </span>
                  </div>
                  </TiltCard>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
