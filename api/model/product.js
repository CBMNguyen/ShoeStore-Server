const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    name: { type: String, required: true },
    originalPrice: { type: Number, required: true },
    salePrice: { type: Number, required: true },
    isFreeShip: { type: Boolean, default: false },
    promotionPercent: { type: Number, default: 0 },
    images: { type: Array, default: [] },
    color: { type: Array, default: [] },
    description: { type: String, required: true },
    quantityStock: { type: Number, min: 0, max: 99, required: true },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Product", productSchema);
