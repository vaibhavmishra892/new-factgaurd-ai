
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
