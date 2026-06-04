import { useState } from 'react';
export function MemberCard({ member }) {
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
    }, 0);
  };

  // ─────────────────────────────────────────────
  // CINEMATIC LOADING
  // ─────────────────────────────────────────────
  // if (loading) {
  //   return (
  //     <div className="fixed inset-0 z-[999999] bg-black overflow-hidden flex items-center justify-center">

  //       {/* Background */}
  //       <div className="absolute inset-0 bg-[#020203]"></div>

  //       {/* Grid */}
  //       <div
  //         className="absolute inset-0 opacity-10"
  //         style={{
  //           backgroundImage: `
  //             linear-gradient(rgba(0,240,255,0.08) 1px, transparent 1px),
  //             linear-gradient(90deg, rgba(0,240,255,0.08) 1px, transparent 1px)
  //           `,
  //           backgroundSize: '60px 60px',
  //         }}
  //       />

  //       {/* Scan Light */}
  //       <div className="absolute inset-0 overflow-hidden">
  //         <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-[#00f0ff22] to-transparent animate-[scanMove_2s_linear_infinite] blur-2xl"></div>
  //       </div>

  //       {/* Noise */}
  //       <div className="absolute inset-0 cyber-noise opacity-[0.04]"></div>

  //       {/* Flicker */}
  //       <div className="absolute inset-0 animate-[screenFlicker_0.15s_infinite] mix-blend-screen pointer-events-none"></div>

  //       {/* CENTER */}
  //       <div className="relative z-20 text-center">

  //         {/* RINGS */}
  //         <div className="relative w-[280px] h-[280px] mx-auto mb-12">

  //           {/* OUTER */}
  //           <div className="absolute inset-0 rounded-full border border-[#00f0ff]/20 animate-spin"></div>

  //           {/* MIDDLE */}
  //           <div className="absolute inset-5 rounded-full border-2 border-dashed border-[#ff003c] animate-[spinReverse_8s_linear_infinite]"></div>

  //           {/* INNER */}
  //           <div className="absolute inset-14 rounded-full border border-[#00f0ff] animate-pulse"></div>

  //           {/* ROTATING LINES */}
  //           <div className="absolute inset-0 animate-spin">
  //             <div className="absolute left-1/2 top-0 w-[2px] h-10 bg-[#00f0ff] -translate-x-1/2 shadow-[0_0_20px_#00f0ff]"></div>

  //             <div className="absolute left-1/2 bottom-0 w-[2px] h-10 bg-[#ff003c] -translate-x-1/2 shadow-[0_0_20px_#ff003c]"></div>
  //           </div>

  //           {/* CORE */}
  //           <div className="absolute inset-[90px] rounded-full bg-[#00f0ff]/20 backdrop-blur-xl border border-[#00f0ff]/40 shadow-[0_0_50px_#00f0ff] flex items-center justify-center">

  //             <div className="text-center">

  //               <div className="text-[#00f0ff] text-[11px] tracking-[0.5em] font-black animate-pulse">
  //                 CONNECT
  //               </div>

  //               <div className="mt-2 text-[#ff003c] text-[9px] tracking-[0.3em]">
  //                 FACEBOOK_GATE
  //               </div>

  //             </div>

  //           </div>

  //           {/* PING */}
  //           <div className="absolute inset-0 rounded-full border border-[#00f0ff] animate-ping opacity-20"></div>

  //         </div>

  //         {/* TITLE */}
  //         <h1 className="text-4xl font-black tracking-[0.35em] text-white uppercase relative">

  //           <span className="absolute left-0 top-0 text-[#ff003c] blur-[2px] opacity-70 animate-[glitchText_0.2s_infinite]">
  //             ESTABLISHING LINK
  //           </span>

  //           <span className="relative text-[#00f0ff]">
  //             ESTABLISHING LINK
  //           </span>

  //         </h1>

  //         {/* PROGRESS */}
  //         <div className="w-[500px] max-w-[90vw] mt-10 mx-auto">

  //           <div className="flex justify-between text-[10px] uppercase tracking-[0.3em] mb-3">

  //             <span className="text-[#00f0ff]">
  //               Decrypting Session
  //             </span>

  //             <span className="text-[#ff003c] animate-pulse">
  //               92%
  //             </span>

  //           </div>

  //           <div className="h-3 bg-[#0a0a0a] border border-[#00f0ff]/20 overflow-hidden relative">

  //             {/* Fill */}
  //             <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#00f0ff] via-[#00f0ff] to-[#ff003c] animate-[ultraLoad_2s_ease-out_forwards]"></div>

  //             {/* Shine */}
  //             <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.3),transparent)] animate-[shine_1s_linear_infinite]"></div>

  //           </div>

  //         </div>

  //         {/* TERMINAL */}
  //         <div className="mt-10 text-left bg-black/40 border border-[#00f0ff]/10 p-5 w-[520px] max-w-[90vw] mx-auto backdrop-blur-sm">

  //           <div className="space-y-2 text-[11px] font-bold tracking-wider">

  //             <div className="text-[#00f0ff] animate-pulse">
  //               [SYS] BOOTING SECURE NETWORK...
  //             </div>

  //             <div className="text-[#ff003c] animate-pulse">
  //               [AUTH] VERIFYING SOCIAL TARGET...
  //             </div>

  //             <div className="text-[#00f0ff] animate-pulse">
  //               [LINK] OPENING EXTERNAL GATEWAY...
  //             </div>

  //             <div className="text-[#999] animate-pulse">
  //               [OK] CONNECTION STABILIZED
  //             </div>

  //           </div>

  //         </div>

  //       </div>

  //     </div>
  //   );
  // }

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
          className="w-full h-full object-cover opacity-100 contrast-150 grayscale group-hover:grayscale-0 group-hover:opacity-80 transition-all duration-75 group-hover:scale-105"
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

            FACEBOOK

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
export default MemberCard;
