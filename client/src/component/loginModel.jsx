import React from "react";
import logo from "../assets/logo.gif";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginModal({ isOpen, onClose, onLoginSuccess }) {
  if (!isOpen) return null;

  const [login, setLogin] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/user/login", data);

localStorage.setItem("loggedUser", JSON.stringify(res.data.user));
localStorage.setItem("role", res.data.role);

navigate("/user-dashboard");

      onClose(); 
      navigate("/dashboard", { state: { userName: res.data.user.name } });
      alert("Welcome " + res.data.user.name);
    } catch (err) {
      alert(err.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur flex items-center justify-center z-50">

      <div className="bg-white w-[420px] rounded-3xl shadow-2xl overflow-hidden relative">

        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white py-4 text-center font-bold text-xl">
          Welcome Back 👋
        </div>

        {/* Close */}
        <button onClick={onClose} className="absolute top-3 right-4 text-white text-xl">✕</button>

        <div className="p-6">

          <div className="flex flex-col items-center mb-6">
            <img src={logo} className="w-20 h-20 rounded-full shadow mb-2"/>
            <h2 className="text-blue-700 font-bold">Cylinder Tracking</h2>
            <p className="text-gray-400 text-sm">Login to your account</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">

            <input
              onChange={handleChange}
              name="email"
              placeholder="Email"
              className="input-modern"
            />

            <input
              onChange={handleChange}
              name="password"
              placeholder="Password"
              type="password"
              className="input-modern"
            />

            <button type="submit"
              className="w-full py-3 bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-xl font-semibold hover:scale-[1.03] transition">
              Login
            </button>
          </form>

          <button
            onClick={() => navigate("/update-password")}
            className="text-sm text-center w-full mt-4 text-blue-600 hover:underline"
          >
            Forgot Password?
          </button>
        </div>
      </div>
    </div>
  );
}
