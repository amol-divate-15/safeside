import axios from "axios";
import { useEffect, useState } from "react";

export default function DriverPopup({ close }) {
  const [driver, setDriver] = useState({
    name: "",
    vehicleNo: "",
    phone: ""
  });

  const [drivers, setDrivers] = useState([]);

  const loadDrivers = async () => {
    const res = await axios.get("http://localhost:5000/api/drivers");
    setDrivers(res.data);
  };

  useEffect(() => {
    loadDrivers();
  }, []);

  const saveDriver = async () => {
    if (!driver.name || !driver.vehicleNo || !driver.phone) {
      alert("Fill all fields");
      return;
    }
    await axios.post("http://localhost:5000/api/drivers/add", driver);
    setDriver({ name: "", vehicleNo: "", phone: "" });
    loadDrivers();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center">

      {/* Modal */}
      <div className="
        w-[95%] max-w-5xl h-[90vh]
        bg-white/90 backdrop-blur-xl
        rounded-3xl shadow-2xl
        flex flex-col overflow-hidden
        animate-fadeIn
      ">

        {/* Header */}
        <div className="
          flex justify-between items-center
          px-8 py-5
          bg-gradient-to-r from-blue-600 to-indigo-600
          text-white
        ">
          <h2 className="text-2xl font-extrabold tracking-wide">
            Driver Management
          </h2>

          <button
            onClick={close}
            className="text-2xl font-bold hover:scale-110 transition"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-auto p-6 space-y-8">

          {/* Add Driver Card */}
          <div className="
            bg-white rounded-2xl shadow-lg
            border border-blue-100
            p-6
          ">
            <h3 className="text-lg font-bold text-blue-700 mb-4">
              Add New Driver
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                value={driver.name}
                onChange={e => setDriver({ ...driver, name: e.target.value })}
                placeholder="Driver Name"
                className="input-modern h-12 px-4"
              />

              <input
                value={driver.vehicleNo}
                onChange={e => setDriver({ ...driver, vehicleNo: e.target.value })}
                placeholder="Vehicle Number"
                className="input-modern h-12 px-4"
              />

              <input
                value={driver.phone}
                onChange={e => setDriver({ ...driver, phone: e.target.value })}
                placeholder="Phone Number"
                className="input-modern h-12 px-4"
              />
            </div>

            <div className="mt-5 text-right">
              <button
                onClick={saveDriver}
                className="
                  bg-blue-600 hover:bg-blue-700
                  text-white font-bold
                  px-10 py-3 rounded-xl
                  transition hover:scale-105
                "
              >
                Add Driver
              </button>
            </div>
          </div>

          {/* Driver Table */}
          <div className="bg-white rounded-2xl shadow-lg border overflow-hidden">
            <table className="w-full text-sm md:text-base">
              <thead className="bg-blue-50 text-blue-700 font-bold">
                <tr className="text-center">
                  <th className="p-4 text-left">Driver Name</th>
                  <th className="p-4">Vehicle No</th>
                  <th className="p-4">Phone</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>

              <tbody>
                {drivers.map(d => (
                  <tr
                    key={d._id}
                    className="border-t hover:bg-blue-50 transition text-center"
                  >
                    <td className="p-4 text-left font-semibold">
                      {d.name}
                    </td>
                    <td className="p-4">{d.vehicleNo}</td>
                    <td className="p-4">{d.phone}</td>
                    <td className="p-4">
                      <button
                        onClick={async () => {
                          if (window.confirm("Delete this driver?")) {
                            await axios.delete(
                              "http://localhost:5000/api/drivers/" + d._id
                            );
                            loadDrivers();
                          }
                        }}
                        className="
                          text-red-600 font-bold
                          hover:underline
                        "
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}

                {drivers.length === 0 && (
                  <tr>
                    <td colSpan="4" className="p-6 text-gray-500 text-center">
                      No drivers added yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

        </div>

        {/* Footer */}
        <div className="p-5 border-t bg-gray-50 text-center">
          <button
            onClick={close}
            className="
              px-10 py-3 rounded-xl
              font-bold text-white
              bg-gradient-to-r from-gray-700 to-gray-900
              hover:scale-105 transition
            "
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
