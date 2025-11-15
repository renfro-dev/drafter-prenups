import { Link } from "wouter";
import { Shield, Clock, DollarSign, FileCheck, Lock, ChevronRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SEOHead } from "@/components/seo-head";

export default function Home() {
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "LegalService",
      "name": "Drafter",
      "description": "AI-powered prenuptial agreement drafting platform with privacy-first PII masking. Generate California-compliant prenups for free in under 10 minutes.",
      "url": "https://drafter.com",
      "logo": "https://drafter.com/logo.png",
      "telephone": "+1-XXX-XXX-XXXX",
      "email": "support@drafter.com",
      "priceRange": "$$",
      "areaServed": {
        "@type": "State",
        "name": "California"
      },
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
        "description": "AI-powered prenuptial agreement for California couples (Free)",
        "availability": "https://schema.org/InStock"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Is this legally binding?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Drafter generates a comprehensive prenup draft based on California family law. While our AI creates attorney-ready documents using verified legal clauses, we strongly recommend having the draft reviewed by a licensed attorney before signing. The document is for informational purposes and not legal advice."
          }
        },
        {
          "@type": "Question",
          "name": "What states do you support?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Currently, Drafter supports California prenuptial agreements. We're expanding to Florida, New York, and Texas in the coming months."
          }
        },
        {
          "@type": "Question",
          "name": "How is my data protected?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We implement enterprise-grade security: 256-bit encryption, PII masking before AI processing, and strict no-training commitments from Anthropic Claude. Your sensitive information is replaced with placeholders before analysis and only restored in your final document."
          }
        },
        {
          "@type": "Question",
          "name": "Can I get attorney review?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes! After receiving your draft, you'll have the option to connect with our network of partner attorneys for professional review and filing assistance."
          }
        },
        {
          "@type": "Question",
          "name": "How long does it take?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Most users complete the intake form in 10-15 minutes. Once submitted, our AI generates your prenup within 2-3 minutes. The entire process typically takes under 20 minutes."
          }
        },
        {
          "@type": "Question",
          "name": "Can I make changes to the draft?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Absolutely. Your prenup is delivered as an editable Word document (.docx). You can make changes directly or work with an attorney to customize specific clauses."
          }
        },
        {
          "@type": "Question",
          "name": "What if my partner doesn't want a prenup?",
          "acceptedAnswer": {
            "@type": "Answer",
              "text": "Start by explaining that prenups protect both partners, not just one. Frame it as financial planning rather than distrust. Share that it's free with Drafter, offering accessible protection that brings clarity to your marriage. Many partners become supportive once they understand the mutual benefits and see it as responsible financial planning together."
          }
        },
        {
          "@type": "Question",
          "name": "Will Drafter AI see my financial information?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. We use PII masking technology that replaces all sensitive information with placeholder tokens before the AI ever sees your data. Names become PARTY_A and PARTY_B. Dollar amounts become VALUE_1, VALUE_2, etc. The AI works with masked data and never has access to your actual personal or financial information."
          }
        },
        {
          "@type": "Question",
          "name": "What happens after I receive my prenup draft?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You'll receive an editable Word document via email. Review it carefully, ideally with an attorney. Make any desired edits. Once finalized, both parties should sign in front of a notary or witnesses (depending on California requirements). Keep original copies in a safe place. We recommend having independent legal counsel review before signing."
          }
        },
        {
          "@type": "Question",
          "name": "Do you offer refunds?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. We offer a 100% satisfaction guarantee. If you're not satisfied with your generated prenup draft for any reason, contact us within 30 days for a full refund. Our goal is to provide value and peace of mind, and we stand behind our service."
          }
        },
        {
          "@type": "Question",
          "name": "Can I use this prenup if we're already married?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "If you're already married, you need a postnuptial agreement, not a prenup. While similar in content, postnups have different legal requirements and face more scrutiny from courts. We recommend consulting with an attorney for postnup creation, as the process requires additional safeguards to ensure enforceability."
          }
        },
        {
          "@type": "Question",
          "name": "How does Drafter compare to traditional attorneys?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Traditional attorneys cost $3,000-$10,000 and take 4-8 weeks. Drafter costs $49 and takes 10 minutes to generate your draft. We use the same legal clauses attorneys use, but automate the drafting process. We still recommend attorney review of the final document, but you save thousands in drafting costs while maintaining legal quality."
          }
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Create a Prenuptial Agreement with Drafter",
      "description": "Step-by-step guide to creating a legally valid California prenup using AI-powered document generation",
      "totalTime": "PT10M",
      "step": [
        {
          "@type": "HowToStep",
          "position": 1,
          "name": "Complete Intake",
          "text": "Answer questions about you, your partner, assets, and debts in our guided form."
        },
        {
          "@type": "HowToStep",
          "position": 2,
          "name": "AI Analysis",
          "text": "Our private AI reviews California family law and retrieves relevant clauses with PII masking to protect your data."
        },
        {
          "@type": "HowToStep",
          "position": 3,
          "name": "Generate Draft",
          "text": "Receive a customized, jurisdiction-specific prenup in Word format."
        },
        {
          "@type": "HowToStep",
          "position": 4,
          "name": "Attorney Review",
          "text": "Optional: Connect with our partner attorneys for professional review and filing."
        }
      ]
    }
  ];

  return (
    <>
      <SEOHead
        title="Drafter - AI-Powered Prenuptial Agreements | Free California Prenups"
        description="Generate attorney-ready prenups in 10 minutes. AI-powered with privacy-first PII masking. California-specific legal clauses. Free vs $3,000+ traditional cost."
        schema={schema}
      />
    <div className="min-h-screen bg-background">
      <main>
        <section className="relative flex items-start overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
          <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              <div className="space-y-8">
                <div className="inline-flex items-center space-x-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                  <Shield className="h-4 w-4" />
                  <span>AI-Powered Legal Technology</span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                  Draft Your Prenup in 10 Minutes
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
                  Private, affordable, and attorney-ready prenuptial agreements powered by AI.
                  Protect your future without the $3,000+ price tag.
                </p>
                <div className="flex flex-wrap gap-4 items-center">
                  <Link href="/intake" data-testid="link-start-prenup-hero">
                    <Button size="lg" className="h-12 px-8 text-base" data-testid="button-start-prenup">
                      Start Your Prenup
                      <ChevronRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <div className="flex items-center space-x-6 text-sm">
                    <div className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-chart-2" />
                      <span className="text-muted-foreground">Private AI</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-chart-2" />
                    <span className="text-muted-foreground">Free</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-chart-2" />
                      <span className="text-muted-foreground">10 Minutes</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative hidden lg:block">
                <div className="relative rounded-xl border bg-card p-8 shadow-lg">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <FileCheck className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <div className="font-semibold">California Prenup</div>
                          <div className="text-sm text-muted-foreground">Community Property State</div>
                        </div>
                      </div>
                      <div className="rounded-full bg-chart-2/10 px-3 py-1 text-sm font-medium text-chart-2">
                        Ready
                      </div>
                    </div>
                    <div className="h-px bg-border" />
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Financial Disclosure</span>
                        <Check className="h-4 w-4 text-chart-2" />
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Property Division</span>
                        <Check className="h-4 w-4 text-chart-2" />
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Spousal Support</span>
                        <Check className="h-4 w-4 text-chart-2" />
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Governing Law</span>
                        <Check className="h-4 w-4 text-chart-2" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-muted/30" data-testid="section-how-it-works">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Four simple steps to your attorney-ready prenuptial agreement
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  {
                    step: "1",
                    title: "Complete Intake",
                    description: "Answer questions about you, your partner, assets, and debts in our guided form.",
                    icon: FileCheck,
                  },
                  {
                    step: "2",
                    title: "AI Analysis",
                    description: "Our private AI reviews California family law and retrieves relevant clauses.",
                    icon: Shield,
                  },
                  {
                    step: "3",
                    title: "Generate Draft",
                    description: "Receive a customized, jurisdiction-specific prenup in Word format.",
                    icon: Clock,
                  },
                  {
                    step: "4",
                    title: "Attorney Review",
                    description: "Optional: Connect with our partner attorneys for professional review and filing.",
                    icon: Check,
                  },
                ].map((item) => (
                  <Card key={item.step} className="relative" data-testid={`card-step-${item.step}`}>
                    <CardHeader>
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                        <item.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="absolute top-6 right-6 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                        {item.step}
                      </div>
                      <CardTitle className="text-xl">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{item.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-24" data-testid="section-privacy">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <div className="inline-flex items-center space-x-2 rounded-full bg-chart-3/10 px-4 py-2 text-sm font-medium text-chart-3">
                    <Lock className="h-4 w-4" />
                    <span>Privacy First</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold">Your Information Stays Private</h2>
                  <p className="text-lg text-muted-foreground">
                    No account required and no sensitive intake stored. We use PII masking to protect your details
                    during AI processing, email your document, then discard your intake data.
                  </p>
                  <div className="space-y-4">
                    {[
                      "No account required, no sensitive data stored in our DB",
                      "PII masking before AI analysis—your data stays anonymized",
                      "We email your document and discard intake data",
                      "No model training on your data",
                    ].map((item, i) => (
                      <div key={i} className="flex items-start space-x-3">
                        <div className="h-6 w-6 rounded-full bg-chart-3/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="h-4 w-4 text-chart-3" />
                        </div>
                        <span className="text-muted-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <Card className="p-8">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between pb-4 border-b">
                      <span className="font-semibold">Traditional Attorney</span>
                      <span className="text-2xl font-bold text-muted-foreground">$3,000+</span>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Multiple office visits</span>
                        <span className="text-destructive">3-5 meetings</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Time to complete</span>
                        <span className="text-destructive">2-4 weeks</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Privacy concerns</span>
                        <span className="text-destructive">Paper files</span>
                      </div>
                    </div>
                    <div className="h-px bg-border" />
                    <div className="flex items-center justify-between pb-4 border-b">
                      <span className="font-semibold text-primary">Drafter Platform</span>
                      <span className="text-2xl font-bold text-primary">Free</span>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Online process</span>
                        <span className="text-chart-2">Fully remote</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Time to complete</span>
                        <span className="text-chart-2">10 minutes</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Privacy protection</span>
                        <span className="text-chart-2">No account; no DB storage of sensitive intake</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-24 bg-muted/30" data-testid="section-pricing">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
                <p className="text-lg text-muted-foreground">
                  Free, complete prenup draft—no hidden fees
                </p>
              </div>
              <Card className="p-8 md:p-12">
                <div className="text-center mb-8">
                  <div className="inline-flex items-baseline">
                    <span className="text-5xl md:text-6xl font-bold">Free</span>
                    <span className="text-xl text-muted-foreground ml-2">/prenup</span>
                  </div>
                </div>
                <div className="space-y-4 mb-8">
                  {[
                    "California-specific prenuptial agreement draft",
                    "AI-powered clause selection from verified legal library",
                    "Word document (.docx) delivered via email",
                    "Private processing with PII masking; no DB storage of sensitive intake",
                    "Instant delivery—receive draft in minutes",
                    "Legal disclaimers and compliance guidance included",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start space-x-3">
                      <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="h-4 w-4 text-primary" />
                      </div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <Link href="/intake" data-testid="link-start-draft">
                  <Button size="lg" className="w-full h-12 text-base" data-testid="button-start-draft">
                    Start Your Draft
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <p className="text-center text-sm text-muted-foreground mt-6">
                  Optional attorney review available for additional fee
                </p>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-24" data-testid="section-faq">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
              </div>
              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="legal" data-testid="faq-legal">
                  <AccordionTrigger className="text-left">
                    Is this legally binding?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Drafter generates a comprehensive prenup draft based on California family law. While our AI
                    creates attorney-ready documents using verified legal clauses, we strongly recommend having
                    the draft reviewed by a licensed attorney before signing. The document is for informational
                    purposes and not legal advice. Proper execution with independent counsel for both parties
                    is essential for enforceability.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="states" data-testid="faq-states">
                  <AccordionTrigger className="text-left">
                    What states do you support?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Currently, Drafter supports California prenuptial agreements. We're expanding to Florida,
                    New York, and Texas in the coming months. Each jurisdiction has unique family law requirements,
                    and our clause library is carefully curated to ensure compliance with state-specific regulations.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="privacy" data-testid="faq-privacy">
                  <AccordionTrigger className="text-left">
                    How is my data protected?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    We implement enterprise-grade security measures: 256-bit encryption, PII masking before AI
                    processing, and strict no-training commitments from Anthropic Claude. Your sensitive information
                    (names, financial details) is replaced with placeholders before analysis and only restored in
                    your final document. Data is automatically deleted after 7 days unless you request otherwise.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="attorney" data-testid="faq-attorney">
                  <AccordionTrigger className="text-left">
                    Can I get attorney review?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Yes! After receiving your draft, you'll have the option to connect with our network of partner
                    attorneys for professional review and filing assistance. Attorney review fees vary by firm but
                    are typically 70-80% less expensive than traditional full-service prenup preparation since the
                    heavy lifting is already done.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="time" data-testid="faq-time">
                  <AccordionTrigger className="text-left">
                    How long does it take?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Most users complete the intake form in 10-15 minutes. Once submitted, our AI analyzes your
                    information and generates your prenup within 2-3 minutes. You'll receive an email with your
                    Word document ready for download and review. The entire process from start to draft delivery
                    typically takes under 20 minutes.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="changes" data-testid="faq-changes">
                  <AccordionTrigger className="text-left">
                    Can I make changes to the draft?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Absolutely. Your prenup is delivered as an editable Word document (.docx). You can make changes
                    directly in the document or work with an attorney to customize specific clauses. We recommend
                    consulting with legal counsel before making substantive modifications to ensure the agreement
                    remains enforceable under California law.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="partner-resistant" data-testid="faq-partner-resistant">
                  <AccordionTrigger className="text-left">
                    What if my partner doesn't want a prenup?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Start by explaining that prenups protect both partners, not just one. Frame it as financial planning
                    rather than distrust. Share that it's free with Drafter, which brings clarity to your marriage without cost.
                    Many partners become supportive once they understand the mutual benefits and see it as responsible
                    financial planning together.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="ai-privacy" data-testid="faq-ai-privacy">
                  <AccordionTrigger className="text-left">
                    Will Drafter AI see my financial information?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    No. We use PII masking technology that replaces all sensitive information with placeholder tokens
                    before the AI ever sees your data. Names become PARTY_A and PARTY_B. Dollar amounts become VALUE_1,
                    VALUE_2, etc. The AI works with masked data and never has access to your actual personal or financial
                    information.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="after-draft" data-testid="faq-after-draft">
                  <AccordionTrigger className="text-left">
                    What happens after I receive my prenup draft?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    You'll receive an editable Word document via email. Review it carefully, ideally with an attorney.
                    Make any desired edits. Once finalized, both parties should sign in front of a notary or witnesses
                    (depending on California requirements). Keep original copies in a safe place. We recommend having
                    independent legal counsel review before signing.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="refunds" data-testid="faq-refunds">
                  <AccordionTrigger className="text-left">
                    Do you offer refunds?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Yes. We offer a 100% satisfaction guarantee. If you're not satisfied with your generated prenup
                    draft for any reason, contact us within 30 days for a full refund. Our goal is to provide value
                    and peace of mind, and we stand behind our service.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="already-married" data-testid="faq-already-married">
                  <AccordionTrigger className="text-left">
                    Can I use this prenup if we're already married?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    If you're already married, you need a postnuptial agreement, not a prenup. While similar in content,
                    postnups have different legal requirements and face more scrutiny from courts. We recommend consulting
                    with an attorney for postnup creation, as the process requires additional safeguards to ensure
                    enforceability.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="vs-attorney" data-testid="faq-vs-attorney">
                  <AccordionTrigger className="text-left">
                    How does Drafter compare to traditional attorneys?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Traditional attorneys cost $3,000-$10,000 and take 4-8 weeks. Drafter costs $49 and takes 10 minutes
                    to generate your draft. We use the same legal clauses attorneys use, but automate the drafting process.
                    We still recommend attorney review of the final document, but you save thousands in drafting costs
                    while maintaining legal quality.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-10 text-center">People Also Ask About Prenups</h2>
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Should I get a prenup if I make more money than my partner?</h3>
                  <p className="text-muted-foreground">
                    If there's a significant income disparity, a prenup can protect both parties by clearly defining financial expectations. It's not about mistrust—it's about ensuring both partners enter marriage with clarity about asset division, spousal support, and debt responsibility if the relationship ends.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">What happens if you don't have a prenup?</h3>
                  <p className="text-muted-foreground">
                    Without a prenup, state law determines how assets and debts are divided in divorce. In community property states like California, everything acquired during marriage is split 50/50. In equitable distribution states, courts divide property "fairly" which may not mean equally. A prenup gives you control over these decisions.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">How long before the wedding should you get a prenup?</h3>
                  <p className="text-muted-foreground">
                    Start the prenup process 3-6 months before your wedding. While California requires only 7 days between signing and marriage, rushing creates pressure that courts may view as coercion. More time allows thoughtful negotiation, independent legal review, and voluntary agreement—all crucial for enforceability.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">Can a prenup protect my business?</h3>
                  <p className="text-muted-foreground">
                    Yes. A prenup can designate your business as separate property, protect future business appreciation, prevent your spouse from claiming ownership interest, and establish how business income during marriage is treated. This is essential for entrepreneurs and business owners entering marriage.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">Is a prenup worth it for middle-class couples?</h3>
                  <p className="text-muted-foreground">
                    Absolutely. Prenups aren't just for the wealthy—they're valuable for anyone with retirement accounts, student loans, family businesses, or expected inheritances. At $0 with Drafter, a prenup is accessible protection that can save thousands in legal fees and emotional stress if divorce occurs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-muted/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-blog-cta-title">
                  Expert Prenup Guidance & Legal Insights
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Learn about prenuptial agreements, privacy-preserving technology, and state-specific legal requirements
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <Card className="hover-elevate" data-testid="card-blog-featured-1">
                  <CardHeader>
                    <CardTitle className="text-lg">California Prenup Guide</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Complete guide to California prenuptial agreements, community property laws, and enforceability requirements.
                    </p>
                    <Link href="/states/california/prenuptial-agreement">
                      <Button variant="ghost" size="sm" className="w-full justify-between group" data-testid="button-read-ca-guide">
                        Read Guide
                        <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
                <Card className="hover-elevate" data-testid="card-blog-featured-2">
                  <CardHeader>
                    <CardTitle className="text-lg">How PII Masking Works</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Learn how we use advanced privacy technology to protect your personal information during AI processing.
                    </p>
                    <Link href="/privacy-policy">
                      <Button variant="ghost" size="sm" className="w-full justify-between group" data-testid="button-read-privacy">
                        Learn More
                        <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
                <Card className="hover-elevate" data-testid="card-blog-featured-3">
                  <CardHeader>
                    <CardTitle className="text-lg">Common Prenup Mistakes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Avoid critical errors that could invalidate your prenuptial agreement and protect your future.
                    </p>
                    <Link href="/blog">
                      <Button variant="ghost" size="sm" className="w-full justify-between group" data-testid="button-read-mistakes">
                        View Articles
                        <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
              <div className="text-center">
                <Link href="/blog">
                  <Button variant="outline" size="lg" data-testid="button-view-all-articles">
                    View All Articles
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-32 bg-gradient-to-br from-primary/10 via-background to-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <h2 className="text-3xl md:text-5xl font-bold">Ready to Protect Your Future?</h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Join couples who are taking control of their financial future with affordable,
                private prenuptial agreements.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/intake" data-testid="link-get-started-footer">
                  <Button size="lg" className="h-12 px-8 text-base" data-testid="button-get-started-footer">
                    Get Started Now
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-muted/30 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Shield className="h-6 w-6 text-primary" />
                  <span className="text-lg font-bold">Drafter</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  AI-powered prenuptial agreements for modern couples.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Product</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><Link href="/intake" className="hover:text-foreground transition-colors" data-testid="link-footer-how-it-works">How It Works</Link></li>
                  <li><Link href="/intake" className="hover:text-foreground transition-colors" data-testid="link-footer-pricing">Pricing</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Resources</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><Link href="/blog" className="hover:text-foreground transition-colors" data-testid="link-footer-blog">Blog</Link></li>
                  <li><Link href="/states/california" className="hover:text-foreground transition-colors" data-testid="link-footer-california">California Prenups</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Legal</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><Link href="/privacy-policy" className="hover:text-foreground transition-colors" data-testid="link-footer-privacy">Privacy Policy</Link></li>
                  <li><a href="#" className="hover:text-foreground transition-colors">Terms of Service</a></li>
                  <li><a href="#" className="hover:text-foreground transition-colors">Disclaimers</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Security</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Lock className="h-4 w-4" />
                    <span>No DB storage of sensitive intake</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Shield className="h-4 w-4" />
                    <span>PII Protection</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-8 border-t">
              <p className="text-sm text-muted-foreground text-center">
                © 2025 Drafter. For informational purposes only; not legal advice. Attorney review recommended.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
}
