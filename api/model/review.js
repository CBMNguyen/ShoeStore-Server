const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema(
  {
    content: { type: String, required: true },
    star: { type: Number },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    state: { type: Boolean, default: false },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("Review", reviewSchema);
