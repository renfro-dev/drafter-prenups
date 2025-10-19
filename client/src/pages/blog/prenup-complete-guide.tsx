import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  BookOpen, Shield, Scale, TrendingUp, Clock, Users, 
  AlertTriangle, CheckCircle2, Heart, DollarSign, Building2,
  FileText, Sparkles, ArrowRight, Calendar
} from "lucide-react";
import { SEOHead } from "@/components/seo-head";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function PrenupCompleteGuide() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Complete Guide to Prenuptial Agreements in 2025",
    "description": "Comprehensive guide to prenuptial agreements covering California law, costs, timing, common mistakes, and modern AI-powered drafting options. Everything you need to know before marriage.",
    "author": {
      "@type": "Organization",
      "name": "Drafter"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Drafter",
      "logo": {
        "@type": "ImageObject",
        "url": "https://drafter.replit.app/logo.png"
      }
    },
    "datePublished": "2025-10-19",
    "dateModified": "2025-10-19"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Are prenuptial agreements enforceable in California?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, prenuptial agreements are fully enforceable in California when properly executed according to California Family Code §§1612-1615. Requirements include: voluntary execution without duress, full written disclosure of assets and debts, at least 7 days between presentation and execution, independent legal representation opportunity for both parties, written agreement with proper signatures, and fundamentally fair terms. California courts strictly enforce valid prenups but will invalidate agreements that violate these requirements or attempt to limit child support."
        }
      },
      {
        "@type": "Question",
        "name": "What should be included in a prenuptial agreement?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A comprehensive prenup should include: complete asset and debt schedules listing all property owned before marriage, designation of separate vs. community property, spousal support provisions or waivers, inheritance protections for children from prior relationships, business ownership and valuation procedures, retirement account treatment, real estate ownership terms, debt allocation, and income/bonus classification. California prenups cannot include child custody or child support provisions, as these are determined by the court based on the child's best interests at the time of divorce."
        }
      },
      {
        "@type": "Question",
        "name": "How long does it take to draft a prenuptial agreement?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Traditional attorney-drafted prenups take 4-8 weeks from initial consultation to final execution, factoring in financial disclosure, negotiation, revisions, and independent counsel review. However, modern AI services like Drafter generate comprehensive, state-specific prenups in approximately 10 minutes. Regardless of drafting speed, California law requires at least 7 days between when a party receives the final agreement and when they sign it. Best practice is starting the prenup process 3-6 months before your wedding to ensure adequate review time and eliminate any appearance of duress."
        }
      },
      {
        "@type": "Question",
        "name": "Can a prenup cover future earnings and equity compensation?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, prenups can absolutely address future earnings, bonuses, stock options, and equity compensation. This is especially important in California, a community property state where income earned during marriage is typically split 50/50. Tech workers in Silicon Valley, for example, regularly use prenups to classify RSUs, stock options, and bonuses as separate property. Your prenup can specify that certain types of income remain separate, set percentage splits for equity grants, protect business appreciation, and define how investment gains are treated. Without these provisions, California's default community property rules apply."
        }
      },
      {
        "@type": "Question",
        "name": "Do both partners need separate attorneys in California?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "California law requires that both parties have the opportunity to be represented by independent legal counsel, though it's not strictly required that both parties actually retain attorneys. However, having independent counsel for both parties significantly strengthens the prenup's enforceability and protects both parties' interests. If one party waives their right to counsel, that waiver must be knowing and voluntary, in writing, and executed at least 7 days before signing the prenup. Most family law attorneys strongly recommend independent representation for both parties."
        }
      },
      {
        "@type": "Question",
        "name": "What makes a prenuptial agreement invalid or unenforceable?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Prenups can be invalidated for: signing under duress or coercion, incomplete financial disclosure, unconscionable terms that are extremely unfair, improper execution that doesn't meet state requirements, violation of California's 7-day waiting period, lack of independent counsel opportunity, attempting to predetermine child custody or support, containing illegal provisions, or fraud. Courts also scrutinize timing—prenups signed days before the wedding are often invalidated as coercive, even if they technically meet minimum legal requirements."
        }
      },
      {
        "@type": "Question",
        "name": "How do prenups impact spousal support in California?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Prenups can limit, modify, or completely waive spousal support (alimony) in California. However, courts will not enforce spousal support waivers that would leave one spouse destitute or requiring public assistance. You can: waive spousal support entirely, cap support duration or amount, set a formula for calculating support, or specify conditions under which support is paid. California courts scrutinize support waivers more carefully than property division provisions, especially in long marriages or when there's significant income disparity."
        }
      },
      {
        "@type": "Question",
        "name": "Can we modify or revoke our prenup after marriage?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, prenuptial agreements can be modified or completely revoked after marriage through a postnuptial agreement. Both parties must agree to any changes, and the same legal requirements apply: voluntary execution, full disclosure, written agreement, independent counsel opportunity, and fundamental fairness. Some couples modify their prenups after major life changes like having children, starting a business, receiving an inheritance, or significant income changes. Any modifications must be in writing and properly executed—verbal agreements or informal understandings won't override a written prenup."
        }
      }
    ]
  };

  return (
    <>
      <SEOHead
        title="Complete Guide to Prenuptial Agreements in 2025 | Drafter"
        description="Comprehensive guide to prenuptial agreements covering California law, costs, timing, common mistakes, and modern AI-powered drafting options. Everything you need to know before marriage."
        schema={[articleSchema, faqSchema]}
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
                <span>Prenups 101</span>
                <span>•</span>
                <div className="flex items-center gap-2">
                  <time dateTime="2025-10-19">Published: October 19, 2025</time>
                  <span>•</span>
                  <time dateTime="2025-10-19" className="font-medium">Last Updated: October 19, 2025</time>
                </div>
                <span>•</span>
                <span>28 min read</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Complete Guide to Prenuptial Agreements in 2025
              </h1>
              <p className="text-xl text-muted-foreground">
                Everything you need to know about prenups: California law, costs, timing, common mistakes, and modern drafting options
              </p>
            </header>

            <Card className="bg-primary/5 border-primary/20 mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  Quick Answer
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-base leading-relaxed">
                  A prenuptial agreement is a legal contract defining property division and financial responsibilities if you divorce. In California's community property system, without a prenup, all marital assets and income are split 50/50—regardless of who earned them. Prenups cost $1,500-$10,000 with traditional attorneys or $49 with AI-powered services like Drafter. Start 3-6 months before your wedding.
                </p>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Featured Highlights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-start gap-3">
                    <DollarSign className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <div className="font-semibold">Average Cost</div>
                      <div className="text-sm text-muted-foreground">$1,500-$10,000 traditional<br/>$49 with AI services</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <div className="font-semibold">Recommended Timeline</div>
                      <div className="text-sm text-muted-foreground">Start 3-6 months before wedding</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Scale className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <div className="font-semibold">California Requirement</div>
                      <div className="text-sm text-muted-foreground">7-day waiting period mandatory</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-center mb-12">
              <Link href="/intake">
                <Button size="lg" className="gap-2" data-testid="button-cta-hero">
                  Start Your Prenup for $49
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            <Separator className="my-12" />

            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
                <BookOpen className="h-7 w-7 text-primary" />
                What Is a Prenuptial Agreement?
              </h2>
              
              <p className="text-lg mb-4">
                A prenuptial agreement (commonly called a prenup or premarital agreement) is a legally binding contract that two people sign before getting married. It defines how assets, debts, income, and property will be divided if the marriage ends in divorce or death.
              </p>

              <p className="text-lg mb-4">
                Think of a prenup as a financial blueprint for your marriage. Rather than leaving these critical decisions to state law and divorce courts, you and your partner proactively decide what's fair based on your unique circumstances, values, and financial situation.
              </p>

              <h3 className="text-2xl font-semibold mb-4 mt-6">How Do Prenuptial Agreements Work Legally?</h3>

              <p className="text-lg mb-4">
                Prenups operate on a simple principle: they override your state's default property division laws. Every state has "default prenup" rules that automatically apply if you don't create your own agreement. These default rules vary dramatically by state.
              </p>

              <p className="text-lg mb-4">
                In community property states like California, the default rule is that all income, property, and assets acquired during marriage are split 50/50 in divorce—even if one spouse earned significantly more. In equitable distribution states, courts divide marital property "fairly" (but not necessarily equally) based on various factors.
              </p>

              <p className="text-lg mb-4">
                A prenup lets you opt out of these default rules and create your own framework. You can specify which assets remain separate property, how income and bonuses are classified, whether spousal support will be paid, how businesses are valued, and countless other financial terms.
              </p>

              <h3 className="text-2xl font-semibold mb-4 mt-6">California Legal Context for Prenups</h3>

              <p className="text-lg mb-4">
                California is one of nine community property states, meaning marital property is split equally by default. This makes prenups especially valuable for high earners, business owners, and anyone with significant pre-marital assets in cities like Los Angeles, San Francisco, San Diego, and throughout Silicon Valley.
              </p>

              <p className="text-lg mb-4">
                California Family Code §§1612-1615 governs prenuptial agreements and sets strict requirements for enforceability. Understanding these rules is crucial—a prenup that doesn't meet California's standards will be thrown out by courts, leaving you without the protections you thought you had.
              </p>

              <p className="text-lg mb-4">
                The most important California-specific requirement is the 7-day waiting period between when a party receives the final prenup and when they sign it. This waiting period cannot be waived and is designed to prevent last-minute pressure or coercion.
              </p>

              <p className="text-lg mb-4">
                <Link href="/blog/do-i-need-prenup">
                  <a className="text-primary hover:underline font-medium">
                    Learn more about whether you need a prenup →
                  </a>
                </Link>
              </p>
            </section>

            <Separator className="my-12" />

            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
                <Heart className="h-7 w-7 text-primary" />
                Why Do Couples Choose Prenuptial Agreements?
              </h2>

              <p className="text-lg mb-4">
                Despite persistent myths, prenups aren't about planning for divorce or distrusting your partner. They're about clarity, protection, and having difficult financial conversations before marriage rather than during divorce proceedings.
              </p>

              <h3 className="text-2xl font-semibold mb-4 mt-6">Common Scenarios Where Prenups Are Essential</h3>

              <div className="space-y-6 mb-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building2 className="h-5 w-5 text-primary" />
                      Business Owners and Entrepreneurs
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>
                      If you own a business or plan to start one, a prenup is non-negotiable. Without one, your spouse may claim ownership of business growth during marriage, even if they never worked in the company. Business owners in competitive markets need prenups to protect company equity, prevent ownership disputes, and shield business partners from divorce complications.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-primary" />
                      Second Marriages with Children
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>
                      Prenups are critical for protecting children's inheritance in second marriages. They ensure that assets you intend for your children from a prior relationship don't inadvertently pass to your new spouse if you die. This is especially important when blending families or when one spouse has significantly more assets than the other.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-primary" />
                      Significant Income Disparity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>
                      When one partner earns substantially more—common in fields like tech, medicine, law, or finance—prenups protect the higher earner from unlimited spousal support obligations while ensuring the lower-earning spouse isn't left destitute. They create fair, predictable outcomes rather than leaving everything to a judge's discretion.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <h3 className="text-2xl font-semibold mb-4 mt-8">Debunking Common Prenup Myths</h3>

              <p className="text-lg mb-4">
                <strong>Myth 1: "Prenups mean you expect to divorce."</strong> False. Every married couple already has a prenup—either one they created that reflects their values, or the default prenup their state imposes. Creating your own shows maturity and financial responsibility.
              </p>

              <p className="text-lg mb-4">
                <strong>Myth 2: "Prenups are only for wealthy people."</strong> Not true. Even couples with modest assets benefit from prenups for debt protection, business planning, and inheritance preservation. Future earnings matter just as much as current assets.
              </p>

              <p className="text-lg mb-4">
                <strong>Myth 3: "Prenups aren't romantic."</strong> Incorrect. Financial alignment is one of the strongest predictors of marital success. Couples who discuss money openly before marriage have healthier relationships. The prenup conversation itself is valuable, regardless of whether you divorce.
              </p>

              <p className="text-lg mb-4">
                <Link href="/blog/do-i-need-prenup">
                  <a className="text-primary hover:underline font-medium">
                    Read our complete guide to deciding if you need a prenup →
                  </a>
                </Link>
              </p>
            </section>

            <Separator className="my-12" />

            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
                <Scale className="h-7 w-7 text-primary" />
                What Are California's Prenup Requirements?
              </h2>

              <p className="text-lg mb-4">
                California's community property system makes prenups both more valuable and more strictly regulated than in many other states. Understanding these requirements is essential for creating an enforceable agreement.
              </p>

              <h3 className="text-2xl font-semibold mb-4 mt-6">Community Property Explained</h3>

              <p className="text-lg mb-4">
                California is one of only nine community property states. Under this system, all income earned and property acquired during marriage is automatically owned 50/50 by both spouses—regardless of whose name is on the title or who earned the money.
              </p>

              <p className="text-lg mb-4">
                This means a tech worker in San Francisco whose stock options vest during marriage must split them equally with their spouse, even if the spouse never worked in tech. A business owner in Los Angeles who grows their company during marriage must share that appreciation. A physician in Orange County who earns $500K annually while their spouse earns $50K still splits all marital income equally.
              </p>

              <p className="text-lg mb-4">
                Community property rules apply automatically unless you opt out via a prenup. This makes prenuptial agreements especially crucial in California compared to equitable distribution states.
              </p>

              <h3 className="text-2xl font-semibold mb-4 mt-6">California Family Code Requirements</h3>

              <p className="text-lg mb-4">
                California Family Code §§1612-1615 establishes five critical requirements for enforceable prenups:
              </p>

              <div className="space-y-4 mb-6">
                <div className="flex gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <strong className="text-lg">Voluntary Execution:</strong> Both parties must sign voluntarily without duress, coercion, or pressure. Courts scrutinize timing carefully—prenups signed days before the wedding are often invalidated as coercive.
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <strong className="text-lg">Full Written Disclosure:</strong> Each party must provide complete, accurate disclosure of all assets, debts, income, and financial obligations. Hiding even a single asset can invalidate the entire agreement.
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <strong className="text-lg">Seven-Day Waiting Period:</strong> At least 7 calendar days must pass between when a party receives the final agreement and when they sign it. This period cannot be waived under any circumstances.
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <strong className="text-lg">Independent Legal Representation:</strong> Both parties must have the opportunity to be represented by independent counsel. While not strictly required, waiving representation must be done knowingly and in writing.
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <strong className="text-lg">Fundamental Fairness:</strong> The agreement cannot be unconscionable or extremely unfair. While prenups don't need perfect equality, they cannot leave one party destitute.
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-semibold mb-4 mt-6">How Does California Compare to Other States?</h3>

              <p className="text-lg mb-4">
                California's prenup laws are stricter than most states. The mandatory 7-day waiting period is longer than many states' requirements. California also imposes higher disclosure standards and scrutinizes spousal support waivers more carefully.
              </p>

              <p className="text-lg mb-4">
                These stricter standards actually benefit couples by creating clearer enforceability guidelines. A properly executed California prenup is more likely to withstand legal challenges than prenups in states with vague or inconsistent requirements.
              </p>

              <p className="text-lg mb-4">
                California courts have developed extensive case law around prenups. Landmark cases like In re Marriage of Bonds (2000) established that even extremely favorable prenups can be enforceable if properly executed, while cases like In re Marriage of Pendleton & Fireman (2000) demonstrate courts' willingness to invalidate prenups signed under pressure.
              </p>
            </section>

            <Separator className="my-12" />

            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
                <Calendar className="h-7 w-7 text-primary" />
                What's the Timeline for Getting a Prenup?
              </h2>

              <p className="text-lg mb-4">
                Timing is one of the most critical factors in creating an enforceable prenuptial agreement. Start too late, and you risk having your prenup invalidated as coercive. Rush the process, and you may miss important provisions or make costly mistakes.
              </p>

              <h3 className="text-2xl font-semibold mb-4 mt-6">Recommended Timeline: 6 Months to Signing</h3>

              <p className="text-lg mb-4">
                Legal experts recommend starting your prenup process at least 6 months before your wedding date. This timeline eliminates any appearance of duress, provides adequate time for negotiation and revisions, allows both parties to consult independent attorneys, and ensures thoughtful decision-making without wedding pressure.
              </p>

              <div className="space-y-4 mb-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 rounded-full p-3">
                        <span className="text-lg font-bold text-primary">6-5</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg mb-2">Months Before Wedding: Initial Discussions</h4>
                        <p className="text-muted-foreground">
                          Have preliminary conversations about whether you'll get a prenup. Discuss financial philosophies, expectations, and dealbreakers. Begin gathering financial documents.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 rounded-full p-3">
                        <span className="text-lg font-bold text-primary">4-3</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg mb-2">Months Before: Drafting and Disclosure</h4>
                        <p className="text-muted-foreground">
                          Complete full financial disclosure. Draft initial agreement (using attorney or AI service). Each party reviews with independent counsel. Identify areas needing negotiation.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 rounded-full p-3">
                        <span className="text-lg font-bold text-primary">2-1</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg mb-2">Months Before: Finalization</h4>
                        <p className="text-muted-foreground">
                          Negotiate terms and make revisions. Finalize agreement language. Deliver final version to both parties. Wait mandatory 7-day period (California). Sign and notarize.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <p className="text-lg mb-4">
                While AI-powered services like Drafter can generate comprehensive prenups in minutes, you still need adequate time for review, discussion, and California's mandatory waiting period. Speed of generation doesn't mean you should rush the overall process.
              </p>

              <p className="text-lg mb-4">
                <Link href="/blog/prenup-timeline">
                  <a className="text-primary hover:underline font-medium">
                    Read our detailed prenup timeline guide with month-by-month checklist →
                  </a>
                </Link>
              </p>
            </section>

            <div className="flex justify-center my-12">
              <Link href="/intake">
                <Button size="lg" className="gap-2" data-testid="button-cta-process">
                  Get Started with Your Prenup Today
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            <Separator className="my-12" />

            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
                <DollarSign className="h-7 w-7 text-primary" />
                What Financial Assets Should Your Prenup Cover?
              </h2>

              <p className="text-lg mb-4">
                A comprehensive prenup addresses all significant financial aspects of your marriage and potential divorce. Missing important provisions can leave you without protection in critical areas.
              </p>

              <h3 className="text-2xl font-semibold mb-4 mt-6">Assets to Protect</h3>

              <p className="text-lg mb-4">
                Your prenup should explicitly address: pre-marital real estate and property, business ownership and valuation methods, retirement accounts and pensions, investment portfolios and brokerage accounts, intellectual property rights, family heirlooms and inheritance, stock options and equity compensation (especially relevant in Silicon Valley), and cryptocurrency holdings.
              </p>

              <p className="text-lg mb-4">
                For tech workers in the Bay Area, equity compensation requires special attention. Stock options, RSUs, and performance-based equity that vest during marriage become community property under California law unless your prenup specifies otherwise. A well-drafted prenup can classify these assets as separate property or establish a formula for splitting them.
              </p>

              <h3 className="text-2xl font-semibold mb-4 mt-6">Debt Allocation Strategies</h3>

              <p className="text-lg mb-4">
                Prenups aren't just about protecting assets—they also allocate responsibility for debts. Your agreement should specify how student loans are treated (especially if one spouse has significant educational debt), business debts and liabilities, credit card debt accumulated before or during marriage, and mortgage responsibility for real estate owned before marriage.
              </p>

              <p className="text-lg mb-4">
                Debt protection is often overlooked but equally important. If your partner has $200K in student loans, a prenup can ensure you're not responsible for that debt in divorce.
              </p>

              <h3 className="text-2xl font-semibold mb-4 mt-6">Spousal Support Considerations</h3>

              <p className="text-lg mb-4">
                California allows couples to modify or waive spousal support (alimony) in prenups, though courts scrutinize these provisions carefully. You can waive support entirely, cap support duration or amount, set a formula for calculating support, or specify conditions under which support is paid.
              </p>

              <p className="text-lg mb-4">
                However, courts won't enforce waivers that would leave one spouse destitute or requiring public assistance. Support provisions need to be fundamentally fair given the circumstances.
              </p>

              <h3 className="text-2xl font-semibold mb-4 mt-6">Real-World California Examples</h3>

              <p className="text-lg mb-4">
                <strong>Silicon Valley Tech Scenario:</strong> Sarah, a software engineer at a major tech company, earns $400K annually including stock options worth $200K per year. Her fiancé Mark is a teacher earning $65K. Without a prenup, Mark would own 50% of all Sarah's income and stock options earned during marriage under California's community property law. Their prenup classifies Sarah's base salary as community property but keeps 75% of her stock options as separate property, balancing fairness with protection.
              </p>

              <p className="text-lg mb-4">
                <strong>Los Angeles Real Estate Scenario:</strong> David owns a rental property in Santa Monica purchased before marriage, currently worth $2M. He plans to use rental income to pay the mortgage during marriage. Without a prenup, his fiancée Jessica could claim partial ownership based on mortgage payments from marital income. Their prenup specifies that the property remains David's separate property, but Jessica receives a credit for mortgage payments if they divorce, calculated as a percentage of equity growth.
              </p>

              <p className="text-lg mb-4">
                <Link href="/blog/prenup-cost">
                  <a className="text-primary hover:underline font-medium">
                    Learn more about prenup costs and budgeting →
                  </a>
                </Link>
              </p>
            </section>

            <Separator className="my-12" />

            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
                <Users className="h-7 w-7 text-primary" />
                How Should You Discuss a Prenup with Your Partner?
              </h2>

              <p className="text-lg mb-4">
                The prenup conversation can feel uncomfortable, but it's one of the most important financial discussions you'll have as a couple. Approach it thoughtfully, and it strengthens your relationship rather than harming it.
              </p>

              <h3 className="text-2xl font-semibold mb-4 mt-6">How to Broach the Topic</h3>

              <p className="text-lg mb-4">
                Choose the right time—during engagement, not days before the wedding. Frame it positively: "I want to make sure we're both protected and on the same page financially." Lead with your why: protecting a business, honoring a family request, or ensuring financial clarity. Emphasize partnership: "This is something we're creating together that reflects our values."
              </p>

              <p className="text-lg mb-4">
                Avoid common mistakes like springing it on your partner last-minute, presenting a completed prenup without their input, using it as leverage in other relationship negotiations, or treating it as non-negotiable without discussion.
              </p>

              <h3 className="text-2xl font-semibold mb-4 mt-6">Working Together Through the Process</h3>

              <p className="text-lg mb-4">
                Creating a prenup should be collaborative, not adversarial. Both parties should have input on terms. Full transparency about finances is required and builds trust. Independent legal counsel ensures both parties understand the agreement. Regular check-ins prevent misunderstandings or resentment.
              </p>

              <p className="text-lg mb-4">
                Remember that the process of creating a prenup often provides as much value as the document itself. Couples who discuss money, expectations, and worst-case scenarios before marriage tend to have stronger relationships.
              </p>

              <h3 className="text-2xl font-semibold mb-4 mt-6">Attorney vs AI-Powered Services</h3>

              <p className="text-lg mb-4">
                You have two primary options for drafting your prenup: traditional family law attorneys or modern AI-powered services. Traditional attorneys cost $1,500-$10,000 depending on complexity and location, take 4-8 weeks to draft, provide personalized legal advice, and handle complex estates with multiple businesses or trusts.
              </p>

              <p className="text-lg mb-4">
                AI-powered services like Drafter cost around $49, generate comprehensive agreements in 10 minutes, use privacy-preserving PII masking technology, and work well for straightforward estates. They're ideal for couples who want attorney review but prefer to avoid high hourly fees for initial drafting.
              </p>

              <p className="text-lg mb-4">
                Many couples use a hybrid approach: generate the initial draft with an AI service, then have independent attorneys review and modify as needed. This combines cost savings with professional oversight.
              </p>
            </section>

            <Separator className="my-12" />

            <Card className="bg-muted/50 border-muted mb-8">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 rounded-full p-3">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-lg italic">
                      "Using Drafter made the prenup process so much less stressful. We had our comprehensive agreement in minutes, and our attorneys said it was one of the most thorough AI-generated prenups they'd reviewed. The privacy features gave us confidence that our financial information was protected."
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      — Jessica & Michael, San Francisco
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-center my-12">
              <Link href="/intake">
                <Button size="lg" className="gap-2" data-testid="button-cta-testimonial">
                  Create Your Prenup for $49
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
                <AlertTriangle className="h-7 w-7 text-primary" />
                What Mistakes Could Invalidate Your Prenup?
              </h2>

              <p className="text-lg mb-4">
                Even well-intentioned couples make critical errors that render their prenups unenforceable. Understanding these mistakes helps you avoid them.
              </p>

              <h3 className="text-2xl font-semibold mb-4 mt-6">Critical Errors to Avoid</h3>

              <div className="space-y-4 mb-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-destructive">
                      <AlertTriangle className="h-5 w-5" />
                      Mistake #1: Signing Too Close to the Wedding
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>
                      Prenups signed days or even weeks before the wedding are frequently invalidated as coercive. Courts reason that the non-drafting party had no realistic option to refuse without canceling the wedding, losing deposits, and embarrassing themselves. California's mandatory 7-day waiting period is the absolute minimum, but best practice is 30-90 days minimum.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-destructive">
                      <AlertTriangle className="h-5 w-5" />
                      Mistake #2: Incomplete Financial Disclosure
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>
                      Failing to disclose all assets, debts, income, and financial obligations is the most common reason prenups are invalidated. Full disclosure means listing every bank account, investment, property, business interest, retirement account, and debt—no matter how small. If your spouse later discovers a hidden asset, the entire agreement can be thrown out.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-destructive">
                      <AlertTriangle className="h-5 w-5" />
                      Mistake #3: Unconscionable Terms
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>
                      While prenups don't need perfect equality, extremely one-sided terms can be invalidated as unconscionable. Courts look at whether both parties understood the agreement, had adequate review time, were represented by counsel, and whether terms are fundamentally fair given the circumstances.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-destructive">
                      <AlertTriangle className="h-5 w-5" />
                      Mistake #4: Including Unenforceable Provisions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>
                      Prenups cannot include provisions about child custody or child support—these are always determined by courts based on the child's best interests at the time of divorce. Including these provisions doesn't just make those clauses unenforceable; it can taint the entire agreement.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-destructive">
                      <AlertTriangle className="h-5 w-5" />
                      Mistake #5: Skipping Independent Legal Counsel
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>
                      While California doesn't absolutely require both parties to have attorneys, skipping independent counsel significantly weakens your prenup. If one party later claims they didn't understand the agreement or were pressured into signing, lack of independent representation supports their claim.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <p className="text-lg mb-4">
                <Link href="/blog/prenup-mistakes">
                  <a className="text-primary hover:underline font-medium">
                    Read our detailed guide to prenup mistakes and how to avoid them →
                  </a>
                </Link>
              </p>
            </section>

            <Separator className="my-12" />

            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
                <FileText className="h-7 w-7 text-primary" />
                Are Prenups Different for Special Situations?
              </h2>

              <p className="text-lg mb-4">
                Certain life circumstances require additional prenup provisions or considerations beyond standard agreements.
              </p>

              <h3 className="text-2xl font-semibold mb-4 mt-6">Second Marriages with Children</h3>

              <p className="text-lg mb-4">
                Prenups are especially critical in second marriages for protecting children's inheritance rights. Without a prenup, assets you intend for your children from a prior relationship could pass to your new spouse if you die, potentially disinheriting your children.
              </p>

              <p className="text-lg mb-4">
                Second marriage prenups should clearly designate which assets are reserved for children from prior relationships, coordinate with estate planning documents and trusts, address life insurance beneficiaries, and specify whether spousal support is available given prior child support obligations.
              </p>

              <p className="text-lg mb-4">
                <Link href="/blog/second-marriage-prenup">
                  <a className="text-primary hover:underline font-medium">
                    Read our complete guide to prenups for second marriages →
                  </a>
                </Link>
              </p>

              <h3 className="text-2xl font-semibold mb-4 mt-6">Business Owners and Entrepreneurs</h3>

              <p className="text-lg mb-4">
                If you own a business, a prenup is non-negotiable. It should define the business as separate property, protect business appreciation during marriage, establish valuation methods if divorce occurs, prevent spouse ownership claims, and shield business partners from your divorce affecting the company.
              </p>

              <p className="text-lg mb-4">
                Business owners who skip prenups risk losing partial ownership of their companies in divorce. This is especially problematic when you have business partners who could be affected by your spouse gaining ownership stakes.
              </p>

              <h3 className="text-2xl font-semibold mb-4 mt-6">Blended Families</h3>

              <p className="text-lg mb-4">
                Blended families require careful coordination between prenups and estate planning. You need to balance protecting children from prior relationships while being fair to your new spouse. Consider creating trusts that provide for your spouse during their lifetime but ensure assets ultimately pass to your children.
              </p>

              <h3 className="text-2xl font-semibold mb-4 mt-6">LGBTQ+ Couples</h3>

              <p className="text-lg mb-4">
                Same-sex couples have the same access to prenups as opposite-sex couples and should use them for the same reasons. However, LGBTQ+ couples may have additional considerations around adoption rights and parental status, separate property acquired during domestic partnerships before marriage, and estate planning coordination given family dynamics.
              </p>

              <p className="text-lg mb-4">
                California fully recognizes same-sex prenuptial agreements with the same requirements and enforceability as opposite-sex agreements.
              </p>

              <h3 className="text-2xl font-semibold mb-4 mt-6">When to Consider Postnuptial Agreements Instead</h3>

              <p className="text-lg mb-4">
                If you're already married, you can't get a prenup—but you can get a postnuptial agreement that serves the same function. Postnups are appropriate when you didn't have time for a prenup before the wedding, received significant inheritance or started a business after marriage, experienced relationship stress and want to clarify terms before divorce, or need to protect children's inheritance after remarriage.
              </p>

              <p className="text-lg mb-4">
                <Link href="/blog/prenup-vs-postnup">
                  <a className="text-primary hover:underline font-medium">
                    Compare prenups vs postnups to determine which is right for you →
                  </a>
                </Link>
              </p>
            </section>

            <Separator className="my-12" />

            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
                <Sparkles className="h-7 w-7 text-primary" />
                How Does AI-Powered Prenup Drafting Work?
              </h2>

              <p className="text-lg mb-4">
                Modern technology has revolutionized prenup creation, making comprehensive agreements accessible to couples who couldn't afford traditional attorney fees.
              </p>

              <h3 className="text-2xl font-semibold mb-4 mt-6">Modern Prenup Options</h3>

              <p className="text-lg mb-4">
                Today's couples have more prenup options than ever: traditional family law attorneys ($1,500-$10,000), online legal document services ($500-$1,500), and AI-powered drafting platforms like Drafter ($49).
              </p>

              <p className="text-lg mb-4">
                AI-powered services generate comprehensive, state-specific prenups in minutes by asking targeted questions about your assets, debts, and preferences, then using advanced language models to draft customized agreements based on your jurisdiction's requirements.
              </p>

              <h3 className="text-2xl font-semibold mb-4 mt-6">Drafter's Privacy-First Approach</h3>

              <p className="text-lg mb-4">
                Drafter uses cutting-edge PII (personally identifiable information) masking technology to protect your privacy. Here's how it works: you input your actual financial information, Drafter's system masks all personal details before sending data to the AI, the AI generates a prenup using placeholder names and values, Drafter unmasks the data and inserts your real information into the final document.
              </p>

              <p className="text-lg mb-4">
                This means the AI never sees your real names, addresses, bank account numbers, property locations, or financial details. Your sensitive information remains completely private while you benefit from AI-powered drafting.
              </p>

              <h3 className="text-2xl font-semibold mb-4 mt-6">Cost Comparison: Traditional vs AI-Powered</h3>

              <p className="text-lg mb-4">
                In the San Francisco Bay Area, family law attorneys charge $400-$600 per hour. A simple prenup requires 5-10 hours of attorney time ($2,000-$6,000), while complex prenups require 15-25 hours ($6,000-$15,000). Since both parties need independent counsel, double these costs.
              </p>

              <p className="text-lg mb-4">
                Southern California (Los Angeles, San Diego, Orange County) has similar rates: $350-$550 per hour for experienced family law attorneys. A straightforward prenup costs $1,750-$5,500 per party, and complex agreements cost $5,250-$13,750 per party.
              </p>

              <p className="text-lg mb-4">
                AI-powered services like Drafter cost just $49 total—a 97% cost reduction compared to traditional attorneys. You still get a comprehensive, state-specific agreement; you just save thousands on initial drafting. Many couples use the savings to pay for independent attorney review, ensuring professional oversight at a fraction of traditional costs.
              </p>
            </section>

            <Separator className="my-12" />

            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="faq-1">
                  <AccordionTrigger>
                    Are prenuptial agreements enforceable in California?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-base leading-relaxed">
                      Yes, prenuptial agreements are fully enforceable in California when properly executed according to California Family Code §§1612-1615. Requirements include: voluntary execution without duress, full written disclosure of assets and debts, at least 7 days between presentation and execution, independent legal representation opportunity for both parties, written agreement with proper signatures, and fundamentally fair terms. California courts strictly enforce valid prenups but will invalidate agreements that violate these requirements or attempt to limit child support.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="faq-2">
                  <AccordionTrigger>
                    What should be included in a prenuptial agreement?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-base leading-relaxed">
                      A comprehensive prenup should include: complete asset and debt schedules listing all property owned before marriage, designation of separate vs. community property, spousal support provisions or waivers, inheritance protections for children from prior relationships, business ownership and valuation procedures, retirement account treatment, real estate ownership terms, debt allocation, and income/bonus classification. California prenups cannot include child custody or child support provisions, as these are determined by the court based on the child's best interests at the time of divorce.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="faq-3">
                  <AccordionTrigger>
                    How long does it take to draft a prenuptial agreement?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-base leading-relaxed">
                      Traditional attorney-drafted prenups take 4-8 weeks from initial consultation to final execution, factoring in financial disclosure, negotiation, revisions, and independent counsel review. However, modern AI services like Drafter generate comprehensive, state-specific prenups in approximately 10 minutes. Regardless of drafting speed, California law requires at least 7 days between when a party receives the final agreement and when they sign it. Best practice is starting the prenup process 3-6 months before your wedding to ensure adequate review time and eliminate any appearance of duress.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="faq-4">
                  <AccordionTrigger>
                    Can a prenup cover future earnings and equity compensation?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-base leading-relaxed">
                      Yes, prenups can absolutely address future earnings, bonuses, stock options, and equity compensation. This is especially important in California, a community property state where income earned during marriage is typically split 50/50. Tech workers in Silicon Valley, for example, regularly use prenups to classify RSUs, stock options, and bonuses as separate property. Your prenup can specify that certain types of income remain separate, set percentage splits for equity grants, protect business appreciation, and define how investment gains are treated. Without these provisions, California's default community property rules apply.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="faq-5">
                  <AccordionTrigger>
                    Do both partners need separate attorneys in California?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-base leading-relaxed">
                      California law requires that both parties have the opportunity to be represented by independent legal counsel, though it's not strictly required that both parties actually retain attorneys. However, having independent counsel for both parties significantly strengthens the prenup's enforceability and protects both parties' interests. If one party waives their right to counsel, that waiver must be knowing and voluntary, in writing, and executed at least 7 days before signing the prenup. Most family law attorneys strongly recommend independent representation for both parties.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="faq-6">
                  <AccordionTrigger>
                    What makes a prenuptial agreement invalid or unenforceable?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-base leading-relaxed">
                      Prenups can be invalidated for: signing under duress or coercion, incomplete financial disclosure, unconscionable terms that are extremely unfair, improper execution that doesn't meet state requirements, violation of California's 7-day waiting period, lack of independent counsel opportunity, attempting to predetermine child custody or support, containing illegal provisions, or fraud. Courts also scrutinize timing—prenups signed days before the wedding are often invalidated as coercive, even if they technically meet minimum legal requirements.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="faq-7">
                  <AccordionTrigger>
                    How do prenups impact spousal support in California?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-base leading-relaxed">
                      Prenups can limit, modify, or completely waive spousal support (alimony) in California. However, courts will not enforce spousal support waivers that would leave one spouse destitute or requiring public assistance. You can: waive spousal support entirely, cap support duration or amount, set a formula for calculating support, or specify conditions under which support is paid. California courts scrutinize support waivers more carefully than property division provisions, especially in long marriages or when there's significant income disparity.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="faq-8">
                  <AccordionTrigger>
                    Can we modify or revoke our prenup after marriage?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-base leading-relaxed">
                      Yes, prenuptial agreements can be modified or completely revoked after marriage through a postnuptial agreement. Both parties must agree to any changes, and the same legal requirements apply: voluntary execution, full disclosure, written agreement, independent counsel opportunity, and fundamental fairness. Some couples modify their prenups after major life changes like having children, starting a business, receiving an inheritance, or significant income changes. Any modifications must be in writing and properly executed—verbal agreements or informal understandings won't override a written prenup.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </section>

            <Separator className="my-12" />

            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6">Related Articles</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Dive deeper into specific prenup topics with our comprehensive guides
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="hover-elevate">
                  <CardHeader>
                    <CardTitle>Do I Need a Prenup?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Complete guide to determining if you need a prenuptial agreement based on your unique situation, assets, and relationship.
                    </p>
                    <Link href="/blog/do-i-need-prenup">
                      <Button variant="ghost" className="w-full justify-between group" data-testid="button-related-need-prenup">
                        Read Article
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card className="hover-elevate">
                  <CardHeader>
                    <CardTitle>How Much Does a Prenup Cost?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Comprehensive breakdown of prenuptial agreement costs from traditional attorneys to AI-powered services, plus hidden fees to budget for.
                    </p>
                    <Link href="/blog/prenup-cost">
                      <Button variant="ghost" className="w-full justify-between group" data-testid="button-related-cost">
                        Read Article
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card className="hover-elevate">
                  <CardHeader>
                    <CardTitle>When Should You Get a Prenup?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Month-by-month timeline showing exactly when to start your prenup, how long each phase takes, and critical deadlines to meet.
                    </p>
                    <Link href="/blog/prenup-timeline">
                      <Button variant="ghost" className="w-full justify-between group" data-testid="button-related-timeline">
                        Read Article
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card className="hover-elevate">
                  <CardHeader>
                    <CardTitle>5 Common Prenup Mistakes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Critical errors that can render your prenuptial agreement unenforceable and exactly how to avoid them with expert guidance.
                    </p>
                    <Link href="/blog/prenup-mistakes">
                      <Button variant="ghost" className="w-full justify-between group" data-testid="button-related-mistakes">
                        Read Article
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card className="hover-elevate">
                  <CardHeader>
                    <CardTitle>Prenup for Second Marriage</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Essential guide for protecting children's inheritance and navigating the unique financial complexities of second marriages and blended families.
                    </p>
                    <Link href="/blog/second-marriage-prenup">
                      <Button variant="ghost" className="w-full justify-between group" data-testid="button-related-second-marriage">
                        Read Article
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card className="hover-elevate">
                  <CardHeader>
                    <CardTitle>Prenup vs Postnup</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Comprehensive comparison of prenuptial and postnuptial agreements, including enforceability differences and which best protects your interests.
                    </p>
                    <Link href="/blog/prenup-vs-postnup">
                      <Button variant="ghost" className="w-full justify-between group" data-testid="button-related-prenup-vs-postnup">
                        Read Article
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </section>

            <Separator className="my-12" />

            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="pt-8 pb-8">
                <div className="text-center">
                  <h2 className="text-3xl font-bold mb-4">Ready to Protect Your Financial Future?</h2>
                  <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                    Get your comprehensive, California-compliant prenuptial agreement in 10 minutes with privacy-preserving AI technology. Attorney-ready documents for just $49.
                  </p>
                  <Link href="/intake">
                    <Button size="lg" className="gap-2" data-testid="button-cta-final">
                      Create Your Prenup Now
                      <ArrowRight className="h-5 w-5" />
                    </Button>
                  </Link>
                  <p className="text-sm text-muted-foreground mt-4">
                    Join hundreds of couples who've simplified their prenup process with Drafter
                  </p>
                </div>
              </CardContent>
            </Card>
          </article>
        </div>
      </div>
    </>
  );
}
