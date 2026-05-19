"use client";

import { useState, useEffect } from "react";
import { STATUSES, formatStatus, FormData } from "@/types/application";

const EXTENSION_URL = "https://chromewebstore.google.com/detail/job-tracker-extension/gmpcfhjnmladcmlnpemnegmiddeebdce";
const BANNER_DISMISSED_KEY = "extension_banner_dismissed";

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
    const [showExtensionBanner, setShowExtensionBanner] = useState(false);
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

    useEffect(() => {
        if (isOpen) {
            const dismissed = localStorage.getItem(BANNER_DISMISSED_KEY);
            setShowExtensionBanner(!dismissed);
        }
    }, [isOpen]);

    const dismissBanner = () => {
        localStorage.setItem(BANNER_DISMISSED_KEY, "true");
        setShowExtensionBanner(false);
    };

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
                <h2 className="text-2xl font-light text-gray-800 mb-4">Add Job Application</h2>

                {showExtensionBanner && (
                    <div className="mb-6 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-4 flex items-start gap-4">
                        <div className="text-3xl flex-shrink-0">🧩</div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-emerald-800 mb-0.5">Skip the manual entry!</p>
                            <p className="text-sm text-emerald-700 leading-snug">
                                Our{" "}
                                <a
                                    href={EXTENSION_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-semibold underline underline-offset-2 hover:text-emerald-900"
                                >
                                    Chrome Extension
                                </a>{" "}
                                auto-fills job details directly from LinkedIn job postings with one click.
                            </p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                            <a
                                href={EXTENSION_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-full transition-colors whitespace-nowrap"
                            >
                                Add to Chrome
                            </a>
                            <button
                                type="button"
                                onClick={dismissBanner}
                                className="text-emerald-500 hover:text-emerald-700 text-lg leading-none transition-colors"
                                aria-label="Dismiss"
                            >
                                ×
                            </button>
                        </div>
                    </div>
                )}

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