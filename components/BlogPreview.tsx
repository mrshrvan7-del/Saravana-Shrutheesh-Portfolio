'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

function BlogCard({ post }: { post: any }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth out mouse tracking with springs for butter-smooth physical response
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { damping: 20, stiffness: 200 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { damping: 20, stiffness: 200 });

  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Normalize coordinates to -0.5 to 0.5 range
    const mouseX = (e.clientX - rect.left) / width - 0.5;
    const mouseY = (e.clientY - rect.top) / height - 0.5;
    
    x.set(mouseX);
    y.set(mouseY);
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.article
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="clay-card group relative flex flex-col p-6 min-h-[320px] justify-between cursor-pointer"
    >
      {/* Light spotlight following cursor */}
      {isHovered && (
        <div 
          className="absolute inset-0 pointer-events-none rounded-[28px] overflow-hidden"
          style={{
            background: `radial-gradient(circle 160px at ${coords.x}px ${coords.y}px, rgba(255, 255, 255, 0.35), transparent)`,
            mixBlendMode: 'overlay',
            zIndex: 1,
          }}
        />
      )}

      {/* Floating 3D content layers */}
      <div 
        style={{ transform: 'translateZ(20px)', transformStyle: 'preserve-3d' }} 
        className="relative z-10"
      >
        {/* Category & Date Info */}
        <div className="flex items-center justify-between mb-4">
          <span className="font-mono text-[9px] uppercase tracking-wider text-[var(--text-cream)] bg-[var(--text-primary)] px-2.5 py-1 rounded-md font-bold">
            {post.category}
          </span>
          <span className="font-mono text-[10px] text-[var(--text-muted)] font-semibold flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {post.date}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-display font-bold text-[20px] text-[var(--text-primary)] leading-snug mb-3 group-hover:text-[var(--accent-dark)] transition-colors">
          <Link href={`/blog#post-${post.id}`} className="no-underline text-inherit after:absolute after:inset-0">
            {post.title}
          </Link>
        </h3>

        {/* Summary */}
        <p className="text-[13.5px] leading-relaxed text-[var(--text-muted)] line-clamp-3">
          {post.summary}
        </p>
      </div>

      {/* Read action button */}
      <div 
        style={{ transform: 'translateZ(10px)' }}
        className="relative z-10 flex items-center gap-1.5 text-[12px] font-bold text-[var(--accent-dark)] group-hover:text-[var(--text-primary)] transition-colors mt-6"
      >
        <span>Read report</span>
        <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
      </div>
    </motion.article>
  );
}

export default function BlogPreview() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    try {
      // Import static posts
      const staticPosts = require('@/src/data/posts.json');
      
      // Try to load any local storage updates
      const localPostsRaw = localStorage.getItem('blog-posts');
      const localPosts = localPostsRaw ? JSON.parse(localPostsRaw) : [];
      
      // Combine and show the top 3 latest
      const combined = [...localPosts, ...staticPosts];
      setPosts(combined.slice(0, 3));
    } catch (e) {
      console.error('Failed to load posts', e);
    }
  }, []);

  return (
    <section id="blog" className="section-container section-padding pb-32">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <div>
          <h2 className="section-heading mb-4">updates.</h2>
          <p className="text-[15px] text-[var(--text-muted)] max-w-xl font-medium">
            Case studies, industry analyses, and tactical reports on business intelligence and automation.
          </p>
        </div>
        <Link 
          href="/blog" 
          className="mt-6 md:mt-0 inline-flex items-center gap-2 text-[var(--accent-dark)] hover:text-[var(--bg-accent)] font-bold text-[14px] group no-underline transition-colors"
        >
          <span>View all posts</span>
          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {posts.map((post, idx) => (
          <BlogCard key={post.id || idx} post={post} />
        ))}
      </div>
    </section>
  );
}
