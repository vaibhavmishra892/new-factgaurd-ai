import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import ClaimInput from "./components/ClaimInput";
import AgentWorkflow from "./components/AgentWorkflow";
import VerificationResult from "./components/VerificationResult";
import EvidencePanel from "./components/EvidencePanel";
import ExplanationPanel from "./components/ExplanationPanel";
import LiveLogs from "./components/LiveLogs";
import ConfidenceChart from "./components/ConfidenceChart";
import RecentActivity from "./components/RecentActivity";
import TrendingNarratives from "./components/TrendingNarratives";
import SystemMonitor from "./components/SystemMonitor";
import NewsTicker from "./components/NewsTicker";
import SidebarLeft from "./components/SidebarLeft";

import AboutUs from "./components/AboutUs";
import HowItWorks from "./components/HowItWorks";
import HistoryPage from "./components/historypage";

/* ======================
   CONFIDENCE PARSER
====================== */
const parseConfidence = (c) => {
  if (!c) return 40;
  if (typeof c === "number") return c;

  const s = c.toString().toLowerCase();
  if (s.includes("high")) return 90;
  if (s.includes("medium")) return 70;
  if (s.includes("low")) return 40;

  const num = parseFloat(s.replace(/[^\d.]/g, ""));
  return isNaN(num) ? 40 : num;
};

/* ======================
   HOME PAGE
====================== */
function HomePage({
  claim,
  setClaim,
  isVerifying,
  handleVerify,
  agentStates,
  result,
  history,
}) {
  return (
    <main className="container-fluid px-6 flex-grow py-12">

      {/* HERO */}
      <div className="text-center space-y-4 mb-12">
        <span className="px-3 py-1 rounded-full border border-purple-500/20 bg-purple-500/10 text-purple-500 text-xs font-bold uppercase tracking-widest">
          v3.0 Ultra Live
        </span>

        <h2 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-violet-400">
          FACTGUARD
        </h2>

        <p className="text-lg max-w-2xl mx-auto text-slate-400 font-medium">
          Autonomous multi-agent constellation verifying truth at the speed of light.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">

        {/* LEFT */}
        <div className="lg:col-span-1 hidden lg:block lg:sticky lg:top-24">
          <SidebarLeft
            confidence={result ? parseConfidence(result.confidence) : null}
          />
        </div>

        {/* CENTER */}
        <div className="lg:col-span-2 space-y-8">
          <ClaimInput
            value={claim}
            onChange={setClaim}
            onVerify={handleVerify}
            isVerifying={isVerifying}
          />

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

        {/* RIGHT */}
        <div className="lg:col-span-1 space-y-6 lg:sticky lg:top-24">
          <SystemMonitor />
          <LiveLogs isVerifying={isVerifying} result={result} />
          {result && <ConfidenceChart />}
          <RecentActivity history={history} />
          <TrendingNarratives />
        </div>

      </div>
    </main>
  );
}

/* ======================
   MAIN APP
====================== */
export default function App() {
  const [claim, setClaim] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [history, setHistory] = useState([]);

  const [agentStates, setAgentStates] = useState({
    planner: "idle",
    executor: "idle",
    evaluator: "idle",
  });

  const [result, setResult] = useState(null);

  useEffect(() => {
    document.body.classList.toggle("light-mode", !isDarkMode);
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  /* ======================
     HISTORY HANDLERS
  ====================== */
  const clearHistory = () => setHistory([]);

  const deleteHistoryItem = (index) => {
    setHistory((prev) => prev.filter((_, i) => i !== index));
  };

  const handleVerify = async () => {
    if (!claim.trim()) return;

    setIsVerifying(true);
    setResult(null);
    setAgentStates({ planner: "working", executor: "idle", evaluator: "idle" });

    await new Promise((r) => setTimeout(r, 1200));
    setAgentStates({ planner: "completed", executor: "working", evaluator: "idle" });

    await new Promise((r) => setTimeout(r, 1500));
    setAgentStates({ planner: "completed", executor: "completed", evaluator: "working" });

    await new Promise((r) => setTimeout(r, 1200));
    setAgentStates({ planner: "completed", executor: "completed", evaluator: "completed" });

    setIsVerifying(false);

    const now = new Date().toLocaleString();
    const isFake = claim.toLowerCase().includes("fake");

    let finalStatus = "VERIFIED";
    let confidence = "96%";

    if (isFake) {
      finalStatus = "CONTRADICTED";
      confidence = "88%";
    } else if (claim.length < 15) {
      finalStatus = "INCONCLUSIVE";
      confidence = "Medium";
    }

    const newResult = {
      status: finalStatus,
      confidence,
      timestamp: now,
      sources: [],
      explanation: { summary: "Auto demo result", points: [] },
    };

    setResult(newResult);

    setHistory((prev) => [
      { text: claim, status: finalStatus, time: now },
      ...prev,
    ]);
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen transition-colors duration-300">

        <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                claim={claim}
                setClaim={setClaim}
                isVerifying={isVerifying}
                handleVerify={handleVerify}
                agentStates={agentStates}
                result={result}
                history={history}
              />
            }
          />

          <Route
            path="/history"
            element={
              <HistoryPage
                history={history}
                onClear={clearHistory}
                onDelete={deleteHistoryItem}
              />
            }
          />

          <Route path="/about" element={<AboutUs />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
        </Routes>

        <NewsTicker />
        <Footer />
      </div>
    </Router>
  );
}
