import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, BookOpen } from 'lucide-react';
import { BLOG_CATEGORIES, BLOG_TOPICS, PUBLISHED_BLOG_POSTS, blogCategoryLabel, blogDate, blogReadingMinutes } from '../data/blogs';
import { careDepartmentPath } from '../data/careDepartments';
import { BlogCard, BlogTopicCard } from '../components/BlogSection';
import { NotFoundPage } from './NotFoundPage';
import './Blogs.css';

export function BlogsPage() {
  const [category, setCategory] = useState('all');
  const posts = PUBLISHED_BLOG_POSTS.filter((post) => category === 'all' || post.departmentId === category);
  const topics = BLOG_TOPICS.filter((topic) => category === 'all' || topic.departmentId === category);
  return (
    <div className="site-blogs-page">
      <section className="site-blog-hero mm-wrap" aria-labelledby="blog-title">
        <nav className="site-breadcrumb" aria-label="Breadcrumb"><Link to="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">Blogs</span></nav>
        <div className="site-blog-hero-inner">
          <div><p className="mm-kicker">THE HEALTH JOURNAL</p><h1 id="blog-title">A little knowledge.<br /><em>A clearer next step.</em></h1><p className="site-lead">Explore articles about our departments, services and everyday health, written to help you ask better questions about your care.</p></div>
          <div className="site-blog-hero-note"><BookOpen size={38} strokeWidth={1.1} aria-hidden="true" /><span>READ. UNDERSTAND. ASK.</span><p>Good questions make<br />a better conversation.</p></div>
        </div>
      </section>
      <section className="site-blog-library mm-wrap" aria-labelledby="blog-library-title">
        <h2 id="blog-library-title">Explore the journal</h2>
        <div className="site-blog-filters" role="group" aria-label="Filter blogs by department">
          {[{ id: 'all', label: 'All topics' }, ...BLOG_CATEGORIES].map((item) => <button key={item.id} type="button" aria-pressed={category === item.id} aria-controls="blog-results" onClick={() => setCategory(item.id)}>{item.label}</button>)}
        </div>
        <div id="blog-results" aria-live="polite" aria-atomic="true">
          <p className="site-blog-result-note">{posts.length > 0 ? `${posts.length} ${posts.length === 1 ? 'article' : 'articles'}` : 'Our first articles are coming soon. Explore the topics below.'}</p>
          <div className="site-blog-grid">{posts.length > 0 ? posts.map((post) => <BlogCard key={post.slug} post={post} />) : topics.map((topic) => <BlogTopicCard key={topic.departmentId} topic={topic} />)}</div>
        </div>
      </section>
    </div>
  );
}

export function BlogPostPage() {
  const { slug } = useParams();
  const post = PUBLISHED_BLOG_POSTS.find((item) => item.slug === slug);
  if (!post) return <NotFoundPage />;
  return (
    <article className="site-blog-article mm-wrap">
      <nav className="site-breadcrumb" aria-label="Breadcrumb"><Link to="/">Home</Link><span aria-hidden="true">/</span><Link to="/blogs">Blogs</Link><span aria-hidden="true">/</span><span aria-current="page">Article</span></nav>
      <header>
        <p className="mm-kicker">{blogCategoryLabel(post.departmentId).toUpperCase()}</p>
        <h1>{post.title}</h1><p className="site-lead">{post.excerpt}</p>
        <div className="site-blog-meta"><span>By {post.author}</span><time dateTime={post.publishedAt}>{blogDate(post.publishedAt)}</time><span>{blogReadingMinutes(post)} min read</span></div>
        {post.reviewedBy && <p className="site-blog-reviewer">Medically reviewed by {post.reviewedBy}</p>}
        {post.image && <img className="site-blog-article-cover" src={post.image.src} alt={post.image.alt} width="1080" height="720" />}
      </header>
      <div className="site-blog-body">
        {post.sections.map((section, index) => <section key={index}><h2>{section.heading}</h2>{section.paragraphs.map((paragraph, i) => <p key={i}>{paragraph}</p>)}{section.points && <ul>{section.points.map((point, i) => <li key={i}>{point}</li>)}</ul>}</section>)}
        {post.references && post.references.length > 0 && <section><h2>Sources & further reading</h2><ul>{post.references.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer">{source.label}</a></li>)}</ul></section>}
      </div>
      <div className="site-blog-article-footer"><Link to="/blogs" className="mm-text-link"><ArrowLeft size={17} /> All articles</Link><Link to={careDepartmentPath(post.departmentId)} className="mm-text-link">Explore {blogCategoryLabel(post.departmentId)} <ArrowUpRight size={17} /></Link></div>
    </article>
  );
}
