import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminOrdersPopup({ close }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/booking/admin-orders")
      .then(res => setOrders(res.data));
  }, []);

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-[95%] h-[85vh] rounded-3xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="bg-white text-gray text-xl font-bold p-4 text-center">
          All Bookings
        </div>

        {/* Table */}
        <div className="p-6 overflow-auto h-[70vh]">
          <table className="w-full text-sm border-separate border-spacing-y-2">

            <thead className="sticky top-0 bg-red-50 text-red-700">
              <tr>
                <th>Customer ID</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Address</th>
                <th>Price</th>
                <th>Type</th>
                <th>Date</th>
                <th>Driver</th>
                <th>Status</th>
                <th>Delete</th>
                <th>Delivered</th>
              </tr>
            </thead>

            <tbody>
              {orders.map(o => (
                <tr key={o._id} className="bg-white shadow rounded-xl text-center hover:shadow-lg transition">
                  <td className="p-2">{o.customerId}</td>
                  <td>{o.name}</td>
                  <td>{o.phone}</td>
                  <td>{o.email}</td>
                  <td>{o.address}</td>
                  <td className="font-semibold text-green-700">₹{o.price}</td>
                  <td className="font-bold text-blue-600">{o.type}</td>
                  <td>{new Date(o.createdAt).toLocaleDateString()}</td>
                  <td>{o.delivery?.driverName || "Not Assigned"}</td>
                  <td>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold 
                      ${o.delivery?.status === "Delivered" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                      {o.delivery?.status || "Pending"}
                    </span>
                  </td>

                  <td>
                    <button
                      onClick={async()=>{
                        if(window.confirm("Delete this booking?")){
                          await axios.delete("http://localhost:5000/api/booking/delete/"+o._id);
                          window.location.reload();
                        }
                      }}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>

                  <td>
                    {o.delivery && o.delivery.status !== "Delivered" ? (
                      <button
                        onClick={async()=>{
                          await axios.put("http://localhost:5000/api/drivers/deliver/"+o.delivery._id,{ proof:"Delivered" });
                          window.location.reload();
                        }}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-full"
                      >
                        Mark
                      </button>
                    ) : (
                      <span className="text-green-600 font-bold">✓</span>
                    )}
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
