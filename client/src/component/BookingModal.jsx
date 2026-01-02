import { useState } from "react";
import axios from "axios";

export default function BookingModal({ close }) {
  const user = JSON.parse(localStorage.getItem("loggedUser"));

const [data, setData] = useState({
  type:"",
  customerId: user._id,
  name: user.name,
  address: user.address,
  phone: user.phone,
  email: user.email,   // 🔥 FIXED EMAIL
  price:1000
});


  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleBook = async () => {
  if(!data.type){
    alert("Please select gas type");
    return;
  }

  try{
    await axios.post("http://localhost:5000/api/booking/create", data);
    alert("Booking Successful");
    close();
  }catch(err){
    alert(err.response?.data?.message || "Booking Failed");
  }
};


  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center ">
      
      <div className="bg-white p-6 rounded-xl w-[700px] text-black space-y-3 ">
         <div className="bg-white-100 text-gray-800 py-4 text-center text-xl font-bold">
          Make Your Booking 👋
        </div>
        <select name="type" onChange={handleChange} className="input-modern w-90 h-14 text-lg px-5 ml-40">
  <option value="">Select Gas Type</option>
  <option value="LPG">LPG (Domestic)</option>
  <option value="Oxygen">Oxygen (Medical)</option>
  <option value="CNG">CNG (Commercial)</option>
  <option value="Nitrogen">Nitrogen (Industrial)</option>
  </select><br/>

        <input name="customerId" placeholder="Customer ID" onChange={handleChange} className="input-modern w-90 h-14 text-lg px-5 ml-40"/>
        <input name="name" placeholder="Name" onChange={handleChange} className="input-modern w-90 h-14 text-lg px-5 ml-40"/>
        <input name="address" placeholder="Address" onChange={handleChange} className="input-modern w-90 h-14 text-lg px-5 ml-40"/>
        <input name="phone" placeholder="Phone" onChange={handleChange} className="input-modern w-90 h-14 text-lg px-5 ml-40"/>
        
        <input name="price" value={data.price} readOnly className="input-modern w-90 h-14 text-lg px-5 ml-40"/>

        <button onClick={handleBook} className="w-50 ml-60 py-3 text-xl font-bold bg-blue-100 text-gray-800 rounded-xl">Book</button>
        <button onClick={close} className="w-full ml-3">Cancel</button>
      </div>
    </div>
  );
}