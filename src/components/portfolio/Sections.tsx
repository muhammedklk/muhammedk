import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, MoveUpRight, Plus, PenTool, Code2, Layers, MousePointer2, Sparkles, LayoutGrid, Frame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { projects as fallbackProjects, type Project } from "@/data/projects";
import { useProjects } from "@/lib/projectStore";
import { Magnetic } from "./SiteChrome";

export const SectionLabel = ({ children }: { children: string }) => <p className="section-label">[ {children} ]</p>;
export const Status = () => <span className="availability"><span className="status-dot" />AVAILABLE FOR WORK</span>;

const heroIcons = [
  { Icon: PenTool, cls: "hi-1", label: "Design" },
  { Icon: Code2, cls: "hi-2", label: "Development" },
  { Icon: Layers, cls: "hi-3", label: "Systems" },
  { Icon: MousePointer2, cls: "hi-4", label: "Interaction" },
  { Icon: Sparkles, cls: "hi-5", label: "Detail" },
  { Icon: LayoutGrid, cls: "hi-6", label: "Layout" },
  { Icon: Frame, cls: "hi-7", label: "Responsive" },
] as const;

export function Hero() { return <section className="hero editorial-grid"><div className="hero-label"><SectionLabel>UI/UX DESIGNER + FRONT-END DEVELOPER</SectionLabel></div><p className="hero-index">01—03</p><h1><span>I DESIGN</span><span>DIGITAL</span><span>EXPERIENCES</span><span>THAT WORK.</span></h1><div className="hero-copy"><p>I turn ideas into thoughtful interfaces and responsive digital experiences — from UX structure and visual systems to production-ready front-end development.</p><div className="hero-actions"><Magnetic><Button variant="editorial" size="editorial" asChild><Link to="/work">VIEW MY WORK <ArrowRight /></Link></Button></Magnetic><Button variant="editorialGhost" size="editorial" asChild><Link to="/contact">LET'S TALK</Link></Button></div></div><div className="hero-meta"><Status /><span>KERALA, INDIA</span><span className="scroll-cue"><ArrowDown />SCROLL TO EXPLORE</span></div></section> }

export function AboutIntro({ full = false }: { full?: boolean }) { return <section className={`about-intro editorial-grid ${full ? "about-full" : ""}`}><div className="about-label"><SectionLabel>ABOUT</SectionLabel></div><h2>I DESIGN WITH<br /><em>PURPOSE.</em><br />I BUILD WITH<br /><em>DETAIL.</em></h2><div className="about-copy"><p className="lede">I'm Muhammed K, a UI/UX Designer and Front-End Developer focused on creating clean, intuitive and visually engaging digital experiences.</p><p>My work combines interface design, user experience thinking and front-end development to create websites and digital products that are both beautiful and functional.</p>{!full && <Link className="text-link" to="/about">MORE ABOUT ME <ArrowRight /></Link>}</div></section> }

export function ProjectFeature({ project, index = 0 }: { project: Project; index?: number }) { return <article id={`project-${project.slug}`} className={`project-feature${index % 2 ? " is-flipped" : ""}`}><div className="project-head"><span>PROJECT / {project.number}</span><span>{project.category}</span><span>{String(index + 1).padStart(2, "0")} — FEATURED</span></div><Link to="/work/$slug" params={{ slug: project.slug }} className="project-image" data-cursor="view"><img src={project.image} alt={`${project.title} interface presentation`} loading="lazy" width={project.dimensions?.[0] || 1600} height={project.dimensions?.[1] || 900} /><span className="project-image-number" aria-hidden="true">{project.number}</span><span className="project-view">VIEW PROJECT <MoveUpRight /></span><span className="project-accent" /></Link><div className="project-info"><span className="project-discipline">{project.category.split("/")[0]}</span><h3>{project.title}</h3><p>{project.description}</p><Link className="case-link" to="/work/$slug" params={{ slug: project.slug }}>EXPLORE CASE STUDY <MoveUpRight /></Link></div></article> }

export function SelectedWork({ limit }: { limit?: number }) { const projects = useProjects(); const shown = limit ? projects.slice(0, limit) : projects; return <section className={`selected-work${limit ? " is-featured" : " is-archive"}`}><div className="work-title editorial-grid"><SectionLabel>SELECTED WORK</SectionLabel><p className="work-count">{String(shown.length).padStart(2, "0")} / FEATURED PROJECTS</p><h2><Link to="/work">SELECTED <span>WORK</span></Link></h2><p className="work-intro">Digital products shaped through research, interface design and responsive front-end execution.</p></div><div className="project-list">{shown.map((p, i) => <ProjectFeature key={p.slug} project={p} index={i} />)}</div>{limit && <div className="all-work"><Link to="/work"><span>EXPLORE THE FULL ARCHIVE</span><strong>{String(projects.length).padStart(2, "0")} PROJECTS</strong><ArrowRight /></Link></div>}</section> }

const steps = [{ n: "01", t: "DISCOVER", d: "Understand the problem, users, goals and project requirements." }, { n: "02", t: "DESIGN", d: "Create wireframes, visual systems, prototypes and polished interfaces." }, { n: "03", t: "BUILD", d: "Translate the design into responsive, performant and maintainable front-end code." }];
export function Process() { return <section className="process dark-band"><div className="process-intro editorial-grid"><SectionLabel>PROCESS</SectionLabel><h2>FROM IDEA<br />TO INTERFACE<br /><span>TO EXPERIENCE.</span></h2></div><div className="process-steps">{steps.map((s, i) => <article key={s.n}><span className="step-number">{s.n}</span><div className={`step-graphic graphic-${i + 1}`} aria-hidden="true"><i /><i /><i /></div><h3>{s.t}</h3><p>{s.d}</p></article>)}</div></section> }

const tools = ["FIGMA", "PHOTOSHOP", "HTML", "CSS", "JAVASCRIPT", "BOOTSTRAP", "GSAP", "GIT", "GITHUB"];
const skills = ["UI/UX DESIGN", "WIREFRAMING", "PROTOTYPING", "RESPONSIVE DESIGN", "DESIGN SYSTEMS", "INTERACTION DESIGN"];
export function SkillsMarquee() { return <section className="toolkit"><div className="toolkit-head editorial-grid"><SectionLabel>SKILLS</SectionLabel><h2>TOOLS I<br />WORK WITH</h2></div><div className="marquee blue"><div>{[...tools, ...tools].map((x, i) => <span key={i}>{x} <b>↗</b></span>)}</div></div><div className="marquee lime reverse"><div>{[...skills, ...skills].map((x, i) => <span key={i}>{x} <b>+</b></span>)}</div></div></section> }

export function Experience() { return <section className="experience editorial-grid"><SectionLabel>EXPERIENCE</SectionLabel><div className="experience-row"><span>2026</span><div><h3>DUPLEX SOLUTION CO.</h3><p>WEB DESIGNER (UI/UX & FULL STACK SUPPORT)</p></div><p>Designing and building responsive websites end to end — from UI/UX design and visual systems to full-stack development support, keeping interfaces consistent, accessible and performant.</p></div><div className="experience-row"><span>2025</span><div><h3>FEBNO TECHNOLOGIES</h3><p>UI/UX DESIGN INTERN</p></div><p>Contributed to responsive webpage development, reusable interface patterns, and the design-to-development workflow. Focused on clarity, consistency and practical performance improvements without overstating outcomes.</p></div></section> }

const stats = [{ n: "01+", t: "DESIGN SYSTEMS", Icon: Layers }, { n: "05+", t: "WEB PROJECTS", Icon: LayoutGrid }, { n: "UI/UX", t: "+ FRONT-END", Icon: PenTool }, { n: "RESPONSIVE", t: "BY DEFAULT", Icon: Frame }] as const;
export function Stats() { return <section className="stats">{stats.map((x, i) => { const Icon = x.Icon; return <div key={x.n} style={{ animationDelay: `${i * 0.25}s` }}><span className="stats-icon"><Icon /></span><strong>{x.n}</strong><span>{x.t}</span></div> })}</section> }

const services = [{ n: "01", t: "UI/UX DESIGN", d: "User flows, wireframes, prototypes and polished interfaces." }, { n: "02", t: "WEB DESIGN", d: "Modern responsive websites focused on clarity and visual impact." }, { n: "03", t: "FRONT-END DEVELOPMENT", d: "Responsive interfaces built with HTML, CSS, JavaScript and Bootstrap." }, { n: "04", t: "DESIGN TO CODE", d: "Turning Figma designs into accurate, responsive web experiences." }];
export function Services() { return <section className="services"><div className="services-title editorial-grid"><SectionLabel>SERVICES</SectionLabel><h2>WHAT I CAN<br /><span>HELP WITH</span></h2></div><div>{services.map(s => <article key={s.n}><span>{s.n}</span><h3>{s.t}</h3><p>{s.d}</p><MoveUpRight /></article>)}</div></section> }

const faqs = [
  { q: "WHAT KIND OF PROJECTS DO YOU WORK ON?", a: "I work on responsive websites, product interfaces, landing pages, design systems and design-to-code projects for businesses, teams and growing brands." },
  { q: "CAN YOU HANDLE BOTH DESIGN AND DEVELOPMENT?", a: "Yes. I can take a project from UX structure and visual design through to a responsive front-end build, helping the final experience stay consistent with the original design." },
  { q: "WHAT DOES YOUR PROCESS LOOK LIKE?", a: "Each project moves through discovery, structure, visual design and development. The exact scope is adapted to the goals, timeline and existing materials." },
  { q: "DO YOU WORK WITH EXISTING DESIGNS?", a: "Yes. I can improve an existing interface, extend a design system or turn completed Figma designs into polished, responsive front-end experiences." },
  { q: "HOW CAN WE START A PROJECT?", a: "Send me a short overview of your project, goals and expected timeline through the contact page. I will review it and reply with the best next step." },
];
export function FAQ() { const [openIndex, setOpenIndex] = useState<number | null>(0); return <section className="faq editorial-grid"><div className="faq-heading"><SectionLabel>FAQ</SectionLabel><h2>GOOD<br /><span>QUESTIONS.</span><br />CLEAR ANSWERS.</h2></div><div className="faq-list">{faqs.map((item, i) => <details key={item.q} name="faq-accordion" open={openIndex === i} onToggle={(e) => { if (e.currentTarget.open) { setOpenIndex(i); } else if (openIndex === i) { setOpenIndex(null); } }}><summary><span>{String(i + 1).padStart(2, "0")}</span><strong>{item.q}</strong><Plus aria-hidden="true" /></summary><p>{item.a}</p></details>)}</div></section> }

export function ContactTeaser() { return <section className="contact-teaser dark-band"><SectionLabel>CONTACT</SectionLabel><h2>LET'S BUILD<br />SOMETHING<br /><span>USEFUL.</span></h2><div><p>Have a project, idea or opportunity?<br />Let's talk.</p><Status /><Button variant="lime" size="editorial" asChild><Link to="/contact">START A CONVERSATION <ArrowRight /></Link></Button></div></section> }
