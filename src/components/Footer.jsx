import React from 'react';

export default function Footer() {
    return (
        <footer className="border-t border-white/5 bg-slate-900/50 mt-auto py-8">
            
            <div className="container mx-auto px-4 text-center flex flex-col items-center justify-center">
                
                <p className="text-slate-500 font-medium mb-2 max-w-2xl">
                    Built as a Multi-Agent AI System for Hackathon & Academic Use
                </p>

                <p className="text-slate-400 text-sm max-w-2xl">
                    Disclaimer: Results are based on available sources at the time of verification.
                </p>

            </div>

        </footer>
    );
}
