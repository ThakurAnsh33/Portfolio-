import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Custom hook for global keyboard shortcuts and g-then-key route navigation
 */
export const useKeyboardShortcuts = ({
  onToggleTerminal,
  onToggleShortcuts,
  onCloseModals,
}) => {
  const [gKeyPressed, setGKeyPressed] = useState(false);
  const gKeyTimeoutRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Allow Escape to close modals regardless of focus
      if (e.key === 'Escape') {
        if (onCloseModals) onCloseModals();
        return;
      }

      // Check if user is typing inside an input / textarea
      const target = e.target;
      const isInput =
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable;

      // Ctrl+K / Cmd+K to open Terminal
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (onToggleTerminal) onToggleTerminal();
        return;
      }

      // If typing in input, don't trigger letter shortcuts
      if (isInput) return;

      // Question mark (?) toggles keyboard shortcuts cheat sheet
      if (e.key === '?' || (e.shiftKey && e.key === '/')) {
        e.preventDefault();
        if (onToggleShortcuts) onToggleShortcuts();
        return;
      }

      // 'T' to quick-open terminal
      if (e.key.toLowerCase() === 't' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        if (onToggleTerminal) onToggleTerminal();
        return;
      }

      // Handle 'G' sequence
      if (e.key.toLowerCase() === 'g') {
        setGKeyPressed(true);
        clearTimeout(gKeyTimeoutRef.current);
        // Reset after 1.2 seconds if second key isn't pressed
        gKeyTimeoutRef.current = setTimeout(() => {
          setGKeyPressed(false);
        }, 1200);
        return;
      }

      if (gKeyPressed) {
        const key = e.key.toLowerCase();
        setGKeyPressed(false);
        clearTimeout(gKeyTimeoutRef.current);

        switch (key) {
          case 'h':
            e.preventDefault();
            navigate('/');
            break;
          case 'a':
            e.preventDefault();
            navigate('/about');
            break;
          case 's':
            e.preventDefault();
            navigate('/skills');
            break;
          case 'e':
            e.preventDefault();
            navigate('/experience');
            break;
          case 'p':
            e.preventDefault();
            navigate('/projects');
            break;
          case 'c':
            e.preventDefault();
            navigate('/contact');
            break;
          case 'd':
            e.preventDefault();
            navigate('/about#education');
            break;
          case 'g':
            e.preventDefault();
            navigate('/activity');
            break;
          case 'n':
            e.preventDefault();
            navigate('/changelog');
            break;
          default:
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(gKeyTimeoutRef.current);
    };
  }, [gKeyPressed, onToggleTerminal, onToggleShortcuts, onCloseModals, navigate]);

  return { gKeyPressed };
};

