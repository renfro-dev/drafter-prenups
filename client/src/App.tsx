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
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/intake" component={Intake} />
      <Route path="/success" component={Success} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
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
