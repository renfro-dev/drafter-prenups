import { Link } from "wouter";
import { Shield, Lock, ChevronLeft, Database, Eye, Key, FileCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SEOHead } from "@/components/seo-head";

export default function PrivacyPolicy() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How does Drafter protect my personal information?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Drafter uses PII (Personally Identifiable Information) masking to protect your data before AI processing. Your names, financial details, and personal information are replaced with anonymized tokens before being sent to Anthropic Claude AI. The AI never sees your actual data - only masked placeholders."
        }
      },
      {
        "@type": "Question",
        "name": "What is PII masking and how does it work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "PII masking replaces sensitive information with random tokens before AI processing. For example, your name 'Jennifer Martinez' becomes 'PARTY_A_9K2L5M', and financial values become 'VALUE_4P6R2S'. After the AI generates the prenup, we unmask the data to restore your real information in the final document."
        }
      },
      {
        "@type": "Question",
        "name": "Is my data used to train AI models?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. Drafter uses Anthropic Claude with strict no-training commitments. Your data is never used to train, fine-tune, or improve AI models. Anthropic's enterprise privacy policy prohibits using customer data for model training."
        }
      },
      {
        "@type": "Question",
        "name": "How is my data encrypted?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Drafter uses 256-bit AES encryption for all data in transit and at rest. Communication between your browser and our servers uses TLS 1.3. Database storage is encrypted at the field level with industry-standard encryption protocols."
        }
      },
      {
        "@type": "Question",
        "name": "How long is my data retained?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "By default, your data is automatically deleted 7 days after prenup generation. You can request earlier deletion at any time or opt to keep your data longer for future modifications. Deleted data is permanently removed from all systems including backups."
        }
      },
      {
        "@type": "Question",
        "name": "Can I request deletion of my data?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. You can request immediate data deletion at any time by contacting privacy@drafter.com. We will delete all your personal information, intake data, and generated documents within 24 hours. GDPR and CCPA rights fully supported."
        }
      }
    ]
  };

  return (
    <>
      <SEOHead
        title="Privacy Policy - How Drafter Protects Your Data with PII Masking"
        description="Drafter uses advanced PII masking to protect your sensitive information before AI processing. 256-bit encryption, Anthropic Claude privacy commitments, no training on your data."
        schema={schema}
      />
    <div className="min-h-screen bg-background">
      <header className="border-b bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shield className="h-7 w-7 text-primary" />
              <span className="text-xl font-bold tracking-tight">Drafter</span>
            </div>
            <Link href="/" data-testid="link-back-home">
              <Button variant="ghost" size="default" data-testid="button-back-home">
                <ChevronLeft className="mr-1 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="mb-12">
            <div className="inline-flex items-center space-x-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-6">
              <Lock className="h-4 w-4" />
              <span>Privacy-First Technology</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Data Privacy Policy
            </h1>
            <p className="text-lg text-muted-foreground">
              How we protect your sensitive information with industry-leading privacy technology.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Last Updated: October 18, 2025
            </p>
          </div>

          <div className="space-y-8">
            <Card data-testid="card-privacy-commitment">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Our Privacy Commitment
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  At Drafter, we understand that prenuptial agreements contain some of the most sensitive 
                  personal and financial information you'll ever share. <strong>Your privacy is not just 
                  important to us—it's fundamental to how we built this platform.</strong>
                </p>
                <p className="text-muted-foreground">
                  Unlike other AI-powered legal services, we've implemented <strong>industry-leading 
                  privacy protections</strong> that ensure your personal information is <strong>never 
                  exposed to our AI provider</strong> in its raw form.
                </p>
              </CardContent>
            </Card>

            <Card data-testid="card-pii-masking">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5 text-primary" />
                  PII Masking System
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3">How It Works</h3>
                  <p className="text-muted-foreground mb-4">
                    We've designed Drafter with a unique <strong>PII (Personally Identifiable Information) 
                    Masking System</strong> that protects your data before it ever reaches our AI partner 
                    (Anthropic Claude).
                  </p>
                </div>

                <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                  <h4 className="font-semibold text-sm">What Gets Masked Before AI Processing:</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span><strong>Your Names:</strong> Party A/B → PARTY_A_[RANDOM_ID]</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span><strong>Financial Information:</strong> Values & descriptions → VALUE_[RANDOM_ID], DESC_[RANDOM_ID]</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span><strong>Personal Details:</strong> Wedding date, email → DATE_[RANDOM_ID], EMAIL_[RANDOM_ID]</span>
                    </li>
                  </ul>
                </div>

                <div className="border-l-4 border-primary pl-4 space-y-3">
                  <h4 className="font-semibold text-sm">Example of Our Masking:</h4>
                  
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">What You Enter:</p>
                    <div className="bg-background rounded-md p-3 text-sm font-mono">
                      <div>Party A: Jennifer Martinez</div>
                      <div>Party B: Michael Chen</div>
                      <div>Wedding Date: June 15, 2025</div>
                      <div>Asset: Primary residence worth $850,000</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">What Our AI Sees:</p>
                    <div className="bg-background rounded-md p-3 text-sm font-mono">
                      <div>Party A: <span className="text-primary">PARTY_A_9K2L5M</span></div>
                      <div>Party B: <span className="text-primary">PARTY_B_3X7N8Q</span></div>
                      <div>Wedding Date: <span className="text-primary">DATE_4P6R2S</span></div>
                      <div>Asset: Primary residence worth <span className="text-primary">VALUE_8H1J4T</span></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-chart-2 uppercase tracking-wide">What You Receive:</p>
                    <div className="bg-chart-2/10 rounded-md p-3 text-sm">
                      <div className="font-semibold">Your final document with ALL your real information restored perfectly!</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card data-testid="card-data-collection">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-primary" />
                  Data We Collect
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-3">Information You Provide</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span><strong>Party Information:</strong> Full legal names, wedding date, email</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span><strong>Financial Information:</strong> Assets and debts (type, value, ownership, description)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span><strong>Preferences:</strong> Spousal support, property protection, custom provisions</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Information We Generate</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>Masked versions of your data (for debugging only)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>PII mapping (stored encrypted)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>Generation logs (no personal data)</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-destructive/10 rounded-lg p-4">
                  <h3 className="font-semibold mb-3 text-destructive">What We DO NOT Collect</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-destructive mt-0.5">✗</span>
                      <span>Credit card numbers, SSN, driver's license</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-destructive mt-0.5">✗</span>
                      <span>Browsing history or extensive cookies</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-destructive mt-0.5">✗</span>
                      <span>Passwords (no user accounts currently)</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card data-testid="card-data-usage">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileCheck className="h-5 w-5 text-primary" />
                  How We Use Your Data
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-3">Primary Uses</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span><strong>Document Generation:</strong> Create and deliver your personalized prenup</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span><strong>Service Improvement:</strong> Analyze success rates (anonymized) and fix issues</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-destructive/10 rounded-lg p-4">
                  <h3 className="font-semibold mb-3 text-destructive">What We Do NOT Do</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-destructive mt-0.5">✗</span>
                      <span>Sell your information to third parties</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-destructive mt-0.5">✗</span>
                      <span>Use your data to train AI models</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-destructive mt-0.5">✗</span>
                      <span>Share with marketers or advertisers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-destructive mt-0.5">✗</span>
                      <span>Keep unmasked data longer than necessary</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card data-testid="card-data-retention">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-5 w-5 text-primary" />
                  Data Storage & Retention
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-3">Retention Periods</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span><strong>Intake records:</strong> 30 days after generation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span><strong>Generation logs:</strong> 90 days (for analytics)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span><strong>Generated documents:</strong> Not stored on our servers (data URLs only)</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Security Measures</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span><strong>Encryption:</strong> TLS/HTTPS for data in transit, database encryption at rest</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span><strong>Access Control:</strong> Minimal team access, all access logged</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span><strong>Infrastructure:</strong> Hosted on Replit with Neon PostgreSQL (SOC 2 certified)</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card data-testid="card-third-party">
              <CardHeader>
                <CardTitle>Third-Party Services</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold mb-2">Anthropic Claude (AI Partner)</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li><strong>Receives:</strong> Masked data only (no real names or values)</li>
                      <li><strong>Purpose:</strong> Generate prenup content</li>
                      <li><strong>Training:</strong> Does NOT train models on API data</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Neon (Database Provider)</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li><strong>Stores:</strong> All intake data, masked data, logs</li>
                      <li><strong>Security:</strong> SOC 2 Type II certified, encryption at rest</li>
                      <li><strong>Location:</strong> US data centers</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Email Delivery (Optional)</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li><strong>Receives:</strong> Your email address and document</li>
                      <li><strong>Alternative:</strong> Download button if delivery fails</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card data-testid="card-your-rights">
              <CardHeader>
                <CardTitle>Your Rights & Control</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Access Your Data</h3>
                  <p className="text-sm text-muted-foreground">
                    Request a copy of your data by contacting <a href="mailto:privacy@drafter.com" className="text-primary hover:underline">privacy@drafter.com</a>
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Delete Your Data</h3>
                  <p className="text-sm text-muted-foreground">
                    Request deletion at any time. We'll permanently delete within 7 business days.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">California Residents (CCPA)</h3>
                  <p className="text-sm text-muted-foreground">
                    You have the right to know what information we collect, request deletion, 
                    and opt-out of sale (we don't sell your data!).
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="bg-muted/50 rounded-lg p-6 space-y-3">
              <h3 className="font-semibold">Contact Us</h3>
              <div className="grid md:grid-cols-1 gap-4 text-sm">
                <div>
                  <p className="font-semibold mb-1">Privacy Questions</p>
                  <a href="mailto:privacy@drafter.com" className="text-primary hover:underline">privacy@drafter.com</a>
                  <p className="text-xs text-muted-foreground mt-1">48 hour response</p>
                </div>
              </div>
            </div>

            <div className="text-center py-8">
              <p className="text-sm text-muted-foreground mb-4">
                By using Drafter, you agree to this Privacy Policy.
              </p>
              <Link href="/" data-testid="link-back-home-bottom">
                <Button variant="outline" data-testid="button-back-home-bottom">
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Back to Home
                </Button>
              </Link>
            </div>

            <div className="text-xs text-muted-foreground text-center border-t pt-6">
              <p>For detailed technical information, see <code className="bg-muted px-2 py-1 rounded">privacy-policy.md</code> in our repository.</p>
              <p className="mt-2">Last Updated: October 18, 2025</p>
            </div>
          </div>
        </div>
      </main>
    </div>
    </>
  );
}
