
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
