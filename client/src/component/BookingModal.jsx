import { useState } from "react";
import axios from "axios";

export default function BookingModal({ close }) {
  const user = JSON.parse(localStorage.getItem("loggedUser"));

  const [data, setData] = useState({
    type: "",
    customerId: user._id,
    name: user.name,
    address: user.address,
    phone: user.phone,
    email: user.email,
    price: 1000
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleBook = async () => {
    if (!data.type) {
      alert("Please select gas type");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/booking/create", data);
      alert("Booking Successful");
      close();
    } catch (err) {
      alert(err.response?.data?.message || "Booking Failed");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center">

      {/* ================= MODAL ================= */}
      <div
        className="
          w-[95%] max-w-3xl
          bg-white/90 backdrop-blur-xl
          rounded-3xl shadow-2xl
          flex flex-col overflow-hidden
          animate-fadeIn
        "
      >
        {/* Header */}
        <div
          className="
            flex justify-between items-center
            px-8 py-5
            bg-gradient-to-r from-blue-600 to-indigo-600
            text-white
          "
        >
          <h2 className="text-2xl font-extrabold tracking-wide">
            Make Your Booking
          </h2>

          <button
            onClick={close}
            className="text-2xl font-bold hover:scale-110 transition"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-8 space-y-6">

          <select
            name="type"
            onChange={handleChange}
            className="input-modern h-14 text-lg px-5"
          >
            <option value="">Select Gas Type</option>
            <option value="LPG">LPG (Domestic)</option>
            <option value="Oxygen">Oxygen (Medical)</option>
            <option value="CNG">CNG (Commercial)</option>
            <option value="Nitrogen">Nitrogen (Industrial)</option>
          </select>

          <input
            name="customerId"
            value={data.customerId}
            onChange={handleChange}
            className="input-modern h-14 text-lg px-5 bg-gray-100"
          />

          <input
            name="name"
            value={data.name}
            // onChange={handleChange}
            placeholder="Name"
            className="input-modern h-14 text-lg px-5"
          />

          <input
            name="address"
            value={data.address}
            // onChange={handleChange}
            placeholder="Address"
            className="input-modern h-14 text-lg px-5"
          />

          <input
            name="phone"
            value={data.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="input-modern h-14 text-lg px-5"
          />

          <input
            name="price"
            value={data.price}
            readOnly
            className="input-modern h-14 text-lg px-5 bg-gray-100"
          />
        </div>

        {/* Footer */}
        <div className="px-8 py-6 border-t bg-gray-50 flex gap-6">
          <button
            onClick={handleBook}
            className="
              flex-1 py-4
              rounded-xl font-bold text-lg
              text-white
              bg-gradient-to-r from-blue-600 to-indigo-600
              hover:scale-105 transition
            "
          >
            Book Cylinder
          </button>

          <button
            onClick={close}
            className="
              flex-1 py-4
              rounded-xl font-bold text-lg
              bg-gray-300 text-gray-800
              hover:bg-gray-400 transition
            "
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
