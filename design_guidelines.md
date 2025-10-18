# Design Guidelines: Drafter - AI Prenuptial Agreement Platform

## Design Approach

**Hybrid Strategy:** Professional legal tech with modern SaaS polish

**Primary References:**
- **Stripe** - Trust, clarity, sophisticated simplicity for sensitive data handling
- **Linear** - Clean forms, excellent input design, professional palette
- **Notion** - Guided workflows, clear progress indication

**Core Principle:** Build confidence through visual professionalism while maintaining approachability. Users are handling life-changing legal documents—design must feel secure, intelligent, and trustworthy.

---

## Color Palette

### Light Mode
**Primary:** 221 83% 53% (Professional Blue - trust, security)
**Primary Dark:** 221 83% 43% (Interactive states)
**Surface:** 0 0% 100% (Pure white)
**Surface Secondary:** 220 13% 97% (Subtle backgrounds)
**Text Primary:** 222 47% 11% (High contrast dark)
**Text Secondary:** 215 16% 47% (Muted content)
**Border:** 214 32% 91% (Subtle divisions)
**Success:** 142 71% 45% (Validation, completion)
**Warning:** 38 92% 50% (Attention items)
**Error:** 0 84% 60% (Validation errors)

### Dark Mode
**Primary:** 221 83% 63% (Brighter for contrast)
**Primary Dark:** 221 83% 53%
**Surface:** 222 47% 11% (Deep background)
**Surface Secondary:** 217 33% 17% (Elevated surfaces)
**Text Primary:** 210 40% 98% (Near white)
**Text Secondary:** 217 19% 60% (Muted)
**Border:** 217 33% 21% (Subtle)
**Success:** 142 71% 55%
**Warning:** 38 92% 60%
**Error:** 0 84% 70%

### Privacy Accent (Optional Use)
**Encryption Indicator:** 160 81% 44% (Teal - security signals)

---

## Typography

**Font Families:**
- Primary: Inter (Google Fonts) - Modern, highly readable, professional
- Monospace: JetBrains Mono - Legal clauses, document previews

**Scale:**
- Display: text-5xl md:text-6xl, font-bold (Hero headlines)
- H1: text-4xl font-bold (Section titles)
- H2: text-2xl font-semibold (Subsections)
- H3: text-xl font-semibold (Card headers)
- Body Large: text-lg (Form labels, important content)
- Body: text-base (Primary content)
- Body Small: text-sm (Helper text, disclaimers)
- Caption: text-xs (Metadata, legal fine print)

**Hierarchy:**
- Section headers: font-bold with increased letter-spacing (tracking-tight)
- Legal disclaimers: text-sm with text-secondary color, subtle background
- Form labels: font-medium text-base
- Input text: text-base regular weight

---

## Layout System

**Spacing Primitives:** Tailwind units of 2, 4, 6, 8, 12, 16, 20, 24

**Container Strategy:**
- Landing page: max-w-7xl for content sections
- Application: max-w-4xl for form container (optimal reading/input width)
- Legal text: max-w-prose for readability

**Grid:**
- Form sections: Single column on mobile, strategic 2-column on desktop (md:grid-cols-2) for related fields
- Landing features: grid-cols-1 md:grid-cols-2 lg:grid-cols-3

**Vertical Rhythm:**
- Section padding: py-12 md:py-20 (landing), py-8 md:py-12 (application)
- Component spacing: space-y-6 to space-y-8 for vertical stacks
- Form field groups: space-y-4

---

## Component Library

### Navigation
**Landing Header:**
- Fixed position with backdrop-blur-xl and border-b
- Logo left, navigation center, CTA button right
- Height: h-16
- Privacy badge: Small "🔒 Private & Secure" indicator

**Application Header:**
- Progress indicator showing steps (Intake → Review → Delivery)
- Save draft functionality indicator
- Minimal, non-distracting

### Forms & Inputs

**Input Fields:**
- Height: h-12 for touch-friendly interaction
- Border: 2px border with focus ring (ring-2 ring-primary)
- Rounded: rounded-lg
- Background: Surface color with subtle hover state
- Labels: Positioned above, font-medium text-base
- Helper text: text-sm text-secondary below input
- Error states: Red border + error message with error icon

**Select Dropdowns:**
- Consistent h-12 height
- Custom chevron icon
- State selection: Prominent, larger text

**Buttons:**
- Primary: bg-primary text-white h-12 px-8 rounded-lg font-medium
- Secondary: variant="outline" with border-2
- Icon buttons: size-10 for close/edit actions

**Multi-step Form Pattern:**
- Clear step indicators (1, 2, 3, 4)
- "Previous" and "Next" navigation
- Auto-save indication
- Field validation on blur

### Cards

**Form Section Cards:**
- Background: Surface Secondary in dark mode, white in light
- Border: 1px border-border
- Padding: p-6 md:p-8
- Rounded: rounded-xl
- Shadow: Subtle shadow-sm

**Information Cards (Landing):**
- Clean, minimal borders
- Icon + Title + Description pattern
- Hover: subtle scale transform and shadow increase

### Trust & Privacy Elements

**Security Indicators:**
- Encryption badge in footer: "🔒 256-bit Encryption"
- Privacy statement: "Your data never leaves our secure system"
- Attorney disclaimer: Bordered box with subtle background

**Progress Visualization:**
- Step-based progress bar at top of form
- Visual checkmarks for completed sections
- Estimated time remaining

### Data Display

**Prenup Preview (if shown):**
- Monospace font for legal text
- Subtle background distinguishing preview from editable content
- Print-friendly styling consideration

**Email Delivery Confirmation:**
- Large success checkmark icon
- Clear "Check your email" message
- Secondary CTA: "Need attorney review?"

---

## Images

### Hero Section
**Large Hero Image:** Yes - Professional stock photo showing:
- Couple reviewing documents together (warm, trustworthy)
- Modern, bright setting
- Alternative: Abstract secure/lock iconography with gradient overlay
- Treatment: Subtle overlay to ensure text contrast
- Position: Right side on desktop, background on mobile

### Trust Section
**Optional Supporting Images:**
- Attorney partner logos (if available)
- Security certification badges
- Before/after document comparison mockup

---

## Landing Page Structure

**Hero Section:** (h-screen min-h-[600px])
- Headline: "Draft Your Prenup in 10 Minutes—Private, Affordable, Attorney-Ready"
- Subheadline: Value proposition + trust signals
- Primary CTA: "Start Your Prenup →"
- Trust indicators: "✓ Private AI | ✓ $49 Fixed Price | ✓ 10-Minute Process"
- Hero image: Right-aligned on desktop

**How It Works:** (py-20)
- 4-step process visualization
- Icons + titles + descriptions
- Grid: lg:grid-cols-4

**Privacy First:** (py-20 bg-surface-secondary)
- Headline: "Your Information Stays Private"
- Encryption details, PII masking explanation
- Visual: Lock icon or security diagram
- Comparison: Traditional attorney vs. Drafter privacy

**Pricing:** (py-20)
- Single clear price: $49
- What's included list
- "Optional attorney review" upsell mention
- Comparison table: $49 vs $3,000-$8,000 traditional

**FAQ:** (py-20)
- Accordion pattern
- Address: legality, state coverage, attorney review

**CTA Section:** (py-24)
- Final conversion moment
- "Ready to protect your future?"
- Primary button + trust badges

**Footer:** (py-12)
- Links: Privacy Policy, Terms, Disclaimers
- Security badges
- Contact information
- Legal disclaimer: "For informational purposes; not legal advice"

---

## Application Flow Structure

**Step 1: Intake Form**
- Welcome message explaining process
- Fields organized in logical groups (Personal Info → Assets → Debts → Preferences)
- Real-time validation
- Save & continue later option

**Step 2: Review**
- Summary of entered information
- Edit capability for each section
- Jurisdiction confirmation (CA highlighted)
- Legal disclaimer acknowledgment

**Step 3: Generate**
- Loading state with reassuring messages
- "Analyzing California family law..."
- "Drafting your custom agreement..."
- Progress indicator

**Step 4: Delivery**
- Email input (if not captured earlier)
- Success confirmation
- Download option
- Attorney review upsell card

---

## Accessibility

- WCAG AA contrast minimum (4.5:1 for text)
- Focus indicators: 2px ring on all interactive elements
- Keyboard navigation: Logical tab order
- Form labels: Always visible, associated with inputs
- Error announcements: aria-live regions
- Dark mode: Consistent across all components including inputs

---

## Animations

**Minimal, Purposeful Only:**
- Form field focus: Smooth border color transition (200ms)
- Button hover: Subtle scale (1.02) and shadow
- Page transitions: Fade between form steps (300ms)
- Success state: Checkmark animation (500ms)
- NO scroll-triggered animations, parallax, or decorative motion