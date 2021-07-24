const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    products: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          purchased: { type: Number, default: 1 },
        },
      ],
      default: [],
    },
    discount: { type: Number, default: 0 },
    total: { type: Number, default: 0 },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Cart", cartSchema);
