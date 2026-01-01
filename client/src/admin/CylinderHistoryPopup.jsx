import axios from "axios";
import { useEffect, useState } from "react";

export default function CylinderHistoryPopup({ close }) {
  const [list, setList] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/history").then(r => setList(r.data));
  }, []);

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-[95%] max-w-6xl h-[90vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white p-5 flex justify-between items-center">
          <h2 className="text-xl font-bold">Cylinder Movement History</h2>
          <button onClick={close} className="text-2xl font-bold hover:scale-110">✕</button>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto p-5">
          <table className="w-full border-collapse text-sm">
            <thead className="bg-red-50 text-red-600 sticky top-0">
              <tr>
                <th className="p-3 text-left">Cylinder</th>
                <th className="p-3 text-left">From</th>
                <th className="p-3 text-left">To</th>
                <th className="p-3 text-left">Driver</th>
                <th className="p-3 text-left">Action</th>
                <th className="p-3 text-left">Date</th>
              </tr>
            </thead>

            <tbody>
              {list.map(h => (
                <tr key={h._id} className="border-b hover:bg-red-50 transition">
                  <td className="p-3 font-semibold">{h.cylinderId}</td>
                  <td className="p-3">{h.fromOwner}</td>
                  <td className="p-3">{h.toOwner}</td>
                  <td className="p-3">{h.driverName}</td>
                  <td className="p-3 text-blue-600 font-semibold">{h.action}</td>
                  <td className="p-3 text-gray-600">{new Date(h.date).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
