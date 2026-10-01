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
} from 'lucide-react';
import toast from 'react-hot-toast';
import confetti from 'canvas-confetti';
import { SectionHeading } from './SectionHeading';
import { personalInfo } from '../data/portfolioData';
import { sendContactMessage } from '../utils/api';
import { SharePortfolioButton } from './SharePortfolioButton';

export const Contact = () => {
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

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
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
      const response = await sendContactMessage({
        name: formData.name.trim(),
        email: formData.email.trim(),
        message: formData.message.trim(),
      });

      // Tasteful multi-stage celebration confetti burst
      const count = 100;
      const confettiConfig = {
        origin: { y: 0.7 },
        colors: ['#4fd1ff', '#a78bfa', '#3b82f6', '#10b981', '#f2f3f8'],
        disableForReducedMotion: true,
      };
      const fire = (ratio, opts) => {
        confetti({
          ...confettiConfig,
          ...opts,
          particleCount: Math.floor(count * ratio),
        });
      };
      fire(0.25, { spread: 26, startVelocity: 55 });
      fire(0.2, { spread: 60 });
      fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
      fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
      fire(0.1, { spread: 120, startVelocity: 45 });

      toast.success(response.message || 'Message sent successfully! Ansh will reach out soon.');
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error('Contact Form Submission Error:', err);
      toast.error(err.message || 'Could not send message. Please try again or reach out directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Let's Connect"
          title="Get in Touch"
          subtitle="Interested in recruiting, collaborating, or discussing full-stack opportunities? Send a message directly."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left: Contact Channels & Meta */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="hud-card p-8 rounded-3xl border border-slate-200/80 dark:border-white/10">
              <h3 className="text-2xl font-bold font-heading text-slate-900 dark:text-[#f2f3f8] mb-2">
                Let's discuss your team's next engineering milestone.
              </h3>
              <p className="text-sm text-slate-600 dark:text-[#a6adc8] mb-8 leading-relaxed">
                Whether you have an opening for a Full Stack MERN Developer, a campus placement query, or a freelance project, I'd love to connect.
              </p>

              {/* Direct Clickable Contact List */}
              <div className="space-y-4">
                {/* Email */}
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="group flex items-center gap-4 p-3.5 rounded-2xl bg-slate-100 dark:bg-[#14172a] border border-slate-200 dark:border-white/10 hover:border-accent-cyan/50 transition-all duration-200"
                >
                  <div className="w-11 h-11 rounded-xl bg-blue-500/10 text-brand-blue flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Mail size={20} />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-500 dark:text-[#a6adc8] block">
                      Email Address
                    </span>
                    <span className="text-sm font-semibold text-slate-900 dark:text-[#f2f3f8] group-hover:text-accent-cyan transition-colors">
                      {personalInfo.email}
                    </span>
                  </div>
                </a>

                {/* Phone */}
                <a
                  href={`tel:${personalInfo.phone.replace(/[^0-9+]/g, '')}`}
                  className="group flex items-center gap-4 p-3.5 rounded-2xl bg-slate-100 dark:bg-[#14172a] border border-slate-200 dark:border-white/10 hover:border-emerald-500/50 transition-all duration-200"
                >
                  <div className="w-11 h-11 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Phone size={20} />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-500 dark:text-[#a6adc8] block">
                      Phone / WhatsApp
                    </span>
                    <span className="text-sm font-semibold text-slate-900 dark:text-[#f2f3f8] group-hover:text-emerald-500 transition-colors">
                      {personalInfo.phone}
                    </span>
                  </div>
                </a>

                {/* LinkedIn */}
                <a
                  href={personalInfo.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 p-3.5 rounded-2xl bg-slate-100 dark:bg-[#14172a] border border-slate-200 dark:border-white/10 hover:border-accent-cyan/50 transition-all duration-200"
                >
                  <div className="w-11 h-11 rounded-xl bg-blue-600/10 text-blue-500 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Linkedin size={20} />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-500 dark:text-[#a6adc8] block">
                      LinkedIn
                    </span>
                    <span className="text-sm font-semibold text-slate-900 dark:text-[#f2f3f8] group-hover:text-accent-cyan transition-colors">
                      linkedin.com/in/thakuransh
                    </span>
                  </div>
                </a>

                {/* GitHub */}
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 p-3.5 rounded-2xl bg-slate-100 dark:bg-[#14172a] border border-slate-200 dark:border-white/10 hover:border-accent-cyan/50 transition-all duration-200"
                >
                  <div className="w-11 h-11 rounded-xl bg-violet-500/10 text-violet-500 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Github size={20} />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-500 dark:text-[#a6adc8] block">
                      GitHub
                    </span>
                    <span className="text-sm font-semibold text-slate-900 dark:text-[#f2f3f8] group-hover:text-accent-cyan transition-colors">
                      github.com/ThakurAnsh33
                    </span>
                  </div>
                </a>

                {/* Location */}
                <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-slate-100 dark:bg-[#14172a] border border-slate-200 dark:border-white/10">
                  <div className="w-11 h-11 rounded-xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-500 dark:text-[#a6adc8] block">
                      Location
                    </span>
                    <span className="text-sm font-semibold text-slate-900 dark:text-[#f2f3f8]">
                      {personalInfo.location}
                    </span>
                  </div>
                </div>

                {/* Share Portfolio Action */}
                <div className="pt-2">
                  <SharePortfolioButton className="w-full justify-center py-3 rounded-2xl" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Live Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7"
          >
            <div className="hud-card p-8 sm:p-10 rounded-3xl border border-slate-200/80 dark:border-white/10 relative">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold font-heading text-slate-900 dark:text-[#f2f3f8]">
                    Send a Message
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-[#a6adc8] mt-0.5">
                    Messages are delivered directly to the MongoDB backend & email notification service.
                  </p>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600/15 to-violet-600/15 text-accent-cyan flex items-center justify-center">
                  <MessageSquare size={20} />
                </div>
              </div>

              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center justify-center mx-auto">
                    <CheckCircle2 size={32} />
                  </div>
                  <h4 className="text-xl font-bold font-heading text-slate-900 dark:text-[#f2f3f8]">
                    Message Sent Successfully!
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-[#a6adc8] max-w-sm mx-auto">
                    Thank you for reaching out. Your message has been saved in the database, and Ansh will review it shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="btn-hud-primary inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold"
                  >
                    <Sparkles size={14} />
                    <span>Send Another Message</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name Input */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label
                        htmlFor="name"
                        className="block text-xs font-semibold uppercase tracking-wider text-slate-800 dark:text-[#e6e6f0]"
                      >
                        Your Name <span className="text-rose-500">*</span>
                      </label>
                      {touched.name && (
                        isNameValid ? (
                          <span className="text-emerald-500 text-[11px] font-mono flex items-center gap-1">
                            <CheckCircle2 size={12} /> Valid
                          </span>
                        ) : (
                          <span className="text-rose-400 text-[11px] font-mono">
                            Min 2 characters
                          </span>
                        )
                      )}
                    </div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={() => handleBlur('name')}
                      placeholder="e.g. Rahul Sharma"
                      required
                      className={`w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-[#14172a] border text-[#0b0d1a] dark:text-[#f2f3f8] placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-none focus:ring-2 transition-all ${
                        touched.name && !isNameValid
                          ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/20'
                          : 'border-slate-300 dark:border-white/15 focus:border-accent-cyan focus:ring-accent-cyan/20'
                      }`}
                    />
                  </div>

                  {/* Email Input */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label
                        htmlFor="email"
                        className="block text-xs font-semibold uppercase tracking-wider text-slate-800 dark:text-[#e6e6f0]"
                      >
                        Email Address <span className="text-rose-500">*</span>
                      </label>
                      {touched.email && (
                        isEmailValid ? (
                          <span className="text-emerald-500 text-[11px] font-mono flex items-center gap-1">
                            <CheckCircle2 size={12} /> Valid format
                          </span>
                        ) : (
                          <span className="text-rose-400 text-[11px] font-mono">
                            Invalid email format
                          </span>
                        )
                      )}
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={() => handleBlur('email')}
                      placeholder="e.g. recruiter@company.com"
                      required
                      className={`w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-[#14172a] border text-[#0b0d1a] dark:text-[#f2f3f8] placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-none focus:ring-2 transition-all ${
                        touched.email && !isEmailValid
                          ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/20'
                          : 'border-slate-300 dark:border-white/15 focus:border-accent-cyan focus:ring-accent-cyan/20'
                      }`}
                    />
                  </div>

                  {/* Message Input */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label
                        htmlFor="message"
                        className="block text-xs font-semibold uppercase tracking-wider text-slate-800 dark:text-[#e6e6f0]"
                      >
                        Message <span className="text-rose-500">*</span>
                      </label>
                      <span
                        className={`text-[11px] font-mono ${
                          formData.message.length >= 5
                            ? 'text-accent-cyan font-medium'
                            : 'text-slate-400'
                        }`}
                      >
                        {formData.message.length}/500 {formData.message.length < 5 ? '(min 5)' : ''}
                      </span>
                    </div>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      maxLength={500}
                      value={formData.message}
                      onChange={handleChange}
                      onBlur={() => handleBlur('message')}
                      placeholder="Write your message, project details, or interview invitation..."
                      required
                      className={`w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-[#14172a] border text-[#0b0d1a] dark:text-[#f2f3f8] placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-none focus:ring-2 transition-all resize-none ${
                        touched.message && !isMessageValid
                          ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/20'
                          : 'border-slate-300 dark:border-white/15 focus:border-accent-cyan focus:ring-accent-cyan/20'
                      }`}
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold btn-hud-primary disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        <span>Sending message...</span>
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-center text-slate-500 dark:text-[#a6adc8]">
                    🔒 Secured with Express rate limiting & Mongoose database validation.
                  </p>
                </form>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

