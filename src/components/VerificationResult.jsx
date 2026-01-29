
import React from 'react';
import { AlertTriangle, CheckCircle, HelpCircle, Shield } from 'lucide-react';

export default function VerificationResult({ result, confidence, timestamp }) {
    if (!result) return null;

    const getResultStyles = (res) => {
        switch (res) {
            case 'VERIFIED':
                return {
                    gradient: 'from-emerald-900/40 to-emerald-900/10',
                    border: 'border-emerald-500/30',
                    text: 'text-emerald-400',
                    icon: CheckCircle,
                    label: 'Verified Truth'
                };
            case 'CONTRADICTED':
                return {
                    gradient: 'from-red-900/40 to-red-900/10',
                    border: 'border-red-500/30',
                    text: 'text-red-400',
                    icon: AlertTriangle,
                    label: 'Contradicted'
                };
            default:
                return {
                    gradient: 'from-purple-900/40 to-purple-900/10',
                    border: 'border-purple-500/30',
                    text: 'text-purple-400',
                    icon: HelpCircle,
                    label: 'Inconclusive'
                };
        }
    };

    const styles = getResultStyles(result);
    const Icon = styles.icon;

    return (
        <div className={`rounded-xl border ${styles.border} bg-gradient-to-br ${styles.gradient} backdrop-blur-md p-6 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500 shadow-lg`}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-5">
                    <div className="p-3 rounded-full bg-black/20 border border-white/5 ring-1 ring-white/5 shadow-inner">
                        <Icon className={`w-10 h-10 ${styles.text}`} />
                    </div>
                    <div>
                        <h2 className={`text-3xl font-bold tracking-tight ${styles.text} drop-shadow-sm`}>{styles.label}</h2>
                        <div className="flex items-center gap-2 mt-2">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Confidence Score:</span>
                            <div className="h-1.5 w-24 bg-slate-700 rounded-full overflow-hidden">
                                <div className={`h-full ${styles.text.replace('text', 'bg')} w-[95%]`}></div>
                            </div>
                            <span className={`text-xs font-bold ${styles.text}`}>{confidence}</span>
                        </div>
                    </div>
                </div>
                <div className="text-right border-l border-white/10 pl-6 hidden md:block">
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Timestamp</p>
                    <p className="text-sm font-mono text-slate-300">{timestamp}</p>
                </div>
            </div>
        </div>
    );
}
