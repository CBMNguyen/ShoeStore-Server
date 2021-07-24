const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    gender: { type: String, required: true },
    birthdate: { type: Date, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match:
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    },
    address: { type: String, required: true },
    phone: {
      type: String,
      required: true,
      unique: true,
      match: /^0[0-9]{9}$/,
    },
    image: { type: String, default: "" },
    position: { type: mongoose.Schema.Types.ObjectId, ref: "Position" },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Employee", employeeSchema);
