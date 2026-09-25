import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SectionLabel } from "./Sections";
import { useCMS, type CaseStudyFull } from "@/lib/cmsStore";

export function CaseStudy({ project }: { project?: CaseStudyFull }) {
  const { cms } = useCMS();

  if (!project) {
    return (
      <div className="inner-page" style={{ minHeight: "60vh", display: "grid", placeItems: "center", textAlign: "center", padding: "60px 24px" }}>
        <div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "32px", marginBottom: "12px" }}>CASE STUDY NOT FOUND</h2>
          <p style={{ fontSize: "14px", opacity: 0.7, marginBottom: "24px" }}>The requested portfolio work could not be located.</p>
          <Link to="/work" className="text-link" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
            <ArrowLeft /> BACK TO WORK ARCHIVE
          </Link>
        </div>
      </div>
    );
  }

  const projectsList = Array.isArray(cms?.projects) && cms.projects.length > 0 ? cms.projects : [];
  const currentIndex = projectsList.findIndex((p) => p?.slug === project.slug);
  const nextProject = projectsList.length > 0 && currentIndex !== -1 ? projectsList[(currentIndex + 1) % projectsList.length] : null;

  const galleryImages =
    Array.isArray(project.galleryImages) && project.galleryImages.length > 0
      ? project.galleryImages
      : [project.image || "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80"];

  const mainImage = project.image || galleryImages[0] || "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80";
  const devImage = project.devDeviceImage || mainImage;
  const techList = Array.isArray(project.tech) ? project.tech : String(project.tech || "Figma, React, CSS").split(",");

  const customAccentHex = project.accentColorHex || (project.accent === "lime" ? "#ccff00" : project.accent === "blue" ? "#2563eb" : "#0f172a");
  const customDevBgHex = project.devBgColorHex || (project.accent === "lime" ? "#ccff00" : project.accent === "blue" ? "#2563eb" : "#0f172a");

  const discoveryCards = project.discoveryCards && project.discoveryCards.length > 0 ? project.discoveryCards : [
    { n: "01", t: "USER FLOW", d: "Mapped the essential journeys, decision points and content priorities before committing to visual detail." },
    { n: "02", t: "WIREFRAMES", d: "Built low-fidelity structures to test hierarchy, density and responsive behavior across key screens." },
    { n: "03", t: "VISUAL DESIGN", d: "Developed an adaptable visual language with a clear type scale, purposeful color and consistent interaction patterns." },
  ];

  return (
    <div className="inner-page work-detail-page">
      {/* Hero Section */}
      <section className="case-hero editorial-grid">
        <Link to="/work" className="back-link">
          <ArrowLeft /> ALL WORK
        </Link>
        <p className="case-number">PROJECT {project.number || "01"}</p>
        <h1>{project.title || "CASE STUDY"}</h1>
        <div className="case-meta">
          <div>
            <span>ROLE</span>
            <p>{project.clientRole || "UI/UX Designer / Front-End Developer"}</p>
          </div>
          <div>
            <span>DISCIPLINE</span>
            <p>{project.category || "UI/UX Design & Development"}</p>
          </div>
          <div>
            <span>TIMELINE</span>
            <p>{project.timeline || "2025 – 2026"}</p>
          </div>
        </div>
      </section>

      {/* Main Image Banner */}
      <div className="case-main-image" data-cursor="view">
        <img
          src={mainImage}
          alt={`${project.title || "Project"} primary interface presentation`}
          width={project.dimensions?.[0] || 1600}
          height={project.dimensions?.[1] || 900}
        />
      </div>

      {/* Overview Section */}
      <section className="case-overview editorial-grid">
        <SectionLabel>OVERVIEW</SectionLabel>
        <h2>{project.description || "A modern digital experience built for clarity and impact."}</h2>
        <div>
          <span>CHALLENGE</span>
          <p>{project.challenge || "Balancing user needs with clean visual storytelling."}</p>
        </div>
        <div>
          <span>OBJECTIVE</span>
          <p>{project.objective || "Delivering an intuitive, responsive interface."}</p>
        </div>
      </section>

      {/* Discovery & Research Process Section */}
      <section className="case-process dark-band">
        <div>
          <SectionLabel>RESEARCH / DISCOVERY</SectionLabel>
          <h2>{project.discoveryHeading || project.overviewHeading || "FIND THE SIGNAL BEFORE THE STYLE."}</h2>
        </div>
        <div className="case-process-grid">
          {discoveryCards.map((card, idx) => (
            <article key={idx}>
              <span>{card.n}</span>
              <h3>{card.t}</h3>
              <p>{card.d}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Gallery Showcase & Design System Section */}
      <section className="case-gallery editorial-grid">
        <div>
          <SectionLabel>DESIGN SYSTEM</SectionLabel>
          <h2>{project.galleryHeading || "CONSISTENCY AT EVERY SCALE."}</h2>
        </div>

        {galleryImages.map((imgUrl, imgIdx) => (
          <figure key={imgIdx} className="gallery-large" style={{ marginBottom: "30px" }}>
            <img
              src={imgUrl}
              alt={`${project.title || "Project"} slide ${imgIdx + 1}`}
              loading="lazy"
              width={project.dimensions?.[0] || 1600}
              height={project.dimensions?.[1] || 900}
            />
          </figure>
        ))}

        <div className="system-swatch">
          <span>{project.typeLabel || "TYPE / 01"}</span>
          <strong>{project.typeSample || "Aa"}</strong>
          <p style={{ whiteSpace: "pre-line" }}>
            {project.typeDescription || "Clear hierarchy\nFlexible scale"}
          </p>
        </div>
        <div className="system-swatch accent" style={{ backgroundColor: customAccentHex, color: (customAccentHex === "#ccff00" || customAccentHex === "#ffffff") ? "#0f172a" : "#ffffff" }}>
          <span>{project.colorLabel || "COLOR / 02"}</span>
          <strong style={{ color: "currentColor" }}>●</strong>
          <p style={{ color: "currentColor", whiteSpace: "pre-line" }}>
            {project.colorDescription || "Focused accents\nAccessible contrast"}
          </p>
        </div>
      </section>

      {/* Development Banner Section with Custom Background Color */}
      <section
        className="case-development"
        style={{
          backgroundColor: customDevBgHex,
          color: customDevBgHex === "#ccff00" ? "#0f172a" : "#ffffff",
          padding: "60px 40px",
          margin: "40px 0",
        }}
      >
        <SectionLabel>{project.devHeading ? "DEVELOPMENT" : "DEVELOPMENT"}</SectionLabel>
        <div>
          <h2 style={{ color: "currentColor", fontFamily: "var(--font-display)", fontSize: "clamp(32px, 5vw, 56px)", lineHeight: 0.95 }}>
            {project.devHeading ? (
              <span style={{ whiteSpace: "pre-line" }}>{project.devHeading}</span>
            ) : (
              <>
                DESIGNED TO
                <br />
                WORK IN CODE.
              </>
            )}
          </h2>
          <p style={{ color: "currentColor", opacity: 0.9, marginTop: "16px" }}>
            {project.devDescription || "The interface was considered as a responsive system rather than a fixed composition. Components, states and spacing adapt deliberately from desktop to mobile."}
          </p>
        </div>
        <div className="device-crop" style={{ marginTop: "30px" }}>
          <img
            src={devImage}
            alt={`${project.title || "Project"} responsive presentation`}
            loading="lazy"
            width={project.dimensions?.[0] || 1600}
            height={project.dimensions?.[1] || 900}
          />
        </div>
      </section>

      {/* Final Result Section */}
      <section className="case-result editorial-grid">
        <SectionLabel>FINAL RESULT</SectionLabel>
        <h2>{project.result || "A highly polished, responsive web experience."}</h2>
        <div>
          <span>KEY LEARNINGS</span>
          <p>{project.keyLearnings || "Strong outcomes begin with clear hierarchy. Early structural decisions make later visual choices far more coherent."}</p>
        </div>
        <div>
          <span>TECH STACK</span>
          <p>{techList.join(" / ")}</p>
        </div>
      </section>

      {/* Next Project Nav Banner */}
      {nextProject && (
        <section className="next-project dark-band">
          <p>NEXT PROJECT</p>
          <Link to="/work/$slug" params={{ slug: nextProject.slug }}>
            <span>{nextProject.number || "01"}</span>
            {nextProject.title || "NEXT WORK"}
            <ArrowRight />
          </Link>
        </section>
      )}
    </div>
  );
}
