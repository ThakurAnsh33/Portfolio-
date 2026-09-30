import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  SiJavascript,
  SiReact,
  SiTailwindcss,
  SiHtml5,
  SiFramer,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiGit,
  SiGithub,
  SiDocker,
  SiKubernetes,
  SiPython,
  SiCplusplus,
  SiJsonwebtokens,
  SiSocketdotio,
  SiCloudinary,
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
import { VscVscode } from 'react-icons/vsc';
import { TbApi, TbTerminal2, TbBrandCss3 } from 'react-icons/tb';
import { Sparkles } from 'lucide-react';
import { SectionHeading } from './SectionHeading';
import { skillCategories, projects } from '../data/portfolioData';

// Map icon strings to icon components
const iconMap = {
  SiJavascript,
  SiReact,
  SiTailwindcss,
  SiHtml5,
  TbBrandCss3,
  SiCss3: TbBrandCss3,
  SiFramer,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiGit,
  SiGithub,
  SiDocker,
  SiKubernetes,
  SiPython,
  SiCplusplus,
  SiC: TbTerminal2,
  SiJsonwebtokens,
  SiSocketdotio,
  SiCloudinary,
  FaJava,
  VscVscode,
  TbApi,
};

// Dynamically compute real project experience notes from existing project data
const getSkillUsageNote = (skillName) => {
  const cleanSkill = skillName.toLowerCase().replace(/[^a-z0-9]/g, '');

  const matchingProjects = (projects || []).filter((p) => {
    const inTags = Array.isArray(p.tags) && p.tags.some((t) => {
      const cleanTag = t.toLowerCase().replace(/[^a-z0-9]/g, '');
      return cleanTag.includes(cleanSkill) || cleanSkill.includes(cleanTag);
    });
    const inTech = Array.isArray(p.tech) && p.tech.some((t) => {
      const cleanTech = t.toLowerCase().replace(/[^a-z0-9]/g, '');
      return cleanTech.includes(cleanSkill) || cleanSkill.includes(cleanTech);
    });
    const inTitle = typeof p.title === 'string' && p.title.toLowerCase().includes(skillName.toLowerCase());
    return inTags || inTech || inTitle;
  });

  if (matchingProjects.length === 1) {
    return `Built in ${matchingProjects[0].title.split('—')[0].trim()}`;
  }
  if (matchingProjects.length === 2) {
    return `Used in ${matchingProjects[0].title.split('—')[0].trim()} & ${matchingProjects[1].title.split('—')[0].trim()}`;
  }
  if (matchingProjects.length > 2) {
    return `Used in ${matchingProjects[0].title.split('—')[0].trim()} +${matchingProjects.length - 1} projects`;
  }
  return `Core engineering stack in campus & internship work`;
};

export const Skills = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categoriesList = ['All', ...skillCategories.map((c) => c.category)];

  const filteredCategories =
    selectedCategory === 'All'
      ? skillCategories
      : skillCategories.filter((c) => c.category === selectedCategory);

  return (
    <section id="skills" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Technical Arsenal"
          title="Skills & Technologies"
          subtitle="A comprehensive toolkit across frontend, backend, databases, languages, and modern DevOps."
        />

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categoriesList.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                selectedCategory === cat
                  ? 'btn-hud-primary scale-105'
                  : 'hud-card text-slate-700 dark:text-[#a6adc8] border border-slate-200 dark:border-white/10 hover:border-accent-cyan hover:text-accent-cyan'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grouped Skills Cards */}
        <div className="space-y-12">
          {filteredCategories.map((catGroup, groupIdx) => (
            <motion.div
              key={catGroup.category}
              initial={{ opacity: 0, y: 22, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{
                type: 'spring',
                stiffness: 240,
                damping: 20,
                mass: 0.8,
                delay: groupIdx * 0.08,
              }}
              className="hud-card p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-white/10"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-slate-200 dark:border-white/10 gap-2">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold font-heading text-[#0b0d1a] dark:text-[#f2f3f8] flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-accent-cyan shadow-hud-glow"></span>
                    {catGroup.category}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-[#a6adc8] mt-1">
                    {catGroup.description}
                  </p>
                </div>
                <span className="text-xs font-mono text-accent-cyan bg-accent-cyan/10 px-3 py-1 rounded-full border border-accent-cyan/20 self-start sm:self-auto font-medium">
                  {catGroup.skills.length} competencies
                </span>
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {catGroup.skills.map((skill) => {
                  const IconComponent = iconMap[skill.icon] || TbTerminal2;
                  const projectNote = getSkillUsageNote(skill.name);

                  return (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.94 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        type: 'spring',
                        stiffness: 260,
                        damping: 18,
                      }}
                      whileHover={{ scale: 1.04, y: -3 }}
                      className="group p-4 rounded-2xl bg-white/90 dark:bg-[#0f1120]/90 backdrop-blur-md border border-slate-200 dark:border-white/10 hover:border-accent-cyan/50 dark:hover:border-accent-cyan/50 transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-hud-glow relative"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center text-xl transition-transform group-hover:scale-110"
                            style={{
                              backgroundColor: `${skill.color}15`,
                              color: skill.color || '#3b82f6',
                            }}
                          >
                            <IconComponent />
                          </div>
                          <span className="text-xs font-mono font-semibold text-accent-cyan dark:text-accent-cyan">
                            {skill.level}%
                          </span>
                        </div>

                        <h4 className="text-sm font-semibold text-[#0b0d1a] dark:text-[#f2f3f8] group-hover:text-accent-cyan transition-colors">
                          {skill.name}
                        </h4>
                      </div>

                      <div className="mt-3">
                        {/* Mini progress indicator */}
                        <div className="w-full bg-slate-200 dark:bg-white/10 h-1.5 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                            className="h-full rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500"
                          />
                        </div>

                        {/* Interactive dynamic project note on hover */}
                        <div
                          className="mt-2 text-[10px] font-mono text-slate-500 dark:text-[#a6adc8] group-hover:text-accent-cyan transition-colors truncate flex items-center gap-1"
                          title={projectNote}
                        >
                          <Sparkles size={10} className="shrink-0 text-accent-cyan/70" />
                          <span className="truncate">{projectNote}</span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
