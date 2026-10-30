import { useRef, useState } from "react";

import type { ProjectCard as Card } from "@/content/projects";
import { formatUpdated } from "@/content/projects";
import { settings } from "@/content/settings";
import { localProjectImage, projectImageCandidates } from "@/lib/project-images";
import { TextLink } from "@/components/TextLink";

export function ProjectCard({ card }: { card: Card }) {
  const disclosure = useRef<HTMLDetailsElement>(null);
  const defaultImage = localProjectImage(settings.projects.defaultImage);
  const candidates = projectImageCandidates(
    localProjectImage(card.image),
    settings.projects.useSocialPreview ? card.socialPreview : null,
    defaultImage,
  );
  const [failed, setFailed] = useState<string[]>([]);
  const image = candidates.find((candidate) => !failed.includes(candidate));
  const isDefault = !image || image === defaultImage;

  return (
    <article className="project-card rounded-lg border border-border bg-surface">
      <div className="project-disclosure">
        <details ref={disclosure}>
          <summary
            aria-label={`Details for ${card.title}`}
            className="project-cover cursor-pointer list-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
          >
            {image ? (
              <>
                <img
                  src={image}
                  alt={`${card.title} preview`}
                  loading="lazy"
                  className="h-full w-full object-cover"
                  style={
                    isDefault
                      ? { opacity: Math.min(1, Math.max(0, settings.projects.defaultImageOpacity)) }
                      : undefined
                  }
                  onError={() => setFailed((current) => [...current, image])}
                />
              </>
            ) : null}
            {isDefault ? (
              <span className="project-preview-label absolute left-3 top-3 bg-surface px-2 py-1 text-xs text-muted">
                No preview yet
              </span>
            ) : null}
          </summary>
        </details>
        <div
          className="project-details bg-surface p-7"
          onClick={() => {
            if (disclosure.current) disclosure.current.open = false;
          }}
        >
          <h3 className="break-words text-[19px] font-medium">{card.title}</h3>
          <p className="my-3 text-sm leading-relaxed text-muted">{card.blurb}</p>
          <div className="flex flex-wrap gap-x-4 text-[13px] text-muted">
            {card.language ? <span>{card.language}</span> : null}
            <span>★ {card.stars}</span>
            <span>Updated {formatUpdated(card.updatedAt)}</span>
          </div>
        </div>
      </div>
      <div className="project-caption flex min-w-0 items-center gap-3 border-t border-border bg-surface px-4 py-3">
        <h3 title={card.title} className="min-w-0 flex-1 truncate text-sm font-medium">
          {card.title}
        </h3>
        <div className="flex shrink-0 items-center gap-3 whitespace-nowrap text-xs">
          <TextLink href={card.url}>Code</TextLink>
          {card.demo ? <TextLink href={card.demo}>Live</TextLink> : null}
        </div>
      </div>
    </article>
  );
}
