import photo from "@/assets/images/profile-photo.jpeg";
import { site } from "@/content/site";
import { settings } from "@/content/settings";
import { TextLink } from "@/components/TextLink";


export function Hero() {
  return (
    <section id="home" className="hero snap-section grid-bg border-b border-border">
      <div className="hero-content portfolio-container">
        <div className="hero-copy">
          <h1 className="hero-name font-light">
            {site.name}
          </h1>
          <p className="hero-tagline font-light text-muted">
            {site.tagline}
          </p>
          <div className="hero-links flex flex-wrap gap-x-6 gap-y-2 text-sm sm:text-base">
            <TextLink href={site.links.github}>GitHub</TextLink>
            <TextLink href={site.links.linkedin}>LinkedIn</TextLink>
            <TextLink href={`mailto:${site.email}`}>Email</TextLink>
          </div>
        </div>

        <div className={`hero-photo ${settings.hero.photoFrame ? "hero-photo-framed border border-border bg-surface" : ""}`}>
          <img
            src={photo}
            alt="Will Li"
            className={`h-full w-full grayscale ${settings.hero.photoFrame ? "object-cover" : "object-contain"}`}
          />
        </div>
      </div>

      <div className="hero-scroll text-center text-xl text-muted" aria-hidden>
        ↓
      </div>
    </section>
  );
}
