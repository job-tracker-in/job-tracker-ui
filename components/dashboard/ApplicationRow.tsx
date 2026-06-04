"use client";

import { useState } from "react";
import { JobApplication, STATUSES, formatStatus } from "@/types/application";
import StatusBadge from "@/components/common/StatusBadge";
import { ExternalLink, Mail } from "lucide-react";

interface ApplicationRowProps {
    application: JobApplication;
    onUpdate: (id: string, field: 'status' | 'notes', value: string) => Promise<boolean>;
    onQuickEdit: () => void;
    onViewHistory: (applicationId: string) => void;
}

export default function ApplicationRow({
                                           application,
                                           onUpdate,
                                           onQuickEdit,
                                           onViewHistory,
                                       }: ApplicationRowProps) {
    const daysSince = (date: string) =>
        Math.floor((Date.now() - new Date(date).getTime()) / 86400000);

    const daysUntil = (date: string) =>
        Math.ceil((new Date(date).getTime() - Date.now()) / 86400000);

    const showFollowUp =
        ['APPLIED', 'INTERVIEW'].includes(application.status) &&
        daysSince(application.lastModifiedDate) >= 7;

    const [editingField, setEditingField] = useState<'status' | 'notes' | null>(null);
    const [editValue, setEditValue] = useState('');
    const [expandedNotes, setExpandedNotes] = useState(false);

    const startEditing = (field: 'status' | 'notes', currentValue: string) => {
        setEditingField(field);
        setEditValue(currentValue);
    };

    const cancelEditing = () => {
        setEditingField(null);
        setEditValue('');
    };

    const saveEdit = async () => {
        if (editingField) {
            const success = await onUpdate(application.id, editingField, editValue);
            if (success) {
                setEditingField(null);
                setEditValue('');
            }
        }
    };

    const handleSourceClick = (e: React.MouseEvent) => {
        if (application.jobUrl) {
            e.preventDefault();
            window.open(application.jobUrl, '_blank', 'noopener,noreferrer');
        }
    };

    return (
        <tr className={`hover:bg-gray-50 ${showFollowUp ? 'bg-orange-50' : 'bg-white'}`}>
            <td className="p-4">
                <button
                    onClick={onQuickEdit}
                    className="px-3 py-1.5 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg text-xs font-medium transition-all"
                    title="Quick Edit"
                >
                    ✏️ Edit
                </button>
            </td>
            <td className="p-4 text-sm text-gray-800 font-medium">
                <button
                    onClick={() => onViewHistory(application.id)}
                    className="flex items-center gap-1 text-blue-600 hover:text-blue-800 hover:underline transition-colors group"
                    title="View application history"
                >
                    {application.company}
                    <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
            </td>
            <td className="p-4 text-sm text-gray-600">{application.location}</td>
            <td className="p-4 text-sm text-gray-800">{application.jobTitle}</td>
            <td className="p-4 text-sm text-gray-600">
                {application.jobUrl ? (
                    <button
                        onClick={handleSourceClick}
                        className="flex items-center gap-1 text-blue-600 hover:text-blue-800 hover:underline transition-colors group"
                        title="Open job posting"
                    >
                        {application.source}
                        <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                ) : (
                    <span>{application.source}</span>
                )}
            </td>

            {/* Status - Editable with hover icon */}
            <td className="p-4">
                {editingField === 'status' ? (
                    <div className="flex gap-2 items-center">
                        <select
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            className="px-2 py-1 rounded border border-gray-300 text-sm text-gray-900"
                            autoFocus
                        >
                            {STATUSES.map(s => (
                                <option key={s} value={s}>{formatStatus(s)}</option>
                            ))}
                        </select>
                        <button
                            onClick={saveEdit}
                            className="px-2 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600"
                        >
                            ✓
                        </button>
                        <button
                            onClick={cancelEditing}
                            className="px-2 py-1 bg-gray-500 text-white rounded text-xs hover:bg-gray-600"
                        >
                            ✕
                        </button>
                    </div>
                ) : (
                    <div className="group inline-block">
                        <div
                            onClick={() => startEditing('status', application.status)}
                            className="cursor-pointer hover:bg-blue-50 p-1 rounded-lg transition-all duration-150 border border-transparent hover:border-blue-200"
                        >
                            <div className="flex items-center gap-2">
                                <StatusBadge status={application.status} />
                                {/* Edit icon - shows on hover */}
                                <svg
                                    className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                )}
            </td>

            <td className="p-4 text-sm text-gray-600">
                <div className="flex items-center gap-1.5">
                    {new Date(application.appliedDate).toLocaleDateString()}
                    {showFollowUp && (
                        <span className="text-xs px-1.5 py-0.5 rounded-full bg-orange-100 text-orange-700 font-medium whitespace-nowrap">
                            Follow up?
                        </span>
                    )}
                </div>
            </td>
            <td className="p-4 text-sm text-gray-600">
                {application.interviewDate ? (
                    <span className={
                        application.interviewDate && daysUntil(application.interviewDate) >= 0 && daysUntil(application.interviewDate) <= 3
                            ? 'text-blue-600 font-semibold'
                            : ''
                    }>
                        {new Date(application.interviewDate).toLocaleDateString()}
                    </span>
                ) : (
                    <span className="text-gray-300">—</span>
                )}
            </td>
            <td className="p-4 text-sm text-gray-600">
                {application.salary || <span className="text-gray-300">—</span>}
            </td>
            <td className="p-4 text-sm text-gray-600">
                {application.recruiterName ? (
                    <div className="flex flex-col gap-0.5">
                        <span>{application.recruiterName}</span>
                        {application.recruiterEmail && (
                            <a
                                href={`mailto:${application.recruiterEmail}`}
                                className="flex items-center gap-1 text-blue-500 hover:text-blue-700 text-xs"
                            >
                                <Mail size={10} />
                                {application.recruiterEmail}
                            </a>
                        )}
                    </div>
                ) : (
                    <span className="text-gray-300">—</span>
                )}
            </td>
            <td className="p-4 text-sm text-gray-600">
                {new Date(application.lastModifiedDate).toLocaleDateString()}
            </td>

            {/* Notes - Expandable and Editable */}
            <td className="p-4 text-sm text-gray-600">
                {editingField === 'notes' ? (
                    <div className="flex gap-2 items-start">
            <textarea
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className="px-2 py-1 rounded border border-gray-300 text-sm text-gray-900 w-full"
                rows={3}
                autoFocus
            />
                        <div className="flex flex-col gap-1">
                            <button
                                onClick={saveEdit}
                                className="px-2 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600"
                            >
                                ✓
                            </button>
                            <button
                                onClick={cancelEditing}
                                className="px-2 py-1 bg-gray-500 text-white rounded text-xs hover:bg-gray-600"
                            >
                                ✕
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="group">
                        <div
                            onClick={() => startEditing('notes', application.notes)}
                            className="cursor-pointer hover:bg-blue-50 p-2 rounded-lg transition-all duration-150 border border-transparent hover:border-blue-200"
                        >
                            <div className="flex items-center justify-between gap-2">
                                <div className="flex-1 min-w-0">
                                    {application.notes ? (
                                        expandedNotes ? (
                                            <div className="whitespace-pre-wrap">
                                                {application.notes}
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setExpandedNotes(false);
                                                    }}
                                                    className="ml-2 text-blue-600 hover:text-blue-800 text-xs"
                                                >
                                                    [Show less]
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                <span className="line-clamp-2">{application.notes}</span>
                                                {application.notes.length > 100 && (
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setExpandedNotes(true);
                                                        }}
                                                        className="text-blue-600 hover:text-blue-800 text-xs whitespace-nowrap"
                                                    >
                                                        [Read more]
                                                    </button>
                                                )}
                                            </div>
                                        )
                                    ) : (
                                        <span className="text-gray-400 italic">Click to add notes...</span>
                                    )}
                                </div>
                                {/* Edit icon - appears on hover */}
                                <svg
                                    className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                )}
            </td>
        </tr>
    );
}