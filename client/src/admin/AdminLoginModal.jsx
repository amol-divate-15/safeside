import React, { useState } from "react";
import axios from "axios";

export default function AdminLoginModal({ isOpen, onClose, onAdminSuccess }) {
  if (!isOpen) return null;

  const [admin, setAdmin] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
     const res = await axios.post("http://localhost:5000/api/admin/login", admin);

localStorage.setItem("role", res.data.role);

navigate("/admin-dashboard");

    } catch (err) {
      alert("Invalid Admin Credentials");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">

      <div className="bg-white w-[420px] rounded-3xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white text-center py-5 font-bold text-xl">
          Admin Control Panel
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">

          <div className="text-center text-gray-500 text-sm">
            Login to manage cylinders & deliveries
          </div>

          <form onSubmit={handleLogin} className="space-y-4">

            <input
              name="username"
              onChange={handleChange}
              placeholder="Admin Username"
              className="w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-red-400"
            />

            <input
              name="password"
              type="password"
              onChange={handleChange}
              placeholder="Admin Password"
              className="w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-red-400"
            />

            <button className="w-full py-3 bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-xl font-bold hover:scale-[1.02] transition">
              Secure Login
            </button>

          </form>

          <button onClick={onClose} className="w-full text-sm text-gray-500 hover:underline">
            Cancel
          </button>

        </div>
      </div>
    </div>
  );
}
