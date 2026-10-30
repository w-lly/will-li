import { projects } from "@/content/site";
import { projectsConfig, selectProjects, type GitHubRepo } from "@/content/projects";
import { ProjectCard } from "@/components/ProjectCard";
import { Section } from "@/components/Section";
import { TextLink } from "@/components/TextLink";
import { site } from "@/content/site";

export function Projects({ repos }: { repos: GitHubRepo[] }) {
  const cards = selectProjects(repos, projectsConfig);

  return (
    <Section
      id={projects.id}
      number={projects.number}
      label={projects.label}
      heading={projects.heading}
      note={projects.note}
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <ProjectCard key={card.name} card={card} />
        ))}

        <div className="flex min-h-[220px] items-center justify-center rounded-xl border border-border bg-surface p-7">
          <TextLink href={`${site.links.github}?tab=repositories`} className="text-lg">
            View all on GitHub
          </TextLink>
        </div>
      </div>
    </Section>
  );
}
