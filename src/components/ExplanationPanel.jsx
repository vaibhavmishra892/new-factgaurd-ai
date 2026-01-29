
import React from 'react';
import { Lightbulb, ArrowRight } from 'lucide-react';

export default function ExplanationPanel({ explanation }) {
    if (!explanation) return null;

    return (
        <div className="glass-panel p-6 mb-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-3 opacity-5">
                <Lightbulb className="w-24 h-24 body-text" />
            </div>

            <h3 className="font-bold body-text mb-4 flex items-center gap-2 text-sm uppercase tracking-wider relative z-10">
                <Lightbulb className="w-4 h-4 text-purple-500" />
                System Reasoning
            </h3>
            <div className="relative z-10">
                <p className="body-text leading-relaxed mb-6 text-sm">
                    {explanation.summary}
                </p>
                <div className="space-y-3">
                    {explanation.points.map((point, index) => (
                        <div key={index} className="flex items-start gap-3 body-text-muted text-sm">
                            <ArrowRight className="w-4 h-4 text-purple-500/50 mt-0.5 shrink-0" />
                            <span>{point}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
