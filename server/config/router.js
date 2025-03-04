const express = require("express");
const userRoutes = require("../routes/userRoutes");
const homeRoutes = require("../routes/homeRoutes");
const productRoutes = require("../routes/productRoutes");
const cartRoutes = require("../routes/cartRoutes");

const apiRouter = express.Router();

apiRouter.use("/auth", userRoutes);
apiRouter.use("/", homeRoutes);
apiRouter.use("/product", productRoutes);
apiRouter.use("/cart", cartRoutes);

module.exports = apiRouter;
