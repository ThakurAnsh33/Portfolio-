import React from 'react';
import { motion } from 'framer-motion';
import {
  GraduationCap,
  Zap,
  Target,
  Users,
  CheckCircle2,
  BrainCircuit,
} from 'lucide-react';
import { SectionHeading } from './SectionHeading';
import { personalInfo } from '../data/portfolioData';

export const About = () => {
  const highlights = [
    {
      icon: Target,
      title: 'Problem-Solving Mindset',
      description:
        'Strong computer science fundamentals, analytical thinking, and algorithmic approach in Java and C++.',
    },
    {
      icon: Zap,
      title: 'Quick Learner & Adaptable',
      description:
        'Fast onboarding to cutting-edge technologies, modern frameworks, DevOps pipelines, and AI integration.',
    },
    {
      icon: Users,
      title: 'Team Player & Communicator',
      description:
        'Proven agility in 24-hour hackathons, cross-functional engineering sprints, and code collaboration.',
    },
    {
      icon: BrainCircuit,
      title: 'Full Stack Architecture',
      description:
        'Designing end-to-end applications from intuitive React UIs to scalable Node/Express REST APIs and MongoDB.',
    },
  ];

  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="About Me"
          title="Engineered for Scalability & Impact"
          subtitle="Combining strong academic rigor with real-world MERN development experience."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Bio Story Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="hud-card p-8 rounded-3xl relative overflow-hidden border border-slate-200 dark:border-white/10">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-6 pb-6 border-b border-slate-200 dark:border-white/10">
                <div className="relative shrink-0">
                  <div className="w-20 h-20 rounded-2xl p-[2px] bg-gradient-to-tr from-accent-moss via-accent-mossDeep to-accent-amber shadow-hud-glow overflow-hidden">
                    <img
                      src={personalInfo.profileImage || "/profile.png"}
                      alt={personalInfo.name}
                      className="w-full h-full object-cover object-top rounded-[14px]"
                    />
                  </div>
                  <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-accent-amber border-2 border-white dark:border-[#12161A]" title="Available for Roles" />
                </div>
                <div>
                  <div className="flex items-center gap-2 text-accent-moss mb-1">
                    <GraduationCap size={18} />
                    <span className="text-xs uppercase font-bold tracking-wider">Education &amp; Background</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold font-heading text-[#14181C] dark:text-[#EDEDE6] leading-snug">
                    Ansh Singh — Full Stack MERN
                  </h3>
                  <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-accent-moss/10 text-accent-moss border border-accent-moss/30 text-xs font-semibold">
                    <span>LPU B.Tech CSE (CGPA {personalInfo.cgpa} / 10.0)</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-4 text-slate-700 dark:text-[#EDEDE6] text-base leading-relaxed">
                <p>
                  I'm currently pursuing my B.Tech in Computer Science and Engineering at{' '}
                  <strong className="text-[#14181C] dark:text-white font-semibold">
                    Lovely Professional University
                  </strong>
                  . My primary passion lies in engineering robust, high-performance web applications that bridge
                  seamless frontend experiences with resilient, secure backend systems.
                </p>
                <p>
                  I have built and delivered multiple full-stack MERN projects — including live real-time auction
                  engines, AI-powered citizen sentiment dashboards, and hackathon platforms. In addition to coursework,
                  I completed a virtual Web Development Internship at{' '}
                  <strong className="text-[#14181C] dark:text-white font-semibold">Info Bharat Interns</strong>,
                  where I engineered service marketplace architectures with role-based access control.
                </p>
                <p>
                  I thrive in high-ownership environments where I can tackle complex algorithmic puzzles, optimize database
                  schemas, and ship elegant code that recruiters and users love.
                </p>
              </div>

              {/* Badges / Quick attributes */}
              <div className="mt-8 pt-6 border-t border-slate-200 dark:border-white/10 grid grid-cols-2 gap-4 text-xs font-semibold text-[#14181C] dark:text-[#EDEDE6]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-accent-moss" />
                  <span>Placement Ready</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-accent-moss" />
                  <span>Hackathon Tested</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-accent-moss" />
                  <span>Clean & Modular</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-accent-moss" />
                  <span>Continuous Learner</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Core Highlights & Strengths Grid */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-5"
          >
            {highlights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="hud-card hud-card-interactive p-6 rounded-2xl border border-slate-200 dark:border-white/10 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-[#1B2127] border border-slate-200 dark:border-white/10 mb-4 flex items-center justify-center text-accent-moss group-hover:scale-105 transition-transform shadow-sm">
                    <Icon size={22} />
                  </div>
                  <h4 className="text-base font-bold font-heading text-[#14181C] dark:text-[#EDEDE6] mb-2">
                    {item.title}
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-content-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </motion.div>

        </div>
      </div>
    </section>
  );
};
