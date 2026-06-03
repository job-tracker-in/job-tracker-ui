"use client";

import { createClient } from '@/lib/supabase/client'
import { Session } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export const useAuth = () => {
    const [session, setSession] = useState<Session | null>(null)
    const [status, setStatus] = useState<'loading' | 'authenticated' | 'unauthenticated'>('loading')
    const router = useRouter()
    const supabase = createClient()

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
            setStatus(session ? 'authenticated' : 'unauthenticated')
            if (!session) router.replace('/login')
        })

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
            setSession(session)
            setStatus(session ? 'authenticated' : 'unauthenticated')
            if (!session) router.replace('/login')
        })

        return () => subscription.unsubscribe()
    }, [])

    const handleLogout = async () => {
        await supabase.auth.signOut()
        router.replace('/login')
    }

    return {
        session,
        status,
        handleLogout,
        isLoading: status === 'loading',
        isAuthenticated: !!session,
        accessToken: session?.access_token ?? null,
    }
}
