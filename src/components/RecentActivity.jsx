import React from 'react';
import { Clock, CheckCircle2, AlertTriangle, FileText } from 'lucide-react';

export default function RecentActivity({ history = [] }) {

    const getIcon = (status) => {
        if (status === 'VERIFIED')
            return <CheckCircle2 className="w-3 h-3 text-emerald-400" />;
        if (status === 'CONTRADICTED')
            return <AlertTriangle className="w-3 h-3 text-red-400" />;
        return <FileText className="w-3 h-3 text-amber-400" />;
    };

    return (
        <div className="glass-panel p-6 h-full flex flex-col mt-6">
            <h3 className="text-slate-400 font-bold mb-4 flex items-center gap-2 uppercase tracking-wider text-[10px]">
                <Clock className="w-3 h-3 text-purple-500" />
                Recent Verifications
            </h3>

            <div className="flex-1 space-y-3">

                {history.length === 0 && (
                    <p className="text-xs text-slate-500">No searches yet</p>
                )}

                {history.map((item, i) => (
                    <div
                        key={i}
                        className="p-3 rounded-lg bg-white/5 border border-white/5 hover:border-purple-500/30 transition group cursor-pointer flex items-center gap-3"
                    >
                        <div className="p-1.5 rounded-full bg-black/30">
                            {getIcon(item.status)}
                        </div>

                        <div className="flex flex-col min-w-0">
                            <span className="text-xs font-medium text-slate-300 truncate w-40">
                                {item.text}
                            </span>
                            <span className="text-[10px] text-slate-500">
                                {item.status}
                            </span>
                        </div>
                    </div>
                ))}

            </div>

            <button className="w-full mt-4 py-2 text-xs font-medium text-purple-400 border border-purple-500/20 rounded-lg hover:bg-purple-500/10">
                View Full History
            </button>
        </div>
    );
}