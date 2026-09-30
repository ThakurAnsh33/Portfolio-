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
              <div className="flex items-center gap-3 text-accent-cyan mb-4">
                <GraduationCap size={24} />
                <span className="text-xs uppercase font-bold tracking-wider">Education & Background</span>
              </div>

              <h3 className="text-2xl font-bold font-heading text-[#0b0d1a] dark:text-[#f2f3f8] leading-snug">
                Computer Science Undergrad at Lovely Professional University
              </h3>

              <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/30 text-xs font-semibold">
                <span>Current CGPA:</span>
                <span className="text-sm font-bold text-[#0b0d1a] dark:text-[#f2f3f8]">{personalInfo.cgpa} / 10.0</span>
              </div>

              <div className="mt-6 space-y-4 text-slate-700 dark:text-[#e6e6f0] text-base leading-relaxed">
                <p>
                  I'm currently pursuing my B.Tech in Computer Science and Engineering at{' '}
                  <strong className="text-[#0b0d1a] dark:text-white font-semibold">
                    Lovely Professional University
                  </strong>
                  . My primary passion lies in engineering robust, high-performance web applications that bridge
                  seamless frontend experiences with resilient, secure backend systems.
                </p>
                <p>
                  I have built and delivered multiple full-stack MERN projects — including live real-time auction
                  engines, AI-powered citizen sentiment dashboards, and hackathon platforms. In addition to coursework,
                  I completed a virtual Web Development Internship at{' '}
                  <strong className="text-[#0b0d1a] dark:text-white font-semibold">Info Bharat Interns</strong>,
                  where I engineered service marketplace architectures with role-based access control.
                </p>
                <p>
                  I thrive in high-ownership environments where I can tackle complex algorithmic puzzles, optimize database
                  schemas, and ship elegant code that recruiters and users love.
                </p>
              </div>

              {/* Badges / Quick attributes */}
              <div className="mt-8 pt-6 border-t border-slate-200 dark:border-white/10 grid grid-cols-2 gap-4 text-xs font-semibold text-[#0b0d1a] dark:text-[#f2f3f8]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-accent-cyan" />
                  <span>Placement Ready</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-accent-cyan" />
                  <span>Hackathon Tested</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-accent-cyan" />
                  <span>Clean & Modular</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-accent-cyan" />
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
                  <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-[#14172a] border border-slate-200 dark:border-white/10 mb-4 flex items-center justify-center text-accent-cyan group-hover:scale-105 transition-transform shadow-sm">
                    <Icon size={22} />
                  </div>
                  <h4 className="text-base font-bold font-heading text-[#0b0d1a] dark:text-[#f2f3f8] mb-2">
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
