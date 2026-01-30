import React from "react";
import {
  ShieldAlert,
  Eye,
  Target,
  Bookmark,
  Settings,
  Database,
} from "lucide-react";

export default function SidebarLeft({ result }) {

  /* =====================
     THREAT LEVEL LOGIC
  ===================== */
  /* =====================
     THREAT LEVEL LOGIC
  ===================== */
  const getLevel = () => {
    if (!result) {
      return {
        label: "--",
        text: "STANDBY",
        color: "text-slate-400",
        ring: "border-slate-500",
      };
    }

    const status = result.status?.toUpperCase() || '';

    // VERIFIED TRUE -> GREEN (Minimal Threat)
    if (status.includes('VERIFIED') || status.includes('SUPPORTED') || status.includes('TRUE')) {
      return {
        label: "LO",
        text: "MINIMAL THREAT",
        color: "text-emerald-400",
        ring: "border-emerald-500",
      };
    }

    // VERIFIED FALSE -> RED (Critical Threat)
    if (status.includes('CONTRADICTED') || status.includes('FALSE') || status.includes('FAKE') || status.includes('DEBUNKED')) {
      return {
        label: "HI",
        text: "CRITICAL THREAT",
        color: "text-red-500",
        ring: "border-red-500",
      };
    }

    // UNCERTAIN -> YELLOW (Elevated)
    return {
      label: "MD",
      text: "ELEVATED THREAT",
      color: "text-yellow-400",
      ring: "border-yellow-500",
    };
  };

  const lvl = getLevel();

  return (
    <div className="space-y-6">

      {/* =====================
         THREAT LEVEL
      ===================== */}
      <div className="glass-panel p-5">
        <h3 className="text-[10px] font-bold uppercase tracking-wider mb-4 flex items-center gap-2 body-text-muted">
          <ShieldAlert className="w-3 h-3 text-red-500" />
          Global Misinfo Level
        </h3>

        <div className="flex flex-col items-center">
          <div className="relative w-24 h-24 flex items-center justify-center mb-2">
            {/* OUTER RING */}
            <div
              className={`absolute inset-0 rounded-full border-4 ${lvl.ring} animate-spin`}
              style={{ animationDuration: "6s" }}
            />
            {/* INNER RING */}
            <div
              className={`absolute inset-2 rounded-full border-2 ${lvl.ring} animate-spin`}
              style={{ animationDuration: "3s", animationDirection: "reverse" }}
            />
            <div className={`text-2xl font-black ${lvl.color}`}>
              {lvl.label}
            </div>
          </div>

          <span className={`text-xs font-bold uppercase tracking-widest ${lvl.color}`}>
            {lvl.text}
          </span>

          <p className="text-[10px] text-center mt-2 body-text-muted">
            Live misinformation risk indicator.
          </p>
        </div>
      </div>

      {/* =====================
         WATCHLIST
      ===================== */}
      <div className="glass-panel p-5">
        <h3 className="text-[10px] font-bold uppercase tracking-wider mb-4 flex items-center gap-2 body-text-muted">
          <Eye className="w-3 h-3 text-cyan-500" />
          Active Watchlist
        </h3>

        <div className="space-y-2">
          {[
            { label: "Deepfake Gen_v4", dot: "bg-red-500" },
            { label: "Election Integrity", dot: "bg-emerald-500" },
            { label: "Market Manipulation", dot: "bg-cyan-500" },
            { label: "Botnet #8892", dot: "bg-purple-500" },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between px-3 py-2 sidebar-hover cursor-pointer"
            >
              <span className="text-xs font-medium body-text">
                {item.label}
              </span>
              <span className={`w-1.5 h-1.5 rounded-full ${item.dot}`} />
            </div>
          ))}
        </div>
      </div>

      {/* =====================
         QUICK TOOLS
      ===================== */}
      <div className="glass-panel p-2">
        <nav className="flex flex-col gap-1">
          {[
            { icon: Target, label: "My Investigations" },
            { icon: Bookmark, label: "Saved Evidence", badge: "12" },
            { icon: Database, label: "Knowledge Base" },
            { icon: Settings, label: "System Settings" },
          ].map((item, i) => (
            <button
              key={i}
              className="flex items-center gap-3 px-3 py-2 sidebar-hover text-xs font-medium text-left"
            >
              <item.icon className="w-4 h-4 text-slate-500" />
              <span className="body-text">{item.label}</span>
              {item.badge && (
                <span className="ml-auto bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 rounded text-[9px] body-text">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

    </div>
  );
}
