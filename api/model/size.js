const mongoose = require("mongoose");

const sizeSchema = new mongoose.Schema(
  {
    size: { type: Number, required: true, unique: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("Size", sizeSchema);
