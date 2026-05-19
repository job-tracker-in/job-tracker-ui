// Types for Job Application
export interface JobApplication {
    id: string;
    company: string;
    location: string;
    jobTitle: string;
    source: string;
    status: string;
    appliedDate: string;
    notes: string;
    lastModifiedDate: string;
    jobUrl: string;
    interviewDate?: string;
    salary?: string;
    recruiterName?: string;
    recruiterEmail?: string;
}

export interface ApiResponse {
    data: JobApplication[];
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
}

export interface Filters {
    status: string;
    from: string;
    to: string;
    company: string;
    page: number;
    size: number;
    sortOrder: 'asc' | 'desc';
}

export interface FormData {
    company: string;
    location: string;
    jobTitle: string;
    source: string;
    status: string;
    appliedDate: string;
    jobUrl: string;
    notes: string;
    lastModifiedDate: string;
    interviewDate?: string;
    salary?: string;
    recruiterName?: string;
    recruiterEmail?: string;
}

// History Types
export interface ApplicationHistoryItem {
    id: string;
    oldStatus: string;
    newStatus: string;
    notes: string;
    updatedBy?: string;
    updatedDate: string;
}

export interface ApplicationHistoryResponse {
    applicationId: string;
    company: string;
    position: string;
    currentStatus: string;
    history: ApplicationHistoryItem[];
    createdDate: string;
}

export const STATUSES = ['APPLIED', 'INTERVIEW', 'OFFER', 'REJECTED', 'WITHDRAWN'] as const;

export const formatStatus = (status: string): string => {
    return status.charAt(0) + status.slice(1).toLowerCase();
};