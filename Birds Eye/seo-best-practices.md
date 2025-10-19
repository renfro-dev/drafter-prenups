# SEO Best Practices - Blog Post Optimization Guide

This document outlines best practices for creating blog posts optimized for traditional search engines (Google), LLM platforms (ChatGPT, Claude, Perplexity), and featured snippets.

---

## 📋 Quick Checklist

Use this checklist for every blog post:

- [ ] Quick Answer card (40-60 words) at top
- [ ] Published + Last Updated timestamps
- [ ] Article + FAQ schema in SEOHead
- [ ] Meta description (150-160 characters)
- [ ] Open Graph tags (title, description, image)
- [ ] ~50% of H2/H3 headings in question format
- [ ] 3-5 geographic/California mentions
- [ ] 6-10 FAQs with schema (40-60 words each)
- [ ] Related Articles section (3-5 internal links)
- [ ] 2,000+ word count
- [ ] 2-4 CTAs strategically placed
- [ ] All interactive elements have data-testid attributes

---

## 🎯 Content Structure

### 1. Quick Answer Card
**Purpose:** Front-load key information for LLMs and featured snippets  
**Placement:** After intro paragraph, before first H2  
**Word Count:** 40-60 words

**Implementation:**
```tsx
<Card className="my-8 bg-primary/5 border-primary/20" data-testid="card-quick-answer">
  <CardContent className="p-6">
    <div className="flex gap-4">
      <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
      <div>
        <h3 className="font-semibold text-lg mb-2">Quick Answer</h3>
        <p className="text-sm">
          [40-60 word direct answer that front-loads the main point]
        </p>
      </div>
    </div>
  </CardContent>
</Card>
```

**Best Practices:**
- Answer the title question directly in first sentence
- Include primary keyword naturally
- Add California context if applicable
- Use conversational, accessible language
- Avoid jargon unless necessary

**Example:**
> A prenup in California typically costs $1,200-$3,500 with traditional attorneys. California's community property laws make prenups particularly valuable for protecting separate assets. Drafter offers AI-powered prenup generation for $49, providing an affordable alternative with complete privacy protection through enterprise-grade PII masking.

---

### 2. Timestamps & Freshness Signals

**Format:**
```tsx
<div className="flex items-center gap-2">
  <time dateTime="2025-10-18">Published: October 18, 2025</time>
  <span>•</span>
  <time dateTime="2025-10-19" className="font-medium">Last Updated: October 19, 2025</time>
</div>
```

**Schema:**
```tsx
const articleSchema = {
  "@type": "Article",
  "datePublished": "2025-10-18",
  "dateModified": "2025-10-19", // Update this when content changes
  // ...
};
```

**Best Practices:**
- Always show both Published and Last Updated dates
- Use font-medium for Last Updated to emphasize freshness
- Update dateModified in schema whenever content changes
- Keep content current (update annually at minimum)

---

### 3. Heading Structure & Questions

**Target:** ~50% of H2/H3 headings in question format

**Question Format Examples:**
- ✅ "How Much Do Traditional Attorneys Charge for Prenups?"
- ✅ "Why Does Timing Matter for Prenups?"
- ✅ "What Makes Second Marriage Prenups Different?"
- ✅ "Can You Get a Prenup After Marriage?"

**Declarative Format Examples:**
- ✅ "The True Cost of Traditional Prenups"
- ✅ "California's Community Property Laws Explained"
- ✅ "Timeline for Creating a Valid Prenup"

**Best Practices:**
- Use questions for how-to, why, what, when, where topics
- Use declarative for definitions, overviews, breakdowns
- Front-load keywords in headings
- Keep headings concise (5-10 words)
- Use parallel structure when listing similar topics

---

### 4. Geographic & Local SEO

**California-Specific Content:**
- Minimum 3-5 California mentions per article
- Pillar pages should have 8-10+ mentions

**Types of References:**
1. **Legal Framework**
   - California's community property laws
   - California Family Code §1612, §1615, §2550, §4320
   - California's 7-day waiting period requirement
   - Uniform Premarital Agreement Act (California version)

2. **Geographic Mentions**
   - Los Angeles
   - San Francisco
   - San Diego
   - Silicon Valley
   - Orange County
   - Sacramento
   - Bay Area

3. **Real-World Examples**
   - "Silicon Valley stock options and equity compensation"
   - "Los Angeles real estate appreciation"
   - "San Francisco tech industry compensation"
   - "Orange County beach properties"

**Best Practices:**
- Integrate naturally into content flow
- Use in examples, case studies, cost comparisons
- Reference local legal nuances
- Mention city-specific attorney costs
- Include California case law when relevant

---

## 🔍 SEO Technical Implementation

### 5. Meta Tags & Schema

**Meta Description:**
- Length: 150-160 characters
- Include primary keyword
- Front-load value proposition
- Include location (California)
- Add call to action

**Example:**
```html
<meta name="description" content="Learn how much prenups cost in California. Traditional attorneys charge $1,200-$3,500. Drafter offers AI-powered prenups for $49 with complete privacy. Start today." />
```

**Open Graph Tags:**
```tsx
<meta property="og:title" content="How Much Does a Prenup Cost in California? [2025 Guide]" />
<meta property="og:description" content="Complete breakdown of prenup costs in California..." />
<meta property="og:image" content="/og-image-prenup-cost.jpg" />
<meta property="og:type" content="article" />
```

### 6. Structured Data (Schema.org)

**Article Schema (Required):**
```tsx
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "How Much Does a Prenup Cost in California?",
  "description": "Complete breakdown of prenup costs...",
  "author": {
    "@type": "Organization",
    "name": "Drafter"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Drafter",
    "logo": {
      "@type": "ImageObject",
      "url": "https://yoursite.com/logo.png"
    }
  },
  "datePublished": "2025-10-18",
  "dateModified": "2025-10-19",
  "image": "https://yoursite.com/article-image.jpg"
};
```

**FAQ Schema (Required):**
```tsx
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much does a prenup cost in California?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Traditional attorney-drafted prenups in California cost $1,200-$3,500 on average. Costs vary based on complexity, attorney experience, and geographic location. San Francisco and Los Angeles attorneys typically charge higher rates than other California cities."
      }
    }
    // 5-9 more questions (total 6-10)
  ]
};
```

**HowTo Schema (Optional - for process articles):**
```tsx
const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Get a Prenup in California",
  "totalTime": "P6M", // 6 months
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Initial Discussion & Planning",
      "text": "Have honest discussion about whether you want a prenup..."
    }
    // 4-8 steps total
  ]
};
```

**Schema Array in SEOHead:**
```tsx
<SEOHead
  title="How Much Does a Prenup Cost in California?"
  description="..."
  schema={[articleSchema, faqSchema]} // or [articleSchema, faqSchema, howToSchema]
/>
```

---

## ❓ FAQ Optimization

### 7. FAQ Best Practices

**Quantity:** 6-10 FAQs per article

**Answer Length:** 40-60 words (critical for featured snippets)

**Question Selection:**
- Answer "People Also Ask" queries from Google
- Address common objections/concerns
- Cover related subtopics
- Include long-tail keyword variations

**Answer Structure:**
1. Direct answer in first sentence
2. Supporting detail or context
3. Optional: Link to related content

**Example FAQ:**
```tsx
{
  "@type": "Question",
  "name": "Do both spouses need lawyers for a prenup in California?",
  "acceptedAnswer": {
    "@type": "Answer",
    "text": "California strongly recommends that both parties have independent legal counsel, though it's not legally required. Having separate attorneys ensures each person's interests are protected and strengthens the prenup's enforceability. Many courts view agreements without dual representation with greater scrutiny."
  }
}
```

**Visual Presentation:**
```tsx
<Accordion type="single" collapsible className="mt-8">
  <AccordionItem value="faq-1">
    <AccordionTrigger className="text-left">
      Do both spouses need lawyers for a prenup in California?
    </AccordionTrigger>
    <AccordionContent className="text-muted-foreground">
      California strongly recommends that both parties have independent legal counsel...
    </AccordionContent>
  </AccordionItem>
</Accordion>
```

---

## 🔗 Internal Linking Strategy

### 8. Related Articles Section

**Placement:** At the very end of article (before closing tags)

**Quantity:** 3-5 related articles

**Implementation:**
```tsx
<Separator className="my-12" />

<section className="my-12" data-testid="section-related-articles">
  <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
  <div className="grid md:grid-cols-2 gap-6">
    <Card className="hover-elevate">
      <CardHeader>
        <CardTitle className="text-lg">
          <Link href="/blog/prenup-timeline" className="hover:text-primary">
            When Should You Get a Prenup? Complete Timeline
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">
        Learn the optimal timeline for creating a prenup, from initial discussions to signing.
      </CardContent>
    </Card>
    {/* 2-4 more cards */}
  </div>
</section>
```

**Best Practices:**
- Link to topically related content
- Use descriptive anchor text (not "click here")
- Include brief description of target article
- Prioritize pillar page links
- Create reciprocal links (if A links to B, B should link to A)

**Contextual Links (Within Content):**
- Add 3-5 contextual links within article body
- Link when mentioning related topics
- Use natural anchor text
- Link to both blog posts and service pages
- Don't over-optimize anchor text

---

## 📊 Content Quality Guidelines

### 9. Word Count & Depth

**Minimum Word Count:**
- Blog posts: 2,000+ words
- Pillar pages: 5,000+ words
- State guides: 3,000+ words
- City pages: 1,500+ words

**Content Depth:**
- Cover topic comprehensively
- Address multiple user intents
- Include examples and case studies
- Provide actionable advice
- Answer follow-up questions

### 10. Content Structure

**Opening (150-200 words):**
- Hook with compelling stat or question
- State main problem/topic clearly
- Preview what article covers
- Include primary keyword in first paragraph

**Body (Middle Sections):**
- Use descriptive H2/H3 headings
- Short paragraphs (2-4 sentences)
- Bullet points for lists
- Bold key terms
- Include data/statistics when possible
- Add examples and scenarios

**Closing (100-150 words):**
- Summarize key takeaways
- Reinforce main message
- Include strong CTA
- Link to related resources

### 11. Readability

**Formatting:**
- Short sentences (15-20 words average)
- Short paragraphs (2-4 sentences)
- Bullet points and numbered lists
- Subheadings every 300-400 words
- Bold important terms
- Use tables for comparisons

**Language:**
- Conversational tone
- Active voice preferred
- Avoid jargon (or explain it)
- Use "you" to address reader
- Include analogies for complex topics

---

## 🤖 LLM Optimization

### 12. AI Search Engine Best Practices

**Content Patterns LLMs Prefer:**
1. **Clear, Direct Answers**
   - Front-load information
   - Answer questions explicitly
   - Use definitive language when possible

2. **Structured Information**
   - Use consistent formatting
   - Organize with clear hierarchy
   - Group related information

3. **Conversational Queries**
   - Write for how people ask questions verbally
   - Use natural language patterns
   - Address "why" and "how" questions

4. **Context & Nuance**
   - Explain California-specific context
   - Address common misconceptions
   - Provide multiple perspectives

**Optimization Techniques:**
- Use question-answer format throughout
- Include comparison tables
- Add "Quick Answer" summary cards
- Structure content hierarchically
- Use schema markup extensively
- Optimize for voice search queries

### 13. Featured Snippet Optimization

**Target Formats:**
1. **Paragraph Snippets**
   - 40-60 words
   - Direct answer to query
   - Front-load key information

2. **List Snippets**
   - Numbered or bulleted lists
   - 3-8 items optimal
   - Concise items (1-2 lines)

3. **Table Snippets**
   - Comparison tables
   - Pricing breakdowns
   - Feature comparisons

**Best Practices:**
- Use H2 as question
- Answer directly below heading
- Format answer as paragraph, list, or table
- Keep within 40-60 word range for paragraphs

---

## 🎨 Visual Elements

### 14. CTAs (Call-to-Actions)

**Placement:** 2-4 CTAs per article

**Strategic Positions:**
1. Hero/top section (after Quick Answer)
2. Mid-article (after major section)
3. Before FAQ section
4. End of article

**Implementation:**
```tsx
<div className="my-8 p-6 bg-primary/5 rounded-lg border border-primary/20">
  <h3 className="text-xl font-semibold mb-2">
    Create Your California Prenup in Minutes
  </h3>
  <p className="text-muted-foreground mb-4">
    Generate a privacy-protected prenup for just $49. No attorney meetings required.
  </p>
  <Button asChild data-testid="button-cta-mid-article">
    <Link href="/intake">Start Your Prenup</Link>
  </Button>
</div>
```

### 15. Data-TestID Attributes

**Required for:**
- All buttons
- All links
- All form inputs
- Cards and sections
- Interactive elements

**Naming Convention:**
- Interactive: `{action}-{target}` (e.g., `button-cta-hero`, `link-related-article`)
- Display: `{type}-{content}` (e.g., `card-quick-answer`, `section-related-articles`)
- Dynamic: `{type}-{description}-{id}` (e.g., `card-faq-${index}`)

---

## 📈 Performance & Technical

### 16. Page Performance

**Core Web Vitals:**
- Largest Contentful Paint (LCP): < 2.5s
- First Input Delay (FID): < 100ms
- Cumulative Layout Shift (CLS): < 0.1

**Optimization:**
- Lazy load images below fold
- Optimize image sizes
- Minimize JavaScript
- Use proper caching headers

### 17. Mobile Optimization

**Requirements:**
- Responsive design
- Touch-friendly buttons (min 44px)
- Readable text (min 16px)
- No horizontal scrolling
- Fast mobile load time

---

## 🎯 Pillar/Cluster Strategy

### 18. Content Architecture

**Pillar Page:**
- 5,000+ words comprehensive guide
- Links to all cluster articles
- Targets broad keyword
- Serves as content hub

**Cluster Articles:**
- 2,000-3,000 words focused topics
- Link back to pillar page
- Link to related cluster articles
- Target long-tail keywords

**Example Structure:**
```
Pillar: "Complete Guide to Prenuptial Agreements" (5,400 words)
├── Cluster: "How Much Does a Prenup Cost?" (2,300 words)
├── Cluster: "When Should You Get a Prenup?" (2,200 words)
├── Cluster: "Common Prenup Mistakes" (2,500 words)
├── Cluster: "Prenup vs Postnup" (2,100 words)
├── Cluster: "Second Marriage Prenups" (2,400 words)
└── Cluster: "Do I Need a Prenup?" (2,200 words)
```

---

## ✅ Pre-Publish Checklist

**Content:**
- [ ] 2,000+ words
- [ ] Quick Answer card present
- [ ] 6-10 FAQs with schema
- [ ] ~50% question headings
- [ ] 3-5 California mentions
- [ ] Related Articles section
- [ ] 2-4 CTAs placed

**Technical:**
- [ ] Article schema implemented
- [ ] FAQ schema implemented
- [ ] Meta description (150-160 chars)
- [ ] Open Graph tags
- [ ] Published + Last Updated dates
- [ ] All images have alt text
- [ ] All links working
- [ ] data-testid on interactive elements

**SEO:**
- [ ] Primary keyword in title
- [ ] Primary keyword in first paragraph
- [ ] Keywords in headings naturally
- [ ] Internal links to related content
- [ ] External links to authoritative sources
- [ ] Mobile-friendly design
- [ ] Fast page load speed

**Quality:**
- [ ] No spelling/grammar errors
- [ ] Facts verified
- [ ] Legal disclaimers where needed
- [ ] Readable at 8th grade level
- [ ] Scanned for clarity
- [ ] Reviewed by second person

---

## 📚 Resources

**Tools:**
- Google Search Console - Track rankings and clicks
- Ahrefs/SEMrush - Keyword research
- Google Rich Results Test - Validate schema
- PageSpeed Insights - Performance testing

**References:**
- `Birds Eye/keyword-research.md` - Keyword strategy
- `tasks/seo-expansion.md` - 12-month roadmap
- `agent-roles/seo-*.md` - Specialized SEO playbooks

---

*Last Updated: October 19, 2025*
*Version: 1.0*
