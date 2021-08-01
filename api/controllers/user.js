const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../model/user");
const Cart = require("../model/cart");
const mongoose = require("mongoose");

module.exports = {
  // handle post signup
  user_signup: async (req, res, next) => {
    const {
      firstname,
      lastname,
      gender,
      birthdate,
      email,
      password,
      phone,
      address,
    } = req.body;

    console.log(req.body);

    const image = gender === "male" ? "uploads/avt_male.jpg" : "uploads/avt_female.jpg"; 

    try {
      const user = await User.find({ email });
      const phoneNumber = await User.find({ phone });
      if (user.length >= 1) {
        return res.status(409).json({
          massage: "Mail already exists",
        });
      }

      if (phoneNumber.length >= 1) {
        return res.status(409).json({
          massage: "Phone already exists",
        });
      }

      const cartId = new mongoose.Types.ObjectId();
      const userId = new mongoose.Types.ObjectId();

      const cart = new Cart({
        _id: cartId,
        user: userId,
      });

      await cart.save();

      const hashPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        // create new user
        _id: userId,
        firstname,
        lastname,
        gender,
        birthdate,
        email,
        password: hashPassword,
        phone,
        image,
        address,
        cart: cartId,
      });
      await newUser.save(); // save in database
      res.status(200).json({ message: "Sign up successfully."});
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // handle post login
  user_login: async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const user = await User.find({ email });
      if (user.length < 1) {
        return res.status(401).json({ message: "Email does not exist." });
      }

      const result = await bcrypt.compare(password, user[0].password);
      if (!result) {
        return res.status(401).json({ message: "Wrong password." });
      }
      // create json web token
      const accessToken = jwt.sign(
        {
          userId: user[0]._id,
          firstname: user[0].firstname,
          lastname: user[0].lastname,
        },
        process.env.JWT_KEY,
        {
          expiresIn: "1h",
        }
      );
      const refreshToken = jwt.sign(
        {
          userId: user[0]._id,
          firstname: user[0].firstname,
          lastname: user[0].lastname,
        },
        process.env.JWT_KEY,
        {
          expiresIn: "7d",
        }
      );
      res
        .status(200)
        .json({ massage: "Auth successful", accessToken, refreshToken });
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // handle get all user
  user_getAll: async (req, res, next) => {
    try {
      const users = await User.find().populate("cart");

      res.status(200).json({ message: "Fetch users successfully.", 
        users
      });
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // handle get user by Id
  user_get: async (req, res, next) => {
    const { userId } = req.params;
    try {
      const user = await User.findById({ _id: userId }).populate("cart");
      if (user) res.status(200).json({ user });
      else
        res
          .status(404)
          .json({ message: "No valid entry found for provided Id" });
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // handle update user by Id
  user_update: async (req, res, next) => {
    const { userId } = req.params;
    req.body.image = req.file.path;

    try {
      if (req.body.password) {
        req.body.password = await bcrypt.hash(req.body.password, 10); // hash password by brycpt
      }
      const user = await User.updateOne(
        { _id: userId },
        { $set: { ...req.body } }
      );
      res.status(200).json({ message: "Update information successfully.", user });
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // handle delete user by Id
  user_delete: async (req, res, next) => {
    const { userId } = req.params;
    try {
      await User.deleteOne({ _id: userId });
      res.status(200).json({ message: "User deleted" });
    } catch (error) {
      res.status(500).json({ error });
    }
  },
};
