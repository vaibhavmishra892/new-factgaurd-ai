
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
