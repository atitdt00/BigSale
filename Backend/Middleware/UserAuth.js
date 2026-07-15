import jwt from "jsonwebtoken";
import User from "../Models/User.js";

const userAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRETKEY);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({
        messagge: "user not found",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "invalid token",
    });
  }
};

export default userAuth;
