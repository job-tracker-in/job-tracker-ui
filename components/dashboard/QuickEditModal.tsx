"use client";

import { useState, useEffect } from "react";
import { JobApplication, STATUSES, formatStatus } from "@/types/application";

interface QuickEditModalProps {
    application: JobApplication | null;
    isOpen: boolean;
    onClose: () => void;
    onSave: (id: string, updates: Partial<JobApplication>) => Promise<boolean>;
}

export default function QuickEditModal({
                                           application,
                                           isOpen,
                                           onClose,
                                           onSave,
                                       }: QuickEditModalProps) {
    const [status, setStatus] = useState('');
    const [notes, setNotes] = useState('');
    const [interviewDate, setInterviewDate] = useState('');
    const [salary, setSalary] = useState('');
    const [recruiterName, setRecruiterName] = useState('');
    const [recruiterEmail, setRecruiterEmail] = useState('');

    useEffect(() => {
        if (application) {
            setStatus(application.status);
            setNotes(application.notes);
            setInterviewDate(application.interviewDate ?? '');
            setSalary(application.salary ?? '');
            setRecruiterName(application.recruiterName ?? '');
            setRecruiterEmail(application.recruiterEmail ?? '');
        }
    }, [application]);

    const handleSave = async () => {
        if (!application) return;

        const updates: Partial<JobApplication> = {};

        if (status !== application.status) updates.status = status;
        if (notes !== application.notes) updates.notes = notes;
        if (interviewDate !== (application.interviewDate ?? '')) updates.interviewDate = interviewDate;
        if (salary !== (application.salary ?? '')) updates.salary = salary;
        if (recruiterName !== (application.recruiterName ?? '')) updates.recruiterName = recruiterName;
        if (recruiterEmail !== (application.recruiterEmail ?? '')) updates.recruiterEmail = recruiterEmail;

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

                    {/* Interview Date + Salary */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Interview Date</label>
                            <input
                                type="date"
                                value={interviewDate}
                                onChange={(e) => setInterviewDate(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Salary / Compensation</label>
                            <input
                                type="text"
                                value={salary}
                                onChange={(e) => setSalary(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
                                placeholder="e.g. $120k, €80k/yr"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Recruiter Name</label>
                            <input
                                type="text"
                                value={recruiterName}
                                onChange={(e) => setRecruiterName(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
                                placeholder="Jane Smith"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Recruiter Email</label>
                            <input
                                type="email"
                                value={recruiterEmail}
                                onChange={(e) => setRecruiterEmail(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
                                placeholder="jane@company.com"
                            />
                        </div>
                    </div>

                    {/* Notes */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Notes
                        </label>
                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            rows={4}
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