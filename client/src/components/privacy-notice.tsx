import { Shield, Lock } from "lucide-react";

export function PrivacyNotice() {
  return (
    <div className="rounded-lg border border-chart-3/30 bg-chart-3/5 p-4 mt-6">
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 mt-0.5">
          <div className="h-8 w-8 rounded-full bg-chart-3/20 flex items-center justify-center">
            <Lock className="h-4 w-4 text-chart-3" />
          </div>
        </div>
        <div className="space-y-2 flex-1">
          <div className="flex items-center space-x-2">
            <Shield className="h-4 w-4 text-chart-3" />
            <span className="font-semibold text-chart-3">Privacy Protected</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Your sensitive information (names, financial details) is automatically masked before AI processing.
            We use 256-bit encryption and never train AI models on your data. All information is securely deleted
            after 7 days.
          </p>
        </div>
      </div>
    </div>
  );
}
