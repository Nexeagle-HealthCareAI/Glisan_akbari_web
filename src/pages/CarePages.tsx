import React, { useRef, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import {
  ArrowUpRight,
  Stethoscope,
  ArrowRight,
  Phone,
} from "lucide-react";
import { UROLOGY_SERVICES, DR_NOORI_BOOKING_URL, DOCTOR_PROFILE, HOSPITAL_PROFILE } from "../data/config";
import { SERVICE_MARKETING } from "../data/serviceMarketing";
import { ServiceExplainer } from "../components/ServiceExplainer";
import { getCareDepartment, getCareDoctor, type CareDepartment } from "../data/careDepartments";
import {
  PageHero,
  SectionHeading,
  VisitCTA,
  Accordion,
  BulletList,
  BookLink,
  hospitalPhone,
} from "../components/SiteDesign";

type Props = { onOpenBooking?: () => void };
export function ServiceDetailPage(_: Props) {
  const { slug } = useParams();
  const service = UROLOGY_SERVICES.find((s) => s.slug === slug);
  if (!service) return <NotFoundPage />;
  const marketing = SERVICE_MARKETING[service.id];
  const relatedServices = (marketing?.related || []).flatMap((id) => {
    const related = UROLOGY_SERVICES.find((item) => item.id === id);
    return related ? [related] : [];
  });
  return (
    <>
      <PageHero
        image={service.featuredImage}
        label="Urology care"
        breadcrumbs={[{ label: 'Urology Services', to: '/services/urologist-in-purnia' }, { label: service.title }]}
        title={service.title}
        accent="Let’s understand it."
        description={service.tagline || service.description}
        message="Your questions belong in the conversation."
      >
        <BookLink href={DR_NOORI_BOOKING_URL} label="Consult Dr. Noori" />
        <Link className="mm-text-link" to="/services/urologist-in-purnia">
          All urology services <ArrowRight size={16} />
        </Link>
      </PageHero>
      {marketing && <section className="site-decision mm-wrap" aria-labelledby="decision-title">
        <div>
          <p className="mm-kicker">YOUR CONCERN. A CLEARER NEXT STEP.</p>
          <h2 id="decision-title">{marketing.heading}</h2>
          <p>{marketing.concern}</p>
          <p>{marketing.consultation}</p>
        </div>
        <div className="site-decision-action">
          <span className="site-small-label">YOUR UROLOGY CONSULTATION</span>
          <h3>{DOCTOR_PROFILE.name}</h3>
          <p>{DOCTOR_PROFILE.qualifications}<br />{DOCTOR_PROFILE.yearsOfExperience}</p>
          <p>Line Bazar, Purnia · Confirm timing and fees before your visit.</p>
          <BookLink href={DR_NOORI_BOOKING_URL} label="Book a urology consultation" />
          <a href={hospitalPhone} className="mm-text-link"><Phone size={16} /> Call {HOSPITAL_PROFILE.phone}</a>
        </div>
      </section>}
      <div className="site-detail-layout mm-wrap">
        <article className="site-reading">
          <section id="overview">
            <p className="mm-kicker">01 / UNDERSTANDING YOUR CARE</p>
            <h2>A clearer picture.</h2>
            {(marketing?.introduction || service.overview).map((p) => (
              <p key={p}>{p}</p>
            ))}
            <div className="site-note">
              <Stethoscope size={22} />
              <p>{marketing?.note || service.patientNotes}</p>
            </div>
          </section>
          {service.assessment && <section id="assessment">
            <h2>How your concern is assessed.</h2>
            {service.assessment.map((text) => <p key={text}>{text}</p>)}
          </section>}
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
          {service.risks && <section id="risks"><h2>Benefits, limits and possible risks.</h2><p>{service.risks}</p></section>}
          <section id="prepare">
            <h2>Before your consultation.</h2>
            <BulletList items={service.preparation} />
          </section>
          <section id="questions">
            <h2>A few common questions.</h2>
            <Accordion items={service.faqs} prefix={"service-" + slug} />
          </section>
          {service.references && <section id="sources"><h2>Sources & further reading.</h2>
            <ul>{service.references.map((ref) => <li key={ref.url}><a href={ref.url} target="_blank" rel="noopener noreferrer">{ref.label}</a></li>)}</ul>
            <p className="site-medical-note">General information supports your consultation; it cannot diagnose your symptoms. Your doctor will explain which care is suitable for you.</p>
          </section>}
          <section id="book"><h2>Plan your consultation in Purnia.</h2>
            <p>Meet Dr. Md Taquedis Noori, MBBS, MS (General Surgery), MCh Urology, at Glisan Akbari Super Speciality Hospital, Dharamshala Road, Line Bazar, Purnea. Bring your existing reports and a medicine list.</p>
            <p>Confirm the appointment, fees and any proposed procedure with the team before travelling from Purnia, Katihar, Araria or Kishanganj. Ask about the follow-up plan and any symptoms that should bring you back sooner.</p>
            <BookLink href={DR_NOORI_BOOKING_URL} label="Book with Dr. Noori" />
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
            <h3>Know your next step.</h3>
            <p>Discuss your reports, treatment choices and questions with Dr. Md Taquedis Noori.</p>
            <BookLink href={DR_NOORI_BOOKING_URL} label="Book a consultation" />
            <a href={hospitalPhone} className="mm-text-link"><Phone size={16} /> Call the hospital</a>
          </div>
        </aside>
      </div>
      <section className="site-section mm-wrap">
        <SectionHeading number="02" title="Related urology care." />
        <div className="site-card-grid">
          {relatedServices.map((s) => (
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
  const { pathname } = useLocation();
  const department = getCareDepartment(pathname);
  return (
    <>
      <PageHero
        image={department.id === 'urology' ? { src: '/media/urology/kidney-stone-treatment-in-purnia.svg', alt: 'Kidney and urinary care illustration for a consultation with a urologist in Purnia' } : undefined}
        label="Departments"
        breadcrumbs={[{ label: department.label }]}
        title={department.id === "urology" ? "Urologist in Purnia" : department.label}
        accent="Care topics explained."
        description={department.id === 'urology'
          ? 'Looking for a urologist in Purnia? Meet Dr. Md Taquedis Noori in Line Bazar for a conversation about kidney stones, prostate symptoms, urine problems and men’s health.'
          : 'Find a starting point for a conversation with your doctor. Browse the care topics below and the concerns to discuss.'}
        action="faq"
        message="You don’t need to have all the answers."
      >
        {getCareDoctor(department) ? <BookLink href={getCareDoctor(department)!.bookingUrl} label={department.id === 'urology' ? 'Book a urology consultation' : 'Book a specialist consultation'} /> : <Link to="/doctors" className="mm-button">Find your doctor <ArrowUpRight size={17} /></Link>}
        <a className="mm-text-link" href={hospitalPhone}><Phone size={16} /> Ask about your visit</a>
      </PageHero>
      {department.id === 'urology' && <section className="site-section mm-wrap site-priority-care">
        <h2>Choose a starting point for your care.</h2>
        <p>As a urology doctor in Purnia, Dr. Noori sees concerns affecting the kidneys, bladder, prostate and male reproductive health. You do not need to diagnose yourself before booking a urology consultation.</p>
        <div className="site-card-grid">{UROLOGY_SERVICES.filter((item) => item.keywords).map((item) => <Link key={item.id} className="site-care-card" to={'/services/' + item.slug}>
          <h3>{item.title}</h3><p>{item.description}</p><span className="site-card-link">Read about assessment and care <ArrowUpRight size={17} /></span>
        </Link>)}</div>
        <p>Bring existing reports and your current medicine list. The hospital is on Dharamshala Road, Line Bazar, Purnea. Confirm consultation timing and procedure availability before travelling from Katihar, Araria or Kishanganj.</p>
        <p>If you cannot pass urine, or have fever with severe side or back pain, seek urgent care rather than waiting for a routine appointment.</p>
        <BookLink href={DR_NOORI_BOOKING_URL} label="Book a urology consultation" />
      </section>}
      <DepartmentCare key={department.id} department={department} />
      {department.id === 'urology' && <section className="site-section mm-wrap" aria-labelledby="all-urology-services">
        <p className="mm-kicker">ALL UROLOGY SERVICES</p>
        <h2 id="all-urology-services">Find the care you want to discuss.</h2>
        <p className="site-directory-intro">Read about each concern, how it may be assessed and the questions to bring to your consultation.</p>
        <div className="site-service-directory">{UROLOGY_SERVICES.map((item) => <Link key={item.id} to={'/services/' + item.slug}>
          <span>{item.title}</span><ArrowUpRight size={18} aria-hidden="true" />
        </Link>)}</div>
      </section>}
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
                      // Keep the selected explanation clear of the mobile booking bar.
                      requestAnimationFrame(() => {
                        const content = detail.current?.querySelector('[data-service-explainer]') || detail.current?.querySelector('[aria-live]');
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
            <div aria-live="polite" aria-atomic="true">
              <div key={service.id} className="site-care-transition">
                <p className="mm-kicker">LET’S TALK ABOUT IT</p>
                <h2 id="selected-care-title">{service.title}</h2>
                <p className="site-condition-summary">{service.explainerVideo?.description || service.description}</p>
              </div>
            </div>
            <ServiceExplainer key={service.id} serviceId={service.id} departmentId={department.id} title={service.title} />
            {service.symptoms && <>
              <h3>Concerns to mention</h3>
              <BulletList items={service.symptoms} />
            </>}
            {department.proposed && <p className="site-department-notice">
              Educational topic only. Specific consultations, procedures and facilities have not been confirmed for this topic.
            </p>}
            <p className="site-caption">
              These topics help you prepare questions; they cannot identify the
              cause of your symptoms.
            </p>
            <div className="site-care-panel-actions">
              <p className="site-care-doctor-label">{doctor ? doctor.name + ' · ' + doctor.specialty : 'Need help choosing a doctor?'}</p>
              {service.slug && <Link className="mm-button" to={"/services/" + service.slug}>
                Understand this care <ArrowUpRight size={17} />
              </Link>}
              {doctor ? <BookLink href={doctor.bookingUrl} label="Book appointment" /> :
                <Link className="mm-button" to="/doctors">Book appointment <ArrowUpRight size={17} /></Link>}
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
        <Link className="mm-text-link" to="/services/urologist-in-purnia">
          Explore care <ArrowRight size={17} />
        </Link>
      </PageHero>
      <VisitCTA />
    </>
  );
}
