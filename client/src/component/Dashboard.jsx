import logo from "../assets/logo.gif";
import Card from "./Card";
import cy1 from "../assets/cy1.png";
import cy2 from "../assets/cy2.png";
import cy3 from "../assets/cy3.png";
import cy4 from "../assets/cy4.png";
import cy5 from "../assets/cy5.png";
import cy6 from "../assets/cy6.png";
import { useLocation, useNavigate } from "react-router-dom";
import BookingModal from "./BookingModal";
import { useState } from "react";
import UserTrackingPopup from "./UserTrackingPopup";

export default function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const [openBooking, setOpenBooking] = useState(false);
  const [trackOpen, setTrackOpen] = useState(false);

  const handleLogout = () => navigate("/");
  const user = JSON.parse(localStorage.getItem("loggedUser"));
  const userName = user?.name;
  const email = user?.email;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex">

      {/* ================= SIDEBAR ================= */}
      <aside
        className="
          fixed top-0 left-0 h-screen w-[280px]
          bg-white/80 backdrop-blur-xl
          shadow-2xl z-50
          flex flex-col
        "
      >
        {/* Logo Section */}
        <div className="flex flex-col items-center gap-3 py-8 border-b">
          <img src={logo} className="w-14 h-14 rounded-full shadow" />
          <h2 className="text-xl font-extrabold text-red-600 text-center">
            Cylinder Tracking
          </h2>
        </div>

        {/* Navigation Buttons */}
        <div className="p-4 space-y-4 font-semibold">
          <button
            className="
              w-full px-6 py-4 rounded-xl text-lg font-bold
              bg-blue-50 text-blue-700
              hover:bg-blue-100 transition
            "
          >
            Home
          </button>

          <button
            onClick={() => setOpenBooking(true)}
            className="
              w-full px-6 py-4 rounded-xl text-lg font-bold
              bg-blue-50 text-blue-700
              hover:bg-blue-100 transition
            "
          >
            Book Cylinder
          </button>

          <button
            onClick={() => setTrackOpen(true)}
            className="
              w-full px-6 py-4 rounded-xl text-lg font-bold
              bg-blue-50 text-blue-700
              hover:bg-blue-100 transition
            "
          >
            Track Order
          </button>

          <button
            onClick={handleLogout}
            className="
              w-full px-6 py-4 rounded-xl text-lg font-bold
              bg-red-500 text-white
              hover:bg-red-600 transition
            "
          >
            Logout
          </button>
        </div>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main className="ml-[280px] w-full pt-10 px-10">

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <img
            src={logo}
            className="w-32 h-32 rounded-full shadow-lg mb-3"
          />

          <h1 className="text-3xl font-bold text-blue-700">
            {userName ? `Welcome, ${userName}` : "Cylinder Tracking"}
          </h1>

          <p className="text-gray-600 max-w-xl mt-3">
            Optimize Cylinder Tracking, Minimize Losses. Manual tracking leads to errors,
            delays and safety risks — automate it now.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 place-items-center">
          <Card img={cy1} title="Efficient Issue Resolution" />
          <Card img={cy2} title="Improved Customer Satisfaction" />
          <Card img={cy3} title="Accurate Compensation Management" />
          <Card img={cy4} title="Integration for Efficiency" />
          <Card img={cy5} title="Real-time Tracking" />
          <Card img={cy6} title="Loss Prevention" />
        </div>
      </main>

      {/* ================= POPUPS ================= */}
      {openBooking && <BookingModal close={() => setOpenBooking(false)} />}

      {trackOpen && (
        <UserTrackingPopup
          email={email}
          close={() => setTrackOpen(false)}
        />
      )}
    </div>
  );
}
