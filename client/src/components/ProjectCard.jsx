import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Github,
  Calendar,
  CheckCircle2,
  Sparkles,
  ArrowUpRight,
  Eye,
  EyeOff,
  ExternalLink,
  Laptop,
  Maximize2,
  Layers,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { TiltCard } from './TiltCard';

export const ProjectCard = ({ project, index, isHeroVariant = false }) => {
  const [showPreview, setShowPreview] = useState(false);
  const isNerSlap = project.id === 'ner-slap';

  const handleLiveDemoClick = () => {
    if (project.liveDemoUrl.includes('github.com')) {
      toast.success(
        `Live deployment preview for "${project.title.split('—')[0]}" is being hosted. Redirecting to repository code.`,
        { icon: '🚀' }
      );
    }
  };

  const handleGithubClick = (e) => {
    if (project.githubUrl.includes('<your') || project.githubUrl.includes('placeholder')) {
      e.preventDefault();
      toast('Please configure your actual NER-SLAP GitHub repository link in client/src/data/portfolioData.js', {
        icon: '💡',
        duration: 5000,
      });
    }
  };

  const isRealDeployedUrl =
    project.liveDemoUrl &&
    !project.liveDemoUrl.includes('github.com') &&
    project.liveDemoUrl.startsWith('http');

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-full"
    >
      <TiltCard className={`group hud-card hud-card-interactive rounded-3xl overflow-hidden border flex flex-col justify-between h-full ${
        isNerSlap ? 'border-emerald-500/40 shadow-lg shadow-emerald-500/5' : ''
      }`}>
      <div>
        {/* Visual Header Banner with Gradient */}
        <div
          className={`${isHeroVariant ? 'h-52 sm:h-56' : 'h-48'} relative overflow-hidden bg-gradient-to-br ${project.gradient} p-6 flex flex-col justify-between`}
        >
          <div className="absolute inset-0 bg-hud-grid opacity-30"></div>

          <div className="relative z-10 flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-black/60 dark:bg-black/70 backdrop-blur-md text-white border border-white/20">
              <Calendar size={12} className="text-accent-cyan" />
              {project.date}
            </span>

            {isNerSlap ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider bg-emerald-500 text-[#05060f] shadow-md">
                <Sparkles size={11} />
                SIH 2026 Grand Finale Flagship
              </span>
            ) : (
              project.featured && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-accent-cyan text-[#05060f] shadow-sm">
                  <Sparkles size={10} />
                  Featured
                </span>
              )
            )}
          </div>

          <div className="relative z-10">
            <h4 className="text-xs uppercase font-mono tracking-wider text-slate-800 dark:text-accent-cyan font-bold mb-1">
              {project.subtitle}
            </h4>
            <Link to={`/projects/${project.id}`}>
              <h3 className={`${isHeroVariant ? 'text-xl sm:text-2xl lg:text-3xl' : 'text-xl'} font-extrabold font-heading text-slate-900 dark:text-[#f2f3f8] drop-shadow-sm hover:text-accent-cyan transition-colors flex items-center gap-1.5`}>
                <span>{project.title}</span>
                <ArrowUpRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity text-accent-cyan shrink-0" />
              </h3>
            </Link>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6">
          {/* Tech Stack Badges */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tags.map((tag) => (
              <Link
                key={tag}
                to={`/projects?tech=${encodeURIComponent(tag.toLowerCase())}`}
                className="px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold bg-slate-100 dark:bg-[#14172a] text-[#0b0d1a] dark:text-[#f2f3f8] border border-slate-200 dark:border-white/10 hover:border-accent-cyan/50 hover:text-accent-cyan transition-colors"
                title={`Filter projects by ${tag}`}
              >
                {tag}
              </Link>
            ))}
          </div>

          {/* Description */}
          <p className="text-sm text-slate-700 dark:text-[#e6e6f0] leading-relaxed mb-4">
            {project.description}
          </p>

          {/* Key Highlights / Features Container */}
          <div className="space-y-2 mb-4 bg-slate-100/90 dark:bg-[#14172a]/95 p-4 rounded-2xl border border-slate-200 dark:border-white/10">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-accent-cyan block mb-2">
              Core Highlights:
            </span>
            {project.features.slice(0, 3).map((feat, fIdx) => (
              <div key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#0b0d1a] dark:text-[#f2f3f8] leading-relaxed">
                <CheckCircle2 size={15} className="text-emerald-500 shrink-0 mt-0.5" />
                <span>{feat}</span>
              </div>
            ))}
          </div>

          {/* Inline Live Frame / Code Preview Accordion */}
          <AnimatePresence>
            {showPreview && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden mb-4"
              >
                <div className="rounded-2xl border border-accent-cyan/30 bg-[#05060f] p-4 text-xs font-mono text-slate-300">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-slate-400">
                    <span className="flex items-center gap-1.5 text-accent-cyan">
                      <Laptop size={14} /> Interactive Preview Mockup
                    </span>
                    <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live Schema Ready
                    </span>
                  </div>
                  {isRealDeployedUrl ? (
                    <div className="space-y-2">
                      <p className="text-[11px] text-slate-400">
                        Active deployment detected. Click below to launch external web service.
                      </p>
                      <a
                        href={project.liveDemoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold btn-hud-primary"
                      >
                        <span>Open Live Service</span>
                        <ExternalLink size={13} />
                      </a>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="p-3 rounded-xl bg-[#0f1120] border border-white/5 space-y-1.5">
                        <div className="text-accent-cyan font-bold text-xs">{project.title.split('—')[0]}</div>
                        <p className="text-[11px] text-slate-400 leading-relaxed">
                          Full-stack architecture with REST API endpoints, real-time events, and database persistence.
                        </p>
                      </div>
                      <Link
                        to={`/projects/${project.id}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold btn-hud-primary"
                      >
                        <Layers size={13} />
                        <span>View Full Architecture & Code</span>
                      </Link>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Card Action Buttons */}
      <div className="p-6 pt-0 flex flex-col sm:flex-row items-center gap-2.5">
        <Link
          to={`/projects/${project.id}`}
          className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold btn-hud-primary"
        >
          <span>Case Study</span>
          <ArrowUpRight size={14} />
        </Link>

        <div className="w-full sm:w-auto flex items-center gap-2">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="px-3 py-2.5 rounded-xl text-xs font-semibold hud-card text-slate-800 dark:text-[#f2f3f8] hover:text-accent-cyan border border-slate-200 dark:border-white/10 flex items-center justify-center gap-1.5 transition-colors"
            title="Toggle quick preview"
          >
            {showPreview ? <EyeOff size={14} /> : <Eye size={14} />}
          </button>

          {project.liveDemoUrl && (
            <a
              href={project.liveDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1 px-3 py-2.5 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-[#05060f] shadow-sm transition-all"
              title="Launch Live Deployment"
            >
              <ExternalLink size={13} />
              <span>Demo</span>
            </a>
          )}

          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleGithubClick}
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold hud-card text-[#0b0d1a] dark:text-[#f2f3f8] hover:text-accent-cyan dark:hover:text-accent-cyan border border-slate-200 dark:border-white/10"
            title={project.githubUrl.includes('<your') ? 'Configure your repo URL in portfolioData.js' : 'Inspect Repository'}
          >
            <Github size={14} />
            <span>Code</span>
          </a>
        </div>
      </div>
      </TiltCard>
    </motion.div>
  );
};
