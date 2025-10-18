# Drafter - Prenuptial Agreement Platform Design Guidelines

## Design Approach

**Reference-Based Approach**: Drawing inspiration from Stripe (trust, clarity), Lemonade (approachable professionalism), and Carta (legal-finance hybrid) to create a design that balances legal authority with modern accessibility.

**Core Principles**:
- Transparent simplicity over complexity
- Professional warmth, not cold formality
- Privacy-first visual language
- Confidence through clarity

---

## Core Design Elements

### A. Color Palette

**Primary Colors**:
- Deep Navy: 220 45% 20% (authority, trust)
- Soft Slate: 220 15% 96% (backgrounds, light mode)
- Pure White: 0 0% 100%

**Dark Mode**:
- Background: 220 20% 10%
- Surface: 220 18% 15%
- Muted text: 220 10% 60%

**Accent** (use sparingly):
- Emerald Green: 160 65% 45% (security, success states)
- Warm Coral: 15 80% 60% (CTAs, highlights - limited use)

**Semantic**:
- Error: 0 70% 55%
- Warning: 40 90% 55%
- Success: 160 65% 45%

### B. Typography

**Families** (Google Fonts):
- Primary: Inter (UI, body text, forms)
- Display: Sora (headlines, hero statements)

**Scale**:
- Hero: text-6xl/text-7xl font-bold (Sora)
- H1: text-5xl font-bold
- H2: text-4xl font-semibold  
- H3: text-2xl font-semibold
- Body: text-base/text-lg
- Small: text-sm
- Legal/Fine Print: text-xs

**Weights**: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

### C. Layout System

**Spacing Primitives**: Use Tailwind units of **2, 4, 6, 8, 12, 16, 20, 24, 32** (e.g., p-8, gap-6, mb-16, py-24)

**Grid**:
- Container: max-w-7xl mx-auto px-6
- Content width: max-w-4xl (blog articles, forms)
- Sections: py-20 (mobile) / py-32 (desktop)

**Columns**:
- Features: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Blog grid: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Article layout: Single column max-w-prose

### D. Component Library

**Navigation**:
- Fixed header with backdrop-blur-lg, border-b border-slate-200/20
- Logo left, nav center, CTA button right
- Mobile: Hamburger menu with slide-in drawer
- Include trust badge: "Bank-level encryption" or "SOC 2 Certified"

**Hero Section** (with large image):
- Split layout: 50% content (left), 50% hero image (right) on desktop
- Headline + subheadline + two CTAs (primary + outline with backdrop-blur)
- Trust indicator below CTAs: "Join 10,000+ couples" with small avatars
- Background: Subtle gradient navy-to-slate

**Feature Cards**:
- Icon (Heroicons), title, description, optional "Learn more" link
- Border: border border-slate-200 dark:border-slate-700
- Hover: subtle lift (translate-y-1) + border color change
- Padding: p-8, rounded-2xl

**Blog Components**:
- Article cards: Featured image, category badge, title, excerpt, author + date, reading time
- Category badges: Small pill shape, soft background colors
- Article header: Full-width featured image, breadcrumbs, title, author card, published date
- Typography: Generous line-height (leading-relaxed), max-w-prose
- Code blocks: Dark theme with syntax highlighting (if needed)
- Blockquotes: Border-left accent, italic, larger text
- Table of contents: Sticky sidebar on desktop

**Forms**:
- Input fields: h-12, rounded-lg, border-2, focus ring emerald
- Labels: Above inputs, text-sm font-medium
- Help text: text-xs text-slate-500
- Privacy note: Visible lock icon + "Your data is encrypted end-to-end"
- Multi-step indicator: Progress bar or step dots at top

**CTAs**:
- Primary: bg-coral, text-white, rounded-lg, px-8 py-4, font-semibold
- Secondary: border-2 border-navy, text-navy, backdrop-blur-sm (when on images)
- Sizes: Regular (px-8 py-3), Large (px-10 py-4)

**Trust Elements**:
- Security badges: Lock icons, encryption indicators
- Social proof: Customer count, testimonial cards with photos
- Partner logos: Grayscale, subtle grid
- Privacy seal: Prominent placement near forms

**Footer**:
- Three columns: Product links, Resources, Legal/Privacy
- Newsletter signup with privacy note
- Trust badges row (SSL, SOC 2, etc.)
- Social links (minimal, professional)
- Copyright + legal links

### E. Animations

**Minimal approach**:
- Fade-in on scroll (blog posts, features) - subtle
- Hover states: translate-y-1, scale-105 (buttons only)
- Page transitions: None (instant)
- Focus: Ring animation only

---

## Page-Specific Guidelines

### Homepage
**Sections** (in order):
1. Hero with image (couple reviewing documents, modern setting)
2. "How It Works" - 3-step visual process
3. Key Features - 3-column grid with icons
4. Privacy & Security - Dedicated section with lock imagery, encryption details
5. Pricing - Transparent table, highlight recommended plan
6. Testimonials - 2-column cards with photos, names, locations
7. FAQ - Accordion style
8. Final CTA - Full-width section with contrasting background

### Blog Section
**Blog Index**:
- Hero: Minimal - just headline "Legal Insights & Guidance"
- Filter tabs: All, Prenups 101, Legal Updates, Relationships
- 3-column article grid
- Pagination at bottom

**Article Page**:
- Full-width hero image (16:9)
- Breadcrumbs below image
- Article meta: Author card (photo + bio), date, reading time, share buttons
- Content: Single column max-w-prose, centered
- Related articles: 3-column grid at bottom
- Newsletter signup: Inline after article

---

## Images

**Hero Section** (Homepage):
- Large hero image (right 50% on desktop, full-width on mobile)
- Content: Modern couple at coffee shop or home office, laptop visible, warm natural lighting
- Style: Authentic, not stock-y, diverse representation
- Overlay: Subtle gradient from navy (left) to transparent (right) for text readability

**Feature Sections**:
- Privacy section: Abstract lock/shield illustration or photo of secure document
- How It Works: Simple iconography or illustrated steps, no photos needed

**Blog**:
- Featured images: 16:9 ratio, professional photography or custom illustrations
- Suggested themes: Legal documents, couples, home settings, professional consultations
- Author photos: Circle crop, 64x64px minimum

**Trust Indicators**:
- Partner logos: Actual logos (placeholder for legal associations, security certifications)
- Testimonial photos: Real customer photos (circle crop, 80x80px)

---

## Accessibility & Dark Mode

- Dark mode: Consistent throughout, navy backgrounds, muted text (slate-400)
- Form inputs: Dark surface (slate-800), light borders
- Contrast ratios: WCAG AA minimum
- Focus indicators: Visible emerald ring on all interactive elements
- Alt text: Descriptive for all images

**Quality Mandate**: Every section is fully designed with supporting elements, no sparse layouts. Blog features comprehensive reading experience with author bios, related content, and newsletter integration. Homepage showcases complete value proposition with 8 substantive sections.