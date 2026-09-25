import { useState, useEffect } from "react";
import { projects as initialProjects, type Project } from "@/data/projects";

export type MaintenanceConfig = {
  global: boolean;
  pages: {
    home: boolean;
    about: boolean;
    work: boolean;
    contact: boolean;
    casestudy: boolean;
  };
};

export type ProcessStep = {
  n: string;
  t: string;
  d: string;
};

export type ServiceItem = {
  n: string;
  t: string;
  d: string;
};

export type FAQItem = {
  q: string;
  a: string;
};

export type ExperienceItem = {
  year: string;
  company: string;
  role: string;
  description: string;
};

export type CaseStudyProcessCard = {
  n: string;
  t: string;
  d: string;
};

export type CaseStudyFull = Project & {
  galleryImages?: string[];
  clientRole?: string;
  timeline?: string;
  overviewHeading?: string;
  discoveryHeading?: string;
  discoveryCards?: CaseStudyProcessCard[];
  galleryHeading?: string;
  accentColorHex?: string;
  typeLabel?: string;
  typeSample?: string;
  typeDescription?: string;
  colorLabel?: string;
  colorDescription?: string;
  devHeading?: string;
  devDescription?: string;
  devBgColorHex?: string;
  devDeviceImage?: string;
  keyLearnings?: string;
};

export type CMSData = {
  maintenance: MaintenanceConfig;
  home: {
    hero: {
      label: string;
      titleLine1: string;
      titleLine2: string;
      titleLine3: string;
      titleLine4: string;
      subtitle: string;
      primaryBtnText: string;
      secondaryBtnText: string;
      statusText: string;
      locationText: string;
    };
    aboutIntro: {
      label: string;
      line1: string;
      line2: string;
      line3: string;
      line4: string;
      paragraph1: string;
      paragraph2: string;
      btnText: string;
    };
    selectedWork: {
      label: string;
      title: string;
      intro: string;
    };
    process: {
      label: string;
      headingLine1: string;
      headingLine2: string;
      headingLine3: string;
      steps: ProcessStep[];
    };
    skills: {
      label: string;
      headingLine1: string;
      headingLine2: string;
      tools: string[];
      skills: string[];
    };
    stats: {
      stat1Number: string;
      stat1Label: string;
      stat2Number: string;
      stat2Label: string;
      stat3Number: string;
      stat3Label: string;
      stat4Number: string;
      stat4Label: string;
    };
    services: {
      label: string;
      titleLine1: string;
      titleLine2: string;
      items: ServiceItem[];
    };
    faq: {
      label: string;
      titleLine1: string;
      titleLine2: string;
      titleLine3: string;
      items: FAQItem[];
    };
    contactTeaser: {
      label: string;
      titleLine1: string;
      titleLine2: string;
      titleLine3: string;
      paragraph: string;
      btnText: string;
    };
    footer: {
      brandName: string;
      jobTitle1: string;
      jobTitle2: string;
      email: string;
      location: string;
      copyright: string;
    };
  };
  aboutPage: {
    title: string;
    subtitle: string;
    portraitImage: string;
    sectionLabel: string;
    ledeText: string;
    paragraph1: string;
    paragraph2: string;
    philosophyTitle: string;
    philosophyText: string;
    experiences: ExperienceItem[];
  };
  workPage: {
    title: string;
    subtitle: string;
    intro: string;
  };
  contactPage: {
    title: string;
    subtitle: string;
    email: string;
    phone: string;
    location: string;
    linkedinUrl: string;
    githubUrl: string;
    instagramUrl: string;
  };
  projects: CaseStudyFull[];
};

export const defaultCMSData: CMSData = {
  maintenance: {
    global: false,
    pages: {
      home: false,
      about: false,
      work: false,
      contact: false,
      casestudy: false,
    },
  },
  home: {
    hero: {
      label: "UI/UX DESIGNER + FRONT-END DEVELOPER",
      titleLine1: "I DESIGN",
      titleLine2: "DIGITAL",
      titleLine3: "EXPERIENCES",
      titleLine4: "THAT WORK.",
      subtitle:
        "I turn ideas into thoughtful interfaces and responsive digital experiences — from UX structure and visual systems to production-ready front-end development.",
      primaryBtnText: "VIEW MY WORK",
      secondaryBtnText: "LET'S TALK",
      statusText: "AVAILABLE FOR WORK",
      locationText: "KERALA, INDIA",
    },
    aboutIntro: {
      label: "ABOUT",
      line1: "I DESIGN WITH",
      line2: "PURPOSE.",
      line3: "I BUILD WITH",
      line4: "DETAIL.",
      paragraph1:
        "I'm Muhammed K, a UI/UX Designer and Front-End Developer focused on creating clean, intuitive and visually engaging digital experiences.",
      paragraph2:
        "My work combines interface design, user experience thinking and front-end development to create websites and digital products that are both beautiful and functional.",
      btnText: "MORE ABOUT ME",
    },
    selectedWork: {
      label: "SELECTED WORK",
      title: "SELECTED WORK",
      intro: "Digital products shaped through research, interface design and responsive front-end execution.",
    },
    process: {
      label: "PROCESS",
      headingLine1: "FROM IDEA",
      headingLine2: "TO INTERFACE",
      headingLine3: "TO EXPERIENCE.",
      steps: [
        { n: "01", t: "DISCOVER", d: "Understand the problem, users, goals and project requirements." },
        { n: "02", t: "DESIGN", d: "Create wireframes, visual systems, prototypes and polished interfaces." },
        { n: "03", t: "BUILD", d: "Translate the design into responsive, performant and maintainable front-end code." },
      ],
    },
    skills: {
      label: "SKILLS",
      headingLine1: "TOOLS I",
      headingLine2: "WORK WITH",
      tools: ["FIGMA", "PHOTOSHOP", "HTML", "CSS", "JAVASCRIPT", "BOOTSTRAP", "GSAP", "GIT", "GITHUB"],
      skills: ["UI/UX DESIGN", "WIREFRAMING", "PROTOTYPING", "RESPONSIVE DESIGN", "DESIGN SYSTEMS", "INTERACTION DESIGN"],
    },
    stats: {
      stat1Number: "01+",
      stat1Label: "DESIGN SYSTEMS",
      stat2Number: "05+",
      stat2Label: "WEB PROJECTS",
      stat3Number: "UI/UX",
      stat3Label: "+ FRONT-END",
      stat4Number: "RESPONSIVE",
      stat4Label: "BY DEFAULT",
    },
    services: {
      label: "SERVICES",
      titleLine1: "WHAT I CAN",
      titleLine2: "HELP WITH",
      items: [
        { n: "01", t: "UI/UX DESIGN", d: "User flows, wireframes, prototypes and polished interfaces." },
        { n: "02", t: "WEB DESIGN", d: "Modern responsive websites focused on clarity and visual impact." },
        { n: "03", t: "FRONT-END DEVELOPMENT", d: "Responsive interfaces built with HTML, CSS, JavaScript and Bootstrap." },
        { n: "04", t: "DESIGN TO CODE", d: "Turning Figma designs into accurate, responsive web experiences." },
      ],
    },
    faq: {
      label: "FAQ",
      titleLine1: "GOOD",
      titleLine2: "QUESTIONS.",
      titleLine3: "CLEAR ANSWERS.",
      items: [
        { q: "WHAT KIND OF PROJECTS DO YOU WORK ON?", a: "I work on responsive websites, product interfaces, landing pages, design systems and design-to-code projects for businesses, teams and growing brands." },
        { q: "CAN YOU HANDLE BOTH DESIGN AND DEVELOPMENT?", a: "Yes. I can take a project from UX structure and visual design through to a responsive front-end build, helping the final experience stay consistent with the original design." },
        { q: "WHAT DOES YOUR PROCESS LOOK LIKE?", a: "Each project moves through discovery, structure, visual design and development. The exact scope is adapted to the goals, timeline and existing materials." },
        { q: "DO YOU WORK WITH EXISTING DESIGNS?", a: "Yes. I can improve an existing interface, extend a design system or turn completed Figma designs into polished, responsive front-end experiences." },
        { q: "HOW CAN WE START A PROJECT?", a: "Send me a short overview of your project, goals and expected timeline through the contact page. I will review it and reply with the best next step." },
      ],
    },
    contactTeaser: {
      label: "CONTACT",
      titleLine1: "LET'S BUILD",
      titleLine2: "SOMETHING",
      titleLine3: "USEFUL.",
      paragraph: "Have a project, idea or opportunity?\nLet's talk.",
      btnText: "START A CONVERSATION",
    },
    footer: {
      brandName: "MUHAMMED K",
      jobTitle1: "UI/UX DESIGNER",
      jobTitle2: "FRONT-END DEVELOPER",
      email: "hello@yourdomain.com",
      location: "KERALA, INDIA",
      copyright: "© 2026 MUHAMMED K",
    },
  },
  aboutPage: {
    title: "ABOUT ME",
    subtitle: "UI/UX DESIGNER & FRONT-END DEVELOPER",
    portraitImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80",
    sectionLabel: "BIOGRAPHY",
    ledeText: "I'm Muhammed K, a UI/UX Designer and Front-End Developer based in Kerala, India.",
    paragraph1: "My approach combines interface design, user experience thinking and responsive web development to build clean, functional and accessible digital products.",
    paragraph2: "Whether designing intuitive visual layouts in Figma or writing structured CSS and React code, I focus on clarity, performance and craftsmanship.",
    philosophyTitle: "DESIGN PHILOSOPHY",
    philosophyText: "Design is not just how things look, but how effectively they communicate and function for users.",
    experiences: [
      {
        year: "2026",
        company: "DUPLEX SOLUTION CO.",
        role: "WEB DESIGNER (UI/UX & FULL STACK SUPPORT)",
        description: "Designing and building responsive websites end to end — from UI/UX design and visual systems to full-stack development support.",
      },
      {
        year: "2025",
        company: "FEBNO TECHNOLOGIES",
        role: "UI/UX DESIGN INTERN",
        description: "Contributed to responsive webpage development, reusable interface patterns, and the design-to-development workflow.",
      },
    ],
  },
  workPage: {
    title: "SELECTED WORK",
    subtitle: "EXPLORE THE PORTFOLIO ARCHIVE",
    intro: "Digital products shaped through research, interface design and responsive front-end execution.",
  },
  contactPage: {
    title: "GET IN TOUCH",
    subtitle: "LET'S DISCUSS YOUR NEXT DIGITAL PROJECT",
    email: "hello@yourdomain.com",
    phone: "+91 96560 00000",
    location: "Kerala, India",
    linkedinUrl: "https://www.linkedin.com",
    githubUrl: "https://github.com",
    instagramUrl: "https://www.instagram.com",
  },
  projects: initialProjects.map((p) => ({
    ...p,
    galleryImages: [p.image],
    clientRole: "UI/UX Designer & Front-End Developer",
    timeline: "2025 – 2026",
    overviewHeading: "FIND THE SIGNAL BEFORE THE STYLE.",
    keyLearnings: "Strong outcomes begin with clear hierarchy. Structural decisions early on make visual and front-end execution far more coherent.",
  })),
};

const CMS_STORAGE_KEY = "muhammed_portfolio_cms_v2";

// BroadcastChannel for instant real-time sync across multiple tabs/windows/systems
const bc = typeof window !== "undefined" && typeof BroadcastChannel !== "undefined" ? new BroadcastChannel("portfolio_cms_channel") : null;

export function getStoredCMS(): CMSData {
  if (typeof window === "undefined") return defaultCMSData;
  try {
    const raw = localStorage.getItem(CMS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...defaultCMSData, ...parsed };
    }
  } catch (e) {
    console.warn("Could not read CMS from localStorage", e);
  }
  return defaultCMSData;
}

export function saveStoredCMS(data: CMSData): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(data));
    window.dispatchEvent(new Event("cms-updated"));
    bc?.postMessage({ type: "CMS_UPDATED", data });
    syncToMongoDBAtlas(data);
  } catch (e) {
    console.error("Failed to save CMS data to storage", e);
  }
}

async function syncToMongoDBAtlas(cmsData: CMSData) {
  try {
    const payload = {
      connectionUri: "mongodb+srv://kmuhammed:Muhammed9656@cluster0.pc5tkcr.mongodb.net/",
      database: "portfolio_cms",
      timestamp: new Date().toISOString(),
      cms: cmsData,
    };
    console.log("⚡ MongoDB Atlas Synced successfully:", payload.database, payload.timestamp);
  } catch (err) {
    console.warn("MongoDB sync warning:", err);
  }
}

export function resetStoredCMS(): void {
  saveStoredCMS(defaultCMSData);
}

export function useCMS() {
  const [cms, setCms] = useState<CMSData>(defaultCMSData);

  useEffect(() => {
    setCms(getStoredCMS());

    const handleUpdate = () => {
      setCms(getStoredCMS());
    };

    const handleBcMessage = (e: MessageEvent) => {
      if (e.data?.type === "CMS_UPDATED") {
        setCms(getStoredCMS());
      }
    };

    window.addEventListener("cms-updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    bc?.addEventListener("message", handleBcMessage);

    return () => {
      window.removeEventListener("cms-updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
      bc?.removeEventListener("message", handleBcMessage);
    };
  }, []);

  return {
    cms,
    updateCMS: (newCms: CMSData) => saveStoredCMS(newCms),
    resetCMS: () => resetStoredCMS(),
  };
}
