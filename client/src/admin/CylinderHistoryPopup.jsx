import axios from "axios";
import { useEffect, useState } from "react";

export default function CylinderHistoryPopup({ close }) {
  const [list, setList] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/history")
      .then(r => setList(r.data));
  }, []);

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">

      <div className="bg-white/90 backdrop-blur-xl w-[95%] max-w-7xl h-[90vh]
                      rounded-3xl shadow-2xl flex flex-col overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600
                        text-white px-6 py-5 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Cylinder Movement History</h2>
            <p className="text-sm text-white/80">
              Complete traceability of cylinder lifecycle
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
        <div className="flex-1 overflow-auto p-6">

          {list.length === 0 ? (
            <div className="h-full flex items-center justify-center text-gray-500 text-lg">
              No movement history available
            </div>
          ) : (
            <table className="w-full border-separate border-spacing-y-3 text-sm">

              <thead className="sticky top-0 bg-blue-50 text-blue-700">
                <tr>
                  <th className="p-3 text-left rounded-l-xl">Cylinder</th>
                  <th className="p-3 text-left">From</th>
                  <th className="p-3 text-left">To</th>
                  <th className="p-3 text-left">Driver</th>
                  <th className="p-3 text-left">Action</th>
                  <th className="p-3 text-left rounded-r-xl">Date</th>
                </tr>
              </thead>

              <tbody>
                {list.map(h => (
                  <tr
                    key={h._id}
                    className="bg-white shadow-md rounded-xl
                               hover:shadow-xl transition"
                  >
                    <td className="p-4 font-semibold text-blue-700">
                      {h.cylinderId}
                    </td>

                    <td className="p-4 text-gray-700">
                      {h.fromOwner || "—"}
                    </td>

                    <td className="p-4 text-gray-700">
                      {h.toOwner || "—"}
                    </td>

                    <td className="p-4 font-medium text-indigo-700">
                      {h.driverName || "N/A"}
                    </td>

                    <td className="p-4">
                      <span className="px-3 py-1 rounded-full text-xs font-bold
                                       bg-blue-100 text-blue-700">
                        {h.action}
                      </span>
                    </td>

                    <td className="p-4 text-gray-500 text-xs">
                      {new Date(h.date).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          )}

        </div>

        {/* Footer */}
        <div className="border-t p-4 text-center bg-white">
          <button
            onClick={close}
            className="bg-red-600 hover:bg-red-700
                       text-white px-10 py-2 rounded-xl
                       font-semibold transition"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
