import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, BookOpen, Brain, Ear, HeartPulse, ShieldCheck, Stethoscope } from 'lucide-react';
import { BLOG_TOPICS, PUBLISHED_BLOG_POSTS, blogCategoryLabel, blogDate, blogPath, blogReadingMinutes, type BlogPost } from '../data/blogs';
import { careDepartmentPath } from '../data/careDepartments';
import '../pages/Blogs.css';

const topicIcons = { urology: Stethoscope, ent: Ear, 'general-medicine': HeartPulse, anesthesiology: ShieldCheck, neurology: Brain };

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="site-blog-card">
      {post.image && <Link to={blogPath(post.slug)} tabIndex={-1}><img className="site-blog-cover" src={post.image.src} alt={post.image.alt} loading="lazy" width="720" height="480" /></Link>}
      <div className="site-blog-card-top"><span className="site-blog-category">{blogCategoryLabel(post.departmentId)}</span><BookOpen size={20} aria-hidden="true" /></div>
      <h3><Link to={blogPath(post.slug)}>{post.title}</Link></h3>
      <p>{post.excerpt}</p>
      <div className="site-blog-meta"><time dateTime={post.publishedAt}>{blogDate(post.publishedAt)}</time><span>{blogReadingMinutes(post)} min read</span></div>
      <Link className="mm-text-link site-blog-card-link" to={blogPath(post.slug)} aria-label={`Read ${post.title}`}>Read article <ArrowUpRight size={17} /></Link>
    </article>
  );
}

export function BlogTopicCard({ topic }: { topic: typeof BLOG_TOPICS[number] }) {
  const Icon = topicIcons[topic.departmentId as keyof typeof topicIcons] || BookOpen;
  return (
    <article className="site-blog-card site-blog-upcoming">
      <div className="site-blog-card-top"><span className="site-blog-category">{blogCategoryLabel(topic.departmentId)}</span><span className="site-blog-topic-icon"><Icon size={24} strokeWidth={1.4} aria-hidden="true" /></span></div>
      <span className="site-blog-status">ARTICLES COMING SOON</span>
      <h3>{topic.title}</h3>
      <p>{topic.description}</p>
      <Link className="mm-text-link site-blog-card-link" to={careDepartmentPath(topic.departmentId)}>Explore department <ArrowUpRight size={17} /></Link>
    </article>
  );
}

export function BlogSection() {
  const posts = PUBLISHED_BLOG_POSTS.slice(0, 3);
  return (
    <section id="blogs" className="site-home-blogs mm-wrap" aria-labelledby="home-blogs-title">
      <div className="mm-section-heading">
        <div><p className="mm-kicker">02 / THE HEALTH JOURNAL</p><h2 id="home-blogs-title">Health explained.<br /><em>Simply.</em></h2></div>
        <Link className="mm-text-link" to="/blogs">Explore blogs <ArrowUpRight size={17} /></Link>
      </div>
      <p className="site-blog-intro">A space for clearer answers, useful questions and a little more confidence in your care.{posts.length === 0 && ' Our first articles are coming soon.'}</p>
      <div className="site-blog-grid">
        {posts.length > 0 ? posts.map((post) => <BlogCard key={post.slug} post={post} />)
          : BLOG_TOPICS.slice(0, 3).map((topic) => <BlogTopicCard key={topic.departmentId} topic={topic} />)}
      </div>
    </section>
  );
}
