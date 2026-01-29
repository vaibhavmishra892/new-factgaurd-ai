
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
