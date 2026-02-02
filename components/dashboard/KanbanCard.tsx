"use client";

import { JobApplication } from "@/types/application";
import { useState } from "react";
import {
    Building2,
    Calendar,
    MapPin,
    MoreVertical,
    Edit,
    Trash2,
    History
} from "lucide-react";

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
    const [isDragging, setIsDragging] = useState(false);

    const formatDate = (date: Date | string) => {
        const d = new Date(date);
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    const handleDelete = async () => {
        if (onDelete && confirm('Are you sure you want to delete this application?')) {
            await onDelete([application.id]);
        }
        setShowMenu(false);
    };

    const handleDragStart = (e: React.DragEvent) => {
        setIsDragging(true);
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('application', JSON.stringify(application));
    };

    const handleDragEnd = () => {
        setIsDragging(false);
    };

    return (
        <div
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            className={`bg-white rounded-lg p-3 border border-gray-200 hover:shadow-md transition-all cursor-move ${
                isDragging ? 'opacity-50 rotate-2 scale-95' : ''
            }`}
        >
            {/* Header */}
            <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-sm text-gray-900 line-clamp-2 flex-1">
                    {application.jobTitle}
                </h4>
                <div className="relative">
                    <button
                        onClick={() => setShowMenu(!showMenu)}
                        className="p-1 hover:bg-gray-100 rounded transition-colors"
                    >
                        <MoreVertical className="w-4 h-4 text-gray-400" />
                    </button>

                    {showMenu && (
                        <>
                            <div
                                className="fixed inset-0 z-10"
                                onClick={() => setShowMenu(false)}
                            />
                            <div className="absolute right-0 mt-1 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20">
                                <button
                                    onClick={() => {
                                        onQuickEdit();
                                        setShowMenu(false);
                                    }}
                                    className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                                >
                                    <Edit className="w-4 h-4" />
                                    Edit
                                </button>
                                <button
                                    onClick={() => {
                                        onViewHistory(application.id);
                                        setShowMenu(false);
                                    }}
                                    className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                                >
                                    <History className="w-4 h-4" />
                                    History
                                </button>
                                {onDelete && (
                                    <button
                                        onClick={handleDelete}
                                        className="w-full px-3 py-2 text-left text-sm hover:bg-red-50 text-red-600 flex items-center gap-2"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                        Delete
                                    </button>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Company */}
            <div className="flex items-center gap-2 mb-2">
                <Building2 className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-xs text-gray-600 font-medium">
                    {application.company}
                </span>
            </div>

            {/* Location */}
            {application.location && (
                <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-3.5 h-3.5 text-gray-400" />
                    <span className="text-xs text-gray-500">
                        {application.location}
                    </span>
                </div>
            )}

            {/* Source */}
            {application.source && (
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                        {application.source}
                    </span>
                </div>
            )}

            {/* Date */}
            <div className="flex items-center gap-2 mt-3 pt-2 border-t border-gray-100">
                <Calendar className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-xs text-gray-500">
                    {formatDate(application.appliedDate)}
                </span>
            </div>

            {/* Notes Preview */}
            {application.notes && (
                <div className="mt-2 pt-2 border-t border-gray-100">
                    <p className="text-xs text-gray-500 line-clamp-2">
                        {application.notes}
                    </p>
                </div>
            )}
        </div>
    );
}