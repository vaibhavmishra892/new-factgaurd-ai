
import React, { useMemo } from 'react';
import { ReactFlow, Background, Controls, Handle, Position } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Newspaper, ShieldCheck, ShieldAlert, FileText } from 'lucide-react';

/* =======================
   CUSTOM NODE TYPES
   ======================= */

// Central Claim Node
const ClaimNode = ({ data }) => {
    return (
        <div className={`px-6 py-4 rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.5)] border-2 ${data.borderColor} bg-[#0b0b15] min-w-[200px] text-center relative`}>
            <Handle type="source" position={Position.Bottom} className="!bg-transparent" />
            <Handle type="target" position={Position.Top} className="!bg-transparent" />

            <div className="flex justify-center mb-2">
                {data.icon}
            </div>
            <div className={`text-xs font-bold uppercase tracking-widest mb-1 ${data.textColor}`}>
                {data.verdict}
            </div>
            <div className="text-sm font-medium text-white line-clamp-2">
                {data.label}
            </div>
        </div>
    );
};

// Evidence Source Node
const SourceNode = ({ data }) => {
    return (
        <div className="px-4 py-3 rounded-lg shadow-xl border border-white/10 bg-black/60 backdrop-blur-md min-w-[160px] max-w-[200px] hover:border-purple-500/50 transition-colors cursor-pointer">
            <Handle type="target" position={Position.Center} className="!bg-transparent" />

            <div className="flex items-center gap-2 mb-1">
                <Newspaper className="w-3 h-3 text-purple-400" />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider truncate">
                    {data.source}
                </span>
            </div>
            <div className="text-xs text-slate-200 line-clamp-2 leading-snug">
                {data.label}
            </div>
        </div>
    );
};

const nodeTypes = {
    claim: ClaimNode,
    source: SourceNode,
};

/* =======================
   MAIN COMPONENT
   ======================= */

export default function EvidenceGraph({ sources, verdict, claimText }) {

    // Generate Nodes & Edges
    const { nodes, edges } = useMemo(() => {
        if (!sources || sources.length === 0) return { nodes: [], edges: [] };

        // 1. Central Claim Node
        const isTrue = verdict?.includes('VERIFIED') || verdict?.includes('TRUE');
        const isFalse = verdict?.includes('CONTRADICTED') || verdict?.includes('FALSE');

        let claimColor = 'border-yellow-500';
        let claimTextCol = 'text-yellow-500';
        let claimIcon = <FileText className="w-6 h-6 text-yellow-500" />;

        if (isTrue) {
            claimColor = 'border-emerald-500';
            claimTextCol = 'text-emerald-500';
            claimIcon = <ShieldCheck className="w-6 h-6 text-emerald-500" />;
        } else if (isFalse) {
            claimColor = 'border-red-500';
            claimTextCol = 'text-red-500';
            claimIcon = <ShieldAlert className="w-6 h-6 text-red-500" />;
        }

        const claimNode = {
            id: 'claim',
            type: 'claim',
            position: { x: 0, y: 0 },
            data: {
                label: claimText || "Verification Target",
                verdict: verdict || "ANALYZING",
                borderColor: claimColor,
                textColor: claimTextCol,
                icon: claimIcon
            }
        };

        // 2. Source Nodes (Radial Layout)
        const radius = 250;
        const sourceNodes = sources.map((src, index) => {
            const angle = (index / sources.length) * 2 * Math.PI; // Distribute around circle
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            return {
                id: `src-${index}`,
                type: 'source',
                position: { x, y },
                data: {
                    label: src.title,
                    source: src.source
                }
            };
        });

        // 3. Edges connecting Sources to Claim
        const generatedEdges = sourceNodes.map((node) => ({
            id: `e-claim-${node.id}`,
            source: 'claim',
            target: node.id,
            animated: true,
            style: { stroke: isTrue ? '#10b981' : isFalse ? '#ef4444' : '#eab308', strokeWidth: 1, opacity: 0.5 }
        }));

        return {
            nodes: [claimNode, ...sourceNodes],
            edges: generatedEdges
        };
    }, [sources, verdict, claimText]);

    if (!sources || sources.length === 0) return null;

    return (
        <div className="glass-panel w-full h-[500px] mb-8 animate-in fade-in slide-in-from-bottom-8 duration-700 relative overflow-hidden">
            <div className="absolute top-4 left-4 z-10 pointer-events-none">
                <h3 className="font-bold body-text text-sm uppercase tracking-wider flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></div>
                    Evidence Knowledge Graph
                </h3>
            </div>

            <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                fitView
                className="bg-black/20"
                minZoom={0.5}
                maxZoom={1.5}
                attributionPosition="bottom-right"
            >
                <Background color="#333" gap={20} size={1} />
                <Controls className="!bg-black/50 !border-white/10 !fill-white" />
            </ReactFlow>
        </div>
    );
}
