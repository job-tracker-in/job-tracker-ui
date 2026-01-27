"use client";

import { Plus, Trash2, RefreshCw } from "lucide-react";

interface ControlsBarProps {
    selectedCount: number;
    onAdd: () => void;
    onDelete: () => void;
    onRefresh: () => void;
    showDelete?: boolean;
    children?: React.ReactNode;
}

export default function ControlsBar({
                                        selectedCount,
                                        onAdd,
                                        onDelete,
                                        onRefresh,
                                        showDelete = true,
                                        children
                                    }: ControlsBarProps) {
    return (
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-lg p-3 mb-4 border border-white/20">
            <div className="flex gap-2 items-center flex-wrap justify-between">
                {/* Left Side - Actions */}
                <div className="flex gap-2 items-center">
                    <button
                        onClick={onAdd}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-full text-sm font-medium transition-all shadow-md hover:shadow-lg"
                    >
                        <Plus size={16} />
                        Add
                    </button>

                    {selectedCount > 0 && showDelete && (
                        <button
                            onClick={onDelete}
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-full text-sm font-medium transition-all shadow-md hover:shadow-lg"
                        >
                            <Trash2 size={16} />
                            Delete ({selectedCount})
                        </button>
                    )}

                    <button
                        onClick={onRefresh}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm font-medium transition-all border border-gray-300"
                    >
                        <RefreshCw size={16} />
                        <span className="hidden sm:inline">Refresh</span>
                    </button>
                </div>

                {/* Right Side - View Toggle */}
                {children}
            </div>
        </div>
    );
}