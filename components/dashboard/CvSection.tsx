"use client"

import { useRef } from 'react'
import { FileText, Upload, Trash2, Loader2 } from 'lucide-react'
import { useCv } from '@/hooks/useCv'
import { useTheme } from '@/app/contexts/ThemeContext'

interface CvSectionProps {
    accessToken: string | null
}

export default function CvSection({ accessToken }: CvSectionProps) {
    const { cv, loading, uploading, uploadCv, deleteCv } = useCv(accessToken)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const { theme } = useTheme()

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return
        if (file.type !== 'application/pdf') {
            alert('Only PDF files are accepted.')
            return
        }
        if (file.size > 200 * 1024) {
            alert('File too large. Max size is 200KB.')
            return
        }
        await uploadCv(file)
        e.target.value = ''
    }

    const handleDelete = async () => {
        if (confirm('Remove your CV? Cover letters will no longer use your resume.')) {
            await deleteCv()
        }
    }

    if (loading) return null

    const isDark = theme === 'dark'

    return (
        <div className={`rounded-2xl shadow-lg p-3 mb-4 border flex items-center justify-between gap-3 ${
            isDark
                ? 'bg-white/10 border-white/20'
                : 'bg-white/95 border-white/20'
        }`}>
            <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    cv ? 'bg-green-100' : 'bg-gray-100'
                }`}>
                    <FileText size={16} className={cv ? 'text-green-600' : 'text-gray-400'} />
                </div>
                <div>
                    <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>
                        {cv ? cv.filename : 'No CV uploaded'}
                    </p>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {cv
                            ? `Uploaded ${new Date(cv.uploadedAt).toLocaleDateString()} · Used for cover letters`
                            : 'Upload your resume to personalise cover letters'}
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="application/pdf"
                    className="hidden"
                    onChange={handleFileChange}
                />
                <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white rounded-full text-xs font-medium transition-all"
                >
                    {uploading ? (
                        <Loader2 size={12} className="animate-spin" />
                    ) : (
                        <Upload size={12} />
                    )}
                    {cv ? 'Replace' : 'Upload PDF'}
                </button>
                {cv && (
                    <button
                        onClick={handleDelete}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-red-100 hover:bg-red-200 text-red-600 rounded-full text-xs font-medium transition-all"
                    >
                        <Trash2 size={12} />
                        Remove
                    </button>
                )}
            </div>
        </div>
    )
}
