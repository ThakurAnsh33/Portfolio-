import React from 'react';
import { motion } from 'framer-motion';
import {
  GitCommit,
  Sparkles,
  Calendar,
  Layers,
  CheckCircle2,
  Clock,
  ExternalLink,
  Tag,
  Radio,
} from 'lucide-react';
import { PageSEO } from '../components/PageSEO';
import { SectionHeading } from '../components/SectionHeading';
import { changelogEntries, personalInfo } from '../data/portfolioData';

export const ChangelogPage = () => {
  return (
    <div className="py-12 sm:py-16">
      <PageSEO
        title="Changelog & Now"
        description="Engineering devlog and what Ansh Singh is currently building, learning, and shipping across the MERN stack."
        pathname="/changelog"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <SectionHeading
          badge="Engineering Log"
          title="Changelog &amp; Current Focus"
          subtitle="A transparent log of what I'm currently designing, studying, and shipping into production."
        />

        {/* 'Now' Card: Current Engineering Sprints */}
        <div className="p-6 sm:p-8 rounded-3xl hud-card border border-accent-cyan/40 dark:bg-[#05060f]/95 bg-white/95 shadow-xl relative overflow-hidden space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/10">
            <div className="flex items-center gap-2 text-accent-cyan font-mono text-xs font-bold">
              <Radio size={14} className="animate-pulse" />
              <span>LIVE SPRINT STATUS (NOW)</span>
            </div>
            <span className="text-[11px] font-mono text-slate-600 dark:text-slate-400">September 2026</span>
          </div>

          <div className="space-y-3">
            <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white">
              What I'm Actively Focused On:
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <li className="flex items-start gap-2.5">
                <span className="text-accent-cyan mt-0.5">▸</span>
                <span>
                  <strong>Multi-page portfolio upgrade:</strong> Migrated from monolithic single-page to React Router v7 with dynamic case studies &amp; developer command palette.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-accent-cyan mt-0.5">▸</span>
                <span>
                  <strong>CivicPulse Platform:</strong> Fine-tuning NLP sentiment polarity models and MongoDB geospatial aggregations for civic emergency response.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-accent-cyan mt-0.5">▸</span>
                <span>
                  <strong>Algorithms &amp; System Design:</strong> Deepening daily LeetCode practice in graph theory, dynamic programming, and distributed message queues.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Git-Style Changelog Timeline */}
        <div className="space-y-8 pt-4">
          <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-[#f2f3f8] flex items-center gap-2">
            <GitCommit size={20} className="text-accent-cyan" />
            <span>Changelog Timeline</span>
          </h3>

          <div className="relative border-l-2 border-slate-200 dark:border-white/10 ml-4 pl-6 space-y-10">
            {changelogEntries.map((entry, idx) => (
              <motion.div
                key={entry.version}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.1 }}
                className="relative space-y-3"
              >
                {/* Git Node Indicator */}
                <div className="absolute -left-[33px] top-1.5 w-4 h-4 rounded-full bg-slate-100 dark:bg-[#05060f] border-2 border-accent-cyan flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-cyan" />
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="px-2.5 py-0.5 rounded-md text-xs font-mono font-bold bg-accent-cyan/15 text-accent-cyan border border-accent-cyan/30">
                    {entry.version}
                  </span>
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                    {entry.date}
                  </span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                    entry.status === 'Shipped'
                      ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                      : 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                  }`}>
                    {entry.status}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    [{entry.type}]
                  </span>
                </div>

                <div className="p-5 sm:p-6 rounded-2xl hud-card border border-slate-200 dark:border-white/10 space-y-3">
                  <h4 className="text-base sm:text-lg font-bold font-heading text-slate-900 dark:text-[#f2f3f8]">
                    {entry.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-[#a6adc8] leading-relaxed">
                    {entry.summary}
                  </p>

                  <div className="pt-2 border-t border-slate-200 dark:border-white/10 space-y-1.5">
                    {entry.highlights.map((h, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-[#e6e6f0]">
                        <CheckCircle2 size={13} className="text-emerald-500 mt-0.5 shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

