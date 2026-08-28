import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-serif text-primary mb-6">About We Grow Kids</h1>
            <p className="text-xl text-foreground/80">
              Cultivating curious minds and strong communities through personalized educational support.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Founder Bio Section */}
        <div className="bg-card rounded-3xl p-8 md:p-16 shadow-xl border border-card-border mb-24 relative overflow-hidden">
          {/* Subtle background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl"></div>
          
          <div className="grid lg:grid-cols-12 gap-12 relative z-10">
            <div className="lg:col-span-5 relative">
              <div className="relative z-10 aspect-[4/5] rounded-2xl overflow-hidden border-8 border-white shadow-2xl">
                <img 
                  src="/src/assets/author-portrait.png" 
                  alt="Aaron Eckels, M.Ed." 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 rounded-xl overflow-hidden border-4 border-white shadow-lg z-20 hidden md:block">
                <img 
                  src="/src/assets/author-teaching.png" 
                  alt="Aaron teaching students" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <div className="lg:col-span-7 flex flex-col justify-center">
              <h2 className="text-sm font-bold tracking-widest uppercase text-secondary mb-2">Meet the Founder</h2>
              <h3 className="text-4xl font-serif text-card-foreground mb-6">Aaron Eckels, M.Ed.</h3>
              
              <div className="space-y-4 text-card-foreground/80 text-lg mb-8">
                <p>
                  Aaron Eckels, M.Ed. is an educator with over 10 years of experience and a lifelong learner committed to community-centered education. He serves as the Director of Education and founder of Sankofa Learning Academy.
                </p>
                <p>
                  As a curriculum designer, Aaron specializes in culturally grounded mathematics and Afrofuturistic learning experiences. He is an author, speaker, and educational innovator whose research interests include African-centered education, identity development, and preparing young people to build the future.
                </p>
                <p>
                  He is the creator of the Futurescope Project and the Sankofa Little Legends literacy series, consistently working to design materials that honor diverse narratives while building essential academic skills.
                </p>
              </div>
              
              <div className="pt-6 border-t border-card-foreground/20">
                <p className="text-sm text-card-foreground/70 font-medium">
                  Get in touch: <a href="mailto:aaroneckels@gmail.com" className="text-card-foreground hover:underline font-bold">aaroneckels@gmail.com</a>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <div className="aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden shadow-lg order-2 md:order-1 border-4 border-white">
            <img 
              src="/src/assets/about-hero.png" 
              alt="Community learning together" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="order-1 md:order-2 bg-card rounded-3xl p-8 md:p-10 shadow-lg border border-card-border">
            <h2 className="text-3xl font-serif text-card-foreground mb-6">Our Story</h2>
            <div className="space-y-4 text-card-foreground/80 text-lg">
              <p>
                We Grow Kids began from a simple belief: education shouldn't be a one-size-fits-all experience. When families take charge of how their children learn, they are making a commitment to deeply personalized education, but they shouldn't have to do it alone.
              </p>
              <p>
                Founded as a small, family-run initiative, we wanted to bridge the gap between structured academics and joyful, hands-on discovery. We saw a need in our community for high-quality, culturally responsive educational support that honors the whole child.
              </p>
              <p>
                Today, we partner with families to provide tutoring, rich curriculum resources, and experiential learning opportunities like our Friday Garden Lab—all designed to make every family's educational journey sustainable and vibrant.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto bg-card rounded-3xl p-8 md:p-12 shadow-lg border border-card-border">
          <h2 className="text-3xl font-serif text-center text-primary mb-10">Our Values</h2>
          <div className="grid sm:grid-cols-2 gap-8">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-secondary-foreground font-serif">Family-Centered</h3>
              <p className="text-foreground/70">Parents are the primary educators. We are here to support, guide, and enhance your vision for your child's education.</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-secondary-foreground font-serif">Community Rooted</h3>
              <p className="text-foreground/70">Learning happens best in relationship. We build spaces where children feel seen, valued, and connected to each other.</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-secondary-foreground font-serif">Culturally Responsive</h3>
              <p className="text-foreground/70">Our curriculum and approach center diverse voices and histories, particularly drawing inspiration from Afrofuturism and global traditions.</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-secondary-foreground font-serif">Hands-On Discovery</h3>
              <p className="text-foreground/70">Whether in a math session or the garden, we believe children learn best when they are actively engaged in the work.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
