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
    <div className="w-screen h-screen bg-gradient-to-br from-gray-50 to-blue-50">

      {/* SIDEBAR (BROAD & RESPONSIVE) */}
      <div
        className="
          fixed top-0 left-0 h-screen
          w-[300px]
          bg-white
          shadow-md
          flex flex-col
          px-8 py-6
          z-50
        "
      >
        <div className="flex flex-col items-center text-center gap-3 mb-12">
  <img src={logo} className="w-12 h-12 rounded-full" />
  <h2 className="text-xl font-bold text-red-600">
    Cylinder Tracking
  </h2>
</div>


        <div className="flex flex-col gap-6 font-semibold text-gray-600">
          <button className="nav-btn
    text-center
    w-full
    px-10
    py-5
    text-xl
    font-black
    tracking-wide
    bg-white/60
    backdrop-blur-sm
    transition-all duration-300
    hover:bg-blue-500/20
    hover:border-blue-400/30
    hover:text-blue-800
    hover:backdrop-blur-md">Home</button>

          <button
            onClick={() => setOpenBooking(true)}
            className="nav-btn
    text-center
    w-full
    px-10
    py-5
    text-xl
    font-black
    tracking-wide
    bg-white/60
    backdrop-blur-sm
    transition-all duration-300
    hover:bg-blue-500/20
    hover:border-blue-400/30
    hover:text-blue-800
    hover:backdrop-blur-md"
          >
            Book Cylinder
          </button>

          <button
            onClick={() => setTrackOpen(true)}
            className="nav-btn
    text-center
    w-full
    px-10
    py-5
    text-xl
    font-black
    tracking-wide
    bg-white/60
    backdrop-blur-sm
    transition-all duration-300
    hover:bg-blue-500/20
    hover:border-blue-400/30
    hover:text-blue-800
    hover:backdrop-blur-md"
          >
            Track Order
          </button>

          <button
            onClick={handleLogout}
            className="nav-btn
    text-center
    w-full
    px-10
    py-5
    text-xl
    font-black
    tracking-wide
    bg-white/60
    backdrop-blur-sm
    transition-all duration-300
    hover:bg-blue-500/20
    hover:border-blue-400/30
    hover:text-blue-800
    hover:backdrop-blur-md"
          >
            Logout
          </button>
        </div>
      </div>

      {/* MAIN CONTENT (SHIFTED FOR SIDEBAR) */}
      <div className="ml-[300px] pt-10 px-10">

        <div className="flex flex-col items-center text-center">
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
        <div className="grid grid-cols-3 gap-8 mt-12 place-items-center">
          <Card img={cy1} title="Efficient Issue Resolution" />
          <Card img={cy2} title="Improved Customer Satisfaction" />
          <Card img={cy3} title="Accurate Compensation Management" />
          <Card img={cy4} title="Integration for Efficiency" />
          <Card img={cy5} title="Real-time Tracking" />
          <Card img={cy6} title="Loss Prevention" />
        </div>
      </div>

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
