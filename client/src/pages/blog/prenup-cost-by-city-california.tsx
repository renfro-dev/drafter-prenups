import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SEOHead } from "@/components/seo-head";
import { DollarSign, MapPin } from "lucide-react";
import { SourcesList } from "@/components/sources-list";
import { RelatedArticles } from "@/components/related-articles";

export default function PrenupCostByCityCA() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "How Much Does a Prenup Cost in California Cities? (LA, SF, SD, SJ)",
    "description": "Typical prenup costs by California city, what drives price differences, and how AI reduces drafting cost while preserving attorney review.",
    "author": { "@type": "Organization", "name": "Drafter" },
    "publisher": { "@type": "Organization", "name": "Drafter", "logo": { "@type": "ImageObject", "url": "https://drafter.com/logo.png" } },
    "datePublished": "2025-11-15",
    "dateModified": "2025-10-22",
    "citation": [
      "https://courts.ca.gov",
      "https://leginfo.legislature.ca.gov",
      "https://www.nolo.com/legal-encyclopedia/prenuptial-agreements",
      "https://www.findlaw.com/family/marriage/prenuptial-agreements.html"
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What’s the cheapest way to get a prenup in California?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "AI drafting with attorney review is typically the lowest total cost. Drafter generates a California-compliant draft for Free, then both parties can pay for limited-scope attorney review instead of full-service drafting."
        }
      },
      {
        "@type": "Question",
        "name": "How much does attorney review cost?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Limited-scope review commonly ranges from $500–$1,500 per party, depending on complexity, revisions, and metro rates (LA/SF tend higher)."
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
      { "@type": "ListItem", "position": 3, "name": "California Prenup Cost by City", "item": "/blog/prenup-cost-by-city-california" }
    ]
  };

  return (
    <>
      <SEOHead
        title="How Much Does a Prenup Cost in California Cities? (LA, SF, SD, SJ) | Drafter"
        description="Typical prenup costs by California city, what drives price differences, and how AI reduces drafting cost while preserving attorney review."
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
                <span>Pricing & Planning</span>
                <span>•</span>
                <span>Updated: October 22, 2025</span>
                <span>•</span>
                <span>9 min read</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                How Much Does a Prenup Cost in California Cities?
              </h1>
              <p className="text-xl text-muted-foreground">
                Typical price ranges in Los Angeles, San Francisco, San Diego, and San Jose — plus how to lower total cost with AI drafting and attorney review.
              </p>
            </header>

            <Card className="my-8 bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-primary" />
                  Quick Answer
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  Traditional attorney-drafted prenups typically cost $2,000–$6,000 per party in major metros (LA, SF) and $1,500–$4,000 in others (SD, SJ). Using Drafter, you can generate a California-compliant draft for Free, then pay for limited-scope attorney review ($500–$1,500 per party) — often cutting total cost by 50–70%.
                </p>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6 my-8">
              {[
                { city: "Los Angeles", note: "Higher attorney rate bands (market demand)" },
                { city: "San Francisco", note: "Equity-heavy compensation; complex estates" },
                { city: "San Diego", note: "Coastal real estate and dual-career cases" },
                { city: "San Jose", note: "Tech RSUs/options; refresh grants" },
              ].map((c) => (
                <Card key={c.city}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      {c.city}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    <p className="mb-2">
                      Attorney-only: $3,000–$10,000 (two parties). Limited-scope review: $1,000–$3,000 total. AI + review: Free + $1,000–$2,000.
                    </p>
                    <p>{c.note}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <h2 className="text-3xl font-bold mt-12 mb-6">What Drives Prenup Cost?</h2>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Complexity (businesses, trusts, international assets)</li>
              <li>Number of revision rounds and negotiation cycles</li>
              <li>Metro attorney hourly rates and market demand</li>
              <li>Spousal support and equity compensation provisions</li>
            </ul>

            <Separator className="my-12" />

            <h2 className="text-3xl font-bold mb-6">Lowering Total Cost with AI Drafting</h2>
            <p className="text-muted-foreground mb-4">
              Use AI for first draft, then invest in targeted attorney review. You save time on drafting and pay for expert judgment where it matters most.
            </p>
            <div className="flex gap-4 my-6">
              <Link href="/intake">
                <Button size="lg" data-testid="button-start-prenup">
                  Start Your Prenup – Free
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
              { label: "Nolo: Prenuptial Agreements", url: "https://www.nolo.com/legal-encyclopedia/prenuptial-agreements" },
              { label: "FindLaw: Prenuptial Agreements", url: "https://www.findlaw.com/family/marriage/prenuptial-agreements.html" }
            ]}
          />
        </div>
      </div>
      <RelatedArticles currentId="prenup-cost-by-city-california" tags={["cost","pricing","local","california"]} />
    </>
  );
}


