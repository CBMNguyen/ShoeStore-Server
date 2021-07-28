const mongoose = require("mongoose");

const positionSchema = new mongoose.Schema(
  {
    position: { type: String, unique: true, required: true },
    salary: { type: Number, required: true },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Position", positionSchema);
