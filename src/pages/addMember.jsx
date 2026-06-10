import { useState, useEffect, useRef } from "react";

const ROLES = ["Player", "Coach", "Manager", "Analyst", "Streamer", "Admin"];

const ROLE_COLORS = {
  Player: "from-red-600 to-red-800",
  Coach: "from-orange-600 to-red-700",
  Manager: "from-yellow-600 to-orange-700",
  Analyst: "from-purple-600 to-red-700",
  Streamer: "from-pink-600 to-red-700",
  Admin: "from-red-800 to-black",
};

function GlitchText({ text }) {
  return (
    <span className="relative inline-block">
      <span
        className="absolute top-0 left-0 w-full text-red-500 opacity-70"
        style={{ clipPath: "inset(0 0 60% 0)", transform: "translate(-2px, 0)", mixBlendMode: "screen" }}
        aria-hidden
      >
        {text}
      </span>
      <span
        className="absolute top-0 left-0 w-full text-red-300 opacity-50"
        style={{ clipPath: "inset(55% 0 0 0)", transform: "translate(2px, 0)", mixBlendMode: "screen" }}
        aria-hidden
      >
        {text}
      </span>
      {text}
    </span>
  );
}

function ScanLine() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg">
      <div
        className="absolute w-full h-0.5 bg-red-500 opacity-10"
        style={{
          animation: "scanline 3s linear infinite",
        }}
      />
      <style>{`
        @keyframes scanline {
          0% { top: -2px; }
          100% { top: 100%; }
        }
        @keyframes flicker {
          0%, 100% { opacity: 1; }
          92% { opacity: 1; }
          93% { opacity: 0.8; }
          94% { opacity: 1; }
          96% { opacity: 0.9; }
          97% { opacity: 1; }
        }
        @keyframes glitch-anim {
          0% { clip-path: inset(40% 0 61% 0); transform: translate(-2px, 0); }
          20% { clip-path: inset(92% 0 1% 0); transform: translate(2px, 0); }
          40% { clip-path: inset(43% 0 1% 0); transform: translate(1px, 0); }
          60% { clip-path: inset(25% 0 58% 0); transform: translate(-1px, 0); }
          80% { clip-path: inset(54% 0 7% 0); transform: translate(2px, 0); }
          100% { clip-path: inset(58% 0 43% 0); transform: translate(-2px, 0); }
        }
        @keyframes pulse-red {
          0%, 100% { box-shadow: 0 0 5px rgba(220,38,38,0.3), 0 0 10px rgba(220,38,38,0.1); }
          50% { box-shadow: 0 0 15px rgba(220,38,38,0.6), 0 0 30px rgba(220,38,38,0.3); }
        }
        @keyframes border-flow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes counter-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        @keyframes data-stream {
          0% { transform: translateY(-100%); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        .input-esport {
          background: rgba(0,0,0,0.6);
          border: 1px solid rgba(220,38,38,0.3);
          color: #fff;
          transition: all 0.3s;
        }
        .input-esport:focus {
          outline: none;
          border-color: rgba(220,38,38,0.8);
          box-shadow: 0 0 0 2px rgba(220,38,38,0.2), 0 0 15px rgba(220,38,38,0.3);
        }
        .input-esport::placeholder { color: rgba(156,163,175,0.5); }
        .btn-submit {
          background: linear-gradient(135deg, #991b1b, #dc2626, #991b1b);
          background-size: 200% 200%;
          animation: border-flow 3s ease infinite;
          transition: all 0.3s;
        }
        .btn-submit:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 20px rgba(220,38,38,0.6), 0 0 40px rgba(220,38,38,0.3);
        }
        .btn-submit:active { transform: translateY(0); }
        .card-esport {
          animation: flicker 5s infinite;
          background: linear-gradient(135deg, rgba(10,10,10,0.95) 0%, rgba(20,5,5,0.95) 100%);
          border: 1px solid rgba(220,38,38,0.2);
        }
        .corner-bracket::before,
        .corner-bracket::after {
          content: '';
          position: absolute;
          width: 16px;
          height: 16px;
          border-color: rgba(220,38,38,0.8);
          border-style: solid;
        }
        .corner-tl::before { top: -1px; left: -1px; border-width: 2px 0 0 2px; }
        .corner-tr::after { top: -1px; right: -1px; border-width: 2px 2px 0 0; }
        .corner-bl::before { bottom: -1px; left: -1px; border-width: 0 0 2px 2px; }
        .corner-br::after { bottom: -1px; right: -1px; border-width: 0 2px 2px 0; }
        .hex-grid {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='52' viewBox='0 0 60 52'%3E%3Cpath fill='none' stroke='rgba(220%2C38%2C38%2C0.05)' d='M15 0 L45 0 L60 26 L45 52 L15 52 L0 26 Z'/%3E%3C/svg%3E");
        }
        .role-btn {
          transition: all 0.2s;
          background: rgba(0,0,0,0.5);
          border: 1px solid rgba(220,38,38,0.2);
          color: rgba(156,163,175,1);
        }
        .role-btn:hover {
          border-color: rgba(220,38,38,0.6);
          color: #fff;
          background: rgba(220,38,38,0.1);
        }
        .role-btn.active {
          background: rgba(220,38,38,0.2);
          border-color: rgba(220,38,38,0.8);
          color: #ef4444;
          box-shadow: 0 0 10px rgba(220,38,38,0.2);
        }
        .success-overlay {
          animation: fadeInUp 0.5s ease forwards;
        }
        @keyframes ping-red {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(2); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

function DataStream() {
  const chars = "01アイウエオカキクケコサシスセソタチツテトABCDEF0123456789";
  const streams = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    left: `${5 + i * 12}%`,
    delay: `${i * 0.4}s`,
    duration: `${3 + Math.random() * 2}s`,
    text: Array.from({ length: 12 }, () => chars[Math.floor(Math.random() * chars.length)]).join(""),
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {streams.map((s) => (
        <div
          key={s.id}
          className="absolute text-red-900 text-xs font-mono opacity-30 whitespace-nowrap"
          style={{
            left: s.left,
            top: "-50px",
            animation: `data-stream ${s.duration} ${s.delay} linear infinite`,
            writingMode: "vertical-rl",
          }}
        >
          {s.text}
        </div>
      ))}
    </div>
  );
}

export default function EsportMemberForm() {
  const [form, setForm] = useState({
    id: "",
    facebook: "",
    name: "",
    image: "",
    role: "",
  });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");
  const [preview, setPreview] = useState(null);
  const [imgError, setImgError] = useState(false);
  const firebaseConfigRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === "image") {
      setImgError(false);
      setPreview(value);
    }
  };

  const handleRole = (role) => {
    setForm((prev) => ({ ...prev, role }));
  };

  const validate = () => {
    if (!form.id || isNaN(Number(form.id)) || !Number.isInteger(Number(form.id))) {
      setErrorMsg("ID ต้องเป็นตัวเลขจำนวนเต็มเท่านั้น");
      return false;
    }
    if (!form.name.trim()) { setErrorMsg("กรุณากรอกชื่อสมาชิก"); return false; }
    if (!form.role) { setErrorMsg("กรุณาเลือก Role"); return false; }
    return true;
  };

  const handleSubmit = async () => {
    setErrorMsg("");
    if (!validate()) { setStatus("error"); return; }
    setStatus("loading");

    try {
      // ========== Firebase Firestore Integration ==========
      // Replace with your Firebase config
      const { initializeApp, getApps } = await import("https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js");
      const { getFirestore, collection, addDoc } = await import("https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js");

      // 🔴 TODO: Replace this config with your own Firebase project config
      const firebaseConfig = {
        apiKey: "YOUR_API_KEY",
        authDomain: "YOUR_PROJECT.firebaseapp.com",
        projectId: "YOUR_PROJECT_ID",
        storageBucket: "YOUR_PROJECT.appspot.com",
        messagingSenderId: "YOUR_SENDER_ID",
        appId: "YOUR_APP_ID",
      };

      const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
      const db = getFirestore(app);

      const docData = {
        id: BigInt ? Number(form.id) : parseInt(form.id, 10), // Firestore stores as number
        facebook: form.facebook.trim(),
        name: form.name.trim(),
        image: form.image.trim(),
        role: form.role,
        createdAt: new Date().toISOString(),
      };

      await addDoc(collection(db, "members"), docData);
      setStatus("success");
      setTimeout(() => {
        setStatus("idle");
        setForm({ id: "", facebook: "", name: "", image: "", role: "" });
        setPreview(null);
      }, 3000);
    } catch (err) {
      console.error(err);
      setErrorMsg("เชื่อมต่อ Firestore ไม่ได้ — ตรวจสอบ Firebase Config ของคุณ");
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-black hex-grid flex items-center justify-center p-4 relative overflow-hidden">
      <DataStream />

      {/* Ambient red glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-900 rounded-full opacity-10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-red-700 rounded-full opacity-8 blur-3xl pointer-events-none" />

      <div className="w-full max-w-xl relative z-10">
        {/* Header */}
        <div className="text-center mb-6">
          {/* Rotating rings */}
          <div className="relative inline-flex items-center justify-center mb-4">
            <div
              className="absolute w-20 h-20 border-2 border-red-800 border-dashed rounded-full opacity-40"
              style={{ animation: "spin-slow 8s linear infinite" }}
            />
            <div
              className="absolute w-28 h-28 border border-red-900 rounded-full opacity-20"
              style={{ animation: "counter-spin 12s linear infinite" }}
            />
            <div className="relative w-14 h-14 bg-gradient-to-br from-red-900 to-black border border-red-600 rounded-full flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-7 h-7 fill-red-500" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L3 7v10l9 5 9-5V7L12 2zm0 2.18L19 8.09v7.82L12 19.82 5 15.91V8.09L12 4.18z" opacity="0.3"/>
                <path d="M12 6a6 6 0 100 12A6 6 0 0012 6zm0 2a4 4 0 110 8 4 4 0 010-8z"/>
                <circle cx="12" cy="12" r="2"/>
              </svg>
            </div>
          </div>

          <div className="text-red-500 text-xs font-mono tracking-widest mb-1 uppercase">
            ◈ ESPORT COMMAND CENTER ◈
          </div>
          <h1 className="text-3xl font-black text-white tracking-wider uppercase">
            <GlitchText text="REGISTER MEMBER" />
          </h1>
          <div className="flex items-center justify-center gap-2 mt-2">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-red-700" />
            <span className="text-red-600 text-xs font-mono">SYS_ACCESS</span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-red-700" />
          </div>
        </div>

        {/* Card */}
        <div className="card-esport rounded-lg p-6 relative overflow-hidden">
          <ScanLine />

          {/* Corner brackets */}
          <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-red-600 rounded-tl" />
          <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-red-600 rounded-tr" />
          <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-red-600 rounded-bl" />
          <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-red-600 rounded-br" />

          {/* Success overlay */}
          {status === "success" && (
            <div className="absolute inset-0 z-50 bg-black bg-opacity-90 flex flex-col items-center justify-center rounded-lg success-overlay">
              <div className="relative mb-4">
                <div className="absolute inset-0 w-16 h-16 bg-red-500 rounded-full opacity-30" style={{ animation: "ping-red 1s cubic-bezier(0,0,0.2,1) infinite" }} />
                <div className="relative w-16 h-16 bg-gradient-to-br from-red-600 to-red-900 rounded-full flex items-center justify-center border-2 border-red-400">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <p className="text-red-400 font-mono text-sm tracking-widest uppercase">DATA UPLOADED</p>
              <p className="text-white font-bold text-lg mt-1">เพิ่มสมาชิกสำเร็จ!</p>
              <p className="text-gray-500 text-xs mt-1 font-mono">[FIRESTORE_WRITE_OK]</p>
            </div>
          )}

          <div className="space-y-5">
            {/* ID + Name row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-red-400 text-xs font-mono uppercase tracking-widest mb-1.5">
                  ◈ MEMBER ID <span className="text-gray-600">[INT64]</span>
                </label>
                <input
                  type="number"
                  name="id"
                  value={form.id}
                  onChange={handleChange}
                  placeholder="000001"
                  className="input-esport w-full rounded px-3 py-2.5 text-sm font-mono"
                />
              </div>
              <div>
                <label className="block text-red-400 text-xs font-mono uppercase tracking-widest mb-1.5">
                  ◈ NAME <span className="text-gray-600">[STR]</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="PLAYER_TAG"
                  className="input-esport w-full rounded px-3 py-2.5 text-sm font-mono"
                />
              </div>
            </div>

            {/* Facebook */}
            <div>
              <label className="block text-red-400 text-xs font-mono uppercase tracking-widest mb-1.5">
                ◈ FACEBOOK <span className="text-gray-600">[STR]</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-red-700 font-mono text-sm">fb://</span>
                <input
                  type="text"
                  name="facebook"
                  value={form.facebook}
                  onChange={handleChange}
                  placeholder="facebook.com/username"
                  className="input-esport w-full rounded pl-12 pr-3 py-2.5 text-sm font-mono"
                />
              </div>
            </div>

            {/* Image URL + Preview */}
            <div>
              <label className="block text-red-400 text-xs font-mono uppercase tracking-widest mb-1.5">
                ◈ AVATAR URL <span className="text-gray-600">[STR]</span>
              </label>
              <div className="flex gap-3">
                <input
                  type="text"
                  name="image"
                  value={form.image}
                  onChange={handleChange}
                  placeholder="https://cdn.example.com/avatar.png"
                  className="input-esport flex-1 rounded px-3 py-2.5 text-sm font-mono"
                />
                <div className="w-12 h-12 rounded border border-red-900 bg-black flex items-center justify-center overflow-hidden flex-shrink-0">
                  {preview && !imgError ? (
                    <img
                      src={preview}
                      alt="preview"
                      className="w-full h-full object-cover"
                      onError={() => setImgError(true)}
                    />
                  ) : (
                    <svg className="w-5 h-5 text-red-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  )}
                </div>
              </div>
            </div>

            {/* Role */}
            <div>
              <label className="block text-red-400 text-xs font-mono uppercase tracking-widest mb-2">
                ◈ ROLE <span className="text-gray-600">[STR]</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {ROLES.map((r) => (
                  <button
                    key={r}
                    onClick={() => handleRole(r)}
                    className={`role-btn rounded px-2 py-2 text-xs font-mono uppercase tracking-wider ${form.role === r ? "active" : ""}`}
                  >
                    {form.role === r && <span className="text-red-600 mr-1">▶</span>}
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* Error */}
            {status === "error" && errorMsg && (
              <div className="flex items-center gap-2 bg-red-950 border border-red-800 rounded px-3 py-2.5 text-red-400 text-xs font-mono">
                <span className="text-red-500 text-lg leading-none">⚠</span>
                <span>[ERROR] {errorMsg}</span>
              </div>
            )}

            {/* Divider */}
            <div className="flex items-center gap-3 my-1">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-red-900 to-transparent" />
              <span className="text-red-900 text-xs font-mono">◆</span>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-red-900 to-transparent" />
            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={status === "loading"}
              className="btn-submit w-full py-3 rounded text-white font-black uppercase tracking-widest text-sm relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "loading" ? (
                <span className="flex items-center justify-center gap-2 font-mono">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  UPLOADING DATA...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <span>⚡</span>
                  <span>DEPLOY MEMBER</span>
                  <span>⚡</span>
                </span>
              )}
            </button>

            {/* Footer info */}
            <p className="text-center text-gray-700 text-xs font-mono">
              TARGET: <span className="text-red-900">FIRESTORE</span> · COL: <span className="text-red-900">members</span>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-4 text-gray-700 text-xs font-mono tracking-widest">
          ◈ ESPORT MANAGEMENT SYSTEM v1.0 ◈
        </div>
      </div>
    </div>
  );
}