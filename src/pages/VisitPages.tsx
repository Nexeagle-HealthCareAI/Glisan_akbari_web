import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Phone,
  MapPin,
  CalendarDays,
  Search,
  MessageCircle,
  FileText,
  Stethoscope,
  ExternalLink,
} from "lucide-react";
import { HOSPITAL_PROFILE, DOCTORS, BOOKING_URL } from "../data/config";
import { PATIENT_FAQS } from "../data/patientFaqs";
import {
  PageHero,
  SectionHeading,
  VisitCTA,
  Accordion,
  BulletList,
  BookLink,
  GuideScene,
  hospitalPhone,
  hospitalMap,
} from "../components/SiteDesign";

export function BookAppointmentPage() {
  const [step, setStep] = useState(0);
  const steps = [
    {
      title: "Choose your doctor",
      text: "Explore the doctor profiles below and open their Doctor Dekho booking page.",
      message: "Pehle, apne doctor ko chunein.",
    },
    {
      title: "Confirm your visit",
      text: "Check your appointment details and doctor availability before you travel.",
      message: "Apni appointment confirm kar lein.",
    },
    {
      title: "Bring your reports",
      text: "Keep previous reports, prescriptions and your questions ready for the consultation.",
      message: "Reports aur sawaal saath laayein.",
    },
  ];
  return (
    <>
      <PageHero
        label="Book appointment"
        title="Three small steps."
        accent="A simpler visit."
        description="Choose a doctor and continue to Doctor Dekho to arrange your appointment. Our hospital team can help by phone."
        action="booking"
        message="Let’s plan your next step together."
      >
        <BookLink label="Open Doctor Dekho" />
        <a className="mm-text-link" href={hospitalPhone}>
          <Phone size={16} />
          Call for help
        </a>
      </PageHero>
      <section className="site-section mm-wrap">
        <SectionHeading number="01" title="Your visit, visualised." />
        <div className="site-booking-guide">
          <GuideScene action="booking" message={steps[step].message} cue={step} />
          <div
            className="site-booking-steps"
            role="group"
            aria-label="Appointment guide"
          >
            {steps.map((s, i) => (
              <button
                key={s.title}
                aria-pressed={i === step}
                className={i === step ? "is-active" : ""}
                onClick={() => setStep(i)}
              >
                <span className="site-number">0{i + 1}</span>
                <span>
                  <strong>{s.title}</strong>
                  <small>{s.text}</small>
                </span>
                <ArrowUpRight size={20} />
              </button>
            ))}
          </div>
        </div>
      </section>
      <section className="site-section site-book-doctors mm-wrap">
        <SectionHeading
          number="02"
          title="Who would you like to see?"
          note="Booking continues on Doctor Dekho."
        />
        <div className="site-booking-doctors">
          {DOCTORS.map((d) => (
            <article key={d.id}>
              <span className="site-icon">
                <Stethoscope size={24} />
              </span>
              <div>
                <span className="site-small-label">{d.department}</span>
                <h2>{d.name}</h2>
                <p>{d.qualifications}</p>
              </div>
              <BookLink href={d.bookingUrl} label="Choose doctor" />
            </article>
          ))}
        </div>
        <div className="site-note">
          <ExternalLink size={21} />
          <p>
            You’ll leave this website to book on Doctor Dekho. Review the
            appointment details there before confirming.
          </p>
        </div>
      </section>
    </>
  );
}
export function ContactPage() {
  return (
    <>
      <PageHero
        label="Contact & location"
        title="Your next step"
        accent="starts here."
        description="Find Glisan Akbari Super Speciality Hospital in Line Bazar, Purnia. Call our team for help with your visit."
        action="visit"
        message="Mulaaqaat hogi. Khayaal rakhiye!"
      >
        <a href={hospitalPhone} className="mm-button">
          <Phone size={17} />
          Call {HOSPITAL_PROFILE.phone}
        </a>
        <a
          href={hospitalMap}
          target="_blank"
          rel="noreferrer"
          className="mm-text-link"
        >
          Get directions <ArrowUpRight size={17} />
        </a>
      </PageHero>
      <section className="site-section mm-wrap">
        <SectionHeading number="01" title="Find your way to us." />
        <div className="site-contact-grid">
          <div className="site-contact-info">
            <article>
              <MapPin size={26} />
              <h2>Our address</h2>
              <address>{HOSPITAL_PROFILE.address.fullFormatted}</address>
              <a
                href={hospitalMap}
                target="_blank"
                rel="noreferrer"
                className="mm-text-link"
              >
                Open Google Maps <ArrowUpRight size={17} />
              </a>
            </article>
            <article>
              <Phone size={25} />
              <h2>Talk to our team</h2>
              <a className="site-phone-number" href={hospitalPhone}>
                {HOSPITAL_PROFILE.phone}
              </a>
              <p>
                Call for help planning your appointment and confirming doctor
                availability.
              </p>
            </article>
            <article>
              <CalendarDays size={25} />
              <h2>Plan before you travel</h2>
              <p>{HOSPITAL_PROFILE.consultationTimings}</p>
              <p>Please confirm your appointment before visiting.</p>
              <Link className="mm-text-link" to="/book-appointment">
                Plan your appointment <ArrowUpRight size={17} />
              </Link>
            </article>
          </div>
          <div className="site-location-card">
            <div
              className="site-map-illustration"
              aria-label="Illustration of the hospital location, not a street map"
            >
              <div className="site-map-road road-one" />
              <div className="site-map-road road-two" />
              <div className="site-map-park" />
              <div className="site-map-hospital">
                <MapPin size={39} />
                <strong>Glisan Akbari</strong>
                <span>Line Bazar · Purnia</span>
              </div>
              <span className="site-map-label">
                ILLUSTRATIVE LOCATION GUIDE
              </span>
            </div>
            <div className="site-location-card-bottom">
              <h2>See you in Purnia.</h2>
              <p>
                Opposite Shiv Mandir, Dharamshala Road.
                <br />
                Use Google Maps for the actual route.
              </p>
              <a
                href={hospitalMap}
                target="_blank"
                rel="noreferrer"
                className="mm-button"
              >
                Get directions <ArrowUpRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>
      <VisitCTA />
    </>
  );
}
export function FaqPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const list = PATIENT_FAQS.filter(
    (f) =>
      (category === "all" || f.category === category) &&
      (
        f.question +
        " " +
        f.answer +
        " " +
        (f.category === "appointment"
          ? "booking appointment"
          : f.category === "hospital"
            ? "location hospital"
            : f.category)
      )
        .toLowerCase()
        .includes(search.toLowerCase()),
  );
  return (
    <>
      <PageHero
        label="FAQs"
        title="A few questions."
        accent="A little reassurance."
        description="Find answers about booking, preparing for your consultation and reaching the hospital."
        action="faq"
        message="Chhota sawaal? Bada sawaal? Poochhiye."
      />
      <section className="site-section mm-wrap">
        <div className="site-faq-content">
          <SectionHeading number="01" title="What’s on your mind?" />
          <div className="site-filters">
            <label className="site-search">
              <Search size={19} />
              <span className="sr-only">Search frequently asked questions</span>
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search booking, reports, location…"
              />
            </label>
            <div
              className="site-chips"
              role="group"
              aria-label="Filter questions"
            >
              {[
                ["all", "All questions"],
                ["appointment", "Booking"],
                ["consultation", "Your consultation"],
                ["hospital", "The hospital"],
              ].map(([id, label]) => (
                <button
                  key={id}
                  aria-pressed={category === id}
                  onClick={() => setCategory(id)}
                  className={category === id ? "is-active" : ""}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div aria-live="polite" className="site-result-count">
            {list.length} {list.length === 1 ? "question" : "questions"}
          </div>
          <Accordion items={list} prefix="all-faqs" />
          {!list.length && (
            <div className="site-empty">
              <MessageCircle size={30} />
              <h2>No matching questions.</h2>
              <p>Try another search or call our team.</p>
              <a href={hospitalPhone} className="mm-text-link">
                <Phone size={17} />
                Call hospital
              </a>
            </div>
          )}
          <div className="site-faq-help">
            <h2>Still have a question?</h2>
            <p>Our team can help you plan your visit.</p>
            <a className="mm-button" href={hospitalPhone}>
              Talk to our team <Phone size={16} />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
export function ReviewsPage() {
  const profileUrl = HOSPITAL_PROFILE.googleBusinessProfileUrl;
  const hasReviews = /^https:\/\//.test(profileUrl);
  return (
    <>
      <PageHero
        label="Patient feedback"
        title="Every experience"
        accent="deserves to be heard."
        description="Your experience matters. Speak with our team about your hospital visit, or explore the doctor profiles before you book."
        action="faq"
        message="Your questions and feedback matter."
      />
      <section className="site-section mm-wrap">
        <div className="site-feedback-card">
          <span className="site-icon">
            <MessageCircle size={34} strokeWidth={1.3} />
          </span>
          <p className="mm-kicker">PATIENT EXPERIENCES</p>
          <h2>A space for real stories.</h2>
          <p>
            Patient stories are not published on this page yet. You can view the
            doctor’s booking profile or contact the hospital team to share
            feedback about your visit.
          </p>
          <div className="site-hero-actions">
            {hasReviews ? (
              <a className="mm-button" href={profileUrl}>
                Read public reviews <ArrowUpRight size={17} />
              </a>
            ) : (
              <a className="mm-button" href={hospitalPhone}>
                Share your feedback <Phone size={17} />
              </a>
            )}
            <Link className="mm-text-link" to="/doctors">
              Meet our doctors <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
      </section>
      <VisitCTA />
    </>
  );
}
