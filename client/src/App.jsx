import { Routes, Route } from "react-router-dom";
import Home from "./component/Home";
import AdminHome from "./admin/AdminHome";
import Dashboard from "./component/Dashboard";
import AboutSystem from "./component/AboutSyatem";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin-dashboard" element={<AdminHome />} />
      <Route path="/user-dashboard" element={<Dashboard />} /> 
      <Route path="/about-system" element={<AboutSystem />} />
    </Routes>
  );
}

export default App;
