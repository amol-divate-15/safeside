import Admin from "../model/adminModel.js";

// ✅ NAMED EXPORT
export const createAdmin = async (req, res) => {
  const exist = await Admin.findOne({ username: "admin" });
  if (exist) return res.json("Admin already exists");

  const admin = new Admin({
    username: "admin",
    password: "admin123"
  });

  await admin.save();
  res.json("Admin Created");
};

// ✅ NAMED EXPORT
export const adminLogin = async (req, res) => {
  const { username, password } = req.body;

  const admin = await Admin.findOne({ username, password });
  if (!admin) {
    return res.status(401).json({ message: "Invalid Admin Login" });
  }

  res.json({
    message: "Admin Login Success",
    role: "admin",
    admin
  });
};
