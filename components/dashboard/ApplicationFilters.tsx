"use client";

import { useState } from "react";
import { Filters, STATUSES, formatStatus } from "@/types/application";
import CompanyAutocomplete from "@/components/common/CompanyAutocomplete";
import { Filter, X } from "lucide-react";

interface ApplicationFiltersProps {
    filters: Filters;
    onFilterChange: <K extends keyof Filters>(key: K, value: Filters[K]) => void;
    onClearFilters: () => void;
    accessToken: string | null;
}

export default function ApplicationFilters({
                                               filters,
                                               onFilterChange,
                                               onClearFilters,
                                               accessToken,
                                           }: ApplicationFiltersProps) {
    const [showAdvanced, setShowAdvanced] = useState(false);

    const hasActiveFilters = filters.status || filters.company || filters.from || filters.to;

    return (
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-lg p-4 mb-4 border border-white/20">
            {/* Main Filter Row */}
            <div className="flex flex-wrap items-center gap-3">
                {/* Status Filter */}
                <div className="flex-1 min-w-[180px]">
                    <select
                        value={filters.status}
                        onChange={(e) => onFilterChange('status', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 bg-white text-sm"
                    >
                        <option value="">All Statuses</option>
                        {STATUSES.map(s => (
                            <option key={s} value={s}>{formatStatus(s)}</option>
                        ))}
                    </select>
                </div>

                {/* Company Search - Using CompanyAutocomplete */}
                <div className="flex-1 min-w-[200px]">
                    <CompanyAutocomplete
                        value={filters.company}
                        onChange={(value) => onFilterChange('company', value)}
                        accessToken={accessToken}
                    />
                </div>

                {/* Advanced Filters Toggle */}
                <button
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        showAdvanced || hasActiveFilters
                            ? 'bg-blue-100 text-blue-700 border border-blue-300'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
                    }`}
                >
                    <Filter size={16} />
                    {showAdvanced ? 'Less' : 'More'}
                </button>

                {/* Sort & Page Size - Inline */}
                <div className="flex items-center gap-2">
                    <select
                        value={filters.sortOrder}
                        onChange={(e) => onFilterChange('sortOrder', e.target.value as 'asc' | 'desc')}
                        className="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 bg-white text-sm"
                    >
                        <option value="desc">Newest First</option>
                        <option value="asc">Oldest First</option>
                    </select>

                    <select
                        value={filters.size}
                        onChange={(e) => onFilterChange('size', parseInt(e.target.value))}
                        className="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 bg-white text-sm"
                    >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                    </select>
                </div>

                {/* Clear Filters - Only show if filters are active */}
                {hasActiveFilters && (
                    <button
                        onClick={onClearFilters}
                        className="flex items-center gap-2 px-3 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg text-sm font-medium transition-all border border-red-300"
                    >
                        <X size={16} />
                        Clear
                    </button>
                )}
            </div>

            {/* Advanced Filters (Collapsible) */}
            {showAdvanced && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3 pt-3 border-t border-gray-200">
                    <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">From Date</label>
                        <input
                            type="date"
                            value={filters.from}
                            onChange={(e) => onFilterChange('from', e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 bg-white text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">To Date</label>
                        <input
                            type="date"
                            value={filters.to}
                            onChange={(e) => onFilterChange('to', e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 bg-white text-sm"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}