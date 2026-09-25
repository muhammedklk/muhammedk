import { createFileRoute } from "@tanstack/react-router";
import { CaseStudy } from "@/components/portfolio/CaseStudy";
import { getStoredCMS, useCMS } from "@/lib/cmsStore";
import { projects as fallbackProjects } from "@/data/projects";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const cmsData = getStoredCMS();
    const foundInCMS = cmsData.projects.find((p) => p.slug === params.slug);
    const foundInFallback = fallbackProjects.find((p) => p.slug === params.slug);

    const project = foundInCMS || foundInFallback || {
      slug: params.slug,
      number: "01",
      title: params.slug.toUpperCase().replace(/-/g, " "),
      category: "UI/UX Design & Development",
      description: "A modern digital product experience.",
      tech: ["Figma", "UI/UX Design", "HTML", "CSS", "JavaScript"],
      image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
      dimensions: [1600, 900] as [number, number],
      accent: "blue" as const,
      challenge: "Define an intuitive user visual flow.",
      objective: "Deliver a responsive and polished digital experience.",
      result: "A refined and functional web product.",
    };

    return project;
  },
  head: ({ loaderData, params }) => {
    const title = loaderData?.title || params.slug;
    return {
      meta: [
        { title: `${title} Case Study — Muhammed K` },
        { name: "description", content: loaderData?.description || "Case Study Details" },
        { property: "og:title", content: `${title} — Case Study` },
        { property: "og:description", content: loaderData?.description || "Case Study Details" },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: `/work/${params.slug}` }],
    };
  },
  component: ProjectPage,
});

function ProjectPage() {
  const params = Route.useParams();
  const loaderData = Route.useLoaderData();
  const { cms } = useCMS();

  // Prefer reactive live CMS project or fallback to loader data
  const project = cms.projects.find((p) => p.slug === params.slug) || loaderData;

  return <CaseStudy project={project} />;
}