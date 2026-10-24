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
} from "lucide-react";
import { HOSPITAL_PROFILE } from "../data/config";
import { PATIENT_FAQS } from "../data/patientFaqs";
import {
  PageHero,
  SectionHeading,
  VisitCTA,
  Accordion,
  BulletList,
  hospitalPhone,
  hospitalMap,
} from "../components/SiteDesign";

import { HospitalLocationMap } from "../components/HospitalLocationMap";

export function ContactPage() {
  return (
    <div className="site-visit-page">
      <PageHero
        label="Visit us"
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
              <Link className="mm-text-link" to="/doctors">
                Plan your appointment <ArrowUpRight size={17} />
              </Link>
            </article>
          </div>
          <div className="site-location-card">
            <HospitalLocationMap />
            <div className="site-location-card-bottom">
              <h2>See you in Purnia.</h2>
              <p>
                {HOSPITAL_PROFILE.address.line2}, {HOSPITAL_PROFILE.address.area}, {HOSPITAL_PROFILE.address.city}.
                <br />
                Tap the map or use the button for directions.
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
    </div>
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
