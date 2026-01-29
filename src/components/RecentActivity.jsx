
import React from 'react';
import { Clock, CheckCircle2, AlertTriangle, FileText } from 'lucide-react';

const MOCK_HISTORY = [
    { id: 1, claim: "Quantum computing breaks RSA encryption...", status: "CONTRADICTED", time: "2 mins ago" },
    { id: 2, claim: "SpaceX Starship orbital flight success...", status: "VERIFIED", time: "15 mins ago" },
    { id: 3, claim: "New battery tech doubles EV range...", status: "INCONCLUSIVE", time: "1 hr ago" },
];

export default function RecentActivity() {
    return (
        <div className="glass-panel p-6 h-full flex flex-col mt-6">
            <h3 className="text-slate-400 font-bold mb-4 flex items-center gap-2 uppercase tracking-wider text-[10px]">
                <Clock className="w-3 h-3 text-purple-500" />
                Recent Verifications
            </h3>
            <div className="flex-1 space-y-3">
                {MOCK_HISTORY.map((item) => (
                    <div key={item.id} className="p-3 rounded-lg bg-white/5 border border-white/5 hover:border-purple-500/30 transition-colors group cursor-pointer flex items-center justify-between">
                        <div className="flex items-center gap-3 overflow-hidden">
                            <div className={`p-1.5 rounded-full ${item.status === 'VERIFIED' ? 'bg-emerald-500/20 text-emerald-400' :
                                    item.status === 'CONTRADICTED' ? 'bg-red-500/20 text-red-400' :
                                        'bg-amber-500/20 text-amber-400'
                                }`}>
                                {item.status === 'VERIFIED' ? <CheckCircle2 className="w-3 h-3" /> :
                                    item.status === 'CONTRADICTED' ? <AlertTriangle className="w-3 h-3" /> :
                                        <FileText className="w-3 h-3" />}
                            </div>
                            <div className="flex flex-col min-w-0">
                                <span className="text-xs font-medium text-slate-300 truncate w-32 sm:w-40">{item.claim}</span>
                                <span className="text-[10px] text-slate-500">{item.time}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <button className="w-full mt-4 py-2 text-xs font-medium text-purple-400 hover:text-purple-300 transition-colors border border-purple-500/20 rounded-lg hover:bg-purple-500/10">
                View Full History
            </button>
        </div>
    );
}
