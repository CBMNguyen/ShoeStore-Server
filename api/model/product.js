const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    name: { type: String, unique: true, required: true },
    originalPrice: { type: Number, required: true },
    salePrice: { type: Number, required: true },
    promotionPercent: { type: Number, default: 0 },
    productDetail: [
      {
        color: { type: mongoose.Schema.Types.ObjectId, ref: "Color" },
        sizeAndQuantity: [
          {
            size: { type: mongoose.Schema.Types.ObjectId, ref: "Size" },
            quantity: { type: Number, default: 0 },
          },
        ],
        images: { type: Array, default: [] },
      },
    ],
    description: { type: String, required: true },
    material: { type: String, required: true },
    quantityStock: { type: Number, default: 0 },
    state: { type: Boolean, default: false },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
