import { useState, useRef } from 'react';
import {
  Upload, FileArchive, FileCode, File, ArrowRight, X,
  CheckCircle, AlertCircle, FolderOpen, Code2, Zap
} from 'lucide-react';
import type { ViewType } from '../../types';

interface Props {
  onNavigate: (view: ViewType) => void;
}

type UploadType = 'html' | 'css' | 'js' | 'react' | 'zip';

const UPLOAD_OPTIONS: { id: UploadType; label: string; ext: string; icon: any; color: string; desc: string }[] = [
  { id: 'html', label: 'HTML File', ext: '.html', icon: FileCode, color: 'text-orange-400', desc: 'Upload an HTML file to edit' },
  { id: 'css', label: 'CSS File', ext: '.css', icon: FileCode, color: 'text-blue-400', desc: 'Import stylesheet' },
  { id: 'js', label: 'JavaScript', ext: '.js', icon: FileCode, color: 'text-yellow-400', desc: 'Upload JS file' },
  { id: 'react', label: 'React Project', ext: '.jsx/.tsx', icon: Code2, color: 'text-cyan-400', desc: 'Import React components' },
  { id: 'zip', label: 'ZIP Archive', ext: '.zip', icon: FileArchive, color: 'text-green-400', desc: 'Upload full project ZIP' },
];

interface UploadedFile {
  name: string;
  size: number;
  type: UploadType;
  status: 'processing' | 'ready' | 'error';
}

export default function ImportEditMode({ onNavigate }: Props) {
  const [dragOver, setDragOver] = useState(false);
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList) return;
    const newFiles: UploadedFile[] = Array.from(fileList).map((f) => {
      let type: UploadType = 'html';
      if (f.name.endsWith('.zip')) type = 'zip';
      else if (f.name.endsWith('.css')) type = 'css';
      else if (f.name.endsWith('.js') || f.name.endsWith('.ts')) type = 'js';
      else if (f.name.endsWith('.jsx') || f.name.endsWith('.tsx')) type = 'react';
      return { name: f.name, size: f.size, type, status: 'processing' };
    });
    setFiles((prev) => [...prev, ...newFiles]);
    setTimeout(() => {
      setFiles((prev) =>
        prev.map((f) => (f.status === 'processing' ? { ...f, status: 'ready' } : f))
      );
    }, 1500);
  };

  const formatSize = (bytes: number) =>
    bytes < 1024 ? `${bytes}B` : bytes < 1048576 ? `${(bytes / 1024).toFixed(1)}KB` : `${(bytes / 1048576).toFixed(1)}MB`;

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-slide-up">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-xl bg-teal-500/10 border border-teal-500/20">
              <Upload size={22} className="text-teal-400" />
            </div>
            <div>
              <h1 className="font-display font-bold text-3xl text-white">Import & Edit Mode</h1>
              <p className="text-slate-400 text-sm">Upload your existing projects and edit them visually</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upload Zone */}
          <div className="space-y-4">
            <div
              className={`glass rounded-2xl p-8 text-center border-2 border-dashed transition-all duration-300 cursor-pointer ${
                dragOver
                  ? 'border-blue-400 bg-blue-500/10 shadow-glow-blue'
                  : 'border-blue-900/30 hover:border-blue-500/40 hover:bg-blue-500/5'
              }`}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files); }}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".html,.css,.js,.jsx,.ts,.tsx,.zip"
                className="hidden"
                onChange={(e) => handleFiles(e.target.files)}
              />
              <div className={`w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center transition-all ${
                dragOver ? 'bg-blue-500/30 scale-110' : 'bg-blue-500/10'
              }`}>
                <Upload size={28} className="text-blue-400" />
              </div>
              <h3 className="font-semibold text-white mb-2">Drop files here</h3>
              <p className="text-slate-400 text-sm mb-4">or click to browse</p>
              <div className="flex flex-wrap justify-center gap-2">
                {['.html', '.css', '.js', '.jsx', '.tsx', '.zip'].map((ext) => (
                  <span key={ext} className="badge badge-blue text-xs">{ext}</span>
                ))}
              </div>
            </div>

            {/* Supported formats */}
            <div className="glass rounded-xl p-4 border border-blue-900/20">
              <p className="text-xs font-semibold text-slate-400 mb-3 uppercase">Supported Formats</p>
              <div className="space-y-2">
                {UPLOAD_OPTIONS.map(({ id, label, ext, icon: Icon, color, desc }) => (
                  <div key={id} className="flex items-center gap-3">
                    <Icon size={16} className={color} />
                    <div className="flex-1">
                      <span className="text-xs text-slate-300 font-medium">{label}</span>
                      <span className="text-xs text-slate-500 ml-2">{ext}</span>
                    </div>
                    <span className="text-xs text-slate-600">{desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right side */}
          <div className="space-y-4">
            {/* Uploaded files */}
            {files.length > 0 && (
              <div className="glass rounded-xl p-4 border border-blue-900/20">
                <p className="text-xs font-semibold text-slate-400 mb-3 uppercase">Uploaded Files</p>
                <div className="space-y-2">
                  {files.map((f, i) => {
                    const opt = UPLOAD_OPTIONS.find((o) => o.id === f.type);
                    const Icon = opt?.icon || File;
                    return (
                      <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg bg-white/4">
                        <Icon size={16} className={opt?.color || 'text-slate-400'} />
                        <div className="flex-1 min-w-0">
                          <div className="text-xs text-slate-300 truncate">{f.name}</div>
                          <div className="text-xs text-slate-500">{formatSize(f.size)}</div>
                        </div>
                        {f.status === 'processing' ? (
                          <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                        ) : f.status === 'ready' ? (
                          <CheckCircle size={16} className="text-green-400" />
                        ) : (
                          <AlertCircle size={16} className="text-red-400" />
                        )}
                        <button onClick={() => setFiles((prev) => prev.filter((_, j) => j !== i))}>
                          <X size={14} className="text-slate-500 hover:text-red-400" />
                        </button>
                      </div>
                    );
                  })}
                </div>
                {files.some((f) => f.status === 'ready') && (
                  <button
                    onClick={() => onNavigate('visual-editor')}
                    className="btn-primary w-full mt-4 flex items-center justify-center gap-2"
                  >
                    Open in Editor
                    <ArrowRight size={16} />
                  </button>
                )}
              </div>
            )}

            {/* Import from URL */}
            <div className="glass rounded-xl p-4 border border-blue-900/20">
              <p className="text-xs font-semibold text-slate-400 mb-3 uppercase">Import from URL</p>
              <div className="flex gap-2">
                <input
                  type="url"
                  placeholder="https://github.com/user/repo"
                  className="input-field text-sm flex-1"
                />
                <button className="btn-primary px-3 py-2 flex items-center gap-1.5 whitespace-nowrap text-sm">
                  <FolderOpen size={14} />
                  Import
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="glass rounded-xl p-4 border border-blue-900/20">
              <p className="text-xs font-semibold text-slate-400 mb-3 uppercase">After Importing</p>
              <div className="space-y-2">
                {[
                  { icon: Zap, label: 'AI Enhance', desc: 'Let AI improve your code' },
                  { icon: Code2, label: 'Code Editor', desc: 'Edit in full IDE mode' },
                  { icon: FolderOpen, label: 'Visual Editor', desc: 'Edit visually with clicks' },
                ].map(({ icon: Icon, label, desc }) => (
                  <div key={label} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-white/4 transition-all cursor-pointer group">
                    <Icon size={16} className="text-blue-400" />
                    <div>
                      <div className="text-xs text-slate-300 font-medium group-hover:text-white">{label}</div>
                      <div className="text-xs text-slate-500">{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
