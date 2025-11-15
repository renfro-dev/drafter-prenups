import { Link } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LogIn, LogOut, User, Shield, Lock, ChevronRight } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { queryClient } from "@/lib/queryClient";

export function Header() {
  const { user, isAuthenticated, isLoading } = useAuth();

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({ provider: "google", options: { redirectTo: window.location.origin } });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2 text-xl font-semibold hover-elevate rounded-md px-3 py-2" data-testid="link-home">
          <Shield className="h-5 w-5 text-primary" />
          Drafter
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/privacy-policy" data-testid="link-privacy-policy">
            <Button variant="ghost" size="sm" className="text-sm">
              Data Privacy Policy
            </Button>
          </Link>
          
          <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
            <Lock className="h-4 w-4" />
            <span>Private & Secure</span>
          </div>
          
          <Link href="/intake" data-testid="link-start-prenup">
            <Button size="default" data-testid="button-get-started">
              Get Started
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>

          {isLoading ? (
            <Badge variant="outline" className="text-xs">Loading...</Badge>
          ) : isAuthenticated && user ? (
            <>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground" data-testid="text-user-email">
                  {user.email}
                </span>
              </div>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                data-testid="button-logout"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </>
          ) : null}
        </div>
      </div>
    </header>
  );
}
