import Category from "../Models/Category.js"

import slugify from "slugify";

//get all Category
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({categories, message: "All Categories is Received successfully"});
  } catch (error) {
    console.log(error.message);
  }
};

//create Category
export const createCategory = async (req, res) => {
  const { name } = req.body;
  try {
    await Category.create({
      name,
      slug: slugify(name, { lower: true, strict: true }),
    });
    res.status(200).json("product added");
  } catch (error) {
    console.log(error.message);
  }
};
//get product by id
export const getCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    res.status(200).json({ category });
  } catch (error) {
    console.log(error.message);
  }
};
//update Category by id
 export const updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: "after",
    });
    res.status(200).json({ category, message: "Category, updated" });
  } catch (error) {
    console.log(error.message);
  }
};

//delete Category by id
export const deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Category, deleted successfully" });
  } catch (error) {
    console.log(error.message);
  }
};

