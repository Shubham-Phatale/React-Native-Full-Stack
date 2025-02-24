const express = require("express");
const { getProductbyId } = require("../controllers/productController");

const router = express.Router();

router.get("/:id", getProductbyId);

module.exports = router;
