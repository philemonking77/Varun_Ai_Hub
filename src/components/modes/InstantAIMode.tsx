import { useState } from 'react';
import { Zap, Sparkles, ArrowRight, RefreshCw, Eye, Download, Code2, Wand2 } from 'lucide-react';
import type { ViewType } from '../../types';

interface Props {
  onNavigate: (view: ViewType) => void;
}

const EXAMPLE_PROMPTS = [
  'Create a modern SaaS landing page for a project management tool with dark theme',
  'Build a restaurant website with a menu, gallery, and reservation form',
  'Design a personal portfolio for a UX designer with case studies',
  'Make a tech startup homepage with hero section and pricing table',
  'Create an online learning platform with courses and testimonials',
];

const AI_MODELS = [
  { id: 'gpt-4o', name: 'GPT-4o', provider: 'OpenAI', color: 'text-green-400' },
  { id: 'claude-3.5-sonnet', name: 'Claude 3.5', provider: 'Anthropic', color: 'text-orange-400' },
  { id: 'gemini-pro', name: 'Gemini Pro', provider: 'Google', color: 'text-blue-400' },
  { id: 'deepseek-coder', name: 'DeepSeek', provider: 'DeepSeek', color: 'text-purple-400' },
  { id: 'llama-3.1', name: 'Llama 3.1', provider: 'Meta', color: 'text-red-400' },
];

export default function InstantAIMode({ onNavigate }: Props) {
  const [prompt, setPrompt] = useState('');
  const [selectedModel, setSelectedModel] = useState('gpt-4o');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          setGenerated(true);
          return 100;
        }
        return p + Math.random() * 8;
      });
    }, 150);
  };

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-slide-up">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20">
              <Zap size={22} className="text-blue-400" />
            </div>
            <div>
              <h1 className="font-display font-bold text-3xl text-white">Instant AI Mode</h1>
              <p className="text-slate-400 text-sm">Describe your website and AI will build it instantly</p>
            </div>
          </div>
        </div>

        {/* Main Prompt Area */}
        <div className="glass rounded-2xl p-6 mb-6 border border-blue-500/15 animate-slide-up" style={{ animationDelay: '0.05s' }}>
          <label className="block text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
            <Sparkles size={16} className="text-blue-400" />
            Describe your website
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Example: Create a modern SaaS landing page for a project management tool with dark theme, hero section, features grid, pricing table, and testimonials..."
            className="input-field min-h-[140px] resize-none text-base leading-relaxed mb-4"
          />

          {/* Example prompts */}
          <div className="mb-4">
            <p className="text-xs text-slate-500 mb-2">Quick examples:</p>
            <div className="flex flex-wrap gap-2">
              {EXAMPLE_PROMPTS.slice(0, 3).map((ex) => (
                <button
                  key={ex}
                  onClick={() => setPrompt(ex)}
                  className="text-xs px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-300 hover:bg-blue-500/20 transition-all"
                >
                  {ex.slice(0, 45)}...
                </button>
              ))}
            </div>
          </div>

          {/* Model selector */}
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="text-xs text-slate-400 font-medium">AI Model:</span>
            <div className="flex flex-wrap gap-2">
              {AI_MODELS.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setSelectedModel(m.id)}
                  className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                    selectedModel === m.id
                      ? `bg-blue-500/20 border-blue-400/50 ${m.color}`
                      : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20'
                  }`}
                >
                  {m.name}
                </button>
              ))}
            </div>
          </div>

          {/* Generate button */}
          {!isGenerating && !generated && (
            <button
              onClick={handleGenerate}
              disabled={!prompt.trim()}
              className="btn-primary w-full flex items-center justify-center gap-3 py-3.5 text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Wand2 size={20} />
              Generate Website with AI
              <ArrowRight size={18} />
            </button>
          )}

          {/* Progress */}
          {isGenerating && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-blue-400 font-medium flex items-center gap-2">
                  <RefreshCw size={14} className="animate-spin" />
                  AI is generating your website...
                </span>
                <span className="text-slate-400">{Math.min(100, Math.round(progress))}%</span>
              </div>
              <div className="h-2 bg-surface-600 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs text-slate-500">
                {['Analyzing prompt...', 'Designing layout...', 'Writing code...'].map((step, i) => (
                  <div key={step} className={`flex items-center gap-1 ${progress > i * 33 ? 'text-blue-400' : ''}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${progress > i * 33 ? 'bg-blue-400' : 'bg-slate-600'}`} />
                    {step}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Generated Result */}
        {generated && (
          <div className="glass rounded-2xl border border-green-500/20 overflow-hidden animate-slide-up">
            {/* Preview Header */}
            <div className="flex items-center justify-between p-4 border-b border-green-500/15 bg-green-500/5">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-green-400 font-semibold text-sm">Website Generated Successfully!</span>
              </div>
              <div className="flex gap-2">
                <button className="btn-secondary text-xs py-1.5 px-3 flex items-center gap-1.5">
                  <Eye size={13} />
                  Preview
                </button>
                <button className="btn-secondary text-xs py-1.5 px-3 flex items-center gap-1.5">
                  <Code2 size={13} />
                  View Code
                </button>
                <button className="btn-primary text-xs py-1.5 px-3 flex items-center gap-1.5">
                  <Download size={13} />
                  Export
                </button>
              </div>
            </div>

            {/* Mock preview */}
            <div className="bg-white h-80 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black flex flex-col">
                <div className="h-12 bg-gray-800/80 flex items-center px-6 gap-4 border-b border-gray-700">
                  <div className="w-6 h-6 bg-blue-500 rounded" />
                  <div className="h-3 w-24 bg-gray-600 rounded" />
                  <div className="flex gap-3 ml-auto">
                    {['Home', 'Features', 'Pricing', 'Contact'].map((n) => (
                      <div key={n} className="h-2.5 w-12 bg-gray-600 rounded" />
                    ))}
                  </div>
                </div>
                <div className="flex-1 flex flex-col items-center justify-center gap-4 p-8">
                  <div className="h-4 w-48 bg-blue-500/40 rounded" />
                  <div className="h-8 w-72 bg-white/10 rounded-lg" />
                  <div className="h-4 w-56 bg-gray-600 rounded" />
                  <div className="h-4 w-40 bg-gray-600 rounded" />
                  <div className="flex gap-3 mt-2">
                    <div className="h-10 w-28 bg-blue-600 rounded-lg" />
                    <div className="h-10 w-28 bg-gray-700 rounded-lg" />
                  </div>
                </div>
              </div>
              <div className="absolute bottom-4 right-4 badge badge-green text-xs">
                AI Generated
              </div>
            </div>

            {/* Action row */}
            <div className="p-4 flex flex-wrap gap-3 justify-between items-center bg-surface-800/50">
              <div className="text-sm text-slate-400">
                Generated with <span className="text-blue-400 font-medium">{AI_MODELS.find(m => m.id === selectedModel)?.name}</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => { setGenerated(false); setPrompt(''); }}
                  className="btn-secondary text-xs py-1.5 px-3 flex items-center gap-1.5"
                >
                  <RefreshCw size={13} />
                  Regenerate
                </button>
                <button
                  onClick={() => onNavigate('visual-editor')}
                  className="btn-primary text-xs py-1.5 px-3 flex items-center gap-1.5"
                >
                  Open in Editor
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
