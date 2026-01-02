import React, { useState } from "react";
import logo from "../assets/logo.gif";
import Card from "../component/Card";
import cy1 from "../assets/cy1.png";
import cy2 from "../assets/cy2.png";
import cy3 from "../assets/cy3.png";
import cy4 from "../assets/cy4.png";
import cy5 from "../assets/cy5.png";
import cy6 from "../assets/cy6.png";

import AdminOrdersPopup from "./AdminOrdersPopup";
import DashboardPopup from "./DashboardPopup";
import CylinderPopup from "./CylinderPopup";
import DriverPopup from "./DriverPopup";
import CylinderHistoryPopup from "./CylinderHistoryPopup";
import DeliveryTimelinePopup from "./DeliveryTimelinePopup";
import CylinderLiveMap from "./CylinderLiveMap";
import ReportPopup from "./ReportPopup";
import RegisterModal from "../component/RegisterModal";
import AllUsersPopup from "./AllUsersPopup";

import { useNavigate } from "react-router-dom";

export default function AdminHome() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [addUserOpen, setAddUserOpen] = useState(false);
  const [allUser, setAllUser] = useState(false);
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const [ordersOpen, setOrdersOpen] = useState(false);
  const [cylinderOpen, setCylinderOpen] = useState(false);
  const [driverOpen, setDriverOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [mapOpen, setMapOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-50 flex">

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-[280px]
          bg-white/80 backdrop-blur-xl
          shadow-2xl z-50
          transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex flex-col items-center gap-3 py-8 border-b">
          <img src={logo} className="w-14 h-14 rounded-full shadow" />
          <h2 className="text-xl font-extrabold text-blue-700">
            Admin Panel
          </h2>
        </div>

        <div className="p-4 space-y-3">
          <SideBtn onClick={() => setAddUserOpen(true)}>Add User</SideBtn>
          <SideBtn onClick={() => setAllUser(true)}>All Users</SideBtn>
          <SideBtn onClick={() => setCylinderOpen(true)}>Cylinders</SideBtn>
          <SideBtn onClick={() => setOrdersOpen(true)}>Orders</SideBtn>
          <SideBtn onClick={() => setDriverOpen(true)}>Drivers</SideBtn>
          <SideBtn onClick={() => setHistoryOpen(true)}>Tracking</SideBtn>
          <SideBtn onClick={() => setReportOpen(true)}>Reports</SideBtn>

          <SideBtn
            danger
            onClick={() => {
              localStorage.removeItem("adminToken");
              navigate("/");
            }}
          >
            Logout
          </SideBtn>
        </div>
      </aside>

      {/* ================= MAIN ================= */}
      <main
        className={`
          flex-1 transition-all duration-300
          ${sidebarOpen ? "ml-[280px]" : "ml-0"}
        `}
      >
        {/* Top Bar */}
        <div className="flex items-center justify-between px-6 py-5">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-3xl font-bold p-2 rounded-lg hover:bg-gray-200"
          >
            ☰
          </button>
        </div>

        {/* Header */}
        <div className="text-center mb-16">
          <img src={logo} className="w-28 mx-auto mb-4 rounded-full shadow" />
          <h1 className="text-4xl font-extrabold text-blue-700">
            Cylinder Tracking Dashboard
          </h1>
          <p className="text-gray-600 mt-2 text-lg">
            Optimize Operations • Minimize Losses
          </p>
        </div>

        {/* Admin Info */}
        <section className="max-w-6xl mx-auto px-6">
          <div className="
            bg-white/80 backdrop-blur-xl
            rounded-3xl p-10 shadow-xl
            hover:shadow-2xl transition
          ">
            <h2 className="text-3xl font-extrabold text-blue-700 text-center mb-8">
              Admin Responsibilities
            </h2>

            <ul className="grid md:grid-cols-2 gap-4 text-lg font-semibold text-gray-700">
              {[
                "Manage users and access control",
                "Monitor all customer orders",
                "Assign and track drivers",
                "Maintain cylinder inventory",
                "Track live deliveries and history",
                "Analyze operational reports",
                "Prevent loss and misuse",
                "Ensure system security"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-blue-600 text-xl">✔</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Feature Cards */}
        <section className="max-w-8xl mx-auto py-20 px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <Card img={cy1} title="Efficient Issue Resolution" />
            <Card img={cy2} title="Customer Satisfaction" />
            <Card img={cy3} title="Accurate Compensation" />
            <Card img={cy4} title="System Integration" />
            <Card img={cy5} title="Real-Time Tracking" />
            <Card img={cy6} title="Loss Prevention" />
          </div>
        </section>
      </main>

      {/* ================= POPUPS (UNCHANGED) ================= */}
      <DashboardPopup isOpen={dashboardOpen} onClose={() => setDashboardOpen(false)} />
      {ordersOpen && <AdminOrdersPopup close={() => setOrdersOpen(false)} />}
      {cylinderOpen && <CylinderPopup close={() => setCylinderOpen(false)} />}
      {driverOpen && <DriverPopup close={() => setDriverOpen(false)} />}
      {historyOpen && <CylinderHistoryPopup close={() => setHistoryOpen(false)} />}
      {mapOpen && <CylinderLiveMap close={() => setMapOpen(false)} />}
      {reportOpen && <ReportPopup close={() => setReportOpen(false)} />}

      <RegisterModal isOpen={addUserOpen} onClose={() => setAddUserOpen(false)} />
      <AllUsersPopup isOpen={allUser} onClose={() => setAllUser(false)} />
    </div>
  );
}

/* ================= SIDEBAR BUTTON ================= */

function SideBtn({ children, onClick, danger }) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full px-6 py-4 rounded-xl text-lg font-bold
        transition hover:scale-[1.02]
        ${danger
          ? "bg-red-500 text-white hover:bg-red-600"
          : "bg-blue-50 text-blue-700 hover:bg-blue-100"}
      `}
    >
      {children}
    </button>
  );
}
