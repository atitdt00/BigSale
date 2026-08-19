import dns from "dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import cors from "cors";


import { connectDB } from "./Config/db.js";
import authRoute from "./Routes/authRoute.js";
import userRoute from "./Routes/userRoute.js";
import productRoute from "./Routes/productRoute.js";
import categoryRoute from "./Routes/categoryRoute.js";
import paymentRoute from "./Routes/paymentRoute.js";
import forgotRoute from "./Routes/forgotRoute.js"


const PORT = Number(process.env.PORT) || 5000;
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/payment", paymentRoute);
app.use("/api/forgot", forgotRoute)

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
