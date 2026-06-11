import { useState } from 'react';
import { Grid3X3, Search, Eye, Zap, Star, Filter } from 'lucide-react';
import type { ViewType } from '../types';

interface Props {
  onNavigate: (view: ViewType) => void;
}

const TEMPLATES = [
  { id: '1', name: 'SaaS Landing Pro', category: 'SaaS', tags: ['dark', 'modern', 'animated'], rating: 4.9, uses: 2341, color: 'from-blue-900 to-slate-900', accent: '#3b82f6' },
  { id: '2', name: 'Creative Portfolio', category: 'Portfolio', tags: ['minimal', 'clean'], rating: 4.8, uses: 1876, color: 'from-slate-900 to-gray-900', accent: '#10b981' },
  { id: '3', name: 'E-Commerce Store', category: 'E-Commerce', tags: ['light', 'bold'], rating: 4.7, uses: 3210, color: 'from-white to-slate-100', accent: '#6366f1', light: true },
  { id: '4', name: 'Tech Startup', category: 'Business', tags: ['dark', 'futuristic'], rating: 4.9, uses: 1543, color: 'from-slate-950 to-blue-950', accent: '#0ea5e9' },
  { id: '5', name: 'Restaurant Premium', category: 'Food', tags: ['warm', 'elegant'], rating: 4.6, uses: 987, color: 'from-amber-950 to-stone-900', accent: '#d97706' },
  { id: '6', name: 'Agency Bold', category: 'Agency', tags: ['bold', 'colorful'], rating: 4.8, uses: 1234, color: 'from-violet-950 to-slate-900', accent: '#8b5cf6' },
  { id: '7', name: 'Blog Modern', category: 'Blog', tags: ['minimal', 'light'], rating: 4.5, uses: 765, color: 'from-white to-blue-50', accent: '#2563eb', light: true },
  { id: '8', name: 'NFT/Crypto Platform', category: 'Web3', tags: ['dark', 'neon'], rating: 4.9, uses: 2100, color: 'from-slate-950 to-cyan-950', accent: '#22d3ee' },
  { id: '9', name: 'Healthcare Clinic', category: 'Health', tags: ['clean', 'professional'], rating: 4.7, uses: 654, color: 'from-white to-teal-50', accent: '#0d9488', light: true },
  { id: '10', name: 'Music Artist', category: 'Creative', tags: ['dark', 'dynamic'], rating: 4.8, uses: 1432, color: 'from-gray-950 to-rose-950', accent: '#f43f5e' },
  { id: '11', name: 'Real Estate', category: 'Business', tags: ['light', 'luxurious'], rating: 4.6, uses: 543, color: 'from-white to-stone-100', accent: '#92400e', light: true },
  { id: '12', name: 'Fitness App', category: 'Health', tags: ['dark', 'energetic'], rating: 4.7, uses: 876, color: 'from-slate-950 to-orange-950', accent: '#f97316' },
];

const CATEGORIES = ['All', 'SaaS', 'Portfolio', 'E-Commerce', 'Business', 'Agency', 'Blog', 'Food', 'Web3', 'Health', 'Creative'];

export default function TemplatesGallery({ onNavigate }: Props) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const filtered = TEMPLATES.filter((t) => {
    const matchCat = category === 'All' || t.category === category;
    const matchSearch = !search || t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.category.toLowerCase().includes(search.toLowerCase()) ||
      t.tags.some((tag) => tag.includes(search.toLowerCase()));
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-slide-up">
          <div className="flex items-center gap-3 mb-3">
            <Grid3X3 size={24} className="text-blue-400" />
            <h1 className="font-display font-bold text-4xl text-white">
              Design <span className="gradient-text">Templates</span>
            </h1>
          </div>
          <p className="text-slate-400">Professional templates ready to customize with AI</p>
        </div>

        {/* Search + Filter */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="relative flex-1 max-w-xs">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search templates..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field pl-9 text-sm"
            />
          </div>
          <div className="flex gap-1 flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`text-xs px-3 py-1.5 rounded-lg transition-all ${
                  category === cat ? 'tab-active border' : 'text-slate-400 hover:text-white border border-transparent hover:border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Templates grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((template) => (
            <div
              key={template.id}
              className="card overflow-hidden cursor-pointer group"
              onMouseEnter={() => setHoveredId(template.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Preview */}
              <div className={`h-44 bg-gradient-to-br ${template.color} relative overflow-hidden`}>
                {/* Mock website layout */}
                <div className="absolute inset-0 p-3">
                  <div className="h-5 rounded flex items-center px-2 mb-2" style={{ background: 'rgba(255,255,255,0.05)' }}>
                    <div className="w-3 h-3 rounded mr-2" style={{ background: template.accent }} />
                    <div className="h-1.5 w-12 rounded" style={{ background: 'rgba(255,255,255,0.2)' }} />
                    <div className="ml-auto flex gap-1.5">
                      {[1,2,3].map(n => <div key={n} className="w-6 h-1 rounded" style={{ background: 'rgba(255,255,255,0.15)' }} />)}
                    </div>
                  </div>
                  <div className="flex-1 mt-2">
                    <div className="h-3 rounded w-3/4 mb-1.5" style={{ background: template.light ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.3)' }} />
                    <div className="h-2 rounded w-1/2 mb-3" style={{ background: template.light ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.15)' }} />
                    <div className="flex gap-1.5">
                      <div className="h-6 w-16 rounded-md" style={{ background: template.accent }} />
                      <div className="h-6 w-16 rounded-md border" style={{ border: `1px solid ${template.accent}50` }} />
                    </div>
                    <div className="grid grid-cols-3 gap-1.5 mt-3">
                      {[1,2,3].map(n => (
                        <div key={n} className="h-8 rounded" style={{ background: template.light ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.04)' }}>
                          <div className="h-2 w-3 m-1 rounded" style={{ background: template.accent, opacity: 0.5 }} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Hover overlay */}
                <div className={`absolute inset-0 bg-black/60 flex items-center justify-center gap-2 transition-opacity duration-200 ${hoveredId === template.id ? 'opacity-100' : 'opacity-0'}`}>
                  <button className="btn-secondary text-xs py-2 px-3 flex items-center gap-1.5">
                    <Eye size={13} />Preview
                  </button>
                  <button
                    onClick={() => onNavigate('instant-ai')}
                    className="btn-primary text-xs py-2 px-3 flex items-center gap-1.5"
                  >
                    <Zap size={13} />Use
                  </button>
                </div>

                {/* Category badge */}
                <div className="absolute top-2 left-2">
                  <span className="badge badge-blue text-xs">{template.category}</span>
                </div>
              </div>

              {/* Info */}
              <div className="p-3">
                <div className="flex items-center justify-between mb-1.5">
                  <h3 className="font-semibold text-white text-sm">{template.name}</h3>
                  <div className="flex items-center gap-1">
                    <Star size={11} className="text-yellow-400 fill-yellow-400" />
                    <span className="text-xs text-slate-400">{template.rating}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {template.tags.map((tag) => (
                      <span key={tag} className="text-xs text-slate-500 bg-white/4 px-1.5 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs text-slate-500">{template.uses.toLocaleString()} uses</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <Filter size={40} className="text-slate-600 mx-auto mb-3" />
            <p className="text-slate-400">No templates match your search</p>
            <button onClick={() => { setSearch(''); setCategory('All'); }} className="btn-secondary text-sm mt-3">
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
