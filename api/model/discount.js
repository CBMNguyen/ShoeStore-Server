const mongoose = require("mongoose");

const discountSchema = new mongoose.Schema(
  {
    discountName: { type: String, require: true },
    discountCode: { type: String, require: true },
    discountType: { type: mongoose.Schema.Types.ObjectId, ref: "DiscountType" },
    quantity: { type: Number, require: true },
    value: { type: Number, require: true },
    startDate: { type: Date, default: new Date() },
    endDate: { type: Date, default: new Date() },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("Discount", discountSchema);
