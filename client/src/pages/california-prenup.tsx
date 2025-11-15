import { Link } from "wouter";
import { Shield, ChevronRight, ChevronLeft, Check, FileText, Scale, Clock, DollarSign, Lock, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SEOHead } from "@/components/seo-head";

export default function CaliforniaPrenup() {
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "Complete Guide to California Prenuptial Agreements in 2025",
      "description": "Everything you need to know about California prenups: requirements, costs, enforceability, community property laws, and AI-powered drafting options.",
      "author": {
        "@type": "Organization",
        "name": "Drafter"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Drafter",
        "logo": {
          "@type": "ImageObject",
          "url": "https://drafter.com/logo.png"
        }
      },
      "datePublished": "2025-01-01",
      "dateModified": "2025-01-01"
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "/" },
        { "@type": "ListItem", "position": 2, "name": "California", "item": "/states/california" },
        { "@type": "ListItem", "position": 3, "name": "California Prenuptial Agreement Guide 2025", "item": "/states/california/prenuptial-agreement" }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How much does a prenup cost in California?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Traditional attorney-drafted prenups in California cost between $3,000 and $10,000, depending on complexity and attorney rates. AI-powered options like Drafter provide California-compliant prenups for free, with optional attorney review available."
          }
        },
        {
          "@type": "Question",
          "name": "When should I get a prenup in California?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "California law requires prenups be signed at least 7 days before the wedding. However, it's recommended to begin the process 3-6 months before marriage to allow time for financial disclosure, independent legal review, and revisions."
          }
        },
        {
          "@type": "Question",
          "name": "Can a prenup be invalidated in California?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. California courts can invalidate prenups for: lack of voluntary execution, failure to provide full financial disclosure, unconscionability at the time of enforcement, lack of independent legal counsel (advisory), or fraud/duress."
          }
        },
        {
          "@type": "Question",
          "name": "What is community property in California?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "California is a community property state, meaning assets and debts acquired during marriage are owned equally (50/50) by both spouses, regardless of whose name is on the title. A prenup can modify this default rule."
          }
        },
        {
          "@type": "Question",
          "name": "Do both parties need separate attorneys in California?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Not legally required in all cases, but strongly recommended. California Family Code §1615 creates a rebuttable presumption that a prenup waiving spousal support was involuntary if the disadvantaged party didn't have independent counsel. Courts are far more likely to enforce prenups where both parties had separate attorneys."
          }
        },
        {
          "@type": "Question",
          "name": "Can we modify a prenup after marriage?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, through a postnuptial agreement. The same requirements apply: written agreement, voluntary execution, full financial disclosure, and ideally independent legal counsel for both parties. California Family Code §1500 governs postnups."
          }
        },
        {
          "@type": "Question",
          "name": "What happens if we divorce in another state?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "California prenups are generally enforceable in other states under the Full Faith and Credit Clause of the U.S. Constitution, but the enforcing state's laws will apply. It's wise to include a choice of law provision specifying California law governs the agreement."
          }
        },
        {
          "@type": "Question",
          "name": "How do we provide full financial disclosure?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Attach a complete schedule of assets and debts to the prenup, including: all real estate, bank accounts, retirement accounts, investment accounts, business interests, vehicles, valuable personal property, and all debts. Include current fair market values and supporting documentation."
          }
        },
        {
          "@type": "Question",
          "name": "Can I protect my inheritance with a prenup?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Inheritances are separate property by default in California, but they can become commingled with community property. A prenup can explicitly state that inheritances remain separate property and establish how to handle commingling situations (e.g., depositing inheritance in joint accounts)."
          }
        },
        {
          "@type": "Question",
          "name": "What if my spouse refuses to sign a prenup?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You cannot force someone to sign a prenup. However, you can explain the benefits of financial clarity and protection for both parties. If your fiancé refuses and you have significant assets or business interests, you may need to reconsider the marriage or accept California's default community property rules."
          }
        },
        {
          "@type": "Question",
          "name": "Is a prenup enforceable if we move out of California?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Generally yes. California prenups are typically enforceable in other states under the Full Faith and Credit Clause. However, the enforcing state's laws will apply, and some states have stricter requirements. Include a choice of law provision stating California law governs the agreement to maximize enforceability nationwide."
          }
        },
        {
          "@type": "Question",
          "name": "Can a prenup protect my retirement accounts in California?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. You can designate pre-marriage retirement accounts as separate property and establish how retirement contributions made during marriage are treated. Without a prenup, retirement account contributions and growth during marriage are community property subject to 50/50 division in divorce."
          }
        },
        {
          "@type": "Question",
          "name": "What is the 7-day rule for prenups in California?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "California Family Code §1615 requires at least 7 calendar days between when a party receives the final prenup and when they sign it. This cooling-off period prevents rushed decisions under wedding pressure. Signing earlier can make the prenup voidable for lack of voluntary execution."
          }
        },
        {
          "@type": "Question",
          "name": "Do I need a prenup if I own a home before marriage?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Not required, but highly recommended. While homes owned before marriage are separate property, complications arise with mortgage payments, improvements, and refinancing during marriage. A prenup clarifies ownership, prevents transmutation claims, and protects your equity from community property claims."
          }
        },
        {
          "@type": "Question",
          "name": "Can a prenup protect future business income in California?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, with careful drafting. You can specify that business income during marriage remains separate property rather than community property. This is crucial for entrepreneurs and business owners, but courts scrutinize these provisions heavily, so attorney review is essential."
          }
        },
        {
          "@type": "Question",
          "name": "How does a prenup affect student loan debt in California?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Student loans brought into marriage are separate debt. However, a prenup can clarify who pays for loans incurred during marriage, how joint income is used for payments, and whether the educated spouse must reimburse the community for loans paid with marital funds. Without a prenup, California law presumes community funds used for separate debt create reimbursement rights."
          }
        },
        {
          "@type": "Question",
          "name": "Can I include a cheating clause in my California prenup?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Lifestyle clauses including infidelity penalties are legally unenforceable in California. Courts view them as against public policy because California is a no-fault divorce state. Prenups can only address financial matters like property division and spousal support, not behavior-based penalties."
          }
        },
        {
          "@type": "Question",
          "name": "What makes a prenup invalid in California court?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "California courts invalidate prenups for: being unsigned or not in writing; lack of voluntary execution (coercion, duress); failure to provide full financial disclosure; unconscionability at enforcement; fraud or undue influence; violations of the 7-day rule; or attempting to limit child support obligations."
          }
        },
        {
          "@type": "Question",
          "name": "How much does attorney review cost for a California prenup?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Attorney review of an existing prenup draft typically costs $500-$2,000 in California, depending on the attorney's hourly rate and complexity. This is 70-80% cheaper than full-service prenup preparation ($3,000-$10,000). Independent review for both parties ensures enforceability and catches potential issues."
          }
        },
        {
          "@type": "Question",
          "name": "Can a prenup be changed after signing in California?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, but only through a written amendment signed by both parties, or by creating a postnuptial agreement that supersedes the prenup. Verbal modifications are unenforceable. Both parties should have independent legal counsel review any changes to ensure they're valid and protect their interests."
          }
        }
      ]
    }
  ];

  return (
    <>
      <SEOHead
        title="California Prenuptial Agreement Guide 2025 - Requirements, Costs, Laws"
        description="Complete guide to California prenups: UPAA requirements, community property laws, enforcement rules, costs, and AI-powered free alternatives. Attorney-approved information."
        schema={schema}
      />
    <div className="min-h-screen bg-background">
      <header className="border-b bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" data-testid="link-home">
              <div className="flex items-center space-x-2 cursor-pointer">
                <Shield className="h-7 w-7 text-primary" />
                <span className="text-xl font-bold tracking-tight">Drafter</span>
              </div>
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/states/california">
                <Button variant="ghost" size="sm">
                  <ChevronLeft className="mr-1 h-4 w-4" />
                  Back to California
                </Button>
              </Link>
              <Link href="/intake" data-testid="link-create-prenup">
                <Button size="default" data-testid="button-create-prenup">
                  Create Prenup - Free
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="py-12 md:py-16">
        <article className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="mb-12">
            <div className="inline-flex items-center space-x-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-6">
              <Scale className="h-4 w-4" />
              <span>California Family Law</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Complete Guide to California Prenuptial Agreements in 2025
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Everything you need to know about prenuptial agreements in California, including legal requirements,
              costs, enforceability, community property laws, and modern AI-powered alternatives that make
              quality prenups accessible for free instead of $3,000+.
            </p>
            <div className="flex flex-wrap gap-4 mt-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>15 min read</span>
              </div>
              <div className="flex items-center space-x-2">
                <FileText className="h-4 w-4" />
                <span>Last Updated: January 2025</span>
              </div>
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold mt-12 mb-6">What is a Prenuptial Agreement?</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              A prenuptial agreement (prenup or premarital agreement) is a legally binding contract created by two 
              people before marriage that establishes how assets, debts, and spousal support will be handled during 
              the marriage and in the event of divorce or death. In California, prenups are governed by the Uniform 
              Premarital Agreement Act (UPAA), codified in California Family Code Sections 1600-1617.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              California prenups serve several critical functions: protecting separate property brought into the marriage,
              defining how community property will be divided, addressing spousal support (alimony), allocating debts,
              protecting business interests, and ensuring estate planning objectives are met.
            </p>

            <Card className="my-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-primary" />
                  Skip the $5,000 Attorney Bill
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Create a California-compliant prenup with Drafter's AI-powered platform for free. Our system uses
                  verified California legal clauses and PII masking for privacy. Attorney review available at a
                  fraction of traditional costs.
                </p>
                <Link href="/intake">
                  <Button className="w-full sm:w-auto">
                    Create California Prenup Now
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <h2 className="text-3xl font-bold mt-12 mb-6">California Community Property Law Explained</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              California is one of only nine community property states in the United States (along with Arizona,
              Idaho, Louisiana, Nevada, New Mexico, Texas, Washington, and Wisconsin). This designation has profound
              implications for married couples and makes prenuptial agreements particularly important.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Under California's community property system, all assets and debts acquired during the marriage are
              presumed to be owned equally (50/50) by both spouses, regardless of whose name appears on the title
              or who earned the income. This includes salaries, real estate purchased during marriage, retirement
              account contributions made during marriage, business interests acquired during marriage, and even
              debt incurred by either spouse during marriage.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Separate property, by contrast, includes assets owned before marriage, gifts and inheritances received
              by one spouse (even during marriage), and property acquired after permanent separation. However, separate
              property can become "commingled" with community property and lose its separate character—a common problem
              that prenups can prevent.
            </p>

            <h3 className="text-2xl font-bold mt-8 mb-4">Why Community Property Matters</h3>
            <div className="space-y-4 mb-6">
              <div className="flex items-start space-x-3">
                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <Check className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-semibold mb-1">Equal Division in Divorce</p>
                  <p className="text-muted-foreground text-sm">
                    Without a prenup, California courts divide community property 50/50 in divorce, which can force
                    the sale of businesses, homes, or other assets to achieve an equal split.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <Check className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-semibold mb-1">Debt Responsibility</p>
                  <p className="text-muted-foreground text-sm">
                    Community property rules mean you can be held responsible for debts your spouse incurred during
                    marriage, even if you didn't know about them or benefit from them.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <Check className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-semibold mb-1">Business Protection</p>
                  <p className="text-muted-foreground text-sm">
                    If you start or grow a business during marriage, your spouse has a 50% community property interest—
                    potentially forcing you to buy them out or sell the business in divorce.
                  </p>
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-bold mt-12 mb-6">Legal Requirements for Valid California Prenups</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              California's Uniform Premarital Agreement Act (Family Code §§1600-1617) establishes strict requirements
              for prenup validity. Courts scrutinize prenups carefully, and failure to meet these requirements can
              result in the entire agreement being invalidated.
            </p>

            <h3 className="text-2xl font-bold mt-8 mb-4">Mandatory Requirements</h3>
            <div className="space-y-6 mb-6">
              <div className="border-l-4 border-primary pl-6">
                <h4 className="font-bold text-lg mb-2">1. Written Document</h4>
                <p className="text-muted-foreground">
                  Oral prenuptial agreements are never enforceable in California. The agreement must be in writing
                  and signed by both parties. Electronic signatures are acceptable, but both parties must have access
                  to independent copies.
                </p>
              </div>
              <div className="border-l-4 border-primary pl-6">
                <h4 className="font-bold text-lg mb-2">2. Voluntary Execution</h4>
                <p className="text-muted-foreground">
                  Both parties must enter the agreement voluntarily, without duress, fraud, or undue influence.
                  California Family Code §1615 establishes a rebuttable presumption of involuntariness if a party
                  did not have independent legal counsel and did not receive certain disclosures.
                </p>
              </div>
              <div className="border-l-4 border-primary pl-6">
                <h4 className="font-bold text-lg mb-2">3. Full Financial Disclosure</h4>
                <p className="text-muted-foreground">
                  Each party must provide the other with a "fair and reasonable disclosure" of their property and
                  financial obligations. California courts strictly enforce this requirement. Failure to disclose
                  material assets or debts is grounds for invalidation.
                </p>
              </div>
              <div className="border-l-4 border-primary pl-6">
                <h4 className="font-bold text-lg mb-2">4. Seven-Day Waiting Period</h4>
                <p className="text-muted-foreground">
                  California Family Code §1615(c)(2) requires that a party who did not have independent legal counsel
                  must receive the prenup at least 7 calendar days before signing. This gives time to review, seek
                  advice, and negotiate changes.
                </p>
              </div>
              <div className="border-l-4 border-primary pl-6">
                <h4 className="font-bold text-lg mb-2">5. Independent Legal Representation (Strongly Recommended)</h4>
                <p className="text-muted-foreground">
                  While not always mandatory, California law creates a presumption of involuntariness if a party
                  waiving spousal support did not have independent counsel. Courts are far more likely to enforce
                  prenups where both parties had separate attorneys.
                </p>
              </div>
              <div className="border-l-4 border-primary pl-6">
                <h4 className="font-bold text-lg mb-2">6. Conscionability</h4>
                <p className="text-muted-foreground">
                  Even if all procedural requirements are met, courts can refuse to enforce prenup provisions that
                  are "unconscionable"—meaning extremely unfair or one-sided. Unconscionability is evaluated both
                  at the time of execution and at the time of enforcement.
                </p>
              </div>
            </div>

            <h2 className="text-3xl font-bold mt-12 mb-6">What Can (and Can't) Be Included in a California Prenup?</h2>
            
            <h3 className="text-2xl font-bold mt-8 mb-4">Permitted Provisions</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              California Family Code §1612 allows prenups to address a wide range of financial matters:
            </p>
            <div className="space-y-4 mb-8">
              {[
                {
                  title: "Property Rights and Division",
                  content: "Define how property will be classified (separate vs. community) and divided in divorce or death. You can opt out of California's 50/50 community property division entirely."
                },
                {
                  title: "Spousal Support (Alimony)",
                  content: "Modify or eliminate spousal support obligations, subject to court review for unconscionability. Complete waivers are enforceable if both parties had independent counsel."
                },
                {
                  title: "Retirement and Pension Benefits",
                  content: "Determine whether retirement accounts remain separate property or become community property, and establish division percentages."
                },
                {
                  title: "Business Ownership",
                  content: "Protect business interests from becoming community property, prevent forced sales, and establish valuation methods for buyouts."
                },
                {
                  title: "Estate Planning",
                  content: "Waive inheritance rights, define what happens to property upon death, and ensure the prenup coordinates with wills and trusts."
                },
                {
                  title: "Debt Allocation",
                  content: "Assign responsibility for debts incurred before or during marriage, protecting one spouse from the other's financial liabilities."
                }
              ].map((item, i) => (
                <div key={i} className="flex items-start space-x-3">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold mb-1">{item.title}</p>
                    <p className="text-muted-foreground text-sm">{item.content}</p>
                  </div>
                </div>
              ))}
            </div>

            <h3 className="text-2xl font-bold mt-8 mb-4">Prohibited Provisions</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              California law prohibits certain provisions in prenups, and including them can invalidate the entire agreement:
            </p>
            <div className="space-y-4 mb-8">
              {[
                {
                  title: "Child Custody and Visitation",
                  content: "Prenups cannot predetermine child custody, visitation schedules, or parenting time. Courts determine these issues based on the child's best interests at the time of divorce."
                },
                {
                  title: "Child Support",
                  content: "Child support obligations cannot be waived, limited, or modified in a prenup. California public policy requires that children receive adequate support."
                },
                {
                  title: "Personal Conduct",
                  content: "Lifestyle clauses (infidelity penalties, weight requirements, religion clauses, etc.) are generally unenforceable in California as against public policy."
                },
                {
                  title: "Illegal Activities",
                  content: "Any provision encouraging illegal activity or against public policy (e.g., waiving domestic violence protections) will void the agreement."
                }
              ].map((item, i) => (
                <div key={i} className="flex items-start space-x-3">
                  <div className="h-6 w-6 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <AlertTriangle className="h-4 w-4 text-destructive" />
                  </div>
                  <div>
                    <p className="font-semibold mb-1">{item.title}</p>
                    <p className="text-muted-foreground text-sm">{item.content}</p>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="text-3xl font-bold mt-12 mb-6">How Much Does a California Prenup Cost?</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              The cost of a prenuptial agreement in California varies dramatically depending on how you obtain it:
            </p>

            <Card className="my-8">
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div>
                    <div className="flex items-baseline justify-between mb-2">
                      <h4 className="font-bold text-lg">Traditional Attorney (Both Sides)</h4>
                      <span className="text-2xl font-bold text-muted-foreground">$6,000 - $20,000</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Each party needs their own attorney. Hourly rates in California range from $300-$600/hour for
                      family law attorneys, with total time ranging from 10-30 hours per side for drafting, review,
                      and negotiation.
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Initial consultations (both attorneys):</span>
                        <span>$600-$1,200</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Drafting attorney fees:</span>
                        <span>$2,000-$6,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Reviewing attorney fees:</span>
                        <span>$1,500-$4,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Revisions and negotiations:</span>
                        <span>$1,000-$5,000</span>
                      </div>
                      <div className="flex justify-between border-t pt-2 font-semibold">
                        <span>Typical total cost:</span>
                        <span>$6,000-$20,000</span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <div className="flex items-baseline justify-between mb-2">
                      <h4 className="font-bold text-lg text-primary">Drafter AI Platform</h4>
                      <span className="text-2xl font-bold text-primary">Free</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      AI-powered California prenup with verified legal clauses, PII masking for privacy, and attorney
                      review options available at 70-80% less than traditional rates.
                    </p>
                    <Link href="/intake">
                      <Button className="w-full">
                        Create California Prenup for Free
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            <h2 className="text-3xl font-bold mt-12 mb-6">Timeline: When to Get a Prenup in California</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              California law mandates a minimum 7-day waiting period between when a party receives the prenup and when
              they sign it (if they don't have independent counsel). However, waiting until the last minute is risky
              and can provide grounds for invalidation based on duress.
            </p>

            <div className="space-y-4 mb-8">
              <div className="border-l-4 border-primary pl-6">
                <h4 className="font-bold mb-1">3-6 Months Before Wedding (Recommended)</h4>
                <p className="text-muted-foreground text-sm">
                  Start the process well in advance. This allows time for financial disclosure, review by independent
                  attorneys, negotiations, and revisions without the pressure of an approaching wedding date.
                </p>
              </div>
              <div className="border-l-4 border-chart-4 pl-6">
                <h4 className="font-bold mb-1">30-60 Days Before Wedding (Acceptable)</h4>
                <p className="text-muted-foreground text-sm">
                  Still provides adequate time, but creates more pressure. Ensure both parties have access to
                  independent legal counsel and full financial information.
                </p>
              </div>
              <div className="border-l-4 border-destructive pl-6">
                <h4 className="font-bold mb-1">Less Than 30 Days Before Wedding (Risky)</h4>
                <p className="text-muted-foreground text-sm">
                  Courts are more likely to find duress or involuntariness when prenups are signed close to the
                  wedding date, especially if one party feels pressured due to non-refundable deposits or travel
                  arrangements.
                </p>
              </div>
            </div>

            <h2 className="text-3xl font-bold mt-12 mb-6">Enforceability: Will a California Court Uphold Your Prenup?</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              California courts generally enforce prenuptial agreements that meet legal requirements, but several
              factors can lead to partial or complete invalidation:
            </p>

            <h3 className="text-2xl font-bold mt-8 mb-4">Common Reasons for Invalidation</h3>
            <div className="space-y-4 mb-8">
              {[
                {
                  title: "Lack of Voluntary Execution",
                  content: "If one party can prove they signed under duress, undue influence, or without understanding the agreement's consequences."
                },
                {
                  title: "Inadequate Financial Disclosure",
                  content: "Failure to provide complete information about assets or debts. Courts require \"fair and reasonable disclosure\" of all material facts."
                },
                {
                  title: "No Independent Legal Counsel",
                  content: "While not always fatal, lack of independent attorneys creates a presumption of invalidity, especially for spousal support waivers."
                },
                {
                  title: "Unconscionability",
                  content: "Provisions that are extremely unfair or one-sided, particularly if circumstances have changed dramatically since signing."
                },
                {
                  title: "Procedural Defects",
                  content: "Failure to meet the 7-day requirement, lack of written agreement, missing signatures, or other technical errors."
                },
                {
                  title: "Fraud or Misrepresentation",
                  content: "False statements about assets, income, debts, or other material facts that induced the other party to sign."
                }
              ].map((item, i) => (
                <div key={i} className="flex items-start space-x-3">
                  <div className="h-6 w-6 rounded-full bg-chart-4/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-chart-4 font-bold text-sm">{i + 1}</span>
                  </div>
                  <div>
                    <p className="font-semibold mb-1">{item.title}</p>
                    <p className="text-muted-foreground text-sm">{item.content}</p>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="text-3xl font-bold mt-12 mb-6">AI-Powered California Prenups: The Modern Alternative</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Traditional prenup creation is expensive, time-consuming, and often inaccessible to couples who need
              protection but can't afford $5,000-$15,000 in legal fees. AI-powered platforms like Drafter are
              revolutionizing access to quality prenuptial agreements.
            </p>

            <h3 className="text-2xl font-bold mt-8 mb-4">How AI Prenup Generation Works</h3>
            <div className="space-y-6 mb-8">
              <div className="flex items-start space-x-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary font-bold">
                  1
                </div>
                <div>
                  <h4 className="font-bold mb-2">Structured Intake Form</h4>
                  <p className="text-muted-foreground">
                    Complete a comprehensive questionnaire about your assets, debts, income, business interests,
                    and prenup goals. Drafter's form is designed by family law experts to capture all information
                    required for California compliance.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary font-bold">
                  2
                </div>
                <div>
                  <h4 className="font-bold mb-2">PII Masking for Privacy</h4>
                  <p className="text-muted-foreground">
                    Before AI processing, Drafter's system masks all personally identifiable information (names,
                    financial details, addresses) using enterprise-grade PII masking. Your sensitive data never
                    reaches the AI in its raw form.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary font-bold">
                  3
                </div>
                <div>
                  <h4 className="font-bold mb-2">AI Clause Selection</h4>
                  <p className="text-muted-foreground">
                    Anthropic Claude AI analyzes your situation and selects appropriate legal clauses from a verified
                    library of California Family Code-compliant provisions. The AI understands community property
                    nuances and UPAA requirements.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary font-bold">
                  4
                </div>
                <div>
                  <h4 className="font-bold mb-2">Document Generation</h4>
                  <p className="text-muted-foreground">
                    Your personalized prenup is generated as an editable Word document with all PII unmasked and
                    inserted in the appropriate locations. Receive via email within minutes.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary font-bold">
                  5
                </div>
                <div>
                  <h4 className="font-bold mb-2">Attorney Review (Optional)</h4>
                  <p className="text-muted-foreground">
                    Connect with Drafter's partner attorneys for professional review and filing assistance at 70-80%
                    less than traditional full-service prenup preparation.
                  </p>
                </div>
              </div>
            </div>

            <Card className="my-8 border-primary">
              <CardHeader>
                <CardTitle>Create Your California Prenup in 10 Minutes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-3xl font-bold text-primary mb-1">Free</div>
                    <p className="text-sm text-muted-foreground">vs $3,000-$10,000 traditional</p>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary mb-1">10 min</div>
                    <p className="text-sm text-muted-foreground">vs 3-6 weeks traditional</p>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary mb-1">100%</div>
                    <p className="text-sm text-muted-foreground">Private with PII masking</p>
                  </div>
                </div>
                <Link href="/intake">
                  <Button className="w-full" size="lg">
                    Start Your California Prenup Now
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <h2 className="text-3xl font-bold mt-12 mb-6">Frequently Asked Questions</h2>
            
            <Accordion type="single" collapsible className="mb-8">
              <AccordionItem value="faq-1" data-testid="faq-separate-attorneys">
                <AccordionTrigger className="text-left font-semibold">
                  Do both parties need separate attorneys in California?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Not legally required in all cases, but strongly recommended. California Family Code §1615 creates
                  a rebuttable presumption that a prenup waiving spousal support was involuntary if the disadvantaged
                  party didn't have independent counsel. Courts are far more likely to enforce prenups where both
                  parties had separate attorneys.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-2" data-testid="faq-modify-after-marriage">
                <AccordionTrigger className="text-left font-semibold">
                  Can we modify a prenup after marriage?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Yes, through a postnuptial agreement. The same requirements apply: written agreement, voluntary
                  execution, full financial disclosure, and ideally independent legal counsel for both parties.
                  California Family Code §1500 governs postnups.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-3" data-testid="faq-divorce-other-state">
                <AccordionTrigger className="text-left font-semibold">
                  What happens if we divorce in another state?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  California prenups are generally enforceable in other states under the Full Faith and Credit Clause
                  of the U.S. Constitution, but the enforcing state's laws will apply. It's wise to include a choice
                  of law provision specifying California law governs the agreement.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-4" data-testid="faq-financial-disclosure">
                <AccordionTrigger className="text-left font-semibold">
                  How do we provide full financial disclosure?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Attach a complete schedule of assets and debts to the prenup, including: all real estate, bank
                  accounts, retirement accounts, investment accounts, business interests, vehicles, valuable personal
                  property, and all debts. Include current fair market values and supporting documentation.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-5" data-testid="faq-inheritance-protection">
                <AccordionTrigger className="text-left font-semibold">
                  Can I protect my inheritance with a prenup?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Yes. Inheritances are separate property by default in California, but they can become commingled
                  with community property. A prenup can explicitly state that inheritances remain separate property
                  and establish how to handle commingling situations (e.g., depositing inheritance in joint accounts).
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-6" data-testid="faq-spouse-refuses">
                <AccordionTrigger className="text-left font-semibold">
                  What if my spouse refuses to sign a prenup?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  You cannot force someone to sign a prenup. However, you can explain the benefits of financial clarity
                  and protection for both parties. If your fiancé refuses and you have significant assets or business
                  interests, you may need to reconsider the marriage or accept California's default community property
                  rules.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-7" data-testid="faq-cost">
                <AccordionTrigger className="text-left font-semibold">
                  How much does a prenup cost in California?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Traditional attorney-drafted prenups in California cost between $3,000 and $10,000, depending on
                  complexity and attorney rates. AI-powered options like Drafter provide California-compliant prenups
                  for free, with optional attorney review available for $500-$2,000.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-8" data-testid="faq-when">
                <AccordionTrigger className="text-left font-semibold">
                  When should I get a prenup in California?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  California law requires prenups be signed at least 7 days before the wedding. However, it's recommended
                  to begin the process 3-6 months before marriage to allow time for financial disclosure, independent
                  legal review, and revisions. Starting early prevents the appearance of coercion and ensures both parties
                  have adequate time to understand the agreement.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-9" data-testid="faq-invalidated">
                <AccordionTrigger className="text-left font-semibold">
                  Can a prenup be invalidated in California?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Yes. California courts can invalidate prenups for: lack of voluntary execution (coercion, duress),
                  failure to provide full financial disclosure, unconscionability at the time of enforcement, lack of
                  independent legal counsel (in some cases), fraud, undue influence, or violations of the 7-day waiting
                  period. Proper execution and transparency are essential for enforceability.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-10" data-testid="faq-community-property">
                <AccordionTrigger className="text-left font-semibold">
                  What is community property in California?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  California is a community property state, meaning assets and debts acquired during marriage are owned
                  equally (50/50) by both spouses, regardless of whose name is on the title or who earns more. This
                  includes income, real estate, vehicles, retirement contributions, and debt. A prenup allows couples
                  to opt out of this default 50/50 split and create custom arrangements.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-11" data-testid="faq-move-out-of-state">
                <AccordionTrigger className="text-left font-semibold">
                  Is a prenup enforceable if we move out of California?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Generally yes. California prenups are typically enforceable in other states under the Full Faith and
                  Credit Clause. However, the enforcing state's laws will apply, and some states have stricter requirements.
                  Include a choice of law provision stating California law governs the agreement to maximize enforceability
                  nationwide.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-12" data-testid="faq-retirement">
                <AccordionTrigger className="text-left font-semibold">
                  Can a prenup protect my retirement accounts in California?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Yes. You can designate pre-marriage retirement accounts as separate property and establish how retirement
                  contributions made during marriage are treated. Without a prenup, retirement account contributions and
                  growth during marriage are community property subject to 50/50 division in divorce. This is especially
                  important for professionals with established 401(k)s, IRAs, or pensions.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-13" data-testid="faq-7-day-rule">
                <AccordionTrigger className="text-left font-semibold">
                  What is the 7-day rule for prenups in California?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  California Family Code §1615 requires at least 7 calendar days between when a party receives the final
                  prenup and when they sign it. This cooling-off period prevents rushed decisions under wedding pressure.
                  Signing earlier can make the prenup voidable for lack of voluntary execution. The 7-day clock starts when
                  the final version is presented, not drafts.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-14" data-testid="faq-home-ownership">
                <AccordionTrigger className="text-left font-semibold">
                  Do I need a prenup if I own a home before marriage?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Not required, but highly recommended. While homes owned before marriage are separate property, complications
                  arise with mortgage payments, improvements, and refinancing during marriage. A prenup clarifies ownership,
                  prevents transmutation claims, and protects your equity from community property claims. It also addresses
                  what happens if your spouse contributes to mortgage payments or renovations.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-15" data-testid="faq-business-income">
                <AccordionTrigger className="text-left font-semibold">
                  Can a prenup protect future business income in California?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Yes, with careful drafting. You can specify that business income during marriage remains separate property
                  rather than community property. This is crucial for entrepreneurs and business owners, but courts scrutinize
                  these provisions heavily, so attorney review is essential. The prenup should clearly define how to value
                  business appreciation and separate labor from capital contributions.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-16" data-testid="faq-student-loans">
                <AccordionTrigger className="text-left font-semibold">
                  How does a prenup affect student loan debt in California?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Student loans brought into marriage are separate debt. However, a prenup can clarify who pays for loans
                  incurred during marriage, how joint income is used for payments, and whether the educated spouse must
                  reimburse the community for loans paid with marital funds. Without a prenup, California law presumes
                  community funds used for separate debt create reimbursement rights.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-17" data-testid="faq-cheating-clause">
                <AccordionTrigger className="text-left font-semibold">
                  Can I include a cheating clause in my California prenup?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Lifestyle clauses including infidelity penalties are legally unenforceable in California. Courts view them
                  as against public policy because California is a no-fault divorce state. Prenups can only address financial
                  matters like property division and spousal support, not behavior-based penalties. Focus your prenup on
                  protecting assets and clarifying financial rights instead.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-18" data-testid="faq-what-makes-invalid">
                <AccordionTrigger className="text-left font-semibold">
                  What makes a prenup invalid in California court?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  California courts invalidate prenups for: being unsigned or not in writing; lack of voluntary execution
                  (coercion, duress); failure to provide full financial disclosure; unconscionability at enforcement; fraud
                  or undue influence; violations of the 7-day rule; or attempting to limit child support obligations.
                  Proper execution with independent legal counsel minimizes these risks.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-19" data-testid="faq-attorney-review-cost">
                <AccordionTrigger className="text-left font-semibold">
                  How much does attorney review cost for a California prenup?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Attorney review of an existing prenup draft typically costs $500-$2,000 in California, depending on the
                  attorney's hourly rate and complexity. This is 70-80% cheaper than full-service prenup preparation
                  ($3,000-$10,000). Independent review for both parties ensures enforceability and catches potential issues
                  before signing.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-20" data-testid="faq-change-after-signing">
                <AccordionTrigger className="text-left font-semibold">
                  Can a prenup be changed after signing in California?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Yes, but only through a written amendment signed by both parties, or by creating a postnuptial agreement
                  that supersedes the prenup. Verbal modifications are unenforceable. Both parties should have independent
                  legal counsel review any changes to ensure they're valid and protect their interests. Changes require the
                  same formalities as the original prenup.
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <h2 className="text-3xl font-bold mt-16 mb-8">People Also Ask About California Prenups</h2>
            <div className="space-y-8 mb-12">
              <div>
                <h3 className="text-xl font-semibold mb-3">How does California's community property law work?</h3>
                <p className="text-muted-foreground">
                  California is one of nine community property states where assets and debts acquired during marriage are owned equally (50/50) by both spouses. This applies regardless of whose name is on the title or who earns more. A prenup allows couples to opt out of this default 50/50 split and create custom arrangements.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">Can a prenup include child custody or support provisions?</h3>
                <p className="text-muted-foreground">
                  No. California courts will not enforce prenup clauses regarding child custody or child support. These matters are determined by the child's best interests at the time of divorce, not by parental agreements made before marriage. Prenups can only address financial matters between spouses.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">What assets can be protected in a California prenup?</h3>
                <p className="text-muted-foreground">
                  You can protect separate property (assets owned before marriage), inheritances, business interests, real estate, retirement accounts, intellectual property, and future earnings from separate property. You can also define how to handle debt, spousal support waivers, and asset appreciation during marriage.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">Do prenups expire in California?</h3>
                <p className="text-muted-foreground">
                  No, California prenups do not automatically expire. They remain valid until divorce, death, or mutual agreement to revoke. However, courts may find a prenup unconscionable if circumstances change dramatically (e.g., 30-year marriage with children when prenup anticipated no children). Include sunset clauses or regular review provisions for long marriages.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">Can I waive spousal support in a California prenup?</h3>
                <p className="text-muted-foreground">
                  Yes, but with important limitations. California allows spousal support waivers, but courts scrutinize them heavily. Both parties must have independent legal counsel (or the waiving party must explicitly decline in writing after being advised of their right to counsel). Courts can still void unconscionable support waivers.
                </p>
              </div>
            </div>

            <div className="bg-muted/50 rounded-lg p-8 my-12">
              <h2 className="text-2xl font-bold mb-4">Next Steps: Creating Your California Prenup</h2>
              <p className="text-muted-foreground mb-6">
                Whether you choose the traditional attorney route or Drafter's AI-powered platform, the most important
                thing is to start the process early, be transparent about finances, and ensure both parties understand
                and voluntarily agree to the terms.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <span>Start 3-6 months before your wedding date</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <span>Gather complete financial information for both parties</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <span>Create or obtain a draft (via Drafter or attorney)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <span>Have both parties review with independent counsel</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <span>Sign at least 7 days before the wedding</span>
                </div>
              </div>
              <div className="mt-8">
                <Link href="/intake">
                  <Button size="lg" className="w-full">
                    Create California Prenup with Drafter - Free
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </article>

        <section className="py-20 bg-muted/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-related-articles">
                  Related Articles & Resources
                </h2>
                <p className="text-lg text-muted-foreground">
                  Continue learning about prenuptial agreements and privacy-first legal technology
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <Card className="hover-elevate" data-testid="card-related-1">
                  <CardHeader>
                    <CardTitle className="text-lg">California State Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Learn about community property laws and why California couples should consider prenups.
                    </p>
                    <Link href="/states/california">
                      <Button variant="ghost" size="sm" className="w-full justify-between group" data-testid="button-read-overview">
                        Read Overview
                        <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
                <Card className="hover-elevate" data-testid="card-related-2">
                  <CardHeader>
                    <CardTitle className="text-lg">All Prenup Articles</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Browse expert guidance on prenups, privacy technology, and relationship planning.
                    </p>
                    <Link href="/blog">
                      <Button variant="ghost" size="sm" className="w-full justify-between group" data-testid="button-view-blog">
                        View Blog
                        <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-muted/30 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Shield className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold">Drafter</span>
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              © 2025 Drafter. AI-powered California prenuptial agreements.
            </p>
            <p className="text-xs text-muted-foreground">
              For informational purposes only; not legal advice. Attorney review recommended.
            </p>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
}
