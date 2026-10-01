import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Filter, X, ArrowRight, Github } from 'lucide-react';
import { PageSEO } from '../components/PageSEO';
import { SectionHeading } from '../components/SectionHeading';
import { ProjectCard } from '../components/ProjectCard';
import { projects, personalInfo } from '../data/portfolioData';

export const ProjectsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const techQuery = searchParams.get('tech');

  const [activeFilter, setActiveFilter] = useState('All');

  const filterOptions = ['All', 'MERN Stack', 'Real-Time / AI', 'Hackathon'];

  // Reset category filter when tech query param changes
  useEffect(() => {
    if (techQuery) {
      setActiveFilter('All');
    }
  }, [techQuery]);

  const clearTechFilter = () => {
    searchParams.delete('tech');
    setSearchParams(searchParams);
  };

  const filteredProjects = projects.filter((proj) => {
    // If tech query is active, filter by that technology tag
    if (techQuery) {
      const q = techQuery.toLowerCase().replace(/[^a-z0-9]/g, '');
      const hasMatchingTag = proj.tags.some((t) => {
        const cleanTag = t.toLowerCase().replace(/[^a-z0-9]/g, '');
        return cleanTag.includes(q) || q.includes(cleanTag);
      });
      const inTitle = proj.title.toLowerCase().includes(techQuery.toLowerCase());
      const inDesc = proj.description.toLowerCase().includes(techQuery.toLowerCase());
      if (!hasMatchingTag && !inTitle && !inDesc) return false;
    }

    if (activeFilter === 'All') return true;
    if (activeFilter === 'MERN Stack') return proj.tags.includes('MongoDB') || proj.tags.includes('MERN Stack') || proj.tags.includes('Express');
    if (activeFilter === 'Real-Time / AI') return proj.tags.includes('NLP') || proj.tags.includes('Socket.IO') || proj.tags.includes('Machine Learning');
    if (activeFilter === 'Hackathon') return proj.tags.includes('Hackathon') || proj.subtitle?.toLowerCase().includes('sih') || proj.subtitle?.toLowerCase().includes('hackathon');
    return true;
  });

  return (
    <div className="py-12 sm:py-16">
      <PageSEO
        title="Full-Stack Projects Catalog"
        description="Production full-stack MERN, real-time WebSocket, and AI triage projects built by Ansh Singh."
        pathname="/projects"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <SectionHeading
          badge="Engineering Portfolio"
          title="Projects &amp; Case Studies"
          subtitle="Explore production-grade full stack applications, interactive live demos, and case studies detailing architectural solutions."
        />

        {/* Query Filter Banner if tech query is active */}
        {techQuery && (
          <div className="flex items-center justify-between p-4 rounded-2xl bg-accent-cyan/10 border border-accent-cyan/30 text-xs sm:text-sm font-mono text-accent-cyan max-w-2xl mx-auto">
            <div className="flex items-center gap-2">
              <Filter size={15} />
              <span>
                Filtering by skill: <strong className="text-slate-900 dark:text-white font-bold">"{techQuery}"</strong> ({filteredProjects.length} match{filteredProjects.length !== 1 ? 'es' : ''})
              </span>
            </div>
            <button
              onClick={clearTechFilter}
              className="p-1 rounded-lg hover:bg-accent-cyan/20 transition-colors flex items-center gap-1 text-xs"
              title="Clear filter"
            >
              <span>Clear</span>
              <X size={14} />
            </button>
          </div>
        )}

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {filterOptions.map((filter) => {
            const isActive = !techQuery && activeFilter === filter;
            return (
              <button
                key={filter}
                onClick={() => {
                  if (techQuery) clearTechFilter();
                  setActiveFilter(filter);
                }}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'btn-hud-primary text-[#05060f]'
                    : 'hud-card text-slate-700 dark:text-content-muted border border-slate-200 dark:border-white/10 hover:border-accent-cyan hover:text-accent-cyan'
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className={
                  (activeFilter === 'All' || activeFilter === 'Hackathon') && project.id === 'ner-slap'
                    ? 'col-span-1 md:col-span-2'
                    : 'col-span-1'
                }
              >
                <ProjectCard
                  project={project}
                  index={index}
                  isHeroVariant={project.id === 'ner-slap'}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center rounded-3xl hud-card border border-slate-200 dark:border-white/10 space-y-4 max-w-lg mx-auto">
            <div className="w-12 h-12 rounded-2xl bg-white/5 text-slate-400 flex items-center justify-center mx-auto">
              <Code2 size={24} />
            </div>
            <h4 className="text-lg font-bold font-heading text-slate-900 dark:text-[#f2f3f8]">
              No Projects Found for "{techQuery || activeFilter}"
            </h4>
            <p className="text-xs text-slate-600 dark:text-[#a6adc8]">
              Try resetting the active technology filter or browse the entire catalog.
            </p>
            <button
              onClick={() => {
                clearTechFilter();
                setActiveFilter('All');
              }}
              className="btn-hud-primary px-4 py-2 rounded-xl text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* GitHub Repository Link Banner */}
        <div className="text-center pt-8">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-4 sm:px-6 sm:py-3.5 rounded-2xl hud-card border border-slate-200 dark:border-white/10 shadow-lg">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 dark:text-[#e6e6f0]">
              <Github size={16} className="text-accent-cyan" />
              <span>Looking for additional experimental repositories and CLI utilities?</span>
            </div>
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-accent-cyan hover:text-accent-violet transition-colors"
            >
              <span>Explore GitHub (@ThakurAnsh33)</span>
              <ArrowRight size={14} />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

