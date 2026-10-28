import type { ReactNode } from "react";

/**
 * Shared shell for the sections after the hero: the small "02 — About" label,
 * the large heading, and consistent spacing on every side.
 */
export function Section({
  id,
  number,
  label,
  heading,
  note,
  surface = false,
  children,
}: {
  id: string;
  number: string;
  label: string;
  heading: string;
  note?: string;
  surface?: boolean;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={`snap-section border-b border-border px-6 pt-[90px] pb-24 sm:px-10 lg:px-[110px] ${
        surface ? "bg-surface" : "bg-background"
      }`}
    >
      <p className="text-[13px] tracking-[2px] text-muted uppercase">{`${number} — ${label}`}</p>
      <h2 className="mt-3 mb-12 text-[clamp(2rem,5vw,4rem)] leading-[1.05] font-light tracking-[-0.03em]">
        {heading}
        {note ? (
          <span className="ml-3 align-middle text-base tracking-normal text-muted">· {note}</span>
        ) : null}
      </h2>
      {children}
    </section>
  );
}
