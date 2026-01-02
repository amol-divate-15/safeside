import React from 'react'
import logo from "../assets/logo.gif";
import Card from '../component/Card';
import cy1 from '../assets/cy1.png'
import cy2 from '../assets/cy2.png'
import cy3 from '../assets/cy3.png'
import cy4 from '../assets/cy4.png'
import cy5 from '../assets/cy5.png'
import cy6 from '../assets/cy6.png'
import { useState } from 'react';
import AdminOrdersPopup from "./AdminOrdersPopup";
import DashboardPopup from "./DashboardPopup";
import CylinderPopup from "./CylinderPopup";
import DriverPopup from "./DriverPopup";
import CylinderHistoryPopup from "./CylinderHistoryPopup";
import DeliveryTimelinePopup from "./DeliveryTimelinePopup";
import CylinderLiveMap from "./CylinderLiveMap";
import ReportPopup from "./ReportPopup";
import { useNavigate } from "react-router-dom";

export default function AdminHome() {

  const [dashboardOpen, setDashboardOpen] = useState(false);
  const [ordersOpen, setOrdersOpen] = useState(false);
  const [cylinderOpen,setCylinderOpen] = useState(false);
  const [driverOpen,setDriverOpen]=useState(false);
  const [historyOpen,setHistoryOpen] = useState(false);
  const [timelineOpen,setTimelineOpen] = useState(false);
  const [mapOpen,setMapOpen] = useState(false);
  const [reportOpen,setReportOpen]=useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-50 flex">

      {/* SIDEBAR */}
      <div className="fixed top-0 left-0 h-screen
          w-[300px]
          bg-white
          shadow-md
          flex flex-col
          px-8 py-6
          z-50">

        <div className="flex flex-col items-center text-center gap-3 mb-12">
          <img src={logo} className="w-12 h-12 rounded-full" />
          <h2 className="text-xl font-bold text-red-600">
            Cylinder Tracking
          </h2>
        </div>
        

        <div className="w-full px-4 space-y-3">
          <SideBtn className="nav-btn
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
    hover:backdrop-blur-md" onClick={()=>setDashboardOpen(true)}>Dashboard</SideBtn>
          <SideBtn className="nav-btn
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
    hover:backdrop-blur-md" onClick={()=>setCylinderOpen(true)}>Cylinders</SideBtn>
          <SideBtn className="nav-btn
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
    hover:backdrop-blur-md" onClick={()=>setOrdersOpen(true)}>Orders</SideBtn>
          <SideBtn className="nav-btn
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
    hover:backdrop-blur-md" onClick={()=>setDriverOpen(true)}>Drivers</SideBtn>
          <SideBtn className="nav-btn
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
    hover:backdrop-blur-md"  onClick={()=>setHistoryOpen(true)}>Tracking</SideBtn>
          <SideBtn className="nav-btn
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
    hover:backdrop-blur-md" onClick={()=>setReportOpen(true)}>Reports</SideBtn>

          <SideBtn
            className="bg-red-500 text-white hover:bg-red-600 nav-btn
    text-center
    w-full
    px-10
    py-5
    text-xl
    font-black
    tracking-wide
   
    backdrop-blur-sm
    transition-all duration-300
    hover:bg-blue-500/20
    hover:border-blue-400/30
    hover:text-blue-800
    hover:backdrop-blur-md"
            onClick={()=>{
              localStorage.removeItem("adminToken");
              navigate("/");
            }}
          >
            Logout
          </SideBtn>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="ml-64 w-full px-12 pt-10">

        <div className="text-center mb-10">
          <img src={logo} className="w-28 mx-auto mb-4 rounded-full shadow"/>
          <h1 className="text-3xl font-bold text-blue-700">
            Cylinder Tracking Dashboard
          </h1>
          <p className="text-gray-500 mt-2">
            Optimize Cylinder Tracking, Minimize Losses
          </p>
        </div>

        <div className="grid grid-cols-3 gap-8 place-items-center">
          <Card img={cy1} title="Efficient Issue Resolution" />
          <Card img={cy2} title="Improved Customer Satisfaction" />
          <Card img={cy3} title="Accurate Compensation Management" />
          <Card img={cy4} title="Integration for Efficiency" />
          <Card img={cy5} title="Real-time Tracking" />
          <Card img={cy6} title="Loss Prevention" />
        </div>
      </div>

      {/* POPUPS (UNCHANGED) */}
      <DashboardPopup isOpen={dashboardOpen} onClose={() => setDashboardOpen(false)} />
      {ordersOpen && <AdminOrdersPopup close={() => setOrdersOpen(false)} />}
      {cylinderOpen && <CylinderPopup close={()=>setCylinderOpen(false)} />}
      {driverOpen && <DriverPopup close={()=>setDriverOpen(false)} />}
      {historyOpen && <CylinderHistoryPopup close={()=>setHistoryOpen(false)} />}
      {timelineOpen && <DeliveryTimelinePopup close={()=>setTimelineOpen(false)} />}
      {mapOpen && <CylinderLiveMap close={()=>setMapOpen(false)} />}
      {reportOpen && <ReportPopup close={()=>setReportOpen(false)} />}
    </div>
  );
}

/* SIDEBAR BUTTON */
function SideBtn({ children, onClick, className="" }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-6 py-3 rounded-xl font-semibold text-blue-700 
                  hover:bg-blue-100 transition ${className}`}
    >
      {children}
    </button>
  );
}
