import { useState } from 'react';
import {
  Code2, FolderOpen, File, ChevronRight, ChevronDown,
  Download, Save, Bot, Send, Eye, X, Plus
} from 'lucide-react';

interface FileNode {
  name: string;
  type: 'file' | 'folder';
  ext?: string;
  children?: FileNode[];
}

const FILE_TREE: FileNode[] = [
  { name: 'src', type: 'folder', children: [
    { name: 'index.html', type: 'file', ext: 'html' },
    { name: 'styles.css', type: 'file', ext: 'css' },
    { name: 'main.js', type: 'file', ext: 'js' },
    { name: 'components', type: 'folder', children: [
      { name: 'Navbar.jsx', type: 'file', ext: 'jsx' },
      { name: 'Hero.jsx', type: 'file', ext: 'jsx' },
    ]},
  ]},
  { name: 'public', type: 'folder', children: [
    { name: 'logo.svg', type: 'file', ext: 'svg' },
  ]},
  { name: 'package.json', type: 'file', ext: 'json' },
];

const STARTER_CODE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>My Website</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Inter', sans-serif;
      background: #0a0f1e;
      color: #e2e8f0;
      min-height: 100vh;
    }
    .hero {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      text-align: center;
      background: radial-gradient(ellipse at center,
        rgba(37,99,235,0.15) 0%, transparent 70%);
    }
    .hero h1 {
      font-size: 4rem;
      font-weight: 700;
      background: linear-gradient(135deg, #60a5fa, #38bdf8);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 1.5rem;
    }
    .hero p {
      color: #94a3b8;
      font-size: 1.2rem;
      max-width: 600px;
      margin: 0 auto 2rem;
    }
    .btn {
      background: linear-gradient(135deg, #2563eb, #0ea5e9);
      color: white;
      padding: 0.75rem 2rem;
      border-radius: 0.5rem;
      border: none;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <section class="hero">
    <div>
      <h1>Hello World</h1>
      <p>Start editing to build something amazing!</p>
      <button class="btn">Get Started</button>
    </div>
  </section>
</body>
</html>`;

const AI_SUGGESTIONS = [
  'Add a responsive navbar',
  'Create a features grid section',
  'Add smooth scroll animations',
  'Make it mobile responsive',
  'Add a contact form',
  'Create a dark/light theme toggle',
];

type Panel = 'editor' | 'preview' | 'ai';

function FileTreeNode({ node, depth = 0 }: { node: FileNode; depth?: number }) {
  const [open, setOpen] = useState(depth === 0);
  const extColors: Record<string, string> = {
    html: 'text-orange-400', css: 'text-blue-400', js: 'text-yellow-400',
    jsx: 'text-cyan-400', json: 'text-green-400', svg: 'text-pink-400',
  };
  const color = node.ext ? extColors[node.ext] || 'text-slate-400' : 'text-blue-300';

  return (
    <div>
      <button
        className="w-full flex items-center gap-1.5 px-2 py-1 hover:bg-blue-500/10 rounded text-xs transition-all group"
        style={{ paddingLeft: `${depth * 12 + 8}px` }}
        onClick={() => node.type === 'folder' && setOpen(!open)}
      >
        {node.type === 'folder' ? (
          <>
            {open ? <ChevronDown size={12} className="text-slate-500" /> : <ChevronRight size={12} className="text-slate-500" />}
            <FolderOpen size={13} className="text-yellow-500/80" />
          </>
        ) : (
          <>
            <span className="w-3" />
            <File size={13} className={color} />
          </>
        )}
        <span className={`${node.type === 'folder' ? 'text-slate-300' : 'text-slate-400 group-hover:text-slate-200'}`}>
          {node.name}
        </span>
      </button>
      {node.type === 'folder' && open && node.children?.map((child) => (
        <FileTreeNode key={child.name} node={child} depth={depth + 1} />
      ))}
    </div>
  );
}

export default function DeveloperMode() {
  const [code, setCode] = useState(STARTER_CODE);
  const [activePanel, setActivePanel] = useState<Panel>('editor');
  const [aiInput, setAiInput] = useState('');
  const [aiMessages, setAiMessages] = useState([
    { role: 'assistant', text: 'Hi! I\'m your AI code assistant. Ask me to modify your code, add features, or fix bugs.' },
  ]);

  const sendAiMessage = () => {
    if (!aiInput.trim()) return;
    setAiMessages((prev) => [
      ...prev,
      { role: 'user', text: aiInput },
      { role: 'assistant', text: `I'll help you ${aiInput.toLowerCase()}. Here's an updated version of your code with the requested changes applied.` },
    ]);
    setAiInput('');
  };

  const lineCount = code.split('\n').length;

  return (
    <div className="min-h-screen pt-16 flex flex-col bg-[#0d1117]">
      {/* Toolbar */}
      <div className="flex items-center gap-2 px-4 py-2 border-b border-white/8 bg-[#161b22]">
        <Code2 size={16} className="text-blue-400" />
        <span className="font-display font-semibold text-white text-sm">Developer Mode</span>
        <div className="ml-4 flex gap-1">
          {(['editor', 'preview', 'ai'] as Panel[]).map((p) => (
            <button
              key={p}
              onClick={() => setActivePanel(p)}
              className={`text-xs px-3 py-1.5 rounded-lg capitalize transition-all ${
                activePanel === p ? 'tab-active border' : 'text-slate-400 hover:text-white border border-transparent'
              }`}
            >
              {p === 'ai' ? 'AI Assistant' : p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>
        <div className="ml-auto flex gap-2">
          <button className="btn-secondary text-xs py-1.5 px-3 flex items-center gap-1.5">
            <Save size={13} />Save
          </button>
          <button className="btn-secondary text-xs py-1.5 px-3 flex items-center gap-1.5">
            <Eye size={13} />Preview
          </button>
          <button className="btn-primary text-xs py-1.5 px-3 flex items-center gap-1.5">
            <Download size={13} />Export
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* File Explorer */}
        <div className="w-48 bg-[#161b22] border-r border-white/8 flex-shrink-0 overflow-y-auto">
          <div className="flex items-center justify-between px-3 py-2 border-b border-white/8">
            <span className="text-xs font-semibold text-slate-400 uppercase">Explorer</span>
            <button className="text-slate-500 hover:text-slate-300">
              <Plus size={14} />
            </button>
          </div>
          <div className="py-1">
            {FILE_TREE.map((node) => (
              <FileTreeNode key={node.name} node={node} />
            ))}
          </div>
        </div>

        {/* Main Area */}
        {activePanel === 'editor' && (
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Tab bar */}
            <div className="flex items-center gap-0 border-b border-white/8 bg-[#0d1117]">
              <div className="flex items-center gap-2 px-4 py-2 border-r border-white/8 border-b-2 border-b-blue-400 bg-[#1c2128]">
                <File size={12} className="text-orange-400" />
                <span className="text-xs text-slate-300">index.html</span>
                <X size={11} className="text-slate-500 hover:text-slate-300 cursor-pointer ml-1" />
              </div>
            </div>

            {/* Code editor */}
            <div className="flex-1 overflow-auto flex">
              {/* Line numbers */}
              <div className="text-xs text-slate-600 bg-[#0d1117] px-3 py-4 text-right select-none border-r border-white/5 leading-5 font-mono min-w-[3rem]">
                {Array.from({ length: lineCount }, (_, i) => i + 1).map((n) => (
                  <div key={n}>{n}</div>
                ))}
              </div>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="flex-1 bg-[#0d1117] text-[#c9d1d9] text-xs leading-5 font-mono p-4 resize-none outline-none border-none"
                spellCheck={false}
              />
            </div>
          </div>
        )}

        {activePanel === 'preview' && (
          <div className="flex-1 bg-white overflow-auto">
            <iframe
              srcDoc={code}
              className="w-full h-full border-none"
              title="Preview"
            />
          </div>
        )}

        {activePanel === 'ai' && (
          <div className="flex-1 flex flex-col bg-[#0d1117]">
            {/* AI Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div className="mb-4">
                <p className="text-xs text-slate-500 mb-2">Quick suggestions:</p>
                <div className="flex flex-wrap gap-2">
                  {AI_SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => setAiInput(s)}
                      className="text-xs px-2.5 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-300 hover:bg-blue-500/20 transition-all"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              {aiMessages.map((msg, i) => (
                <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center ${
                    msg.role === 'assistant' ? 'bg-blue-500/20 border border-blue-500/30' : 'bg-slate-600'
                  }`}>
                    {msg.role === 'assistant' ? <Bot size={14} className="text-blue-400" /> : <span className="text-xs">U</span>}
                  </div>
                  <div className={`max-w-sm rounded-xl px-3 py-2.5 text-xs leading-relaxed ${
                    msg.role === 'assistant' ? 'bg-surface-600 text-slate-300' : 'bg-blue-600 text-white'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            {/* Input */}
            <div className="p-3 border-t border-white/8 flex gap-2">
              <input
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendAiMessage()}
                placeholder="Ask AI to modify your code..."
                className="input-field text-xs flex-1"
              />
              <button onClick={sendAiMessage} className="btn-primary p-2">
                <Send size={14} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
