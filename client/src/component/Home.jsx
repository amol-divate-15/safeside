import React, { useState } from "react";
import logo from "../assets/logo.gif";
import Card from "./Card";
import cy1 from "../assets/cy1.png";
import cy2 from "../assets/cy2.png";
import cy3 from "../assets/cy3.png";
import cy4 from "../assets/cy4.png";
import cy5 from "../assets/cy5.png";
import cy6 from "../assets/cy6.png";
import RegisterModal from "./RegisterModal";
import LoginModal from "./loginModel";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [showDashboard, setShowDashboard] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">

      {/* ================= NAVBAR ================= */}
      <nav className="
        fixed top-0 w-full z-50
        bg-white/80 backdrop-blur-xl
        border-b border-gray-200/40
        shadow-lg
        flex justify-between items-center
        px-10 py-4
      ">
        <div className="flex items-center gap-3">
          <img src={logo} className="w-10 h-10 rounded-full shadow" />
          <span className="text-xl font-extrabold text-gray-800">
            Cylinder Track
          </span>
        </div>

        <div className="flex gap-4">
          <NavBtn active>Home</NavBtn>

          <NavBtn onClick={() => navigate("/about-system")}>
            About
          </NavBtn>

          <NavBtn onClick={() => setOpen(true)}>
            Register
          </NavBtn>

          <NavBtn primary onClick={() => setLoginOpen(true)}>
            Login
          </NavBtn>
        </div>
      </nav>

      {/* ================= HERO ================= */}
      <section className="pt-36 text-center relative overflow-hidden">

        {/* Glow background */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-200 via-indigo-200 to-white blur-3xl opacity-70" />

        <img src={logo} className="w-32 mx-auto mb-6 rounded-full shadow-xl" />

        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight">
          Cylinder Tracking System
        </h1>

        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
          A modern platform to monitor, manage, and optimize cylinder lifecycle
          operations with real-time visibility.
        </p>

        {/* ================= INFO STRIP ================= */}
        <div className="
          mt-16
          w-screen h-[520px]
          bg-white/40 backdrop-blur-2xl
          border-y border-blue-200/40
          shadow-[0_30px_120px_rgba(0,0,0,0.15)]
          flex flex-col justify-center items-center
          px-12 text-center
          transition-all duration-700
          hover:shadow-[0_40px_140px_rgba(59,130,246,0.35)]
        ">
          <h2 className="
            text-3xl md:text-4xl font-extrabold mb-6
            bg-gradient-to-r from-blue-700 to-indigo-700
            bg-clip-text text-transparent
          ">
            Smart Cylinder Management
          </h2>

          <p className="text-gray-800 text-lg md:text-xl font-semibold leading-relaxed max-w-6xl">
            Track LPG, CNG, Oxygen, Nitrogen, and Industrial cylinders across
            refilling, storage, dispatch, and delivery stages. Gain complete
            transparency, reduce losses, improve accountability, and ensure
            safe, timely distribution using automated workflows and live
            tracking.
          </p>

          <div className="flex flex-wrap justify-center gap-6 mt-10 font-bold text-blue-800">
            <Pill>Live Tracking</Pill>
            <Pill>Driver Assignment</Pill>
            <Pill>Loss Prevention</Pill>
            <Pill>Operational Insights</Pill>
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="max-w-7xl mx-auto py-24 px-10">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-14">
          Platform Capabilities
        </h2>

        <div className="grid md:grid-cols-3 gap-12">
          <FeatureCard img={cy1} title="Efficient Issue Resolution" />
          <FeatureCard img={cy2} title="Customer Satisfaction" />
          <FeatureCard img={cy3} title="Accurate Compensation" />
          <FeatureCard img={cy4} title="System Integration" />
          <FeatureCard img={cy5} title="Real-Time Monitoring" />
          <FeatureCard img={cy6} title="Loss Prevention" />
        </div>
      </section>

      {/* ================= MODALS ================= */}
      <RegisterModal
        isOpen={open}
        onClose={() => setOpen(false)}
        openLogin={() => setLoginOpen(true)}
      />

      <LoginModal
        isOpen={loginOpen}
        onClose={() => setLoginOpen(false)}
        onLoginSuccess={(name) => {
          setUserName(name);
          setShowDashboard(true);
        }}
      />
    </div>
  );
}

/* ================= UI HELPERS ================= */

function NavBtn({ children, onClick, primary, active }) {
  return (
    <button
      onClick={onClick}
      className={`
        px-6 py-3 rounded-xl text-lg font-bold transition-all
        ${active ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-800"}
        ${primary ? "bg-blue-600 text-white hover:bg-blue-700" : "hover:bg-gray-200"}
        hover:scale-105
      `}
    >
      {children}
    </button>
  );
}

function Pill({ children }) {
  return (
    <span className="
      bg-white/80 px-6 py-3 rounded-full shadow-lg
      hover:scale-110 transition
    ">
      {children}
    </span>
  );
}

function FeatureCard({ img, title }) {
  return (
    <div className="
      bg-white/80 backdrop-blur-xl
      border border-gray-200/50
      rounded-3xl p-10 text-center
      shadow-xl
      hover:shadow-2xl hover:-translate-y-3
      transition-all duration-500
    ">
      <img src={img} className="w-24 mx-auto mb-6" />
      <h3 className="text-xl font-extrabold text-gray-800 mb-2">
        {title}
      </h3>
      <p className="text-gray-600">
        Enterprise-grade feature designed to ensure operational efficiency,
        safety, and reliability.
      </p>
    </div>
  );
}
