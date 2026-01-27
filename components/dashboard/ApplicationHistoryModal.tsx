"use client";

import { useEffect, useState } from "react";
import { X, Clock, FileText, TrendingUp } from "lucide-react";
import { ApplicationHistoryResponse } from "@/types/application";
import { formatStatus } from "@/types/application";

interface ApplicationHistoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    applicationId: string;
    fetchHistory: (id: string) => Promise<ApplicationHistoryResponse | null>;
}

export default function ApplicationHistoryModal({
                                                    isOpen,
                                                    onClose,
                                                    applicationId,
                                                    fetchHistory,
                                                }: ApplicationHistoryModalProps) {
    const [historyData, setHistoryData] = useState<ApplicationHistoryResponse | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isOpen && applicationId) {
            loadHistory();
        }
    }, [isOpen, applicationId]);

    const loadHistory = async () => {
        setLoading(true);
        try {
            const data = await fetchHistory(applicationId);
            setHistoryData(data);
        } catch (error) {
            console.error("Error loading history:", error);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusColor = (status: string) => {
        const statusColors: { [key: string]: string } = {
            APPLIED: 'bg-blue-100 text-blue-700 border-blue-300',
            INTERVIEW: 'bg-purple-100 text-purple-700 border-purple-300',
            OFFER: 'bg-green-100 text-green-700 border-green-300',
            REJECTED: 'bg-red-100 text-red-700 border-red-300',
            WITHDRAWN: 'bg-gray-100 text-gray-700 border-gray-300',
        };
        return statusColors[status] || 'bg-gray-100 text-gray-700 border-gray-300';
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6">
                    <div className="flex justify-between items-start">
                        <div>
                            <h2 className="text-2xl font-bold mb-1">Application History</h2>
                            {historyData && (
                                <div className="text-blue-100 text-sm">
                                    <p className="font-semibold">{historyData.company}</p>
                                    <p>{historyData.position}</p>
                                </div>
                            )}
                        </div>
                        <button
                            onClick={onClose}
                            className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
                        >
                            <X size={24} />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                        </div>
                    ) : historyData ? (
                        <div className="space-y-6">
                            {/* Current Status */}
                            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <TrendingUp size={20} className="text-blue-600" />
                                    <h3 className="font-semibold text-gray-900">Current Status</h3>
                                </div>
                                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(historyData.currentStatus)}`}>
                                    {formatStatus(historyData.currentStatus)}
                                </span>
                            </div>

                            {/* Timeline */}
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <Clock size={20} className="text-gray-600" />
                                    Change History
                                </h3>

                                {historyData.history && historyData.history.length > 0 ? (
                                    <div className="space-y-4">
                                        {historyData.history.map((item, index) => (
                                            <div
                                                key={item.id}
                                                className="relative pl-8 pb-6 border-l-2 border-gray-200 last:border-l-0 last:pb-0"
                                            >
                                                {/* Timeline dot */}
                                                <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-blue-600 border-4 border-white"></div>

                                                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                                                    {/* Date */}
                                                    <div className="text-sm text-gray-500 mb-2">
                                                        {formatDate(item.updatedDate)}
                                                        {item.updatedBy && (
                                                            <span className="ml-2">• by {item.updatedBy}</span>
                                                        )}
                                                    </div>

                                                    {/* Status Change */}
                                                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                                                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(item.oldStatus)}`}>
                                                            {formatStatus(item.oldStatus)}
                                                        </span>
                                                        <span className="text-gray-400">→</span>
                                                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(item.newStatus)}`}>
                                                            {formatStatus(item.newStatus)}
                                                        </span>
                                                    </div>

                                                    {/* Notes */}
                                                    {item.notes && (
                                                        <div className="mt-2">
                                                            <div className="flex items-start gap-2">
                                                                <FileText size={16} className="text-gray-400 mt-1 flex-shrink-0" />
                                                                <p className="text-sm text-gray-700">{item.notes}</p>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8 text-gray-500">
                                        <FileText size={48} className="mx-auto mb-3 text-gray-300" />
                                        <p>No history available</p>
                                    </div>
                                )}
                            </div>

                            {/* Created Date */}
                            <div className="text-sm text-gray-500 text-center pt-4 border-t border-gray-200">
                                Application created on {formatDate(historyData.createdDate)}
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-12 text-gray-500">
                            <p>Unable to load history</p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                    <button
                        onClick={onClose}
                        className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}