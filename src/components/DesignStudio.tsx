import { useState } from 'react';
import {
  Palette, Type, Layout, Sliders, Sparkles, RefreshCw,
  Sun, Moon, Save, Download, Check
} from 'lucide-react';

const PRESET_PALETTES = [
  { name: 'Ocean Blue', colors: ['#0ea5e9', '#2563eb', '#1e40af', '#0f172a', '#1e293b'] },
  { name: 'Forest Green', colors: ['#10b981', '#059669', '#065f46', '#0f1f0f', '#1a2e1a'] },
  { name: 'Sunset Orange', colors: ['#f97316', '#ea580c', '#c2410c', '#1c0f00', '#2d1a0e'] },
  { name: 'Royal Purple', colors: ['#8b5cf6', '#7c3aed', '#6d28d9', '#1a0a2e', '#2a1a3e'] },
  { name: 'Rose Pink', colors: ['#f43f5e', '#e11d48', '#be123c', '#1f000a', '#2e0a18'] },
  { name: 'Slate Gray', colors: ['#64748b', '#475569', '#334155', '#0f172a', '#1e293b'] },
];

const FONT_PAIRS = [
  { heading: 'Space Grotesk', body: 'Inter', label: 'Modern & Clean' },
  { heading: 'Playfair Display', body: 'Source Sans Pro', label: 'Elegant & Classic' },
  { heading: 'Raleway', body: 'Lato', label: 'Bold & Minimal' },
  { heading: 'Montserrat', body: 'Open Sans', label: 'Professional' },
  { heading: 'Roboto Slab', body: 'Roboto', label: 'Corporate' },
  { heading: 'Nunito', body: 'Nunito Sans', label: 'Friendly & Round' },
];

const DESIGN_PRESETS = [
  { name: 'Startup Dark', theme: 'dark', accent: '#3b82f6', bg: 'from-slate-950 to-blue-950' },
  { name: 'Agency Light', theme: 'light', accent: '#6366f1', bg: 'from-white to-indigo-50' },
  { name: 'Portfolio Clean', theme: 'light', accent: '#0ea5e9', bg: 'from-gray-50 to-sky-50' },
  { name: 'Neon Futuristic', theme: 'dark', accent: '#22d3ee', bg: 'from-gray-950 to-cyan-950' },
  { name: 'Nature Green', theme: 'light', accent: '#10b981', bg: 'from-white to-emerald-50' },
  { name: 'Luxury Dark', theme: 'dark', accent: '#d97706', bg: 'from-neutral-950 to-amber-950' },
];

const AI_SUGGESTIONS = [
  { category: 'Color', suggestion: 'Use a 60-30-10 color rule for better visual balance', icon: '🎨' },
  { category: 'Typography', suggestion: 'Increase heading size for better visual hierarchy', icon: '✏️' },
  { category: 'Spacing', suggestion: 'Add more whitespace to reduce cognitive load', icon: '📐' },
  { category: 'Layout', suggestion: 'Use a Z-pattern layout for better readability', icon: '🔲' },
  { category: 'Contrast', suggestion: 'Increase contrast ratio to meet WCAG AA standards', icon: '⚡' },
];

type StudioTab = 'colors' | 'typography' | 'layout' | 'animations' | 'ai' | 'presets';

export default function DesignStudio() {
  const [tab, setTab] = useState<StudioTab>('colors');
  const [selectedPalette, setSelectedPalette] = useState(0);
  const [selectedFont, setSelectedFont] = useState(0);
  const [selectedPreset, setSelectedPreset] = useState(0);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [primaryColor, setPrimaryColor] = useState('#3b82f6');
  const [secondaryColor, setSecondaryColor] = useState('#0ea5e9');
  const [accentColor, setAccentColor] = useState('#6366f1');
  const [borderRadius, setBorderRadius] = useState('8');
  const [spacing, setSpacing] = useState('16');
  const [headingSize, setHeadingSize] = useState('48');
  const [bodySize, setBodySize] = useState('16');
  const [lineHeight, setLineHeight] = useState('1.5');
  const [saved, setSaved] = useState(false);

  const tabs: { id: StudioTab; label: string; icon: any }[] = [
    { id: 'colors', label: 'Colors', icon: Palette },
    { id: 'typography', label: 'Typography', icon: Type },
    { id: 'layout', label: 'Layout', icon: Layout },
    { id: 'animations', label: 'Animations', icon: Sliders },
    { id: 'ai', label: 'AI Suggest', icon: Sparkles },
    { id: 'presets', label: 'Presets', icon: RefreshCw },
  ];

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="min-h-screen pt-16 flex flex-col">
      {/* Toolbar */}
      <div className="border-b border-blue-900/20 bg-surface-800/90 px-4 py-2.5 flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <Palette size={18} className="text-blue-400" />
          <span className="font-display font-semibold text-white text-sm">Design Studio</span>
        </div>
        <div className="flex items-center gap-2 ml-2">
          <button
            onClick={() => setTheme('dark')}
            className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-all ${theme === 'dark' ? 'tab-active border' : 'text-slate-400 hover:text-white'}`}
          >
            <Moon size={12} />Dark
          </button>
          <button
            onClick={() => setTheme('light')}
            className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-all ${theme === 'light' ? 'tab-active border' : 'text-slate-400 hover:text-white'}`}
          >
            <Sun size={12} />Light
          </button>
        </div>
        <div className="ml-auto flex gap-2">
          <button onClick={handleSave} className={`text-xs py-1.5 px-3 flex items-center gap-1.5 rounded-lg transition-all ${saved ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'btn-secondary'}`}>
            {saved ? <><Check size={13} />Saved!</> : <><Save size={13} />Save Design</>}
          </button>
          <button className="btn-primary text-xs py-1.5 px-3 flex items-center gap-1.5">
            <Download size={13} />Export CSS
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Side tabs */}
        <div className="w-14 sidebar flex-shrink-0 flex flex-col items-center py-3 gap-1 border-r border-blue-900/20">
          {tabs.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              title={label}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                tab === id ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
              }`}
            >
              <Icon size={18} />
            </button>
          ))}
        </div>

        {/* Controls Panel */}
        <div className="w-72 sidebar overflow-y-auto border-r border-blue-900/20">
          <div className="panel-header">
            <p className="text-xs font-semibold text-slate-300 uppercase flex items-center gap-2">
              {tabs.find((t) => t.id === tab)?.label}
            </p>
          </div>

          <div className="p-4 space-y-5">
            {tab === 'colors' && (
              <>
                {/* Custom color pickers */}
                {[
                  { label: 'Primary Color', value: primaryColor, set: setPrimaryColor },
                  { label: 'Secondary Color', value: secondaryColor, set: setSecondaryColor },
                  { label: 'Accent Color', value: accentColor, set: setAccentColor },
                ].map(({ label, value, set }) => (
                  <div key={label}>
                    <label className="block text-xs text-slate-400 mb-2">{label}</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={value}
                        onChange={(e) => set(e.target.value)}
                        className="w-10 h-10 rounded-lg cursor-pointer border border-white/10 bg-transparent"
                      />
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => set(e.target.value)}
                        className="input-field text-xs flex-1 font-mono"
                      />
                    </div>
                  </div>
                ))}

                <div>
                  <label className="block text-xs text-slate-400 mb-2">Color Palettes</label>
                  <div className="space-y-2">
                    {PRESET_PALETTES.map((p, i) => (
                      <button
                        key={p.name}
                        onClick={() => { setSelectedPalette(i); setPrimaryColor(p.colors[0]); }}
                        className={`w-full flex items-center gap-2.5 p-2.5 rounded-lg transition-all ${
                          selectedPalette === i ? 'bg-blue-500/15 border border-blue-500/30' : 'hover:bg-white/5 border border-transparent'
                        }`}
                      >
                        <div className="flex gap-0.5">
                          {p.colors.slice(0, 4).map((c, j) => (
                            <div key={j} className="w-4 h-4 rounded-sm" style={{ background: c }} />
                          ))}
                        </div>
                        <span className="text-xs text-slate-300">{p.name}</span>
                        {selectedPalette === i && <Check size={12} className="text-blue-400 ml-auto" />}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {tab === 'typography' && (
              <>
                <div>
                  <label className="block text-xs text-slate-400 mb-2">Font Pairs</label>
                  <div className="space-y-2">
                    {FONT_PAIRS.map((fp, i) => (
                      <button
                        key={fp.label}
                        onClick={() => setSelectedFont(i)}
                        className={`w-full text-left p-3 rounded-lg transition-all ${
                          selectedFont === i ? 'bg-blue-500/15 border border-blue-500/30' : 'hover:bg-white/5 border border-transparent'
                        }`}
                      >
                        <div className="text-sm text-white font-semibold">{fp.heading}</div>
                        <div className="text-xs text-slate-400">{fp.body} · {fp.label}</div>
                      </button>
                    ))}
                  </div>
                </div>
                {[
                  { label: 'Heading Size (px)', value: headingSize, set: setHeadingSize, min: 24, max: 96 },
                  { label: 'Body Size (px)', value: bodySize, set: setBodySize, min: 12, max: 24 },
                  { label: 'Line Height', value: lineHeight, set: setLineHeight, min: 1, max: 2.5, step: 0.1 },
                ].map(({ label, value, set, min, max, step = 1 }) => (
                  <div key={label}>
                    <div className="flex justify-between mb-2">
                      <label className="text-xs text-slate-400">{label}</label>
                      <span className="text-xs text-blue-400 font-mono">{value}</span>
                    </div>
                    <input
                      type="range"
                      min={min}
                      max={max}
                      step={step}
                      value={parseFloat(value)}
                      onChange={(e) => set(e.target.value)}
                      className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-surface-600 accent-blue-500"
                    />
                  </div>
                ))}
              </>
            )}

            {tab === 'layout' && (
              <>
                {[
                  { label: 'Border Radius (px)', value: borderRadius, set: setBorderRadius, min: 0, max: 32 },
                  { label: 'Base Spacing (px)', value: spacing, set: setSpacing, min: 8, max: 48, step: 4 },
                ].map(({ label, value, set, min, max, step = 1 }) => (
                  <div key={label}>
                    <div className="flex justify-between mb-2">
                      <label className="text-xs text-slate-400">{label}</label>
                      <span className="text-xs text-blue-400 font-mono">{value}px</span>
                    </div>
                    <input
                      type="range"
                      min={min}
                      max={max}
                      step={step}
                      value={parseInt(value)}
                      onChange={(e) => set(e.target.value)}
                      className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-surface-600 accent-blue-500"
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-xs text-slate-400 mb-2">Layout Type</label>
                  {['Boxed', 'Full Width', 'Wide'].map((l) => (
                    <button key={l} className="w-full text-left px-3 py-2 rounded-lg text-xs text-slate-400 hover:text-white hover:bg-white/5 transition-all mb-1">
                      {l}
                    </button>
                  ))}
                </div>
              </>
            )}

            {tab === 'animations' && (
              <>
                {['Fade In', 'Slide Up', 'Scale In', 'Float', 'Pulse'].map((anim) => (
                  <div key={anim} className="flex items-center justify-between p-2.5 rounded-lg bg-white/4">
                    <span className="text-xs text-slate-300">{anim}</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked={anim !== 'Float'} />
                      <div className="w-9 h-5 bg-surface-500 peer-checked:bg-blue-600 rounded-full transition-all peer-checked:after:translate-x-4 after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:w-4 after:h-4 after:transition-all" />
                    </label>
                  </div>
                ))}
                <div>
                  <label className="block text-xs text-slate-400 mb-2">Animation Duration (ms)</label>
                  <input type="range" min={100} max={1000} defaultValue={400} step={50}
                    className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-surface-600 accent-blue-500" />
                </div>
              </>
            )}

            {tab === 'ai' && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">AI-powered design recommendations for your current settings:</p>
                {AI_SUGGESTIONS.map((s) => (
                  <div key={s.category} className="p-3 rounded-lg bg-blue-500/5 border border-blue-500/15">
                    <div className="flex items-center gap-2 mb-1">
                      <span>{s.icon}</span>
                      <span className="text-xs font-semibold text-blue-300">{s.category}</span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">{s.suggestion}</p>
                    <button className="mt-2 text-xs text-blue-400 hover:text-blue-300">Apply suggestion →</button>
                  </div>
                ))}
                <button className="btn-secondary w-full text-xs py-2 flex items-center justify-center gap-2">
                  <Sparkles size={14} />
                  Generate More Suggestions
                </button>
              </div>
            )}

            {tab === 'presets' && (
              <div className="space-y-3">
                {DESIGN_PRESETS.map((p, i) => (
                  <button
                    key={p.name}
                    onClick={() => setSelectedPreset(i)}
                    className={`w-full p-3 rounded-xl text-left transition-all ${
                      selectedPreset === i ? 'border border-blue-400/50 bg-blue-500/10' : 'border border-white/8 hover:border-white/15 hover:bg-white/4'
                    }`}
                  >
                    <div className={`h-12 rounded-lg bg-gradient-to-br ${p.bg} mb-2 relative overflow-hidden`}>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-3 rounded-full" style={{ background: p.accent, opacity: 0.7 }} />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-slate-300">{p.name}</span>
                      <span className="badge badge-blue text-xs">{p.theme}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Preview */}
        <div className="flex-1 bg-surface-900/30 overflow-auto p-6 flex items-start justify-center">
          <div
            className="w-full max-w-2xl rounded-2xl overflow-hidden border border-blue-900/20 shadow-2xl"
            style={{
              background: theme === 'dark' ? '#0a0f1e' : '#f8fafc',
              borderRadius: `${borderRadius}px`,
            }}
          >
            {/* Mock navbar */}
            <div className="px-6 py-4 flex items-center justify-between" style={{ background: theme === 'dark' ? '#0d1526' : '#ffffff', borderBottom: `1px solid ${primaryColor}25` }}>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg" style={{ background: primaryColor }} />
                <div className="w-20 h-3 rounded-full" style={{ background: theme === 'dark' ? '#334155' : '#e2e8f0' }} />
              </div>
              <div className="flex gap-4">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="w-12 h-2.5 rounded" style={{ background: theme === 'dark' ? '#1e293b' : '#e2e8f0' }} />
                ))}
              </div>
            </div>

            {/* Mock hero */}
            <div className="px-8 py-12 text-center" style={{ background: theme === 'dark' ? `radial-gradient(ellipse at center, ${primaryColor}20, transparent)` : `radial-gradient(ellipse at center, ${primaryColor}10, transparent)` }}>
              <div className="mx-auto w-48 h-5 rounded-full mb-4" style={{ background: primaryColor, opacity: 0.8 }} />
              <div className="mx-auto w-64 h-4 rounded-full mb-3" style={{ background: theme === 'dark' ? '#334155' : '#cbd5e1' }} />
              <div className="mx-auto w-48 h-3 rounded-full mb-8" style={{ background: theme === 'dark' ? '#1e293b' : '#e2e8f0' }} />
              <div className="flex justify-center gap-3">
                <div className="w-28 h-9 rounded-lg" style={{ background: primaryColor, borderRadius: `${Math.min(parseInt(borderRadius), 12)}px` }} />
                <div className="w-28 h-9 rounded-lg" style={{ background: 'transparent', border: `1px solid ${primaryColor}`, borderRadius: `${Math.min(parseInt(borderRadius), 12)}px` }} />
              </div>
            </div>

            {/* Mock features */}
            <div className="px-8 py-8 grid grid-cols-3 gap-4">
              {[1, 2, 3].map((n) => (
                <div key={n} className="p-4 rounded-xl" style={{ background: theme === 'dark' ? '#0d1526' : '#f1f5f9', borderRadius: `${Math.min(parseInt(borderRadius), 16)}px` }}>
                  <div className="w-8 h-8 rounded-lg mb-3" style={{ background: primaryColor, opacity: 0.3 }} />
                  <div className="w-full h-2.5 rounded mb-2" style={{ background: theme === 'dark' ? '#1e293b' : '#e2e8f0' }} />
                  <div className="w-3/4 h-2 rounded" style={{ background: theme === 'dark' ? '#0f172a' : '#f1f5f9' }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
