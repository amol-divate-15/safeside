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
import RegisterModal from "../component/RegisterModal";
import AllUsersPopup from './AllUsersPopup';



export default function AdminHome() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [addUserOpen, setAddUserOpen] = useState(false);
  const [allUser, setAllUser] = useState(false);
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
      <div
  className={`fixed top-0 left-0 h-screen
    w-[300px]
    bg-white
    shadow-md
    flex flex-col
    px-8 py-6
    z-50
    transform transition-transform duration-300
    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
  `}
>


        <div className="flex flex-col items-center text-center gap-3 mb-12">
          <img src={logo} className="w-12 h-12 rounded-full" />
          <h2 className="text-xl font-bold text-red-600">
            Cylinder Tracking
          </h2>
        </div>
        

        <div className="w-full px-4 space-y-3">
          <SideBtn
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
  onClick={() => setAddUserOpen(true)}
>
  Add User
</SideBtn>


<SideBtn
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
  onClick={() => setAllUser(true)}
>
  All Users
</SideBtn>
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
      <div
  className={`w-full px-6 md:px-12 pt-10 transition-all duration-300
    ${sidebarOpen ? "ml-64" : "ml-0"}
  `}
>


        <div className="text-center mb-10">
          <div className="flex justify-end mb-4">
  <button
    onClick={() => setSidebarOpen(!sidebarOpen)}
    className="text-3xl font-bold px-4 py-2 rounded-lg
               hover:bg-gray-200 transition"
  >
    ⋮
  </button>
</div>

          <img src={logo} className="w-28 mx-auto mb-4 rounded-full shadow"/>
          <h1 className="text-3xl font-bold text-blue-700">
            Cylinder Tracking Dashboard
          </h1>
          <p className="text-gray-500 mt-2">
            Optimize Cylinder Tracking, Minimize Losses
          </p>
        </div>
        <div className="
  mt-8
  w-full
  bg-white/80
  backdrop-blur-md
  border border-blue-100
  rounded-3xl
  p-6 md:p-12
  shadow-lg
  text-left

  transform transition-all duration-500
  hover:-translate-y-2
  hover:shadow-2xl
  hover:border-blue-300
">

  <h2 className="text-2xl md:text-3xl font-bold text-blue-700 mb-6 text-center
                 transition-colors duration-300 hover:text-blue-800">
    Admin Control & Responsibilities
  </h2>

  <p className="text-gray-700 leading-relaxed text-lg md:text-xl space-y-3
           font-bold
           transition-colors duration-300 hover:text-gray-800 ml-100">
    • Create and manage system users including customers, drivers, and staff.<br/>
    • View all registered users, monitor activity, and remove inactive accounts.<br/>
    • Manage cylinder inventory by adding, updating, and tracking cylinder status.<br/>
    • Monitor all customer orders and assign deliveries efficiently.<br/>
    • Manage drivers, track their availability, and assign delivery tasks.<br/>
    • Track complete cylinder movement history for transparency and audits.<br/>
    • View real-time delivery timelines and live cylinder locations on the map.<br/>
    • Generate operational reports to analyze performance and prevent losses.<br/>
    • Maintain system security and ensure smooth end-to-end operations.
  </p>

</div>


        <div className="grid grid-cols-3 gap-8 place-items-center mt-20">
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
        <RegisterModal isOpen={addUserOpen} onClose={() => setAddUserOpen(false)} openLogin={() => {}}/>
<AllUsersPopup
  isOpen={allUser}
  onClose={() => setAllUser(false)}
/>

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
