'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { 
  ArrowLeft, Plus, Trash, Download, X, 
  Lock, Unlock, Calendar, BookOpen, Clock, 
  Eye, FileText, PlusCircle, AlertCircle
} from 'lucide-react';

export default function BlogPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPost, setSelectedPost] = useState<any | null>(null);
  
  // Admin states
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPasscode, setAdminPasscode] = useState('');
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [showCreatorModal, setShowCreatorModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Form states
  const [newTitle, setNewTitle] = useState('');
  const [newSummary, setNewSummary] = useState('');
  const [newCategory, setNewCategory] = useState('Operations');
  const [newTags, setNewTags] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newImage, setNewImage] = useState('');

  // Categories list
  const categories = ['All', 'Operations', 'Analytics', 'AI', 'Projects'];

  useEffect(() => {
    loadAllPosts();
  }, []);

  const loadAllPosts = () => {
    try {
      const staticPosts = require('@/src/data/posts.json');
      const localPostsRaw = localStorage.getItem('blog-posts');
      const localPosts = localPostsRaw ? JSON.parse(localPostsRaw) : [];
      setPosts([...localPosts, ...staticPosts]);
    } catch (e) {
      console.error('Failed to load posts', e);
    }
  };

  // Filter posts based on selected category
  const filteredPosts = selectedCategory === 'All' 
    ? posts 
    : posts.filter(post => post.category.toLowerCase() === selectedCategory.toLowerCase());

  // Handle Admin Passcode Login
  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPasscode.toLowerCase() === 'saravana' || adminPasscode.toLowerCase() === 'admin') {
      setIsAdmin(true);
      setShowAdminLogin(false);
      setErrorMsg('');
    } else {
      setErrorMsg('Incorrect passcode. Try "saravana".');
    }
  };

  // Convert uploaded image to base64
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle new post creation
  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newSummary || !newContent) {
      alert('Please fill out all required fields.');
      return;
    }

    const newPost = {
      id: Date.now().toString(),
      title: newTitle,
      summary: newSummary,
      category: newCategory,
      content: newContent,
      tags: newTags.split(',').map(tag => tag.trim()).filter(Boolean),
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      image: newImage
    };

    const localPostsRaw = localStorage.getItem('blog-posts');
    const localPosts = localPostsRaw ? JSON.parse(localPostsRaw) : [];
    const updatedLocalPosts = [newPost, ...localPosts];

    localStorage.setItem('blog-posts', JSON.stringify(updatedLocalPosts));
    
    // Reset form
    setNewTitle('');
    setNewSummary('');
    setNewCategory('Operations');
    setNewTags('');
    setNewContent('');
    setNewImage('');
    setShowCreatorModal(false);

    loadAllPosts();
  };

  // Delete local custom post
  const handleDeletePost = (postId: string) => {
    if (!confirm('Are you sure you want to delete this custom post?')) return;
    
    const localPostsRaw = localStorage.getItem('blog-posts');
    const localPosts = localPostsRaw ? JSON.parse(localPostsRaw) : [];
    const updatedLocalPosts = localPosts.filter((post: any) => post.id !== postId);
    
    localStorage.setItem('blog-posts', JSON.stringify(updatedLocalPosts));
    loadAllPosts();
  };

  // Export database to posts.json format
  const handleExportDatabase = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(posts, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "posts.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <>
      <Nav />

      <main className="min-h-screen bg-[var(--bg-page)] pt-32 pb-24">
        <div className="section-container">
          
          {/* Header */}
          <div className="mb-12">
            <Link 
              href="/" 
              className="inline-flex items-center gap-1.5 text-[var(--text-muted)] hover:text-[var(--text-primary)] font-bold text-[13px] no-underline mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
            <h1 className="font-display font-extrabold text-[44px] md:text-[56px] text-[var(--text-primary)] leading-tight mb-4">
              reports &amp; projects<span className="text-[var(--accent-dark)]">.</span>
            </h1>
            <p className="text-[16px] text-[var(--text-muted)] max-w-2xl font-medium leading-relaxed">
              Technical documentations, operational analyses, and supply-chain optimizations. Composed as executive-ready reports.
            </p>
          </div>

          {/* Controls Bar: Category Filters & Creator Actions */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[var(--text-body)]/12 pb-6 mb-12">
            {/* Categories */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2.5 rounded-full font-mono text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    selectedCategory === cat 
                      ? 'bg-[var(--text-primary)] text-[var(--text-cream)] shadow-sm'
                      : 'bg-[var(--bg-card)] hover:bg-[var(--bg-page)] text-[var(--text-muted)] hover:text-[var(--text-primary)] border border-[var(--text-body)]/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Creator Controls */}
            <div className="flex items-center gap-3">
              {isAdmin ? (
                <>
                  <button
                    onClick={() => setShowCreatorModal(true)}
                    className="px-5 py-2.5 bg-[var(--accent-dark)] hover:bg-[var(--bg-accent)] text-[var(--text-cream)] rounded-full font-mono text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create Post</span>
                  </button>
                  <button
                    onClick={handleExportDatabase}
                    className="px-5 py-2.5 bg-[var(--text-primary)] hover:bg-[var(--text-body)] text-[var(--text-cream)] rounded-full font-mono text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                    title="Export all posts to updates posts.json"
                  >
                    <Download className="w-4 h-4" />
                    <span>Export JSON</span>
                  </button>
                  <button
                    onClick={() => setIsAdmin(false)}
                    className="p-2.5 bg-[var(--bg-card)] hover:bg-[var(--bg-page)] text-[var(--text-muted)] rounded-full border border-[var(--text-body)]/10 cursor-pointer"
                    title="Lock Admin Mode"
                  >
                    <Unlock className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setShowAdminLogin(true);
                    setAdminPasscode('');
                    setErrorMsg('');
                  }}
                  className="px-5 py-2.5 bg-[var(--bg-card)] hover:bg-[var(--bg-page)] text-[var(--text-muted)] hover:text-[var(--text-primary)] rounded-full font-mono text-[11px] font-bold uppercase tracking-wider border border-[var(--text-body)]/10 flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Admin Panel</span>
                </button>
              )}
            </div>
          </div>

          {/* Blog posts list */}
          {filteredPosts.length === 0 ? (
            <div className="text-center py-20 bg-[var(--bg-card)]/40 rounded-xl border border-dashed border-[var(--text-body)]/15">
              <AlertCircle className="w-10 h-10 text-[var(--text-muted)] mx-auto mb-3 opacity-60" />
              <p className="font-display text-[18px] font-semibold text-[var(--text-primary)] mb-1">No reports found</p>
              <p className="text-[13px] text-[var(--text-muted)]">Try switching categories or create a new post in the Admin Panel.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => {
                const isCustom = posts.findIndex(p => p.id === post.id) < posts.length - 3; // custom local storage posts
                return (
                  <article
                    key={post.id}
                    id={`post-${post.id}`}
                    className="flex flex-col justify-between bg-[var(--bg-card)] border border-[var(--text-body)]/12 rounded-xl p-6 hover:shadow-md hover:border-[var(--text-body)]/25 transition-all duration-300 relative group min-h-[340px]"
                  >
                    <div>
                      {/* Meta header */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-mono text-[9px] uppercase tracking-wider text-[var(--text-cream)] bg-[var(--text-primary)] px-2.5 py-1 rounded-md font-bold">
                          {post.category}
                        </span>
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-[10px] text-[var(--text-muted)] font-semibold flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {post.date}
                          </span>
                          {isAdmin && isCustom && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeletePost(post.id);
                              }}
                              className="p-1 text-red-700 hover:text-red-900 transition-colors cursor-pointer"
                              title="Delete custom post"
                            >
                              <Trash className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Title */}
                      <h3 
                        onClick={() => setSelectedPost(post)}
                        className="font-display font-extrabold text-[22px] text-[var(--text-primary)] leading-snug mb-3 cursor-pointer hover:text-[var(--accent-dark)] transition-colors"
                      >
                        {post.title}
                      </h3>

                      {/* Summary */}
                      <p className="text-[13.5px] leading-relaxed text-[var(--text-muted)] line-clamp-4">
                        {post.summary}
                      </p>
                    </div>

                    {/* Footer tags and action */}
                    <div className="mt-6">
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {post.tags?.map((tag: string) => (
                          <span key={tag} className="font-mono text-[9px] text-[var(--text-muted)] bg-[var(--text-primary)]/5 px-2 py-0.5 rounded font-semibold">
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <button
                        onClick={() => setSelectedPost(post)}
                        className="text-[12px] font-bold text-[var(--accent-dark)] hover:text-[var(--text-primary)] flex items-center gap-1 bg-transparent border-none p-0 cursor-pointer transition-colors"
                      >
                        <span>View report details</span>
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

        </div>
      </main>

      <Footer />

      {/* ----------------- ADMIN PASSCODE MODAL ----------------- */}
      {showAdminLogin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-[var(--bg-page)] border border-[var(--text-body)]/20 rounded-xl p-6 max-w-sm w-full shadow-lg relative">
            <button 
              onClick={() => setShowAdminLogin(false)}
              className="absolute top-4 right-4 text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="text-center mb-6">
              <Lock className="w-8 h-8 text-[var(--accent-dark)] mx-auto mb-2" />
              <h3 className="font-display font-extrabold text-[20px] text-[var(--text-primary)]">Admin Unlock</h3>
              <p className="text-[12px] text-[var(--text-muted)] mt-1">Provide passcode to unlock content creator dashboard.</p>
            </div>
            
            <form onSubmit={handleAdminLogin} className="flex flex-col gap-4">
              <div>
                <input 
                  type="password"
                  placeholder="Passcode (e.g. saravana)"
                  value={adminPasscode}
                  onChange={(e) => setAdminPasscode(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[var(--bg-card)] border border-[var(--text-body)]/15 rounded-lg text-[13px] text-[var(--text-primary)] placeholder-[var(--text-muted)]/60 focus:outline-none focus:border-[var(--accent-dark)]"
                  autoFocus
                />
                {errorMsg && <p className="text-[11px] text-red-700 font-semibold mt-1 flex items-center gap-1">⚠️ {errorMsg}</p>}
              </div>
              
              <button 
                type="submit"
                className="w-full py-2.5 bg-[var(--text-primary)] hover:bg-[var(--accent-dark)] text-[var(--text-cream)] font-mono text-[11px] font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
              >
                Unlock Dashboard
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ----------------- COMPOSER / CREATOR MODAL ----------------- */}
      {showCreatorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[var(--bg-page)] border border-[var(--text-body)]/20 rounded-xl p-8 max-w-2xl w-full shadow-lg relative my-8 max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setShowCreatorModal(false)}
              className="absolute top-4 right-4 text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="mb-6">
              <h3 className="font-display font-extrabold text-[24px] text-[var(--text-primary)] flex items-center gap-2">
                <FileText className="w-6 h-6 text-[var(--accent-dark)]" />
                Compose New Report
              </h3>
              <p className="text-[12px] text-[var(--text-muted)] mt-1">Compose case studies or log projects. Save locally to review, then export JSON to embed permanently.</p>
            </div>

            <form onSubmit={handleCreatePost} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Title */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[10px] font-bold text-[var(--text-muted)] uppercase">Report Title *</label>
                  <input 
                    type="text"
                    required
                    placeholder="e.g. Optimizing Picker Travel Times"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[var(--bg-card)] border border-[var(--text-body)]/15 rounded-lg text-[13px] text-[var(--text-primary)] placeholder-[var(--text-muted)]/50 focus:outline-none focus:border-[var(--accent-dark)]"
                  />
                </div>
                
                {/* Category */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[10px] font-bold text-[var(--text-muted)] uppercase">Category</label>
                  <select 
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[var(--bg-card)] border border-[var(--text-body)]/15 rounded-lg text-[13px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-dark)]"
                  >
                    <option value="Operations">Operations</option>
                    <option value="Analytics">Analytics</option>
                    <option value="AI">AI</option>
                    <option value="Projects">Projects</option>
                  </select>
                </div>
              </div>

              {/* Summary */}
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[10px] font-bold text-[var(--text-muted)] uppercase">Executive Summary *</label>
                <input 
                  type="text"
                  required
                  placeholder="One-sentence description of challenge and outcomes..."
                  value={newSummary}
                  onChange={(e) => setNewSummary(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[var(--bg-card)] border border-[var(--text-body)]/15 rounded-lg text-[13px] text-[var(--text-primary)] placeholder-[var(--text-muted)]/50 focus:outline-none focus:border-[var(--accent-dark)]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Tags */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[10px] font-bold text-[var(--text-muted)] uppercase">Tags (comma-separated)</label>
                  <input 
                    type="text"
                    placeholder="e.g. SQL, Power BI, Automation"
                    value={newTags}
                    onChange={(e) => setNewTags(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[var(--bg-card)] border border-[var(--text-body)]/15 rounded-lg text-[13px] text-[var(--text-primary)] placeholder-[var(--text-muted)]/50 focus:outline-none focus:border-[var(--accent-dark)]"
                  />
                </div>

                {/* Cover Image */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[10px] font-bold text-[var(--text-muted)] uppercase">Cover Image (Optional)</label>
                  <input 
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full text-[12px] text-[var(--text-muted)] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[11px] file:font-bold file:bg-[var(--text-primary)]/10 file:text-[var(--text-primary)] hover:file:bg-[var(--text-primary)]/20 file:cursor-pointer"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[10px] font-bold text-[var(--text-muted)] uppercase">Full Report Content (Markdown supported) *</label>
                <textarea 
                  required
                  rows={8}
                  placeholder="### Challenge&#10;Describe bottleneck here...&#10;&#10;### SQL Query / Logic&#10;```sql&#10;SELECT...&#10;```&#10;&#10;### Business Outcome&#10;- Metric 1..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full px-4 py-3 bg-[var(--bg-card)] border border-[var(--text-body)]/15 rounded-lg text-[13.5px] text-[var(--text-primary)] placeholder-[var(--text-muted)]/50 focus:outline-none focus:border-[var(--accent-dark)] font-mono leading-relaxed resize-y"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[var(--text-body)]/12">
                <button
                  type="button"
                  onClick={() => setShowCreatorModal(false)}
                  className="px-5 py-2.5 bg-[var(--bg-card)] hover:bg-[var(--bg-page)] text-[var(--text-muted)] rounded-lg font-mono text-[11px] font-bold uppercase tracking-wider border border-[var(--text-body)]/10 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[var(--accent-dark)] hover:bg-[var(--bg-accent)] text-[var(--text-cream)] rounded-lg font-mono text-[11px] font-bold uppercase tracking-wider shadow-sm transition-colors cursor-pointer"
                >
                  Save Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ----------------- FULL POST DETAILS DIALOG ----------------- */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[var(--bg-page)] border border-[var(--text-body)]/20 rounded-xl p-8 max-w-3xl w-full shadow-lg relative my-8 max-h-[90vh] overflow-y-auto animate-[scaleIn_0.2s_ease-out]">
            {/* Close Button */}
            <button 
              onClick={() => setSelectedPost(null)}
              className="absolute top-5 right-5 p-2 bg-[var(--bg-card)] hover:bg-[var(--bg-page)] text-[var(--text-muted)] hover:text-[var(--text-primary)] rounded-full border border-[var(--text-body)]/10 cursor-pointer transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Post Category & Date */}
            <div className="flex items-center gap-3 mb-4 mt-2">
              <span className="font-mono text-[9px] uppercase tracking-wider text-[var(--text-cream)] bg-[var(--text-primary)] px-2.5 py-1 rounded-md font-bold">
                {selectedPost.category}
              </span>
              <span className="font-mono text-[11px] text-[var(--text-muted)] font-semibold flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {selectedPost.date}
              </span>
            </div>

            {/* Post Title */}
            <h2 className="font-display font-extrabold text-[28px] md:text-[36px] text-[var(--text-primary)] leading-tight mb-4">
              {selectedPost.title}
            </h2>

            {/* Post Tags */}
            <div className="flex flex-wrap gap-1.5 mb-6">
              {selectedPost.tags?.map((tag: string) => (
                <span key={tag} className="font-mono text-[9px] text-[var(--text-muted)] bg-[var(--text-primary)]/5 px-2 py-0.5 rounded font-semibold">
                  #{tag}
                </span>
              ))}
            </div>

            {/* Post Summary */}
            <div className="p-4 bg-[var(--bg-card)] border-l-4 border-[var(--accent-dark)] rounded-r-lg mb-8">
              <p className="font-sans italic text-[14px] leading-relaxed text-[var(--text-body)] font-medium">
                <strong>Executive Summary:</strong> {selectedPost.summary}
              </p>
            </div>

            {/* Base64 Cover image if present */}
            {selectedPost.image && (
              <div className="w-full h-[240px] md:h-[320px] rounded-lg overflow-hidden mb-8 bg-[var(--text-primary)]/5 border border-[var(--text-body)]/10">
                <img 
                  src={selectedPost.image} 
                  alt={selectedPost.title} 
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Markdown Body Content - rendered with basic HTML formatting rules */}
            <div className="prose prose-stone max-w-none text-[var(--text-body)] text-[14.5px] leading-relaxed font-sans mt-4 border-t border-[var(--text-body)]/12 pt-6">
              {selectedPost.content.split('\n').map((paragraph: string, idx: number) => {
                const trimmed = paragraph.trim();
                
                // Headings
                if (trimmed.startsWith('### ')) {
                  return <h4 key={idx} className="font-display font-bold text-[19px] text-[var(--text-primary)] mt-6 mb-3">{trimmed.replace('### ', '')}</h4>;
                }
                if (trimmed.startsWith('## ')) {
                  return <h3 key={idx} className="font-display font-bold text-[22px] text-[var(--text-primary)] mt-8 mb-4">{trimmed.replace('## ', '')}</h3>;
                }
                if (trimmed.startsWith('# ')) {
                  return <h2 key={idx} className="font-display font-bold text-[26px] text-[var(--text-primary)] mt-10 mb-4">{trimmed.replace('# ', '')}</h2>;
                }

                // Bullets
                if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
                  return (
                    <ul key={idx} className="list-disc list-inside ml-4 mb-2 text-[var(--text-body)]">
                      <li>{trimmed.substring(2)}</li>
                    </ul>
                  );
                }

                // Code Blocks
                if (trimmed.startsWith('```')) {
                  return null; // Ignore opening/closing code blocks for simplicity or wrap them below
                }

                // Inline code formatting (simplified)
                if (trimmed.startsWith('SELECT') || trimmed.startsWith('JOIN') || trimmed.startsWith('GROUP BY') || trimmed.startsWith('if ') || trimmed.startsWith('slack.')) {
                  return (
                    <pre key={idx} className="bg-[var(--text-primary)] text-[var(--text-cream)] p-4 rounded-lg font-mono text-[12px] overflow-x-auto leading-relaxed my-4">
                      <code>{paragraph}</code>
                    </pre>
                  );
                }

                // Empty lines
                if (!trimmed) {
                  return <div key={idx} className="h-2" />;
                }

                // Bold text replacements (e.g. **50%**)
                let contentText = paragraph;
                const boldRegex = /\*\*(.*?)\*\*/g;
                let match;
                const elements = [];
                let lastIndex = 0;
                
                while ((match = boldRegex.exec(paragraph)) !== null) {
                  // Add normal text before the bold match
                  if (match.index > lastIndex) {
                    elements.push(paragraph.substring(lastIndex, match.index));
                  }
                  // Add bold text
                  elements.push(<strong key={match.index}>{match[1]}</strong>);
                  lastIndex = boldRegex.lastIndex;
                }
                
                if (lastIndex < paragraph.length) {
                  elements.push(paragraph.substring(lastIndex));
                }

                // Render paragraphs
                return (
                  <p key={idx} className="mb-4">
                    {elements.length > 0 ? elements : paragraph}
                  </p>
                );
              })}
            </div>

            {/* Dialog Action Footer */}
            <div className="flex items-center justify-end gap-3 mt-12 pt-6 border-t border-[var(--text-body)]/12">
              <button
                onClick={() => setSelectedPost(null)}
                className="px-6 py-2.5 bg-[var(--text-primary)] hover:bg-[var(--accent-dark)] text-[var(--text-cream)] rounded-lg font-mono text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Close Report
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
