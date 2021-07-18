const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../model/user");

module.exports = {
  // handle post signup route
  user_signup: async (req, res, next) => {
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
        });
        await user.save(); // save in database
        res.status(200).json({ message: "User created" });
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  }, // handle post login route
  user_login: async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const user = await User.find({ email });
      if (user.length < 1) {
        return res.status(401).json({ message: "Auth failed" });
      }

      const result = await bcrypt.compare(password, user[0].password);
      if (!result) {
        return res.status(401).json({ message: "Auth failed" });
      }
      // create json web token
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
  }, // handle get all user
  user_getAll: async (req, res, next) => {
    try {
      const users = await User.find();
      res.status(200).json({ users });
    } catch (error) {
      res.status(500).json({ error });
    }
  }, // handle get user by Id
  user_get: async (req, res, next) => {
    const { userId } = req.params;
    try {
      const user = await User.findById({ _id: userId });
      if (user) res.status(200).json({ user });
      else
        res
          .status(404)
          .json({ message: "No valid entry found for provided Id" });
    } catch (error) {
      res.status(500).json({ error });
    }
  }, // handle update user by Id
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
      res.status(200).json({ message: "Updated", user });
    } catch (error) {
      res.status(500).json({ error });
    }
  }, // handle delete user by Id
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
