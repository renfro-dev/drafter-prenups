import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useLocation } from "wouter";
import { Shield, ArrowLeft, ArrowRight, Check, Loader2, Mail, Lightbulb, Info } from "lucide-react";
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
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const STEPS = [
  { id: 1, title: "Personal Info", description: "Basic information about you and your partner" },
  { id: 2, title: "Agreement Preferences", description: "Key legal choices (in a quick modal)" },
  { id: 3, title: "Assets & Debts", description: "Financial details for disclosure" },
  { id: 4, title: "Review Information", description: "Confirm your information" },
];

export default function Intake() {
  const [currentStep, setCurrentStep] = useState(1);
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const [preferencesStage, setPreferencesStage] = useState<'separate' | 'spousal' | 'counsel'>('separate');
  const [showExampleSeparateProperty, setShowExampleSeparateProperty] = useState(false);
  const [showExampleSpousalSupport, setShowExampleSpousalSupport] = useState(false);
  const [showExampleCounsel, setShowExampleCounsel] = useState(false);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  // Email gate modal state
  const [emailGateOpen, setEmailGateOpen] = useState(true);
  const [gateEmail, setGateEmail] = useState("");
  // Terms gate state
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false);
  const [accepting, setAccepting] = useState(false);

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
      return await apiRequest("POST", "/api/generate-email", data);
    },
    onSuccess: (response: any) => {
      console.log('[Intake] API response:', response);
      // For email-first flow, always show success page with status and optional download fallback
      localStorage.setItem('prenup-result', JSON.stringify(response));
      setLocation("/success");
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

  const emailSchema = z.string().email("Enter a valid email");

  const closeEmailGateIfValid = () => {
    const result = emailSchema.safeParse(gateEmail.trim());
    if (!result.success) {
      toast({ title: "Email required", description: result.error.issues[0]?.message || "Enter a valid email address", variant: "destructive" });
      return;
    }
    form.setValue("email", gateEmail.trim(), { shouldValidate: true, shouldDirty: true });
    setEmailGateOpen(false);
  };

  const acceptTerms = async () => {
    // Require email + names present first
    const ok = await form.trigger(["email", "partyAName", "partyBName"]);
    if (!ok) {
      toast({ title: "Complete details", description: "Enter your email and both names first.", variant: "destructive" });
      return;
    }
    try {
      setAccepting(true);
      await apiRequest("POST", "/api/terms/accept", {
        email: form.getValues("email"),
        partyAName: form.getValues("partyAName"),
        partyBName: form.getValues("partyBName"),
        version: "v1",
      });
      setHasAcceptedTerms(true);
      toast({ title: "Terms accepted", description: "Thanks—please proceed to generate your prenup." });
    } catch (e: any) {
      toast({ title: "Could not record acceptance", description: e?.message || "Please try again.", variant: "destructive" });
    } finally {
      setAccepting(false);
    }
  };

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
      fieldsToValidate = ["spousalSupportWaived", "separatePropertyProtection", "counselRepresented"];
    } else if (currentStep === 3) {
      fieldsToValidate = ["assets", "debts"];
    } else if (currentStep === 4) {
      fieldsToValidate = ["email"];
    }

    const result = await form.trigger(fieldsToValidate);
    return result;
  };

  const handleNext = async () => {
    // Special handling: step 2 is preferences modal
    if (currentStep === 1) {
      const ok = await validateCurrentStep();
      if (ok) {
        setCurrentStep(2);
        setPreferencesOpen(true);
      }
      return;
    }
    if (currentStep === 2) {
      const ok = await validateCurrentStep();
      if (ok) {
        setPreferencesOpen(false);
        setCurrentStep(3);
      }
      return;
    }
    const isValid = await validateCurrentStep();
    if (!isValid) return;
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      form.handleSubmit(onSubmit)();
    }
  };

  // Auto-open preferences modal on step 2 entry (refresh/skip safety)
  if (currentStep === 2 && !preferencesOpen) {
    // open lazily so initial render doesn't block
    setTimeout(() => {
      setPreferencesStage('separate');
      setPreferencesOpen(true);
    }, 0);
  }

  const nextPreferencesStage = async () => {
    if (preferencesStage === 'separate') {
      const ok = await form.trigger(["separatePropertyProtection"]);
      if (!ok) return;
      setPreferencesStage('spousal');
      return;
    }
    if (preferencesStage === 'spousal') {
      const ok = await form.trigger(["spousalSupportWaived"]);
      if (!ok) return;
      setPreferencesStage('counsel');
      return;
    }
    if (preferencesStage === 'counsel') {
      const ok = await form.trigger(["counselRepresented"]);
      if (!ok) return;
      setPreferencesOpen(false);
      setCurrentStep(3);
    }
  };

  return (
    <>
      <SEOHead
        title="Create Your Prenup - Free California Prenuptial Agreement Form | Drafter"
        description="Start creating your California prenup with our private AI-powered intake form. Review clause-by-clause before you pay. Attorney-ready prenuptial agreements with PII masking."
      />
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Email gate modal (blocks interaction but shows steps behind) */}
          <Dialog open={emailGateOpen}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Where would you like us to send your agreement?</DialogTitle>
                <DialogDescription>
                  Upon completion, we’ll email your draft as a Word document.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-3">
                <div>
                  <label className="mb-2 block text-sm font-medium">Email address</label>
                  <Input
                    type="email"
                    placeholder="your.email@example.com"
                    value={gateEmail}
                    onChange={(e) => setGateEmail(e.target.value)}
                    autoFocus
                    data-testid="gate-input-email"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  You can review all steps before sending. We only use your email to deliver the agreement.
                </p>
              </div>
              <DialogFooter>
                <Button type="button" onClick={closeEmailGateIfValid} data-testid="gate-button-continue">
                  Continue
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

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
              <Dialog open={preferencesOpen} onOpenChange={setPreferencesOpen}>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>
                      {preferencesStage === 'separate' && 'Protect Separate Property'}
                      {preferencesStage === 'spousal' && 'Waive Spousal Support (Alimony)'}
                      {preferencesStage === 'counsel' && 'Independent Legal Counsel'}
                    </DialogTitle>
                    <DialogDescription>
                      Quick guidance to help you choose. General info only, not legal advice.
                    </DialogDescription>
                  </DialogHeader>

                  <div className="space-y-6">
                    {preferencesStage === 'separate' && (
                      <FormField
                        control={form.control}
                        name="separatePropertyProtection"
                        render={({ field }) => (
                          <FormItem className="flex flex-col space-y-2 rounded-lg border p-4">
                            <div className="space-y-1 leading-none">
                              <FormLabel className="font-semibold">Keep What You Owned Before Marriage</FormLabel>
                              <FormDescription>
                                This keeps things simple: what you owned before stays yours unless you both decide otherwise later.
                              </FormDescription>
                              <div className="mt-2 text-sm text-muted-foreground">
                                Example:
                                <div className="mt-1 rounded-md border bg-background p-3 text-xs">
                                  Partner A has a savings account from before marriage. Partner B has a car from before marriage. Both stay with the original owner.
                                </div>
                              </div>
                            </div>
                            <div className="mt-3">
                              <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                              <span className="ml-2 text-sm">Protect separate property</span>
                            </div>
                          </FormItem>
                        )}
                      />
                    )}

                    {preferencesStage === 'spousal' && (
                      <FormField
                        control={form.control}
                        name="spousalSupportWaived"
                        render={({ field }) => (
                          <FormItem className="flex flex-col space-y-2 rounded-lg border p-4">
                            <div className="space-y-1 leading-none">
                              <FormLabel className="font-semibold">Waive Alimony?</FormLabel>
                              <FormDescription>
                                This means neither person asks for alimony if you divorce. Courts may reject this if it’s unfair later.
                              </FormDescription>
                              <div className="mt-2 text-sm text-muted-foreground">
                                Example:
                                <div className="mt-1 rounded-md border bg-background p-3 text-xs">
                                  Partner A earns about the same as Partner B. They agree that neither will pay alimony.
                                </div>
                              </div>
                            </div>
                            <div className="mt-3">
                              <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                              <span className="ml-2 text-sm">We both waive spousal support</span>
                            </div>
                          </FormItem>
                        )}
                      />
                    )}

                    {preferencesStage === 'counsel' && (
                      <FormField
                        control={form.control}
                        name="counselRepresented"
                        render={({ field }) => (
                          <FormItem className="flex flex-col space-y-2 rounded-lg border p-4">
                            <div className="space-y-1 leading-none">
                              <FormLabel className="font-semibold">Have Your Own Lawyer</FormLabel>
                              <FormDescription>
                                Having your own attorney makes the agreement stronger and clearer for both of you.
                              </FormDescription>
                              <div className="mt-2 text-sm text-muted-foreground">
                                Example:
                                <div className="mt-1 rounded-md border bg-background p-3 text-xs">
                                  Partner A talks to a lawyer; Partner B talks to a different lawyer. Both feel informed and comfortable before signing.
                                </div>
                              </div>
                            </div>
                            <div className="mt-3">
                              <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                              <span className="ml-2 text-sm">We will each have the chance to get our own lawyer</span>
                            </div>
                          </FormItem>
                        )}
                      />
                    )}
                  </div>

                  <DialogFooter className="mt-4">
                    <Button type="button" variant="outline" onClick={() => setPreferencesOpen(false)}>Close</Button>
                    <Button type="button" onClick={nextPreferencesStage}>
                      {preferencesStage === 'counsel' ? 'Save and Continue' : 'Next'}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
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

              {currentStep === 3 && (
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

              {/* Preferences moved into modal shown at step 2 */}

              {currentStep === 4 && (
                <Card data-testid="form-step-4">
                  <CardHeader>
                    <CardTitle>Review Information</CardTitle>
                    <CardDescription>
                      Review your information and enter your email address
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

                    <div className="rounded-lg border p-4">
                      <div className="space-y-2">
                        <div className="font-semibold">Terms & Conditions Acknowledgement</div>
                        <p className="text-sm text-muted-foreground">
                          By proceeding, you agree that: (1) Drafter does not provide legal advice; (2) you will obtain
                          independent attorney review of any agreement before signing; and (3) Drafter is not responsible
                          for any outcomes or consequences resulting from use of the draft or your decisions.
                        </p>
                        <div className="flex items-center gap-3 pt-2">
                          <Button type="button" onClick={acceptTerms} disabled={accepting || hasAcceptedTerms} variant={hasAcceptedTerms ? "outline" : "default"}>
                            {hasAcceptedTerms ? (
                              <>
                                <Check className="mr-2 h-4 w-4" />
                                Terms Accepted
                              </>
                            ) : accepting ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Recording...
                              </>
                            ) : (
                              <>I Agree</>
                            )}
                          </Button>
                          {!hasAcceptedTerms && (
                            <span className="text-xs text-muted-foreground">Required before generating your prenup</span>
                          )}
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
                  disabled={generateMutation.isPending || (currentStep === 4 && !hasAcceptedTerms)}
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
