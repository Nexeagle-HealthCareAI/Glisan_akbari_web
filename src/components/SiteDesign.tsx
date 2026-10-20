import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  ArrowUpRight,
  ArrowRight,
  Phone,
  MapPin,
  Menu,
  X,
  Play,
  Pause,
  ChevronDown,
  CalendarDays,
  FileText,
  Stethoscope,
  Heart,
  Navigation,
} from "lucide-react";
import { HOSPITAL_PROFILE, BOOKING_URL } from "../data/config";
import { HOSPITAL_NAME } from "../data/identity";
import { MimoGuide } from "./MimoGuide";
import type { MimoAction } from "./MimoMotion";

const MotionContext = createContext({ paused: false, toggle: () => {} });
export const useSiteMotion = () => useContext(MotionContext);
export function SiteMotionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    try {
      setPaused(localStorage.getItem("hospital-motion") === "paused");
    } catch {}
  }, []);
  function toggle() {
    setPaused((p) => {
      try {
        localStorage.setItem("hospital-motion", p ? "playing" : "paused");
      } catch {}
      return !p;
    });
  }
  return (
    <MotionContext.Provider value={{ paused, toggle }}>
      <div
        className="mm-home site-app"
        data-motion={paused ? "paused" : "playing"}
      >
        {children}
      </div>
    </MotionContext.Provider>
  );
}
export const hospitalPhone = "tel:" + HOSPITAL_PROFILE.phone.replace(/\s/g, "");
export const hospitalMap =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent(HOSPITAL_PROFILE.address.fullFormatted);
export const siteLinks = [
  ["/", "Home"],
  ["/doctors", "Our doctors"],
  ["/services", "Explore care"],
  ["/conditions", "Conditions"],
  ["/treatments", "Treatments"],
  ["/hospital", "Our hospital"],
  ["/reviews", "Patient feedback"],
  ["/faqs", "FAQs"],
  ["/contact", "Contact"],
];
export function Brand() {
  return (
    <Link to="/" className="mm-brand" aria-label={HOSPITAL_NAME + " home"}>
      <span className="site-logo">
        <img src="/media/hospital-logo.png" alt="" width="1280" height="1280" />
      </span>
      <span>
        Glisan Akbari<small>SUPER SPECIALITY HOSPITAL</small>
      </span>
    </Link>
  );
}
export function Header() {
  const [menu, setMenu] = useState(false);
  const header = useRef<HTMLElement>(null);
  const { pathname } = useLocation();
  const { paused, toggle } = useSiteMotion();
  useEffect(() => {
    setMenu(false);
  }, [pathname]);
  useEffect(() => {
    if (!menu) return;
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenu(false);
        document.getElementById("site-menu-button")?.focus();
      }
    };
    const closeOutside = (event: PointerEvent) => {
      if (!header.current?.contains(event.target as Node)) setMenu(false);
    };
    document.addEventListener("keydown", close);
    document.addEventListener("pointerdown", closeOutside);
    return () => {
      document.removeEventListener("keydown", close);
      document.removeEventListener("pointerdown", closeOutside);
    };
  }, [menu]);
  return (
    <>
      <a href="#main-content" className="mm-skip">
        Skip to content
      </a>
      <div className="mm-topline">
        <span>
          <MapPin size={12} /> Purnia, Bihar
        </span>
        <span>Your health. Easier to understand.</span>
        <a href={hospitalPhone}>
          <Phone size={12} /> {HOSPITAL_PROFILE.phone}
        </a>
      </div>
      <header ref={header} className="mm-header mm-wrap site-header" onBlur={(event) => {
        if (event.relatedTarget && !event.currentTarget.contains(event.relatedTarget as Node)) setMenu(false);
      }}>
        <Brand />
        <nav className="site-nav" aria-label="Main navigation">
          <NavLink to="/services">Explore care</NavLink>
          <NavLink to="/doctors">Our doctors</NavLink>
          <NavLink to="/hospital">Our hospital</NavLink>
          <NavLink to="/contact">Visit us</NavLink>
        </nav>
        <div className="mm-header-actions">
          <button
            className="mm-motion-toggle"
            onClick={toggle}
            aria-pressed={paused}
            aria-label={paused ? "Resume animations" : "Pause animations"}
          >
            {paused ? <Play size={15} /> : <Pause size={15} />}
            <span>{paused ? "Motion off" : "Motion on"}</span>
          </button>
          <Link to="/book-appointment" className="mm-button mm-header-book">
            Book appointment <ArrowUpRight size={17} />
          </Link>
          <button
            id="site-menu-button"
            className="site-menu-button"
            onClick={() => setMenu(!menu)}
            aria-label={menu ? "Close all pages menu" : "Open all pages menu"}
            aria-expanded={menu}
            aria-controls="site-menu"
          >
            {menu ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
        {menu && (
          <nav id="site-menu" className="site-menu" aria-label="All pages">
            <p className="mm-kicker">FIND YOUR WAY</p>
            {siteLinks.map(([to, label]) => (
              <NavLink key={to} to={to} end={to === "/"} onClick={() => setMenu(false)}>
                {label}
                <ArrowUpRight size={16} />
              </NavLink>
            ))}
            <Link to="/book-appointment" className="mm-button">
              Book appointment <ArrowUpRight size={17} />
            </Link>
          </nav>
        )}
      </header>
    </>
  );
}
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="mm-wrap">
        <div className="site-footer-grid">
          <div>
            <Brand />
            <p>
              A familiar face.
              <br />A clearer journey to care.
            </p>
            <a className="mm-text-link" href={hospitalPhone}>
              <Phone size={15} />
              {HOSPITAL_PROFILE.phone}
            </a>
          </div>
          <div>
            <h2>Explore</h2>
            {siteLinks.slice(1, 5).map(([to, label]) => (
              <Link key={to} to={to}>
                {label}
              </Link>
            ))}
          </div>
          <div>
            <h2>Plan your visit</h2>
            {siteLinks.slice(5).map(([to, label]) => (
              <Link key={to} to={to}>
                {label}
              </Link>
            ))}
            <Link to="/book-appointment">Book appointment</Link>
          </div>
          <div>
            <h2>Find us in Purnia</h2>
            <address>
              {HOSPITAL_PROFILE.address.line2}
              <br />
              {HOSPITAL_PROFILE.address.area}, {HOSPITAL_PROFILE.address.city}
              <br />
              {HOSPITAL_PROFILE.address.stateAndPin}
            </address>
            <a
              href={hospitalMap}
              target="_blank"
              rel="noreferrer"
              className="mm-text-link"
            >
              Get directions <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
        <div className="site-footer-bottom">
          <span>
            © {new Date().getFullYear()} {HOSPITAL_NAME}
          </span>
          <div>
            <Link to="/privacy-policy">Privacy</Link>
            <Link to="/terms">Terms</Link>
            <a href="#main-content">Back to top ↑</a>
          </div>
        </div>
        <p className="site-disclaimer">
          Mimo is an illustrated digital guide. Information here is
          educational; your qualified doctor provides medical advice.
        </p>
      </div>
    </footer>
  );
}
export function MobileActions() {
  return (
    <div className="mm-mobile-actions">
      <a href={hospitalPhone}>
        <Phone size={17} />
        Call hospital
      </a>
      <Link className="site-mobile-book" to="/book-appointment">
        Book appointment <ArrowUpRight size={17} />
      </Link>
    </div>
  );
}
export function GuideScene({
  action = "care",
  message,
  cue = 0,
  label = "MIMO, YOUR DIGITAL GUIDE",
}: {
  action?: MimoAction;
  message: string;
  cue?: number;
  label?: string;
}) {
  const { paused } = useSiteMotion();
  const Icon =
    action === "booking"
      ? CalendarDays
      : action === "visit"
        ? Navigation
        : action === "doctor"
          ? Stethoscope
          : action === "faq"
            ? FileText
            : Heart;
  return (
    <div className={"site-guide mm-scene site-guide-" + action}>
      <span className="site-guide-orbit" />
      <span className="site-guide-orbit site-guide-orbit-two" />
      <div className="mm-speech">
        <span>{label}</span>
        <p>{message}</p>
      </div>
      <MimoGuide paused={paused} action={action} cue={cue} />
      <div className="site-guide-symbol">
        <Icon size={40} strokeWidth={1.2} />
      </div>
      <span className="site-guide-caption">
        A little guidance. One step at a time.
      </span>
    </div>
  );
}
export function PageHero({
  label,
  title,
  accent,
  description,
  action = "care",
  message,
  children,
}: {
  label: string;
  title: string;
  accent: string;
  description: string;
  action?: MimoAction;
  message: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="site-hero mm-wrap">
      <div>
        <nav className="site-breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <span>{label}</span>
        </nav>
        <p className="mm-kicker">
          <span /> {label.toUpperCase()}
        </p>
        <h1>
          {title}
          <br />
          <em>{accent}</em>
        </h1>
        <p className="site-lead">{description}</p>
        {children && <div className="site-hero-actions">{children}</div>}
      </div>
      <GuideScene action={action} message={message} />
    </section>
  );
}
export function SectionHeading({
  number,
  title,
  note,
}: {
  number: string;
  title: string;
  note?: string;
}) {
  return (
    <div className="site-section-heading">
      <div>
        <p className="mm-kicker">{number} / A LITTLE MORE CLARITY</p>
        <h2>{title}</h2>
      </div>
      {note && <p>{note}</p>}
    </div>
  );
}
export function BookLink({
  label = "Book appointment",
  href = BOOKING_URL,
}: {
  label?: string;
  href?: string;
}) {
  return (
    <a className="mm-button" href={href}>
      {label}
      <ArrowUpRight size={17} />
    </a>
  );
}
export function VisitCTA() {
  return (
    <section className="site-cta mm-wrap">
      <div>
        <p className="mm-kicker">LET’S TAKE THE NEXT STEP</p>
        <h2>
          A conversation
          <br />
          can bring clarity.
        </h2>
        <p>Book a consultation or call our team to plan your visit.</p>
      </div>
      <div>
        <Link to="/book-appointment" className="mm-button">
          Plan your appointment <ArrowUpRight size={18} />
        </Link>
        <a href={hospitalPhone} className="mm-text-link">
          <Phone size={16} />
          {HOSPITAL_PROFILE.phone}
        </a>
      </div>
    </section>
  );
}
export function Accordion({
  items,
  prefix = "question",
}: {
  items: { question: string; answer: React.ReactNode }[];
  prefix?: string;
}) {
  return (
    <div className="site-accordion">
      {items.map((item, i) => (
        <details key={item.question} name={prefix}>
          <summary>
            {item.question}
            <ChevronDown size={19} />
          </summary>
          <div>{item.answer}</div>
        </details>
      ))}
    </div>
  );
}
export function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="site-bullets">
      {items.map((item) => (
        <li key={item}>
          <ArrowRight size={15} />
          {item}
        </li>
      ))}
    </ul>
  );
}
