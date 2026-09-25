import { createFileRoute, notFound } from "@tanstack/react-router";
import { CaseStudy } from "@/components/portfolio/CaseStudy";
import { getStoredCMS, useCMS } from "@/lib/cmsStore";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const cmsData = getStoredCMS();
    const project = cmsData.projects.find((p) => p.slug === params.slug);
    if (!project) throw notFound();
    return project;
  },
  head: ({ loaderData, params }) => {
    if (!loaderData)
      return {
        meta: [{ title: "Project unavailable — Muhammed K" }, { name: "robots", content: "noindex" }],
      };
    return {
      meta: [
        { title: `${loaderData.title} Case Study — Muhammed K` },
        { name: "description", content: loaderData.description },
        { property: "og:title", content: `${loaderData.title} — Case Study` },
        { property: "og:description", content: loaderData.description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: `/work/${params.slug}` }],
    };
  },
  component: ProjectPage,
});

function ProjectPage() {
  const loadedProject = Route.useLoaderData();
  const { cms } = useCMS();
  // Ensure we get latest reactive data from CMS store if updated in real-time
  const activeProject = cms.projects.find((p) => p.slug === loadedProject.slug) || loadedProject;

  return <CaseStudy project={activeProject} />;
}