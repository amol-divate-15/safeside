import { Routes, Route } from "react-router-dom";
import Home from "./component/Home";
import AdminHome from "./admin/AdminHome";
import Dashboard from "./component/Dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin-dashboard" element={<AdminHome />} />
      <Route path="/user-dashboard" element={<Dashboard />} /> 
    </Routes>
  );
}

export default App;
