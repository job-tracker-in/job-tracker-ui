"use client";

import { useState, useEffect } from "react";

interface CompanyAutocompleteProps {
    value: string;
    onChange: (value: string) => void;
    accessToken: string | null;
}

export default function CompanyAutocomplete({
                                                value,
                                                onChange,
                                                accessToken,
                                            }: CompanyAutocompleteProps) {
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    useEffect(() => {
        if (!value || value.length < 2 || !accessToken) {
            setSuggestions([]);
            return;
        }

        const timer = setTimeout(async () => {
            try {
                const response = await fetch(
                    `${baseUrl}/companies?name=${encodeURIComponent(value)}`,
                    {
                        headers: {
                            'Authorization': `Bearer ${accessToken}`,
                            'Content-Type': 'application/json',
                        },
                    }
                );

                if (response.ok) {
                    const data = await response.json();
                    setSuggestions(data);
                } else {
                    setSuggestions([]);
                }
            } catch (error) {
                console.error('Error fetching company suggestions:', error);
                setSuggestions([]);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [value, accessToken, baseUrl]);

    return (
        <div className="relative">
            <input
                type="text"
                value={value}
                onChange={(e) => {
                    onChange(e.target.value);
                    setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => {
                    setTimeout(() => setShowSuggestions(false), 300);
                }}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 bg-white text-sm"
                placeholder="Search company..."
            />
            {showSuggestions && suggestions.length > 0 && (
                <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                    {suggestions.map((company, idx) => (
                        <div
                            key={idx}
                            onMouseDown={(e) => {
                                e.preventDefault();
                                onChange(company);
                                setShowSuggestions(false);
                            }}
                            className="px-4 py-2 hover:bg-blue-50 cursor-pointer text-gray-900"
                        >
                            {company}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}