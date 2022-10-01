const ImportOrder = require("../model/importOrder");

module.exports = {
  // handle get all import order
  importOrder_getAll: async (req, res) => {
    try {
      const importOrder = await ImportOrder.find().populate([
        { path: "employeeId" },
        { path: "supplierId" },
      ]);
      res
        .status(200)
        .json({ message: "Fetch import order successfully.", importOrder });
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // handle create import order
  importOrder_create: async (req, res) => {
    try {
      const newImportOrder = new ImportOrder({ ...req.body });
      await newImportOrder.save();
      await newImportOrder
        .populate([{ path: "employeeId" }, { path: "supplierId" }])
        .execPopulate();
      res
        .status(201)
        .json({ message: "Added a new import order.", newImportOrder });
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // handle update import order
  importOrder_update: async (req, res) => {
    const { importOrderId } = req.params;
    try {
      const importOrderUpdated = await ImportOrder.updateOne(
        { _id: importOrderId },
        {
          $set: {
            ...req.body,
          },
        }
      );
      res
        .status(200)
        .json({ message: "Import order updated.", importOrderUpdated });
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // handle delete import order
  importOrder_delete: async (req, res) => {
    const { importOrderId } = req.params;
    try {
      await ImportOrder.deleteOne({ _id: importOrderId });
      res.status(200).json({ message: "Import order deleted." });
    } catch (error) {
      res.status(500).json({ error });
    }
  },
};
