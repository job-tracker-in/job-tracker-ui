"use client";

import { useEffect, useState } from "react";

const EXTENSION_URL = "https://chromewebstore.google.com/detail/job-tracker-extension/gmpcfhjnmladcmlnpemnegmiddeebdce";
const PROMO_DISMISSED_KEY = "extension_promo_dismissed";

export default function ExtensionPromoModal() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const dismissed = localStorage.getItem(PROMO_DISMISSED_KEY);
        if (!dismissed) {
            const timer = setTimeout(() => setShow(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const dismiss = () => {
        localStorage.setItem(PROMO_DISMISSED_KEY, "true");
        setShow(false);
    };

    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden">
                {/* Top accent bar */}
                <div className="h-1.5 bg-gradient-to-r from-emerald-400 to-teal-500" />

                <div className="p-8">
                    {/* Icon + badge */}
                    <div className="flex items-center gap-3 mb-5">
                        <div className="w-14 h-14 bg-gradient-to-br from-emerald-50 to-teal-100 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0">
                            🧩
                        </div>
                        <div>
                            <span className="inline-block bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-1">
                                New
                            </span>
                            <p className="text-gray-500 text-sm">Chrome Extension available</p>
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-3">
                        Add jobs in one click
                    </h2>
                    <p className="text-gray-500 text-sm leading-relaxed mb-6">
                        Our Chrome extension detects job postings on LinkedIn —
                        and sends all the details straight to your tracker without any copy-pasting.
                    </p>

                    <ul className="space-y-2 mb-7">
                        {[
                            "Auto-fills company, title, location & URL",
                            "Works on LinkedIn job postings",
                            "One click to log any job instantly",
                        ].map((item) => (
                            <li key={item} className="flex items-center gap-2.5 text-sm text-gray-600">
                                <span className="text-emerald-500 font-bold text-base">✓</span>
                                {item}
                            </li>
                        ))}
                    </ul>

                    <div className="flex items-center gap-3">
                        <a
                            href={EXTENSION_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={dismiss}
                            className="flex-1 text-center px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-full transition-colors text-sm"
                        >
                            Add to Chrome — Free
                        </a>
                        <button
                            onClick={dismiss}
                            className="flex-1 px-5 py-3 bg-gray-100 hover:bg-gray-200 text-gray-600 font-medium rounded-full transition-colors text-sm"
                        >
                            Maybe Later
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
