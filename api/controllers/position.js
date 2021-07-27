const Position = require("../model/position");

module.exports = {
  // handle get all Position
  position_getAll: async (req, res) => {
    try {
      const positions = await Position.find();
      res
        .status(200)
        .json({ message: "Fetch position successfully.", positions });
    } catch (error) {
      res.status(500).json({ error });
    }
  }, // handle create Position
  position_create: async (req, res) => {
    const { position, salary } = req.body;
    try {
      const newPosition = new Position({ position, salary });
      await newPosition.save();
      res.status(201).json({ message: "Added a new position.", newPosition });
    } catch (error) {
      res.status(500).json({ error });
    }
  }, // handle update position
  position_update: async (req, res) => {
    const { positionId } = req.params;
    req.body.salary = parseInt(req.body.salary);
    try {
      const positionUpdated = await Position.updateOne(
        { _id: positionId },
        {
          $set: {
            ...req.body,
          },
        }
      );
      res.status(200).json({ message: "Position updated.", positionUpdated });
    } catch (error) {
      res.status(500).json({ error });
    }
  },
  // handle delete position
  position_delete: async (req, res) => {
    const { positionId } = req.params;
    try {
      await Position.deleteOne({ _id: positionId });
      res.status(200).json({ message: "Position deleted." });
    } catch (error) {
      res.status(500).json({ error });
    }
  },
};
