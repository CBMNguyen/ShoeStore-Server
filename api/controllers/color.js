const Color = require("../model/color");

module.exports = {
  // handle get all Color
  color_getAll: async (req, res) => {
    try {
      const colors = await Color.find();
      res.status(200).json({ colors });
    } catch (error) {
      res.status(500).json({ error });
    }
  }, // handle create Color
  color_create: async (req, res) => {
    const { color } = req.body;
    try {
      const newColor = new Color({ color });
      await newColor.save();
      res.status(201).json({ message: "Color created", newColor });
    } catch (error) {
      res.status(500).json({ error });
    }
  },
   // handle update color
  color_update: async (req, res) => {
    const { colorId } = req.params;
    try {
      const colorUpdated = await Color.updateOne(
        { _id: colorId },
        {
          $set: {
            ...req.body,
          },
        })
      res.status(200).json({ message: "Updated Color", colorUpdated });
    } catch (error) {
      res.status(500).json({ error });
    }
  }, // handle delete Color
  color_delete: async (req, res) => {
    const { colorId } = req.params;
    try {
      await Color.deleteOne({ _id: colorId });
      res.status(200).json({ message: "Color deleted" });
    } catch (error) {
      res.status(500).json({ error });
    }
  },
};
