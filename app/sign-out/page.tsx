"use client";

import { createClient } from '@/lib/supabase/client'
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignedOutPage() {
    const router = useRouter()
    const supabase = createClient()

    useEffect(() => {
        supabase.auth.signOut().then(() => {
            setTimeout(() => router.replace('/login'), 500)
        })
    }, [])

    return (
        <div className="h-screen flex items-center justify-center">
            <p className="text-gray-700">Signing you out…</p>
        </div>
    )
}
