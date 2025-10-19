# Design Guidelines: Prenuptial Agreement Collaborative Review Platform

## Design Approach

**Selected Approach**: Hybrid - Stripe-inspired legal SaaS aesthetic with systematic component architecture

**Justification**: Legal tech demands trustworthiness and clarity (utility-focused) while requiring visual sophistication to differentiate in the SaaS market. Stripe's restrained professionalism paired with systematic component design creates the ideal foundation for complex information architecture.

**Key Design Principles**:
- Trust through clarity: Visual hierarchy makes complex legal content scannable
- Professional restraint: Minimal color palette with strategic accent usage
- Information density without overwhelm: Structured whitespace and typographic hierarchy
- Subtle collaboration cues: Status indicators that inform without distracting

---

## Core Design Elements

### A. Color Palette

**Primary Colors (Dark Mode)**:
- Background Base: 220 20% 10% (deep navy-slate)
- Surface Elevated: 220 18% 14% (lighter slate panels)
- Surface Interactive: 220 15% 18% (hover/focus states)

**Text Hierarchy**:
- Primary Text: 220 10% 95% (near-white for headings)
- Secondary Text: 220 8% 70% (legal clause text)
- Tertiary Text: 220 8% 55% (AI explanations, metadata)

**Accent & Status Colors**:
- Trust Blue: 215 80% 55% (primary actions, links)
- Success Green: 145 65% 50% (approved clauses)
- Warning Amber: 35 85% 60% (flagged items, attention needed)
- Comment Purple: 260 60% 65% (discussion indicators)

**Borders & Dividers**: 220 15% 25% (subtle separation)

### B. Typography

**Font Families**:
- Primary (UI/Headings): Inter (Google Fonts) - clean, professional SaaS standard
- Legal Content: Georgia or system serif - authoritative, readable for contracts
- AI Explanations: Inter - maintains friendly accessibility

**Type Scale**:
- Page Headers: text-2xl to text-3xl, font-semibold (24-30px)
- Clause Titles: text-lg, font-medium (18px)
- Legal Text: text-base, leading-relaxed (16px, serif)
- AI Explanations: text-sm, leading-relaxed (14px)
- Metadata/Labels: text-xs, font-medium, uppercase tracking-wide (12px)

### C. Layout System

**Spacing Primitives**: Use Tailwind units of **2, 4, 6, 8, 12, 16** for consistent rhythm

**Core Layouts**:
- Container max-width: max-w-7xl (1280px)
- Side-by-side review panels: 50/50 split on desktop, stacked on mobile
- Sidebar width: 320px (w-80) for collaboration panel
- Vertical rhythm: py-6 between sections, py-12 for major divisions

**Grid System**:
- Two-column clause comparison: `grid grid-cols-1 lg:grid-cols-2 gap-6`
- Three-column dashboard: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4`

### D. Component Library

**Navigation Header**:
- Fixed top bar, backdrop-blur with subtle border-bottom
- Logo left, collaboration status center, user menu right
- Height: h-16, px-6 horizontal padding

**Clause Review Cards**:
- Surface with rounded-lg, border, p-6 padding
- Header: Clause number + title (flex justify-between)
- Body: Legal text in serif, AI explanation below with subtle bg-slate-800/40 background
- Footer: Action buttons (flag, comment, ask) + collaboration indicators

**Side-by-Side Comparison Panel**:
- Left: Legal clause (formal serif typography, larger text-base)
- Right: AI Plain English (sans-serif, slightly smaller text-sm)
- Visual separator: 1px vertical border
- Sticky headers showing clause titles on scroll

**Interaction Buttons**:
- Primary: Trust Blue fill, white text, rounded-md, px-4 py-2
- Secondary (Flag): Outline with amber accent on active, icon + label
- Comment: Purple outline, speech bubble icon, shows count badge
- Ask Question: Ghost button with blue text, question icon

**Collaboration Status Indicators**:
- Inline badges: Small rounded-full pills (text-xs px-2 py-1)
- Partner activity: Subtle pulse animation on avatar
- Clause status: Color-coded left border (4px) on cards - green (agreed), amber (flagged), purple (discussing)
- Comment threads: Nested indentation with connecting lines

**Discussion Thread Component**:
- Timeline layout with avatar + timestamp
- Message bubbles: Differentiated by user (partner vs self) with subtle bg color
- Resolved state: Lower opacity with checkmark indicator

**Dashboard Cards**:
- Progress overview: Circular progress ring showing % complete
- Recent activity feed: Timeline with icons for flag/comment/approve actions
- Quick stats: Grid of metric cards (text-3xl numbers, text-sm labels)

### E. Animations

**Minimal Motion Strategy**:
- Smooth transitions: `transition-all duration-200 ease-in-out` for hover states only
- Collaboration pulse: Subtle `animate-pulse` on new activity indicators (2s interval)
- NO scroll-triggered animations, NO page transitions
- Focus: Simple border highlight on interactive elements

---

## Images

**Hero Section** (Marketing/Landing Page):
- **Large Hero Image**: Yes - Professional couple reviewing documents together at modern desk, warm natural lighting
- Placement: Full-width, 60vh height, subtle gradient overlay (from transparent to background)
- Style: High-quality stock photography, editorial feel, conveys trust and collaboration
- Text overlay: Centered, white text with backdrop-blur background on CTA button

**Dashboard/App Interface**:
- **No large images** - Content-focused utility interface
- Avatar placeholders: Use initials in circular badges for user/partner identification
- Icon system: Heroicons for all interface icons (outline style for consistency)

---

## Special Considerations

**Information Hierarchy Execution**:
1. **Legal Clause Text**: Largest serif type, primary text color, ample line-height (leading-relaxed)
2. **AI Explanations**: Slightly smaller sans-serif, secondary text color, subtle background panel for differentiation
3. **Interaction Buttons**: Fixed bottom-right of each clause card, always visible, icon + text labels
4. **Status Indicators**: Persistent left-border color coding + inline badges for at-a-glance scanning

**Trust Signals**:
- Consistent use of Trust Blue for all primary actions
- Clear labeling with no ambiguous icons
- Always-visible save states and collaboration sync indicators
- Subtle success confirmations (green checkmark fade-in, no modals)

**Accessibility**:
- High contrast ratios: Legal text maintains 7:1, UI elements 4.5:1 minimum
- Keyboard navigation: Visible focus rings with blue outline
- Screen reader: Semantic HTML, clear aria-labels on all interactive elements
- Dark mode optimized: Reduced blue light with warm slate tones