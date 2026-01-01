import logo from "../assets/logo.gif";
import Card from './Card';
import cy1 from '../assets/cy1.png'
import cy2 from '../assets/cy2.png'
import cy3 from '../assets/cy3.png'
import cy4 from '../assets/cy4.png'
import cy5 from '../assets/cy5.png'
import cy6 from '../assets/cy6.png'
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
  const userName = location.state?.userName;
  const email = location.state?.email;

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-gray-50 to-blue-50">

      {/* Top Navbar */}
      <div className="w-full h-[70px] bg-white shadow-md flex items-center justify-between px-10 fixed top-0 left-0 z-50">

        <div className="flex items-center gap-3">
          <img src={logo} className="w-10 h-10 rounded-full"/>
          <h2 className="text-xl font-bold text-red-600">Cylinder Tracking</h2>
        </div>

        <div className="flex gap-8 font-semibold text-gray-600">
          <button className="nav-btn">Home</button>
          <button onClick={() => setOpenBooking(true)} className="nav-btn">Book Cylinder</button>
          <button onClick={() => setTrackOpen(true)} className="nav-btn">Track Order</button>
          <button onClick={handleLogout} className="nav-btn text-red-600">Logout</button>
        </div>
      </div>

      {/* Main */}
      <div className="pt-[100px] px-10">

        <div className="flex flex-col items-center text-center">

          <img src={logo} className="w-32 h-32 rounded-full shadow-lg mb-3" />
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
      {trackOpen && <UserTrackingPopup email={email} close={() => setTrackOpen(false)} />}
    </div>
  );
}
