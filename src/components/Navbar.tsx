import { useState, useEffect } from 'react';
import {
  Menu, X, Download, Sun, Moon, Zap, ChevronDown, Settings
} from 'lucide-react';
import { usePWA } from '../hooks/usePWA';
import type { ViewType } from '../types';

interface NavbarProps {
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
  theme: 'dark' | 'light';
  onThemeToggle: () => void;
}

const navItems = [
  { label: 'Dashboard', view: 'dashboard' as ViewType },
  {
    label: 'Create', view: 'instant-ai' as ViewType,
    children: [
      { label: 'Instant AI', view: 'instant-ai' as ViewType },
      { label: 'AI Guided', view: 'ai-guided' as ViewType },
      { label: 'Drag & Drop', view: 'drag-drop' as ViewType },
      { label: 'Developer Mode', view: 'developer' as ViewType },
      { label: 'Import & Edit', view: 'import-edit' as ViewType },
    ],
  },
  { label: 'Design Studio', view: 'design-studio' as ViewType },
  { label: 'Components', view: 'components' as ViewType },
  { label: 'Templates', view: 'templates' as ViewType },
  { label: 'Projects', view: 'projects' as ViewType },
];

export default function Navbar({ currentView, onNavigate, theme, onThemeToggle }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { isInstallable, install } = usePWA();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || currentView !== 'landing'
          ? 'bg-surface-900/95 backdrop-blur-xl border-b border-blue-900/30 shadow-2xl'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => onNavigate('landing')}
            className="flex items-center gap-2.5 group"
          >
            <img
              src="/Varun_Ai_Hub.png"
              alt="Varun AI Hub"
              className="h-14 w-auto object-contain filter drop-shadow-[0_0_12px_rgba(59,130,246,0.7)] group-hover:drop-shadow-[0_0_20px_rgba(59,130,246,1)] transition-all duration-300 group-hover:scale-105"
            />
            <span className="font-display font-bold text-xl tracking-tight leading-none select-none">
              <span className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">Varun</span>
              <span
                className="ml-1"
                style={{
                  background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: 'drop-shadow(0 0 8px rgba(59,130,246,0.6))',
                }}
              >
                AI Hub
              </span>
            </span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  onClick={() => !item.children && onNavigate(item.view)}
                  className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    currentView === item.view || item.children?.some(c => c.view === currentView)
                      ? 'text-blue-400 bg-blue-950/50'
                      : 'text-slate-400 hover:text-blue-300 hover:bg-blue-950/30'
                  }`}
                >
                  {item.label}
                  {item.children && <ChevronDown size={14} className={`transition-transform duration-200 ${activeDropdown === item.label ? 'rotate-180' : ''}`} />}
                </button>

                {item.children && activeDropdown === item.label && (
                  <div className="absolute top-full left-0 mt-1 w-48 glass rounded-xl shadow-2xl shadow-blue-900/30 py-1 border border-blue-900/30 animate-fade-in">
                    {item.children.map((child) => (
                      <button
                        key={child.label}
                        onClick={() => { onNavigate(child.view); setActiveDropdown(null); }}
                        className={`w-full text-left px-4 py-2.5 text-sm transition-all duration-150 ${
                          currentView === child.view
                            ? 'text-blue-400 bg-blue-950/50'
                            : 'text-slate-300 hover:text-blue-300 hover:bg-blue-950/30'
                        }`}
                      >
                        {child.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={onThemeToggle}
              className="p-2 rounded-lg text-slate-400 hover:text-blue-300 hover:bg-blue-950/30 transition-all duration-200"
              title="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button
              onClick={() => onNavigate('settings')}
              className={`p-2 rounded-lg transition-all duration-200 ${
                currentView === 'settings' ? 'text-blue-400 bg-blue-950/50' : 'text-slate-400 hover:text-blue-300 hover:bg-blue-950/30'
              }`}
              title="Settings"
            >
              <Settings size={18} />
            </button>

            {isInstallable && (
              <button
                onClick={install}
                className="hidden sm:flex items-center gap-2 btn-primary text-sm py-2 px-3"
              >
                <Download size={15} />
                Install App
              </button>
            )}

            <button
              onClick={() => onNavigate('instant-ai')}
              className="hidden sm:flex items-center gap-2 btn-primary text-sm"
            >
              <Zap size={15} />
              Start Building
            </button>

            {/* Mobile menu */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-blue-950/30 transition-all"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden glass border-t border-blue-900/20 animate-slide-up">
          <div className="px-4 py-4 space-y-1">
            {navItems.map((item) => (
              <div key={item.label}>
                <button
                  onClick={() => { if (!item.children) { onNavigate(item.view); setMobileOpen(false); } }}
                  className={`w-full text-left flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    currentView === item.view ? 'text-blue-400 bg-blue-950/50' : 'text-slate-300 hover:text-blue-300 hover:bg-blue-950/30'
                  }`}
                >
                  {item.label}
                </button>
                {item.children && (
                  <div className="pl-4 mt-1 space-y-1">
                    {item.children.map((child) => (
                      <button
                        key={child.label}
                        onClick={() => { onNavigate(child.view); setMobileOpen(false); }}
                        className="w-full text-left px-3 py-2 rounded-lg text-xs text-slate-400 hover:text-blue-300 hover:bg-blue-950/30 transition-all"
                      >
                        {child.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-2 flex flex-col gap-2">
              <button onClick={() => { onNavigate('instant-ai'); setMobileOpen(false); }} className="btn-primary text-sm w-full">
                <Zap size={15} className="inline mr-2" />
                Start Building
              </button>
              {isInstallable && (
                <button onClick={install} className="btn-secondary text-sm w-full">
                  <Download size={15} className="inline mr-2" />
                  Install App
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
