'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, BookOpen, Clock, Tag } from 'lucide-react';

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
          <p className="text-[15px] text-[#5A5530] max-w-xl font-medium">
            Case studies, industry analyses, and tactical reports on business intelligence and automation.
          </p>
        </div>
        <Link 
          href="/blog" 
          className="mt-6 md:mt-0 inline-flex items-center gap-2 text-[#8A7C38] hover:text-[#73672D] font-bold text-[14px] group no-underline transition-colors"
        >
          <span>View all posts</span>
          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {posts.map((post, idx) => (
          <article 
            key={post.id || idx}
            className="flex flex-col bg-[#EDE8C4] border border-[#3D3A1A]/12 rounded-xl p-6 transition-all duration-300 hover:translate-y-[-4px] hover:shadow-md hover:border-[#3D3A1A]/25 group relative min-h-[320px] justify-between"
          >
            <div>
              {/* Category & Date Info */}
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-[9px] uppercase tracking-wider text-[#FAF7EC] bg-[#1A1A0A] px-2.5 py-1 rounded-md font-bold">
                  {post.category}
                </span>
                <span className="font-mono text-[10px] text-[#5A5530] font-semibold flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {post.date}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-display font-bold text-[20px] text-[#1A1A0A] leading-snug mb-3 group-hover:text-[#8A7C38] transition-colors">
                <Link href={`/blog#post-${post.id}`} className="no-underline text-inherit after:absolute after:inset-0">
                  {post.title}
                </Link>
              </h3>

              {/* Summary */}
              <p className="text-[13.5px] leading-relaxed text-[#5A5530] line-clamp-3">
                {post.summary}
              </p>
            </div>

            {/* Read action */}
            <div className="flex items-center gap-1.5 text-[12px] font-bold text-[#8A7C38] group-hover:text-[#1A1A0A] transition-colors mt-6">
              <span>Read report</span>
              <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
