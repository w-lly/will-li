import { experience } from "@/content/site";
import { Section } from "@/components/Section";

export function Experience() {
  return (
    <Section
      id={experience.id}
      number={experience.number}
      label={experience.label}
      heading={experience.heading}
      surface
    >
      <div>
        {experience.entries.map((job, i) => (
          <div
            key={`${job.role}-${job.company}-${i}`}
            className="grid gap-2 border-t border-border py-7 last:border-b sm:grid-cols-[200px_1fr] sm:gap-8"
          >
            <p className="text-sm text-muted">{job.period}</p>
            <div>
              <h3 className="text-xl font-medium">
                {job.role}
                <span className="text-muted"> · {job.company}</span>
              </h3>
              <p className="mt-1 text-sm text-muted">{job.location}</p>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-foreground/75">
                {job.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
