import React from "react";
import logo from "../assets/logo.gif";
import { useState } from 'react';
import RegisterModal from './RegisterModal';
import LoginModal from './loginModel';
import AdminLoginModal from "../admin/AdminLoginModal";
import { useNavigate } from "react-router-dom";

export default function AboutSystem() {
  const [open, setOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [showDashboard, setShowDashboard] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100">

      {/* TOP NAVBAR */}
      <nav className="fixed top-0 w-full bg-white shadow-md flex justify-between items-center px-10 py-4 z-50">
        <div className="flex items-center gap-3">
          <img src={logo} className="w-10 h-10 rounded-full"/>
          <span className="text-blue-700 font-bold text-lg">CylinderTrack</span>
        </div>

        <div className="flex gap-4">
          <button className="nav-btn">Home</button>
          <button className="nav-btn bg-blue-600 text-white">About</button>
          <button onClick={()=>setOpen(true)} className="nav-btn">Register</button>
          <button onClick={()=>setLoginOpen(true)} className="nav-btn">Login</button>
          <button onClick={()=>setAdminOpen(true)} className="nav-btn bg-red-600 text-white">Admin</button>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <div className="pt-28 max-w-6xl mx-auto px-6 text-center">

        <img src={logo} className="w-28 mx-auto mb-4 rounded-full shadow"/>
        <h1 className="text-4xl font-bold text-blue-700 mb-4">
          Cylinder Tracking Management
        </h1>

        <p className="max-w-3xl mx-auto text-gray-600 mb-10">
          A digital platform used to monitor warehouse → customer → warehouse lifecycle,
          reducing loss, misuse, and improving safety compliance.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            "Cylinder Registration",
            "Booking System",
            "Driver Assignment",
            "Live Delivery Tracking",
            "Cylinder History",
            "Loss Prevention"
          ].map((t,i)=>(
            <div key={i} className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition">
              <h3 className="text-red-600 font-bold mb-2">{t}</h3>
              <p className="text-gray-500 text-sm">Secure and automated management feature.</p>
            </div>
          ))}
        </div>
      </div>

      {/* Modals (Unchanged Logic) */}
      <RegisterModal isOpen={open} onClose={() => setOpen(false)} openLogin={() => setLoginOpen(true)}/>
      <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} onLoginSuccess={(name)=>{ setUserName(name); setShowDashboard(true); }}/>
      <AdminLoginModal isOpen={adminOpen} onClose={() => setAdminOpen(false)} onAdminSuccess={() => navigate("/admin")}/>
    </div>
  );
}
