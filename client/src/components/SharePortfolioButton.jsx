import React, { useState } from 'react';
import { Share2, Check } from 'lucide-react';
import toast from 'react-hot-toast';

/**
 * Enhancement #12: Share Portfolio Button
 * Uses Web Share API on mobile / supported browsers, with a seamless clipboard fallback on desktop.
 */
export const SharePortfolioButton = ({ className = '', label = 'Share Portfolio' }) => {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: 'Ansh Singh | Full Stack MERN Developer',
      text: 'Check out the developer portfolio of Ansh Singh — Full Stack MERN Engineer!',
      url: window.location.origin || window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err) {
        // Fallback to clipboard if user dismissed or share failed
        if (err.name === 'AbortError') return;
      }
    }

    // Clipboard fallback
    try {
      await navigator.clipboard.writeText(shareData.url);
      setCopied(true);
      toast.success('Portfolio link copied to clipboard!', { icon: '🔗' });
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      toast.error('Could not copy link to clipboard');
    }
  };

  return (
    <button
      onClick={handleShare}
      title="Share this portfolio"
      aria-label="Share this portfolio"
      className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl hud-card text-xs font-semibold text-slate-700 dark:text-[#EDEDE6] border border-slate-200 dark:border-white/10 hover:border-accent-moss hover:text-accent-moss transition-all duration-200 shadow-sm ${className}`}
    >
      {copied ? (
        <Check size={14} className="text-emerald-400" />
      ) : (
        <Share2 size={14} className="text-accent-moss" />
      )}
      <span>{copied ? 'Link Copied!' : label}</span>
    </button>
  );
};

