import type { ReactNode } from "react";

/**
 * A bordered underline link, used in the hero, project cards and the footer.
 * `light` is for use on the dark contact band.
 */
export function TextLink({
  href,
  children,
  light = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  light?: boolean;
  className?: string;
}) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer noopener" : undefined}
      className={`inline-flex items-center gap-1.5 border-b pb-1 transition-opacity hover:opacity-60 ${
        light ? "border-muted text-surface" : "border-foreground text-foreground"
      } ${className}`}
    >
      {children}
      <span aria-hidden>↗</span>
    </a>
  );
}
