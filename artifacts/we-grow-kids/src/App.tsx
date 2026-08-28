import { lazy, Suspense } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "@/components/layout/Layout";
import { AdminLayout } from "@/components/layout/AdminLayout";

// Public Pages (eager — needed for first paint)
import Home from "@/pages/home";
import About from "@/pages/about";
import Book from "@/pages/book";
import Tutoring from "@/pages/tutoring";
import Consultation from "@/pages/consultation";
import Curriculum from "@/pages/curriculum";
import Gardening from "@/pages/gardening";
import Support from "@/pages/support";
import Store from "@/pages/store";
import Portal from "@/pages/portal";
import Testimonials from "@/pages/testimonials";
import Contact from "@/pages/contact";
import Policies from "@/pages/policies";
import Projects from "@/pages/projects";
import ProjectDetail from "@/pages/project-detail";
import NotFound from "@/pages/not-found";

// Admin Pages (lazy — only loaded when admin area is accessed)
const AdminDashboard = lazy(() => import("@/pages/admin/dashboard"));
const AdminLeads = lazy(() => import("@/pages/admin/leads"));
const AdminCalendar = lazy(() => import("@/pages/admin/calendar"));
const AdminAutomations = lazy(() => import("@/pages/admin/automations"));
const AdminIntegrations = lazy(() => import("@/pages/admin/integrations"));
const AdminSales = lazy(() => import("@/pages/admin/sales"));
const AdminSocial = lazy(() => import("@/pages/admin/social"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function AdminFallback() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
    </div>
  );
}

function Router() {
  return (
    <Switch>
      {/* Admin Routes — lazy loaded */}
      <Route path="/admin" nest>
        <AdminLayout>
          <Suspense fallback={<AdminFallback />}>
            <Switch>
              <Route path="/" component={AdminDashboard} />
              <Route path="/leads" component={AdminLeads} />
              <Route path="/calendar" component={AdminCalendar} />
              <Route path="/automations" component={AdminAutomations} />
              <Route path="/integrations" component={AdminIntegrations} />
              <Route path="/sales" component={AdminSales} />
              <Route path="/social" component={AdminSocial} />
              <Route component={NotFound} />
            </Switch>
          </Suspense>
        </AdminLayout>
      </Route>

      {/* Public Routes */}
      <Route path="/">
        <Layout>
          <Home />
        </Layout>
      </Route>
      <Route path="/about">
        <Layout><About /></Layout>
      </Route>
      <Route path="/book">
        <Layout><Book /></Layout>
      </Route>
      <Route path="/tutoring">
        <Layout><Tutoring /></Layout>
      </Route>
      <Route path="/consultation">
        <Layout><Consultation /></Layout>
      </Route>
      <Route path="/curriculum">
        <Layout><Curriculum /></Layout>
      </Route>
      <Route path="/gardening">
        <Layout><Gardening /></Layout>
      </Route>
      <Route path="/support">
        <Layout><Support /></Layout>
      </Route>
      <Route path="/homeschool-support">
        <Layout><Support /></Layout>
      </Route>
      <Route path="/store">
        <Layout><Store /></Layout>
      </Route>
      <Route path="/portal">
        <Layout><Portal /></Layout>
      </Route>
      <Route path="/testimonials">
        <Layout><Testimonials /></Layout>
      </Route>
      <Route path="/contact">
        <Layout><Contact /></Layout>
      </Route>
      <Route path="/policies">
        <Layout><Policies /></Layout>
      </Route>
      <Route path="/projects">
        <Layout><Projects /></Layout>
      </Route>
      <Route path="/projects/:slug">
        <Layout><ProjectDetail /></Layout>
      </Route>
      <Route>
        <Layout><NotFound /></Layout>
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
