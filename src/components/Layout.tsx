import { useEffect, useRef } from "react";

import { nav, site } from "@/content/site";

export function Layout({ children }: { children: React.ReactNode }) {
  const headerRef = useRef<HTMLElement | null>(null);
  const active = "home";

  // Keep snapped sections and #anchor jumps clear of the sticky bar: the bar's
  // height changes with the breakpoint, so it is measured rather than guessed.
  useEffect(() => {
    const apply = () => {
      const h = headerRef.current?.offsetHeight ?? 0;
      document.documentElement.style.setProperty("--header-height", `${h}px`);
      document.documentElement.dataset['snapReady'] = "true";
    };
    apply();
    const observer = new ResizeObserver(apply);
    if (headerRef.current) observer.observe(headerRef.current);
    return () => {
      observer.disconnect();
      delete document.documentElement.dataset['snapReady'];
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
