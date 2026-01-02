import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminOrdersPopup({ close }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/booking/admin-orders")
      .then(res => setOrders(res.data));
  }, []);

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
          bg-gradient-to-r from-red-600 to-orange-500
          text-white
        ">
          <h2 className="text-2xl font-extrabold tracking-wide">
            All Customer Bookings
          </h2>

          <button
            onClick={close}
            className="text-2xl font-bold hover:scale-110 transition"
          >
            ✕
          </button>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto p-6">

          <table className="w-full text-sm md:text-base border-collapse">
            <thead className="sticky top-0 bg-red-50 z-10">
              <tr className="text-red-700 font-bold text-center">
                <th className="p-3 text-left">Customer ID</th>
                <th className="p-3">Name</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Email</th>
                <th className="p-3">Address</th>
                <th className="p-3">Price</th>
                <th className="p-3">Type</th>
                <th className="p-3">Date</th>
                <th className="p-3">Driver</th>
                <th className="p-3">Status</th>
                <th className="p-3">Delete</th>
                <th className="p-3">Delivered</th>
              </tr>
            </thead>

            <tbody>
              {orders.map(o => (
                <tr
                  key={o._id}
                  className="
                    border-b
                    hover:bg-red-50
                    transition
                    text-center
                  "
                >
                  <td className="p-3 text-left font-semibold">{o.customerId}</td>
                  <td className="p-3">{o.name}</td>
                  <td className="p-3">{o.phone}</td>
                  <td className="p-3">{o.email}</td>
                  <td className="p-3">{o.address}</td>

                  <td className="p-3 font-bold text-green-700">
                    ₹{o.price}
                  </td>

                  <td className="p-3 font-bold text-blue-600">
                    {o.type}
                  </td>

                  <td className="p-3">
                    {new Date(o.createdAt).toLocaleDateString()}
                  </td>

                  <td className="p-3">
                    {o.delivery?.driverName || (
                      <span className="text-gray-400">Not Assigned</span>
                    )}
                  </td>

                  <td className="p-3">
                    <span
                      className={`
                        px-4 py-1 rounded-full text-xs font-bold
                        ${o.delivery?.status === "Delivered"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"}
                      `}
                    >
                      {o.delivery?.status || "Pending"}
                    </span>
                  </td>

                  <td className="p-3">
                    <button
                      onClick={async () => {
                        if (window.confirm("Delete this booking?")) {
                          await axios.delete(
                            "http://localhost:5000/api/booking/delete/" + o._id
                          );
                          window.location.reload();
                        }
                      }}
                      className="text-red-600 font-bold hover:underline"
                    >
                      Delete
                    </button>
                  </td>

                  <td className="p-3">
                    {o.delivery && o.delivery.status !== "Delivered" ? (
                      <button
                        onClick={async () => {
                          await axios.put(
                            "http://localhost:5000/api/drivers/deliver/" +
                              o.delivery._id,
                            { proof: "Delivered" }
                          );
                          window.location.reload();
                        }}
                        className="
                          bg-green-600 hover:bg-green-700
                          text-white px-4 py-1 rounded-full
                          font-semibold
                        "
                      >
                        Mark
                      </button>
                    ) : (
                      <span className="text-green-600 font-bold text-xl">✓</span>
                    )}
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
