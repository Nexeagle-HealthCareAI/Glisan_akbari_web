import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import {
  ArrowUpRight,
  ArrowRight,
  Phone,
} from "lucide-react";
import { UROLOGY_SERVICES, DR_NOORI_BOOKING_URL } from "../data/config";
import { SERVICE_IMAGES } from '../data/serviceImages';
import { CareCard } from '../components/CareCard';
import { NeurologyDepartmentPage } from './NeurologyPages';
import { ServicePage } from './ServicePage';
import { urologyServiceContent } from '../data/servicePageContent';
import { DepartmentConcernTabs } from '../components/DepartmentConcernTabs';
import { DEPARTMENT_HERO_IMAGES } from '../data/pageImages';
import { getCareDepartment, getCareDoctor } from "../data/careDepartments";
import {
  PageHero,
  VisitCTA,
  BookLink,
  hospitalPhone,
} from "../components/SiteDesign";

type Props = { onOpenBooking?: () => void };
export function ServiceDetailPage(_: Props) {
  const { slug } = useParams();
  const service = UROLOGY_SERVICES.find(item => item.slug === slug);
  return service ? <ServicePage content={urologyServiceContent(service)} key={service.id} /> : <NotFoundPage />;
}
export function ConditionsPage(_: Props) {
  const { pathname } = useLocation();
  const department = getCareDepartment(pathname);
  if (department.id === 'neurology') return <NeurologyDepartmentPage />;
  return (
    <>
      <PageHero
        image={DEPARTMENT_HERO_IMAGES[department.id]}
        imageLayout="background"
        label="Departments"
        pose={department.id === 'urology' ? undefined : 'waving'}
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
        <div className="site-card-grid">{UROLOGY_SERVICES.filter((item) => item.keywords).map((item) => <CareCard
          key={item.id} to={'/services/' + item.slug} title={item.title} description={item.description}
          image={SERVICE_IMAGES[item.id]} heading="h3" linkLabel="Read about assessment and care" />)}</div>
        <p>Bring existing reports and your current medicine list. The hospital is on Dharamshala Road, Line Bazar, Purnea. Confirm consultation timing and procedure availability before travelling from Katihar, Araria or Kishanganj.</p>
        <p>If you cannot pass urine, or have fever with severe side or back pain, seek urgent care rather than waiting for a routine appointment.</p>
        <BookLink href={DR_NOORI_BOOKING_URL} label="Book a urology consultation" />
      </section>}
      <DepartmentConcernTabs key={department.id} department={department} />
      {department.id === 'urology' && <section className="site-section mm-wrap" aria-labelledby="all-urology-services">
        <p className="mm-kicker">ALL UROLOGY SERVICES</p>
        <h2 id="all-urology-services">Find the care you want to discuss.</h2>
        <p className="site-directory-intro">Read about each concern, how it may be assessed and the questions to bring to your consultation.</p>
        <div className="site-service-directory">{UROLOGY_SERVICES.map((item) => <Link key={item.id} to={'/services/' + item.slug}>
          <span>{item.title}</span><ArrowUpRight size={18} aria-hidden="true" />
        </Link>)}</div>
      </section>}
      {department.id !== 'urology' && <section className="site-section mm-wrap">
        <h2>Explore all {department.label.toLowerCase()} care topics.</h2>
        <div className="site-card-grid">{department.services.filter(item => item.slug).map(item => <CareCard key={item.id} to={'/services/' + item.slug} title={item.title} description={item.description} image={SERVICE_IMAGES[item.id]} heading="h3" />)}</div>
      </section>}
      <VisitCTA />
    </>
  );
}

export function NotFoundPage() {
  return (
    <>
      <PageHero
        label="Page not found"
        pose="sad"
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
