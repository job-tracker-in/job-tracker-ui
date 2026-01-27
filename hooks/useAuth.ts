"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const useAuth = () => {
    const { data: session, status, update } = useSession();
    const router = useRouter();

    // Refresh session every 5 minutes to keep token fresh
    useEffect(() => {
        const interval = setInterval(() => {
            console.log("Refreshing session...");
            update();
        }, 5 * 60 * 1000); // 5 minutes

        return () => clearInterval(interval);
    }, [update]);

    // Handle logout
    const handleLogout = async () => {
        const keycloakIssuer = process.env.NEXT_PUBLIC_KEYCLOAK_ISSUER;
        const clientId = process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID;
        const appUrl = process.env.NEXT_PUBLIC_APP_URL;

        const keycloakLogoutUrl =
            `${keycloakIssuer}/protocol/openid-connect/logout?` +
            `client_id=${clientId}&` +
            `post_logout_redirect_uri=${encodeURIComponent(appUrl + "/login")}`;

        await signOut({ redirect: false });
        window.location.href = keycloakLogoutUrl;
    };

    // Check if token refresh failed
    useEffect(() => {
        if (session?.error === "RefreshAccessTokenError") {
            console.error("Token refresh failed, logging out...");
            signOut({ callbackUrl: "/login" });
        }
    }, [session]);

    // Redirect if not authenticated
    useEffect(() => {
        if (status !== "loading" && !session) {
            router.replace("/login");
        }
    }, [status, session, router]);

    return {
        session,
        status,
        update,
        handleLogout,
        isLoading: status === "loading",
        isAuthenticated: !!session,
    };
};