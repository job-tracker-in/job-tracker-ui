"use client";

import { useState } from "react";
import { STATUSES, formatStatus, FormData } from "@/types/application";

interface AddApplicationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (formData: FormData) => Promise<boolean>;
}

export default function AddApplicationModal({
                                                isOpen,
                                                onClose,
                                                onSubmit,
                                            }: AddApplicationModalProps) {
    const [formData, setFormData] = useState<FormData>({
        company: '',
        location: '',
        jobTitle: '',
        source: '',
        jobUrl: '',
        status: 'APPLIED',
        appliedDate: new Date().toISOString().split('T')[0],
        lastModifiedDate: new Date().toISOString().split('T')[0],
        notes: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const success = await onSubmit(formData);
        if (success) {
            // Reset form
            setFormData({
                company: '',
                location: '',
                jobTitle: '',
                source: '',
                jobUrl: '',
                status: 'APPLIED',
                appliedDate: new Date().toISOString().split('T')[0],
                lastModifiedDate: new Date().toISOString().split('T')[0],
                notes: '',
            });
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <h2 className="text-2xl font-light text-gray-800 mb-6">Add Job Application</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Company *</label>
                            <input
                                type="text"
                                required
                                value={formData.company}
                                onChange={(e) => setFormData({...formData, company: e.target.value})}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
                            <input
                                type="text"
                                required
                                value={formData.location}
                                onChange={(e) => setFormData({...formData, location: e.target.value})}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
                                placeholder="e.g., USA, Germany"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Job Title *</label>
                            <input
                                type="text"
                                required
                                value={formData.jobTitle}
                                onChange={(e) => setFormData({...formData, jobTitle: e.target.value})}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Source *</label>
                            <input
                                type="text"
                                required
                                value={formData.source}
                                onChange={(e) => setFormData({...formData, source: e.target.value})}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
                                placeholder="LinkedIn, Indeed, etc."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Status *</label>
                            <select
                                value={formData.status}
                                onChange={(e) => setFormData({...formData, status: e.target.value})}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
                            >
                                {STATUSES.map(s => (
                                    <option key={s} value={s}>{formatStatus(s)}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Applied Date *</label>
                            <input
                                type="date"
                                required
                                value={formData.appliedDate}
                                onChange={(e) => setFormData({...formData, appliedDate: e.target.value})}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Job URL</label>
                        <input
                            type="url"
                            value={formData.jobUrl}
                            onChange={(e) => setFormData({...formData, jobUrl: e.target.value})}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
                            placeholder="https://example.com/job-posting"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                        <textarea
                            value={formData.notes}
                            onChange={(e) => setFormData({...formData, notes: e.target.value})}
                            rows={3}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
                            placeholder="Add any notes about this application..."
                        />
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
                            type="submit"
                            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium transition-all shadow-lg"
                        >
                            Add Application
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}