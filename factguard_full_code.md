# FactGuard Full Source Code

## package.json
```json
{
  "name": "factguard",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "lucide-react": "^0.562.0",
    "react": "^19.2.0",
    "react-dom": "^19.2.0"
  },
  "devDependencies": {
    "@eslint/js": "^9.39.1",
    "@types/react": "^19.2.5",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^5.1.1",
    "autoprefixer": "^10.4.23",
    "eslint": "^9.39.1",
    "eslint-plugin-react-hooks": "^7.0.1",
    "eslint-plugin-react-refresh": "^0.4.24",
    "globals": "^16.5.0",
    "postcss": "^8.5.6",
    "tailwindcss": "^3.4.17",
    "vite": "^7.2.4"
  }
}

```

## vite.config.js
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})

```

## tailwind.config.js
```javascript
/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                bg: 'var(--color-bg)',
                surface: 'var(--color-surface)',
                primary: 'var(--color-primary)',
            }
        },
    },
    plugins: [],
}

```

## postcss.config.js
```javascript
export default {
    plugins: {
        tailwindcss: {},
        autoprefixer: {},
    },
}

```

## index.html
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>factguard</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>

```

## src/main.jsx
```javascript
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

```

## src/App.jsx
```javascript

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ClaimInput from './components/ClaimInput';
import AgentWorkflow from './components/AgentWorkflow';
import VerificationResult from './components/VerificationResult';
import EvidencePanel from './components/EvidencePanel';
import ExplanationPanel from './components/ExplanationPanel';
import LiveLogs from './components/LiveLogs';
import ConfidenceChart from './components/ConfidenceChart';
import RecentActivity from './components/RecentActivity';
import TrendingNarratives from './components/TrendingNarratives';
import SystemMonitor from './components/SystemMonitor';
import NewsTicker from './components/NewsTicker';
import SidebarLeft from './components/SidebarLeft';

function App() {
  const [claim, setClaim] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const [agentStates, setAgentStates] = useState({
    planner: 'idle', // idle, working, completed
    executor: 'idle',
    evaluator: 'idle'
  });
  const [result, setResult] = useState(null); // { status, confidence, timestamp, sources, explanation }

  useEffect(() => {
    // Apply theme class to body
    if (isDarkMode) {
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleVerify = async () => {
    if (!claim.trim()) return;

    // Reset state
    setIsVerifying(true);
    setResult(null);
    setAgentStates({ planner: 'working', executor: 'idle', evaluator: 'idle' });

    // Simulate Planner Agent
    await new Promise(r => setTimeout(r, 1500));
    setAgentStates({ planner: 'completed', executor: 'working', evaluator: 'idle' });

    // Simulate Executor Agent
    await new Promise(r => setTimeout(r, 2000));
    setAgentStates({ planner: 'completed', executor: 'completed', evaluator: 'working' });

    // Simulate Evaluator Agent
    await new Promise(r => setTimeout(r, 1500));
    setAgentStates({ planner: 'completed', executor: 'completed', evaluator: 'completed' });

    // Finalize
    setIsVerifying(false);

    // Mock Logic for Demo
    const now = new Date().toLocaleString();
    const isGold = claim.toLowerCase().includes('gold') || claim.toLowerCase().includes('price');
    const isFake = claim.toLowerCase().includes('fake') || claim.toLowerCase().includes('false');

    let finalStatus = 'VERIFIED';
    let confidence = '98%';

    // Dynamic mock response based on keyword 'gold' or 'fake' to show different states in demo
    if (isFake) {
      finalStatus = 'CONTRADICTED';
      confidence = '92%';
    } else if (claim.length < 15) {
      finalStatus = 'INCONCLUSIVE';
      confidence = 'Low';
    }

    setResult({
      status: finalStatus,
      confidence: confidence,
      timestamp: now,
      sources: [
        { source: 'NewsAPI', title: 'Global Markets Update: Commodities Surge', date: '2024-05-20 14:30' },
        { source: 'Alpha Vantage', title: 'XAU/USD Real-time Data', date: '2024-05-20 14:32' },
        { source: 'Reuters', title: 'Central Banks Increase Reserves', date: '2024-05-19 09:15' }
      ],
      explanation: {
        summary: finalStatus === 'VERIFIED'
          ? 'The Planner Agent identified multiple reliable financial data sources. The Executor Agent successfully retrieved real-time market data confirming the trend. The Evaluator Agent cross-referenced the news reports with market charts.'
          : 'The Claim contradicts available real-time data from primary sources.',
        points: [
          'Market data shows a 1.2% increase in the relevant period.',
          'Multiple high-authority news sources interpret this as a reaction to inflation data.',
          'No contradictory reports were found from major outlets.'
        ]
      }
    });
  };

  return (
    <div className="flex flex-col min-h-screen transition-colors duration-300">
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

      <main className="container-fluid px-6 flex-grow py-12">
        <div className="text-center space-y-4 mb-12">
          <span className="px-3 py-1 rounded-full border border-purple-500/20 bg-purple-500/10 text-purple-500 text-xs font-bold uppercase tracking-widest">
            v3.0 Ultra Live
          </span>
          <h2 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-violet-400 tracking-tighter drop-shadow-[0_0_15px_rgba(217,70,239,0.3)]">
            FACTGUARD
          </h2>
          <p className="text-lg max-w-2xl mx-auto text-slate-400 font-medium">
            Autonomous multi-agent constellation verifying truth at the speed of light.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">

          {/* Left Sidebar (New Feature) */}
          <div className="lg:col-span-1 hidden lg:block lg:sticky lg:top-24">
            <SidebarLeft />
          </div>

          {/* Center Column: Input and Results */}
          <div className="lg:col-span-2 space-y-8">
            <ClaimInput
              value={claim}
              onChange={setClaim}
              onVerify={handleVerify}
              isVerifying={isVerifying}
            />
            {/* Always show workflow if verifying or if we have a result */}
            {(isVerifying || result) && (
              <AgentWorkflow agentStates={agentStates} />
            )}

            {result && (
              <>
                <VerificationResult
                  result={result.status}
                  confidence={result.confidence}
                  timestamp={result.timestamp}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <EvidencePanel sources={result.sources} />
                  <ExplanationPanel explanation={result.explanation} />
                </div>
              </>
            )}
          </div>

          {/* Right Column: Live Metrics (New Feature) */}
          <div className="lg:col-span-1 space-y-6 lg:sticky lg:top-24">
            {/* System Monitor - Always visible at top */}
            <div className="animate-in fade-in slide-in-from-right-8 duration-700">
              <SystemMonitor />
            </div>

            <div className="h-[300px]">
              <LiveLogs isVerifying={isVerifying} result={result} />
            </div>
            {result && (
              <div className="h-[200px] animate-in fade-in slide-in-from-right-8 duration-700">
                <ConfidenceChart />
              </div>
            )}
            <div className="h-[300px] animate-in fade-in slide-in-from-right-8 duration-700 delay-100">
              <RecentActivity />
            </div>

            <div className="mt-6 animate-in fade-in slide-in-from-right-8 duration-700 delay-200">
              <TrendingNarratives />
            </div>
          </div>

        </div>

      </main>

      <NewsTicker />
      <Footer />
    </div>
  );
}

export default App;

```

## src/index.css
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  /* Default (Dark Mode) - CYBERPUNK VIBRANT */
  --color-bg: #030712;
  /* Gray 950 - Pitch black */

  --color-text-main: #F8FAFC;
  --color-text-muted: #94A3B8;
  --color-text-bolder: #FFFFFF;

  /* Neon Accents */
  --color-accent-primary: #D946EF;
  /* Fuchsia 500 */
  --color-accent-secondary: #06B6D4;
  /* Cyan 500 */
  --color-accent-tertiary: #8B5CF6;
  /* Violet 500 */

  --color-accent-glow: rgba(217, 70, 239, 0.4);

  --color-border: rgba(255, 255, 255, 0.1);
  --color-glass-bg: rgba(10, 10, 20, 0.7);

  --font-family: 'Inter', system-ui, -apple-system, sans-serif;
  --radius-lg: 1rem;
}

body.light-mode {
  /* High contrast light mode */
  --color-bg: #FFFFFF;
  --color-text-main: #0F172A;
  --color-glass-bg: rgba(255, 255, 255, 0.9);
}

body {
  margin: 0;
  font-family: var(--font-family);
  background-color: var(--color-bg);
  /* Vibrant Mesh Gradient Background */
  background-image:
    radial-gradient(at 0% 0%, rgba(217, 70, 239, 0.15) 0px, transparent 50%),
    radial-gradient(at 100% 0%, rgba(6, 182, 212, 0.15) 0px, transparent 50%),
    radial-gradient(at 50% 100%, rgba(139, 92, 246, 0.15) 0px, transparent 50%);
  background-attachment: fixed;
  color: var(--color-text-main);
  transition: background-color 0.3s, color 0.3s;
}

/* Glassmorphism Utilities */
.glass-panel {
  background: var(--color-glass-bg);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-lg);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
}

.glass-panel:hover {
  border-color: rgba(217, 70, 239, 0.4);
  box-shadow: 0 8px 32px 0 rgba(217, 70, 239, 0.15);
  transform: translateY(-2px);
}

.glass-input {
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--color-text-main);
  transition: all 0.2s;
}

.glass-input:focus {
  border-color: var(--color-accent-secondary);
  box-shadow: 0 0 0 2px rgba(6, 182, 212, 0.25);
  background: rgba(0, 0, 0, 0.5);
  outline: none;
}

/* Vibrant Button */
.btn-primary {
  background: linear-gradient(135deg, #D946EF 0%, #8B5CF6 100%);
  color: #FFFFFF;
  font-weight: 700;
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
  box-shadow: 0 0 15px rgba(217, 70, 239, 0.3);
  transition: all 0.3s;
  border: 1px solid rgba(255, 255, 255, 0.2);
  cursor: pointer;
  letter-spacing: 0.025em;
}

.btn-primary:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 0 25px rgba(217, 70, 239, 0.5);
  filter: brightness(1.1);
}

.text-gradient {
  background: linear-gradient(to right, #D946EF, #06B6D4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
}

::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.2);
}

.body-text,
.body-text-muted {
  color: inherit;
  /* Fallback */
}
```

## src/components/Header.jsx
```javascript

import React from 'react';
import { ShieldCheck, Sun, Moon } from 'lucide-react';

export default function Header({ isDarkMode, toggleTheme }) {
    return (
        <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-900/80 backdrop-blur-md transition-colors duration-300 dark:bg-slate-900/80 light:bg-white/80" style={{ backgroundColor: 'var(--color-surface)' }}>
            <div className="container h-16 flex items-center justify-between mx-auto px-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20">
                        <ShieldCheck className="w-6 h-6 text-purple-500" />
                    </div>
                    <div>
                        <h1 className="font-bold text-xl tracking-tight body-text">FactGuard</h1>
                        <p className="text-[10px] body-text-muted font-medium uppercase tracking-widest hidden sm:block">AI Verification System</p>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <nav className="flex items-center gap-6 hidden md:flex">
                        <a href="#" className="text-sm font-medium body-text-muted hover:text-purple-500 transition-colors">Home</a>
                        <a href="#" className="text-sm font-medium body-text-muted hover:text-purple-500 transition-colors">How it Works</a>
                        <a href="#" className="text-sm font-medium body-text-muted hover:text-purple-500 transition-colors">About</a>
                    </nav>

                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full hover:bg-black/5 transition-colors border border-transparent hover:border-black/5"
                        title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                    >
                        {isDarkMode ?
                            <Sun className="w-5 h-5 text-purple-500" /> :
                            <Moon className="w-5 h-5 text-slate-600" />
                        }
                    </button>
                </div>
            </div>
        </header>
    );
}

```

## src/components/ClaimInput.jsx
```javascript

import React, { useState } from 'react';
import { Search, Sparkles, Type, Link, FileText, UploadCloud } from 'lucide-react';

export default function ClaimInput({ value, onChange, onVerify, isVerifying }) {
    const [mode, setMode] = useState('text'); // text, url, doc

    const getPlaceholder = () => {
        switch (mode) {
            case 'url': return "Paste a URL to a news article or social media post...";
            case 'doc': return "Upload a document to analyze...";
            default: return "Paste a news claim or statement here...";
        }
    };

    return (
        <div className="glass-panel p-6 mb-8 relative overflow-hidden group">
            {/* Decorative gradient glow */}
            <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all duration-700"></div>

            <div className="flex items-center justify-between mb-4">
                <label htmlFor="claim" className="text-sm font-semibold body-text-muted flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-purple-500" />
                    Analyze a Statement
                </label>

                {/* Mode Toggles */}
                <div className="flex bg-slate-900/50 p-1 rounded-lg border border-white/5">
                    <button
                        onClick={() => setMode('text')}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${mode === 'text' ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                    >
                        <Type className="w-3 h-3" /> Text
                    </button>
                    <button
                        onClick={() => setMode('url')}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${mode === 'url' ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                    >
                        <Link className="w-3 h-3" /> Link
                    </button>
                    <button
                        onClick={() => setMode('doc')}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${mode === 'doc' ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                    >
                        <FileText className="w-3 h-3" /> Doc
                    </button>
                </div>
            </div>

            <div className="relative">
                {mode === 'doc' ? (
                    <div className="w-full min-h-[140px] border-2 border-dashed border-slate-700 rounded-xl flex flex-col items-center justify-center bg-slate-900/30 hover:bg-slate-900/50 hover:border-purple-500/30 transition-all cursor-pointer group/upload">
                        <div className="p-4 bg-slate-800/50 rounded-full mb-3 group-hover/upload:scale-110 transition-transform">
                            <UploadCloud className="w-6 h-6 text-purple-400" />
                        </div>
                        <p className="text-sm text-slate-400 font-medium">Click to upload or drag and drop</p>
                        <p className="text-xs text-slate-600 mt-1">PDF, TXT, or DOCX (Max 10MB)</p>
                    </div>
                ) : (
                    <>
                        <textarea
                            id="claim"
                            className="glass-input w-full min-h-[140px] p-5 text-lg rounded-xl resize-none placeholder-slate-500"
                            placeholder={getPlaceholder()}
                            value={value}
                            onChange={(e) => onChange(e.target.value)}
                            disabled={isVerifying}
                        />
                        <div className="absolute bottom-4 right-4 text-xs body-text-muted font-mono">
                            {value.length} chars
                        </div>
                    </>
                )}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between mt-5 gap-4">
                <div className="flex flex-col gap-2">
                    <p className="text-xs body-text-muted">
                        <span className="text-purple-500 font-medium">Try:</span> {mode === 'url' ? 'https://twitter.com/news/status/123...' : '"Gold prices surged yesterday..."'}
                    </p>
                    <div className="flex items-center gap-2">
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="w-9 h-5 bg-slate-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-purple-600"></div>
                            <span className="ml-2 text-xs font-medium body-text-muted">Enable Deep Scan Mode</span>
                        </label>
                    </div>
                </div>
                <button
                    onClick={onVerify}
                    disabled={(!value.trim() && mode !== 'doc') || isVerifying}
                    className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2 text-sm"
                >
                    {isVerifying ? (
                        <>
                            <span className="animate-spin text-lg">⟳</span> Verifying...
                        </>
                    ) : (
                        <>
                            <Search className="w-4 h-4" /> Verify Result
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}

```

## src/components/AgentWorkflow.jsx
```javascript

import React from 'react';
import { Brain, Globe, CheckCircle2, Loader2, Circle, Activity } from 'lucide-react';

const AgentCard = ({ name, role, status, description, icon: Icon }) => {
    const getStatusStyles = (status) => {
        switch (status) {
            case 'working':
                return {
                    border: 'border-purple-500/50',
                    bg: 'bg-purple-500/5',
                    iconBg: 'bg-purple-500/20 text-purple-500',
                    indicator: 'text-purple-500 animate-spin',
                    glow: 'shadow-[0_0_15px_rgba(245,158,11,0.15)]'
                };
            case 'completed':
                return {
                    border: 'border-emerald-500/30',
                    bg: 'bg-emerald-500/5',
                    iconBg: 'bg-emerald-500/20 text-emerald-500',
                    indicator: 'text-emerald-500',
                    glow: ''
                };
            default:
                return {
                    border: 'border-white/5',
                    bg: 'bg-white/5',
                    iconBg: 'bg-white/10 body-text-muted',
                    indicator: 'body-text-muted',
                    glow: ''
                };
        }
    };

    const styles = getStatusStyles(status);

    return (
        <div className={`flex-1 p-5 rounded-xl border ${styles.border} ${styles.bg} ${styles.glow} transition-all duration-500 backdrop-blur-sm relative overflow-hidden group`}>
            {/* Active scan line for working state */}
            {status === 'working' && (
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-shimmer opacity-70"></div>
            )}

            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-lg ${styles.iconBg} transition-colors duration-300`}>
                        <Icon className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="font-bold body-text text-sm tracking-wide">{name}</h3>
                        <span className="text-[10px] font-bold body-text-muted uppercase tracking-widest">{role}</span>
                    </div>
                </div>
                <div>
                    {status === 'working' && <Loader2 className="w-4 h-4 text-purple-500 animate-spin" />}
                    {status === 'completed' && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                    {status === 'idle' && <Circle className="w-4 h-4 body-text-muted" />}
                </div>
            </div>
            <p className="text-xs body-text-muted leading-relaxed font-medium">
                {description}
            </p>
        </div>
    );
};

export default function AgentWorkflow({ agentStates }) {
    return (
        <div className="mb-8">
            <h2 className="text-sm font-bold body-text-muted mb-4 flex items-center gap-2 uppercase tracking-widest">
                <Activity className="w-4 h-4 text-purple-500" />
                Live Agent Swarm
            </h2>
            <div className="flex flex-col md:flex-row gap-4 relative">
                <AgentCard
                    name="Planner"
                    role="Architect"
                    status={agentStates.planner}
                    description="Decomposes the claim using reasoning models to identify key verifiability points."
                    icon={Brain}
                />

                {/* Connector Line (Desktop) */}
                <div className="hidden md:flex flex-col justify-center relative z-10 w-4">
                    <div className={`h-[1px] w-full transition-colors duration-500 ${agentStates.executor !== 'idle' ? 'bg-purple-500/50 shadow-[0_0_8px_rgba(245,158,11,0.5)]' : 'bg-slate-700'}`}></div>
                </div>

                <AgentCard
                    name="Executor"
                    role="Researcher"
                    status={agentStates.executor}
                    description="Scours real-time APIs (News, Markets) to retrieve primary source evidence."
                    icon={Globe}
                />

                {/* Connector Line (Desktop) */}
                <div className="hidden md:flex flex-col justify-center relative z-10 w-4">
                    <div className={`h-[1px] w-full transition-colors duration-500 ${agentStates.evaluator !== 'idle' ? 'bg-purple-500/50 shadow-[0_0_8px_rgba(245,158,11,0.5)]' : 'bg-slate-700'}`}></div>
                </div>

                <AgentCard
                    name="Auditor"
                    role="Judge"
                    status={agentStates.evaluator}
                    description="Synthesizes evidence to produce a final verdict with confidence scoring."
                    icon={CheckCircle2}
                />
            </div>
        </div>
    );
}

```

## src/components/TrendingNarratives.jsx
```javascript

import React from 'react';
import { TrendingUp, ArrowUpRight, Users } from 'lucide-react';

const TRENDS = [
    { topic: "AI Regulation Bill", count: "12.5k checks", growth: "+15%", color: "text-purple-400" },
    { topic: "Crypto Market Crash", count: "8.2k checks", growth: "+42%", color: "text-red-400" },
    { topic: "New Solar Tech", count: "5.1k checks", growth: "+8%", color: "text-emerald-400" },
    { topic: "Mars Mission Delay", count: "3.4k checks", growth: "+2%", color: "text-blue-400" },
];

export default function TrendingNarratives() {
    return (
        <div className="glass-panel p-5 animate-in fade-in slide-in-from-right-8 duration-700 delay-200">
            <h3 className="text-slate-400 font-bold mb-4 flex items-center gap-2 uppercase tracking-wider text-[10px]">
                <TrendingUp className="w-3 h-3 text-purple-500" />
                Trending Narratives
            </h3>
            <div className="space-y-4">
                {TRENDS.map((trend, idx) => (
                    <div key={idx} className="group cursor-pointer">
                        <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-semibold text-slate-200 group-hover:text-purple-400 transition-colors">
                                {trend.topic}
                            </span>
                            <div className="flex items-center gap-1 text-[10px] bg-white/5 px-1.5 py-0.5 rounded border border-white/5 group-hover:border-purple-500/30">
                                <span className={trend.color}>{trend.growth}</span>
                                <ArrowUpRight className={`w-2.5 h-2.5 ${trend.color}`} />
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-[10px] text-slate-500">
                            <Users className="w-3 h-3" />
                            <span>{trend.count} this week</span>
                        </div>
                        <div className="h-[1px] w-full bg-gradient-to-r from-white/5 to-transparent mt-3 group-last:hidden"></div>
                    </div>
                ))}
            </div>
            <button className="w-full mt-4 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-purple-400 transition-colors border-t border-dashed border-slate-700 hover:border-purple-500/30 pt-4">
                Explore Global Data
            </button>
        </div>
    );
}

```

## src/components/SystemMonitor.jsx
```javascript

import React, { useState, useEffect } from 'react';
import { Server, Wifi, Activity, Cpu } from 'lucide-react';

export default function SystemMonitor() {
    const [metrics, setMetrics] = useState({
        load: 42,
        latency: 24,
        agents: 12
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setMetrics(prev => ({
                load: Math.min(100, Math.max(20, prev.load + (Math.random() * 10 - 5))),
                latency: Math.max(10, prev.latency + (Math.random() * 4 - 2)),
                agents: 12 + Math.floor(Math.random() * 2)
            }));
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="glass-panel p-5 animate-in fade-in slide-in-from-right-8 duration-700">
            <h3 className="text-slate-400 font-bold mb-4 flex items-center gap-2 uppercase tracking-wider text-[10px]">
                <Server className="w-3 h-3 text-purple-500" />
                Network Telemetry
            </h3>

            <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="p-3 bg-black/20 rounded-lg border border-white/5 flex flex-col items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-purple-500/5"></div>
                    <Cpu className="w-4 h-4 text-purple-400 mb-1" />
                    <span className="text-lg font-bold text-slate-200">{Math.round(metrics.load)}%</span>
                    <span className="text-[9px] uppercase tracking-widest text-slate-500">Sys Load</span>
                    <div className="absolute bottom-0 left-0 h-1 bg-purple-500 transition-all duration-500" style={{ width: `${metrics.load}%` }}></div>
                </div>

                <div className="p-3 bg-black/20 rounded-lg border border-white/5 flex flex-col items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-emerald-500/5"></div>
                    <Wifi className="w-4 h-4 text-emerald-400 mb-1" />
                    <span className="text-lg font-bold text-slate-200">{Math.round(metrics.latency)}ms</span>
                    <span className="text-[9px] uppercase tracking-widest text-slate-500">Latency</span>
                </div>
            </div>

            <div className="space-y-3">
                <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                        Swarm Status
                    </span>
                    <span className="text-emerald-400 font-mono">OPERATIONAL</span>
                </div>
                <div className="h-[1px] bg-white/5 w-full"></div>

                <div className="space-y-1">
                    <div className="flex justify-between text-[10px] text-slate-400 uppercase tracking-wider">
                        <span>Agent uptime</span>
                        <span>99.99%</span>
                    </div>
                    <div className="h-1 w-full bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full bg-slate-400 w-full"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

```

## src/components/ExplanationPanel.jsx
```javascript

import React from 'react';
import { Lightbulb, ArrowRight } from 'lucide-react';

export default function ExplanationPanel({ explanation }) {
    if (!explanation) return null;

    return (
        <div className="glass-panel p-6 mb-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-3 opacity-5">
                <Lightbulb className="w-24 h-24 body-text" />
            </div>

            <h3 className="font-bold body-text mb-4 flex items-center gap-2 text-sm uppercase tracking-wider relative z-10">
                <Lightbulb className="w-4 h-4 text-purple-500" />
                System Reasoning
            </h3>
            <div className="relative z-10">
                <p className="body-text leading-relaxed mb-6 text-sm">
                    {explanation.summary}
                </p>
                <div className="space-y-3">
                    {explanation.points.map((point, index) => (
                        <div key={index} className="flex items-start gap-3 body-text-muted text-sm">
                            <ArrowRight className="w-4 h-4 text-purple-500/50 mt-0.5 shrink-0" />
                            <span>{point}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

```

## src/components/Footer.jsx
```javascript

import React from 'react';

export default function Footer() {
    return (
        <footer className="border-t border-white/5 bg-slate-900/50 mt-auto py-8">
            <div className="container text-center">
                <p className="text-slate-500 font-medium mb-2">
                    Built as a Multi-Agent AI System for Hackathon & Academic Use
                </p>
                <p className="text-slate-400 text-sm">
                    Disclaimer: Results are based on available sources at the time of verification.
                </p>
            </div>
        </footer>
    );
}

```

## src/components/SidebarLeft.jsx
```javascript

import React from 'react';
import { ShieldAlert, Eye, Target, Bookmark, Settings, Database } from 'lucide-react';

export default function SidebarLeft() {
    return (
        <div className="space-y-6">
            {/* Threat Level Widget */}
            <div className="glass-panel p-5 animate-in fade-in slide-in-from-left-8 duration-700">
                <h3 className="text-slate-400 font-bold mb-4 flex items-center gap-2 uppercase tracking-wider text-[10px]">
                    <ShieldAlert className="w-3 h-3 text-red-500" />
                    Global Misinfo Level
                </h3>
                <div className="flex flex-col items-center">
                    <div className="relative w-24 h-24 flex items-center justify-center mb-2">
                        <div className="absolute inset-0 rounded-full border-4 border-slate-800 border-t-red-500 animate-spin" style={{ animationDuration: '3s' }}></div>
                        <div className="absolute inset-2 rounded-full border-2 border-slate-800 border-b-orange-500 animate-spin" style={{ animationDuration: '5s', animationDirection: 'reverse' }}></div>
                        <div className="text-2xl font-black text-white">HI</div>
                    </div>
                    <span className="text-xs font-bold text-red-500 uppercase tracking-widest">Elevated Threat</span>
                    <p className="text-[10px] text-slate-500 text-center mt-2">
                        High volume of deepfake content detected in EMEA region.
                    </p>
                </div>
            </div>

            {/* Watchlist */}
            <div className="glass-panel p-5 animate-in fade-in slide-in-from-left-8 duration-700 delay-100">
                <h3 className="text-slate-400 font-bold mb-4 flex items-center gap-2 uppercase tracking-wider text-[10px]">
                    <Eye className="w-3 h-3 text-cyan-500" />
                    Active Watchlist
                </h3>
                <div className="space-y-2">
                    {[
                        { label: "Deepfake Gen_v4", status: "Active", bg: "bg-red-500" },
                        { label: "Election Integrity", status: "Monitoring", bg: "bg-emerald-500" },
                        { label: "Market Manipulation", status: "Scanning", bg: "bg-cyan-500" },
                        { label: "Botnet #8892", status: "Tracking", bg: "bg-purple-500" },
                    ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-2 rounded bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                            <span className="text-xs font-medium text-slate-300 group-hover:text-white">{item.label}</span>
                            <div className="flex items-center gap-1.5">
                                <span className={`w-1.5 h-1.5 rounded-full ${item.bg} animate-pulse`}></span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Quick Tools Navigation */}
            <div className="glass-panel p-2 animate-in fade-in slide-in-from-left-8 duration-700 delay-200">
                <nav className="flex flex-col gap-1">
                    <button className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-all text-xs font-medium text-left group">
                        <Target className="w-4 h-4 text-slate-500 group-hover:text-fuchsia-500 transition-colors" />
                        <span>My Investigations</span>
                    </button>
                    <button className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-all text-xs font-medium text-left group">
                        <Bookmark className="w-4 h-4 text-slate-500 group-hover:text-fuchsia-500 transition-colors" />
                        <span>Saved Evidence</span>
                        <span className="ml-auto bg-slate-800 px-1.5 py-0.5 rounded text-[9px]">12</span>
                    </button>
                    <button className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-all text-xs font-medium text-left group">
                        <Database className="w-4 h-4 text-slate-500 group-hover:text-fuchsia-500 transition-colors" />
                        <span>Knowledge Base</span>
                    </button>
                    <button className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-all text-xs font-medium text-left group">
                        <Settings className="w-4 h-4 text-slate-500 group-hover:text-fuchsia-500 transition-colors" />
                        <span>System Settings</span>
                    </button>
                </nav>
            </div>
        </div>
    );
}

```

## src/components/EvidencePanel.jsx
```javascript

import React from 'react';
import { ExternalLink, Link2, Newspaper } from 'lucide-react';

export default function EvidencePanel({ sources }) {
    if (!sources || sources.length === 0) return null;

    return (
        <div className="glass-panel p-6 mb-8 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
            <h3 className="font-bold body-text mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
                <Link2 className="w-4 h-4 text-purple-500" />
                Primary Sources
            </h3>
            <div className="space-y-3">
                {sources.map((source, index) => (
                    <div key={index} className="flex items-start justify-between p-4 rounded-lg bg-black/5 border border-white/5 hover:border-purple-500/30 hover:bg-black/10 transition-all group cursor-pointer">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1.5">
                                <span className="text-[10px] font-bold text-purple-600 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                                    {source.source}
                                </span>
                                <span className="text-[10px] body-text-muted flex items-center gap-1 font-mono">
                                    {source.date}
                                </span>
                            </div>
                            <h4 className="font-medium body-text text-sm group-hover:text-purple-500 transition-colors">
                                {source.title}
                            </h4>
                        </div>
                        <ExternalLink className="w-4 h-4 body-text-muted group-hover:text-purple-500 ml-4 mt-1 transition-colors" />
                    </div>
                ))}
            </div>
        </div>
    );
}

```

## src/components/NewsTicker.jsx
```javascript

import React from 'react';
import { Zap, Radio } from 'lucide-react';

const NEWS_ITEMS = [
    "BREAKING: AI Regulation Summit concludes in Geneva...",
    "MARKETS: Bitcoin surges past $95k amidst ETF inflow...",
    "TECH: New quantum processor achieves logic gate fidelity >99.9%...",
    "CLIMATE: Global renewable capacity hits record high in Q1...",
    "SPACE: Artemis III launch window confirmed for late 2026...",
];

export default function NewsTicker() {
    return (
        <div className="fixed bottom-0 left-0 right-0 h-10 bg-black/80 backdrop-blur-md border-t border-white/10 z-40 flex items-center overflow-hidden">
            <div className="bg-fuchsia-600 h-full px-4 flex items-center gap-2 shrink-0 z-10 shadow-[0_0_20px_rgba(217,70,239,0.5)]">
                <Radio className="w-4 h-4 text-white animate-pulse" />
                <span className="text-xs font-bold text-white uppercase tracking-widest">Live Feed</span>
            </div>

            <div className="flex whitespace-nowrap animate-ticker">
                {/* Duplicate list for seamless loop */}
                {[...NEWS_ITEMS, ...NEWS_ITEMS, ...NEWS_ITEMS].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 mx-4">
                        <span className="text-xs font-mono text-cyan-400">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        <span className="text-sm text-slate-300 font-medium">{item}</span>
                        <Zap className="w-3 h-3 text-fuchsia-500/50" />
                    </div>
                ))}
            </div>

            <style jsx>{`
            @keyframes ticker {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
            }
            .animate-ticker {
                animation: ticker 60s linear infinite;
            }
        `}</style>
        </div>
    );
}

```

## src/components/LiveLogs.jsx
```javascript

import React, { useEffect, useState, useRef } from 'react';
import { Terminal, Activity } from 'lucide-react';

const MOCK_LOGS = [
    { type: 'info', msg: 'System initialized. Waiting for input...' },
    { type: 'planner', msg: 'Analyzing claim structure...' },
    { type: 'planner', msg: 'Identified entities: "Gold", "Inflation", "Central Banks"' },
    { type: 'planner', msg: 'Formulating search queries...' },
    { type: 'executor', msg: 'API Call: GET /news/v2/everything?q=gold+price' },
    { type: 'executor', msg: 'API Call: GET /alpha-vantage/commodities/XAU' },
    { type: 'executor', msg: 'Received 12 relevant articles from NewsAPI' },
    { type: 'executor', msg: 'Market data packet received: 24h_change = +1.2%' },
    { type: 'evaluator', msg: 'Cross-referencing claims against market data...' },
    { type: 'evaluator', msg: 'Sentiment analysis: POSITIVE (0.89)' },
    { type: 'evaluator', msg: 'Verification complete. Confidence: HIGH' }
];

export default function LiveLogs({ isVerifying, result }) {
    const [logs, setLogs] = useState([MOCK_LOGS[0]]);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (isVerifying) {
            setLogs([MOCK_LOGS[0]]); // Reset
            let i = 1;
            const interval = setInterval(() => {
                if (i < MOCK_LOGS.length) {
                    setLogs(prev => [...prev, MOCK_LOGS[i]]);
                    i++;
                } else {
                    clearInterval(interval);
                }
            }, 500); // Add a log every 500ms
            return () => clearInterval(interval);
        }
    }, [isVerifying]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [logs]);

    return (
        <div className="glass-panel p-4 h-full flex flex-col font-mono text-xs">
            <h3 className="text-slate-400 font-bold mb-3 flex items-center gap-2 uppercase tracking-wider text-[10px]">
                <Terminal className="w-3 h-3 text-purple-500" />
                System Terminal
            </h3>
            <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-2 max-h-[200px] scrollbar-hide">
                {logs.map((log, idx) => (
                    <div key={idx} className="flex gap-2">
                        <span className={`shrink-0 opacity-50 ${log.type === 'info' ? 'text-slate-500' : 'text-purple-500'}`}>
                            {new Date().toLocaleTimeString()} &gt;
                        </span>
                        <span className={
                            log.type === 'planner' ? 'text-blue-400' :
                                log.type === 'executor' ? 'text-purple-400' :
                                    log.type === 'evaluator' ? 'text-emerald-400' :
                                        'text-slate-300'
                        }>
                            {log.msg}
                        </span>
                    </div>
                ))}
            </div>
            {!isVerifying && !result && (
                <div className="mt-2 pt-2 border-t border-white/5 text-slate-500 italic text-[10px]">
                    System Idle. Ready for verification.
                </div>
            )}
        </div>
    );
}

```

## src/components/VerificationResult.jsx
```javascript

import React from 'react';
import { AlertTriangle, CheckCircle, HelpCircle, Shield } from 'lucide-react';

export default function VerificationResult({ result, confidence, timestamp }) {
    if (!result) return null;

    const getResultStyles = (res) => {
        switch (res) {
            case 'VERIFIED':
                return {
                    gradient: 'from-emerald-900/40 to-emerald-900/10',
                    border: 'border-emerald-500/30',
                    text: 'text-emerald-400',
                    icon: CheckCircle,
                    label: 'Verified Truth'
                };
            case 'CONTRADICTED':
                return {
                    gradient: 'from-red-900/40 to-red-900/10',
                    border: 'border-red-500/30',
                    text: 'text-red-400',
                    icon: AlertTriangle,
                    label: 'Contradicted'
                };
            default:
                return {
                    gradient: 'from-purple-900/40 to-purple-900/10',
                    border: 'border-purple-500/30',
                    text: 'text-purple-400',
                    icon: HelpCircle,
                    label: 'Inconclusive'
                };
        }
    };

    const styles = getResultStyles(result);
    const Icon = styles.icon;

    return (
        <div className={`rounded-xl border ${styles.border} bg-gradient-to-br ${styles.gradient} backdrop-blur-md p-6 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500 shadow-lg`}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-5">
                    <div className="p-3 rounded-full bg-black/20 border border-white/5 ring-1 ring-white/5 shadow-inner">
                        <Icon className={`w-10 h-10 ${styles.text}`} />
                    </div>
                    <div>
                        <h2 className={`text-3xl font-bold tracking-tight ${styles.text} drop-shadow-sm`}>{styles.label}</h2>
                        <div className="flex items-center gap-2 mt-2">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Confidence Score:</span>
                            <div className="h-1.5 w-24 bg-slate-700 rounded-full overflow-hidden">
                                <div className={`h-full ${styles.text.replace('text', 'bg')} w-[95%]`}></div>
                            </div>
                            <span className={`text-xs font-bold ${styles.text}`}>{confidence}</span>
                        </div>
                    </div>
                </div>
                <div className="text-right border-l border-white/10 pl-6 hidden md:block">
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Timestamp</p>
                    <p className="text-sm font-mono text-slate-300">{timestamp}</p>
                </div>
            </div>
        </div>
    );
}

```

## src/components/RecentActivity.jsx
```javascript

import React from 'react';
import { Clock, CheckCircle2, AlertTriangle, FileText } from 'lucide-react';

const MOCK_HISTORY = [
    { id: 1, claim: "Quantum computing breaks RSA encryption...", status: "CONTRADICTED", time: "2 mins ago" },
    { id: 2, claim: "SpaceX Starship orbital flight success...", status: "VERIFIED", time: "15 mins ago" },
    { id: 3, claim: "New battery tech doubles EV range...", status: "INCONCLUSIVE", time: "1 hr ago" },
];

export default function RecentActivity() {
    return (
        <div className="glass-panel p-6 h-full flex flex-col mt-6">
            <h3 className="text-slate-400 font-bold mb-4 flex items-center gap-2 uppercase tracking-wider text-[10px]">
                <Clock className="w-3 h-3 text-purple-500" />
                Recent Verifications
            </h3>
            <div className="flex-1 space-y-3">
                {MOCK_HISTORY.map((item) => (
                    <div key={item.id} className="p-3 rounded-lg bg-white/5 border border-white/5 hover:border-purple-500/30 transition-colors group cursor-pointer flex items-center justify-between">
                        <div className="flex items-center gap-3 overflow-hidden">
                            <div className={`p-1.5 rounded-full ${item.status === 'VERIFIED' ? 'bg-emerald-500/20 text-emerald-400' :
                                    item.status === 'CONTRADICTED' ? 'bg-red-500/20 text-red-400' :
                                        'bg-amber-500/20 text-amber-400'
                                }`}>
                                {item.status === 'VERIFIED' ? <CheckCircle2 className="w-3 h-3" /> :
                                    item.status === 'CONTRADICTED' ? <AlertTriangle className="w-3 h-3" /> :
                                        <FileText className="w-3 h-3" />}
                            </div>
                            <div className="flex flex-col min-w-0">
                                <span className="text-xs font-medium text-slate-300 truncate w-32 sm:w-40">{item.claim}</span>
                                <span className="text-[10px] text-slate-500">{item.time}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <button className="w-full mt-4 py-2 text-xs font-medium text-purple-400 hover:text-purple-300 transition-colors border border-purple-500/20 rounded-lg hover:bg-purple-500/10">
                View Full History
            </button>
        </div>
    );
}

```

## src/components/ConfidenceChart.jsx
```javascript

import React from 'react';
import { BarChart3 } from 'lucide-react';

export default function ConfidenceChart() {
    return (
        <div className="glass-panel p-4 h-full flex flex-col">
            <h3 className="text-slate-400 font-bold mb-4 flex items-center gap-2 uppercase tracking-wider text-[10px]">
                <BarChart3 className="w-3 h-3 text-purple-500" />
                Confidence Metrics
            </h3>
            <div className="flex-1 flex flex-col justify-center space-y-4">

                <div>
                    <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-400">Source Reliability</span>
                        <span className="text-emerald-400 font-bold">94%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-700/50 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 w-[94%] rounded-full"></div>
                    </div>
                </div>

                <div>
                    <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-400">Semantic Match</span>
                        <span className="text-blue-400 font-bold">88%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-700/50 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 w-[88%] rounded-full"></div>
                    </div>
                </div>

                <div>
                    <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-400">Temporal Relevance</span>
                        <span className="text-purple-400 font-bold">99%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-700/50 rounded-full overflow-hidden">
                        <div className="h-full bg-purple-500 w-[99%] rounded-full"></div>
                    </div>
                </div>

            </div>
        </div>
    );
}

```

