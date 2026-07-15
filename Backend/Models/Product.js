import mongoose from "mongoose";
import Category from "./Category.js"

const productSchema = new mongoose.Schema(
  {
    Title: { type: String, required: true, trim: true },
    Price: { type: Number, required: true },
    Category: { type: mongoose.Schema.Types.ObjectId, ref: Category},
    Image: String,
    Description: String,

  },
  { timestamps: true },
);

export default mongoose.model("Product", productSchema)