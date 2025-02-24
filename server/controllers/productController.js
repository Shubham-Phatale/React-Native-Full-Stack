const Product = require("../models/products");

const getProductbyId = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(400).json({
        success: false,
        message: "Product not found!",
      });
    }
    res.status(200).json({
      success: true,
      message: "Successfully found product by Id",
      product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error retriving product by ID",
      error,
    });
  }
};

module.exports = {
  getProductbyId,
};
