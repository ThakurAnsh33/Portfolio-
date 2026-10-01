import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  Linkedin,
  Github,
  MapPin,
  Send,
  Loader2,
  CheckCircle2,
  MessageSquare,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import toast from 'react-hot-toast';
import confetti from 'canvas-confetti';
import { PageSEO } from '../components/PageSEO';
import { SectionHeading } from '../components/SectionHeading';
import { SharePortfolioButton } from '../components/SharePortfolioButton';
import { personalInfo } from '../data/portfolioData';
import { sendContactMessage } from '../utils/api';

export const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    message: false,
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const isEmailValid = emailRegex.test(formData.email.trim());
  const isNameValid = formData.name.trim().length >= 2;
  const isMessageValid = formData.message.trim().length >= 5;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form validation
    if (!formData.name.trim()) {
      toast.error('Please enter your name.');
      return;
    }

    if (!emailRegex.test(formData.email.trim())) {
      toast.error('Please enter a valid email address.');
      return;
    }

    if (formData.message.trim().length < 5) {
      toast.error('Please enter a message of at least 5 characters.');
      return;
    }

    setLoading(true);

    try {
      await sendContactMessage({
        name: formData.name.trim(),
        email: formData.email.trim(),
        message: formData.message.trim(),
      });

      // Confetti celebration
      const count = 100;
      const confettiConfig = {
        origin: { y: 0.7 },
        colors: ['#7A9471', '#5C7054', '#D9A85C', '#EDEDE6', '#B5833C'],
        disableForReducedMotion: true,
      };
      confetti({ ...confettiConfig, particleCount: 60, spread: 80 });

      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTouched({ name: false, email: false, message: false });
      toast.success('Message transmitted to Ansh! Confirmation email dispatched.', {
        duration: 5000,
        icon: '🚀',
      });
    } catch (err) {
      toast.error(err.message || 'Transmission failed. Please email anshmvm@gmail.com directly.', {
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  const contactCards = [
    {
      icon: Mail,
      label: 'Direct Email',
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
      primary: true,
    },
    {
      icon: Phone,
      label: 'Phone / WhatsApp',
      value: personalInfo.phone,
      href: `tel:${personalInfo.phone.replace(/\s+/g, '')}`,
      primary: false,
    },
    {
      icon: Linkedin,
      label: 'LinkedIn Profile',
      value: 'linkedin.com/in/thakuransh',
      href: personalInfo.linkedIn,
      primary: false,
    },
    {
      icon: Github,
      label: 'GitHub Repositories',
      value: 'github.com/ThakurAnsh33',
      href: personalInfo.github,
      primary: false,
    },
    {
      icon: MapPin,
      label: 'Primary Location',
      value: personalInfo.location,
      href: null,
      primary: false,
    },
  ];

  return (
    <div className="py-12 sm:py-16">
      <PageSEO
        title="Contact & Collaboration"
        description="Initiate a conversation with Full Stack MERN Developer Ansh Singh. Available for full-time engineering roles, technical interviews, and freelance architectures."
        pathname="/contact"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <SectionHeading
          badge="Transmission Hub"
          title="Get In Touch"
          subtitle="Whether you're inquiring about full-time placement, technical collaboration, or system architecture review, my inbox is always open."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
          
          {/* Left Column: Direct Contact Information */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl hud-card border border-slate-200 dark:border-white/10 space-y-6">
              <div>
                <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-[#EDEDE6]">
                  Contact Information
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-[#9AA39A] mt-1">
                  Expected response latency: <strong className="text-emerald-500 font-mono">&lt; 12 Hours</strong>
                </p>
              </div>

              <div className="space-y-3">
                {contactCards.map((c, idx) => {
                  const IconComp = c.icon;
                  const content = (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#1B2127] border border-slate-200 dark:border-white/5 hover:border-accent-moss/40 flex items-center gap-3.5 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-xl bg-accent-moss/10 text-accent-moss flex items-center justify-center shrink-0">
                        <IconComp size={18} />
                      </div>
                      <div className="overflow-hidden">
                        <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                          {c.label}
                        </div>
                        <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-[#EDEDE6] truncate">
                          {c.value}
                        </div>
                      </div>
                    </div>
                  );

                  return c.href ? (
                    <a
                      key={idx}
                      href={c.href}
                      target={c.href.startsWith('http') ? '_blank' : undefined}
                      rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="block"
                    >
                      {content}
                    </a>
                  ) : (
                    <div key={idx}>{content}</div>
                  );
                })}
              </div>

              {/* Share Portfolio Button */}
              <div className="pt-2 border-t border-slate-200 dark:border-white/10">
                <SharePortfolioButton label="Share Candidate Portfolio" />
              </div>
            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-10 rounded-3xl hud-card border border-accent-moss/30 dark:bg-[#12161A]/95 bg-white/95 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent-moss/5 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 space-y-6">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold font-heading text-slate-900 dark:text-[#EDEDE6] flex items-center gap-2">
                    <MessageSquare size={22} className="text-accent-moss" />
                    <span>Send a Dispatch</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-[#9AA39A] mt-1">
                    Delivered via MongoDB persistence pipeline with instant Nodemailer email alert.
                  </p>
                </div>

                {submitted && (
                  <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm flex items-center gap-3">
                    <CheckCircle2 size={20} className="shrink-0" />
                    <span>Your message has been safely received. A confirmation has been triggered to your email!</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name Field */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                      <span>Full Name *</span>
                      {touched.name && !isNameValid && (
                        <span className="text-rose-400 text-[11px]">Min 2 characters</span>
                      )}
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={() => handleBlur('name')}
                      placeholder="e.g. Maya Chen"
                      className={`w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-[#1B2127] text-slate-900 dark:text-white placeholder-slate-500 text-sm border focus:outline-none transition-colors ${
                        touched.name && !isNameValid
                          ? 'border-rose-500/50'
                          : 'border-slate-200 dark:border-white/10 focus:border-accent-moss'
                      }`}
                    />
                  </div>

                  {/* Email Field */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                      <span>Email Address *</span>
                      {touched.email && !isEmailValid && (
                        <span className="text-rose-400 text-[11px]">Valid email required</span>
                      )}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={() => handleBlur('email')}
                      placeholder="e.g. recruiter@company.com"
                      className={`w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-[#1B2127] text-slate-900 dark:text-white placeholder-slate-500 text-sm border focus:outline-none transition-colors ${
                        touched.email && !isEmailValid
                          ? 'border-rose-500/50'
                          : 'border-slate-200 dark:border-white/10 focus:border-accent-moss'
                      }`}
                    />
                  </div>

                  {/* Message Field */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                      <span>Message / Project Inquiry *</span>
                      {touched.message && !isMessageValid && (
                        <span className="text-rose-400 text-[11px]">Min 5 characters</span>
                      )}
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      onBlur={() => handleBlur('message')}
                      placeholder="Discuss open roles, project requirements, or schedule a technical chat..."
                      className={`w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-[#1B2127] text-slate-900 dark:text-white placeholder-slate-500 text-sm border focus:outline-none transition-colors resize-none ${
                        touched.message && !isMessageValid
                          ? 'border-rose-500/50'
                          : 'border-slate-200 dark:border-white/10 focus:border-accent-moss'
                      }`}
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full btn-hud-primary py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Transmitting Message…</span>
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        <span>Transmit Message</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

