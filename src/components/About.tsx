import { about } from "@/content/site";
import { Section } from "@/components/Section";

export function About() {
  return (
    <Section
      id={about.id}
      number={about.number}
      label={about.label}
      heading={about.heading}
      surface
    >
      <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
        <div className="space-y-6 text-lg leading-[1.7] text-foreground/80">
          {about.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>

        <div>
          <p className="mb-4 text-sm text-muted">{about.skillsLabel}</p>
          <div className="flex flex-wrap">
            {about.skills.map((skill) => (
              <span
                key={skill}
                className="mr-2 mb-2.5 rounded-full border border-border bg-surface px-4 py-1.5 text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
