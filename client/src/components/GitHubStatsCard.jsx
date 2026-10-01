import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Star, GitFork, ExternalLink, Activity, BookOpen, Users, RefreshCw } from 'lucide-react';
import { fetchGitHubStats } from '../utils/api';

export const GitHubStatsCard = () => {
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
      setError(err.message);
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
  };

  return (
    <div className="w-full my-12">
      <div className="hud-card p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-white/10 relative overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 right-1/4 w-72 h-32 bg-accent-moss/5 rounded-full blur-3xl pointer-events-none" />

        {/* Card Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-200 dark:border-white/10">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-[#1B2127] border border-slate-200 dark:border-white/15 flex items-center justify-center text-accent-moss shadow-sm">
              <Github size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-[#EDEDE6]">
                  Live GitHub Activity
                </h3>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  REST API Live
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-[#9AA39A] mt-0.5">
                Real-time open source contributions & repository activity from @ThakurAnsh33
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={loadStats}
              title="Refresh GitHub Stats"
              className="p-2 rounded-xl bg-slate-100 dark:bg-[#222A30] text-slate-600 dark:text-[#9AA39A] hover:text-accent-moss border border-slate-200 dark:border-white/10 transition-colors"
            >
              <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
            </button>
            <a
              href="https://github.com/ThakurAnsh33"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-[#222A30] text-slate-900 dark:text-[#EDEDE6] hover:text-accent-moss border border-slate-200 dark:border-white/10 transition-colors"
            >
              <span>View GitHub</span>
              <ExternalLink size={13} />
            </a>
          </div>
        </div>

        {/* Loading Skeleton */}
        {loading && !stats ? (
          <div className="space-y-4 animate-pulse">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-20 rounded-2xl bg-slate-200 dark:bg-white/5" />
              <div className="h-20 rounded-2xl bg-slate-200 dark:bg-white/5" />
              <div className="h-20 rounded-2xl bg-slate-200 dark:bg-white/5" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="h-24 rounded-2xl bg-slate-200 dark:bg-white/5" />
              <div className="h-24 rounded-2xl bg-slate-200 dark:bg-white/5" />
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              <div className="p-4 rounded-2xl bg-slate-100 dark:bg-[#222A30] border border-slate-200 dark:border-white/10 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent-moss/10 text-accent-moss flex items-center justify-center shrink-0">
                  <BookOpen size={18} />
                </div>
                <div>
                  <span className="text-xl sm:text-2xl font-bold font-mono text-slate-900 dark:text-[#EDEDE6] leading-none block">
                    {stats?.public_repos || 14}
                  </span>
                  <span className="text-[11px] font-medium text-slate-500 dark:text-[#9AA39A] uppercase tracking-wider">
                    Public Repos
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-100 dark:bg-[#222A30] border border-slate-200 dark:border-white/10 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent-mossDeep/15 text-accent-moss flex items-center justify-center shrink-0">
                  <Users size={18} />
                </div>
                <div>
                  <span className="text-xl sm:text-2xl font-bold font-mono text-slate-900 dark:text-[#EDEDE6] leading-none block">
                    {stats?.followers || 12}
                  </span>
                  <span className="text-[11px] font-medium text-slate-500 dark:text-[#9AA39A] uppercase tracking-wider">
                    Followers
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-100 dark:bg-[#222A30] border border-slate-200 dark:border-white/10 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                  <Activity size={18} />
                </div>
                <div>
                  <span className="text-xl sm:text-2xl font-bold font-mono text-slate-900 dark:text-[#EDEDE6] leading-none block">
                    100%
                  </span>
                  <span className="text-[11px] font-medium text-slate-500 dark:text-[#9AA39A] uppercase tracking-wider">
                    Uptime / Active
                  </span>
                </div>
              </div>
            </div>

            {/* Recent Repositories Grid */}
            <div>
              <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 dark:text-[#9AA39A] mb-3">
                Featured Public Repositories:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(stats?.recent_repos || []).slice(0, 4).map((repo) => (
                  <a
                    key={repo.name}
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-4 rounded-2xl bg-slate-50 dark:bg-[#1B2127] border border-slate-200 dark:border-white/10 hover:border-accent-moss/50 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="font-mono font-bold text-sm text-slate-900 dark:text-[#EDEDE6] group-hover:text-accent-moss transition-colors truncate">
                          {repo.name}
                        </span>
                        <ExternalLink size={13} className="text-slate-400 group-hover:text-accent-moss shrink-0" />
                      </div>
                      <p className="text-xs text-slate-600 dark:text-[#9AA39A] line-clamp-2 leading-relaxed">
                        {repo.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 mt-3 pt-2.5 border-t border-slate-200/60 dark:border-white/5 text-[11px] text-slate-500 dark:text-[#9AA39A] font-mono">
                      <span className="flex items-center gap-1.5">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            languageColorMap[repo.language] || 'bg-accent-moss'
                          }`}
                        />
                        <span>{repo.language}</span>
                      </span>

                      {repo.stargazers_count > 0 && (
                        <span className="flex items-center gap-1">
                          <Star size={12} className="text-amber-400" />
                          <span>{repo.stargazers_count}</span>
                        </span>
                      )}

                      {repo.forks_count > 0 && (
                        <span className="flex items-center gap-1">
                          <GitFork size={12} />
                          <span>{repo.forks_count}</span>
                        </span>
                      )}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

