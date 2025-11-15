import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SEOHead } from "@/components/seo-head";
import { Home } from "lucide-react";

export default function HomeOwnershipPrenupsCA() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Home Ownership and Prenups in California: Protecting Equity",
    "description": "How California homeowners can protect pre-marriage equity with a prenup: transmutation risks, marital contributions, appreciation handling, and fair credits.",
    "author": { "@type": "Organization", "name": "Drafter" },
    "publisher": { "@type": "Organization", "name": "Drafter", "logo": { "@type": "ImageObject", "url": "https://drafter.com/logo.png" } },
    "datePublished": "2025-11-15",
    "dateModified": "2025-10-06",
    "citation": [
      "https://courts.ca.gov",
      "https://leginfo.legislature.ca.gov",
      "https://www.nolo.com/legal-encyclopedia/keeping-property-separate-prenup.html"
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Do I lose separate property status if we refinance?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Refinancing, title changes, or using marital income can trigger transmutation or community claims. A prenup can preserve separate property status and define fair credits."
        }
      },
      {
        "@type": "Question",
        "name": "How are mortgage payments from marital income treated?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A prenup can specify credits for principal reduction from marital income and address appreciation attribution during marriage."
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
      { "@type": "ListItem", "position": 3, "name": "Home Ownership and Prenups in California", "item": "/blog/home-ownership-prenups-california" }
    ]
  };

  return (
    <>
      <SEOHead
        title="Home Ownership and Prenups in California: Protecting Equity | Drafter"
        description="How California homeowners can protect pre-marriage equity with a prenup: transmutation risks, marital contributions, appreciation handling, and fair credits."
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
                <span>Home Ownership</span>
                <span>•</span>
                <span>Updated: October 6, 2025</span>
                <span>•</span>
                <span>9 min read</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Home Ownership and Prenups in California: Protecting Equity
              </h1>
              <p className="text-xl text-muted-foreground">
                Keep your pre-marriage home separate, define credits for marital contributions, and prevent unintended transmutation — without sacrificing fairness.
              </p>
            </header>

            <Card className="my-8 bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Home className="h-5 w-5 text-primary" />
                  Quick Answer
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  Your prenup can preserve a pre-marriage home as separate property, set credits for marital income used on the mortgage or improvements, and specify how appreciation is treated — avoiding disputes and protecting both partners.
                </p>
              </CardContent>
            </Card>

            <h2 className="text-3xl font-bold mt-12 mb-6">Key Risk: Transmutation</h2>
            <p className="text-muted-foreground mb-4">
              Title changes, joint refinance, or commingling can convert separate property into community property. Define in your prenup that these actions do not transmute ownership without a separate written agreement.
            </p>

            <Separator className="my-12" />

            <h2 className="text-3xl font-bold mb-6">Fair Credits and Appreciation</h2>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Credits for principal reduction from marital income</li>
              <li>Improvements vs maintenance — capital vs operating</li>
              <li>Appreciation split models and market factors</li>
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
          <div className="mt-8">
            <ul className="list-disc pl-6 text-sm text-muted-foreground">
              <li>
                <a href="https://courts.ca.gov" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  California Courts
                </a>
              </li>
              <li>
                <a href="https://leginfo.legislature.ca.gov" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  California Family Code
                </a>
              </li>
              <li>
                <a href="https://www.nolo.com/legal-encyclopedia/keeping-property-separate-prenup.html" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  Nolo: Keeping Property Separate in a Prenup
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <RelatedArticles currentId="home-ownership-prenups-california" tags={["home","real-estate","equity","california"]} />
    </>
  );
}


