// import Booking from "../model/bookingModel.js";
import mongoose from "mongoose";   // ADD THIS ON TOP
import Booking from "../model/bookingModel.js";
import Driver from "../model/driverModel.js";
import Delivery from "../model/deliveryModel.js";
import Cylinder from "../model/cylinderModel.js";
import History from "../model/historyModel.js";




const mapTypeToCategory = (type)=>{
  const t = type.toLowerCase();
  if(t.includes("lpg") || t.includes("domestic")) return "Domestic";
  if(t.includes("png") || t.includes("cng") || t.includes("commercial")) return "Commercial";
  if(t.includes("oxygen") || t.includes("medical")) return "Medical";
  if(t.includes("nitrogen") || t.includes("argon") || t.includes("industrial")) return "Industrial";
  return null;
};



export const createBooking = async (req,res)=>{
  try{
    const category = mapTypeToCategory(req.body.type);

    const freeCylinder = await Cylinder.findOne({
      category: category,
      status: "Empty"
    });

    if(!freeCylinder){
      return res.status(404).json({message:"No cylinder available"});
    }

    const booking = await Booking.create({
      ...req.body,
      category: category,
      cylinderId: freeCylinder.cylinderId
    });
    

    // HISTORY #1 — booking created
    await History.create({
      cylinderId: booking.cylinderId,
      fromOwner: "Warehouse",
      toOwner: booking.name,
      driverName: "Not Assigned",
      action: "Booking Created"
    });
    
    const driver = await Driver.findOne();

    if (!driver) {
      return res.status(200).json({ message:"Booking saved, but no driver available yet" });
    }

    const delivery = await Delivery.create({
      orderId: booking._id,
      driverId: driver._id,
      cylinderId: freeCylinder.cylinderId,
      status:"Assigned"
    });

    await Cylinder.findByIdAndUpdate(freeCylinder._id,{status:"Assigned"});
    // 🔥 SAVE RELATIONS INTO BOOKING
await Booking.findByIdAndUpdate(booking._id,{
  deliveryId: delivery._id,
  driverId: driver._id,
  cylinderId: freeCylinder.cylinderId
});


    // HISTORY #2 — driver assigned
    await History.create({
      cylinderId: booking.cylinderId,
      fromOwner: "Warehouse",
      toOwner: booking.name,
      driverName: driver.name,
      action: "Driver Assigned"
    });

    res.json({message:"Booking Successful"});
  }
  catch(err){
    res.status(500).json({message:err.message});
  }
};



export const getAllBookings = async (req, res) => {
  try {
    const data = await Booking.find().sort({ createdAt: -1 });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




export const getAdminOrders = async (req,res)=>{
  const data = await Booking.aggregate([
    {
      $lookup:{
        from:"deliveries",
        localField:"_id",
        foreignField:"orderId",
        as:"delivery"
      }
    },
    { $unwind:{ path:"$delivery", preserveNullAndEmptyArrays:true } }
  ]);
  res.json(data);
};

export const deleteBooking = async (req,res)=>{
  try{
    const booking = await Booking.findById(req.params.id);
    if(!booking) return res.status(404).json({message:"Booking not found"});

    // Remove delivery record
    await Delivery.deleteOne({ orderId: booking._id });

    // Free the cylinder
    if(booking.cylinderId){
      await Cylinder.findOneAndUpdate(
        { cylinderId: booking.cylinderId },
        { status: "Available" }
      );
    }

    await Booking.findByIdAndDelete(req.params.id);

    res.json({message:"Booking deleted successfully"});
  }catch(err){
    res.status(500).json({message:err.message});
  }
};


export const trackUserOrders = async (req, res) => {
  try {
    const email = req.params.email;

    const bookings = await Booking.find({ email }).sort({ createdAt: -1 });

    const result = [];

    for (let b of bookings) {
      const delivery = await Delivery.findOne({ orderId: b._id });
      const driver = delivery ? await Driver.findById(delivery.driverId) : null;
      const cylinder = delivery
        ? await Cylinder.findOne({ cylinderId: delivery.cylinderId })
        : null;

      result.push({
  _id: b._id,
  name: b.name,
  address: b.address,
  phone: b.phone,
  createdAt: b.createdAt,
  status: delivery?.status || "Pending",
  driver,
  cylinder
});

    }

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const completeDelivery = async(req,res)=>{
  const delivery = await Delivery.findById(req.params.id);

  await Delivery.findByIdAndUpdate(req.params.id,{ status:"Delivered" });

  await Cylinder.findOneAndUpdate(
    { cylinderId:delivery.cylinderId },
    { status:"Empty" }
  );

  res.json({message:"Delivery Completed"});
};

//_________________________________________________________________________


