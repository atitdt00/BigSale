import User from "../Models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const exist = await User.findOne({ email });
    if (exist) {
      return res.json({
        message: "Email already exists",
      });
    }
    const hash = await bcrypt.hash(password, 10);
    await User.create({
      name,
      email,
      password: hash,
      role: role || "customer",
    });

    res.status(201).json({
      message: "Registered successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({
      message: "user not found",
    });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({
      message: "Invalid paassword credential",
    });
  }
  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
      email: user.email,
    },
    process.env.JWT_SECRETKEY,
    { expiresIn: "1d" },
  );

  res.json({
    token,
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
  });
};
