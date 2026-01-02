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
    <div className="min-h-screen bg-white">

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
          <button className="px-6 py-3 text-lg font-bold rounded-lg bg-gray-100 text-gray-800 hover:bg-gray-200 transition">
            Home
          </button>

          <button
            onClick={() => navigate("/about-system")}
            className="px-6 py-3 text-lg font-bold rounded-lg bg-gray-100 text-gray-800 hover:bg-gray-200 transition"
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

      {/* HERO */}
      <div className="pt-32 text-center">
        <img
          src={logo}
          className="w-28 mx-auto mb-4 rounded-full shadow"
        />

        <h1 className="text-4xl font-bold text-gray-800">
          Cylinder Tracking
        </h1>
        {/* INFO STRIP */}
<div className=" mt-8
  w-screen
  h-[500px]
  bg-gradient-to-r from-blue-50 to-indigo-50
  border-y border-blue-200
  p-12
  shadow-lg
  flex flex-col justify-center items-center text-center
  transform transition-all duration-500
  hover:shadow-2xl">

  <h3 className="text-2xl font-bold text-gray-800 mb-3">
    Smart Cylinder Management System
  </h3>

  <p className="text-gray-800 text-lg md:text-xl font-semibold leading-relaxed max-w-5xl">
  Our smart cylinder tracking platform enables complete visibility across the
  entire cylinder lifecycle — from refilling and storage to dispatch and final
  delivery. Track LPG, CNG, Oxygen, Nitrogen, and Industrial cylinders in
  real-time with accurate location updates, usage history, and status
  monitoring.
  <br /><br />
  Reduce operational losses, prevent misplacement, and improve accountability
  by assigning cylinders to drivers, customers, and locations digitally.
  Automated tracking, delivery timelines, and transparent records ensure safe,
  efficient, and timely distribution while improving customer trust and
  operational efficiency.
</p>

  <div className="flex justify-center gap-6 mt-4 text-sm font-semibold text-blue-700">
    <span className="bg-white px-4 py-2 rounded-full shadow">Live Tracking</span>
    <span className="bg-white px-4 py-2 rounded-full shadow">Driver Assignment</span>
    <span className="bg-white px-4 py-2 rounded-full shadow">Loss Control</span>
  </div>
</div>


        <p className="max-w-xl mx-auto mt-3 text-gray-800">
          Optimize Cylinder Tracking, Minimize Losses
        </p>
      </div>

      {/* FEATURES */}
      <div className="grid md:grid-cols-3 gap-8 max-w-8xl mx-auto p-10">
        <Card img={cy1} title="Efficient Issue Resolution" />
        <Card img={cy2} title="Improved Customer Satisfaction" />
        <Card img={cy3} title="Accurate Compensation Management" />
        <Card img={cy4} title="Integration for Efficiency" />
        <Card img={cy5} title="Real-time Tracking" />
        <Card img={cy6} title="Loss Prevention" />
      </div>

      {/* MODALS */}
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
