import mongoose from "mongoose";

const driverSchema = new mongoose.Schema({
  name: String,
  vehicleNo: String,
  phone: String,
});

export default mongoose.model("Driver", driverSchema);
