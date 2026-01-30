import React, { useState } from 'react';
import { Search, Sparkles, Type, Link } from 'lucide-react';

export default function ClaimInput({ value, onChange, onVerify, isVerifying }) {

  const [mode, setMode] = useState('text'); // text | url

  const getPlaceholder = () =>
    mode === 'url'
      ? "Paste a URL to a news article or social media post..."
      : "Paste a news claim or statement here...";

  return (
    <div className="glass-panel p-6 mb-8 relative overflow-hidden">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <label className="text-sm font-semibold body-text-muted flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-500" />
          Analyze a Statement
        </label>

        {/* MODE SWITCH */}
        <div className="flex bg-slate-900/60 p-1 rounded-lg border border-white/10">
          <button
            type="button"
            onClick={() => setMode('text')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all
              ${mode === 'text'
                ? 'bg-purple-600 text-white shadow'
                : 'text-slate-400 hover:text-white hover:bg-white/10'
              }`}
          >
            <Type className="w-3 h-3 inline mr-1" />
            Text
          </button>

          <button
            type="button"
            onClick={() => setMode('url')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all
              ${mode === 'url'
                ? 'bg-purple-600 text-white shadow'
                : 'text-slate-400 hover:text-white hover:bg-white/10'
              }`}
          >
            <Link className="w-3 h-3 inline mr-1" />
            Link
          </button>
        </div>
      </div>

      {/* INPUT */}
      <div className="relative">
        <textarea
          className="
            glass-input
            w-full
            min-h-[140px]
            p-5
            text-base
            rounded-xl
            resize-none
            placeholder-slate-500
            text-slate-100
            focus:outline-none
            focus:ring-2
            focus:ring-purple-500/40
          "
          placeholder={getPlaceholder()}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={isVerifying}
        />

        <div className="absolute bottom-4 right-4 text-xs body-text-muted font-mono">
          {value.length} chars
        </div>
      </div>

      {/* ACTION AREA */}
      <div className="flex items-center justify-between mt-5 gap-4">
        <p className="text-xs body-text-muted">
          <span className="text-purple-500 font-medium">Try:</span>{" "}
          {mode === 'url'
            ? "https://twitter.com/news/status/123..."
            : '"Gold prices surged yesterday..."'}
        </p>

        {/* ✅ FIXED VERIFY BUTTON */}
        <button
          onClick={onVerify}
          disabled={!value.trim() || isVerifying}
          className="
            flex items-center gap-2
            text-sm font-semibold
            px-6 py-3
            rounded-xl
            text-white
            bg-fuchsia-600
            hover:bg-fuchsia-700
            shadow-lg
            shadow-fuchsia-500/30
            transition-all
            duration-200
            disabled:opacity-50
            disabled:cursor-not-allowed
            active:scale-95
          "
        >
          {isVerifying ? "Verifying..." : (
            <>
              <Search className="w-4 h-4" />
              Verify Result
            </>
          )}
        </button>
      </div>

    </div>
  );
}
