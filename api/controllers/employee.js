const Employee = require("../model/employee");
const Position = require("../model/position");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cloudinary = require("../utils/cloudinary.config");

module.exports = {
  // handle get all Employee
  employee_getAll: async (req, res) => {
    try {
      const employees = await Employee.find().populate("position");

      res.status(200).json({
        message: "Fetch employee successfully.",
        employees,
      });
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  employee_login: async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const employee = await Employee.find({ email });
      if (employee.length < 1) {
        return res.status(401).json({ message: "Email does not exist." });
      }

      const result = await bcrypt.compare(password, employee[0].password);

      if (!result) {
        return res.status(401).json({ message: "Wrong password." });
      }

      if (employee[0].state) {
        return res
          .status(401)
          .json({ message: "Your account has been locked." });
      }

      // create json web token
      const accessToken = jwt.sign(
        {
          employeeId: employee[0]._id,
          firstname: employee[0].firstname,
          lastname: employee[0].lastname,
          isAdmin: employee[0].isAdmin,
          image: employee[0].image,
          roles: employee[0].roles,
          state: employee[0].state,
        },
        process.env.JWT_KEY,
        {
          expiresIn: "1d",
        }
      );
      res.status(200).json({ message: "Auth successful", accessToken });
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // handle get Employee by Id
  employee_getById: async (req, res) => {
    const { employeeId } = req.params;
    try {
      const employee = await Employee.findById({ _id: employeeId });
      if (employee) res.status(200).json({ employee });
      else
        res.status(404).json({ message: "No valid entry found provide by Id" });
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // handle create Employee
  employee_create: async (req, res) => {
    const {
      firstname,
      lastname,
      gender,
      birthdate,
      email,
      password,
      address,
      phone,
      position,
    } = req.body;

    if (req.file) {
      // Upload to cloud
      req.body.image = await cloudinary.upload(
        req.file.path,
        process.env.CLOUD_FOLDER_UPLOAD
      );
    }

    try {
      const isPosition = await Position.findById({ _id: position });
      const isEmployee = await Employee.find({ email });
      const isPhoneNumber = await Employee.find({ phone });

      if (isEmployee.length >= 1)
        return res.status(409).json({
          message: "Mail already exists",
        });

      if (isPhoneNumber.length >= 1)
        return res.status(409).json({
          message: "Phone number already exists",
        });

      if (!isPosition)
        return res
          .status(404)
          .json({ message: "No valid entry found provide by positionId" });

      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);

      const newEmployee = new Employee({
        firstname,
        lastname,
        gender,
        birthdate,
        email,
        password: hashPassword,
        address,
        phone,
        image: req.body.image,
        position,
        roles: JSON.parse(req.body.roles),
      });

      const employee = await newEmployee.save();

      const employeeCreated = await Employee.findById({
        _id: employee._id,
      }).populate("position");
      res.status(200).json({ message: "Employee created", employeeCreated });
    } catch (error) {
      res.status(500).json({ error });
      console.log(error);
    }
  },

  // handle update Employee
  employee_update: async (req, res) => {
    const { employeeId } = req.params;
    if (req.body.roles) {
      req.body.roles = JSON.parse(req.body.roles);
    }
    if (req.file) {
      // Upload to cloud
      req.body.image = await cloudinary.upload(
        req.file.path,
        process.env.CLOUD_FOLDER_UPLOAD
      );
    }

    if (req.body.password && req.body.password.length < 10) {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(req.body.password, salt);
      req.body.password = hashPassword;
    }

    try {
      const employee = await Employee.findById({ _id: employeeId });
      const isCurrentEmail = await Employee.findOne({ email: req.body.email });
      const isCurrentPhone = await Employee.findOne({ phone: req.body.phone });

      if (
        (employee.email === req.body.email &&
          employee.phone === req.body.phone) ||
        (employee.email === req.body.email && !isCurrentPhone) ||
        (employee.phone === req.body.phone && !isCurrentEmail) ||
        (!isCurrentEmail && !isCurrentPhone)
      ) {
        await Employee.updateOne(
          { _id: employeeId },
          {
            $set: {
              ...req.body,
            },
          }
        );
        const employeeUpdated = await Employee.findById({
          _id: employeeId,
        }).populate("position");
        res.status(200).json({ message: "Employee updated", employeeUpdated });
      } else {
        if (employee.phone === req.body.phone && isCurrentEmail)
          return res.status(409).json({ message: "Email already exists." });
        if (employee.email === req.body.email && isCurrentPhone)
          return res.status(409).json({ message: "Phone already exists." });
        return res.status(409).json({ message: "Email already exists." });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  },

  // handle delete Employee
  employee_delete: async (req, res) => {
    const { employeeId } = req.params;
    try {
      const employee = await Employee.deleteOne({ _id: employeeId });
      res.status(200).json({ message: "Employee deleted", employee });
    } catch (error) {
      res.status(500).json({ error });
    }
  },
};
