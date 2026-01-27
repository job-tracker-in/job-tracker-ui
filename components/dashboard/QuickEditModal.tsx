"use client";

import { useState, useEffect } from "react";
import { JobApplication, STATUSES, formatStatus } from "@/types/application";

interface QuickEditModalProps {
    application: JobApplication | null;
    isOpen: boolean;
    onClose: () => void;
    onSave: (id: string, updates: { status?: string; notes?: string }) => Promise<boolean>;
}

export default function QuickEditModal({
                                           application,
                                           isOpen,
                                           onClose,
                                           onSave,
                                       }: QuickEditModalProps) {
    const [status, setStatus] = useState('');
    const [notes, setNotes] = useState('');

    // Update state when application changes
    useEffect(() => {
        if (application) {
            setStatus(application.status);
            setNotes(application.notes);
        }
    }, [application]);

    const handleSave = async () => {
        if (!application) return;

        const updates: { status?: string; notes?: string } = {};

        // Only include fields that changed
        if (status !== application.status) {
            updates.status = status;
        }
        if (notes !== application.notes) {
            updates.notes = notes;
        }

        // If nothing changed, just close
        if (Object.keys(updates).length === 0) {
            onClose();
            return;
        }

        const success = await onSave(application.id, updates);
        if (success) {
            onClose();
        }
    };

    if (!isOpen || !application) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full">
                <h2 className="text-2xl font-light text-gray-800 mb-6">
                    Edit Application - {application.company}
                </h2>

                <div className="space-y-4">
                    {/* Status */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Status
                        </label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
                        >
                            {STATUSES.map(s => (
                                <option key={s} value={s}>{formatStatus(s)}</option>
                            ))}
                        </select>
                    </div>

                    {/* Notes */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Notes
                        </label>
                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            rows={5}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
                            placeholder="Add notes about this application..."
                        />
                    </div>

                    {/* Read-only fields for reference */}
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">
                                Job Title
                            </label>
                            <p className="text-sm text-gray-800">{application.jobTitle}</p>
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">
                                Location
                            </label>
                            <p className="text-sm text-gray-800">{application.location}</p>
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">
                                Applied Date
                            </label>
                            <p className="text-sm text-gray-800">
                                {new Date(application.appliedDate).toLocaleDateString()}
                            </p>
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">
                                Source
                            </label>
                            <p className="text-sm text-gray-800">{application.source}</p>
                        </div>
                    </div>
                </div>

                <div className="flex gap-4 justify-end mt-6">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-full font-medium transition-all"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handleSave}
                        className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium transition-all shadow-lg"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
}