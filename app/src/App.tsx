import { useEffect, useRef, useCallback } from "react";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Resume } from "./pages/Resume";
import { Projects } from "./pages/Projects";
import { Activities } from "./pages/Activities";
import { Statistics } from "./pages/Statistics";
import { Contact } from "./pages/Contact";

type SectionKey =
  | "home"
  | "about"
  // | "resume"
  | "projects"
  // | "activities"
  // | "statistics"
  | "contact";

type SectionConfig = {
  key: SectionKey;
  Component: React.ComponentType;
};

export default function App() {
  const sectionRefs: Record<SectionKey, React.RefObject<HTMLDivElement>> = {
    home: useRef(null),
    about: useRef(null),
    // resume: useRef(null),
    projects: useRef(null),
    // activities: useRef(null),
    // statistics: useRef(null),
    contact: useRef(null),
  };

  const sections: SectionConfig[] = [
    { key: "home", Component: Home },
    { key: "about", Component: About },
    // { key: "resume", Component: Resume },
    { key: "projects", Component: Projects },
    // { key: "activities", Component: Activities },
    // { key: "statistics", Component: Statistics },
    { key: "contact", Component: Contact },
  ];

  const scrollToSection = useCallback(
    (ref: React.RefObject<HTMLDivElement>) => {
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

    return () => window.removeEventListener("hashchange", scrollFromHash);
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
