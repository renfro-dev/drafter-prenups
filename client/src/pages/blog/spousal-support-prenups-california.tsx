import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SEOHead } from "@/components/seo-head";
import { Scale } from "lucide-react";
import { RelatedArticles } from "@/components/related-articles";

export default function SpousalSupportPrenupsCA() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Spousal Support and Prenups in California: What’s Enforceable",
    "description": "California spousal support in prenups: waivers, caps, formulas, enforceability checks, and when courts refuse to enforce.",
    "author": { "@type": "Organization", "name": "Drafter" },
    "publisher": { "@type": "Organization", "name": "Drafter", "logo": { "@type": "ImageObject", "url": "https://drafter.com/logo.png" } },
    "datePublished": "2025-11-15",
    "dateModified": "2025-11-12",
    "citation": [
      "https://courts.ca.gov",
      "https://leginfo.legislature.ca.gov",
      "https://www.shouselaw.com/ca/family/spousal-support/"
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Can we waive spousal support in California?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, but courts scrutinize waivers. Independent counsel opportunity, the 7-day rule, and fairness at enforcement are critical to surviving review."
        }
      },
      {
        "@type": "Question",
        "name": "What makes a support waiver unenforceable?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Unconscionability at enforcement, no opportunity for counsel, or extreme imbalance after long marriages can cause courts to refuse enforcement."
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
      { "@type": "ListItem", "position": 3, "name": "Spousal Support and Prenups in California", "item": "/blog/spousal-support-prenups-california" }
    ]
  };

  return (
    <>
      <SEOHead
        title="Spousal Support and Prenups in California: What’s Enforceable | Drafter"
        description="California spousal support in prenups: waivers, caps, formulas, enforceability checks, and when courts refuse to enforce."
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
                <span>Spousal Support</span>
                <span>•</span>
                <span>Updated: November 12, 2025</span>
                <span>•</span>
                <span>8 min read</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Spousal Support and Prenups in California: What’s Enforceable
              </h1>
              <p className="text-xl text-muted-foreground">
                Understand what courts look for in spousal support provisions, and how to draft terms that are more likely to be respected.
              </p>
            </header>

            <Card className="my-8 bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Scale className="h-5 w-5 text-primary" />
                  Quick Answer
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  Courts scrutinize spousal support provisions for fairness at enforcement. Provide opportunity for independent counsel, respect the 7-day rule, avoid extreme outcomes, and consider caps or formulas instead of complete waivers for long marriages.
                </p>
              </CardContent>
            </Card>

            <h2 className="text-3xl font-bold mt-12 mb-6">Drafting Options</h2>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Complete waiver (risky in long marriages)</li>
              <li>Support caps or duration limits</li>
              <li>Formulas tied to income and marriage length</li>
              <li>Conditions for modification (job loss, disability)</li>
            </ul>

            <Separator className="my-12" />

            <h2 className="text-3xl font-bold mb-6">Enforceability Checklist</h2>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Opportunity for independent counsel (documented)</li>
              <li>7-day rule compliance</li>
              <li>No unconscionable outcomes at enforcement</li>
              <li>Clear, objective terms that avoid ambiguity</li>
            </ul>

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
        </div>
      </div>
      <RelatedArticles currentId="spousal-support-prenups-california" tags={["spousal-support","alimony","enforceability","california"]} />
    </>
  );
}


