import { projects } from "@/content/site";
import { projectsConfig, selectProjects, formatUpdated, type GitHubRepo } from "@/content/projects";
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
          <article
            key={card.name}
            className="flex min-h-[220px] flex-col rounded-xl border border-border bg-surface p-7"
          >
            <h3 className="text-[19px] font-medium">{card.title}</h3>
            <p className="my-3 flex-1 text-sm leading-relaxed text-muted">{card.blurb}</p>
            <div className="flex flex-wrap gap-x-4 text-[13px] text-muted">
              {card.language ? <span>{card.language}</span> : null}
              <span>★ {card.stars}</span>
              <span>Updated {formatUpdated(card.updatedAt)}</span>
            </div>
            <div className="mt-5 flex flex-wrap gap-6 text-sm">
              <TextLink href={card.url}>Code</TextLink>
              {card.demo ? <TextLink href={card.demo}>Live</TextLink> : null}
            </div>
          </article>
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
