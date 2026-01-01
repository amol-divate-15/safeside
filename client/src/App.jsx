import React from 'react'
import Home from './component/Home'
import { Routes, Route } from "react-router-dom";
import Dashboard from "./component/Dashboard";
import UpdatePassword from "./component/UpdatePass";
import AdminHome from './admin/AdminHome';
import AboutSystem from "./component/AboutSyatem";





export default function App() {
  return (
    <div>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/update-password" element={<UpdatePassword />} />
      <Route path="/admin" element={<AdminHome />} />
      <Route path="/about-system" element={<AboutSystem/>}/>
      
      
    </Routes>
   
    </div>
  )
}
