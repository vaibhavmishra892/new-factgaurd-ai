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
import AuthModal from "./components/authModal";
import ErrorBoundary from "./components/ErrorBoundary";

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
            result={result}
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

              <div className="space-y-10">
                {/* EVIDENCE GRAPH VISUALIZATION */}
                {/* Evidence Graph Removed */}

                <ExplanationPanel explanation={result.explanation} />
                <EvidencePanel sources={result.sources} />
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

  /* ======================
     USAGE & AUTH HANDLERS
  ====================== */
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalType, setAuthModalType] = useState("signup"); // 'login' or 'signup'
  const [usageCount, setUsageCount] = useState(0);

  useEffect(() => {
    // Load state from local storage
    const storedUser = localStorage.getItem('factguard_user');
    const storedCount = localStorage.getItem('factguard_usage');

    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedCount) setUsageCount(parseInt(storedCount, 10));
  }, []);

  // Fetch History from DB when User changes
  useEffect(() => {
    if (user && (user._id || user.id)) {
      const fetchHistory = async () => {
        try {
          const res = await fetch(`${API_BASE}/history?userId=${user._id || user.id}`);
          if (res.ok) {
            const data = await res.json();
            setHistory(data);
          }
        } catch (error) {
          console.error("Failed to fetch history:", error);
        }
      };
      fetchHistory();
    } else {
      setHistory([]);
    }
  }, [user]);

  const handleAuth = (userData) => {
    setUser(userData);
    localStorage.setItem('factguard_user', JSON.stringify(userData));
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('factguard_user');
  };

  const openAuthModal = (type) => {
    setAuthModalType(type);
    setShowAuthModal(true);
  };

  // API Base URL (reads from env in production, defaults to proxy in dev)
  const API_BASE = import.meta.env.VITE_API_URL || '/api';

  const handleVerify = async () => {
    // Construct payload from state 'claim'
    // claim can be a string (text mode) or object ({ image: ... } from image mode)
    let payload = {};
    if (typeof claim === 'string') {
      payload = { claim: claim };
    } else if (typeof claim === 'object' && claim !== null) {
      payload = claim;
    }

    const { claim: claimText, image } = payload;

    if (!claimText && !image) return;

    // RULE: 1 Free Verification without login
    // if (!user && usageCount >= 1) {
    //   setShowAuthModal(true);
    //   return;
    // }

    // Reset state
    setIsVerifying(true);
    setResult(null);
    setAgentStates({ planner: 'working', executor: 'idle', evaluator: 'idle' });

    let shimmerInterval;

    try {
      // Optimistic UI updates
      shimmerInterval = setInterval(() => {
        setAgentStates(prev => {
          if (prev.planner === 'working') return { planner: 'completed', executor: 'working', evaluator: 'idle' };
          if (prev.executor === 'working') return { planner: 'completed', executor: 'completed', evaluator: 'working' };
          return prev;
        });
      }, 1500);

      const response = await fetch(`${API_BASE}/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          claim: claimText,
          image,
          userId: user?._id || user?.id
        }),
      });

      if (!response.ok) {
        throw new Error('Verification failed');
      }

      const data = await response.json();
      console.log("Verified Data:", data);

      // Ensure all agents are marked completed
      setAgentStates({ planner: 'completed', executor: 'completed', evaluator: 'completed' });

      setResult(data);

      // Increment usage if not logged in
      if (!user) {
        const newCount = usageCount + 1;
        setUsageCount(newCount);
        localStorage.setItem('factguard_usage', newCount.toString());
      }

      // Add to history
      setHistory((prev) => [
        { text: claimText || "Image Verification", status: data.status, time: data.timestamp },
        ...prev,
      ]);

    } catch (error) {
      console.error("Error verifying claim:", error);
      setAgentStates({ planner: 'idle', executor: 'idle', evaluator: 'idle' });
      alert("Failed to verify claim. Please check backend connection.");
    } finally {
      if (shimmerInterval) clearInterval(shimmerInterval);
      setIsVerifying(false);
    }
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen transition-colors duration-300">

        <Header
          isDarkMode={isDarkMode}
          toggleTheme={toggleTheme}
          user={user}
          onOpenAuth={openAuthModal}
          onLogout={handleLogout}
        />

        <Routes>
          <Route
            path="/"
            element={
              <ErrorBoundary>
                <HomePage
                  claim={claim}
                  setClaim={setClaim}
                  isVerifying={isVerifying}
                  handleVerify={handleVerify}
                  agentStates={agentStates}
                  result={result}
                  history={history}
                />
              </ErrorBoundary>
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

        {showAuthModal && (
          <AuthModal
            type={authModalType}
            onClose={() => setShowAuthModal(false)}
            onAuth={handleAuth}
          />
        )}
      </div>
    </Router>
  );
}
