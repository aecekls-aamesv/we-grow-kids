import { Link, useLocation } from "wouter";
import { useAuth } from "@workspace/replit-auth-web";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Users, 
  CalendarDays, 
  Zap, 
  Plug, 
  ShoppingBag, 
  Share2, 
  ArrowLeft,
  Menu,
  X,
  LogOut
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const { isAuthenticated, logout, isLoading, user } = useAuth();
  const loginToAdmin = () => {
    window.location.href = `/api/login?returnTo=${encodeURIComponent('/admin')}`;
  };
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/leads", label: "Leads & CRM", icon: Users },
    { href: "/admin/calendar", label: "Calendar", icon: CalendarDays },
    { href: "/admin/automations", label: "Automations", icon: Zap },
    { href: "/admin/integrations", label: "Integrations", icon: Plug },
    { href: "/admin/sales", label: "Sales", icon: ShoppingBag },
    { href: "/admin/social", label: "Social Planner", icon: Share2 },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-6">
          <img 
            src="/src/assets/we-grow-kids-logo.jpeg" 
            alt="We Grow Kids Logo" 
            className="h-24 w-auto mx-auto rounded-full border-4 border-primary/20"
          />
          <div>
            <h1 className="text-3xl font-serif font-bold text-foreground">Business Command Center</h1>
            <p className="text-muted-foreground mt-2">Restricted access area for We Grow Kids staff.</p>
          </div>
          <Button size="lg" className="w-full text-lg h-14" onClick={loginToAdmin}>
            Log In to Access Admin
          </Button>
          <Link href="/">
            <Button variant="link" className="mt-4 text-muted-foreground">
              <ArrowLeft className="mr-2 h-4 w-4" /> Return to Public Site
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-card border-b sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <img src="/src/assets/we-grow-kids-logo.jpeg" alt="Logo" className="h-8 w-8 rounded-full" />
          <span className="font-serif font-bold">Command Center</span>
        </div>
        <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Sidebar */}
      <aside className={cn(
        "bg-card border-r w-full md:w-64 flex-shrink-0 flex-col md:flex md:h-screen md:sticky md:top-0 z-40 transition-all duration-300",
        isMobileMenuOpen ? "flex fixed h-[calc(100vh-64px)] top-16 overflow-y-auto" : "hidden"
      )}>
        <div className="p-6 hidden md:block">
          <Link href="/admin" className="flex items-center gap-3">
            <img src="/src/assets/we-grow-kids-logo.jpeg" alt="Logo" className="h-10 w-10 rounded-full" />
            <div>
              <div className="font-serif font-bold leading-tight">We Grow Kids</div>
              <div className="text-xs text-muted-foreground">Command Center</div>
            </div>
          </Link>
        </div>

        <nav className="flex-1 px-4 py-4 md:py-0 space-y-1">
          {navLinks.map((link) => {
            const isActive = location === link.href || (link.href !== "/admin" && location.startsWith(link.href));
            return (
              <Link key={link.href} href={link.href}>
                <span onClick={() => setIsMobileMenuOpen(false)} className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors cursor-pointer",
                  isActive 
                    ? "bg-primary text-primary-foreground" 
                    : "text-foreground/70 hover:bg-muted hover:text-foreground"
                )}>
                  <link.icon className="h-5 w-5" />
                  {link.label}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t space-y-2">
          <div className="px-3 py-2 flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
              {user?.firstName?.charAt(0) || user?.email?.charAt(0) || "A"}
            </div>
            <div className="text-sm overflow-hidden text-ellipsis whitespace-nowrap">
              <p className="font-medium">{user?.firstName || "Admin User"}</p>
              <p className="text-xs text-muted-foreground">{user?.email || "admin@wegrowkids.com"}</p>
            </div>
          </div>
          
          <Link href="/">
            <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Site
            </Button>
          </Link>
          <Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => logout()}>
            <LogOut className="mr-2 h-4 w-4" />
            Log Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-6 md:p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
