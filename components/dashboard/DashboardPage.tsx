"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useFilters } from "@/hooks/useFilters";
import { useApplications } from "@/hooks/useApplications";
import { JobApplication } from "@/types/application";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ApplicationFilters from "@/components/dashboard/ApplicationFilters";
import ApplicationTable from "@/components/dashboard/ApplicationTable";
import ApplicationKanban from "@/components/dashboard/ApplicationKanban";
import ControlsBar from "@/components/dashboard/ControlsBar";
import ThemeToggle from "@/components/dashboard/ThemeToggle";
import AddApplicationModal from "@/components/dashboard/AddApplicationModal";
import QuickEditModal from "@/components/dashboard/QuickEditModal";
import ApplicationHistoryModal from "@/components/dashboard/ApplicationHistoryModal";
import { Columns, List } from "lucide-react";

export default function DashboardPage() {
    const { session, status, update, handleLogout, isLoading, isAuthenticated } = useAuth();
    const { filters, handleFilterChange, clearFilters, buildQueryString } = useFilters();

    const {
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
    } = useApplications({
        session,
        queryString: buildQueryString(),
        updateSession: update,
    });

    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [showQuickEditModal, setShowQuickEditModal] = useState(false);
    const [showHistoryModal, setShowHistoryModal] = useState(false);
    const [editingApplication, setEditingApplication] = useState<JobApplication | null>(null);
    const [historyApplicationId, setHistoryApplicationId] = useState<string>("");
    const [viewMode, setViewMode] = useState<'kanban' | 'table'>('kanban');

    // Fetch applications when session is ready or filters change
    useEffect(() => {
        if (session?.accessToken) {
            fetchApplications();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        session?.accessToken,
        filters.status,
        filters.from,
        filters.to,
        filters.company,
        filters.page,
        filters.size,
        filters.sortOrder
    ]);

    // Auth check - show loading state
    if (isLoading) {
        return (
            <div
                className="min-h-screen flex items-center justify-center transition-colors duration-300"
                style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}
            >
                <div className="text-xl">Loading...</div>
            </div>
        );
    }

    // If not authenticated, useAuth hook handles redirect
    if (!isAuthenticated) {
        return null;
    }

    // Toggle selection handlers
    const toggleSelect = (id: string) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const toggleSelectAll = () => {
        if (selectedIds.length === applications.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(applications.map(app => app.id));
        }
    };

    // Quick edit handlers
    const handleQuickEdit = (application: JobApplication) => {
        setEditingApplication(application);
        setShowQuickEditModal(true);
    };

    const closeQuickEdit = () => {
        setShowQuickEditModal(false);
        setEditingApplication(null);
    };

    // History modal handlers
    const handleViewHistory = (applicationId: string) => {
        setHistoryApplicationId(applicationId);
        setShowHistoryModal(true);
    };

    const closeHistory = () => {
        setShowHistoryModal(false);
        setHistoryApplicationId("");
    };

    // Handle delete
    const handleDelete = async (ids?: string[]): Promise<boolean> => {
        const idsToDelete = ids || selectedIds;
        const success = await deleteApplications(idsToDelete);
        if (success) {
            setSelectedIds([]);
        }
        return success;
    };

    return (
        <div
            className="min-h-screen p-4 md:p-6 transition-colors duration-300"
            style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}
        >
            <div className="max-w-7xl mx-auto">
                {/* Header with Theme Toggle */}
                <div className="flex items-start gap-3 mb-4">
                    <div className="flex-1">
                        <DashboardHeader
                            userName={session?.user?.name}
                            totalElements={totalElements}
                            hasSessionError={!!session?.error}
                            onLogout={handleLogout}
                        />
                    </div>
                    <ThemeToggle />
                </div>

                {/* Filters */}
                <ApplicationFilters
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    onClearFilters={clearFilters}
                    session={session}
                />

                {/* Controls */}
                <ControlsBar
                    selectedCount={selectedIds.length}
                    onAdd={() => setShowModal(true)}
                    onDelete={() => handleDelete()}
                    onRefresh={fetchApplications}
                    showDelete={viewMode === 'table'}
                >
                    {/* View Toggle */}
                    <div className="flex items-center gap-1 bg-white dark:bg-gray-800 rounded-full p-1 shadow-lg ml-auto border border-gray-200 dark:border-gray-700">
                        <button
                            onClick={() => setViewMode('kanban')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                                viewMode === 'kanban'
                                    ? 'bg-blue-600 text-white shadow-md'
                                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100'
                            }`}
                        >
                            <Columns size={16} />
                            Kanban
                        </button>
                        <button
                            onClick={() => setViewMode('table')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                                viewMode === 'table'
                                    ? 'bg-blue-600 text-white shadow-md'
                                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100'
                            }`}
                        >
                            <List size={16} />
                            Table
                        </button>
                    </div>
                </ControlsBar>

                {/* Kanban View */}
                {viewMode === 'kanban' && (
                    <ApplicationKanban
                        applications={applications}
                        loading={loading}
                        onUpdate={updateApplication}
                        onQuickEdit={handleQuickEdit}
                        onDelete={handleDelete}
                        onViewHistory={handleViewHistory}
                    />
                )}

                {/* Table View */}
                {viewMode === 'table' && (
                    <ApplicationTable
                        applications={applications}
                        loading={loading}
                        selectedIds={selectedIds}
                        totalPages={totalPages}
                        totalElements={totalElements}
                        currentPage={filters.page}
                        onToggleSelect={toggleSelect}
                        onToggleSelectAll={toggleSelectAll}
                        onUpdate={updateApplication}
                        onQuickEdit={handleQuickEdit}
                        onPageChange={(page) => handleFilterChange('page', page)}
                        onViewHistory={handleViewHistory}
                    />
                )}

                {/* Add Application Modal */}
                <AddApplicationModal
                    isOpen={showModal}
                    onClose={() => setShowModal(false)}
                    onSubmit={createApplication}
                />

                {/* Quick Edit Modal */}
                <QuickEditModal
                    application={editingApplication}
                    isOpen={showQuickEditModal}
                    onClose={closeQuickEdit}
                    onSave={updateApplicationFields}
                />

                {/* Application History Modal */}
                <ApplicationHistoryModal
                    isOpen={showHistoryModal}
                    onClose={closeHistory}
                    applicationId={historyApplicationId}
                    fetchHistory={fetchApplicationHistory}
                />
            </div>
        </div>
    );
}