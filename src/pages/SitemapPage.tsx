import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, FileCode2 } from 'lucide-react';
import { PageHero } from '../components/SiteDesign';
import { CARE_DEPARTMENTS, careDepartmentPath } from '../data/careDepartments';
import { UROLOGY_SERVICES } from '../data/config';
import { PUBLISHED_BLOG_POSTS, blogPath } from '../data/blogs';

const groups = [
  { title: 'Plan your visit', links: [
    { to: '/', label: 'Home' }, { to: '/explore-care', label: 'Explore care & hospital stays' },
    { to: '/doctors', label: 'Our doctors' }, { to: '/doctors/dr-md-taquedis-noori', label: 'Dr. Md Taquedis Noori' },
    { to: '/contact', label: 'Contact & directions' }, { to: '/faqs', label: 'Frequently asked questions' },
  ] },
  ...CARE_DEPARTMENTS.map((department) => ({ title: department.label, links: [
    { to: careDepartmentPath(department.id), label: department.label + ' overview' },
    ...(department.id === 'urology' ? UROLOGY_SERVICES.map((service) => ({ to: '/services/' + service.slug, label: service.title })) : []),
  ] })),
  { title: 'Health journal', links: [{ to: '/blogs', label: 'Health blog' }, ...PUBLISHED_BLOG_POSTS.map((post) => ({ to: blogPath(post.slug), label: post.title }))] },
  { title: 'Website information', links: [
    { to: '/privacy-policy', label: 'Privacy policy' }, { to: '/terms', label: 'Terms & conditions' }, { to: '/sitemap', label: 'HTML sitemap' },
  ] },
];

export function SitemapPage() {
  const xmlSitemap = typeof window !== 'undefined' && window.location.protocol === 'file:' ? './dist/sitemap.xml' : '/sitemap.xml';
  return <>
    <PageHero label="Sitemap" title="Find your way." accent="Every page, in one place."
      description="Browse our departments, urology services, doctors and practical information for your visit."
      action="faq" message="Choose the page you need.">
      <a href={xmlSitemap} className="mm-text-link"><FileCode2 size={17} /> View XML sitemap</a>
    </PageHero>
    <div className="site-sitemap-grid mm-wrap">{groups.map((group) => <section key={group.title}>
      <h2>{group.title}</h2>
      <ul>{group.links.map(({ to, label }) => <li key={to}><Link to={to}>{label}<ArrowUpRight size={15} aria-hidden="true" /></Link></li>)}</ul>
    </section>)}</div>
  </>;
}
