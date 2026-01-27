"use client";

import { useState, useRef, useEffect } from "react";
import { JobApplication } from "@/types/application";
import { MoreVertical, Edit, Trash2, Calendar, Clock, MapPin, ExternalLink } from "lucide-react";

interface KanbanCardProps {
    application: JobApplication;
    onUpdate: (id: string, field: 'status' | 'notes', value: string) => Promise<boolean>;
    onQuickEdit: () => void;
    onDelete?: (ids: string[]) => Promise<boolean>;
    onViewHistory: (applicationId: string) => void;
}

export default function KanbanCard({
                                       application,
                                       onUpdate,
                                       onQuickEdit,
                                       onDelete,
                                       onViewHistory,
                                   }: KanbanCardProps) {
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const getCompanyInitial = (company: string) => {
        return company.charAt(0).toUpperCase();
    };

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setShowMenu(false);
            }
        };

        if (showMenu) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showMenu]);

    const handleEdit = () => {
        setShowMenu(false);
        onQuickEdit();
    };

    const handleDelete = async () => {
        setShowMenu(false);
        if (onDelete && confirm(`Delete application for ${application.company}?`)) {
            await onDelete([application.id]);
        }
    };

    const handleViewHistory = () => {
        setShowMenu(false);
        onViewHistory(application.id);
    };

    return (
        <div className="bg-white rounded-lg p-3 border border-gray-200 hover:shadow-md transition-all group relative">
            {/* Company Header */}
            <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xs shadow-sm flex-shrink-0">
                        {getCompanyInitial(application.company)}
                    </div>
                    <div className="min-w-0 flex-1">
                        <button
                            onClick={handleViewHistory}
                            className="font-semibold text-xs text-blue-600 hover:text-blue-800 hover:underline truncate text-left w-full group/link"
                            title="View application history"
                        >
                            <span className="flex items-center gap-1">
                                {application.company}
                                <ExternalLink size={10} className="opacity-0 group-hover/link:opacity-100 transition-opacity flex-shrink-0" />
                            </span>
                        </button>
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                            <MapPin size={9} />
                            <span className="truncate">{application.location}</span>
                        </p>
                    </div>
                </div>

                {/* Three Dot Menu */}
                <div className="relative" ref={menuRef}>
                    <button
                        onClick={() => setShowMenu(!showMenu)}
                        className="p-1 hover:bg-gray-100 rounded transition-colors opacity-0 group-hover:opacity-100"
                    >
                        <MoreVertical size={14} className="text-gray-400" />
                    </button>

                    {/* Dropdown Menu */}
                    {showMenu && (
                        <div className="absolute right-0 top-8 bg-white rounded-lg shadow-xl border border-gray-200 py-1 z-10 min-w-[140px]">
                            <button
                                onClick={handleViewHistory}
                                className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-blue-50 flex items-center gap-2"
                            >
                                <ExternalLink size={14} />
                                View History
                            </button>
                            <button
                                onClick={handleEdit}
                                className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-blue-50 flex items-center gap-2"
                            >
                                <Edit size={14} />
                                Edit
                            </button>
                            <button
                                onClick={handleDelete}
                                className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                            >
                                <Trash2 size={14} />
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Position */}
            <div className="mb-2">
                <p className="text-xs font-medium text-gray-900 line-clamp-2 leading-tight">{application.jobTitle}</p>
            </div>

            {/* Dates */}
            <div className="space-y-1 mb-2">
                <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Calendar size={10} />
                    <span>Applied: {new Date(application.appliedDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Clock size={10} />
                    <span>Updated: {new Date(application.lastModifiedDate).toLocaleDateString()}</span>
                </div>
            </div>

            {/* Source */}
            <div className="mb-2">
                <span className="text-xs text-gray-500 bg-gray-50 px-2 py-0.5 rounded border border-gray-200">
                    {application.source}
                </span>
            </div>

            {/* Notes */}
            {application.notes && (
                <p className="text-xs text-gray-600 line-clamp-2 leading-snug bg-gray-50 p-2 rounded border border-gray-200">
                    {application.notes}
                </p>
            )}
        </div>
    );
}