const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        purchased: { type: Number, default: 1 },
      },
    ],
    discount: { type: Number, default: 0 },
    total: { type: Number, require: true },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("cart", cartSchema);
