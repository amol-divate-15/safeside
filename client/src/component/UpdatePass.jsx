import { useState } from "react";
import axios from "axios";
import logo from "../assets/logo.gif";

export default function UpdatePass({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [data, setData] = useState({ email: "", newPassword: "" });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put("http://localhost:5000/api/user/update-password", data);
      alert("Password Updated Successfully");
      onClose(); // close popup after success
    } catch (err) {
      alert(err.response?.data?.message || "Update Failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur flex items-center justify-center z-50">
      <div className="relative bg-white w-[600px] rounded-3xl shadow-2xl p-8">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-2xl font-bold text-gray-600 hover:opacity-80"
        >
          ✕
        </button>

        <h2 className="text-2xl text-blue-600 font-bold text-center mb-6">
          Update Password
        </h2>

        <div className="flex flex-col items-center gap-4 mb-6">
          <img src={logo} alt="logo" className="w-28 h-28 rounded-full" />
          <h1 className="text-blue-500 text-xl font-bold">
            Cylinder Tracking
          </h1>
        </div>

        <form onSubmit={handleUpdate} className="flex flex-col items-center gap-4">
          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="input-modern w-full h-12 px-4"
            required
          />

          <input
            name="newPassword"
            type="password"
            placeholder="New Password"
            onChange={handleChange}
            className="input-modern w-full h-12 px-4"
            required
          />

          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-10 py-3 rounded-xl"
          >
            Update Password
          </button>
        </form>

      </div>
    </div>
  );
}
