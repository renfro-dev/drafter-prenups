import { useState } from "react";
import { useParams } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Flag, 
  MessageSquare, 
  HelpCircle, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp,
  Sparkles,
  AlertCircle,
  LogIn,
  Lock
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";

interface PrenupClause {
  id: string;
  intakeId: string;
  clauseNumber: number;
  title: string;
  legalText: string;
  plainExplanation: string | null;
  category: string | null;
  createdAt: Date;
}

interface ClauseComment {
  id: string;
  prenupClauseId: string;
  userId: string;
  comment: string;
  createdAt: Date;
}

interface ClauseFlag {
  id: string;
  prenupClauseId: string;
  userId: string;
  reason: string | null;
  resolved: boolean;
  createdAt: Date;
}

interface ClauseQuestion {
  id: string;
  prenupClauseId: string;
  userId: string;
  question: string;
  answer: string | null;
  createdAt: Date;
}

function ClauseCard({ clause, isAuthenticated }: { clause: PrenupClause; isAuthenticated: boolean }) {
  const { toast } = useToast();
  const [showExplanation, setShowExplanation] = useState(false);
  const [flagDialogOpen, setFlagDialogOpen] = useState(false);
  const [commentDialogOpen, setCommentDialogOpen] = useState(false);
  const [questionDialogOpen, setQuestionDialogOpen] = useState(false);
  const [flagReason, setFlagReason] = useState("");
  const [commentText, setCommentText] = useState("");
  const [questionText, setQuestionText] = useState("");
  const [loginPromptOpen, setLoginPromptOpen] = useState(false);

  // Fetch comments (only if authenticated)
  const { data: comments = [] } = useQuery<ClauseComment[]>({
    queryKey: ['/api/clauses', clause.id, 'comments'],
    enabled: isAuthenticated,
  });

  // Fetch flags (only if authenticated)
  const { data: flags = [] } = useQuery<ClauseFlag[]>({
    queryKey: ['/api/clauses', clause.id, 'flags'],
    enabled: isAuthenticated,
  });

  // Fetch questions (only if authenticated)
  const { data: questions = [] } = useQuery<ClauseQuestion[]>({
    queryKey: ['/api/clauses', clause.id, 'questions'],
    enabled: isAuthenticated,
  });

  // Get explanation mutation
  const explainMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest('POST', `/api/clauses/${clause.id}/explain`);
      return response;
    },
    onSuccess: (data) => {
      // Update the clause with the explanation
      if (data.explanation) {
        clause.plainExplanation = data.explanation;
      }
      setShowExplanation(true);
      toast({ title: "Explanation generated" });
    },
  });

  // Flag mutation
  const flagMutation = useMutation({
    mutationFn: async (reason: string) => {
      return await apiRequest('POST', `/api/clauses/${clause.id}/flag`, { reason });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/clauses', clause.id, 'flags'] });
      setFlagDialogOpen(false);
      setFlagReason("");
      toast({ title: "Clause flagged for discussion" });
    },
  });

  // Comment mutation
  const commentMutation = useMutation({
    mutationFn: async (comment: string) => {
      return await apiRequest('POST', `/api/clauses/${clause.id}/comment`, { comment });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/clauses', clause.id, 'comments'] });
      setCommentDialogOpen(false);
      setCommentText("");
      toast({ title: "Comment added" });
    },
  });

  // Question mutation
  const questionMutation = useMutation({
    mutationFn: async (question: string) => {
      return await apiRequest('POST', `/api/clauses/${clause.id}/question`, { question });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/clauses', clause.id, 'questions'] });
      setQuestionDialogOpen(false);
      setQuestionText("");
      toast({ title: "Question submitted - AI is generating an answer" });
    },
  });

  const isFlagged = flags.some(f => !f.resolved);
  const hasComments = comments.length > 0;
  const hasQuestions = questions.length > 0;

  return (
    <>
      <Card 
        className={`relative ${
          isFlagged ? 'bg-[hsl(var(--warning))]/5 border-[hsl(var(--warning))]/30' : 
          hasComments ? 'bg-[hsl(var(--comment))]/5 border-[hsl(var(--comment))]/30' : 
          ''
        }`}
        data-testid={`card-clause-${clause.id}`}
      >
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="text-xs" data-testid={`badge-clause-number-${clause.clauseNumber}`}>
                  Clause {clause.clauseNumber}
                </Badge>
                {isFlagged && (
                  <Badge variant="outline" className="text-xs bg-[hsl(var(--warning))]/10 text-[hsl(var(--warning))]" data-testid={`badge-flagged-${clause.id}`}>
                    <Flag className="h-3 w-3 mr-1" />
                    Flagged
                  </Badge>
                )}
              </div>
              <CardTitle className="text-lg font-medium" data-testid={`text-clause-title-${clause.id}`}>
                {clause.title}
              </CardTitle>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Legal Text */}
          <div>
            <h4 className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-3">
              Legal Language
            </h4>
            <div 
              className="font-serif text-base leading-relaxed text-secondary-foreground"
              data-testid={`text-legal-${clause.id}`}
            >
              {clause.legalText}
            </div>
          </div>

          {/* AI Explanation */}
          {showExplanation || clause.plainExplanation ? (
            <div className="bg-muted/40 rounded-lg p-4 border border-border">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <h4 className="text-xs font-medium uppercase tracking-wide">Plain English</h4>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground" data-testid={`text-explanation-${clause.id}`}>
                {clause.plainExplanation || "Generating explanation..."}
              </p>
            </div>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => isAuthenticated ? explainMutation.mutate() : setLoginPromptOpen(true)}
              disabled={explainMutation.isPending}
              className="w-full"
              data-testid={`button-explain-${clause.id}`}
            >
              <Sparkles className="h-4 w-4 mr-2" />
              {explainMutation.isPending ? "Generating..." : "Get Plain English Explanation"}
            </Button>
          )}

          <Separator />

          {/* Interactions Section */}
          <div className="space-y-4">
            {/* Questions Accordion */}
            {hasQuestions && (
              <Accordion type="single" collapsible className="border rounded-lg">
                <AccordionItem value="questions" className="border-0">
                  <AccordionTrigger className="px-4 py-3 hover:no-underline" data-testid={`button-toggle-questions-${clause.id}`}>
                    <div className="flex items-center gap-2">
                      <HelpCircle className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">Questions & Answers ({questions.length})</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <div className="space-y-3">
                      {questions.map((q) => (
                        <div key={q.id} className="space-y-2" data-testid={`item-question-${q.id}`}>
                          <div className="flex items-start gap-2">
                            <HelpCircle className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                            <p className="text-sm font-medium">{q.question}</p>
                          </div>
                          {q.answer && (
                            <div className="flex items-start gap-2 ml-6 bg-muted/40 rounded p-2">
                              <Sparkles className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                              <p className="text-sm text-muted-foreground">{q.answer}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )}

            {/* Comments Accordion */}
            {hasComments && (
              <Accordion type="single" collapsible className="border rounded-lg">
                <AccordionItem value="comments" className="border-0">
                  <AccordionTrigger className="px-4 py-3 hover:no-underline" data-testid={`button-toggle-comments-${clause.id}`}>
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-[hsl(var(--comment))]" />
                      <span className="text-sm font-medium">Comments ({comments.length})</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <div className="space-y-2">
                      {comments.map((c) => (
                        <div 
                          key={c.id} 
                          className="bg-muted/40 rounded p-3 border-l-2 border-l-[hsl(var(--comment))]"
                          data-testid={`item-comment-${c.id}`}
                        >
                          <p className="text-sm">{c.comment}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(c.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2 flex-wrap">
              <Button
                variant="outline"
                size="sm"
                onClick={() => isAuthenticated ? setFlagDialogOpen(true) : setLoginPromptOpen(true)}
                className={isFlagged ? "border-[hsl(var(--warning))] text-[hsl(var(--warning))]" : ""}
                data-testid={`button-flag-${clause.id}`}
              >
                <Flag className="h-4 w-4 mr-2" />
                {isFlagged ? "Flagged" : "Flag for Discussion"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => isAuthenticated ? setCommentDialogOpen(true) : setLoginPromptOpen(true)}
                data-testid={`button-comment-${clause.id}`}
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Add Comment
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => isAuthenticated ? setQuestionDialogOpen(true) : setLoginPromptOpen(true)}
                data-testid={`button-ask-${clause.id}`}
              >
                <HelpCircle className="h-4 w-4 mr-2" />
                Ask Question
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Flag Dialog */}
      <Dialog open={flagDialogOpen} onOpenChange={setFlagDialogOpen}>
        <DialogContent data-testid={`dialog-flag-${clause.id}`}>
          <DialogHeader>
            <DialogTitle>Flag Clause for Discussion</DialogTitle>
            <DialogDescription>
              Let your partner know you want to discuss this clause. You can optionally provide a reason.
            </DialogDescription>
          </DialogHeader>
          <Textarea
            placeholder="Why do you want to discuss this clause? (optional)"
            value={flagReason}
            onChange={(e) => setFlagReason(e.target.value)}
            className="min-h-[100px]"
            data-testid={`input-flag-reason-${clause.id}`}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setFlagDialogOpen(false)} data-testid={`button-cancel-flag-${clause.id}`}>
              Cancel
            </Button>
            <Button 
              onClick={() => flagMutation.mutate(flagReason)}
              disabled={flagMutation.isPending}
              data-testid={`button-submit-flag-${clause.id}`}
            >
              Flag Clause
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Comment Dialog */}
      <Dialog open={commentDialogOpen} onOpenChange={setCommentDialogOpen}>
        <DialogContent data-testid={`dialog-comment-${clause.id}`}>
          <DialogHeader>
            <DialogTitle>Add a Comment</DialogTitle>
            <DialogDescription>
              Share your thoughts about this clause with your partner.
            </DialogDescription>
          </DialogHeader>
          <Textarea
            placeholder="Your comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="min-h-[100px]"
            data-testid={`input-comment-text-${clause.id}`}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setCommentDialogOpen(false)} data-testid={`button-cancel-comment-${clause.id}`}>
              Cancel
            </Button>
            <Button 
              onClick={() => commentMutation.mutate(commentText)}
              disabled={commentMutation.isPending || !commentText.trim()}
              data-testid={`button-submit-comment-${clause.id}`}
            >
              Add Comment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Question Dialog */}
      <Dialog open={questionDialogOpen} onOpenChange={setQuestionDialogOpen}>
        <DialogContent data-testid={`dialog-question-${clause.id}`}>
          <DialogHeader>
            <DialogTitle>Ask a Question</DialogTitle>
            <DialogDescription>
              Our AI will provide a plain-language explanation to help you understand this clause.
            </DialogDescription>
          </DialogHeader>
          <Textarea
            placeholder="What would you like to know about this clause?"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            className="min-h-[100px]"
            data-testid={`input-question-text-${clause.id}`}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setQuestionDialogOpen(false)} data-testid={`button-cancel-question-${clause.id}`}>
              Cancel
            </Button>
            <Button 
              onClick={() => questionMutation.mutate(questionText)}
              disabled={questionMutation.isPending || !questionText.trim()}
              data-testid={`button-submit-question-${clause.id}`}
            >
              Ask Question
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Login Prompt Dialog */}
      <Dialog open={loginPromptOpen} onOpenChange={setLoginPromptOpen}>
        <DialogContent data-testid="dialog-login-prompt">
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <LogIn className="h-6 w-6 text-primary" />
              </div>
            </div>
            <DialogTitle className="text-center">Login to Collaborate</DialogTitle>
            <DialogDescription className="text-center">
              You need to log in to use collaborative features like explanations, comments, flags, and questions.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-center">
            <Button 
              onClick={() => {
                const returnTo = encodeURIComponent(window.location.pathname);
                window.location.href = `/api/login?returnTo=${returnTo}`;
              }}
              className="w-full sm:w-auto"
              data-testid="button-login-from-dialog"
            >
              <LogIn className="h-4 w-4 mr-2" />
              Login with Replit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default function Review() {
  const params = useParams<{ prenupId: string }>();
  const prenupId = params.prenupId;
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();

  const { data: clauses = [], isLoading, error } = useQuery<PrenupClause[]>({
    queryKey: ['/api/review', prenupId, 'clauses'],
    enabled: !!prenupId,
  });

  const handleLogin = () => {
    const returnTo = encodeURIComponent(window.location.pathname);
    window.location.href = `/api/login?returnTo=${returnTo}`;
  };

  // Show loading while fetching prenup
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center" data-testid="loading-review">
        <div className="text-center">
          <div className="animate-pulse">
            <Sparkles className="h-12 w-12 mx-auto mb-4 text-primary" />
          </div>
          <p className="text-lg text-muted-foreground">Loading your prenup...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center" data-testid="error-review">
        <div className="text-center max-w-md">
          <AlertCircle className="h-12 w-12 mx-auto mb-4 text-destructive" />
          <h2 className="text-xl font-semibold mb-2">Unable to Load Prenup</h2>
          <p className="text-muted-foreground mb-4">
            We couldn't load your prenuptial agreement. Please check that you have access to this document.
          </p>
          <p className="text-sm text-muted-foreground">
            Logged in as: <span className="font-medium">{user?.email}</span>
          </p>
        </div>
      </div>
    );
  }

  // Show helpful message if no clauses were parsed (but no error occurred)
  if (!isLoading && !error && clauses.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center" data-testid="no-clauses-fallback">
        <Card className="max-w-2xl">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 rounded-full bg-amber-500/10 flex items-center justify-center">
                <AlertCircle className="h-8 w-8 text-amber-500" />
              </div>
            </div>
            <CardTitle className="text-center text-2xl">Collaborative Review Not Available</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-center text-muted-foreground">
              Your prenuptial agreement was generated successfully, but the clause-by-clause review features aren't available for this document.
            </p>
            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              <p className="text-sm font-medium">What happened?</p>
              <p className="text-sm text-muted-foreground">
                The system wasn't able to parse your prenup into individual clauses for review. This can happen if the document format doesn't match expected patterns.
              </p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              <p className="text-sm font-medium">What can you do?</p>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>You should have received your prenup document via email</li>
                <li>You can download it directly from your confirmation page</li>
                <li>Review the document with your partner using the Word file</li>
                <li>Consider having an attorney review it before signing</li>
              </ul>
            </div>
            <p className="text-xs text-center text-muted-foreground pt-4">
              Prenup ID: {prenupId} • Logged in as: {user?.email}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // TODO: Replace with actual flag/review tracking from API
  const flaggedClauses = []; // Will be populated from actual flags
  const reviewedClauses = []; // Will be populated from actual reviews
  const progressPercentage = 0; // Will be calculated from actual review progress

  return (
    <div className="min-h-screen bg-background" data-testid="page-review">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold" data-testid="text-header-title">Prenup Review</h1>
            <Badge variant="outline" className="text-xs" data-testid="badge-clause-count">
              {clauses.length} Clauses
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-[hsl(var(--success))]/10 text-[hsl(var(--success))] border-[hsl(var(--success))]/20" data-testid="badge-progress">
              {progressPercentage}% Reviewed
            </Badge>
          </div>
        </div>
      </header>

      {/* Authentication Gate Banner */}
      {!isAuthenticated && (
        <div className="border-b bg-primary/5 border-primary/20" data-testid="auth-gate-banner">
          <div className="container max-w-5xl py-4 px-6">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10">
                  <Lock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold">🔒 Privacy Protection Active</h3>
                  <p className="text-xs text-muted-foreground">
                    Personal information is encrypted to protect your privacy. Sign in to view your personalized prenup and unlock collaborative features.
                  </p>
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => window.location.href = `/api/login?returnTo=${encodeURIComponent(window.location.pathname)}`}
                  data-testid="button-sign-in"
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
                <Button 
                  size="sm"
                  onClick={() => window.location.href = `/api/login?returnTo=${encodeURIComponent(window.location.pathname)}`}
                  data-testid="button-create-account"
                >
                  Create Account
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container max-w-5xl py-8 px-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card data-testid="card-total-clauses">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Clauses</p>
                  <p className="text-3xl font-bold mt-1">{clauses.length}</p>
                </div>
                <CheckCircle2 className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card data-testid="card-flagged">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Flagged</p>
                  <p className="text-3xl font-bold mt-1 text-[hsl(var(--warning))]">{flaggedClauses.length}</p>
                </div>
                <Flag className="h-8 w-8 text-[hsl(var(--warning))]" />
              </div>
            </CardContent>
          </Card>

          <Card data-testid="card-reviewed">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Reviewed</p>
                  <p className="text-3xl font-bold mt-1 text-[hsl(var(--success))]">{reviewedClauses.length}</p>
                </div>
                <CheckCircle2 className="h-8 w-8 text-[hsl(var(--success))]" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Clauses List */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold" data-testid="text-clauses-heading">Review Each Clause</h2>
            <p className="text-sm text-muted-foreground">
              Read the legal language and get AI explanations
            </p>
          </div>

          {clauses.map((clause) => (
            <ClauseCard key={clause.id} clause={clause} isAuthenticated={isAuthenticated} />
          ))}
        </div>
      </div>
    </div>
  );
}
