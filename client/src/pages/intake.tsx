import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useLocation } from "wouter";
import { Shield, ArrowLeft, ArrowRight, Check, Loader2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { insertIntakeSchema, type InsertIntake, type Asset, type Debt } from "@shared/schema";
import { AssetInputs } from "@/components/asset-inputs";
import { DebtInputs } from "@/components/debt-inputs";
import { PrivacyNotice } from "@/components/privacy-notice";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { SEOHead } from "@/components/seo-head";
import { useAuth } from "@/hooks/useAuth";

const STEPS = [
  { id: 1, title: "Personal Info", description: "Basic information about you and your partner" },
  { id: 2, title: "Assets & Debts", description: "Financial details for disclosure" },
  { id: 3, title: "Preferences", description: "Additional agreement terms" },
  { id: 4, title: "Review & Submit", description: "Confirm and generate your prenup" },
];

export default function Intake() {
  const { user, isLoading: authLoading, isAuthenticated } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  // Initialize form hook (must be at top level, before any conditional returns)
  const form = useForm<InsertIntake>({
    resolver: zodResolver(insertIntakeSchema),
    defaultValues: {
      email: "",
      state: "CA",
      partyAName: "",
      partyBName: "",
      weddingDate: "",
      assets: [],
      debts: [],
      spousalSupportWaived: false,
      separatePropertyProtection: true,
      counselRepresented: false,
      additionalProvisions: "",
    },
  });

  const generateMutation = useMutation({
    mutationFn: async (data: InsertIntake) => {
      return await apiRequest("POST", "/api/generate", data);
    },
    onSuccess: (response: any) => {
      console.log('[Intake] API response:', response);
      
      // Redirect directly to review page if we have an intakeId
      if (response.intakeId) {
        console.log('[Intake] Redirecting to review page:', `/review/${response.intakeId}`);
        setLocation(`/review/${response.intakeId}`);
      } else {
        // Fallback to success page if no intakeId (shouldn't happen)
        console.warn('[Intake] No intakeId in response, falling back to success page');
        localStorage.setItem('prenup-result', JSON.stringify(response));
        setLocation("/success");
      }
    },
    onError: (error: Error) => {
      console.error('[Intake] Error:', error);
      toast({
        title: "Generation Failed",
        description: error.message || "Failed to generate prenup. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertIntake) => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      generateMutation.mutate(data);
    }
  };

  const goBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const validateCurrentStep = async () => {
    let fieldsToValidate: (keyof InsertIntake)[] = [];
    
    if (currentStep === 1) {
      fieldsToValidate = ["partyAName", "partyBName", "weddingDate", "state"];
    } else if (currentStep === 2) {
      fieldsToValidate = ["assets", "debts"];
    } else if (currentStep === 3) {
      fieldsToValidate = ["spousalSupportWaived", "separatePropertyProtection", "counselRepresented"];
    } else if (currentStep === 4) {
      fieldsToValidate = ["email"];
    }

    const result = await form.trigger(fieldsToValidate);
    return result;
  };

  const handleNext = async () => {
    const isValid = await validateCurrentStep();
    if (isValid) {
      if (currentStep < 4) {
        setCurrentStep(currentStep + 1);
      } else {
        form.handleSubmit(onSubmit)();
      }
    }
  };

  // Redirect to login if not authenticated (using useEffect to prevent infinite loops)
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      window.location.href = `/api/login?returnTo=${encodeURIComponent('/intake')}`;
    }
  }, [authLoading, isAuthenticated]);

  // Show loading state while checking authentication
  if (authLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500 mx-auto mb-4" />
          <p className="text-slate-300">
            {authLoading ? 'Checking authentication...' : 'Redirecting to login...'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEOHead
        title="Create Your Prenup - Free California Prenuptial Agreement Form | Drafter"
        description="Start creating your California prenup with our private AI-powered intake form. 10 minutes to complete, $49 total cost. Attorney-ready prenuptial agreements with PII masking."
      />
    <div className="min-h-screen bg-background">
      <header className="border-b bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" data-testid="link-home">
              <div className="flex items-center space-x-2 cursor-pointer">
                <Shield className="h-6 w-6 text-primary" />
                <span className="text-lg font-bold">Drafter</span>
              </div>
            </Link>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Shield className="h-4 w-4" />
              <span>Secure & Private</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              {STEPS.map((step, index) => (
                <div key={step.id} className="flex items-center" data-testid={`step-indicator-${step.id}`}>
                  <div className="flex flex-col items-center">
                    <div
                      className={`h-10 w-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                        currentStep > step.id
                          ? "bg-primary text-primary-foreground"
                          : currentStep === step.id
                          ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {currentStep > step.id ? <Check className="h-5 w-5" /> : step.id}
                    </div>
                    <div className="hidden md:block mt-2 text-center">
                      <div className="text-sm font-medium">{step.title}</div>
                      <div className="text-xs text-muted-foreground">{step.description}</div>
                    </div>
                  </div>
                  {index < STEPS.length - 1 && (
                    <div
                      className={`h-1 w-12 md:w-24 mx-2 transition-colors ${
                        currentStep > step.id ? "bg-primary" : "bg-muted"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {currentStep === 1 && (
                <Card data-testid="form-step-1">
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>
                      Enter basic information about you and your partner
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="partyAName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Your Full Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="e.g., Alice Johnson"
                                data-testid="input-party-a-name"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="partyBName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Partner's Full Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="e.g., Bob Smith"
                                data-testid="input-party-b-name"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="weddingDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Expected Wedding Date</FormLabel>
                            <FormControl>
                              <Input
                                type="date"
                                data-testid="input-wedding-date"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>Select your expected wedding date</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>State/Jurisdiction</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid="select-state">
                                  <SelectValue placeholder="Select state" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="CA" data-testid="option-california">California</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription>Currently supporting California only</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <PrivacyNotice />
                  </CardContent>
                </Card>
              )}

              {currentStep === 2 && (
                <Card data-testid="form-step-2">
                  <CardHeader>
                    <CardTitle>Assets & Debts</CardTitle>
                    <CardDescription>
                      List all significant assets and debts for full financial disclosure
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    <FormField
                      control={form.control}
                      name="assets"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-lg font-semibold">Assets</FormLabel>
                          <FormDescription>
                            Include real estate, bank accounts, investments, vehicles, etc.
                          </FormDescription>
                          <FormControl>
                            <AssetInputs
                              value={field.value}
                              onChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="h-px bg-border" />

                    <FormField
                      control={form.control}
                      name="debts"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-lg font-semibold">Debts</FormLabel>
                          <FormDescription>
                            Include student loans, credit cards, mortgages, auto loans, etc.
                          </FormDescription>
                          <FormControl>
                            <DebtInputs
                              value={field.value}
                              onChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              )}

              {currentStep === 3 && (
                <Card data-testid="form-step-3">
                  <CardHeader>
                    <CardTitle>Agreement Preferences</CardTitle>
                    <CardDescription>
                      Customize key terms of your prenuptial agreement
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <FormField
                      control={form.control}
                      name="separatePropertyProtection"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-lg border p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              data-testid="checkbox-separate-property"
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="font-semibold">
                              Protect Separate Property
                            </FormLabel>
                            <FormDescription>
                              Property acquired before marriage remains separate (recommended)
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="spousalSupportWaived"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-lg border p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              data-testid="checkbox-spousal-support"
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="font-semibold">
                              Waive Spousal Support
                            </FormLabel>
                            <FormDescription>
                              Both parties waive rights to alimony/spousal support
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="counselRepresented"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-lg border p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              data-testid="checkbox-counsel"
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="font-semibold">
                              Independent Legal Counsel
                            </FormLabel>
                            <FormDescription>
                              Both parties have or will obtain independent legal advice
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="additionalProvisions"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Additional Provisions (Optional)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Any specific terms or provisions you'd like to include..."
                              className="min-h-24"
                              data-testid="textarea-additional"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Our AI will attempt to incorporate these into the draft
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              )}

              {currentStep === 4 && (
                <Card data-testid="form-step-4">
                  <CardHeader>
                    <CardTitle>Review & Submit</CardTitle>
                    <CardDescription>
                      Review your information and provide email for delivery
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="rounded-lg border p-6 space-y-4 bg-muted/30">
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Party A:</span>
                          <span className="ml-2 font-medium" data-testid="text-review-party-a">
                            {form.watch("partyAName") || "Not provided"}
                          </span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Party B:</span>
                          <span className="ml-2 font-medium" data-testid="text-review-party-b">
                            {form.watch("partyBName") || "Not provided"}
                          </span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Wedding Date:</span>
                          <span className="ml-2 font-medium" data-testid="text-review-date">
                            {form.watch("weddingDate") || "Not provided"}
                          </span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Jurisdiction:</span>
                          <span className="ml-2 font-medium" data-testid="text-review-state">
                            {form.watch("state")}
                          </span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Assets:</span>
                          <span className="ml-2 font-medium" data-testid="text-review-assets">
                            {form.watch("assets")?.length || 0} listed
                          </span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Debts:</span>
                          <span className="ml-2 font-medium" data-testid="text-review-debts">
                            {form.watch("debts")?.length || 0} listed
                          </span>
                        </div>
                      </div>
                    </div>

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address for Delivery</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="your.email@example.com"
                              data-testid="input-email"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Your prenup will be delivered to this email as a Word document
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="rounded-lg border border-chart-4/30 bg-chart-4/5 p-4">
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-0.5">
                          <div className="h-5 w-5 rounded-full bg-chart-4/20 flex items-center justify-center">
                            <span className="text-chart-4 text-xs font-bold">!</span>
                          </div>
                        </div>
                        <div className="text-sm">
                          <p className="font-medium text-chart-4 mb-1">Legal Disclaimer</p>
                          <p className="text-muted-foreground">
                            This document is for informational purposes only and does not constitute legal advice.
                            We strongly recommend having the draft reviewed by independent legal counsel before
                            signing. Proper execution with independent representation is essential for enforceability.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="flex items-center justify-between pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={goBack}
                  disabled={currentStep === 1 || generateMutation.isPending}
                  data-testid="button-back"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button
                  type="button"
                  onClick={handleNext}
                  disabled={generateMutation.isPending}
                  data-testid="button-next"
                >
                  {generateMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : currentStep === 4 ? (
                    <>
                      <Mail className="mr-2 h-4 w-4" />
                      Generate Prenup
                    </>
                  ) : (
                    <>
                      Next
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
    </>
  );
}
