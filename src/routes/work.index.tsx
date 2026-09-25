import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDownRight, MoveUpRight } from "lucide-react";
import { ContactTeaser, SectionLabel, SelectedWork, Services } from "@/components/portfolio/Sections";
import { useCMS } from "@/lib/cmsStore";

export const Route = createFileRoute("/work/")({
  head: () => ({
    meta: [
      { title: "Selected Work — Muhammed K" },
      { name: "description", content: "Explore selected UI/UX design, web design and front-end development projects by Muhammed K." },
      { property: "og:title", content: "Selected Work — Muhammed K" },
      { property: "og:description", content: "Interfaces, websites and digital experiences designed and built by Muhammed K." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/work" }],
  }),
  component: WorkPage,
});

function WorkPage() {
  const { cms } = useCMS();
  const workConfig = cms.workPage;
  const projects = cms.projects;

  return (
    <div className="inner-page work-page">
      <section className="page-title work-page-title editorial-grid">
        <p>{workConfig.label || "03 / WORK ARCHIVE"}</p>
        <p className="work-page-count">
          {String(projects.length).padStart(2, "0")} PROJECTS
          <br />
          DESIGN + CODE
        </p>
        <h1>
          {workConfig.title ? (
            <>
              {workConfig.title.split(" ")[0]}
              <br />
              <span>{workConfig.title.split(" ").slice(1).join(" ") || "WORK."}</span>
            </>
          ) : (
            <>
              SELECTED
              <br />
              <span>WORK.</span>
            </>
          )}
        </h1>
        <p>{workConfig.intro}</p>
        <ArrowDownRight className="work-scroll-mark" aria-hidden="true" />
      </section>

      <section className="work-index editorial-grid" aria-label="Project index">
        <SectionLabel>{workConfig.indexLabel || "PROJECT INDEX"}</SectionLabel>
        <p className="index-note">{workConfig.indexNote || "JUMP DIRECTLY TO A CASE STUDY"}</p>
        <ol>
          {projects.map((p) => (
            <li key={p.slug}>
              <Link to="/work/$slug" params={{ slug: p.slug }}>
                <span className="wi-num">{p.number}</span>
                <span className="wi-title">{p.title}</span>
                <span className="wi-cat">{p.category}</span>
                <span className="wi-year">{p.tech.slice(0, 2).join(" · ")}</span>
                <MoveUpRight />
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <SelectedWork />
      <Services />
      <ContactTeaser />
    </div>
  );
}
