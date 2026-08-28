import { useEffect } from "react";
import { Link } from "wouter";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Compass,
  ExternalLink,
  HeartHandshake,
  Leaf,
  Sparkles,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Project } from "@/data/projects";
import { projects } from "@/data/projects";

export function ProjectMeta({ project }: { project: Project }) {
  useEffect(() => {
    document.title = project.metaTitle;

    const description = document.querySelector('meta[name="description"]') ?? document.createElement("meta");
    description.setAttribute("name", "description");
    description.setAttribute("content", project.metaDescription);
    document.head.appendChild(description);

    const setProperty = (property: string, content: string) => {
      const tag = document.querySelector(`meta[property="${property}"]`) ?? document.createElement("meta");
      tag.setAttribute("property", property);
      tag.setAttribute("content", content);
      document.head.appendChild(tag);
    };

    setProperty("og:title", project.metaTitle);
    setProperty("og:description", project.metaDescription);
    setProperty("og:type", "website");
    setProperty("og:image", project.image);

    return () => {
      document.title = "We Grow Kids";
    };
  }, [project]);

  return null;
}

export function ProjectStatusBadge({ status }: { status: Project["status"] }) {
  const styles: Record<Project["status"], string> = {
    Enrolling: "bg-emerald-100 text-emerald-900 border-emerald-200",
    "Interest List Open": "bg-amber-100 text-amber-950 border-amber-200",
    "Coming Soon": "bg-sky-100 text-sky-950 border-sky-200",
    "In Development": "bg-violet-100 text-violet-950 border-violet-200",
    Waitlist: "bg-orange-100 text-orange-950 border-orange-200",
    "Seasonal Program": "bg-lime-100 text-lime-950 border-lime-200",
  };

  return (
    <Badge variant="outline" className={cn("rounded-full px-3 py-1 font-semibold", styles[status])}>
      {status}
    </Badge>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="group overflow-hidden border-border/60 bg-card shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className={cn("relative h-56 overflow-hidden bg-gradient-to-br", project.accent)}>
        <img
          src={project.image}
          alt={project.imageAlt}
          className="h-full w-full object-cover opacity-80 transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
        <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between gap-3">
          <span className="text-sm font-semibold uppercase tracking-[0.16em] text-white/90">{project.category}</span>
          <ProjectStatusBadge status={project.status} />
        </div>
      </div>
      <CardHeader className="space-y-3">
        <CardTitle className="text-2xl leading-tight text-primary">{project.name}</CardTitle>
        <p className="text-sm leading-6 text-foreground/75">{project.description}</p>
      </CardHeader>
      <CardContent className="flex h-full flex-col gap-5">
        <div className="flex flex-wrap gap-2">
          {project.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              {tag}
            </span>
          ))}
        </div>
        <Button asChild className="mt-auto w-full rounded-full bg-primary font-bold text-white hover:bg-primary/90">
          <Link href={`/projects/${project.slug}`}>
            Explore {project.shortName}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}

export function ProjectHero({ project }: { project: Project }) {
  return (
    <section className={cn("relative overflow-hidden bg-gradient-to-br text-white", project.accent)}>
      <div className="absolute inset-0 bg-black/25" />
      <div className="container relative mx-auto grid min-h-[520px] items-center gap-10 px-4 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
        <div className="max-w-3xl">
          <Link href="/projects" className="mb-8 inline-flex items-center text-sm font-semibold text-white/80 transition hover:text-white">
            <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
            Back to Projects
          </Link>
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-white/85">
              {project.category}
            </span>
            <ProjectStatusBadge status={project.status} />
          </div>
          <h1 className="max-w-4xl text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
            {project.name}
          </h1>
          <p className="mt-6 max-w-2xl font-serif text-2xl italic leading-tight text-white/90 md:text-3xl">
            {project.tagline}
          </p>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/80">{project.description}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="rounded-full bg-secondary px-7 font-bold text-secondary-foreground shadow-lg hover:bg-secondary/90">
              <ProjectActionLink href={project.ctaHref}>
                {project.ctaLabel}
                <ArrowRight className="ml-2 h-4 w-4" />
              </ProjectActionLink>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full border-white/60 bg-white/10 px-7 font-bold text-white hover:bg-white/20">
              <Link href="/contact">Ask a Question</Link>
            </Button>
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-xl lg:justify-self-end">
          <div className="absolute -inset-4 rounded-[2rem] border border-white/20 bg-white/10 rotate-3" />
          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] border-4 border-white/20 shadow-2xl">
            <img src={project.image} alt={project.imageAlt} className="h-full w-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}

export function ProjectQuickFacts({ project }: { project: Project }) {
  return (
    <section className="container mx-auto -mt-8 px-4 relative z-10">
      <div className="grid grid-cols-2 overflow-hidden rounded-2xl border border-border/60 bg-card shadow-xl sm:grid-cols-3 lg:grid-cols-7">
        {project.quickFacts.map((fact) => (
          <div key={fact.label} className="border-b border-r border-border/60 p-4 last:border-r-0 lg:border-b-0">
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-muted-foreground">{fact.label}</p>
            <p className="mt-2 text-sm font-semibold leading-5 text-foreground">{fact.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ProjectMission({ project }: { project: Project }) {
  return (
    <section className="container mx-auto grid gap-8 px-4 py-20 md:grid-cols-2 md:py-28">
      <div>
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-secondary-foreground">The heart of the work</p>
        <h2 className="text-4xl leading-tight text-primary md:text-5xl">Why this project exists</h2>
      </div>
      <div className="space-y-6 text-lg leading-8 text-foreground/75">
        <p>{project.mission}</p>
        <p>{project.why}</p>
      </div>
    </section>
  );
}

export function ProjectAudience({ project }: { project: Project }) {
  return (
    <section className="bg-muted/35 py-20 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-10 max-w-2xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-primary/70">A place to belong</p>
          <h2 className="text-4xl text-primary">Who this is for</h2>
          <p className="mt-4 text-lg leading-8 text-foreground/70">
            Each learner and family arrives with a different starting point. This project is designed to meet people with care, curiosity, and room to grow.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {project.audience.map((item) => (
            <div key={item} className="flex items-start gap-3 rounded-2xl border border-border/70 bg-card p-5 shadow-sm">
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary/30 text-primary">
                <Users className="h-4 w-4" />
              </span>
              <span className="font-semibold leading-6">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProjectFeatures({ project }: { project: Project }) {
  return (
    <section className="container mx-auto px-4 py-20 md:py-28">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-primary/70">The experience</p>
        <h2 className="text-4xl text-primary">What we are building</h2>
        <p className="mt-4 text-lg leading-8 text-foreground/70">
          A thoughtful mix of support, practice, relationships, and opportunities to make meaning.
        </p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {project.features.map((feature) => (
          <Card key={feature.title} className="border-border/60 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <CardContent className="p-6">
              <div className="mb-5 flex items-start justify-between gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Sparkles className="h-5 w-5" />
                </span>
                {feature.status && feature.status !== "Core" && (
                  <span className="rounded-full bg-muted px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-muted-foreground">
                    {feature.status}
                  </span>
                )}
              </div>
              <h3 className="text-xl font-bold text-primary">{feature.title}</h3>
              <p className="mt-3 leading-7 text-foreground/70">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

export function ProjectExperience({ project }: { project: Project }) {
  return (
    <section className="bg-primary py-20 text-primary-foreground md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-secondary">A glimpse inside</p>
            <h2 className="text-4xl text-white">{project.experienceLabel}</h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-primary-foreground/70">This is an illustrative experience, not a final published schedule. Details will be confirmed as the project develops.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {project.experience.map((item, index) => (
            <div key={item.title} className="relative rounded-2xl border border-white/15 bg-white/10 p-6">
              <span className="mb-5 flex h-9 w-9 items-center justify-center rounded-full bg-secondary font-bold text-secondary-foreground">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="text-xl font-bold text-white">{item.title}</h3>
              <p className="mt-2 leading-7 text-primary-foreground/75">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProjectOutcomes({ project }: { project: Project }) {
  return (
    <section className="container mx-auto grid gap-10 px-4 py-20 md:grid-cols-[0.8fr_1.2fr] md:py-28">
      <div>
        <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary/30 text-primary">
          <Compass className="h-7 w-7" />
        </span>
        <h2 className="text-4xl text-primary">What learners can grow</h2>
        <p className="mt-4 max-w-md text-lg leading-8 text-foreground/70">
          We focus on meaningful development over promises. The goal is to help each young person build the skills, relationships, and confidence to take their next step.
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {project.outcomes.map((outcome) => (
          <div key={outcome} className="flex items-start gap-3 rounded-xl border border-border/60 bg-card p-5 shadow-sm">
            <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <span className="font-semibold leading-6">{outcome}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ProjectExpectations({ project }: { project: Project }) {
  return (
    <section className="bg-secondary/15 py-20 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:items-center">
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-primary/70">Our shared commitments</p>
            <h2 className="text-4xl text-primary">What families can expect</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {project.whatToExpect.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-xl bg-background/70 p-5">
                <HeartHandshake className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span className="font-semibold leading-6">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function ProjectFaq({ project }: { project: Project }) {
  return (
    <section className="container mx-auto max-w-4xl px-4 py-20 md:py-28">
      <div className="mb-10 text-center">
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-primary/70">Questions welcome</p>
        <h2 className="text-4xl text-primary">Frequently asked questions</h2>
      </div>
      <div className="space-y-3">
        {project.faqs.map((faq) => (
          <details key={faq.question} className="group rounded-2xl border border-border/70 bg-card px-5 shadow-sm">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-5 text-left font-bold text-primary [&::-webkit-details-marker]:hidden">
              {faq.question}
              <ChevronDown className="h-5 w-5 shrink-0 transition group-open:rotate-180" />
            </summary>
            <p className="max-w-3xl pb-5 pr-8 leading-7 text-foreground/70">{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function RelatedProjects({ currentSlug }: { currentSlug: string }) {
  const related = projects.filter((project) => project.slug !== currentSlug);

  return (
    <section className="border-t border-border/60 bg-muted/30 py-20">
      <div className="container mx-auto px-4">
        <div className="mb-10 flex items-end justify-between gap-5">
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-primary/70">Keep exploring</p>
            <h2 className="text-4xl text-primary">More from We Grow Kids</h2>
          </div>
          <Link href="/projects" className="hidden items-center gap-2 font-bold text-primary hover:underline sm:flex">
            View all projects <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {related.map((project) => (
            <Link key={project.slug} href={`/projects/${project.slug}`} className="group flex items-center gap-4 rounded-2xl border border-border/70 bg-card p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <img src={project.image} alt="" className="h-20 w-24 rounded-xl object-cover" />
              <span className="min-w-0">
                <span className="block text-sm font-bold uppercase tracking-wider text-muted-foreground">{project.category}</span>
                <span className="mt-1 block font-serif text-xl font-bold leading-tight text-primary group-hover:underline">{project.shortName}</span>
              </span>
              <ArrowRight className="ml-auto h-5 w-5 shrink-0 text-primary" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProjectCta({ project }: { project: Project }) {
  return (
    <section className="container mx-auto px-4 py-20 md:py-28">
      <div className="relative overflow-hidden rounded-[2rem] bg-primary px-6 py-14 text-center text-primary-foreground shadow-xl md:px-12">
        <Leaf className="absolute -left-5 -top-5 h-28 w-28 rotate-12 text-secondary/15" />
        <Leaf className="absolute -bottom-7 -right-2 h-36 w-36 -rotate-45 text-secondary/15" />
        <div className="relative mx-auto max-w-2xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-secondary">Take the next step</p>
          <h2 className="text-4xl text-white">Not sure which opportunity is right for your family?</h2>
          <p className="mt-5 text-lg leading-8 text-primary-foreground/80">
            Tell us a little about your learner or your partnership idea, and we will help you identify possible We Grow Kids opportunities.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="rounded-full bg-secondary px-7 font-bold text-secondary-foreground hover:bg-secondary/90">
              <ProjectActionLink href={project.ctaHref}>{project.ctaLabel}<ArrowRight className="ml-2 h-4 w-4" /></ProjectActionLink>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full border-white/50 bg-transparent px-7 font-bold text-white hover:bg-white/10">
              <Link href="/contact">Contact We Grow Kids<ExternalLink className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectActionLink({ href, children }: { href: string; children: React.ReactNode }) {
  if (href.startsWith("#")) {
    return <a href={href}>{children}</a>;
  }

  return <Link href={href}>{children}</Link>;
}
