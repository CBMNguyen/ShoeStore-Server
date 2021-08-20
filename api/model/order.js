const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    products: { type: Array, require: true },
    createdAt: { type: Date, default: Date.now },
    state: {type: String, default: "pending"}
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Order", orderSchema);
