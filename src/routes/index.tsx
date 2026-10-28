import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { queryOptions } from "@tanstack/react-query";

import { Layout } from "@/components/Layout";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { Experience } from "@/components/Experience";
import { Contact } from "@/components/Contact";
import { getGitHubProjects } from "@/lib/github.functions";

const projectsQuery = queryOptions({
  queryKey: ["github-projects"],
  queryFn: () => getGitHubProjects(),
  staleTime: 10 * 60 * 1000,
});

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Will Li" },
      {
        name: "description",
        content:
          "Will Li builds software end to end — from backend services and data pipelines to clean, fast interfaces. Projects, experience and contact.",
      },
      { property: "og:title", content: "Will Li" },
      {
        property: "og:description",
        content:
          "Will Li builds software end to end, from backend services and data pipelines to clean, fast interfaces.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(projectsQuery),
  component: Index,
});

function Index() {
  const { data } = useSuspenseQuery(projectsQuery);

  return (
    <Layout>
      <Hero />
      <About />
      <Projects repos={data} />
      <Experience />
      <Contact />
    </Layout>
  );
}
