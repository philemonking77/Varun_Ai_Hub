import { useState } from 'react';
import {
  Package, Search, Layout, Type, Image as ImageIcon,
  Play, ShoppingCart, MessageSquare, HelpCircle, Navigation,
  Star, Mail, Globe, ChevronRight, Plus, Eye
} from 'lucide-react';

interface Component {
  id: string;
  name: string;
  category: string;
  icon: any;
  tags: string[];
  preview: string;
  popular?: boolean;
}

const COMPONENTS: Component[] = [
  { id: 'heading', name: 'Heading', category: 'Text', icon: Type, tags: ['text', 'title'], preview: 'h1-h6', popular: true },
  { id: 'paragraph', name: 'Paragraph', category: 'Text', icon: Type, tags: ['text', 'body'], preview: 'text' },
  { id: 'button', name: 'Button', category: 'UI', icon: ChevronRight, tags: ['cta', 'action'], preview: 'btn', popular: true },
  { id: 'image', name: 'Image', category: 'Media', icon: ImageIcon, tags: ['photo', 'media'], preview: 'img' },
  { id: 'video', name: 'Video', category: 'Media', icon: Play, tags: ['video', 'media'], preview: 'video' },
  { id: 'hero', name: 'Hero Section', category: 'Sections', icon: Layout, tags: ['hero', 'banner'], preview: 'hero', popular: true },
  { id: 'features', name: 'Features', category: 'Sections', icon: Star, tags: ['features', 'benefits'], preview: 'features', popular: true },
  { id: 'pricing', name: 'Pricing', category: 'Sections', icon: ShoppingCart, tags: ['pricing', 'plans'], preview: 'pricing', popular: true },
  { id: 'testimonials', name: 'Testimonials', category: 'Sections', icon: MessageSquare, tags: ['reviews', 'social proof'], preview: 'testimonials' },
  { id: 'contact', name: 'Contact Form', category: 'Sections', icon: Mail, tags: ['contact', 'form'], preview: 'contact' },
  { id: 'faq', name: 'FAQ', category: 'Sections', icon: HelpCircle, tags: ['faq', 'questions'], preview: 'faq' },
  { id: 'navbar', name: 'Navbar', category: 'Layout', icon: Navigation, tags: ['nav', 'header'], preview: 'nav', popular: true },
  { id: 'footer', name: 'Footer', category: 'Layout', icon: Layout, tags: ['footer', 'bottom'], preview: 'footer', popular: true },
  { id: 'gallery', name: 'Gallery', category: 'Media', icon: ImageIcon, tags: ['gallery', 'photos'], preview: 'gallery' },
  { id: 'social', name: 'Social Icons', category: 'UI', icon: Globe, tags: ['social', 'icons'], preview: 'social' },
];

const CATEGORIES = ['All', 'Layout', 'Sections', 'Text', 'UI', 'Media'];

const PREVIEW_MOCKUPS: Record<string, JSX.Element> = {
  hero: (
    <div className="bg-gradient-to-br from-slate-900 to-blue-950 p-4 text-center">
      <div className="w-3/4 h-3 bg-white/20 rounded mx-auto mb-2" />
      <div className="w-1/2 h-2 bg-white/10 rounded mx-auto mb-3" />
      <div className="flex justify-center gap-2">
        <div className="w-16 h-6 bg-blue-500/60 rounded-md" />
        <div className="w-16 h-6 border border-blue-400/30 rounded-md" />
      </div>
    </div>
  ),
  features: (
    <div className="bg-slate-900 p-3">
      <div className="grid grid-cols-3 gap-2">
        {[1, 2, 3].map((n) => (
          <div key={n} className="bg-slate-800 rounded-lg p-2">
            <div className="w-4 h-4 bg-blue-500/40 rounded mb-1" />
            <div className="w-full h-1.5 bg-white/10 rounded mb-1" />
            <div className="w-2/3 h-1 bg-white/5 rounded" />
          </div>
        ))}
      </div>
    </div>
  ),
  pricing: (
    <div className="bg-slate-900 p-3 grid grid-cols-3 gap-2">
      {[1, 2, 3].map((n) => (
        <div key={n} className={`rounded-lg p-2 border ${n === 2 ? 'border-blue-500/50 bg-blue-950' : 'border-slate-700'}`}>
          <div className="w-full h-1.5 bg-white/20 rounded mb-1" />
          <div className="w-2/3 h-3 bg-white/10 rounded mb-2" />
          <div className="w-full h-4 bg-blue-500/40 rounded" />
        </div>
      ))}
    </div>
  ),
  nav: (
    <div className="bg-slate-800 px-4 py-2 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 bg-blue-500/60 rounded" />
        <div className="w-16 h-2 bg-white/20 rounded" />
      </div>
      <div className="flex gap-2">
        {[1, 2, 3].map((n) => (
          <div key={n} className="w-10 h-1.5 bg-white/10 rounded" />
        ))}
      </div>
    </div>
  ),
  footer: (
    <div className="bg-slate-900 p-3 border-t border-white/10">
      <div className="grid grid-cols-3 gap-3">
        {[1, 2, 3].map((n) => (
          <div key={n} className="space-y-1">
            <div className="w-12 h-2 bg-white/20 rounded" />
            {[1, 2, 3].map((j) => (
              <div key={j} className="w-16 h-1.5 bg-white/8 rounded" />
            ))}
          </div>
        ))}
      </div>
    </div>
  ),
  default: (
    <div className="bg-slate-900 p-4 flex items-center justify-center">
      <div className="w-3/4 h-8 bg-slate-700 rounded-lg" />
    </div>
  ),
};

export default function ComponentsLibrary() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [, setHoveredId] = useState<string | null>(null);

  const filtered = COMPONENTS.filter((c) => {
    const matchCat = category === 'All' || c.category === category;
    const matchSearch = !search || c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.tags.some((t) => t.includes(search.toLowerCase()));
    return matchCat && matchSearch;
  });

  const popular = COMPONENTS.filter((c) => c.popular);

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-slide-up">
          <div className="flex items-center gap-3 mb-3">
            <Package size={24} className="text-blue-400" />
            <h1 className="font-display font-bold text-4xl text-white">
              <span className="gradient-text">Components</span> Library
            </h1>
          </div>
          <p className="text-slate-400">Pre-built UI components ready to drag into your design</p>
        </div>

        {/* Search + Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <div className="relative flex-1 max-w-xs">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search components..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field pl-9 text-sm"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`text-sm px-3 py-1.5 rounded-lg transition-all ${
                  category === cat ? 'tab-active border' : 'text-slate-400 hover:text-white border border-transparent hover:border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Popular section */}
        {!search && category === 'All' && (
          <div className="mb-8">
            <h2 className="font-semibold text-slate-300 text-sm mb-3 flex items-center gap-2">
              <Star size={14} className="text-yellow-400" />
              Popular Components
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {popular.map((comp) => {
                const Icon = comp.icon;
                return (
                  <div
                    key={comp.id}
                    className="card p-3 cursor-pointer group"
                    onMouseEnter={() => setHoveredId(comp.id)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    <div className="rounded-lg overflow-hidden mb-2 bg-surface-800">
                      {PREVIEW_MOCKUPS[comp.preview] || PREVIEW_MOCKUPS.default}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Icon size={13} className="text-blue-400 flex-shrink-0" />
                      <span className="text-xs text-slate-300 font-medium">{comp.name}</span>
                    </div>
                    <div className="hidden group-hover:flex gap-1 mt-2">
                      <button className="flex-1 text-xs py-1 rounded bg-blue-500/15 text-blue-400 hover:bg-blue-500/25 transition-all flex items-center justify-center gap-1">
                        <Plus size={11} />Add
                      </button>
                      <button className="p-1 rounded bg-white/5 text-slate-400 hover:text-white transition-all">
                        <Eye size={11} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* All components grid */}
        <div>
          <h2 className="font-semibold text-slate-300 text-sm mb-3">
            {filtered.length} component{filtered.length !== 1 ? 's' : ''}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((comp) => {
              const Icon = comp.icon;
              return (
                <div
                  key={comp.id}
                  className="card overflow-hidden cursor-pointer group"
                  onMouseEnter={() => setHoveredId(comp.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  {/* Preview */}
                  <div className="border-b border-blue-900/20 overflow-hidden bg-surface-800">
                    {PREVIEW_MOCKUPS[comp.preview] || PREVIEW_MOCKUPS.default}
                  </div>

                  {/* Info */}
                  <div className="p-3">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <Icon size={14} className="text-blue-400" />
                        <span className="text-sm font-semibold text-white">{comp.name}</span>
                      </div>
                      {comp.popular && (
                        <span className="badge badge-cyan text-xs">Popular</span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {comp.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="text-xs text-slate-500 bg-white/4 px-1.5 py-0.5 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <button className="flex-1 btn-secondary text-xs py-1.5 flex items-center justify-center gap-1.5">
                        <Plus size={12} />Add to Page
                      </button>
                      <button className="p-1.5 rounded-lg border border-white/10 text-slate-400 hover:text-white hover:border-white/20 transition-all">
                        <Eye size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
