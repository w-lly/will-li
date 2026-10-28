import { contact, site } from "@/content/site";
import { TextLink } from "@/components/TextLink";

export function Contact() {
  return (
    <footer id={contact.id} className="snap-section bg-foreground text-surface">
      <div className="flex flex-col gap-12 px-6 py-16 sm:px-10 lg:flex-row lg:items-end lg:justify-between lg:px-[110px]">
        <div>
          <p className="text-[13px] tracking-[2px] text-muted uppercase">{`${contact.number} — ${contact.label}`}</p>
          <p className="mt-3 mb-5 text-[clamp(2.2rem,5vw,4rem)] leading-none font-light tracking-[-0.03em]">
            {contact.heading}
          </p>
          <TextLink href={`mailto:${site.email}`} light className="text-xl">
            {site.email}
          </TextLink>
        </div>

        <div className="border-muted pl-0 text-sm text-muted lg:border-l lg:pl-10 lg:text-right">
          <p className="mb-2 text-base text-surface">{site.name}</p>
          <p className="flex flex-wrap gap-x-2 lg:justify-end">
            <TextLink href={site.links.github} light className="border-0 pb-0 text-sm">
              GitHub
            </TextLink>
            <span aria-hidden>·</span>
            <TextLink href={site.links.linkedin} light className="border-0 pb-0 text-sm">
              LinkedIn
            </TextLink>
            {site.links.resume ? (
              <>
                <span aria-hidden>·</span>
                <TextLink href={site.links.resume} light className="border-0 pb-0 text-sm">
                  Resume
                </TextLink>
              </>
            ) : null}
          </p>
          <p className="mt-2">© {site.year}</p>
        </div>
      </div>
    </footer>
  );
}
