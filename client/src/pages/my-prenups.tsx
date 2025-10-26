import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Loader2, FileText, Calendar, Users, CheckCircle2, Clock, AlertCircle, XCircle } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SEOHead } from "@/components/seo-head";
import type { Intake } from "@shared/schema";

export default function MyPrenups() {
  const { user, isLoading: authLoading, isAuthenticated } = useAuth();

  // Redirect to login if not authenticated
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500 mx-auto mb-4" />
          <p className="text-slate-300">Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    window.location.href = `/api/login?returnTo=${encodeURIComponent('/my-prenups')}`;
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500 mx-auto mb-4" />
          <p className="text-slate-300">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  const { data: prenups, isLoading } = useQuery<Intake[]>({
    queryKey: ['/api/my-prenups'],
    retry: false,
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
      case 'completed_no_email':
        return (
          <Badge variant="default" className="bg-green-600 hover:bg-green-700" data-testid={`badge-status-${status}`}>
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Complete
          </Badge>
        );
      case 'processing':
        return (
          <Badge variant="default" className="bg-blue-600 hover:bg-blue-700" data-testid="badge-status-processing">
            <Clock className="w-3 h-3 mr-1" />
            Processing
          </Badge>
        );
      case 'pending':
        return (
          <Badge variant="default" className="bg-amber-600 hover:bg-amber-700" data-testid="badge-status-pending">
            <AlertCircle className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        );
      case 'failed':
        return (
          <Badge variant="destructive" data-testid="badge-status-failed">
            <XCircle className="w-3 h-3 mr-1" />
            Failed
          </Badge>
        );
      default:
        return (
          <Badge variant="secondary" data-testid="badge-status-unknown">
            {status}
          </Badge>
        );
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  return (
    <>
      <SEOHead
        title="My Prenups - Drafter Dashboard"
        description="View and manage your prenuptial agreements"
      />
      
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="container mx-auto px-4 py-12 max-w-6xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2" data-testid="heading-dashboard">
              My Prenups
            </h1>
            <p className="text-slate-300">
              View and manage your prenuptial agreements
            </p>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            </div>
          )}

          {/* Empty State */}
          {!isLoading && prenups && prenups.length === 0 && (
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="py-12 text-center">
                <FileText className="w-16 h-16 mx-auto mb-4 text-slate-500" />
                <h3 className="text-xl font-semibold text-white mb-2" data-testid="text-empty-state">
                  No prenups yet
                </h3>
                <p className="text-slate-400 mb-6">
                  Ready to create your first prenuptial agreement?
                </p>
                <Link href="/intake">
                  <Button size="lg" data-testid="button-create-first">
                    Create Your First Prenup
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}

          {/* Prenups List */}
          {!isLoading && prenups && prenups.length > 0 && (
            <div className="space-y-4">
              {/* Create New Button */}
              <div className="flex justify-end mb-6">
                <Link href="/intake">
                  <Button data-testid="button-create-new">
                    Create New Prenup
                  </Button>
                </Link>
              </div>

              {/* Prenup Cards */}
              {prenups.map((prenup) => (
                <Card
                  key={prenup.id}
                  className="bg-slate-800/50 border-slate-700 hover-elevate"
                  data-testid={`card-prenup-${prenup.id}`}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-white flex items-center gap-3">
                          <FileText className="w-5 h-5 text-blue-500" />
                          <span data-testid={`text-prenup-title-${prenup.id}`}>
                            {prenup.partyAName} & {prenup.partyBName}
                          </span>
                        </CardTitle>
                        <CardDescription className="text-slate-400 mt-2">
                          Created {formatDate(prenup.createdAt?.toString() || '')}
                        </CardDescription>
                      </div>
                      {getStatusBadge(prenup.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-slate-300">
                        <Users className="w-4 h-4 text-slate-500" />
                        <span className="text-sm">
                          {prenup.partyAName} & {prenup.partyBName}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-300">
                        <Calendar className="w-4 h-4 text-slate-500" />
                        <span className="text-sm">
                          Wedding: {formatDate(prenup.weddingDate || '')}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      {(prenup.status === 'completed' || prenup.status === 'completed_no_email') && (
                        <Link href={`/review/${prenup.id}`}>
                          <Button
                            variant="default"
                            size="sm"
                            data-testid={`button-review-${prenup.id}`}
                          >
                            <FileText className="w-4 h-4 mr-2" />
                            Review Prenup
                          </Button>
                        </Link>
                      )}
                      {prenup.status === 'processing' && (
                        <Button
                          variant="outline"
                          size="sm"
                          disabled
                          data-testid={`button-processing-${prenup.id}`}
                        >
                          <Clock className="w-4 h-4 mr-2 animate-spin" />
                          Processing...
                        </Button>
                      )}
                      {prenup.status === 'failed' && (
                        <Link href="/intake">
                          <Button
                            variant="outline"
                            size="sm"
                            data-testid={`button-retry-${prenup.id}`}
                          >
                            Try Again
                          </Button>
                        </Link>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
