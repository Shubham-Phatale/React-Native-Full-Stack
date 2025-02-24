const express = require("express");
const userRoutes = require("../routes/userRoutes");
const homeRoutes = require("../routes/homeRoutes");
const productRoutes = require("../routes/productRoutes");

const apiRouter = express.Router();

apiRouter.use("/auth", userRoutes);
apiRouter.use("/", homeRoutes);
apiRouter.use("/product", productRoutes);

module.exports = apiRouter;
