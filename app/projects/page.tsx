'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { 
  ArrowLeft, Plus, Trash, Download, X, 
  Lock, Unlock, Code, Link2, Sparkles, FolderKanban
} from 'lucide-react';

interface Project {
  meta: string;
  title: string;
  image: string;
  description: string;
  role: string;
  impact: string;
  coreTech: string;
  repo: string;
  id?: string;
}

export default function ProjectsManagerPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  
  // Admin states
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPasscode, setAdminPasscode] = useState('');
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [showCreatorModal, setShowCreatorModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Form states
  const [newTitle, setNewTitle] = useState('');
  const [newMeta, setNewMeta] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newRole, setNewRole] = useState('');
  const [newImpact, setNewImpact] = useState('');
  const [newCoreTech, setNewCoreTech] = useState('');
  const [newRepo, setNewRepo] = useState('');
  const [newImage, setNewImage] = useState('');

  useEffect(() => {
    loadAllProjects();
  }, []);

  const loadAllProjects = () => {
    try {
      const staticProjects = require('@/src/data/projects.json') as Project[];
      const localProjectsRaw = localStorage.getItem('portfolio-projects');
      const localProjects = localProjectsRaw ? JSON.parse(localProjectsRaw) as Project[] : [];
      // Combine: custom local projects first (newest first), then static projects
      setProjects([...localProjects, ...staticProjects]);
    } catch (e) {
      console.error('Failed to load projects', e);
    }
  };

  // Helper to compute SHA-256 hash in client browser
  const sha256 = async (message: string): Promise<string> => {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  };

  // Handle Admin Passcode Login
  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const enteredHash = await sha256(adminPasscode.toLowerCase());
      const targetHash = process.env.NEXT_PUBLIC_ADMIN_PASSCODE_HASH || 'b29f623a3383c2212fce185b5dbe1906c7bf6475e73fb21c188c5e0d2d855e00'; // "saravana"
      const fallbackHash = '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918'; // "admin"

      if (enteredHash === targetHash || enteredHash === fallbackHash) {
        setIsAdmin(true);
        setShowAdminLogin(false);
        setErrorMsg('');
      } else {
        setErrorMsg('Incorrect passcode. Please try again.');
      }
    } catch (err) {
      console.error('Cryptographic hashing failed', err);
      setErrorMsg('Security check failed. Try again.');
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

  // Handle new project creation
  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newDescription || !newMeta || !newCoreTech) {
      alert('Please fill out all required fields.');
      return;
    }

    const newProject: Project = {
      id: Date.now().toString(),
      meta: newMeta,
      title: newTitle,
      image: newImage || '/portfolio_theme.png', // Default placeholder if none selected
      description: newDescription,
      role: newRole || 'Developer / Architect',
      impact: newImpact || 'Successfully integrated dynamic features.',
      coreTech: newCoreTech,
      repo: newRepo || 'https://github.com/mrshrvan7-del'
    };

    const localProjectsRaw = localStorage.getItem('portfolio-projects');
    const localProjects = localProjectsRaw ? JSON.parse(localProjectsRaw) as Project[] : [];
    
    // Add new project at the top (newest first)
    const updatedLocalProjects = [newProject, ...localProjects];
    localStorage.setItem('portfolio-projects', JSON.stringify(updatedLocalProjects));

    // Reset Form
    setNewTitle('');
    setNewMeta('');
    setNewDescription('');
    setNewRole('');
    setNewImpact('');
    setNewCoreTech('');
    setNewRepo('');
    setNewImage('');
    setShowCreatorModal(false);

    loadAllProjects();
  };

  // Delete local custom project
  const handleDeleteProject = (projectId: string) => {
    if (!confirm('Are you sure you want to delete this custom project?')) return;
    
    const localProjectsRaw = localStorage.getItem('portfolio-projects');
    const localProjects = localProjectsRaw ? JSON.parse(localProjectsRaw) as Project[] : [];
    const updatedLocalProjects = localProjects.filter((proj: Project) => proj.id !== projectId);
    
    localStorage.setItem('portfolio-projects', JSON.stringify(updatedLocalProjects));
    loadAllProjects();
  };

  // Export combined project list to projects.json format
  const handleExportDatabase = () => {
    // Strip IDs from the export to keep the production JSON database clean
    const cleanProjects = projects.map(({ id, ...rest }) => rest);
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(cleanProjects, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "projects.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <>
      <Nav />

      <main className="min-h-screen bg-transparent pt-32 pb-24">
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
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h1 className="font-display font-extrabold text-[44px] md:text-[56px] text-[var(--text-primary)] leading-tight mb-4">
                  projects registry<span className="text-[var(--accent-dark)]">.</span>
                </h1>
                <p className="text-[16px] text-[var(--text-muted)] max-w-2xl font-medium leading-relaxed">
                  Interactive portal for adding and reviewing active engineering projects, microservices, and design systems.
                </p>
              </div>

              {/* Creator Controls */}
              <div className="flex items-center gap-3 self-start md:self-auto">
                {isAdmin ? (
                  <>
                    <button
                      onClick={() => setShowCreatorModal(true)}
                      className="px-5 py-2.5 bg-[var(--accent-dark)] hover:bg-[var(--bg-accent)] text-[var(--text-cream)] rounded-full font-mono text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer border-none"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Project</span>
                    </button>
                    <button
                      onClick={handleExportDatabase}
                      className="px-5 py-2.5 bg-[var(--text-primary)] hover:bg-[var(--text-body)] text-[var(--text-cream)] rounded-full font-mono text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer border-none"
                      title="Export database to src/data/projects.json"
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
          </div>

          {/* Projects Dashboard Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((proj, idx) => {
              const isCustom = !!proj.id;
              return (
                <div 
                  key={proj.id || `${proj.title}-${idx}`} 
                  className="bg-[var(--bg-card)] border border-[var(--text-body)]/10 rounded-2xl p-6 md:p-8 flex flex-col justify-between shadow-sm relative group hover:border-[var(--accent-dark)]/40 transition-all duration-300"
                >
                  {/* Delete button for custom browser-stored projects */}
                  {isAdmin && isCustom && (
                    <button
                      onClick={() => handleDeleteProject(proj.id!)}
                      className="absolute top-4 right-4 p-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-full border-none cursor-pointer z-10 transition-colors"
                      title="Delete custom local project"
                    >
                      <Trash className="w-4 h-4" />
                    </button>
                  )}

                  <div>
                    {/* Meta Category label */}
                    <div className="flex items-center gap-2 mb-4 font-mono text-[10px] font-bold text-[var(--accent-dark)] tracking-wider">
                      <span>{proj.meta}</span>
                      {isCustom && (
                        <span className="px-1.5 py-0.5 bg-[var(--bg-page)] text-[var(--text-body)] rounded font-semibold text-[8px] tracking-normal uppercase border border-[var(--text-body)]/5">
                          Local Custom
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="font-display font-extrabold text-[24px] text-[var(--text-primary)] mb-4 leading-tight">
                      {proj.title}
                    </h3>

                    {/* Description */}
                    <p className="text-[14px] text-[var(--text-body)]/90 leading-relaxed mb-6">
                      {proj.description}
                    </p>

                    {/* Details Lists */}
                    <div className="space-y-3.5 border-t border-[var(--text-body)]/5 pt-5 mb-6">
                      <div className="text-[13px] leading-relaxed">
                        <strong className="font-mono text-[9px] font-bold uppercase text-[var(--text-muted)] block tracking-wider mb-0.5">Role &amp; Responsibilities</strong>
                        <span className="text-[var(--text-body)]">{proj.role}</span>
                      </div>
                      <div className="text-[13px] leading-relaxed">
                        <strong className="font-mono text-[9px] font-bold uppercase text-[var(--text-muted)] block tracking-wider mb-0.5">Product Impact</strong>
                        <span className="text-[var(--text-body)]">{proj.impact}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer tech and links */}
                  <div className="border-t border-[var(--text-body)]/5 pt-5 mt-auto">
                    <div className="flex items-center gap-1.5 flex-wrap mb-4">
                      {proj.coreTech.split(' · ').map((tech, tIdx) => (
                        <span 
                          key={tIdx} 
                          className="px-2.5 py-1 bg-[var(--bg-page)] text-[var(--text-body)] font-mono text-[10px] font-semibold rounded-md border border-[var(--text-body)]/5"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <a 
                      href={proj.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[12px] font-mono font-bold text-[var(--accent-dark)] hover:underline no-underline"
                    >
                      <Link2 className="w-4 h-4" />
                      <span>Code Repository</span>
                    </a>
                  </div>
                </div>
              );
            })}

            {projects.length === 0 && (
              <div className="col-span-full py-16 text-center border border-dashed border-[var(--text-body)]/10 rounded-2xl">
                <FolderKanban className="w-12 h-12 text-[var(--accent-dark)] mx-auto mb-3 opacity-40" />
                <p className="text-[14px] text-[var(--text-muted)] font-medium">No projects registered in the database.</p>
              </div>
            )}
          </div>

        </div>
      </main>

      <Footer />

      {/* ----------------- ADMIN PASSCODE MODAL ----------------- */}
      {showAdminLogin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-[var(--bg-page)] border border-[var(--text-body)]/20 rounded-xl p-6 max-w-sm w-full shadow-lg relative">
            <button 
              onClick={() => setShowAdminLogin(false)}
              className="absolute top-4 right-4 text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer bg-transparent border-none"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="text-center mb-6">
              <Lock className="w-8 h-8 text-[var(--accent-dark)] mx-auto mb-2" />
              <h3 className="font-display font-extrabold text-[20px] text-[var(--text-primary)]">Admin Unlock</h3>
              <p className="text-[12px] text-[var(--text-muted)] mt-1">Provide passcode to unlock projects management dashboard.</p>
            </div>
            
            <form onSubmit={handleAdminLogin} className="flex flex-col gap-4">
              <div>
                <input 
                  type="password"
                  placeholder="Enter Passcode"
                  value={adminPasscode}
                  onChange={(e) => setAdminPasscode(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[var(--bg-card)] border border-[var(--text-body)]/15 rounded-lg text-[13px] text-[var(--text-primary)] placeholder-[var(--text-muted)]/60 focus:outline-none focus:border-[var(--accent-dark)]"
                  autoFocus
                />
                {errorMsg && <p className="text-[11px] text-red-700 font-semibold mt-1 flex items-center gap-1">⚠️ {errorMsg}</p>}
              </div>
              
              <button 
                type="submit"
                className="w-full py-2.5 bg-[var(--text-primary)] hover:bg-[var(--accent-dark)] text-[var(--text-cream)] font-mono text-[11px] font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer border-none"
              >
                Unlock Dashboard
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ----------------- PROJECT CREATOR MODAL ----------------- */}
      {showCreatorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[var(--bg-page)] border border-[var(--text-body)]/20 rounded-xl p-6 md:p-8 max-w-lg w-full shadow-lg relative my-8">
            <button 
              onClick={() => setShowCreatorModal(false)}
              className="absolute top-4 right-4 text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer bg-transparent border-none"
            >
              <X className="w-4 h-4" />
            </button>
            
            <div className="mb-6 flex items-center gap-2">
              <FolderKanban className="w-6 h-6 text-[var(--accent-dark)]" />
              <h3 className="font-display font-extrabold text-[22px] text-[var(--text-primary)]">Add New Project</h3>
            </div>

            <form onSubmit={handleCreateProject} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-mono text-[10px] font-bold text-[var(--text-muted)] uppercase block mb-1.5">Project Title *</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Colide"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full px-3 py-2 bg-[var(--bg-card)] border border-[var(--text-body)]/15 rounded-lg text-[13px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-dark)]"
                    required
                  />
                </div>
                <div>
                  <label className="font-mono text-[10px] font-bold text-[var(--text-muted)] uppercase block mb-1.5">Meta / Category *</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 06 / MACHINE LEARNING"
                    value={newMeta}
                    onChange={(e) => setNewMeta(e.target.value)}
                    className="w-full px-3 py-2 bg-[var(--bg-card)] border border-[var(--text-body)]/15 rounded-lg text-[13px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-dark)]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="font-mono text-[10px] font-bold text-[var(--text-muted)] uppercase block mb-1.5">Description *</label>
                <textarea 
                  placeholder="Summarize the core functionality and scope of the project..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full h-20 px-3 py-2 bg-[var(--bg-card)] border border-[var(--text-body)]/15 rounded-lg text-[13px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-dark)] resize-none"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-mono text-[10px] font-bold text-[var(--text-muted)] uppercase block mb-1.5">Your Role</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Lead Engineer"
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    className="w-full px-3 py-2 bg-[var(--bg-card)] border border-[var(--text-body)]/15 rounded-lg text-[13px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-dark)]"
                  />
                </div>
                <div>
                  <label className="font-mono text-[10px] font-bold text-[var(--text-muted)] uppercase block mb-1.5">Product Impact</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Optimized response latency by 35%."
                    value={newImpact}
                    onChange={(e) => setNewImpact(e.target.value)}
                    className="w-full px-3 py-2 bg-[var(--bg-card)] border border-[var(--text-body)]/15 rounded-lg text-[13px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-dark)]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-mono text-[10px] font-bold text-[var(--text-muted)] uppercase block mb-1.5">Technologies *</label>
                  <input 
                    type="text" 
                    placeholder="e.g. React · Go · Kafka"
                    value={newCoreTech}
                    onChange={(e) => setNewCoreTech(e.target.value)}
                    className="w-full px-3 py-2 bg-[var(--bg-card)] border border-[var(--text-body)]/15 rounded-lg text-[13px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-dark)]"
                    required
                  />
                </div>
                <div>
                  <label className="font-mono text-[10px] font-bold text-[var(--text-muted)] uppercase block mb-1.5">Repository URL</label>
                  <input 
                    type="url" 
                    placeholder="e.g. https://github.com/..."
                    value={newRepo}
                    onChange={(e) => setNewRepo(e.target.value)}
                    className="w-full px-3 py-2 bg-[var(--bg-card)] border border-[var(--text-body)]/15 rounded-lg text-[13px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-dark)]"
                  />
                </div>
              </div>

              <div>
                <label className="font-mono text-[10px] font-bold text-[var(--text-muted)] uppercase block mb-1.5">Cover Image (Optional)</label>
                <div className="flex items-center gap-3">
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full text-[12px] text-[var(--text-muted)] file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-none file:text-[10px] file:font-mono file:font-bold file:uppercase file:bg-[var(--text-primary)] file:text-[var(--text-cream)] file:cursor-pointer hover:file:bg-[var(--accent-dark)]"
                  />
                  {newImage && (
                    <img 
                      src={newImage} 
                      alt="Thumbnail preview" 
                      className="w-10 h-10 object-cover rounded-md border border-[var(--text-body)]/10"
                    />
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-[var(--text-body)]/5 flex justify-end gap-3">
                <button 
                  type="button"
                  onClick={() => setShowCreatorModal(false)}
                  className="px-5 py-2.5 bg-transparent hover:bg-[var(--text-body)]/5 text-[var(--text-muted)] rounded-lg font-mono text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer border border-[var(--text-body)]/10"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-5 py-2.5 bg-[var(--text-primary)] hover:bg-[var(--accent-dark)] text-[var(--text-cream)] rounded-lg font-mono text-[11px] font-bold uppercase tracking-wider shadow-sm transition-colors cursor-pointer border-none flex items-center gap-1.5"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Create Project</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}