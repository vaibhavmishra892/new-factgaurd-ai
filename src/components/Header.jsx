import React from 'react';
import { ShieldCheck, Sun, Moon, LogOut, User } from 'lucide-react';
import { NavLink } from "react-router-dom";

export default function Header({ isDarkMode, toggleTheme, user, onOpenAuth, onLogout }) {

    const navClass = ({ isActive }) =>
        `text-sm font-medium transition-colors ${isActive
            ? "text-purple-500 border-b-2 border-purple-500 pb-1"
            : "body-text-muted hover:text-purple-500"
        }`;

    return (
        <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-900/80 backdrop-blur-md">
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
                    </div>
                </div>

                {/* RIGHT */}
                <div className="flex items-center gap-6">

                    <nav className="flex items-center gap-6 hidden md:flex">

                        <NavLink to="/" className={navClass}>
                            Home
                        </NavLink>

                        <NavLink to="/how-it-works" className={navClass}>
                            How it Works
                        </NavLink>

                        <NavLink to="/about" className={navClass}>
                            About Us
                        </NavLink>

                        <NavLink to="/history" className={navClass}>
                            History
                        </NavLink>

                        {!user ? (
                            <>
                                {/* LOGIN */}
                                <button
                                    onClick={() => onOpenAuth("login")}
                                    className="text-sm font-semibold px-4 py-2 rounded-lg border border-purple-500 text-purple-500 hover:bg-purple-500/10 transition-colors"
                                >
                                    Login
                                </button>

                                {/* SIGNUP */}
                                <button
                                    onClick={() => onOpenAuth("signup")}
                                    className="text-sm font-semibold px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white transition-colors"
                                >
                                    Sign Up
                                </button>
                            </>
                        ) : (
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20">
                                    <User className="w-3 h-3 text-purple-400" />
                                    <span className="text-xs text-purple-300 font-medium">
                                        {user.name || user.email}
                                    </span>
                                </div>

                                <button
                                    onClick={onLogout}
                                    className="p-2 rounded-lg hover:bg-red-500/10 text-slate-400 hover:text-red-400 transition-colors"
                                    title="Logout"
                                >
                                    <LogOut className="w-4 h-4" />
                                </button>
                            </div>
                        )}

                    </nav>

                    {/* THEME TOGGLE */}
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full hover:bg-black/5 border border-transparent transition-colors"
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
    );
}
