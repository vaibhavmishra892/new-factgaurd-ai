
import React from 'react';
import { ExternalLink, Link2, Newspaper } from 'lucide-react';

export default function EvidencePanel({ sources }) {
    if (!sources || sources.length === 0) return null;

    return (
        <div className="glass-panel p-6 mb-8 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
            <h3 className="font-bold body-text mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
                <Link2 className="w-4 h-4 text-purple-500" />
                Primary Sources
            </h3>
            <div className="space-y-3">
                {sources.map((source, index) => (
                    <div key={index} className="flex items-start justify-between p-4 rounded-lg bg-black/5 border border-white/5 hover:border-purple-500/30 hover:bg-black/10 transition-all group cursor-pointer">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1.5">
                                <span className="text-[10px] font-bold text-purple-600 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                                    {source.source}
                                </span>
                                <span className="text-[10px] body-text-muted flex items-center gap-1 font-mono">
                                    {source.date}
                                </span>
                            </div>
                            <h4 className="font-medium body-text text-sm group-hover:text-purple-500 transition-colors">
                                {source.title}
                            </h4>
                        </div>
                        <ExternalLink className="w-4 h-4 body-text-muted group-hover:text-purple-500 ml-4 mt-1 transition-colors" />
                    </div>
                ))}
            </div>
        </div>
    );
}
