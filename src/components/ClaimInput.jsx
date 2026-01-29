
import React, { useState } from 'react';
import { Search, Sparkles, Type, Link, FileText, UploadCloud } from 'lucide-react';

export default function ClaimInput({ value, onChange, onVerify, isVerifying }) {
    const [mode, setMode] = useState('text'); // text, url, doc

    const getPlaceholder = () => {
        switch (mode) {
            case 'url': return "Paste a URL to a news article or social media post...";
            case 'doc': return "Upload a document to analyze...";
            default: return "Paste a news claim or statement here...";
        }
    };

    return (
        <div className="glass-panel p-6 mb-8 relative overflow-hidden group">
            {/* Decorative gradient glow */}
            <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all duration-700"></div>

            <div className="flex items-center justify-between mb-4">
                <label htmlFor="claim" className="text-sm font-semibold body-text-muted flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-purple-500" />
                    Analyze a Statement
                </label>

                {/* Mode Toggles */}
                <div className="flex bg-slate-900/50 p-1 rounded-lg border border-white/5">
                    <button
                        onClick={() => setMode('text')}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${mode === 'text' ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                    >
                        <Type className="w-3 h-3" /> Text
                    </button>
                    <button
                        onClick={() => setMode('url')}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${mode === 'url' ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                    >
                        <Link className="w-3 h-3" /> Link
                    </button>
                    <button
                        onClick={() => setMode('doc')}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${mode === 'doc' ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                    >
                        <FileText className="w-3 h-3" /> Doc
                    </button>
                </div>
            </div>

            <div className="relative">
                {mode === 'doc' ? (
                    <div className="w-full min-h-[140px] border-2 border-dashed border-slate-700 rounded-xl flex flex-col items-center justify-center bg-slate-900/30 hover:bg-slate-900/50 hover:border-purple-500/30 transition-all cursor-pointer group/upload">
                        <div className="p-4 bg-slate-800/50 rounded-full mb-3 group-hover/upload:scale-110 transition-transform">
                            <UploadCloud className="w-6 h-6 text-purple-400" />
                        </div>
                        <p className="text-sm text-slate-400 font-medium">Click to upload or drag and drop</p>
                        <p className="text-xs text-slate-600 mt-1">PDF, TXT, or DOCX (Max 10MB)</p>
                    </div>
                ) : (
                    <>
                        <textarea
                            id="claim"
                            className="glass-input w-full min-h-[140px] p-5 text-lg rounded-xl resize-none placeholder-slate-500"
                            placeholder={getPlaceholder()}
                            value={value}
                            onChange={(e) => onChange(e.target.value)}
                            disabled={isVerifying}
                        />
                        <div className="absolute bottom-4 right-4 text-xs body-text-muted font-mono">
                            {value.length} chars
                        </div>
                    </>
                )}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between mt-5 gap-4">
                <div className="flex flex-col gap-2">
                    <p className="text-xs body-text-muted">
                        <span className="text-purple-500 font-medium">Try:</span> {mode === 'url' ? 'https://twitter.com/news/status/123...' : '"Gold prices surged yesterday..."'}
                    </p>
                    <div className="flex items-center gap-2">
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="w-9 h-5 bg-slate-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-purple-600"></div>
                            <span className="ml-2 text-xs font-medium body-text-muted">Enable Deep Scan Mode</span>
                        </label>
                    </div>
                </div>
                <button
                    onClick={onVerify}
                    disabled={(!value.trim() && mode !== 'doc') || isVerifying}
                    className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2 text-sm"
                >
                    {isVerifying ? (
                        <>
                            <span className="animate-spin text-lg">⟳</span> Verifying...
                        </>
                    ) : (
                        <>
                            <Search className="w-4 h-4" /> Verify Result
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
