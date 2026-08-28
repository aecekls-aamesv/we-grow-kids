import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Layout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/book", label: "The Book" },
    { href: "/tutoring", label: "Tutoring" },
    { href: "/gardening", label: "Friday Garden Lab" },
    { href: "/projects", label: "Projects" },
    { href: "/curriculum", label: "Resources" },
    { href: "/support", label: "Support" },
    { href: "/store", label: "Store" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b-4 border-primary bg-background shadow-md">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <img 
              src="/src/assets/we-grow-kids-logo.jpeg" 
              alt="We Grow Kids Logo" 
              className="h-14 w-auto object-contain rounded-full border-2 border-primary shadow-sm"
            />
            <div className="flex flex-col">
              <span className="font-serif font-extrabold text-2xl leading-none text-primary tracking-tight">We Grow Kids</span>
              <span className="text-xs text-muted-foreground hidden sm:block">Planting Seeds. Growing Futures.</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${location === link.href ? "text-primary" : "text-foreground/80"}`}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/portal">
              <Button variant="outline" className="ml-2 font-medium border-primary/20 text-primary hover:bg-primary/5">
                Parent Portal
              </Button>
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-20 left-0 w-full bg-background border-b border-border shadow-lg py-4 px-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className={`text-lg font-serif font-medium ${location === link.href ? "text-primary" : "text-foreground"}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <hr className="my-2 border-border" />
            <Link href="/portal" onClick={() => setIsMobileMenuOpen(false)}>
              <Button className="w-full">Parent Portal</Button>
            </Link>
          </div>
        )}
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="bg-primary text-primary-foreground py-12 mt-20">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <img 
                src="/src/assets/we-grow-kids-logo.jpeg" 
                alt="We Grow Kids Logo" 
                className="h-16 w-auto object-contain rounded-full bg-white p-1"
              />
              <div className="flex flex-col">
                <span className="font-serif font-bold text-2xl leading-none text-white">We Grow Kids</span>
                <span className="text-sm text-primary-foreground/80 mt-1">Planting Seeds. Growing Futures.</span>
              </div>
            </Link>
            <p className="text-primary-foreground/80 max-w-sm">
              A family-centered educational community offering private tutoring, curriculum resources, and hands-on enrichment for families.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-lg font-bold mb-4 text-secondary">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="hover:text-secondary transition-colors">About Us</Link></li>
              <li><Link href="/tutoring" className="hover:text-secondary transition-colors">Private Tutoring</Link></li>
              <li><Link href="/gardening" className="hover:text-secondary transition-colors">Friday Garden Lab</Link></li>
               <li><Link href="/projects" className="hover:text-secondary transition-colors">Our Projects</Link></li>
              <li><Link href="/curriculum" className="hover:text-secondary transition-colors">Resources</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-serif text-lg font-bold mb-4 text-secondary">Support</h3>
            <ul className="space-y-2">
              <li><Link href="/contact" className="hover:text-secondary transition-colors">Contact Us</Link></li>
              <li><Link href="/portal" className="hover:text-secondary transition-colors">Parent Portal</Link></li>
              <li><Link href="/testimonials" className="hover:text-secondary transition-colors">Testimonials</Link></li>
              <li><Link href="/policies" className="hover:text-secondary transition-colors">Policies</Link></li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-12 pt-8 border-t border-primary-foreground/20 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-primary-foreground/60">
          <span>&copy; {new Date().getFullYear()} We Grow Kids. All rights reserved.</span>
          <a href="/admin" className="hover:text-secondary transition-colors">
            Staff Login
          </a>
        </div>
      </footer>
    </div>
  );
}
