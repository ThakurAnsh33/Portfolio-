import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
import {
  Code2,
  Cpu,
  Layers,
  ArrowRight,
  ExternalLink,
  Sparkles,
  Info,
  CheckCircle2,
} from 'lucide-react';
import { PageSEO } from '../components/PageSEO';
import { SectionHeading } from '../components/SectionHeading';
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

export const SkillsPage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeSkill, setActiveSkill] = useState(null);

  const categoriesList = ['All', ...skillCategories.map((c) => c.category)];

  const filteredCategories =
    selectedCategory === 'All'
      ? skillCategories
      : skillCategories.filter((c) => c.category === selectedCategory);

  // Compute matching projects for any skill
  const getRelatedProjects = (skillName) => {
    if (!skillName) return [];
    const cleanSkill = skillName.toLowerCase().replace(/[^a-z0-9]/g, '');

    return projects.filter((p) => {
      const inTags = Array.isArray(p.tags) && p.tags.some((t) => {
        const cleanTag = t.toLowerCase().replace(/[^a-z0-9]/g, '');
        return cleanTag.includes(cleanSkill) || cleanSkill.includes(cleanTag);
      });
      const inTitle = typeof p.title === 'string' && p.title.toLowerCase().includes(skillName.toLowerCase());
      const inDesc = typeof p.description === 'string' && p.description.toLowerCase().includes(skillName.toLowerCase());
      return inTags || inTitle || inDesc;
    });
  };

  const handleFilterProjects = (skillName) => {
    navigate(`/projects?tech=${encodeURIComponent(skillName.toLowerCase())}`);
  };

  const activeRelatedProjects = activeSkill ? getRelatedProjects(activeSkill.name) : [];

  return (
    <div className="py-12 sm:py-16">
      <PageSEO
        title="Skills & Technical Arsenal"
        description="Interactive skills matrix and technology graph of Ansh Singh: React.js, Node.js, Express, MongoDB, Socket.IO, C++, Java, and modern web tooling."
        pathname="/skills"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <SectionHeading
          badge="Interactive Matrix"
          title="Technical Arsenal &amp; Project Graph"
          subtitle="Click or hover any skill to inspect matching production projects, real-world application, and filter the project catalog."
        />

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categoriesList.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
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

        {/* Interactive Skills Grid + Active Skill Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left / Main: Skill Categories Grid */}
          <div className="lg:col-span-8 space-y-8">
            {filteredCategories.map((cat, catIdx) => (
              <div
                key={cat.category}
                className="p-6 sm:p-8 rounded-3xl hud-card border border-slate-200 dark:border-white/10 space-y-6"
              >
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-4">
                  <div>
                    <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-[#f2f3f8]">
                      {cat.category}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-[#a6adc8] mt-0.5">
                      {cat.description}
                    </p>
                  </div>
                  <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-accent-cyan/10 text-accent-cyan font-semibold border border-accent-cyan/20">
                    {cat.skills.length} Technologies
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {cat.skills.map((skill) => {
                    const IconComponent = iconMap[skill.icon] || Code2;
                    const related = getRelatedProjects(skill.name);
                    const isCurrent = activeSkill?.name === skill.name;

                    return (
                      <div
                        key={skill.name}
                        onClick={() => setActiveSkill(skill)}
                        onMouseEnter={() => setActiveSkill(skill)}
                        className={`p-4 rounded-2xl cursor-pointer border transition-all duration-200 flex flex-col justify-between space-y-3 ${
                          isCurrent
                            ? 'bg-accent-cyan/10 border-accent-cyan shadow-lg shadow-accent-cyan/10 scale-[1.02]'
                            : 'bg-slate-50 dark:bg-[#0f1120] border-slate-200 dark:border-white/5 hover:border-accent-cyan/50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div
                              className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shadow-sm"
                              style={{
                                backgroundColor: `${skill.color}15`,
                                color: skill.color || '#4fd1ff',
                              }}
                            >
                              <IconComponent />
                            </div>
                            <div>
                              <div className="font-heading font-bold text-sm text-slate-900 dark:text-[#f2f3f8]">
                                {skill.name}
                              </div>
                              <div className="text-[11px] text-slate-500 dark:text-[#a6adc8]">
                                {related.length > 0 ? `${related.length} Linked Project${related.length > 1 ? 's' : ''}` : 'Foundation'}
                              </div>
                            </div>
                          </div>

                          <span className="text-xs font-mono font-bold text-accent-cyan">
                            {skill.level}%
                          </span>
                        </div>

                        {/* Progress Meter Bar */}
                        <div className="w-full bg-slate-200 dark:bg-white/10 h-1.5 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                            className="h-full rounded-full"
                            style={{
                              backgroundColor: skill.color || '#4fd1ff',
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Right: Active Skill Real-World Inspector & Project Connector */}
          <div className="lg:col-span-4 sticky top-24 space-y-6">
            <div className="p-6 rounded-3xl hud-card border border-accent-cyan/40 dark:bg-[#05060f]/95 bg-white/95 shadow-2xl space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/10">
                <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-accent-cyan">
                  <Sparkles size={14} />
                  <span>Project Link Inspector</span>
                </span>
                {activeSkill && (
                  <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    Active
                  </span>
                )}
              </div>

              {activeSkill ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3.5">
                    {(() => {
                      const ActiveIcon = iconMap[activeSkill.icon] || Code2;
                      return (
                        <div
                          className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-md"
                          style={{
                            backgroundColor: `${activeSkill.color}25`,
                            color: activeSkill.color || '#4fd1ff',
                          }}
                        >
                          <ActiveIcon />
                        </div>
                      );
                    })()}
                    <div>
                      <h4 className="text-lg font-bold font-heading text-slate-900 dark:text-white">
                        {activeSkill.name}
                      </h4>
                      <div className="text-xs font-mono text-accent-cyan font-semibold">
                        Assessed Proficiency: {activeSkill.level}%
                      </div>
                    </div>
                  </div>

                  {/* Connected Projects */}
                  <div>
                    <div className="text-xs font-mono text-slate-600 dark:text-slate-400 mb-2.5">
                      Production &amp; Hackathon Implementations:
                    </div>

                    {activeRelatedProjects.length > 0 ? (
                      <div className="space-y-2">
                        {activeRelatedProjects.map((p) => (
                          <Link
                            key={p.id}
                            to={`/projects/${p.id}`}
                            className="p-3 rounded-xl dark:bg-[#0f1120] bg-slate-50 border border-slate-200 dark:border-white/10 hover:border-accent-cyan block transition-colors group"
                          >
                            <div className="flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-accent-cyan">
                              <span>{p.title.split('—')[0].trim()}</span>
                              <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                            </div>
                            <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                              {p.description}
                            </p>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div className="p-4 rounded-xl dark:bg-[#0f1120] bg-slate-50 border border-slate-200 dark:border-white/5 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                        Core academic coursework and technical certifications in progress.
                      </div>
                    )}
                  </div>

                  {/* Filter Action Button */}
                  <button
                    onClick={() => handleFilterProjects(activeSkill.name)}
                    className="w-full btn-hud-primary py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2"
                  >
                    <span>Filter Projects by "{activeSkill.name}"</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              ) : (
                <div className="text-center py-8 space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 flex items-center justify-center mx-auto">
                    <Info size={24} />
                  </div>
                  <div className="text-xs font-mono text-slate-600 dark:text-slate-400 max-w-xs mx-auto leading-relaxed">
                    Hover or click any skill card on the left to reveal which real-world projects and case studies utilize it.
                  </div>
                </div>
              )}
            </div>

            {/* Quick Summary Strip */}
            <div className="p-5 rounded-2xl hud-card border border-slate-200 dark:border-white/10 text-xs font-mono text-slate-600 dark:text-slate-400 space-y-2">
              <div className="flex items-center gap-2 text-accent-cyan font-bold">
                <CheckCircle2 size={14} />
                <span>Zero Stale Dependencies</span>
              </div>
              <p className="leading-relaxed">
                Every skill listed is backed by either hands-on project commits, hackathon submissions, or verified CPE certifications.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

