const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
    products: [
      {
        _id: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        selectedColor: { type: String, require: true },
        selectedSize: { type: Number, require: true },
        selectedQuantity: { type: Number, require: true },
        currentOriginalPrice: { type: Number, require: true },
        currentSalePrice: { type: Number, require: true },
        currentPromotionPercent: { type: Number, require: true },
      },
    ],
    updateProduct: { type: Array, require: true },
    state: { type: String, default: "pending" },
    total: { type: Number, require: true },
    paymentMethod: { type: Boolean, default: false },
    payment: { type: Boolean, default: false },
    fullname: { type: String, require: true },
    email: {
      type: String,
      required: true,
      unique: false,
      match:
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    },
    phone: {
      type: String,
      required: true,
      match: /^0[0-9]{9}$/,
    },
    address: { type: String, require: true },
    discount: { type: Number, default: 0 },
    discountCode: { type: String, default: "" },
    transportFee: { type: Number, require: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
