import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, MoveUpRight, Plus, PenTool, Code2, Layers, MousePointer2, Sparkles, LayoutGrid, Frame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCMS } from "@/lib/cmsStore";
import { Magnetic } from "./SiteChrome";
import { type Project } from "@/data/projects";

export const SectionLabel = ({ children }: { children: string }) => <p className="section-label">[ {children} ]</p>;
export const Status = ({ label }: { label?: string }) => (
  <span className="availability">
    <span className="status-dot" />
    {label || "AVAILABLE FOR WORK"}
  </span>
);

export function Hero() {
  const { cms } = useCMS();
  const hero = cms.home.hero;

  return (
    <section className="hero editorial-grid">
      <div className="hero-label">
        <SectionLabel>{hero.label}</SectionLabel>
      </div>
      <p className="hero-index">01—03</p>
      <h1>
        <span>{hero.titleLine1}</span>
        <span>{hero.titleLine2}</span>
        <span>{hero.titleLine3}</span>
        <span>{hero.titleLine4}</span>
      </h1>
      <div className="hero-copy">
        <p>{hero.subtitle}</p>
        <div className="hero-actions">
          <Magnetic>
            <Button variant="editorial" size="editorial" asChild>
              <Link to="/work">
                {hero.primaryBtnText} <ArrowRight />
              </Link>
            </Button>
          </Magnetic>
          <Button variant="editorialGhost" size="editorial" asChild>
            <Link to="/contact">{hero.secondaryBtnText}</Link>
          </Button>
        </div>
      </div>
      <div className="hero-meta">
        <Status label={hero.statusText} />
        <span>{hero.locationText}</span>
        <span className="scroll-cue">
          <ArrowDown />
          SCROLL TO EXPLORE
        </span>
      </div>
    </section>
  );
}

export function AboutIntro({ full = false }: { full?: boolean }) {
  const { cms } = useCMS();
  const about = cms.home.aboutIntro;

  return (
    <section className={`about-intro editorial-grid ${full ? "about-full" : ""}`}>
      <div className="about-label">
        <SectionLabel>{about.label}</SectionLabel>
      </div>
      <h2>
        {about.line1}
        <br />
        <em>{about.line2}</em>
        <br />
        {about.line3}
        <br />
        <em>{about.line4}</em>
      </h2>
      <div className="about-copy">
        <p className="lede">{about.paragraph1}</p>
        <p>{about.paragraph2}</p>
        {!full && (
          <Link className="text-link" to="/about">
            {about.btnText} <ArrowRight />
          </Link>
        )}
      </div>
    </section>
  );
}

export function ProjectFeature({ project, index = 0 }: { project: Project; index?: number }) {
  return (
    <article id={`project-${project.slug}`} className={`project-feature${index % 2 ? " is-flipped" : ""}`}>
      <div className="project-head">
        <span>PROJECT / {project.number}</span>
        <span>{project.category}</span>
        <span>{String(index + 1).padStart(2, "0")} — FEATURED</span>
      </div>
      <Link to="/work/$slug" params={{ slug: project.slug }} className="project-image" data-cursor="view">
        <img
          src={project.image}
          alt={`${project.title} interface presentation`}
          loading="lazy"
          width={project.dimensions?.[0] || 1600}
          height={project.dimensions?.[1] || 900}
        />
        <span className="project-image-number" aria-hidden="true">
          {project.number}
        </span>
        <span className="project-view">
          VIEW PROJECT <MoveUpRight />
        </span>
        <span className="project-accent" />
      </Link>
      <div className="project-info">
        <span className="project-discipline">{project.category.split("/")[0]}</span>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <Link className="case-link" to="/work/$slug" params={{ slug: project.slug }}>
          EXPLORE CASE STUDY <MoveUpRight />
        </Link>
      </div>
    </article>
  );
}

export function SelectedWork({ limit }: { limit?: number }) {
  const { cms } = useCMS();
  const workConfig = cms.home.selectedWork;
  const projectsList = cms.projects;
  const shown = limit ? projectsList.slice(0, limit) : projectsList;

  return (
    <section className={`selected-work${limit ? " is-featured" : " is-archive"}`}>
      <div className="work-title editorial-grid">
        <SectionLabel>{workConfig.label}</SectionLabel>
        <p className="work-count">{String(shown.length).padStart(2, "0")} / FEATURED PROJECTS</p>
        <h2>
          <Link to="/work">
            SELECTED <span>WORK</span>
          </Link>
        </h2>
        <p className="work-intro">{workConfig.intro}</p>
      </div>
      <div className="project-list">
        {shown.map((p, i) => (
          <ProjectFeature key={p.slug} project={p} index={i} />
        ))}
      </div>
      {limit && (
        <div className="all-work">
          <Link to="/work">
            <span>EXPLORE THE FULL ARCHIVE</span>
            <strong>{String(projectsList.length).padStart(2, "0")} PROJECTS</strong>
            <ArrowRight />
          </Link>
        </div>
      )}
    </section>
  );
}

export function Process() {
  const { cms } = useCMS();
  const process = cms.home.process;

  return (
    <section className="process dark-band">
      <div className="process-intro editorial-grid">
        <SectionLabel>{process.label}</SectionLabel>
        <h2>
          {process.headingLine1}
          <br />
          {process.headingLine2}
          <br />
          <span>{process.headingLine3}</span>
        </h2>
      </div>
      <div className="process-steps">
        {process.steps.map((s, i) => (
          <article key={s.n || i}>
            <span className="step-number">{s.n}</span>
            <div className={`step-graphic graphic-${i + 1}`} aria-hidden="true">
              <i />
              <i />
              <i />
            </div>
            <h3>{s.t}</h3>
            <p>{s.d}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function SkillsMarquee() {
  const { cms } = useCMS();
  const skillsData = cms.home.skills;
  const toolsList = skillsData.tools || [];
  const skillsList = skillsData.skills || [];

  return (
    <section className="toolkit">
      <div className="toolkit-head editorial-grid">
        <SectionLabel>{skillsData.label}</SectionLabel>
        <h2>
          {skillsData.headingLine1}
          <br />
          {skillsData.headingLine2}
        </h2>
      </div>
      <div className="marquee blue">
        <div>
          {[...toolsList, ...toolsList].map((x, i) => (
            <span key={i}>
              {x} <b>↗</b>
            </span>
          ))}
        </div>
      </div>
      <div className="marquee lime reverse">
        <div>
          {[...skillsList, ...skillsList].map((x, i) => (
            <span key={i}>
              {x} <b>+</b>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Experience() {
  const { cms } = useCMS();
  const experiences = cms.aboutPage.experiences || [];

  return (
    <section className="experience editorial-grid">
      <SectionLabel>EXPERIENCE</SectionLabel>
      {experiences.map((exp, idx) => (
        <div key={idx} className="experience-row">
          <span>{exp.year}</span>
          <div>
            <h3>{exp.company}</h3>
            <p>{exp.role}</p>
          </div>
          <p>{exp.description}</p>
        </div>
      ))}
    </section>
  );
}

export function Stats() {
  const { cms } = useCMS();
  const s = cms.home.stats;

  const statItems = [
    { n: s.stat1Number, t: s.stat1Label, Icon: Layers },
    { n: s.stat2Number, t: s.stat2Label, Icon: LayoutGrid },
    { n: s.stat3Number, t: s.stat3Label, Icon: PenTool },
    { n: s.stat4Number, t: s.stat4Label, Icon: Frame },
  ];

  return (
    <section className="stats">
      {statItems.map((x, i) => {
        const Icon = x.Icon;
        return (
          <div key={i} style={{ animationDelay: `${i * 0.25}s` }}>
            <span className="stats-icon">
              <Icon />
            </span>
            <strong>{x.n}</strong>
            <span>{x.t}</span>
          </div>
        );
      })}
    </section>
  );
}

export function Services() {
  const { cms } = useCMS();
  const services = cms.home.services;

  return (
    <section className="services">
      <div className="services-title editorial-grid">
        <SectionLabel>{services.label}</SectionLabel>
        <h2>
          {services.titleLine1}
          <br />
          <span>{services.titleLine2}</span>
        </h2>
      </div>
      <div>
        {services.items.map((s) => (
          <article key={s.n}>
            <span>{s.n}</span>
            <h3>{s.t}</h3>
            <p>{s.d}</p>
            <MoveUpRight />
          </article>
        ))}
      </div>
    </section>
  );
}

export function FAQ() {
  const { cms } = useCMS();
  const faqData = cms.home.faq;
  const faqs = faqData.items || [];
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="faq editorial-grid">
      <div className="faq-heading">
        <SectionLabel>{faqData.label}</SectionLabel>
        <h2>
          {faqData.titleLine1}
          <br />
          <span>{faqData.titleLine2}</span>
          <br />
          {faqData.titleLine3}
        </h2>
      </div>
      <div className="faq-list">
        {faqs.map((item, i) => (
          <details
            key={item.q || i}
            name="faq-accordion"
            open={openIndex === i}
            onToggle={(e) => {
              if (e.currentTarget.open) {
                setOpenIndex(i);
              } else if (openIndex === i) {
                setOpenIndex(null);
              }
            }}
          >
            <summary>
              <span>{String(i + 1).padStart(2, "0")}</span>
              <strong>{item.q}</strong>
              <Plus aria-hidden="true" />
            </summary>
            <p>{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function ContactTeaser() {
  const { cms } = useCMS();
  const teaser = cms.home.contactTeaser;

  return (
    <section className="contact-teaser dark-band">
      <SectionLabel>{teaser.label}</SectionLabel>
      <h2>
        {teaser.titleLine1}
        <br />
        {teaser.titleLine2}
        <br />
        <span>{teaser.titleLine3}</span>
      </h2>
      <div>
        <p style={{ whiteSpace: "pre-line" }}>{teaser.paragraph}</p>
        <Status />
        <Button variant="lime" size="editorial" asChild>
          <Link to="/contact">
            {teaser.btnText} <ArrowRight />
          </Link>
        </Button>
      </div>
    </section>
  );
}
