const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    products: { type: Array, require: true },
    state: { type: String, default: "pending" },
    total: { type: Number, require: true },
    paymentMethod: { type: String, default: "normal" },
    payment: { type: Boolean, default: false },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
