import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingBag, BookOpen, GraduationCap, Leaf, Phone } from "lucide-react";
import { Link } from "wouter";

export default function Store() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="bg-primary py-16 text-primary-foreground text-center">
        <h1 className="text-4xl md:text-5xl font-serif mb-4">We Grow Kids Store</h1>
        <p className="text-xl opacity-90">Purchase resources, book packages, and register for classes.</p>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-5xl">
        <div className="grid sm:grid-cols-2 gap-8 mb-16">
          
          <Card className="hover:border-primary transition-colors cursor-pointer group">
            <CardContent className="p-8 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                <BookOpen className="w-8 h-8 text-primary group-hover:text-white" />
              </div>
              <h2 className="text-2xl font-serif font-bold mb-3">Curriculum Resources</h2>
              <p className="text-foreground/70 mb-6">Digital downloads, mini-lessons, and planning guides.</p>
              <Button asChild variant="outline" className="mt-auto">
                <Link href="/curriculum">Browse Resources</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:border-secondary transition-colors cursor-pointer group">
            <CardContent className="p-8 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mb-6 group-hover:bg-secondary group-hover:text-white transition-colors">
                <GraduationCap className="w-8 h-8 text-secondary group-hover:text-white" />
              </div>
              <h2 className="text-2xl font-serif font-bold mb-3">Tutoring Packages</h2>
              <p className="text-foreground/70 mb-6">Book 1-on-1 or small group sessions for the upcoming semester.</p>
              <Button asChild variant="outline" className="mt-auto">
                <Link href="/tutoring">View Packages</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:border-green-600 transition-colors cursor-pointer group">
            <CardContent className="p-8 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-6 group-hover:bg-green-600 group-hover:text-white transition-colors">
                <Leaf className="w-8 h-8 text-green-600 group-hover:text-white" />
              </div>
              <h2 className="text-2xl font-serif font-bold mb-3">Garden Lab Registration</h2>
              <p className="text-foreground/70 mb-6">Secure your spot for the Friday nature and science program.</p>
              <Button asChild variant="outline" className="mt-auto">
                <Link href="/gardening">Register Now</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:border-accent-foreground transition-colors cursor-pointer group">
            <CardContent className="p-8 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center mb-6 group-hover:bg-accent-foreground group-hover:text-white transition-colors">
                <Phone className="w-8 h-8 text-accent-foreground group-hover:text-white" />
              </div>
              <h2 className="text-2xl font-serif font-bold mb-3">Parent Consultations</h2>
              <p className="text-foreground/70 mb-6">Book an initial strategy session or portfolio review.</p>
              <Button asChild variant="outline" className="mt-auto">
                <Link href="/support">Book Session</Link>
              </Button>
            </CardContent>
          </Card>

        </div>

        {/* Merch Teaser */}
        <div className="bg-muted rounded-3xl p-8 text-center border border-border relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-secondary text-secondary-foreground text-xs font-bold px-4 py-1 rounded-bl-lg">Coming Soon</div>
          <ShoppingBag className="w-12 h-12 text-foreground/40 mx-auto mb-4" />
          <h2 className="text-3xl font-serif mb-4">We Grow Kids Merch</h2>
          <p className="text-foreground/70 max-w-xl mx-auto">
            We are working on a line of high-quality goods for your family's educational journey: custom notebooks, cozy t-shirts, garden journals, canvas tote bags, and printed parent planners. Stay tuned!
          </p>
        </div>
      </div>
    </div>
  );
}
