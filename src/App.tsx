import { useState, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import InstantAIMode from './components/modes/InstantAIMode';
import AIGuidedMode from './components/modes/AIGuidedMode';
import DragDropBuilder from './components/modes/DragDropBuilder';
import DeveloperMode from './components/modes/DeveloperMode';
import ImportEditMode from './components/modes/ImportEditMode';
import DesignStudio from './components/DesignStudio';
import VisualEditor from './components/VisualEditor';
import ComponentsLibrary from './components/ComponentsLibrary';
import TemplatesGallery from './components/TemplatesGallery';
import ProjectManager from './components/ProjectManager';
import SettingsPanel from './components/SettingsPanel';
import type { ViewType, AppSettings } from './types';

const DEFAULT_SETTINGS: AppSettings = {
  openRouterApiKey: '',
  selectedModel: 'gpt-4o',
  frontend: 'HTML/CSS/JavaScript',
  backend: 'Node.js',
  seo: {
    title: 'Varun AI Hub - AI Website Builder',
    description: 'Create websites using AI, Drag & Drop, Visual Editing, Code Editor and Import/Export tools.',
    keywords: 'AI website builder, drag and drop, visual editor',
    ogImage: '/Varun_Ai_Hub.png',
    canonicalUrl: '',
  },
  theme: 'dark',
};

// Views that use full-screen layouts (no body padding)
const FULLSCREEN_VIEWS: ViewType[] = ['drag-drop', 'developer', 'design-studio', 'visual-editor'];

export default function App() {
  const [view, setView] = useState<ViewType>('landing');
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);

  const navigate = useCallback((v: ViewType) => {
    setView(v);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const isFullscreen = FULLSCREEN_VIEWS.includes(view);

  const renderView = () => {
    switch (view) {
      case 'landing':
        return (
          <div>
            <Hero onNavigate={navigate} />
            <LandingPage onNavigate={navigate} />
          </div>
        );
      case 'dashboard':
        return <Dashboard onNavigate={navigate} />;
      case 'instant-ai':
        return <InstantAIMode onNavigate={navigate} />;
      case 'ai-guided':
        return <AIGuidedMode onNavigate={navigate} />;
      case 'drag-drop':
        return <DragDropBuilder />;
      case 'developer':
        return <DeveloperMode />;
      case 'import-edit':
        return <ImportEditMode onNavigate={navigate} />;
      case 'design-studio':
        return <DesignStudio />;
      case 'visual-editor':
        return <VisualEditor />;
      case 'components':
        return <ComponentsLibrary />;
      case 'templates':
        return <TemplatesGallery onNavigate={navigate} />;
      case 'projects':
        return <ProjectManager onNavigate={navigate} />;
      case 'settings':
        return <SettingsPanel settings={settings} onUpdate={setSettings} />;
      default:
        return <Dashboard onNavigate={navigate} />;
    }
  };

  return (
    <div className={`min-h-screen ${settings.theme === 'dark' ? 'dark' : ''}`}>
      {/* Background */}
      <div className="fixed inset-0 bg-surface-900 -z-10" />
      <div className="fixed inset-0 bg-grid-pattern opacity-20 -z-10" />

      {/* Navbar - always visible */}
      {!isFullscreen && (
        <Navbar
          currentView={view}
          onNavigate={navigate}
          theme={settings.theme}
          onThemeToggle={() => setSettings((s) => ({ ...s, theme: s.theme === 'dark' ? 'light' : 'dark' }))}
        />
      )}

      {/* For fullscreen views, show a minimal top bar */}
      {isFullscreen && (
        <div className="fixed top-0 left-0 right-0 z-50 flex items-center px-4 py-2 border-b border-blue-900/20 bg-surface-900/95 backdrop-blur-xl">
          <button
            onClick={() => navigate('dashboard')}
            className="flex items-center gap-2 mr-4 group"
          >
            <img
              src="/Varun_Ai_Hub.png"
              alt="Varun AI Hub"
              className="h-10 w-auto object-contain filter drop-shadow-[0_0_8px_rgba(59,130,246,0.6)] group-hover:drop-shadow-[0_0_14px_rgba(59,130,246,0.9)] transition-all duration-300"
            />
            <span className="font-display font-bold text-base tracking-tight leading-none hidden sm:inline">
              <span className="text-white">Varun</span>
              <span
                className="ml-1"
                style={{
                  background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                AI Hub
              </span>
            </span>
          </button>
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <button
              onClick={() => navigate('dashboard')}
              className="hover:text-slate-300 transition-colors"
            >
              Dashboard
            </button>
            <span>/</span>
            <span className="text-slate-300 capitalize">{view.replace('-', ' ')}</span>
          </div>
        </div>
      )}

      {/* Main content */}
      <main className={isFullscreen ? 'h-screen overflow-hidden' : ''}>
        {renderView()}
      </main>
    </div>
  );
}
