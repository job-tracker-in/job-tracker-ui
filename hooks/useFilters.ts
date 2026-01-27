"use client";

import { useState } from "react";
import { Filters } from "@/types/application";

export const useFilters = () => {
    const [filters, setFilters] = useState<Filters>({
        status: '',
        from: '',
        to: '',
        company: '',
        page: 0,
        size: 10,
        sortOrder: 'desc'
    });

    const handleFilterChange = <K extends keyof Filters>(key: K, value: Filters[K]) => {
        setFilters(prev => ({
            ...prev,
            [key]: value,
            page: key === 'page' ? (value as number) : 0 // Reset to first page when other filters change
        }));
    };

    const clearFilters = () => {
        setFilters({
            status: '',
            from: '',
            to: '',
            company: '',
            page: 0,
            size: 10,
            sortOrder: 'desc'
        });
    };

    const buildQueryString = () => {
        const params = new URLSearchParams();

        if (filters.status) params.append('status', filters.status);
        if (filters.from) params.append('from', filters.from);
        if (filters.to) params.append('to', filters.to);
        if (filters.company) params.append('company', filters.company);
        params.append('page', filters.page.toString());
        params.append('size', filters.size.toString());
        params.append('sortOrder', filters.sortOrder);

        return params.toString();
    };

    return {
        filters,
        handleFilterChange,
        clearFilters,
        buildQueryString,
    };
};