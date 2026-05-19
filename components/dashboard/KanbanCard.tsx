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
    History,
    Clock,
    DollarSign,
    User,
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

    const daysSince = (date: string) => {
        return Math.floor((Date.now() - new Date(date).getTime()) / 86400000);
    };

    const daysUntil = (date: string) => {
        return Math.ceil((new Date(date).getTime() - Date.now()) / 86400000);
    };

    const showFollowUp =
        ['APPLIED', 'INTERVIEW'].includes(application.status) &&
        daysSince(application.lastModifiedDate) >= 7;

    const interviewSoon =
        application.interviewDate &&
        daysUntil(application.interviewDate) >= 0 &&
        daysUntil(application.interviewDate) <= 3;

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
            {/* Follow-up / Interview soon badges */}
            {(showFollowUp || interviewSoon) && (
                <div className="flex gap-1.5 mb-2 flex-wrap">
                    {showFollowUp && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 font-medium">
                            Follow up?
                        </span>
                    )}
                    {interviewSoon && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-medium">
                            Interview in {daysUntil(application.interviewDate!)}d
                        </span>
                    )}
                </div>
            )}

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

            {/* Salary */}
            {application.salary && (
                <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="w-3.5 h-3.5 text-green-500" />
                    <span className="text-xs text-green-700 font-medium">{application.salary}</span>
                </div>
            )}

            {/* Recruiter */}
            {application.recruiterName && (
                <div className="flex items-center gap-2 mb-2">
                    <User className="w-3.5 h-3.5 text-gray-400" />
                    <span className="text-xs text-gray-500">{application.recruiterName}</span>
                </div>
            )}

            {/* Date row */}
            <div className="flex items-center gap-3 mt-3 pt-2 border-t border-gray-100 flex-wrap">
                <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                    <span className="text-xs text-gray-500">{formatDate(application.appliedDate)}</span>
                </div>
                {application.interviewDate && (
                    <div className="flex items-center gap-1.5">
                        <Clock className={`w-3.5 h-3.5 ${interviewSoon ? 'text-blue-500' : 'text-gray-400'}`} />
                        <span className={`text-xs ${interviewSoon ? 'text-blue-600 font-semibold' : 'text-gray-500'}`}>
                            {formatDate(application.interviewDate)}
                        </span>
                    </div>
                )}
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