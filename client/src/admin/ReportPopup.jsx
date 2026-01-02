import axios from "axios";
import { useEffect, useState } from "react";

export default function ReportPopup({ close }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/reports")
      .then(res => setData(res.data));
  }, []);

  if (!data) {
    return (
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[999]">
        <div className="bg-white px-10 py-6 rounded-2xl shadow-xl text-lg font-bold">
          Loading Reports…
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[999]">

      <div className="bg-white/95 backdrop-blur-xl w-[95%] max-w-7xl h-[90vh]
                      rounded-3xl shadow-2xl overflow-hidden flex flex-col">

        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600
                        text-white px-6 py-5 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Admin Performance Reports</h2>
            <p className="text-sm text-white/80">
              Operational analytics & delivery insights
            </p>
          </div>

          <button
            onClick={close}
            className="text-3xl font-bold hover:scale-110 transition"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-auto p-6 space-y-10">

          {/* KPI Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <KPI title="Total Cylinders" value={data.totalCylinders} color="blue" />
            <KPI title="Delivered Today" value={data.deliveredToday} color="green" />
            <KPI title="Pending Deliveries" value={data.pending} color="yellow" />
            <KPI title="Damaged Cylinders" value={data.damaged} color="red" />
          </div>

          {/* Cylinder Type Delivered */}
          <Section title="Cylinder Type Delivered">
            {(data.cylinderTypeStats || []).length ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {data.cylinderTypeStats.map((c, i) => (
                  <StatRow
                    key={i}
                    label={c._id || "Unknown"}
                    value={`${c.total} Cylinders`}
                    color="indigo"
                  />
                ))}
              </div>
            ) : (
              <Empty />
            )}
          </Section>

          {/* Customer Usage */}
          <Section title="Customer Wise Usage">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(data.customerUsage || []).map((c, i) => (
                <StatRow
                  key={i}
                  label={c._id || "Unknown"}
                  value={c.total}
                  color="blue"
                />
              ))}
            </div>
          </Section>

          {/* Driver Performance */}
          <Section title="Driver Performance">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(data.driverPerformance || []).map((d, i) => (
                <StatRow
                  key={i}
                  label={d._id || "Unknown"}
                  value={`${d.deliveries} Deliveries`}
                  color="green"
                />
              ))}
            </div>
          </Section>

          {/* Driver Order Deliveries */}
          <Section title="Driver Order Deliveries">
            {(data.driverOrders || []).length ? (
              <div className="space-y-4">
                {data.driverOrders.map((d, i) => (
                  <div key={i} className="bg-white shadow rounded-2xl p-4">
                    <div className="font-bold text-blue-700">
                      Driver: {d.driverName || "Unknown"}
                    </div>

                    <div className="text-sm text-gray-600 mb-2">
                      Orders Delivered: {d.orders?.length || 0}
                    </div>

                    <div className="text-sm text-gray-500 space-y-1">
                      {d.orders?.map((o, idx) => (
                        <div key={idx}>
                          • Order #{o.orderId} → {o.customerName}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <Empty />
            )}
          </Section>

        </div>

        {/* Footer */}
        <div className="border-t p-4 text-center bg-white">
          <button
            onClick={close}
            className="bg-red-600 hover:bg-red-700 text-white
                       px-10 py-2 rounded-xl font-semibold transition"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}

/* ---------- Reusable UI Components ---------- */

function KPI({ title, value, color }) {
  const map = {
    blue: "bg-blue-100 text-blue-700",
    green: "bg-green-100 text-green-700",
    yellow: "bg-yellow-100 text-yellow-700",
    red: "bg-red-100 text-red-700"
  };

  return (
    <div className={`rounded-2xl p-5 text-center font-bold shadow ${map[color]}`}>
      <div className="text-sm">{title}</div>
      <div className="text-3xl mt-2">{value}</div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div>
      <h3 className="text-xl font-bold text-gray-800 mb-4">{title}</h3>
      {children}
    </div>
  );
}

function StatRow({ label, value, color }) {
  const map = {
    blue: "text-blue-700",
    green: "text-green-700",
    indigo: "text-indigo-700"
  };

  return (
    <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl shadow">
      <span className="font-semibold text-gray-700">{label}</span>
      <span className={`font-bold ${map[color]}`}>{value}</span>
    </div>
  );
}

function Empty() {
  return (
    <div className="text-gray-500 italic">No data available</div>
  );
}
