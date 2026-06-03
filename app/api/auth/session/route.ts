import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
    const supabase = await createClient()
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
        return NextResponse.json({ accessToken: null })
    }

    return NextResponse.json({ accessToken: session.access_token })
}
