import React, { useState } from "react";
import logo from "../assets/logo.gif";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UpdatePass from "./UpdatePass";

export default function LoginModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [login, setLogin] = useState({ email: "", password: "" });
  const [forgotOpen, setForgotOpen] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      let res;

      try {
        res = await axios.post("http://localhost:5000/api/user/login", login);
      } catch {
        res = await axios.post("http://localhost:5000/api/admin/login", {
          username: login.email,
          password: login.password
        });
      }

      localStorage.setItem(
        "loggedUser",
        JSON.stringify(res.data.user || res.data.admin)
      );
      localStorage.setItem("role", res.data.role);

      alert("Welcome!");
      onClose();

      if (res.data.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/user-dashboard");
      }
    } catch {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xl flex items-center justify-center">

      {/* ================= MODAL ================= */}
      <div className="
        relative
        w-full max-w-2xl
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
            className="w-20 h-20 rounded-full mx-auto mb-4 shadow-lg"
          />
          <h2 className="text-2xl font-extrabold tracking-wide">
            Welcome Back
          </h2>
          <p className="text-sm opacity-90 mt-1">
            Login to your Cylinder Tracking account
          </p>
        </div>

        {/* ================= FORM ================= */}
        <div className="px-10 py-10">
          <form onSubmit={handleLogin} className="grid gap-6">

            <Input
              name="email"
              placeholder="Email / Admin Username"
              onChange={handleChange}
            />

            <Input
              name="password"
              type="password"
              placeholder="Password"
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
              Login
            </button>

            <button
              type="button"
              onClick={() => setForgotOpen(true)}
              className="
                text-sm font-semibold text-blue-700
                hover:underline text-center
              "
            >
              Forgot Password?
            </button>
          </form>
        </div>
      </div>

      {/* ================= UPDATE PASSWORD POPUP ================= */}
      <UpdatePass
        isOpen={forgotOpen}
        onClose={() => setForgotOpen(false)}
      />
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
