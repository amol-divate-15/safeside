import React from 'react'
import logo from "../assets/logo.gif";
import Card from './Card';
import cy1 from '../assets/cy1.png'
import cy2 from '../assets/cy2.png'
import cy3 from '../assets/cy3.png'
import cy4 from '../assets/cy4.png'
import cy5 from '../assets/cy5.png'
import cy6 from '../assets/cy6.png'
import { useState } from 'react';
import RegisterModal from './RegisterModal';
import LoginModal from './loginModel';

import { useNavigate } from "react-router-dom";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [showDashboard, setShowDashboard] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-100">

      {/* TOP NAV */}
      <nav className="fixed top-0 w-full bg-white shadow-md flex justify-between items-center px-10 py-4 z-50">
        <div className="flex items-center gap-3">
          <img src={logo} className="w-10 h-10 rounded-full"/>
          <span className="font-bold text-blue-700 text-lg">CylinderTrack</span>
        </div>

        <div className="flex gap-4">
          <button className="nav-btn">Home</button>
          <button onClick={()=>navigate("/about-system")} className="nav-btn">About</button>
          <button onClick={() => setOpen(true)} className="nav-btn">Register</button>
          <button onClick={() => setLoginOpen(true)} className="nav-btn">Login</button>
          
        </div>
      </nav>

      {/* HERO */}
      <div className="pt-32 text-center">
        <img src={logo} className="w-28 mx-auto mb-4 rounded-full shadow"/>
        <h1 className="text-4xl font-bold text-blue-700">Cylinder Tracking</h1>
        <p className="max-w-xl mx-auto mt-3 text-gray-600">
          Optimize Cylinder Tracking, Minimize Losses
        </p>
      </div>

      {/* FEATURES */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto p-10">
        <Card img={cy1} title="Efficient Issue Resolution"/>
        <Card img={cy2} title="Improved Customer Satisfaction"/>
        <Card img={cy3} title="Accurate Compensation Management"/>
        <Card img={cy4} title="Integration for Efficiency"/>
        <Card img={cy5} title="Real-time Tracking"/>
        <Card img={cy6} title="Loss Prevention"/>
      </div>

      {/* Modals */}
      <RegisterModal isOpen={open} onClose={() => setOpen(false)} openLogin={() => setLoginOpen(true)}/>
      <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} onLoginSuccess={(name)=>{setUserName(name);setShowDashboard(true)}}/>
     
    </div>
  )
}
