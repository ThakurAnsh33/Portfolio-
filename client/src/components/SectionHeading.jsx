import React from 'react';
import { motion } from 'framer-motion';

export const SectionHeading = ({ badge, title, subtitle, align = 'center' }) => {
  const isCenter = align === 'center';

  return (
    <div className={`mb-16 ${isCenter ? 'text-center' : 'text-left'}`}>
      {badge && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase bg-accent-moss/10 text-accent-moss border border-accent-moss/25 mb-3 backdrop-blur-sm shadow-sm"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent-moss animate-pulse"></span>
          {badge}
        </motion.div>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-3xl md:text-4xl lg:text-5xl font-extrabold font-heading tracking-tight text-slate-900 dark:text-[#EDEDE6]"
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`mt-4 text-base md:text-lg text-slate-600 dark:text-[#9AA39A] max-w-2xl ${
            isCenter ? 'mx-auto' : ''
          }`}
        >
          {subtitle}
        </motion.p>
      )}

      <div className={`mt-4 flex items-center gap-1.5 ${isCenter ? 'justify-center' : 'justify-start'}`}>
        <div className="h-1 w-12 rounded-full bg-gradient-to-r from-accent-moss to-accent-mossDeep"></div>
        <div className="h-1 w-2 rounded-full bg-accent-moss"></div>
      </div>
    </div>
  );
};
