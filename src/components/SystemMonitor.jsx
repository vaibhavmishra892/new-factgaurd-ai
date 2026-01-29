
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
