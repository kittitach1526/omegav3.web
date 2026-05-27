import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// ─── DATABASE ───
const INITIAL_MEMBERS = [
  {
    id: 1,
    name: 'Sapphxre',
    role: 'ORCHESTRATOR // DOCKER FLEET',
    facebook: 'https://www.facebook.com/your_facebook_id',
    image:
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80',
  },
  {
    id: 2,
    name: 'Khai Tun',
    role: 'VIP_PROTOCOL // CORE',
    facebook: 'https://www.facebook.com/',
    image:
      'https://images.unsplash.com/photo-1506452815076-2e50c4401777?w=800&q=80',
  },
  {
    id: 3,
    name: 'Ghost',
    role: 'GHOST_OPERATIVE',
    facebook: 'https://www.facebook.com/',
    image:
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80',
  },
  {
    id: 4,
    name: 'Anchor',
    role: 'DEFENSE_NODE',
    facebook: 'https://www.facebook.com/',
    image:
      'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&q=80',
  },
  {
    id: 5,
    name: 'Vortex',
    role: 'DATA_BREACHER',
    facebook: 'https://www.facebook.com/',
    image:
      'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&q=80',
  },
];

// ─────────────────────────────────────────────
// MEMBER CARD
// ─────────────────────────────────────────────
function MemberCard({ member }) {
  const [displayName, setDisplayName] = useState(member.name);
  const [loading, setLoading] = useState(false);

  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*§⚡';

  // ─── NAME SCRAMBLE ───
  const triggerScramble = () => {
    let iterations = 0;

    const interval = setInterval(() => {
      setDisplayName(
        member.name
          .split('')
          .map((letter, index) => {
            if (index < iterations) {
              return member.name[index];
            }

            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      if (iterations >= member.name.length) {
        clearInterval(interval);
      }

      iterations += 1 / 2;
    }, 30);
  };

  // ─── OPEN FACEBOOK ───
  const handleOpenFacebook = () => {
    setLoading(true);

    setTimeout(() => {
      window.open(member.facebook, '_blank', 'noopener,noreferrer');
      setLoading(false);
    }, 2600);
  };

  // ─────────────────────────────────────────────
  // CINEMATIC LOADING
  // ─────────────────────────────────────────────
  if (loading) {
    return (
      <div className="fixed inset-0 z-[999999] bg-black overflow-hidden flex items-center justify-center">

        {/* Background */}
        <div className="absolute inset-0 bg-[#020203]"></div>

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,240,255,0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,240,255,0.08) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Scan Light */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-[#00f0ff22] to-transparent animate-[scanMove_2s_linear_infinite] blur-2xl"></div>
        </div>

        {/* Noise */}
        <div className="absolute inset-0 cyber-noise opacity-[0.04]"></div>

        {/* Flicker */}
        <div className="absolute inset-0 animate-[screenFlicker_0.15s_infinite] mix-blend-screen pointer-events-none"></div>

        {/* CENTER */}
        <div className="relative z-20 text-center">

          {/* RINGS */}
          <div className="relative w-[280px] h-[280px] mx-auto mb-12">

            {/* OUTER */}
            <div className="absolute inset-0 rounded-full border border-[#00f0ff]/20 animate-spin"></div>

            {/* MIDDLE */}
            <div className="absolute inset-5 rounded-full border-2 border-dashed border-[#ff003c] animate-[spinReverse_8s_linear_infinite]"></div>

            {/* INNER */}
            <div className="absolute inset-14 rounded-full border border-[#00f0ff] animate-pulse"></div>

            {/* ROTATING LINES */}
            <div className="absolute inset-0 animate-spin">
              <div className="absolute left-1/2 top-0 w-[2px] h-10 bg-[#00f0ff] -translate-x-1/2 shadow-[0_0_20px_#00f0ff]"></div>

              <div className="absolute left-1/2 bottom-0 w-[2px] h-10 bg-[#ff003c] -translate-x-1/2 shadow-[0_0_20px_#ff003c]"></div>
            </div>

            {/* CORE */}
            <div className="absolute inset-[90px] rounded-full bg-[#00f0ff]/20 backdrop-blur-xl border border-[#00f0ff]/40 shadow-[0_0_50px_#00f0ff] flex items-center justify-center">

              <div className="text-center">

                <div className="text-[#00f0ff] text-[11px] tracking-[0.5em] font-black animate-pulse">
                  CONNECT
                </div>

                <div className="mt-2 text-[#ff003c] text-[9px] tracking-[0.3em]">
                  FACEBOOK_GATE
                </div>

              </div>

            </div>

            {/* PING */}
            <div className="absolute inset-0 rounded-full border border-[#00f0ff] animate-ping opacity-20"></div>

          </div>

          {/* TITLE */}
          <h1 className="text-4xl font-black tracking-[0.35em] text-white uppercase relative">

            <span className="absolute left-0 top-0 text-[#ff003c] blur-[2px] opacity-70 animate-[glitchText_0.2s_infinite]">
              ESTABLISHING LINK
            </span>

            <span className="relative text-[#00f0ff]">
              ESTABLISHING LINK
            </span>

          </h1>

          {/* PROGRESS */}
          <div className="w-[500px] max-w-[90vw] mt-10 mx-auto">

            <div className="flex justify-between text-[10px] uppercase tracking-[0.3em] mb-3">

              <span className="text-[#00f0ff]">
                Decrypting Session
              </span>

              <span className="text-[#ff003c] animate-pulse">
                92%
              </span>

            </div>

            <div className="h-3 bg-[#0a0a0a] border border-[#00f0ff]/20 overflow-hidden relative">

              {/* Fill */}
              <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#00f0ff] via-[#00f0ff] to-[#ff003c] animate-[ultraLoad_2s_ease-out_forwards]"></div>

              {/* Shine */}
              <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.3),transparent)] animate-[shine_1s_linear_infinite]"></div>

            </div>

          </div>

          {/* TERMINAL */}
          <div className="mt-10 text-left bg-black/40 border border-[#00f0ff]/10 p-5 w-[520px] max-w-[90vw] mx-auto backdrop-blur-sm">

            <div className="space-y-2 text-[11px] font-bold tracking-wider">

              <div className="text-[#00f0ff] animate-pulse">
                [SYS] BOOTING SECURE NETWORK...
              </div>

              <div className="text-[#ff003c] animate-pulse">
                [AUTH] VERIFYING SOCIAL TARGET...
              </div>

              <div className="text-[#00f0ff] animate-pulse">
                [LINK] OPENING EXTERNAL GATEWAY...
              </div>

              <div className="text-[#999] animate-pulse">
                [OK] CONNECTION STABILIZED
              </div>

            </div>

          </div>

        </div>

      </div>
    );
  }

  return (
    <div
      onMouseEnter={triggerScramble}
      className="group relative bg-[#090a0f] border border-[#00f0ff]/20 hover:border-[#ff003c] transition-all duration-75 overflow-hidden shadow-[0_0_15px_rgba(0,240,255,0.02)] flex flex-col h-full"
      style={{
        clipPath:
          'polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)',
      }}
    >

      {/* BORDER */}
      <div className="absolute inset-0 border border-[#ff003c] opacity-0 group-hover:opacity-100 animate-pulse pointer-events-none z-30"></div>

      {/* TOP */}
      <div className="absolute top-2 left-3 text-[9px] text-[#00f0ff]/40 font-bold group-hover:text-[#ff003c] transition-colors duration-75 z-20">
        SYS_NODE // 0{member.id}
      </div>

      {/* IMAGE */}
      <div className="relative h-[280px] overflow-hidden bg-black border-b border-[#00f0ff]/10 group-hover:border-[#ff003c]/40 shrink-0">

        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover opacity-30 contrast-150 grayscale group-hover:grayscale-0 group-hover:opacity-80 transition-all duration-75 group-hover:scale-105"
        />

        {/* GLITCH 1 */}
        <img
          src={member.image}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-50 mix-blend-screen group-hover:animate-[glitchImg_0.3s_infinite]"
          style={{
            transform: 'translateX(3px)',
            filter: 'hue-rotate(90deg)',
          }}
        />

        {/* GLITCH 2 */}
        <img
          src={member.image}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-50 mix-blend-screen group-hover:animate-[glitchImg_0.4s_infinite_reverse]"
          style={{
            transform: 'translateX(-3px)',
            filter: 'hue-rotate(240deg)',
          }}
        />

        {/* SCAN */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00f0ff]/20 to-transparent h-10 w-full opacity-0 group-hover:opacity-100 animate-[scanBar_2s_linear_infinite]"></div>

        {/* DARK */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-95"></div>

      </div>

      {/* CONTENT */}
      <div className="p-5 bg-[#07080c] relative z-10 border-t border-[#00f0ff]/5 flex-1 flex flex-col justify-between">

        <div>

          <p className="text-[#00f0ff] font-bold text-[9px] tracking-[0.25em] uppercase mb-1 flex items-center gap-2">

            <span className="w-1.5 h-1.5 bg-[#00f0ff] group-hover:bg-[#ff003c] group-hover:animate-ping"></span>

            {member.role}

          </p>

          <h3 className="text-2xl font-black text-white uppercase tracking-tight group-hover:text-[#ff003c] transition-colors duration-75 min-h-[32px] break-words">
            {displayName}
          </h3>

        </div>

        {/* BUTTON */}
        <button
          onClick={handleOpenFacebook}
          className="mt-6 group/btn relative inline-flex items-center justify-center w-full px-4 py-3 font-bold text-[11px] tracking-[0.2em] text-[#00f0ff] uppercase border border-[#00f0ff]/30 hover:bg-[#00f0ff] hover:text-black transition-all duration-75 overflow-hidden"
          style={{
            clipPath:
              'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)',
          }}
        >

          <span className="absolute left-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#00f0ff] group-hover/btn:bg-black group-hover:animate-pulse"></span>

          <span className="pl-4 flex items-center gap-2 z-10">

            INITIATE_CONTACT

            <svg
              className="w-3 h-3"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42L17.59 5H14V3zm-2 16H5V8h6V6H5c-1.11 0-2 .9-2 2v11c0 1.1.89 2 2 2h11c1.1 0 2-.9 2-2v-6h-2v6h-6z"/>
            </svg>

          </span>

          {/* SHINE */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00f0ff]/30 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700"></div>

        </button>

      </div>

    </div>
  );
}

// ─────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────
export default function MembersLanding() {
  const [search, setSearch] = useState('');
  const [members] = useState(INITIAL_MEMBERS);

  const navigate = useNavigate();
  const canvasRef = useRef(null);

  // ─── PARTICLES ───
  useEffect(() => {
    const canvas = canvasRef.current;
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

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, []);

  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(search.toLowerCase()) ||
      member.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#030305] text-white font-mono overflow-x-hidden relative selection:bg-[#ff003c] selection:text-white cursor-crosshair pb-24">

      {/* CANVAS */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
      />

      {/* STYLES */}
      <style>{`
        .cyber-noise {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }

        @keyframes ultraLoad {
          from {
            width: 0%;
          }
          to {
            width: 92%;
          }
        }

        @keyframes shine {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(200%);
          }
        }

        @keyframes spinReverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }

        @keyframes screenFlicker {
          0% {
            opacity: 0;
          }
          10% {
            opacity: 0.04;
          }
          20% {
            opacity: 0;
          }
          30% {
            opacity: 0.05;
          }
          40% {
            opacity: 0;
          }
          100% {
            opacity: 0;
          }
        }

        @keyframes scanMove {
          from {
            transform: translateY(-200px);
          }
          to {
            transform: translateY(100vh);
          }
        }

        @keyframes glitchText {
          0% {
            transform: translate(2px, 0);
          }
          25% {
            transform: translate(-2px, 1px);
          }
          50% {
            transform: translate(1px, -1px);
          }
          75% {
            transform: translate(-1px, 1px);
          }
          100% {
            transform: translate(2px, 0);
          }
        }

        @keyframes scanBar {
          0% {
            transform: translateY(-100px);
          }
          100% {
            transform: translateY(400px);
          }
        }

        @keyframes glitchImg {
          0% {
            transform: translate(2px, 1px) skew(2deg);
          }
          20% {
            transform: translate(-1px, -1px) skew(-3deg);
          }
          40% {
            transform: translate(1px, -2px) skew(1deg);
          }
          60% {
            transform: translate(-2px, 2px) skew(0deg);
          }
          80% {
            transform: translate(3px, -1px) skew(-2deg);
          }
          100% {
            transform: translate(-1px, 1px) skew(3deg);
          }
        }
      `}</style>

      {/* HEADER */}
      <header className="relative z-10 pt-16 pb-8 px-6 md:px-12 max-w-7xl mx-auto border-b-2 border-dashed border-[#00f0ff]/20 bg-black/60 backdrop-blur-md mt-6">

        <button
          onClick={() => navigate('/')}
          className="mb-8 px-5 py-2 text-xs font-bold tracking-[0.3em] text-[#00f0ff] border border-[#00f0ff]/30 bg-black/80 hover:bg-[#ff003c] hover:text-white hover:border-[#ff003c] transition-all duration-75 flex items-center gap-3 uppercase relative group"
        >
          &lt;&lt; TERMINAL_ESCAPE_ROUTE
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
              SQUAD_
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff003c] via-[#ff003c] to-white">
                OPERATIVES
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
            <MemberCard
              key={member.id}
              member={member}
            />
          ))}

        </div>

      </main>

    </div>
  );
}