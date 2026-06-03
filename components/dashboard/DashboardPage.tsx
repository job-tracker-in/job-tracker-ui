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
import ExtensionPromoModal from "@/components/dashboard/ExtensionPromoModal";
import { Columns, List } from "lucide-react";
import { useTheme } from "@/app/contexts/ThemeContext";

export default function DashboardPage() {
    const { session, status, handleLogout, isLoading, isAuthenticated, accessToken } = useAuth();
    const { filters, handleFilterChange, clearFilters, buildQueryString } = useFilters();
    const { theme } = useTheme();

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
    } = useApplications({
        accessToken,
        queryString: buildQueryString(),
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
        if (accessToken) {
            fetchApplications();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        accessToken,
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
            <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
                theme === 'dark'
                    ? 'bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900'
                    : 'bg-gradient-to-br from-blue-50 via-cyan-50 to-emerald-50'
            }`}>
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-cyan-400 border-t-transparent"></div>
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

    const handleDelete = async (_ids?: string[]): Promise<boolean> => false;

    return (
        <div className={`min-h-screen p-4 md:p-6 transition-colors duration-300 relative overflow-hidden ${
            theme === 'dark'
                ? 'bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900'
                : 'bg-gradient-to-br from-blue-50 via-cyan-50 to-emerald-50'
        }`}>
            {/* Animated Background Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                {/* Glowing Orbs */}
                <div className={`absolute top-20 left-20 w-96 h-96 rounded-full blur-3xl animate-float ${
                    theme === 'dark' ? 'bg-cyan-500/20' : 'bg-cyan-400/30'
                }`}></div>
                <div className={`absolute top-32 right-40 w-72 h-72 rounded-full blur-3xl animate-float-delayed ${
                    theme === 'dark' ? 'bg-emerald-500/15' : 'bg-emerald-400/25'
                }`}></div>
                <div className={`absolute bottom-20 left-1/3 w-80 h-80 rounded-full blur-3xl animate-float-slow ${
                    theme === 'dark' ? 'bg-teal-500/10' : 'bg-teal-400/20'
                }`}></div>

                {/* Twinkling Stars/Particles */}
                {theme === 'dark' && (
                    <>
                        <div className="absolute top-24 right-1/4 w-1 h-1 bg-cyan-400 rounded-full animate-twinkle shadow-lg shadow-cyan-400/50"></div>
                        <div className="absolute top-40 left-1/4 w-1 h-1 bg-emerald-400 rounded-full animate-twinkle-delayed shadow-lg shadow-emerald-400/50"></div>
                        <div className="absolute top-56 right-1/3 w-1 h-1 bg-teal-400 rounded-full animate-twinkle-slow shadow-lg shadow-teal-400/50"></div>
                        <div className="absolute top-72 left-1/2 w-1 h-1 bg-cyan-400 rounded-full animate-twinkle shadow-lg shadow-cyan-400/50"></div>
                        <div className="absolute bottom-32 right-1/4 w-1 h-1 bg-emerald-400 rounded-full animate-twinkle-delayed shadow-lg shadow-emerald-400/50"></div>
                    </>
                )}

                {/* Subtle Grid Pattern */}
                <div className={`absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:50px_50px] ${
                    theme === 'dark' ? 'opacity-40' : 'opacity-20'
                }`}></div>
            </div>

            {/* Content Container */}
            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header with Theme Toggle */}
                <div className="flex items-start gap-3 mb-4">
                    <div className="flex-1">
                        <DashboardHeader
                            userName={session?.user?.user_metadata?.full_name ?? session?.user?.email}
                            totalElements={totalElements}
                            hasSessionError={false}
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
                    accessToken={accessToken}
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
                    <div className={`flex items-center gap-1 rounded-full p-1 shadow-lg ml-auto border ${
                        theme === 'dark'
                            ? 'bg-gray-800 border-gray-700'
                            : 'bg-white border-gray-200'
                    }`}>
                        <button
                            onClick={() => setViewMode('kanban')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                                viewMode === 'kanban'
                                    ? 'bg-blue-600 text-white shadow-md'
                                    : theme === 'dark'
                                        ? 'text-gray-300 hover:text-gray-100'
                                        : 'text-gray-600 hover:text-gray-900'
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
                                    : theme === 'dark'
                                        ? 'text-gray-300 hover:text-gray-100'
                                        : 'text-gray-600 hover:text-gray-900'
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

                {/* Chrome Extension Promo — auto-shows on first login */}
                <ExtensionPromoModal />
            </div>

            {/* Custom Animations */}
            <style jsx global>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                }
                
                @keyframes float-delayed {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-15px); }
                }
                
                @keyframes float-slow {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }
                
                @keyframes twinkle {
                    0%, 100% { opacity: 0.3; transform: scale(1); }
                    50% { opacity: 1; transform: scale(1.5); }
                }
                
                @keyframes twinkle-delayed {
                    0%, 100% { opacity: 0.4; transform: scale(1); }
                    50% { opacity: 1; transform: scale(1.3); }
                }
                
                @keyframes twinkle-slow {
                    0%, 100% { opacity: 0.2; transform: scale(1); }
                    50% { opacity: 0.8; transform: scale(1.2); }
                }
                
                .animate-float {
                    animation: float 8s ease-in-out infinite;
                }
                
                .animate-float-delayed {
                    animation: float-delayed 10s ease-in-out infinite;
                }
                
                .animate-float-slow {
                    animation: float-slow 12s ease-in-out infinite;
                }
                
                .animate-twinkle {
                    animation: twinkle 2s ease-in-out infinite;
                }
                
                .animate-twinkle-delayed {
                    animation: twinkle-delayed 3s ease-in-out infinite;
                }
                
                .animate-twinkle-slow {
                    animation: twinkle-slow 4s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
}