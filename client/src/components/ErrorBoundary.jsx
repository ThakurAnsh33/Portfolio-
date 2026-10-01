import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-[#12161A] text-[#EDEDE6]">
          <div className="max-w-md w-full p-8 rounded-3xl bg-[#1B2127] border border-accent-moss/30 text-center space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-400 border border-rose-500/20 flex items-center justify-center mx-auto text-xl font-mono">
              !
            </div>
            <h2 className="text-xl font-bold font-heading text-slate-100">
              Application Notice
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              {this.state.error?.message || 'An unexpected rendering error was intercepted.'}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-5 py-2.5 rounded-xl bg-accent-moss hover:bg-accent-mossDeep text-[#12161A] hover:text-white font-bold text-xs transition-colors duration-200"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

