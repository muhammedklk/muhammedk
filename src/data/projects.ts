import ronaraiksa from "@/assets/mockup-ronaraiksa.jpg";
import geminiMusicAward from "@/assets/mockup-gemini-music-award.jpg";
import novaEcommerce from "@/assets/mockup-nova.jpg";
import styleora from "@/assets/mockup-styleora.jpg";
import novaDashboard from "@/assets/mockup-nova-dashboard.jpg";

export type Project = {
  slug: string;
  number: string;
  title: string;
  category: string;
  description: string;
  tech: string[];
  image: string;
  dimensions: [number, number];
  accent: "blue" | "lime" | "dark";
  challenge: string;
  objective: string;
  result: string;
};

export const projects: Project[] = [
  {
    slug: "ronarai-ksa",
    number: "01",
    title: "RONARAI KSA",
    category: "Restaurant Website / UI/UX Design & Development",
    description: "A modern restaurant website focused on visual storytelling, menu presentation, and responsive user experience for dining guests.",
    tech: ["Figma", "UI/UX Design", "HTML", "CSS", "JavaScript"],
    image: ronaraiksa,
    dimensions: [1600, 1104],
    accent: "dark",
    challenge: "Balance immersive culinary imagery with fast access to practical menu and reservation information.",
    objective: "Create an atmosphere-led restaurant journey that remains direct, highly readable, and fully responsive across devices.",
    result: "An editorial dining experience featuring structured menu sections and refined aesthetic pacing."
  },
  {
    slug: "gemini-music-award",
    number: "02",
    title: "GEMINI MUSIC AWARD",
    category: "Event Website / UI/UX Design & Front-End Development",
    description: "A high-impact event website designed and developed for a prestigious music award ceremony, highlighting artist lineups, live voting, and nominee showcases.",
    tech: ["Figma", "UI/UX Design", "React", "TypeScript", "Tailwind CSS"],
    image: geminiMusicAward,
    dimensions: [1600, 900],
    accent: "blue",
    challenge: "Deliver an energetic event brand online while keeping nominee lists, schedule timelines, and ticket access instantly accessible.",
    objective: "Design and build a dynamic digital experience that drives attendance, engagement, and audience voting.",
    result: "A vivid digital portal with immersive event previews, responsive nominee cards, and streamlined ticket conversion flows."
  },
  {
    slug: "nova-ecommerce",
    number: "03",
    title: "NOVA",
    category: "E-Commerce / UI/UX Design",
    description: "A premium e-commerce interface designed with minimal aesthetics, fluid product browsing, and an intuitive shopping cart experience.",
    tech: ["Figma", "UI/UX Design", "E-Commerce", "Design System"],
    image: novaEcommerce,
    dimensions: [1600, 900],
    accent: "lime",
    challenge: "Elevate high-end apparel product presentation without cluttering product details or checkout interactions.",
    objective: "Establish a refined luxury brand visual system with clean typography and effortless product discovery.",
    result: "A polished e-commerce UI concept with modular collection grids, interactive filtering, and seamless slide-out cart UI."
  },
  {
    slug: "styleora",
    number: "04",
    title: "STYLEORA",
    category: "E-Commerce / UI/UX Design & Development",
    description: "A modern online store built for effortless fashion shopping, featuring dynamic product displays and responsive front-end execution.",
    tech: ["Figma", "UI/UX Design", "HTML", "CSS", "JavaScript"],
    image: styleora,
    dimensions: [1200, 1504],
    accent: "blue",
    challenge: "Provide rich visual merchandise highlights while optimizing responsive navigation and mobile shopping UX.",
    objective: "Construct a sleek visual storefront system that minimizes purchasing friction across all mobile and desktop screens.",
    result: "A modern e-commerce experience with refined product card interactions and streamlined checkout screens."
  },
  {
    slug: "nova-dashboard",
    number: "05",
    title: "NOVA DASHBOARD",
    category: "Dashboard / UI/UX Design",
    description: "An enterprise analytics and operational dashboard designed for clear metric visualization, financial tracking, and workflow efficiency.",
    tech: ["Figma", "UI/UX Design", "Dashboard Systems", "Prototyping"],
    image: novaDashboard,
    dimensions: [1600, 900],
    accent: "dark",
    challenge: "Organize extensive revenue data, subscriber metrics, and user cohorts into a clear, scannable dashboard layout.",
    objective: "Reduce visual noise and cognitive overload for platform administrators through intuitive chart design and hierarchical data cards.",
    result: "A scalable dark-themed dashboard interface with customizable widgets, clear KPI summaries, and active trend visualization."
  }
];
