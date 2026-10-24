import React, { useRef, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import {
  ArrowUpRight,
  Activity,
  Stethoscope,
  ArrowRight,
} from "lucide-react";
import { UROLOGY_SERVICES, DR_NOORI_BOOKING_URL } from "../data/config";
import { ServiceVideo } from "../components/ServiceVideo";
import { getCareDepartment, getCareDoctor, type CareDepartment } from "../data/careDepartments";
import {
  PageHero,
  SectionHeading,
  VisitCTA,
  Accordion,
  BulletList,
  BookLink,
} from "../components/SiteDesign";

type Props = { onOpenBooking?: () => void };
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
          Explore care <ArrowRight size={16} />
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
  const { search } = useLocation();
  const department = getCareDepartment(search);
  return (
    <>
      <PageHero
        label="Departments"
        title="Questions about"
        accent="what you’re feeling?"
        description="Find a starting point for a conversation with your doctor. Browse the care topics below and the concerns to discuss."
        action="faq"
        message="You don’t need to have all the answers."
      />
      <DepartmentCare key={department.id} department={department} />
      <VisitCTA />
    </>
  );
}

function DepartmentCare({ department }: { department: CareDepartment }) {
  const [open, setOpen] = useState(0);
  const detail = useRef<HTMLElement>(null);
  const layout = useRef<HTMLDivElement>(null);
  const service = department.services[open];
  const doctor = getCareDoctor(department);
  return (
      <section id="care-topics" className="site-section mm-wrap site-care-section">
        <SectionHeading
          number="01"
          title="Start with your concern."
          note={department.label + ' · A guide to your consultation.'}
        />
        <div ref={layout} className="site-condition-layout">
          <div className="site-care-browser">
            {department.proposed && <p className="site-department-notice" id="department-availability">
              Topics to discuss. Please confirm consultation and treatment availability with the hospital before planning your visit.
            </p>}
            <p id="care-switcher-hint" className="site-care-switcher-hint">
              <span>Choose a service · {open + 1} of {department.services.length}</span>
              <span>Swipe to browse →</span>
            </p>
            <div
              key={department.id}
              className="site-condition-tabs site-care-transition"
              role="group"
              aria-label={department.label + ' care topics'}
              aria-describedby={'care-switcher-hint' + (department.proposed ? ' department-availability' : '')}
            >
              {department.services.map((s, i) => (
                <button
                  type="button"
                  key={s.id}
                  aria-pressed={i === open}
                  className={i === open ? "is-active" : ""}
                  aria-controls="selected-care-topic"
                  onClick={() => {
                    setOpen(i);
                    if (window.matchMedia('(max-width: 760px)').matches) {
                      // Wait for the new title and player to render before measuring.
                      requestAnimationFrame(() => {
                        const content = detail.current?.querySelector('video') || detail.current?.querySelector('[aria-live]');
                        const bounds = content?.getBoundingClientRect();
                        const stage = layout.current?.getBoundingClientRect();
                        const actionsHeight = document.querySelector('.mm-mobile-actions')?.getBoundingClientRect().height || 0;
                        const availableHeight = window.innerHeight - actionsHeight;
                        if (!bounds || !stage) return;
                        if (bounds.top < 12 || bounds.bottom > availableHeight - 12) {
                          // Keep the selector nearby, while clearing the fixed booking bar.
                          const offset = Math.max(stage.top - 12, bounds.bottom - availableHeight + 12);
                          window.scrollTo({
                            top: Math.max(0, window.scrollY + offset),
                            behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
                          });
                        }
                      });
                    }
                  }}
                >
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  {s.title}
                  <ArrowUpRight size={17} />
                </button>
              ))}
            </div>
          </div>
          <article ref={detail} id="selected-care-topic" className="site-condition-detail" aria-labelledby="selected-care-title">
            {!service.explainerVideo && <span className="site-icon">
              <Activity size={32} />
            </span>}
            <div aria-live="polite" aria-atomic="true">
              <div key={service.id} className="site-care-transition">
                <p className="mm-kicker">LET’S TALK ABOUT IT</p>
                <h2 id="selected-care-title">{service.title}</h2>
                <p className="site-condition-summary">{service.explainerVideo?.description || service.description}</p>
              </div>
            </div>
            {service.explainerVideo ? (
              <ServiceVideo key={service.id} {...service.explainerVideo} title={service.title} />
            ) : <>
              <p className="site-care-video-placeholder">A video guide for this topic is not available yet.</p>
              {service.symptoms && <>
                <h3>Concerns to mention</h3>
                <BulletList items={service.symptoms} />
              </>}
            </>}
            {department.proposed && <p className="site-department-notice">
              Educational topic only. Specific consultations, procedures and facilities have not been confirmed for this topic.
            </p>}
            <p className="site-caption">
              These topics help you prepare questions; they cannot identify the
              cause of your symptoms.
            </p>
            <div className="site-care-panel-actions">
              {service.slug && <Link className="mm-button" to={"/services/" + service.slug}>
                Understand this care <ArrowUpRight size={17} />
              </Link>}
              <div className="site-care-booking">
                <p>{doctor ? doctor.name + ' · ' + doctor.specialty : 'Need help choosing a doctor?'}</p>
                {doctor ? <BookLink href={doctor.bookingUrl} label="Book appointment" /> :
                  <Link className="mm-button" to="/doctors">Book appointment <ArrowUpRight size={17} /></Link>}
              </div>
            </div>
          </article>
        </div>
      </section>
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
