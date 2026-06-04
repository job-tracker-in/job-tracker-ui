import { useState, useEffect } from 'react'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api/v1'

interface CvStatus {
    filename: string
    uploadedAt: string
}

export const useCv = (accessToken: string | null) => {
    const [cv, setCv] = useState<CvStatus | null>(null)
    const [loading, setLoading] = useState(false)
    const [uploading, setUploading] = useState(false)

    const headers = () => ({
        'Authorization': `Bearer ${accessToken}`,
    })

    const fetchCv = async () => {
        if (!accessToken) return
        setLoading(true)
        try {
            const res = await fetch(`${API_BASE_URL}/cv`, { headers: headers() })
            if (res.status === 204) {
                setCv(null)
            } else if (res.ok) {
                const data = await res.json()
                setCv(data)
            }
        } catch (e) {
            console.error('Failed to fetch CV:', e)
        } finally {
            setLoading(false)
        }
    }

    const uploadCv = async (file: File): Promise<boolean> => {
        if (!accessToken) return false
        setUploading(true)
        try {
            const form = new FormData()
            form.append('file', file)
            const res = await fetch(`${API_BASE_URL}/cv`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${accessToken}` },
                body: form,
            })
            if (res.ok) {
                const data = await res.json()
                setCv(data)
                return true
            }
            const err = await res.json()
            alert(err.message || 'Upload failed')
            return false
        } catch (e) {
            console.error('Upload failed:', e)
            return false
        } finally {
            setUploading(false)
        }
    }

    const deleteCv = async () => {
        if (!accessToken) return
        await fetch(`${API_BASE_URL}/cv`, { method: 'DELETE', headers: headers() })
        setCv(null)
    }

    useEffect(() => {
        fetchCv()
    }, [accessToken])

    return { cv, loading, uploading, uploadCv, deleteCv }
}
