import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  address: String,

  role: { type: String, default: "user" }   // 👈 ADD THIS
});




export default mongoose.model("User", userSchema);
