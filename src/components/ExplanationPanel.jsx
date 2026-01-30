
import React from 'react';
import { Lightbulb, ArrowRight } from 'lucide-react';

export default function ExplanationPanel({ explanation }) {
    if (!explanation) return null;

    return (
        <div className="glass-panel p-8 mb-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 relative overflow-hidden ring-1 ring-purple-500/20 shadow-[0_0_30px_rgba(168,85,247,0.1)]">
            <div className="absolute top-0 right-0 p-3 opacity-10">
                <Lightbulb className="w-32 h-32 text-purple-500" />
            </div>

            <h3 className="font-bold text-white mb-6 flex items-center gap-3 text-lg uppercase tracking-widest relative z-10 border-b border-white/10 pb-4">
                <Lightbulb className="w-6 h-6 text-purple-400" />
                System Reasoning
            </h3>
            <div className="relative z-10">
                <p className="text-slate-200 leading-relaxed mb-8 text-lg font-medium">
                    {explanation.summary}
                </p>
                <div className="space-y-4">
                    {explanation.points.map((point, index) => (
                        <div key={index} className="flex items-start gap-4 text-slate-400 text-base">
                            <ArrowRight className="w-5 h-5 text-purple-400 mt-1 shrink-0" />
                            <span>{point}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
