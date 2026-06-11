import { useEffect, useRef, useState } from 'react';
import { Zap, ArrowRight, Play, Star, Users, Globe } from 'lucide-react';
import type { ViewType } from '../types';

interface HeroProps {
  onNavigate: (view: ViewType) => void;
}

const TYPING_PHRASES = [
  'Build a modern SaaS landing page...',
  'Create an e-commerce store with dark theme...',
  'Design a portfolio with animations...',
  'Generate a restaurant website...',
  'Make a tech startup homepage...',
];

function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    interface Node {
      x: number; y: number; vx: number; vy: number;
      radius: number; pulse: number; pulseSpeed: number;
    }

    const nodes: Node[] = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2 + 1,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.02 + 0.01,
    }));

    let animId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;
        node.pulse += node.pulseSpeed;

        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        const alpha = 0.3 + Math.sin(node.pulse) * 0.4;

        ctx.beginPath();
        ctx.arc(node.x, node.y, Math.max(0, node.radius), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 130, 246, ${alpha})`;
        ctx.fill();

        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, 12);
        gradient.addColorStop(0, `rgba(59, 130, 246, ${alpha * 0.3})`);
        gradient.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.arc(node.x, node.y, 12, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      nodes.forEach((a, i) => {
        nodes.slice(i + 1).forEach((b) => {
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const alpha = (1 - dist / 120) * 0.4;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(59, 130, 246, ${alpha})`;
            ctx.lineWidth = alpha * 1.5;
            ctx.stroke();
          }
        });
      });

      animId = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-60"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}

function TypingText() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const phrase = TYPING_PHRASES[phraseIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < phrase.length) {
          setDisplayText(phrase.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setPhraseIndex((i) => (i + 1) % TYPING_PHRASES.length);
        }
      }
    }, isDeleting ? 40 : 60);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, phraseIndex]);

  return (
    <span className="text-slate-400 cursor-blink">
      {displayText}
    </span>
  );
}

const floatingCards = [
  { title: 'AI Website', sub: 'Generated in 3s', icon: '⚡', delay: '0s', x: '-left-4', y: 'top-1/4' },
  { title: 'Design Studio', sub: 'Drag & Drop', icon: '🎨', delay: '1s', x: '-right-4', y: 'top-1/3' },
  { title: 'Live Preview', sub: 'All devices', icon: '📱', delay: '2s', x: '-left-8', y: 'bottom-1/3' },
  { title: 'Code Export', sub: 'HTML/React', icon: '💻', delay: '1.5s', x: '-right-8', y: 'bottom-1/4' },
];

export default function Hero({ onNavigate }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden hero-bg">
      <NeuralBackground />

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />

      {/* Radial glow overlays */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/8 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-800/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 pt-24 pb-16 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8 animate-fade-in">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-sm text-slate-300 font-medium">AI-Powered Website Builder</span>
          <span className="badge badge-blue text-xs">v1.0</span>
        </div>

        {/* Headline */}
        <h1 className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl leading-tight mb-6 animate-slide-up">
          <span className="text-white">Build Websites with</span>
          <br />
          <span className="gradient-text">Artificial Intelligence</span>
        </h1>

        {/* Sub */}
        <p className="text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed animate-slide-up" style={{ animationDelay: '0.1s' }}>
          From instant AI generation to drag-and-drop building and professional code editing —
          all in one platform.
        </p>

        {/* AI Prompt Input */}
        <div className="max-w-2xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="glass neon-border rounded-2xl p-2 flex items-center gap-3">
            <div className="flex-1 px-3 py-2 text-left text-sm min-h-[40px] flex items-center">
              <TypingText />
            </div>
            <button
              onClick={() => onNavigate('instant-ai')}
              className="btn-primary flex items-center gap-2 whitespace-nowrap"
            >
              <Zap size={16} />
              Generate
            </button>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <button
            onClick={() => onNavigate('dashboard')}
            className="btn-primary flex items-center gap-2 text-base px-6 py-3"
          >
            Start Building Free
            <ArrowRight size={18} />
          </button>
          <button
            onClick={() => onNavigate('templates')}
            className="btn-secondary flex items-center gap-2 text-base px-6 py-3"
          >
            <Play size={16} />
            View Templates
          </button>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 text-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
          {[
            { icon: Star, label: '5 Build Modes', value: 'Instant AI to Code' },
            { icon: Users, label: 'AI Models', value: 'GPT, Claude, Gemini' },
            { icon: Globe, label: 'Export Formats', value: 'HTML, React, Next.js' },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-3 glass rounded-xl px-4 py-3">
              <Icon size={20} className="text-blue-400" />
              <div className="text-left">
                <div className="text-white font-semibold text-sm">{label}</div>
                <div className="text-slate-500 text-xs">{value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Preview Cards */}
      <div className="absolute inset-0 pointer-events-none hidden xl:block">
        {floatingCards.map((card) => (
          <div
            key={card.title}
            className={`absolute ${card.x} ${card.y} glass rounded-xl px-3 py-2.5 text-xs neon-border`}
            style={{ animation: `float 6s ease-in-out infinite`, animationDelay: card.delay }}
          >
            <div className="flex items-center gap-2">
              <span className="text-base">{card.icon}</span>
              <div>
                <div className="text-white font-semibold">{card.title}</div>
                <div className="text-slate-500">{card.sub}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <div className="w-0.5 h-8 bg-gradient-to-b from-blue-500 to-transparent rounded-full" />
        <span className="text-xs text-slate-600">Scroll to explore</span>
      </div>
    </section>
  );
}
