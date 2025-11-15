import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SEOHead } from "@/components/seo-head";
import { Shield, MapPin, ChevronRight } from "lucide-react";
import { NearbyCities } from "@/components/nearby-cities";

export default function StocktonPrenup() {
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "LegalService",
      "name": "Drafter - Prenuptial Agreements in Stockton, CA",
      "url": "https://drafter.com/states/california/stockton",
      "areaServed": {
        "@type": "City",
        "name": "Stockton",
        "address": {
          "@type": "PostalAddress",
          "addressRegion": "CA",
          "addressCountry": "US"
        }
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "/" },
        { "@type": "ListItem", "position": 2, "name": "California", "item": "/states/california" },
        { "@type": "ListItem", "position": 3, "name": "Stockton Prenups", "item": "/states/california/stockton" }
      ]
    }
  ];

  return (
    <>
      <SEOHead
        title="Stockton Prenuptial Agreements | California Community Property | Drafter"
        description="Create a California-compliant prenuptial agreement for Stockton couples. Private AI, 10 minutes, attorney-ready. Optimized for CA community property rules."
        schema={schema}
      />
      <div className="min-h-screen bg-background">
        <header className="border-b bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <Link href="/">
                <div className="flex items-center space-x-2 cursor-pointer">
                  <Shield className="h-7 w-7 text-primary" />
                  <span className="text-xl font-bold tracking-tight">Drafter</span>
                </div>
              </Link>
              <Link href="/intake">
                <Button size="sm">
                  Create Prenup
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </header>

        <main className="py-12 md:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="inline-flex items-center space-x-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-6">
              <MapPin className="h-4 w-4" />
              <span>Stockton, California</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Prenuptial Agreements in Stockton, CA
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              California-compliant prenups tailored for Stockton couples. Private AI, community property aware, and attorney-ready in minutes.
            </p>

            <div className="grid gap-6 md:grid-cols-2 mb-10">
              <Card>
                <CardHeader>
                  <CardTitle>Central Valley Considerations</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Address property treatment, debt allocation, and small business interests common in San Joaquin County.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Private AI, Attorney-Ready</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  We use PII masking to keep sensitive info private during AI generation. Get an editable Word document ready for attorney review.
                </CardContent>
              </Card>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/intake">
                <Button size="lg" className="h-12 px-8 text-base">
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
          </div>
        </main>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <NearbyCities
            cities={[
              { name: "Sacramento", href: "/states/california/sacramento" },
              { name: "Fresno", href: "/states/california/fresno" },
              { name: "San Jose", href: "/states/california/san-jose" },
              { name: "San Francisco", href: "/states/california/san-francisco" },
            ]}
          />
        </div>
      </div>
    </>
  );
}


