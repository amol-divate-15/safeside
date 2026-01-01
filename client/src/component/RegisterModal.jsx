import React from "react";
import logo from "../assets/logo.gif";
import { useState } from "react";
import axios from "axios";

export default function RegisterModal({ isOpen, onClose, openLogin }) {
  if (!isOpen) return null;

  const [form, setForm] = useState({
    name:"",
    email:"",
    password:"",
    address:""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) =>{
    e.preventDefault();
    try {
      const res=await axios.post("http://localhost:5000/api/user/register",form);
      alert("Registered Successfully");
      localStorage.setItem("loggedUser", JSON.stringify(res.data.user));
      onClose();
      openLogin();
    } catch (error) {
      alert(error.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur flex items-center justify-center z-50">

      <div className="bg-white w-[420px] rounded-3xl shadow-2xl overflow-hidden animate-fadeIn relative">

        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white py-4 text-center font-bold text-xl">
          Create Account
        </div>

        {/* Close */}
        <button onClick={onClose} className="absolute top-3 right-4 text-white text-xl">✕</button>

        <div className="p-6">

          <div className="flex flex-col items-center mb-6">
            <img src={logo} className="w-20 h-20 rounded-full shadow mb-2"/>
            <h2 className="text-blue-700 font-bold">Cylinder Tracking</h2>
            <p className="text-gray-400 text-sm">Register new user</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">

            <input name="name" onChange={handleChange} placeholder="Full Name"
              className="input-modern"/>

            <input name="email" onChange={handleChange} placeholder="Email"
              className="input-modern"/>

            <input name="password" onChange={handleChange} placeholder="Password"
              className="input-modern" type="password"/>

            <input name="address" onChange={handleChange} placeholder="Address"
              className="input-modern"/>

            <button type="submit"
              className="w-full py-3 bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-xl font-semibold hover:scale-[1.03] transition">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
