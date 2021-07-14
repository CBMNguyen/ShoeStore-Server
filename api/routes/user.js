const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../model/user");

router.post("/signup", async (req, res, next) => {
  // handle post signup route
  const { email, password, firstname, lastname, phone, address } = req.body;
  try {
    const user = await User.find({ email });
    if (user.length >= 1) {
      res.status(409).json({
        massage: "Mail exists",
      });
    } else {
      const hashPassword = await bcrypt.hash(password, 10);
      const user = new User({
        // create new user
        email,
        password: hashPassword,
        firstname,
        lastname,
        phone,
        address,
        orderAddress: address,
      });
      await user.save(); // save in database
      res.status(200).json({ message: "User created" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

router.post("/login", async (req, res, next) => {
  // handle post login route
  const { email, password } = req.body;
  try {
    const user = await User.find({ email });
    if (user.length < 1) {
      res.status(401).json({ message: "Auth failed" });
      return;
    }

    const result = await bcrypt.compare(password, user[0].password);
    if (!result) {
      res.status(401).json({ message: "Auth failed" });
      return;
    }

    const token = jwt.sign(
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
    res.status(200).json({ massage: "Auth successful", token });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get("/", async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.patch("/:userId", async (req, res, next) => {
  const { userId } = req.params;
  let { password } = req.body || "";
  if (password) {
    try {
      password = await bcrypt.hash(req.body.password, 10);
    } catch (error) {
      res.status(500).json({ error });
      return;
    }
  }
  try {
    const user = await User.updateOne(
      { _id: userId },
      { $set: { ...req.body, password } }
    );
    res.status(200).json({ message: "Updated", user });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.delete("/:userId", async (req, res, next) => {
  const { userId } = req.params;
  try {
    await User.remove({ _id: userId });
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;
