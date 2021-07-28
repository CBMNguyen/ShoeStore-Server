const Size = require("../model/size");

module.exports = {
  // handle get all Size
  size_getAll: async (req, res) => {
    try {
      const sizes = await Size.find();
      res.status(200).json({ message: "Fetch size successfully.", sizes });
    } catch (error) {
      res.status(500).json({ error });
    }
  }, 

  // handle create Size
  size_create: async (req, res) => {
    const { size } = req.body;
    try {
      const isCurrentSize = await Size.findOne({size});
      if(isCurrentSize) return res.status(409).json({message: "Size already exists."});

      const newSize = new Size({ size });
      await newSize.save();
      res.status(201).json({ message: "Added a new size.", newSize });
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // handle update size
  size_update: async (req, res) => {
    const { sizeId } = req.params;
    try {
      const {size} = await Size.findById({_id: sizeId});
      const isCurrentSize = await Size.findOne({size: req.body.size});

      if(size === req.body.size || !isCurrentSize){
        const sizeUpdated = await Size.updateOne(
        { _id: sizeId },
        {
          $set: {
            ...req.body,
          },
        }
      );
      res.status(200).json({ message: "Size updated.", sizeUpdated });
      }
     else{
      res.status(409).json({message: "Size already exists."});
    }
  }catch (error) {
      res.status(500).json({ error });
    }
  },
  
  // handle delete size
  size_delete: async (req, res) => {
    const { sizeId } = req.params;
    try {
      await Size.deleteOne({ _id: sizeId });
      res.status(200).json({ message: "Size deleted." });
    } catch (error) {
      res.status(500).json({ error });
    }
  },
};
