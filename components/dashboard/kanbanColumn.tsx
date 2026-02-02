"use client";

import { JobApplication } from "@/types/application";
import KanbanCard from "./KanbanCard";
import { useState } from "react";

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
                                         applications = [],
                                         onUpdate,
                                         onQuickEdit,
                                         onDelete,
                                         onViewHistory,
                                     }: KanbanColumnProps) {
    const [isDragOver, setIsDragOver] = useState(false);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        setIsDragOver(true);
    };

    const handleDragLeave = () => {
        setIsDragOver(false);
    };

    const handleDrop = async (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);

        try {
            const applicationData = e.dataTransfer.getData('application');
            if (!applicationData) return;

            const application = JSON.parse(applicationData) as JobApplication;

            // Get the status ID from the column title
            const statusMap: { [key: string]: string } = {
                'Applied': 'APPLIED',
                'Interview': 'INTERVIEW',
                'Offer': 'OFFER',
                'Rejected': 'REJECTED',
                'Withdrawn': 'WITHDRAWN'
            };

            const newStatus = statusMap[title];

            // Only update if status is different
            if (application.status !== newStatus) {
                await onUpdate(application.id, 'status', newStatus);
            }
        } catch (error) {
            console.error('Error handling drop:', error);
        }
    };

    return (
        <div
            className={`bg-gray-50 rounded-xl p-3 border-2 transition-all ${
                isDragOver
                    ? 'border-blue-400 bg-blue-50 shadow-lg scale-[1.02]'
                    : 'border-gray-200'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
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
                        {isDragOver && (
                            <p className="text-xs mt-1 text-blue-500">Drop here</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}