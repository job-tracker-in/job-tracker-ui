"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { LogIn, KeyRound, Loader2 } from "lucide-react";

export default function LoginPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [isSigningIn, setIsSigningIn] = useState(false);

    // Redirect if already authenticated
    useEffect(() => {
        if (session && status === "authenticated") {
            router.replace("/dashboard");
        }
    }, [session, status, router]);

    const handleSignIn = async () => {
        setIsSigningIn(true);
        try {
            await signIn("keycloak", {
                callbackUrl: "/dashboard",
            });
        } catch (error) {
            console.error("Sign in error:", error);
            setIsSigningIn(false);
        }
    };

    const handleForgotPassword = () => {
        const keycloakIssuer = process.env.NEXT_PUBLIC_KEYCLOAK_ISSUER;
        const clientId = process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID;
        const appUrl = process.env.NEXT_PUBLIC_APP_URL;

        if (keycloakIssuer && clientId && appUrl) {
            window.location.href =
                `${keycloakIssuer}/protocol/openid-connect/auth?client_id=${clientId}&response_type=code&scope=openid&kc_action=RESET_PASSWORD&redirect_uri=${appUrl}/login`;
        }
    };

    // Show loading state during authentication check
    if (status === "loading") {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
            </div>
        );
    }

    // Don't render login form if already authenticated
    if (session) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 flex items-center justify-center p-4 relative overflow-hidden">

            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Floating Clouds */}
                <div className="absolute top-20 left-20 w-32 h-12 bg-white/30 rounded-full blur-xl animate-float"></div>
                <div className="absolute top-32 right-40 w-24 h-10 bg-white/20 rounded-full blur-xl animate-float-delayed"></div>
                <div className="absolute top-48 left-1/3 w-28 h-10 bg-white/25 rounded-full blur-xl animate-float-slow"></div>

                {/* Twinkling Stars */}
                <div className="absolute top-24 right-1/4 w-1 h-1 bg-white rounded-full animate-twinkle"></div>
                <div className="absolute top-40 left-1/4 w-1 h-1 bg-white rounded-full animate-twinkle-delayed"></div>
                <div className="absolute top-56 right-1/3 w-1 h-1 bg-white rounded-full animate-twinkle-slow"></div>
                <div className="absolute top-72 left-1/2 w-1 h-1 bg-white rounded-full animate-twinkle"></div>

                {/* Mountain Silhouettes */}
                <div className="absolute bottom-0 left-0 w-full h-48">
                    <div className="absolute bottom-0 right-1/4 w-64 h-32 bg-blue-800/40 rounded-t-full blur-md"></div>
                    <div className="absolute bottom-0 left-1/3 w-48 h-40 bg-blue-900/30 rounded-t-full blur-md"></div>
                    <div className="absolute bottom-0 right-1/3 w-56 h-36 bg-blue-800/50 rounded-t-full blur-md"></div>
                </div>

                {/* Subtle Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px] opacity-20"></div>
            </div>

            {/* Login Card */}
            <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 sm:p-10 w-full max-w-md border border-white/20 transform hover:scale-[1.02] transition-transform duration-300">

                {/* Logo/Icon */}
                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-lg border border-white/30">
                        <KeyRound className="w-8 h-8 text-white" strokeWidth={1.5} />
                    </div>
                </div>

                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl sm:text-5xl font-light text-white tracking-widest mb-2 drop-shadow-lg">
                        WELCOME
                    </h1>
                    <p className="text-blue-50 text-sm sm:text-base font-light tracking-wide">
                        Please sign in to continue
                    </p>
                </div>

                {/* Sign In Button */}
                <button
                    onClick={handleSignIn}
                    disabled={isSigningIn}
                    className="w-full py-3.5 bg-white hover:bg-white/95 text-blue-600 rounded-full font-semibold transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:transform-none flex items-center justify-center gap-2 group"
                >
                    {isSigningIn ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Signing In...
                        </>
                    ) : (
                        <>
                            <LogIn className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            Sign In
                        </>
                    )}
                </button>

                {/* Divider */}
                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-white/20"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-transparent text-blue-100 font-light">or</span>
                    </div>
                </div>

                {/* Forgot Password */}
                <button
                    onClick={handleForgotPassword}
                    disabled={isSigningIn}
                    className="w-full py-3 bg-white/5 hover:bg-white/10 text-white rounded-full font-medium transition-all duration-300 border border-white/20 hover:border-white/40 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Forgot your password?
                </button>

                {/* Additional Info */}
                <div className="mt-6 text-center space-y-3">
                    <p className="text-blue-50/70 text-xs">
                        Secure authentication powered by Keycloak
                    </p>

                    {/* Contact Support */}
                    <div className="pt-3 border-t border-white/10">
                        <p className="text-blue-50 text-sm mb-1">Need help?</p>
                        <a
                            href="mailto:support@example.com"
                            className="text-white hover:text-blue-100 text-sm font-medium underline decoration-white/30 hover:decoration-white/60 transition-all"
                        >
                            Contact us at support@example.com
                        </a>
                    </div>
                </div>
            </div>

            {/* Footer Credit */}
            <div className="absolute bottom-4 sm:bottom-6 text-center w-full px-4">
                <p className="text-white/80 text-sm font-light tracking-wide">
                    designed with ❤️ by <span className="font-semibold">kr</span>
                </p>
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
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 10s ease-in-out infinite;
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