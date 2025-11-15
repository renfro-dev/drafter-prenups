import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { articles } from "@/pages/blog/article-index";

interface RelatedArticlesProps {
  currentId: string;
  tags: string[];
  max?: number;
  title?: string;
}

export function RelatedArticles({ currentId, tags, max = 3, title = "Related Articles" }: RelatedArticlesProps) {
  const tagSet = new Set((tags || []).map(t => t.toLowerCase()));
  const scored = articles
    .filter(a => a.id !== currentId)
    .map(a => {
      const overlap = a.tags?.reduce((acc, t) => acc + (tagSet.has(t.toLowerCase()) ? 1 : 0), 0) || 0;
      return { ...a, overlap };
    })
    .filter(a => a.overlap > 0)
    .sort((a, b) => b.overlap - a.overlap)
    .slice(0, max);

  if (scored.length === 0) return null;

  return (
    <section className="mt-12" data-testid="section-related-articles-auto">
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {scored.map(item => (
          <Card key={item.id} className="hover-elevate">
            <CardHeader>
              <CardTitle className="text-lg">
                <Link href={item.slug} className="hover:text-primary">
                  {item.title}
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <div className="flex items-center justify-between">
                <span>{item.excerpt}</span>
                <Link href={item.slug}>
                  <a className="text-primary inline-flex items-center gap-1 hover:underline">
                    Read <ArrowRight className="h-4 w-4" />
                  </a>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}


