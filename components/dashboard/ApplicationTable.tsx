"use client";

import { JobApplication } from "@/types/application";
import ApplicationRow from "./ApplicationRow";
import Pagination from "./Pagination";

interface ApplicationTableProps {
    applications: JobApplication[];
    loading: boolean;
    selectedIds: string[];
    totalPages: number;
    totalElements: number;
    currentPage: number;
    onToggleSelect: (id: string) => void;
    onToggleSelectAll: () => void;
    onUpdate: (id: string, field: 'status' | 'notes', value: string) => Promise<boolean>;
    onQuickEdit: (application: JobApplication) => void;
    onPageChange: (page: number) => void;
    onViewHistory: (applicationId: string) => void;
}

export default function ApplicationTable({
                                             applications,
                                             loading,
                                             selectedIds,
                                             totalPages,
                                             totalElements,
                                             currentPage,
                                             onToggleSelect,
                                             onToggleSelectAll,
                                             onUpdate,
                                             onQuickEdit,
                                             onPageChange,
                                             onViewHistory,
                                         }: ApplicationTableProps) {
    if (loading) {
        return (
            <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
                <div className="p-12 text-center text-gray-600">Loading...</div>
            </div>
        );
    }

    if (applications.length === 0) {
        return (
            <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
                <div className="p-12 text-center text-gray-600">No applications found</div>
            </div>
        );
    }

    return (
        <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-blue-50">
                    <tr>
                        <th className="p-4 text-left">
                            <input
                                type="checkbox"
                                checked={selectedIds.length === applications.length && applications.length > 0}
                                onChange={onToggleSelectAll}
                                className="w-4 h-4"
                            />
                        </th>
                        <th className="p-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                        <th className="p-4 text-left text-sm font-semibold text-gray-700">Company</th>
                        <th className="p-4 text-left text-sm font-semibold text-gray-700">Location</th>
                        <th className="p-4 text-left text-sm font-semibold text-gray-700">Job Title</th>
                        <th className="p-4 text-left text-sm font-semibold text-gray-700">Source</th>
                        <th className="p-4 text-left text-sm font-semibold text-gray-700">Status</th>
                        <th className="p-4 text-left text-sm font-semibold text-gray-700">Applied</th>
                        <th className="p-4 text-left text-sm font-semibold text-gray-700">Modified</th>
                        <th className="p-4 text-left text-sm font-semibold text-gray-700">Notes</th>
                    </tr>
                    </thead>
                    <tbody>
                    {applications.map((app) => (
                        <ApplicationRow
                            key={app.id}
                            application={app}
                            isSelected={selectedIds.includes(app.id)}
                            onToggleSelect={onToggleSelect}
                            onUpdate={onUpdate}
                            onQuickEdit={() => onQuickEdit(app)}
                            onViewHistory={onViewHistory}
                        />
                    ))}
                    </tbody>
                </table>
            </div>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalElements={totalElements}
                onPageChange={onPageChange}
            />
        </div>
    );
}