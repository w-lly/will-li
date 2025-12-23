import { useEffect, useRef, useCallback } from "react";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Projects } from "./pages/Projects";
import { Contact } from "./pages/Contact";

type SectionKey = "home" | "about" | "projects" | "contact";

type SectionConfig = {
  key: SectionKey;
  Component: React.ComponentType;
};

export default function App() {
  const sectionRefs: Record<
    SectionKey,
    React.RefObject<HTMLDivElement | null>
  > = {
    home: useRef<HTMLDivElement | null>(null),
    about: useRef<HTMLDivElement | null>(null),
    projects: useRef<HTMLDivElement | null>(null),
    contact: useRef<HTMLDivElement | null>(null),
  };

  const sections: SectionConfig[] = [
    { key: "home", Component: Home },
    { key: "about", Component: About },
    { key: "projects", Component: Projects },
    { key: "contact", Component: Contact },
  ];

  const scrollToSection = useCallback(
    (ref: React.RefObject<HTMLDivElement | null>) => {
      ref.current?.scrollIntoView({ behavior: "smooth" });
    },
    []
  );

  useEffect(() => {
    const scrollFromHash = () => {
      const hash = window.location.hash.replace("#", "") as SectionKey;
      sectionRefs[hash]?.current?.scrollIntoView();
    };

    scrollFromHash();
    window.addEventListener("hashchange", scrollFromHash);

    return () =>
      window.removeEventListener("hashchange", scrollFromHash);
  }, [sectionRefs]);

  return (
    <Layout scrollToSection={scrollToSection} sectionRefs={sectionRefs}>
      {sections.map(({ key, Component }) => (
        <section
          key={key}
          ref={sectionRefs[key]}
          id={key}
          style={{ minHeight: "100vh" }}
        >
          <Component />
        </section>
      ))}
    </Layout>
  );
}
