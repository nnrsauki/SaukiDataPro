import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatedBackground } from "@/components/animated-background";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PageTransition } from "@/components/page-transition";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import BuyData from "@/pages/buy-data";
import NetworkPlans from "@/pages/network-plans";
import Payment from "@/pages/payment";
import OrderForm from "@/pages/order-form";
import OrderPreview from "@/pages/order-preview";
import Contact from "@/pages/contact";
import Subscribe from "@/pages/subscribe";
import AdminLogin from "@/pages/admin/login";
import AdminDashboard from "@/pages/admin/dashboard";
import { useEffect } from "react";
import { initializeStorage } from "@/lib/store";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/buy-data" component={BuyData} />
      <Route path="/buy-data/:network" component={NetworkPlans} />
      <Route path="/payment" component={Payment} />
      <Route path="/order-form" component={OrderForm} />
      <Route path="/order-preview" component={OrderPreview} />
      <Route path="/contact" component={Contact} />
      <Route path="/subscribe" component={Subscribe} />
      <Route path="/admin" component={AdminLogin} />
      <Route path="/admin/dashboard" component={AdminDashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  useEffect(() => {
    initializeStorage();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen flex flex-col relative">
          <AnimatedBackground />
          <Navbar />
          <PageTransition>
            <main className="flex-1">
              <Router />
            </main>
          </PageTransition>
          <Footer />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
