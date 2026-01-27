"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/app/contexts/ThemeContext";

export default function ThemeToggle() {
    console.log("ThemeToggle rendered");

    try {
        const { theme, toggleTheme } = useTheme();
        console.log("Theme from context:", theme);

        const handleClick = () => {
            console.log("Button clicked!");
            console.log("Current theme:", theme);
            console.log("HTML classes before:", document.documentElement.className);
            toggleTheme();
            setTimeout(() => {
                console.log("HTML classes after:", document.documentElement.className);
            }, 100);
        };

        return (
            <button
                onClick={handleClick}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors border border-gray-300 dark:border-gray-600"
                aria-label="Toggle theme"
            >
                {theme === 'light' ? (
                    <Moon size={18} className="text-gray-700 dark:text-gray-300" />
                ) : (
                    <Sun size={18} className="text-gray-300" />
                )}
            </button>
        );
    } catch (error) {
        console.error("ThemeToggle error:", error);
        return <div>Theme toggle error</div>;
    }
}