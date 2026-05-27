import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function WelcomePage() {
  const [glitchText, setGlitchText] = useState('SYSTEM_OVERRIDE');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const navigate = useNavigate();
  const canvasRef = useRef(null);

  // 1. Terminal Text Effect (สุ่มรหัสถอดคำว่า ACCESS_GRANTED ตอนเข้าหน้าเว็บ)
  useEffect(() => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
    let iterations = 0;
    const finalWord = "ACCESS_GRANTED";
    
    const interval = setInterval(() => {
      setGlitchText(finalWord.split("").map((letter, index) => {
        if (index < iterations) return finalWord[index];
        return letters[Math.floor(Math.random() * letters.length)];
      }).join(""));
      
      if (iterations >= finalWord.length) clearInterval(interval);
      iterations += 1 / 3;
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // 2. ขุมพลังพื้นหลัง: ADVANCED CYBER MESH NET (Canvas Animation)
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // ระบบสุ่มคำแฮกเกอร์ไปแปะตาม Node เส้นเชื่อม
    const techWords = ["0x7F", "SPHX_NODE", "DB_SYNC", "PORT_443", "SYS_INIT", "CORE_VOLT", "DOCKER_SLV", "RAW_SOCK", "INJECT_V2", "BYPASS"];
    const particles = [];
    const particleCount = 65; // จำนวนจุดเชื่อมต่อ (ปรับเพิ่ม-ลดความหนาแน่นได้)
    const connectionDistance = 120; // ระยะห่างที่เส้นจะเชื่อมถึงกัน

    // สร้างโครงสร้างข้อมูลของแต่ละ Node
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        size: Math.random() * 2 + 1,
        word: Math.random() > 0.85 ? techWords[Math.floor(Math.random() * techWords.length)] : null,
        wordTimer: Math.random() * 100
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // โทนสีหลักเปลี่ยนตามสถานะ (ปกติ = ฟ้า Cyan / กำลังแฮก = แดง Crimson)
      const themeColor = isProcessing ? "255, 0, 60" : "0, 240, 255";
      const speedMultiplier = isProcessing ? 6 : 1; // สปีดความบ้าคลั่งตอนโหลด

      // วาดและอัปเดตตำแหน่งของ Nodes
      particles.forEach((p, index) => {
        p.x += p.vx * speedMultiplier;
        p.y += p.vy * speedMultiplier;

        // ชนขอบจอให้เด้งกลับ ดิบๆ ดุดัน
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // วาดจุด Node
        ctx.beginPath();
        ctx.arc(p.x, p.y, isProcessing ? p.size * 1.5 : p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${themeColor}, ${isProcessing ? '0.6' : '0.4'})`;
        ctx.fill();

        // สุ่มโชว์ข้อความรหัส Log เล็กๆ ข้างตัว Nodes
        if (p.word) {
          p.wordTimer += 0.05;
          if (Math.sin(p.wordTimer) > 0.2) {
            ctx.fillStyle = `rgba(${themeColor}, 0.25)`;
            ctx.font = '9px monospace';
            ctx.fillText(p.word, p.x + 8, p.y + 4);
          }
        }

        // ลากเส้นเชื่อมมิติระหว่างโหนดที่อยู่ใกล้กัน
        for (let j = index + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);

          if (dist < connectionDistance) {
            // ยิ่งใกล้ เส้นยิ่งชัด
            const alpha = (1 - dist / connectionDistance) * (isProcessing ? 0.25 : 0.12);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${themeColor}, ${alpha})`;
            ctx.lineWidth = isProcessing ? 1.5 : 0.8;
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
  }, [isProcessing]); // Re-run ทันทีเมื่อมีการสลับโหมดกดปุ่ม

  // 3. Launch Sequence Function (สเตจควบคุมความมันส์เมื่อคลิกปุ่ม)
  const handleLaunchSequence = () => {
    if (isProcessing) return;
    setIsProcessing(true);

    const stages = [
      "BYPASSING_FIREWALL...",
      "INJECTING_PAYLOAD...",
      "OVERCLOCKING_CORES...",
      "SPHX_SYSTEM_BOOST!!",
      "LAUNCHING..."
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
    <div className={`min-h-screen bg-[#020204] text-white font-mono overflow-hidden relative selection:bg-[#ff003c] selection:text-white cursor-crosshair flex flex-col justify-center items-center p-6 ${isProcessing ? 'heavy-glitch-active' : ''}`}>
      
      {/* ─── DYNAMIC NODE MESH CANVAS BACKGROUND ─── */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0"></canvas>
      
      {/* ─── EXTREME STYLE OVERRIDES ─── */}
      <style>{`
        .scanlines {
          background: linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0) 50%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.3));
          background-size: 100% 4px;
          pointer-events: none;
        }
        .glitch-wrapper { position: relative; }
        .glitch-layer { position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0.8; }
        .glitch-layer-1 { color: #00f0ff; z-index: -1; animation: glitch-anim-1 2.5s infinite linear alternate-reverse; }
        .glitch-layer-2 { color: #ff003c; z-index: -2; animation: glitch-anim-2 3s infinite linear alternate-reverse; }
        
        @keyframes glitch-anim-1 {
          0% { clip-path: inset(20% 0 80% 0); transform: translate(-4px, 1px); }
          20% { clip-path: inset(60% 0 10% 0); transform: translate(4px, -1px); }
          40% { clip-path: inset(40% 0 50% 0); transform: translate(-4px, 2px); }
          60% { clip-path: inset(80% 0 5% 0); transform: translate(4px, -2px); }
          80% { clip-path: inset(10% 0 70% 0); transform: translate(-4px, 1px); }
          100% { clip-path: inset(30% 0 50% 0); transform: translate(4px, -1px); }
        }
        @keyframes glitch-anim-2 {
          0% { clip-path: inset(10% 0 60% 0); transform: translate(4px, -1px); }
          20% { clip-path: inset(30% 0 20% 0); transform: translate(-4px, 1px); }
          40% { clip-path: inset(70% 0 10% 0); transform: translate(4px, -2px); }
          60% { clip-path: inset(20% 0 50% 0); transform: translate(-4px, 2px); }
          80% { clip-path: inset(50% 0 30% 0); transform: translate(4px, -1px); }
          100% { clip-path: inset(5% 0 80% 0); transform: translate(-4px, 1px); }
        }

        /* เอฟเฟคตารางสลัวฉายแบบ 3D Perspective ห้อยจากด้านบน */
        .cyber-grid-overlay {
          background-image: linear-gradient(rgba(0, 240, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 240, 255, 0.03) 1px, transparent 1px);
          background-size: 40px 40px;
        }

        @keyframes redPulse {
          0% { background-color: rgba(0, 0, 0, 0); }
          100% { background-color: rgba(255, 0, 60, 0.06); }
        }
        .heavy-glitch-active { animation: redPulse 0.04s infinite alternate; }
      `}</style>

      {/* Overlays ชั้นแรสเตอร์ทีวีและขอบมืดสไตล์แฮกเกอร์ */}
      <div className="absolute inset-0 cyber-grid-overlay pointer-events-none z-1"></div>
      <div className="absolute inset-0 scanlines z-50 mix-blend-overlay"></div>
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_200px_rgba(0,0,0,1)] z-40"></div>

      {/* ─── TACTICAL HUD ELEMENTS ─── */}
      <div className="absolute top-6 left-6 text-[#00f0ff] text-xs font-bold tracking-widest flex flex-col gap-1 z-20">
        <span className="flex items-center gap-2">
          <div className={`w-2 h-2 ${isProcessing ? 'bg-[#ff003c]' : 'bg-green-400'} animate-pulse`}></div> 
          STATUS // {isProcessing ? 'BREACHING_CORE' : 'REC_READY'}
        </span>
        <span>SPHX_PROTOCOL : ACTIVE</span>
        <span className="text-gray-500">CONTAINER_ORCHESTRATION : SYNCED</span>
      </div>
      
      <div className="absolute top-6 right-6 text-right text-[#00f0ff] text-xs font-bold tracking-widest flex flex-col gap-1 z-20">
        <span>MEM_ALLOC: {isProcessing ? '99%' : '84%'}</span>
        <span>LATENCY: {isProcessing ? '999MS [CRIT]' : '4MS [OPTIMAL]'}</span>
        <div className="flex justify-end mt-2 gap-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className={`w-1 h-3 ${isProcessing ? 'bg-[#ff003c] animate-ping' : i < 4 ? 'bg-[#00f0ff]' : 'bg-gray-800'}`}></div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-6 left-6 text-gray-600 text-[10px] tracking-widest z-20">
        <div>[ RAW_SOCKET_INITIALIZED ]</div>
        <div>{isProcessing ? 'WARNING: INJECTING SOCKET OVERLAY...' : 'ESTABLISHING P2P CONNECTION...'}</div>
      </div>

      <div className="absolute bottom-6 right-6 text-[#ff003c] text-xs font-bold tracking-widest z-20 flex items-center gap-2">
        {isProcessing ? 'DANGER: RUNTIME OVERRIDE' : 'WARNING: UNREGISTERED USER'}
        <svg className={`w-4 h-4 ${isProcessing ? 'animate-bounce' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
      </div>

      {/* ─── MAIN CENTER CONSOLE (ปรับทึบขึ้นเป็น bg-black/75 เพื่อแยกชั้นจากแผงโครงข่ายข้างหลังอย่างสวยงาม) ─── */}
      <div className={`relative z-30 flex flex-col items-center max-w-4xl w-full border-l-2 border-r-2 px-8 py-16 bg-black/75 backdrop-blur-sm transition-all duration-300 ${isProcessing ? 'border-[#ff003c]/50 shadow-[0_0_30px_rgba(255,0,60,0.1)]' : 'border-[#00f0ff]/20 shadow-[0_0_30px_rgba(0,240,255,0.05)]'}`}>
        
        <div className={`absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 ${isProcessing ? 'border-[#ff003c]' : 'border-[#00f0ff]'}`}></div>
        <div className={`absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 ${isProcessing ? 'border-[#ff003c]' : 'border-[#00f0ff]'}`}></div>
        <div className={`absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 ${isProcessing ? 'border-[#ff003c]' : 'border-[#00f0ff]'}`}></div>
        <div className={`absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 ${isProcessing ? 'border-[#ff003c]' : 'border-[#00f0ff]'}`}></div>

        <p className={`mb-4 tracking-[0.5em] text-sm uppercase ${isProcessing ? 'text-[#ff003c] animate-pulse' : 'text-[#00f0ff]'}`}>
          {isProcessing ? 'CRITICAL EXECUTION RUNNING' : 'Enter Security Key'}
        </p>

        <div className="glitch-wrapper text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter mb-12 cursor-default text-center min-h-[80px] flex items-center justify-center">
          <span className={`relative z-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.8)] ${isProcessing ? 'text-[#ff003c]' : 'text-white'}`}>
            {glitchText}
          </span>
          <span className={`glitch-layer glitch-layer-1 ${isProcessing ? 'hidden' : ''}`} aria-hidden="true">{glitchText}</span>
          <span className={`glitch-layer glitch-layer-2 ${isProcessing ? 'hidden' : ''}`} aria-hidden="true">{glitchText}</span>
        </div>

        <div className={`h-[1px] w-full max-w-md mb-8 bg-gradient-to-r from-transparent to-transparent ${isProcessing ? 'via-[#00f0ff]' : 'via-[#ff003c]'}`}></div>

        {/* ─── ACTION AREA (สลับปุ่มกดเป็นโหลดบาร์เมื่อคลิก) ─── */}
        {!isProcessing ? (
          <button 
            onClick={handleLaunchSequence}
            className="group relative inline-flex items-center justify-center px-12 py-4 font-bold text-lg tracking-[0.2em] text-black uppercase bg-[#00f0ff] hover:bg-[#ff003c] hover:text-white transition-colors duration-0"
            style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}
          >
            <span className="group-hover:animate-[ping_0.2s_cubic-bezier(0,0,0.2,1)_infinite] absolute inset-0 bg-white mix-blend-difference pointer-events-none opacity-0 group-hover:opacity-100"></span>
            <span className="relative z-10 flex items-center gap-3">
              INITIALIZE SEQUENCE
              <span className="w-2 h-5 bg-black group-hover:bg-white animate-pulse"></span>
            </span>
          </button>
        ) : (
          <div className="w-full max-w-md border border-[#ff003c]/40 bg-black/90 p-4 relative"
               style={{ clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)' }}>
            <div className="flex justify-between text-xs mb-2 text-[#ff003c] font-bold tracking-widest">
              <span>[ PROGRESS_CORE_INTRUSION ]</span>
              <span className="animate-pulse">{Math.min(progress, 100)}%</span>
            </div>
            
            <div className="w-full bg-zinc-950 h-6 p-0.5 border border-zinc-800">
              <div 
                className="bg-[#ff003c] h-full transition-all duration-150 ease-out shadow-[0_0_10px_#ff003c]"
                style={{ width: `${Math.min(progress, 100)}%` }}
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