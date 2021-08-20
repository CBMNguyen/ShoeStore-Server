const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../model/user");
const mongoose = require("mongoose");

module.exports = {
  // handle post signup
  user_signup: async (req, res, next) => {
    const {
      firstname,
      lastname,
      gender,
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
          message: "Mail already exists",
        });
      }

      if (phoneNumber.length >= 1) {
        return res.status(409).json({
          message: "Phone already exists",
        });
      }

      const hashPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        // create new user
        firstname,
        lastname,
        gender,
        email,
        password: hashPassword,
        phone,
        image,
        address,
      });
      await newUser.save(); // save in database
      res.status(200).json({ message: "Sign up successfully."});
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // handle post login

  user_login: async (req, res, next) => {
    const { email, password, token } = req.body;
    try {
     // handle token with email password

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
          expiresIn: "1d",
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
        .json({ message: "Login successful", accessToken, refreshToken });
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
      let user = await User.findById({ _id: userId });
      console.log(user.password);
      user.password = null;
      if (user) res.status(200).json({ user });
      else
        res
          .status(404)
          .json({ message: "User Id does not exists." });
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // handle update user by Id
  user_update: async (req, res, next) => {
    const { userId } = req.params;
    const {firstname, lastname, email, password, phone, gender, image, address, orderAddress} = req.body;
    if(req.file)
      req.body.image = req.file.path;

    try {
      let user = null; 
      if (req.body.password) {
        console.log("have password-----------------");
        req.body.password = await bcrypt.hash(req.body.password, 10); // hash password by brycpt

         user = await User.updateOne(
          { _id: userId },
          { $set: { ...req.body } }
        );

      }else{
          console.log("empty password-----------------");
          if(orderAddress){
              user = await User.updateOne(
            { _id: userId },
            { $set: { orderAddress }}
              );
          }else{
             user = await User.updateOne(
              { _id: userId },
              { $set: { firstname, lastname, email, phone, gender, image: req.body.image, address }}
                );
          }
          }
      let userUpdated = await User.findOne({_id: userId});
      console.log(userUpdated.password);
      userUpdated.password = null;

      res.status(200).json({ message: "Update successfully.", userUpdated });
    } catch (error) {
      res.status(500).json({ error });
      console.error(error);
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
