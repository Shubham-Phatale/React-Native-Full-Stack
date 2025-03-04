const express = require("express");
const {
  addProductToCart,
  getCart,
  updateCart,
  deleteProduct,
  getCartTotal,
} = require("../controllers/cartController");
const authenticateToken = require("../middlewares/token");

const router = express.Router();

router.post("/addProduct", authenticateToken, addProductToCart);
router.get("/getCart", authenticateToken, getCart);
router.put("/updateCart", authenticateToken, updateCart);
router.delete("/deleteProduct", authenticateToken, deleteProduct);
router.get("/getCartTotal", authenticateToken, getCartTotal);

module.exports = router;
