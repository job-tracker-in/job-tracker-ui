"use client";

import { useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignedOutPage() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    // If session exists here, kill it again (rare Keycloak refresh case)
    if (session) {
      signOut({ redirect: false });
      return;
    }

    // Now safe to send user to login
    const timer = setTimeout(() => {
      router.replace("/login");
    }, 500);

    return () => clearTimeout(timer);
  }, [session, router]);

  return (
    <div className="h-screen flex items-center justify-center">
      <p className="text-gray-700">Signing you out…</p>
    </div>
  );
}
