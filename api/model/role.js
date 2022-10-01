const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema(
  {
    role: { type: String, unique: true, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("Role", roleSchema);
