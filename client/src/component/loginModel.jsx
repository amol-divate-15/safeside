import React, { useState } from "react";
import logo from "../assets/logo.gif";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function LoginModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [login, setLogin] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      let res;

      // 1️⃣ Try USER login first
      try {
        res = await axios.post(
          "http://localhost:5000/api/user/login",
          login
        );
      } catch {
        // 2️⃣ If user login fails, try ADMIN login
        res = await axios.post(
          "http://localhost:5000/api/admin/login",
          {
            username: login.email,
            password: login.password
          }
        );
      }

      // 3️⃣ Save login info
      localStorage.setItem(
        "loggedUser",
        JSON.stringify(res.data.user || res.data.admin)
      );
      localStorage.setItem("role", res.data.role);

      alert("Welcome!");

      onClose();

      // 4️⃣ Role-based redirect
      if (res.data.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/user-dashboard");
      }

    } catch (err) {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur flex items-center justify-center z-50">
      <div className="bg-white w-[420px] rounded-3xl shadow-2xl overflow-hidden">

        <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white py-4 text-center text-xl font-bold">
          Welcome Back 👋
        </div>

        <div className="p-6">
          <div className="flex flex-col items-center mb-6">
            <img src={logo} className="w-20 h-20 rounded-full mb-2" />
            <p className="text-gray-400 text-sm">Login to your account</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              name="email"
              placeholder="Email / Admin Username"
              onChange={handleChange}
              className="input-modern"
              required
            />

            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              className="input-modern"
              required
            />

            <button className="w-full py-3 bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-xl">
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
