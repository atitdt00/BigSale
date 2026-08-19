import express from "express";
import { initiatePayment } from "../Controllers/PaymentController.js";

const router = express.Router();

router.post("/", initiatePayment);

export default router;