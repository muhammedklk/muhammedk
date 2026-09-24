import { createFileRoute } from "@tanstack/react-router";
import { AboutIntro, ContactTeaser, Experience, FAQ, Hero, Process, SelectedWork, Services, SkillsMarquee, Stats } from "@/components/portfolio/Sections";

export const Route = createFileRoute("/")({
  head:()=>({meta:[{title:"Muhammed K — UI/UX Designer & Front-End Developer"},{name:"description",content:"Muhammed K is a UI/UX Designer and Front-End Developer creating thoughtful digital experiences, responsive websites and modern user interfaces."},{property:"og:title",content:"Muhammed K — UI/UX Designer & Front-End Developer"},{property:"og:description",content:"Thoughtful digital experiences, responsive websites and modern user interfaces."},{property:"og:type",content:"website"},{name:"twitter:card",content:"summary_large_image"}],links:[{rel:"canonical",href:"/"}]}),
  component: Home,
});
function Home(){return <><Hero/><AboutIntro/><SelectedWork limit={3}/><Process/><SkillsMarquee/><Experience/><Stats/><Services/><FAQ/><ContactTeaser/></>}