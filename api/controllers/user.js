const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../model/user");
const mongoose = require("mongoose");
const admin = require("../../config/firebase-config");
const nodemailer = require("nodemailer");
const shortid = require("shortid");
const templateMail = require("../utils/mail");
const GENDER_IMAGE = require("../utils/common");
const cloudinary = require("../utils/cloudinary.config");

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
      birthdate,
    } = req.body;

    const image = gender === "male" ? GENDER_IMAGE.male : GENDER_IMAGE.female;

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

      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
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
        birthdate,
      });
      await newUser.save(); // save in database
      res.status(200).json({ message: "Sign up successfully." });
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // handle post login

  user_login: async (req, res, next) => {
    const { email, password, token } = req.body;
    try {
      if (token) {
        const decodeTokenValue = await admin.auth().verifyIdToken(token.i);
        if (decodeTokenValue) {
          const { name, picture, email } = decodeTokenValue;
          const user = await User.find({ email });

          if (user.length >= 1) {
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

            res.status(200).json({ message: "Login successful", accessToken });
          }

          const newUser = new User({
            // create new user
            firstname: name.split(" ")[0] || "",
            lastname: name.split(" ")[1] || "",
            email,
            password: process.env.EMPLOYEE_PW,
            image: picture,
          });
          const currentUser = await newUser.save(); // save in database

          const accessToken = jwt.sign(
            {
              userId: currentUser._id,
              firstname: currentUser.firstname,
              lastname: currentUser.lastname,
            },
            process.env.JWT_KEY,
            {
              expiresIn: "1d",
            }
          );

          res.status(200).json({ message: "Login successful", accessToken });
        } else {
          return res.status(401).json({ message: "Auth failed" });
        }
      } else {
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
        res.status(200).json({ message: "Login successful", accessToken });
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // handle reset password
  user_resetPassword: async (req, res, next) => {
    const { email } = req.body;

    try {
      const user = await User.find({ email });
      if (user.length === 0) {
        return res.status(404).json({
          message: "Email does not exist!",
        });
      }

      const password = shortid.generate() + process.env.SIGNATURE_PASS;
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);

      const a = await User.updateOne(
        { email },
        { $set: { password: hashPassword } }
      );

      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.MAIL_ADDRESS,
          pass: process.env.MAIL_PASS,
        },
      });

      await transporter.sendMail({
        from: `"Shoes Store 🎁" < ${process.env.MAIL_ADDRESS} >`, // sender address
        to: email, // list of receivers
        subject: "Reset password", // Subject line
        html: templateMail(password), // html body
      });

      res.status(200).json({ message: "Send mail successfully." });
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // handle get all user
  user_getAll: async (req, res, next) => {
    try {
      const users = await User.find().populate("cart");

      res.status(200).json({ message: "Fetch users successfully.", users });
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // handle get user by Id
  user_get: async (req, res, next) => {
    const { userId } = req.params;
    try {
      let user = await User.findById({ _id: userId });
      user.password = null;
      if (user) res.status(200).json({ user });
      else res.status(404).json({ message: "User Id does not exists." });
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // handle update user by Id
  user_update: async (req, res, next) => {
    const { userId } = req.params;
    const {
      firstname,
      lastname,
      birthdate,
      email,
      password,
      phone,
      gender,
      image,
      address,
      orderAddress,
    } = req.body;

    if (req.file) {
      // Upload to cloud
      req.body.image = await cloudinary.upload(
        req.file.path,
        process.env.CLOUD_FOLDER_UPLOAD
      );
    }

    try {
      let user = null;
      if (req.body.password) {
        // have password
        req.body.password = await bcrypt.hash(req.body.password, 10); // hash password by brycpt

        user = await User.updateOne({ _id: userId }, { $set: { ...req.body } });
      } else {
        // empty password
        if (orderAddress) {
          user = await User.updateOne(
            { _id: userId },
            { $set: { orderAddress } }
          );
        } else {
          user = await User.updateOne(
            { _id: userId },
            {
              $set: {
                firstname,
                lastname,
                birthdate,
                email,
                phone,
                gender,
                image: req.body.image,
                address,
              },
            }
          );
        }
      }
      let userUpdated = await User.findOne({ _id: userId });
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
