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
    <div className="min-h-screen bg-whit0">

      TOP NAVBAR
      {/* TOP NAV */}
<nav
  className="
    fixed top-0 w-full
    bg-white
    border-b border-gray-200
    shadow-md
    flex justify-between items-center
    px-10 py-4
    z-50
  "
>
  <div className="flex items-center gap-3">
    <img src={logo} className="w-10 h-10 rounded-full" />
    <span className="font-bold text-gray-800 text-lg">
      Cylinder Track
    </span>
  </div>

  <div className="flex gap-4">
    <button
      onClick={() => navigate("/")}
      className="px-6 py-3 text-lg font-bold rounded-lg bg-gray-100 text-gray-800 hover:bg-gray-200 transition"
    >
      Home
    </button>

    <button
      className="px-6 py-3 text-lg font-bold rounded-lg bg-gray-800 text-white"
    >
      About
    </button>

    <button
      onClick={() => setOpen(true)}
      className="px-6 py-3 text-lg font-bold rounded-lg bg-gray-100 text-gray-800 hover:bg-gray-200 transition"
    >
      Register
    </button>

    <button
      onClick={() => setLoginOpen(true)}
      className="px-6 py-3 text-lg font-bold rounded-lg bg-gray-100 text-gray-800 hover:bg-gray-200 transition"
    >
      Login
    </button>
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
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mt-12">
  {[
    "Cylinder Registration",
    "Booking System",
    "Driver Assignment",
    "Live Delivery Tracking",
    "Cylinder History",
    "Loss Prevention"
  ].map((t, i) => (
    <div
      key={i}
      className="
        bg-blue-200/20
        backdrop-blur-lg
        border border-blue-300/30
        p-10
        rounded-3xl
        shadow-lg
        transition-all duration-500
        hover:shadow-2xl
        hover:-translate-y-2
      "
    >
      <h3 className="text-blue-800 text-xl font-extrabold mb-4 text-center">
        {t}
      </h3>

      <p className="text-blue-900/80 text-base md:text-lg text-center leading-relaxed">
        Secure, scalable, and automated system feature designed to ensure
        safety, traceability, and efficient cylinder operations.
      </p>
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
