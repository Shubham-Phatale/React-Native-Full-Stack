const Cart = require("../models/cartModel");

const addProductToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.userId;

  if (!productId || !quantity) {
    return res.status(400).json({
      success: false,
      message: "Product ID and quantity are required.",
    });
  }

  try {
    let cartItem = await Cart.findOne({ productId, userId });

    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      const newCartItem = new Cart({ productId, quantity, userId });
      await newCartItem.save();
    }

    res.status(200).json({
      success: true,
      message: "Product added/updated in cart.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error,
    });
  }
};

const getCart = async (req, res) => {
  try {
    const cartItems = await Cart.find();
    res.status(200).json({
      success: true,
      message: "cart Items Feteched!",
      cartItems,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error,
    });
  }
};

const updateCart = async (req, res) => {
  const { productId, quantity } = req.body;

  if (!productId || !quantity) {
    return res.status(400).json({
      success: false,
      message: "Product ID and quantity are required.",
    });
  }

  try {
    const cartItem = await Cart.findOne({ productId });

    if (cartItem) {
      cartItem.quantity = quantity;
      await cartItem.save();
      res.status(200).json({
        success: true,
        message: "Cart item quantity updated.",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Product not found in cart.",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error,
    });
  }
};

const deleteProduct = async (req, res) => {
  const { productId } = req.body;

  if (!productId) {
    return res.status(400).json({
      success: false,
      message: "Product ID and quantity are required.",
    });
  }

  try {
    const cartItem = await Cart.findOneAndDelete({ productId });

    if (cartItem) {
      res.status(200).json({
        success: true,
        message: "Product removed from cart.",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Product not found in cart.",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error,
    });
  }
};

const getCartTotal = async (req, res) => {
  try {
    const cartItems = await Cart.find().populate("productId");
    let total = 0;

    cartItems.forEach((item) => {
      const price = item.productId?.price || 0;
      total += item.quantity * price;
    });

    res.status(200).json({ total });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = {
  addProductToCart,
  getCart,
  updateCart,
  deleteProduct,
  getCartTotal,
};
