import axios from "axios";
import { useEffect, useState } from "react";

export default function ReportPopup({ close }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/reports")
      .then(res => setData(res.data));
  }, []);

  if (!data) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[999]">
      <div className="bg-white w-[95%] max-w-6xl h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col">

        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white p-5 flex justify-between items-center">
          <h2 className="text-xl font-bold">Admin Performance Reports</h2>
          <button onClick={close} className="text-2xl font-bold hover:scale-110">✕</button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-auto p-6 space-y-8">

          {/* KPI Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="stat-card">Total Cylinders<br /><b>{data.totalCylinders}</b></div>
            <div className="stat-card">Delivered Today<br /><b>{data.deliveredToday}</b></div>
            <div className="stat-card">Pending Deliveries<br /><b>{data.pending}</b></div>
            <div className="stat-card">Damaged Cylinders<br /><b>{data.damaged}</b></div>
          </div>

          {/* Customer Usage */}
          <div>
            <h3 className="section-title">Customer Wise Usage</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {data.customerUsage.map((c, i) => (
                <div key={i} className="report-row">
                  {c._id || "Unknown"} <span className="font-bold text-blue-700">{c.total}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Driver Performance */}
          <div>
            <h3 className="section-title">Driver Performance</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {data.driverPerformance.map((d, i) => (
                <div key={i} className="report-row">
                  {d._id || "Unknown"} <span className="font-bold text-green-700">{d.deliveries} Deliveries</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
