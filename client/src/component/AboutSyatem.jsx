import React, { useState } from "react";
import logo from "../assets/logo.gif";
import RegisterModal from "./RegisterModal";
import LoginModal from "./loginModel";
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
          <NavBtn onClick={() => navigate("/")}>Home</NavBtn>
          <NavBtn active>About</NavBtn>
          <NavBtn onClick={() => setOpen(true)}>Register</NavBtn>
          <NavBtn primary onClick={() => setLoginOpen(true)}>Login</NavBtn>
        </div>
      </nav>

      {/* ================= HERO ================= */}
      <section className="pt-36 text-center relative overflow-hidden">

        {/* Glow background */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-200 via-indigo-200 to-white blur-3xl opacity-70" />

        <img src={logo} className="w-32 mx-auto mb-6 rounded-full shadow-xl" />

        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight">
          About Cylinder Tracking
        </h1>

        <p className="mt-6 text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
          A modern digital platform designed to monitor the complete
          <b> warehouse → customer → warehouse </b>
          lifecycle, reducing losses, improving safety compliance, and ensuring
          operational transparency.
        </p>
      </section>

      {/* ================= FEATURES GRID ================= */}
      <section className="max-w-7xl mx-auto py-24 px-10">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-16">
          Core System Capabilities
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14">
          {[
            "Cylinder Registration",
            "Booking System",
            "Driver Assignment",
            "Live Delivery Tracking",
            "Cylinder History",
            "Loss Prevention"
          ].map((title, i) => (
            <div
              key={i}
              className="
                bg-white/60 backdrop-blur-2xl
                border border-blue-200/40
                rounded-3xl
                p-12
                shadow-xl
                transition-all duration-500
                hover:-translate-y-3
                hover:shadow-[0_30px_120px_rgba(59,130,246,0.35)]
              "
            >
              <h3 className="
                text-2xl font-extrabold mb-4 text-center
                bg-gradient-to-r from-blue-700 to-indigo-700
                bg-clip-text text-transparent
              ">
                {title}
              </h3>

              <p className="text-gray-700 text-lg text-center leading-relaxed font-semibold">
                Secure, scalable, and automated functionality built to
                ensure accuracy, traceability, and efficient cylinder
                operations across the entire supply chain.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= FOOTER STRIP ================= */}
      <section className="
        w-full py-20
        bg-gradient-to-r from-blue-600 to-indigo-700
        text-white text-center
      ">
        <h3 className="text-3xl font-extrabold mb-4">
          Built for Safety. Designed for Scale.
        </h3>
        <p className="max-w-3xl mx-auto text-lg opacity-90">
          Cylinder Tracking System empowers organizations to reduce losses,
          improve delivery efficiency, and maintain complete operational
          visibility with confidence.
        </p>
      </section>

      {/* ================= MODALS (LOGIC UNCHANGED) ================= */}
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

      <AdminLoginModal
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
        onAdminSuccess={() => navigate("/admin")}
      />
    </div>
  );
}

/* ================= UI HELPERS ================= */

function NavBtn({ children, onClick, active, primary }) {
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
