import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, BookOpen, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";

export default function BookPage() {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero Section */}
      <section className="bg-primary pt-16 pb-24 md:pt-24 md:pb-32 overflow-hidden relative">
        {/* Subtle background decoration */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-white space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-sm font-medium">
                <BookOpen className="w-4 h-4" />
                <span>New Release</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight">
                Drums of the First City of California
              </h1>
              <p className="text-xl md:text-2xl text-white/90 font-serif italic">
                The Journey of San José
              </p>
              <p className="text-lg text-white/80 max-w-lg leading-relaxed">
                A richly illustrated children's historical narrative weaving themes of drumming, ancestry, and cultural memory in the founding of San José.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold rounded-full text-lg shadow-xl" asChild>
                  <Link href="/contact">
                    <ShoppingBag className="w-5 h-5 mr-2" />
                    Order Now
                  </Link>
                </Button>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative lg:h-[600px] flex items-center justify-center"
            >
              <div className="relative z-10 w-full max-w-md mx-auto drop-shadow-2xl transform rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
                <img 
                  src="/src/assets/book-cover.png" 
                  alt="Drums of the First City of California - Book Cover" 
                  className="w-full h-auto rounded-r-xl rounded-l-md border-l-4 border-l-black/20"
                />
              </div>
              
              {/* Decorative background glow behind the book */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-white/20 blur-[100px] rounded-full z-0"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Synopsis Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif text-primary mb-6">About the Story</h2>
              <div className="w-24 h-1 bg-secondary mx-auto rounded-full"></div>
            </div>
            
            <div className="prose prose-lg md:prose-xl prose-stone mx-auto text-foreground/80 font-serif leading-relaxed bg-card rounded-3xl p-8 md:p-12 shadow-lg border border-card-border">
              <p>
                Set against the founding of San José, California, <em>Drums of the First City of California</em> follows the journey of two boys—one Black, one from a Californio family.
              </p>
              <p>
                As their lives intersect in this newly formed settlement, the narrative weaves together themes of drumming, deep ancestry, and cultural memory. Watching over their story is a powerful ancestral queen figure, grounding their experiences in the rich, often untold history of early California.
              </p>
              <p>
                Written by Aaron C. Eckels, M.Ed. and beautifully illustrated by Ameena Eckels, this book brings to life the vibrant, multicultural roots of San José in a way that resonates with children and adults alike.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Companion Section */}
      <section className="py-20 bg-muted/40 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-xl border-8 border-white">
                <img 
                  src="/src/assets/author-with-workbook.jpeg" 
                  alt="Aaron holding the student workbook" 
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 w-48 rounded-xl shadow-lg z-20 border-4 border-white hidden md:block transform rotate-6">
                <img 
                  src="/src/assets/book-cover-pair.png" 
                  alt="Book and Workbook pair" 
                  className="w-full h-auto"
                />
              </div>
            </div>
            
            <div className="order-1 lg:order-2 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <GraduationCapIcon className="w-4 h-4" />
                <span>For Educators & Parents</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-primary">Companion Student Workbook</h2>
              <p className="text-lg text-foreground/80">
                Bring the themes of <em>Drums of the First City of California</em> directly into your home or classroom learning environment.
              </p>
              <ul className="space-y-4 text-foreground/80">
                <li className="flex items-start">
                  <div className="bg-secondary/20 p-1 rounded-full mr-3 mt-1">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  </div>
                  <span><strong>Historical Context:</strong> Deep dive into the multicultural founding of early California.</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-secondary/20 p-1 rounded-full mr-3 mt-1">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  </div>
                  <span><strong>Cultural Reflection:</strong> Activities exploring ancestry, memory, and community building.</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-secondary/20 p-1 rounded-full mr-3 mt-1">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  </div>
                  <span><strong>Cross-Curricular:</strong> Integrates literacy, social studies, and creative arts.</span>
                </li>
              </ul>
              
              <div className="pt-6">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full shadow-md" asChild>
                  <Link href="/curriculum">
                    View in Curriculum Resources <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function GraduationCapIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21.42 10.922a2 2 0 0 1-.01 2.833l-7.1 7.1a2 2 0 0 1-2.82.01l-7.1-7.1a2 2 0 0 1-.01-2.834L11.5 3.82a2 2 0 0 1 2.82-.01z" />
      <path d="M22 10v6" />
      <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
    </svg>
  );
}
