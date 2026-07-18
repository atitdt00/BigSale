import bcrypt from "bcryptjs";
import User from "../Models/User.js";


export const resetPassword=async(req, res)=>{
    try{
        const {token}= req.params;
        const { password} = req.body;

        const user= await User.findOne({
            resetToken: token,
            resetTokenExpire: {$gt: Date.now()},
        })

        if(!user){
            return res.status(400).json({
                success: false,
                messsage: "Invalid or expired token",
            })
        }

        user.password= await bcrypt.hash(password, 10);
        user.resetToken= undefined;
        user.resetTokenExpire= undefined;

        await user.save();
        res.status(200).json({
            success: true,
            message: "Password updated successfully",
        })
    }catch(error){
        res.status(500).json({
            success: false,
             message: error.message,
        })
    }
}