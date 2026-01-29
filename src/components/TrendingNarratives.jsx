
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
