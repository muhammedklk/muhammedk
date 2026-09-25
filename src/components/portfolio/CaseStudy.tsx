import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { type Project } from "@/data/projects";
import { Button } from "@/components/ui/button";
import { SectionLabel } from "./Sections";
import { useCMS, type CaseStudyFull } from "@/lib/cmsStore";

export function CaseStudy({ project }: { project: CaseStudyFull }) {
  const { cms } = useCMS();
  const projectsList = cms.projects;
  const currentIndex = projectsList.findIndex((p) => p.slug === project.slug);
  const nextProject = projectsList[(currentIndex + 1) % projectsList.length];

  const galleryImages = project.galleryImages && project.galleryImages.length > 0 ? project.galleryImages : [project.image];

  return (
    <>
      <section className="case-hero editorial-grid">
        <Link to="/work" className="back-link">
          <ArrowLeft /> ALL WORK
        </Link>
        <p className="case-number">PROJECT {project.number}</p>
        <h1>{project.title}</h1>
        <div className="case-meta">
          <div>
            <span>ROLE</span>
            <p>{project.clientRole || "UI/UX Designer / Front-End Developer"}</p>
          </div>
          <div>
            <span>DISCIPLINE</span>
            <p>{project.category}</p>
          </div>
          <div>
            <span>TIMELINE</span>
            <p>{project.timeline || "2025 – 2026"}</p>
          </div>
        </div>
      </section>

      <div className="case-main-image" data-cursor="view">
        <img
          src={project.image}
          alt={`${project.title} primary interface presentation`}
          width={project.dimensions?.[0] || 1600}
          height={project.dimensions?.[1] || 900}
        />
      </div>

      <section className="case-overview editorial-grid">
        <SectionLabel>OVERVIEW</SectionLabel>
        <h2>{project.description}</h2>
        <div>
          <span>CHALLENGE</span>
          <p>{project.challenge}</p>
        </div>
        <div>
          <span>OBJECTIVE</span>
          <p>{project.objective}</p>
        </div>
      </section>

      <section className="case-process dark-band">
        <div>
          <SectionLabel>RESEARCH / DISCOVERY</SectionLabel>
          <h2>{project.overviewHeading || "FIND THE SIGNAL BEFORE THE STYLE."}</h2>
        </div>
        <div className="case-process-grid">
          <article>
            <span>01</span>
            <h3>USER FLOW</h3>
            <p>Mapped the essential journeys, decision points and content priorities before committing to visual detail.</p>
          </article>
          <article>
            <span>02</span>
            <h3>WIREFRAMES</h3>
            <p>Built low-fidelity structures to test hierarchy, density and responsive behavior across key screens.</p>
          </article>
          <article>
            <span>03</span>
            <h3>VISUAL DESIGN</h3>
            <p>Developed an adaptable visual language with a clear type scale, purposeful color and consistent interaction patterns.</p>
          </article>
        </div>
      </section>

      {/* Gallery Showcase */}
      <section className="case-gallery editorial-grid">
        <div>
          <SectionLabel>PROJECT GALLERY</SectionLabel>
          <h2>
            CONSISTENCY
            <br />
            AT EVERY SCALE.
          </h2>
        </div>

        {galleryImages.map((imgUrl, imgIdx) => (
          <figure key={imgIdx} className="gallery-large" style={{ marginBottom: "30px" }}>
            <img
              src={imgUrl}
              alt={`${project.title} presentation slide ${imgIdx + 1}`}
              loading="lazy"
              width={project.dimensions?.[0] || 1600}
              height={project.dimensions?.[1] || 900}
            />
          </figure>
        ))}

        <div className="system-swatch">
          <span>TYPE / 01</span>
          <strong>Aa</strong>
          <p>
            Clear hierarchy
            <br />
            Flexible scale
          </p>
        </div>
        <div className="system-swatch accent">
          <span>COLOR / 02</span>
          <strong>●</strong>
          <p>
            Focused accents
            <br />
            Accessible contrast
          </p>
        </div>
      </section>

      <section className="case-development">
        <SectionLabel>DEVELOPMENT</SectionLabel>
        <div>
          <h2>
            DESIGNED TO
            <br />
            WORK IN CODE.
          </h2>
          <p>
            The interface was considered as a responsive system rather than a fixed composition. Components, states and spacing adapt deliberately from desktop to mobile.
          </p>
        </div>
        <div className="device-crop">
          <img
            src={project.image}
            alt={`${project.title} responsive presentation`}
            loading="lazy"
            width={project.dimensions?.[0] || 1600}
            height={project.dimensions?.[1] || 900}
          />
        </div>
      </section>

      <section className="case-result editorial-grid">
        <SectionLabel>FINAL RESULT</SectionLabel>
        <h2>{project.result}</h2>
        <div>
          <span>KEY LEARNINGS</span>
          <p>{project.keyLearnings || "Strong outcomes begin with clear hierarchy. Early structural decisions make later visual choices far more coherent."}</p>
        </div>
        <div>
          <span>TECH STACK</span>
          <p>{Array.isArray(project.tech) ? project.tech.join(" / ") : String(project.tech)}</p>
        </div>
      </section>

      {nextProject && (
        <section className="next-project dark-band">
          <p>NEXT PROJECT</p>
          <Link to="/work/$slug" params={{ slug: nextProject.slug }}>
            <span>{nextProject.number}</span>
            {nextProject.title}
            <ArrowRight />
          </Link>
        </section>
      )}
    </>
  );
}
