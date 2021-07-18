const Size = require("../model/size");

module.exports = {
  // handle get all Size
  size_getAll: async (req, res) => {
    try {
      const sizes = await Size.find();
      res.status(200).json({ sizes });
    } catch (error) {
      res.status(500).json({ error });
    }
  }, // handle create Size
  size_create: async (req, res) => {
    const { size } = req.body;
    try {
      const newSize = new Size({ size });
      await newSize.save();
      res.status(201).json({ message: "Size created" });
    } catch (error) {
      res.status(500).json({ error });
    }
  }, // handle delete size
  size_delete: async (req, res) => {
    const { sizeId } = req.params;
    try {
      await Size.deleteOne({ _id: sizeId });
      res.status(200).json({ message: "Size created" });
    } catch (error) {
      res.status(500).json({ error });
    }
  },
};
