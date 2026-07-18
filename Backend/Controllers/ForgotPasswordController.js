import User from "../Models/User.js";
import crypto from "crypto"
    import sendEmail from "../utils/sendEmail.js";

export const forgotPassword = async(req, res)=>{
        try{
            const { email }= req.body;
            const user= await User.findOne({email});

            if(!user){
                return res.status(404).json({
                    success: false,
                    message: "user not found",
                })
            }
            const token= crypto.randomBytes(32).toString("hex")

            user.resetToken =token;
            user.resetTokenExpire = Date.now() + 15 *60 * 1000;
            await user.save();

            const resetUrl = `http://localhost:5173/reset-password/${token}`

            //send email here
            await sendEmail(user.email, resetUrl)
            res.status(200).json({
                success: true,
                message: "Reset link sent",
                resetUrl,
            })

        }catch(error){
            res.status(500).json({
                success: false,
                message: error.message,
            })
        }
}