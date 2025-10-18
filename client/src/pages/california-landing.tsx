import { Link } from "wouter";
import { Shield, ChevronRight, Check, FileText, Scale, Users, DollarSign, Clock, MapPin, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SEOHead } from "@/components/seo-head";

export default function CaliforniaLanding() {
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "LegalService",
      "name": "Drafter - California Prenuptial Agreements",
      "description": "AI-powered California prenuptial agreements for $49. Community property state-specific clauses, privacy-first PII masking, attorney-ready documents in 10 minutes.",
      "areaServed": {
        "@type": "State",
        "name": "California"
      },
      "offers": {
        "@type": "Offer",
        "price": "49",
        "priceCurrency": "USD",
        "description": "California-specific prenuptial agreement with community property law compliance"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What makes California a community property state?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "California is one of nine community property states in the US. This means that assets and debts acquired during marriage are generally owned equally by both spouses, regardless of whose name is on the title. A prenup can modify this default rule."
          }
        },
        {
          "@type": "Question",
          "name": "Are prenuptial agreements enforceable in California?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, prenuptial agreements are enforceable in California under the Uniform Premarital Agreement Act (California Family Code Sections 1600-1617). Both parties must enter voluntarily, with full financial disclosure, and preferably with independent legal counsel."
          }
        },
        {
          "@type": "Question",
          "name": "How much does a California prenup cost?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Traditional attorney-drafted prenups in California cost $3,000-$10,000. Drafter provides AI-powered California prenups for $49, with the option to have partner attorneys review the draft for a fraction of traditional costs."
          }
        }
      ]
    }
  ];

  return (
    <>
      <SEOHead
        title="California Prenuptial Agreement - AI-Powered Prenups for $49 | Drafter"
        description="Create a California-compliant prenuptial agreement for $49. Community property state-specific clauses. Private AI with PII masking. Attorney-ready in 10 minutes."
        schema={schema}
      />
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 right-0 z-50 border-b bg-background/95 backdrop-blur-xl">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" data-testid="link-home">
              <div className="flex items-center space-x-2 cursor-pointer">
                <Shield className="h-7 w-7 text-primary" />
                <span className="text-xl font-bold tracking-tight">Drafter</span>
              </div>
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/intake" data-testid="link-start-prenup">
                <Button size="default" data-testid="button-get-started">
                  Create California Prenup
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="pt-16">
        <section className="relative min-h-[500px] flex items-center overflow-hidden bg-gradient-to-br from-primary/5 via-background to-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <div className="inline-flex items-center space-x-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                <MapPin className="h-4 w-4" />
                <span>California Community Property State</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
                California Prenuptial Agreements for $49
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                AI-powered prenups designed specifically for California's community property laws. 
                Private, affordable, and attorney-ready in 10 minutes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/intake" data-testid="link-create-prenup">
                  <Button size="lg" className="h-12 px-8 text-base" data-testid="button-create-prenup">
                    Create Your Prenup
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/states/california/prenuptial-agreement">
                  <Button variant="outline" size="lg" className="h-12 px-8 text-base">
                    Learn About CA Prenups
                  </Button>
                </Link>
              </div>
              <div className="flex flex-wrap gap-6 justify-center text-sm">
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-chart-2" />
                  <span className="text-muted-foreground">CA Family Code Compliant</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-chart-2" />
                  <span className="text-muted-foreground">Community Property Clauses</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-chart-2" />
                  <span className="text-muted-foreground">Private AI Processing</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-24" data-testid="section-california-specifics">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Why California Prenups Are Different
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  California's unique community property laws require specialized prenuptial agreements
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                <Card data-testid="card-community-property">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Scale className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>Community Property State</CardTitle>
                  </CardHeader>
                  <CardContent className="text-muted-foreground">
                    California is one of only nine community property states. Assets and debts acquired 
                    during marriage are split 50/50 by default. A prenup lets you modify this rule to 
                    protect separate property, businesses, and inheritances.
                  </CardContent>
                </Card>
                <Card data-testid="card-upaa">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>Uniform Premarital Agreement Act</CardTitle>
                  </CardHeader>
                  <CardContent className="text-muted-foreground">
                    California follows the UPAA (Family Code §1600-1617), which sets specific requirements 
                    for valid prenups: voluntary execution, full financial disclosure, and independent 
                    legal representation recommended.
                  </CardContent>
                </Card>
                <Card data-testid="card-disclosure">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>Full Financial Disclosure</CardTitle>
                  </CardHeader>
                  <CardContent className="text-muted-foreground">
                    California courts strictly enforce financial disclosure requirements. Our AI-powered 
                    intake ensures you provide all necessary asset and debt information for a legally 
                    sound agreement.
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-24 bg-muted/30" data-testid="section-what-covered">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  What Your California Prenup Covers
                </h2>
                <p className="text-lg text-muted-foreground">
                  Comprehensive protection tailored to California law
                </p>
              </div>
              <div className="space-y-6">
                {[
                  {
                    title: "Separate Property Protection",
                    description: "Define and protect assets you bring into the marriage, including real estate, retirement accounts, business interests, and investments."
                  },
                  {
                    title: "Community Property Division",
                    description: "Establish how assets acquired during marriage will be divided, modifying California's default 50/50 split if desired."
                  },
                  {
                    title: "Spousal Support (Alimony)",
                    description: "Set terms for spousal support or waive it entirely, subject to court review for unconscionability."
                  },
                  {
                    title: "Debt Allocation",
                    description: "Protect yourself from your spouse's pre-marital debts and establish how marital debts will be handled."
                  },
                  {
                    title: "Business Ownership",
                    description: "Shield your business from becoming community property, maintaining full control and preventing forced sale in divorce."
                  },
                  {
                    title: "Inheritance and Estate Planning",
                    description: "Ensure inheritances remain separate property and align prenup terms with your estate plan."
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-start space-x-4 p-6 rounded-lg bg-background border">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <Check className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-24" data-testid="section-pricing-comparison">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Affordable California Prenups
                </h2>
                <p className="text-lg text-muted-foreground">
                  Save thousands compared to traditional attorney fees
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-2 border-muted">
                  <CardHeader>
                    <CardTitle className="text-2xl">Traditional Attorney</CardTitle>
                    <div className="text-4xl font-bold text-muted-foreground mt-4">$3,000 - $10,000</div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Initial consultation</span>
                        <span className="text-destructive">$300-500</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Document drafting</span>
                        <span className="text-destructive">$2,000-5,000</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Revisions</span>
                        <span className="text-destructive">$500-1,000</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Time to complete</span>
                        <span className="text-destructive">3-6 weeks</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-2 border-primary">
                  <CardHeader>
                    <CardTitle className="text-2xl text-primary">Drafter Platform</CardTitle>
                    <div className="text-4xl font-bold text-primary mt-4">$49</div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">AI-powered drafting</span>
                        <span className="text-chart-2">Included</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">CA-specific clauses</span>
                        <span className="text-chart-2">Included</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Editable Word document</span>
                        <span className="text-chart-2">Included</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Time to complete</span>
                        <span className="text-chart-2">10 minutes</span>
                      </div>
                    </div>
                    <Link href="/intake" className="block mt-6">
                      <Button className="w-full" size="lg" data-testid="button-start-now">
                        Start Now
                        <ChevronRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-24 bg-muted/30" data-testid="section-major-cities">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Serving All California Counties
                </h2>
                <p className="text-lg text-muted-foreground">
                  Our AI-powered prenups comply with California law statewide
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  "Los Angeles", "San Francisco", "San Diego", "San Jose",
                  "Sacramento", "Oakland", "Fresno", "Long Beach",
                  "Santa Ana", "Anaheim", "Bakersfield", "Riverside",
                  "Stockton", "Irvine", "Chula Vista", "Fremont"
                ].map((city) => (
                  <div key={city} className="flex items-center space-x-2 text-muted-foreground">
                    <Building2 className="h-4 w-4 text-primary" />
                    <span>{city}</span>
                  </div>
                ))}
              </div>
              <p className="text-center text-sm text-muted-foreground mt-12">
                Valid in all 58 California counties. Works with Los Angeles County, San Francisco County,
                Orange County, San Diego County, and every other jurisdiction in California.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-32 bg-gradient-to-br from-primary/10 via-background to-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <h2 className="text-3xl md:text-5xl font-bold">
                Ready to Protect Your Future in California?
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Join California couples who are securing their financial future with affordable,
                privacy-first prenuptial agreements.
              </p>
              <Link href="/intake" data-testid="link-get-started-cta">
                <Button size="lg" className="h-12 px-8 text-base" data-testid="button-get-started-cta">
                  Create California Prenup - $49
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-muted/30 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Shield className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold">Drafter</span>
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              © 2025 Drafter. California prenuptial agreements powered by AI.
            </p>
            <p className="text-xs text-muted-foreground">
              For informational purposes only; not legal advice. Attorney review recommended.
            </p>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
}
