import { Link } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LogIn, LogOut, User } from "lucide-react";
import drafterLogo from "@assets/drafter-logo.png";

export function Header() {
  const { user, isAuthenticated, isLoading } = useAuth();

  const handleLogin = () => {
    window.location.href = "/api/login";
  };

  const handleLogout = () => {
    window.location.href = "/api/logout";
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2 text-xl font-semibold hover-elevate rounded-md px-3 py-2" data-testid="link-home">
          <img
            src={drafterLogo}
            alt="Drafter Logo"
            className="h-24 w-24 object-contain"
            data-testid="logo-image"
          />
          Drafter
        </Link>

        <div className="flex items-center gap-4">
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
          ) : (
            <Button
              onClick={handleLogin}
              variant="default"
              size="sm"
              data-testid="button-login"
            >
              <LogIn className="h-4 w-4 mr-2" />
              Login
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
