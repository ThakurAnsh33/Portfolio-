import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, CornerDownLeft, Sparkles } from 'lucide-react';
import { personalInfo, skillCategories, projects, changelogEntries } from '../data/portfolioData';
import { getResumeDownloadUrl } from '../utils/api';
import { useTheme } from '../context/ThemeContext';
import { useSound } from '../context/SoundContext';

export const TerminalModal = ({ isOpen, onClose }) => {
  const { theme, toggleTheme } = useTheme();
  const { soundEnabled, toggleSound } = useSound();
  const navigate = useNavigate();
  const location = useLocation();

  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState([
    {
      type: 'system',
      text: '⚡ AnshOS Developer Command Palette v3.0.0 (x86_64-pc-linux-gnu)',
    },
    {
      type: 'system',
      text: 'Type "help" to view available commands, "ls" to list pages, or "cd <page>" to navigate.',
    },
  ]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isExpanded, setIsExpanded] = useState(false);

  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        if (inputRef.current) inputRef.current.focus();
      }, 100);
    }
  }, [isOpen]);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history]);

  if (!isOpen) return null;

  const handleCommand = (rawCmd) => {
    const trimmed = rawCmd.trim();
    if (!trimmed) return;

    const parts = trimmed.split(/\s+/);
    const cmd = parts[0]?.toLowerCase();
    const arg = parts.slice(1).join(' ').toLowerCase();

    // Add to command history
    setCommandHistory((prev) => [...prev, rawCmd]);
    setHistoryIndex(-1);

    const newOutput = [...history, { type: 'input', text: rawCmd }];

    switch (cmd) {
      case 'help':
        newOutput.push({
          type: 'output',
          text: `
AVAILABLE DEVELOPER COMMANDS:
  NAVIGATION:
    • cd <route>      - Navigate: cd / | cd about | cd skills | cd projects | cd experience | cd contact | cd activity | cd changelog
    • cd <slug>       - Jump to project: cd ner-slap | cd primebid | cd civicpulse | cd home-services | cd lpu-clothings
    • cd ..           - Go up one directory level
    • ls / dir        - List all routed pages and featured project slugs
    • pwd             - Print current active route path

  SYSTEM CONTROLS:
    • theme [dark|light|toggle] - Inspect or change active visual theme
    • sound [on|off|toggle]    - Toggle UI audio effects
    • resume / cv              - Download official tracked resume PDF

  QUICK INFO:
    • about           - Print career overview & education stats
    • skills          - Print core technical stack summary
    • projects        - Print projects overview
    • cat <page|slug> - View quick source metadata
    • whoami          - Show session identification

  SHORTCUTS & UTILS:
    • github          - Open GitHub profile in new tab
    • linkedin        - Open LinkedIn profile in new tab
    • sudo hire-me    - [Easter Egg] Trigger recruiter onboarding protocol
    • clear / cls     - Clear terminal buffer
    • exit / close    - Close command palette
          `,
        });
        break;

      case 'cd': {
        const target = arg.replace(/^\//, '').trim();
        if (!target || target === '~' || target === 'home' || target === '') {
          navigate('/');
          newOutput.push({ type: 'output', text: 'Navigated to: / (Home)' });
        } else if (target === '..') {
          if (location.pathname.startsWith('/projects/')) {
            navigate('/projects');
            newOutput.push({ type: 'output', text: 'Navigated to: /projects' });
          } else {
            navigate('/');
            newOutput.push({ type: 'output', text: 'Navigated to: / (Home)' });
          }
        } else if (target === 'about') {
          navigate('/about');
          newOutput.push({ type: 'output', text: 'Navigated to: /about' });
        } else if (target === 'skills') {
          navigate('/skills');
          newOutput.push({ type: 'output', text: 'Navigated to: /skills' });
        } else if (target === 'experience' || target === 'exp') {
          navigate('/experience');
          newOutput.push({ type: 'output', text: 'Navigated to: /experience' });
        } else if (target === 'projects') {
          navigate('/projects');
          newOutput.push({ type: 'output', text: 'Navigated to: /projects' });
        } else if (target.startsWith('projects/') || target.startsWith('project/')) {
          const slug = target.split('/')[1];
          const found = projects.find((p) => p.id === slug || p.slug === slug);
          if (found) {
            navigate(`/projects/${found.id}`);
            newOutput.push({ type: 'output', text: `Navigated to: /projects/${found.id} (${found.title.split('—')[0].trim()})` });
          } else {
            newOutput.push({ type: 'error', text: `Project not found: ${slug}. Run "ls" to view project slugs.` });
          }
        } else if (target === 'contact') {
          navigate('/contact');
          newOutput.push({ type: 'output', text: 'Navigated to: /contact' });
        } else if (target === 'activity' || target === 'github-stats') {
          navigate('/activity');
          newOutput.push({ type: 'output', text: 'Navigated to: /activity' });
        } else if (target === 'changelog' || target === 'now') {
          navigate('/changelog');
          newOutput.push({ type: 'output', text: 'Navigated to: /changelog' });
        } else {
          // Check if user specified a project slug directly e.g. "cd primebid"
          const found = projects.find((p) => p.id === target || p.slug === target);
          if (found) {
            navigate(`/projects/${found.id}`);
            newOutput.push({ type: 'output', text: `Navigated to: /projects/${found.id} (${found.title.split('—')[0].trim()})` });
          } else {
            newOutput.push({
              type: 'error',
              text: `cd: no such file or directory: ${arg}. Type "ls" to see available routes and project slugs.`,
            });
          }
        }
        break;
      }

      case 'ls':
      case 'dir':
        newOutput.push({
          type: 'output',
          text: `
DIRECTORY TREE & ROUTES:
  drwxr-xr-x  /              [Home Page]
  drwxr-xr-x  /about         [Full Story, Education, Certifications]
  drwxr-xr-x  /skills        [Interactive Skills Matrix & Tech Graph]
  drwxr-xr-x  /experience    [Internship & Hackathon Timeline]
  drwxr-xr-x  /projects      [Full Projects Catalog with Filter]
  drwxr-xr-x  /activity      [Live GitHub Statistics & Repos]
  drwxr-xr-x  /changelog     [Engineering Changelog / Now Log]
  drwxr-xr-x  /contact       [Contact & Collaboration Portal]

PROJECT CASE STUDIES:
  -rw-r--r--  ner-slap       → /projects/ner-slap (SIH Flagship)
  -rw-r--r--  primebid       → /projects/primebid
  -rw-r--r--  civicpulse     → /projects/civicpulse
  -rw-r--r--  home-services  → /projects/home-services
  -rw-r--r--  lpu-clothings  → /projects/lpu-clothings
          `,
        });
        break;

      case 'pwd':
        newOutput.push({
          type: 'output',
          text: `Current active route: ${location.pathname}`,
        });
        break;

      case 'cat': {
        if (!arg) {
          newOutput.push({ type: 'error', text: 'cat: missing operand. Usage: cat <page|slug>' });
          break;
        }
        const cleanArg = arg.replace(/^\//, '');
        if (cleanArg === 'about') {
          newOutput.push({
            type: 'output',
            text: `[About Me]\nName: ${personalInfo.name}\nRole: ${personalInfo.tagline}\nUniversity: ${personalInfo.university}\nCGPA: ${personalInfo.cgpa}\nStatus: ${personalInfo.status}`,
          });
        } else if (cleanArg === 'skills') {
          newOutput.push({
            type: 'output',
            text: `[Core Arsenal]\n${skillCategories.map((c) => `${c.category}: ${c.skills.map((s) => s.name).join(', ')}`).join('\n')}`,
          });
        } else if (cleanArg === 'changelog') {
          newOutput.push({
            type: 'output',
            text: `[Changelog Latest]\n${changelogEntries[0]?.version} — ${changelogEntries[0]?.title}\n${changelogEntries[0]?.summary}`,
          });
        } else {
          const p = projects.find((x) => x.id === cleanArg || x.slug === cleanArg);
          if (p) {
            newOutput.push({
              type: 'output',
              text: `[Project: ${p.title}]\nDate: ${p.date}\nTags: ${p.tags.join(', ')}\nProblem: ${p.problem}\nSolution: ${p.solution}`,
            });
          } else {
            newOutput.push({ type: 'error', text: `cat: ${arg}: No such document found` });
          }
        }
        break;
      }

      case 'theme': {
        if (arg === 'dark') {
          if (theme !== 'dark') toggleTheme();
          newOutput.push({ type: 'output', text: 'Visual theme set to: Dark Mode' });
        } else if (arg === 'light') {
          if (theme !== 'light') toggleTheme();
          newOutput.push({ type: 'output', text: 'Visual theme set to: Light Mode' });
        } else {
          toggleTheme();
          newOutput.push({
            type: 'output',
            text: `Theme toggled to: ${theme === 'dark' ? 'Light' : 'Dark'} mode`,
          });
        }
        break;
      }

      case 'sound': {
        if (arg === 'on') {
          if (!soundEnabled) toggleSound();
          newOutput.push({ type: 'output', text: 'Sound effects: Enabled' });
        } else if (arg === 'off') {
          if (soundEnabled) toggleSound();
          newOutput.push({ type: 'output', text: 'Sound effects: Muted' });
        } else {
          toggleSound();
          newOutput.push({
            type: 'output',
            text: `Sound effects toggled: ${!soundEnabled ? 'Enabled' : 'Muted'}`,
          });
        }
        break;
      }

      case 'about':
        navigate('/about');
        newOutput.push({
          type: 'output',
          text: `Navigated to /about\n\nNAME:     Ansh Singh\nROLE:     Full Stack MERN Developer\nDEGREE:   B.Tech CSE (CGPA: 8.3)\nCOLLEGE:  Lovely Professional University`,
        });
        break;

      case 'skills':
        navigate('/skills');
        newOutput.push({
          type: 'output',
          text: `Navigated to /skills\n\nTECHNICAL STACK:\n${skillCategories.map((c) => `[${c.category}]: ${c.skills.map((s) => s.name).join(', ')}`).join('\n')}`,
        });
        break;

      case 'projects':
        navigate('/projects');
        newOutput.push({
          type: 'output',
          text: `Navigated to /projects\n\nFEATURED REPOSITORIES:\n${projects.map((p, i) => `${i + 1}. ${p.title} (slug: ${p.id})`).join('\n')}`,
        });
        break;

      case 'contact':
        navigate('/contact');
        newOutput.push({
          type: 'output',
          text: `Navigated to /contact\n\nCONTACT CHANNELS:\n  • Email:    ${personalInfo.email}\n  • Phone:    ${personalInfo.phone}\n  • Location: ${personalInfo.location}`,
        });
        break;

      case 'resume':
      case 'cv':
        newOutput.push({
          type: 'output',
          text: '📄 Initiating tracked resume download via /api/resume-download...',
        });
        const link = document.createElement('a');
        link.href = getResumeDownloadUrl();
        link.download = 'Ansh_Singh_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        break;

      case 'sudo':
      case 'sudo hire-me':
      case 'hire-me':
        navigate('/contact');
        newOutput.push({
          type: 'output',
          text: `
🚀 ACCESS GRANTED!
Initializing candidate onboarding protocol...
Status: 200 OK — Candidate Ansh Singh is placement-ready!
Navigating to /contact for direct scheduling...
          `,
        });
        break;

      case 'github':
        window.open(personalInfo.github, '_blank');
        newOutput.push({
          type: 'output',
          text: `Opened GitHub profile in new tab: ${personalInfo.github}`,
        });
        break;

      case 'linkedin':
        window.open(personalInfo.linkedIn, '_blank');
        newOutput.push({
          type: 'output',
          text: `Opened LinkedIn profile in new tab: ${personalInfo.linkedIn}`,
        });
        break;

      case 'whoami':
        newOutput.push({
          type: 'output',
          text: 'guest@recruiter-workstation:~$ You are interacting with Ansh Singh’s developer portfolio.',
        });
        break;

      case 'clear':
      case 'cls':
        setHistory([]);
        setInputVal('');
        return;

      case 'exit':
      case 'close':
      case 'quit':
        onClose();
        return;

      default:
        newOutput.push({
          type: 'error',
          text: `zsh: command not found: ${rawCmd}. Type "help" or "ls" to see available commands.`,
        });
        break;
    }

    setHistory(newOutput);
    setInputVal('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIndex =
          historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIndex);
        setInputVal(commandHistory[nextIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const nextIndex = historyIndex + 1;
        if (nextIndex < commandHistory.length) {
          setHistoryIndex(nextIndex);
          setInputVal(commandHistory[nextIndex]);
        } else {
          setHistoryIndex(-1);
          setInputVal('');
        }
      }
    }
  };

  const quickPills = [
    'help',
    'ls',
    'cd projects',
    'cd skills',
    'cd activity',
    'cd changelog',
    'theme',
    'resume',
    'clear',
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/75 backdrop-blur-md">
        {/* Backdrop click */}
        <div className="absolute inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className={`relative flex flex-col bg-[#05060f] text-[#f2f3f8] border border-accent-cyan/30 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 z-10 font-mono ${
            isExpanded
              ? 'w-[96vw] h-[92vh]'
              : 'w-full max-w-3xl h-[650px] max-h-[88vh]'
          }`}
        >
          {/* Terminal Window Header Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#0f1120] border-b border-white/10 select-none">
            {/* Window Traffic Lights */}
            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="w-3 h-3 rounded-full bg-rose-500 hover:opacity-80 transition-opacity"
                title="Close"
              />
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-3 h-3 rounded-full bg-amber-500 hover:opacity-80 transition-opacity"
                title="Resize"
              />
              <button
                onClick={() => handleCommand('clear')}
                className="w-3 h-3 rounded-full bg-emerald-500 hover:opacity-80 transition-opacity"
                title="Clear"
              />
              <span className="ml-2 text-xs font-semibold text-slate-400 hidden sm:inline">
                ansh@portfolio-shell:~
              </span>
            </div>

            {/* Title / Badge */}
            <div className="flex items-center gap-2 text-xs text-accent-cyan font-semibold">
              <TerminalIcon size={14} />
              <span>Interactive CLI</span>
            </div>

            {/* Window Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1 rounded text-slate-400 hover:text-white transition-colors"
                title={isExpanded ? 'Restore' : 'Maximize'}
              >
                {isExpanded ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
              </button>
              <button
                onClick={onClose}
                className="p-1 rounded text-slate-400 hover:text-white transition-colors"
                title="Close"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Terminal Output Area */}
          <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-3 text-xs sm:text-sm leading-relaxed scrollbar-thin">
            {history.map((item, idx) => {
              if (item.type === 'system') {
                return (
                  <div key={idx} className="text-accent-cyan/90 font-medium">
                    {item.text}
                  </div>
                );
              }
              if (item.type === 'input') {
                return (
                  <div key={idx} className="flex items-center gap-2 text-[#f2f3f8]">
                    <span className="text-accent-cyan font-bold">ansh@portfolio:~$</span>
                    <span>{item.text}</span>
                  </div>
                );
              }
              if (item.type === 'error') {
                return (
                  <div key={idx} className="text-rose-400">
                    {item.text}
                  </div>
                );
              }
              return (
                <div
                  key={idx}
                  className="text-slate-200 whitespace-pre-wrap pl-2 border-l-2 border-accent-cyan/30"
                >
                  {item.text}
                </div>
              );
            })}
            <div ref={bottomRef} />
          </div>

          {/* Quick Suggestion Pills */}
          <div className="px-4 py-2 border-t border-white/5 bg-[#0a0c18] flex items-center gap-1.5 overflow-x-auto text-[11px]">
            <span className="text-slate-500 shrink-0 mr-1 flex items-center gap-1">
              <Sparkles size={11} className="text-accent-cyan" /> Suggested:
            </span>
            {quickPills.map((pill) => (
              <button
                key={pill}
                onClick={() => handleCommand(pill)}
                className="px-2.5 py-1 rounded-md bg-white/5 hover:bg-accent-cyan/15 hover:text-accent-cyan border border-white/10 transition-colors shrink-0 text-slate-300"
              >
                {pill}
              </button>
            ))}
          </div>

          {/* Input Prompt */}
          <div className="flex items-center gap-2 px-4 py-3 bg-[#0f1120] border-t border-white/10">
            <span className="text-accent-cyan font-bold text-xs sm:text-sm shrink-0">
              ansh@portfolio:~$
            </span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a command (e.g. help, skills, sudo hire-me)..."
              className="flex-1 bg-transparent text-[#f2f3f8] placeholder-slate-500 text-xs sm:text-sm focus:outline-none font-mono"
            />
            <button
              onClick={() => handleCommand(inputVal)}
              className="p-1.5 rounded-lg text-accent-cyan hover:bg-accent-cyan/10 transition-colors"
              title="Run Command"
            >
              <CornerDownLeft size={16} />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

