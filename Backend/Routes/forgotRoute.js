import express from 'express';
import { forgotPassword } from '../Controllers/ForgotPasswordController.js';
import { resetPassword } from '../Controllers/ResetPasswordController.js';
const router= express.Router();

router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;