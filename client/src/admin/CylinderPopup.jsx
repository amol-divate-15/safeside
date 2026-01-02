import axios from "axios";
import { useEffect, useState } from "react";

export default function CylinderPopup({ close }) {

  const [form, setForm] = useState({
    cylinderId:"", qrCode:"", gasType:"", category:"", capacity:"",
    status:"", currentLocation:"", owner:""
  });

  const [list, setList] = useState([]);

  useEffect(() => { load(); }, []);
  const load = async()=> {
    const res = await axios.get("http://localhost:5000/api/cylinders");
    setList(res.data);
  }

  const save = async () => {
    if(!form.category){ alert("Select category"); return; }
    await axios.post("http://localhost:5000/api/cylinders/add", form);
    load();
  }

  const del = async (id)=>{
    await axios.delete("http://localhost:5000/api/cylinders/"+id);
    load();
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50">

      <div className="bg-white w-[1100px] h-[90vh] rounded-3xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="relative text-gray-800  py-4 text-center text-xl font-bold">
          Cylinder Management

          {/* ❌ Close Button */}
          <button
            onClick={close}
            className="absolute right-5 top-3 text-2xl hover:scale-110 transition"
          >
            ✖
          </button>
        </div>

        {/* Form */}
        <div className="p-6 grid grid-cols-4 gap-4">
          <select
            onChange={e=>setForm({...form, category:e.target.value})}
            className="col-span-4 p-3 border rounded-xl"
          >
            <option value="">Select Category</option>
            <option value="Domestic">Domestic</option>
            <option value="Commercial">Commercial</option>
            <option value="Medical">Medical</option>
            <option value="Industrial">Industrial</option>
          </select>

          {Object.keys(form).map(key=>(
            <input
              key={key}
              placeholder={key}
              className="p-3 border rounded-xl"
              onChange={e=>setForm({...form,[key]:e.target.value})}
            />
          ))}
        </div>

        <div className="px-6">
          <button onClick={save}
            className="bg-gradient-to-r from-blue-600 to-white-500 text-gray px-10 py-3 rounded-xl hover:scale-[1.03] transition">
            Add Cylinder
          </button>
        </div>

        {/* Table */}
        <div className="p-6 overflow-auto h-[55vh]">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-red-50 text-red-700">
              <tr>
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
              {list.map(c=>(
                <tr key={c._id} className="border-b hover:bg-red-50 transition">
                  <td className="p-3">{c.cylinderId}</td>
                  <td className="p-3">{c.qrCode}</td>
                  <td className="p-3">{c.gasType}</td>
                  <td className="p-3 font-bold text-red-600">{c.category}</td>
                  <td className="p-3">{c.capacity}</td>
                  <td className="p-3">{c.status}</td>
                  <td className="p-3">{c.currentLocation}</td>
                  <td className="p-3">{c.owner}</td>
                  <td className="p-3">
                    <button onClick={()=>del(c._id)} className="text-red-600 hover:underline">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-4 text-center border-t">
          <button onClick={close}
            className="bg-red-600 hover:bg-red-700 text-white px-10 py-2 rounded-xl">
            Close
          </button>
        </div>

      </div>
    </div>
  )
}
