"use client";

import { createClient } from '@/lib/supabase/client'
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { LogIn, KeyRound, Loader2 } from "lucide-react";

export default function LoginPage() {
    const [isSigningIn, setIsSigningIn] = useState(false)
    const router = useRouter()
    const supabase = createClient()

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session) router.replace('/dashboard')
        })
    }, [])

    const handleSignIn = async () => {
        setIsSigningIn(true)
        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        })
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 flex items-center justify-center p-4 relative overflow-hidden">

            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-20 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-float"></div>
                <div className="absolute top-32 right-40 w-72 h-72 bg-emerald-500/15 rounded-full blur-3xl animate-float-delayed"></div>
                <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl animate-float-slow"></div>
                <div className="absolute top-24 right-1/4 w-1 h-1 bg-cyan-400 rounded-full animate-twinkle shadow-lg shadow-cyan-400/50"></div>
                <div className="absolute top-40 left-1/4 w-1 h-1 bg-emerald-400 rounded-full animate-twinkle-delayed shadow-lg shadow-emerald-400/50"></div>
                <div className="absolute top-56 right-1/3 w-1 h-1 bg-teal-400 rounded-full animate-twinkle-slow shadow-lg shadow-teal-400/50"></div>
                <div className="absolute top-72 left-1/2 w-1 h-1 bg-cyan-400 rounded-full animate-twinkle shadow-lg shadow-cyan-400/50"></div>
                <div className="absolute bottom-32 right-1/4 w-1 h-1 bg-emerald-400 rounded-full animate-twinkle-delayed shadow-lg shadow-emerald-400/50"></div>
                <div className="absolute bottom-0 left-0 w-full h-48">
                    <div className="absolute bottom-0 right-1/4 w-64 h-32 bg-slate-800/60 rounded-t-full blur-md"></div>
                    <div className="absolute bottom-0 left-1/3 w-48 h-40 bg-gray-800/50 rounded-t-full blur-md"></div>
                    <div className="absolute bottom-0 right-1/3 w-56 h-36 bg-slate-800/70 rounded-t-full blur-md"></div>
                </div>
                <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:50px_50px] opacity-40"></div>
            </div>

            {/* Login Card */}
            <div className="relative bg-slate-800/40 backdrop-blur-xl rounded-3xl shadow-2xl p-8 sm:p-10 w-full max-w-md border border-slate-700/50 transform hover:scale-[1.02] transition-transform duration-300">
                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-emerald-400 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/30 border border-cyan-300/20">
                        <KeyRound className="w-8 h-8 text-gray-900" strokeWidth={2} />
                    </div>
                </div>
                <div className="text-center mb-8">
                    <h1 className="text-4xl sm:text-5xl font-light text-white tracking-widest mb-2 drop-shadow-lg">
                        WELCOME
                    </h1>
                    <p className="text-slate-300 text-sm sm:text-base font-light tracking-wide">
                        Please sign in to continue
                    </p>
                </div>
                <button
                    onClick={handleSignIn}
                    disabled={isSigningIn}
                    className="w-full py-3.5 bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 text-gray-900 rounded-full font-semibold transition-all duration-300 shadow-xl shadow-cyan-500/20 hover:shadow-2xl hover:shadow-cyan-500/30 transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:transform-none flex items-center justify-center gap-2 group"
                >
                    {isSigningIn ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Signing In...
                        </>
                    ) : (
                        <>
                            <LogIn className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            Sign in with Google
                        </>
                    )}
                </button>
                <div className="mt-6 text-center space-y-3">
                    <p className="text-slate-500 text-xs">
                        Secure authentication powered by Supabase
                    </p>
                    <div className="pt-3 border-t border-slate-700">
                        <p className="text-slate-400 text-sm mb-1">Need help?</p>
                        <a
                            href="mailto:jobapplicationtracker09@gmail.com"
                            className="text-cyan-400 hover:text-cyan-300 text-sm font-medium underline decoration-cyan-400/30 hover:decoration-cyan-400/60 transition-all"
                        >
                            Contact us at jobapplicationtracker09@gmail.com
                        </a>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-4 sm:bottom-6 text-center w-full px-4">
                <p className="text-slate-500 text-sm font-light tracking-wide">
                    designed with <span className="text-red-500">❤️</span> by <span className="font-semibold text-slate-400">kr</span>
                </p>
            </div>

            <style jsx global>{`
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-20px); } }
        @keyframes float-delayed { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-15px); } }
        @keyframes float-slow { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
        @keyframes twinkle { 0%, 100% { opacity: 0.3; transform: scale(1); } 50% { opacity: 1; transform: scale(1.5); } }
        @keyframes twinkle-delayed { 0%, 100% { opacity: 0.4; transform: scale(1); } 50% { opacity: 1; transform: scale(1.3); } }
        @keyframes twinkle-slow { 0%, 100% { opacity: 0.2; transform: scale(1); } 50% { opacity: 0.8; transform: scale(1.2); } }
        .animate-float { animation: float 8s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 10s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 12s ease-in-out infinite; }
        .animate-twinkle { animation: twinkle 2s ease-in-out infinite; }
        .animate-twinkle-delayed { animation: twinkle-delayed 3s ease-in-out infinite; }
        .animate-twinkle-slow { animation: twinkle-slow 4s ease-in-out infinite; }
      `}</style>
        </div>
    )
}
