"use client";

import { formatStatus } from "@/types/application";

interface StatusBadgeProps {
    status: string;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'OFFER':
                return 'bg-green-100 text-green-700';
            case 'INTERVIEW':
                return 'bg-blue-100 text-blue-700';
            case 'REJECTED':
                return 'bg-red-100 text-red-700';
            case 'WITHDRAWN':
                return 'bg-gray-100 text-gray-700';
            default:
                return 'bg-yellow-100 text-yellow-700';
        }
    };

    return (
        <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}
        >
      {formatStatus(status)}
    </span>
    );
}