import { useState } from 'react';
import {
  Settings, Key, Bot, Globe, Search, Code2, Check,
  Eye, EyeOff, ChevronRight, AlertCircle, Server
} from 'lucide-react';
import type { AppSettings } from '../types';

const AI_MODELS = [
  { id: 'gpt-4o', name: 'GPT-4o', provider: 'OpenAI', desc: 'Most capable GPT model', color: 'text-green-400' },
  { id: 'gpt-4o-mini', name: 'GPT-4o Mini', provider: 'OpenAI', desc: 'Fast and efficient', color: 'text-green-300' },
  { id: 'claude-3.5-sonnet', name: 'Claude 3.5 Sonnet', provider: 'Anthropic', desc: 'Excellent at coding', color: 'text-orange-400' },
  { id: 'gemini-pro', name: 'Gemini Pro', provider: 'Google', desc: 'Advanced reasoning', color: 'text-blue-400' },
  { id: 'deepseek-coder', name: 'DeepSeek Coder', provider: 'DeepSeek', desc: 'Specialized for code', color: 'text-purple-400' },
  { id: 'llama-3.1-70b', name: 'Llama 3.1 70B', provider: 'Meta', desc: 'Open source model', color: 'text-red-400' },
];

const FRONTEND_OPTIONS = ['HTML/CSS/JavaScript', 'React', 'Next.js', 'Vue.js', 'Svelte'];
const BACKEND_OPTIONS = ['Node.js', 'Python (Django)', 'Python (Flask)', 'Java (Spring)', 'PHP (Laravel)'];

type SettingsTab = 'ai' | 'seo' | 'advanced' | 'export';

interface Props {
  settings: AppSettings;
  onUpdate: (s: AppSettings) => void;
}

export default function SettingsPanel({ settings, onUpdate }: Props) {
  const [tab, setTab] = useState<SettingsTab>('ai');
  const [showKey, setShowKey] = useState(false);
  const [saved, setSaved] = useState(false);

  const update = (partial: Partial<AppSettings>) => onUpdate({ ...settings, ...partial });
  const updateSEO = (partial: Partial<AppSettings['seo']>) =>
    update({ seo: { ...settings.seo, ...partial } });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const tabs: { id: SettingsTab; label: string; icon: any }[] = [
    { id: 'ai', label: 'AI & API', icon: Bot },
    { id: 'seo', label: 'SEO', icon: Search },
    { id: 'advanced', label: 'Advanced', icon: Code2 },
    { id: 'export', label: 'Export', icon: Globe },
  ];

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-slide-up">
          <div className="flex items-center gap-3 mb-3">
            <Settings size={24} className="text-blue-400" />
            <h1 className="font-display font-bold text-4xl text-white">
              <span className="gradient-text">Settings</span>
            </h1>
          </div>
          <p className="text-slate-400">Configure AI models, SEO, export options, and more</p>
        </div>

        <div className="flex gap-6">
          {/* Side nav */}
          <div className="w-44 flex-shrink-0">
            <nav className="space-y-1">
              {tabs.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setTab(id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                    tab === id
                      ? 'bg-blue-500/15 text-blue-400 border border-blue-500/25'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon size={15} />
                  {label}
                  {tab === id && <ChevronRight size={13} className="ml-auto" />}
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="glass rounded-2xl border border-blue-900/20 overflow-hidden">
              <div className="panel-header flex items-center justify-between">
                <h2 className="font-semibold text-white text-sm">
                  {tabs.find((t) => t.id === tab)?.label}
                </h2>
                <button
                  onClick={handleSave}
                  className={`text-xs py-1.5 px-3 rounded-lg flex items-center gap-1.5 transition-all ${
                    saved ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'btn-primary'
                  }`}
                >
                  <Check size={13} />
                  {saved ? 'Saved!' : 'Save Changes'}
                </button>
              </div>

              <div className="p-6 space-y-6">
                {tab === 'ai' && (
                  <>
                    {/* API Key */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-300 mb-1 flex items-center gap-2">
                        <Key size={14} className="text-blue-400" />
                        OpenRouter API Key
                      </label>
                      <p className="text-xs text-slate-500 mb-3">
                        Get your API key at openrouter.ai to enable AI features
                      </p>
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <input
                            type={showKey ? 'text' : 'password'}
                            value={settings.openRouterApiKey}
                            onChange={(e) => update({ openRouterApiKey: e.target.value })}
                            placeholder="sk-or-v1-..."
                            className="input-field pr-10"
                          />
                          <button
                            onClick={() => setShowKey(!showKey)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                          >
                            {showKey ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                        <button className="btn-secondary px-4 text-sm">Test</button>
                      </div>
                      {!settings.openRouterApiKey && (
                        <div className="flex items-center gap-2 mt-2 p-2.5 rounded-lg bg-amber-500/8 border border-amber-500/20">
                          <AlertCircle size={14} className="text-amber-400 flex-shrink-0" />
                          <p className="text-xs text-amber-300">Add your API key to enable AI generation</p>
                        </div>
                      )}
                    </div>

                    {/* Model Selector */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
                        <Bot size={14} className="text-blue-400" />
                        Default AI Model
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {AI_MODELS.map((m) => (
                          <button
                            key={m.id}
                            onClick={() => update({ selectedModel: m.id })}
                            className={`p-3 rounded-xl text-left transition-all border ${
                              settings.selectedModel === m.id
                                ? 'border-blue-400/50 bg-blue-500/10'
                                : 'border-white/8 hover:border-white/15 hover:bg-white/4'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className={`text-sm font-medium ${m.color}`}>{m.name}</span>
                              {settings.selectedModel === m.id && (
                                <Check size={14} className="text-blue-400" />
                              )}
                            </div>
                            <div className="text-xs text-slate-500">{m.provider} · {m.desc}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {tab === 'seo' && (
                  <>
                    {[
                      { key: 'title', label: 'SEO Title', placeholder: 'My Website - Best Service', type: 'text' },
                      { key: 'description', label: 'Meta Description', placeholder: 'Describe your website in 155 characters...', type: 'textarea' },
                      { key: 'keywords', label: 'Keywords', placeholder: 'keyword1, keyword2, keyword3', type: 'text' },
                      { key: 'ogImage', label: 'Open Graph Image URL', placeholder: 'https://example.com/og.png', type: 'text' },
                      { key: 'canonicalUrl', label: 'Canonical URL', placeholder: 'https://example.com', type: 'text' },
                    ].map(({ key, label, placeholder, type }) => (
                      <div key={key}>
                        <label className="block text-sm font-medium text-slate-300 mb-1.5">{label}</label>
                        {type === 'textarea' ? (
                          <textarea
                            value={(settings.seo as any)[key]}
                            onChange={(e) => updateSEO({ [key]: e.target.value })}
                            placeholder={placeholder}
                            className="input-field min-h-[80px] resize-none"
                          />
                        ) : (
                          <input
                            type="text"
                            value={(settings.seo as any)[key]}
                            onChange={(e) => updateSEO({ [key]: e.target.value })}
                            placeholder={placeholder}
                            className="input-field"
                          />
                        )}
                      </div>
                    ))}

                    {/* SEO Toggles */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-300 mb-3">SEO Features</label>
                      {[
                        { label: 'Auto-generate sitemap.xml', default: true },
                        { label: 'Generate robots.txt', default: true },
                        { label: 'Add Schema markup', default: false },
                        { label: 'Twitter Cards', default: true },
                        { label: 'Open Graph tags', default: true },
                      ].map((item) => (
                        <div key={item.label} className="flex items-center justify-between py-2.5 border-b border-white/5 last:border-0">
                          <span className="text-sm text-slate-300">{item.label}</span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked={item.default} />
                            <div className="w-9 h-5 bg-surface-500 peer-checked:bg-blue-600 rounded-full transition-all peer-checked:after:translate-x-4 after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:w-4 after:h-4 after:transition-all" />
                          </label>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {tab === 'advanced' && (
                  <>
                    <div>
                      <label className="block text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
                        <Code2 size={14} className="text-blue-400" />
                        Frontend Framework
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {FRONTEND_OPTIONS.map((opt) => (
                          <button
                            key={opt}
                            onClick={() => update({ frontend: opt })}
                            className={`p-2.5 rounded-lg text-sm text-left transition-all border ${
                              settings.frontend === opt
                                ? 'border-blue-400/50 bg-blue-500/10 text-blue-300'
                                : 'border-white/8 text-slate-400 hover:border-white/15 hover:text-slate-200'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-300 mb-1 flex items-center gap-2">
                        <Server size={14} className="text-blue-400" />
                        Backend (Future Ready)
                      </label>
                      <p className="text-xs text-slate-500 mb-3">Backend integration is planned for a future release</p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {BACKEND_OPTIONS.map((opt) => (
                          <button
                            key={opt}
                            onClick={() => update({ backend: opt })}
                            className={`p-2.5 rounded-lg text-sm text-left transition-all border ${
                              settings.backend === opt
                                ? 'border-blue-400/50 bg-blue-500/10 text-blue-300'
                                : 'border-white/8 text-slate-400 hover:border-white/15 hover:text-slate-200 opacity-60'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {tab === 'export' && (
                  <>
                    <div>
                      <label className="block text-sm font-semibold text-slate-300 mb-3">Export Options</label>
                      <div className="space-y-3">
                        {[
                          { title: 'HTML Export', desc: 'Export as a static HTML/CSS/JS website', badge: 'Free' },
                          { title: 'React Export', desc: 'Export as a React component project', badge: 'Free' },
                          { title: 'Next.js Export', desc: 'Export as a Next.js project with SSR', badge: 'Pro' },
                          { title: 'ZIP Download', desc: 'Download all files as a ZIP archive', badge: 'Free' },
                          { title: 'Source Code', desc: 'Download raw source code files', badge: 'Free' },
                        ].map(({ title, desc, badge }) => (
                          <div key={title} className="flex items-center justify-between p-4 rounded-xl border border-white/8 hover:border-blue-500/20 hover:bg-blue-500/5 transition-all cursor-pointer group">
                            <div>
                              <div className="flex items-center gap-2 mb-0.5">
                                <span className="text-sm font-medium text-slate-200 group-hover:text-white">{title}</span>
                                <span className={`badge text-xs ${badge === 'Pro' ? 'badge-cyan' : 'badge-green'}`}>{badge}</span>
                              </div>
                              <span className="text-xs text-slate-500">{desc}</span>
                            </div>
                            <ChevronRight size={16} className="text-slate-500 group-hover:text-blue-400 transition-colors" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
