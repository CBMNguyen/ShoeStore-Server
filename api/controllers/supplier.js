const Supplier = require("../model/supplier");

module.exports = {
  // handle get all Supplier
  supplier_getAll: async (req, res) => {
    try {
      const suppliers = await Supplier.find();
      res
        .status(200)
        .json({ message: "Fetch suppliers successfully.", suppliers });
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // handle create Supplier
  supplier_create: async (req, res) => {
    const { name } = req.body;
    try {
      const isCurrentSupplier = await Supplier.findOne({ name });
      if (isCurrentSupplier)
        return res.status(409).json({ message: "Supplier already exists." });

      const newSupplier = new Supplier({ ...req.body });
      await newSupplier.save();
      res.status(201).json({ message: "Added a new supplier.", newSupplier });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  },

  // handle update supplier
  supplier_update: async (req, res) => {
    const { supplierId } = req.params;
    try {
      const supplierUpdated = await Supplier.updateOne(
        { _id: supplierId },
        {
          $set: {
            ...req.body,
          },
        }
      );
      res.status(200).json({ message: "Supplier updated.", supplierUpdated });
    } catch (error) {
      res.status(500).json({ error });
    }
  },
  // handle delete supplier
  supplier_delete: async (req, res) => {
    const { supplierId } = req.params;
    try {
      await Supplier.deleteOne({ _id: supplierId });
      res.status(200).json({ message: "Supplier deleted." });
    } catch (error) {
      res.status(500).json({ error });
    }
  },
};
