import { Switch, Route } from "wouter";
import { Suspense, lazy } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Header } from "@/components/header";
import Home from "@/pages/home";
import Intake from "@/pages/intake";
import Success from "@/pages/success";
import Review from "@/pages/review";
import PrivacyPolicy from "@/pages/privacy-policy";
const CaliforniaLanding = lazy(() => import("@/pages/california-landing"));
const CaliforniaPrenup = lazy(() => import("@/pages/california-prenup"));
import LosAngelesPrenup from "@/pages/states/california/los-angeles";
import SanFranciscoPrenup from "@/pages/states/california/san-francisco";
import SanDiegoPrenup from "@/pages/states/california/san-diego";
import SanJosePrenup from "@/pages/states/california/san-jose";
import SacramentoPrenup from "@/pages/states/california/sacramento";
import OaklandPrenup from "@/pages/states/california/oakland";
import IrvinePrenup from "@/pages/states/california/irvine";
import LongBeachPrenup from "@/pages/states/california/long-beach";
import FresnoPrenup from "@/pages/states/california/fresno";
import SantaAnaPrenup from "@/pages/states/california/santa-ana";
import AnaheimPrenup from "@/pages/states/california/anaheim";
import BakersfieldPrenup from "@/pages/states/california/bakersfield";
import RiversidePrenup from "@/pages/states/california/riverside";
import StocktonPrenup from "@/pages/states/california/stockton";
import ChulaVistaPrenup from "@/pages/states/california/chula-vista";
import FremontPrenup from "@/pages/states/california/fremont";
import Blog from "@/pages/blog";
import PrenupMistakes from "@/pages/blog/prenup-mistakes";
import PrenupTimeline from "@/pages/blog/prenup-timeline";
import SecondMarriagePrenup from "@/pages/blog/second-marriage-prenup";
import PrenupVsPostnup from "@/pages/blog/prenup-vs-postnup";
import PrenupCost from "@/pages/blog/prenup-cost";
import DoINeedPrenup from "@/pages/blog/do-i-need-prenup";
import PrenupCompleteGuide from "@/pages/blog/prenup-complete-guide";
import PrenupCostByCityCA from "@/pages/blog/prenup-cost-by-city-california";
import PrenupsForBusinessOwnersCA from "@/pages/blog/prenups-for-business-owners-california";
import PrenupsAndEquityCompCA from "@/pages/blog/prenups-and-equity-compensation-california";
import HomeOwnershipPrenupsCA from "@/pages/blog/home-ownership-prenups-california";
import SpousalSupportPrenupsCA from "@/pages/blog/spousal-support-prenups-california";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Suspense fallback={<div className="p-6 text-muted-foreground">Loading…</div>}>
      <Switch>
      <Route path="/" component={Home} />
      <Route path="/intake" component={Intake} />
      <Route path="/success" component={Success} />
      <Route path="/review/:prenupId" component={Review} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/prenup-mistakes" component={PrenupMistakes} />
      <Route path="/blog/prenup-timeline" component={PrenupTimeline} />
      <Route path="/blog/second-marriage-prenup" component={SecondMarriagePrenup} />
      <Route path="/blog/prenup-vs-postnup" component={PrenupVsPostnup} />
      <Route path="/blog/prenup-cost" component={PrenupCost} />
      <Route path="/blog/do-i-need-prenup" component={DoINeedPrenup} />
      <Route path="/blog/prenup-complete-guide" component={PrenupCompleteGuide} />
      <Route path="/blog/prenup-cost-by-city-california" component={PrenupCostByCityCA} />
      <Route path="/blog/prenups-for-business-owners-california" component={PrenupsForBusinessOwnersCA} />
      <Route path="/blog/prenups-and-equity-compensation-california" component={PrenupsAndEquityCompCA} />
      <Route path="/blog/home-ownership-prenups-california" component={HomeOwnershipPrenupsCA} />
      <Route path="/blog/spousal-support-prenups-california" component={SpousalSupportPrenupsCA} />
      <Route path="/states/california" component={CaliforniaLanding} />
      <Route path="/states/california/prenuptial-agreement" component={CaliforniaPrenup} />
      <Route path="/states/california/los-angeles" component={LosAngelesPrenup} />
      <Route path="/states/california/san-francisco" component={SanFranciscoPrenup} />
      <Route path="/states/california/san-diego" component={SanDiegoPrenup} />
      <Route path="/states/california/san-jose" component={SanJosePrenup} />
      <Route path="/states/california/sacramento" component={SacramentoPrenup} />
      <Route path="/states/california/oakland" component={OaklandPrenup} />
      <Route path="/states/california/irvine" component={IrvinePrenup} />
      <Route path="/states/california/long-beach" component={LongBeachPrenup} />
      <Route path="/states/california/fresno" component={FresnoPrenup} />
      <Route path="/states/california/santa-ana" component={SantaAnaPrenup} />
      <Route path="/states/california/anaheim" component={AnaheimPrenup} />
      <Route path="/states/california/bakersfield" component={BakersfieldPrenup} />
      <Route path="/states/california/riverside" component={RiversidePrenup} />
      <Route path="/states/california/stockton" component={StocktonPrenup} />
      <Route path="/states/california/chula-vista" component={ChulaVistaPrenup} />
      <Route path="/states/california/fremont" component={FremontPrenup} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Header />
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
