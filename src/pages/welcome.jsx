import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function WelcomePage() {
  const [glitchText, setGlitchText] = useState('SYSTEM_OVERRIDE');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const navigate = useNavigate();
  const canvasRef = useRef(null);

  // ─────────────────────────────────────────────
  // TEXT REVEAL
  // ─────────────────────────────────────────────
  useEffect(() => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*';
    let iterations = 0;

    const finalWord = 'OMEGA';

    const interval = setInterval(() => {
      setGlitchText(
        finalWord
          .split('')
          .map((letter, index) => {
            if (index < iterations) {
              return finalWord[index];
            }

            return letters[Math.floor(Math.random() * letters.length)];
          })
          .join('')
      );

      if (iterations >= finalWord.length) {
        clearInterval(interval);
      }

      iterations += 1 / 3;
    }, 55);

    return () => clearInterval(interval);
  }, []);

  // ─────────────────────────────────────────────
  // CYBER MESH
  // ─────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const techWords = [
      '0x7F',
      'SPHX_NODE',
      'DB_SYNC',
      'PORT_443',
      'SYS_INIT',
      'CORE_VOLT',
      'RAW_SOCK',
      'INJECT_V2',
    ];

    const particles = [];
    const particleCount = 60;
    const connectionDistance = 120;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        size: Math.random() * 2 + 1,
        word:
          Math.random() > 0.85
            ? techWords[Math.floor(Math.random() * techWords.length)]
            : null,
        wordTimer: Math.random() * 100,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const themeColor = isProcessing
        ? '255, 0, 60'
        : '0, 240, 255';

      const speedMultiplier = isProcessing ? 5 : 1;

      particles.forEach((p, index) => {
        p.x += p.vx * speedMultiplier;
        p.y += p.vy * speedMultiplier;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // NODE
        ctx.beginPath();
        ctx.arc(
          p.x,
          p.y,
          isProcessing ? p.size * 1.5 : p.size,
          0,
          Math.PI * 2
        );

        ctx.fillStyle = `rgba(${themeColor}, ${
          isProcessing ? '0.7' : '0.35'
        })`;

        ctx.fill();

        // WORDS
        if (p.word) {
          p.wordTimer += 0.05;

          if (Math.sin(p.wordTimer) > 0.2) {
            ctx.fillStyle = `rgba(${themeColor}, 0.18)`;
            ctx.font = '9px monospace';
            ctx.fillText(p.word, p.x + 8, p.y + 4);
          }
        }

        // CONNECTIONS
        for (let j = index + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x, p2.x) + Math.hypot(p.y, p2.y);

          if (dist < connectionDistance) {
            const alpha =
              (1 - dist / connectionDistance) *
              (isProcessing ? 0.24 : 0.12);

            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);

            ctx.strokeStyle = `rgba(${themeColor}, ${alpha})`;
            ctx.lineWidth = isProcessing ? 1.4 : 0.8;

            ctx.stroke();
          }
        }
      });

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isProcessing]);

  // ─────────────────────────────────────────────
  // BUTTON
  // ─────────────────────────────────────────────
  const handleLaunchSequence = () => {
    if (isProcessing) return;

    setIsProcessing(true);

    const stages = [
      'BYPASSING_FIREWALL...',
      'INJECTING_PAYLOAD...',
      'OVERCLOCKING_CORES...',
      'SPHX_SYSTEM_BOOST!!',
      'LAUNCHING...',
    ];

    let stageIndex = 0;

    const logInterval = setInterval(() => {
      if (stageIndex < stages.length) {
        setGlitchText(stages[stageIndex]);
        stageIndex++;
      } else {
        clearInterval(logInterval);
      }
    }, 450);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);

          navigate('/home');

          return 100;
        }

        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 150);
  };

  return (
    <div
      className={`
        min-h-screen
        bg-[#020204]
        text-white
        font-mono
        overflow-hidden
        relative
        selection:bg-[#ff003c]
        selection:text-white
        cursor-crosshair
        flex
        flex-col
        justify-center
        items-center
        p-6
        ${isProcessing ? 'heavy-glitch-active' : ''}
      `}
    >

      {/* BACKGROUND */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0"
      />

      {/* STYLES */}
      <style>{`
        .scanlines {
          background:
            linear-gradient(
              to bottom,
              rgba(255,255,255,0),
              rgba(255,255,255,0) 50%,
              rgba(0,0,0,0.28) 50%,
              rgba(0,0,0,0.28)
            );

          background-size: 100% 4px;
          pointer-events: none;
        }

        .cyber-grid-overlay {
          background-image:
            linear-gradient(rgba(0,240,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,240,255,0.03) 1px, transparent 1px);

          background-size: 40px 40px;
        }

        @keyframes redPulse {
          0% {
            background-color: rgba(0,0,0,0);
          }

          100% {
            background-color: rgba(255,0,60,0.04);
          }
        }

        .heavy-glitch-active {
          animation: redPulse 0.06s infinite alternate;
        }

        @keyframes omegaScan {
          0% {
            transform: translateX(-250%) skewX(-20deg);
            opacity: 0;
          }

          15% {
            opacity: 1;
          }

          50% {
            opacity: 0.8;
          }

          100% {
            transform: translateX(700%) skewX(-20deg);
            opacity: 0;
          }
        }
      `}</style>

      {/* OVERLAYS */}
      <div className="absolute inset-0 cyber-grid-overlay pointer-events-none z-10"></div>

      <div className="absolute inset-0 scanlines z-50 mix-blend-overlay"></div>

      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_220px_rgba(0,0,0,1)] z-40"></div>

      {/* HUD LEFT */}
      <div className="absolute top-6 left-6 text-[#00f0ff] text-xs font-bold tracking-widest flex flex-col gap-1 z-20">

        <span className="flex items-center gap-2">

          <div
            className={`
              w-2 h-2 animate-pulse
              ${isProcessing ? 'bg-[#ff003c]' : 'bg-green-400'}
            `}
          ></div>

          STATUS // {isProcessing ? 'BREACHING_CORE' : 'REC_READY'}

        </span>

        <span>SPHX_PROTOCOL : ACTIVE</span>

        <span className="text-gray-500">
          CONTAINER_ORCHESTRATION : SYNCED
        </span>

      </div>

      {/* HUD RIGHT */}
      <div className="absolute top-6 right-6 text-right text-[#00f0ff] text-xs font-bold tracking-widest flex flex-col gap-1 z-20">

        <span>MEM_ALLOC: {isProcessing ? '99%' : '84%'}</span>

        <span>
          LATENCY: {isProcessing ? '999MS [CRIT]' : '4MS [OPTIMAL]'}
        </span>

      </div>

      {/* CENTER PANEL */}
      <div
        className={`
          relative
          z-30
          flex
          flex-col
          items-center
          max-w-4xl
          w-full
          border-l-2
          border-r-2
          px-8
          py-16
          bg-black/70
          backdrop-blur-sm
          transition-all
          duration-300
          ${
            isProcessing
              ? 'border-[#ff003c]/50 shadow-[0_0_30px_rgba(255,0,60,0.12)]'
              : 'border-[#00f0ff]/20 shadow-[0_0_30px_rgba(0,240,255,0.05)]'
          }
        `}
      >

        {/* CORNERS */}
        <div className={`absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 ${isProcessing ? 'border-[#ff003c]' : 'border-[#00f0ff]'}`}></div>

        <div className={`absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 ${isProcessing ? 'border-[#ff003c]' : 'border-[#00f0ff]'}`}></div>

        <div className={`absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 ${isProcessing ? 'border-[#ff003c]' : 'border-[#00f0ff]'}`}></div>

        <div className={`absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 ${isProcessing ? 'border-[#ff003c]' : 'border-[#00f0ff]'}`}></div>

        {/* SMALL TEXT */}
        <p
          className={`
            mb-6
            tracking-[0.5em]
            text-sm
            uppercase
            ${isProcessing ? 'text-[#ff003c]' : 'text-[#00f0ff]'}
          `}
        >
          {isProcessing
            ? 'CRITICAL EXECUTION RUNNING'
            : 'Enter Security Key'}
        </p>

        {/* ───────────────────────────────────────────── */}
        {/* OMEGA SECTION */}
        {/* ───────────────────────────────────────────── */}
        <div className="relative mb-14 flex flex-col items-center justify-center">

          {/* TOP LABEL */}
          <div className="mb-4 flex items-center gap-3 text-[10px] tracking-[0.45em] uppercase text-[#00f0ff]/70">

            <div className="w-12 h-[1px] bg-[#00f0ff]/30"></div>

            <span className={`${isProcessing ? 'text-[#ff003c]' : 'text-[#00f0ff]'}`}>
              CORE_SYSTEM
            </span>

            <div className="w-12 h-[1px] bg-[#00f0ff]/30"></div>

          </div>

          {/* MAIN */}
          <div className="relative">

            {/* GLOW */}
            <div
              className={`
                absolute inset-0 blur-3xl opacity-40 scale-110
                ${isProcessing ? 'bg-[#ff003c]/30' : 'bg-[#00f0ff]/20'}
              `}
            ></div>

            {/* SHADOW */}
            <span
              className={`
                absolute left-0 top-0
                translate-x-[3px]
                translate-y-[1px]
                text-5xl sm:text-7xl md:text-8xl
                font-black uppercase
                tracking-[0.18em]
                opacity-20
                select-none
                pointer-events-none
                ${isProcessing ? 'text-[#ff003c]' : 'text-[#00f0ff]'}
              `}
            >
              {glitchText}
            </span>

            {/* TEXT */}
            <h1
              className={`
                relative
                text-5xl sm:text-7xl md:text-8xl
                font-black uppercase
                tracking-[0.18em]
                transition-all duration-300
                ${
                  isProcessing
                    ? 'text-[#ff003c] drop-shadow-[0_0_25px_rgba(255,0,60,0.45)]'
                    : 'text-white drop-shadow-[0_0_20px_rgba(0,240,255,0.18)]'
                }
              `}
            >
              {glitchText}
            </h1>

            {/* SCAN */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">

              <div
                className={`
                  absolute top-0 left-[-30%]
                  w-[40%] h-full
                  skew-x-[-20deg]
                  blur-md
                  animate-[omegaScan_4s_linear_infinite]
                  ${
                    isProcessing
                      ? 'bg-[#ff003c]/20'
                      : 'bg-[#00f0ff]/15'
                  }
                `}
              ></div>

            </div>

          </div>

          {/* BOTTOM */}
          <div className="mt-6 flex items-center gap-2">

            <div
              className={`
                w-2 h-2 rounded-full animate-pulse
                ${isProcessing ? 'bg-[#ff003c]' : 'bg-[#00f0ff]'}
              `}
            ></div>

            <div
              className={`
                w-28 h-[1px]
                ${isProcessing ? 'bg-[#ff003c]/40' : 'bg-[#00f0ff]/30'}
              `}
            ></div>

            <div
              className={`
                text-[10px]
                tracking-[0.35em]
                uppercase
                ${isProcessing ? 'text-[#ff003c]/70' : 'text-[#00f0ff]/60'}
              `}
            >
              ACCESS
            </div>

            <div
              className={`
                w-28 h-[1px]
                ${isProcessing ? 'bg-[#ff003c]/40' : 'bg-[#00f0ff]/30'}
              `}
            ></div>

            <div
              className={`
                w-2 h-2 rounded-full animate-pulse
                ${isProcessing ? 'bg-[#ff003c]' : 'bg-[#00f0ff]'}
              `}
            ></div>

          </div>

        </div>

        {/* LINE */}
        <div
          className={`
            h-[1px]
            w-full
            max-w-md
            mb-8
            bg-gradient-to-r
            from-transparent
            to-transparent
            ${isProcessing ? 'via-[#00f0ff]' : 'via-[#ff003c]'}
          `}
        ></div>

        {/* BUTTON / PROGRESS */}
        {!isProcessing ? (
          <button
            onClick={handleLaunchSequence}
            className="
              group
              relative
              inline-flex
              items-center
              justify-center
              px-12
              py-4
              font-bold
              text-lg
              tracking-[0.2em]
              text-black
              uppercase
              bg-[#00f0ff]
              hover:bg-[#ff003c]
              hover:text-white
              transition-all
              duration-200
            "
            style={{
              clipPath:
                'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)',
            }}
          >

            <span className="relative z-10 flex items-center gap-3">

              INITIALIZE SEQUENCE

              <span className="w-2 h-5 bg-black group-hover:bg-white animate-pulse"></span>

            </span>

          </button>
        ) : (
          <div
            className="w-full max-w-md border border-[#ff003c]/40 bg-black/90 p-4 relative"
            style={{
              clipPath:
                'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)',
            }}
          >

            <div className="flex justify-between text-xs mb-2 text-[#ff003c] font-bold tracking-widest">

              <span>[ PROGRESS_CORE_INTRUSION ]</span>

              <span className="animate-pulse">
                {Math.min(progress, 100)}%
              </span>

            </div>

            <div className="w-full bg-zinc-950 h-6 p-0.5 border border-zinc-800">

              <div
                className="bg-[#ff003c] h-full transition-all duration-150 ease-out shadow-[0_0_10px_#ff003c]"
                style={{
                  width: `${Math.min(progress, 100)}%`,
                }}
              ></div>

            </div>

            <div className="mt-2 text-[9px] text-gray-500 text-center tracking-wider">

              DO NOT CLOSE TERMINAL. REDIRECTING KEYSTREAM...

            </div>

          </div>
        )}

      </div>

    </div>
  );
}