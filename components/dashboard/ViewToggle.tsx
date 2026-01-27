"use client";

interface ViewToggleProps {
    viewMode: 'kanban' | 'table';
    onViewChange: (mode: 'kanban' | 'table') => void;
}

export default function ViewToggle({ viewMode, onViewChange }: ViewToggleProps) {
    return (
        <div className="flex items-center gap-1 bg-white/95 backdrop-blur-md rounded-full p-1 shadow-lg border border-white/20">
            <button
                onClick={() => onViewChange('kanban')}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    viewMode === 'kanban'
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                </svg>
                Kanban
            </button>
            <button
                onClick={() => onViewChange('table')}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    viewMode === 'table'
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
                Table
            </button>
        </div>
    );
}