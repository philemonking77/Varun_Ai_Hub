import { useState } from 'react';
import {
  MousePointer2, Type, Palette, Move, AlignCenter,
  AlignLeft, AlignRight, Bold, Italic, Underline, Link,
  Square, ChevronUp, ChevronDown, Trash2, Copy,
  Eye, Code2, Download, Undo2, Redo2, Smartphone, Tablet, Monitor
} from 'lucide-react';
import { useHistory } from '../hooks/useHistory';

type Device = 'desktop' | 'tablet' | 'mobile';

interface Element {
  id: string;
  tag: string;
  content: string;
  styles: Record<string, string>;
}

const INITIAL_ELEMENTS: Element[] = [
  { id: 'nav1', tag: 'nav', content: 'Navigation Bar', styles: { background: '#0d1526', padding: '16px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' } },
  { id: 'hero1', tag: 'section', content: 'Hero Section - Click to edit', styles: { background: 'radial-gradient(ellipse at center, rgba(37,99,235,0.2), #0a0f1e)', padding: '80px 32px', textAlign: 'center', minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' } },
  { id: 'features1', tag: 'section', content: 'Features Section', styles: { background: '#0d1526', padding: '64px 32px', textAlign: 'center' } },
  { id: 'footer1', tag: 'footer', content: 'Footer', styles: { background: '#050a14', padding: '32px', textAlign: 'center', borderTop: '1px solid rgba(59,130,246,0.1)' } },
];

const deviceWidths: Record<Device, string> = {
  desktop: '100%',
  tablet: '768px',
  mobile: '375px',
};

const deviceIcons: Record<Device, any> = {
  desktop: Monitor,
  tablet: Tablet,
  mobile: Smartphone,
};

export default function VisualEditor() {
  const [device, setDevice] = useState<Device>('desktop');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { state: elements, push, undo, redo, canUndo, canRedo } = useHistory(INITIAL_ELEMENTS);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');

  const selected = elements.find((e) => e.id === selectedId);

  const updateStyle = (prop: string, value: string) => {
    if (!selectedId) return;
    push(elements.map((el) =>
      el.id === selectedId ? { ...el, styles: { ...el.styles, [prop]: value } } : el
    ));
  };

  const updateContent = (id: string, content: string) => {
    push(elements.map((el) => (el.id === id ? { ...el, content } : el)));
  };

  const startEdit = (el: Element) => {
    setEditingId(el.id);
    setEditText(el.content);
  };

  const finishEdit = () => {
    if (editingId) updateContent(editingId, editText);
    setEditingId(null);
  };

  const removeElement = (id: string) => {
    push(elements.filter((e) => e.id !== id));
    if (selectedId === id) setSelectedId(null);
  };

  const duplicateElement = (id: string) => {
    const el = elements.find((e) => e.id === id);
    if (!el) return;
    const idx = elements.indexOf(el);
    const copy = { ...el, id: `${el.id}_copy_${Date.now()}` };
    const next = [...elements];
    next.splice(idx + 1, 0, copy);
    push(next);
  };

  const moveElement = (id: string, dir: 'up' | 'down') => {
    const idx = elements.findIndex((e) => e.id === id);
    if (dir === 'up' && idx === 0) return;
    if (dir === 'down' && idx === elements.length - 1) return;
    const next = [...elements];
    const swap = dir === 'up' ? idx - 1 : idx + 1;
    [next[idx], next[swap]] = [next[swap], next[idx]];
    push(next);
  };

  return (
    <div className="min-h-screen pt-16 flex flex-col">
      {/* Toolbar */}
      <div className="border-b border-blue-900/20 bg-surface-800/90 px-4 py-2 flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <MousePointer2 size={16} className="text-blue-400" />
          <span className="font-display font-semibold text-white text-sm">Visual Editor</span>
        </div>

        {/* Undo/Redo */}
        <div className="flex gap-1">
          <button onClick={undo} disabled={!canUndo} title="Undo (Ctrl+Z)"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/8 disabled:opacity-30 transition-all">
            <Undo2 size={15} />
          </button>
          <button onClick={redo} disabled={!canRedo} title="Redo (Ctrl+Y)"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/8 disabled:opacity-30 transition-all">
            <Redo2 size={15} />
          </button>
        </div>

        <div className="w-px h-5 bg-blue-900/30" />

        {/* Text formatting */}
        <div className="flex gap-1">
          {[
            { icon: Bold, tip: 'Bold' },
            { icon: Italic, tip: 'Italic' },
            { icon: Underline, tip: 'Underline' },
            { icon: Link, tip: 'Link' },
          ].map(({ icon: Icon, tip }) => (
            <button key={tip} title={tip}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/8 transition-all">
              <Icon size={14} />
            </button>
          ))}
        </div>

        <div className="w-px h-5 bg-blue-900/30" />

        {/* Alignment */}
        <div className="flex gap-1">
          {[AlignLeft, AlignCenter, AlignRight].map((Icon, i) => (
            <button key={i}
              onClick={() => updateStyle('textAlign', ['left', 'center', 'right'][i])}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/8 transition-all">
              <Icon size={14} />
            </button>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-2">
          {/* Device selector */}
          <div className="flex gap-1">
            {(['desktop', 'tablet', 'mobile'] as Device[]).map((d) => {
              const Icon = deviceIcons[d];
              return (
                <button
                  key={d}
                  onClick={() => setDevice(d)}
                  className={`p-1.5 rounded-lg transition-all ${device === d ? 'text-blue-400 bg-blue-500/15' : 'text-slate-400 hover:text-white hover:bg-white/8'}`}
                >
                  <Icon size={15} />
                </button>
              );
            })}
          </div>
          <div className="w-px h-5 bg-blue-900/30" />
          <button className="btn-secondary text-xs py-1.5 px-3 flex items-center gap-1.5">
            <Eye size={13} />Preview
          </button>
          <button className="btn-secondary text-xs py-1.5 px-3 flex items-center gap-1.5">
            <Code2 size={13} />Code
          </button>
          <button className="btn-primary text-xs py-1.5 px-3 flex items-center gap-1.5">
            <Download size={13} />Export
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left: Layers */}
        <div className="w-48 sidebar flex-shrink-0 overflow-y-auto">
          <div className="panel-header">
            <p className="text-xs font-semibold text-slate-400 uppercase">Layers</p>
          </div>
          <div className="p-2">
            {elements.map((el, i) => (
              <div
                key={el.id}
                className={`flex items-center gap-2 px-2.5 py-2 rounded-lg cursor-pointer mb-1 group transition-all ${
                  selectedId === el.id ? 'bg-blue-500/15 border border-blue-500/25' : 'hover:bg-white/5'
                }`}
                onClick={() => setSelectedId(el.id === selectedId ? null : el.id)}
              >
                <Square size={12} className={selectedId === el.id ? 'text-blue-400' : 'text-slate-500'} />
                <span className="text-xs text-slate-300 truncate flex-1">{el.tag}</span>
                <div className="hidden group-hover:flex gap-0.5">
                  <button onClick={(e) => { e.stopPropagation(); moveElement(el.id, 'up'); }} disabled={i === 0}
                    className="p-0.5 rounded text-slate-500 hover:text-white disabled:opacity-30">
                    <ChevronUp size={11} />
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); moveElement(el.id, 'down'); }} disabled={i === elements.length - 1}
                    className="p-0.5 rounded text-slate-500 hover:text-white disabled:opacity-30">
                    <ChevronDown size={11} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 bg-surface-900/50 overflow-auto p-6 flex justify-center">
          <div
            className="bg-white rounded-xl overflow-hidden shadow-2xl transition-all duration-300"
            style={{ width: deviceWidths[device], minHeight: '500px' }}
          >
            {elements.map((el) => (
              <div
                key={el.id}
                className={`relative group cursor-pointer transition-all ${
                  selectedId === el.id ? 'outline outline-2 outline-blue-400' : 'hover:outline hover:outline-1 hover:outline-blue-400/40'
                }`}
                style={el.styles as React.CSSProperties}
                onClick={() => setSelectedId(el.id === selectedId ? null : el.id)}
                onDoubleClick={() => startEdit(el)}
              >
                {editingId === el.id ? (
                  <input
                    autoFocus
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onBlur={finishEdit}
                    onKeyDown={(e) => e.key === 'Enter' && finishEdit()}
                    className="bg-transparent outline-none text-current w-full"
                    onClick={(e) => e.stopPropagation()}
                  />
                ) : (
                  <span className="text-white/40 text-sm">{el.content}</span>
                )}

                {selectedId === el.id && (
                  <div className="absolute top-1 right-1 flex gap-1 z-10">
                    <button onClick={(e) => { e.stopPropagation(); duplicateElement(el.id); }}
                      className="p-1 rounded bg-blue-500 hover:bg-blue-400">
                      <Copy size={10} className="text-white" />
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); removeElement(el.id); }}
                      className="p-1 rounded bg-red-500 hover:bg-red-400">
                      <Trash2 size={10} className="text-white" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right: Properties */}
        <div className="w-64 sidebar flex-shrink-0 overflow-y-auto">
          <div className="panel-header">
            <p className="text-xs font-semibold text-slate-400 uppercase">
              {selected ? `${selected.tag} Properties` : 'Properties'}
            </p>
          </div>
          {selected ? (
            <div className="p-4 space-y-4">
              {/* Background */}
              <div>
                <label className="block text-xs text-slate-400 mb-2 flex items-center gap-1.5">
                  <Palette size={12} />Background Color
                </label>
                <div className="flex gap-2">
                  <input type="color" defaultValue="#0d1526"
                    onChange={(e) => updateStyle('background', e.target.value)}
                    className="w-9 h-9 rounded-lg cursor-pointer border border-white/10 bg-transparent" />
                  <input type="text" value={selected.styles.background || ''}
                    onChange={(e) => updateStyle('background', e.target.value)}
                    className="input-field text-xs flex-1 font-mono" />
                </div>
              </div>

              {/* Text Color */}
              <div>
                <label className="block text-xs text-slate-400 mb-2 flex items-center gap-1.5">
                  <Type size={12} />Text Color
                </label>
                <div className="flex gap-2">
                  <input type="color" defaultValue="#ffffff"
                    onChange={(e) => updateStyle('color', e.target.value)}
                    className="w-9 h-9 rounded-lg cursor-pointer border border-white/10 bg-transparent" />
                  <input type="text" value={selected.styles.color || ''}
                    onChange={(e) => updateStyle('color', e.target.value)}
                    className="input-field text-xs flex-1 font-mono" />
                </div>
              </div>

              {/* Padding */}
              <div>
                <label className="block text-xs text-slate-400 mb-2 flex items-center gap-1.5">
                  <Move size={12} />Padding
                </label>
                <input
                  type="text"
                  value={selected.styles.padding || ''}
                  onChange={(e) => updateStyle('padding', e.target.value)}
                  placeholder="e.g. 16px or 16px 32px"
                  className="input-field text-xs"
                />
              </div>

              {/* Font Size */}
              <div>
                <label className="block text-xs text-slate-400 mb-2">Font Size</label>
                <input
                  type="text"
                  value={selected.styles.fontSize || ''}
                  onChange={(e) => updateStyle('fontSize', e.target.value)}
                  placeholder="e.g. 16px or 1.5rem"
                  className="input-field text-xs"
                />
              </div>

              {/* Border Radius */}
              <div>
                <label className="block text-xs text-slate-400 mb-2">Border Radius</label>
                <input
                  type="text"
                  value={selected.styles.borderRadius || ''}
                  onChange={(e) => updateStyle('borderRadius', e.target.value)}
                  placeholder="e.g. 8px"
                  className="input-field text-xs"
                />
              </div>

              {/* Actions */}
              <div className="pt-2 flex gap-2">
                <button onClick={() => duplicateElement(selected.id)}
                  className="flex-1 btn-secondary text-xs py-2 flex items-center justify-center gap-1.5">
                  <Copy size={12} />Duplicate
                </button>
                <button onClick={() => removeElement(selected.id)}
                  className="flex-1 text-xs py-2 flex items-center justify-center gap-1.5 rounded-lg border border-red-500/20 bg-red-500/5 text-red-400 hover:bg-red-500/10 transition-all">
                  <Trash2 size={12} />Delete
                </button>
              </div>
            </div>
          ) : (
            <div className="p-6 text-center">
              <MousePointer2 size={28} className="text-slate-600 mx-auto mb-2" />
              <p className="text-xs text-slate-500">Click an element to edit its properties</p>
              <p className="text-xs text-slate-600 mt-1">Double-click to edit text</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
