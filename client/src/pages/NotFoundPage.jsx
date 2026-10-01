import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Terminal, ArrowLeft, Home, Compass, AlertTriangle } from 'lucide-react';
import { PageSEO } from '../components/PageSEO';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="py-24 sm:py-32 flex items-center justify-center px-4">
      <PageSEO
        title="404 — Route Not Found"
        description="The requested route does not exist in memory buffer."
      />

      <div className="max-w-xl w-full p-8 sm:p-10 rounded-3xl hud-card border border-rose-500/40 dark:bg-[#12161A]/95 bg-white/95 shadow-2xl relative overflow-hidden space-y-6 text-center font-mono">
        {/* Glow */}
        <div className="absolute top-0 right-1/4 w-48 h-48 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Terminal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/10 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
          </div>
          <span className="text-rose-500 dark:text-rose-400 font-bold flex items-center gap-1">
            <AlertTriangle size={13} />
            <span>ERR_ROUTE_NOT_FOUND</span>
          </span>
        </div>

        <div className="space-y-2">
          <div className="text-6xl sm:text-7xl font-extrabold font-heading text-rose-500 drop-shadow">
            404
          </div>
          <h2 className="text-lg sm:text-xl font-bold font-heading text-slate-900 dark:text-white">
            Segment Fault: Invalid Memory Buffer
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
            The target location does not exist in the routing table or has been relocated to an alternate address space.
          </p>
        </div>

        {/* Suggested Routes Box */}
        <div className="p-4 rounded-xl dark:bg-[#1B2127] bg-slate-50 border border-slate-200 dark:border-white/5 text-left text-xs space-y-2 text-slate-700 dark:text-slate-300">
          <div className="text-slate-500 dark:text-slate-400"># Suggested reachable segments:</div>
          <div className="grid grid-cols-2 gap-2 text-accent-moss">
            <Link to="/" className="hover:underline flex items-center gap-1">
              <span>▸ cd /</span> <span className="text-slate-500 dark:text-slate-400">(Home)</span>
            </Link>
            <Link to="/about" className="hover:underline flex items-center gap-1">
              <span>▸ cd /about</span> <span className="text-slate-500 dark:text-slate-400">(Bio)</span>
            </Link>
            <Link to="/skills" className="hover:underline flex items-center gap-1">
              <span>▸ cd /skills</span> <span className="text-slate-500 dark:text-slate-400">(Matrix)</span>
            </Link>
            <Link to="/projects" className="hover:underline flex items-center gap-1">
              <span>▸ cd /projects</span> <span className="text-slate-500 dark:text-slate-400">(Catalog)</span>
            </Link>
            <Link to="/activity" className="hover:underline flex items-center gap-1">
              <span>▸ cd /activity</span> <span className="text-slate-500 dark:text-slate-400">(GitHub)</span>
            </Link>
            <Link to="/contact" className="hover:underline flex items-center gap-1">
              <span>▸ cd /contact</span> <span className="text-slate-500 dark:text-slate-400">(Dispatch)</span>
            </Link>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold hud-card text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-white/10 flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Go Back</span>
          </button>

          <Link
            to="/"
            className="btn-hud-primary px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5"
          >
            <Home size={14} />
            <span>Return to Base (Home)</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

