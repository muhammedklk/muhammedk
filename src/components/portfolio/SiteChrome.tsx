import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent, type ReactNode } from "react";
import { ArrowUpRight, X, Linkedin, Github, Instagram, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const nav = [{to:"/",label:"HOME"},{to:"/about",label:"ABOUT"},{to:"/work",label:"WORK"},{to:"/contact",label:"CONTACT"}] as const;

export function Header(){
 const pathname=useRouterState({select:s=>s.location.pathname});
 const [open,setOpen]=useState(false); const [scrolled,setScrolled]=useState(false);
 useEffect(()=>{setOpen(false);setScrolled(false);window.scrollTo(0,0)},[pathname]);
 useEffect(()=>{const onScroll=()=>setScrolled(window.scrollY>24); onScroll(); addEventListener("scroll",onScroll,{passive:true}); return()=>removeEventListener("scroll",onScroll)},[pathname]);
 useEffect(()=>{if(!open)return; const close=(e:KeyboardEvent)=>{if(e.key==="Escape")setOpen(false)}; document.body.classList.add("menu-open"); addEventListener("keydown",close); return()=>{document.body.classList.remove("menu-open");removeEventListener("keydown",close)}},[open]);
 return <><header className={`site-header ${scrolled?"is-scrolled":""}`}><Link to="/" className="wordmark" aria-label="Muhammed K home">MUHAMMED K</Link><div className="header-status"><span className="status-dot"/>AVAILABLE FOR WORK</div><Button variant="menu" size="menu" onClick={()=>setOpen(v=>!v)} aria-expanded={open} aria-controls="site-menu">{open?<><X/> CLOSE</>:<>+ MENU</>}</Button></header><div id="site-menu" className={`menu-overlay ${open?"is-open":""}`} aria-hidden={!open}><nav aria-label="Main navigation">{nav.map((item,i)=><Link key={item.to} to={item.to} onClick={()=>setOpen(false)} tabIndex={open?0:-1} className="menu-link"><span>0{i+1}</span><em>{item.label}</em></Link>)}</nav><aside><p className="eyebrow">SOCIALS</p><a className="social-link" href="https://www.linkedin.com" target="_blank" rel="noreferrer"><Linkedin/>LinkedIn</a><a className="social-link" href="https://github.com" target="_blank" rel="noreferrer"><Github/>GitHub</a><a className="social-link" href="https://www.instagram.com" target="_blank" rel="noreferrer"><Instagram/>Instagram</a><a className="social-link menu-resume" href="/muhammed-k-resume.pdf" download="Muhammed-K-Resume.pdf"><Download/>RESUME / CV</a><p className="eyebrow menu-email-label">EMAIL</p><a href="mailto:hello@yourdomain.com">hello@yourdomain.com</a><p className="menu-note">Have a project in mind?<br/>Let’s make it useful.</p></aside></div></>
}

export function CustomCursor(){
 const dot=useRef<HTMLDivElement>(null); const label=useRef<HTMLSpanElement>(null);
 useEffect(()=>{if(!matchMedia("(pointer:fine)").matches)return; let x=-40,y=-40,tx=x,ty=y,raf=0; const move=(e:MouseEvent)=>{tx=e.clientX;ty=e.clientY}; const tick=()=>{x+=(tx-x)*.18;y+=(ty-y)*.18;if(dot.current)dot.current.style.transform=`translate3d(${x}px,${y}px,0)`;raf=requestAnimationFrame(tick)}; const over=(e:MouseEvent)=>{const target=e.target as HTMLElement; const mode:string=target.closest("[data-cursor]")?.getAttribute("data-cursor")||(target.closest("a,button")?"link":""); dot.current?.setAttribute("data-mode",mode);if(label.current)label.current.textContent=mode==="view"?"VIEW":""}; addEventListener("mousemove",move);document.addEventListener("mouseover",over);tick();return()=>{removeEventListener("mousemove",move);document.removeEventListener("mouseover",over);cancelAnimationFrame(raf)}},[]);
 return <div ref={dot} className="custom-cursor" aria-hidden="true"><span ref={label}/></div>
}

export function Magnetic({children,className=""}:{children:ReactNode;className?:string}){
 const ref=useRef<HTMLDivElement>(null); const move=(e:ReactMouseEvent)=>{const el=ref.current;if(!el)return;const r=el.getBoundingClientRect();el.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.12}px,${(e.clientY-r.top-r.height/2)*.12}px)`};
 return <div ref={ref} className={`magnetic ${className}`} onMouseMove={move} onMouseLeave={()=>{if(ref.current)ref.current.style.transform=""}}>{children}</div>
}

export function Footer(){return <footer className="site-footer"><div className="footer-top"><p>MUHAMMED K</p><p>UI/UX DESIGNER<br/>FRONT-END DEVELOPER</p><div className="footer-links"><nav>{nav.map(n=><Link key={n.to} to={n.to}>{n.label}</Link>)}</nav><div className="footer-social"><a href="https://www.linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin/></a><a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub"><Github/></a><a href="https://www.instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram/></a><a href="/muhammed-k-resume.pdf" download="Muhammed-K-Resume.pdf" aria-label="Download resume"><Download/></a></div></div></div><div className="footer-big" aria-hidden="true">MK</div><div className="footer-bottom"><span>© 2026 MUHAMMED K</span><span>KERALA, INDIA</span><a href="#top">BACK TO TOP ↑</a></div></footer>}

export function SiteLayout({children}:{children:ReactNode}){const pathname=useRouterState({select:s=>s.location.pathname}); const isAdmin=pathname.startsWith("/admin"); return <>{!isAdmin && <Header/>}<CustomCursor/><main key={pathname} id="top" className={isAdmin ? "" : "page-enter"}>{children}</main>{!isAdmin && <Footer/></>}