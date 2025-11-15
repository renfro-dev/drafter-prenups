import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SEOHead } from "@/components/seo-head";
import { Briefcase } from "lucide-react";
import { SourcesList } from "@/components/sources-list";
import { RelatedArticles } from "@/components/related-articles";

export default function PrenupsForBusinessOwnersCA() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Prenups for Business Owners in California: Protect Your Company",
    "description": "How California entrepreneurs can protect their businesses in a prenup: separate property, appreciation, valuation, buy-sell coordination, and income treatment.",
    "author": { "@type": "Organization", "name": "Drafter" },
    "publisher": { "@type": "Organization", "name": "Drafter", "logo": { "@type": "ImageObject", "url": "https://drafter.com/logo.png" } },
    "datePublished": "2025-11-15",
    "dateModified": "2025-11-02",
    "citation": [
      "https://courts.ca.gov",
      "https://leginfo.legislature.ca.gov",
      "https://www.justia.com/family/divorce/ prenuptial-agreements/",
      "https://www.natlawreview.com/article/prenuptial-agreements-and-family-business"
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Can my spouse claim part of my business?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "In California, growth in value during marriage can be considered community property. A prenup can classify the business, handle active vs passive appreciation, and define fair resolution terms."
        }
      },
      {
        "@type": "Question",
        "name": "How do we value a business in a prenup?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Set a valuation methodology upfront (e.g., independent appraisal, revenue multiple, discounted cash flows) and specify timing and who pays for appraisal to avoid disputes."
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
      { "@type": "ListItem", "position": 3, "name": "Prenups for Business Owners in California", "item": "/blog/prenups-for-business-owners-california" }
    ]
  };

  return (
    <>
      <SEOHead
        title="Prenups for Business Owners in California: Protect Your Company | Drafter"
        description="How California entrepreneurs can protect their businesses in a prenup: separate property, appreciation, valuation, buy-sell coordination, and income treatment."
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
                <span>Entrepreneurs</span>
                <span>•</span>
                <span>Updated: November 2, 2025</span>
                <span>•</span>
                <span>10 min read</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Prenups for Business Owners in California: Protect Your Company
              </h1>
              <p className="text-xl text-muted-foreground">
                The clauses that matter most to founders, practice owners, and family businesses — and how to keep growth fair without risking your company.
              </p>
            </header>

            <Card className="my-8 bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-primary" />
                  Quick Answer
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  In California, business growth during marriage can become community property. A prenup should: designate the business as separate property, address active vs passive appreciation, set a valuation method, integrate with your buy-sell agreement, and define how income and distributions are treated.
                </p>
              </CardContent>
            </Card>

            <h2 className="text-3xl font-bold mt-12 mb-6">Core Clauses for Business Protection</h2>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Separate property designation for the entity and pre-marriage IP</li>
              <li>Active vs passive appreciation rules (labor vs market growth)</li>
              <li>Valuation methodology and appraisal mechanics</li>
              <li>Buy-sell agreement alignment (drag-along, ROFR, deadlock resolution)</li>
              <li>Income and distributions treatment (separate vs community)</li>
            </ul>

            <Separator className="my-12" />

            <h2 className="text-3xl font-bold mb-6">Examples by Business Type</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Founder/Startup</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Clarify equity vesting during marriage, refresh grants, and liquidity events. Prevent forced sale by defining buyout formulas.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Professional Practice</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Coordinate with partnership or shareholder agreements. Address goodwill and client lists expressly in valuation language.
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
              { label: "Justia: Prenuptial Agreements", url: "https://www.justia.com/family/divorce/prenuptial-agreements/" },
              { label: "National Law Review: Prenups & Family Business", url: "https://www.natlawreview.com/article/prenuptial-agreements-and-family-business" }
            ]}
          />
        </div>
      </div>
      <RelatedArticles currentId="prenups-for-business-owners-california" tags={["business","entrepreneur","valuation","california"]} />
    </>
  );
}


