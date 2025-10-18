# Session Logging Template & Instructions

**Purpose:** Guide for logging future development sessions  
**Format:** Reverse chronological (newest sessions at top)  
**Timezone:** Pacific Standard Time (PST/PDT)

---

## 📝 Quick Reference

**Where to log:**
- **Quick lookup:** `summary.md` (high-level overview, 1-2 lines per session)
- **Full details:** `detailed-logs.md` (complete session documentation)
- **This file:** Template and instructions only

**When to log:**
- At the end of each significant session
- When major milestones are achieved
- Before context/memory resets

---

## 📋 Session Log Template

Use this template in `detailed-logs.md`:

```markdown
## Session [N]: [Descriptive Title]
**Date:** [Month Day, Year, Start Time - End Time PST]  
**Duration:** ~[X] hours  
**Tokens Used:** [X] tokens  
**Estimated Cost:** $[X]  
**Mode:** [Build/Plan/Chat]

### 🎯 Objectives
- [Primary objective 1]
- [Primary objective 2]
- [Primary objective 3]

### ✅ Accomplishments

#### 1. [Feature/Task Name]
**File [Created/Modified]:** `[path/to/file]`

**Description:**
[2-3 sentences describing what was built]

**Key Details:**
- [Detail 1]
- [Detail 2]
- [Detail 3]

**Impact:**
[Business/technical impact in 1-2 sentences]

#### 2. [Next Feature/Task]
[Repeat structure above]

### 📁 Files Created/Modified

**Created:**
- `[file-path]` ([brief description, word count if content])

**Modified:**
- `[file-path]` ([what changed])

### 🎯 Business Impact

**[Category 1] (e.g., SEO, Features, Infrastructure):**
- [Metric/achievement 1]
- [Metric/achievement 2]

**[Category 2]:**
- [Metric/achievement 1]

### 🏗️ Architecture Review
**Architect Status:** [✅ Approved / ⚠️ Issues / ❌ Needs revision]

**Findings:**
- [Finding 1]
- [Finding 2]

**Recommendations:**
1. [Recommendation 1]
2. [Recommendation 2]

### 📊 Testing
- [✅/❌] [Test description]
- [✅/❌] [Test description]

### 🔜 Next Steps
1. [Next action 1]
2. [Next action 2]

### 💰 Cost Breakdown
- Token usage: [X] tokens
- Estimated cost: $[X] (Claude 4.5 Sonnet @ $0.03/1K tokens)
- Time investment: [X] hours
- **Cost efficiency:** [relevant metric, e.g., $/article, $/feature]

**ROI Analysis:** (if applicable)
- [Key metric 1]
- [Key metric 2]
- **Cost:** $[X] | **Potential Revenue:** $[X] | **ROI:** [X]x

---
```

---

## 📊 Summary Template

Use this template in `summary.md`:

```markdown
## Session [N]: [Descriptive Title]
**Date:** [Month Day, Year, Start - End PST] | **Cost:** $[X]

**Delivered:**
- [Key deliverable 1]
- [Key deliverable 2]
- [Key deliverable 3]

**Impact:** [Primary business impact in 1 sentence] | [ROI if applicable]

---
```

---

## ⏰ Time Conversion Guide

**Project Timezone:** Pacific Standard Time (PST) / Pacific Daylight Time (PDT)

**Common Conversions:**
- Eastern Time (ET) → PST: Subtract 3 hours
- Central Time (CT) → PST: Subtract 2 hours
- Mountain Time (MT) → PST: Subtract 1 hour
- UTC → PST: Subtract 8 hours (PST) or 7 hours (PDT)

**Example:**
- 10:20 PM ET → 7:20 PM PST
- 2:30 PM ET → 11:30 AM PST

---

## 📈 Metrics to Track

**Development Velocity:**
- Sessions completed
- Token usage
- Cost efficiency ($/deliverable)
- Time investment

**Content Metrics:**
- Word count
- Articles/pages created
- FAQs added
- Schema coverage %

**SEO Metrics:**
- Target keywords
- Monthly search volume potential
- Traffic projections
- Conversion estimates

**Technical Metrics:**
- Files created/modified
- Features implemented
- Tests passed
- Issues resolved

---

## 💡 Best Practices

**DO:**
- ✅ Log immediately after session ends
- ✅ Update both summary.md and detailed-logs.md
- ✅ Use PST for all timestamps
- ✅ Include architect review status
- ✅ Calculate ROI for content/feature work
- ✅ Link to specific files with full paths

**DON'T:**
- ❌ Mix timezones (always use PST)
- ❌ Skip cost calculations
- ❌ Forget to update cumulative metrics
- ❌ Leave architect review status blank
- ❌ Use vague descriptions

---

## 🔄 Updating Process

**After Each Session:**
1. Add new session to TOP of `detailed-logs.md`
2. Add condensed entry to TOP of `summary.md`
3. Update project statistics in both files
4. Increment session counter
5. Update "Last Updated" timestamp

**Monthly:**
- Review and archive if files become too large (>1000 lines)
- Update cumulative progress tracking
- Verify all costs and metrics are accurate

---

## 📂 File Organization

```
Birds Eye/
├── session-logs/
│   ├── summary.md         (Quick reference, ~100 lines)
│   ├── detailed-logs.md   (Full documentation, ~1000 lines)
│   └── template.md        (This file - instructions only)
└── replit.md              (Links to session-logs/summary.md)
```

---

**Token costs:** Calculated at $0.03/1K tokens for Claude 4.5 Sonnet  
**ROI calculations:** Based on $49/prenup × 5% conversion rate  
**Traffic potential:** From keyword research and SEO projections
