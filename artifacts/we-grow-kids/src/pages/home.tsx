import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, BookOpen, GraduationCap, Leaf, Users, HeartHandshake } from "lucide-react";
import { motion } from "framer-motion";
import { projects } from "@/data/projects";

export default function Home() {
  return (
    <div className="flex flex-col w-full">

      {/* ── Top Decorative Banner ── */}
      <section className="relative w-full overflow-hidden" style={{ minHeight: "420px" }}>
        {/* Full-bleed background image */}
        <img
          src="/banner-hero.png"
          alt="We Grow Kids — Afrocentric learning artwork"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Layered gradient overlays for depth + legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/30 to-black/65" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />

        {/* Decorative top & bottom border lines */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-secondary/80" />
        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-secondary/80" />

        {/* Centered branding content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 py-16 md:py-20 h-full min-h-[420px]">

          {/* Decorative top ornament */}
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-16 md:w-28 bg-secondary/70" />
            <span className="text-secondary/80 text-xs font-bold tracking-[0.35em] uppercase">Est. by Aaron Eckels, M.Ed.</span>
            <div className="h-px w-16 md:w-28 bg-secondary/70" />
          </div>

          {/* Main title */}
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75 }}
            className="font-serif text-white text-5xl md:text-7xl lg:text-8xl font-extrabold leading-tight tracking-tight drop-shadow-xl"
            style={{ textShadow: "0 4px 24px rgba(0,0,0,0.7), 0 1px 0 rgba(0,0,0,0.5)" }}
          >
            We Grow Kids
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.25 }}
            className="mt-4 text-secondary text-xl md:text-2xl font-serif italic tracking-wide drop-shadow-lg"
            style={{ textShadow: "0 2px 12px rgba(0,0,0,0.8)" }}
          >
            Planting Seeds. Growing Futures.
          </motion.p>

          {/* Decorative word strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.45 }}
            className="flex items-center gap-4 mt-7"
          >
            <div className="h-px w-10 md:w-20 bg-white/40" />
            {["Learn", "Grow", "Thrive"].map((word, i) => (
              <span key={word} className="flex items-center gap-4">
                <span className="text-white/95 font-bold tracking-widest text-sm md:text-base uppercase"
                  style={{ textShadow: "0 2px 8px rgba(0,0,0,0.8)" }}>
                  {word}
                </span>
                {i < 2 && <span className="text-secondary/70 text-lg">✦</span>}
              </span>
            ))}
            <div className="h-px w-10 md:w-20 bg-white/40" />
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 mt-10"
          >
            <Button asChild size="lg" className="rounded-full font-bold shadow-xl bg-primary hover:bg-primary/90 text-white px-8">
              <Link href="/tutoring">Book Tutoring <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline"
              className="rounded-full font-bold border-2 border-white/70 text-white hover:bg-white/10 bg-black/20 backdrop-blur-sm px-8">
              <Link href="/about">Our Story</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-muted/30 pt-20 pb-24 md:pt-32 md:pb-36">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-primary leading-tight">
              Helping Families Grow Confident Learners
            </h1>
            <p className="text-lg md:text-xl text-foreground/80 max-w-lg">
              A community-centered approach to education offering tailored private tutoring, engaging curriculum resources, hands-on Friday gardening classes, and comprehensive parent support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full">
                <Link href="/tutoring">
                  Book Tutoring <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary/20 text-primary hover:bg-primary/5 rounded-full">
                <Link href="/gardening">
                  Join Friday Garden Lab
                </Link>
              </Button>
              <Button asChild size="lg" variant="ghost" className="text-primary hover:bg-primary/5 rounded-full">
                <Link href="/book">
                  Discover Our New Book
                </Link>
              </Button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border-4 border-white">
              <img 
                src="/src/assets/hero-learning.png" 
                alt="Children learning together" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -left-6 bg-secondary text-secondary-foreground p-4 rounded-xl shadow-lg transform -rotate-3">
              <p className="font-serif font-bold">Planting seeds of knowledge.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Book Section */}
      <section className="py-20 md:py-28 bg-muted/20 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center bg-card rounded-3xl p-8 md:p-12 shadow-xl border border-border/50">
            <div className="order-2 lg:order-1 flex flex-col justify-center">
              <div className="inline-block px-4 py-1.5 rounded-full bg-secondary/20 text-secondary-foreground font-medium text-sm mb-6 self-start">
                New Release
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-primary mb-4 leading-tight">
                Drums of the First City of California
              </h2>
              <p className="text-xl text-foreground/80 font-serif italic mb-6">
                The Journey of San José
              </p>
              <p className="text-lg text-foreground/70 mb-8 leading-relaxed">
                A richly illustrated children's historical narrative about two boys set against the founding of San José. Weaving themes of drumming, ancestry, and cultural memory. Written by founder Aaron C. Eckels, M.Ed.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-full font-bold shadow-md">
                  <Link href="/book">Explore the Book</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/5 rounded-full">
                  <Link href="/curriculum">View Student Workbook</Link>
                </Button>
              </div>
            </div>
            <div className="order-1 lg:order-2 relative flex justify-center">
              <div className="relative w-full max-w-sm drop-shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <img 
                  src="/src/assets/book-cover-pair.png" 
                  alt="Drums of the First City of California Book and Workbook" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16 bg-card rounded-3xl p-8 shadow-lg border border-card-border">
            <h2 className="text-3xl md:text-4xl font-serif text-primary mb-4">What We Offer</h2>
            <p className="text-foreground/70 text-lg">
              Comprehensive support designed to enrich your family's educational journey, from direct instruction to parent resources.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard 
              icon={<GraduationCap className="h-8 w-8 text-primary" />}
              title="Private Tutoring"
              description="Tailored 1-on-1 and small group instruction focusing on math, literacy, and homework support."
              link="/tutoring"
            />
            <ServiceCard 
              icon={<BookOpen className="h-8 w-8 text-secondary" />}
              title="Curriculum Resources"
              description="Engaging mini-lessons, cultural units, and planning guides to supplement your home education."
              link="/curriculum"
            />
            <ServiceCard 
              icon={<Leaf className="h-8 w-8 text-green-600" />}
              title="Friday Gardening Class"
              description="Hands-on science in the soil. Students learn about food systems, responsibility, and nature."
              link="/gardening"
            />
            <ServiceCard 
              icon={<HeartHandshake className="h-8 w-8 text-accent-foreground" />}
              title="Family Education Support"
              description="Consultations, portfolio help, and goal-setting for parents navigating their child's educational path."
              link="/support"
            />
            <ServiceCard 
              icon={<Users className="h-8 w-8 text-primary" />}
              title="Small Group Learning"
              description="Collaborative educational experiences that foster social skills alongside academic growth."
              link="/tutoring"
            />
          </div>
        </div>
      </section>

      {/* Projects teaser */}
      <section className="border-y border-border bg-muted/20 py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-primary/70">More ways to grow</p>
              <h2 className="text-3xl font-serif text-primary md:text-4xl">Explore what we’re building</h2>
              <p className="mt-4 text-lg leading-8 text-foreground/70">
                From student-athlete development to outdoor learning, our projects create more places for young people to learn, create, belong, and grow.
              </p>
            </div>
            <Button asChild variant="outline" className="w-fit rounded-full border-primary/30 font-bold text-primary hover:bg-primary/5">
              <Link href="/projects">View all projects <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {projects.map((project) => (
              <Link key={project.slug} href={`/projects/${project.slug}`} className="group overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <div className="h-32 overflow-hidden">
                  <img src={project.image} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                </div>
                <div className="p-5">
                  <span className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-muted-foreground">{project.category}</span>
                  <h3 className="mt-2 font-serif text-xl font-bold leading-tight text-primary group-hover:underline">{project.shortName}</h3>
                  <span className="mt-4 inline-flex items-center text-sm font-semibold text-primary">Learn more <ArrowRight className="ml-1 h-4 w-4" /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Vision / Brand Artwork Section */}
      <section className="relative py-24 md:py-32 overflow-hidden flex items-center justify-center min-h-[600px] my-12">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/src/assets/africa-tree-artwork.png" 
            alt="Learn Grow Thrive - Africa Tree" 
            className="w-full h-full object-cover object-center"
          />
          {/* Gradient Overlay for legibility */}
          <div className="absolute inset-0 bg-black/40 md:bg-black/20"></div>
        </div>
        
        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-background/85 backdrop-blur-md p-8 md:p-12 rounded-3xl shadow-2xl border border-white/20 text-center">
            <h2 className="text-3xl md:text-5xl font-serif text-primary mb-6 leading-tight">
              Rooted in Community, <br /> Growing for the Future
            </h2>
            <p className="text-lg md:text-xl text-foreground/90 mb-8">
              "Education is the passport to the future, for tomorrow belongs to those who prepare for it today." We believe in centering culture, family, and hands-on discovery to build a strong foundation for every child.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full font-bold shadow-lg">
                <Link href="/about">Our Story</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10 rounded-full font-bold bg-white/50 backdrop-blur-sm">
                <Link href="/contact">Join Our Community</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to action */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-serif mb-6">Ready to Grow with Us?</h2>
          <p className="text-primary-foreground/80 mb-8 text-lg">
            Whether you need a full learning plan or just some extra help in math, we are here to support your family's unique educational journey.
          </p>
          <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100 rounded-full font-bold">
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

function ServiceCard({ icon, title, description, link }: { icon: React.ReactNode, title: string, description: string, link: string }) {
  return (
    <Card className="border-border/60 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col group">
      <CardContent className="p-8 flex flex-col h-full items-start">
        <div className="mb-5 p-3 bg-muted rounded-xl inline-block group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <h3 className="text-xl font-serif font-bold text-foreground mb-3">{title}</h3>
        <p className="text-foreground/70 mb-6 flex-grow">{description}</p>
        <Link href={link} className="inline-flex items-center text-primary font-medium hover:underline mt-auto">
          Learn more <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </CardContent>
    </Card>
  );
}
