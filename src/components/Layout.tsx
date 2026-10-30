import { useEffect, useRef, useState } from "react";

import { nav, site } from "@/content/site";
import { activeSection } from "@/lib/active-section";

export function Layout({ children }: { children: React.ReactNode }) {
  const headerRef = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState("home");

  // Keep snapped sections and #anchor jumps clear of the sticky bar: the bar's
  // height changes with the breakpoint, so it is measured rather than guessed.
  useEffect(() => {
    const sections = nav.flatMap((item) => {
      const element = document.getElementById(item.id);
      return element ? [{ id: item.id, element }] : [];
    });
    let frame: number | undefined;
    const updateActive = () => {
      frame = undefined;
      const root = document.documentElement;
      const next = activeSection(
        sections.map(({ id, element }) => ({ id, top: element.getBoundingClientRect().top })),
        headerRef.current?.offsetHeight ?? 0,
        window.scrollY + root.clientHeight >= root.scrollHeight - 1,
      );
      setActive((current) => (current === next ? current : next));
    };
    // Coalesce scroll events into one small read per animation frame.
    const schedule = () => {
      if (frame === undefined) frame = window.requestAnimationFrame(updateActive);
    };
    const apply = () => {
      const h = headerRef.current?.offsetHeight ?? 0;
      document.documentElement.style.setProperty("--header-height", `${h}px`);
      document.documentElement.dataset["snapReady"] = "true";
      schedule();
    };
    apply();
    const observer = new ResizeObserver(apply);
    if (headerRef.current) observer.observe(headerRef.current);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame !== undefined) window.cancelAnimationFrame(frame);
      delete document.documentElement.dataset["snapReady"];
      document.documentElement.style.removeProperty("--header-height");
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header
        ref={headerRef}
        className="grid-bg sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-sm"
      >
        <nav className="portfolio-container flex items-center justify-between py-5 text-sm sm:py-6">
          <a href="#home" className="text-lg font-medium tracking-tight">
            {site.logo}
          </a>
          <div className="hidden items-center gap-9 sm:flex">
            {nav.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-current={item.id === active ? "location" : undefined}
                className={
                  item.id === active
                    ? "border-b border-foreground pb-1"
                    : "text-muted-foreground transition-colors hover:text-foreground"
                }
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
}
