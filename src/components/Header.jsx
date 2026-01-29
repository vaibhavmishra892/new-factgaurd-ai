
import React from 'react';
import { ShieldCheck, Sun, Moon } from 'lucide-react';

export default function Header({ isDarkMode, toggleTheme }) {
    return (
        <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-900/80 backdrop-blur-md transition-colors duration-300 dark:bg-slate-900/80 light:bg-white/80" style={{ backgroundColor: 'var(--color-surface)' }}>
            <div className="container h-16 flex items-center justify-between mx-auto px-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20">
                        <ShieldCheck className="w-6 h-6 text-purple-500" />
                    </div>
                    <div>
                        <h1 className="font-bold text-xl tracking-tight body-text">FactGuard</h1>
                        <p className="text-[10px] body-text-muted font-medium uppercase tracking-widest hidden sm:block">AI Verification System</p>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <nav className="flex items-center gap-6 hidden md:flex">
                        <a href="#" className="text-sm font-medium body-text-muted hover:text-purple-500 transition-colors">Home</a>
                        <a href="#" className="text-sm font-medium body-text-muted hover:text-purple-500 transition-colors">How it Works</a>
                        <a href="#" className="text-sm font-medium body-text-muted hover:text-purple-500 transition-colors">About</a>
                    </nav>

                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full hover:bg-black/5 transition-colors border border-transparent hover:border-black/5"
                        title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                    >
                        {isDarkMode ?
                            <Sun className="w-5 h-5 text-purple-500" /> :
                            <Moon className="w-5 h-5 text-slate-600" />
                        }
                    </button>
                </div>
            </div>
        </header>
    );
}
