import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Github,
  ExternalLink,
  Calendar,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Terminal,
  Layers,
  Cpu,
  Database,
  Cloud,
  Code2,
  Activity,
  Gauge,
  TrendingUp,
  Navigation,
  Truck,
  ShieldAlert,
  DollarSign,
  MapPin,
  BarChart3,
  Server,
  ArrowDown,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { PageSEO } from '../components/PageSEO';
import { projects, personalInfo } from '../data/portfolioData';

// 8 Modules Specification for NER-SLAP
const nerSlapModules = [
  {
    num: '01',
    name: 'Corridor Dashboard',
    desc: 'Live Northeast corridor monitoring, active fleet status, weather radar, and disruption feed.',
    icon: Activity,
    accent: 'text-cyan-400',
    border: 'hover:border-cyan-500/50',
  },
  {
    num: '02',
    name: 'Route Optimizer',
    desc: 'OSRM road routing with mathematical Bézier-curve offline fallback for zero-connectivity zones.',
    icon: Navigation,
    accent: 'text-teal-400',
    border: 'hover:border-teal-500/50',
  },
  {
    num: '03',
    name: 'ETA Predictor',
    desc: 'ML-driven corridor transit arrival forecasting with calculated 90% confidence bounds.',
    icon: Gauge,
    accent: 'text-emerald-400',
    border: 'hover:border-emerald-500/50',
  },
  {
    num: '04',
    name: 'Disruption Alerts',
    desc: 'Landslide & hazard classifier (85.80% accuracy) with full confusion matrix & judge demo simulation panel.',
    icon: ShieldAlert,
    accent: 'text-rose-400',
    border: 'hover:border-rose-500/50',
  },
  {
    num: '05',
    name: 'Hub & POI Finder',
    desc: 'Spatial discovery of strategic fuel stations, hospitals, warehouses, and POIs across 8 NER states.',
    icon: MapPin,
    accent: 'text-blue-400',
    border: 'hover:border-blue-500/50',
  },
  {
    num: '06',
    name: 'Transport Matcher',
    desc: 'Enforces cold-chain temperature compliance and recommends rail freight transfers for heavy loads.',
    icon: Truck,
    accent: 'text-amber-400',
    border: 'hover:border-amber-500/50',
  },
  {
    num: '07',
    name: 'Cost Predictor',
    desc: 'Multi-variable ML regressor (R² = 0.9541, MAE ₹2.85/km) with an explainable 4-pillar cost breakdown.',
    icon: DollarSign,
    accent: 'text-indigo-400',
    border: 'hover:border-indigo-500/50',
  },
  {
    num: '08',
    name: 'LAS Engine',
    desc: '6-pillar Logistics Accessibility Score (0–100) with interactive radar visualization & district comparisons.',
    icon: BarChart3,
    accent: 'text-purple-400',
    border: 'hover:border-purple-500/50',
  },
];

export const ProjectDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  // Find matching project by id or slug
  const projectIndex = projects.findIndex(
    (p) => p.id === slug || p.slug === slug
  );

  const project = projects[projectIndex];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [slug]);

  if (!project) {
    return (
      <div className="py-24 text-center max-w-xl mx-auto px-4 space-y-6">
        <PageSEO title="Project Not Found" pathname={`/projects/${slug}`} />
        <div className="w-16 h-16 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto">
          <AlertCircle size={32} />
        </div>
        <h2 className="text-2xl font-bold font-heading text-slate-900 dark:text-[#EDEDE6]">
          Project Not Found
        </h2>
        <p className="text-sm text-slate-600 dark:text-[#9AA39A]">
          The project slug "{slug}" does not exist in our architectural records.
        </p>
        <Link to="/projects" className="btn-hud-primary px-5 py-2.5 rounded-xl text-xs font-bold inline-flex items-center gap-2">
          <ArrowLeft size={16} />
          <span>Return to Projects Catalog</span>
        </Link>
      </div>
    );
  }

  const isNerSlap = project.id === 'ner-slap';
  const prevProject = projectIndex > 0 ? projects[projectIndex - 1] : null;
  const nextProject = projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null;

  const handleCopyCode = (codeText) => {
    if (!codeText) return;
    navigator.clipboard.writeText(codeText);
    setCopied(true);
    toast.success('Code snippet copied to clipboard!', { icon: '📋' });
    setTimeout(() => setCopied(false), 2200);
  };

  const handleGithubClick = (e) => {
    if (project.githubUrl.includes('<your') || project.githubUrl.includes('placeholder')) {
      e.preventDefault();
      toast('Please configure your actual NER-SLAP GitHub repository URL in client/src/data/portfolioData.js', {
        icon: '💡',
        duration: 5000,
      });
    }
  };

  return (
    <div className="py-12 sm:py-16">
      <PageSEO
        title={`${project.title.split('—')[0].trim()} — Flagship Project Case Study`}
        description={project.description}
        pathname={`/projects/${project.id}`}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
          <Link to="/" className="hover:text-accent-moss transition-colors">Home</Link>
          <span>/</span>
          <Link to="/projects" className="hover:text-accent-moss transition-colors">Projects</Link>
          <span>/</span>
          <span className="text-accent-moss font-bold">{project.title.split('—')[0].trim()}</span>
        </div>

        {/* Project Header Banner */}
        <div className={`p-8 sm:p-12 rounded-3xl hud-card border border-accent-moss/30 relative overflow-hidden bg-gradient-to-br ${project.gradient}`}>
          <div className="absolute inset-0 bg-hud-grid opacity-25" />
          
          <div className="relative z-10 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-black/60 backdrop-blur-md text-white border border-white/20">
                <Calendar size={13} className="text-accent-moss" />
                {project.date}
              </span>

              {isNerSlap ? (
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-accent-amber text-[#12161A] shadow-lg shadow-accent-amber/20">
                  <Sparkles size={13} />
                  SIH 2026 Grand Finale Flagship
                </span>
              ) : (
                project.featured && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-accent-amber text-[#12161A] shadow-sm">
                    <Sparkles size={12} />
                    Flagship Architecture
                  </span>
                )
              )}
            </div>

            <div>
              <div className="text-xs uppercase font-mono tracking-wider text-accent-moss font-bold mb-2">
                {project.subtitle}
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white tracking-tight drop-shadow">
                {project.title}
              </h1>
            </div>

            <p className="text-base sm:text-lg text-slate-100 max-w-3xl leading-relaxed drop-shadow-sm">
              {project.description}
            </p>

            {/* Action Buttons (Prominent Live Demo above the fold) */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              {project.liveDemoUrl && (
                <a
                  href={project.liveDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-hud-primary px-6 py-3.5 rounded-xl text-sm font-extrabold flex items-center gap-2.5 shadow-hud-glow hover:scale-105 transition-all text-[#12161A]"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-[#12161A] animate-ping" />
                  <span>Launch Live Demo ({new URL(project.liveDemoUrl).hostname})</span>
                  <ExternalLink size={18} />
                </a>
              )}

              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleGithubClick}
                className="px-5 py-3 rounded-xl text-xs sm:text-sm font-bold bg-[#12161A]/90 hover:bg-[#1B2127] text-white border border-white/20 flex items-center gap-2 shadow-lg transition-colors"
                title={project.githubUrl.includes('<your') ? 'Configure your repo URL in portfolioData.js' : 'View source repository'}
              >
                <Github size={16} />
                <span>
                  {project.githubUrl.includes('<your') ? 'GitHub Repo (Configure Link)' : 'View GitHub Repository'}
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Tech Stack Interactive Tags */}
        <div className="p-6 rounded-2xl hud-card border border-slate-200 dark:border-white/10 space-y-3">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
            Technology Stack &amp; Dependencies:
          </span>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Link
                key={tag}
                to={`/projects?tech=${encodeURIComponent(tag.toLowerCase())}`}
                className="px-3 py-1.5 rounded-xl text-xs font-mono font-semibold bg-slate-100 dark:bg-[#222A30] text-slate-800 dark:text-[#EDEDE6] border border-slate-200 dark:border-white/10 hover:border-accent-moss hover:text-accent-moss transition-colors"
                title={`Find other projects using ${tag}`}
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* NER-SLAP SPECIFIC RICH BLOCKS: Model Performance Grid                     */}
        {/* ========================================================================= */}
        {isNerSlap && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-base font-bold font-heading text-slate-900 dark:text-[#EDEDE6]">
                <Cpu size={18} className="text-accent-moss" />
                <span>Model Performance &amp; Evaluation Metrics</span>
              </div>
              <span className="text-xs font-mono text-accent-moss font-semibold">Zero-Runtime Python • Pure TypeScript</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Disruption Classifier */}
              <div className="p-6 rounded-2xl hud-card border border-rose-500/30 bg-gradient-to-br from-rose-500/10 via-transparent to-transparent flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-rose-400 font-bold uppercase tracking-wider">
                    <span>Classifier</span>
                    <span className="px-2 py-0.5 rounded-md bg-rose-500/20 text-rose-300">DecisionTree</span>
                  </div>
                  <h4 className="text-lg font-bold font-heading text-slate-900 dark:text-[#EDEDE6] mt-1">
                    Disruption Alerts
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-content-muted mt-1 leading-relaxed">
                    Evaluated against multi-district landslide &amp; weather hazards with full confusion matrix &amp; judge demo panel.
                  </p>
                </div>

                <div className="pt-3 border-t border-rose-500/20 grid grid-cols-2 gap-2">
                  <div>
                    <div className="text-2xl font-extrabold font-heading text-rose-400">85.80%</div>
                    <div className="text-[11px] font-mono text-slate-500 dark:text-content-muted font-medium">Test Accuracy</div>
                  </div>
                  <div>
                    <div className="text-2xl font-extrabold font-heading text-rose-400">0.8600</div>
                    <div className="text-[11px] font-mono text-slate-500 dark:text-content-muted font-medium">Precision</div>
                  </div>
                </div>
              </div>

              {/* ETA Regressor */}
              <div className="p-6 rounded-2xl hud-card border border-accent-moss/30 bg-gradient-to-br from-accent-moss/10 via-transparent to-transparent flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-accent-moss font-bold uppercase tracking-wider">
                    <span>Regressor</span>
                    <span className="px-2 py-0.5 rounded-md bg-accent-moss/20 text-accent-moss">Continuous Tree</span>
                  </div>
                  <h4 className="text-lg font-bold font-heading text-slate-900 dark:text-[#EDEDE6] mt-1">
                    ETA Predictor
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-content-muted mt-1 leading-relaxed">
                    Corridor transit duration forecasting incorporating elevation gradients with 90% confidence bounds.
                  </p>
                </div>

                <div className="pt-3 border-t border-accent-moss/20 grid grid-cols-2 gap-2">
                  <div>
                    <div className="text-2xl font-extrabold font-heading text-accent-moss">0.7866</div>
                    <div className="text-[11px] font-mono text-slate-500 dark:text-content-muted font-medium">R² Score (Fit)</div>
                  </div>
                  <div>
                    <div className="text-2xl font-extrabold font-heading text-accent-moss">~37 min</div>
                    <div className="text-[11px] font-mono text-slate-500 dark:text-content-muted font-medium">MAE</div>
                  </div>
                </div>
              </div>

              {/* Cost Regressor */}
              <div className="p-6 rounded-2xl hud-card border border-accent-mossDeep/30 bg-gradient-to-br from-accent-mossDeep/10 via-transparent to-transparent flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-accent-mossDeep font-bold uppercase tracking-wider">
                    <span>Regressor</span>
                    <span className="px-2 py-0.5 rounded-md bg-accent-mossDeep/20 text-accent-mossDeep">4-Pillar Model</span>
                  </div>
                  <h4 className="text-lg font-bold font-heading text-slate-900 dark:text-[#EDEDE6] mt-1">
                    Cost Predictor
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-content-muted mt-1 leading-relaxed">
                    Calculates dynamic freight rates factoring in fuel volatility, elevation change, toll tariffs, and risk premiums.
                  </p>
                </div>

                <div className="pt-3 border-t border-accent-mossDeep/20 grid grid-cols-2 gap-2">
                  <div>
                    <div className="text-2xl font-extrabold font-heading text-accent-mossDeep">0.9541</div>
                    <div className="text-[11px] font-mono text-slate-500 dark:text-content-muted font-medium">R² Score (Fit)</div>
                  </div>
                  <div>
                    <div className="text-2xl font-extrabold font-heading text-accent-mossDeep">₹2.85/km</div>
                    <div className="text-[11px] font-mono text-slate-500 dark:text-content-muted font-medium">MAE</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Standard Key Metrics Strip for non-NER-SLAP projects */}
        {!isNerSlap && project.metrics && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {project.metrics.map((m, idx) => (
              <div key={idx} className="p-5 rounded-2xl hud-card border border-slate-200 dark:border-white/10 text-center">
                <div className="text-2xl font-extrabold font-heading text-accent-moss">
                  {m.value}
                </div>
                <div className="text-xs font-semibold text-slate-700 dark:text-content-muted mt-1 font-mono">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ========================================================================= */}
        {/* NER-SLAP SPECIFIC RICH BLOCKS: 3-Layer Architecture Diagram (from README) */}
        {/* ========================================================================= */}
        {isNerSlap && (
          <div className="p-6 sm:p-8 rounded-3xl hud-card border border-accent-moss/30 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-white/10 pb-4">
              <div className="flex items-center gap-2.5 text-base sm:text-lg font-bold font-heading text-slate-900 dark:text-[#EDEDE6]">
                <Layers size={20} className="text-accent-moss" />
                <span>Strict 3-Layer System Architecture</span>
              </div>
              <span className="text-xs font-mono text-accent-moss bg-accent-moss/10 px-3 py-1 rounded-full border border-accent-moss/20">
                Production Tested • Zero-Downtime Live Demos
              </span>
            </div>

            {/* Styled Visual 3-Layer Flow */}
            <div className="space-y-4">
              
              {/* Layer 1: Frontend */}
              <div className="p-5 rounded-2xl bg-slate-100/90 dark:bg-[#1B2127] border border-accent-moss/30 relative">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold uppercase tracking-wider bg-accent-moss/20 text-accent-moss border border-accent-moss/30">
                    Layer 1: Frontend Presentation &amp; GIS Map Interface
                  </span>
                  <span className="text-xs font-mono text-slate-500 dark:text-content-muted">
                    React 18 • TypeScript • Leaflet.js • Recharts
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-[#EDEDE6] leading-relaxed">
                  Renders 8 integrated operational modules, interactive corridor maps with route polylines, 6-pillar LAS radar charts, and mathematical Bézier-curve offline routing fallbacks when external routing tiles are unavailable.
                </p>
              </div>

              {/* Downward Connector */}
              <div className="flex items-center justify-center gap-3 text-xs font-mono text-accent-moss py-1">
                <span className="h-4 w-px bg-accent-moss/40" />
                <span className="px-2 py-0.5 rounded-full bg-accent-moss/10 border border-accent-moss/20 text-[10px]">
                  HTTP / REST API Requests &amp; Geocoding Inquiries ↓
                </span>
                <span className="h-4 w-px bg-accent-moss/40" />
              </div>

              {/* Layer 2: Express Routes */}
              <div className="p-5 rounded-2xl bg-slate-100/90 dark:bg-[#1B2127] border border-accent-mossDeep/30 relative">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold uppercase tracking-wider bg-accent-mossDeep/20 text-accent-mossDeep border border-accent-mossDeep/30">
                    Layer 2: Express Routes &amp; Gateway Dispatcher
                  </span>
                  <span className="text-xs font-mono text-slate-500 dark:text-content-muted">
                    Node.js • Express.js REST APIs • Middleware Guard
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-[#EDEDE6] leading-relaxed">
                  Orchestrates live external API calls (OSRM routing, Open-Meteo weather, Nominatim geocoding, Overpass OSM data), enforces cold-chain transport matching rules, handles request sanitization, and routes fallback queries.
                </p>
              </div>

              {/* Downward Connector */}
              <div className="flex items-center justify-center gap-3 text-xs font-mono text-accent-mossDeep py-1">
                <span className="h-4 w-px bg-accent-mossDeep/40" />
                <span className="px-2 py-0.5 rounded-full bg-accent-mossDeep/10 border border-accent-mossDeep/20 text-[10px]">
                  In-Memory Inference (&lt;0.05ms) &amp; 15-Min SQLite Cache ↓
                </span>
                <span className="h-4 w-px bg-accent-mossDeep/40" />
              </div>

              {/* Layer 3: Cache / Proxy + ML Decision Trees */}
              <div className="p-5 rounded-2xl bg-slate-100/90 dark:bg-[#1B2127] border border-accent-moss/30 relative">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold uppercase tracking-wider bg-accent-moss/20 text-accent-moss border border-accent-moss/30">
                    Layer 3: Cache/Proxy &amp; Pure-TS ML Decision Trees
                  </span>
                  <span className="text-xs font-mono text-slate-500 dark:text-content-muted">
                    SQLite3 (15-min TTL) • Pure TypeScript ML AST • Offline Dataset
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-[#EDEDE6] leading-relaxed">
                  Houses zero-runtime-Python ML inference (scikit-learn decision trees exported directly into pure TypeScript ASTs for &lt;0.05ms execution), a 15-minute SQLite caching proxy eliminating API rate limits, and an embedded 35-hub / 60-POI offline fallback dataset.
                </p>
              </div>

            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* NER-SLAP SPECIFIC RICH BLOCKS: 8 Integrated Modules Grid                  */}
        {/* ========================================================================= */}
        {isNerSlap && (
          <div className="p-6 sm:p-8 rounded-3xl hud-card border border-slate-200 dark:border-white/10 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-white/10 pb-4">
              <div className="flex items-center gap-2.5 text-base sm:text-lg font-bold font-heading text-slate-900 dark:text-[#EDEDE6]">
                <Activity size={20} className="text-accent-moss" />
                <span>8 Integrated Operational Modules</span>
              </div>
              <span className="text-xs font-mono text-slate-500 dark:text-content-muted">
                Compact Module Overview • Single Pane of Glass
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {nerSlapModules.map((mod) => {
                const IconComponent = mod.icon;
                return (
                  <div
                    key={mod.num}
                    className={`p-4 rounded-xl hud-card border border-slate-200 dark:border-white/5 ${mod.border} transition-colors flex items-start gap-3.5`}
                  >
                    <div className={`p-2 rounded-lg bg-white/5 ${mod.accent} shrink-0 mt-0.5`}>
                      <IconComponent size={18} />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-slate-500 dark:text-content-muted font-bold">{mod.num}.</span>
                        <h5 className="text-xs sm:text-sm font-bold font-heading text-slate-900 dark:text-[#EDEDE6] truncate">
                          {mod.name}
                        </h5>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-content-muted leading-relaxed mt-0.5">
                        {mod.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Problem & Architectural Solution Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 sm:p-8 rounded-3xl hud-card border border-rose-500/20 bg-rose-500/5 space-y-3">
            <div className="flex items-center gap-2 text-rose-500 font-bold font-heading text-base sm:text-lg">
              <AlertCircle size={20} />
              <span>Problem Statement</span>
            </div>
            <p className="text-sm text-slate-700 dark:text-[#EDEDE6] leading-relaxed">
              {project.problem || "Addressing scalability bottlenecks, race conditions in simultaneous user mutations, and latency spikes across distributed web services."}
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl hud-card border border-emerald-500/20 bg-emerald-500/5 space-y-3">
            <div className="flex items-center gap-2 text-emerald-500 font-bold font-heading text-base sm:text-lg">
              <CheckCircle2 size={20} />
              <span>Architectural Solution</span>
            </div>
            <p className="text-sm text-slate-700 dark:text-[#EDEDE6] leading-relaxed">
              {project.solution || "Implemented an event-driven architecture with atomic MongoDB queries, structured REST endpoints, and reactive client components."}
            </p>
          </div>
        </div>

        {/* Standard Architecture Specifications (for non-NER-SLAP projects) */}
        {!isNerSlap && project.architecture && (
          <div className="p-6 sm:p-8 rounded-3xl hud-card border border-slate-200 dark:border-white/10 space-y-4">
            <div className="flex items-center gap-2.5 text-base font-bold font-heading text-slate-900 dark:text-[#EDEDE6]">
              <Layers size={18} className="text-accent-moss" />
              <span>Full-Stack Architecture Layers</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {Object.entries(project.architecture).map(([layer, desc]) => (
                <div key={layer} className="p-4 rounded-xl bg-slate-100/80 dark:bg-[#1B2127] border border-slate-200 dark:border-white/5 space-y-1">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-accent-moss">
                    {layer}:
                  </span>
                  <p className="text-xs text-slate-700 dark:text-content-muted leading-relaxed">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Key Features List */}
        <div className="p-6 sm:p-8 rounded-3xl hud-card border border-slate-200 dark:border-white/10 space-y-4">
          <div className="flex items-center gap-2.5 text-base font-bold font-heading text-slate-900 dark:text-[#EDEDE6]">
            <Cpu size={18} className="text-accent-moss" />
            <span>Implemented Engineering Highlights &amp; User Stories</span>
          </div>
          <div className="space-y-3 pt-2">
            {project.features.map((feat, fIdx) => (
              <div key={fIdx} className="flex items-start gap-3 text-sm text-slate-700 dark:text-[#EDEDE6] leading-relaxed">
                <CheckCircle2 size={16} className="text-accent-moss shrink-0 mt-0.5" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Syntax-Highlighted Code Snippet Preview */}
        {project.codeSnippet && (
          <div className="rounded-3xl hud-card border border-accent-moss/30 overflow-hidden bg-[#12161A] shadow-2xl">
            {/* Terminal Window Top Bar */}
            <div className="flex items-center justify-between px-5 py-3.5 bg-[#1B2127] border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <span className="w-3 h-3 rounded-full bg-accent-amber/80" />
                  <span className="w-3 h-3 rounded-full bg-accent-moss/80" />
                </div>
                <span className="text-xs font-mono text-content-muted flex items-center gap-1.5 truncate max-w-sm sm:max-w-md">
                  <Code2 size={14} className="text-accent-moss shrink-0" />
                  <span className="truncate">{project.codeSnippet.title}</span>
                </span>
              </div>

              <button
                onClick={() => handleCopyCode(project.codeSnippet.code)}
                className="px-3 py-1.5 rounded-lg text-xs font-mono font-semibold bg-white/10 hover:bg-white/20 text-slate-200 hover:text-accent-moss border border-white/10 flex items-center gap-1.5 transition-colors shrink-0"
                title="Copy snippet"
              >
                {copied ? (
                  <>
                    <Check size={14} className="text-accent-moss" />
                    <span className="text-accent-moss">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    <span>Copy Snippet</span>
                  </>
                )}
              </button>
            </div>

            {/* Code Body */}
            <div className="p-6 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed text-[#EDEDE6] bg-[#12161A]/95 selection:bg-accent-moss selection:text-[#12161A]">
              <pre className="line-numbers">
                <code>{project.codeSnippet.code}</code>
              </pre>
            </div>
          </div>
        )}

        {/* Next & Previous Project Switcher */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-200 dark:border-white/10">
          {prevProject ? (
            <Link
              to={`/projects/${prevProject.id}`}
              className="w-full sm:w-auto p-4 rounded-2xl hud-card border border-slate-200 dark:border-white/10 hover:border-accent-moss flex items-center gap-3 text-left transition-colors group"
            >
              <ArrowLeft size={18} className="text-accent-moss group-hover:-translate-x-1 transition-transform shrink-0" />
              <div>
                <div className="text-[10px] font-mono text-slate-400 uppercase">Previous Project</div>
                <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-[#EDEDE6]">
                  {prevProject.title.split('—')[0]}
                </div>
              </div>
            </Link>
          ) : <div />}

          <Link
            to="/projects"
            className="text-xs font-mono font-bold text-accent-moss hover:underline py-2"
          >
            • Back to All Projects •
          </Link>

          {nextProject ? (
            <Link
              to={`/projects/${nextProject.id}`}
              className="w-full sm:w-auto p-4 rounded-2xl hud-card border border-slate-200 dark:border-white/10 hover:border-accent-moss flex items-center gap-3 text-right justify-end transition-colors group"
            >
              <div>
                <div className="text-[10px] font-mono text-slate-400 uppercase">Next Project</div>
                <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-[#EDEDE6]">
                  {nextProject.title.split('—')[0]}
                </div>
              </div>
              <ArrowRight size={18} className="text-accent-moss group-hover:translate-x-1 transition-transform shrink-0" />
            </Link>
          ) : <div />}
        </div>

      </div>
    </div>
  );
};
