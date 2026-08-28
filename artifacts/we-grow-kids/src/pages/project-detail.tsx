import { Link, useParams } from "wouter";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CreeksideInterestForm } from "@/components/projects/CreeksideInterestForm";
import {
  ProjectAudience,
  ProjectCta,
  ProjectExpectations,
  ProjectExperience,
  ProjectFaq,
  ProjectFeatures,
  ProjectHero,
  ProjectMeta,
  ProjectMission,
  ProjectOutcomes,
  ProjectQuickFacts,
  RelatedProjects,
} from "@/components/projects/ProjectSections";
import { getProject } from "@/data/projects";

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = getProject(slug);

  if (!project) {
    return (
      <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 py-20 text-center">
        <h1 className="text-4xl text-primary">Project not found</h1>
        <p className="mt-4 max-w-md leading-7 text-foreground/70">That project page may have moved. Explore the full We Grow Kids project portfolio instead.</p>
        <Button asChild className="mt-7 rounded-full bg-primary font-bold text-white hover:bg-primary/90">
          <Link href="/projects">View Projects <ArrowRight className="ml-2 h-4 w-4" /></Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <ProjectMeta project={project} />
      <ProjectHero project={project} />
      <ProjectQuickFacts project={project} />
      <ProjectMission project={project} />
      <ProjectAudience project={project} />
      <ProjectFeatures project={project} />
      <ProjectExperience project={project} />
      <ProjectOutcomes project={project} />
      <ProjectExpectations project={project} />
      <ProjectFaq project={project} />
      {project.slug === "creekside-warriors" && <CreeksideInterestForm />}
      <ProjectCta project={project} />
      <RelatedProjects currentSlug={project.slug} />
    </div>
  );
}
