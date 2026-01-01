import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  type: String,
  customerId: String,
  name: String,
  address: String,
  phone: String,
  email: String,
  price: { type: Number, default: 1000 },
  category: String,

  // 🔥 RELATION FIELDS (VERY IMPORTANT)
  cylinderId: String,
  deliveryId: { type: mongoose.Schema.Types.ObjectId, ref: "Delivery" },
  driverId: { type: mongoose.Schema.Types.ObjectId, ref: "Driver" },

  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Booking", bookingSchema);
