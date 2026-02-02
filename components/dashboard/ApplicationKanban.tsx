"use client";

import { JobApplication } from "@/types/application";
import KanbanColumn from "./KanbanColumn";

interface ApplicationKanbanProps {
    applications: JobApplication[];
    loading: boolean;
    onUpdate: (id: string, field: 'status' | 'notes', value: string) => Promise<boolean>;
    onQuickEdit: (application: JobApplication) => void;
    onDelete?: (ids: string[]) => Promise<boolean>;
    onViewHistory: (applicationId: string) => void;
}

export default function ApplicationKanban({
                                              applications = [],
                                              loading,
                                              onUpdate,
                                              onQuickEdit,
                                              onDelete,
                                              onViewHistory,
                                          }: ApplicationKanbanProps) {
    const statusColumns = [
        { id: 'APPLIED', title: 'Applied', color: 'border-amber-200' },
        { id: 'INTERVIEW', title: 'Interview', color: 'border-blue-200' },
        { id: 'OFFER', title: 'Offer', color: 'border-green-200' },
        { id: 'REJECTED', title: 'Rejected', color: 'border-red-200' },
        { id: 'WITHDRAWN', title: 'Withdrawn', color: 'border-gray-200' }
    ];

    const getApplicationsByStatus = (status: string) => {
        if (!applications || !Array.isArray(applications)) {
            return [];
        }
        return applications.filter(app => app.status === status);
    };

    if (loading) {
        return (
            <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 p-12">
                <div className="text-center text-gray-600">Loading...</div>
            </div>
        );
    }

    return (
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {statusColumns.map((column) => {
                    const apps = getApplicationsByStatus(column.id);
                    return (
                        <KanbanColumn
                            key={column.id}
                            title={column.title}
                            color={column.color}
                            applications={apps}
                            onUpdate={onUpdate}
                            onQuickEdit={onQuickEdit}
                            onDelete={onDelete}
                            onViewHistory={onViewHistory}
                        />
                    );
                })}
            </div>
        </div>
    );
}