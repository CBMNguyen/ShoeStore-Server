const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
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
    password: { type: String, default: "shoesshop@2000" },
    address: { type: String, required: true },
    phone: {
      type: Number,
      required: true,
      unique: true,
      match: /^0[0-9]{9}$/,
    },
    image: { type: String, default: "" },
    salary: { type: Number, required: true },
    position: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Employee", employeeSchema);
