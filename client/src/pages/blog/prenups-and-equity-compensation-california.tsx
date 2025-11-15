import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SEOHead } from "@/components/seo-head";
import { LineChart } from "lucide-react";
import { SourcesList } from "@/components/sources-list";
import { RelatedArticles } from "@/components/related-articles";

export default function PrenupsAndEquityCompCA() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Equity Compensation and Prenups in California (RSUs, Options, Bonuses)",
    "description": "How to handle RSUs, stock options, and bonuses in California prenups — classification, vesting allocation, formulas, and taxes.",
    "author": { "@type": "Organization", "name": "Drafter" },
    "publisher": { "@type": "Organization", "name": "Drafter", "logo": { "@type": "ImageObject", "url": "https://drafter.com/logo.png" } },
    "datePublished": "2025-11-15",
    "dateModified": "2025-10-11",
    "citation": [
      "https://courts.ca.gov",
      "https://leginfo.legislature.ca.gov",
      "https://www.schwab.com/learn/story/rsus-defined",
      "https://www.investopedia.com/terms/r/restrictedstockunit.asp"
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Are RSUs earned during marriage community property?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "In California, compensation earned during marriage is generally community property. A prenup can classify awards and define vesting allocation to avoid disputes later."
        }
      },
      {
        "@type": "Question",
        "name": "What about unvested equity or refresh grants?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Your prenup can address unvested awards and new grants with formulas (e.g., coverture or time-based allocation) and clarify treatment at separation or sale."
        }
      }
    ]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "/" },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": "/blog" },
      { "@type": "ListItem", "position": 3, "name": "Equity Compensation and Prenups in California", "item": "/blog/prenups-and-equity-compensation-california" }
    ]
  };

  return (
    <>
      <SEOHead
        title="Equity Compensation and Prenups in California (RSUs, Options, Bonuses) | Drafter"
        description="How to handle RSUs, stock options, and bonuses in California prenups — classification, vesting allocation, formulas, and taxes."
        schema={[articleSchema, faqSchema, breadcrumbSchema]}
      />

      <div className="min-h-screen bg-background">
        <div className="container max-w-4xl mx-auto px-4 py-12">
          <Link href="/blog">
            <Button variant="ghost" className="mb-6" data-testid="button-back-to-blog">
              ← Back to Blog
            </Button>
          </Link>

          <article>
            <header className="mb-8">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <span>Compensation & Equity</span>
                <span>•</span>
                <span>Updated: October 11, 2025</span>
                <span>•</span>
                <span>11 min read</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Equity Compensation and Prenups in California (RSUs, Options, Bonuses)
              </h1>
              <p className="text-xl text-muted-foreground">
                How to draft clear, fair rules for equity awards — and avoid community property disputes when grants vest during marriage.
              </p>
            </header>

            <Card className="my-8 bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChart className="h-5 w-5 text-primary" />
                  Quick Answer
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  In California, equity compensation earned during marriage is generally community. Your prenup can classify awards, define vesting allocation, and select objective formulas for division — preventing uncertainty and litigation later.
                </p>
              </CardContent>
            </Card>

            <h2 className="text-3xl font-bold mt-12 mb-6">Key Drafting Decisions</h2>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Classify pre-marriage vs during-marriage awards</li>
              <li>Choose vesting allocation formula (e.g., coverture/time-based)</li>
              <li>Address refresh grants, cliffs, and performance conditions</li>
              <li>Define tax and sale proceeds handling</li>
            </ul>

            <Separator className="my-12" />

            <h2 className="text-3xl font-bold mb-6">Examples</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>RSUs Granted Pre-Marriage, Vesting After</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Allocate vesting portion with a time-based formula; specify treatment of refresh grants separately.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Options Granted During Marriage</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Clarify community share of exercised options and tax handling on sale; define employer-driven events (change of control).
                </CardContent>
              </Card>
            </div>

            <div className="flex gap-4 my-8">
              <Link href="/intake">
                <Button size="lg" data-testid="button-start-prenup">
                  Create Your Prenup – Free
                </Button>
              </Link>
              <Link href="/states/california/prenuptial-agreement">
                <Button variant="outline" size="lg">
                  Learn About CA Prenups
                </Button>
              </Link>
            </div>
          </article>
          <SourcesList
            sources={[
              { label: "California Courts", url: "https://courts.ca.gov" },
              { label: "California Family Code", url: "https://leginfo.legislature.ca.gov" },
              { label: "Schwab: RSUs Defined", url: "https://www.schwab.com/learn/story/rsus-defined" },
              { label: "Investopedia: RSUs", url: "https://www.investopedia.com/terms/r/restrictedstockunit.asp" }
            ]}
          />
        </div>
      </div>
      <RelatedArticles currentId="prenups-and-equity-compensation-california" tags={["equity","rsu","options","tech","california"]} />
    </>
  );
}

