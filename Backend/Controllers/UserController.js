import bcrypt from "bcryptjs";
import User from "../Models/User.js";

//get all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.log(error.message);
  }
};

//create user
export const createUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  const exist = await User.findOne({ email });
  try {
    if (exist) {
      return res.json({ message: "Email already exists" });
    }
    const hash = await bcrypt.hash(password, 10);
    await User.create({
      name,
      email,
      password: hash,
      role: role || "customer",
    });
    res.status(200).json({ message: "new user added successfully" });
  } catch (error) {
    console.log({ message: error.message });
  }
};

//get one user
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.status(200).json(user);
    }
  } catch (error) {
    console.log(error.message);
  }
};

//update user
export const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({user, message: "user has been updated", success: true});
  } catch (error) {
    console.log(error.message);
  }
};

//delete user
export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ success: true, message: "user deleted successfully" });
  } catch (error) {
    console.log({ message: error.message });
  }
};
