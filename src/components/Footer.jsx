import React from 'react';

export default function Footer() {
    return (
        <footer className="border-t border-white/5 bg-slate-900/50 mt-auto py-6">
            
            <div className="container mx-auto px-4 text-center flex flex-col items-center justify-center gap-2">
                
                

                <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
                    © 2026 FactGuard. All rights reserved.
                    <br />
                    Built for AI-driven verification and misinformation detection.
                </p>

                <p className="text-slate-500 text-xs max-w-2xl mt-1">
                    Disclaimer: Results are based on available sources at the time of verification.
                </p>

            </div>

        </footer>
    );
}
