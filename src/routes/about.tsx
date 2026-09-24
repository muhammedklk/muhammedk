import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Sparkles, Code2, PenTool, ArrowUpRight, Layers, Smartphone, Clock, Download } from "lucide-react";
import { AboutIntro, ContactTeaser, Experience, Process, SkillsMarquee } from "@/components/portfolio/Sections";
import profilePhoto from "@/assets/muhammed-k-profile.jpg";
export const Route=createFileRoute("/about")({head:()=>({meta:[{title:"About Muhammed K — Designer & Developer"},{name:"description",content:"Meet Muhammed K, a Kerala-based UI/UX Designer and Front-End Developer focused on useful, polished digital products."},{property:"og:title",content:"About Muhammed K"},{property:"og:description",content:"A UI/UX Designer and Front-End Developer designing with purpose and building with detail."},{property:"og:type",content:"website"},{name:"twitter:card",content:"summary_large_image"}],links:[{rel:"canonical",href:"/about"}]}),component:AboutPage});
function AboutPage(){return <div className="inner-page"><section className="page-title editorial-grid"><p>02 / ABOUT</p><h1>DESIGN. <span>BUILD.</span> MAKE IT WORK.</h1><p>Clear thinking, expressive interfaces and carefully built front-end experiences.</p></section>
<section className="about-portrait editorial-grid" aria-label="Profile portrait">
  <div className="portrait-card animate-fade-in">
    <span className="portrait-corner tl" aria-hidden="true"/>
    <span className="portrait-corner br" aria-hidden="true"/>
    <div className="portrait-media">
      <img src={profilePhoto} alt="Muhammed K standing on a green field in Kerala" width={1200} height={1600} loading="lazy"/>
      <span className="portrait-tag"><Sparkles/> DESIGNER · DEVELOPER</span>
    </div>
    <div className="portrait-body">
      <div className="portrait-name">
        <h3>MUHAMMED K</h3>
        <ArrowUpRight/>
      </div>
      <p className="portrait-role">UI/UX Designer & Front-End Developer based in Kerala, India.</p>
      <ul className="portrait-meta">
        <li><PenTool/> UI/UX DESIGN</li>
        <li><Code2/> FRONT-END</li>
        <li><MapPin/> KERALA, INDIA</li>
      </ul>
    </div>
  </div>
  <div className="portrait-side">
    <p className="section-label">[ PROFILE ]</p>
    <h2>HI, I'M MUHAMMED —<br/><span>I SHAPE IDEAS INTO INTERFACES.</span></h2>
    <p className="bio">I'm a UI/UX Designer and Front-End Developer from Kerala, India. I design user-centred interfaces in Figma — from research, wireframes and prototypes to polished visual systems — and build them as responsive, accessible websites with HTML, CSS, JavaScript and modern front-end tools. I care about clarity, consistency and the small details that make products feel effortless.</p>
    <div className="facts">
      <div><Layers/><p><b>FOCUS</b><span>UI/UX design & design systems</span></p></div>
      <div><Code2/><p><b>BUILD</b><span>HTML, CSS, JavaScript, React, GSAP</span></p></div>
      <div><Smartphone/><p><b>SPECIALITY</b><span>Responsive, mobile-first web</span></p></div>
      <div><Clock/><p><b>AVAILABILITY</b><span>Open to freelance & full-time roles</span></p></div>
    </div>
    <div className="about-cta"><a className="cv-download" href="/muhammed-k-resume.pdf" download="Muhammed-K-Resume.pdf"><Download/> DOWNLOAD CV / RESUME <span>PDF</span></a></div><div className="focus-tags">{["USER RESEARCH","WIREFRAMING","PROTOTYPING","VISUAL DESIGN","INTERACTION","ACCESSIBILITY"].map(t=><span key={t}>{t}</span>)}</div>
  </div>
</section>
<AboutIntro full/><SkillsMarquee/><Experience/><Process/><ContactTeaser/></div>}
