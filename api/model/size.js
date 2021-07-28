const mongoose = require("mongoose");

const sizeSchema = new mongoose.Schema(
  {
    size: { type: Number, required: true, unique: true },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Size", sizeSchema);
