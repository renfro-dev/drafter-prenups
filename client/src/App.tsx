import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import Intake from "@/pages/intake";
import Success from "@/pages/success";
import PrivacyPolicy from "@/pages/privacy-policy";
import CaliforniaLanding from "@/pages/california-landing";
import CaliforniaPrenup from "@/pages/california-prenup";
import Blog from "@/pages/blog";
import PrenupMistakes from "@/pages/blog/prenup-mistakes";
import PrenupTimeline from "@/pages/blog/prenup-timeline";
import SecondMarriagePrenup from "@/pages/blog/second-marriage-prenup";
import PrenupVsPostnup from "@/pages/blog/prenup-vs-postnup";
import PrenupCost from "@/pages/blog/prenup-cost";
import DoINeedPrenup from "@/pages/blog/do-i-need-prenup";
import PrenupCompleteGuide from "@/pages/blog/prenup-complete-guide";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/intake" component={Intake} />
      <Route path="/success" component={Success} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/prenup-mistakes" component={PrenupMistakes} />
      <Route path="/blog/prenup-timeline" component={PrenupTimeline} />
      <Route path="/blog/second-marriage-prenup" component={SecondMarriagePrenup} />
      <Route path="/blog/prenup-vs-postnup" component={PrenupVsPostnup} />
      <Route path="/blog/prenup-cost" component={PrenupCost} />
      <Route path="/blog/do-i-need-prenup" component={DoINeedPrenup} />
      <Route path="/blog/prenup-complete-guide" component={PrenupCompleteGuide} />
      <Route path="/states/california" component={CaliforniaLanding} />
      <Route path="/states/california/prenuptial-agreement" component={CaliforniaPrenup} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
