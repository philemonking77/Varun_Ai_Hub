import { useState } from 'react';
import { MessageSquare, ArrowRight, ArrowLeft, Check, RefreshCw, Wand2 } from 'lucide-react';
import type { ViewType } from '../../types';

interface Props {
  onNavigate: (view: ViewType) => void;
}

const STEPS = [
  {
    id: 'type',
    question: "What type of website do you want to build?",
    options: [
      { label: 'Business / Corporate', icon: '🏢' },
      { label: 'Portfolio / Personal', icon: '👤' },
      { label: 'E-Commerce', icon: '🛒' },
      { label: 'Blog / Magazine', icon: '📝' },
      { label: 'SaaS / Product', icon: '🚀' },
      { label: 'Restaurant / Food', icon: '🍽️' },
      { label: 'Agency / Creative', icon: '🎨' },
      { label: 'Other', icon: '✨' },
    ],
  },
  {
    id: 'style',
    question: "What's your preferred design style?",
    options: [
      { label: 'Modern & Minimal', icon: '⬜' },
      { label: 'Dark & Futuristic', icon: '🌑' },
      { label: 'Bold & Colorful', icon: '🌈' },
      { label: 'Clean & Professional', icon: '📋' },
      { label: 'Elegant & Luxury', icon: '💎' },
      { label: 'Playful & Fun', icon: '🎮' },
    ],
  },
  {
    id: 'sections',
    question: "Which sections do you need?",
    multi: true,
    options: [
      { label: 'Hero Section', icon: '🦸' },
      { label: 'About / Story', icon: '📖' },
      { label: 'Features / Services', icon: '⭐' },
      { label: 'Portfolio / Work', icon: '🖼️' },
      { label: 'Pricing Plans', icon: '💰' },
      { label: 'Testimonials', icon: '💬' },
      { label: 'Team Members', icon: '👥' },
      { label: 'Contact Form', icon: '📮' },
      { label: 'FAQ', icon: '❓' },
      { label: 'Blog Posts', icon: '📰' },
    ],
  },
  {
    id: 'colors',
    question: "Choose your primary color scheme:",
    options: [
      { label: 'Ocean Blue', icon: '🌊', color: '#2563eb' },
      { label: 'Forest Green', icon: '🌿', color: '#059669' },
      { label: 'Sunset Orange', icon: '🌅', color: '#ea580c' },
      { label: 'Royal Purple', icon: '👑', color: '#7c3aed' },
      { label: 'Crimson Red', icon: '🔴', color: '#dc2626' },
      { label: 'Golden Yellow', icon: '✨', color: '#d97706' },
      { label: 'Slate Gray', icon: '🔘', color: '#475569' },
      { label: 'Pink Coral', icon: '🌸', color: '#e11d48' },
    ],
  },
  {
    id: 'name',
    question: "What's your website/brand name?",
    input: true,
    placeholder: "e.g. Acme Corp, John Doe Design, TechStartup...",
  },
];

export default function AIGuidedMode({ onNavigate }: Props) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [currentInput, setCurrentInput] = useState('');
  const [generating, setGenerating] = useState(false);
  const [done, setDone] = useState(false);

  const currentStep = STEPS[step];

  const selectOption = (option: string) => {
    if (currentStep.multi) {
      const prev = (answers[currentStep.id] as string[]) || [];
      const next = prev.includes(option)
        ? prev.filter((v) => v !== option)
        : [...prev, option];
      setAnswers({ ...answers, [currentStep.id]: next });
    } else {
      setAnswers({ ...answers, [currentStep.id]: option });
      if (step < STEPS.length - 1) setTimeout(() => setStep(step + 1), 300);
    }
  };

  const isSelected = (option: string) => {
    const val = answers[currentStep.id];
    if (Array.isArray(val)) return val.includes(option);
    return val === option;
  };

  const handleNext = () => {
    if (currentStep.input) setAnswers({ ...answers, [currentStep.id]: currentInput });
    if (step < STEPS.length - 1) {
      setStep(step + 1);
    } else {
      handleGenerate();
    }
  };

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => { setGenerating(false); setDone(true); }, 3000);
  };

  const canNext = currentStep.multi
    ? ((answers[currentStep.id] as string[]) || []).length > 0
    : currentStep.input
    ? currentInput.trim().length > 0
    : !!answers[currentStep.id];

  if (done) {
    return (
      <div className="min-h-screen pt-20 pb-12 px-4 flex items-center justify-center">
        <div className="max-w-lg w-full glass rounded-2xl p-8 text-center border border-green-500/20 animate-slide-up">
          <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mx-auto mb-4">
            <Check size={32} className="text-green-400" />
          </div>
          <h2 className="font-display font-bold text-2xl text-white mb-2">Website Ready!</h2>
          <p className="text-slate-400 text-sm mb-6">Your guided website has been generated based on your preferences.</p>
          <div className="space-y-2 text-left mb-6">
            {Object.entries(answers).map(([k, v]) => (
              <div key={k} className="flex justify-between text-sm">
                <span className="text-slate-500 capitalize">{k}:</span>
                <span className="text-blue-300">{Array.isArray(v) ? v.join(', ') : v}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            <button onClick={() => { setDone(false); setStep(0); setAnswers({}); }} className="btn-secondary flex-1">
              Start Over
            </button>
            <button onClick={() => onNavigate('visual-editor')} className="btn-primary flex-1">
              Open Editor
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
              <MessageSquare size={22} className="text-cyan-400" />
            </div>
            <div>
              <h1 className="font-display font-bold text-3xl text-white">AI Guided Mode</h1>
              <p className="text-slate-400 text-sm">Answer a few questions and AI builds your site</p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="flex items-center gap-2 mb-2">
            {STEPS.map((s, i) => (
              <div
                key={s.id}
                className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                  i < step ? 'bg-blue-500' : i === step ? 'bg-blue-400 animate-pulse' : 'bg-surface-600'
                }`}
              />
            ))}
          </div>
          <div className="text-xs text-slate-500">Step {step + 1} of {STEPS.length}</div>
        </div>

        {/* Question card */}
        {generating ? (
          <div className="glass rounded-2xl p-8 text-center border border-blue-500/15 animate-pulse-glow">
            <RefreshCw size={40} className="text-blue-400 mx-auto mb-4 animate-spin" />
            <h3 className="font-display font-bold text-xl text-white mb-2">Building Your Website...</h3>
            <p className="text-slate-400 text-sm">AI is generating your custom website based on your preferences</p>
          </div>
        ) : (
          <div className="glass rounded-2xl p-6 border border-blue-500/15 animate-slide-up">
            <h2 className="font-display font-bold text-2xl text-white mb-6">{currentStep.question}</h2>

            {currentStep.input ? (
              <input
                type="text"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                placeholder={currentStep.placeholder}
                className="input-field text-lg py-4 mb-6"
                onKeyDown={(e) => e.key === 'Enter' && canNext && handleNext()}
                autoFocus
              />
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
                {currentStep.options?.map((opt) => (
                  <button
                    key={opt.label}
                    onClick={() => selectOption(opt.label)}
                    className={`p-4 rounded-xl border text-left transition-all duration-200 ${
                      isSelected(opt.label)
                        ? 'bg-blue-500/20 border-blue-400/50 text-white shadow-glow-blue'
                        : 'bg-surface-600/50 border-white/8 text-slate-400 hover:border-blue-500/30 hover:bg-blue-500/10'
                    }`}
                  >
                    <div className="text-2xl mb-2">{opt.icon}</div>
                    <div className="text-xs font-medium">{opt.label}</div>
                    {(opt as any).color && (
                      <div className="w-4 h-1.5 rounded-full mt-1.5" style={{ background: (opt as any).color }} />
                    )}
                  </button>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between">
              <button
                onClick={() => step > 0 && setStep(step - 1)}
                disabled={step === 0}
                className="btn-secondary flex items-center gap-2 disabled:opacity-30"
              >
                <ArrowLeft size={16} />
                Back
              </button>
              <button
                onClick={handleNext}
                disabled={!canNext}
                className="btn-primary flex items-center gap-2 disabled:opacity-30"
              >
                {step === STEPS.length - 1 ? (
                  <><Wand2 size={16} />Generate Website</>
                ) : (
                  <>Next<ArrowRight size={16} /></>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
