import { useState } from 'react';
import {
  MousePointer2, Type, Image, Layout, Columns, AlignLeft,
  Trash2, Move, GripVertical, Eye, Code2, Download
} from 'lucide-react';

const COMPONENTS = [
  { id: 'navbar', label: 'Navbar', icon: Layout, category: 'Layout' },
  { id: 'hero', label: 'Hero Section', icon: Columns, category: 'Sections' },
  { id: 'heading', label: 'Heading', icon: Type, category: 'Text' },
  { id: 'paragraph', label: 'Paragraph', icon: AlignLeft, category: 'Text' },
  { id: 'button', label: 'Button', icon: MousePointer2, category: 'UI' },
  { id: 'image', label: 'Image', icon: Image, category: 'Media' },
  { id: 'features', label: 'Features Grid', icon: Columns, category: 'Sections' },
  { id: 'pricing', label: 'Pricing Table', icon: Columns, category: 'Sections' },
  { id: 'footer', label: 'Footer', icon: Layout, category: 'Layout' },
];

const CATEGORIES = ['All', 'Layout', 'Sections', 'Text', 'UI', 'Media'];

const MOCK_ELEMENTS = [
  { id: 1, type: 'navbar', label: 'Navbar', bg: 'bg-slate-800', h: 'h-12' },
  { id: 2, type: 'hero', label: 'Hero Section', bg: 'bg-gradient-to-r from-blue-900 to-slate-900', h: 'h-32' },
  { id: 3, type: 'features', label: 'Features Grid', bg: 'bg-slate-800/60', h: 'h-24' },
  { id: 4, type: 'footer', label: 'Footer', bg: 'bg-slate-900', h: 'h-16' },
];

type PreviewSize = 'desktop' | 'tablet' | 'mobile';

export default function DragDropBuilder() {
  const [cat, setCat] = useState('All');
  const [elements, setElements] = useState(MOCK_ELEMENTS);
  const [selected, setSelected] = useState<number | null>(null);
  const [draggingOver, setDraggingOver] = useState(false);
  const [preview, setPreview] = useState<PreviewSize>('desktop');

  const filtered = cat === 'All' ? COMPONENTS : COMPONENTS.filter((c) => c.category === cat);

  const removeElement = (id: number) => {
    setElements((prev) => prev.filter((e) => e.id !== id));
    if (selected === id) setSelected(null);
  };

  const previewWidths: Record<PreviewSize, string> = {
    desktop: 'w-full',
    tablet: 'w-[768px] mx-auto',
    mobile: 'w-[375px] mx-auto',
  };

  return (
    <div className="min-h-screen pt-16 flex flex-col">
      {/* Toolbar */}
      <div className="border-b border-blue-900/20 bg-surface-800/90 px-4 py-2.5 flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <MousePointer2 size={18} className="text-sky-400" />
          <span className="font-display font-semibold text-white text-sm">Drag & Drop Builder</span>
        </div>
        <div className="ml-auto flex items-center gap-2">
          {(['desktop', 'tablet', 'mobile'] as PreviewSize[]).map((size) => (
            <button
              key={size}
              onClick={() => setPreview(size)}
              className={`text-xs px-3 py-1.5 rounded-lg transition-all ${
                preview === size ? 'tab-active border' : 'text-slate-400 hover:text-white border border-transparent hover:border-white/10'
              }`}
            >
              {size.charAt(0).toUpperCase() + size.slice(1)}
            </button>
          ))}
          <div className="w-px h-5 bg-blue-900/30 mx-1" />
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
        {/* Left Panel - Components */}
        <div className="w-56 sidebar flex-shrink-0 flex flex-col overflow-y-auto">
          <div className="p-3 border-b border-blue-900/20">
            <p className="text-xs font-semibold text-slate-400 mb-2">COMPONENTS</p>
            <div className="flex flex-wrap gap-1">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={`text-xs px-2 py-1 rounded transition-all ${
                    cat === c ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div className="p-2 flex-1">
            {filtered.map(({ id, label, icon: Icon }) => (
              <div
                key={id}
                draggable
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg cursor-grab active:cursor-grabbing hover:bg-blue-500/10 hover:border-blue-500/20 border border-transparent transition-all mb-1 group"
              >
                <GripVertical size={12} className="text-slate-600 group-hover:text-slate-400" />
                <Icon size={14} className="text-slate-400 group-hover:text-blue-400 flex-shrink-0" />
                <span className="text-xs text-slate-400 group-hover:text-slate-200">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 bg-surface-900/50 overflow-auto p-6">
          <div
            className={`${previewWidths[preview]} transition-all duration-300`}
            onDragOver={(e) => { e.preventDefault(); setDraggingOver(true); }}
            onDragLeave={() => setDraggingOver(false)}
            onDrop={() => setDraggingOver(false)}
          >
            <div className={`glass rounded-xl overflow-hidden min-h-96 ${draggingOver ? 'drop-zone-active' : 'border border-blue-900/20'}`}>
              {elements.length === 0 ? (
                <div className="h-96 flex flex-col items-center justify-center text-center">
                  <MousePointer2 size={40} className="text-blue-500/30 mb-3" />
                  <p className="text-slate-500 text-sm">Drag components here to build your page</p>
                </div>
              ) : (
                <div className="flex flex-col">
                  {elements.map((el) => (
                    <div
                      key={el.id}
                      className={`relative group cursor-pointer ${el.bg} ${el.h} flex items-center justify-center border-2 transition-all ${
                        selected === el.id ? 'border-blue-400' : 'border-transparent hover:border-blue-500/30'
                      }`}
                      onClick={() => setSelected(el.id === selected ? null : el.id)}
                    >
                      <span className="text-white/30 text-xs font-medium">{el.label}</span>
                      {selected === el.id && (
                        <div className="absolute top-1 right-1 flex gap-1">
                          <button className="p-1 rounded bg-blue-500 hover:bg-blue-400">
                            <Move size={10} className="text-white" />
                          </button>
                          <button
                            className="p-1 rounded bg-red-500 hover:bg-red-400"
                            onClick={(e) => { e.stopPropagation(); removeElement(el.id); }}
                          >
                            <Trash2 size={10} className="text-white" />
                          </button>
                        </div>
                      )}
                      {selected === el.id && (
                        <div className="absolute -left-0.5 -right-0.5 -top-0.5 -bottom-0.5 border-2 border-blue-400 rounded pointer-events-none" />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Panel - Properties */}
        <div className="w-60 sidebar flex-shrink-0 overflow-y-auto">
          <div className="panel-header">
            <p className="text-xs font-semibold text-slate-300">PROPERTIES</p>
          </div>
          {selected ? (
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-xs text-slate-400 mb-1.5">Element Type</label>
                <div className="input-field text-xs opacity-60 cursor-not-allowed">
                  {elements.find((e) => e.id === selected)?.type}
                </div>
              </div>
              {['Padding', 'Margin', 'Background', 'Text Color'].map((prop) => (
                <div key={prop}>
                  <label className="block text-xs text-slate-400 mb-1.5">{prop}</label>
                  <input className="input-field text-xs" placeholder={`Enter ${prop.toLowerCase()}`} />
                </div>
              ))}
              <button
                onClick={() => selected && removeElement(selected)}
                className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-red-400 border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 text-xs transition-all"
              >
                <Trash2 size={13} />
                Remove Element
              </button>
            </div>
          ) : (
            <div className="p-4 flex flex-col items-center justify-center text-center h-32">
              <MousePointer2 size={24} className="text-slate-600 mb-2" />
              <p className="text-slate-500 text-xs">Select an element to edit its properties</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
