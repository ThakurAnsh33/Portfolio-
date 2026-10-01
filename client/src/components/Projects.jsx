import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Code } from 'lucide-react';
import { SectionHeading } from './SectionHeading';
import { ProjectCard } from './ProjectCard';
import { GitHubStatsCard } from './GitHubStatsCard';
import { projects, personalInfo } from '../data/portfolioData';

export const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filterOptions = ['All', 'MERN Stack', 'Real-Time / AI', 'Hackathon'];

  const filteredProjects = projects.filter((proj) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'MERN Stack') return proj.tags.includes('MongoDB') || proj.tags.includes('MERN Stack');
    if (activeFilter === 'Real-Time / AI') return proj.tags.includes('NLP') || proj.tags.includes('Socket.IO');
    if (activeFilter === 'Hackathon') return proj.tags.includes('Hackathon');
    return true;
  });

  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Featured Engineering"
          title="Projects & Implementations"
          subtitle="Production-ready full-stack applications showcasing MERN, real-time architectures, and scalable APIs."
        />

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {filterOptions.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'btn-hud-primary text-[#12161A]'
                    : 'hud-card text-slate-700 dark:text-content-muted border border-slate-200 dark:border-white/10 hover:border-accent-moss hover:text-accent-moss'
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>

        {/* Projects Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Live GitHub API Stats & Contributions */}
        <GitHubStatsCard />

        {/* More on GitHub Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-14 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-4 sm:px-6 sm:py-3.5 rounded-2xl hud-card border border-slate-200 dark:border-white/10 shadow-lg">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 dark:text-[#EDEDE6]">
              <Code size={16} className="text-accent-moss" />
              <span>Explore more repositories, experiments, and open-source code on GitHub.</span>
            </div>
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-accent-moss hover:text-accent-mossDeep transition-colors"
            >
              <span>View GitHub (@ThakurAnsh33)</span>
              <ArrowRight size={14} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
