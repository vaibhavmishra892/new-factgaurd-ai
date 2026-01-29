
import React, { useEffect, useState, useRef } from 'react';
import { Terminal, Activity } from 'lucide-react';

const MOCK_LOGS = [
    { type: 'info', msg: 'System initialized. Waiting for input...' },
    { type: 'planner', msg: 'Analyzing claim structure...' },
    { type: 'planner', msg: 'Identified entities: "Gold", "Inflation", "Central Banks"' },
    { type: 'planner', msg: 'Formulating search queries...' },
    { type: 'executor', msg: 'API Call: GET /news/v2/everything?q=gold+price' },
    { type: 'executor', msg: 'API Call: GET /alpha-vantage/commodities/XAU' },
    { type: 'executor', msg: 'Received 12 relevant articles from NewsAPI' },
    { type: 'executor', msg: 'Market data packet received: 24h_change = +1.2%' },
    { type: 'evaluator', msg: 'Cross-referencing claims against market data...' },
    { type: 'evaluator', msg: 'Sentiment analysis: POSITIVE (0.89)' },
    { type: 'evaluator', msg: 'Verification complete. Confidence: HIGH' }
];

export default function LiveLogs({ isVerifying, result }) {
    const [logs, setLogs] = useState([MOCK_LOGS[0]]);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (isVerifying) {
            setLogs([MOCK_LOGS[0]]); // Reset
            let i = 1;
            const interval = setInterval(() => {
                if (i < MOCK_LOGS.length) {
                    setLogs(prev => [...prev, MOCK_LOGS[i]]);
                    i++;
                } else {
                    clearInterval(interval);
                }
            }, 500); // Add a log every 500ms
            return () => clearInterval(interval);
        }
    }, [isVerifying]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [logs]);

    return (
        <div className="glass-panel p-4 h-full flex flex-col font-mono text-xs">
            <h3 className="text-slate-400 font-bold mb-3 flex items-center gap-2 uppercase tracking-wider text-[10px]">
                <Terminal className="w-3 h-3 text-purple-500" />
                System Terminal
            </h3>
            <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-2 max-h-[200px] scrollbar-hide">
                {logs.map((log, idx) => (
                    <div key={idx} className="flex gap-2">
                        <span className={`shrink-0 opacity-50 ${log.type === 'info' ? 'text-slate-500' : 'text-purple-500'}`}>
                            {new Date().toLocaleTimeString()} &gt;
                        </span>
                        <span className={
                            log.type === 'planner' ? 'text-blue-400' :
                                log.type === 'executor' ? 'text-purple-400' :
                                    log.type === 'evaluator' ? 'text-emerald-400' :
                                        'text-slate-300'
                        }>
                            {log.msg}
                        </span>
                    </div>
                ))}
            </div>
            {!isVerifying && !result && (
                <div className="mt-2 pt-2 border-t border-white/5 text-slate-500 italic text-[10px]">
                    System Idle. Ready for verification.
                </div>
            )}
        </div>
    );
}
