import { Link } from "wouter";
import { SEOHead } from "@/components/seo-head";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowRight } from "lucide-react";

const blogArticles = [
  {
    id: "california-prenup-guide",
    title: "The Complete Guide to California Prenuptial Agreements in 2024",
    excerpt: "Everything you need to know about prenups in California, from community property laws to what can and cannot be included in your agreement.",
    category: "State Guides",
    readTime: "12 min read",
    publishDate: "October 15, 2024",
    slug: "/states/california/prenuptial-agreement",
    featured: true
  },
  {
    id: "pii-masking-explained",
    title: "How PII Masking Protects Your Privacy During AI Document Generation",
    excerpt: "Learn how Drafter uses advanced privacy-preserving technology to ensure your personal information never reaches the AI model.",
    category: "Privacy & Security",
    readTime: "8 min read",
    publishDate: "October 12, 2024",
    slug: "/privacy-policy",
    featured: true
  },
  {
    id: "prenup-mistakes",
    title: "5 Common Prenup Mistakes That Could Invalidate Your Agreement",
    excerpt: "Learn about the critical mistakes that can render your prenuptial agreement unenforceable and how to avoid them.",
    category: "Prenups 101",
    readTime: "12 min read",
    publishDate: "October 18, 2025",
    slug: "/blog/prenup-mistakes",
    featured: false
  },
  {
    id: "when-to-get-prenup",
    title: "When Should You Get a Prenup? Timeline and Best Practices",
    excerpt: "Complete guide to prenup timing with month-by-month timeline from 6 months before wedding to signing.",
    category: "Prenups 101",
    readTime: "14 min read",
    publishDate: "October 18, 2025",
    slug: "/blog/prenup-timeline",
    featured: false
  },
  {
    id: "second-marriage-prenup",
    title: "Prenup for Second Marriage: What's Different?",
    excerpt: "Essential guide for protecting children's inheritance and navigating the unique financial complexities of second marriages.",
    category: "Prenups 101",
    readTime: "11 min read",
    publishDate: "October 18, 2025",
    slug: "/blog/second-marriage-prenup",
    featured: false
  },
  {
    id: "prenup-vs-postnup",
    title: "Prenup vs Postnup: Which Is Right for You?",
    excerpt: "Comprehensive comparison of prenuptial and postnuptial agreements, including enforceability, timing, and which best protects your interests.",
    category: "Prenups 101",
    readTime: "10 min read",
    publishDate: "October 18, 2025",
    slug: "/blog/prenup-vs-postnup",
    featured: false
  },
  {
    id: "prenup-cost",
    title: "How Much Does a Prenup Cost? Complete Price Guide for 2025",
    excerpt: "Breaking down prenup costs from traditional attorneys to AI-powered services, plus hidden fees and how to save money.",
    category: "Prenups 101",
    readTime: "12 min read",
    publishDate: "October 18, 2025",
    slug: "/blog/prenup-cost",
    featured: false
  },
  {
    id: "do-i-need-prenup",
    title: "Do I Need a Prenup? Complete Guide to Deciding",
    excerpt: "Honest assessment of when prenups are essential, when they're optional, and when you can skip one—plus how to have the conversation.",
    category: "Prenups 101",
    readTime: "15 min read",
    publishDate: "October 18, 2025",
    slug: "/blog/do-i-need-prenup",
    featured: false
  }
];

export default function Blog() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Drafter Legal Insights & Guidance",
    "description": "Expert guidance on prenuptial agreements, privacy-preserving AI technology, and modern relationship planning",
    "url": "https://drafter.com/blog",
    "publisher": {
      "@type": "Organization",
      "name": "Drafter",
      "logo": {
        "@type": "ImageObject",
        "url": "https://drafter.com/logo.png"
      }
    }
  };

  return (
    <>
      <SEOHead
        title="Legal Insights & Prenup Guidance - Drafter Blog"
        description="Expert articles on prenuptial agreements, privacy-first AI technology, state-specific legal guidance, and modern relationship planning. Updated weekly."
        schema={schema}
      />
      <div className="min-h-screen bg-background">
        <header className="border-b bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <Link href="/">
                <a className="text-2xl font-bold text-foreground" data-testid="link-home">
                  Drafter
                </a>
              </Link>
              <Link href="/">
                <Button variant="ghost" size="sm" data-testid="button-back-home">
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </header>

        <main>
          <section className="bg-gradient-to-b from-muted/50 to-background py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
              <h1 className="text-5xl font-bold mb-6" data-testid="text-blog-title">
                Legal Insights & Guidance
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="text-blog-description">
                Expert articles on prenuptial agreements, privacy technology, and modern relationship planning
              </p>
            </div>
          </section>

          <section className="py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
              <div className="flex gap-4 mb-12 flex-wrap justify-center">
                <Badge variant="default" className="cursor-pointer px-4 py-2" data-testid="badge-filter-all">
                  All Articles
                </Badge>
                <Badge variant="outline" className="cursor-pointer px-4 py-2" data-testid="badge-filter-prenups">
                  Prenups 101
                </Badge>
                <Badge variant="outline" className="cursor-pointer px-4 py-2" data-testid="badge-filter-guides">
                  State Guides
                </Badge>
                <Badge variant="outline" className="cursor-pointer px-4 py-2" data-testid="badge-filter-privacy">
                  Privacy & Security
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogArticles.map((article) => (
                  <Card 
                    key={article.id} 
                    className="flex flex-col hover-elevate"
                    data-testid={`card-article-${article.id}`}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between mb-4">
                        <Badge variant="secondary" data-testid={`badge-category-${article.id}`}>
                          {article.category}
                        </Badge>
                        {article.featured && (
                          <Badge variant="default" data-testid={`badge-featured-${article.id}`}>
                            Featured
                          </Badge>
                        )}
                      </div>
                      <h2 className="text-2xl font-semibold mb-3 line-clamp-2" data-testid={`text-title-${article.id}`}>
                        {article.title}
                      </h2>
                      <p className="text-muted-foreground line-clamp-3 mb-4" data-testid={`text-excerpt-${article.id}`}>
                        {article.excerpt}
                      </p>
                    </CardHeader>
                    <CardContent className="mt-auto">
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span data-testid={`text-date-${article.id}`}>{article.publishDate}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span data-testid={`text-readtime-${article.id}`}>{article.readTime}</span>
                        </div>
                      </div>
                      <Link href={article.slug}>
                        <Button 
                          variant="ghost" 
                          className="w-full justify-between group"
                          data-testid={`button-read-${article.id}`}
                        >
                          Read Article
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          <section className="py-20 bg-muted">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
              <h2 className="text-3xl font-bold mb-6" data-testid="text-newsletter-title">
                Get Legal Insights Delivered
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Subscribe to receive expert prenup guidance, privacy updates, and state-specific legal insights directly to your inbox.
              </p>
              <div className="flex gap-4 max-w-md mx-auto flex-col sm:flex-row">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg border border-input bg-background"
                  data-testid="input-newsletter-email"
                />
                <Button size="lg" data-testid="button-newsletter-subscribe">
                  Subscribe
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                We respect your privacy. Unsubscribe anytime.
              </p>
            </div>
          </section>
        </main>

        <footer className="border-t bg-muted py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm text-muted-foreground">
              © 2024 Drafter. All rights reserved. |{" "}
              <Link href="/privacy-policy">
                <a className="hover:text-foreground transition-colors" data-testid="link-privacy">
                  Privacy Policy
                </a>
              </Link>
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
