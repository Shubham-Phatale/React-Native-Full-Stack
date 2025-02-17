const products = require("../models/products");
const bannerModel = require("../models/bannerModel");

const homeController = async (req, res) => {
  try {
    const banners = await bannerModel.find().limit(3);
    const recommended = await products.find({ isRecommended: true }).limit(4);
    const trending = await products.find({ isTrending: true }).limit(4);
    const topProducts = await products.find({ isTop: true }).limit(4);

    res.status(200).json({
      success: true,
      banners,
      recommended,
      trending,
      topProducts,
    });
  } catch (err) {
    console.log("Error in products");
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  homeController,
};
