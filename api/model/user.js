const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match:
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    },
    password: {
      type: String,
      required: true,
      match: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      match: /^0[0-9]{9}$/,
    },
    image: { type: String, default: "" },
    address: { type: String, required: true },
    orderAddress: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("User", userSchema);
