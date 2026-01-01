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
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-[900px] h-[90vh] rounded-3xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white text-xl font-bold p-4 text-center">
          Driver Management
        </div>

        <div className="p-6 overflow-auto h-[70vh]">

          {/* Add Driver */}
          <div className="bg-red-50 p-4 rounded-xl mb-6 grid grid-cols-3 gap-4">
            <input value={driver.name} onChange={e=>setDriver({...driver,name:e.target.value})} placeholder="Driver Name" className="modal-input"/>
            <input value={driver.vehicleNo} onChange={e=>setDriver({...driver,vehicleNo:e.target.value})} placeholder="Vehicle Number" className="modal-input"/>
            <input value={driver.phone} onChange={e=>setDriver({...driver,phone:e.target.value})} placeholder="Phone Number" className="modal-input"/>

            <button onClick={saveDriver} className="col-span-3 bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl font-semibold">
              Add Driver
            </button>
          </div>

          {/* Driver Table */}
          <table className="w-full text-sm border-separate border-spacing-y-2">

            <thead className="sticky top-0 bg-red-100 text-red-700">
              <tr>
                <th>Name</th>
                <th>Vehicle No</th>
                <th>Phone</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {drivers.map(d => (
                <tr key={d._id} className="bg-white shadow rounded-xl text-center hover:shadow-lg transition">
                  <td className="p-2 font-semibold">{d.name}</td>
                  <td>{d.vehicleNo}</td>
                  <td>{d.phone}</td>
                  <td>
                    <button
                      onClick={async()=>{
                        if(window.confirm("Delete this driver?")){
                          await axios.delete("http://localhost:5000/api/drivers/"+d._id);
                          loadDrivers();
                        }
                      }}
                      className="text-red-600 hover:underline"
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
        <div className="p-4 text-center border-t">
          <button onClick={close} className="bg-red-600 hover:bg-red-700 text-white px-10 py-2 rounded-xl">
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
