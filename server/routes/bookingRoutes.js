import express from "express";
import { createBooking } from "../controllers/bookingController.js";
import { getAllBookings } from "../controllers/bookingController.js";
import { getAdminOrders } from "../controllers/bookingController.js";
import { deleteBooking } from "../controllers/bookingController.js";
// import { getUserTracking } from "../controllers/bookingController.js";
import { completeDelivery } from "../controllers/bookingController.js";
import { trackUserOrders } from "../controllers/bookingController.js";


const router = express.Router();
router.post("/create", createBooking);
router.get("/all", getAllBookings);
router.get("/admin-orders", getAdminOrders);
router.delete("/delete/:id", deleteBooking);
// router.get("/track/:", getUserTracking);
router.put("/complete/:id", completeDelivery);

router.get("/track/:email", trackUserOrders);


export default router;
