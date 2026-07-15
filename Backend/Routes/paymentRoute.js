import express from "express";
import { initiatePayment } from "../Controllers/paymentController.js";

const router = express.Router();

router.post("/", initiatePayment);

export default router;