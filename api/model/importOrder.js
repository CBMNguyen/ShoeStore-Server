const mongoose = require("mongoose");

const importOrderSchema = mongoose.Schema(
  {
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
    supplierId: { type: mongoose.Schema.Types.ObjectId, ref: "Supplier" },
    content: { type: String, default: "" },
    products: [
      {
        _id: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        productDetail: { type: Array, require: true },
        quantityStock: { type: Number, require: true },
        originalPrice: { type: Number, require: true },
      },
    ],
    state: { type: Boolean, default: false },
    totalQuantity: { type: Number, require: true },
    totalAmount: { type: Number, require: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("ImportOrder", importOrderSchema);
