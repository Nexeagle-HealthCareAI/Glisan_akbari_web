import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Globe,
  MapPin,
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

import { DoctorGoogleRating } from "../components/DoctorGoogleRating";

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
                {d.profileImage ? (
                  <img className="site-avatar site-doctor-photo" src={d.profileImage} alt={`${d.name}, ${d.specialty}`} width="1122" height="1402" loading="lazy" />
                ) : (
                  <span className="site-avatar" aria-hidden="true">{d.initials}</span>
                )}
              </div>
              <h2>{d.name}</h2>
              <p className="site-doctor-qual">{d.qualifications}</p>
              {d.id === "doc-1" && <DoctorGoogleRating />}
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
                {d.isClickable && (
                  <Link className="mm-text-link" to={"/doctors/" + d.slug}>
                    Meet the doctor <ArrowUpRight size={17} />
                  </Link>
                )}
                <BookLink href={d.bookingUrl} label="Book this doctor" />
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
            <img className="site-profile-emblem site-profile-photo" src={DOCTOR_PROFILE.profileImage} alt={`${DOCTOR_PROFILE.name}, ${DOCTOR_PROFILE.professionalTitle}`} width="1122" height="1402" loading="lazy" />
            <p className="mm-kicker">YOUR CONSULTATION</p>
            <h2>{DOCTOR_PROFILE.name}</h2>
            <p>{DOCTOR_PROFILE.qualifications}</p>
            <DoctorGoogleRating />
            <div className="site-profile-meta">
              <p>
                <Globe size={17} />
                {DOCTOR_PROFILE.languages}
              </p>
              <p>
                <MapPin size={17} />
                <a href={hospitalMap} target="_blank" rel="noreferrer">{HOSPITAL_PROFILE.address.fullFormatted}</a>
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
