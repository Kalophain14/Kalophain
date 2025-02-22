import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/layout/header";
import Home from "@/pages/home";
import Updates from "@/pages/updates";
import FireDrills from "@/pages/fire-drills";
import NotFound from "@/pages/not-found";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-background text-foreground antialiased">
        <Header />
        <main className="container mx-auto px-4 pt-20">
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/updates" component={Updates} />
            <Route path="/fire-drills" component={FireDrills} />
            <Route component={NotFound} />
          </Switch>
        </main>
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}