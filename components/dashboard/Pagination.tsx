"use client";

import { Filters } from "@/types/application";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    totalElements: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({
                                       currentPage,
                                       totalPages,
                                       totalElements,
                                       onPageChange,
                                   }: PaginationProps) {
    if (totalPages <= 1) return null;

    return (
        <div className="p-4 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-600">
                Page {currentPage + 1} of {totalPages} ({totalElements} total)
            </div>
            <div className="flex gap-2">
                <button
                    onClick={() => onPageChange(0)}
                    disabled={currentPage === 0}
                    className="px-3 py-1 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400 text-gray-800 rounded font-medium transition-all"
                >
                    First
                </button>
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 0}
                    className="px-3 py-1 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400 text-gray-800 rounded font-medium transition-all"
                >
                    Previous
                </button>
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage >= totalPages - 1}
                    className="px-3 py-1 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400 text-gray-800 rounded font-medium transition-all"
                >
                    Next
                </button>
                <button
                    onClick={() => onPageChange(totalPages - 1)}
                    disabled={currentPage >= totalPages - 1}
                    className="px-3 py-1 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400 text-gray-800 rounded font-medium transition-all"
                >
                    Last
                </button>
            </div>
        </div>
    );
}