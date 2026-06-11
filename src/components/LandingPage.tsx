import {
  Zap, MessageSquare, MousePointer2, Code2, Upload,
  ArrowRight, Palette, Globe, Download, Shield, Star
} from 'lucide-react';
import type { ViewType } from '../types';

interface Props {
  onNavigate: (view: ViewType) => void;
}

const FEATURES = [
  { icon: Zap, title: 'Instant AI Generation', desc: 'Describe your website and get a complete, production-ready site in seconds.', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
  { icon: MousePointer2, title: 'Drag & Drop Builder', desc: 'Visual editing without any coding. Drag components, customize instantly.', color: 'text-sky-400', bg: 'bg-sky-500/10', border: 'border-sky-500/20' },
  { icon: Code2, title: 'Full Developer Mode', desc: 'Complete IDE with AI assistant, file explorer, and live preview.', color: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/20' },
  { icon: Palette, title: 'Design Studio', desc: 'Control every visual aspect — colors, fonts, layouts, animations.', color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20' },
  { icon: Globe, title: 'SEO Optimized', desc: 'Built-in SEO tools, meta tags, sitemap and schema markup generation.', color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20' },
  { icon: Download, title: 'Multiple Exports', desc: 'Export as HTML, React, Next.js or download as ZIP. Own your code.', color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
  { icon: Upload, title: 'Import & Edit', desc: 'Upload existing HTML, CSS, React projects and continue editing.', color: 'text-teal-400', bg: 'bg-teal-500/10', border: 'border-teal-500/20' },
  { icon: Shield, title: 'AI Model Choice', desc: 'Pick from GPT, Claude, Gemini, DeepSeek or Llama — you decide.', color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
];

const STATS = [
  { value: '5', label: 'Build Modes', icon: Star },
  { value: '50+', label: 'UI Components', icon: MousePointer2 },
  { value: '12+', label: 'Templates', icon: Globe },
  { value: '5', label: 'AI Models', icon: Zap },
];

const MODES_OVERVIEW = [
  { id: 'instant-ai' as ViewType, icon: Zap, title: 'Instant AI', short: 'Enter a prompt, get a website', color: 'from-blue-600 to-cyan-600' },
  { id: 'ai-guided' as ViewType, icon: MessageSquare, title: 'AI Guided', short: 'Step-by-step wizard', color: 'from-cyan-600 to-teal-600' },
  { id: 'drag-drop' as ViewType, icon: MousePointer2, title: 'Drag & Drop', short: 'Visual no-code builder', color: 'from-sky-600 to-blue-600' },
  { id: 'developer' as ViewType, icon: Code2, title: 'Developer', short: 'Full IDE experience', color: 'from-indigo-600 to-blue-600' },
  { id: 'import-edit' as ViewType, icon: Upload, title: 'Import & Edit', short: 'Edit existing projects', color: 'from-teal-600 to-cyan-600' },
];

export default function LandingPage({ onNavigate }: Props) {
  return (
    <div>
      {/* Features Grid */}
      <section className="py-24 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-surface-900/0 via-surface-800/30 to-surface-900/0" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-14">
            <span className="badge badge-blue mb-4 inline-flex">Everything You Need</span>
            <h2 className="font-display font-bold text-4xl lg:text-5xl text-white mb-4">
              Build Anything,{' '}
              <span className="gradient-text">Your Way</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Varun AI Hub combines the power of AI with professional design tools
              for a complete website building experience.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FEATURES.map(({ icon: Icon, title, desc, color, bg, border }) => (
              <div key={title} className="card p-5 group">
                <div className={`p-3 rounded-xl ${bg} border ${border} w-fit mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={22} className={color} />
                </div>
                <h3 className="font-semibold text-white mb-2 text-sm">{title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="glass rounded-2xl p-8 border border-blue-900/20">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
              {STATS.map(({ value, label, icon: Icon }) => (
                <div key={label} className="flex flex-col items-center gap-3">
                  <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/15">
                    <Icon size={22} className="text-blue-400" />
                  </div>
                  <div>
                    <div className="font-display font-bold text-3xl gradient-text">{value}</div>
                    <div className="text-slate-400 text-sm">{label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Build Modes Section */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-display font-bold text-4xl lg:text-5xl text-white mb-4">
              5 Ways to Build
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              Choose the approach that fits your skill level and workflow.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {MODES_OVERVIEW.map(({ id, icon: Icon, title, short, color }) => (
              <button
                key={id}
                onClick={() => onNavigate(id)}
                className="group flex flex-col items-center gap-3 p-5 rounded-2xl border border-white/8 hover:border-blue-500/30 hover:bg-blue-500/5 transition-all duration-300 min-w-[140px]"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <Icon size={22} className="text-white" />
                </div>
                <div className="text-center">
                  <div className="font-semibold text-white text-sm">{title}</div>
                  <div className="text-slate-500 text-xs mt-0.5">{short}</div>
                </div>
                <ArrowRight size={14} className="text-slate-600 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="glass rounded-3xl p-10 border border-blue-900/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-cyan-500/5" />
            <div className="relative">
              <h2 className="font-display font-bold text-4xl text-white mb-4">
                Ready to Build Your
                <span className="gradient-text"> Dream Website?</span>
              </h2>
              <p className="text-slate-400 text-lg mb-8">
                Start with AI generation or design it your way. No limits, no subscriptions for the core tools.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={() => onNavigate('instant-ai')}
                  className="btn-primary flex items-center gap-2 text-base px-6 py-3"
                >
                  <Zap size={18} />
                  Start Building Now
                </button>
                <button
                  onClick={() => onNavigate('templates')}
                  className="btn-secondary flex items-center gap-2 text-base px-6 py-3"
                >
                  Browse Templates
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-blue-900/20 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <img src="/Varun_Ai_Hub.png" alt="Varun AI Hub" className="h-8 w-auto object-contain" />
                <span className="font-display font-bold text-lg gradient-text">Varun AI Hub</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                The complete AI-powered website builder. Create professional websites
                in minutes with AI, visual tools, and powerful code editing.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-300 text-sm mb-3">Build Modes</h4>
              <ul className="space-y-2">
                {['Instant AI', 'AI Guided', 'Drag & Drop', 'Developer Mode', 'Import & Edit'].map((m) => (
                  <li key={m} className="text-slate-500 text-sm hover:text-slate-300 cursor-pointer transition-colors">{m}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-300 text-sm mb-3">Features</h4>
              <ul className="space-y-2">
                {['Design Studio', 'Component Library', 'Templates', 'SEO Tools', 'Export Options'].map((f) => (
                  <li key={f} className="text-slate-500 text-sm hover:text-slate-300 cursor-pointer transition-colors">{f}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-blue-900/20 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-slate-600 text-sm">© 2026 Varun AI Hub. All rights reserved.</span>
            <span className="text-slate-600 text-sm">Built with AI · Powered by OpenRouter</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
