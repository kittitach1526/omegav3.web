import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

import MembersLanding from './pages/index.jsx'
import WelcomePage from './pages/welcome.jsx'

// อิมพอร์ตหน้าต่างๆ มาใช้งาน (หรือประกาศไว้ด้านบนแบบนี้ก่อนได้ครับ)
function Home() { return <div className="page"><h2>หน้าแรก (Home)</h2><img src={heroImg} alt="Hero" style={{maxWidth: '300px'}} /></div> }
function About() { return <div className="page"><h2>เกี่ยวกับเรา (About)</h2></div> }
function Contact() { return <div className="page"><h2>ติดต่อเรา (Contact)</h2></div> }

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>

      {/* ── ส่วนของ การแบ่ง Path (Routes) ── */}
      <Routes>
        {/* path="/" คือหน้าแรก */}
        <Route path="/" element={<WelcomePage />} />
        <Route path="/home" element={<MembersLanding />} />
        
        {/* path="/about" คือหน้า http://localhost:5173/about */}
        <Route path="/about" element={<About />} />
        
        {/* path="/contact" คือหน้า http://localhost:5173/contact */}
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App