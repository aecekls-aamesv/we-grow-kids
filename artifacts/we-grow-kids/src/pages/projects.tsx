import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight, HeartHandshake, Lightbulb, Sprout, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/projects/ProjectSections";
import { projects } from "@/data/projects";

export default function Projects() {
  useEffect(() => {
    document.title = "Projects | We Grow Kids";
    const description = document.querySelector('meta[name="description"]') ?? document.createElement("meta");
    description.setAttribute("name", "description");
    description.setAttribute(
      "content",
      "Explore We Grow Kids educational programs including Creekside Warriors Student Athlete Academy, Afrofuturism Discovery Academy, Virtual Villages, and Friday Farm.",
    );
    document.head.appendChild(description);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <section className="relative overflow-hidden bg-primary py-24 text-primary-foreground md:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(194,138,59,0.28),transparent_36%),radial-gradient(circle_at_90%_10%,rgba(127,156,99,0.22),transparent_34%)]" />
        <div className="container relative mx-auto px-4">
          <div className="max-w-4xl">
            <p className="mb-5 text-sm font-bold uppercase tracking-[0.22em] text-secondary">The We Grow Kids ecosystem</p>
            <h1 className="max-w-4xl text-5xl font-extrabold leading-[1.05] tracking-tight text-white md:text-7xl">
              Building Places Where Kids Can Learn, Create, Belong, and Grow
            </h1>
            <p className="mt-7 max-w-3xl text-xl leading-9 text-primary-foreground/80">
              We Grow Kids develops educational experiences that connect academics, creativity, culture, athletics, nature, technology, and community. Explore the projects we are building with students, families, educators, coaches, and community partners.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href="#our-projects">
                <Button size="lg" className="w-full rounded-full bg-secondary px-7 font-bold text-secondary-foreground hover:bg-secondary/90 sm:w-auto">
                  Explore Our Projects <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
              <Button asChild size="lg" variant="outline" className="rounded-full border-white/50 bg-white/10 px-7 font-bold text-white hover:bg-white/20">
                <Link href="/contact">Partner With We Grow Kids</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="our-projects" className="container mx-auto px-4 py-20 md:py-28">
        <div className="mb-12 max-w-2xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-primary/70">Four pathways, one ecosystem</p>
          <h2 className="text-4xl text-primary md:text-5xl">Explore our projects</h2>
          <p className="mt-4 text-lg leading-8 text-foreground/70">
            Some projects are active, some are taking shape, and some are opening their first interest lists. Each one is grounded in the same belief: young people deserve meaningful places to learn.
          </p>
        </div>
        <div className="grid gap-7 lg:grid-cols-2">
          {projects.map((project) => <ProjectCard key={project.slug} project={project} />)}
        </div>
      </section>

      <section className="bg-secondary/15 py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-primary/70">The bigger picture</p>
            <h2 className="text-4xl text-primary md:text-5xl">Different Pathways. One Mission.</h2>
            <p className="mt-5 text-lg leading-8 text-foreground/75">
              Every child grows differently. Some children thrive through athletics. Some through technology and imagination. Some through hands-on exploration. Some through small-group academic support. Some need a village that combines all of these.
            </p>
          </div>
          <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-[1fr_auto_1fr] md:items-center">
            <div className="space-y-4">
              <EcosystemNode icon={<Users />} title="Creekside Warriors" description="Student-athlete development" href="/projects/creekside-warriors" />
              <EcosystemNode icon={<Sprout />} title="Friday Farm" description="Nature and outdoor learning" href="/projects/friday-farm" />
            </div>
            <div className="flex min-h-44 flex-col items-center justify-center rounded-full border-8 border-secondary/30 bg-primary px-10 py-12 text-center text-white shadow-xl">
              <span className="font-serif text-2xl font-bold">We Grow Kids</span>
              <span className="mt-1 text-sm text-white/70">Learning ecosystems</span>
            </div>
            <div className="space-y-4">
              <EcosystemNode icon={<Lightbulb />} title="Afrofuturism Discovery Academy" description="Imagination, STEAM, and culture" href="/projects/afrofuturism-discovery-academy" />
              <EcosystemNode icon={<HeartHandshake />} title="Virtual Villages" description="Connected family resources" href="/projects/virtual-villages" />
            </div>
          </div>
          <p className="mx-auto mt-12 max-w-3xl text-center text-lg leading-8 text-foreground/75">
            We Grow Kids creates multiple pathways while keeping the same goal at the center: helping young people develop the knowledge, confidence, relationships, and opportunities they need to thrive.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20 md:py-28">
        <div className="rounded-[2rem] border border-border/70 bg-card p-8 shadow-xl md:p-14">
          <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-center">
            <div className="max-w-3xl">
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-primary/70">Build with us</p>
              <h2 className="text-4xl text-primary">Meaningful learning takes a village.</h2>
              <p className="mt-5 text-lg leading-8 text-foreground/75">
                We Grow Kids welcomes partnerships with educators, community organizations, youth programs, coaches, farms, museums, nonprofits, home-learning communities, and organizations interested in creating meaningful learning opportunities for young people.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
              <Button asChild size="lg" className="rounded-full bg-primary px-7 font-bold text-white hover:bg-primary/90">
                <Link href="/contact">Become a Partner <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full border-primary/30 px-7 font-bold text-primary hover:bg-primary/5">
                <Link href="/consultation">Book a Consultation</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function EcosystemNode({
  icon,
  title,
  description,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link href={href} className="group flex items-center gap-4 rounded-2xl border border-border/70 bg-card p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">{icon}</span>
      <span>
        <span className="block font-bold text-primary group-hover:underline">{title}</span>
        <span className="mt-1 block text-sm text-foreground/65">{description}</span>
      </span>
      <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-primary" />
    </Link>
  );
}