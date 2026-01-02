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
      onClose();
    } catch (err) {
      alert(err.response?.data?.message || "Update Failed");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xl flex items-center justify-center">

      {/* ================= MODAL ================= */}
      <div className="
        relative
        w-full max-w-lg
        bg-white/80 backdrop-blur-2xl
        border border-gray-200/40
        rounded-3xl
        shadow-[0_30px_120px_rgba(0,0,0,0.35)]
        animate-fadeIn
        overflow-hidden
      ">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="
            absolute top-4 right-5
            text-2xl font-bold text-gray-600
            hover:text-gray-900 hover:scale-110
            transition
          "
        >
          ✕
        </button>

        {/* ================= HEADER ================= */}
        <div className="
          py-8 text-center
          bg-gradient-to-r from-blue-600 to-indigo-700
          text-white
        ">
          <img
            src={logo}
            alt="logo"
            className="w-20 h-20 rounded-full mx-auto mb-4 shadow-lg"
          />
          <h2 className="text-2xl font-extrabold tracking-wide">
            Reset Your Password
          </h2>
          <p className="text-sm opacity-90 mt-1">
            Secure your account with a new password
          </p>
        </div>

        {/* ================= FORM ================= */}
        <div className="px-10 py-10">
          <form onSubmit={handleUpdate} className="grid gap-6">

            <Input
              name="email"
              placeholder="Registered Email Address"
              onChange={handleChange}
            />

            <Input
              name="newPassword"
              type="password"
              placeholder="New Password"
              onChange={handleChange}
            />

            <button
              type="submit"
              className="
                mt-4
                w-full py-4
                text-lg font-extrabold
                rounded-2xl
                bg-gradient-to-r from-blue-600 to-indigo-700
                text-white
                shadow-lg
                transition-all duration-300
                hover:scale-[1.02]
                hover:shadow-2xl
              "
            >
              Update Password
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            Remembered your password?{" "}
            <span
              onClick={onClose}
              className="text-blue-700 font-bold cursor-pointer hover:underline"
            >
              Go back to login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

/* ================= INPUT COMPONENT ================= */

function Input({ name, placeholder, type = "text", onChange }) {
  return (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      required
      className="
        w-full h-14 px-5
        rounded-xl
        text-lg font-semibold
        bg-white/90
        border border-gray-300
        outline-none
        transition
        focus:border-blue-500
        focus:ring-4 focus:ring-blue-200
      "
    />
  );
}
