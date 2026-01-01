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
import TrackingPopup from "./TrackingPopup";
import ReportPopup from "./ReportPopup";
import { useNavigate } from "react-router-dom";

export default function AdminHome() {

  const [dashboardOpen, setDashboardOpen] = useState(false);
  const [ordersOpen, setOrdersOpen] = useState(false);
  const [cylinderOpen,setCylinderOpen] = useState(false);
  const [driverOpen,setDriverOpen]=useState(false);
  const [trackingOpen,setTrackingOpen] = useState(false);
  const [historyOpen,setHistoryOpen] = useState(false);
  const [timelineOpen,setTimelineOpen] = useState(false);
  const [mapOpen,setMapOpen] = useState(false);
  const [reportOpen,setReportOpen]=useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-50">

      {/* TOP NAVBAR */}
      <div className="w-full h-16 bg-white shadow-md fixed top-0 left-0 z-50 flex items-center justify-between px-10">
        <div className="flex items-center gap-3">
          <img src={logo} className="w-10 h-10 rounded-full"/>
          <span className="font-bold text-blue-700">Cylinder Admin Panel</span>
        </div>

        <div className="flex gap-4">
          <NavBtn onClick={()=>setDashboardOpen(true)}>Dashboard</NavBtn>
          <NavBtn onClick={()=>setCylinderOpen(true)}>Cylinders</NavBtn>
          <NavBtn onClick={()=>setOrdersOpen(true)}>Orders</NavBtn>
          <NavBtn onClick={()=>setDriverOpen(true)}>Drivers</NavBtn>
          <NavBtn onClick={()=>setTrackingOpen(true)}>Tracking</NavBtn>
          <NavBtn onClick={()=>setReportOpen(true)}>Reports</NavBtn>
          <NavBtn onClick={()=>{
            localStorage.removeItem("adminToken");
            navigate("/");
          }} className="bg-red-500 hover:bg-red-600 text-white">Logout</NavBtn>
        </div>
      </div>

      {/* MAIN */}
      <div className="pt-24 px-12">

        <div className="text-center mb-10">
          <img src={logo} className="w-28 mx-auto mb-4 rounded-full shadow"/>
          <h1 className="text-3xl font-bold text-blue-700">Cylinder Tracking Dashboard</h1>
          <p className="text-gray-500 mt-2">Optimize Cylinder Tracking, Minimize Losses</p>
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
      {trackingOpen && (
        <TrackingPopup
          close={()=>setTrackingOpen(false)}
          openHistory={()=>{setTrackingOpen(false); setHistoryOpen(true)}}
          openTimeline={()=>{setTrackingOpen(false); setTimelineOpen(true)}}
          openMap={()=>{setTrackingOpen(false); setMapOpen(true)}}
        />
      )}
      {historyOpen && <CylinderHistoryPopup close={()=>setHistoryOpen(false)} />}
      {timelineOpen && <DeliveryTimelinePopup close={()=>setTimelineOpen(false)} />}
      {mapOpen && <CylinderLiveMap close={()=>setMapOpen(false)} />}
      {reportOpen && <ReportPopup close={()=>setReportOpen(false)} />}
    </div>
  );
}

/* NAV BUTTON */
function NavBtn({ children, onClick, className="" }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg font-semibold text-blue-700 hover:bg-blue-100 transition ${className}`}
    >
      {children}
    </button>
  );
}
