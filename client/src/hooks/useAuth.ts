// Auth hook - Based on blueprint:javascript_log_in_with_replit
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import type { User } from "@shared/schema";
import { getQueryFn } from "@/lib/queryClient";
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
      // When auth state changes, refetch user data
      if (event === 'SIGNED_IN' || event === 'SIGNED_OUT' || event === 'TOKEN_REFRESHED') {
        queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });
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
