"use client";

import { Briefcase, LogOut } from "lucide-react";

interface DashboardHeaderProps {
    userName?: string | null;
    totalElements: number;
    hasSessionError: boolean;
    onLogout: () => void;
}

export default function DashboardHeader({
                                            userName,
                                            totalElements,
                                            hasSessionError,
                                            onLogout,
                                        }: DashboardHeaderProps) {
    return (
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-lg p-4 mb-4 border border-white/20">
            <div className="flex justify-between items-center">
                {/* Left Side - Compact Title & Stats */}
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                            <Briefcase className="text-white" size={20} />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">Job Tracker</h1>
                            <p className="text-xs text-gray-600">
                                Hey, <span className="font-semibold">{userName || "User"}</span>
                            </p>
                        </div>
                    </div>

                    {/* Stats Badge */}
                    <div className="hidden sm:flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full border border-blue-200">
                        <Briefcase size={14} />
                        <span className="text-sm font-semibold">{totalElements}</span>
                        <span className="text-xs">Applications</span>
                    </div>

                    {hasSessionError && (
                        <span className="text-xs text-red-500 bg-red-50 px-2 py-1 rounded-full border border-red-200">
                            Session error
                        </span>
                    )}
                </div>

                {/* Right Side - Logout Button */}
                <button
                    onClick={onLogout}
                    className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full text-sm font-medium transition-all shadow-lg hover:shadow-xl"
                >
                    <LogOut size={16} />
                    <span className="hidden sm:inline">Logout</span>
                </button>
            </div>
        </div>
    );
}