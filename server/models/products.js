const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add name"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Please add category"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Please add the price"],
    },
    imageUrl: {
      type: [String],
      required: [true, "Please add at least one image URL"],
    },
    isRecommended: {
      type: Boolean,
      default: false,
    },
    isTopRated: {
      type: Boolean,
      default: false,
    },
    isTrending: {
      type: Boolean,
      default: false,
    },
    Ratings: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
