
import React from 'react';
import { Brain, Globe, CheckCircle2, Loader2, Circle, Activity } from 'lucide-react';

const AgentCard = ({ name, role, status, description, icon: Icon }) => {
    const getStatusStyles = (status) => {
        switch (status) {
            case 'working':
                return {
                    border: 'border-purple-500/50',
                    bg: 'bg-purple-500/5',
                    iconBg: 'bg-purple-500/20 text-purple-500',
                    indicator: 'text-purple-500 animate-spin',
                    glow: 'shadow-[0_0_15px_rgba(245,158,11,0.15)]'
                };
            case 'completed':
                return {
                    border: 'border-emerald-500/30',
                    bg: 'bg-emerald-500/5',
                    iconBg: 'bg-emerald-500/20 text-emerald-500',
                    indicator: 'text-emerald-500',
                    glow: ''
                };
            default:
                return {
                    border: 'border-white/5',
                    bg: 'bg-white/5',
                    iconBg: 'bg-white/10 body-text-muted',
                    indicator: 'body-text-muted',
                    glow: ''
                };
        }
    };

    const styles = getStatusStyles(status);

    return (
        <div className={`flex-1 p-5 rounded-xl border ${styles.border} ${styles.bg} ${styles.glow} transition-all duration-500 backdrop-blur-sm relative overflow-hidden group`}>
            {/* Active scan line for working state */}
            {status === 'working' && (
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-shimmer opacity-70"></div>
            )}

            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-lg ${styles.iconBg} transition-colors duration-300`}>
                        <Icon className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="font-bold body-text text-sm tracking-wide">{name}</h3>
                        <span className="text-[10px] font-bold body-text-muted uppercase tracking-widest">{role}</span>
                    </div>
                </div>
                <div>
                    {status === 'working' && <Loader2 className="w-4 h-4 text-purple-500 animate-spin" />}
                    {status === 'completed' && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                    {status === 'idle' && <Circle className="w-4 h-4 body-text-muted" />}
                </div>
            </div>
            <p className="text-xs body-text-muted leading-relaxed font-medium">
                {description}
            </p>
        </div>
    );
};

export default function AgentWorkflow({ agentStates }) {
    return (
        <div className="mb-8">
            <h2 className="text-sm font-bold body-text-muted mb-4 flex items-center gap-2 uppercase tracking-widest">
                <Activity className="w-4 h-4 text-purple-500" />
                Live Agent Swarm
            </h2>
            <div className="flex flex-col md:flex-row gap-4 relative">
                <AgentCard
                    name="Planner"
                    role="Architect"
                    status={agentStates.planner}
                    description="Decomposes the claim using reasoning models to identify key verifiability points."
                    icon={Brain}
                />

                {/* Connector Line (Desktop) */}
                <div className="hidden md:flex flex-col justify-center relative z-10 w-4">
                    <div className={`h-[1px] w-full transition-colors duration-500 ${agentStates.executor !== 'idle' ? 'bg-purple-500/50 shadow-[0_0_8px_rgba(245,158,11,0.5)]' : 'bg-slate-700'}`}></div>
                </div>

                <AgentCard
                    name="Executor"
                    role="Researcher"
                    status={agentStates.executor}
                    description="Scours real-time APIs (News, Markets) to retrieve primary source evidence."
                    icon={Globe}
                />

                {/* Connector Line (Desktop) */}
                <div className="hidden md:flex flex-col justify-center relative z-10 w-4">
                    <div className={`h-[1px] w-full transition-colors duration-500 ${agentStates.evaluator !== 'idle' ? 'bg-purple-500/50 shadow-[0_0_8px_rgba(245,158,11,0.5)]' : 'bg-slate-700'}`}></div>
                </div>

                <AgentCard
                    name="Auditor"
                    role="Judge"
                    status={agentStates.evaluator}
                    description="Synthesizes evidence to produce a final verdict with confidence scoring."
                    icon={CheckCircle2}
                />
            </div>
        </div>
    );
}
