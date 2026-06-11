import { useState } from 'react';
import {
  FolderOpen, Plus, Search, Zap, Code2, MousePointer2, Upload, MessageSquare,
  MoreVertical, Edit, Trash2, ExternalLink, Download, Clock
} from 'lucide-react';
import type { ViewType } from '../types';

interface Props {
  onNavigate: (view: ViewType) => void;
}

const MOCK_PROJECTS = [
  { id: '1', name: 'TechStartup Landing', mode: 'instant-ai', status: 'published', updated: '2h ago', created: 'Jun 5, 2026', thumb: 'from-blue-900 to-slate-900', accent: '#3b82f6' },
  { id: '2', name: 'My Portfolio', mode: 'drag-drop', status: 'draft', updated: '1d ago', created: 'Jun 3, 2026', thumb: 'from-slate-900 to-gray-900', accent: '#10b981' },
  { id: '3', name: 'E-Shop Store', mode: 'ai-guided', status: 'published', updated: '3d ago', created: 'May 30, 2026', thumb: 'from-white to-slate-100', accent: '#6366f1' },
  { id: '4', name: 'Dev Blog', mode: 'developer', status: 'draft', updated: '5d ago', created: 'May 25, 2026', thumb: 'from-slate-950 to-blue-950', accent: '#0ea5e9' },
];

const MODE_CONFIG: Record<string, { label: string; icon: any; color: string }> = {
  'instant-ai': { label: 'Instant AI', icon: Zap, color: 'text-blue-400' },
  'ai-guided': { label: 'AI Guided', icon: MessageSquare, color: 'text-cyan-400' },
  'drag-drop': { label: 'Drag & Drop', icon: MousePointer2, color: 'text-sky-400' },
  'developer': { label: 'Developer', icon: Code2, color: 'text-indigo-400' },
  'import-edit': { label: 'Import', icon: Upload, color: 'text-teal-400' },
};

type SortBy = 'updated' | 'created' | 'name';

export default function ProjectManager({ onNavigate }: Props) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [sortBy, setSortBy] = useState<SortBy>('updated');
  const [menuId, setMenuId] = useState<string | null>(null);
  const [projects, setProjects] = useState(MOCK_PROJECTS);

  const filtered = projects.filter((p) => {
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || p.status === filter;
    return matchSearch && matchFilter;
  });

  const deleteProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
    setMenuId(null);
  };

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <FolderOpen size={24} className="text-blue-400" />
              <h1 className="font-display font-bold text-4xl text-white">My <span className="gradient-text">Projects</span></h1>
            </div>
            <p className="text-slate-400">{projects.length} project{projects.length !== 1 ? 's' : ''} created</p>
          </div>
          <button
            onClick={() => onNavigate('dashboard')}
            className="btn-primary flex items-center gap-2"
          >
            <Plus size={18} />
            New Project
          </button>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="relative flex-1 max-w-xs">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field pl-9 text-sm"
            />
          </div>
          <div className="flex gap-2">
            {(['all', 'published', 'draft'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`text-xs px-3 py-1.5 rounded-lg capitalize transition-all ${
                  filter === f ? 'tab-active border' : 'text-slate-400 hover:text-white border border-transparent hover:border-white/10'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="ml-auto">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortBy)}
              className="select-field text-sm py-2"
            >
              <option value="updated">Last updated</option>
              <option value="created">Date created</option>
              <option value="name">Name</option>
            </select>
          </div>
        </div>

        {/* Projects grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {/* New project card */}
            <button
              onClick={() => onNavigate('dashboard')}
              className="card border-dashed border-2 border-blue-900/30 hover:border-blue-500/40 flex flex-col items-center justify-center p-8 gap-3 min-h-[200px] group"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-all">
                <Plus size={24} className="text-blue-400" />
              </div>
              <div className="text-center">
                <div className="text-sm font-semibold text-slate-300 group-hover:text-white">New Project</div>
                <div className="text-xs text-slate-500">Start building</div>
              </div>
            </button>

            {filtered.map((p) => {
              const modeConf = MODE_CONFIG[p.mode];
              const ModeIcon = modeConf?.icon || Zap;
              return (
                <div key={p.id} className="card overflow-hidden group">
                  {/* Thumbnail */}
                  <div className={`h-36 bg-gradient-to-br ${p.thumb} relative overflow-hidden`}>
                    <div className="absolute inset-0 p-2">
                      <div className="h-4 rounded flex items-center px-1.5 mb-1.5" style={{ background: 'rgba(255,255,255,0.05)' }}>
                        <div className="w-2.5 h-2.5 rounded mr-1.5" style={{ background: p.accent }} />
                        <div className="flex-1 h-1 rounded" style={{ background: 'rgba(255,255,255,0.1)' }} />
                      </div>
                      <div className="mt-2">
                        <div className="h-2 rounded w-2/3 mb-1.5" style={{ background: 'rgba(255,255,255,0.2)' }} />
                        <div className="h-1.5 rounded w-1/2" style={{ background: 'rgba(255,255,255,0.1)' }} />
                        <div className="h-5 rounded-md w-16 mt-2" style={{ background: p.accent, opacity: 0.7 }} />
                      </div>
                    </div>

                    {/* Status */}
                    <div className="absolute top-2 right-2">
                      <span className={`badge text-xs ${p.status === 'published' ? 'badge-green' : 'badge-blue'}`}>
                        {p.status}
                      </span>
                    </div>

                    {/* Hover actions */}
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="btn-secondary text-xs py-1.5 px-2.5 flex items-center gap-1">
                        <ExternalLink size={12} />Open
                      </button>
                      <button
                        onClick={() => onNavigate('visual-editor')}
                        className="btn-primary text-xs py-1.5 px-2.5 flex items-center gap-1"
                      >
                        <Edit size={12} />Edit
                      </button>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-white text-sm truncate">{p.name}</h3>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <ModeIcon size={12} className={modeConf?.color || 'text-blue-400'} />
                          <span className="text-xs text-slate-500">{modeConf?.label}</span>
                        </div>
                      </div>
                      <div className="relative">
                        <button
                          onClick={() => setMenuId(menuId === p.id ? null : p.id)}
                          className="p-1 rounded text-slate-500 hover:text-slate-300 hover:bg-white/8 transition-all"
                        >
                          <MoreVertical size={14} />
                        </button>
                        {menuId === p.id && (
                          <div className="absolute right-0 top-full mt-1 w-36 glass rounded-xl shadow-2xl py-1 border border-blue-900/30 z-10 animate-fade-in">
                            {[
                              { icon: Edit, label: 'Edit', action: () => { onNavigate('visual-editor'); setMenuId(null); } },
                              { icon: Download, label: 'Export', action: () => setMenuId(null) },
                              { icon: ExternalLink, label: 'Preview', action: () => setMenuId(null) },
                              { icon: Trash2, label: 'Delete', action: () => deleteProject(p.id), danger: true },
                            ].map(({ icon: Icon, label, action, danger }) => (
                              <button
                                key={label}
                                onClick={action}
                                className={`w-full text-left flex items-center gap-2 px-3 py-2 text-xs transition-all hover:bg-white/5 ${danger ? 'text-red-400 hover:text-red-300' : 'text-slate-300 hover:text-white'}`}
                              >
                                <Icon size={12} />{label}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 mt-2 text-xs text-slate-600">
                      <Clock size={11} />
                      <span>Updated {p.updated}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <FolderOpen size={48} className="text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-400 mb-2">No projects found</h3>
            <p className="text-slate-500 text-sm mb-4">
              {search ? 'Try a different search term' : 'Start creating your first website'}
            </p>
            <button onClick={() => onNavigate('dashboard')} className="btn-primary flex items-center gap-2 mx-auto">
              <Plus size={16} />Create Project
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
