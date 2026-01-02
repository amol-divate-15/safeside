import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.gif";


export default function UpdatePass(isOpen, onClose) {
  if (!isOpen) return null;

  const [data, setData] = useState({ email: "", newPassword: "" });
    const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put("http://localhost:5000/api/user/update-password", data);
      alert("Password Updated Successfully");
      navigate("/?openLogin=true");

    } catch (err) {
      alert(err.response?.data?.message || "Update Failed");
    }
  };
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-blue-100">
      <div className="bg-white w-[1000px] h-[900px] rounded-2xl shadow-2xl p-6 relative">

        <h2 className="text-2xl text-blue-600 font-bold text-center mb-4">
          Update Password
        </h2>
        <div className="flex-1 flex flex-col items-center justify-start text-white text-2xl gap-6 pt-16">
                  <img src={logo} alt="logo" className="w-40 h-40 rounded-full" />
                  <h1 className="text-blue-500 text-3xl font-bold">
                    Cylinder Tracking
                  </h1>
                </div>

          <form onSubmit={handleUpdate} className="flex flex-col gap-3">
          <input name="email" placeholder="Email" onChange={handleChange} 
          className="border p-2 rounded-full w-[400px] outline-blue-400 mt-9 ml-70"/>
          <input name="newPassword" placeholder="New Password" onChange={handleChange} 
          className="border p-2 rounded-full w-[400px] outline-blue-400 mt-9 ml-70"/>
          <button
           className="bg-red-600 h-[100px] w-[300px] hover:bg-red-700 text-blue-300 font-bold py-2 rounded-full mt-3 ml-80">Update</button>
        </form>

      </div>
    </div>
  );
}