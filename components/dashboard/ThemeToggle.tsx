"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/app/contexts/ThemeContext";

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className={`p-3 rounded-full transition-all duration-300 shadow-lg border backdrop-blur-md ${
                theme === 'dark'
                    ? 'bg-slate-800/60 border-slate-700 hover:bg-slate-700/60 shadow-cyan-500/20'
                    : 'bg-white/80 border-gray-200 hover:bg-white shadow-blue-500/20'
            } transform hover:scale-110 hover:shadow-xl`}
            aria-label="Toggle theme"
        >
            {theme === 'light' ? (
                <Moon size={20} className="text-gray-700 transition-transform hover:rotate-12" />
            ) : (
                <Sun size={20} className="text-cyan-400 transition-transform hover:rotate-180" />
            )}
        </button>
    );
}