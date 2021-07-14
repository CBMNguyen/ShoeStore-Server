const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
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
    password: { type: String, default: "shoesshop@2000" },
    address: { type: String, required: true },
    phone: { type: String, required: true, min: 10, max: 10, unique: true },
    image: { type: String, default: "" },
    salary: { type: Number, required: true },
    position: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Employee", employeeSchema);
