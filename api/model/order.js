const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
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
    createdAt: { type: Date, default: Date.now },
    deliveryAt: { type: Date, default: Date.now + 3 * 24 * 60 * 60 * 1000 },
    state: { type: String, default: "waiting" },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Order", orderSchema);
