"use client";

import { JobApplication } from "@/types/application";
import KanbanCard from "@/components/dashboard/kanbanCard";


interface KanbanColumnProps {
    title: string;
    color: string;
    applications: JobApplication[];
    onUpdate: (id: string, field: 'status' | 'notes', value: string) => Promise<boolean>;
    onQuickEdit: (application: JobApplication) => void;
    onDelete?: (ids: string[]) => Promise<boolean>;
    onViewHistory: (applicationId: string) => void;
}

export default function KanbanColumn({
                                         title,
                                         color,
                                         applications,
                                         onUpdate,
                                         onQuickEdit,
                                         onDelete,
                                         onViewHistory,
                                     }: KanbanColumnProps) {
    return (
        <div className="bg-gray-50 rounded-xl p-3 border-2 border-gray-200">
            {/* Column Header */}
            <div className={`flex items-center justify-between mb-3 pb-2 border-b-2 ${color}`}>
                <h3 className="font-semibold text-sm text-gray-900">{title}</h3>
                <span className="text-xs font-medium text-gray-500 bg-white px-2 py-0.5 rounded-full border border-gray-300">
                    {applications.length}
                </span>
            </div>

            {/* Cards in Column */}
            <div className="space-y-2 max-h-[calc(100vh-400px)] overflow-y-auto">
                {applications.map((app) => (
                    <KanbanCard
                        key={app.id}
                        application={app}
                        onUpdate={onUpdate}
                        onQuickEdit={() => onQuickEdit(app)}
                        onDelete={onDelete}
                        onViewHistory={onViewHistory}
                    />
                ))}

                {/* Empty State */}
                {applications.length === 0 && (
                    <div className="text-center py-8 text-gray-400">
                        <p className="text-xs">No applications</p>
                    </div>
                )}
            </div>
        </div>
    );
}