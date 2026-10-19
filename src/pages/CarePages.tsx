import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowUpRight,
  Search,
  Droplets,
  Heart,
  Activity,
  ShieldCheck,
  Stethoscope,
  ArrowRight,
  FileText,
} from "lucide-react";
import { UROLOGY_SERVICES, DR_NOORI_BOOKING_URL } from "../data/config";
import {
  PageHero,
  SectionHeading,
  VisitCTA,
  Accordion,
  BulletList,
  BookLink,
} from "../components/SiteDesign";

type Props = { onOpenBooking?: () => void };
const icons = [Droplets, ShieldCheck, Activity, Heart, Stethoscope];
export function ServicesPage(_: Props) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All care");
  const categories = [
    "All care",
    ...new Set(UROLOGY_SERVICES.map((s) => s.category)),
  ];
  const services = UROLOGY_SERVICES.filter(
    (s) =>
      (category === "All care" || s.category === category) &&
      (s.title + " " + s.description)
        .toLowerCase()
        .includes(search.toLowerCase()),
  );
  return (
    <>
      <PageHero
        label="Explore care"
        title="A little clarity."
        accent="The right next step."
        description="Explore urology care, understand your options, and bring your questions to your consultation."
        message="Let’s find the care you’re looking for."
      />
      <section className="site-section mm-wrap">
        <SectionHeading
          number="01"
          title="Care, made easier to explore."
          note="Choose a topic to understand more."
        />
        <div className="site-filters">
          <label className="site-search">
            <Search size={19} />
            <span className="sr-only">Search services</span>
            <input
              type="search"
              placeholder="Search kidney, prostate, bladder…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>
          <div className="site-chips" role="group" aria-label="Filter services">
            {categories.map((c) => (
              <button
                key={c}
                aria-pressed={c === category}
                className={c === category ? "is-active" : ""}
                onClick={() => setCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
        <p className="site-result-count" aria-live="polite">
          {services.length} care {services.length === 1 ? "topic" : "topics"}
        </p>
        <div className="site-card-grid">
          {services.map((s, i) => {
            const Icon = icons[i % icons.length];
            return (
              <Link
                to={"/services/" + s.slug}
                className="site-care-card"
                key={s.id}
              >
                <div className="site-card-top">
                  <span className="site-icon">
                    <Icon size={26} strokeWidth={1.4} />
                  </span>
                  <span className="site-small-label">{s.category}</span>
                </div>
                <h2>{s.title}</h2>
                <p>{s.description}</p>
                <span className="site-card-link">
                  Let’s understand <ArrowUpRight size={18} />
                </span>
              </Link>
            );
          })}
        </div>
        {!services.length && (
          <div className="site-empty">
            <Search size={30} />
            <h2>No matching care topics.</h2>
            <p>Try another word or browse all services.</p>
            <button
              className="mm-text-link"
              onClick={() => {
                setSearch("");
                setCategory("All care");
              }}
            >
              Show all care <ArrowRight size={17} />
            </button>
          </div>
        )}
      </section>
      <VisitCTA />
    </>
  );
}
export function ServiceDetailPage(_: Props) {
  const { slug } = useParams();
  const service = UROLOGY_SERVICES.find((s) => s.slug === slug);
  if (!service) return <NotFoundPage />;
  return (
    <>
      <PageHero
        label="Urology care"
        title={service.title}
        accent="Let’s understand it."
        description={service.tagline || service.description}
        message="Your questions belong in the conversation."
      >
        <BookLink href={DR_NOORI_BOOKING_URL} label="Consult Dr. Noori" />
        <Link className="mm-text-link" to="/services">
          All services <ArrowRight size={16} />
        </Link>
      </PageHero>
      <div className="site-detail-layout mm-wrap">
        <article className="site-reading">
          <section id="overview">
            <p className="mm-kicker">01 / UNDERSTANDING YOUR CARE</p>
            <h2>A clearer picture.</h2>
            {service.overview.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <div className="site-note">
              <Stethoscope size={22} />
              <p>{service.patientNotes}</p>
            </div>
          </section>
          <section id="symptoms">
            <h2>What to discuss with your doctor.</h2>
            <BulletList items={service.symptoms} />
          </section>
          <section id="options">
            <h2>Care options explained.</h2>
            <p>Your doctor will discuss which options fit your assessment.</p>
            <div className="site-procedures">
              {service.procedures.map((p) => (
                <div key={p.name}>
                  <h3>{p.name}</h3>
                  <p>{p.description}</p>
                </div>
              ))}
            </div>
          </section>
          <section id="prepare">
            <h2>Before your consultation.</h2>
            <BulletList items={service.preparation} />
          </section>
          <section id="questions">
            <h2>A few common questions.</h2>
            <Accordion items={service.faqs} prefix={"service-" + slug} />
          </section>
        </article>
        <aside className="site-detail-aside">
          <p className="mm-kicker">ON THIS PAGE</p>
          {[
            ["overview", "A clearer picture"],
            ["symptoms", "What to discuss"],
            ["options", "Care options"],
            ["prepare", "Before your visit"],
            ["questions", "Common questions"],
          ].map(([id, text]) => (
            <a key={id} href={"#" + id}>
              {text}
              <ArrowRight size={15} />
            </a>
          ))}
          <div className="site-aside-book">
            <Stethoscope size={26} />
            <h3>A real conversation.</h3>
            <p>Discuss your concerns with Dr. Md Taquedis Noori.</p>
            <BookLink href={DR_NOORI_BOOKING_URL} label="Book a consultation" />
          </div>
        </aside>
      </div>
      <section className="site-section mm-wrap">
        <SectionHeading number="02" title="Explore a little further." />
        <div className="site-card-grid">
          {UROLOGY_SERVICES.filter((s) => s.id !== service.id)
            .slice(0, 3)
            .map((s) => (
              <Link
                className="site-care-card"
                to={"/services/" + s.slug}
                key={s.id}
              >
                <span className="site-small-label">{s.category}</span>
                <h2>{s.title}</h2>
                <p>{s.description}</p>
                <span className="site-card-link">
                  Explore care <ArrowUpRight size={17} />
                </span>
              </Link>
            ))}
        </div>
      </section>
      <VisitCTA />
    </>
  );
}
export function ConditionsPage(_: Props) {
  const [open, setOpen] = useState(0);
  return (
    <>
      <PageHero
        label="Conditions"
        title="Questions about"
        accent="what you’re feeling?"
        description="Find a starting point for a conversation with your urologist. Browse the care topics below and the concerns to discuss."
        action="faq"
        message="You don’t need to have all the answers."
      />
      <section className="site-section mm-wrap">
        <SectionHeading
          number="01"
          title="Start with your concern."
          note="A guide to your consultation."
        />
        <div className="site-condition-layout">
          <div
            className="site-condition-tabs"
            role="group"
            aria-label="Choose a care topic"
          >
            {UROLOGY_SERVICES.map((s, i) => (
              <button
                key={s.id}
                aria-pressed={i === open}
                className={i === open ? "is-active" : ""}
                onClick={() => setOpen(i)}
              >
                <span>{String(i + 1).padStart(2, "0")}</span>
                {s.title}
                <ArrowUpRight size={17} />
              </button>
            ))}
          </div>
          <article className="site-condition-detail" aria-live="polite">
            <span className="site-icon">
              <Activity size={32} />
            </span>
            <p className="mm-kicker">LET’S TALK ABOUT IT</p>
            <h2>{UROLOGY_SERVICES[open].title}</h2>
            <p>{UROLOGY_SERVICES[open].description}</p>
            <h3>Concerns to mention</h3>
            <BulletList items={UROLOGY_SERVICES[open].symptoms} />
            <Link
              className="mm-button"
              to={"/services/" + UROLOGY_SERVICES[open].slug}
            >
              Understand this care <ArrowUpRight size={17} />
            </Link>
            <p className="site-caption">
              These topics help you prepare questions; they cannot identify the
              cause of your symptoms.
            </p>
          </article>
        </div>
      </section>
      <VisitCTA />
    </>
  );
}
export function TreatmentsPage(_: Props) {
  return (
    <>
      <PageHero
        label="Treatments"
        title="Understand the options."
        accent="Decide with your doctor."
        description="Explore treatment information and what to ask during your consultation. Your care plan depends on your individual assessment."
        action="care"
        message="Let’s make the unfamiliar a little clearer."
      />
      <section className="site-section mm-wrap">
        <div className="site-note">
          <FileText size={25} />
          <p>
            Bring previous reports, prescriptions and your questions. Your
            doctor will explain suitable options after reviewing your condition.
          </p>
        </div>
        <SectionHeading number="01" title="From questions to a care plan." />
        <div className="site-treatment-list">
          {UROLOGY_SERVICES.map((s, i) => (
            <article key={s.id}>
              <div className="site-treatment-heading">
                <span className="site-number">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <span className="site-small-label">{s.category}</span>
                  <h2>{s.title}</h2>
                  <p>{s.description}</p>
                </div>
                <Link
                  className="site-round-link"
                  to={"/services/" + s.slug}
                  aria-label={"Explore " + s.title}
                >
                  <ArrowUpRight size={23} />
                </Link>
              </div>
              <div className="site-treatment-options">
                {s.procedures.map((p) => (
                  <div key={p.name}>
                    <h3>{p.name}</h3>
                    <p>{p.description}</p>
                  </div>
                ))}
              </div>
              <Link
                to={"/services/" + s.slug + "#prepare"}
                className="mm-text-link"
              >
                Explore this treatment <ArrowRight size={16} />
              </Link>
            </article>
          ))}
        </div>
      </section>
      <VisitCTA />
    </>
  );
}
export function NotFoundPage() {
  return (
    <>
      <PageHero
        label="Page not found"
        title="A small detour."
        accent="Let’s find your way."
        description="This page could not be found. Head home or explore our care topics."
        action="visit"
        message="I’ll help you find the next step."
      >
        <Link className="mm-button" to="/">
          Back to home <ArrowUpRight size={17} />
        </Link>
        <Link className="mm-text-link" to="/services">
          Explore care <ArrowRight size={17} />
        </Link>
      </PageHero>
      <VisitCTA />
    </>
  );
}
