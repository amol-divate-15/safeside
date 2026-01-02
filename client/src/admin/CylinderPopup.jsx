import axios from "axios";
import { useEffect, useState } from "react";

export default function CylinderPopup({ close }) {

  const [form, setForm] = useState({
    cylinderId: "",
    qrCode: "",
    gasType: "",
    category: "",
    capacity: "",
    status: "",
    currentLocation: "",
    owner: ""
  });

  const [list, setList] = useState([]);

  useEffect(() => { load(); }, []);
  const load = async () => {
    const res = await axios.get("http://localhost:5000/api/cylinders");
    setList(res.data);
  };

  const save = async () => {
    if (!form.category) {
      alert("Select category");
      return;
    }
    await axios.post("http://localhost:5000/api/cylinders/add", form);
    load();
  };

  const del = async (id) => {
    await axios.delete("http://localhost:5000/api/cylinders/" + id);
    load();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center">

      {/* Modal */}
      <div className="
        w-[95%] max-w-7xl h-[90vh]
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
            Cylinder Management
          </h2>

          <button
            onClick={close}
            className="text-2xl font-bold hover:scale-110 transition"
          >
            ✕
          </button>
        </div>

        {/* Form Section */}
        <div className="p-6 border-b bg-white/70">
          <h3 className="text-lg font-bold text-gray-700 mb-4">
            Add New Cylinder
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

            <select
              value={form.category}
              onChange={e => setForm({ ...form, category: e.target.value })}
              className="md:col-span-4 p-3 border rounded-xl focus:outline-blue-400"
            >
              <option value="">Select Category</option>
              <option value="Domestic">Domestic</option>
              <option value="Commercial">Commercial</option>
              <option value="Medical">Medical</option>
              <option value="Industrial">Industrial</option>
            </select>

            {Object.keys(form).map(key => (
              key !== "category" && (
                <input
                  key={key}
                  placeholder={key.replace(/([A-Z])/g, " $1")}
                  className="p-3 border rounded-xl focus:outline-blue-400"
                  onChange={e => setForm({ ...form, [key]: e.target.value })}
                />
              )
            ))}
          </div>

          <div className="mt-5">
            <button
              onClick={save}
              className="
                px-10 py-3 rounded-xl
                font-bold text-white
                bg-gradient-to-r from-blue-600 to-indigo-600
                hover:scale-105 transition
              "
            >
              Add Cylinder
            </button>
          </div>
        </div>

        {/* Table Section */}
        <div className="flex-1 overflow-auto p-6">

          <table className="w-full text-sm md:text-base border-collapse">
            <thead className="sticky top-0 bg-blue-50 z-10">
              <tr className="text-blue-700 font-bold">
                <th className="p-3 text-left">ID</th>
                <th className="p-3">QR</th>
                <th className="p-3">Gas</th>
                <th className="p-3">Category</th>
                <th className="p-3">Capacity</th>
                <th className="p-3">Status</th>
                <th className="p-3">Location</th>
                <th className="p-3">Owner</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {list.map(c => (
                <tr
                  key={c._id}
                  className="border-b hover:bg-blue-50 transition"
                >
                  <td className="p-3 font-semibold">{c.cylinderId}</td>
                  <td className="p-3">{c.qrCode}</td>
                  <td className="p-3">{c.gasType}</td>
                  <td className="p-3 font-bold text-blue-600">
                    {c.category}
                  </td>
                  <td className="p-3">{c.capacity}</td>
                  <td className="p-3">{c.status}</td>
                  <td className="p-3">{c.currentLocation}</td>
                  <td className="p-3">{c.owner}</td>
                  <td className="p-3">
                    <button
                      onClick={() => del(c._id)}
                      className="text-red-600 font-bold hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

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
