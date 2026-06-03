import { useState } from 'react';
import { JobApplication, ApiResponse, ApplicationHistoryResponse } from '@/types/application';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api/v1';

interface UseApplicationsProps {
    accessToken: string | null;
    queryString: string;
}

export const useApplications = ({ accessToken, queryString }: UseApplicationsProps) => {
    const [applications, setApplications] = useState<JobApplication[]>([]);
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);

    const getAuthHeaders = () => ({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
    });

    const fetchApplications = async () => {
        if (!accessToken) return;
        setLoading(true);
        try {
            const formattedQuery = queryString.startsWith('?') ? queryString : `?${queryString}`;
            const response = await fetch(`${API_BASE_URL}/application${formattedQuery}`, {
                headers: getAuthHeaders(),
            });
            if (!response.ok) throw new Error(`Failed to fetch: ${response.statusText}`);
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

    const fetchApplicationHistory = async (applicationId: string): Promise<ApplicationHistoryResponse | null> => {
        if (!accessToken) return null;
        try {
            const response = await fetch(`${API_BASE_URL}/application/${applicationId}`, {
                headers: getAuthHeaders(),
            });
            if (!response.ok) throw new Error(`Failed to fetch history: ${response.statusText}`);
            const data: ApplicationHistoryResponse = await response.json();
            if (data.history) {
                data.history.sort((a, b) =>
                    new Date(b.updatedDate).getTime() - new Date(a.updatedDate).getTime()
                );
            }
            return data;
        } catch (error) {
            console.error('Error fetching history:', error);
            return null;
        }
    };

    const createApplication = async (formData: Partial<JobApplication>): Promise<boolean> => {
        if (!accessToken) return false;
        try {
            const response = await fetch(`${API_BASE_URL}/application`, {
                method: 'POST',
                headers: getAuthHeaders(),
                body: JSON.stringify(formData),
            });
            if (!response.ok) throw new Error(`Failed to create: ${response.statusText}`);
            await fetchApplications();
            return true;
        } catch (error) {
            console.error('Error creating application:', error);
            return false;
        }
    };

    const updateApplication = async (id: string, field: 'status' | 'notes', value: string): Promise<boolean> => {
        if (!accessToken) return false;
        try {
            const response = await fetch(`${API_BASE_URL}/application/${id}`, {
                method: 'PATCH',
                headers: getAuthHeaders(),
                body: JSON.stringify({ [field]: value }),
            });
            if (!response.ok) throw new Error(`Failed to update: ${response.statusText}`);
            await fetchApplications();
            return true;
        } catch (error) {
            console.error('Error updating application:', error);
            return false;
        }
    };

    const updateApplicationFields = async (id: string, fields: Partial<JobApplication>): Promise<boolean> => {
        if (!accessToken) return false;
        try {
            const response = await fetch(`${API_BASE_URL}/application/${id}`, {
                method: 'PATCH',
                headers: getAuthHeaders(),
                body: JSON.stringify(fields),
            });
            if (!response.ok) throw new Error(`Failed to update fields: ${response.statusText}`);
            await fetchApplications();
            return true;
        } catch (error) {
            console.error('Error updating fields:', error);
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
    };
};
