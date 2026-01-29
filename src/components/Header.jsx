import React, { useState } from 'react';
import { ShieldCheck, Sun, Moon } from 'lucide-react';
import AuthModal from "./authModal";

export default function Header({ isDarkMode, toggleTheme }) {

    const [modal, setModal] = useState(null); // "login" | "signup"
    const [user, setUser] = useState(null);

    return (
        <>
            <header
                className="sticky top-0 z-50 border-b border-white/10 bg-slate-900/80 backdrop-blur-md"
                style={{ backgroundColor: 'var(--color-surface)' }}
            >
                <div className="container h-16 flex items-center justify-between mx-auto px-4">

                    {/* LEFT */}
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20">
                            <ShieldCheck className="w-6 h-6 text-purple-500" />
                        </div>

                        <div>
                            <h1 className="font-bold text-xl tracking-tight body-text">
                                FactGuard
                            </h1>

                            <p className="text-[10px] body-text-muted font-medium uppercase tracking-widest hidden sm:block">
                                AI Verification System
                            </p>

                            {user && (
                                <p className="text-xs text-purple-400 mt-1">
                                    Welcome {user.email}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className="flex items-center gap-6">

                        <nav className="flex items-center gap-6 hidden md:flex">

                            <a href="#" className="text-sm font-medium body-text-muted hover:text-purple-500">
                                Home
                            </a>

                            <a href="#" className="text-sm font-medium body-text-muted hover:text-purple-500">
                                How it Works
                            </a>

                            <a href="#" className="text-sm font-medium body-text-muted hover:text-purple-500">
                                About
                            </a>

                            {/* ✅ HISTORY */}
                            <button
                                onClick={() => alert("History clicked")}
                                className="text-sm font-medium body-text-muted hover:text-purple-500"
                            >
                                History
                            </button>

                            {/* LOGIN */}
                            <button
                                onClick={() => setModal("login")}
                                className="text-sm font-semibold px-4 py-2 rounded-lg border border-purple-500 text-purple-500 hover:bg-purple-500/10"
                            >
                                Login
                            </button>

                            {/* SIGNUP */}
                            <button
                                onClick={() => setModal("signup")}
                                className="text-sm font-semibold px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white"
                            >
                                Sign Up
                            </button>

                        </nav>

                        {/* THEME BUTTON */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full hover:bg-black/5 border border-transparent"
                            title={isDarkMode ? "Light Mode" : "Dark Mode"}
                        >
                            {isDarkMode
                                ? <Sun className="w-5 h-5 text-purple-500" />
                                : <Moon className="w-5 h-5 text-slate-600" />
                            }
                        </button>

                    </div>
                </div>
            </header>

            {/* ✅ MODAL */}
            {modal && (
                <AuthModal
                    type={modal}
                    onClose={() => setModal(null)}
                    onAuth={setUser}
                />
            )}
        </>
    );
}
