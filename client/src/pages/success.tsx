import { Link, useLocation } from "wouter";
import { CheckCircle, Mail, Shield, FileText, ArrowRight, Download, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { SEOHead } from "@/components/seo-head";

export default function Success() {
  const [result, setResult] = useState<any>(null);
  const [, setLocation] = useLocation();

  useEffect(() => {
    const stored = localStorage.getItem('prenup-result');
    console.log('[Success Page] localStorage data:', stored);
    if (stored) {
      const parsed = JSON.parse(stored);
      console.log('[Success Page] Parsed result:', parsed);
      setResult(parsed);
      localStorage.removeItem('prenup-result');
      
      // Redirect to review page if we have an intakeId
      if (parsed.intakeId) {
        console.log('[Success Page] Redirecting to review page:', `/review/${parsed.intakeId}`);
        setLocation(`/review/${parsed.intakeId}`);
      }
    } else {
      console.log('[Success Page] No result in localStorage');
    }
  }, [setLocation]);

  const handleDownload = () => {
    if (result?.downloadUrl) {
      const link = document.createElement('a');
      link.href = result.downloadUrl;
      link.download = 'Prenuptial-Agreement.docx';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const emailDelivered = result?.emailDelivered === true;
  
  console.log('[Success Page] Current result state:', result);
  console.log('[Success Page] emailDelivered:', emailDelivered);

  return (
    <>
      <SEOHead
        title="Prenup Generated Successfully - Download Your California Prenuptial Agreement"
        description="Your California prenup has been generated and delivered. Download your attorney-ready prenuptial agreement document or check your email for delivery."
      />
    <div className="min-h-screen bg-background">
      <header className="border-b bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" data-testid="link-home">
              <div className="flex items-center space-x-2 cursor-pointer">
                <Shield className="h-6 w-6 text-primary" />
                <span className="text-lg font-bold">Drafter</span>
              </div>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-chart-2/10 mb-6">
              <CheckCircle className="h-10 w-10 text-chart-2" data-testid="icon-success" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Prenup Generated Successfully!</h1>
            <p className="text-lg text-muted-foreground">
              {emailDelivered 
                ? "Your California prenuptial agreement has been generated and sent to your email."
                : "Your California prenuptial agreement has been generated."}
            </p>
          </div>

          {emailDelivered && (
            <Card className="mb-8" data-testid="card-email-sent">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Mail className="h-5 w-5 text-primary" />
                  <span>Check Your Email</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  We've sent your prenuptial agreement as a Word document (.docx) to the email address you provided.
                  The email should arrive within the next few minutes.
                </p>
                <div className="rounded-lg bg-muted/50 p-4 space-y-2">
                  <p className="text-sm font-medium">What's included in your document:</p>
                  <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Full financial disclosure clauses</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Separate and community property provisions</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Spousal support terms as specified</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>California governing law clauses</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Execution and signature pages</span>
                    </li>
                  </ul>
                </div>
                {result?.downloadUrl && (
                  <Button 
                    onClick={handleDownload}
                    className="w-full"
                    size="lg"
                    data-testid="button-download-inline"
                  >
                    <Download className="mr-2 h-5 w-5" />
                    Download Your Prenuptial Agreement
                  </Button>
                )}
              </CardContent>
            </Card>
          )}

          {/* Always present a general download section when available */}
          {result?.downloadUrl && !emailDelivered && (
            <Card className="mb-8 border-chart-4/30 bg-chart-4/5" data-testid="card-download">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-chart-4" />
                  <span>Email Delivery Failed</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  We weren't able to send your document via email. Please download it directly using the button below.
                </p>
                <Button 
                  onClick={handleDownload} 
                  className="w-full" 
                  size="lg"
                  data-testid="button-download"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download Your Prenuptial Agreement
                </Button>
              </CardContent>
            </Card>
          )}

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>Next Steps</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start">
                    <span className="font-semibold text-foreground mr-2">1.</span>
                    <span>Download and review your prenup carefully</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-semibold text-foreground mr-2">2.</span>
                    <span>Share with your partner for review</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-semibold text-foreground mr-2">3.</span>
                    <span>Consult with independent attorneys (recommended)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-semibold text-foreground mr-2">4.</span>
                    <span>Make any necessary revisions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-semibold text-foreground mr-2">5.</span>
                    <span>Sign with proper witnessing and notarization</span>
                  </li>
                </ol>
              </CardContent>
            </Card>

            <Card className="border-primary/30 bg-primary/5">
              <CardHeader>
                <CardTitle className="text-lg">Attorney Review Available</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Want a licensed California attorney to review your prenup? Our partner law firms offer
                  professional review services at significantly reduced rates.
                </p>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start">
                    <span className="text-chart-2 mr-2">✓</span>
                    <span>Expert review of all clauses</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-chart-2 mr-2">✓</span>
                    <span>Compliance verification</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-chart-2 mr-2">✓</span>
                    <span>Filing assistance</span>
                  </li>
                </ul>
                <Button className="w-full" variant="outline" data-testid="button-attorney-review">
                  Learn About Attorney Review
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="rounded-lg border border-chart-4/30 bg-chart-4/5 p-6 mb-8">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-0.5">
                <div className="h-6 w-6 rounded-full bg-chart-4/20 flex items-center justify-center">
                  <span className="text-chart-4 text-sm font-bold">!</span>
                </div>
              </div>
              <div className="text-sm">
                <p className="font-medium text-chart-4 mb-2">Important Legal Notice</p>
                <p className="text-muted-foreground">
                  This document is provided for informational purposes only and does not constitute legal advice.
                  California law requires that both parties have the opportunity to consult with independent legal
                  counsel before signing a prenuptial agreement. We strongly recommend having this draft reviewed
                  by a licensed attorney to ensure it meets all legal requirements and protects your interests.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link href="/" data-testid="link-back-home">
              <Button variant="outline" data-testid="button-back-home">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
