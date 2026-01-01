import Cylinder from "../model/cylinderModel.js";
import Booking from "../model/bookingModel.js";
import Driver from "../model/driverModel.js";
import User from "../model/userModel.js";

export const getReports = async (req, res) => {
  try {
    // 🔹 TOTAL COUNTS
    const totalCylinders = await Cylinder.countDocuments();
    const totalDrivers = await Driver.countDocuments();
    const totalUsers = await User.countDocuments();

    // 🔹 CYLINDER STATUS
    const delivered = await Cylinder.countDocuments({ status: "Delivered" });
    const pending = await Cylinder.countDocuments({ status: { $ne: "Delivered" } });
    const damaged = await Cylinder.countDocuments({ status: "Damaged" });

    // 🔹 CYLINDER BY TYPE
    const cylinderByType = await Cylinder.aggregate([
      { $group: { _id: "$gasType", total: { $sum: 1 } } }
    ]);

    // 🔹 CUSTOMER USAGE
    const customerUsage = await Booking.aggregate([
      { $group: { _id: "$email", total: { $sum: 1 } } }
    ]);

    // 🔹 DRIVER PERFORMANCE
    const driverPerformance = await Booking.aggregate([
      {
        $group: {
          _id: "$driverName",
          deliveries: { $sum: 1 }
        }
      }
    ]);

    res.json({
      totalCylinders,
      totalDrivers,
      totalUsers,
      delivered,
      pending,
      damaged,
      cylinderByType,
      customerUsage,
      driverPerformance
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
