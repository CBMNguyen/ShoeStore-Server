const Employee = require("../model/employee");
const Position = require("../model/position");
module.exports = {
  // handle get all Employee
  employee_getAll: async (req, res) => {
    try {
      const employees = await Employee.find().populate("position");
      const page = req.query.page || 1;
      const limit = req.query.limit || employees.length;

      const start = (page - 1) * limit;
      const end = page * limit;

      filterEmployees = employees.slice(start, end);

      res.status(200).json({
        employees: filterEmployees,
        pagination: {
          page,
          limit,
          totalRow: employees.length,
        },
      });
    } catch (error) {
      res.status(500).json({ error });
    }
  }, // handle get Employee by Id
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
  }, // handle create Employee
  employee_create: async (req, res) => {
    const { firstname, lastname, gender, birthdate, email, address, phone, position } = req.body;

    console.log(req.body);

    try {
      const isPosition = await Position.findById({ _id: position });
      const isEmployee = await Employee.find({ email });
      const isPhoneNumber = await Employee.find({ phone });

      if (isEmployee.length >= 1)
        return res.status(409).json({
          massage: "Mail exists",
        });

      if (isPhoneNumber.length >= 1)
        return res.status(409).json({
          massage: "Phone number exists",
        });

      if (!isPosition)
        return res
          .status(404)
          .json({ message: "No valid entry found provide by positionId" });

      const newEmployee = new Employee({
        firstname,
        lastname,
        gender,
        birthdate,
        email,
        address,
        phone,
        image: req.file.path,
        position,
      });
      const employee = await newEmployee.save();

      employeeCreated = await Employee.findById({ _id: employee._id }).populate(
        "position"
      );

      res.status(201).json({ message: "Employee Create", employeeCreated });
    } catch (error) {
      res.status(500).json({ error });
    }
  }, // handle update Employee
  employee_update: async (req, res) => {
    const { employeeId } = req.params;
    if (req.file) {
      req.body.image = req.file.path;
    }
    try {
      await Employee.updateOne(
        { _id: employeeId },
        {
          $set: {
            ...req.body,
          },
        }
      );
      const employeeUpdated = await Employee.findById({ _id: employeeId }).populate("position")
      res.status(200).json({ message: "Employee updated", employeeUpdated });
    } catch (error) {
      res.status(500).json({ error });
    }
  }, // handle delete Product
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
