import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Stethoscope,
  Globe,
  MapPin,
  Heart,
  FileText,
} from "lucide-react";
import {
  DOCTORS,
  DOCTOR_PROFILE,
  HOSPITAL_PROFILE,
  UROLOGY_SERVICES,
  DR_NOORI_BOOKING_URL,
} from "../data/config";
import {
  PageHero,
  SectionHeading,
  VisitCTA,
  BookLink,
  BulletList,
  hospitalMap,
} from "../components/SiteDesign";

export function DoctorsPage() {
  return (
    <>
      <PageHero
        label="Our doctors"
        title="Real people."
        accent="Here for your questions."
        description="Meet the doctors at Glisan Akbari Super Speciality Hospital. Explore their areas of care and choose your consultation."
        action="doctor"
        message="A real doctor. A real conversation."
      />
      <section className="site-section mm-wrap">
        <SectionHeading
          number="01"
          title="The people behind your care."
          note="Book directly with your chosen doctor."
        />
        <div className="site-doctor-grid">
          {DOCTORS.map((d, i) => (
            <article className={"site-doctor-card site-doctor-" + i} key={d.id}>
              <div className="site-doctor-card-top">
                <span className="site-small-label">{d.department}</span>
                <span className="site-avatar" aria-hidden="true">
                  {d.initials}
                </span>
              </div>
              <h2>{d.name}</h2>
              <p className="site-doctor-qual">{d.qualifications}</p>
              <p>
                {d.specialty} · {d.yearsOfExperience}
              </p>
              <div className="site-doctor-tags">
                {d.focusAreas?.map((f) => (
                  <span key={f}>{f}</span>
                ))}
              </div>
              <p className="site-doctor-language">
                <Globe size={15} />
                {d.languages}
              </p>
              <div className="site-doctor-actions">
                <BookLink href={d.bookingUrl} label="Book this doctor" />
                {d.isClickable && (
                  <Link className="mm-text-link" to={"/doctors/" + d.slug}>
                    Meet the doctor <ArrowUpRight size={17} />
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>
        <p className="site-caption">
          Please confirm the doctor’s availability and appointment details
          before visiting.
        </p>
      </section>
      <VisitCTA />
    </>
  );
}
export function DoctorProfilePage(_: { onOpenBooking?: () => void }) {
  return (
    <>
      <PageHero
        label="Meet Dr. Noori"
        title="Meet your urologist."
        accent="Dr. Md Taquedis Noori."
        description={DOCTOR_PROFILE.professionalTitle}
        action="doctor"
        message="Bring your questions. Your doctor will listen."
      >
        <BookLink href={DR_NOORI_BOOKING_URL} label="Book with Dr. Noori" />
        <Link to="/doctors" className="mm-text-link">
          All our doctors <ArrowUpRight size={17} />
        </Link>
      </PageHero>
      <section className="site-section mm-wrap">
        <div className="site-profile-grid">
          <aside className="site-profile-card">
            <span className="site-profile-emblem">
              <Stethoscope size={62} strokeWidth={1} />
            </span>
            <p className="mm-kicker">YOUR CONSULTATION</p>
            <h2>{DOCTOR_PROFILE.name}</h2>
            <p>{DOCTOR_PROFILE.qualifications}</p>
            <div className="site-profile-meta">
              <p>
                <Globe size={17} />
                {DOCTOR_PROFILE.languages}
              </p>
              <p>
                <MapPin size={17} />
                Line Bazar, Purnia
              </p>
            </div>
            <BookLink href={DR_NOORI_BOOKING_URL} label="Book consultation" />
          </aside>
          <div className="site-reading">
            <section>
              <p className="mm-kicker">01 / GET TO KNOW YOUR DOCTOR</p>
              <h2>Listen. Understand. Discuss.</h2>
              <p>{DOCTOR_PROFILE.biography}</p>
              <p>{DOCTOR_PROFILE.doctorIntroduction}</p>
            </section>
            <section>
              <h2>Areas of care.</h2>
              <BulletList items={DOCTOR_PROFILE.focusAreas || []} />
              <div className="site-inline-links">
                {UROLOGY_SERVICES.slice(0, 6).map((s) => (
                  <Link key={s.id} to={"/services/" + s.slug}>
                    {s.title}
                    <ArrowUpRight size={16} />
                  </Link>
                ))}
              </div>
            </section>
            <section>
              <h2>A little preparation helps.</h2>
              <BulletList
                items={[
                  "Bring previous reports and prescriptions.",
                  "Write down your questions before your visit.",
                  "Confirm your appointment and doctor availability before you travel.",
                ]}
              />
            </section>
          </div>
        </div>
      </section>
      <VisitCTA />
    </>
  );
}
export function HospitalPage(_: { onOpenBooking?: () => void }) {
  return (
    <>
      <PageHero
        label="Our hospital"
        title="Closer to home."
        accent="Clearer about care."
        description={
          HOSPITAL_PROFILE.name +
          ", Line Bazar, Purnia. Get to know our care team and plan your visit."
        }
        action="welcome"
        message="Welcome. Let’s make your visit easier."
      >
        <Link className="mm-button" to="/contact">
          Find your way here <ArrowUpRight size={17} />
        </Link>
      </PageHero>
      <section className="site-hospital-intro">
        <div className="mm-wrap">
          <p className="mm-kicker">01 / A FAMILIAR PLACE FOR YOUR NEXT STEP</p>
          <h2>
            People first.
            <br />
            <em>One conversation at a time.</em>
          </h2>
          <p>{HOSPITAL_PROFILE.description}</p>
          <div className="site-hospital-values">
            {[
              [
                Stethoscope,
                "Meet your doctor",
                "Know who you’re consulting and explore their areas of care.",
              ],
              [
                Heart,
                "Ask your questions",
                "Prepare for a conversation about what matters to you.",
              ],
              [
                FileText,
                "Plan your visit",
                "Bring your reports and confirm your appointment details.",
              ],
            ].map(([Icon, title, line]: any) => (
              <div key={title}>
                <Icon size={27} strokeWidth={1.3} />
                <h3>{title}</h3>
                <p>{line}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="site-section mm-wrap">
        <SectionHeading number="02" title="Explore care at the hospital." />
        <div className="site-card-grid">
          {HOSPITAL_PROFILE.patientServices.map((s, i) => (
            <div className="site-care-card" key={s}>
              <span className="site-number">0{i + 1}</span>
              <h2>{s}</h2>
              <Link className="site-card-link" to="/services">
                Explore urology care <ArrowUpRight size={18} />
              </Link>
            </div>
          ))}
        </div>
      </section>
      <section className="site-location-band mm-wrap">
        <MapPin size={42} strokeWidth={1.2} />
        <div>
          <p className="mm-kicker">FIND US IN PURNIA</p>
          <h2>A little closer to clarity.</h2>
          <address>{HOSPITAL_PROFILE.address.fullFormatted}</address>
        </div>
        <a
          href={hospitalMap}
          className="mm-button"
          target="_blank"
          rel="noreferrer"
        >
          Get directions <ArrowUpRight size={17} />
        </a>
      </section>
      <VisitCTA />
    </>
  );
}
