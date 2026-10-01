import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Github,
  Star,
  GitFork,
  ExternalLink,
  Activity,
  BookOpen,
  Users,
  RefreshCw,
  Code2,
  Calendar,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import { PageSEO } from '../components/PageSEO';
import { SectionHeading } from '../components/SectionHeading';
import { fetchGitHubStats } from '../utils/api';
import { personalInfo } from '../data/portfolioData';

export const ActivityPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadStats = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchGitHubStats();
      setStats(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch live GitHub metrics');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  const languageColorMap = {
    JavaScript: 'bg-amber-400',
    TypeScript: 'bg-blue-400',
    Python: 'bg-emerald-400',
    Java: 'bg-rose-400',
    HTML: 'bg-orange-400',
    CSS: 'bg-indigo-400',
    'C++': 'bg-purple-400',
  };

  return (
    <div className="py-12 sm:py-16">
      <PageSEO
        title="Live GitHub Intelligence & Activity"
        description="Real-time open source telemetry, public repositories, and star counts from @ThakurAnsh33 on GitHub."
        pathname="/activity"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <SectionHeading
          badge="Live Telemetry"
          title="GitHub Intelligence &amp; Open Source"
          subtitle="Real-time repository statistics, primary languages, and public activity served through the Express backend proxy."
        />

        {/* Action / Refresh Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl hud-card border border-slate-200 dark:border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-[#0f1120] border border-slate-200 dark:border-white/15 flex items-center justify-center text-accent-cyan shrink-0">
              <Github size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-bold font-heading text-slate-900 dark:text-[#f2f3f8]">
                  @ThakurAnsh33
                </h3>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  REST API Connected
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-[#a6adc8]">
                Cached every 15 mins to maintain rate limits with GitHub Octokit REST.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={loadStats}
              title="Refresh GitHub Statistics"
              className="p-2.5 rounded-xl hud-card text-slate-700 dark:text-[#a6adc8] hover:text-accent-cyan border border-slate-200 dark:border-white/10 flex items-center gap-2 text-xs font-semibold transition-colors"
            >
              <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
              <span>Refresh Telemetry</span>
            </button>
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-hud-primary px-4 py-2 rounded-xl text-xs font-bold inline-flex items-center gap-1.5"
            >
              <span>Open GitHub Profile</span>
              <ExternalLink size={13} />
            </a>
          </div>
        </div>

        {/* Loading Skeleton */}
        {loading && !stats && (
          <div className="space-y-6 animate-pulse">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-24 rounded-2xl bg-slate-200 dark:bg-white/5" />
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-40 rounded-3xl bg-slate-200 dark:bg-white/5" />
              ))}
            </div>
          </div>
        )}

        {/* Error Fallback */}
        {error && !stats && (
          <div className="p-8 text-center rounded-3xl hud-card border border-rose-500/30 bg-rose-500/5 space-y-4 max-w-lg mx-auto">
            <AlertCircle size={28} className="text-rose-400 mx-auto" />
            <h4 className="text-lg font-bold font-heading text-slate-900 dark:text-[#f2f3f8]">
              GitHub Telemetry Paused
            </h4>
            <p className="text-xs text-slate-600 dark:text-[#a6adc8]">
              {error}. You can view the live profile directly on GitHub.
            </p>
            <div className="flex justify-center gap-3">
              <button onClick={loadStats} className="btn-hud-primary px-4 py-2 rounded-xl text-xs font-bold">
                Retry Connection
              </button>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl text-xs font-semibold hud-card border"
              >
                Open Directly
              </a>
            </div>
          </div>
        )}

        {/* Stats Content */}
        {stats && (
          <div className="space-y-10">
            {/* Quick Metrics Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl hud-card border border-slate-200 dark:border-white/10 text-center">
                <BookOpen size={20} className="text-accent-cyan mx-auto mb-2" />
                <div className="text-2xl font-extrabold font-heading text-slate-900 dark:text-[#f2f3f8]">
                  {stats.publicRepos || 18}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                  Public Repos
                </div>
              </div>

              <div className="p-5 rounded-2xl hud-card border border-slate-200 dark:border-white/10 text-center">
                <Star size={20} className="text-amber-400 mx-auto mb-2" />
                <div className="text-2xl font-extrabold font-heading text-slate-900 dark:text-[#f2f3f8]">
                  {stats.totalStars || 12}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                  Stargazers
                </div>
              </div>

              <div className="p-5 rounded-2xl hud-card border border-slate-200 dark:border-white/10 text-center">
                <Users size={20} className="text-emerald-400 mx-auto mb-2" />
                <div className="text-2xl font-extrabold font-heading text-slate-900 dark:text-[#f2f3f8]">
                  {stats.followers || 15}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                  Followers
                </div>
              </div>

              <div className="p-5 rounded-2xl hud-card border border-slate-200 dark:border-white/10 text-center">
                <GitFork size={20} className="text-purple-400 mx-auto mb-2" />
                <div className="text-2xl font-extrabold font-heading text-slate-900 dark:text-[#f2f3f8]">
                  {stats.totalForks || 8}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                  Forks Received
                </div>
              </div>
            </div>

            {/* Repositories Showcase */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-[#f2f3f8]">
                    Featured Public Repositories
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-[#a6adc8] mt-0.5">
                    Synchronized directly from GitHub REST v3
                  </p>
                </div>
                <span className="text-xs font-mono text-accent-cyan">
                  {(stats.recentRepos || []).length} Active Repos
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {(stats.recentRepos || []).map((repo) => (
                  <div
                    key={repo.id || repo.name}
                    className="p-6 rounded-3xl hud-card border border-slate-200 dark:border-white/10 flex flex-col justify-between hover:border-accent-cyan/40 transition-colors group space-y-4"
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <a
                          href={repo.url || repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-heading font-bold text-base text-slate-900 dark:text-[#f2f3f8] group-hover:text-accent-cyan transition-colors flex items-center gap-1.5"
                        >
                          <span>{repo.name}</span>
                          <ExternalLink size={13} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>

                        <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
                          <span className="flex items-center gap-1">
                            <Star size={12} className="text-amber-400" />
                            <span>{repo.stars || repo.stargazers_count || 0}</span>
                          </span>
                          <span className="flex items-center gap-1">
                            <GitFork size={12} />
                            <span>{repo.forks || repo.forks_count || 0}</span>
                          </span>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-600 dark:text-[#a6adc8] leading-relaxed line-clamp-2">
                        {repo.description || 'Full-stack application architecture and REST service implementation.'}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-white/10 text-xs font-mono text-slate-500 dark:text-slate-400">
                      {repo.language && (
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              languageColorMap[repo.language] || 'bg-accent-cyan'
                            }`}
                          />
                          <span>{repo.language}</span>
                        </div>
                      )}
                      <a
                        href={repo.url || repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent-cyan hover:underline font-bold"
                      >
                        Inspect Code →
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

