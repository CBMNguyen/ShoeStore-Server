const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    gender: String,
    birthdate: { type: Date, required: true },
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
      // required: true,
      // match: /^0[0-9]{9}$/,
    },
    image: { type: String, required: true },
    address: String,
    orderAddress: {
      fullName: { type: String, default: "" },
      isFullDay: { type: Boolean, default: true },
      phone: { type: String, default: "" },
      city: { type: String, default: "" },
      district: { type: String, default: "" },
      commune: { type: String, default: "" },
      description: { type: String, default: "" },
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
