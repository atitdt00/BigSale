import Product from "../Models/Product.js";

//get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("Category");
    res.status(200).json(products);
  } catch (error) {
    console.log(error.message);
  }
};

//create products
export const createProduct = async (req, res) => {
  const { Title, Price, Category, Description } = req.body;
  try {
   const product= await Product.create({ Title, Price, Category ,Description, Image: req.file?.path });
    res.status(200).json({product  ,message:"product added"});
  } catch (error) {
    console.log(error.message);
  }
};
//get product by id
export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("Category");
    res.status(200).json({ product });
  } catch (error) {
    console.log(error.message);
  }
};
//update products by id
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const data = { ...req.body };

  if (req.file) {
    data.Image = req.file.path;
  }
  try {
    const product = await Product.findByIdAndUpdate(id, data, {
      returnDocument: "after",
    });
    res.status(200).json({ product, message: "product updated" });
  } catch (error) {
    console.log(error.message);
  }
};

//delete products by id
export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "product deleted successfully" });
  } catch (error) {
    console.log(error.message);
  }
};
