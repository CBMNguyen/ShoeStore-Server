const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match:
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    },
    password: { type: String, required: true },
    phone: { type: String, required: true, min: 10, max: 10, unique: true },
    image: { type: String, default: "" },
    address: { type: String, required: true },
    orderAddress: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("User", userSchema);
