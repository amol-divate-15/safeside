import User from "../model/userModel.js"

// for registration
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, address } = req.body;

    const exist = await User.findOne({ email });
    if (exist) return res.status(400).json({ message: "User already exists" });

    const user = new User({ name, email, password, address });
    await user.save();

    res.status(201).json({ message: "Registered Successfully", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// for login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email, password });
  if (!user) return res.status(400).json({ message: "Invalid email or password" });

  res.json({
    message: "Login successful",
    role: user.role,
    user
  });
};


//used for update password
export const updatePassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    user.password = newPassword;
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET all users (Admin)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE USER (Admin)
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


