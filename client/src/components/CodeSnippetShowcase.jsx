import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Copy, Check, Terminal, Cpu, ShieldCheck, Database, Layers } from 'lucide-react';
import toast from 'react-hot-toast';
import { SectionHeading } from './SectionHeading';

const snippets = [
  {
    id: 'socket-auction',
    title: 'Real-Time Bid Engine',
    project: 'PrimeBid Auction Platform',
    icon: Cpu,
    language: 'javascript',
    description:
      'Socket.IO event handler with concurrency control, atomic MongoDB bid increments, and real-time room broadcasts to all connected bidders.',
    code: `// PrimeBid: Atomic Real-Time Auction Bidding Engine (Socket.IO + MongoDB)
export const handlePlaceBid = (io, socket) => {
  socket.on('auction:place_bid', async ({ auctionId, amount, bidderId }) => {
    try {
      // 1. Atomically increment bid and push bid history with condition
      const updatedAuction = await Auction.findOneAndUpdate(
        {
          _id: auctionId,
          status: 'active',
          currentBid: { $lt: amount },
          expiresAt: { $gt: new Date() },
        },
        {
          $set: { currentBid: amount, highestBidder: bidderId },
          $push: {
            bids: {
              bidder: bidderId,
              amount,
              timestamp: new Date(),
            },
          },
        },
        { new: true, runValidators: true }
      ).populate('highestBidder', 'name email avatar');

      if (!updatedAuction) {
        return socket.emit('bid_error', {
          message: 'Bid rejected: Auction closed or higher bid placed.',
        });
      }

      // 2. Broadcast updated state to all connected clients in auction room
      io.to(\`auction:\${auctionId}\`).emit('auction:bid_updated', {
        auctionId,
        newHighBid: amount,
        highestBidder: updatedAuction.highestBidder,
        bidCount: updatedAuction.bids.length,
      });
    } catch (err) {
      socket.emit('bid_error', { message: 'Failed to process bid transaction.' });
    }
  });
};`,
  },
  {
    id: 'jwt-auth',
    title: 'JWT Auth & Role Guard',
    project: 'Info Bharat Service Marketplace',
    icon: ShieldCheck,
    language: 'javascript',
    description:
      'High-performance Express authentication and role-based access control (RBAC) middleware verifying Bearer tokens and checking user permissions.',
    code: `// Info Bharat: JWT Authentication & Role-Based Access Guard Middleware
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access denied: No authentication token provided.',
    });
  }

  try {
    // Verify token signature and decode payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach fresh user record excluding hashed password
    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'User not found.' });
    }

    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Session expired or invalid token.' });
  }
};

// Role-based access control guard
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: \`Role '\${req.user.role}' is not authorized to access this resource.\`,
      });
    }
    next();
  };
};`,
  },
  {
    id: 'mongo-pipeline',
    title: 'Feedback Analytics Pipeline',
    project: 'CivicPulse Dashboard',
    icon: Database,
    language: 'javascript',
    description:
      'Multi-stage MongoDB aggregation pipeline calculating sentiment scores, category-wise incident rates, and average resolution times.',
    code: `// CivicPulse: Multi-Stage MongoDB Aggregation Pipeline for Feedback Analytics
export const getGrievanceAnalytics = async (req, res) => {
  const analytics = await Grievance.aggregate([
    // Stage 1: Filter grievances filed in the last 30 days
    {
      $match: {
        createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
      },
    },
    // Stage 2: Group by department and compute statistical aggregations
    {
      $group: {
        _id: '$department',
        totalTickets: { $sum: 1 },
        resolvedTickets: {
          $sum: { $cond: [{ $eq: ['$status', 'resolved'] }, 1, 0] },
        },
        avgSentimentScore: { $avg: '$nlpSentiment.score' },
        avgResolutionHours: {
          $avg: {
            $divide: [
              { $subtract: ['$resolvedAt', '$createdAt'] },
              1000 * 60 * 60,
            ],
          },
        },
      },
    },
    // Stage 3: Project computed resolution efficiency percentage
    {
      $project: {
        department: '$_id',
        totalTickets: 1,
        resolvedTickets: 1,
        avgSentimentScore: { $round: ['$avgSentimentScore', 2] },
        resolutionRate: {
          $round: [
            { $multiply: [{ $divide: ['$resolvedTickets', '$totalTickets'] }, 100] },
            1,
          ],
        },
      },
    },
    // Stage 4: Sort by highest incoming volume
    { $sort: { totalTickets: -1 } },
  ]);

  return res.status(200).json({ success: true, data: analytics });
};`,
  },
];

export const CodeSnippetShowcase = () => {
  const [activeTab, setActiveTab] = useState(snippets[0].id);
  const [copied, setCopied] = useState(false);

  const activeSnippet = snippets.find((s) => s.id === activeTab) || snippets[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeSnippet.code);
    setCopied(true);
    toast.success('Code snippet copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="code-showcase" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Architecture & Engineering"
          title="Code I'm Proud Of"
          subtitle="Real, production-grade snippets from my full-stack projects showcasing concurrency, security, and data pipelines."
        />

        <div className="max-w-5xl mx-auto">
          {/* Snippet Selection Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {snippets.map((snippet) => {
              const Icon = snippet.icon;
              const isActive = activeTab === snippet.id;
              return (
                <button
                  key={snippet.id}
                  onClick={() => setActiveTab(snippet.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'btn-hud-primary scale-105'
                      : 'hud-card text-slate-700 dark:text-[#9AA39A] border border-slate-200 dark:border-white/10 hover:border-accent-moss hover:text-accent-moss'
                  }`}
                >
                  <Icon size={16} />
                  <span>{snippet.title}</span>
                </button>
              );
            })}
          </div>

          {/* Code Window Card */}
          <div className="hud-card rounded-3xl border border-slate-200/80 dark:border-white/10 overflow-hidden shadow-2xl">
            {/* Window Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 py-4 bg-slate-100/80 dark:bg-[#1B2127] border-b border-slate-200 dark:border-white/10">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="h-4 w-[1px] bg-slate-300 dark:bg-white/15 ml-1 hidden sm:block" />
                <span className="font-mono text-xs font-semibold text-slate-900 dark:text-[#EDEDE6]">
                  {activeSnippet.title}.js
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded-md bg-accent-moss/10 text-accent-moss font-mono border border-accent-moss/20">
                  {activeSnippet.project}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white dark:bg-[#222A30] text-slate-800 dark:text-[#EDEDE6] border border-slate-200 dark:border-white/15 hover:border-accent-moss transition-all shadow-sm"
                  title="Copy code to clipboard"
                >
                  {copied ? (
                    <>
                      <Check size={14} className="text-emerald-500" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Architecture Context Banner */}
            <div className="px-6 py-3 bg-slate-50 dark:bg-[#12161A] border-b border-slate-200/60 dark:border-white/5 text-xs text-slate-600 dark:text-[#9AA39A] flex items-center gap-2">
              <Code2 size={15} className="text-accent-moss shrink-0" />
              <span>{activeSnippet.description}</span>
            </div>

            {/* Code Body with Line Numbers */}
            <div className="p-4 sm:p-6 bg-[#12161A] overflow-x-auto font-mono text-xs sm:text-sm leading-relaxed text-slate-200">
              <pre className="flex">
                {/* Line numbers column */}
                <div className="select-none text-slate-600 dark:text-slate-600 pr-4 text-right border-r border-slate-800 mr-4 shrink-0">
                  {activeSnippet.code.split('\n').map((_, i) => (
                    <div key={i}>{i + 1}</div>
                  ))}
                </div>
                {/* Code content */}
                <code className="text-[#EDEDE6] whitespace-pre flex-1">
                  {activeSnippet.code}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

