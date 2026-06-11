import {
  Zap, MessageSquare, MousePointer2, Code2, Upload,
  ArrowRight, LayoutDashboard, FolderOpen, Palette, Package, Grid3X3
} from 'lucide-react';
import type { ViewType } from '../types';

interface DashboardProps {
  onNavigate: (view: ViewType) => void;
}

const modes = [
  {
    id: 'instant-ai' as ViewType,
    icon: Zap,
    title: 'Instant AI Mode',
    description: 'Enter a prompt and get a complete website generated instantly. Perfect for beginners.',
    badge: 'Fastest',
    badgeClass: 'badge-green',
    gradient: 'from-blue-600/20 to-cyan-500/10',
    iconColor: 'text-blue-400',
    iconBg: 'bg-blue-500/10',
    features: ['AI-generated content', 'Auto layout', 'Instant preview'],
    accent: 'border-blue-500/30',
  },
  {
    id: 'ai-guided' as ViewType,
    icon: MessageSquare,
    title: 'AI Guided Mode',
    description: 'Answer simple questions step-by-step and let AI build your perfect website.',
    badge: 'Recommended',
    badgeClass: 'badge-blue',
    gradient: 'from-cyan-600/20 to-blue-500/10',
    iconColor: 'text-cyan-400',
    iconBg: 'bg-cyan-500/10',
    features: ['Step-by-step wizard', 'Smart suggestions', 'Full customization'],
    accent: 'border-cyan-500/30',
  },
  {
    id: 'drag-drop' as ViewType,
    icon: MousePointer2,
    title: 'Drag & Drop Builder',
    description: 'Visually build your website by dragging and dropping components onto the canvas.',
    badge: 'Visual',
    badgeClass: 'badge-cyan',
    gradient: 'from-sky-600/20 to-blue-500/10',
    iconColor: 'text-sky-400',
    iconBg: 'bg-sky-500/10',
    features: ['Visual editing', 'Component library', 'Real-time preview'],
    accent: 'border-sky-500/30',
  },
  {
    id: 'developer' as ViewType,
    icon: Code2,
    title: 'Developer Mode',
    description: 'Full-featured code editor with file explorer, live preview, and AI code assistant.',
    badge: 'Pro',
    badgeClass: 'badge-blue',
    gradient: 'from-indigo-600/20 to-blue-500/10',
    iconColor: 'text-indigo-400',
    iconBg: 'bg-indigo-500/10',
    features: ['Code editor', 'File explorer', 'AI code assist'],
    accent: 'border-indigo-500/30',
  },
  {
    id: 'import-edit' as ViewType,
    icon: Upload,
    title: 'Import & Edit Mode',
    description: 'Upload your existing HTML, CSS, JavaScript, React projects or ZIP files and edit them.',
    badge: 'Import',
    badgeClass: 'badge-cyan',
    gradient: 'from-teal-600/20 to-cyan-500/10',
    iconColor: 'text-teal-400',
    iconBg: 'bg-teal-500/10',
    features: ['Upload ZIP/HTML', 'Edit any project', 'React support'],
    accent: 'border-teal-500/30',
  },
];

const quickActions = [
  { icon: Palette, label: 'Design Studio', view: 'design-studio' as ViewType, color: 'text-purple-400' },
  { icon: Package, label: 'Components', view: 'components' as ViewType, color: 'text-blue-400' },
  { icon: Grid3X3, label: 'Templates', view: 'templates' as ViewType, color: 'text-cyan-400' },
  { icon: FolderOpen, label: 'My Projects', view: 'projects' as ViewType, color: 'text-green-400' },
];

export default function Dashboard({ onNavigate }: DashboardProps) {
  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10 animate-slide-up">
          <div className="flex items-center gap-3 mb-3">
            <LayoutDashboard size={24} className="text-blue-400" />
            <span className="badge badge-blue">Dashboard</span>
          </div>
          <h1 className="font-display font-bold text-4xl lg:text-5xl text-white mb-3">
            Choose Your <span className="gradient-text">Build Mode</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl">
            Select the method that fits your workflow. From instant AI to professional code editor.
          </p>
        </div>

        {/* Mode Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
          {modes.map((mode, i) => {
            const Icon = mode.icon;
            return (
              <div
                key={mode.id}
                className={`mode-card p-6 ${i === 0 ? 'md:col-span-2 xl:col-span-1' : ''}`}
                style={{ animationDelay: `${i * 0.05}s` }}
                onClick={() => onNavigate(mode.id)}
              >
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 rounded-[1.25rem] bg-gradient-to-br ${mode.gradient} opacity-0 group-hover:opacity-100 transition-opacity`} />

                <div className="relative">
                  {/* Top row */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl ${mode.iconBg} border ${mode.accent}`}>
                      <Icon size={24} className={mode.iconColor} />
                    </div>
                    <span className={`badge ${mode.badgeClass}`}>{mode.badge}</span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display font-bold text-xl text-white mb-2">{mode.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">{mode.description}</p>

                  {/* Features */}
                  <ul className="space-y-1.5 mb-5">
                    {mode.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-xs text-slate-400">
                        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <button
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold text-blue-400 border border-blue-500/20 bg-blue-500/5 hover:bg-blue-500/15 hover:border-blue-400/40 transition-all duration-200 group"
                    onClick={(e) => { e.stopPropagation(); onNavigate(mode.id); }}
                  >
                    Launch Mode
                    <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="animate-fade-in">
          <h2 className="font-display font-semibold text-lg text-white mb-4">Quick Access</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {quickActions.map(({ icon: Icon, label, view, color }) => (
              <button
                key={label}
                onClick={() => onNavigate(view)}
                className="card p-4 flex flex-col items-center gap-3 group cursor-pointer"
              >
                <div className="p-3 rounded-xl bg-white/5 group-hover:bg-white/10 transition-all">
                  <Icon size={22} className={color} />
                </div>
                <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
