import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js"
import cylinderRoute from "./routes/cylinderRoutes.js";
import driverRoute from "./routes/driverRoutes.js";
import reportRoute from "./routes/reportRoutes.js";

import historyRoutes from "./routes/historyRoutes.js";


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

app.use("/api", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/cylinders", cylinderRoute);
app.use("/api/drivers", driverRoute);
app.use("/api/reports", reportRoute);

app.use("/api/history", historyRoutes);


mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () => console.log("Server running on 5000"));
  })
  .catch(err => console.log(err));
