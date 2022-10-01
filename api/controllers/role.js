const Role = require("../model/role");

module.exports = {
  // handle get all Role
  role_getAll: async (req, res) => {
    try {
      const roles = await Role.find();
      res.status(200).json({ message: "Fetch roles successfully.", roles });
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // handle create Role
  role_create: async (req, res) => {
    const { role } = req.body;
    try {
      const isCurrentRole = await Role.findOne({ role });
      if (isCurrentRole)
        return res.status(409).json({ message: "Role already exists." });

      const newRole = new Role({ role });
      await newRole.save();
      res.status(201).json({ message: "Added a new role.", newRole });
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // handle update role
  role_update: async (req, res) => {
    const { roleId } = req.params;
    try {
      const { role } = await Role.findById({ _id: roleId });
      const isCurrentRole = await Role.findOne({ role: req.body.role });

      if (role === req.body.role || !isCurrentRole) {
        const roleUpdated = await Role.updateOne(
          { _id: roleId },
          {
            $set: {
              ...req.body,
            },
          }
        );
        res.status(200).json({ message: "Role updated.", roleUpdated });
      } else {
        res.status(409).json({ message: "Role already exists." });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  },
  // handle delete role
  role_delete: async (req, res) => {
    const { roleId } = req.params;
    try {
      await Role.deleteOne({ _id: roleId });
      res.status(200).json({ message: "Role deleted." });
    } catch (error) {
      res.status(500).json({ error });
    }
  },
};
