import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema= new mongoose.Schema({
    name: String,
    email: { type: String, required: true, unique: true},
    password: { type: String , required: true},
   role: {
    type: String,
    enum: ["customer", "admin"],
    default: "customer"
   },

   resetToken: {
    type: String,
     default: null,
   },

   resetTokenExpire: {
    type: Date,
    default: null,
   }
   
})

 
export default mongoose.model("User", userSchema);