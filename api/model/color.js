const mongoose = require("mongoose");

const colorSchema = new mongoose.Schema(
  {
    color: { type: String, required: true, unique: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("Color", colorSchema);
