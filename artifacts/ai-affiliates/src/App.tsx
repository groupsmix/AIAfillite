import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/lib/theme";
import { Layout } from "@/components/Layout";
import { HomePage } from "@/pages/HomePage";
import { ToolsDirectoryPage } from "@/pages/ToolsDirectoryPage";
import { CategoryPage } from "@/pages/CategoryPage";
import { ToolDetailPage } from "@/pages/ToolDetailPage";
import { GoRedirectPage } from "@/pages/GoRedirectPage";
import { AffiliateDisclosurePage } from "@/pages/AffiliatDisclosurePage";
import { AboutPage } from "@/pages/AboutPage";
import { PrivacyPage } from "@/pages/PrivacyPage";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/tools" component={ToolsDirectoryPage} />
        <Route path="/tools/:slug" component={ToolDetailPage} />
        <Route path="/category/:slug" component={CategoryPage} />
        <Route path="/go/:slug" component={GoRedirectPage} />
        <Route path="/affiliate-disclosure" component={AffiliateDisclosurePage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/privacy" component={PrivacyPage} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ThemeProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
        </ThemeProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
