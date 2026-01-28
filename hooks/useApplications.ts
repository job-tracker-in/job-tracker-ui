import { useState } from 'react';
import { JobApplication, ApiResponse, ApplicationHistoryResponse } from '@/types/application';
import { Session } from 'next-auth';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api/v1';

interface UseApplicationsProps {
    session: Session | null;
    queryString: string;
    updateSession: () => void;
}

export const useApplications = ({ session, queryString, updateSession }: UseApplicationsProps) => {
    const [applications, setApplications] = useState<JobApplication[]>([]);
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);

    const getAuthHeaders = () => ({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session?.accessToken}`,
    });

    // Fetch all applications
    const fetchApplications = async () => {
        if (!session?.accessToken) return;

        setLoading(true);
        try {
            const formattedQuery = queryString.startsWith('?') ? queryString : `?${queryString}`;
            const url = `${API_BASE_URL}/application${formattedQuery}`;

            const response = await fetch(url, {
                headers: getAuthHeaders(),
            });

            if (response.status === 401) {
                updateSession();
                return;
            }

            if (!response.ok) {
                throw new Error(`Failed to fetch applications: ${response.statusText}`);
            }

            const data: ApiResponse = await response.json();
            setApplications(data.data || []);
            setTotalPages(data.totalPages || 0);
            setTotalElements(data.totalElements || 0);
        } catch (error) {
            console.error('Error fetching applications:', error);
            setApplications([]);
        } finally {
            setLoading(false);
        }
    };

    // Fetch application history
    const fetchApplicationHistory = async (applicationId: string): Promise<ApplicationHistoryResponse | null> => {
        if (!session?.accessToken) return null;

        try {
            const url = `${API_BASE_URL}/application/${applicationId}`;

            const response = await fetch(url, {
                headers: getAuthHeaders(),
            });

            if (response.status === 401) {
                updateSession();
                return null;
            }

            if (!response.ok) {
                throw new Error(`Failed to fetch history: ${response.statusText}`);
            }

            const data: ApplicationHistoryResponse = await response.json();

            // Sort history by date, newest first
            if (data.history) {
                data.history.sort((a, b) =>
                    new Date(b.updatedDate).getTime() - new Date(a.updatedDate).getTime()
                );
            }

            return data;
        } catch (error) {
            console.error('Error fetching application history:', error);
            return null;
        }
    };

    // Create new application
    const createApplication = async (formData: Partial<JobApplication>): Promise<boolean> => {
        if (!session?.accessToken) return false;

        try {
            const response = await fetch(`${API_BASE_URL}/application`, {
                method: 'POST',
                headers: getAuthHeaders(),
                body: JSON.stringify(formData),
            });

            if (response.status === 401) {
                updateSession();
                return false;
            }

            if (!response.ok) {
                throw new Error(`Failed to create application: ${response.statusText}`);
            }

            await fetchApplications();
            return true;
        } catch (error) {
            console.error('Error creating application:', error);
            return false;
        }
    };

    // Update specific field (for inline edits)
    const updateApplication = async (id: string, field: 'status' | 'notes', value: string): Promise<boolean> => {
        if (!session?.accessToken) return false;

        try {
            const response = await fetch(`${API_BASE_URL}/application/${id}`, {
                method: 'PATCH',
                headers: getAuthHeaders(),
                body: JSON.stringify({ [field]: value }),
            });

            if (response.status === 401) {
                updateSession();
                return false;
            }

            if (!response.ok) {
                throw new Error(`Failed to update application: ${response.statusText}`);
            }

            await fetchApplications();
            return true;
        } catch (error) {
            console.error('Error updating application:', error);
            return false;
        }
    };

    // Update specific fields (PATCH)
    const updateApplicationFields = async (id: string, fields: Partial<JobApplication>): Promise<boolean> => {
        if (!session?.accessToken) return false;

        try {
            const response = await fetch(`${API_BASE_URL}/application/${id}`, {
                method: 'PATCH',
                headers: getAuthHeaders(),
                body: JSON.stringify(fields),
            });

            if (response.status === 401) {
                updateSession();
                return false;
            }

            if (!response.ok) {
                throw new Error(`Failed to update application fields: ${response.statusText}`);
            }

            await fetchApplications();
            return true;
        } catch (error) {
            console.error('Error updating application fields:', error);
            return false;
        }
    };

    // Delete applications
    const deleteApplications = async (ids: string[]): Promise<boolean> => {
        if (!session?.accessToken) return false;

        try {
            const response = await fetch(`${API_BASE_URL}/application`, {
                method: 'DELETE',
                headers: getAuthHeaders(),
                body: JSON.stringify(ids),
            });

            if (response.status === 401) {
                updateSession();
                return false;
            }

            if (!response.ok) {
                throw new Error(`Failed to delete applications: ${response.statusText}`);
            }

            await fetchApplications();
            return true;
        } catch (error) {
            console.error('Error deleting applications:', error);
            return false;
        }
    };

    return {
        applications,
        loading,
        totalPages,
        totalElements,
        fetchApplications,
        fetchApplicationHistory,
        createApplication,
        updateApplication,
        updateApplicationFields,
        deleteApplications,
    };
};