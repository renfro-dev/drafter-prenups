// Auth hook - Based on blueprint:javascript_log_in_with_replit
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import type { User } from "@shared/schema";
import { apiRequest, getQueryFn } from "@/lib/queryClient";
import { supabase } from "@/lib/supabase";
import { queryClient } from "@/lib/queryClient";

export function useAuth() {
  const { data: user, isLoading, error } = useQuery<User | null>({
    queryKey: ["/api/auth/user"],
    queryFn: getQueryFn({ on401: "returnNull" }),
    retry: false,
  });

  // Listen for auth state changes from Supabase
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      // When auth state changes, refetch user data and any review data
      if (event === 'SIGNED_IN' || event === 'SIGNED_OUT' || event === 'TOKEN_REFRESHED') {
        queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });
        // Also invalidate review-related data so masked clauses re-fetch when the user signs in
        queryClient.invalidateQueries({
          predicate: (q) => {
            const k = q.queryKey?.[0];
            return typeof k === 'string' && k.startsWith('/api/review');
          },
        });
      }

      // Fire-and-forget welcome email on initial sign-in (server is idempotent)
      if (event === 'SIGNED_IN') {
        // no await: we don't want to block UI; errors are logged only
        apiRequest('POST', '/api/auth/welcome').catch(() => {});
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return {
    user: user ?? undefined,
    isLoading,
    isAuthenticated: !!user,
    error,
  };
}
