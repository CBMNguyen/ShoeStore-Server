const mongoose = require("mongoose");

const discountTypeSchema = new mongoose.Schema(
  {
    discountTypeName: { type: String, required: true, unique: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("DiscountType", discountTypeSchema);
