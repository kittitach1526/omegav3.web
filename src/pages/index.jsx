import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import MemberCard from '../components/MemberCard';
import {getMembers} from '../services/get_count.js';

const INITIAL_MEMBERS = [
  {
    id: 1,
    name: 'Sapphxre',
    role: 'ORCHESTRATOR // DOCKER FLEET',
    facebook: 'https://www.facebook.com/your_facebook_id',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80',
  },
  {
    id: 2,
    name: 'Khai Tun',
    role: 'VIP_PROTOCOL // CORE',
    facebook: 'https://www.facebook.com/',
    image: 'https://images.unsplash.com/photo-1506452815076-2e50c4401777?w=800&q=80',
  },
  {
    id: 3,
    name: 'Ghost',
    role: 'GHOST_OPERATIVE',
    facebook: 'https://www.facebook.com/',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80',
  },
  {
    id: 4,
    name: 'Anchor',
    role: 'DEFENSE_NODE',
    facebook: 'https://www.facebook.com/',
    image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&q=80',
  },
  {
    id: 5,
    name: 'Vortex',
    role: 'DATA_BREACHER',
    facebook: 'https://www.facebook.com/',
    image: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&q=80',
  },
];

export default function MembersLanding() {
  const [search, setSearch] = useState('');
  const [members, setMembers] = useState(INITIAL_MEMBERS);
  const [isLoading, setIsLoading] = useState(true);
  const [test_req, setTestReq] = useState(null);

  const navigate = useNavigate();
  const canvasRef = useRef(null);

  useEffect(() => {
    getMembers().then((data) => {
      setTestReq(data.members);
      setIsLoading(false);
    }).catch(() => {
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    console.log("test_req:", test_req);
    if (test_req !== null) {
      setMembers(test_req);
    }
  }, [test_req]);

  // ─── PARTICLES ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 50;
    const connectionDistance = 150;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
      });
    }

    let animId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, index) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0,240,255,0.3)';
        ctx.fill();

        for (let j = index + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);

          if (dist < connectionDistance) {
            const alpha = (1 - dist / connectionDistance) * 0.15;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0,240,255,${alpha})`;
            ctx.stroke();
          }
        }
      });

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [isLoading]);

  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(search.toLowerCase()) ||
      member.role.toLowerCase().includes(search.toLowerCase())
  );

  const SHARED_STYLES = `
    @keyframes blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }
    @keyframes loadBar {
      0% { width: 0%; }
      20% { width: 18%; }
      40% { width: 43%; }
      65% { width: 67%; }
      80% { width: 81%; }
      95% { width: 92%; }
    }
    @keyframes scanLine {
      from { transform: translateY(-100%); }
      to { transform: translateY(100vh); }
    }
    @keyframes flicker {
      0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% { opacity: 1; }
      20%, 22%, 24%, 55% { opacity: 0.4; }
    }
    @keyframes ultraLoad {
      from { width: 0%; }
      to { width: 92%; }
    }
    @keyframes shine {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(200%); }
    }
    @keyframes spinReverse {
      from { transform: rotate(360deg); }
      to { transform: rotate(0deg); }
    }
    @keyframes screenFlicker {
      0% { opacity: 0; }
      10% { opacity: 0.04; }
      20% { opacity: 0; }
      30% { opacity: 0.05; }
      40% { opacity: 0; }
      100% { opacity: 0; }
    }
    @keyframes scanMove {
      from { transform: translateY(-200px); }
      to { transform: translateY(100vh); }
    }
    @keyframes glitchText {
      0% { transform: translate(2px, 0); }
      25% { transform: translate(-2px, 1px); }
      50% { transform: translate(1px, -1px); }
      75% { transform: translate(-1px, 1px); }
      100% { transform: translate(2px, 0); }
    }
    @keyframes scanBar {
      0% { transform: translateY(-100px); }
      100% { transform: translateY(400px); }
    }
    @keyframes glitchImg {
      0% { transform: translate(2px, 1px) skew(2deg); }
      20% { transform: translate(-1px, -1px) skew(-3deg); }
      40% { transform: translate(1px, -2px) skew(1deg); }
      60% { transform: translate(-2px, 2px) skew(0deg); }
      80% { transform: translate(3px, -1px) skew(-2deg); }
      100% { transform: translate(-1px, 1px) skew(3deg); }
    }
    .cyber-noise {
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    }
  `;

  // ─── LOADING SCREEN ───
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#030305] text-white font-mono flex flex-col items-center justify-center relative overflow-hidden cursor-crosshair selection:bg-[#ff003c]">

        <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />

        <style>{SHARED_STYLES}</style>

        {/* Scanlines overlay */}
        <div
          className="fixed inset-0 pointer-events-none z-10"
          style={{
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,240,255,0.015) 2px, rgba(0,240,255,0.015) 4px)',
          }}
        />

        {/* Moving scan line */}
        <div
          className="fixed left-0 right-0 h-32 pointer-events-none z-10"
          style={{
            background: 'linear-gradient(to bottom, transparent, rgba(0,240,255,0.04), transparent)',
            animation: 'scanLine 3s linear infinite',
          }}
        />

        <div className="relative z-20 flex flex-col items-center gap-8 px-6 w-full max-w-lg">

          {/* Title */}
          <div style={{ animation: 'flicker 4s infinite' }} className="text-center">
            <div className="text-xs font-bold tracking-[0.4em] text-[#00f0ff]/60 mb-2">
              [ SYSTEM BOOT ]
            </div>
            <h1 className="text-5xl font-black uppercase tracking-tighter">
              SQUAD_
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff003c] via-[#ff003c] to-white">
                OPERATIVES
              </span>
            </h1>
          </div>

          {/* Terminal log */}
          <div className="w-full bg-black/60 border border-[#00f0ff]/20 p-4 text-xs space-y-1">
            <p className="text-[#00f0ff]/80">&gt; INITIALIZING SECURE_LINK...</p>
            <p className="text-[#00f0ff]/60">&gt; CONNECTING TO PERSONNEL_DB...</p>
            <p className="text-[#00f0ff]/40">&gt; FETCHING OPERATIVE RECORDS...</p>
            <p className="text-white/30 flex items-center gap-2">
              &gt; DECRYPTING DATA
              <span style={{ animation: 'blink 1s step-start infinite' }} className="text-[#ff003c]">▮</span>
            </p>
          </div>

          {/* Progress bar */}
          <div className="w-full">
            <div className="flex justify-between text-[10px] font-bold tracking-widest mb-2 text-[#00f0ff]/50">
              <span>LOADING OPERATIVES</span>
              <span style={{ animation: 'blink 0.8s step-start infinite' }}>■■■</span>
            </div>
            <div className="w-full h-1 bg-[#00f0ff]/10 relative overflow-hidden">
              <div
                className="h-full bg-[#00f0ff]"
                style={{ animation: 'loadBar 3s ease-out forwards' }}
              />
            </div>
          </div>

          {/* Bottom label */}
          <div className="text-[10px] tracking-[0.3em] text-white/20 uppercase">
            NET_CORE // PERSONNEL_DB // ACCESSING...
          </div>

        </div>
      </div>
    );
  }

  // ─── MAIN PAGE ───
  return (
    <div className="min-h-screen bg-[#030305] text-white font-mono overflow-x-hidden relative selection:bg-[#ff003c] selection:text-white cursor-crosshair pb-24">

      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />

      <style>{SHARED_STYLES}</style>

      {/* HEADER */}
      <header className="relative z-10 pt-16 pb-8 px-6 md:px-12 max-w-7xl mx-auto border-b-2 border-dashed border-[#00f0ff]/20 bg-black/60 backdrop-blur-md mt-6">

        <button
          onClick={() => navigate('/')}
          className="mb-8 px-5 py-2 text-xs font-bold tracking-[0.3em] text-[#00f0ff] border border-[#00f0ff]/30 bg-black/80 hover:bg-[#ff003c] hover:text-white hover:border-[#ff003c] transition-all duration-75 flex items-center gap-3 uppercase relative group"
        >
          &lt;&lt; BACK
        </button>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">

          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-3 text-xs font-bold tracking-[0.25em]">
              <span className="px-2 py-0.5 bg-[#ff003c] text-black text-[10px] font-black animate-pulse">
                SECURE_LINK
              </span>
              <span className="text-[#00f0ff]">
                NET_CORE // PERSONNEL_DB
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white">
              OMEGA_
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff003c] via-[#ff003c] to-white">
                MEMBERS
              </span>
            </h1>
          </div>

          {/* SEARCH */}
          <div className="w-full lg:w-96 relative">
            <input
              type="text"
              placeholder="SEARCH_BY_AGENT_OR_CLASS..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#07080c]/80 border border-[#00f0ff]/30 focus:border-[#ff003c] px-5 py-3 text-sm text-white placeholder-zinc-700 focus:outline-none transition-all duration-75 uppercase font-bold tracking-widest"
            />
          </div>

        </div>
      </header>

      {/* GRID */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredMembers.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>
      </main>

    </div>
  );
}