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
    password: {
      type: String,
      required: true,
      match: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
    },
    address: { type: String, required: true },
    phone: {
      type: String,
      required: true,
      unique: true,
      match: /^0[0-9]{9}$/,
    },
    image: {
      type: String,
      default:
        "https://res.cloudinary.com/h2kcloud/image/upload/v1659461324/ShoesStore/avt_male_idrt86.jpg",
    },
    position: { type: mongoose.Schema.Types.ObjectId, ref: "Position" },
    roles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Role" }],
    state: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("Employee", employeeSchema);
